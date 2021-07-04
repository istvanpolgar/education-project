import { 
  Grid, 
  TextField, 
  Typography 
} from "@material-ui/core";
import { useStyles } from '../../styles/formElementStyle';

export default function FormElement( props ) {
  const classes = useStyles();

  const defaultValue = () => {
    if(props.type == "date")
    {
        let newDate = new Date();
        return newDate.getDate();
    }
    if(props.type == "time")
        return "01:00";
  }
  return (
    <>
      <Grid 
        container
        direction="row"
        spacing={2}
      >
        <Grid 
          item 
          xs={6} 
          sm={4} 
          md={2}
        >
          <Typography
            className={classes.text} 
            component="h1" 
            variant="h6"
          >
            {props.title}
          </Typography>
        </Grid>
        <Grid 
          item 
          xs={8} 
          sm={6} 
          md={4}
        >
          <div>
          {
            props.type == "date" || props.type == "time" ? (
              <TextField
                className={classes.dateinput}
                required
                fullWidth
                id={props.id}
                name={props.id}
                type={props.type}
                defaultValue={defaultValue}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e=>{props.handleChange(e.target)}}
              />
            ) : (
              props.type == "number" ? (
                <TextField
                  className={classes.input}
                  required
                  fullWidth
                  id={props.id}
                  label={props.label}
                  name={props.id}
                  type={props.type}
                  autoComplete={props.label}
                  inputProps= {{ min:1, max:100 }}
                  onChange={e=>{props.handleChange(e.target)}}
                />
            ) : (
              props.type == "text" ? (
                <TextField
                  className={classes.input}
                  required
                  fullWidth
                  id={props.id}
                  label={props.label}
                  name={props.id}
                  autoComplete={props.label}
                  onChange={e=>{props.handleChange(e.target.value)}}
                />
            ) : (
              <TextField
                className={classes.input}
                required
                fullWidth
                id={props.id}
                label={props.label}
                name={props.id}
                autoComplete={props.label}
                onChange={e=>{props.handleChange(e.target)}}
              />
            )))}
          </div>
        </Grid>
      </Grid>
    </>
)}