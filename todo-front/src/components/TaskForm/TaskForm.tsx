import styles from './TaskForm.module.css';
import { createTaskThunk, setFormData, setValidationError } from 'state/slices/todoListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'state/store';

const TaskForm = () => {
    const {
        createTaskFormData: formData,
        taskCreationStatus,
        validationError
    } = useSelector((state: RootState) => state.todoList);

    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        dispatch(setFormData({ ...formData, [name]: value }));
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.username.length || !formData.text.length || !formData.email.length) {
            dispatch(setValidationError('Username, email and text must be non empty'));
            return;
        }
        dispatch(createTaskThunk(formData));
    };

    return (
        <>
            <h2>New task</h2>
            <form className={styles.form_body} onSubmit={handleFormSubmit}>
                {validationError &&
                    <div className={`${styles.panel} ${styles.error}`}>
                        {validationError}
                    </div>
                }
                {taskCreationStatus === 'complete' &&
                    <div className={`${styles.panel} ${styles.success}`}>
                        Task added successfully
                    </div>
                }
                <input
                    value={formData.username}
                    onChange={handleInputChange}
                    type="text"
                    name="username"
                    placeholder='Enter username'
                />
                <input
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    placeholder='Enter email'
                />
                <textarea
                    value={formData.text}
                    className={styles.input}
                    onChange={handleInputChange}
                    name="text"
                    placeholder='Enter task text'
                />
                <button
                    disabled={taskCreationStatus === 'pending'}
                    className={styles.submit_button}
                    type="submit">
                    Add task
                </button>
            </form>
        </>

    )
}

export { TaskForm }