import store from '@/store';
import { ImageType } from '@/types/Enums/ImageType';

export const resolveType = (type: ImageType) => {
  let tr = "???";

  switch (type) {
    case ImageType.ProfileAvatar:
      tr = getProfileAvatarTranslaton()
      break;
    case ImageType.Post:
      tr = getPostTranslaton()
      break;
    case ImageType.Gift:
      tr = getGiftTranslaton()
      break;
    case ImageType.Undefined:
      tr = getUndefinedTranslaton()
      break;
  }

  return tr;
}

const getProfileAvatarTranslaton = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "Аватар";
    case "et-EE":
      return "Avatar";
    default:
      return "Avatar";
  }
}
const getPostTranslaton = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "Пост";
    case "et-EE":
      return "Postitus";
    default:
      return "Post";
  }
}
const getGiftTranslaton = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "Подарок";
    case "et-EE":
      return "Kingitus";
    default:
      return "Gift";
  }
}

const getUndefinedTranslaton = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return "Прочее";
    case "et-EE":
      return "Muu";
    default:
      return "Misc";
  }
}
