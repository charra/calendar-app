import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { removeEvent } from '../actions'
import Timetable from '../components/Timetable'

function mapStateToProps(state) {
  return { events: state.events }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable)
