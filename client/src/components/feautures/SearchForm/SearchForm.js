import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form} from "react-bootstrap";
import { NavLink, Navigate } from 'react-router-dom';

const SearchForm = () => {
    const [login, setLogin] = useState(false);
    const [search, setSearch] = useState('');
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user && user.id) {
            setLogin(true);
        }
    }, [user])

    const handleSubmit = () => {

    }

    return (
        <article className="d-flex justify-content-between" >
            <div>
    <Form onSubmit={handleSubmit} style={{ width: '300px' }} className='d-flex'>
            {/* Sekcja "Search" umieszczona po lewej stronie */}
            <Form.Group className="me-2" controlId="search" style={{ marginBottom: 0 }}>
                <Form.Control type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Search</Button>
        </Form>
        </div>
        <div className="d-flex align-items-center">
            {/* Guzik "Ad" renderowany tylko gdy login jest prawdziwy */}
            {login && (
                <NavLink to="/ad/add">
                    <Card.Link><Button variant="primary">Add ad</Button></Card.Link>
                </NavLink>
            )}
        </div>
    
</article>
    )
}
export default SearchForm