import React, {useState, useEffect, useRef} from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

const SignIn = (props) => {

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
        <div className="container">
            <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                <p style={{ textAlign: 'center' }}>サインイン</p>
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
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="email">メール</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.email && errors.email ? true : false}
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
                                    />
                                    <FormFeedback>
                                        {errors.password}
                                    </FormFeedback>
                                </FormGroup>
                                <div style={{ textAlign: 'center' }}>
                                    <Button color="primary" type="submit" disabled={loading}>
                                        <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!loading} />
                                        ログイン
                                    </Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                <p>新規登録は<Link to="/signup">こちら</Link>。</p>
                <p>パスワードの再発行は<Link to="/reset_password">こちら</Link>。</p>
            </div>
        </div>
    );
}

export default withRouter(SignIn);