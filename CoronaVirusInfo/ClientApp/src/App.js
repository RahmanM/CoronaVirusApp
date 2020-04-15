import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import CountryDetails from "./components/CountryDetails";
import './custom.css'
import Countries from './components/Countries';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
            </Layout>
        );
    }
}
