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
        <Popup className='stranger-popup'>
          <p className='epigraph'>{d.epigraph}</p>
          <Link className='hello' to={`/story/${d.NAME}`}><span className='ital'>hello</span></Link>
        </Popup>
      </CircleMarker>
    );

    return (
      <div className='encounters'>
        <Map className='map' 
          center={[43.690176657397124, -79.37025284285641]}
          zoom={12} 
          zoomControl={false} 
          attributionControl={false}>
            <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png' />
            {storyMarkers}
        </Map>

        <div className='legend'>
          {/* <p><span className='spot'>&#8226;</span> Strangers</p> */}
          {/* <p className='caveat'>Please take a moment to <a href='https://airtable.com/shrhBkljBMeLUa4wR' target='blank'>remember a stranger</a>.</p> */}
        </div>
      </div>
    );
  }
}

export default EncounterMap;