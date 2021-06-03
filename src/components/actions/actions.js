const changeCheck = (id) => ({type:'CHANGE_CHECK',id});
const deleteTodo = (id) => ({type:'DELETE_TODO',id})

export {
    changeCheck,
    deleteTodo
}