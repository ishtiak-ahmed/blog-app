export const ADD_BLOG = "ADD_BLOG"
export const DELETE_BLOG = "DELETE_BLOG"
export const CURRENT_USER = "CURRENT_USER"
export const LOAD_BLOG_COLLECTION = 'LOAD_BLOG_COLLECTION'

export const postNewBlog = blog => {
    console.log(blog)
    return { type: ADD_BLOG, blog }
}

export const deleteBlog = id => {
    return { type: DELETE_BLOG, id }
}

export const setCurrentUser = user => {
    return { type: CURRENT_USER, user }
}

export const loadBlogCollection = blogs => {
    return { type: LOAD_BLOG_COLLECTION, blogs }
}