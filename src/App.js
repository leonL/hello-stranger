import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import Story from './Story.js'
import StoryMap from './StoryMap.js';
import hamburgerIcon from './hamburger.png';
import './App.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class App extends Component {
  constructor(props) {
    super(props);
    this.storyRef = React.createRef();
    this.remarkable = new Remarkable();
    this.state = {
      stories: [],
      metaText: null,
      currentStoryId: null,
      showMenu: false
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      console.log(records)
      if (err) { console.error(err); return;  } 
      this.setState({ stories: records });
    });
    helloStrangerBase('metaText').select().firstPage((err, records) => {
      console.log(records)
      if (err) { console.error(err); return;  } 
      this.setState({ metaText: records[0] });
    });
  }

  componentDidUpdate(prevProps) {
    this.storyRef.current.scrollTo({
      top: 0,
      left: 0
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

  storySelected = (id) => {
    this.setState({currentStoryId: id})
  }

  toggleMenu = () => {
    let showMenu = this.state.showMenu;
    this.setState({showMenu: !showMenu})
  }

  aboutPageHtml(aboutMarkup) {
    return { __html: this.remarkable.render(aboutMarkup) }
  }

  render() {
    const s = this.state, storiesLoaed = s.stories.length > 0;
    let view;
    if (!storiesLoaed) {
      view = <div className="loading">Loading...</div> 
    } else {
      view = <div className='story' ref={this.storyRef}>
        <Story data={ this.currentStoryData() } />
        <blockquote className="solicitation">
          <p>helloStranger fiction is inspired by everyday <span className='highlight'>encounters</span> between strangers.</p> 
          <p>Inspire our next creation: take a moment to { this.rememberStrangerLink() }.</p>
        </blockquote>
        <h3 className='story-map-title'>More Stories From Here</h3>
        <StoryMap storySelected={ this.storySelected } 
          currentStoryMarkerData={ this.currentStoryMarkerData() } 
          otherStoryMarkerData={ this.otherStoryMarkerData() } />
      </div>
    }
    return (
      <div className={`container ${this.state.showMenu ? 'menu' : ''}`}>          
        { view }
        <div className='footer'>
          <img src={hamburgerIcon} className="menu-icon" alt="menu icon" onClick= {this.toggleMenu } />
          <h4 className='title'>helloStranger</h4>
        </div> 
        <div className='about'>
          <h1 className="title">helloStranger</h1>
          <h3 className="title sub title">Stories in View of the Hidden</h3>
          {s.metaText &&
            <div className="introduction" dangerouslySetInnerHTML={this.aboutPageHtml(s.metaText.get('about'))} />
          }
        </div>
      </div>
    );
  }
}

export default App;