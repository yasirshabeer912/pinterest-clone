export const allPosts = (posts) => {
    return {
        type: 'POSTS',
        payload: posts,
    };
};