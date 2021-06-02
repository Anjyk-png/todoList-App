import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '55ch',
        },
      },
    main:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20
    }
    
}));

const AddItem = () => {
    const classes = useStyles();
    return (
        <div className={classes.main} >
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="outlined-secondary"
                    label="Write todos here"
                    variant="outlined"
                    color="secondary"
                />
            </form>
            <Fab size="small" color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    )
}

export default AddItem;