import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './translations/en.json'
import ru from './translations/ru.json'
import et from './translations/et.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: "en-GB",
  fallbackLocale: "en-GB",
  messages: {
    en,
    ru,
    et
  },
  silentFallbackWarn: true
})
