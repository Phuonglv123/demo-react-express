import React, {Component} from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,} from 'reactstrap';
import {NavLink} from "react-router-dom";

class MyLayout extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const auth = localStorage.getItem('AUTH');
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <Container>
                        <NavbarBrand href="/">reactstrap</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {/*{auth ?*/}
                            {/*    <Nav className="ml-auto" navbar>*/}
                            {/*        <NavItem>*/}
                            {/*            <NavLink to="/">Home</NavLink>*/}
                            {/*        </NavItem>*/}
                            {/*        <NavItem>*/}
                            {/*            <NavLink to={undefined}>logout</NavLink>*/}
                            {/*        </NavItem>*/}
                            {/*    </Nav> : <Nav className="ml-auto" navbar>*/}
                            {/*        <NavItem>*/}
                            {/*            <NavLink to="/">Home</NavLink>*/}
                            {/*        </NavItem>*/}
                            {/*        <NavItem className='ml-3'>*/}
                            {/*            <NavLink to='/login'>*/}
                            {/*                Login*/}
                            {/*            </NavLink>*/}
                            {/*        </NavItem>*/}
                            {/*        <NavItem className='ml-3'>*/}
                            {/*            <NavLink to='/register'>*/}
                            {/*                Register*/}
                            {/*            </NavLink>*/}
                            {/*        </NavItem>*/}
                            {/*    </Nav>*/}
                            {/*}*/}
                        </Collapse>
                    </Container>
                </Navbar>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default MyLayout;
