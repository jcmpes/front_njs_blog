import LoginForm from '../src/components/auth/LoginPage/LoginForm'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginAction } from '../src/store/actions'

import Layout from "../src/components/layout/Layout";


const LoginPage = ({ posts, setPosts }) => {
    const history = useRouter();
    const location = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (credentials) => {
        dispatch(loginAction(credentials, history, location))
    }

    return (
        <Layout>
            <LoginForm onSubmit={handleSubmit} />
        </Layout>
    )
}

export default LoginPage;