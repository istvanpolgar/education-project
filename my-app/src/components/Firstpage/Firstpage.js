import { PinDropSharp } from '@material-ui/icons';
import { 
    React, 
    useState,
    useEffect
  } from 'react';
  import { useHistory } from 'react-router-dom';
  import Card from './Card';

  const titles = ["You are a teacher?", "You are a student?", "Free registration!", "Let's LogIn!", "Tests & Exercises ... Just a CLICK!"];
  const descriptions = [
    "Try the new Education app. Save time for yourself. Generate tests, surveys, worksheets and solutions from existing topics with just one click.",
    "Try the new Education app. Exercise as much as you want. Generate worksheets and solutions from existing topics with just one click.",
    "You can now register for free in the new Education app. Save time for yourself.  Generate tests, surveys, worksheets and solutions. Exercise as much as you want.",
    "You can even LogIn right now. Save time for yourself.  Generate tests, surveys, worksheets and solutions. Exercise as much as you want.",
    "Generate tests, surveys, worksheets and solutions from existing topics with just one click. Save time for yourself."
  ];

  const buttontitles = [ "I Want to save time","I Want to exercise", "SignUp", "LogIn", "Get started" ];
  const images = ["/pictures/one.jpg", "/pictures/two.jpg","/pictures/three.jpg","/pictures/four.jpg","/pictures/five.jpg"];

  let res;

  export default function Firstpage( props ) {
    const history = useHistory();
    const [activeDot, setActiveDot] = useState(0);
    const [manualChange, setManualChange] = useState(false);

    useEffect(()=>{
      props.setShowMenu(false);
    },[])

    useEffect(()=>{
      if(!manualChange)
        clearTimeout(res);
      else
      {
        clearTimeout(res);
        setManualChange(false);
      }
      res = setTimeout(() => {
        if( activeDot === 4)
          setActiveDot(0)
        else
          setActiveDot(activeDot + 1)
      }, 7000);
    },[activeDot])

    const handleRoot = (index) => {
      props.setShowMenu(true);
      clearTimeout(res);
      switch(index){
        case 0: history.push('/signup'); break;
        case 1: history.push('/signup'); break;
        case 2: history.push('/signup'); break;
        case 3: history.push('/login'); break;
        case 4: history.push('/signup'); break;
      }
    }

    return (
      <div>
        <Card
          title={titles[activeDot]}
          image={images[activeDot]}
          description={descriptions[activeDot]}
          buttontitle={buttontitles[activeDot]}
          activeDot={activeDot}
          setActiveDot={setActiveDot}
          setManualChange={setManualChange}
          handleRoot={handleRoot}
        />
      </div>
)}