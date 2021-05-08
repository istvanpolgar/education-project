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
    const [ exercise, setExercise ] = useState({ input: props.value, title: -1, nr: 0 });
    const classes = useStyles();

    const handleChange = e => {
        e.persist();
        setExercise(prevExercise => (
            { ...prevExercise, [e.target.name]: e.target.value 
        }));
    }

    const onTrigger = () => {
        const data = {
            'input': props.value,
            'title': exercise.title,
            'nr': exercise.nr,
        }
        props.parentCallback(data);
    }

    const onClick = () => {
        props.handleDelete(props.value);
    }

    const getSelectValues = async (props) => {
        const data = {
            'token': props.token
        }

        const e = await fetchFunction(data, '/exercises');
        setSelectValues(e);
    }       

    useEffect(()=>{ getSelectValues(props) },[]);
    useEffect(()=>{ onTrigger() }, [exercise] );

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
                            onChange={handleChange}
                            name="title"
                            value={exercise.title}
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
                            onChange={handleChange}
                            label="Number"
                            type="number"
                            name="nr"
                            value={exercise.nr}
                            inputProps= {{ min:0, max:100 }}
                        />
                    </Grid>
                    <Grid item>
                        <Fab
                            component="button"
                            className={classes.submit}
                            onClick={onClick}
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