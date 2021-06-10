import { ADD_BLOG, CURRENT_USER, DELETE_BLOG, LOAD_BLOG_COLLECTION } from './../Actions/Actions'

const initialState = {
    blogCollection: [],
    currentUser: {
        // fullName: 'Ishtiak Ahmed',
        // email: 'iahmed1606@gmail.com',
        // userName: 'ishtiak',
        // photo: '',
        // role: 'Blogger'
    }
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BLOG: {
            console.log('adding blog')
            const newCollection = [...state.blogCollection, action.blog]
            return { ...state, blogCollection: newCollection }
        }
        case DELETE_BLOG: {
            const newCollection = state.blogCollection.filter(blog => blog._id !== action.id)
            return { ...state, blogCollection: newCollection }
        }
        case CURRENT_USER: {
            const currentUser = action.user
            return { ...state, currentUser: currentUser }
        }
        case LOAD_BLOG_COLLECTION: {
            return { ...state, blogCollection: action.blogs }
        }
        default:
            return state;
    }
}