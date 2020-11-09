import React, { Component } from 'react';
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
          <h3>Encounter #{d.encounter_NAME}</h3>
          <p className='epigraph'>{d.epigraph}</p>
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
        {/* <div className='legend'>
          <h5 className='explainer'>Encounters are shared by readers like you; these inspired fiction by local writers.</h5>
        </div> */}
      </div>
    );
  }
}

export default EncounterMap;