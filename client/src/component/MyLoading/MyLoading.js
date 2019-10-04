import React, {Component} from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

class MyLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }


    render() {
        const myStyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"
        };
        return (
            <div style={myStyle}>
                <PropagateLoader
                    sizeUnit={"px"}
                    size={15}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default MyLoading;
