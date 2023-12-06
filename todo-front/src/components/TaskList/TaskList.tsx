import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'state/store';
import { useEffect } from 'react';
import { fetchTasksThunk, setCurrentPage, setSortingOptions } from 'state/slices/todoListSlice';
import { Pagination, SortingControl, TaskCard } from 'components';
import { SortingField, SortingOrder } from 'dtos/FetchTaskList.dto';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();

    const setSortingParam = (sortingOrder: SortingOrder, sortingField?: SortingField) => {
        dispatch(setSortingOptions({ sortingField, sortingOrder }));
    };

    const selectPage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    useEffect(() => {
        dispatch(fetchTasksThunk({ page: currentPage, sortField: sortingField, sortOrder: sortingOrder }));
    }, [currentPage, sortingField, sortingOrder, dispatch, navigate]);

    return (
        <div className='container'>
            {fetchStatus === 'pending' && !tasks.length && <h2>Fetching task list...</h2>}
            {fetchStatus === 'failed' && <h2>Fail get task list, check later</h2>}
            {(fetchStatus === 'complete' || tasks.length > 0) &&
                <>
                    <h2>Total tasks: {totalTasks}</h2>
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