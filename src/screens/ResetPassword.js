import React, {useState, useEffect, useRef} from 'react';
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ResetPassword = (props) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);  //spinner制御用
    const [isPasswordResetEmailSent, setIsPasswordResetEmailSent] = useState(false);

    const handleOnSubmit = (values) => {

        setLoading(true);

        // パスワードリセットメールの送信
        firebase.auth().sendPasswordResetEmail(values.email).then(res => {
            setLoading(false);
            setIsPasswordResetEmailSent(true);
        })
    }

    if (isPasswordResetEmailSent) {
        return (
            <h1>パスワード再設定メールを送りました</h1>
        )
    } else {

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        パスワードのリセット
                    </Typography>
                    <Formik
                        initialValues={{ email: ''}}
                        onSubmit={(values) => handleOnSubmit(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('メールアドレスの形式ではありません。').required('必須項目です。'),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                <form className={classes.form}  onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="メールアドレス"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && errors.email ? true : false}
                                        helperText={errors.email}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={loading}
                                    >
                                        {loading && <CircularProgress size="1rem"/> }パスワードのリセット
                                    </Button>
                                    <Link href="/signin">
                                        アカウントを既に持っている場合はこちらからログイン
                                    </Link>
                                </form>
                            )
                        }
                    </Formik>
                </div>
            </Container>
        );

    }
}

export default ResetPassword;