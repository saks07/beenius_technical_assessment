<template>
    <div class="container photo-container">
        <Photo />
    </div>
</template>

<script>
import Photo from '@/components/Photos/Photo.vue'

export default {
    name: 'PhotoView',
    components: {
        Photo
    }
}
</script>