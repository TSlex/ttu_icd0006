import { LanguageExtensions } from '@/types/Enums/LanguageExtensions';
import { i18n } from '@/translations/i18n';
import EventBus from '@/events/EventBus';

interface IState {
  culture: LanguageExtensions | null;
}

export const CultureModule = {
  state: { culture: null as LanguageExtensions | null, },
  getters: {
    getCurrentCulture(state: any): LanguageExtensions {
      if (!state.culture) {
        let cultureCode = localStorage.getItem('culture')

        for (let key in LanguageExtensions) {
          let value: string = LanguageExtensions[key as keyof typeof LanguageExtensions];
          if (value === cultureCode) {
            state.culture = value as LanguageExtensions;
          }
        }

        if (!state.culture) {
          state.culture = LanguageExtensions.en;
        }
      }

      i18n.locale = state.culture;

      return state.culture;
    },
  },
  mutations: {
    setCulture(state: IState, culture: LanguageExtensions) {
      localStorage.setItem('culture', culture)
      state.culture = culture;

      EventBus.$emit('culture-update', culture)
    },
  },
  actions: {}
}
