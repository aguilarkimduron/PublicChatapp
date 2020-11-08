let userName = 'unknown'+Math.floor(Math.random()*99999)
const sendMsg = document.querySelector('.message-send')
const msgCompose = document.querySelector('.message-compose')
const msgsHolder = document.querySelector('ul')
const container = document.querySelector('.messages-container')
const firebaseConfig = {
    apiKey: "AIzaSyD46B56VR_Mua3dH9rD_jt3ngX-q1xlt9Y",
    authDomain: "chatapp-b276e.firebaseapp.com",
    databaseURL: "https://chatapp-b276e.firebaseio.com",
    projectId: "chatapp-b276e",
    storageBucket: "chatapp-b276e.appspot.com",
    messagingSenderId: "669852351171",
    appId: "1:669852351171:web:314e6f13b850e2b2f54076",
    measurementId: "G-R6R1VFKRSB"
  }
firebase.initializeApp(firebaseConfig)
firebase.database().ref('messages').on('child_added', async (data) => {
    let values = await data.val()
    console.log(values)
    document.querySelector('.loader-background').style.display = 'none'
    let li = `<li class="message"><span class="username">${values.sender}</span><div class="message-text">
    <p>${values.message}</p></div></li>`
    msgsHolder.innerHTML += li
    container.scrollTo(0, msgsHolder.offsetHeight)
})

sendMsg.addEventListener('click', () => {
    if(!msgCompose.textContent) return
    firebase.database().ref('messages').push().set({
        'sender': userName.trim(),
        'message': msgCompose.textContent.trim()
    })
    msgCompose.textContent = ''
})