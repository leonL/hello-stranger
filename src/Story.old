import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import VignetteMap from './VignetteMap.js'
import './Story.css';

class Story extends Component {
  constructor(props) {
    super(props);
    this.remarkable = new Remarkable();
    this.state = {
      preview: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.preview === false) {
      this.setState({preview: true})
    }
  }

  narrativeHtml(narrativeMarkup) {
    return { __html: this.remarkable.render(narrativeMarkup) }
  }

  showFullNarrative = () => {
    this.setState({preview: false})
  }

  render() {
    const d = this.props.data;
    const geo_coordinates = [d.latitude[0], d.longitude[0]];
    return (
      <div className={this.state.preview ? "preview" : ""}>
        <VignetteMap coordinates={geo_coordinates} />
        <blockquote className="epigraph">
          <p>{d.epigraph}</p>
          <footer>- <cite className="highlight"> Encounter no. {d.encounter_id}</cite></footer>
        </blockquote>
        <h1 className='title'>{d.title}</h1>
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml(d.narrative)} />
        {this.state.preview &&
          <button className='continue' onClick={this.showFullNarrative}>...</button>
        }
      </div>
    );
  }
}

export default Story;