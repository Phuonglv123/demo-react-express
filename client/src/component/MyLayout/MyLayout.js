import React, {Component} from 'react';
import MyHeader from "./MyHeader";

class MyLayout extends Component {
    render() {
        return (
            <div>
                <MyHeader/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default MyLayout;
