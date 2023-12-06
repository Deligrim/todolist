// api.ts
import { AxiosError } from 'axios';
import { CreateTaskDto } from 'dtos/CreateTask.dto';
import { Task } from 'dtos/Task.dto';
import { TaskListDto } from 'dtos/TaskList.dto';
import { FetchTaskListDto } from 'dtos/FetchTaskList.dto';
import { EditTaskTextDto } from 'dtos/EditTaskText.dto';
import { LoginCredentialsDto } from 'dtos/LoginCredentials.dto';
import { publicApiConfig, handleApiError, adminApiConfig } from './apiUtils';

export const getTaskList = async ({ page, sortField, sortOrder }: FetchTaskListDto): Promise<TaskListDto> => {
    try {
        const sortQuery = (sortField && sortOrder && `&sortField=${sortField}&sortOrder=${sortOrder}`) || '';
        const response = await publicApiConfig.get<TaskListDto>(`/tasks/?page=${page}${sortQuery}`);
        return response.data;
    }
    catch (err) {
        throw handleApiError(err as AxiosError);
    }
}

export const createTask = async (taskData: CreateTaskDto,  { rejectWithValue } : any): Promise<Task> => {
    try {
        const response = await publicApiConfig.post<{ newTask: Task }>('/tasks/', taskData);
        return response.data.newTask;
    }
    catch (err) {
        return rejectWithValue(handleApiError(err as AxiosError));
    }
}

export const editTaskText = async (editTaskBody: EditTaskTextDto, { rejectWithValue } : any): Promise<Task> => {
    try {
        const response = await adminApiConfig.put<{ editedTask: Task }>('/tasks/edit-text', editTaskBody);
        return response.data.editedTask;
    }
    catch (err) {
        return rejectWithValue(handleApiError(err as AxiosError));
    }
}


export const setTaskDone = async (taskId: number, { rejectWithValue } : any): Promise<Task> => {
    try {
        const response = await adminApiConfig.put<{ editedTask: Task }>('/tasks/done', { id: taskId });
        return response.data.editedTask;
    }
    catch (err) {
        return rejectWithValue(handleApiError(err as AxiosError));
    }
}

export const adminLogin = async (credentials: LoginCredentialsDto, { rejectWithValue } : any): Promise<string> => {
    try {
        const response = await publicApiConfig.post<{ accessToken: string }>('/admin/login', credentials);
        return response.data.accessToken;
    }
    catch (err) {
        return rejectWithValue(handleApiError(err as AxiosError));
    }
}
