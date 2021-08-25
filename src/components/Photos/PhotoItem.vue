<template>
    <div v-bind:class="['photo-wrapper', { 'photo-view': options.details }]">
        <img id="photo" class="photo" v-bind:src="photoData.photo.url" />
        <div v-if="options.details" v-bind:class="['details-container', { 'show': details.show }]">
            <div class="detail image-title">{{ photoData.photo.title }}</div>
            <div class="detail image-album">
                <label for="album" class="detail-label">album:</label><span class="detail-value">{{ photoData.album.title }}</span>
            </div>
            <div class="detail image-user">
                <label for="author" class="detail-label">author:</label><span class="detail-value">{{ photoData.user.name }}</span>
            </div>
        </div>
        <div class="photo-title">
            <span class="title">{{ photoData.photo.title }}</span>
            <button v-if="options.details" id="detailsButton" class="app-button app-button-transparent details-button" v-on:click="showDetails()"><font-awesome-icon v-bind:icon="['fas', details.buttonIcon]" /></button>
        </div>
        <router-link v-if="!options.details" class="photo-link" v-bind:to="{ path: `/photos/photo/${photoData.photo.title.replace(/\s/g, '-')}`, query: { pid: photoData.photo.id } }"></router-link>
    </div>
</template>

<script>
export default {
    name: 'PhotoItem',
    props: {
        options: {
            type: Object
        },
        photoData: {
            type: Object
        }
    },
    data() {
        return {
            details: {
                show: false,
                buttonIcon: 'ellipsis-h'
            }
        }
    },
    methods: {
        showDetails() {
            this.details.show = !this.details.show;
            this.details.buttonIcon = this.details.show ? 'times' : 'ellipsis-h';
        }
    }
}
</script>

<style scoped>

.photo-wrapper {
    position: relative;
    width: 100%;
}

.photo-wrapper.photo-view {
    position: relative;
    max-width: 600px;
    overflow: hidden;
}

.photo {
    position: relative;
    width: 100%;
    height: auto;
    display: inline-block;
    vertical-align: bottom;
}

.details-container {
    position: absolute;
    top: 0;
    right: -50%;
    height: 100%;
    width: 50%;
    z-index: 1;
    background-color: rgba(0,0,0,0.75);
    color: var(--color-white);
    padding: 20px;
    font-size: 0.8rem;
}

.details-container.show {
    right: 0%;
}

.detail {
    margin: 0 0 5px;
}

.detail.image-title {
    margin: 0 0 20px;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
}

.detail-label {
    text-transform: uppercase;
    margin: 0 5px 0 0;
}

.detail-value {
    color: var(--color-main);
    font-weight: 600;
}

.details-button {
    z-index: 1;
    color: var(--color-white);
}

.photo-title {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    bottom: 0;
    left: 0;
    color: var(--color-white);
    padding: 8px 16px;
    font-size: 0.8rem;
    background-color: rgba(0,0,0,0.5);
}

.title {
    position: relative;
    display: inline-block;
    width: 100%;
}

.photo-view .title {
    max-width: 50%;
}

.photo-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>