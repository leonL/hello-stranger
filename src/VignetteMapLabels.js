import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './VignetteMapLabel.css';

class VignetteMapLabels extends Component {

  render() {
    return (
      <Map className="vignette" 
        center={this.props.coordinates} // Toronto's centre roughly speaking
        zoom={16} 
        zoomControl={false}
        attributionControl={false} >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'// zoomMax = 20
        />
        <CircleMarker center={this.props.coordinates} radius={5} interactive={false} color={'darkred'} fillOpacity={1} weight={0} />
      </Map>
    );
  }
}

export default VignetteMapLabels;