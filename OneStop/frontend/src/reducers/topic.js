import { GET_TOPICS, TOPIC_ERROR } from "../actions/types";

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
        default:
            return state;
    }
}