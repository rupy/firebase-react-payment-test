import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

const SignUp = (props) => {

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
        <div className="container">
            <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                <p style={{ textAlign: 'center' }}>新規登録</p>
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
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">メールアドレス</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.email && errors.email ? true : false}
                                        placeholder="メールアドレスを入力"
                                    />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">パスワード</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.password && errors.password ? true : false}
                                        placeholder="パスワードを入力"
                                    />
                                    <FormFeedback>
                                        {errors.password}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="passwordConfirm">パスワード確認</Label>
                                    <Input
                                        type="password"
                                        name="passwordConfirm"
                                        id="passwordConfirm"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.passwordConfirm && errors.passwordConfirm ? true : false}
                                        placeholder="パスワードを入力"
                                    />
                                    <FormFeedback>
                                        {errors.passwordConfirm}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="tel">電話番号</Label>
                                    <Input
                                        type="tel"
                                        name="tel"
                                        id="tel"
                                        value={values.tel}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.tel && errors.tel ? true : false}
                                    />
                                    <FormFeedback>
                                        {errors.tel}
                                    </FormFeedback>
                                </FormGroup>
                                <div style={{ textAlign: 'center' }}>
                                    <Button color="success" type="submit" disabled={loading}>
                                        <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!loading} />
                                        新規登録
                                    </Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                <p>ログインは<Link to="/signin">こちら</Link>。</p>
            </div>

        </div>
    );
}

export default withRouter(SignUp);