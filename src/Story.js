import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Remarkable } from 'remarkable';
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
      let story = records.find(r => r.id === storyId)
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
      view = <div className='story'>
        <h1 className='title'>{story.title}</h1>
        <h5 className='by-line'>By Leon Lukashevsky</h5>
        
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