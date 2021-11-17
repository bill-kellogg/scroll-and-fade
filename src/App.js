import React from 'react'
import './App.css'

let productHeight = 1000

const sections = [
  {
    color: {
      r: 255,
      g: 255,
      b: 255,
      a: 0
    },
    top: 0
  },
  {
    color: {
      r: 218,
      g: 165,
      b: 32,
      a: 1
    },
    top: window.innerHeight
  },
  {
    color: {
      r: 255,
      g: 105,
      b: 180,
      a: 1
    },
    top: window.innerHeight + 1 * productHeight
  },
  {
    color: {
      r: 238,
      g: 130,
      b: 238,
      a: 1
    },
    top: window.innerHeight + 2 * productHeight
  }
]

function lerp(v1, v2, fraction) {
  return (v2 - v1) * fraction + v1
}

function blend(c1, c2, fraction) {
  return {
    r: Math.floor(lerp(c1.r, c2.r, fraction)),
    g: Math.floor(lerp(c1.g, c2.g, fraction)),
    b: Math.floor(lerp(c1.b, c2.b, fraction)),
    a: lerp(c1.a, c2.a, fraction)
  }
}

const ContentBlock = ({ contentNum }) => {
  return <div className="slide">Content Block {contentNum}</div>
}

function App() {
  const bgScrollRef = React.useRef(null)
  const rafRef = React.useRef(null)

  React.useEffect(() => {
    let scrollY = window.scrollY
    const step = () => {
      // If the scroll position is not changing, don't bother with calculations
      // and DOM updates
      if (window.scrollY === scrollY) {    
        rafRef.current = requestAnimationFrame(step)
        return
      }

      scrollY = window.scrollY

      // used in calculation as a distance over which to transition color value
      const range = 100
      
      // midpoint is used so that color is fully transitioned when user is halfway into the active section
      let midPoint = Math.floor(window.scrollY + window.innerHeight / 2)
      let active = 0

      for (let i = 0; i < sections.length; i++) {
        // prevent invalid active section index value
        if (i === sections.length - 1) {
          active = i
          break
        }

        // advance active section
        if (midPoint < sections[i + 1].top - range) {
          active = i
          break
        }
      }

      let fraction = 0
      let color = sections[active].color

      if (midPoint < sections[active].top + range) {
        let prev = Math.max(active - 1, 0)
        fraction = (midPoint - (sections[active].top - range)) / (2 * range)
        color = blend(sections[prev].color, sections[active].color, fraction)
      }

      let el = bgScrollRef.current
      el.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }, [bgScrollRef, rafRef])

  return (
    <div className="App">
      <div ref={bgScrollRef} className="bg" />
      <ContentBlock contentNum="1" />
      <ContentBlock contentNum="2" />
      <ContentBlock contentNum="3" />
      <ContentBlock contentNum="4" />
    </div>
  )
}

export default App
