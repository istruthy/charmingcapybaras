import React from 'react';
import Aux from './../../../hoc/Aux/Aux';

const userAgendaInfo = props => {
  console.log('profileID: ', props.profileData.name);
  // var dateFmt = {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric'
  // };
  // const AGENDA_DATE = props.profileData.date.toLocaleDateString(
  //   'en-EN',
  //   options
  // );
  // console.log(AGENDA_DATE);

  var today = new Date(props.profileData.date);

  var dayFmt = {
    weekday: 'long'
    // year: 'numeric',
    // month: 'long',
    // day: 'numeric'
  };

  var dateFmt = {
    // weekday: 'long'
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const AGENDA_DAY = today.toLocaleDateString('en-US', dayFmt);
  const AGENDA_DATE = today.toLocaleDateString('en-US', dateFmt);

  // let venuePropertyies = Object.keys(props.profileData).map(igKey => {
  //   return [...Array(props.profileData[igKey])].map((_, i) => {
  //     console.log('this key', igKey, props.profileData[igKey]);
  //   });
  // });
  return (
    <div className="col-lg-4 col-md-12 col-sm-12 side-content animated fadeIn">
      <h2 className="gen-text">
        <span className="pink" /> you're a hero!
      </h2>
      <h3 className="border-text">
        PUT YOUR CAPE ON AND TAKE OFF <span className="fly" />
      </h3>

      <h4 className="date">{props.todayIs(props.profileData.date)}</h4>

      <h5 className="agenda pink">Suggested Restaurants</h5>
      <ul className="agenda-options">
        <li className="list-option">{props.profileData.name}</li>
      </ul>

      <hr className="cross" />

      <h5 className="ads pink">SPONSORSHIP</h5>
      <p className="ads-text">
        This weekend is a homegame by the Houston Astros, get your tickets today
        and enjoy a day at the juicebox with the top down. www.ticketmaster.com
      </p>
    </div>
  );
};

export default userAgendaInfo;
