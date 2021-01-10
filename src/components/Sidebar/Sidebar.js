/*eslint-disable*/
import React, { useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import 'styles/Sidebar.scss';
import Button from '@material-ui/core/Button';
import AppContext from 'AppContext';
import NotificationsMenu from './Notifications';
const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const location = useLocation();

  const { app, setModal } = useContext(AppContext);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    if (routeName === '/home' && location.pathname === '/')
      return true;
    return !location.pathname.search(routeName) ? true : false;
  }
  const { color, logo, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        const blackFontClasses = classNames({
          [" " + classes.blackFont]: !activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path === '/films' ? `${prop.path + (app.lastIMDB ? `/${app.lastIMDB}` : '')}` : prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>

              <prop.icon
                className={classNames(classes.itemIcon,
                  blackFontClasses)}
              />

              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, blackFontClasses, {
                })}

                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo"
            className={classes.img} />
        </div>
        {app.username ?
          <span>
            {app.username}
          </span>
          :
          <Button
            onClick={() => setModal(prev => ({ ...prev, logOpen: true }))}
            variant='outlined'
            color='primary'
            style={{
              color: '#222',
              fontWeight: 'bold'
            }}
          >Sign in</Button>
        }
      </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <NotificationsMenu />
            {links}
          </div>

        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}</div>

        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
