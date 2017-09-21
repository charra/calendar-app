import React from 'react'
import './index.css'
import moment from 'moment'
import TimeRangePicker from '../TimeRangePicker'



class AddEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { start: '', end: '', title: '', updateTime: false } 
    this.getDate = this.getDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.updateRangeInput = this.updateRangeInput.bind(this)
  }

  getDate (date) {
    this.setState({ 
      start: date.start,
      end: date.end,
      title: this.state.title
    })
  }

  handleTitleChange(event) {
    this.setState({ 
      start: this.state.start,
      end: this.state.end,
      title: event.target.value
    })
  }

  updateRangeInput() {
    this.setState({ 
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      updateTime: false
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const getMinutes = (date) => date / (1000 * 60 )

    if (this.state.start && this.state.end) {
      const durationTime = getMinutes(moment(moment(this.state.end, "HH:mm") - moment(this.state.start, "HH:mm")).valueOf() )
      const startTime = getMinutes(moment(this.state.start, "HH:mm").valueOf() ) - getMinutes(moment("08:00", "HH:mm").valueOf())
      const event = { 
        start: startTime,
        duration: durationTime,
        title: this.state.title,
        id: new Date().getTime()
      }
      this.props.addEvent(event)
      this.setState({ start: '', end: '', title: '', updateTime: true })
      this.props.history.push("/")
    }
  }
  
  
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1>Add event</h1>
          <p className="sub-title">Event calendar</p>
        </header>
        <form
          className="input-event"
          onSubmit={this.handleSubmit}
        >
          <TimeRangePicker      
            unit={30} 
            available={{start: '08:00', end: '17:00'}} 
            unavailable={[]}
            addEventCollback={this.getDate}
            isupdated={this.updateRangeInput}
            needUpdate={this.state.updateTime}
          />
          <input
            className="input"
            type="text"
            value={this.state.title}
            placeholder="Enter event description"
            onChange={this.handleTitleChange}
            required="true"
          />        
          <input
            className="button"
            type="submit"
            value="Add event"
          />  
        </form>
      </div>
    )
  }
}

export default AddEvent