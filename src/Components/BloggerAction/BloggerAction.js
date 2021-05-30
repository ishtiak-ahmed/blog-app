import axios from "axios"
export const deleteAllComment = (id) => {
    const allChilds = []
    const getChild = id => {
        return axios(`https://ishtiak-blog.herokuapp.com/blog/${id}`)
            .then(data => {
                (data.data.reply).forEach(element => {
                    allChilds.push(element)
                });
            }).then(() => {
                if (allChilds.length) {
                    allChilds.forEach(id => {
                        deleteComment(id)
                    });
                    console.log(allChilds)
                }
                else {
                    console.log('deleting comment with id ', id)
                }
            })
    }
    getChild(id)
    updateParentToBlank(id, [])
}

export const deleteComment = (id) => {
    console.log('deleting with id ', id)
    axios.delete(`https://ishtiak-blog.herokuapp.com/deleteComment/${id}`)
        .then(res => {
            console.log(res)
        })
}

export const updateParent = (id, child) => {
    axios(`https://ishtiak-blog.herokuapp.com/blog/${id}`)
        .then(data => {
            return data.data.reply
        }).then(data => {
            const newList = data.filter(id => id !== child)
            return (newList)
        }).then(newList => {
            axios.patch(`https://ishtiak-blog.herokuapp.com/updateBlogParent/${id}`, { reply: newList })
                .then(res => {
                    console.log('delete success')
                })
        })
}
const updateParentToBlank = (id) => {
    axios.patch(`https://ishtiak-blog.herokuapp.com/updateBlogParent/${id}`, { reply: [] })
        .then(res => {
            console.log('delete success')
        })

}
export const updateNested = (id, child) => {
    axios(`https://ishtiak-blog.herokuapp.com/getComment/${id}`)
        .then(data => {
            return data.data.reply
        }).then(data => {
            console.log(data)
            const newList = data.filter(id => id !== child)
            console.log(newList)
            return (newList)
        }).then(newList => {
            axios.patch(`https://ishtiak-blog.herokuapp.com/updateParent/${id}`, { reply: newList })
                .then(res => {
                    console.log('delete success')
                })
        })
}

// Mark As Spamm
export const setSpamCount = (commenter, count) => {
    console.log('added as spammer ', commenter)
    axios.patch(`https://ishtiak-blog.herokuapp.com/spamCount/${commenter}`, { count: count })
        .then(res => {
            console.log(res.data)
        })
}


//  Feature Comment
export const toggleFeatureComment = (comment) => {
    axios(`https://ishtiak-blog.herokuapp.com/getComment/${comment}`)
        .then(res => {
            const status = res.data.feature
            // axios.patch(`http://localhost:9717/toggleFeatureComment/${comment}`, { feature: !status })
            axios.patch(`https://ishtiak-blog.herokuapp.com/toggleFeatureComment/${comment}`, { feature: !status })
                .then(res => {
                    console.log(res)
                })
        })
}
