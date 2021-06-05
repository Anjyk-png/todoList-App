import { React, useState} from 'react';
import * as MUI from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import {changeCheck, deleteTodo, changeIsEdit, editTodo} from '../actions';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    editIcon:{
        marginLeft:5
    },
    rootText: {
        width:400,
        margin:5,
      },
    main:{
        width:400,
        padding:20,
        margin:5,
        color:'black',
        fontSize:17
    },
    formField:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    item:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }

});

const Item = ({label, checked, id, isEdit, changeCheck, deleteTodo, changeIsEdit, editTodo}) => {
    const [value, setValue] = useState(label);
    function onClickOrSubmitForm(e) {
        e.preventDefault();
    }
    const classes = useStyles();
    const isEditTodo = (<form onSubmit={(e) => {onClickOrSubmitForm(e);editTodo(value, id)}} className={classes.formField}>
        <TextField
                    className={classes.rootText}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id="outlined-secondary"
                    label="Edit todo"
                    variant="outlined"
                    color="secondary"
                />
    </form>);
    const noEdit = ( <MUI.Chip className={classes.main} color="primary" label={label}/>);
    const editBtn = (
        <Fab onClick={() => changeIsEdit(id)} size="small" className={classes.editIcon} color="default" aria-label="edit">
            <EditIcon/>
        </Fab>
    );
    return (
        <>
            <div className={classes.item}>
                <MUI.Checkbox onClick={() => changeCheck(id)} color="secondary" checked={checked}/>
                { isEdit ? isEditTodo : noEdit }
                <MUI.IconButton onClick={() => deleteTodo(id)} aria-label="delete">
                    <DeleteIcon fontSize="small" color='secondary' />
                </MUI.IconButton>
                { checked ? '' : editBtn }
            </div>
        </>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCheck: (id) => dispatch(changeCheck(id)),
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        changeIsEdit: (id) => dispatch(changeIsEdit(id)),
        editTodo: (label, id) => dispatch(editTodo(label, id))
    }
};

export default connect(null, mapDispatchToProps)(Item);


