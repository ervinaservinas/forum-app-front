import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr'
import { FaHeart } from 'react-icons/fa'
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const SingleTopic = ({ topic }) => {
    // console.log(topic)
    const { getUser } = useContext(UserContext)
    const [getNew, setNew] = useState(false)
    const [getFavouriteIndex, setFavouriteIndex] = useState([])

    const [getState, setState] = useState(JSON.parse(localStorage.favorites).find((x) => x === topic._id))
    const nav = useNavigate()

    function goToSinglePage(x) {
        nav('/tema/' + x._id)
    }
    useEffect(() => {
        setState(
            JSON.parse(localStorage.favorites).find((x) => x === topic._id)
        );
        if (getUser && getUser.notification) {
            getUser.notification.find(y => y === topic._id && setNew(true))
        }
    }, [ topic, getState, getUser]);
    function changeFavorites() {
        let favorites = JSON.parse(localStorage.favorites);
        // console.log(getState, "state")
        setState(!getState);
        if (!getState) {
            favorites.push(topic._id);
        } else {
            favorites = favorites.filter((x) => x !== topic._id);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));

    }
    return (
        <div className="d-flex container borders m-2 forumStyle justify-content-around ">
            <div onClick={() => goToSinglePage(topic)} className='flex-grow2 topic-onclick'><b>{topic.title}</b> by {topic.owner}</div>
            <div className=' flex-grow2 text-center'> Amount of comments:{topic.commentsAmount}</div>
            <div className=' flex-grow2  text-center'>{topic.lastCommentBy && <div>by {topic.lastCommentBy}</div>}</div>
            <div className='flex-grow1 topic-onclick' onClick={changeFavorites} > {getState ? <FaHeart /> : <GrFavorite />}
            </div>
        </div>
    );
};

export default SingleTopic;