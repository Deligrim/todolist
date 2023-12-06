import { useEffect } from 'react';
import { TaskForm, TaskList } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'state/store';
import { resetTaskCreationStatus } from 'state/slices/todoListSlice';

const TaskListPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { loginStatus } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        dispatch(resetTaskCreationStatus());
    }, [dispatch, loginStatus, navigate]);

    return (
        <>
            <TaskForm />
            <TaskList />
        </>
    )
}

export { TaskListPage }