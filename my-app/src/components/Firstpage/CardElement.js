import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
}from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

export const NewCard = withStyles({
  root: {
    position: "relative",
    borderRadius: 0,
  }
})(Card);

export const NewCardActionArea = withStyles({
  root: {
    position: "relative",
  }
})(CardActionArea);

export const NewCardActions = withStyles({
  root: {
    position: "relative",
  }
})(CardActions);

export const NewCardContent = withStyles({
  root: {
    position: "relative",
    backgroundColor: "transparent",
  }
})(CardContent);

export const NewCardMedia = withStyles({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100vh",
  }
})(CardMedia);

export default {
    NewCard,
    NewCardActionArea,
    NewCardActions,
    NewCardContent,
    NewCardMedia
};