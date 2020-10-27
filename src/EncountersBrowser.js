import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import StoryMap from './StoryMap.js';
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
      stories: [],
      currentEncounterIndex: 0
    };
  }

  componentDidMount() {
    helloStrangerBase('stories').select().firstPage((err, records) => {
      if (err) { console.error(err); return;  } 
      this.setState({stories: records});
    });
  }

  getStoryByIndex = (index) => {
    let story = this.state.stories[index];
    return story.fields;
  }

  storyMarkerData = () => {
    let data = this.state.stories.map((stories) => {
      let s = stories.fields;
      return {
        encounter_id: s.encounter_NAME,
        coordinates: [s.latitude[0], s.longitude[0]]
      }
    });
    return data;
  }

  encountersSliderHtml = () => {
    const stories = this.state.stories;

    const sliderSettings = {
      infinite: true,
      speed: 300,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 10000,
      afterChange: newIndex => this.setState({ currentEncounterIndex: newIndex })
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
    
    let encountersSliderHtml = <Slider className='encounters-slider' {...sliderSettings}>
      {encountersDivs}
    </Slider>

    return encountersSliderHtml;
  }

  render() {
    const s = this.state, storiesLoaded = s.stories.length > 0;

    let encountersBrowserHtml;
    if (storiesLoaded) {
      encountersBrowserHtml = <div className='browser'>
        <StoryMap storyMarkerData={this.storyMarkerData()} currentEncounterIndex={s.currentEncounterIndex} />
        {this.encountersSliderHtml()}
      </div>
    } else {
      encountersBrowserHtml = <h5>Loading stories...</h5>;
    }

    return (
      <div className='encounters'>
        {encountersBrowserHtml}
      </div>
    )
  }
}

export default EncountersBrowser;