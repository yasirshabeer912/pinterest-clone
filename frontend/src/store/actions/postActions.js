export const allPosts = (posts) => {
    return {
        type: 'POSTS',
        payload: posts,
    };
};
export const searchResults = (posts) => {
    return {
        type: 'SEARCH_RESULTS',
        payload: posts,
    };
};