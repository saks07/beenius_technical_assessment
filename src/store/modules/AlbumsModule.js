const state = {
    albumsLoading: false,
    albumsData: null,
    albumsPages: 0
};

const actions = {
    ACTION_MAP_ALBUMS: async ({ dispatch }, albums) => {
        if( !albums.length ) return [];
        return Promise.all(
            albums.map( async album => {
                const photosData = await dispatch('ACTION_PHOTOS_PROMISE', { albumId: album.id, _limit: 4 });
                album.photos = photosData.data;
                return album;
            })
        );
    },
    ACTION_ALBUMS: async ({ commit, dispatch }, payload) => {
        commit('MUTATION_ALBUMS_LOADING', {
            loading: true
        });
        try {
            // GET ALL ALBUMS COUNT FOR PAGINATION
            const albumsCount = await dispatch('ACTION_ALBUMS_PROMISE', payload.count);

            // GET PAGINATED ALBUMS
            const albumsData = await dispatch('ACTION_ALBUMS_PROMISE', payload.results);

            // ADD PHOTOS TO EACH ALBUM
            const albumsWithPhotos = await dispatch('ACTION_MAP_ALBUMS', albumsData.data);

            commit('MUTATION_ALBUMS_LOADING', {
                loading: false
            });
            commit('MUTATION_ALBUMS', {
                albums: albumsWithPhotos,
                count: albumsCount.data.length,
                limit: payload.results._limit
            });
        } catch(error) {
            commit('MUTATION_ALBUMS_LOADING', {
                loading: false
            });
            console.error(error);
        }
    }
};

const mutations = {
    MUTATION_ALBUMS_LOADING: (state, { loading }) => {
        state.albumsLoading = loading;
    },
    MUTATION_ALBUMS: (state, { albums, count, limit }) => {
        state.albumsData = albums;
        state.albumsPages = Math.ceil( count / limit );
    },
};

const getters = {
    albumsLoading: state => {
        return state.albumsLoading;
    },
    albumsData: state => {
        return state.albumsData;
    },
    albumsPages: state => {
        return state.albumsPages;
    }
};

export default { state, actions, mutations, getters }