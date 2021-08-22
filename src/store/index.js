import Vue from 'vue'
import Vuex from 'vuex'
import GlobalModule from './modules/GlobalModule.js'
import UsersModule from './modules/UsersModule.js'
import AlbumsModule from './modules/AlbumsModule.js'
import PhotosModule from './modules/PhotosModule.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		global: GlobalModule,
		users: UsersModule,
		albums: AlbumsModule,
		photos: PhotosModule
	}
});

export default store
