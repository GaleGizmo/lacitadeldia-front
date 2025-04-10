// types
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const SET_CURRENT_NOTIFICATION = "SET_CURRENT_NOTIFICATION";
export const SET_BONUS_MODAL_SHOWN = "SET_BONUS_MODAL_SHOWN";
export const RESET_BONUS_MODAL_SHOWN = "RESET_BONUS_MODAL_SHOWN";

// actions
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
  
