import React, { Component } from 'react';
import './Intro.css';
import { Link } from "react-router-dom";

class Intro extends Component {

  render() {

    return (
      <div className='intro'>
        <p>Fiction inspired by <span className='oomph'>your memories</span> of strangers.</p>
        {/* <p><a href='https://airtable.com/shrhBkljBMeLUa4wR' target='blank'>Share</a> a memory with us.</p> */}
      </div>
    )
  }
}

export default Intro;