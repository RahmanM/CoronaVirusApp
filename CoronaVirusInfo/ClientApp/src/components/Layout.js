import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import  Countries from './Countries';
import CountryDetails from './CountryDetails';
import { Route, Switch } from 'react-router';


export class Layout extends Component {

    constructor() {
        super();
        this.state = {
            search: ''
        };
    }

    onCountrySearch = (search) => {
        this.setState({search: search})
    }

    render() {
        return (
            <div className="imaged-div">
                <div className="trans-div">
                    <NavMenu onCountrySearch={(s) => this.onCountrySearch(s)} />
                    <Container>
                        <Switch>
                            <Route exact path='/' component={() => <Countries countryFilter={this.state.search} />} />
                            <Route exact path='/CountryDetails' component={CountryDetails} />
                        </Switch>
                    </Container>
                </div>
            </div>
        );
    }
}
