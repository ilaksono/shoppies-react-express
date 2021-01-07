import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from 'views/HomePage';
import Logo from 'components/Logo';
function App() {
  return (
    <div>
      <Logo />
      <Router>
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
