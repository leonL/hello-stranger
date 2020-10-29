import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './TileMap.css';

class TileMap extends Component {

  render() {
    const coords = this.props.coordinates;

    return (
      <Map className="map" 
        center={coords} // Toronto's centre roughly speaking
        zoom={18} 
        zoomControl={false}
        attributionControl={false} >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'// zoomMax = 20
        />
        {/* <CircleMarker center={coords} radius={5} interactive={false} color={'darkred'} fillOpacity={1} weight={0} /> */}
      </Map>
    );
  }
}

export default TileMap;