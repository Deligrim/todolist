export interface FetchTaskListDto {
    page: number;
    sortField?: 'username' | 'email' | 'isDone';
    sortOrder?: 'asc' | 'desc';
  }
export type SortingField = 'username' | 'email' | 'isDone';
export type SortingOrder = 'asc' | 'desc';
