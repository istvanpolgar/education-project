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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export default function Admin() {  
    const [message, setMessage] = useState();
    const [open, setOpen] = useState();
    const [change, setChange] = useState(false);
    const [categories, setCategories] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectable_exercises, setSelectableExercises] = useState([]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };  
    
    const handleChange = (category) => {
        exercises.map( cat => { 
            if( cat.title == category ) {
                setSelectableExercises(cat.tips.map(ex => {return ex.name;}));
            }
        })
    }

    const getCategoriesAndExercises = async () => {     
        const res = await handleFetch({}, '/exercises', 'POST', 'application/json');
        console.log(res.exercises);
        setCategories(res.exercises.map(cat => {
          return cat.title;
        }));
        setExercises(res.exercises);
    } 
    
    useEffect(()=>{ 
        getCategoriesAndExercises();
    },[change]);

    return (
        <>
            <Grid 
                container 
                spacing={5} 
                direction="row"
                justify="center"
                alignItems="flex-start">
                <Grid item  >
                    <CategoryOperations 
                        categories={categories}
                        setCategories={setCategories}
                        setMessage={setMessage}
                        setOpen={setOpen}
                        change={change}
                        setChange={setChange}
                    />
                </Grid>
                <Grid item>
                    <ExerciseOperations 
                        categories={categories}
                        selectable_exercises={selectable_exercises}
                        handleChange={handleChange}
                        setExercises={setExercises}
                        setMessage={setMessage}
                        setOpen={setOpen}
                        change={change}
                        setChange={setChange}
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
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