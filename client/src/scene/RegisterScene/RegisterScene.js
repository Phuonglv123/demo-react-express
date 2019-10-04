import React, {Component} from 'react';
import MyLayout from "../../component/MyLayout/MyLayout";
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom';
import {decorate, observable} from "mobx";
import Passenger from "./Passenger";
import Driver from "./Driver";

class RegisterScene extends Component {

    typeAccount = false;

    render() {
        return (
            <MyLayout>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-center align-items-center">
                            <button onClick={() => this.typeAccount = false}>passenger</button>
                            <button onClick={() => this.typeAccount = true}>register</button>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        {this.typeAccount ? <Driver/> : <Passenger/>}
                    </div>
                </div>

            </MyLayout>
        );
    }
}

decorate(RegisterScene, {
    typeAccount: observable
});

export default inject('AuthStore')(withRouter(observer(RegisterScene)))
