import React from 'react';
import './Loader.css';

export default function Loader(props) {
  let loader = [];
  if (props.loading) {
    loader.push(
      <div key={13} className="loadme-circlePoint">
        <div key={1} className="loadme-circlePoint1 loadme-circlePoint-child"></div>
        <div key={2} className="loadme-circlePoint2 loadme-circlePoint-child"></div>
        <div key={3} className="loadme-circlePoint3 loadme-circlePoint-child"></div>
        <div key={4} className="loadme-circlePoint4 loadme-circlePoint-child"></div>
        <div key={5} className="loadme-circlePoint5 loadme-circlePoint-child"></div>
        <div key={6} className="loadme-circlePoint6 loadme-circlePoint-child"></div>
        <div key={7} className="loadme-circlePoint7 loadme-circlePoint-child"></div>
        <div key={8} className="loadme-circlePoint8 loadme-circlePoint-child"></div>
        <div key={9} className="loadme-circlePoint9 loadme-circlePoint-child"></div>
        <div key={10} className="loadme-circlePoint10 loadme-circlePoint-child"></div>
        <div key={11} className="loadme-circlePoint11 loadme-circlePoint-child"></div>
        <div key={12} className="loadme-circlePoint12 loadme-circlePoint-child"></div>
      </div>
    )
  }
  return (
    <div>
      {loader}
    </div>
  )
}

