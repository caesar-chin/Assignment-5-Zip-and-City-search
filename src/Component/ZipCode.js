import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "../Styles/ZipCodeStyles.module.css";

function City({ data }) {
  return (
    <div className={styles.cities}>
      <div>
        City: {data.City}, {data.State}
      </div>
      <ul className={styles.citylist}>
        <li>
          Location:({data.Lat},{data.Long})
        </li>
        <li>Estimated Population: {data.EstimatedPopulation}</li>
      </ul>
    </div>
  );
}

function ZipSearchField({ zipCode, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={zipCode}
        placeholder="Enter Zip Code"
        onChange={onChange}
      ></input>
    </div>
  );
}

export default class ZipCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      zipCode: "",
    };
  }

  zipChanged = (event) => {
    let zipCode = event.target.value;
    if (zipCode.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({ cities: json });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ cities: [] });
        });
    } else {
      this.setState({ cities: [] });
    }
    this.setState({ zipCode: zipCode });
  };

  render() {
    return (
      <div>
        <div className={styles.title}>
          <h1 className={styles.titleText}>Zip Code Lookup</h1>
        </div>
        <nav className={styles.navbar}>
          <div className={styles.navbarDiv}>
            <Link to={"/zipcode"} className={styles.navbarLinkZipCode}>
              <div className={styles.navbarItem}>
                <li>Zip Code Lookup:</li>
                <ZipSearchField
                  zipCode={this.state.zipCode}
                  onChange={(e) => this.zipChanged(e)}
                />
              </div>
            </Link>
          </div>
          
          <div className={styles.navbarDiv}>
            <Link to={"/city"} className={styles.navbarLinkCity}>
              <div className={styles.navbarItem}>
                <li>City Lookup</li>
              </div>
            </Link>
          </div>
        </nav>
        {this.state.cities.length === 0 ? (
          <h3> No results</h3>
        ) : (
          this.state.cities.map((e, index) => {
            return (
              <div key={index}>
                <City data={e} />
              </div>
            );
          })
        )}
      </div>
    );
  }
}
