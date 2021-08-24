<template>
    <div class="wrapper">
        <ComponentLoader v-if="albumsLoading" v-bind:content="'albums'" />
        <ComponentError v-else-if="!albumsData" v-bind:content="'albums'" />
        <ul v-else class="albums-list">
            <li v-for="album in albumsData" v-bind:key="`album-${album.id}`" class="album-item">
                <AlbumItem v-bind:album="album" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import AlbumItem from './AlbumItem'
import ComponentError from '@/components/ComponentError'

export default {
    name: 'Albums',
    components: {
        ComponentLoader,
        AlbumItem,
        ComponentError
    },
    data() {
        return {
            payload: {}
        }
    },
    watch: {
        '$route'(url) {
            if( !url.params.user ) {
                this.payload = {};
                this.ACTION_ALBUMS(this.payload);
            }
        }
    },
    methods: {
        ...mapActions(['ACTION_ALBUMS'])
    },
    created() {
        if( this.$route.query.uid ) {
            this.payload.userId = this.$route.query.uid;
        }
        this.ACTION_ALBUMS(this.payload);
    },
    computed: {
        ...mapGetters(['albumsLoading', 'albumsData'])
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