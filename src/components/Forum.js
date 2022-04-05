import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import CreateTopics from './CreateTopics';
import SingleTopic from './SingleTopic';

const Forum = () => {
    const { getUser } = useContext(UserContext)
    const [getNewTopic, setNewTopic] = useState(false)
    const [getTopics, setTopics] = useState([])
    useEffect(() => {
        http.get("allTopics").then(res => {
            if (res.success) {
                setTopics(res.data)
            } else {

            }
        })
    }, [getNewTopic])

    return (
        <div className='d-flex justify-content-center '>
            {getNewTopic && <CreateTopics setModal={setNewTopic} />}
            {getUser && <button className='btn btn-dark  ' type="button" onClick={() => setNewTopic(true)}>Create new thema</button>}
            <div className='d-flex align-items-center flex-column'>
                <div>
                    <div className="d-flex justify-content-center">

                    </div>

                </div>
                {getTopics.length === 0 && <div>There is no posts, create a new one</div>}
                {getTopics.length > 0 && getTopics.map((x, i) => <SingleTopic key={i} topic={x} />)}
            </div>
        </div>
    );
};

export default Forum;