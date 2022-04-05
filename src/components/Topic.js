import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UsePagination from './Pagination';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import Comments from './Comments';


const Topic = () => {
    const { getUser, setUser } = useContext(UserContext)
    const { id } = useParams()
    const nav = useNavigate()
    const [getTopicComments, setTopicComments] = useState([])
    const [getState, setState] = useState(false)
    const [getError, setError] = useState(null)
    const inputText = useRef()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(null);
    const [postsPerPage] = useState(10);
    const [getTotalCount, setTotalCount] = useState(null)



    useEffect(() => {
        if (currentPage !== null) {
            http.get("topic/" + id + '/' +currentPage).then(res => {
                if (res.success) {
                    setTopicComments(res.data)
                    setTotalCount(res.data2)
                    setUser(res.data3)
                } else {

                }
            })
        } else {

        }
    }, [getState, currentPage])

    useEffect(() => {
        const search = location.search;
        const page = new URLSearchParams(search).get("page");
        if (page !== undefined && page !== null) {
            setCurrentPage(Number(page));
        } else {
            setCurrentPage(1);
        }
    }, [location]);

    const handlePageChange = (newActivePage) => {
        setCurrentPage(newActivePage);
        nav(`/tema/${id}?page=${newActivePage}`);
    };


    function sendComment() {
        const post = {
            text: inputText.current.value,
            id: id
        }
        http.post(post, "comment").then(res => {
            if (res.success) {
                inputText.current.value = ""
                setError(null)
                setState(!getState)
            } else {
                setError(res.message)
            }
        })
    }


    function youtube_parser(url){
        const regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
        const match = url.match(regExp);
        return (match && match[1].length==11)? match[1] : false;
    }

    return (
        <div className='p-3 pagination'>
            {postsPerPage < getTotalCount &&
                <UsePagination activePage={currentPage} handlePageChange={handlePageChange} totalCount={getTotalCount}
                />}
            {getTopicComments.length === 0 && <div>There is no comments</div>}
            {getTopicComments.length > 0 && getTopicComments.map((x, i) => <div key={i}><Comments x={x} /></div>)}
            {postsPerPage < getTotalCount &&
                <UsePagination  activePage={currentPage} handlePageChange={handlePageChange} totalCount={getTotalCount}
                />}
            {getUser && <div className='d-flex flex-column align-items-center'>

                <textarea className="width"  placeholder='Your comment' ref={inputText}  />

                <div>{getError}</div>
                <button className='btn' onClick={sendComment}>Comment</button>
            </div>}

        </div>
    );
};

export default Topic;