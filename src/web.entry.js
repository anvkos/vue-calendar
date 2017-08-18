import Vue from 'vue';
import './style.scss';

import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

let events = window._INITIAL_STATE_.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
})

let initialState = Object.assign({}, store.state, { events });
store.replaceState(initialState);

import App from './components/App.vue';

new Vue({
    el: '#app',
    data: {
        moment
    },
    components: {
        App
    },
    store
});
