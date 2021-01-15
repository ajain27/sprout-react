import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import '../styles/Twitterhandler.scss';
import TwitterIcon from '@material-ui/icons/Twitter';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import useDebounce from './debounce';

function Twitterhandler() {

    const characterLimit = 100;
    const seachURL = 'twitter/user/search'
    let [characterLeft, setCharacterLeft] = useState(characterLimit)
    const [userList, setUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [error, setError] = useState('');
    const inputef = useRef(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            getUsers();
            setShowUsers(true);
        } else {
            setUserList([])
        }
    }, [debouncedSearchTerm])

    function handleCharCount(input) {
        const charCount = input.length;
        const charactersLeft = characterLimit - charCount;
        setCharacterLeft(charactersLeft);
    }

    function handleOnChange(e) {
        const input = e.target.value;
        setSearchTerm(input)
        handleCharCount(input);
    }

    function getSearchString() {
        const input = inputef.current.value;
        const query = input.match(/@\S+/g);
        const twitterHandler = query ? query.slice(-1)[0] : null;
        return twitterHandler;
    }

    function handleReplaceText(e) {
        const clickedLi = e.target.innerHTML;
        const n = inputef.current.value ? inputef.current.value.split(" ") : null;
        const lastTypedHandler = n[n.length -1];
        inputef.current.value = inputef.current.value.replace(lastTypedHandler, clickedLi);
    }

    function getUsers() {
        const user = getSearchString();
        if (user && (user.startsWith('@') && user.length >= 3)) {
            axios.get(`${seachURL}?username=${user}`)
                .then(res => {
                    const userData = res.data.users;
                    setUserList(userData);
                    setShowUsers(true);
                })
                .catch(error => {
                    setUserList([]);
                    setShowUsers(false);
                    setError('Something went wrong', error)
                })
        } else {
            return;
        }
    }

    return (
        <div className="container m-auto p-5">
            <div className="row d-flex ss_twitter_name">
                <div className="col-sm-2 col-md-1 p-0">
                    <img src="https://source.unsplash.com/random" alt="random" className="ss_user_image m-0 float-left" />
                </div>
                <div className="col-sm-10 col-md-11 p-0">
                    <TwitterIcon className="ss_twitter__icon float-left" />
                    <strong><span className="float-left ml-2">Ankit Jain</span></strong>
                    <span className="float-left ml-2 twitter_handler">@ajain27</span>
                </div>
            </div>
            <div className="row">
                <textarea
                    className="form-control ss_tweet"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    maxLength="100"
                    ref={inputef}
                    onChange={handleOnChange}
                />
            </div>
            <TrackChangesIcon className="icon_sprout" />
            <PhotoCameraIcon className="icon_sprout" />
            <span className="character_count float-right">{characterLeft}</span>

            {
                showUsers ?
                    <div className="row">
                        <div className="w-100 ss_user_data">
                            <ul className="ss_user_list float-left p-0 m-0 w-100">
                                {
                                    userList?.map(user =>
                                        <li key={user.id} className="text-left m-3" onClick={handleReplaceText}>
                                            <img src={user.profile_image_url_https} alt="random" className="ss_user_image m-0" /> <TwitterIcon className="ss_twitter__icon ml-2" />
                                            <strong><span>@{user.screen_name}</span></strong>
                                            <span className="ml-2 twitter_handler">{user.name}</span>
                                            <span className="float-right twitter_handler">{user.verified ? 'VERIFIED' : ''}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div> : error
            }
        </div>
    )
}

export default Twitterhandler;
