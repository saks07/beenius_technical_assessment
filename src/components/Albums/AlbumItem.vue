<template>
    <div class="album-wrapper">
        <div class="album-title" v-bind:title="album.title">{{ album.title }}</div>
        <ul class="album-photos">
            <li v-for="photo in album.photos" v-bind:key="`albumPhoto-${photo.id}`" class="album-photo-item">
                <img class="album-photo" v-bind:src="photo.thumbnailUrl" />
                <router-link class="album-photo-link" v-bind:to="{ path: `/photos/${album.title.replace(/\s/g, '-')}`, query: { aid: album.id } }"></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AlbumItem',
    props: {
        album: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

.album-wrapper {
    position: relative;
    width: 100%;
    background-color: var(--color-white);
    padding: 20px;
}

.album-title {
    position: relative;
    max-width: 100%;
    width: 90%;
    margin: 0 0 20px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.album-photos {
    position: relative;
    width: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 -5px;
}

.album-photo-item {
    position: relative;
    padding: 5px;
}

.album-photo-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>