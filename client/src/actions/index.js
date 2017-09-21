import { ADD_EVENT, REMOVE_EVENT, RECEIVE_EVENTS, MODAL_SHOW, MODAL_HIDE, LOADING } from '../constants'
import { updateStorage } from '../utils/storage'

function updateStorageDB(state) {
  return  Promise.resolve()
  .then(updateStorage('events', state))
  .then(() => fetch("/update", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      method: "POST",
      body: JSON.stringify(state.events)
  }))
  .then(response => {        
    if(response==='ok') {
      return
    }
    throw new Error(response);
  })
  .catch((responseError) => showModalMessage(responseError))
}

export function addEvent(eventObj) {
  return (dispatch, getState) => {
    console.log(eventObj)
    return  Promise.resolve()
    .then(() => dispatch({
        type: ADD_EVENT,
        event: {eventObj},
        id: eventObj.id
      })
    )
    .then(() => updateStorageDB(getState()))
  }
}

export function register(userInfo) {
  console.log(userInfo, 'fetch')
  return (dispatch, getState) => {
    return Promise.resolve()
    .then(dispatch(setLoading()))
    .then(() => fetch("/login", {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        mode: 'cors',
        method: "POST",
        body: `name=${encodeURIComponent(userInfo.username)}&password=${encodeURIComponent(userInfo.pass)}`
    })
        .then(response => response.json())
        .then((eventsArr) => {
          dispatch({
            type: RECEIVE_EVENTS,
            events: eventsArr
          })
        })
      .then(() => updateStorage('events', getState()))
      .catch((responseError) => showModalMessage(responseError))
    )
  }
}

export function removeEvent(eventId) {
  return (dispatch, getState) => {
    return  Promise.resolve()
    .then(() => dispatch({
      type: REMOVE_EVENT,
      id: eventId
    })
    )
    .then(() => updateStorageDB(getState()))
  }
}


export function showModalMessage(modalMessage) {
  return (dispatch, getState) => {
    return  Promise.resolve()
    .then(() => dispatch({
        type: MODAL_SHOW,
        show: true,
        message: JSON.stringify(modalMessage)
      })
    )
    .then(() => updateStorage('events', getState()))
  }
}

export function removeModal() {
  return (dispatch, getState) => {
    return  Promise.resolve()
    .then(() => dispatch({
        type: MODAL_HIDE,
        show: false,
        message: ''
      })
    )
    .then(() => updateStorage('events', getState()))
  }
}

export function setLoading() {
  return (dispatch, getState) => {
    return Promise.resolve()
    .then(() => dispatch({
        type: LOADING,
      })
    )
    .then(() => updateStorage('events', getState()))
  }
}
