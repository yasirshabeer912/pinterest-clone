export const allPosts = (posts) => {
    return {
        type: 'POSTS',
        payload: posts,
    };
};
export const searchResults = (posts, searchTerm) => {
    return {
        type: 'SEARCH_RESULTS',
        payload: {
            posts,
            searchTerm,
        },
    };
};
