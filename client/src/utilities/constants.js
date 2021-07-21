const { DRAW_LINES } = require("../../../server/constants");

module.exports = {
    JOIN_GAME: 'join',
    CREATE_GAME: 'create',
    DRAW: 'draw',
    GUESS: 'guess',
    WORD_SELECT: 'wordselect',
    CONNECT: 'connect',
    SOCKET: 'socket',
    GAME_ID: 'gameId',
    CLIENT_ID: 'clientId',
    NAME: 'name',
    WS_CONNECT: 'ws_connect',
    WS_DISCONNECT: 'ws_disconnect',
    WS_SEND_MESSAGE: 'ws_message',
    UPDATE_PLAYER_LIST: 'update_player_list',
    REMOVE_PLAYER: 'remove_player',
    MUTE: 'mute',
    UNMUTE: 'unmute',
    SET_LOCAL_STREAM: 'localstream',
    SET_REMOTE_STREAM: 'remotestream',
    SET_REMOTE_CORDS: 'cords',
    START_GAME: 'start_game',
    UPDATE_POINTS: 'update_points',
    DRAW_LINES:'draw_lines'
}