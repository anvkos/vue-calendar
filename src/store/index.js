import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store({
    state: {
        currentYear: 2017,
        currentMonth: 8,
        eventFormPositionX: 0,
        eventFormPositionY: 0,
        eventFormActive: false,
        events: [],
        eventFormDate: moment()
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
        },
        addEvent(state, payload) {
            state.events.push(payload);
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload
        }
    },
    actions: {
        addEvent(context, payload) {
            return new Promise((resolve, reject) => {
                let eventData = {
                    description: payload,
                    date: context.state.eventFormDate
                }
                Axios.post('/add_event', eventData).then(response => {
                    if (response.status === 200) {
                        context.commit('addEvent', eventData);
                        resolve();
                    } else {
                        reject();
                    }
                })
            });
        }
    }
});
