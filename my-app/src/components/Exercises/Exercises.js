import { useEffect, useState } from 'react';

import {  
    FormControl,
    InputLabel,
    TextField, 
    Select,
    Grid,
    Fab 
} from '@material-ui/core';

import {
    Cancel
  } from '@material-ui/icons';

import { fetchFunction } from '../../functions/fetch';

import { useStyles } from '../../styles/pageStyle';

export default function Exercises( props ) {
    const [ selectValues, setSelectValues ] = useState();
    const [ exercise, setExercise ] = useState();
    const [ nr, setNr ] = useState();
    const [ cancel, setCancel ] = useState(false);
    const classes = useStyles();

    const clickCheck = () => {
        setCancel(!cancel);
    }

    const onTrigger = () => {
        const data = {
            'exercise': exercise,
            'nr': nr,
            'cancel': cancel,
            'value': props.value
        }
        props.parentCallback(data);
    }

    const getSelectValues = async (props) => {
        const data = {
            'token': props.token
        }

        const e = await fetchFunction(data, '/exercises');
        setSelectValues(e);
    }       

    useEffect(()=>{getSelectValues(props)},[]);
    useEffect(()=>{ onTrigger() },[exercise, nr, cancel]);

    if(!selectValues)
        return <div> Oupsssss!!!! </div>;
    return(
        <>
            <FormControl>
                <Grid container spacing={3}>
                    <Grid item>
                        <InputLabel htmlFor="ex_group"> Exercise </InputLabel>
                        <Select 
                            native 
                            onChange={e => setExercise(e.target.value)}
                            defaultValue=""
                            id="ex_group">
                            <option aria-label="None" value="" />
                            { selectValues.exercises.map((exTip,i) => (
                                <optgroup key={i} label={exTip.title}> 
                                {
                                    exTip.tips.map((ex,j) => (
                                    <option key={j} value={i*10+j}>{ex.name}</option>
                                ))}
                                </optgroup>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="ex_nr"
                            onChange={e => setNr(e.target.value)}
                            label="Number"
                            type="number"
                            inputProps= {{ min:0, max:100 }}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            component="button"
                            className={classes.submit}
                            onClick={clickCheck}
                            size="small"
                        >
                            <Cancel /> 
                        </Fab>
                    </Grid>
                </Grid>
            </FormControl>
        </>
    )
}