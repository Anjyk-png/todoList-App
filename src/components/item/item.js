import React from 'react';
import * as MUI from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import {changeCheck, deleteTodo} from '../actions';
import {connect} from 'react-redux';

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

const Item = ({label, checked, id, changeCheck, deleteTodo}) => {
    const classes = useStyles();
    return (
        <>
            <div>
                <MUI.Checkbox onClick={() => changeCheck(id)} color="primary" checked={checked}/>
                <MUI.Chip className={classes.main} color="primary" label={`${id}.${label}`}/>
                <MUI.IconButton onClick={() => deleteTodo(id)} aria-label="delete">
                    <DeleteIcon fontSize="small" color='secondary' />
                </MUI.IconButton>
                <Fab size="small" className={classes.editIcon} color="default" aria-label="edit">
                    <EditIcon />
                </Fab>
            </div>
        </>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCheck: (id) => dispatch(changeCheck(id)),
        deleteTodo: (id) => dispatch(deleteTodo(id))
    }
};

export default connect(null, mapDispatchToProps)(Item);


