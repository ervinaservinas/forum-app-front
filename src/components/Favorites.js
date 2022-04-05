import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import SingleTopic from './SingleTopic';

const Favorites = () => {
    const {allFavorites, setAllFavorites} = useContext(UserContext)
    const favoritesIndex = JSON.parse(localStorage.favorites)
    const nav = useNavigate()
    useEffect(() => {
        http.post({favoritesIndex}, 'favorites').then((res) => {
            if (res.success) {
                setAllFavorites(res.data)
            }
        })
    }, [favoritesIndex, allFavorites])
    return (
        <div className='d-flex flex-column align-items-center p-5'>
            {allFavorites.length === 0 && <div className='text-center'>Add your favorite topic:
                <div  onClick={() => nav('/')}  className='btn btn-dark' type="button">Go back to all topics</div> </div>}
            {allFavorites.length > 0 && allFavorites.map((x, i) => <SingleTopic key={i} topic={x} />)}
        </div>
    );
};

export default Favorites;