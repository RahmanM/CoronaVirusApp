import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./style.css";

class Country extends Component {

    toLowerCase = (code) => {
        return code ? code.toLowerCase() : '';
    }

    render() {
        return (
            <div key={this.props.coronaInfo.rank} className="info-wrapper box-shadow">
                <div className="country f16">
                    <span className={"flag " + this.toLowerCase(this.props.coronaInfo.countryInfo.iso2)}></span>

                    <Link to={{
                        pathname: '/CountryDetails',
                        state: {
                            countryCode: this.props.coronaInfo.countryInfo.iso2
                        }
                    }}><span className="country-name">{this.props.coronaInfo.country + " (" + this.props.coronaInfo.rank + ")"} </span></Link>

                </div>

                <div className="left">
                    <div className="info">
                        <span className="label alarm">Cases</span>
                        <span className="number">{this.props.coronaInfo.cases}</span>
                    </div>

                    <div className="info">
                        <span className="label danger">Todays Cases</span>
                        <span className="number">{this.props.coronaInfo.todayCases}</span>
                    </div>
                    <div className="info">
                        <span className="label alarm">Death</span>
                        <span className="number">{this.props.coronaInfo.deaths}</span>
                    </div>
                    <div className="info">
                        <span className="label danger">Today's death</span>
                        <span className="number">{this.props.coronaInfo.todayDeaths}</span>
                    </div>
                </div>

                <div className="right">
                    <div className="info">
                        <span className="label recover">Recovered</span>
                        <span className="number">{this.props.coronaInfo.recovered}</span>
                    </div>
                    <div className="info">
                        <span className="label alarm">Active</span>
                        <span className="number">{this.props.coronaInfo.active}</span>
                    </div>
                    <div className="info">
                        <span className="label">Critical</span>
                        <span className="number">{this.props.coronaInfo.critical}</span>
                    </div>
                    <div className="info">
                        <span className="label">Cases/Million</span>
                        <span className="number">
                            {this.props.coronaInfo.casesPerOneMillion}
                        </span>
                    </div>
                    <div className="info">
                        <span className="label">Death/Million</span>
                        <span className="number">
                            {this.props.coronaInfo.deathsPerOneMillion}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Country;
