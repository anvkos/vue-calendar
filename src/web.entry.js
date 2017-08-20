import './style.scss';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

let events = window._INITIAL_STATE_.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
});

import VueCalendar from './entry';
VueCalendar(events).$mount('#app');
