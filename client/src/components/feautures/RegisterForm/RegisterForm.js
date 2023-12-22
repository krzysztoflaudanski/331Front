import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";

const RegisterForm = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [status, setStatus] = useState(null) //loading, success, serverError, clientError, loginError


    const handleSubmit = e => {
        e.preventDefault();
    
        const fd = new FormData();
        fd.append('login', login);
        fd.append('password', password);
        fd.append('phone', phone);
        fd.append('avatar', avatar);

        const options = {
            method: 'POST',
            body: fd
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/register`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success')
                }
                else if (res.status === 400) {
                    setStatus('clientError')
                } else if (res.status === 409) {
                    setStatus('loginError')
                } else {
                    setStatus('serverError')
                }
            })
            .catch(err => {
                setStatus('serverError')
            })
        
    }

    return (
        <Form onSubmit={handleSubmit} className="mx-auto" style={{ width: '300px' }}>

            <h1>Sign Up</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully registered! You can now log in...</p>
                </Alert>)}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Something went wrong...</p>
                </Alert>)}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>No enought data</Alert.Heading>
                    <p>You have to fill all the field.</p>
                </Alert>)}

            {status === "loginError" && (
                <Alert variant="warning">
                    <Alert.Heading>Login already in use</Alert.Heading>
                    <p>You have to use other login.</p>
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
                <Form.Control type="text" placeholder="Enter login" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default RegisterForm