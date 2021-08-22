<template>
    <div class="wrapper">
        <ComponentLoader v-if="photoLoading" v-bind:content="'photo'" />
        <ComponentError v-if="!photoData.photo || !this.$route.params.title || !this.$route.query.pid" v-bind:content="'photo'" />
        <div v-else class="photo-main-wrapper">
            <div class="photo-main">
                <img id="photo" class="photo" v-bind:src="photoData.photo.url" />
                <div v-bind:class="['details-container', { 'show': details.show }]">
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
                    <button class="app-button app-button-transparent details-button" v-on:click="showDetails()"><font-awesome-icon v-bind:icon="['fas', details.buttonIcon]" /></button>
                </div>
            </div>
            <button class="app-button close-button" v-on:click="closePhoto"><font-awesome-icon v-bind:icon="['fas', 'times']" /></button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ComponentLoader from '@/components/ComponentLoader'
import ComponentError from '@/components/ComponentError'

export default {
    name: 'Photo',
    components: {
        ComponentLoader,
        ComponentError
    },
    data() {
        return {
            payload: {
                id: 0
            },
            details: {
                show: false,
                buttonIcon: 'ellipsis-h'
            }
        }
    },
    methods: {
        ...mapActions(['ACTION_PHOTO']),
        closePhoto() {
            this.$router.go(-1);
        },
        showDetails(event) {
            this.details.show = !this.details.show;
            this.details.buttonIcon = this.details.show ? 'times' : 'ellipsis-h';
        }
    },
    async created() {
        // REDIRECT TO USERS PAGE IF PARAMETERS FOR LOADING THE COMPONENT DATA ARE MISSING
        if( !this.$route.params.title || !this.$route.query.pid ) {
            this.$router.push({ path: '/' });
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

.photo-main {
    position: relative;
    max-width: 600px;
    overflow: hidden;
}

.details-container {
    position: absolute;
    top: 0;
    right: -50%;
    height: 100%;
    width: 50%;
    z-index: 1;
    background-color: rgba(255,255,255,0.75);
    color: var(--color-grey);
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
}

.photo-title {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    color: var(--color-grey);
    padding: 8px 16px;
    font-size: 0.8rem;
    background-color: rgba(255,255,255,0.75);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    position: relative;
    display: inline-block;
    max-width: 50%;
}

</style>