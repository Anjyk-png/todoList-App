import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";

import Context from "../../context";
import { addTodo } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "55ch",
    },
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
}));

const AddItem = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const classes = useStyles();
  function onClickOrSubmitForm(e) {
    e.preventDefault();
    addTodo(value);
    setValue("");
  }
  return (
    <Context.Consumer>
      {(switchValue) => {
        return (
          <div className={classes.main}>
            <form
              onSubmit={(e) => onClickOrSubmitForm(e)}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="outlined-secondary"
                label="Write todos here"
                variant="outlined"
                color="secondary"
              />
            </form>
            <Fab
              size="small"
              color={switchValue ? "secondary" : "primary"}
              aria-label="add"
            >
              <AddIcon onClick={(e) => onClickOrSubmitForm(e)} />
            </Fab>
          </div>
        );
      }}
    </Context.Consumer>
  );
};

AddItem.propTypes = {
  addTodo: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (value) => dispatch(addTodo(value)),
  };
};

export default connect(null, mapDispatchToProps)(AddItem);
