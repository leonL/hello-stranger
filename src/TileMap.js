import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './TileMap.css';

class TileMap extends Component {

  render() {
    const coords = this.props.coordinates;

    return (
      <Map className="map" 
        center={coords}
        zoom={17} 
        zoomControl={false} 
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        dragging={false}
        attributionControl={false} >
        <TileLayer
          url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'// zoomMax = 20
        />
        {/* <CircleMarker center={coords} radius={100} interactive={false} color={'#00B4D1'} fillOpacity={1} weight={0} /> */}
      </Map>
    );
  }
}

export default TileMap;