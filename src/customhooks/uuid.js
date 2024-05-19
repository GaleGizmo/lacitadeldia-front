import { v4 as uuidv4 } from 'uuid';

export const getOrCreateUUID = () => {
  let uuid = localStorage.getItem('userUUID');
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem('userUUID', uuid);
  }
  return uuid;
};
