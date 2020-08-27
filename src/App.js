import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Story from './Story.js'
import './App.css';

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      browserWindowHeight: window.innerHeight
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({ stories: records });
    });
    window.addEventListener('resize', this.onBrowserWindowResize);
  }

  onBrowserWindowResize = (e) => {
    this.setState({browserWindowHeight: window.innerHeight})
  }

  render() {
    const stories = this.state.stories.map((s) => 
      <div key={s.get('id')}><Story title={s.get('title')} narrative={s.get('narrative')} /></div>
    );
    return (
      <SwipeableViews containerStyle={{height: this.state.browserWindowHeight}}>
        {stories}
      </SwipeableViews>
    );
  }
}

export default App;