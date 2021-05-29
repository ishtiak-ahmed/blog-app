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
    updateParent(id, [])
}

export const deleteComment = (id) => {
    console.log('deleting with id ', id)
    axios.delete(`http://https://ishtiak-blog.herokuapp.com/deleteComment/${id}`)
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
            axios.patch(`http://https://ishtiak-blog.herokuapp.com/updateBlogParent/${id}`, { reply: newList })
                .then(res => {
                    console.log('delete success')
                })
        })
}

// Mark As Spamm
export const markAsSpam = (commenter) => {
    console.log('added as spammer ', commenter)
}
// Mark As Spamm
export const removeFromSpam = (commenter) => {
    console.log('Removing from spammer ', commenter)
}

