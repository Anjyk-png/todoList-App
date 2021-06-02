import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Item from '../item';
import SCItems from '../showCheckedItems';

const useStyles = makeStyles({
    font: {
        fontFamily: 'Roboto'
    },
    main: {
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
    }
})

const ItemList = () => {

    const classes = useStyles();

    return (
       <div >
          <div className={classes.main}>
            <h3 className={classes.font}>Yours todos:</h3>
            <SCItems/>
          </div>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
       </div>
    )
}
export default ItemList;