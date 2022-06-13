import React from 'react'
import { Box, colors, Container, Grid, styled, Typography } from '@mui/material'

let productHeight = 1200

const sections = [
  {
    color: {
      r: 252,
      g: 215,
      b: 74,
      a: 0
    },
    top: 0,
    muiFontColor: colors.grey[900],
    heading: "For Breakfast",
    copy: "If I'm feeling healthy, I'll grab a banana. 🍌"
  },
  {
    color: {
      r: 207,
      g: 125,
      b: 43,
      a: 1
    },
    muiFontColor: colors.grey[300],
    top: window.innerHeight,
    heading: "At Lunch",
    copy: "What's better than a big sandwich? 🥪"
  },
  {
    color: {
      r: 229,
      g: 190,
      b: 110,
      a: 1
    },
    muiFontColor: colors.grey[900],
    top: window.innerHeight + 1 * productHeight,
    heading: "For Dinner",
    copy: "If it's cold out, let's try the new ramen place! 🍜"
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

const ContentBlock = ({ section, index }) => {
  
  const { heading, imagePath, copy, muiFontColor } = section
  
  const flexDirection = index % 2 === 0 ? 'initial' : 'row-reverse'
  
  const StyledGridContainer = styled(Grid)(({theme}) => ({
    background: 'transparent',
    height: '1200px',
    [theme.breakpoints.up('md')]: {
      flexDirection: flexDirection,
    },
  }))

  const StyledImg = styled('img')(() => ({
    width: '100%'
  }))

  return (
    <StyledGridContainer container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Box>
          <Typography variant="subtitle1" style={{ color: muiFontColor, fontSize: '100px' }} align="center">{ heading }</Typography>
          <Typography variant="body1" style={{ color: muiFontColor, fontSize: '60px' }} align="center">{ copy }</Typography>
        </Box>
      </Grid>
    </StyledGridContainer>
  )
}

function App() {

  const FixedBg = styled(Box)((theme) => ({
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  }))

  const bgScrollRef = React.useRef(null)
  const rafRef = React.useRef(null)

  React.useEffect(() => {
    let scrollY = window.scrollY
    const step = () => {
      
      let el = bgScrollRef.current
      
      // use first slide color values on load
      if (window.scrollY === 0) {
        el.style.backgroundColor = `rgb(${sections[0].color.r}, ${sections[0].color.g}, ${sections[0].color.b})`
      }

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

      el.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }, [bgScrollRef, rafRef])
  
  return (
    <Container>
      <FixedBg ref={bgScrollRef}/>
      {
        sections.map( (section, index) => {
          return (
            <ContentBlock key={index} section={section} index={index} />
          )
        })
      }
    </Container>
  )
}

export default App