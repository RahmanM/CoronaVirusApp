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
        this.setState({ search: search });
    }

    // NB: The way to pass parameter to router without re-creating the whole component is via Render
    // NOTE: Doing so is also possible ->  <Route exact path='/' component={() => <Countries countryFilter={this.state.search} />} />
    // However, this will recreate the component everytime while will not be ideal if a lot to be rendered

    render() {
        return (
            <div className="imaged-div">
                <div className="trans-div">
                    <NavMenu onCountrySearch={(s) => this.onCountrySearch(s)} />
                    <Container>
                        <Switch>
                            <Route exact path='/' render={(props) => <Countries {...props} countryFilter={this.state.search} />}  />
                            <Route exact path='/CountryDetails' component={CountryDetails} />
                        </Switch>
                    </Container>
                </div>
            </div>
        );
    }
}
