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
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const SignIn = (props) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);  //spinner制御用

    const handleOnSubmit = (values) => {
        //spinner表示開始
        setLoading(true);
        //サインイン（ログイン）処理
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                //正常終了時
                props.history.push("/");
                setLoading(false);
            })
            .catch(error => {
                //異常終了時
                setLoading(false);
                alert(error);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    サインイン
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('メールアドレスの形式ではありません。').required('必須項目です。'),
                        password: Yup.string().required('必須項目です。').min(6, 'パスワードは最低6文字です。'),
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
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="パスワード"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && errors.password ? true : false}
                                    helperText={errors.password}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    サインイン
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/reset_password">
                                            パスワードを忘れた場合
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup">
                                            アカウントの新規登録
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        )
                    }
                </Formik>
            </div>
        </Container>
    );
}

export default withRouter(SignIn);