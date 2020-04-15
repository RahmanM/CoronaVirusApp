import React, { Component } from "react";
import Country from "./Country";
import "./style.css";
import Progressbar from "./Progressbar"

class Countries extends Component {

    constructor() {
        super();
        this.state = {
            countries: [],
            filter: ''
        };
    }

    componentDidMount() {
        this.populateWeatherData()
    }

    async populateWeatherData() {
        const response = await fetch('CoronaInfo');
        const data = await response.json();
        this.setState({ countries: data });
    }

    render() {
        var topCounries = this.state.countries;

        var url =
            "https://stackblitz.com/files/react-spinner-sample/github/RahmanM/react-spinner-sample/master/loading.gif";

        if (!topCounries || topCounries.length <= 0) {
            return (<Progressbar show={!topCounries || topCounries.length <= 0} imageUrl={url} height="90" width="90" alignment="middle" alttext="Loading..." />);
        }

        var countries = 
            topCounries
                .filter(c => c.country.toLowerCase().indexOf(this.props.countryFilter.toLowerCase()) > -1)
                .map(country => {
                    return <Country key={country.rank} coronaInfo={country} />;
                });

        return <div className="wrapper">{countries}</div>;
    }
}

export default Countries;
