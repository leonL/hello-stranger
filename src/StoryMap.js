import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './StoryMap.css';

class MapExplorer extends Component {
  // storySelected = (e) => {
  //   this.props.storySelected(e.target.options.id)
  // }

  render() {
    const p = this.props;
    const storyMarkers = p.storyMarkerData.map((d, i) =>
      <CircleMarker key={i} center={d.coordinates} radius={4} color={'black'} fillOpacity={1} stroke={false} />
    );
    let centreCoords = p.storyMarkerData[p.currentEncounterIndex].coordinates,
    adjustedCentre = [centreCoords[0] + 0.007, centreCoords[1] - 0.003]
    return (
      <Map className="explorer" 
        center={centreCoords}
        useFlyTo={true}
        zoom={16} 
        zoomControl={false} 
        attributionControl={false}>
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' // zoomMax = 20
          // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          {storyMarkers}
      </Map>
    );
  }
}

export default MapExplorer;