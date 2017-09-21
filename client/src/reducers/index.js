import { ADD_EVENT, REMOVE_EVENT, RECEIVE_EVENTS, MODAL_SHOW, MODAL_HIDE, LOADING } from '../constants'

let id;
const stateObj = {
  loading: false,
  modal: { 
      show: false,
      message: ''
    },
  places: {},
  events: {}
}

export default function reducer(state = stateObj, action) {
  switch (action.type) {
    case ADD_EVENT:
      let newStoreAdd = {
          loading: false,
          modal:{...state.modal},
          places: {...state.places},
          events: {...state.events,
            [action.id]: action.event.eventObj}
        };
      return newStoreAdd;
    case RECEIVE_EVENTS:
      let newStoreReceive = {
          loading: false,
          modal:{...state.modal},
          places: {...state.places},
          events: {...state.events,
            ...action.events
            }
        };
      return newStoreReceive;
    case REMOVE_EVENT:
      let newStoreRemove = {loading: false, modal:{...state.modal}, places: {...state.places}, events: {} }
      for (id in state.events) {
        if (state.events.hasOwnProperty(id) && (parseInt(id, 10) !== action.id)) {
          newStoreRemove.events[id] = state.events[id];
        }
      }
      return newStoreRemove;
    case LOADING:
      return {
          loading: true,
          modal:{...state.modal},
          places: {...state.places,
            },
          events: {...state.events}
        };
    case MODAL_SHOW:
      return {
          loading: false,
          modal:{
            show: true,
            message: action.message
          },
          places: {...state.places,
            },
          events: {...state.events}
        };
    case MODAL_HIDE:
      return {
          loading: false,
          modal:{
            show: false,
            message: action.message
          },
          places: {...state.places,
            },
          events: {...state.events}
        };
    default:
      return state;
  }
}