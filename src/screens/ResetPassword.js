import React from 'react';
import firebase from '../Firebase';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';

import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';


class ResetPassword extends React.Component {

    state = {
        loading: false, //spinner制御用
        isPasswordResetEmailSent: false,
    }

    _isMounted = false;

    handleOnSubmit = (values) => {

        // パスワードリセットメールの送信
        firebase.auth().sendPasswordResetEmail(values.email).then(res => {
            //正常終了時
            if (this._isMounted) this.setState({ loading: false, isPasswordResetEmailSent: true });
        })
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        if (this.state.isPasswordResetEmailSent) {
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
                            onSubmit={(values) => this.handleOnSubmit(values)}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required(),
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
                                            <Button color="primary" type="submit" disabled={this.state.loading}>
                                                <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading} />
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
}

export default ResetPassword;