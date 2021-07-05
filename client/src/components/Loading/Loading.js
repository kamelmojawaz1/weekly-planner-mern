import React from 'react'
import './Loading.sass'

const Loading = () => {
  return (
    <div className="container">
      <div className="loader">
        <div className="loader--dot" />
        <div className="loader--dot" />
        <div className="loader--dot" />
        <div className="loader--dot" />
        <div className="loader--dot" />
        <div className="loader--dot" />
        <div className="loader--dot" />
      </div>
      <div className="loader--text"></div>
    </div>
  )
}

export default Loading
