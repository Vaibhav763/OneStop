import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  FOLLOW_USER,
  UNFOLLOW_USER
  // GET_REPOS,
  // NO_REPOS
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
     case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
      case FOLLOW_USER:
      case UNFOLLOW_USER:
        return {
          ...state,
          profiles: state.profiles.map((profile) => profile.user.toString() === payload.id ? {...profile, followers: payload.data.followers} : profile ),
          profile: (state.profile && state.profile.user.toString() === payload.id) ? {...state.profile, followers: payload.data.followers} : state.profile,
          loading: false
        }
    default:
      return state;
  }
}

export default profileReducer;
