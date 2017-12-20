import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const getId = el => el.attributes.id.value

export default class ScrollyTale extends Component {
  constructor() {
    super()
    this.state = {}

    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.setState({
      vh: window.innerHeight,
      screens: document.querySelectorAll('.screen'),
    })

    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({
      vh: window.innerHeight,
    })
  }

  handleScroll() {
    let prevBottom
    let topFirstPrev

    let topFirst = null
    let visibleScreens = []

    const { screens, vh, rects, offset } = this.state

    if (!screens) return

    if (true || !rects) {
      const cache = Array.from(screens).map(el => {
        const { top, bottom } = el.getBoundingClientRect()
        const isFullScreen = top <= 0 && bottom >= vh

        return {
          offset: document.documentElement.scrollTop,
          el,
          top,
          bottom,
          isAbove: bottom <= 0,
          isBelow: top >= vh,
          isFullScreen,
          isVisible:
            isFullScreen ||
            (top > 0 && top < vh) ||
            (bottom > 0 && bottom < vh),
        }
      })
      visibleScreens = cache.filter(s => s.isVisible)

      const scrollDir = topFirst > topFirstPrev ? 'up' : 'down'
      topFirstPrev = topFirst

      this.setState({
        rects: cache,
        visibleScreens: cache.filter(s => s.isVisible),
        offset: document.documentElement.scrollTop,
        scrollDir,
      })
    } else {
      const scrollDir = topFirst > topFirstPrev ? 'up' : 'down'
      topFirstPrev = topFirst

      const newRects = rects.map(r => {
        const newRect = { top: r.top - offset, bottom: r.bottom - offset }
        const newFlags = {
          isAbove: newRect.bottom <= 0,
          isBelow: newRect.top >= vh,
          isFullScreen: newRect.top <= 0 && newRect.bottom >= vh,
          isVisible:
            (newRect.top <= 0 && newRect.bottom >= vh) ||
            (newRect.top > 0 && newRect.top < vh) ||
            (newRect.bottom > 0 && newRect.bottom < vh),
        }
        return { ...r, ...newRect, ...newFlags }
      })

      this.setState({
        offset: document.documentElement.scrollTop,
        scrollDir,
        newRects: newRects,
      })
    }
  }

  render() {
    const { rects = [], offset, vh } = this.state
    const oRects = rects.map(r => {
      return { ...r, top: r.top + offset, bottom: r.bottom + offset }
    })

    return (
      <div>
        {React.Children.map(this.props.children, (c, i) => {
          return React.cloneElement(c, {
            rect: oRects[i],
            vh,
            offset,
          })
        })}
      </div>
    )
  }
}
