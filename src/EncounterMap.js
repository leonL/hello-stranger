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
      showMarkers: false,
      currentTourMarkerIndex: false,
      mapFlightDuration: 3,
      flyTo: true,
      tour: false
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({stories: records});
    });

    this.setState({ zoom: 10, centre: [43.690176657397124, -79.46025284285641] });
  }

  componentDidUpdate(prevPros, prevState) {
    if (!prevState.showMarkers && this.state.showMarkers) {
      this.startMarkerTour();
    }

    if (this.state.tour) {
      let t = this;
      setTimeout(function() {
        t.myRef.current.leafletElement.openPopup();
      }, 2000);
    }
  }

  startMarkerTour = () => {
    const firstMarker = this.storyMarkerData()[0];
    
    let t = this;
    setTimeout(function() {
      t.setState({
        centre: [firstMarker.latitude[0], firstMarker.longitude[0]], 
        zoom: 14,
        currentTourMarkerIndex: 0,
        mapFlightDuration: 0.1,
        tour: true
      });
      t.nextTourMarker();
    }, 2000);
  }
  
  nextTourMarker = () => {
    const s = this.state;
    const allStoryMarkers = this.storyMarkerData();    
    let nextMarkerIndex;

    if (s.currentTourMarkerIndex === allStoryMarkers.length - 1) {
      nextMarkerIndex = 0;
    } else {
      nextMarkerIndex = ++s.currentTourMarkerIndex;
    }

    let nextMarkerData = allStoryMarkers[nextMarkerIndex];
    console.log(nextMarkerIndex);

    let t = this;
    setTimeout(function() { 
      t.setState({
        centre: [nextMarkerData.latitude[0], nextMarkerData.longitude[0]],
        currentTourMarkerIndex: nextMarkerIndex,
        mapFlightDuration: 1,
        flyTo: true
      })
      console.log('here');    
      t.nextTourMarker();
    }, 10000);
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
      if (s.currentTourMarkerIndex === i) {
        marker = <Marker key={i} ref={this.myRef} position={[d.latitude[0], d.longitude[0]]} icon={strangerMarker}>
          <Popup className='stranger-popup'>
            <p className='epigraph'>{d.epigraph}</p>
            <Link className='hello' to={`/story/${d.NAME}`}><span className='ital'>hello</span></Link>
          </Popup>
        </Marker>
      } else {
        marker = <CircleMarker key={i} center={[d.latitude[0], d.longitude[0]]} 
          radius={3} fillColor={'black'} fillOpacity={1} 
          stroke={true} weight={15} color={'white'} opacity={0}>
          <Popup className='stranger-popup'>
            <p className='epigraph'>{d.epigraph}</p>
            <Link className='hello' to={`/story/${d.NAME}`}><span className='ital'>hello</span></Link>
          </Popup>
        </CircleMarker>
      }
      return marker;
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
          useFlyTo={s.flyTo}
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