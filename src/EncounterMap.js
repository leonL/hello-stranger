import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';
import './EncounterMap.css';
import strangerMarker from './strangerMarker.js';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class EncounterMap extends Component {
  constructor(props) {
    super();
    this.nextEncounterMarkerRef = React.createRef();
    this.state = {
      encounters: undefined,
      nextEncounterIndex: undefined,
      zoomLevel: 2,
      mapCentre: [33.7620753, -84.3680670], // Central America (not Kansas) 
      animationDuration: 7
    };
  }

  componentDidMount() {
    helloStrangerBase('encounters').select({
      sort: [{field: "story_publication_date", direction: "asc"}],
      fields: ['vignette', 'latitude', 'longitude']
    }).firstPage((err, records) => {
      if (err) { console.error(err); return;  }

      const encountersData = records.map((r) => {
        let data = {...r.fields, id: r.id};
        return data;
      });

      this.setState({ encounters: encountersData });
    });
  }

  componentDidUpdate(prevPros, prevState) {
    const s = this.state;
    if (this.isAnimating()) {
    } else if (prevState.encounters === undefined && s.encounters) {
      this.animateToNextEncounter(undefined, 7); 
    }
  }

  animateToNextEncounter = (currentIndex, animationDuration = 2) => {
    let nextIndex;
    if (currentIndex === undefined || currentIndex+1 === this.state.encounters.length) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    this.setState({
      nextEncounterIndex: nextIndex,
      mapCentre: this.encounterCoords(nextIndex),
      zoomLevel: 14,
      animationDuration: animationDuration
    })
  }

  mapAttrs = () => {
    const s = this.state;
    let postZoomCallback = undefined; 

    if (this.isAnimating()) {
      postZoomCallback = this.showNextEncounterVignette;
    } 

    return {
      zoom: s.zoomLevel,
      center: s.mapCentre,
      attributionControl: false,
      zoomControl: false, 
      animate: true,
      useFlyTo: true,
      duration: s.animationDuration,
      easeLinearity: 10,
      onZoomEnd: postZoomCallback
    }
  };

  showNextEncounterVignette = () => {
    this.nextEncounterMarkerRef.current.leafletElement.openPopup();
  }

  markersHtml = () => {
    const s = this.state;
    return s.encounters.map((d, i) => {
      return <Marker key={i} position={this.encounterCoords(i)} icon={strangerMarker} 
        ref={i === s.nextEncounterIndex ?  this.nextEncounterMarkerRef : undefined}>
        <Popup className='popup' autoPanPadding={[15, 50]}>
          <p className='vignette'>{d.vignette}</p>
          <div className='pills'>
            <Link className='say-hello' to={`/story/${d.id}`}>hello</Link>
            <a className='next' href="#" onClick={() => this.animateToNextEncounter(i)}>goodbye</a>
          </div>
        </Popup>
      </Marker>
    })
  }

  render() {
    const s = this.state;
    return (
      <div className='encounters'>
        <Map className='map' {...this.mapAttrs()}>
          <TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' />
          {s.encounters && this.markersHtml()}
        </Map>
      </div>
    );
  }

  encounterCoords = (index) => {
    const s = this.state;
    let encounter = s.encounters[index];
    return [encounter.latitude, encounter.longitude]
  }

  isAnimating = () => {
    return this.state.nextEncounterIndex !== undefined;
  }
}

export default EncounterMap;