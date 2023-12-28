import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { addAdRequest } from "../../../redux/adsRedux";

const AdAddForm = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = post => {
        dispatch(addAdRequest(post));
        navigate('/')
    };

    if (!user) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>);
    }


    return (
        <div>
            <AdForm action={handleSubmit} actionText="Ad post" user={user.id} />
        </div>
    )
};

export default AdAddForm;