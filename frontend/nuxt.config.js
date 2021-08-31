module.exports = {
    head: {
        title: "EverySquare",
        script: [
            { src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js' },
            { src: 'https://developers.kakao.com/sdk/js/kakao.min.js' }
        ]
    },
    modules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/axios',
    ],
    plugins:[
        '@plugins/inject-peerjs.client.js',
    ],
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
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