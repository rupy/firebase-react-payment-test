import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './Firebase';

//screens
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Register from './screens/Register';
import ResetPassword from './screens/ResetPassword';
import Header from './components/Header';
import Toolbar from '@material-ui/core/Toolbar';

import Footer from './components/Footer';

import Auth from './Auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));


function App() {
  const classes = useStyles();
  
  return (
    <>
      <div>
      <Header />
          <Router>
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/reset_password" component={ResetPassword} />
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
      </div>
      <Footer />
    </>
  );
}

export default App;
