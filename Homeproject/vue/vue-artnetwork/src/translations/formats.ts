import store from '@/store';
import moment from 'moment';

export const resolveTimeFormat = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "hh:mm";
    case "et-EE":
      return "hh:mm";
    default:
      return "hh:mm";
  }
}

export const resolveDateFormat = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "MM.DD.YYYY hh:mm";
    case "et-EE":
      return "MM.DD.YYYY hh:mm";
    default:
      return "MM/DD/YYYY hh:mm";
  }
}

export const formatShortTime = (value: string) => {
  let m = moment(value)

  m.locale(store.getters.getCurrentCulture)

  return m.format("D MMMM")
}
