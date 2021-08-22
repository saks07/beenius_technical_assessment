import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersView from '@/views/Users/Users.vue'
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
		path: '/albums/:user?',
		name: 'AlbumsView',
		component: AlbumsView,
		meta: {
			breadcrumb: routeParams => `Albums / ${routeParams.user.replace(/\-/g, ' ')}`
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
					breadcrumb: routeParams => routeParams.title.replace(/\-/g, ' ')
				}
			},
			{
				path: 'photo/:title?',
				name: 'PhotoView',
				component: PhotoView,
				meta: {
					breadcrumb: routeParams => `Photo / ${routeParams.title.replace(/\-/g, ' ')}`
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
