import Dashboard from "@material-ui/icons/Dashboard";
import HomePage from 'views/HomePage';
import SearchResultsPage from 'views/SearchResultsPage';
import DetailsPage from 'views/DetailsPage';
const dashboardRoutes = [
  {
    path: "/home",
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
  {
    path: "/films",
    name: "Films",
    icon: Dashboard,
    component: DetailsPage,
  },
  

];

export default dashboardRoutes;