import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import LoadingOverlay from 'react-loading-overlay';
import { useAuthState } from 'react-firebase-hooks/auth';

const Auth = (props) => {

    const [user, initialising, error] = useAuthState(firebase.auth());
    //チェックが終わってないなら（ローディング表示）
    if (initialising) {
        return (
            <LoadingOverlay
                active={true}
                spinner
                text='ロード中...'
            >
                <div style={{ height: '100vh', width: '100vw' }}></div>
            </ LoadingOverlay>
        );
    }

    //チェックが終わりかつ
    if (user) {
        //サインインしてるとき（そのまま表示）
        return props.children;
    } else {
        //してないとき（ログイン画面にリダイレクト）
        return <Redirect to="/signin" />
    }
}

export default Auth;