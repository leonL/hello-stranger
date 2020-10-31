import React, { Component } from 'react';
import './Intro.css';
import torontoIllustratedPng from './toSkyLine.png';
import { Link } from "react-router-dom";

class Intro extends Component {

  render() {

    return (
      <div className='intro'>
        <p>Recall a time when a stranger tried getting your attention, whether they were successful or not. 
          What impression did they make on you? You on them? What happened?</p>
        <p className='action share'><a href='https://airtable.com/shrhBkljBMeLUa4wR' target='blank'>Share</a> your encounter with us.</p>
        <p>helloStranger is a group of Toronto authors writing short stories inspired by the anecdotes you send.</p>
        <p className='action stories'>Check out the <Link to={'/story'}>stories</Link>.</p>
        <img src={torontoIllustratedPng} className='illustration' alt='illustration of a few iconic Toronto buildings'></img>
      </div>
    )
  }
}

export default Intro;