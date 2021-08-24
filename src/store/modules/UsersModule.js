const state = {
    usersLoading: false,
    usersData: null
};

const actions = {
    ACTION_MAP_USERS: async ({ dispatch }, users) => {
        if( !users.length ) return [];
        return Promise.all(
            users.map( async user => {
                // GET USER ALBUMS
                const albumsData = await dispatch('ACTION_ALBUMS_PROMISE', { userId: user.id });

                // GENERATE RANDOM NUMBER BETWEEN ZERO AND THE NUMBER OF ALBUMS
                const randomAlbumPhotoId = Math.floor( Math.random() * albumsData.data.length );

                // STORE RANDOM USER ALBUM
                const randomAlbum = albumsData.data[randomAlbumPhotoId];

                // GET PHOTOS FROM RANDOM USER ALBUM
                const photosData = await dispatch('ACTION_PHOTOS_PROMISE', { albumId: randomAlbum.id });

                // GENERATE RANDOM NUMBER BETWEEN ZERO AND THE NUMBER OF PHOTOS
                const randomPhotoId = Math.floor( Math.random() * photosData.data.length );

                // STORE RANDOM USER PHOTO
                user.photo = photosData.data[randomPhotoId];

                return user;
            })
        );
    },
    ACTION_USERS: async ({ commit, dispatch }) => {
        commit('MUTATION_USERS_LOADING', {
            loading: true
        });
        try {
            const usersData = await dispatch('ACTION_USERS_PROMISE');
            const usersWithPhotos = await dispatch('ACTION_MAP_USERS', usersData.data);

            commit('MUTATION_USERS_LOADING', {
                loading: false
            });
            commit('MUTATION_USERS', {
                users: usersWithPhotos
            });
        } catch(error) {
            commit('MUTATION_USERS_LOADING', {
                loading: false
            });
            console.error(error);
        }
    }
};

const mutations = {
    MUTATION_USERS_LOADING: (state, { loading }) => {
        state.usersLoading = loading;
    },
    MUTATION_USERS: (state, { users }) => {
        state.usersData = users;
    },
};

const getters = {
    usersLoading: state => {
        return state.usersLoading;
    },
    usersData: state => {
        return state.usersData;
    },
};

export default { state, actions, mutations, getters }