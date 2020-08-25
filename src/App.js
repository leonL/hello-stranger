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
  }

  render() {
    const stories = this.state.stories.map((s) => 
      <Story key={s.get('id')} title={s.get('title')} />
    );
    return (
      <ul>
        {stories}
      </ul>
    );
  }
}

export default App;