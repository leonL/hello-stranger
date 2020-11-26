import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Remarkable } from 'remarkable';
import VignetteMapLabels from './VignetteMapLabels.js';
import infinitySvg from './infinity.svg';
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
    let storyId = this.props.match.params.id;
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  }
      let story = records.find(r => r.id == storyId)
      this.setState({ story: story.fields });
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
      view = <div className='story'>
        {/* <VignetteMapLabels coordinates={geo_coordinates} /> */}
        <h1 className='title'>{story.title}</h1>
        <h5 className='by-line'>By Leon Lukashevsky</h5>
        {/* <blockquote className='overture'>
          <p className='epigraph'>{story.epigraph}</p>
          <footer>
            ~ <cite>Encounter no. {story.encounter_NAME}</cite> 
          </footer>
        </blockquote> */}
        
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml(story.narrative)} />
        <div className='fin'>
          <img src={infinitySvg} alt='small infinity icon marking the end of the story'></img>
        </div>
        <p className='disclaimer'>
          helloStranger crowdsources memories of encounters betweeen strangers and invites 
          local authors to write stories inspired by the ones that allure them. <br /><br />
          Please take a moment 
          to <a href='https://airtable.com/shrhBkljBMeLUa4wR' target='blank'>remember a stranger</a>.  
        </p>

        {/* <div className='afterword'>
          <blockquote>
            <p className='munro'>
              A story is not like a road to follow … it's more like a house. You go inside and stay there for a while, 
              wandering back and forth and settling where you like and discovering how the room and corridors relate to 
              each other, how the world outside is altered by being viewed from these windows. And you, the visitor, the reader, 
              are altered as well by being in this enclosed space, whether it is ample and easy or full of crooked turns, 
              or sparsely or opulently furnished. You can <a href="#">go back</a> again and again, and the house, the story, always contains 
              more than you saw the last time. It also has a sturdy sense of itself of being built out of its own necessity, 
              not just to shelter or beguile you.
            </p>
            - <cite>Alice Munro</cite>
          </blockquote>
        </div> */}
      </div>
    }

    return (
      <div>
        {view} 
      </div>
    );
  }

}

export default withRouter(Story);