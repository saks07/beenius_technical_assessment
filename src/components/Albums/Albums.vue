<template>
    <div class="wrapper">
        <ComponentLoader v-if="albumsLoading" v-bind:content="'albums'" />
        <ComponentError v-if="!albumsData || !this.$route.params.user || !this.$route.query.uid" v-bind:content="'albums'" />
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
            payload: {
                userId: 0
            }
        }
    },
    methods: {
        ...mapActions(['ACTION_ALBUMS'])
    },
    created() {
        // REDIRECT TO USERS PAGE IF PARAMETERS FOR LOADING THE COMPONENT DATA ARE MISSING
        if( !this.$route.params.user || !this.$route.query.uid ) {
            this.$router.push({ path: '/' });
            return;
        }
        
        this.payload.userId = this.$route.query.uid;
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