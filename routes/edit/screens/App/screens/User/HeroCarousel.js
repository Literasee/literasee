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
    this.swapper = setInterval(::this.swap, 7500);
  }

  componentWillUnmount () {
    clearInterval(this.swapper);
  }

  swap () {
    this.setState({count: this.state.count + 1});
  }

  swapHero () {
    clearInterval(this.swapper);
    this.setState({count: this.state.count + 1});
  }

  render () {
    const showA = this.state.count % 2 === 0;

    if (this.props.username) return <span></span>;

    return (
      <div style={{position: 'relative'}}>
        <CarouselA
          swapHero={::this.swapHero}
          oauthUrl={this.props.oauthUrl}
          style={{
            opacity: showA ? 1 : 0,
            pointerEvents: showA ? 'all' : 'none'
          }} />
        <CarouselB
          swapHero={::this.swapHero}
          oauthUrl={this.props.oauthUrl}
          style={{
            opacity: showA ? 0 : 1,
            pointerEvents: showA ? 'none' : 'all'
          }} />
      </div>
    )
  }
}

export default HeroCarousel;
