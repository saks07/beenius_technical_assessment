<template>
    <div class="user-wrapper">
        <div class="username-container">
            <div class="username">{{ user.username }}</div>
            <div class="name">{{ user.name }}</div>
            <div class="email">{{ user.email }}</div>
        </div>
        <div class="user-photo-container">
            <img class="user-photo" v-bind:src="user.photo.thumbnailUrl" alt="">
        </div>
        <router-link class="user-link" v-bind:to="{ path: `/albums/${user.username.replace(/[\_\.]+/g, '-').toLowerCase()}`, query: { uid: user.id } }"></router-link>
    </div>
</template>

<script>
export default {
    name: 'UserItem',
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

.user-wrapper {
    position: relative;
    width: 100%;
    background-color: var(--color-white);
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.username-container > div {
    position: relative;
    width: 100%;
    font-size: 0.8rem;
    margin: 0 0 5px;
    font-weight: 600;
}

.username-container {
    max-width: 50%;
}

.username-container .username {
    font-size: 1.2rem;
    font-weight: 700;
    margin : 0 0 20px;
    color: var(--color-main);
}

.username-container .email {
    color: var(--color-main);
}

.user-photo {
    position: relative;
    max-width: 150px;
    width: 100%;
    height: auto;
    display: inline-block;
    vertical-align: bottom;
}

.user-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>