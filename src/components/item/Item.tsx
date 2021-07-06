import React, { memo, useCallback, useState, FC, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";

import MainContext from "../../context/mainContext";
import { changeCheck, deleteTodo, changeIsEdit, editTodo } from "../../actions/actions";

const useStyles = makeStyles({
  editIcon: {
    marginLeft: 5,
  },
  rootText: {
    width: 400,
    margin: 5,
  },
  main: {
    width: 400,
    padding: 20,
    margin: 5,
    fontSize: 17,
  },
  formField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

type DeleteTodoActionType = {
  type: "DELETE_TODO";
  id: number;
};

type ChangeCheckActionType = {
  type: "CHANGE_CHECK";
  id: number;
};

interface Iitem {
  onClick: () => void;
  label: string;
  checked: boolean;
  id: number;
  isEdit: boolean;
  indexNumber: number;
}

const Item: FC<Iitem> = (
    { label, checked, id, isEdit, indexNumber, onClick }
  ) => {
  const [value, setValue] = useState<string>(label);
  const dispatch = useDispatch();

  const changeCheckFunc = (id: number): any => dispatch(changeCheck(id));
  const deleteTodoFunc = (id: number): any => dispatch(deleteTodo(id));
  const changeIsEditFunc = (id: number): any => dispatch(changeIsEdit(id));
  const editTodoFunc = (label: string, id: number): any => dispatch(editTodo(label, id));

  function onClickOrSubmitForm(e: FormEvent): void {
    e.preventDefault();
    editTodoFunc(value, id);
    changeIsEditFunc(id);
    if (isEdit) {
      editTodoFunc(value, id);
    }
  }
  const changeCheckbox = useCallback(
    (id: number): ChangeCheckActionType => changeCheckFunc(id),
    []
  );
  const toDeleteTodo = useCallback(
    (id: number): DeleteTodoActionType => deleteTodoFunc(id),
    []
  );
  const classes: any = useStyles();
  const isEditTodo = (switchValue: boolean): JSX.Element => {
    return (
      <form
        onSubmit={(e: FormEvent): void => onClickOrSubmitForm(e)}
        className={classes.formField}
      >
        <TextField
          className={classes.rootText}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value)}
          id="outlined-secondary"
          label="Edit todo"
          variant="outlined"
          color={switchValue ? "primary" : "secondary"}
        />
      </form>
    );
  };
  const noEdit = (switchValue: boolean): JSX.Element => {
    return (
      <MUI.Chip
        className={classes.main}
        style={switchValue ? { color: "black" } : { color: "white" }}
        color={switchValue ? "secondary" : "primary"}
        label={`${indexNumber}.${label}`}
      />
    );
  };
  const editBtn = (switchValue: boolean): JSX.Element => {
    return (
      <Fab
        onClick={(e: FormEvent): void => onClickOrSubmitForm(e)}
        size="small"
        className={classes.editIcon}
        style={switchValue ? { color: "black" } : { color: "white" }}
        aria-label="edit"
      >
        <EditIcon color={switchValue ? "secondary" : "primary"} />
      </Fab>
    );
  };
 
  return (
    <MainContext.Consumer>
      {(switchValue: boolean) => {
        return (
          <>
            <div className={classes.item} onClick={onClick}>
              <MUI.Checkbox
                onClick={() => changeCheckbox(id)}
                style={switchValue ? { color: "black" } : { color: "white" }}
                checked={checked}
              />
              {isEdit ? isEditTodo(switchValue) : noEdit(switchValue)}
              <MUI.IconButton
                onClick={() => toDeleteTodo(id)}
                aria-label="delete"
              >
                <DeleteIcon
                  fontSize="small"
                  style={switchValue ? { color: "black" } : { color: "white" }}
                />
              </MUI.IconButton>
              {checked ? "" : editBtn(switchValue)}
            </div>
          </>
        );
      }}
    </MainContext.Consumer>
  );
};

export default memo(Item);
