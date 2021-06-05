import { React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Item from '../item';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

const useStyles = makeStyles({
    font: {
        fontFamily: 'Roboto'
    },
    main: {
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
    },
    mainBtn:{
        height:30
    },
    active:{
        backgroundColor:'#f50057'
    },
    h3:{
        display:'flex',
        justifyContent:'center',
        fontFamily:'Roboto'
    }
});

const ItemList = ({todos}) => {
    const [activeBtn,setBtn] = useState(true);
    const classes = useStyles();
    let checkedTodos = [];
    let noDoneTodos = [];
    let notDoneTodos = (
        todos.map(({label, id, checked, isEdit}) => {
            if(!checked) {
                noDoneTodos.push(1);
                return  <Item
                key={Math.floor(Math.random() * 10000)} 
                label={label} 
                id={id} 
                checked={checked}
                isEdit={isEdit}/>
            }
        })
    );
    if(!noDoneTodos.length) {
        notDoneTodos = (<h3 className={classes.h3}>No todos here</h3>);
    }
    let executedTodos = (
        todos.map(({label, id, checked}) => {
            if(checked) {
                checkedTodos.push(1);
                return  <Item key={Math.floor(Math.random() * 10000)} label={label} id={id} checked={checked}/>
            }
        })
    );
    if(!checkedTodos.length) {
        executedTodos = (<h3 className={classes.h3}>No todos here</h3>);
    }
    return (
       <div >
          <div className={classes.main}>
            <h3 className={classes.font}>Yours todos:</h3>
            <ButtonGroup className={classes.mainBtn} variant="contained" color="default">
                <Button onClick={() => setBtn(true)} className={activeBtn ? classes.active : ''}>not done</Button>
                <Button onClick={() => setBtn(false)} className={activeBtn ? '' : classes.active}>done</Button>
            </ButtonGroup>
          </div>
            {activeBtn ? notDoneTodos : executedTodos}
       </div>
    )
};



const mapStateToProps = (state) => {
    return {
        todos:state
    }
};

export default connect(mapStateToProps)(ItemList);