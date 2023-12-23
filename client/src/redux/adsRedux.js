import { API_URL } from "../config";

export const getAllAds = ({ ads }) => ads;
export const getAddById = ({ ads }, adId) => ads.find(ad => ad.id === adId)

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
        .then(res => res.json())
        .then(ads => dispatch(updateAds(ads)))
    }
  };

  const adsReducer = (statePart = [], action) => {
    switch (action.type) {
      case UPDATE_ADS:
        return [...action.payload];
    //   case ADD_AD:
    //     return [...statePart, { ...action.payload }];
    //   case EDIT_AD:
    //     return statePart.map(table => (table.id === action.payload.tableId ? { ...table, ...action.payload } : table));
    //   case REMOVE_AD:
    //     return [...statePart.filter(table => table.id !== action.payload)];
      default:
        return statePart;
    };
  };
  export default adsReducer;