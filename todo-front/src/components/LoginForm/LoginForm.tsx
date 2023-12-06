import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'state/store';
import { adminLoginThunk, setFormData, setValidationError } from 'state/slices/authSlice';


const LoginForm = () => {

    const {
        loginStatus,
        validationError,
        loginFormData
    } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch(setFormData({ ...loginFormData, [name]: value }));
    }
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!loginFormData.password.length || !loginFormData.username.length) {
            dispatch(setValidationError('Имя пользователя и пароль должны быть заполнены'));
            return;
        }
        dispatch(adminLoginThunk(loginFormData));
    };

    return (
        <div className={styles.form_container}>
            <h1>Авторизация</h1>
            <form className={styles.form_body} onSubmit={handleFormSubmit}>
                {validationError &&
                    <div className={styles.error_panel}>
                        {validationError}
                    </div>
                }
                <input
                    type="text"
                    name="username"
                    placeholder='Имя пользователя'
                    onChange={handleInputChange}
                    value={loginFormData.username}
                />
                <input
                    type="password"
                    name="password"
                    autoComplete='password'
                    placeholder='Пароль'
                    onChange={handleInputChange}
                    value={loginFormData.password}
                />
                <button disabled={loginStatus === 'pending'} type="submit">Войти</button>
                <Link to="/" className={styles.navlink}>Вернуться на главную страницу</Link>
            </form>
        </div>


    )
}

export { LoginForm }