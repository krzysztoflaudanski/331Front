import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/usersRedux";

const LoginForm = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    // const [phone, setPhone] = useState('');
    // const [avatar, setAvatar] = useState(null);
     const [status, setStatus] = useState(null) //loading, success, serverError, clientError, loginError
     const dispatch = useDispatch();


    const handleSubmit = e => {
        e.preventDefault();
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/login`, options)
            .then(res => {
                //console.log(res.status)
                console.log(res.body)
                if (res.status === 200) {
                    setStatus('success');
                    console.log(status)

                    dispatch(logIn({login}))
                }
                else if (res.status === 400) {
                    setStatus('clientError')
                } else {
                   
                    setStatus('serverError')
                }
            })
            .catch(err => {
                console.log(status)
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