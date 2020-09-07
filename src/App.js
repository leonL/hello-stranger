import React, { Component } from 'react';
import Story from './Story.js'
import './App.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({ stories: records });
    });
    window.addEventListener('resize', this.onBrowserWindowResize);
  }

  story = () => {
    const storyData = this.state.stories[0].fields
    return <Story data={storyData} />    
  }

  render() {
    return (
      <div className="container">
        {this.state.stories.length > 0 &&
          this.story()
        }
        <div className='footer'>
          <h3 className='title'>helloStranger</h3>
        </div>
      </div>
    );
  }
}

export default App;