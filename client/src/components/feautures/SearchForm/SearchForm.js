import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { searchResults } from '../../../redux/searchRedux';

const SearchForm = () => {
    const [login, setLogin] = useState(false);
    const [search, setSearch] = useState('');
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.id) {
            setLogin(true);
        }
    }, [user])


    const handleSubmit = e => {
        e.preventDefault();
        
        fetch(API_URL + '/api/ads/search/' + search)
            .then(res => res.json())
            .then(ads => {
                
                dispatch(searchResults(ads));
                navigate('/search/' + search)
            });
    };

    return (
        <article className="d-flex justify-content-between py-2" >
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