import Dashboard from "@material-ui/icons/Dashboard";
import HomePage from 'views/HomePage';
import SearchResultsPage from 'views/SearchResultsPage';
import DetailsPage from 'views/DetailsPage';
import AnalysisPage from 'views/AnalysisPage'
import MovieIcon from '@material-ui/icons/Movie';
import TheatersIcon from '@material-ui/icons/Theaters';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

const dashboardRoutes = [
  {
    path: "/home",
    name: "Root",
    icon: MovieIcon, 
    component: HomePage,
  },
  {
    path: "/search",
    name: "Results",
    icon: FormatListNumberedIcon,
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