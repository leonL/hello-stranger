import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map, TileLayer, CircleMarker, Popup, SVGOverlay } from 'react-leaflet';
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
        radius={3} fillColor={'black'} fillOpacity={1} 
        stroke={true} weight={15} color={'white'} opacity={0}>
        <Popup>
          <h5>Stranger {d.encounter_NAME}</h5>
          <p className='epigraph'>{d.epigraph}</p>
          {/* <p>- A memory shared with helloStranger on {d.encounter_created_at}</p> */}
          <p>Read <Link to={`/story/${d.NAME}`}>{d.title}</Link>, a story inspired by stranger {d.encounter_NAME}</p>
        </Popup>
      </CircleMarker>
    );

    return (
      <div className='encounters'>
        <Map className='map' 
          center={[43.650176657397124, -79.44025284285641]}
          zoom={10} 
          zoomControl={false} 
          attributionControl={false}>
            <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png' />
            {storyMarkers}
        </Map>

        <div className='legend'>
          <p className='explainer'>*Strangers are recalled to us by readers like you.</p>
          <p>If you like this project please take a moment to <a href='https://airtable.com/shrhBkljBMeLUa4wR' target='blank'>remember a stranger</a>.</p>
        </div>
      </div>
    );
  }
}

export default EncounterMap;