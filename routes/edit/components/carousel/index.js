import React, { Component } from 'react'
import CarouselA from './CarouselA'
import CarouselB from './CarouselB'

import styles from './Carousel.styl'

class Carousel extends Component {
  constructor() {
    super()
    this.state = { count: 0 }
    this.swap = this.swap.bind(this)
    this.swapHero = this.swapHero.bind(this)
  }

  componentDidMount() {
    this.swapper = setInterval(this.swap, 7500)
  }

  componentWillUnmount() {
    clearInterval(this.swapper)
  }

  swap() {
    this.setState({ count: this.state.count + 1 })
  }

  swapHero() {
    clearInterval(this.swapper)
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    const showA = this.state.count % 2 === 0

    return (
      <div style={{ position: 'relative' }}>
        <CarouselA
          swapHero={this.swapHero}
          oauthUrl={OAUTH_URL}
          style={{
            opacity: showA ? 1 : 0,
            pointerEvents: showA ? 'all' : 'none',
          }}
        />
        <CarouselB
          swapHero={this.swapHero}
          oauthUrl={OAUTH_URL}
          style={{
            opacity: showA ? 0 : 1,
            pointerEvents: showA ? 'none' : 'all',
          }}
        />
      </div>
    )
  }
}

export default Carousel
