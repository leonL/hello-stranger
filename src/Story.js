import React, { Component } from 'react';
import './Story.css';

class Story extends Component {

  render() {
    return (
      <h1>{this.props.title}</h1>
    );
  }
}

export default Story;