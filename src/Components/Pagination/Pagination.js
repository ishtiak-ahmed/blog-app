import React from 'react';

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {
    const totalPage = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        totalPage.push(i)
    }
    return (
        <nav>
            <ul className='navigation'>
                <strong>Page Navigation</strong>
                {
                    totalPage.map(page => <li key={page} onClick={() => setCurrentPage(page)}>{page}</li>)
                }
            </ul>
        </nav>
    );
};

export default Pagination;