import React, { useState, useMemo, FC } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import Context from "../../context/index";
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
    background: "black",
    color: "white",
  },
  h3: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto",
  },
});

interface ITodo {
  id: number;
  label: string;
  checked: boolean;
  isEdit: boolean;
}

interface ITodos {
  todos: ITodo[];
}

const ItemList: FC<ITodos> = ({ todos }) => {
  const [activeBtn, setBtn] = useState<boolean>(true);
  const classes: any = useStyles();
  let i: number = 0;
  let newTodos: JSX.Element[] = [];

  let checkedTodos: ITodo[] = useMemo(
    () => todos.filter(({ checked }: any) => checked === false),
    [todos]
  );
  let unCheckedTodos: ITodo[] = useMemo(
    () => todos.filter(({ checked }: any) => checked === true),
    [todos]
  );

  newTodos = (activeBtn ? checkedTodos : unCheckedTodos).map(
    ({ label, id, checked, isEdit }: ITodo) => {
      i++;
      return (
        <Item
          key={Math.floor(Math.random() * 10000)}
          indexNumber={i}
          label={label}
          id={id}
          checked={checked}
          isEdit={isEdit}
        />
      );
    }
  );

  return (
    <Context.Consumer>
      {(switchValue: boolean) => {
        return (
          <div>
            <div className={classes.main}>
              <h3
                className={classes.font}
                style={switchValue ? { color: "black" } : { color: "white" }}
              >
                Yours todos:
              </h3>
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
            {newTodos}
            {newTodos.length ? (
              ""
            ) : (
              <h3
                className={classes.h3}
                style={switchValue ? { color: "black" } : { color: "white" }}
              >
                No todos here
              </h3>
            )}
          </div>
        );
      }}
    </Context.Consumer>
  );
};

const mapStateToProps = (state: Array<ITodo>) => {
  return {
    todos: state,
  };
};

export default connect(mapStateToProps)(ItemList);
