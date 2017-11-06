export default function infoTask(state = [], action) {

  if(action.type === "INFO_TASK"){
    return action.payload;
  }
  return state;
}