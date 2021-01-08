import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from 'views/HomePage';
import {useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';
import AppContext from 'AppContext';
import NavBar from 'components/NavBar';
function App() {

  const [cookies] = useCookies();
  const {
    loadUser
  } = useContext(AppContext);
  useEffect(() => {
    if (cookies.username && cookies.id)
      loadUser(cookies.username, cookies.id);
  }, []);
  return (
    <div>
      <Router>
      <NavBar/>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
