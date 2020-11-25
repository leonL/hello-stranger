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

    this.setState({ zoom: 15, centre: [43.665575, -79.467843] });
  }

  componentDidUpdate(prevPros, prevState) {
    if (!prevState.showMarkers && this.state.showMarkers) {
      let t = this;
      setTimeout(function() {
        t.myRef.current.leafletElement.openPopup();
      }, 2000);
    }
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
      let marker;
      if (d.NAME == 5) {
        marker = <Marker key={i} ref={this.myRef} position={[d.latitude[0], d.longitude[0]]} icon={strangerMarker}>
          <Popup className='stranger-popup' autoPanPadding={[15, 50]}>
            <p className='epigraph'>{d.epigraph}</p>
            <div className='choice'>
              <Link className='howdy' to={`/story/${d.NAME}`}>say hello</Link>
              <Link className='pass' to={`/story/${d.NAME}`}>next</Link>
            </div>
          </Popup>
        </Marker>
      } else {
        marker = <Marker key={i} position={[d.latitude[0], d.longitude[0]]} icon={strangerMarker}>
          <Popup className='stranger-popup' autoPanPadding={[15, 50]}>
            <p className='epigraph'>{d.epigraph}</p>
            <div className='choice'>
              <Link className='howdy' to={`/story/${d.NAME}`}>say hello</Link>
              <Link className='pass' to={`/story/${d.NAME}`}>next</Link>
            </div>
          </Popup>
        </Marker>        
      }
      return marker;
    });

    return (
      <div className='encounters'>
        <Map className='map' 
          center={s.centre}
          zoom={s.zoom} 
          zoomControl={false} 
          duration={7}
          easeLinearity={0}
          animate={true}
          useFlyTo={true}
          attributionControl={false}
          onZoomEnd={this.showMarkers}>
            <TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' />
            {storyMarkers}
        </Map>
      </div>
    );
  }
}

export default EncounterMap;