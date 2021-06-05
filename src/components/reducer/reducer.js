const initialState = [
    {id:1, label:'Buy potato', checked:false, isEdit:false},
    {id:2, label:'Buy cheese', checked:false, isEdit:false},
    {id:3, label:'Buy milk', checked:false, isEdit:false},
    {id:4, label:'Buy gun', checked:false, isEdit:false}
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
                const newTodo = {id:(state.length + 1), label:`${action.label}`, checked:false, isEdit:false};
                return [...state,newTodo];
            }
            else {
                return state;
            }
        case 'CHANGE_IS_EDIT':
            let cState = [...state];
            let cTodo = null;
            state.forEach((todo) => {
                if (todo.id === action.id) {
                    cTodo = {...todo,isEdit:!todo.isEdit}
                    cState[todo.id - 1] = cTodo;
                }
            });
            return [...cState];
        case 'EDIT_TODO':
            let editState = [...state];
            let editTodo = null;
            state.forEach((todo) => {
                if (todo.id === action.id) {
                    editTodo = {...todo,label:action.label}
                    editState[todo.id - 1] = editTodo;
                }
            });
            return [...editState];
        default:
            return state;
    }
};

export default reducer;