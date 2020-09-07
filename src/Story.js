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

  narrativeHtml() {
    return { __html: this.remarkable.render(this.props.narrative) }
  }

  render() {
    return (
      <div className='story'>
        <MapVignette coordinates={this.props.geo_coordinates} />
        <blockquote className="epigraph">
          <p>{this.props.epigraph}</p>
          <footer>- <cite> Stranger no. {this.props.stranger_id}</cite></footer>
        </blockquote>
        <h1 className='title'>{this.props.title}</h1>
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml()} />
        <blockquote className="solicitation">
          <p>helloStranger stories take encounters between strangers as a starting point. 
          If you like this project please take a moment to&nbsp;
          <a href="https://airtable.com/shrhBkljBMeLUa4wR" target="_blank" rel="noopener noreferrer">
            remember a stranger</a> or choose another story to read from the map below.
          </p>
        </blockquote>
        <MapExplorer coordinates={this.props.geo_coordinates} />
      </div>
    );
  }
}

export default Story;