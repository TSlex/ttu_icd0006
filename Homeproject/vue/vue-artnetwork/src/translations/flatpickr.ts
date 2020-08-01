
import Vue from 'vue';
import VueFlatPickr from 'vue-flatpickr-component';

import flatpickr from "flatpickr";
import { Estonian } from 'flatpickr/dist/l10n/et.js'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import store from '@/store';
import moment from 'moment';

Vue.use(VueFlatPickr);

flatpickr.setDefaults(
  {
    enableTime: true,
    time_24hr: true,
    defaultHour: 12
  }
)

export const resolveConfig = () => {
  switch (store.getters.getCurrentCulture) {
    case "ru-RU":
      return ({
        dateFormat: "H:i d.m.Y",
        locale: Russian,
        parseDate: function (date: string) {
          return moment(date).toDate();
        }
      });
    case "et-EE":
      return ({
        dateFormat: "H:i d.m.Y",
        locale: Estonian,
        parseDate: function (date: string) {
          return moment(date).toDate();
        },
      });
    default:
      return ({
        dateFormat: "H:i d/m/Y",
        locale: { firstDayOfWeek: 1 },
        parseDate: function (date: string) {
          return moment(date).toDate();
        }
      });
  }
}
