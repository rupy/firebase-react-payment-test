import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../Firebase';

class Profile extends React.Component {

    state = {
        user: null
    }

    componentDidMount = () => {
        const user = firebase.auth().currentUser;
        this.setState({ user });
        console.log(user);
    }
    render() {
        return (
            <div className="container">
                <h1>プロフィール</h1>
                <h2>メールアドレス</h2>
                <p className="UserEmail">{this.state.user && this.state.user.email}</p>
                <p>メール認証：{this.state.user && this.state.user.emailVerified ? '認証済み': '未認証'}</p>
                <br/>
                <Link to="/">Homeへ</Link>
            </div>
        );
    }
}

export default Profile;