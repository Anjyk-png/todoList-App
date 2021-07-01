interface IActionObject {
  type: string;
  id?: number;
  label?: string;
}

const changeCheck = (id: number): IActionObject => ({
  type: "CHANGE_CHECK",
  id,
});
const deleteTodo = (id: number): IActionObject => ({ type: "DELETE_TODO", id });
const addTodo = (label: string): IActionObject => ({ type: "ADD_TODO", label });
const changeIsEdit = (id: number): IActionObject => ({
  type: "CHANGE_IS_EDIT",
  id,
});
const editTodo = (label: string, id: number): IActionObject => ({
  type: "EDIT_TODO",
  label,
  id,
});

export { changeCheck, deleteTodo, addTodo, changeIsEdit, editTodo };
