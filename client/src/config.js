const dev = {
    URL: "http://localhost:9091/",
    WS_URL: "ws://localhost:9091/"
}

const prod = {
    URL: "https://drawasarus.herokuapp.com/",
    WS_URL: "wss://drawasarus.herokuapp.com/"
}

const config = dev

export default {
    ...config
}