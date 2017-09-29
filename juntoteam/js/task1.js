
  var content1='<div id="dialog"><div id="contactName"><img src="http://www.iconeasy.com/icon/png/Movie%20%26%20TV/Futurama%20Vol.%206%20-%20The%20Movies/Hedionism%20Bot.png" alt=""/> Chat Bot</div> <div id="chatWindow"></div></div><div id="control"><div contenteditable="true" id="msg"  onkeydown="inputKeyUp(event)"></div><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" onclick="sendMsg()" ><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"  onclick="showSettings()"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg></div>';



    var keys =  (localStorage.getItem("key")==null) ? 0 : localStorage.getItem("key");
    var messageToSend;
    var show =0;

//send message function
    function sendMsg(){
      let text=document.getElementById('msg').textContent;
      let msg = document.createElement("div");
      msg.className="userMsg";
      if (document.getElementById('msg').textContent){
        let t = document.createTextNode(text);
        msg.appendChild(t);
        document.getElementById("chatWindow").appendChild(msg);
        document.getElementById('msg').textContent="";
        loadData(msg);
      }
    }

//change buttons to send message
function inputKeyUp(e) {
    keys ? enter(e) : ctrlEnter(e);
}

///enter
    function enter(e) {
        e.which = e.which || e.keyCode;
        if((e.which == 13) &&  (e.ctrlKey)) {
            sendMsg();
        }
    }

///ctrl+enter
    function ctrlEnter(e) {
        e.which = e.which || e.keyCode;
        if(e.which == 13) {
            sendMsg();
        }
    }

    function showSettings(){
      show ? removeSettings() : addSettings();
    }

    function addSettings(){
      show=1;
      let set = document.createElement("div");
      set.id="settings";
      set.style.marginTop = "-140px";
      set.style.marginLeft = "207px";
      set.innerHTML = "Cпособ отправки: <form><input type='radio' name='group1' value='1' /> Enter<br /><input type='radio' name='group1' value='2' /> Ctrl+Enter<br /></form>"
      document.getElementById("control").appendChild(set);
    }

    function removeSettings(){
      show=0;
      changeBtns()
    }

    function changeBtns(){
      let elem=document.getElementsByName("group1");
      if(elem[1].checked){
        keys=1;
        localStorage.setItem("key", 1);
      }
      if(elem[0].checked){
        keys=0;
        localStorage.setItem("key", 0);
      }
      document.getElementById("settings").remove();
    }

    function tryConnect(param){
      if (param=="start") {
            setTimeout(function() { loadData() }, 1000);
      }
      else{
        return;
      }
    }

    function loadData(msg) {
        var url="https://2jway2q9n1.execute-api.us-east-2.amazonaws.com/prod/entries";

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            //if request is ready
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200){
                  let now = new Date();
                  let time="<sub> "+(now.getHours()<10?'0':'')+now.getHours()+":"+(now.getMinutes()<10?'0':'') + now.getMinutes()+"</sub>";
                  if(msg){
                    msg.innerHTML+=time;
                    document.getElementById('chatWindow').innerHTML+="<div class='botMsg'>Сообщение принято"+time+"</div>";
                  }
                  else{
                    messageToSend=document.getElementsByClassName('userMsgOffline');
                    for (let i=messageToSend.length-1; i>=0; i--){
                      messageToSend[i].innerHTML+=time;
                      messageToSend[i].className="userMsg";
                    }
                    document.getElementById('chatWindow').innerHTML+="<div class='botMsg'>Сообщение принято"+time+"</div>";
                    tryConnect("stop");
                  }
                }
                else{
                  if(msg){
                    msg.className="userMsgOffline";
                  }
                  tryConnect("start");
                }
            }
        };
    }
