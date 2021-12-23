import { FOLLOW_TOPIC, GET_TOPICS, TOPIC_ERROR, UNFOLLOW_TOPIC } from "../actions/types";

const initialState = {
    topics: [],
    loading: true,
    error: null
}

//eslint-disable-next-line
export default function(state=initialState, action){
    const {type, payload} = action;
    switch (type) {
        case GET_TOPICS:
            return {
                ...state,
                topics: payload,
                loading: false
            } 
        case TOPIC_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case FOLLOW_TOPIC:
        case UNFOLLOW_TOPIC:
            return {
                ...state,
                topics: state.topics.map((topic) => topic._id === payload.id ? {...topic, followers: payload.followers} : topic ), 
                loading: false
            }
        default:
            return state;
    }
}