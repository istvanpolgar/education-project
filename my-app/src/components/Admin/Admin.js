import { 
    React, 
    useState,
    useEffect 
  } from 'react';
  import { 
    Grid,
    Snackbar,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableRow
  } from '@material-ui/core';
  import CategoryOperations from '../Admin/CategoryOperations';
  import ExerciseOperations from '../Admin/ExerciseOperations';
  import { handleFetch } from '../../functions/handleFetch';
  import MuiAlert from '@material-ui/lab/Alert';
  import { useStyles } from '../../styles/adminStyle';

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export default function Admin() {  
    const [message, setMessage] = useState();
    const [open, setOpen] = useState();
    const [categories, setCategories] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectable_exercises, setSelectableExercises] = useState([]);
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };  
    
    const handleChange = (e) => {
        e.preventDefault();
        exercises.map( cat => { 
            if( cat.title == e.target.value ) {
                setSelectableExercises(cat.tips.map(ex => {return ex.name;}));
            }
        })
    }

    const getCategoriesAndExercises = async () => {     
        const res = await handleFetch({}, '/exercises', 'POST', 'application/json');
        setCategories(res.exercises.map(cat => {
          return cat.title;
        }));
        setExercises(res.exercises);
    } 
    
    useEffect(()=>{ getCategoriesAndExercises() },[]);

    return (
        <>
            <Grid container spacing={2} >
                <Grid container item xs={6} direction="column" >
                    <CategoryOperations 
                        categories={categories}
                        setCategories={setCategories}
                        setMessage={setMessage}
                        setOpen={setOpen}
                    />
                </Grid>
                <Grid container item xs={6} direction="column" >
                    <ExerciseOperations 
                        categories={categories}
                        selectable_exercises={selectable_exercises}
                        handleChange={handleChange}
                        setExercises={setExercises}
                        setMessage={setMessage}
                        setOpen={setOpen}
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                    {
                        exercises.map( (cat) => {
                            <TableRow key={cat}>
                            <TableCell>{cat}</TableCell>
                            {
                                cat.tips.map((ex) => {
                                    <TableCell>{ex}</TableCell>
                                })
                            }
                            </TableRow>
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error"> {message} </Alert>
            </Snackbar>
        </>
    )
}