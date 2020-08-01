
import Vue from 'vue';
import VueFlatPickr from 'vue-flatpickr-component';

import { Estonian } from 'flatpickr/dist/l10n/et.js'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import store from '@/store';

Vue.use(VueFlatPickr);

export const resolveConfig = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return ({
        dateFormat: "H:i d.m.Y",
        enableTime: true,
        time_24hr: true,
        defaultHour: 12,
        locale: Russian
      });
    case "et-EE":
      return ({
        dateFormat: "H:i d.m.Y",
        enableTime: true,
        time_24hr: true,
        defaultHour: 12,
        locale: Estonian
      });
    default:
      return ({
        dateFormat: "H:i d/m/Y",
        enableTime: true,
        time_24hr: true,
        defaultHour: 12,
        locale: { firstDayOfWeek: 1 }
      });
  }
}
