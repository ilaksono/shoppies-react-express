import { useState, useContext } from 'react';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";
import Button from "components/CustomButtons/Button";
import Poppers from "@material-ui/core/Popper";
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import AppContext from 'AppContext';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(styles);

const NotificationsMenu = () => {

  const history = useHistory();
  const [openNotification, setOpenNotification] = useState(null);
  const classes = useStyles();

  const { app, getMovieDetails } = useContext(AppContext);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  if(!app.id)
    return <div></div>

  let parsedList = [];
  if (app.noms.length) {
    parsedList = app.noms.map((each) =>
      <MenuItem
        onClick={event => {
          getMovieDetails(each.imdbid);
          history.push(`/films/${each.imdbid}`);
          handleCloseNotification(event);
        }}
        className={classes.dropdownItem}
        key={each.imdbID}
      >
        {each.title} - {each.year}
      </MenuItem>
    );
  }

  return (
    <div className={classes.manager}>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "black"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={openNotification ? "notification-menu-list-grow" : null}
        aria-haspopup="true"
        onClick={handleClickNotification}
        className={classes.buttonLink}
      >
        {/* <MovieFilterIcon
        style={{
          fontSize:'36px'

        }}
          // className={classes.icons} 
          /> */}
        {/* <span className={classes.notifications}></span> */}

        <i className="fas fa-award hoverable-icon" 
        style={{ fontSize: 32 }}></i>
        <Hidden mdUp implementation="css">
          <p onClick={handleCloseNotification}
            className={classes.linkText}>
            Nominations
            </p>
        </Hidden>
      </Button>
      <Poppers
        open={Boolean(openNotification)}
        anchorEl={openNotification}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openNotification }) +
          " " +
          classes.popperNav
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="notification-menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseNotification}>
                <MenuList role="menu">
                  {parsedList.length > 0 ? parsedList :
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      No Nominations Yet
                    </MenuItem>

                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </div>
  );
};
export default NotificationsMenu;