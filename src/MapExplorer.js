import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './MapExplorer.css';

class MapExplorer extends Component {

  storySelected = (e) => {
    this.props.storySelected(e.target.options.id)
  }

  render() {
    const p = this.props;
    const otherStoryMarkers = p.otherStoryMarkerData.map((d) =>
      <CircleMarker onClick={this.storySelected} key={d.id} id={d.id} center={d.coordinates} radius={8} color={'#D37506'} fillOpacity={0.1} />
    );
    return (
      <Map className="explorer" 
        center={[43.700056, -79.426948]} // Toronto's centre roughly speaking
        zoom={10} 
        zoomControl={false} 
        attributionControl={false} >
        <TileLayer
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png' // zoomMax = 20
          // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          <CircleMarker key={p.currentStoryMarkerData.id} center={p.currentStoryMarkerData.coordinates} radius={10} color={'#AAD6A0'} fillOpacity={0.5} />
          {otherStoryMarkers}
      </Map>
    );
  }
}

export default MapExplorer;