const state = {
    photosLoading: false,
    photosData: null,
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
            const photosData = await dispatch('ACTION_PHOTOS_PROMISE', payload);
            commit('MUTATION_PHOTOS_LOADING', {
                loading: false
            });
            commit('MUTATION_PHOTOS', {
                photos: photosData.data
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
    MUTATION_PHOTOS: (state, { photos }) => {
        state.photosData = photos;
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
    photoLoading: state => {
        return state.photoLoading;
    },
    photoData: state => {
        return state.photoData;
    }
};

export default { state, actions, mutations, getters }