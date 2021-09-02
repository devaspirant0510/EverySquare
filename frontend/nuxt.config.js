module.exports = {
    head: {
        title: "EverySquare",
        script: [
            {src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'},
            {src: 'https://developers.kakao.com/sdk/js/kakao.min.js'},
            {src: '/socket.io/socket.io.js'},
        ]
    },
    modules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/axios',
        'nuxt-socket-io',
        '~/modules/constant'
    ],
    io: {

        // module options
        sockets: [{
            name: 'work',
            url: 'http://127.0.0.1:8081'
        }]
    },
    plugins: [
        '@plugins/inject-peerjs.client.js',
    ],
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient && config.module) {
                config.module.exprContextCritical = false;
            }
        },
        /*
        ** Bundle external packages
        */
        vendor: [
            'peerjs',
        ],
    },
    watchers: {
        webpack: {
            poll: true,
        },
    },
    vuetify: {},
}