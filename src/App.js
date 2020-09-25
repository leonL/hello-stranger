import React, { Component } from 'react';
import EncountersMap from './EncountersMap.js';
import Story from './Story.js';
import './App.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class App extends Component {
  constructor(props) {
    super();
    this.storyRef = React.createRef();
    this.state = {
      stories: [],
      currentStoryId: null
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({ stories: records });
    });
  }

  currentStoryId = () => {
    const s = this.state;
    let id = s.currentStoryId ? s.currentStoryId : 5; // the id of the story 'Slumming'
    return id;
  }

  currentStoryData = () => {
    const s = this.state.stories;
    let currentStory = s.find(story => story.get("id") === this.currentStoryId());
    return currentStory.fields;   
  }

  currentStoryMarkerData = () => {
    const s = this.currentStoryData();
    let data = {
      id: s.id,
      coordinates: [s.latitude[0], s.longitude[0]]
    };
    return data;
  }

  otherStories = () => {
    const s = this.state.stories;
    // let otherStories = s.filter(story => story.get("id") !== this.currentStoryId());
    let otherStories = s;
    return otherStories;
  }

  otherStoryMarkerData = () => {
    const otherStories = this.otherStories();
    let data = otherStories.map((stories) => {
      let s = stories.fields;
      return {
        id: s.id,
        coordinates: [s.latitude[0], s.longitude[0]]
      }
    });
    return data;
  }

  render() {
    const s = this.state, storiesLoaed = s.stories.length > 0;
    let view;
    if (!storiesLoaed) {
      view = <div className="loading">Loading...</div> 
    } else {
      // const csd = this.currentStoryData()
      view = <div> 
        <EncountersMap 
          currentStoryMarkerData={ this.currentStoryMarkerData() } 
          otherStoryMarkerData={ this.otherStoryMarkerData() } 
        />
        <div className='introduction'>
          <p>helloStranger is fiction inspired by <span className='highlight'>encounters</span> between strangers.</p>
          <p className='sub'>Select the location of one of the <span className='highlight'>encounters</span> to begin.</p>
          {/* <p className='sub'>
            <span className='highlight'>Encounters</span> are&nbsp; 
            <a href="https://airtable.com/shrhBkljBMeLUa4wR" target="_blank" rel="noopener noreferrer">shared</a>&nbsp; 
            with us by readers like you.
          </p> */}
        </div>
        {/* <blockquote className="epigraph">
          <p>{csd.epigraph}</p>
          <footer>- <cite> Encounter no. {csd.encounter_id}</cite></footer>
        </blockquote> */}
        {/* <Story data={ this.currentStoryData() } /> */}
      </div>
    }
    return (
      <div className='container'>
        {/* <h3 className='header'>helloStranger</h3> */}
        {view}
      </div>
    )
  }
}

export default App;