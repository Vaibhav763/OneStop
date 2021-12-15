import api from '../utils/api';
import { GET_TOPICS, TOPIC_ERROR } from './types';

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