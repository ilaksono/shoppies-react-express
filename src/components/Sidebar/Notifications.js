import { useState, useContext } from 'react';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";
import Button from "components/CustomButtons/Button";
import Poppers from "@material-ui/core/Popper";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import AppContext from 'AppContext';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { useHistory } from 'react-router-dom';
import { Button as MaterialButton } from '@material-ui/core';
const useStyles = makeStyles(styles);

const NotificationsMenu = () => {

  const history = useHistory();
  const [openNotification, setOpenNotification] = useState(null);
  const classes = useStyles();


  const { app, getMovieDetails,
    handleNominate,
    removeNomFromList,
    setSnack,
    setModal
  } = useContext(AppContext);

  const handleClick = (e, Title, Year, imdbID) => {
    e.stopPropagation();
    handleNominate(Title, Year, imdbID);
    removeNomFromList(imdbID);
    setSnack(prev => ({ ...prev, unvote: true }));
  };

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
  if (!app.id)
    return <div></div>;

  let parsedList = [];
  if (app.noms.length) {
    parsedList = app.noms.map((each) =>
      <MenuItem
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        onClick={event => {
          getMovieDetails(each.imdbid);
          history.push(`/films/${each.imdbid}`);
          // handleCloseNotification(event);
        }}
        className={classes.dropdownItem}
        key={each.imdbID}
      >
        <div

          style={{
            height: '100%'
          }}
        >

          {each.title} - {each.year}
        </div>
        <MaterialButton style={{
          width: '36px',
          height: '36px',
          fontSize: '16px',
          margin: 0,
          padding: 0
        }}
          onClick={(e) => handleClick(e, each.title, each.year, each.imdbid)}
        >
          X
        </MaterialButton>

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
        <i className="fas fa-award hoverable-icon"
          style={{ fontSize: 32 }}></i>
        <Hidden mdUp implementation="css">
          <p onClick={handleCloseNotification}
            className={classes.linkText}
            style={{ textTransform: 'none' }}
          >
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