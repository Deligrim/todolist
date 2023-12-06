import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'state/slices/authSlice';
import { AppDispatch, RootState } from 'state/store';
import { useEffect } from 'react';
import { resetAdminActionError } from 'state/slices/todoListSlice';


const Layout = () => {
    const { loginStatus } = useSelector((state: RootState) => state.auth);
    const { adminActionError } = useSelector((state: RootState) => state.todoList);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const clickLogoutHandler = () => dispatch(logout());

    useEffect(() => {
        if (adminActionError) {
            dispatch(resetAdminActionError());
            dispatch(logout());
            navigate('/login');
        }
    }, [adminActionError, dispatch, navigate]);

    return (
        <div className={styles.layout}>
            <header className={styles.header_background}>
                <div className={`${styles.header} ${styles.container}`}>
                    <Link to="/" className={styles.navlink}>TodoList</Link>
                    {loginStatus === 'loggedIn' ?
                        <button onClick={clickLogoutHandler} className={styles.primary_button}>Logout</button> :
                        <Link to="/login">
                            <button className={styles.primary_button}>Login</button>
                        </Link>
                    }
                </div>
            </header>
            <main className={`${styles.main} ${styles.container}`}>
                <Outlet />
            </main>
            <footer className={`${styles.footer} ${styles.container}`}>TodoList, 2023</footer>

        </div>

    )
}

export { Layout }