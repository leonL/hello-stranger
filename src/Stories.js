import React, { Component } from 'react';
import { Link } from "react-router-dom";
import torontoIllustratedPng from './toSkyLine.png';
import VignetteMap from './VignetteMap.js';
import './Stories.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class Stories extends Component {
  constructor(props) {
    super();
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({ stories: records });
    });
  }

  listOfStoriesHtml = () => {
    const stories = this.state.stories;
    
    let tileDivs = stories.map((story, i) => {
      let geo_coordinates = [story.get('latitude')[0], story.get('longitude')[0]];
      return <li key={i} className='story-cover'>
        <h1 className='title'>
          <Link to={`/story/${story.get('NAME')}`}>
            {story.get('title')}
          </Link>
        </h1>
        <VignetteMap coordinates={geo_coordinates} />
      </li>
    });

    return tileDivs;
  }

  render() {
    const s = this.state, storiesLoaded = s.stories.length > 0;

    let tableOfContentsHtml;
    if (storiesLoaded) {
      tableOfContentsHtml = this.listOfStoriesHtml();
    } else {
      tableOfContentsHtml = <h5>Loading stories...</h5>;
    }

    return (
      <div className='front-matter'>
        <div className='front-cover'>
          <img src={torontoIllustratedPng} className='illustration' alt='illustration of a few iconic Toronto buildings'></img>
          <div className='description'>
            <h1 id='stories' className='tag'>Stories</h1>
            <h3 id='inspired' className='tag'>inspired by encounters between Toronto's unknown</h3>
          </div>
        </div>
        <ul className='table-of-contents'>
          {tableOfContentsHtml}
        </ul>
      </div>
    )
  }
}

export default Stories;