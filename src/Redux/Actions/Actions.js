export const ADD_BLOG = "ADD_BLOG"
export const DELETE_BLOG = "DELETE_BLOG"

export const postNewBlog = blog => {
    return { type: ADD_BLOG, blog }
}

export const deleteBlog = id => {
    return { type: DELETE_BLOG, id }
}