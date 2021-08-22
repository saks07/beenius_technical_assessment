import appConfig from '../../app_config/index.js'
import globalFunctions from '../../global_functions/index.js'

const state = {

};

const actions = {
    ACTION_USERS_PROMISE: async ({}, payload) => {
        return globalFunctions.doRequest(appConfig.api.url, appConfig.api.usersEndpoint, 'get', null, payload);
    },
    ACTION_ALBUMS_PROMISE: async ({}, payload) => {
        return globalFunctions.doRequest(appConfig.api.url, appConfig.api.albumsEndpoint, 'get', null, payload);
    },
    ACTION_PHOTOS_PROMISE: async ({}, payload) => {
        return globalFunctions.doRequest(appConfig.api.url, appConfig.api.photosEndpoint, 'get', null, payload);
    }
};

const mutations = {

};

const getters = {

};

export default { state, actions, mutations, getters }