<template>
    <div class="pagination-container">
        <ul class="pagination-list">
            <li v-for="(page, index) in pages" v-bind:key="`page-${index}`" v-bind:class="['page-item', { 'active': page == checkActivePage() }]">
                <button class="app-button app-button-transparent page" v-on:click="changePage(page)">{{ page }}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PaginationComponent',
    props: {
        pages: {
            type: Number,
            default: 0
        }
    },
    methods: {
        changePage(pageNumber) {
            this.$root.$emit('changePage', { pageNumber: pageNumber });
        },
        checkActivePage() {
            if( !this.$route.query.page ) return 1;
            return this.$route.query.page;
        }
    }
}
</script>

<style scoped>

.pagination-container {
    position: relative;
    width: 100%;
    margin: 20px 0 0;
}

.pagination-list {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.page {
    padding: 5px;
    font-size: 0.9rem;
    color: var(--color-medium-grey);
}

.active .page {
    color: var(--color-main);
    font-weight: bold;
}

</style>