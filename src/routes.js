import Dashboard from "@material-ui/icons/Dashboard";
import HomePage from 'views/HomePage';
import SearchResultsPage from 'views/SearchResultsPage';

const dashboardRoutes = [
  {
    path: "/",
    name: "Home",
    icon: Dashboard,
    component: HomePage,
  },
  {
    path: "/search",
    name: "Search",
    icon: Dashboard,
    component: SearchResultsPage,
  },
  

];

export default dashboardRoutes;