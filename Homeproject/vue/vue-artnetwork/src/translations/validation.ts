import { i18n } from './i18n'

export const requireError = (key: string) => {
  const field = i18n.t(key).toString();
  const translation = i18n.t("bll.common.ErrorMessage_Required", [field])

  return translation.toString()
}
