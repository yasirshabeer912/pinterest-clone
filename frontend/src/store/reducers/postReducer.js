const initalState = {
    posts: []
}

const postReducer = (state = initalState, action) =>{
    switch(action.type){
        case 'POSTS':
            return {
                ...state,
                posts:action.payload
            };
        case 'SEARCH_RESULTS':
            return {
                ...state,
                searchedPosts:action.payload
            };
        default:
            return state;
    }
}

export default postReducer