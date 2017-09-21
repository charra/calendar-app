import React from 'react';
import './index.css';

export default function Modal(props) {
  if (props.show) {
    return (
    <div className="modal-wrapper">
      <div className="modal">
        <p>{props.message}</p>
            <span
              className="remove"
              onClick={() => props.removeModal()}
            ></span>
      </div>
    </div>
    )
  }
  else return <div> </div>;
}

