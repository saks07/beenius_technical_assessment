<template>
    <div class="container photos-container">
        <Photos />
    </div>
</template>

<script>
import Photos from '@/components/Photos/Photos.vue'

export default {
    name: 'PhotosView',
    components: {
        Photos
    }
}
</script>