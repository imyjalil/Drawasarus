const constants = require("../../utilities/constants")

export const draw = (image) => {
    return {
        type: constants.DRAW,
        payload: {
            'image': image.canvasEvent
        }
    }
}

export const signalChatEvent = (chatEvent) => {
    return {
        type: constants.GUESS,
        payload: {
            'chatEvent': chatEvent
        }
    }
}

export const updatePlayerList = (updatePlayers) => {

    return {
        type: constants.UPDATE_PLAYER_LIST,
        payload: updatePlayers
    }
}

export const updatePoints = (points, id) => {
    return {
        type: constants.UPDATE_POINTS,
        payload: {
            'points': points,
            'id': id
        }
    }
}

export const resetScores = (val) => {
    return {
        type : 'RESET_GAME',
        payload: {
            'val':val
        }
    }
}

export const removePlayer = (id) => {
    return {
        type: constants.REMOVE_PLAYER,
        payload: {
            'id': id
        }
    }
}

export const remoteCords = (data) => {
    return {
        type: constants.SET_REMOTE_CORDS,
        payload: {
            'cords': data.cords
        }
    }
}

export const setLocalStream = (stream) => {
    return {
        type: constants.SET_LOCAL_STREAM,
        payload: {
            'stream': stream
        }
    }
}

export const setRemoteStream = (stream, id) => {
    return {
        type: constants.SET_REMOTE_STREAM,
        payload: {
            'stream': stream,
            'id': id
        }
    }
}

export const setChoice = (data) => {
    var words=data.words
    var turnTime=data.turnTime
    var gameTime=data.gameTime
    return {
        type: 'CHOICE',
        payload: {
            'words': words,
            'turnTime':turnTime,
            'gameTime':gameTime
        }
    }
}

export const setSelector = (data) => {
    var name=data.name
    if("time" in data)
    {
        var time=data.time
        return {
            type: 'SELECTOR',
            payload: {
                'name': name,
                'time': time
            }
        }
    }
    return {
        type: 'SELECTOR',
        payload: {
            'name': name,
            'time': time
        }
    }    
}

export const setWordHint = (data) => {
    var hint=data.hint
    var time=data.time
    return {
        type: 'HINT',
        payload: {
            'hint': hint,
            'time': time
        }
    }
}

export const endGame = (playerlist) => {
    return {
        type: 'end_game',
        payload: {
            'playerlist': playerlist
        }
    }
}