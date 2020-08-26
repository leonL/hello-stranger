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
      <div class='story'>
        <h1 class='title'>{this.props.title}</h1>
        <div class="narrative" dangerouslySetInnerHTML={this.narrativeHtml()} />
      </div>
    );
  }
}

export default Story;