import Dashboard from "@material-ui/icons/Dashboard";
import HomePage from 'views/HomePage';
import SearchResultsPage from 'views/SearchResultsPage';
import DetailsPage from 'views/DetailsPage';
import AnalysisPage from 'views/AnalysisPage'
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TheatersIcon from '@material-ui/icons/Theaters';
const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: MovieIcon,
    component: HomePage,
  },
  {
    path: "/search",
    name: "Search",
    icon: SearchIcon,
    component: SearchResultsPage,
  },
  {
    path: "/films",
    name: "Films",
    icon: TheatersIcon,
    component: DetailsPage,
  },
  {
    path: "/dash",
    name: "Dashboard",
    icon: Dashboard,
    component: AnalysisPage,
  }
  

];

export default dashboardRoutes;