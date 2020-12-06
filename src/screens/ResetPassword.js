import React, {useState, useEffect} from 'react';
import firebase from '../Firebase';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';

import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

const ResetPassword = (props) => {

    const [loading, setLoading] = useState(false);  //spinner制御用
    const [isPasswordResetEmailSent, setIsPasswordResetEmailSent] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const handleOnSubmit = (values) => {

        // パスワードリセットメールの送信
        firebase.auth().sendPasswordResetEmail(values.email).then(res => {
            //正常終了時
            if (isMounted) {
                setLoading(false);
                setIsPasswordResetEmailSent(true);
            }

        })
    }

    useEffect(() => {
        //mountされてる
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);

    if (isPasswordResetEmailSent) {
        return (
            <h1>パスワード再設定メールを送りました</h1>
        )
    } else {
        return (
            <div className="container">
                <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                    <p style={{ textAlign: 'center' }}>パスワードの再発行</p>
                    <Formik
                        initialValues={{ email: ''}}
                        onSubmit={(values) => handleOnSubmit(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('メールアドレスの形式ではありません。').required('必須項目です。'),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
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
                                    <div style={{ textAlign: 'center' }}>
                                        <Button color="primary" type="submit" disabled={loading}>
                                            <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!loading} />
                                            パスワードの再発行
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
}

export default ResetPassword;