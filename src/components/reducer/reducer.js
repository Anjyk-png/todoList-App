const initialState = [
    {id:1, label:'Buy potato', checked:false},
    {id:2, label:'Buy cheese', checked:false},
    {id:3, label:'Buy milk', checked:false},
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
            state.forEach((todo) => {
                if (todo.id === action.id) {
                    id = todo.id 
                }
            });
            let stateWithDeletedTodo = State.filter(todo => todo.id !== id);
            for(let i = 0;i < stateWithDeletedTodo.length;i++) {
                stateWithDeletedTodo[i].id = i + 1;
            }
            return [...stateWithDeletedTodo];
        case 'ADD_TODO':
            if(action.label && action.label.length > 3) {
                const newTodo = {id:(state.length + 1), label:`${action.label}`, checked:false};
                return [...state,newTodo];
            }
            else {
                return state;
            }
        default:
            return state;
    }
};

export default reducer;