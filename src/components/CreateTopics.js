import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../plugins/http';

const CreateTopics = ({ setModal }) => {
    const [getError, setError] = useState(null)
    const newTopic = useRef()
    const nav = useNavigate()
    function closeTopic() {
        document.body.style.overflow = 'visible'

    }
    function createTopic() {
        const topic = {
            newTopic: newTopic.current.value
        }
        http.post(topic, 'createTopic').then(res => {
            if (res.success) {
                newTopic.current.value = ""
                setError(null)
                nav('/thema/' + res.data)
                closeTopic()
            } else {
                setError(res.message)
            }
        })
    }
    return (
        <div>
            <div>

                    <div className="d-flex flex-column">
                        <input ref={newTopic}
                                className="input"
                               placeholder="topic name"
                        />
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <div>{getError}</div>
                            <button className='btn btn-dark' type="button" onClick={createTopic}>Publish new thema</button>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default CreateTopics;