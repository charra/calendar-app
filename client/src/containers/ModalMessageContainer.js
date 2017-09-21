import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { removeModal } from '../actions'
import ModalMessage from '../components/ModalMessage'

function mapStateToProps(state) {
  return { 
    message: state.modal.message,
    show: state.modal.show
   }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeModal }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage)
