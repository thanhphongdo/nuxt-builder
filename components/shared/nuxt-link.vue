<template>
    <a :href="to" @click="goTo">
        <slot></slot>
    </a>
</template>
<script>

export default {
    props: {
        to: String
    },
    methods: {
        goTo(event) {
            event.preventDefault();
            this.$router.push(this.to);
        }
    }
}
</script>
