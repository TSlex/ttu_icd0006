import { i18n } from './i18n'

export const requireError = (key: string) => {
  const field = i18n.t(key).toString();
  const translation = i18n.t("bll.common.ErrorMessage_Required", [field])

  return translation.toString()
}

export const isGuid = (key: string) => {
  return key.match('^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$')
}

export const isHex = (key: string) => {
  return key.match('^#[0-9A-f]{6}$|^#[0-9A-f]{3}$')
}
