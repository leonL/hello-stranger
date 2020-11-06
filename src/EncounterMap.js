import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import './EncounterMap.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class EncounterMap extends Component {
  constructor(props) {
    super();
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({stories: records});
    });
  }

  storyMarkerData = () => {
    let data = this.state.stories.map((story) => {
      return story.fields;
    });
    return data;
  }

  render() {
    const p = this.props;
    const storyMarkers = this.storyMarkerData().map((d, i) =>
      <CircleMarker key={i} center={[d.latitude[0], d.longitude[0]]} 
        radius={10} fillColor={'white'} fillOpacity={0.2} 
        stroke={true} weight={1} color={'black'}>
        <Popup>
          <blockquote className='encounter-text'>
            <p className='epigraph'>{d.epigraph}</p>
          </blockquote>
        </Popup>
      </CircleMarker>
    );


    return (
      <Map className="encounters-map" 
        center={[43.650176657397124, -79.46125284285641]}
        zoom={10} 
        zoomControl={false} 
        attributionControl={false}>
          <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png' />
          {storyMarkers}
      </Map>
    );
  }
}

export default EncounterMap;