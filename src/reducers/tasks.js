
export default function tasksStore(state = null, action) {

    const key = "allTasks";

    if(action.type === "ADD_TASK"){
      const store = [...state, action.payload];
      const str = JSON.stringify(store);
      localStorage.setItem(key, str);

        return JSON.parse(localStorage.getItem(key));
    }

    if(JSON.parse(localStorage.getItem(key)) !== null){

      return JSON.parse(localStorage.getItem(key));
    }

    return state;
}
