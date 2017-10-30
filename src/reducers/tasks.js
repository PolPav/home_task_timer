export default function taskStore(state = [], action) {
    if(action.type === "ADD_TASK"){
        return [...state, action.payload];
    }

    if(action.type === "INFO_TASK"){
        return action.payload;
    }
    return state;
}

// function getTasksStore(state = [], action) {
//     const key = "tasksStorage";
//
//     if(action.type === "ADD_TASK"){
//         const $array = [...state, action.payload];
//         const str = JSON.stringify($array);
//         localStorage.setItem(key, str);
//
//         return JSON.parse(localStorage.getItem(key));
//     }
//
//     return state;
// }
