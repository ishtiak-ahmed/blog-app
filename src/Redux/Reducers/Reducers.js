import ADD_BLOG, { DELETE_BLOG } from './../Actions/Actions'

const initialState = {
    blogCollection: [],
    currentUser: {
        name: 'Ishtiak Ahmed',
        email: 'iahmed1606@gmail.com',
        userName: 'ishtiak'
    }
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BLOG: {
            const newCollection = [...state.blogCollection, action.blog]
            return { ...state, blogCollection: newCollection }
        }
        case DELETE_BLOG: {
            const newCollection = state.blogCollection.filter(blog => blog._id !== action.id)
            return { ...state, blogCollection: newCollection }
        }
        default:
            return state;
    }
}