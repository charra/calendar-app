import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { register } from '../actions'
import Register from '../components/Register'

/* function mapStateToProps(state) {
  return { events: state }
} */

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ register }, dispatch)
}

export default connect(null, mapDispatchToProps)(Register)
