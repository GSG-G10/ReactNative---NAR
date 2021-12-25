import { actionTypes } from "../actionType";
const projects = [];

const projectsData = (state = projects, action) => {
  switch (action.type) {
    case actionTypes.SETPROJECTSDATA:
      return [...projects, ...action.payload];
    default:
      return state;
  }
};

export default projectsData;