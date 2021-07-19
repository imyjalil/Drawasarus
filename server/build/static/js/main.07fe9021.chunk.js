(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{2:function(e,t){e.exports={JOIN_GAME:"join",CREATE_GAME:"create",DRAW:"draw",GUESS:"guess",WORD_SELECT:"wordselect",CONNECT:"connect",SOCKET:"socket",GAME_ID:"gameId",CLIENT_ID:"clientId",NAME:"name",WS_CONNECT:"ws_connect",WS_DISCONNECT:"ws_disconnect",WS_SEND_MESSAGE:"ws_message",UPDATE_PLAYER_LIST:"update_player_list",REMOVE_PLAYER:"remove_player",MUTE:"mute",UNMUTE:"unmute",SET_LOCAL_STREAM:"localstream",SET_REMOTE_STREAM:"remotestream",SET_REMOTE_CORDS:"cords",START_GAME:"start_game",UPDATE_POINTS:"update_points"}},42:function(e,t,n){},65:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},7:function(e,t,n){"use strict";n.r(t),n.d(t,"wsConnect",(function(){return c})),n.d(t,"wsDisconnect",(function(){return r})),n.d(t,"wsSendMessage",(function(){return s}));var a=n(2),c=function(e){return{type:a.WS_CONNECT,host:e}},r=function(e){return{type:a.WS_DISCONNECT,host:e}},s=function(e){return console.log("dispatching sendmessage"),{type:a.WS_SEND_MESSAGE,payload:e}}},70:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(20),s=n.n(r),o=(n(42),n(6)),i=n(17),l=n(19),d=n(3),u=n(2),m=n.n(u),p={gameId:null,name:"",clientId:"",chatEvent:null,isCreator:!1};var b,j=n(36),g=n(9),f=n.n(g),O=n(37),h=n(16),v=n(22),E=n.n(v),y=function(e){return{type:u.CLIENT_ID,payload:{clientId:e}}},I=function(e){return{type:u.GAME_ID,payload:{gameId:e}}},C=function(e){return{type:u.NAME,payload:{name:e}}},x=function(e){return{type:u.REMOVE_PLAYER,payload:{id:e}}},S=function(e){return{type:u.SET_REMOTE_CORDS,payload:{cords:e.cords}}},w=function(e){return{type:"HINT",payload:{hint:e}}},T=n(7),k={},_={},N={audio:!0,video:!1},A={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"}]};function M(e){console.log("addLocalTracks:"),console.log(b),b.getTracks().forEach((function(t){e.addTrack(t,b)}))}var R=function(){var e=Object(h.a)(f.a.mark((function e(t,n,a){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("event received:"),!t||!t.data){e.next=3;break}return e.delegateYield(f.a.mark((function e(){var c,r,s,o,i,l,d,p,j,g,v;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=JSON.parse(t.data),console.log(c),!c||!c.method){e.next=86;break}console.log("In event, handler event type:"+c.method),e.t0=c.method,e.next=e.t0===m.a.CONNECT?7:e.t0===m.a.CREATE_GAME?18:e.t0===m.a.JOIN_GAME?22:"TURN"===e.t0?25:"WAIT"===e.t0?27:"wordselect"===e.t0?29:e.t0===m.a.GUESS?31:e.t0===m.a.DRAW?34:e.t0===m.a.SET_REMOTE_CORDS?36:"prevClients"===e.t0?38:e.t0===m.a.UPDATE_PLAYER_LIST?61:e.t0===m.a.REMOVE_PLAYER?64:"end_game"===e.t0?66:"webRTCOffer"===e.t0?68:"webRTCAnswer"===e.t0?80:"sendIceCandidate"===e.t0?82:85;break;case 7:return r=c.clientId,console.log("dispatch client id"),n(y(r)),s={method:m.a.JOIN_GAME,clientId:r,gameId:a.user.gameId,name:a.user.name},n(Object(T.wsSendMessage)(s)),e.next=14,navigator.mediaDevices.getUserMedia(N);case 14:return b=e.sent,console.log("localStream fetched:"),n((P=b,{type:u.SET_LOCAL_STREAM,payload:{stream:P}})),e.abrupt("break",86);case 18:return o=c.gameId,n(I(o)),sessionStorage.setItem("gameId",o),e.abrupt("break",86);case 22:return i=c.name,console.log(i,"Joined"),e.abrupt("break",86);case 25:return n({type:"CHOICE",payload:{words:c.words}}),e.abrupt("break",86);case 27:return n({type:"SELECTOR",payload:{name:c.name}}),e.abrupt("break",86);case 29:return n(w(c.hint)),e.abrupt("break",86);case 31:return 0!=c.points&&n((D=c.points,L=c.clientId,{type:u.UPDATE_POINTS,payload:{points:D,id:L}})),n((R=c,{type:u.GUESS,payload:{chatEvent:R}})),e.abrupt("break",86);case 34:return n((C=c,{type:u.DRAW,payload:{image:C.canvasEvent}})),e.abrupt("break",86);case 36:return n(S(c)),e.abrupt("break",86);case 38:l=c.clients;case 39:if(null!=b&&void 0!=b){e.next=44;break}return e.next=42,new Promise((function(e){return setTimeout(e,100)}));case 42:e.next=39;break;case 44:d=Object(O.a)(l),e.prev=45,j=f.a.mark((function e(){var t,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=p.value,console.log("--\x3e new player",t),console.log(a),r=new RTCPeerConnection(A),k[t]=r,M(r),r.ontrack=function(e){console.log(e),console.log("new client remote stream attached <---",c.senderId);var n=document.createElement("video");n.autoplay="autoplay",n.srcObject=e.streams[0],n.setAttribute("id",t),document.getElementById("audioEvents").appendChild(n),_[t]=e.streams[0]},r.onicecandidate=function(e){if(e.candidate){var c={method:"sendIceCandidate",senderId:a.user.clientId,receiverId:t,label:e.candidate.sdpMLineIndex,candidate:e.candidate.candidate};n(Object(T.wsSendMessage)(c))}},console.log("before offer creation"),e.next=11,Object(h.a)(f.a.mark((function e(){var c,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("in offer creation"),e.prev=1,e.next=4,r.createOffer();case 4:c=e.sent,r.setLocalDescription(c),console.log("offer creation succeeded"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log("error in setting session desc");case 12:s={method:"webRTCOffer",sdp:c,senderId:a.user.clientId,receiverId:t},console.log("sending offer websocket"),n(Object(T.wsSendMessage)(s));case 15:case"end":return e.stop()}}),e,null,[[1,9]])})))();case 11:e.sent;case 12:case"end":return e.stop()}}),e)})),d.s();case 48:if((p=d.n()).done){e.next=52;break}return e.delegateYield(j(),"t1",50);case 50:e.next=48;break;case 52:e.next=57;break;case 54:e.prev=54,e.t2=e.catch(45),d.e(e.t2);case 57:return e.prev=57,d.f(),e.finish(57);case 60:return e.abrupt("break",86);case 61:return console.log("updating the playerlist"),n((E=c,{type:u.UPDATE_PLAYER_LIST,payload:E})),e.abrupt("break",86);case 64:return n(x(c.id)),e.abrupt("break",86);case 66:return n({type:"end_game",payload:{playerlist:c.playerlist}}),e.abrupt("break",86);case 68:return console.log("webrtcoffer"),console.log(c),g=new RTCPeerConnection(A),k[c.senderId]=g,M(g),g.ontrack=function(e){console.log(e),console.log("remote stream attached <---",c.senderId);var t=document.createElement("video");t.autoplay="autoplay",t.srcObject=e.streams[0],t.setAttribute("id",c.senderId),document.getElementById("audioEvents").appendChild(t),_[c.senderId]=e.streams[0]},g.onicecandidate=function(e){if(e.candidate){var t={method:"sendIceCandidate",senderId:a.user.clientId,receiverId:c.senderId,label:e.candidate.sdpMLineIndex,candidate:e.candidate.candidate};n(Object(T.wsSendMessage)(t))}},g.setRemoteDescription(new RTCSessionDescription(c.sdp)),e.next=78,Object(h.a)(f.a.mark((function e(){var t,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("in offer creation"),e.prev=1,e.next=4,g.createAnswer();case 4:t=e.sent,g.setLocalDescription(t),console.log("offer creation succeeded"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log("error in setting session desc");case 12:r={method:"webRTCAnswer",sdp:t,senderId:a.user.clientId,receiverId:c.senderId},console.log("sending answer websocket"),n(Object(T.wsSendMessage)(r));case 15:case"end":return e.stop()}}),e,null,[[1,9]])})))();case 78:return e.sent,e.abrupt("break",86);case 80:return k[c.senderId].setRemoteDescription(c.sdp),e.abrupt("break",86);case 82:return v=new RTCIceCandidate({sdpMLineIndex:c.label,candidate:c.candidate}),k[c.senderId].addIceCandidate(v),e.abrupt("break",86);case 85:console.log("other event:"+c.method);case 86:case"end":return e.stop()}var E,C,R,D,L,P}),e,null,[[45,54,57,60]])}))(),"t0",3);case 3:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),D=n(2),L=D.WS_CONNECT,P=D.WS_DISCONNECT,G=D.WS_SEND_MESSAGE,W=n(7),B=(W.wsConnect,W.wsDisconnect,function(){var e=null;return function(t){return function(n){return function(a){switch(a.type){case L:console.log("middle ware",L),null!=e&&(e.close(),""),(e=new WebSocket(a.host)).onmessage=function(e){return function(t){R(t,e.dispatch,e.getState())}}(t),e.onclose=function(e){console.log("web socket connection closed")},e.onopen=function(e){console.log("web socket connection opened")};break;case P:console.log("reducer",P),null!=e&&e.close(),e=null,"";break;case G:console.log("sending the message",a.payload),e.send(JSON.stringify(a.payload));break;default:console.log("default action",a.type," not found")}return n(a)}}}}),U={players:[],localStream:null,remoteCords:[0,0,0,0],receivedDrawEvent:!1,image:null,choice:null,selector:null,hint:null,playerlist:null};var J=Object(l.b)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.SOCKET:return Object(d.a)(Object(d.a)({},e),{},{ws:t.payload.ws});case u.GAME_ID:return Object(d.a)(Object(d.a)({},e),{},{gameId:t.payload.gameId});case u.CLIENT_ID:return Object(d.a)(Object(d.a)({},e),{},{clientId:t.payload.clientId});case u.NAME:return Object(d.a)(Object(d.a)({},e),{},{name:t.payload.name});case u.GUESS:return console.log(t),Object(d.a)(Object(d.a)({},e),{},{chatEvent:t.payload.chatEvent});case"set_create":return Object(d.a)(Object(d.a)({},e),{},{isCreator:!0});default:return e}},game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.UPDATE_PLAYER_LIST:return Object(d.a)(Object(d.a)({},e),{},{players:t.payload.playerlist});case u.UPDATE_POINTS:return Object(d.a)(Object(d.a)({},e),{},{players:e.players.map((function(e){return e.id==t.payload.id&&e.points++,e}))});case u.REMOVE_PLAYER:return Object(d.a)(Object(d.a)({},e),{},{players:e.players.filter((function(e){return e.id!=t.payload.id}))});case u.DRAW:return Object(d.a)(Object(d.a)({},e),{},{image:t.payload.image});case u.SET_REMOTE_CORDS:return Object(d.a)(Object(d.a)({},e),{},{remoteCords:t.payload.cords,receivedDrawEvent:!e.receivedDrawEvent});case u.SET_LOCAL_STREAM:return Object(d.a)(Object(d.a)({},e),{},{localStream:t.payload.stream});case u.SET_REMOTE_STREAM:var n=JSON.parse(JSON.stringify(e.players));return console.log("setremotestream game reducer"),console.log(n),n.forEach((function(e){e.id==t.payload.id&&(e.remoteStream=t.payload.stream)})),Object(d.a)(Object(d.a)({},e),{},{players:n});case"CHOICE":return Object(d.a)(Object(d.a)({},e),{},{choice:t.payload.words});case"SELECTOR":return Object(d.a)(Object(d.a)({},e),{},{selector:t.payload.name});case"HINT":return Object(d.a)(Object(d.a)({},e),{},{hint:JSON.parse(JSON.stringify(t.payload.hint))});case"end_game":return Object(d.a)(Object(d.a)({},e),{},{playerlist:t.payload.playerlist});default:return e}}}),Y=[j.a,B()],H=Object(l.d)(J,Object(l.c)(l.a.apply(void 0,Y))),V=n(5),K=n(11),q=(n(65),n(1));var X=function(e){var t=Object(a.useState)(!1),n=Object(K.a)(t,2),c=n[0],r=n[1],s=Object(o.c)((function(e){return{clientId:e.user.clientId,localStream:e.game.localStream}})),i=function(){var t=document.getElementById("audioEvents");console.log(t);var n=t.childNodes;if(console.log("clicked element id",e.id),s.clientId==e.id&&null!=s.localStream)return console.log("self mute"),c?s.localStream.getAudioTracks().forEach((function(e){return e.enabled=!0})):s.localStream.getAudioTracks().forEach((function(e){return e.enabled=!1})),void r(!c);n.forEach((function(t){t.getAttribute("id")==e.id&&(console.log("action on",e.name),null!=t.srcObject&&(c?t.srcObject.getAudioTracks().forEach((function(e){return e.enabled=!0})):t.srcObject.getAudioTracks().forEach((function(e){return e.enabled=!1})),r(!c)))}))};return Object(q.jsxs)("div",{className:"player",style:{color:e.id==s.clientId?"red":""},children:[Object(q.jsx)("div",{children:e.name}),Object(q.jsx)("div",{children:e.points}),c?Object(q.jsx)("span",{className:"material-icons",onClick:i,children:"volume_off"}):Object(q.jsx)("span",{className:"material-icons",onClick:i,children:"volume_up"})]})};n(67);var z,F,Q,Z,$=function(){Object(o.b)();var e=Object(o.c)((function(e){return e.game.players})).map((function(e){return Object(q.jsx)(X,{id:e.id,name:e.name,points:e.points},e.id)}));return Object(q.jsx)("div",{className:"leader-board-container",children:e})},ee=function(e){var t=e.canDraw,n=Object(a.useState)(!1),c=Object(K.a)(n,2),r=c[0],s=c[1],i=Object(a.useRef)(null),l=Object(a.useRef)(null),d=Object(o.b)(),u=Object(o.c)((function(e){return{clientId:e.user.clientId,gameId:e.user.gameId,remoteCords:e.game.remoteCords,image:e.game.image,receivedDrawEvent:e.game.receivedDrawEvent}}));console.log("remote",u.remoteCords),Object(a.useEffect)((function(){var e=i.current;e.width=parseInt(getComputedStyle(document.querySelector("#canvasElement")).getPropertyValue("width")),e.height=window.innerHeight,e.style.width="100%",e.style.height="100%";var t=e.getContext("2d");t.lineCap="round",t.strokeStyle="black",t.lineWidth=2,l.current=t}),[]),Object(a.useEffect)((function(){console.log("received new cords",u.remoteCords);var e=Object(K.a)(u.remoteCords,4),t=e[0],n=e[1],a=e[2],c=e[3];p(t,n,a,c)}),[u.receivedDrawEvent]);var p=function(e,t,n,a){l.current.beginPath(),l.current.moveTo(e,t),l.current.lineTo(n,a),l.current.stroke(),l.current.closePath()};Object(a.useEffect)((function(){u.image}),[u.image]);var b=function(e){var t=i.current;return{x:e.offsetX*t.width/t.clientWidth|0,y:e.offsetY*t.height/t.clientHeight|0}};return Object(q.jsx)("canvas",{onMouseDown:function(e){var n=e.nativeEvent;t&&(l.current.beginPath(),z=b(n).x,F=b(n).y,l.current.moveTo(z,F),console.log("moved to "+z+", "+F),s(!0))},onMouseUp:function(){l.current.closePath(),s(!1),clearInterval(undefined)},onMouseMove:function(e){var t=e.nativeEvent;if(r){Q=b(t).x,Z=b(t).y,console.log(z,F,Q,Z);var n={method:m.a.SET_REMOTE_CORDS,gameId:u.gameId,clientId:u.clientId,cords:[z,F,Q,Z]};d(Object(T.wsSendMessage)(n)),l.current.lineTo(Q,Z),l.current.stroke(),z=Q,F=Z}},ref:i,id:"canvasElement",style:{width:"100%"},disabled:!0})},te=(n(68),function(){var e=Object(a.useState)(!1),t=Object(K.a)(e,2),n=t[0],c=t[1],r=Object(o.b)(),s=Object(o.c)((function(e){return{clientId:e.user.clientId,name:e.user.name,gameId:e.user.gameId,chatEvent:e.user.chatEvent}}));Object(a.useEffect)((function(){console.log("chatEvent:"),console.log(s.chatEvent),l(s.chatEvent)}),[s.chatEvent]);var i=function(e){null===e&&(e=document.getElementsByClassName("textContainer")[0].value),""!==(e=e.trim())&&(console.log("id:"+s.clientId+" name:"+s.name+"gameId:"+s.gameId),e={method:m.a.GUESS,guessWord:e,clientId:s.clientId,name:s.name,gameId:s.gameId},r(Object(T.wsSendMessage)(e)),document.getElementsByClassName("textContainer")[0].value="")},l=function(e){if(e){console.log("addChatMessage message:"),console.log(e);var t=d(e);document.getElementById("chatMessages").innerHTML+=t;var n=document.getElementById("outerContainer");n.scrollTop=n.scrollHeight}else console.log("Invalid message")},d=function(e){var t=e.clientId===s.clientId;if(console.log(e),e.points){var n=(t?"You":e.name)+" got it right";return"<li class=notif>".concat(n,"</li>")}var a=t?"mine":"their",c="";return t||(c="<span class='senderName'>".concat(e.name,"</span>")),"<li class='message ".concat(a,"'>\n        <div class='messageContainer'>\n            ").concat(c,"\n            <span class='messageBody'>\n                ").concat(e.guessWord,"\n            </span>\n        </div>\n    </li>")},u=function(){c(!n)},p=n?Object(q.jsx)("span",{className:"material-icons micButton",onClick:function(){return u()},children:"mic"}):Object(q.jsx)("span",{className:"material-icons micButton",onClick:function(){return u()},children:"mic_off"});return Object(q.jsxs)("div",{className:"outerContainer",id:"outerContainer",children:[Object(q.jsx)("div",{className:"chatContainer",children:Object(q.jsx)("div",{id:"chatMessages",className:"chatMessages"})}),Object(q.jsx)("footer",{children:Object(q.jsxs)("div",{className:"footerContainer",children:[Object(q.jsx)("input",{className:"textContainer",id:"textInputContainer",placeholder:"Type a message...",onKeyPress:function(e){return"Enter"===e.key?i(e.target.value):null}}),Object(q.jsx)("i",{className:"material-icons sendButton",onClick:function(){return i(null)},children:"send"}),p]})})]})}),ne=(n(69),function(e){e.handleClose;var t=e.show,n=e.children,a=t?"modal display-block":"modal display-none";return Object(q.jsx)("div",{className:a,children:Object(q.jsx)("section",{className:"modal-main",children:n})})});n(70);var ae=function(){var e=Object(V.f)(),t=Object(o.b)(),n=Object(a.useState)(null),c=Object(K.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)(!1),l=Object(K.a)(i,2),d=l[0],u=l[1],p=Object(o.c)((function(e){return{gameId:e.user.gameId,clientId:e.user.clientId,isCreator:e.user.isCreator,choice:e.game.choice,selector:e.game.selector,hint:e.game.hint,playerlist:e.game.playerlist}})),b=Object(a.useState)(p.isCreator),j=Object(K.a)(b,2),g=j[0],f=j[1];function O(){var e={method:m.a.START_GAME,gameId:p.gameId};f(!1),t(Object(T.wsSendMessage)(e))}function h(){var e=window.location.pathname.split("/")[2];console.log(e),navigator.clipboard.writeText(e)}return Object(a.useEffect)((function(){null!==p.choice&&(f(!0),console.log(p.choice),s(Object(q.jsxs)("div",{children:[Object(q.jsx)("p",{children:"choose a word"}),p.choice.map((function(e){return Object(q.jsx)("button",{onClick:function(){!function(e){var n={method:"choice",word:e,clientId:p.clientId,gameId:p.gameId};f(!1),t(Object(T.wsSendMessage)(n)),u(!0)}(e)},children:e},e)}))]})))}),[p.choice]),Object(a.useEffect)((function(){null!==p.selector&&(t(w(null)),u(!1),f(!0),s(Object(q.jsx)("div",{children:Object(q.jsxs)("p",{children:["Please wait ",p.selector," is choosing a word"]})})))}),[p.selector]),Object(a.useEffect)((function(){null===p.gameId&&e.push("/")}),[p.gameId]),Object(a.useEffect)((function(){s(Object(q.jsxs)("div",{children:["Click here to copy the game code",Object(q.jsx)("span",{className:"material-icons copyButton",onClick:h,children:"content_copy"}),Object(q.jsx)("button",{onClick:O,children:"Start Game!"})]}))}),[]),Object(a.useEffect)((function(){console.log("hint useeffect"),null!==p.hint&&(console.log("hint:",p.hint),f(!1))}),[p.hint]),Object(a.useEffect)((function(){if(null!==p.playerlist){var e=p.playerlist;e.sort((function(e,t){return e.points>t.points?-1:1})),console.log("playlist"),console.log(e),console.log(typeof e),f(!0),s(Object(q.jsxs)("div",{children:[Object(q.jsx)("p",{children:"Leader Board"}),p.playerlist.map((function(e){return Object(q.jsxs)("div",{children:[Object(q.jsx)("p",{children:e.name}),Object(q.jsx)("p",{children:e.points})]},e.id)})),Object(q.jsx)("p",{children:"Game Ended!!!"})]}))}}),[p.playerlist]),Object(q.jsxs)("div",{className:"gamePageContainer",children:[Object(q.jsx)("div",{className:"col-sm-2 leaderBoard",children:Object(q.jsx)($,{})}),Object(q.jsx)("div",{className:"col-sm-8 canvas",children:Object(q.jsx)(ee,{canDraw:d})}),Object(q.jsx)("div",{className:"col-sm-2 chat",children:Object(q.jsx)(te,{})}),Object(q.jsx)("div",{id:"audioEvents"}),Object(q.jsx)(ne,{id:"modal",show:g,children:r})]})};n(73);var ce=function(){console.log("render landing");var e=c.a.useState(!1),t=Object(K.a)(e,2),n=t[0],a=t[1],r=Object(o.b)(),s=Object(V.f)(),i=(Object(o.c)((function(e){return{clientId:e.user.clientId,gameId:e.user.gameId,name:e.user.name,isClientCreated:e.user.isClientCreated,isGameCreated:e.user.isGameCreated}})),function(){var e=Object(h.a)(f.a.mark((function e(){var t,n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(C(document.getElementById("name").value)),t=document.getElementById("gameId").value,n={gameId:t},e.next=5,E.a.get("https://drawasarus.herokuapp.com/isValidGame",{headers:n});case 5:if(a=e.sent,console.log(a.data),a&&a.data&&a.data.valid){e.next=10;break}return alert("Game id is Invalid. Please check again"),e.abrupt("return");case 10:r(I(t)),r(Object(T.wsConnect)("wss://drawasarus.herokuapp.com/")),s.push("game/"+t);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return Object(q.jsx)("div",{className:"LandingPage",children:Object(q.jsxs)("div",{className:"well",children:[Object(q.jsxs)("div",{className:"row selectors ",children:[Object(q.jsx)("input",{type:"text",className:"create",defaultValue:"Create",readOnly:!0,onClick:function(){a(!1)}}),Object(q.jsx)("input",{type:"text",className:"join",defaultValue:"Join",readOnly:!0,onClick:function(){a(!0)}})]}),n?Object(q.jsxs)("div",{className:"row joinCell",children:[Object(q.jsxs)("div",{className:"input-container",children:[Object(q.jsx)("input",{type:"text",id:"name",placeholder:"Enter Your Name"}),Object(q.jsx)("input",{type:"text",id:"gameId",placeholder:"Enter Game Id"})]}),Object(q.jsx)("div",{children:Object(q.jsx)("input",{type:"button",value:"Join",onClick:i})})]}):Object(q.jsxs)("div",{className:"row createCell",children:[Object(q.jsx)("input",{type:"text",id:"name",placeholder:"Enter Your Name"}),Object(q.jsx)("input",{type:"button",value:"Create",onClick:function(){r({type:"set_create"}),r(C(document.getElementById("name").value)),r((function(e){return E.a.post("https://drawasarus.herokuapp.com/create-game").then((function(t){return console.log(t.data),t=t.data,e(I(t.gameId)),"game/".concat(t.gameId)})).catch((function(e){return""}))})).then((function(e){""!=e&&(r(Object(T.wsConnect)("wss://drawasarus.herokuapp.com/")),s.push(e))}))}})]})]})})};var re=function(e){return Object(q.jsxs)(V.c,{children:[Object(q.jsx)(V.a,{exact:!0,path:"/",children:Object(q.jsx)(ce,{props:e})}),Object(q.jsx)(V.a,{path:"/game/:code",children:Object(q.jsx)(ae,{})})]})};s.a.render(Object(q.jsx)(o.a,{store:H,children:Object(q.jsx)(i.a,{children:Object(q.jsx)("div",{className:"playGroundContainer",children:Object(q.jsx)(re,{props:H})})})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.07fe9021.chunk.js.map