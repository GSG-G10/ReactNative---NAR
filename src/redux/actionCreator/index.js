import { actionTypes } from "../actionType";

export const setProjectsData = (projects) => {
  return { type: actionTypes.SETPROJECTSDATA, payload: projects };
};

export const loginToken = (accessToken) => {
  return { type: actionTypes.LOGIN, payload: accessToken };
}
