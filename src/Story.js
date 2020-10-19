import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Remarkable } from 'remarkable';
import VignetteMapLabels from './VignetteMapLabels.js';
import './Story.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class Story extends Component {
  constructor(props) {
    super();
    this.remarkable = new Remarkable();
    this.state = {
      story: false
    };
  }

  componentDidMount() {
    let storyNAME = this.props.match.params.id;
    helloStrangerBase('stories').select({filterByFormula: `{NAME} = ${storyNAME}`}).firstPage((err, record) => {
      if (err) { console.error(err); return;  }
      this.setState({ story: record[0].fields });
    });
  }

  narrativeHtml(narrativeMarkup) {
    return { __html: this.remarkable.render(narrativeMarkup) }
  }

  render() {
    const story = this.state.story;
    
    let view;
    if (!story) {
      view = <div className="loading">Loading...</div> 
    } else {
      let geo_coordinates = [story.latitude[0], story.longitude[0]];
      view = <div className='body'>
        <VignetteMapLabels coordinates={geo_coordinates} />
        <h1 className='title'>{story.title}</h1>
        <blockquote className="epigraph">
          <p>{story.epigraph}</p>
          <footer>- <cite className="highlight"> Encounter no. {story.encounter_NAME}</cite></footer>
        </blockquote>
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml(story.narrative)} />
      </div>
    }

    return (
      <div className='story'>
        {view} 
      </div>
    );
  }

}

export default withRouter(Story);