import React from 'react';
import { validLink } from './Regex'

const OneComment = ({ x }) => {
    /*function validate(text) {
       let link = ''
        let imgLink = ''
        let str = text.split('');
       str.map(x=>validLink.test(x)? link = x : null)
        let newText = text.replace(link,'')
        let url = link.replace("watcj?v=", "emded/")


    }*/
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    return (
        <div className='comment-container d-flex md-column '>
            <div className='flex-grow-1'>
                <img src={x.imageUser} alt="" />
                <div> <b>{x.owner}</b></div>
                <div>Registered: </div>
                <div>{displayDate(x.registeredUserTimestamp)}</div>
            </div>
            <div className='comment-box text-break flex-grow-3'>
                <div><b>Comments:</b></div>
                {displayDate(x.createdTimestamp)}
                {x.text}
            </div>


        </div>
    );
};

export default OneComment;
