import React, { useEffect, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import '../styles/Twitterhandler.scss';
import TwitterIcon from '@material-ui/icons/Twitter';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import useDebounce from './Debounce';

function Twitterhandler() {

    const characterLimit = 140;
    const seachURL = 'twitter/user/search'
    let [characterLeft, setCharacterLeft] = useState(140)
    const [userList, setUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const cache = useRef({}); // object to cache the same api call. 

    useEffect(() => {
        inputRef.current.focus();
        // debouncing the API request every 500ms 
        if (debouncedSearchTerm) {
            getUsers();
            setShowUsers(true);
        } else {
            setUserList([])
            setShowUsers(false);
        }
    }, [debouncedSearchTerm]) // dependent on th search term

    function handleCharCount(input) {
        const charCount = input ? input.length : 0;
        const charactersLeft = characterLimit - charCount;
        setCharacterLeft(charactersLeft);
    }

    function handleOnChange(e) {
        const input = e && e.target ? e.target.value : '';
        setSearchTerm(input)
        handleCharCount(input);
    }

    function getSearchString() {
        const input = inputRef.current.value;
        const extractdInputValue = input.split(' ');
        const lastWordTyped = extractdInputValue[extractdInputValue.length - 1];
        const query = lastWordTyped.match(/@\S+/g);
        // getting the last typed handler which matched the regex => starting with @
        const twitterHandler = query ? (query.slice(-1)[0]).trim() : null;
        return twitterHandler;
    }

    function handleReplaceText(e) {
        const clickedLi = e.target && e.target.innerHTML ? e.target.innerHTML : '';
        const n = inputRef.current.value ? inputRef.current.value.split(" ") : null;
        // Geting the last word of the string
        const lastTypedHandler = n[n.length - 1];
        inputRef.current.value = inputRef.current.value.replace(lastTypedHandler, clickedLi);
        inputRef.current.focus();
    }

    function handleKeyboardEvent(e) {
        if(e.which === 13) {
            handleReplaceText(e);
        }
    }

    const getUsers = async () => {
        const user = getSearchString();
        if (user && (user.startsWith('@') && user.length >= 3)) {
            const url = `${seachURL}?username=${user}`;
            // Check if the same pai request exists in cache
            if (cache.current[url]) {
                const userData = cache.current[url];
                setUserList(userData);
                setShowUsers(true);
            } else {
                axios.get(url)
                    .then(res => {
                        const userData = res.data.users;
                        // Adding the new request to cache to prevent duplicates in future api calls.
                        cache.current[url] = JSON.parse(JSON.stringify(res.data.users));
                        setUserList(userData);
                        setShowUsers(true);
                    })
                    .catch(error => {
                        setUserList([]);
                        setShowUsers(false);
                        setError('Something went wrong', error)
                    })
            }
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
                    <span className="float-left ml-2 twitter_handler">@a4ankit27</span>
                </div>
            </div>
            <div className="row">
                <textarea
                    className="form-control ss_tweet"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    maxLength="140"
                    ref={inputRef}
                    onChange={handleOnChange}
                />
                <TrackChangesIcon className="icon_sprout" />
                <PhotoCameraIcon className="icon_sprout" />
            </div>
            <span className="character_count float-right">{characterLeft}</span>
            {
                showUsers ?
                    <div className="row m-0 w-100">
                        <div className="w-100 ss_user_data">
                            <ul className="ss_user_list float-left p-0 m-0 w-100" tabIndex="0">
                                {
                                    userList ? userList.map(user =>
                                        <li key={user.id} className="text-left m-3" onClick={handleReplaceText}  onKeyDown={handleKeyboardEvent}>
                                            <img src={user.profile_image_url_https} alt="random" className="ss_user_image m-0" /> <TwitterIcon className="ss_twitter__icon ml-2" />
                                            <strong><span tabIndex="1">@{user.screen_name}</span></strong>
                                            <span className="ml-2 twitter_handler">{user.name}</span>
                                            <span className="float-right twitter_handler">{user.verified ? 'VERIFIED' : ''}</span>
                                        </li>
                                    ) : null
                                }
                            </ul>
                        </div>
                    </div> : error
            }
        </div>
    )
}

export default Twitterhandler;
