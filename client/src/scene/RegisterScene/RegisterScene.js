import React, {Component} from 'react';
import MyLayout from "../../component/MyLayout/MyLayout";
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';
import ToastNotify from "../../component/ToastNotify/ToastNotify";

class RegisterScene extends Component {

    onChange = e => this.props.AuthStore.onChange(e.target.value, e.target.name);

    handleSubmitForm = (e) => {
        e.preventDefault();
        const {username, password, confirmedpassword, firstname, lastname, phone, birthday, email} = this.props.AuthStore.user;
        this.props.AuthStore.registerPassenger({
            username,
            password,
            confirmedpassword,
            firstname,
            lastname,
            phone,
            birthday,
            email
        })
            .then(() => {
                this.props.history.push('/login');
                ToastNotify.MyToast('success', 'Register to success', 'top-end')
            });
    };

    render() {
        return (
            <MyLayout>
                <div className='row'>
                    <div className='col-md-6 login-form mx-auto'>
                        <h3>Login to example react mobx</h3>
                        <form className='mt-5' onSubmit={this.handleSubmitForm}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='username'
                                    className='form-control'
                                    placeholder='Your Username'
                                    // value={username}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='password'
                                    className='form-control'
                                    placeholder='Password'
                                    // value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='confirmedpassword'
                                    className='form-control'
                                    placeholder='Confirmed Password'
                                    // value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='firstname'
                                    className='form-control'
                                    placeholder='First name'
                                    // value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='lastname'
                                    className='form-control'
                                    placeholder='Last name'
                                    // value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='phone'
                                    className='form-control'
                                    placeholder='Phone'
                                    // value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='birthday'
                                    className='form-control'
                                    placeholder='Birthday'
                                    // value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='email'
                                    className='form-control'
                                    placeholder='Email'
                                    // value={password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='submit'
                                    className='btn btn-primary btn-block'
                                    value='register'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </MyLayout>
        );
    }
}

export default inject('AuthStore')(withRouter(observer(RegisterScene)))
