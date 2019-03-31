import React, { Component } from 'react';

export default class Location extends Component {
  constructor(){
    super();
    this.state={
        users:[],
        requests:[],
        lat: '',
        lon: '',
        available: false,
        geo:false
    }
    this.getMyLocation = this.getMyLocation.bind(this);}

   getMyLocation = (e) => {
    if (window.navigator && window.navigator.geolocation) {
        var location = window.navigator.geolocation
    }
    if (location){
        location.getCurrentPosition(function (position) {
           var latitude = position.coords.latitude;
            var longitude= position.coords.longitude;
            this.setState({lat: latitude, lon: longitude,geo:true})
        })
    }
    console.log(this.state.lat);
    console.log(this.state.lon);
   }

componentDidMount() {
    this.getMyLocation();
    if(this.state.geo) {
        this.setState({available:true});
        fetch(`/locate/${this.state.lat}/${this.state.lon}`)
        .then(res => res.json())
        .then(requests => this.setState({requests}, () => console.log('requests fetched',requests)));

        fetch('users')
        .then(res => res.json())
        .then(users => this.setState({users}, () => console.log('users fetched',users)));
}
}

  render() {
    return(
      <div className="loc">               
         <h2><font> Discover Friends </font></h2>
         {this.state.available && (this.state.users.map(person =>
          <div className="indiv">
                    <img key={person.id} src={person.DP} alt="Avatar"/>
                    <div className="name_stream">
                    <p key={person.id} name={person.UN} id="name">{person.FN} {person.LN}</p>
                    <p key={person.id} id="stream">{person.Sname}</p>                    
                    </div>
         <button className="add">Add Friend</button>
          <button className="view">View Profile</button>
          </div>
         ))}
      </div>
            )};
     
}
