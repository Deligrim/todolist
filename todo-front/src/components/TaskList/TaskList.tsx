import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'state/store';
import { useEffect } from 'react';
import { fetchTasksThunk, setCurrentPage, setSortingOptions } from 'state/slices/todoListSlice';
import { Pagination, SortingControl, TaskCard } from 'components';
import { SortingField, SortingOrder } from 'dtos/FetchTaskList.dto';


const TaskList = () => {

    const {
        tasks,
        totalTasks,
        currentPage,
        totalPages,
        fetchStatus,
        sortingField,
        sortingOrder
    } = useSelector((state: RootState) => state.todoList);

    const dispatch = useDispatch<AppDispatch>();

    const setSortingParam = (sortingOrder: SortingOrder, sortingField?: SortingField) => {
        dispatch(setSortingOptions({ sortingField, sortingOrder }));
    };

    const selectPage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    useEffect(() => {
        if(fetchStatus === 'need-load')
            dispatch(fetchTasksThunk({ page: currentPage, sortField: sortingField, sortOrder: sortingOrder }));
    }, [currentPage, sortingField, sortingOrder, dispatch, fetchStatus ]);

    return (
        <div className='container'>
            {fetchStatus === 'pending' && !tasks.length && <h2>Получение списка задач...</h2>}
            {fetchStatus === 'failed' && <h2>Ошибка, попробуйте позже</h2>}
            {(fetchStatus === 'complete' || tasks.length > 0) &&
                <>
                    <h2>Всего задач: {totalTasks}</h2>
                    <SortingControl sortingField={sortingField} sortingOrder={sortingOrder} setSortingParams={setSortingParam} />
                    {tasks.map((task) =>
                        <TaskCard key={task.id} task={task} />
                    )}
                    {totalPages > 1 && <Pagination totalPage={totalPages} currentPage={currentPage} selectPageHandler={selectPage} />}
                </>
            }
        </div>

    )
}

export { TaskList }
