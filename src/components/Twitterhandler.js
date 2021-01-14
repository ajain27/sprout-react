import React, { useState } from 'react'
import '../styles/Twitterhandler.scss';
import TwitterIcon from '@material-ui/icons/Twitter';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

function Twitterhandler() {

    const characterLimit = 100;
    let [characterLeft, setCharacterLeft] = useState(characterLimit)
    const [resultList, setResultList] = useState(null)


    function handleCharCount(input) {
        const charCount = input.length;
        const charactersLeft = characterLimit - charCount;
        setCharacterLeft(charactersLeft);
    }

    function handleOnChange(e) {
        const input = e.target.value;
        handleCharCount(input);
    }

    function handleKeyDown(e) {
        if (e.which === 50) {
            console.log('@ pressed');
        }
    }

    return (
        <div className="container m-auto p-5">
            <div className="row d-flex ss_twitter_name">
                <div className="col-sm-2 col-md-1 p-0">
                    <img src="https://source.unsplash.com/random" alt="green" className="ss_user_image m-0" />
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
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChange}
                />
            </div>
            <TrackChangesIcon className="icon_sprout" />
            <PhotoCameraIcon className="icon_sprout" />
            <span className="character_count float-right">{characterLeft}</span>
        </div>
    )
}

export default Twitterhandler;
