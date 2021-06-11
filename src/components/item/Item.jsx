import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";

import MainContext from "../../context";
import { changeCheck, deleteTodo, changeIsEdit, editTodo } from "../../actions";

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

const Item = ({ label, checked, id, isEdit, changeCheck, deleteTodo, changeIsEdit, editTodo, indexNumber }) => {
  const [value, setValue] = useState(label);
  function onClickOrSubmitForm(e) {
    e.preventDefault();
    editTodo(value, id);
  }
  const changeCheckbox = useCallback((id) => changeCheck(id), []);
  const toDeleteTodo = useCallback((id) => deleteTodo(id), []);
  const classes = useStyles();
  const isEditTodo = (switchValue) => {
    return (
      <form
        onSubmit={(e) => onClickOrSubmitForm(e)}
        className={classes.formField}
      >
        <TextField
          className={classes.rootText}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="outlined-secondary"
          label="Edit todo"
          variant="outlined"
          color={switchValue ? "primary" : "secondary"}
        />
      </form>
    );
  };
  const noEdit = (switchValue) => {
    return (
      <MUI.Chip
        className={classes.main}
        style={switchValue ? { color: "black" } : { color: "white" }}
        color={switchValue ? "secondary" : "primary"}
        label={`${indexNumber}.${label}`}
      />
    );
  };
  const editBtn = (switchValue) => {
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
      {(switchValue) => {
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

Item.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.number,
  isEdit: PropTypes.bool,
  changeCheck: PropTypes.func,
  deleteTodo: PropTypes.func,
  changeIsEdit: PropTypes.func,
  editTodo: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCheck: (id) => dispatch(changeCheck(id)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    changeIsEdit: (id) => dispatch(changeIsEdit(id)),
    editTodo: (label, id) => dispatch(editTodo(label, id)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
