import React from 'react';
import ItemList from './components/itemsList';
import * as MUI from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddItem from './components/addItem';

const useStyles = makeStyles({
  body:{
    width:'auto',
    height:768
  },
  container:{
    background:'linear-gradient(75deg, limegreen 5%, palevioletred 90%)',
    borderRadius:8,
    minHeight:500,
  },
  font:{
    fontFamily:'Roboto',
    display:'flex',
    justifyContent:'center',
    padding:10
  }
});

const  App = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <MUI.Container className={classes.container} maxWidth="sm">
        <h3 className={classes.font} >TodoList App</h3>
        <AddItem/>
        <ItemList/>
      </MUI.Container>
    </div>
  );
}

export default App;
