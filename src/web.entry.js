import Vue from 'vue';
import './style.scss';

import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

let events = [
    { description: 'Random event 1', date: moment('2017-08-14', 'YYYY-MM-DD') },
    { description: 'Random event 2', date: moment('2017-07-14', 'YYYY-MM-DD') },
    { description: 'Random event 3', date: moment('2017-08-16', 'YYYY-MM-DD') }
  ]
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
