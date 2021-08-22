const state = {
    albumsLoading: false,
    albumsData: null
};

const actions = {
    ACTION_MAP_ALBUMS: async ({ dispatch }, albums) => {
        if( !albums.length ) return [];
        return Promise.all(
            albums.map( async album => {
                const photosPromise = await dispatch('ACTION_PHOTOS_PROMISE', { albumId: album.id });
                album.photos = photosPromise.data.slice(0, 4);
                return album;
            })
        );
    },
    ACTION_ALBUMS: async ({ commit, dispatch }, payload) => {
        commit('MUTATION_ALBUMS_LOADING', {
            loading: true
        });
        try {
            const albumsData = await dispatch('ACTION_ALBUMS_PROMISE', payload);
            const albumsWithPhotos = await dispatch('ACTION_MAP_ALBUMS', albumsData.data);
            commit('MUTATION_ALBUMS_LOADING', {
                loading: false
            });
            commit('MUTATION_ALBUMS', {
                albums: albumsWithPhotos
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
    MUTATION_ALBUMS: (state, { albums }) => {
        state.albumsData = albums;
    },
};

const getters = {
    albumsLoading: state => {
        return state.albumsLoading;
    },
    albumsData: state => {
        return state.albumsData;
    },
};

export default { state, actions, mutations, getters }