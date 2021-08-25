<template>
    <div class="wrapper">
        <ComponentLoader v-if="photosLoading" v-bind:content="'photos'" />
        <ComponentError v-else-if="!photosData" v-bind:content="'photos'" />
        <ul v-else class="photos-list">
            <li v-for="photo in photosData" v-bind:key="`photo${photo.id}`" class="photo-item">
                <PhotoItem v-bind:photoData="{ photo: photo }" v-bind:options="photoOptions" />
            </li>
        </ul>
        <PaginationComponent v-if="photosPages > 1" v-bind:pages="photosPages" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import ComponentError from '@/components/ComponentError'
import PhotoItem from './PhotoItem'
import PaginationComponent from '@/components/PaginationComponent'

export default {
    name: 'Photos',
    components: {
        ComponentLoader,
        ComponentError,
        PhotoItem,
        PaginationComponent
    },
    data() {
        return {
            payload: {
                count: {},
                results: {
                    _page: 1,
                    _limit: 25
                }
            },
            photoOptions: {
                details: false
            }
        }
    },
    watch: {
        '$route'(url) {
            this.payload = {
                count: {},
                results: {
                    _page: 1,
                    _limit: 25
                }
            };

            this.setPayload(url);

            this.ACTION_PHOTOS(this.payload);
        }
    },
    methods: {
        ...mapActions(['ACTION_PHOTOS']),
        setPayload(route) {
            const { aid, page } = route.query;
            if( aid ) {
                this.payload.count.albumId = aid;
                this.payload.results.albumId = aid;
            }
            if( page ) this.payload.results._page = page;
        }
    },
    created() {
        if( this.$route.query.aid || this.$route.query.page ) {
            this.setPayload(this.$route);
        }

        this.ACTION_PHOTOS(this.payload);

        this.$root.$on('changePage', message => {
            let routePath = { path: this.$route.path, query: { ...this.$route.query } };
            if( message.pageNumber > 1 ) routePath.query = { ...routePath.query, page: message.pageNumber };
            else delete routePath.query.page;
            this.$router.replace(routePath);
        });
    },
    computed: {
        ...mapGetters(['photosLoading', 'photosData', 'photosPages'])
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