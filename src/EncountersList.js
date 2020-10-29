import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import TileMap from './TileMap.js';
import './EncountersList.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class EncountersList extends Component {
  constructor(props) {
    super();
    this.state = {
      stories: [],
      currentEncounterIndex: 0
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({stories: records});
    });
  }

  encountersTiles = () => {
    const stories = this.state.stories;
    
    let tiles = stories.map((story, i) => {
      return <li key={i} className='tile'>
        <TileMap coordinates={[story.get('latitude')[0], story.get('longitude')[0]]} />
        <p className='encounter'>
          {story.get('epigraph')}
        </p>
      </li>
    });

    return tiles;
  }

  render() {
    const s = this.state, storiesLoaded = s.stories.length > 0;

    let encounters;
    if (storiesLoaded) {
      encounters = <ul className='tiles'>
        {this.encountersTiles()}
      </ul>
    } else {
      encounters = <h5>Loading stories...</h5>;
    }

    return (
      <div className='encounters'>
        {encounters}
      </div>
    )
  }
}

export default EncountersList;