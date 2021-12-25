import { actionTypes } from "../actionType";

export const setProjectsData = (projects) => {
  return { type: actionTypes.SETPROJECTSDATA, payload: projects };
};
