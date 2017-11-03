export default function deleteTask(state = [], action) {

  if(action.type === "DELETE_TASK"){

    const store = JSON.parse(localStorage.getItem('allTasks'));

    store.map((task) => {

      if(task.id !== action.payload.id){
          state.push(task);
          const str = JSON.stringify(state);
          localStorage.setItem('allTasks', str);
          window.location.reload();
      }
    });
    return JSON.parse(localStorage.getItem('allTasks'));

  }
  return state;
}