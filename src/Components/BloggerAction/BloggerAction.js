import axios from "axios"
export const deleteAllComment = (id) => {
    const allChilds = []
    const getChild = id => {
        return axios(`http://localhost:9717/blog/${id}`)
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
    axios.delete(`http://localhost:9717/deleteComment/${id}`)
        .then(res => {
            console.log(res)
        })
}

export const updateParent = (id, child) => {
    axios(`http://localhost:9717/blog/${id}`)
        .then(data => {
            return data.data.reply
        }).then(data => {
            const newList = data.filter(id => id !== child)
            return (newList)
        }).then(newList => {
            axios.patch(`http://localhost:9717/updateBlogParent/${id}`, { reply: newList })
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

