import React, { Component } from "react";
import Country from "./Country";
import "./style.css";
import Progressbar from "./Progressbar";
import Select from 'react-select';
//import "react-dropdown/style.css";

class Countries extends Component {

    constructor() {
        super();
        this.state = {
            countries: [],
            filter: '',
            filters: [],
            selectedFilter: null
        };
    }

    componentDidMount() {

        this.populateFilters();

        if (!this.state.countries || this.state.countries.length <= 0) {
            this.populateCountriesData()
        }

    }

    populateFilters() {

        var filters = [];
        filters.push({ value: "Cases", label: "Cases Ascending" });
        filters.push({ value: "-Cases", label: "Cases Descending" });
        filters.push({ value: "TodayCases", label: "Today Cases Ascending" });
        filters.push({ value: "-TodayCases", label: "Today Cases Descending" });
        filters.push({ value: "Deaths", label: "Deaths Ascending" });
        filters.push({ value: "-Deaths", label: "Deaths Descending" });
        filters.push({ value: "TodayDeaths", label: "Today's Deaths Ascending" });
        filters.push({ value: "-TodayDeaths", label: "Today's Deaths Descending" });
        filters.push({ value: "Recovered", label: "Recovered Ascending" });
        filters.push({ value: "-Recovered", label: "Recovered Descending" });
        filters.push({ value: "Active", label: "Active Ascending" });
        filters.push({ value: "-Active", label: "Active Descending" });
        filters.push({ value: "Critical", label: "Critical Ascending" });
        filters.push({ value: "-Critical", label: "Critical Descending" });
        filters.push({ value: "CasesPerOneMillion", label: "Cases Per One Million Ascending" });
        filters.push({ value: "-CasesPerOneMillion", label: "Cases Per One Million Descending" });
        filters.push({ value: "DeathsPerOneMillion", label: "Deaths Per One Million Ascending" });
        filters.push({ value: "-DeathsPerOneMillion", label: "Deaths Per One Million Descending" });

        this.setState({ filters: filters })
    }

    async populateCountriesData() {
        const response = await fetch('CoronaInfo');
        const data = await response.json();
        this.setState({ countries: data });
    }

    onFilterSelect(option) {
        this.setState({ countries: null });

        fetch("CoronaInfo/GetSorted?sorts=" + option.value)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({ countries: data });
                this.setState({ selectedFilter: option });
            });
    }

    async populateCountriesDataOrdered(order) {
        const response = await fetch("CoronaInfo/GetSorted?sorts=" + order);
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
                    return <Country key={country.country} coronaInfo={country} />;
                });

        return (
            <div>
                <div className="sort-filters">
                    <Select
                        options={this.state.filters}
                        onChange={(o) => this.onFilterSelect(o)}
                        placeholder="Sory By"
                        value={this.state.selectedFilter}
                    />
                </div>
                <div className="wrapper">{countries}</div>
            </div>
        );
    }
}

export default Countries;
