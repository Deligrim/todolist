import { useNavigate } from 'react-router-dom';
import { LoginForm } from 'components';
import { useSelector } from 'react-redux';
import { RootState } from 'state/store';
import { useEffect } from 'react';

const LoginPage = () => {

    const navigate = useNavigate();
    const { loginStatus } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if(loginStatus === 'loggedIn'){
            navigate('/');
        }
    }, [loginStatus, navigate]);

    return <LoginForm />
}

export { LoginPage }