import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import MapVignette from './MapVignette.js'
import MapExplorer from './MapExplorer.js';
import './Story.css';

class Story extends Component {
  constructor(props) {
    super(props);
    this.remarkable = new Remarkable();
  }

  narrativeHtml(narrativeMarkup) {
    return { __html: this.remarkable.render(narrativeMarkup) }
  }

  render() {
    const d = this.props.data;
    const geo_coordinates = [d.latitude[0], d.longitude[0]];
    return (
      <div className='story'>
        <MapVignette coordinates={geo_coordinates} />
        <blockquote className="epigraph">
          <p>{d.epigraph}</p>
          <footer>- <cite> Stranger no. {d.stranger_id}</cite></footer>
        </blockquote>
        <h1 className='title'>{d.title}</h1>
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml(d.narrative)} />
        <blockquote className="solicitation">
          <p>helloStranger stories take encounters between strangers as a starting point. 
          If you like this project please take a moment to&nbsp;
          <a href="https://airtable.com/shrhBkljBMeLUa4wR" target="_blank" rel="noopener noreferrer">
            remember a stranger</a>.
          </p>
        </blockquote>
        <MapExplorer coordinates={geo_coordinates} />
      </div>
    );
  }
}

export default Story;