import { GET_PROFILE, GET_VERSION } from "../actions/authAction";

const initState = {
  profile: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
      };
      case GET_VERSION:
      return {
        ...state,
        versionR: action.payload.versionA,
      };

    default:
      return state;
  }
};

export default authReducer;
