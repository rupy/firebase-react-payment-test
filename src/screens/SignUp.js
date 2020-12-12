import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
      </Typography>
    );
}

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

const SignUp = (props) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);  //spinner制御用

    //Submitされたら
    const handleOnSubmit = (values) => {

        //spinner表示開始
        setLoading(true);

        //新規登録処理
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(res => {
                //正常終了時
                const user = firebase.auth().currentUser;
                if (!user.emailVerified) user.sendEmailVerification();        
                //spinner表示終了
                setLoading(false);
                //Registerに移動
                props.history.push("/register"); //history.pushを使うためwithRouterしている
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
                    アカウントの新規登録
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '', passwordConfirm: '', tel: '' }}
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('メールアドレスの形式ではありません。').required('必須項目です。'),
                        password: Yup.string().required('必須項目です。').min(6, 'パスワードは最低6文字です。'),
                        passwordConfirm: Yup.string().required('必須項目です。').oneOf([Yup.ref('password')], 'passwordが一致しません。').min(6, 'パスワードは最低6文字です。'),
                        tel: Yup.string().required('必須項目です。'),
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
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="パスワード"
                                    type="password"
                                    id="passwordConfirm"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.passwordConfirm && errors.passwordConfirm ? true : false}
                                    helperText={errors.passwordConfirm}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="tel"
                                    label="電話番号"
                                    name="tel"
                                    autoComplete="tel"
                                    autoFocus
                                    value={values.tel}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.tel && errors.tel ? true : false}
                                    helperText={errors.tel}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    登録
                                </Button>
                                <Link href="/signin">
                                    ログインはこちら
                                </Link>
                            </form>
                        )
                    }
                </Formik>
            </div>
        </Container>
    );    
}

export default withRouter(SignUp);