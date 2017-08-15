<template>
    <div>
        <div>{{ formattedDate }}</div>
        <button @click="decriment">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script>
    export default {
        methods: {
            decriment() {
                if (this.month === 1) {
                    this.$store.commit('setCurrentMonth', 12);
                    this.$store.commit('setCurrentYear', this.year - 1);
                } else {
                    this.$store.commit('setCurrentMonth', this.month - 1);
                }
                this.$store.commit('eventFormActive', false);
            },
            increment() {
                if (this.month === 12) {
                    this.$store.commit('setCurrentMonth', 1);
                    this.$store.commit('setCurrentYear', this.year + 1);
                } else {
                    this.$store.commit('setCurrentMonth', this.month + 1);
                }
                this.$store.commit('eventFormActive', false);
            }
        },
        computed: {
            formattedDate() {
                return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').format('MMMM YYYY');
            },
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            }
        }
    }
</script>
