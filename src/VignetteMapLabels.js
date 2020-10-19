import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './VignetteMapLabel.css';

class VignetteMapLabels extends Component {

  render() {
    return (
      <Map className="vignette" 
        center={this.props.coordinates} 
        zoom={15} 
        zoomControl={false} 
        // touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        dragging={false}
        attributionControl={false} >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' // zoomMax = 20
        />
        {/* <CircleMarker center={this.props.coordinates} radius={60} interactive={false} color={'lightblue'} fillOpacity={0.3} weight={0} /> */}
      </Map>
    );
  }
}

export default VignetteMapLabels;