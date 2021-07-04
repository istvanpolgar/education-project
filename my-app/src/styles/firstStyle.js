import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    card: {
        height: "100vh",
    },
    newCardContent: {
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,.4)",
        padding: theme.spacing(5,0,0,5),
        marginTop: theme.spacing(5),
    },
    newCardContentTextSecondary: {
        color: "rgba(255,255,255,0.78)",
        padding: theme.spacing(0,0,5,10),
    },
    action: {
        height: "100vh",
        padding: theme.spacing(15),
    },
    button: {
        bottom: "10vh",
        height: "10vh",
        width: "40vh",
        fontSize: "3vh",
        color: "rgb(255,255,255)",
        borderColor: "rgb(255,255,255)",
        background: "rgba(0,0,0,0.6)",
    },
    box: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(1),
    },
    activedot: {
        color: "rgb(255,255,255)",
    },
    inactivedot: {
        color: "rgb(0,0,0)",
    },
    fab: {
        margin: theme.spacing(1),
        background: "transparent",
    }
}));