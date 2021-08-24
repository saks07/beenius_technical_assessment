import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersView from '@/views/Users/Users.vue'
import AlbumsMain from '@/views/Albums/AlbumsMain.vue'
import AlbumsView from '@/views/Albums/Albums.vue'
import PhotosMain from '@/views/Photos/PhotosMain.vue'
import PhotosView from '@/views/Photos/Photos.vue'
import PhotoView from '@/views/Photos/Photo.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'UsersView',
		component: UsersView,
		meta: {
			breadcrumb: 'Users'
		}
	},
	{
		path: '/albums',
		name: 'AlbumsMain',
		component: AlbumsMain,
		children: [
			{
				path: '/albums/:user?',
				name: 'AlbumsView',
				component: AlbumsView,
				meta: {
					breadcrumb() {
						const { params } = this.$route;
						const label = params.user ? params.user.replace(/\-/g, ' ') : '';
						return { label: label, parent: 'Albums' }
					}
				}
			}
		],
		meta: {
			breadcrumb: 'Albums'
		}
	},
	{
		path: '/photos',
		name: 'PhotosMain',
		component: PhotosMain,
		children: [
			{
				path: ':title?',
				name: 'PhotosView',
				component: PhotosView,
				meta: {
					breadcrumb: {
						label: '',
						parent: 'Photos'
					}
				}
			},
			{
				path: 'photo/:title?',
				name: 'PhotoView',
				component: PhotoView,
				meta: {
					breadcrumb() {
						const { params } = this.$route;
						const label = params.title ? params.title.replace(/\-/g, ' ') : '';
						return { label: label, parent: 'Photos' }
					}
				}
			}
		],
		meta: {
			breadcrumb: 'Photos'
		}
	}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
