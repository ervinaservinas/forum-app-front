import React, { useRef } from 'react';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import ChangeImage from './ChangeImage';
import http from '../plugins/http';
import SingleTopic from './SingleTopic';
import UserComents from './UserComents';

const Profile = () => {
    const { getUser, setUser } = useContext(UserContext)
    const [getImage, setImage] = useState(false)
    const [getTopics, setTopics] = useState([])
    const [getAllTopics, setAllTopics] = useState([])
    const [getComments, setComments] = useState([])

    useEffect(() => {
        http.get("myTopics").then(res => {
            if (res.success) {
                setTopics(res.data)
                setComments(res.data2)
                setAllTopics(res.data3)
            } else {

            }
        })
        http.get("getUser").then(res => {
            if (res.success) {
                setUser(res.data)
                /*console.log(res.data, "user")*/
            } else {

            }
        })
    }, [])
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    function changeImage() {
        setImage(true)
    }

    return (
        <>
            {getUser && <div className={'d-flex'}>
                <div className='user-container sm-column d-flex align-items-center justify-content-center'>
                    <div className={'display-flex'}>

                        <div onClick={changeImage} className='userImg' style={{ backgroundImage: `url(${getUser.image})` }} >
                        </div>
                        <div className='user-info'>

                            <div><h2 className="margin0"> {getUser.username} </h2> </div>
                            <div className={"d-flex"}>
                                <div >registered:{displayDate(getUser.registerTimestamp)}</div>
                            </div>

                            <div>Number of comments {getUser.commentsAmount} </div>
                            <ChangeImage  getUser={getUser} setUser={setUser} />
                        </div>
                    </div>
                </div>

                <div className='p-3 d-flex flex-column align-items-center'>
                    <h3 style={{color:"red"}}>My created topics:</h3>
                    {getTopics.length === 0 && <div className='d-flex flex-column align-items-center mt-2'>
                        <div>No comments</div></div>}
                    {getTopics.length > 0 && getTopics.map((x, i) => <SingleTopic key={i} topic={x} />)}
                </div>
                <div className='p-3 d-flex flex-column align-items-center'>
                    <h3 style={{color:"red"}}>My comments</h3>
                    {getComments.length === 0 && <div className='d-flex flex-column align-items-center mt-2'>
                        <div>No comments</div></div>}
                    {getComments.length > 0 && getComments.map((x, i) => <UserComents key={i} x={x} topics={getAllTopics} />)}
                </div>

            </div>}
        </>
    );
};

export default Profile;