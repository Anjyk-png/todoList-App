import React, { useCallback, useState, Dispatch, FC, ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
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

type ChangeIsEditActionType = {
  type: "CHANGE_IS_EDIT";
  id: number;
};

type EditTodoActionType = {
  type: "EDIT_TODO";
  label: string;
  id: number;
};

type ChangeCheckActionType = {
  type: "CHANGE_CHECK";
  id: number;
};

interface Iitem {
  label: string;
  checked: boolean;
  id: number;
  isEdit: boolean;
  indexNumber: number;
  changeCheck: (id: number) => ChangeCheckActionType;
  deleteTodo: (id: number) => DeleteTodoActionType;
  changeIsEdit: (id: number) => ChangeIsEditActionType;
  editTodo: (label: string, id: number) => EditTodoActionType;
}

const Item: FC<Iitem> = (
    { label, checked, id, isEdit, changeCheck, deleteTodo, changeIsEdit, editTodo, indexNumber }
  ) => {
  const [value, setValue] = useState<string>(label);
  function onClickOrSubmitForm(e: FormEvent): void {
    e.preventDefault();
    editTodo(value, id);
  }
  const changeCheckbox = useCallback(
    (id: number): ChangeCheckActionType => changeCheck(id),
    []
  );
  const toDeleteTodo = useCallback(
    (id: number): DeleteTodoActionType => deleteTodo(id),
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
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setValue(e.target.value)
          }
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
        onClick={() => changeIsEdit(id)}
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
            <div className={classes.item}>
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    changeCheck: (id: number): any => dispatch(changeCheck(id)),
    deleteTodo: (id: number): any => dispatch(deleteTodo(id)),
    changeIsEdit: (id: number): any => dispatch(changeIsEdit(id)),
    editTodo: (label: string, id: number): any => dispatch(editTodo(label, id)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
