import React from 'react'

import loader from "../assets/loader.gif"

function Loader() {
  return (
    <div>
      <img src={loader} style={{height: '5em',width: '5em',borderRadius: '50px'}} />
    </div>
  )
}

export default Loader
