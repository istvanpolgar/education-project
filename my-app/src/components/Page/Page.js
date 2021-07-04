import {
  React,  
  useEffect, 
  useState 
} from 'react';
import ReactLoading from "react-loading";
import { useHistory } from 'react-router-dom';
import { 
  Typography,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from '../../styles/pageStyle';
import { handleFetch } from '../../functions/handleFetch';
import StepperBase from '../Steppers/Stepper'; 
import Stepper1 from '../Steppers/Stepper1';
import Stepper2 from '../Steppers/Stepper2';
import Stepper3 from '../Steppers/Stepper3';
import Stepper4 from '../Steppers/Stepper4'; 

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Page( props ) {
  const [ categories, setCategories ] = useState([{id: 0, title: ''}]);
  const [ selectableCategories, setSelectableCategories ] = useState([]);
  
  const [ exercises, setExercises ] = useState(
    [{
      id: 0, 
      category: '', 
      title: '', 
      nr: 0
  }]);
  const [ selectableExercises, setSelectableExercises ] = useState([]);
  const [ activeStep, setActiveStep ] = useState(0);
  const [ ok, setOk] = useState();

  const [ params, setParams ] = useState({
    number: '',
    title: '', 
    class: '', 
    description: '',
    date: '',
    begin:'',
    end: ''
  });
  const [message, setMessage] = useState();
  const [open, setOpen] = useState();

  const classes = useStyles();
  const history = useHistory();

  const getCategoriesAndExercises = async () => {
    const data = {
        'token': props.token
    }
    
    const token = await handleFetch(data, '/page', 'POST', 'application/json');

    if(token.token)
      props.setToken(token);
    else{
      props.setToken('');
      window.location.href='/';
    }  
    
    const e = await handleFetch(data, '/exercises', 'POST', 'application/json');

    setSelectableCategories( e.exercises.map(cat => {
      return cat.title;
    }));

    setSelectableExercises( e.exercises );

  } 

  useEffect(()=>{ getCategoriesAndExercises() },[]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCategories([{id: 0, title: ''}]);
    setExercises([{id: 0, category: '', title: '', nr: 0}]);
    setParams({
      title: '', 
      class: '', 
      description: '',
      date: '',
      begin:'',
      end: ''
    });
  };

  const handleSubmit = async () => {
    const data = {
      'token': props.token,
      'exercises': JSON.stringify(exercises, ['id', 'category', 'title', 'nr']),
      'params': JSON.stringify(params, ['number', 'title', 'class', 'description', 'date', 'begin', 'end'])
    }
    
    setOk(false);
    const res = await handleFetch(data, '/generate', 'POST', 'application/json');

    if(res.token)
    {
      history.push('/download');
      setOk(true);
    }
    else{
      console.log('message: ', res.message);
    }
  }

  const handleExerciseChange = (id, data) => {
    let new_exercises = [];
    exercises.forEach( ex => { 
      if( ex.id === id ) {
        if(data.title)
          new_exercises.push({ ...ex ,
            category: data.category,
            title: data.title
          });
        if(data.nr)
          new_exercises.push({ ...ex , 
            nr: data.nr 
          });
      }
      else
        new_exercises.push(ex);
    })
    setExercises(new_exercises);
  }

  const handleExerciseDelete = (id) => {
    const exs = exercises.filter( ex => ex.id !== id );
    if(exs.length)
      setExercises(exs);
    else
      setExercises([{
        id: 0, 
        category: '', 
        title: '', 
        nr: 0
    }]);
  }

  const handleAddExercise = () => { 
    setExercises( prevEx =>
        [...prevEx, {
            id: prevEx.pop().id + 1,
            category: '',
            title: '',
            nr: 0
  }]);
  }

  const handleCategoryChange = (id, title) => {
    let new_categories = [];
    categories.forEach( cat => { 
      if( cat.id === id ) {
        new_categories.push({ ...cat , title: title});
      } else
        new_categories.push(cat);
    })
    setCategories(new_categories);

    let newCat = selectableCategories.filter( cat => cat !== title );
    setSelectableCategories(newCat);
  }

  const handleCategoryDelete = (id) => {
    const newCat = categories.find( cat => cat.id === id);
    if(newCat.title)
      setSelectableCategories([...selectableCategories, newCat.title]);
    const cats = categories.filter( cat => cat.id !== id );
    if(cats.length)
      setCategories(cats);
    else
      setCategories([{id: 0, title: ''}]);
  }

  const handleAddCategory = () => { 
    setCategories( prevCat =>
        [...prevCat, {
            id: prevCat.pop().id + 1,
            title: ''
  }]);
  }

  const handlePropsChange = (data) => {
    setParams( prevParams => (
      { ...prevParams, [data.name]: data.value 
    }));
  }

  return (
    ok === false ? (
      <div className={classes.container}>
        <ReactLoading
          type={"bars"}
          color={"#0000FF"}
          height={"30%"}
          width={"30%"}
        />
        <Typography component="h1" variant="h5">
            Tests are generating ...
        </Typography>
      </div>
    ) : (
    <div className={classes.container}>
      <StepperBase
        activeStep={activeStep}
      />
      <div className={classes.body}>
      {
        activeStep === 0 ? (
          <Stepper1 
            activeStep={activeStep}
            categories={categories}
            selectableCategories={selectableCategories}
            handleChange={handleCategoryChange}
            handleDelete={handleCategoryDelete}
            handleAdd={handleAddCategory}
            handleNext={handleNext}
            setOk={setOk}
            setMessage={setMessage}
          />
        ) : (
        activeStep === 1 ? (
          <Stepper2 
            activeStep={activeStep}
            exercises={exercises}
            selectableExercises={selectableExercises}
            categories={categories}
            selectableCategories={selectableCategories}
            handleChange={handleExerciseChange}
            handleDelete={handleExerciseDelete}
            handleAdd={handleAddExercise}
            handleBack={handleBack}
            handleNext={handleNext}
            setOk={setOk}
            setMessage={setMessage}
          />
        ) : (
        activeStep === 2 ? (
          <Stepper3
            activeStep={activeStep}
            handleChange={handlePropsChange}
            handleNext={handleNext}
            handleBack={handleBack}
            setOk={setOk}
            setMessage={setMessage}
          />
        ) : (
          <Stepper4
            categories={categories}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            setOk={setOk}
            setMessage={setMessage}
          />
        )))
      }
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>
    </div>
))}