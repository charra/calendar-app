import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addEvent } from '../actions'
import AddEvent from '../components/AddEvent'


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEvent }, dispatch)
}

export default connect(null, mapDispatchToProps)(AddEvent)
