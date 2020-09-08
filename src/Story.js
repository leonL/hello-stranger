import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import MapVignette from './MapVignette.js'
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
      <div>
        <MapVignette coordinates={geo_coordinates} />
        <blockquote className="epigraph">
          <p>{d.epigraph}</p>
          <footer>- <cite> Stranger no. {d.stranger_id}</cite></footer>
        </blockquote>
        <h1 className='title'>{d.title}</h1>
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml(d.narrative)} />
      </div>
    );
  }
}

export default Story;