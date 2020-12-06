import React from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Home = () => {

    const handleLogout = () => {
        firebase.auth().signOut();
    }

    return (
        <div className="container">
            <p>Home</p>
            <Link to="/profile">Profileへ</Link>
            <br />
            <br />
            <Button onClick={handleLogout}>ログアウト</Button>
        </div>
    );
}

export default Home;