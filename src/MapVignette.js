import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './MapVignette.css';

class MapVignette extends Component {

  render() {
    return (
      <Map className="vignette" 
        center={this.props.coordinates} 
        zoom={16} 
        zoomControl={false} 
        touchZoom={false}
        dragging={false}>
        attributionControl={false} 
        <TileLayer
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png' // zoomMax = 20
          // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default MapVignette;