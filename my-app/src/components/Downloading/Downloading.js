import { 
    React, 
    useState 
} from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Typography,
    Grid,
    Fab
} from '@material-ui/core';
import {
    GetApp,
} from '@material-ui/icons';
import { useStyles } from '../../styles/downloadStyle';
import FormElement from '../FormElement/FormElement';

export default function Downloading( props ) {
    const [zipName, setZipName] = useState(props.token);
    const classes = useStyles();
    const history = useHistory();

    const handleClick = async () => { 
        await fetch(process.env.REACT_APP_API_URL + '/download', {
            method: 'GET',
            headers: {
                'Accept': 'application/zip',
                'Content-Type': 'application/zip',
                'Authorization': `Bearer ${props.token}`
            },
            responseType: 'blob',
        }).then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', zipName + '.zip');
            document.body.appendChild(a);
            a.click();
            a.parentNode.removeChild(a);
        }); 
        history.push('/page');
    }

    return (
        <div className={classes.root}>
            <Grid 
                container
                direction="column"  
            >
                <Grid item>
                    <Typography component="h1" variant="h5">
                        Please download your tests in a ZIP file
                    </Typography> 
                </Grid>
                <Grid item>
                    <FormElement 
                        title='Zip name: ' 
                        label='Zip name' 
                        id='zip_name'
                        type='text'
                        handleChange={setZipName}
                    />
                </Grid>
                <Grid item>
                    <Fab
                        component="button"
                        onClick={handleClick}
                        className={classes.submit}
                        size="large"
                    >
                        <GetApp /> 
                    </Fab>
                </Grid>
            </Grid>
        </div>
)}