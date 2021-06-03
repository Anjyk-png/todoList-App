const initialState = [
    {id:1, label:'Buy potato', checked:true},
    {id:2, label:'Buy cheese', checked:false},
    {id:3, label:'Buy milk', checked:true},
    {id:4, label:'Buy gun', checked:false}
];

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_CHECK':
            let changedState = [...state];
            let changedTodo = null;
            state.forEach((todo) => {
                if (todo.id === action.id) {
                    changedTodo = {...todo,checked:!todo.checked}
                    changedState[todo.id - 1] = changedTodo;
                }
            });
            return [...changedState];
        case 'DELETE_TODO':
            let State = [...state];
            let id = null;
            let newId = 0
            state.forEach((todo) => {
                if (todo.id === action.id) {
                    id = todo.id 
                }
            });
            let stateWithDeletedTodo = State.filter(todo => todo.id !== id);
            stateWithDeletedTodo.forEach(todo => {
               newId++;
               todo.id = newId;
            })
            return [...stateWithDeletedTodo];
        default:
            return state;
    }
}

export default reducer;