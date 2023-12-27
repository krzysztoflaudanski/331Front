import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null) //loading, success, serverError, clientError
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/login`, options)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 400) {
                    setStatus('clientError')
                } else {
                    setStatus('serverError')
                }
            })
            .then(data => {
                console.log(data)
                const { id, avatar, phone } = data.user;
                setStatus('success');
                dispatch(logIn({ login, id, avatar, phone }));
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                setStatus('serverError')
            })
    }


    return (
        <Form onSubmit={handleSubmit} className="mx-auto" style={{ width: '300px' }}>

            <h1>Sign in</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully logged in!</p>
                </Alert>)}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>)}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>Incorrect data</Alert.Heading>
                    <p>Login or password are incorrect...</p>
                </Alert>)}

            {status === "loading" && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>)}

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholder="Enter login" value={login} onChange={e => setLogin(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Sing in</Button>
        </Form>
    )
}

export default LoginForm