import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
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
        <h1 className='title'>{this.props.title}</h1>
        <blockquote className="epigraph">
          <p>{this.props.epigraph}</p>
          <footer>- <cite> Stranger no. {this.props.stranger_id}</cite></footer>
        </blockquote>
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml()} />
      </div>
    );
  }
}

export default Story;