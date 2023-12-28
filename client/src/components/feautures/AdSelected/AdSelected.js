import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getAddById, removeAddRequest } from "../../../redux/adsRedux"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import formatShortDate from "../../../utils/formatShortDate";
import ListGroup from 'react-bootstrap/ListGroup';
import { IMGS_URL } from "../../../config";
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import styles from "./AdSelected.module.scss";


const AdSelected = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const adData = useSelector(state => getAddById(state, id))
    const user = useSelector(state => state.user);
    const [login, setLogin] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const handleRemove = e => {
        e.preventDefault()
        dispatch(removeAddRequest(adData._id))
        navigate('/')
    }

    useEffect(() => {
        if (user && adData && user.id === adData.user._id) {
            setLogin(true);
        }
    }, [user, adData])

    if (!adData) return <Navigate to="/" />
    else return (<article>
        <Card style={{}}>

            <div className={styles.img}><Card.Img variant="top" src={IMGS_URL + adData.image} /></div>
            <Card.Body>
                <Card.Title>{adData.title}</Card.Title>
                <Card.Text>
                    {adData.content}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Location: {adData.location}</ListGroup.Item>
                <ListGroup.Item>Published: {formatShortDate(adData.publicationDate)} </ListGroup.Item>
                <ListGroup.Item>Price: {adData.price} $</ListGroup.Item>
            </ListGroup>
            {login && <Card.Body>
                <NavLink to={"/ad/edit/" + adData._id}>  <Card.Link><Button variant="outline-info" >Edit</Button></Card.Link></NavLink>

                <Card.Link className="px-2"><Button variant="outline-danger" onClick={handleShow}>Delete</Button></Card.Link>
            </Card.Body>}
            {!login && <Card.Body>
                <Container>
                    <Row>
                        <Col xs={3} md={2}>
                            <Image src={IMGS_URL + adData.user.avatar} roundedCircle className={styles.avatar} />
                        </Col>
                        <Col>Added by: {adData.user.login}
                            <p>Phone: {adData.user.phone}</p>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>}
        </Card>





        {/* <Card className="mx-auto" style={{ minWidth: '300px', maxWidth: '800px' }} border="light">
        <Card.Body>
            <Stack direction="horizontal" gap={2} className='mb-4'>
                <Card.Title className='mb-0' ><h2>{adData.title}</h2></Card.Title>
            </Stack>
            <Stack direction="horizontal" gap={1}>
                <Card.Subtitle className='my-auto'>Author:
                </Card.Subtitle>
                <Card.Text className='my-auto'>
                    {adData.author}
                </Card.Text>
            </Stack>
            <Stack direction="horizontal" gap={1}>
                <Card.Subtitle className='my-auto'>Published:
                </Card.Subtitle>
                <Card.Text className='my-auto' >
                    {formatShortDate(adData.publicationDate)}
                </Card.Text>
            </Stack>
            <Stack direction="horizontal" gap={1}>
                <Card.Subtitle className='my-auto'>Description:
                </Card.Subtitle>
                <Card.Text className='my-auto'>
                    {adData.content}
                </Card.Text>
            </Stack>
            <Card.Text>
                {adData.shortDescription}
            </Card.Text>
            <Card.Text dangerouslySetInnerHTML={{ __html: adData.content }}>
            </Card.Text>
            <NavLink to={"/ad/edit/" + adData._id} className='ms-auto'>
                    <Button variant="outline-info" >Edit</Button>
                </NavLink>
                <Button variant="outline-danger" onClick={handleShow}>Delete</Button>
        </Card.Body>
    </Card> */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>This operation will completely remove this ad from app.<p> Are you sure, you want to do that</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleRemove}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    </article>
    )
}

export default AdSelected

