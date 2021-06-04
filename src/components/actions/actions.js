const changeCheck = (id) => ({type:'CHANGE_CHECK', id});
const deleteTodo = (id) => ({type:'DELETE_TODO', id});
const addTodo = (label) => ({type:'ADD_TODO', label});

export {
    changeCheck,
    deleteTodo,
    addTodo
}