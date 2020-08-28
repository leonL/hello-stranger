import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './MapVignette.css';

class MapVignette extends Component {

  render() {
    return (
      <Map center={this.props.coordinates} zoom={16} zoomControl={false} attributionControl={false} dragging={false}>
        <TileLayer
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png' // zoomMax = 20
          // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          <CircleMarker center={this.props.coordinates} radius={2} color={'red'} fillOpacity={1} />
      </Map>
    );
  }
}

export default MapVignette;