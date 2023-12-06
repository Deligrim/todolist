export interface Task {
    id: number;
    username: string;
    email: string;
    text: string;
    isDone: boolean;
    edited: boolean;
    createdAt: string;
}
