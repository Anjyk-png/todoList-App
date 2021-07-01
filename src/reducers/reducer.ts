interface ITodo {
  id: number;
  label: string | undefined;
  checked: boolean;
  isEdit: boolean;
}

interface IAction {
  type: string;
  label?: string;
  id?: number;
}

const initialState: ITodo[] = [
  { id: 1, label: "Buy potato", checked: true, isEdit: false },
  { id: 2, label: "Buy cheese", checked: false, isEdit: false },
  { id: 3, label: "Buy milk", checked: false, isEdit: false },
  { id: 4, label: "Buy gun", checked: false, isEdit: false },
];

const reducer = (state: ITodo[] = initialState, action: IAction) => {
  switch (action.type) {
    case "CHANGE_CHECK":
      let changedState: ITodo[] = [...state];
      let changedTodo: ITodo | null = null;
      state.forEach((todo: ITodo) => {
        if (todo.id === action.id) {
          changedTodo = { ...todo, checked: !todo.checked };
          changedState[todo.id - 1] = changedTodo;
        }
      });
      return [...changedState];
    case "DELETE_TODO":
      let State: ITodo[] = [...state];
      let id: number | null = null;
      state.forEach((todo: ITodo) => {
        if (todo.id === action.id) {
          id = todo.id;
        }
      });
      let stateWithDeletedTodo = State.filter((todo: ITodo) => todo.id !== id);
      for (let i = 0; i < stateWithDeletedTodo.length; i++) {
        stateWithDeletedTodo[i].id = i + 1;
      }
      return [...stateWithDeletedTodo];
    case "ADD_TODO":
      if (action.label && action.label.length > 3) {
        const newTodo: ITodo = {
          id: state.length + 1,
          label: `${action.label}`,
          checked: false,
          isEdit: false,
        };
        return [...state, newTodo];
      } else {
        return state;
      }
    case "CHANGE_IS_EDIT":
      let cState: ITodo[] = [...state];
      let cTodo: ITodo | null = null;
      state.forEach((todo: ITodo) => {
        if (todo.id === action.id) {
          cTodo = { ...todo, isEdit: !todo.isEdit };
          cState[todo.id - 1] = cTodo;
        }
      });
      return [...cState];
    case "EDIT_TODO":
      let editState: ITodo[] = [...state];
      let editTodo: ITodo | null = null;
      state.forEach((todo: ITodo) => {
        if (todo.id === action.id) {
          editTodo = { ...todo, label: action.label };
          editState[todo.id - 1] = editTodo;
        }
      });
      return [...editState];
    default:
      return state;
  }
};

export default reducer;
