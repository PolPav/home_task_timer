export const deleteTask = (task) => {
  return{
    type: "DELETE_TASK",
    payload: task,
  }
};