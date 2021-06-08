import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '../../styles/pageStyle';
import { fetchFunction }  from '../../functions/fetch';
import StepperBase from '../Steppers/Stepper';
import Stepper1 from '../Steppers/Stepper1';
import Stepper2 from '../Steppers/Stepper2';
import Stepper3 from '../Steppers/Stepper3';
import Stepper4 from '../Steppers/Stepper4';

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

  const [ params, setParams ] = useState({
    title: '', 
    class: '', 
    description: '',
    date: '',
    begin:'',
    end: ''
  });
  
  const classes = useStyles();

  const getCategoriesAndExercises = async () => {
    const data = {
        'token': props.token
    }
    
    const token = await fetchFunction(data, '/page');

    if(token.token)
      props.setToken(token);
    else{
      props.setToken('');
      window.location.href='/';
    }  
    
    const e = await fetchFunction(data, '/exercises');

    setSelectableCategories( e.exercises.map(cat => {
      return cat.title;
    }));

    setSelectableExercises( e.exercises );

  } 

  useEffect(()=>{ getCategoriesAndExercises() },[]);

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
    console.log(params);
    const data = {
      'token': props.token,
      'exercises': JSON.stringify(exercises, ['id', 'category', 'title', 'nr']),
      'params': JSON.stringify(params, ['title', 'class', 'description', 'date', 'begin', 'end'])
    }

    const res = await fetchFunction(data, '/generate');

    if(res.token)
      console.log('token: ', res.token);
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
    <div className={classes.container}>
      <StepperBase
        activeStep={activeStep}
      />
      <div>
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
          />
        ) : (
        activeStep === 2 ? (
          <Stepper3
            activeStep={activeStep}
            handleChange={handlePropsChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        ) : (
          <Stepper4
            categories={categories}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
          />
        )))
      }
      </div>
  </div>
)}

Page.propTypes = {
    setToken: PropTypes.func.isRequired
}