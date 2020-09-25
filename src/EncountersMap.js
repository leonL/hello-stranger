import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker } from 'react-leaflet';
import './EncountersMap.css';

class MapExplorer extends Component {
  constructor(props) {
    super();
    this.state = {
      currentEncounterIndex: 0,
      mapCenter: [43.750056, -79.346948] // Toronto's centre roughly speaking
    };
  }
  
  componentDidMount() {
    this.nextEncounter()
  }
  
  nextEncounter = (i = 0) => {
    let t = this;
    setTimeout(function() {  
      let encounters = t.props.otherStoryMarkerData,
      currentIndex = t.state.currentEncounterIndex,
      nextIndex = currentIndex + 1;
    
      if (encounters.length <= nextIndex) {
        nextIndex = 0
      }

      t.setState({
        currentEncounterIndex: nextIndex
      })
      // t.mapInstance.leafletElement.flyTo(encounters[i].coordinates, 17)
      t.nextEncounter();
    }, 5000);
  }

  otherEncounters = () => {
    const allEnconters = this.props.otherStoryMarkerData;
    let otherEncounters = allEnconters.filter((_, i) => i !== this.state.currentEncounterIndex);
    return otherEncounters;
  }

  currentEncounter = () => {
    return this.props.otherStoryMarkerData[this.state.currentEncounterIndex]
  }


  storySelected = (e) => {
    this.props.storySelected(e.target.options.id)
  }

  render() {
    const p = this.props;
    const s = this.state;
    const otherStoryMarkers = this.otherEncounters().map((d) =>
      <CircleMarker onClick={this.storySelected} key={d.id} id={d.id} center={d.coordinates} radius={11} color={'#FD7F20'} fillOpacity={0.4} stroke={false} />
    );
    return (
      <Map className="explorer"
        ref={e => { this.mapInstance = e }} 
        center={s.mapCenter} 
        zoom={10} 
        zoomControl={false} 
        attributionControl={false}
        animate={true}
        // dragging={false}
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png' // zoomMax = 20
          // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          <CircleMarker key={this.currentEncounter().id} center={this.currentEncounter().coordinates} radius={9} interactive={false} color={'#FD7F20'} fillOpacity={0.1} weight={2} />
          {otherStoryMarkers}
      </Map>
    );
  }
}

export default MapExplorer;