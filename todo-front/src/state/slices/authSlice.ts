import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminLogin } from 'services/apiService';
import { ApiError } from 'services/apiUtils';
import { LoginCredentialsDto } from 'dtos/LoginCredentials.dto';

export interface AuthState {
    loginStatus: 'need-login' | 'pending' | 'loggedIn' | 'error';
    validationError: string | null;
    loginFormData: LoginCredentialsDto
}
const initialState: AuthState = {
    validationError: null,
    loginStatus: localStorage.getItem('accessToken') ? 'loggedIn' : 'need-login',
    loginFormData: { username: '', password: '' }
};
export const adminLoginThunk = createAsyncThunk<string, LoginCredentialsDto, { rejectValue: ApiError }>('auth/adminLogin', adminLogin);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<LoginCredentialsDto>) => {
            state.loginFormData = action.payload;
        },
        setValidationError: (state, action: PayloadAction<string | null>) => {
            state.validationError = action.payload;
        },
        logout: (state) => {
            state.loginStatus = 'need-login';
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(adminLoginThunk.fulfilled, (state, action) => {
            state.loginStatus = 'loggedIn';
            state.validationError = null;
            state.loginFormData = { username: '', password: '' };
            localStorage.setItem('accessToken', action.payload);
        }).addCase(adminLoginThunk.pending, (state, action) => {
            state.loginStatus = 'pending';
            state.validationError = null;
        }).addCase(adminLoginThunk.rejected, (state, action) => {
            state.loginStatus = 'error';
            state.validationError = action.payload?.message || "Неизвестная ошибка";
            localStorage.removeItem('accessToken');
        });
    },
});

export const { logout, setFormData, setValidationError } = authSlice.actions;

export default authSlice.reducer;
