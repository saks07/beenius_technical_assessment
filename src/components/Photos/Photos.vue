<template>
    <div class="wrapper">
        <ComponentLoader v-if="photosLoading" v-bind:content="'photos'" />
        <ComponentError v-if="!photosData || !this.$route.query.aid" v-bind:content="'photos'" />
        <ul v-else class="photos-list">
            <li v-for="photo in photosData" v-bind:key="`photo${photo.id}`" class="photo-item">
                <div class="photo-wrapper">
                    <img class="photo" v-bind:src="photo.url" alt="" />
                    <div class="photo-title">{{ photo.title }}</div>
                    <router-link class="photo-link" v-bind:to="{ path: `/photos/photo/${photo.title.replace(/\s/g, '-')}`, query: { pid: photo.id } }"></router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import ComponentError from '@/components/ComponentError'

export default {
    name: 'Photos',
    components: {
        ComponentLoader,
        ComponentError
    },
    data() {
        return {
            payload: {
                albumId: 0
            }
        }
    },
    methods: {
        ...mapActions(['ACTION_PHOTOS'])
    },
    created() {
        // REDIRECT TO USERS PAGE IF PARAMETERS FOR LOADING THE COMPONENT DATA ARE MISSING
        if( !this.$route.params.title || !this.$route.query.aid ) {
            this.$router.push({ path: '/' });
            return;
        }

        this.payload.albumId = this.$route.query.aid;
        this.ACTION_PHOTOS(this.payload);
    },
    computed: {
        ...mapGetters(['photosLoading', 'photosData'])
    }
}
</script>

<style scoped>

.photos-list {
    position: relative;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
}

.photo-item {
    position: relative;
    width: 20%;
    padding: 10px;
}

.photo-wrapper {
    position: relative;
    width: 100%;
}

.photo {
    position: relative;
    width: 100%;
    height: auto;
    display: inline-block;
    vertical-align: bottom;
}

.photo-title {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    color: var(--color-grey);
    padding: 8px 16px;
    font-size: 0.8rem;
    background-color: rgba(255,255,255,0.5);
}

.photo-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

@media ( max-width: 1024px ) {
    .photo-item {
        width: 33.3333%;
    }
}

@media ( max-width: 768px ) {
    .photo-item {
        width: 50%;
    }
}

</style>