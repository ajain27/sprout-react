import { get } from "../xhr/index";

const seachURL = 'twitter/user/search'

export function getTwitterUsers(handler){
    return get(`${seachURL}?username=${handler}`);
  }

  export function returnSearchURL(handler) {
      return `${seachURL}?username=${handler}`
  }