import React from 'react'

const EventsGroup = (props) => {
	// convert all time in minutes
	const calculateHeight = (duration, maxDuration) => (100 * duration) / maxDuration + '%'
	const calculateTopPosition = (elapsedTime, maxDuration) => (100 * elapsedTime) / maxDuration + '%'

	const maxDuration = (props.endHour - props.startHour) * 60
	return (
		<div>
			{props.groups.map((group, i) => 
				<div
					key={`group-${i}`}
					className="events-group"
					style={{
						top: calculateTopPosition(
							group.startTimeMinutes,
							maxDuration
						),
						height: calculateHeight(
							(group.finishTimeMinutes - group.startTimeMinutes),
							maxDuration
						)
					}}
				>
					{group.events.map((event) =>
						<div
							key={event.id}
							className="event"
							style={{
								top: calculateTopPosition(
									(event.start - group.startTimeMinutes),
									(group.finishTimeMinutes - group.startTimeMinutes)
								),
								height: calculateHeight(
									event.duration,
									(group.finishTimeMinutes - group.startTimeMinutes)
								)
							}}
							title={event.title}
						>
							{event.title}
							<span
								className="btn-remove"
								onClick={() => props.removeEvent(event.id)}
							></span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default EventsGroup