import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './Firebase';

//screens
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

import Auth from './Auth';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        {/* 以下認証のみ */}
        <Auth>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route render={() => <p>not found.</p>} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  );
}

export default App;
