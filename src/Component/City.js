import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from '../Styles/CityStyles.module.css';

export default class City extends Component {
  render() {
    return (
      <div>
        <div className={styles.title}>
          <h1 className={styles.titleText}>City Lookup</h1>
        </div>

        <nav className={styles.navbar}>
          <div className={styles.navbarDiv}>
            <Link to={'/zipcode'} className={styles.navbarLinkZipCode}>
              <div className={styles.navbarItem}>
                <li>Zip Code Lookup</li>
              </div>
            </Link>
          </div>

          <div className={styles.navbarDiv}>
            <Link to={'/city'} className={styles.navbarLinkCity}>
              <div className={styles.navbarItem}>
                <li>City Lookup</li>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
