import { useDispatch, useSelector} from "react-redux";
import { useNavigate,} from "react-router-dom";
import AdForm from "../AdForm/AdForm";
import { useParams } from "react-router-dom";
import { editAdRequest, getAddById } from "../../../redux/adsRedux";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";


const AdEditForm = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const adData = useSelector(state => getAddById(state, id))
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (newData) => {
        console.log(newData)
        dispatch(editAdRequest(newData));
        navigate('/')
    };

    if (!adData || !user) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>);
    }

    const { title, price, content, image, location, _id,} = adData;
    
    return (
        <div>
            <AdForm action={handleSubmit} actionText="Edit post" title={title} user={user.id}
             content={content} price={price} image={image} location={location} id={_id}/>
        </div>
    )
};

export default AdEditForm;