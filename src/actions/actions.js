const changeCheck = (id) => ({ type: "CHANGE_CHECK", id });
const deleteTodo = (id) => ({ type: "DELETE_TODO", id });
const addTodo = (label) => ({ type: "ADD_TODO", label });
const changeIsEdit = (id) => ({ type: "CHANGE_IS_EDIT", id });
const editTodo = (label, id) => ({ type: "EDIT_TODO", label, id });

export { changeCheck, deleteTodo, addTodo, changeIsEdit, editTodo };
