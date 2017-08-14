import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentYear: 2017,
        currentMonth: 8
    }
});