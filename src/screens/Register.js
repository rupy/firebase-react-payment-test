import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    return (
        <div className="container">
            <p>メールをお送りしました</p>
            <Link to="/">Homeへ</Link>
        </div>
    );
}

export default Register;