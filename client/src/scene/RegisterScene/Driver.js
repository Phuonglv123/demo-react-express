import React, {Component} from 'react';
import ToastNotify from "../../component/ToastNotify/ToastNotify";

class Driver extends Component {

    onChange = e => this.props.AuthStore.onChange(e.target.value, e.target.name);

    handleSubmitForm = (e) => {
        e.preventDefault();
        const {username, password, firstname, lastname, phone, birthday, email} = this.props.AuthStore.user;
        this.props.AuthStore.registerDriver({
            username, password, firstname, lastname, phone, birthday, email
        })
            .then(() => {
                this.props.history.push('/login');
                ToastNotify.MyToast('success', 'Register to success', 'top-end')
            });
    };

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-6 login-form mx-auto'>
                        <h3>Driver register to example react mobx</h3>
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
            </div>
        );
    }
}

export default Driver;
