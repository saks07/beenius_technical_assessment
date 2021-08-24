<template>
    <div class="wrapper">
        <ComponentLoader v-if="usersLoading" v-bind:content="'users'" />
        <ComponentError v-else-if="!usersData" v-bind:content="'users'" />
        <ul v-else class="users-list">
            <li v-for="user in usersData" v-bind:key="`user-${user.id}`" class="user-item">
                <UserItem v-bind:user="user" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import UserItem from './UserItem'
import ComponentError from '@/components/ComponentError'

export default {
    name: 'Users',
    components: {
        ComponentLoader,
        UserItem,
        ComponentError
    },
    methods: {
        ...mapActions(['ACTION_USERS'])
    },
    created() {
        this.ACTION_USERS();
    },
    computed: {
        ...mapGetters(['usersLoading', 'usersData'])
    }
}
</script>

<style scoped>

.users-list {
    position: relative;
    width: auto;
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.user-item {
    position: relative;
    width: 33.3333%;
    padding: 10px;
}

@media ( max-width: 1440px ) {
    .user-item {
        width: 50%;
    }
}

@media ( max-width: 479px ) {
    .user-item {
        width: 100%;
    }
}

</style>