import store from '@/store';
import moment from 'moment';

export const resolveTimeFormat = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "HH:mm";
    case "et-EE":
      return "HH:mm";
    default:
      return "HH:mm";
  }
}

export const resolveDateFormat = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "DD.MM.YYYY HH:mm";
    case "et-EE":
      return "DD.MM.YYYY HH:mm";
    default:
      return "DD/MM/YYYY HH:mm";
  }
}

export const formatShortTime = (value: string) => {
  let m = moment(value)

  m.locale(store.getters.getCurrentCulture)

  return m.format("D MMMM")
}
