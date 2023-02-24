import './Paginate.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Paginate = ({ totalPage, currentPage, searchKey, category }) => {

    const url = category ? `/books/${category}?page=` : `/search?q=${searchKey}&page=`
    const previousPage = currentPage > 1 ? (currentPage - 1) : 1
    const nextPage = currentPage < totalPage ? (currentPage + 1) : totalPage
    const pageArray = Array.apply(null, Array(totalPage || 0)).map(function (x, i) { return i + 1; })

    return (
        <div className='paginate-wrapper'>
            {/* Total page >= 5 */}
// sửa totalPage >= 5 thành totalPage > 5. Bên dưới có totalPage <= 5 rồi.
            {totalPage <= 1 || totalPage > 5 && <div className="paginate" >
                <div className='previous-page page-item'>
                    <Link to={`${url}${previousPage}`}>
                        {`<`}
                    </Link>
                </div>
                {currentPage == 1 || <div className='first-page page-item'>
                    <Link to={`${url}1`}>
                        {`1`}
                    </Link>
                </div>}

                {currentPage <= 3 || <div className='dot-page page-item'>
                    <Link to={`${url}${currentPage == totalPage ? currentPage - 3 : currentPage - 2}`}>
                        {`...`}
                    </Link>
                </div>}


                {currentPage == 3 || totalPage == 2 || currentPage == totalPage && <div className='pre2-current-page page-item'>
                    <Link to={`${url}${currentPage - 2}`}>
                        {`${currentPage - 2}`}
                    </Link>
                </div>}
                {currentPage == 1 || currentPage == 2 || <div className='pre1-current-page page-item'>
                    <Link to={`${url}${currentPage - 1}`}>
                        {`${currentPage - 1}`}
                    </Link>
                </div>}
                <div className='current-page '>
                    <Link to={`${url}${currentPage}`}>
                        {`${currentPage}`}
                    </Link>
                </div>
                {currentPage == totalPage - 1 || currentPage == totalPage || <div className='next1-current-page page-item'>
                    <Link to={`${url}${currentPage + 1}`}>
                        {`${currentPage + 1}`}
                    </Link>
                </div>}
                {totalPage == 2 || currentPage == 1 && <div className='next2-current-page page-item'>
                    <Link to={`${url}${currentPage + 2}`}>
                        {`${currentPage + 2}`}
                    </Link>
                </div>}

                {currentPage >= totalPage - 2 || <div className='dot-page page-item'>
                    <Link to={`${url}${currentPage == 1 ? currentPage + 3 : currentPage + 2}`}>
                        {`...`}
                    </Link>
                </div>}


                {currentPage == totalPage || <div className='last-page page-item'>
                    <Link to={`${url}${totalPage}`}>
                        {`${totalPage}`}
                    </Link>
                </div>}
                <div className='next-page page-item'>
                    <Link to={`${url}${nextPage}`}>
                        {`>`}
                    </Link>
                </div>
            </div>}


            {/* Total page <= 5 */}
            {totalPage <= 1 || totalPage <= 5 &&
                <div className="paginate" >
                    <div className='previous-page page-item'>
                        <Link to={`${url}${previousPage}`}>
                            {`<`}
                        </Link>
                    </div>
                    {pageArray.map((page, index) => {
                        return (
                            <div className={currentPage == page ? `page-${page} page-item current-page` : `page-${page} page-item`}>
                                <Link to={`${url}${page}`}>
                                    {page}
                                </Link>
                            </div>
                        )
                    })}

                    <div className='next-page page-item'>
                        <Link to={`${url}${nextPage}`}>
                            {`>`}
                        </Link>
                    </div>
                </div>}
        </div>
    )
}

export default Paginate;
