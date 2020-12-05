import React from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Register extends React.Component {

    handleLogout = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <div className="container">
                <p>メールをお送りしました</p>
                <Link to="/">Homeへ</Link>
            </div>
        );
    }
}

export default Register;