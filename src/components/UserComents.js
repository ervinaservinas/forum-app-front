import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OneCommentUser = ({ x, topics }) => {
    const nav = useNavigate()
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    function getTopic() {
        let topInd =  topics.find(y => y._id === x.topicID)
        return <div>{topInd.title}</div>
    }
    function goToSinglePage(){
        nav('/tema/' + x.topicID)
    }
    return (
        <div className='user-comment-container d-flex'>
            <div className='borders '>
                <div className='link-topic' onClick={goToSinglePage}><b>Themes:{getTopic()}</b> </div>
                {displayDate(x.createdTimestamp)}
                {x.text}
            </div>

        </div>
    );
};

export default OneCommentUser;