import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default new Vuex.Store({
    state: {
        currentYear: 2017,
        currentMonth: 8,
        eventFormPositionX: 0,
        eventFormPositionY: 0,
        eventFormActive: false,
        events: [
            { description: 'Random event 1', date: moment('2017-08-14', 'YYYY-MM-DD') },
            { description: 'Random event 2', date: moment('2017-07-14', 'YYYY-MM-DD') },
            { description: 'Random event 3', date: moment('2017-08-16', 'YYYY-MM-DD') }
        ]
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPosition(state, payload) {
            state.eventFormPositionX = payload.x;
            state.eventFormPositionY = payload.y;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        }
    }
});
