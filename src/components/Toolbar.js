import React, {useEffect} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from '../context/UserContext';


const Toolbar = () => {
    const {getUser, allFavorites} = useContext(UserContext)
    const [getMenuActive, setMenuActive] = useState(false)
    const [getCount, setCount] = useState(JSON.parse(localStorage.favorites).length)

    useEffect(() => {
        function checkFavorite() {

            let favorites = localStorage.getItem('favorites');
            console.log(favorites)
            setCount(favorites.length)
        }


        window.addEventListener('storage', checkFavorite)

        return () => {
            window.removeEventListener('storage', checkFavorite)
        }
    }, [])

    return (
        <div className='toolbar flex-wrap'>
            <div>
                <div className='d-flex justify-content-around small-column'>


                    {!getUser && <Link className='btn btn-dark' type="button" to="/register"
                                       onClick={() => setMenuActive(false)}>Register</Link>}
                    {!getUser &&
                        <Link className='btn btn-dark' type="button" to="/login" onClick={() => setMenuActive(false)}>Log
                            in </Link>}
                    <Link className='btn btn-dark' type="button" to="/"
                          onClick={() => setMenuActive(false)}>Forum</Link>
                    {getUser && <Link className='btn btn-dark' type="button" to="/profile"
                                      onClick={() => setMenuActive(false)}>Profile</Link>}

                    <Link className='btn btn-dark' type="button" to="/favorites" onClick={() => setMenuActive(false)}>
                        Favorite
                        {/*<span
                            >{allFavorites.length > 0 && getCount}</span>*/}
                    </Link>
                    {getUser &&
                        <Link to='/logout' className='btn btn-dark' type="button" onClick={() => setMenuActive(false)}>Log
                            out</Link>}


                </div>

                <div>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;