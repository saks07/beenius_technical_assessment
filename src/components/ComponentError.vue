<template>
    <div class="component-error">no {{ content }} found</div>
</template>

<script>
export default {
    name: 'ComponentError',
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
</style>