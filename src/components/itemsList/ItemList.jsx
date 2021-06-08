import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';

import Item from "../Item";

const useStyles = makeStyles({
  font: {
    fontFamily: "Roboto",
  },
  main: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainBtn: {
    height: 30,
  },
  active: {
    backgroundColor: "#f50057",
  },
  h3: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto",
  },
});

const ItemList = ({ todos }) => {
  const [activeBtn, setBtn] = useState(true);
  const classes = useStyles();
  let notDoneTodos = todos.map(({ label, id, checked, isEdit }) => {
    if (!checked) {
      return (
        <Item
          key={Math.floor(Math.random() * 10000)}
          label={label}
          id={id}
          checked={checked}
          isEdit={isEdit}
        />
      );
    }
  });
  if (notDoneTodos.every((todo) => typeof todo === "undefined")) {
    notDoneTodos = <h3 className={classes.h3}>No todos here</h3>;
  }
  let executedTodos = todos.map(({ label, id, checked }) => {
    if (checked) {
      return (
        <Item
          key={Math.floor(Math.random() * 10000)}
          label={label}
          id={id}
          checked={checked}
        />
      );
    }
  });
  if (executedTodos.every((todo) => typeof todo === "undefined")) {
    executedTodos = <h3 className={classes.h3}>No todos here</h3>;
  }
  return (
    <div>
      <div className={classes.main}>
        <h3 className={classes.font}>Yours todos:</h3>
        <ButtonGroup
          className={classes.mainBtn}
          variant="contained"
          color="default"
        >
          <Button
            onClick={() => setBtn(true)}
            className={activeBtn ? classes.active : ""}
          >
            not done
          </Button>
          <Button
            onClick={() => setBtn(false)}
            className={activeBtn ? "" : classes.active}
          >
            done
          </Button>
        </ButtonGroup>
      </div>
      {activeBtn ? notDoneTodos : executedTodos}
    </div>
  );
};

ItemList.propTypes = {
  todos: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

export default connect(mapStateToProps)(ItemList);
