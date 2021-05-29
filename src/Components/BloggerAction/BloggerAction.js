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
    axios.patch(`http://localhost:9717/updateBlogParent/${id}`, { reply: [] })
        .then(res => {
            console.log('delete success')
        })
}

const deleteComment = (id) => {
    console.log('deleting with id ', id)
    axios.delete(`http://localhost:9717/deleteComment/${id}`)
        .then(res => {
            console.log(res)
        })
}


