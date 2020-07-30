import { ProfileGender } from '@/types/Enums/ProfileGender';
import store from '@/store';

export const resolveGender = (gender: ProfileGender) => {
  let tr = "???";

  switch (gender) {
    case ProfileGender.Male:
      tr = getMaleTranslaton()
      break;
    case ProfileGender.Female:
      tr = getFemaleTranslaton()
      break;
    case ProfileGender.Own:
      tr = getOwnTranslaton()
  }

  return tr;
}

const getMaleTranslaton = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "Мужской";
    case "et-EE":
      return "Mees";
    default:
      return "Male";
  }
}

const getFemaleTranslaton = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "Женский";
    case "et-EE":
      return "Naine";
    default:
      return "Female";
  }
}

const getOwnTranslaton = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "Свой";
    case "et-EE":
      return "Oma";
    default:
      return "Own";
  }
}
