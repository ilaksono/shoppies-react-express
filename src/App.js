import {
  Switch
  , BrowserRouter as Router
  , Route
  , Redirect
} from 'react-router-dom';
import HomePage from 'views/HomePage';
import React, { useEffect, useContext, Suspense } from 'react';
import { useCookies } from 'react-cookie';
import PerfectScrollbar from "perfect-scrollbar";
import logo from 'assets/img/logo.png';
import AppContext from 'AppContext';
import NavBar from 'components/NavBar';
import Sidebar from "components/Sidebar/Sidebar";
import SearchResultsPage from 'views/SearchResultsPage';
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import routes from 'routes';
import { CircularProgress } from '@material-ui/core';

const DetailsPage = React.lazy(() =>
  import('views/DetailsPage'));
const AnalysisPage = React.lazy(() =>
  import('views/AnalysisPage'));

const useStyles = makeStyles(styles);

let ps;

function App() {

  const classes = useStyles();

  const [cookies] = useCookies();
  const {
    loadUser
  } = useContext(AppContext);

  const mainPanel = React.createRef();
  const [color, setColor] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  useEffect(() => {
    if (cookies.username && cookies.id)
      loadUser(cookies.username, Number(cookies.id));
  }, []);



  return (
    <Router>
      <>
        <NavBar handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          routes={routes}
          logoText={"Ian Laksono"}
          logo={logo}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
        />
      </>
      <Switch>
        <div className={classes.content}>
          <div className={classes.container}>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchResultsPage />
            </Route>
            <Route path="/films" exact>
              <Suspense fallback={<CircularProgress />}>
                <DetailsPage />
              </Suspense>
            </Route>
            <Route path="/films/:id">
              <Suspense fallback={<CircularProgress />}>
                <DetailsPage />
              </Suspense>
            </Route>
            <Route path="/dash">
              <Suspense fallback={<CircularProgress />}>
                <AnalysisPage />
              </Suspense>
            </Route>
          </div>
        </div>
      </Switch>

    </Router>
  );
}

export default App;
