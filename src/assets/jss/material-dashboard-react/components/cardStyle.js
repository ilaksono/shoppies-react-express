import {
  blackColor,
  whiteColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

const cardStyle = theme => ({
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: whiteColor,
    width: "100%",
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    position: "relative",
    right: 0,
    display: "flex",
    flexDirection: "column",
    // alignItems:'flex-end',
    justifySelf: 'flex-end',
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem"
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center"
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px"
    }
  },
  [theme.breakpoints.up("md")]: {
    card: {
      width: "71vw",
      margin: "30px 15px 30px 15px"

    }
  }
});

export default cardStyle;
