import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    main:{
        height:30
    },
    active:{
        backgroundColor:'#f50057'
    }
}); 

const SCItems = () => {

    const classes = useStyles();

    return (
        <ButtonGroup className={classes.main} variant="contained" color="default">
            <Button className={classes.active}>unfulfilled</Button>
            <Button>executed</Button>
        </ButtonGroup>
    )
}

export default SCItems;