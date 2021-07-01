import React, { useState, FC } from "react";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

import MainContext from "./context";
import ItemList from "./components/ItemsList";
import AddItem from "./components/AddItem";



const useStyles = makeStyles({
  body: {
    width: "auto",
    height: 768,
  },
  containerSwitchFalse: {
    background: "gainsboro",
    borderRadius: 8,
    minHeight: 500,
  },
  containerSwitchTrue: {
    background: "darkslategray",
    borderRadius: 8,
    minHeight: 500,
  },
  font: {
    fontFamily: "Roboto",
    display: "flex",
    justifyContent: "center",
    paddingBottom: 10,
    margin: 0,
  },
  switch: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    fontFamily: "Roboto",
    padding: 0,
    margin: 0,
  },
});

const App: FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (): void => {
    setChecked(!checked);
  };
  const classes = useStyles();
  return (
    <MainContext.Provider value={checked}>
      <div className={classes.body}>
        <MUI.Container
          className={
            checked ? classes.containerSwitchFalse : classes.containerSwitchTrue
          }
          maxWidth="sm"
        >
          <div className={classes.switch}>
            <Switch
              checked={checked}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <h5 style={checked ? { color: "black" } : { color: "white" }}>
              change theme
            </h5>
          </div>
          <h3
            className={classes.font}
            style={checked ? { color: "black" } : { color: "white" }}
          >
            TodoList App
          </h3>
          <AddItem />
          <ItemList />
        </MUI.Container>
      </div>
    </MainContext.Provider>
  );
};

export default App;
