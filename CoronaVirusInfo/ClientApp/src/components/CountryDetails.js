import React, { Component } from "react";
import "./style.css";
import { Line } from "react-chartjs-2";
import _ from "lodash";

class CountryDetails extends Component {

    constructor() {
        super();
        this.state = {
            totalInfected: [],
            infectedPerDay: [],
            death: [],
            todaysDeath: [],
            recovered: []
        };
    }

    componentDidMount() {

        if (this.props.location.state) {
            var countryCode = this.props.location.state.countryCode;

            fetch("CoronaInfo/" + countryCode)
                .then(res => res.json())
                .then(
                    (data) => {

                        if (data) {

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
                                        label: "Todays Deaths",
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

    }

    render() {
        return (
            <div>
                <div>
                    <Line
                        data={this.state.totalInfected}
                        width={100}
                        height={250}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

                <div>
                    <Line
                        data={this.state.infectedPerDay}
                        width={100}
                        height={250}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

                <div>
                    <Line
                        data={this.state.deaths}
                        width={100}
                        height={250}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

                <div>
                    <Line
                        data={this.state.todaysDeath}
                        width={100}
                        height={250}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>


                <div>
                    <Line
                        data={this.state.recovered}
                        width={100}
                        height={250}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

            </div>
        );
    }


}

export default CountryDetails;
