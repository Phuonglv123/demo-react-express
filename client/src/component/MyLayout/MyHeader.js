import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from "reactstrap";
import {NavLink, withRouter} from "react-router-dom";
import Auth from "../../services/Auth";

class MyHeader extends Component {
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

    logout() {
        Auth.logout();
        this.props.history.push('/login')
        console.log(this.props)
    }

    render() {
        const auth = localStorage.getItem('AUTH');
        return (
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {auth ?
                            <Nav className="ml-auto" navbar>
                                <NavItem className='mt-2'>
                                    <NavLink to="/">Home</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className='ml-3'>
                                    <DropdownToggle nav caret>
                                        Options
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            Option 1
                                        </DropdownItem>
                                        <DropdownItem>
                                            Option 2
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem onClick={() => {
                                            this.logout()
                                        }}>
                                            logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav> : <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink to="/">Home</NavLink>
                                </NavItem>
                                <NavItem className='ml-3'>
                                    <NavLink to='/login'>
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem className='ml-3'>
                                    <NavLink to='/register'>
                                        Register
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        }
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default withRouter(MyHeader);
