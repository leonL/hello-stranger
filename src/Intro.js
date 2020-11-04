import React, { Component } from 'react';
import './Intro.css';
import torontoIllustratedPng from './toSkyLine.png';
import { Link } from "react-router-dom";

class Intro extends Component {

  render() {

    return (
      <div className='intro'>
        <p>Recall a time when a stranger tried getting your attention.</p> 
        <p>What happened?</p>
        <p>Who was that?</p>
        <p>helloStranger is fiction inspired by <span className='oomph'>your memories</span> of strangers.</p>
        <p><a href='https://airtable.com/shrhBkljBMeLUa4wR' target='blank'>Share</a> a memory with us.</p>
        <p>Or <Link to={'/story'}>read</Link> a story.</p>
      </div>
    )
  }
}

export default Intro;