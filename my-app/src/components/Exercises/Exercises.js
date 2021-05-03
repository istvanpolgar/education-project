import { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { 
    FormControl,  
    TextField, 
    Select,
    Grid 
} from '@material-ui/core';
import { fetchFunction } from '../../functions/fetch';

import { useStyles } from '../../styles/pageStyle';

export default function Exercises( props ) {
    const [ exercises, setExercises ] = useState();
    const classes = useStyles();

    const getExercises = async (props) => {
        const data = {
            'token': props.token
        }

        const e = await fetchFunction(data, '/exercises');
        setExercises(e);
    }       

    useEffect(()=>{getExercises(props)},[]);

    if(!exercises)
        return <div> Oupsssss!!!! </div>;
    return(
        <div>
            <FormControl 
                className={classes.formControl}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <InputLabel 
                    htmlFor="grouped-native-select">
                        Feladattípusok
                    </InputLabel>
                    <Select 
                    native 
                    defaultValue="" 
                    id="grouped-native-select">
                    <option aria-label="None" value="" />
                    { exercises.exercises.map((exTip,i) => (
                        <optgroup key={i} label={exTip.title}> 
                        {
                            exTip.tips.map((ex,i) => (
                            <option key={i} value={i}>{ex.name}</option>
                        ))}
                        </optgroup>
                    ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    />
                </Grid>
            </Grid>
            </FormControl>
        </div>
    )
}