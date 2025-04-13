// types
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const SET_CURRENT_NOTIFICATION = "SET_CURRENT_NOTIFICATION";
export const SET_BONUS_MODAL_SHOWN = "SET_BONUS_MODAL_SHOWN";
export const RESET_BONUS_MODAL_SHOWN = "RESET_BONUS_MODAL_SHOWN";
export const CLEAR_BACKEND_NOTIFICATIONS = "CLEAR_BACKEND_NOTIFICATIONS";
export const NEXT_NOTIFICATION = "NEXT_NOTIFICATION";
export const SET_BACKEND_NOTIFICATIONS = "SET_BACKEND_NOTIFICATIONS";

// actions
import { getUserNotifications, markNotificationAsRead } from "../../shared/api.js";

export const fetchBackendNotifications = (userId) => async (dispatch) => {
  try {
    const notifications = await getUserNotifications(userId);
    if (notifications.length > 0) {
      dispatch({ type: SET_BACKEND_NOTIFICATIONS, payload: notifications });
      dispatch({ type: SET_CURRENT_NOTIFICATION, payload: notifications[0] });
    } else {
      dispatch({ type: CLEAR_BACKEND_NOTIFICATIONS });
    }
  } catch (error) {
    console.error("Error cargando notificaciones del backend:", error);
  }
};

export const markCurrentNotificationAsRead = (userId, notificationId) => async () => {
  try {
    await markNotificationAsRead(userId, notificationId);
  } catch (error) {
    console.error("Error marcando como leída la notificación:", error);
    throw error;
  }

};
export const setNotifications = (notifications) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

export const setCurrentNotification = (notification) => ({
  type: SET_CURRENT_NOTIFICATION,
  payload: notification,
});

export const setBonusModalShown = (shown) => ({
  type: SET_BONUS_MODAL_SHOWN,
  payload: shown,
});
export const resetBonusModalShown = () => ({
    type: RESET_BONUS_MODAL_SHOWN,
  });
export const clearBackendNotifications = () => ({
  type: CLEAR_BACKEND_NOTIFICATIONS,
});
export const nextNotification = () => ({
  type: NEXT_NOTIFICATION,
});
  
