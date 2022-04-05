import React from 'react';
import { validLink } from './RegexValidator'
import { validImg } from './RegexImageValidator';
import YoutubeVideoIFrame from './YoutubeVideoIFrame';

const Comments = ({ x }) => {
    function validate(text) {
        let youtubeLink = ''
        let imageLink = ''
        let str = text.split(' ');
        str.map(x => validLink.test(x) ? youtubeLink = x : null)
        str.map(x => validImg.test(x) ? imageLink = x : null)
        let replacedText = text.replace(youtubeLink, '').replace(imageLink, '')
        let url = youtubeLink.replace("watch?v=", "embed/");
        return <div>
            {replacedText}
            <div>
                {imageLink !== '' && <img src={imageLink} alt="failed" />}
            </div>
            <div><a href={youtubeLink}>{youtubeLink}</a></div>
            <div>
                {url !== '' && <YoutubeVideoIFrame videoLink={url} />}
            </div>
        </div>
    }
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    return (
        <div className='comment-container'>
            <div className='flex-grow2'>
                <img src={x.imageUser} alt="User image" />
                <div> <b>{x.owner}</b></div>
                <div>Registered: </div>
                <div>{displayDate(x.registeredUserTime)}</div>
            </div>
            <div className='comment-box text-break commentBoxses'>
                <div><b>Comments:</b></div>
                {displayDate(x.createdTimestamp)}
                {validate(x.text)}
            </div>


        </div>
    );
};

export default Comments;
