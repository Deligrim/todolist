import { Task } from './Task.dto';

export interface TaskListDto {
    tasks: Task[];
    totalTasks: number;
    currentPage: number;
    totalPages: number;
}
