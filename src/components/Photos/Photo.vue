<template>
    <div class="wrapper">
        <ComponentLoader v-if="photoLoading" v-bind:content="'photo'" />
        <ComponentError v-else-if="!photoData.photo || !this.$route.params.title || !this.$route.query.pid" v-bind:content="'photo'" />
        <div v-else class="photo-main-wrapper">
            <PhotoItem v-bind:photoData="photoData" v-bind:options="photoOptions" />
            <button class="app-button close-button" v-on:click="closePhoto"><font-awesome-icon v-bind:icon="['fas', 'times']" /></button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import ComponentError from '@/components/ComponentError'
import PhotoItem from './PhotoItem'

export default {
    name: 'Photo',
    components: {
        ComponentLoader,
        ComponentError,
        PhotoItem
    },
    data() {
        return {
            payload: {
                id: 0
            },
            photoOptions: {
                details: true
            }
        }
    },
    methods: {
        ...mapActions(['ACTION_PHOTO']),
        closePhoto() {
            this.$router.go(-1);
        }
    },
    async created() {
        // REDIRECT TO USERS PAGE IF PARAMETERS FOR LOADING THE COMPONENT DATA ARE MISSING
        if( !this.$route.params.title || !this.$route.query.pid ) {
            this.$router.push({ path: '/photos' });
            return;
        }
        
        this.payload.id = this.$route.query.pid;
        await this.ACTION_PHOTO(this.payload);
    },
    computed: {
        ...mapGetters(['photoLoading', 'photoData'])
    }
}
</script>

<style scoped>

.photo-container .wrapper {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80px 0 0;
}

.photo-main-wrapper {
    position: relative;
}

.close-button {
    position: absolute;
    top: -20px;
    right: -20px;
    cursor: pointer;
    z-index: 2;
}

</style>