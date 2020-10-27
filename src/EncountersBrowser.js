import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import torontoIllustratedPng from './toSkyLine.png';
// import VignetteMap from './VignetteMap.js';
import Slider from "react-slick";
import './EncountersBrowser.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Airtable from 'airtable';
const helloStrangerBase = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_READ_KEY }).base('appu19XYiAbXm9wJs');

class EncountersBrowser extends Component {
  constructor(props) {
    super();
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({ stories: records });
    });
  }

  encountersSliderHtml = () => {
    const stories = this.state.stories;

    const sliderSettings = {
      infinite: true,
      speed: 300,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 10000
    };
    
    let encountersDivs = stories.map((story, i) => {
      return <div key={i} className='encounter'>
        <div className='details'>
          <p className='anecdote'>
            {story.get('epigraph')}
          </p>
        </div>
      </div>
    });
      {/* <Link to={`/story/${story.get('NAME')}`}>
        {story.get('title')}
      </Link> */}
    
    let encountersSliderHtml = <Slider className='encounters-slider' {...sliderSettings}>
      {encountersDivs}
    </Slider>

    return encountersSliderHtml;
  }

  render() {
    const s = this.state, storiesLoaded = s.stories.length > 0;

    let encountersHtml;
    if (storiesLoaded) {
      encountersHtml = this.encountersSliderHtml();
    } else {
      encountersHtml = <h5>Loading stories...</h5>;
    }

    return (
      <div className='encounters-browser'>
        {encountersHtml}
      </div>
    )
  }
}

export default EncountersBrowser;