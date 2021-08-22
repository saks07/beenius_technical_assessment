const appConfig = {
    api: {
        url: 'https://jsonplaceholder.typicode.com',
        usersEndpoint: '/users',
        albumsEndpoint: '/albums',
        photosEndpoint: '/photos'
    },
    navigation: [
        { key: 'users', label: 'users', path: '/', icon: 'users'},
        { key: 'albums', label: 'albums', path: '/albums', icon: 'camera' },
        { key: 'photos', label: 'photos', path: '/photos', icon: 'images' }
    ]
};

export default appConfig