import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useForm } from "react-hook-form";

const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors }} = useForm();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [status, setStatus] = useState(null) //loading, success, serverError, clientError, loginError


    const onSubmit = () => {

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
        <Form onSubmit={handleSubmit(onSubmit)} className="mx-auto" style={{ width: '300px' }}>

            <h1>Sign Up</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully registered! You can now log in...</p>
                </Alert>)}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
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

            <Form.Group className="mb-3" controlId="login">
                <Form.Label>Login</Form.Label>
                <Form.Control {...register("login", { required: true, minLength: 10, maxLength: 50, pattern: /^[A-Za-z0-9]*$/ })}
                    type="text" placeholder="Enter login" value={login} onChange={e => setLogin(e.target.value)} />
                {errors.login && <small className='d-block form-text text-danger mt-2'>only a-z, A-Z, 1-9, .,!?$-*: are available, min:10, max:50</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password", {
                    required: true, minLength: 8, pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message: "Password must contain at least one lowercase letter, one uppercase letter, and one digit.",
                    }
                })}
                    type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                {errors.password && <small className='d-block form-text text-danger mt-2'>only a-z, A-Z, 1-9, .,;:"'/?!@#$%^&*()--+= are available, min:8, {errors.password.message}</small>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control {...register("phone", { required: true, minLength: 9, maxLength: 25, pattern: /^[0-9]+$/ })}
                    type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                {errors.phone && <small className='d-block form-text text-danger mt-2'>only 1-9 are available, min:9, max:25</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control {...register("avatar", { required: true })}
                    type="file" onChange={e => setAvatar(e.target.files[0])} />
                {errors.avatar && <small className='d-block form-text text-danger mt-2'>Avatar is required</small>}
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default RegisterForm