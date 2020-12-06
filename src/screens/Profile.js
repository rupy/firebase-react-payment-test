import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../Firebase';

const Profile = () => {

    const user = firebase.auth().currentUser;
    console.log(user);

    return (
        <div className="container">
            <h1>プロフィール</h1>
            <h2>メールアドレス</h2>
            <p className="UserEmail">{user && user.email}</p>
            <p>メール認証：{user && user.emailVerified ? '認証済み': '未認証'}</p>
            <br/>
            <Link to="/">Homeへ</Link>
        </div>
    );
}

export default Profile;