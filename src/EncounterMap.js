import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet';
import './EncounterMap.css';
import strangerMarker from './strangerMarker.js';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class EncounterMap extends Component {
  constructor(props) {
    super();
    this.myRef = React.createRef();
    this.state = {
      stories: [],
      zoom: 2,
      centre: [33.7620753, -84.3680670],
      showMarkers: false
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({stories: records});
    });

    this.setState({ zoom: 10, centre: [43.630176657397124, -79.4025284285641] });
  }

  storyMarkerData = () => {
    let data = this.state.stories.map((story) => {
      return story.fields;
    });
    return data;
  }

  showMarkers = () => {
    if (!this.state.showMarkers) {
      this.setState({ showMarkers: true })
    }
  }

  render() {
    const p = this.props;
    const s = this.state;
    const storyMarkers = this.storyMarkerData().map((d, i) => {
      return <Marker key={i} ref={this.myRef} position={[d.latitude[0], d.longitude[0]]} icon={strangerMarker}>
        <Popup className='stranger-popup' autoPanPadding={[15, 50]}>
          <p className='epigraph'>{d.epigraph}</p>
          <Link className='wave' to={`/story/${d.NAME}`}>👋🏾</Link>
        </Popup>
      </Marker>
    });

    return (
      <div className='encounters'>
        <Map className='map' 
          center={s.centre}
          zoom={s.zoom} 
          zoomControl={false} 
          duration={s.mapFlightDuration}
          easeLinearity={0}
          animate={true}
          useFlyTo={true}
          attributionControl={false}
          onZoomEnd={this.showMarkers}>
            <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png' />
            {this.state.showMarkers && storyMarkers}
        </Map>
      </div>
    );
  }
}

export default EncounterMap;