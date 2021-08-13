import Vue from 'vue'
import Vuex from 'vuex'
import UsersModule from './modules/UsersModule.js'
import AlbumsModule from './modules/AlbumsModule.js'
import PhotosModule from './modules/PhotosModule.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		users: UsersModule,
		albums: AlbumsModule,
		photos: PhotosModule
	}
});

export default store
