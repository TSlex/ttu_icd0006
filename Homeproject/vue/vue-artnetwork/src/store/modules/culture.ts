import { LanguageExtensions } from '@/types/Enums/LanguageExtensions';
import { i18n } from '@/translations/i18n';

interface IState {
  culture: LanguageExtensions | null;
}

export const CultureModule = {
  state: { culture: null as LanguageExtensions | null, },
  getters: {
    getCurrentCulture(context: any): LanguageExtensions {
      if (!context.culture) {
        let cultureCode = localStorage.getItem('culture')

        for (let key in LanguageExtensions) {
          let value: string = LanguageExtensions[key as keyof typeof LanguageExtensions];
          if (value === cultureCode) {
            context.culture = value as LanguageExtensions;
          }
        }

        if (!context.culture) {
          context.culture = LanguageExtensions.en;
        }
      }

      i18n.locale = context.culture;

      return context.culture;
    },
  },
  mutations: {
    setCulture(state: IState, culture: LanguageExtensions) {
      localStorage.setItem('culture', culture)
      state.culture = culture;
    },
  },
  actions: {}
}
