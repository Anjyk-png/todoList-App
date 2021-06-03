import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Item from '../item';
import SCItems from '../showCheckedItems';
import {connect} from 'react-redux';

const useStyles = makeStyles({
    font: {
        fontFamily: 'Roboto'
    },
    main: {
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
    }
});

const ItemList = ({todos}) => {
    console.log(todos);
    const classes = useStyles();
    return (
       <div >
          <div className={classes.main}>
            <h3 className={classes.font}>Yours todos:</h3>
            <SCItems/>
          </div>
            {
                todos.map(({label, id, checked}) => {
                    return  <Item key={Math.floor(Math.random() * 10000)} label={label} id={id} checked={checked}/>
                })
            }
       </div>
    )
};



const mapStateToProps = (state) => {
    return {
        todos:state
    }
};

export default connect(mapStateToProps)(ItemList);