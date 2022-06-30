import {makeStyles} from "@material-ui/styles";

export const useStyles = makeStyles({
  primary: {
    backgroundColor: "var(--primary-color)",
    width: "100%",
    color: "white",
    hover: "var(--primary-color-hover)",
    height: "46px"
  },
  outlined: {
    border: "1px solid var(--primary-color)",
    width: "100%",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    height: "46px"
  },
  text: {
    color: "var(--primary-color)"
  }
})
