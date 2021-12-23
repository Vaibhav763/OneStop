import api from '../utils/api';
import { FOLLOW_TOPIC, GET_TOPICS, TOPIC_ERROR, UNFOLLOW_TOPIC } from './types';

export const getTopics = () => async dispatch => {
    try {
        const res = await api.get("/posts/all/topics");
        // console.log(res);
        dispatch({
            type: GET_TOPICS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: TOPIC_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const followTopic = (id) => async dispatch => {
    try {
        const res = await api.put(`/posts/topics/follow/${id}`);
        dispatch({
            type: FOLLOW_TOPIC,
            payload: {followers: res.data, id: id}
        });

    } catch (err) {
        dispatch({
            type: TOPIC_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const unfollowTopic = (id) => async dispatch => {
    try {
        const res = await api.put(`/posts/topics/unfollow/${id}`);
        dispatch({
            type: UNFOLLOW_TOPIC,
            payload: {followers: res.data, id: id}
        });

    } catch (err) {
        dispatch({
            type: TOPIC_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}