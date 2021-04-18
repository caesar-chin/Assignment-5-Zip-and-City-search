import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "../Styles/CityStyles.module.css";

function Zip({ data }) {
  return (
    <div className={styles.cities}>
      <div> Zip: {data}</div>
    </div>
  );
}

function CitySearchField({ City, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={City}
        placeholder="Enter City"
        onChange={onChange}
      ></input>
    </div>
  );
}

export default class ZipCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcodes: [],
      City: "",
    };
  }

  cityChanged = (event) => {
    let City = event.target.value.toUpperCase();
    if (City.length > 0) {
      fetch(`http://ctp-zip-api.herokuapp.com/city/${City}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({ zipcodes: json });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ zipcodes: [] });
        });
    } else {
      this.setState({ zipcodes: [] });
    }
    this.setState({ City: City });
  };

  render() {
    return (
      <div>
        <div className={styles.title}>
          <h1 className={styles.titleText}>City Lookup</h1>
        </div>
        <nav className={styles.navbar}>
          <div className={styles.navbarDiv}>
            <Link to={"/city"} className={styles.navbarLinkZipCode}>
              <div className={styles.navbarItem}>
                <li>City Lookup:</li>
                <CitySearchField
                  City={this.state.City}
                  onChange={(e) => this.cityChanged(e)}
                />
              </div>
            </Link>
          </div>

          <div className={styles.navbarDiv}>
            <Link to={"/zip"} className={styles.navbarLinkZip}>
              <div className={styles.navbarItem}>
                <li>Zip Code Lookup</li>
              </div>
            </Link>
          </div>
        </nav>
        {this.state.zipcodes.length === 0 ? (
          <h3> No results</h3>
        ) : (
          this.state.zipcodes.map((e, index) => {
            return (
              <div key={index}>
                <Zip data={e} />
              </div>
            );
          })
        )}
      </div>
    );
  }
}
