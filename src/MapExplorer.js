import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './MapExplorer.css';

class MapExplorer extends Component {

  render() {
    return (
      <Map className="explorer" 
        center={[43.700056, -79.426948]} // Toronto's centre roughly speaking
        zoom={10} zoomControl={false} 
        attributionControl={false}
        dragging={false}>
        <TileLayer
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png' // zoomMax = 20
          // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          <CircleMarker center={this.props.coordinates} radius={2} color={'red'} fillOpacity={1} />
      </Map>
    );
  }
}

export default MapExplorer;