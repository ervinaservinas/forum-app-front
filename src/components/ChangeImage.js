import React from 'react';
import {useState, useRef} from 'react';
import {CloseButton} from "react-bootstrap";
import http from '../plugins/http';

const ChangeImage = ({setModal, getUser, setUser}) => {
    const [getError, setError] = useState(null)
    const newImage = useRef()


    function changeImage() {
        const updatedUser = {
            newImage: newImage.current.value,
            user: getUser.username
        }
        http.post(updatedUser, 'changeImage').then(res => {
            if (res.success) {
                newImage.current.value = ""
                setUser(res.data)
                setError(null)
            } else {
                setError(res.message)
            }
        })
    }

    return (
        <div>


            <div className="d-flex flex-column">
                <input ref={newImage}
                       placeholder="import url img"
                />
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <div>{getError}</div>

                </div>
                <div>
                    <button className="btn" onClick={changeImage}>Change image</button>
                </div>
            </div>
        </div>


    );
};

export default ChangeImage;