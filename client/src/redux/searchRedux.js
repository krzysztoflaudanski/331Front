const createActionName = (actionName) => `app/users/${actionName}`;

export const getAllSearchAds = ({search}) =>  search

const SEARCH_RESULTS = createActionName('SEARCH_RESULTS');


export const searchResults = payload => ({
    type: SEARCH_RESULTS,
    payload
});

const searchReducer = (statePart = [], action) => {
    switch (action.type) {
        case SEARCH_RESULTS:
            if (Array.isArray(action.payload)) {
                return [...action.payload];
              } else {
                // Obsłuż sytuację, gdy action.payload nie jest tablicą
                console.error('Invalid payload type:', action.payload);
                return null;
              }
            default:
            return statePart;
    }
}

export default searchReducer;