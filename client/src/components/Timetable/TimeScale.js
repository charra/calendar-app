import React from 'react'

class TimeScale extends React.Component {
	constructor(props) {
		super(props)
		// set scale interval in hours
		this.interval = 0.5
	}

	shouldComponentUpdate() {
		return false
	}

	createTimePointEl(startHour, filledTime, maxDuration) {
		const positionTop = (100*filledTime)/maxDuration + '%'
		let time = startHour + filledTime
		// set 12h format
		if (time >= 13) time -= 12

		let timeStr
		if (time%1) {
			timeStr = Math.floor(time) + ':30'
		} else {
			timeStr = time + ':00'
		}

		return (
			<div
				key={time}
				className={'time-point' + ((time%1) ? '' : ' big')}
				style={{top: positionTop}}
			>
				{timeStr}
			</div>
		);
	}

	render() {
		const { startHour, endHour } = this.props
		const pointElements = []
		const maxDuration = endHour - startHour
		// duration from start point in hours
		let duration = 0

		while(duration <= maxDuration) {
			pointElements.push(
				this.createTimePointEl(startHour, duration, maxDuration)
			);
			duration += this.interval
		}

		return <div>{pointElements}</div>
	}
}

export default TimeScale