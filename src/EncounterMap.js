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
          {/* <button><Link to={`/story/${d.NAME}`}><span class="wave">👋</span></Link></button> */}
          {/* <Link className='say-hello' to={`/story/${d.NAME}`}>say <span className='hello'>hello</span></Link> */}
          <Link className='wave' to={`/story/${d.NAME}`}>👋🏾</Link>
        </Popup>
      </Marker>
      // <CircleMarker key={i} center={[d.latitude[0], d.longitude[0]]} 
      //   radius={3} fillColor={'black'} fillOpacity={1} 
      //   stroke={true} weight={15} color={'white'} opacity={0}>
      //   <Popup className='stranger-popup'>
      //     <p className='epigraph'>{d.epigraph}</p>
      //     <Link className='hello' to={`/story/${d.NAME}`}><span className='ital'>hello</span></Link>
      //   </Popup>
      // </CircleMarker>
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