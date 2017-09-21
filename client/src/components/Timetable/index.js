import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import EventsGroup from './EventsGroup'
import TimeScale from './TimeScale'


class Timetable extends React.Component {
  constructor(props) {
		super(props);
		// Set the day hours limits in 24h format
		this.startingHour = 8;
		this.finalHour = 17;
		this.state = {}
	}

	componentWillMount() {
		//this.props.receiveEvents();
	}

	groupOverlappingEvents(events) {
		// sorting events to start time
		const eventsArr = []
		let id
		for (id in events) {
			if (events.hasOwnProperty(id)) {
				const element = events[id]
				eventsArr.push(element)				
			}
		}
		const sortedEvents = eventsArr.slice().sort((a, b) => {
			return (a.start > b.start) ? 1 : -1;
		});

		const groupedEvents = []
		sortedEvents.forEach((item, i) => {
			const last = groupedEvents.length - 1;
			if (i === 0 || groupedEvents[last].finishTimeMinutes <= item.start) {
				// first iteration or events not overlap
				const newGroup = {
					startTimeMinutes: item.start,
					finishTimeMinutes: (item.start + item.duration),
					events: [ item ]
				}
				groupedEvents.push(newGroup);
			} else {
				groupedEvents[last].events.push(item);
				groupedEvents[last].finishTimeMinutes = item.start + item.duration;
			}
		});
		return groupedEvents;
	}

	render() {
		const groups = this.groupOverlappingEvents(this.props.events);
		return (
			<div className="">
				<header className="header">
				<h1>Events</h1>
				<p className="sub-title">Event calendar</p>
				</header>
				<div className="timetable">
					<TimeScale
						startHour={this.startingHour}
						endHour={this.finalHour}
					/>
					<EventsGroup
						groups={groups}
						startHour={this.startingHour}
						endHour={this.finalHour}
						removeEvent={this.props.removeEvent}
					/>
				</div>
				<div className="button-container">
				<Link to='/addevent' 
            		className="button"
				>
					Add event
				</Link>
				</div>
			</div>
		);
	}
}

export default Timetable