!function(e){function t(s){if(n[s])return n[s].exports;var i=n[s]={exports:{},id:s,loaded:!1};return e[s].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var s=n(1),i=n(4),a=n(5);n(23);i.render(s.createElement(a,null),document.getElementById("app"))},function(e,t){e.exports=React},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(s[a]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&s[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(e,t,n){function s(e,t){for(var n=0;n<e.length;n++){var s=e[n],i=h[s.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](s.parts[a]);for(;a<s.parts.length;a++)i.parts.push(u(s.parts[a],t))}else{for(var r=[],a=0;a<s.parts.length;a++)r.push(u(s.parts[a],t));h[s.id]={id:s.id,refs:1,parts:r}}}}function i(e){for(var t=[],n={},s=0;s<e.length;s++){var i=e[s],a=i[0],r=i[1],o=i[2],l=i[3],u={css:r,media:o,sourceMap:l};n[a]?n[a].parts.push(u):t.push(n[a]={id:a,parts:[u]})}return t}function a(e,t){var n=y(),s=v[v.length-1];if("top"===e.insertAt)s?s.nextSibling?n.insertBefore(t,s.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),v.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function r(e){e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function o(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",a(e,t),t}function u(e,t){var n,s,i;if(t.singleton){var a=b++;n=g||(g=o(t)),s=c.bind(null,n,a,!1),i=c.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),s=p.bind(null,n),i=function(){r(n),n.href&&URL.revokeObjectURL(n.href)}):(n=o(t),s=m.bind(null,n),i=function(){r(n)});return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else i()}}function c(e,t,n,s){var i=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=E(t,i);else{var a=document.createTextNode(i),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(a,r[t]):e.appendChild(a)}}function m(e,t){var n=t.css,s=t.media;if(s&&e.setAttribute("media",s),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function p(e,t){var n=t.css,s=t.sourceMap;s&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var i=new Blob([n],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(i),a&&URL.revokeObjectURL(a)}var h={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),y=d(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,b=0,v=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return s(n,t),function(e){for(var a=[],r=0;r<n.length;r++){var o=n[r],l=h[o.id];l.refs--,a.push(l)}if(e){var u=i(e);s(u,t)}for(var r=0;r<a.length;r++){var l=a[r];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete h[l.id]}}}};var E=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var s=n(1),i=n(14),a=n(15),r=n(17),o=n(9),l=n(16),u=n(8),c=n(12),m=n(13),p=n(10),h=n(11),d=n(7),f=n(6),y=s.createClass({displayName:"QuizGameContainer",getInitialState:function(){return{hub:$.connection.quizHub,connected:!1,inRoom:!1,publicQuizzes:null,createQuiz:!1,getQuestions:!1,started:!1,ended:!1,isReady:!1,readyCount:0,room:"none",maxPlayers:0,players:[],playersFinal:[],name:"Anon",messages:[],currentQuestionNum:0,questionCount:0,question:"none",answers:[],answered:!1,isRight:!1,correctAnswer:"Loading..."}},componentWillMount:function(){$.connection.hub.qs={name:prompt("Display name: ")},$.connection.hub.start().done(function(){this.setState({connected:!0}),this.getPublicQuizzes()}.bind(this))},componentDidMount:function(){this.state.hub.client.setName=function(e){this.setState({name:e})}.bind(this),this.state.hub.client.message=function(e){this.setState({messages:this.state.messages.concat(e)})}.bind(this),this.state.hub.client.getPublicQuizzes=function(e){console.log(e),this.setState({publicQuizzes:JSON.parse(e)})}.bind(this),this.state.hub.client.getQuestions=function(e){this.setState({getQuestions:e})}.bind(this),this.state.hub.client.startQuiz=function(e){this.setState({started:e,questionCount:this.state.players.length})}.bind(this),this.state.hub.client.playersInLobby=function(e){this.setState({players:JSON.parse(e)}),console.log(e)}.bind(this),this.state.hub.client.inRoom=function(e,t,n){this.setState({inRoom:e,room:t,maxPlayers:n})}.bind(this),this.state.hub.client.playersReady=function(e){this.setState({readyCount:e})}.bind(this),this.state.hub.client.incrementQuestionCount=function(e){this.setState({questionCount:this.state.questionCount+1})}.bind(this),this.state.hub.client.question=function(e,t){this.setState({question:e,answers:JSON.parse(t),answered:!1,isRight:!1,correctAnswer:"Loading..."})}.bind(this),this.state.hub.client.isRight=function(e,t){this.setState({isRight:e,correctAnswer:t})}.bind(this),this.state.hub.client.quizEnded=function(e){this.setState({ended:e,playersFinal:this.state.players})}.bind(this),this.state.hub.client.reset=function(){this.setState({getQuestions:!1,started:!1,ended:!1,inRoom:!1,question:"none",room:"none",maxPlayers:0,answers:[],players:[],playersFinal:[],isRight:!1,correctAnswer:"",questionCount:0,isReady:!1})}.bind(this)},getPublicQuizzes:function(){r.getPublicQuizzes(this.state.hub)},createQuiz:function(e){r.CreateQuiz(this.state.hub,e),this.setState({createQuiz:!1})},joinQuiz:function(e){null==e&&(e=prompt("Quiz name: ")),r.JoinQuiz(this.state.hub,e)},leaveQuiz:function(){r.LeaveQuiz(this.state.hub)},readyUp:function(){r.ReadyUp(this.state.hub),this.setState({isReady:!this.state.isReady})},playersReady:function(){r.PlayersReady(this.state.hub)},submitQuestion:function(e){e.preventDefault(),r.SubmitQuestion(this.state.hub,e.target),this.setState({messages:this.state.messages.concat("Question submitted. Waiting for all players to submit their questions...")})},submitAnswer:function(e){r.SubmitAnswer(this.state.hub,e.target.textContent),this.setState({answered:!0})},sendMessage:function(e){r.SendMessage(this.state.hub,e),this.state.inRoom?this.setState({messages:this.state.messages.concat("you: "+e)}):this.setState({messages:this.state.messages.concat("You are not in a room")})},createNewQuiz:function(){this.setState({createQuiz:!this.state.createQuiz})},playAgain:function(){this.setState({started:!1,ended:!1,playersFinal:[],question:[],answers:[],players:this.state.players.map(function(e){return e.Score=0,e}),readyCount:0})},render:function(){var e,t=this;return e=this.state.connected?this.state.inRoom?!this.state.inRoom||this.state.getQuestions||this.state.started?this.state.getQuestions&&!this.state.started?s.createElement(u,{submit:this.submitQuestion,questionsSubmitted:this.state.questionCount}):!this.state.started||this.state.ended||this.state.answered?this.state.started&&!this.state.ended&&this.state.answered?s.createElement(d,{correct:this.state.correctAnswer,isRight:this.state.isRight}):this.state.ended?s.createElement(m,{players:this.state.playersFinal,playAgain:this.playAgain}):s.createElement("p",null,"error"):s.createElement(c,{submitAnswer:this.submitAnswer,question:this.state.question,answers:this.state.answers,questionCount:this.state.questionCount,currentQuestionNum:this.state.currentQuestionNum}):s.createElement(a,{ready:this.state.readyCount,playerCount:this.state.players==[]?1:this.state.players.length}):s.createElement("p",null,"Create or join a room to play"):s.createElement("p",null,"Connecting..."),s.createElement("div",{className:"App"},s.createElement("div",{className:"Options"},s.createElement("h2",{className:"Title"},"Quiz your Friends"),s.createElement("p",{className:"ConnectedAs"},"Connected as: ",s.createElement("span",{className:"Heavy"},this.state.name)),s.createElement("div",{className:"RoomState"},"none"==this.state.room?s.createElement("p",null,"Not in a room"):s.createElement("p",null,"Currently in room: ",s.createElement("span",{className:"Heavy"},this.state.room))),s.createElement(i,{createNewQuiz:this.createNewQuiz,joinQuiz:function(){return t.joinQuiz(null)},leaveQuiz:this.leaveQuiz,readyUp:this.readyUp,inRoom:this.state.inRoom,isReady:this.state.isReady,started:this.state.getQuestions}),s.createElement(f,{adStyle:{display:"inline-block",width:"320px",height:"100px",textAlign:"center"},adClient:"ca-pub-9195714093896960",adSlot:"7042347011"})),s.createElement("div",{className:"Main"},this.state.createQuiz?s.createElement(p,{createQuiz:this.createQuiz,name:this.state.name}):"",e,this.state.inRoom?"":s.createElement(h,{quizzes:this.state.publicQuizzes,joinQuiz:this.joinQuiz,refresh:this.getPublicQuizzes})),s.createElement("div",{className:"UsersAndMessages"},this.state.inRoom?s.createElement(l,{players:this.state.players,max:this.state.maxPlayers}):"",s.createElement("h4",null,"Messages"),s.createElement(o,{messages:this.state.messages,sendMessage:this.sendMessage}),s.createElement("p",{id:"contact"},s.createElement("small",null,"Comments, Questions, Inqueries?",s.createElement("br",null),s.createElement("a",{href:"thomas@tehjr.com"},"thomas@tehjr.com"))),s.createElement(f,{adStyle:{display:"inline-block",width:"336px",height:"280px",textAlign:"center"},adClient:"ca-pub-9195714093896960",adSlot:"4088880613"})))}});e.exports=y},function(e,t,n){"use strict";var s=n(1),i=s.createClass({displayName:"Ad",componentDidMount:function(){(adsbygoogle=window.adsbygoogle||[]).push({})},render:function(){return s.createElement("ins",{className:"adsbygoogle",style:this.props.adStyle,"data-ad-client":this.props.adClient,"data-ad-slot":this.props.adSlot})}});e.exports=i},function(e,t,n){"use strict";function s(e){return i.createElement("div",null,i.createElement("h4",null,e.isRight?"Correct!":"Wrong."),i.createElement("p",null,e.correct))}var i=n(1);e.exports=s},function(e,t,n){"use strict";function s(e){return i.createElement("form",{action:"",onSubmit:e.submit,className:"ComposeQuestion"},i.createElement("p",null,"Questions submitted: ",e.questionsSubmitted),i.createElement("label",{htmlFor:"question"},"Question: "),i.createElement("textarea",{name:"question",placeholder:"Type your question here...",minLength:"3",maxLength:"360",required:!0,autoComplete:"off"}),i.createElement("label",{htmlFor:"correct"},"Correct: "),i.createElement("input",{name:"correct",type:"text",placeholder:"Correct answer",maxLength:"140",required:!0,autoComplete:"off"}),i.createElement("label",null,"Wrong Answers: "),i.createElement("input",{name:"wrong1",type:"text",placeholder:"Wrong answer",maxLength:"140",required:!0,autoComplete:"off"}),i.createElement("input",{name:"wrong2",type:"text",placeholder:"Wrong answer",maxLength:"140",required:!0,autoComplete:"off"}),i.createElement("input",{name:"wrong3",type:"text",placeholder:"Wrong answer",maxLength:"140",required:!0,autoComplete:"off"}),i.createElement("input",{type:"submit",value:"Submit"}))}var i=n(1);e.exports=s},function(e,t,n){"use strict";var s=n(1),i=(n(4),n(21),s.createClass({displayName:"MessageList",componentDidUpdate:function(){this.refs.msgList.scrollTop=this.refs.msgList.scrollHeight},sendMessage:function(e){e.preventDefault(),this.props.sendMessage(this.refs.msg.value),this.refs.msg.value=""},render:function(){return s.createElement("div",{className:"Messages"},s.createElement("ul",{ref:"msgList",className:"MessageList"},this.props.messages.map(function(e,t){return s.createElement("li",{key:"msg"+t},e)})),s.createElement("form",{onSubmit:this.sendMessage},s.createElement("input",{ref:"msg",type:"text",placeholder:"Message",maxLength:"140",minLength:"1",required:!0,autoComplete:"off"}),s.createElement("input",{type:"submit",value:"Send"})))}}));e.exports=i},function(e,t,n){"use strict";var s=n(1),i=s.createClass({displayName:"NewQuizMenu",propTypes:{createQuiz:s.PropTypes.func.isRequired,name:s.PropTypes.string},preventRefresh:function(e){e.preventDefault(),this.props.createQuiz(e.target)},render:function(){return s.createElement("div",{className:"NewQuizMenu"},s.createElement("h3",null,"Create New Quiz"),s.createElement("form",{onSubmit:this.preventRefresh},s.createElement("label",{htmlFor:"quizRoomName"},"Room Name: "),s.createElement("input",{type:"text",name:"quizRoomName",placeholder:null==this.props.name?"Your room name":this.props.name+"'s room"}),s.createElement("br",null),s.createElement("label",{htmlFor:"maxPlayers"},"Max Players: "),s.createElement("input",{type:"number",name:"maxPlayers",placeholder:"Max value is 20"}),s.createElement("br",null),s.createElement("label",{htmlFor:"isPrivate"},"Private Lobby: "),s.createElement("input",{type:"checkbox",name:"isPrivate"}),s.createElement("br",null),s.createElement("input",{type:"submit",value:"Create Quiz"})))}});e.exports=i},function(e,t,n){"use strict";var s=n(1),i=s.createClass({displayName:"PublicQuizzes",render:function(){var e=this;return s.createElement("div",{className:"QuizList"},s.createElement("h4",null,"Public Quizzes"),null!=this.props.quizzes?s.createElement("ul",{className:"PublicQuizList"},this.props.quizzes.map(function(t,n){return s.createElement("li",{className:"Button",onClick:function(){return e.props.joinQuiz(t.Name)},key:t.Name+n},s.createElement("span",null,t.Name)," ",s.createElement("span",null,t.Count," / ",t.MaxPlayers))})):s.createElement("p",null,"none"),s.createElement("div",{className:"Button",onClick:this.props.refresh},"Refresh"))}});i.propTypes={quizzes:s.PropTypes.arrayOf(s.PropTypes.object),joinQuiz:s.PropTypes.func,refresh:s.PropTypes.func},e.exports=i},function(e,t,n){"use strict";var s=n(1),i=s.createClass({displayName:"Question",render:function(){var e=this;return s.createElement("div",null,s.createElement("p",null,"Question ",this.props.currentQuestionNum," / ",this.props.questionCount),s.createElement("p",{className:"Question"},this.props.question),this.props.answers.map(function(t,n){return s.createElement("div",{className:"Button",key:"answer"+n,onClick:e.props.submitAnswer},t)}))}});e.exports=i},function(e,t,n){"use strict";function s(e){return i.createElement("div",{className:"QuizEnd"},i.createElement("p",null,e.players.length>1?e.players[0].Score==e.players[1].Score?"Tie!":e.players[0].Name+" wins!":e.players[0].Name+" is the only one left :("),i.createElement("ol",null,e.players.map(function(e,t){return i.createElement("li",{key:"scoreboard"+t},e.Name)})),i.createElement("button",{onClick:e.playAgain},"Play Again"))}var i=n(1);e.exports=s},function(e,t,n){"use strict";function s(e){return i.createElement("div",{className:"QuizMenu"},i.createElement("div",{className:"Button",onClick:e.createNewQuiz},"Create Quiz"),i.createElement("div",{className:"Button",onClick:e.joinQuiz},"Join Quiz"),e.inRoom?e.started?i.createElement("div",{className:"Button",onClick:e.leaveQuiz},"Leave Quiz"):i.createElement("div",null,i.createElement("div",{className:"Button"+(e.isReady?" Button-Clicked":""),onClick:e.readyUp},e.isReady?"Unready":"Ready Up"),i.createElement("div",{className:"Button",onClick:e.leaveQuiz},"Leave Quiz")):"")}var i=n(1);e.exports=s},function(e,t,n){"use strict";function s(e){return i.createElement("div",{className:"QuizRoom"},i.createElement("p",null,"Players ready: ",i.createElement("span",{className:"Heavy"},e.ready," / ",e.playerCount)),i.createElement("p",null,"Waiting for everyone to 'Ready Up'"))}var i=n(1);s.propTypes={ready:i.PropTypes.number,playerCount:i.PropTypes.number},e.exports=s},function(e,t,n){"use strict";function s(e){return i.createElement("div",{className:"UserList"},i.createElement("p",null,"Players in lobby: ",i.createElement("span",{className:"Heavy"},e.players.length," / ",e.max)),i.createElement("ul",null,e.players.map(function(e,t){return i.createElement("li",{key:"player"+t},i.createElement("span",{className:"PlayerName"},e.Name),i.createElement("span",{className:"PlayerScore"},e.Score))})))}var i=n(1);n(22);s.propTypes={players:i.PropTypes.arrayOf(i.PropTypes.object),max:i.PropTypes.number},e.exports=s},function(e,t){"use strict";e.exports={getPublicQuizzes:function(e){e.invoke("GetPublicQuizzes")},CreateQuiz:function(e,t){var n=""===t.maxPlayers.value?"5":t.maxPlayers.value;e.invoke("CreateQuiz",t.isPrivate.checked,t.quizRoomName.value,n)},JoinQuiz:function(e,t){e.invoke("JoinQuiz",t)},ReadyUp:function(e){e.invoke("ReadyUp")},LeaveQuiz:function(e){e.invoke("LeaveQuiz")},SubmitQuestion:function(e,t){e.invoke("ComposedQuestion",t.question.value,t.correct.value,t.wrong1.value,t.wrong2.value,t.wrong3.value)},SubmitAnswer:function(e,t){e.invoke("SubmitAnswer",t)},PlayersReady:function(e){e.invoke("PlayersReady")},SendMessage:function(e,t){e.invoke("PlayerMessage",t)}}},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".Messages{min-width:20%;max-width:100%}.Messages .MessageList{list-style:circle;height:5rem;overflow-y:scroll;overflow-x:hidden}.Messages .MessageList>li{margin:.2rem}.Messages .MessageList>li:nth-child(even){font-weight:300}.Messages form{display:flex;flex-direction:row;align-items:center}.Messages form input[type=text]{min-width:2rem;flex:1 0 75%;margin:0;height:2rem}.Messages form input[type=submit]{flex:1 0 25%;margin:0;height:2.5rem;border-radius:0 .2rem .2rem}",""])},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".UserList{display:table;width:100%;overflow-y:scroll;overflow-x:hidden;height:5rem}.UserList>ul>li{width:75%;display:flex;justify-content:space-between;align-items:flex-start}",""])},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,"body{margin:0;font-family:Roboto,sans-serif;font-size:1rem;color:rgba(0,0,0,.6)}.App{position:absolute;height:100%;width:100%;align-items:stretch}.App,.App>div{display:flex;flex-direction:column}.App>div{padding:1rem}.App>div .adsbygoogle{margin-top:1rem;align-self:center}.App .Options{flex:1 0 auto;background-color:#f5f749}.App .Main{display:block;flex:2 0 auto;background-color:#fff8f0}.App .UsersAndMessages{flex:1 0 auto;background-color:#2e86ab}.Heavy,.Title,h1,h2,h3,h4,h5,h6{font-family:Kalam,cursive}.Heavy{font-weight:700}.Button{cursor:pointer;margin:.5rem;padding:.5rem;text-align:center;border-radius:.2rem;background-color:rgba(0,0,0,.1);-moz-user-select:-moz-none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.Button:hover{cursor:pointer;background-color:hsla(0,0%,100%,.5);box-shadow:0 0 .1rem rgba(0,0,0,.2)}.Button-Clicked,.Button:active{box-shadow:inset .05rem .1rem .2rem rgba(0,0,0,.6);background-color:rgba(0,0,0,.2)}.Button-Clicked:hover{background-color:rgba(0,0,0,.4);box-shadow:inset .05rem .1rem .2rem rgba(0,0,0,.9)}form{display:flex;flex-direction:column}form label{padding-top:1rem}form input{font-size:1.2rem}form input[type=checkbox]{margin:1rem;transform:scale(2.5)}input[type=submit]{cursor:pointer;margin:.5rem;padding:.5rem;text-align:center;border-radius:.2rem;background-color:rgba(0,0,0,.1);-moz-user-select:-moz-none;-webkit-user-select:none;-ms-user-select:none;user-select:none;border:none}input[type=submit]:hover{cursor:pointer;background-color:hsla(0,0%,100%,.5);box-shadow:0 0 .1rem rgba(0,0,0,.2)}input[type=submit]:active{box-shadow:inset .05rem .1rem .2rem rgba(0,0,0,.6);background-color:rgba(0,0,0,.2);border:none}input[type=submit]:focus{outline:0}.PlayerName{font-size:.9rem}.PlayerScore{font-size:1rem}.QuizList>ul{list-style:square;width:75%;list-style:circle;max-height:50vh;overflow-y:scroll;overflow-x:hidden;width:90%}.Button,.Question{-ms-word-wrap:break-word;word-wrap:break-word;overflow-wrap:break-word}#contact{text-align:right}@media (min-width:1024px){.App{flex-direction:row}.App .Options{flex:1 0 20%}.App .Main{flex:2 2 50%}.App .UsersAndMessages{flex:1 0 30%}.Question{max-width:50vw}}",""])},function(e,t,n){var s=n(18);"string"==typeof s&&(s=[[e.id,s,""]]);n(3)(s,{});s.locals&&(e.exports=s.locals)},function(e,t,n){var s=n(19);"string"==typeof s&&(s=[[e.id,s,""]]);n(3)(s,{});s.locals&&(e.exports=s.locals)},function(e,t,n){var s=n(20);"string"==typeof s&&(s=[[e.id,s,""]]);n(3)(s,{});s.locals&&(e.exports=s.locals)}]);