import { useDispatch, useSelector } from 'react-redux';
import { Task } from 'dtos/Task.dto';
import styles from './TaskCard.module.css';
import { AppDispatch, RootState } from 'state/store';
import { editTaskTextThunk, setEditTaskData, setTaskDoneThunk } from 'state/slices/todoListSlice';
import { useEffect } from 'react';

const TaskCard = ({ task }: { task: Task }) => {

    const dispatch = useDispatch<AppDispatch>();

    const { loginStatus } = useSelector((state: RootState) => state.auth);
    const { editTaskData } = useSelector((state: RootState) => state.todoList);

    const isEdit = editTaskData?.id === task.id;
    const status = task.isDone ? 'completed' : 'in progress';

    const changeTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editTaskData?.id)
            dispatch(setEditTaskData({ ...editTaskData, text: event.target.value }))
    };
    const toggleEditTask = () => {
        if(isEdit){
            if(editTaskData.text.length)
                return dispatch(editTaskTextThunk(editTaskData));
            return dispatch(setEditTaskData());
        }
        dispatch(setEditTaskData({ id: task.id, text: task.text }));
    }
    const setDoneTask = () => {
        dispatch(setTaskDoneThunk(task.id));
    }

    useEffect(()=>{
        if(loginStatus !== 'loggedIn')
            dispatch(setEditTaskData());
    },[dispatch, loginStatus])


    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.author}>👤 {task.username}</div>
                <div className={styles.status_group}>
                    {task.edited && <div className={styles.status}>edited by admin</div>}
                    <div className={styles.status}>{status}</div>
                </div>

            </div>
            <p className={styles.email}>📧 {task.email}</p>
            {isEdit ?
                <textarea className={styles.text} value={editTaskData.text} onChange={changeTextHandler} />:
                <pre className={styles.text}>{task.text}</pre>}

            {loginStatus === 'loggedIn' && (
                <div className={styles.action_group}>

                    <button onClick={toggleEditTask} className={styles.edit_button}>{isEdit ? 'Save' : 'Edit text'}</button>
                    { !task.isDone && <button onClick={setDoneTask} className={styles.done_button}>Done task!</button> }
                </div>
            )}
        </div>
    )
}

export { TaskCard }