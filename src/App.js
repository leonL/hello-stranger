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
    const s = this.state.stories[0]
    return <Story 
      title={s.get('title')} 
      epigraph={s.get('epigraph')} 
      geo_coordinates={ [s.get('latitude')[0], s.get('longitude')[0]] } 
      stranger_id={s.get('stranger_id')} 
      narrative={s.get('narrative')} />    
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