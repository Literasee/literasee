import React, { Component } from 'react';
import CarouselA from './CarouselA';
import CarouselB from './CarouselB';

import styles from './HeroCarousel.styl'

class HeroCarousel extends Component {

  constructor () {
    super();
    this.state = { count: 0 };
  }

  componentDidMount () {
    setInterval(::this.swap, 7500);
  }

  swap () {
    this.setState({count: this.state.count + 1});
  }

  render () {
    const showA = this.state.count % 2 === 0;

    return (
      <div style={{position: 'relative'}}>
        <CarouselA style={{opacity: showA ? 1 : 0}} />
        <CarouselB style={{opacity: showA ? 0 : 1}} />
      </div>
    )
  }
}

export default HeroCarousel;
