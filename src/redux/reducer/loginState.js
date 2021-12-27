import { actionTypes } from "../actionType";
const accessToken = '';

const setAccessToken = (state = accessToken, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
    case actionTypes.SIGNUP:
      return action.payload;
    default:
      return state;
  }
};

export default setAccessToken;