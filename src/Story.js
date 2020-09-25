import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import './Story.css';

class Story extends Component {
  constructor(props) {
    super();
    this.remarkable = new Remarkable();
    this.state = {
      preview: true
    };
  }

  narrativeHtml(narrativeMarkup) {
    return { __html: this.remarkable.render(narrativeMarkup) }
  }

  showFullNarrative = () => {
    this.setState({preview: false})
  }

  render() {
    const d = this.props.data;
    return (
      <div className={this.state.preview ? "story preview" : "story"}>
        <h1 className='title'>{d.title}</h1>
        <div className="narrative" dangerouslySetInnerHTML={this.narrativeHtml(d.narrative)} />
        {this.state.preview &&
          <button className='continue' onClick={this.showFullNarrative}>...</button>
        }
      </div>
    );
  }
}

export default Story;