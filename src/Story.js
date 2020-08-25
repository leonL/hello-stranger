import React, { Component } from 'react';
import './Story.css';

class Story extends Component {

  render() {
    return (
      <li>
        <h1>{this.props.title}</h1>
      </li>
    );
  }
}

export default Story;