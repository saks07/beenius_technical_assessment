import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '@/components/Users/Users.vue'
import Albums from '@/components/Albums/Albums.vue'
import Photos from '@/components/Photos/Photos.vue'
import Photo from '@/components/Photos/Photo.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Users',
		component: Users,
		meta: {
			navigation_label: 'users'
		}
	},
	{
		path: '/albums',
		name: 'Albums',
		component: Albums,
		meta: {
			navigation_label: 'albums'
		}
	},
	{
		path: '/photos',
		name: 'Photos',
		component: Photos,
		meta: {
			navigation_label: 'photos'
		},
		children: [
			{
				path: 'photo',
				name: 'Photo',
				component: Photo,
				meta: {
					navigation_label: 'photo'
				}
			}
		]
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
