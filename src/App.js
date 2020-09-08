import React, { Component } from 'react';
import Story from './Story.js'
import MapExplorer from './MapExplorer.js';
import './App.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class App extends Component {
  constructor(props) {
    super(props);
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
    window.addEventListener('resize', this.onBrowserWindowResize);
  }

  currentStoryId = () => {
    const s = this.state;
    let id = s.currentStoryId ? s.currentStoryId : s.stories[0].get('id');
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
    let otherStories = s.filter(story => story.get("id") !== this.currentStoryId());
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

  rememberStrangerLink = () => {
    return <a href="https://airtable.com/shrhBkljBMeLUa4wR" target="_blank" rel="noopener noreferrer">remember a stranger</a>
  }

  render() {
    const storiesLoaed = this.state.stories.length > 0;
    let view;
    if (!storiesLoaed) {
      view = <div className="loading">Loading...</div> 
    } else {
      view = <div className='story'>
        <Story data={ this.currentStoryData() } />
        <blockquote className="solicitation">
          <p>
            helloStranger stories take encounters between strangers as a starting point. 
            If you like this project please take a moment to { this.rememberStrangerLink() }.
          </p>
        </blockquote>
        <MapExplorer currentStoryMarkerData={ this.currentStoryMarkerData() } otherStoryMarkerData={ this.otherStoryMarkerData() } />
      </div>
    }
    return (
      <div className="container">          
        { view }
        <div className='footer'>
          <h3 className='title'>helloStranger</h3>
        </div> 
      </div>
    );
  }
}

export default App;