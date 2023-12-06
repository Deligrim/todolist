import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTaskList, createTask, editTaskText, setTaskDone } from 'services/apiService';
import { Task } from 'dtos/Task.dto';
import { SortingOrder, SortingField, FetchTaskListDto } from 'dtos/FetchTaskList.dto';
import { CreateTaskDto } from 'dtos/CreateTask.dto';
import { ApiError } from 'services/apiUtils';
import { EditTaskTextDto } from 'dtos/EditTaskText.dto';
import { TaskListDto } from 'dtos/TaskList.dto';

export const fetchTasksThunk =
    createAsyncThunk<TaskListDto, FetchTaskListDto, { rejectValue: ApiError }>('tasks/fetchTasks', getTaskList);

export const createTaskThunk =
    createAsyncThunk<Task, CreateTaskDto, { rejectValue: ApiError }>('tasks/createTask', createTask);

export const editTaskTextThunk =
    createAsyncThunk<Task, EditTaskTextDto, { rejectValue: ApiError }>('tasks/editTaskText', editTaskText);

export const setTaskDoneThunk =
    createAsyncThunk<Task, number, { rejectValue: ApiError }>('tasks/setTaskDone', setTaskDone);
export type FetchStatus = 'need-load' | 'pending' | 'complete' | 'failed';
export type TaskCreationStatus = 'idle' | 'pending' | 'complete';

export interface TodoState {
    tasks: Task[];
    totalTasks: number;
    currentPage: number;
    totalPages: number;
    sortingOrder: SortingOrder,
    sortingField?: SortingField,
    fetchStatus: FetchStatus,
    taskCreationStatus: TaskCreationStatus,
    createTaskFormData: CreateTaskDto,
    validationError: string | null,
    adminActionError: boolean,
    editTaskData?: EditTaskTextDto
}


const initialState: TodoState = {
    tasks: [],
    fetchStatus: 'need-load',
    totalTasks: 0,
    currentPage: 1,
    totalPages: 1,
    sortingOrder: 'asc',
    taskCreationStatus: 'idle',
    validationError: null,
    adminActionError: false,
    createTaskFormData: { username: '', email: '', text: '' }
}

const todoListSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setValidationError: (state, action: PayloadAction<string | null>) => {
            state.validationError = action.payload;
            state.taskCreationStatus = 'idle';
        },
        setFormData: (state, action: PayloadAction<CreateTaskDto>) => {
            state.createTaskFormData = action.payload;
        },
        setEditTaskData: (state, action: PayloadAction<EditTaskTextDto | undefined>) => {
            state.editTaskData = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
            state.fetchStatus = 'need-load';
            state.taskCreationStatus = 'idle';
        },
        setSortingOptions: (state, action: PayloadAction<{ sortingOrder: SortingOrder, sortingField?: SortingField }>) => {
            state.fetchStatus = 'need-load';
            state.sortingField = action.payload.sortingField;
            state.sortingOrder = action.payload.sortingOrder;
        },
        resetAdminActionError: (state) => {
            state.adminActionError = false;
        },
        resetTaskCreationStatus: (state) => {
            state.validationError = null;
            state.taskCreationStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                const { tasks, totalTasks, currentPage, totalPages } = action.payload;
                state.tasks = tasks;
                state.totalTasks = totalTasks;
                state.currentPage = currentPage;
                state.totalPages = totalPages;
                state.fetchStatus = 'complete';
            })
            .addCase(fetchTasksThunk.pending, (state) => {
                state.fetchStatus = 'pending';
            })
            .addCase(fetchTasksThunk.rejected, (state) => {
                state.tasks = [];
                state.fetchStatus = 'failed';
            })
            .addCase(createTaskThunk.pending, (state) => {
                state.taskCreationStatus = 'pending';
            })
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.totalTasks += 1;
                state.tasks.unshift(action.payload);
                state.tasks.slice(0, 3);
                state.sortingField = undefined;
                state.sortingOrder = 'asc';
                state.currentPage = 1;
                state.taskCreationStatus = 'complete';
                state.fetchStatus = 'need-load';
                state.validationError = null;
                state.createTaskFormData = { username: '', email: '', text: '' }
            })
            .addCase(createTaskThunk.rejected, (state, action) => {
                state.taskCreationStatus = 'idle';
                state.validationError = action.payload?.message || "Error";
            })
            .addCase(editTaskTextThunk.fulfilled, (state, action) => {
                state.editTaskData = undefined;
                const editedTask = action.payload;
                const index = state.tasks.findIndex((task) => task.id === editedTask.id);
                if (index !== -1) {
                    state.tasks[index] = editedTask;
                }
            })
            .addCase(editTaskTextThunk.rejected, (state, action) => {
                console.log(action.payload);
                state.adminActionError = action.payload?.code === 401;
            })
            .addCase(setTaskDoneThunk.fulfilled, (state, action) => {
                const editedTask = action.payload;
                const index = state.tasks.findIndex((task) => task.id === editedTask.id);
                if (index !== -1) {
                    state.tasks[index] = editedTask;
                }
            }).addCase(setTaskDoneThunk.rejected, (state, action) => {
                state.adminActionError = action.payload?.code === 401;
            });
    },
});
export const {
    setCurrentPage,
    setSortingOptions,
    setFormData,
    setValidationError,
    resetAdminActionError,
    resetTaskCreationStatus,
    setEditTaskData
} = todoListSlice.actions;
export default todoListSlice.reducer;
