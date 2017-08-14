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
            decriment() {},
            increment() {}
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
