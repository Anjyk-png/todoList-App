import React from 'react';
import * as MUI from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles({
    editIcon:{
        marginLeft:5
    },
    main:{
        width:400,
        padding:20,
        margin:5,
        color:'black',
        fontSize:17
    },
    text:{
        color:'black'
    }
});

const Item = ({label, checked, id}) => {
    const classes = useStyles();
    return (
        <>
            <div>
                <MUI.Checkbox color="primary" checked={checked}/>
                <MUI.Chip className={classes.main} color="primary" label={`${id}.${label}`}/>
                <MUI.IconButton aria-label="delete">
                    <DeleteIcon fontSize="small" color='secondary' />
                </MUI.IconButton>
                <Fab size="small" className={classes.editIcon} color="default" aria-label="edit">
                    <EditIcon />
                </Fab>
            </div>
        </>
    )
};

export default Item;


