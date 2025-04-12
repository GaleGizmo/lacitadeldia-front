import {
    SET_NOTIFICATIONS,
    SET_CURRENT_NOTIFICATION,
    SET_BONUS_MODAL_SHOWN,
    RESET_BONUS_MODAL_SHOWN,
    CLEAR_BACKEND_NOTIFICATIONS,
    NEXT_NOTIFICATION,
    SET_BACKEND_NOTIFICATIONS,
  } from "./notifications.actions";
  
  const initialState = {
    notifications: [],
    currentNotification: null,
    bonusModalShown: false,
    backendNotifications: [],
    currentNotificationIndex: 0,
  };
  
  const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BACKEND_NOTIFICATIONS:
            return {
              ...state,
              backendNotifications: action.payload,
              currentNotificationIndex: 0,
            };
          case NEXT_NOTIFICATION:
            return {
              ...state,
              currentNotificationIndex: state.currentNotificationIndex + 1,
            };
          case CLEAR_BACKEND_NOTIFICATIONS:
            return {
              ...state,
              backendNotifications: [],
              currentNotificationIndex: 0,
            };
      case SET_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload,
        };
  
      case SET_CURRENT_NOTIFICATION:
        return {
          ...state,
          currentNotification: action.payload,
        };
  
      case SET_BONUS_MODAL_SHOWN:
        return {
          ...state,
          bonusModalShown: action.payload,
        };
      case RESET_BONUS_MODAL_SHOWN:
        return {
          ...state,
          bonusModalShown: false,
        };  
      default:
        return state;
    }
  };
  
  export default notificationsReducer;
  