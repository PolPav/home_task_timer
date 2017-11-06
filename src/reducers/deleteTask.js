export default function deleteTask(state = [], action) {

  if(action.type === "DELETE_TASK"){

    const store = JSON.parse(localStorage.getItem('allTasks'));
     const updateState = [];

    store.map((task) => {

      if(task.id !== action.payload.id){
        updateState.push(task);
        const str = JSON.stringify(updateState);
        localStorage.setItem('allTasks', str);
        window.location.reload();
      }
    });
  }

  return state;
}
