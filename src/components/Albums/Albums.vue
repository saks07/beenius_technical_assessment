<template>
    <div class="wrapper">
        <ComponentLoader v-if="albumsLoading" v-bind:content="'albums'" />
        <ComponentError v-else-if="!albumsData" v-bind:content="'albums'" />
        <ul v-else class="albums-list">
            <li v-for="album in albumsData" v-bind:key="`album-${album.id}`" class="album-item">
                <AlbumItem v-bind:album="album" />
            </li>
        </ul>
        <PaginationComponent v-if="albumsPages > 1" v-bind:pages="albumsPages" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import AlbumItem from './AlbumItem'
import ComponentError from '@/components/ComponentError'
import PaginationComponent from '@/components/PaginationComponent'

export default {
    name: 'Albums',
    components: {
        ComponentLoader,
        AlbumItem,
        ComponentError,
        PaginationComponent
    },
    data() {
        return {
            payload: {
                count: {},
                results: {
                    _page: 1,
                    _limit: 10
                }
            }
        }
    },
    watch: {
        '$route'(url) {
            this.payload = {
                count: {},
                results: {
                    _page: 1,
                    _limit: 10
                }
            };

            this.setPayload(url);

            this.ACTION_ALBUMS(this.payload);
        }
    },
    methods: {
        ...mapActions(['ACTION_ALBUMS']),
        setPayload(route) {
            const { uid, page } = route.query;
            if( uid ) {
                this.payload.count.userId = uid;
                this.payload.results.userId = uid;
            }
            if( page ) this.payload.results._page = page;
        }
    },
    created() {
        if( this.$route.query.uid || this.$route.query.page ) {
            this.setPayload(this.$route);
        }

        this.ACTION_ALBUMS(this.payload);

        this.$root.$on('changePage', message => {
            let routePath = { path: this.$route.path, query: { ...this.$route.query } };
            if( message.pageNumber > 1 ) routePath.query = { ...routePath.query, page: message.pageNumber };
            else delete routePath.query.page;
            this.$router.replace(routePath);
        });
    },
    computed: {
        ...mapGetters(['albumsLoading', 'albumsData', 'albumsPages'])
    }
}
</script>

<style scoped>

.albums-list {
    position: relative;
    width: auto;
    margin: 0 -10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.album-item {
    position: relative;
    width: 50%;
    padding: 10px;
}

</style>