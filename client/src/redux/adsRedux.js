import { API_URL } from "../config";

export const getAllAds = ({ ads }) => ads;
export const getAddById = ({ ads }, id) => ads.find(ad => ad._id === id)

const createActionName = actionName => `app/adds/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD')
const REMOVE_AD = createActionName('REMOVE_AD');

export const updateAds = payload => ({ type: UPDATE_ADS, payload });
export const addAd = payload => ({ type: ADD_AD, payload });
export const editAd = payload => ({ type: EDIT_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload });

export const fetchAds = () => {
  return (dispatch) => {
    fetch(API_URL + '/api/ads')
      .then(res =>
        res.json()
      )
      .then(ads =>
        dispatch(updateAds(ads)))
  }
};

export const removeAddRequest = (id) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    };
    fetch((API_URL + '/api/ads/' + id), options)
      .then(res =>
        res.json()
      )
      .then(ad => {
        dispatch(removeAd(ad._id))
      })
  }
}
export const editAdRequest = (ad) => {

  return (dispatch) => {

    const { title, content, price, location, image, id } = ad
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('image', image);

    const options = {
      method: 'PUT',
      body: fd
    };

    fetch(`${API_URL}/api/ads/` + id, options)
      .then(res =>
        res.json()
      )

      .then(updatedAd => {
        dispatch(editAd(updatedAd)); // Przekazujesz obiekt `updatedAd`, nie tylko jego `_id`
      })
  };
}

const adsReducer = (statePart = [], action) => {

  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    //   case ADD_AD:
    //     return [...statePart, { ...action.payload }];
    case EDIT_AD:
      return statePart.map(ad => (ad._id === action.payload._id ? { ...ad, ...action.payload } : ad));
    case REMOVE_AD:
      return [...statePart.filter(ad => ad._id !== action.payload)];
    default:
      return statePart;
  };
};
export default adsReducer;