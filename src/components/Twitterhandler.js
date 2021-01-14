import React, { useState, useRef } from 'react'
import axios from 'axios'
import '../styles/Twitterhandler.scss';
import TwitterIcon from '@material-ui/icons/Twitter';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

function Twitterhandler() {

    const characterLimit = 100;
    const seachURL = 'twitter/user/search'
    const URL = '/'
    let [characterLeft, setCharacterLeft] = useState(characterLimit)
    const [resultList, setResultList] = useState(null);
    const [showUsers, setShowUsers] = useState(false);
    const inputef = useRef(null);


    function handleCharCount(input) {
        const charCount = input.length;
        const charactersLeft = characterLimit - charCount;
        setCharacterLeft(charactersLeft);
    }

    function handleOnChange(e) {
        const input = e.target.value;
        console.log(e);
        if (input.length >= 3) {
            getUsers();
        }
        handleCharCount(input);
        const query = input;
        return query;
    }

    function getInputValue() {
        const query = inputef.current.value;
        console.log(query);
        return query;
    }

    function getUsers() {
        const user = getInputValue();
        axios.get(`${seachURL}?username=${user}`)
            .then(res => console.log(res));
        setShowUsers(true);
    }

    return (
        <div className="container m-auto p-5">
            <div className="row d-flex ss_twitter_name">
                <div className="col-sm-2 col-md-1 p-0">
                    <img src="https://source.unsplash.com/random" alt="random" className="ss_user_image m-0 float-left" />
                </div>
                <div className="col-sm-10 col-md-11">
                    <TwitterIcon className="ss_twitter__icon float-left ml-2" />
                    <strong><span className="float-left ml-2">Ankit Jain</span></strong>
                    <span className="float-left ml-2 twitter_handler">@ajain27</span>
                </div>
            </div>
            <div className="row">
                <textarea
                    className="form-control ss_tweet"
                    id="exampleFormControlTextarea1"
                    rows="7"
                    maxLength="100"
                    ref={inputef}
                    onChange={handleOnChange}
                />
            </div>
            <TrackChangesIcon className="icon_sprout" />
            <PhotoCameraIcon className="icon_sprout" />
            <span className="character_count float-right">{characterLeft}</span>

            {
                // showUsers ?
                <div className="row">
                    <div className="w-100">
                        {/* <h1>Results</h1> */}
                        <ul className="ss_user_list float-left p-0 m-0">
                            <li>
                                <img src="https://source.unsplash.com/random" alt="random" className="ss_user_image m-0" />
                                <TwitterIcon className="ss_twitter__icon ml-2" />
                               <strong><span>@Ankit</span></strong>
                               <span className="ml-2 twitter_handler">Ankit Jain</span>
                            </li>
                            {/* <li>
                                <img src="https://source.unsplash.com/random" alt="random" className="ss_user_image m-0" />
                            </li> */}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default Twitterhandler;
