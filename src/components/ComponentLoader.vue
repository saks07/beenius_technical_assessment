<template>
    <div class="loader-container">Loading {{ content }} ...</div>
</template>

<script>
export default {
    name: 'ComponentLoader',
    props: {
        content: {
            type: String,
            required: true,
            default: 'users'
        }
    }
}
</script>

<style scoped>

.loader-container {
    position: relative;
    width: 100%;
    text-align: center;
}

</style>