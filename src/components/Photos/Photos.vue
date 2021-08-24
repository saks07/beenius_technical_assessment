<template>
    <div class="wrapper">
        <ComponentLoader v-if="photosLoading" v-bind:content="'photos'" />
        <ComponentError v-else-if="!photosData" v-bind:content="'photos'" />
        <ul v-else class="photos-list">
            <li v-for="photo in photosData" v-bind:key="`photo${photo.id}`" class="photo-item">
                <PhotoItem v-bind:photoData="{ photo: photo }" v-bind:options="photoOptions" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import ComponentError from '@/components/ComponentError'
import PhotoItem from './PhotoItem'

export default {
    name: 'Photos',
    components: {
        ComponentLoader,
        ComponentError,
        PhotoItem
    },
    data() {
        return {
            payload: {},
            photoOptions: {
                details: false
            }
        }
    },
    watch: {
        '$route'(url) {
            if( !url.params.aid ) {
                this.payload = {};
                this.ACTION_ALBUMS(this.payload);
            }
        }
    },
    methods: {
        ...mapActions(['ACTION_PHOTOS'])
    },
    created() {
        if( this.$route.query.aid ) {
            this.payload.albumId = this.$route.query.aid;
        }
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