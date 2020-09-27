import React, { Component } from 'react';
import facesPng from './faces1.png';
import './App.css';

class App extends Component {

  render() {
    return(
      <div className='container'>
        <div className='front-panel'>
          <h1 className='title'>helloStranger</h1>
          <img src={facesPng} className="illustration" alt="line drawing of faces" />
          <h2 className='sub title'>Stories in View of the Hidden</h2>
          {/* <p className='introduction'>
            Fiction inspired your memories of strangers and their memories of you.
          </p> */}
          <div className='actions'>
            <a className='btn btn-light'>Read a Story</a>
            <a className='btn btn-light' href="https://airtable.com/shrhBkljBMeLUa4wR" target="_blank" rel="noopener noreferrer">Remember a Stranger</a>
          </div>
        </div>
        <div className='footer'>
          <h4 className='title'>*</h4>
        </div>
      </div>
    )
  }
}

export default App;