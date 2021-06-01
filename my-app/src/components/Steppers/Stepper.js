import { 
    Step, 
    StepLabel, 
    Stepper
} from '@material-ui/core';

function getSteps() {
    return ['Select category', 'Select exercises', 'Set test properties'];
}

export default function StepperBase( props ) {
    const steps = getSteps();

    return (
        <Stepper activeStep={props.activeStep}>
            { 
                steps.map( label => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
            })}
        </Stepper>
    )
}