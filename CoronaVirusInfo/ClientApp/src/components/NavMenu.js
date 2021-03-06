import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import './NavMenu.css';
import coronaImage from "./coronavirus.png"

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header className="my-container">
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <div>
                            
                        </div>
                        <NavbarBrand tag={Link} to="/">
                            <img className="brand-image" src={coronaImage} alt="Corona" />
                            Corona Virus Info
                        </NavbarBrand>
                        <div className="search-box">
                            <input onChange={(s) => this.props.onCountrySearch(s.target.value)} type="text" className="form-control" id="search" placeholder="Search..." />
                        </div>

                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
