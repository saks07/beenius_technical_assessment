const state = {
    photosLoading: false,
    photosData: null,
    photosPages: 0,
    photoLoading: false,
    photoData: {
        photo: null,
        album: null,
        user: null
    }
};

const actions = {
    ACTION_PHOTOS: async ({ commit, dispatch }, payload) => {
        commit('MUTATION_PHOTOS_LOADING', {
            loading: true
        });
        try {
            // GET ALL PHOTOS COUNT FOR PAGINATION
            const photosCount = await dispatch('ACTION_PHOTOS_PROMISE', payload.count);

            // GET PAGINATED PHOTOS
            const photosData = await dispatch('ACTION_PHOTOS_PROMISE', payload.results);

            commit('MUTATION_PHOTOS_LOADING', {
                loading: false
            });
            commit('MUTATION_PHOTOS', {
                photos: photosData.data,
                count: photosCount.data.length,
                limit: payload.results._limit
            });
        } catch(error) {
            commit('MUTATION_PHOTOS_LOADING', {
                loading: false
            });
            console.error(error);
        }
    },
    ACTION_PHOTO: async ({ commit, dispatch }, payload) => {
        commit('MUTATION_PHOTO_LOADING', {
            loading: true
        });
        try {
            // GET PHOTO
            const photoData = await dispatch('ACTION_PHOTOS_PROMISE', payload);

            // GET PHOTO ALBUM
            const albumsData = await dispatch('ACTION_ALBUMS_PROMISE', { id: photoData.data[0].albumId });

            // GET ALBUM USER
            const usersData = await dispatch('ACTION_USERS_PROMISE', { id: albumsData.data[0].userId });

            commit('MUTATION_PHOTO_LOADING', {
                loading: false
            });
            commit('MUTATION_PHOTO', {
                photoData: {
                    photo: photoData.data[0],
                    album: albumsData.data[0],
                    user: usersData.data[0]
                }
            });

        } catch(error) {
            commit('MUTATION_PHOTO_LOADING', {
                loading: false
            });
            console.error(error);
        }
    }
};

const mutations = {
    MUTATION_PHOTOS_LOADING: (state, { loading }) => {
        state.photosLoading = loading;
    },
    MUTATION_PHOTOS: (state, { photos, count, limit }) => {
        state.photosData = photos;
        state.photosPages = Math.ceil( count / limit );
    },
    MUTATION_PHOTO_LOADING: (state, { loading }) => {
        state.photoLoading = loading;
    },
    MUTATION_PHOTO: (state, { photoData }) => {
        state.photoData = photoData;
    },
};

const getters = {
    photosLoading: state => {
        return state.photosLoading;
    },
    photosData: state => {
        return state.photosData;
    },
    photosPages: state => {
        return state.photosPages;
    },
    photoLoading: state => {
        return state.photoLoading;
    },
    photoData: state => {
        return state.photoData;
    }
};

export default { state, actions, mutations, getters }