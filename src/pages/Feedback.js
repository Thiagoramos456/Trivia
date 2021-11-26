import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">lalala</p>
      </div>
    );
  }
}
