import React, 
 { Dispatch, FormEvent, ChangeEvent, MouseEvent, useState, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import Context from "../../context/mainContext";
import { addTodo } from "../../actions/actions";

const useStyles = makeStyles((theme: Theme) => ({
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

const AddItem: FunctionComponent = () => {
  const dispatch = useDispatch();
  const addTodoFunc: Dispatch<any> = (value: string): any => dispatch(addTodo(value));
  const [value, setValue] = useState<string>("");
  const classes: any = useStyles();
  function onClickOrSubmitForm(e: MouseEvent | FormEvent): void {
    e.preventDefault();
    addTodoFunc(value);
    setValue("");
  }

  return (
    <Context.Consumer>
      {(switchValue: boolean) => {
        return (
          <div className={classes.main}>
            <form
              onSubmit={(e: FormEvent): void => onClickOrSubmitForm(e)}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setValue(e.target.value)
                }
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
              <AddIcon
                onClick={(e: MouseEvent): void => onClickOrSubmitForm(e)}
              />
            </Fab>
          </div>
        );
      }}
    </Context.Consumer>
  );
};

// const mapDispatchToProps = (dispatch: Dispatch<any>) => {
//   return {
//     addTodo: (value: string): any => dispatch(addTodo(value)),
//   };
// };

export default AddItem;
