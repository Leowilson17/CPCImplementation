import * as React from "react";
import styles from './CpcDashboard.module.scss';
const pencilIcon = require("../../../ExternalRef/icons/edit@2x.png");
const textBoxIcon = require("../../../ExternalRef/icons/Textbox@2x.png");
const calendarIcon = require("../../../ExternalRef/icons/calendar@2x.png");
const badgeIcon = require("../../../ExternalRef/icons/Raggruppa.png");
const textDocIcon =require('../../../ExternalRef/icons/RaggruppaText@2x.png')
const overLayImage = require('../../../ExternalRef/images/Raggruppa@2x.png');
const overLayImageBottomRight = require('../../../ExternalRef/images/Raggruppades bottom@2x.png');
const bellIcon = require('../../../ExternalRef/icons/bell@2x.png')



const App = (props) => {
    return (
      <div>
        <div className={styles.mainContainer}> 
        {/* Overlay position top*/}
        {/* left side */}
          <div className={styles.overLayPosition}>
            <div className={styles.overlayImageTopLeft}>
              <img src={`${overLayImage}`} alt="" />
            </div>
  
  
          {/* right side */}
            <div
              className={styles.overlayImageTopRight}>
                <span>
                  <img src={`${bellIcon}`} alt = ""/>
                </span>
            </div>
          </div>
  
          {/* Dashboard Heading */}
          <div className={styles.dashboardHead}>
            <div>
            <span>cpc</span>{" "} Dashboard
            </div>
          </div>
  
          {/* boxes */}
          <div className={styles.boxContainer}>
            <div className={styles.box}>
              <div>
                <img src={`${pencilIcon}`} alt="" />
              </div>
              <p>Submit</p>
              <h3>Business Case</h3>
            </div>
  
            <div className={styles.box}>
              <div>
                <img src={`${textBoxIcon}`} alt="" />
              </div>
              <p>View</p>
              <h3>Business Case List</h3>
            </div>
  
            <div className={styles.box}>
              <div>
                <img src={`${calendarIcon}`} alt="" />
              </div>
              <p>Availability</p>
              <h3>Calendar</h3>
            </div>
  
            <div className={styles.box}>
              <div>
                <img src={`${textDocIcon}`} alt="" />
              </div>
              <p>Download</p>
              <h3>Storage</h3>
            </div>
  
            <div className={styles.box}>
              <div>
                <img src={`${badgeIcon}`} alt="" />
              </div>
              <p>Download</p>
              <h3>Charter</h3>
            </div>
          </div>
  
          {/* overlay Position Bottom
           */}
          <div className={styles.overLayBottomContainer}>
            <div className={styles.overlayBottomRight}></div>
            <div className={styles.overlayBottomLeft}>
              <img src = {`${overLayImageBottomRight}`} alt=""/>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default App;
  