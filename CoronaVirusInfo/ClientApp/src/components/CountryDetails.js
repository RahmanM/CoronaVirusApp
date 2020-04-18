import React, { Component } from "react";
import "./style.css";
import { Line, Doughnut } from "react-chartjs-2";
import _ from "lodash";
import Progressbar from "./Progressbar"
import Select from 'react-select';
import loaderImage from "./loading.gif"


class CountryDetails extends Component {

    constructor() {
        super();
        this.state = {
            totalInfected: [],
            infectedPerDay: [],
            death: [],
            todaysDeath: [],
            recovered: [],
            country: {},
            donutData: {},
            countriesDropdown: [],
            selectedCountry: null
        };
    }

    componentDidMount() {

        if (this.props.location.state) {
            var countryCode = this.props.location.state.countryCode;
            //this.setState({ selectedFilter: countryCode });
            this.setChartData(countryCode)
        }

        this.populateCountriesDropdown();
    }

    populateCountriesDropdown() {
        fetch("CoronaInfo/GetCountries")
            .then(res => res.json())
            .then(
                (countries) => {
                    this.setState({ countriesDropdown: countries });
                }, (err) => {
                    console.log(err);
                }
            );
    }

    onCountrySelect(c) {
        this.setChartData(c.value);
        this.setState({selectedCountry: c})
    }

    setChartData(countryCode) {

        fetch("CoronaInfo/" + countryCode)
            .then(res => res.json())
            .then(
                (data) => {

                    if (data) {
                        var today = data[data.length - 1].countryCoronaInfo;

                        var country = data[0].countryCoronaInfo;

                        this.setState({ country: country })

                        var dates = _.map(data, "date");
                        var totalInfected = _.map(data, s => {
                            return s.countryCoronaInfo.cases;
                        });

                        var totalInfectedData = {
                            labels: dates,
                            datasets: [
                                {
                                    label: "Total infected",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "white",
                                    borderColor: "red",
                                    borderCapStyle: "butt",
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: "miter",
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: totalInfected
                                }
                            ]
                        };

                        this.setState({ totalInfected: totalInfectedData });

                        // Infected per day
                        var infectedPerDay = _.map(data, s => {
                            return s.countryCoronaInfo.todayCases;
                        });

                        var infectedPerDayData = {
                            labels: dates,
                            datasets: [
                                {
                                    label: "Cases Per Day",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "white",
                                    borderColor: "rgba(75,192,192,1)",
                                    borderCapStyle: "butt",
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: "miter",
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: infectedPerDay
                                }
                            ]
                        };

                        this.setState({ infectedPerDay: infectedPerDayData });

                        // Death
                        var deaths = _.map(data, s => {
                            return s.countryCoronaInfo.deaths;
                        });

                        var deathsData = {
                            labels: dates,
                            datasets: [
                                {
                                    label: "Deaths",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "white",
                                    borderColor: "red",
                                    borderCapStyle: "butt",
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: "miter",
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: deaths
                                }
                            ]
                        };

                        this.setState({ deaths: deathsData });

                        // Death
                        var todaysDeath = _.map(data, s => {
                            return s.countryCoronaInfo.todayDeaths;
                        });

                        var todaysDeathData = {
                            labels: dates,
                            datasets: [
                                {
                                    label: "Deaths per day",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "white",
                                    borderColor: "red",
                                    borderCapStyle: "butt",
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: "miter",
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: todaysDeath
                                }
                            ]
                        };

                        this.setState({ todaysDeath: todaysDeathData });

                        // Recovered
                        var recovered = _.map(data, s => {
                            return s.countryCoronaInfo.recovered;
                        });

                        var recoveredData = {
                            labels: dates,
                            datasets: [
                                {
                                    label: "Recovered",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "white",
                                    borderColor: "green",
                                    borderCapStyle: "butt",
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: "miter",
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: recovered
                                }
                            ]
                        };

                        this.setState({ recovered: recoveredData });

                        // Donut
                        const donutData = {
                            labels: [
                                'Active',
                                'Recovered',
                                'Death'
                            ],
                            datasets: [{
                                data: [today.active, today.recovered, today.deaths],
                                backgroundColor: [
                                    'orange',
                                    'green',
                                    'red'
                                ],
                                hoverBackgroundColor: [
                                    'orange',
                                    'green',
                                    'red'
                                ]
                            }]
                        };

                        this.setState({ donut: donutData });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    toLowerCase = (code) => {
        return code ? code.toLowerCase() : '';
    }

    render() {

        //console.log("render", this.state.country)

        if (!this.state.country || !this.state.country.countryInfo) {
           return (<Progressbar show={this.state.country} imageUrl={loaderImage} height="90" width="90" alignment="middle" alttext="Loading..." />);
        }

        return (

            <div>

                <div className="country-detail-info">
                    <div className="country f32">
                        <span className={"flag " + this.toLowerCase(this.state.country.countryInfo.iso2)}></span>

                        <span className="country-detail-name">{this.state.country.country} </span>

                    </div>

                    <div className="countries-dropdown">
                        <Select
                            options={this.state.countriesDropdown}
                            onChange={(o) => this.onCountrySelect(o)}
                            value={this.state.selectedCountry}
                            placeholder="Select another country"
                        />
                    </div>
                </div>

                <div className="widget-wrapper">


                    <div className="chart-widget box-shadow">
                        <Line
                            data={this.state.totalInfected}
                            height={250}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>

                    <div className="chart-widget box-shadow">
                        <Line
                            data={this.state.infectedPerDay}
                            height={250}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>

                    <div className="chart-widget box-shadow">
                        <Line
                            data={this.state.deaths}
                            height={250}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>

                    <div className="chart-widget box-shadow">
                        <Line
                            data={this.state.todaysDeath}
                            height={250}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>


                    <div className="chart-widget box-shadow">
                        <Line
                            data={this.state.recovered}
                            height={250}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>

                    <div className="chart-widget box-shadow">
                        <Doughnut data={this.state.donut} />
                    </div>

                </div>

            </div >
        );
    }


}

export default CountryDetails;
