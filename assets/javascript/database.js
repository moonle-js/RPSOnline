import {get,remove, onValue, ref, set} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"



import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyCzAFtgFwvxbvW6xe7uYdMubdPO4JoYtWc",
//   authDomain: "rockpaperscissors-1d8da.firebaseapp.com",
//   projectId: "rockpaperscissors-1d8da",
//   storageBucket: "rockpaperscissors-1d8da.appspot.com",
//   messagingSenderId: "301698218341",
//   appId: "1:301698218341:web:2c3a60a46a2b0d493c098c",
//   measurementId: "G-C5N5XSPK7K"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDdA6aeQq6g-DXeBRo_UXuPf5gsvefy_Qk",
  authDomain: "chatbot-3410b.firebaseapp.com",
  databaseURL: "https://chatbot-3410b-default-rtdb.firebaseio.com",
  projectId: "chatbot-3410b",
  storageBucket: "chatbot-3410b.appspot.com",
  messagingSenderId: "918085028143",
  appId: "1:918085028143:web:cf530fa8d4053b005539da",
  measurementId: "G-XF1MWZ2PXJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);





// adding formats
const firstUserNameAddingButton = document.querySelector('#setFirstUserName');
// const secondUserNameAddingButton = document.querySelector('#setSecondUserName');
const firstUserName = document.querySelector('#firstUserName');
// Display names for users
const firstUserDisplayName = document.querySelector('#firstUserDisplayName')


const senderDecision = document.querySelector('#senderDecision')


var user1Score = 0;
var user2Score = 0;


onValue(ref(db, 'users'), response => {
    if(response.exists()){
        get(ref(db, 'users/1')).then(data => {
            if(data.exists()){
                get(ref(db, 'users/2')).then(cavab => {
                    if(cavab.exists()){
                        document.querySelector('.userScore').innerHTML = `
                            <p>${data.val().nameOfUser} score is: ${data.val().score}</p>
                            <p>${cavab.val().nameOfUser} score is: ${cavab.val().score}</p>
                        `
                    }
                })
            }
        })
    }
})

async function addNameToDataBase(nameOfUser){   // databazaya ad elave edirem
    

    get(ref(db, 'users/')).then(result =>{
        if(result.exists()){                    // eger users folderi varesa dalwe gedirem
            if(Object.keys(result.val()).length < 2){         // serverde nece user olub olmadigini yoxluyuram
                get(ref(db, 'users/1')).then(result => {    //eger user 1 varsa user 2niset up edirem
                    if(result.exists()){
                        firstUserDisplayName.innerHTML = `${firstUserName.value.trim()}`
                        set(ref(db, `users/2/nameOfUser`), `${nameOfUser}`)
                        set(ref(db, `users/2/raund`), false)
                        set(ref(db, `users/1/raund`), true)
                        set(ref(db, 'users/1/score'), 0)
                        set(ref(db, 'users/2/score'), 0)
                    document.querySelector('#senderDecision').innerHTML = ""

                        return
                    }else{                                      //eger user 1 yoxdursa user 1i set edirem
                        firstUserDisplayName.innerHTML = `${firstUserName.value.trim()}`
                        set(ref(db, `users/1/nameOfUser`), `${nameOfUser}`)
                        set(ref(db, `users/1/raund`), true)
                        set(ref(db, `users/2/raund`), false)
                        set(ref(db, 'users/1/score'), 0)
                        set(ref(db, 'users/2/score'), 0)
                    document.querySelector('#senderDecision').innerHTML = ""

                        return
                    }
                })
            }else{
                alert('server is full with users')   // eger her iki user varsa 3cu adama girmeye qoymuram
            }
        }else{                                      // eger serverde olan user 1 deil user 2dirse onda user 1i elave edirem
            firstUserDisplayName.innerHTML = `${firstUserName.value.trim()}`
            set(ref(db, `users/1/nameOfUser`), `${nameOfUser}`)
            set(ref(db, `users/1/raund`), true)
        }
    })    
}


// Adding names to db
firstUserNameAddingButton.addEventListener('click', function(){
    if(firstUserName.value.trim()){
        addNameToDataBase(firstUserName.value.trim());
    }
})




// // Comparing selections
async function compareSelections(){
    var user1Selection;
    var user2Selection;

    var firstUserName = ''
    var secondUserName = ''

    await get(ref(db, 'users/1')).then(result => {
        if(result.exists()){
            firstUserName = result.val().nameOfUser
            user1Selection = result.val().selected
        }
    })

    await get(ref(db, 'users/2')).then(result => {
        if(result.exists()){
            secondUserName = result.val().nameOfUser
            user2Selection = result.val().selected
        }
    })

    async function showSelected(){
        get(ref(db, 'users')).then(result => {
            if(result.exists()){

                // secilen elementleri gosterir ki kim ne secib
                get(ref(db, 'users/2')).then(data => {
                    if(data.exists()){
                        if(data.val().raund == false){
                            get(ref(db, 'users/2')).then(example => {
                                if(example.exists()){
                                    if(example.val().nameOfUser == firstUserDisplayName.innerHTML){
                                        get(ref(db, 'users/1')).then(meselen => {
                                            if(meselen.exists()){

                                                get(ref(db, 'users/1')).then(opponentName => 
                                                    senderDecision.innerHTML = `
                                                        <div>
                                                            <p>${opponentName.val().nameOfUser} Selected</p>
                                                            <img src ="./assets/images/${meselen.val().selected}.svg">
                                                            <p>${meselen.val().selected}</p>
                                                        </div>
                                                    `
                                                )

                                                

                                                setTimeout(function(){
                                                    senderDecision.innerHTML = `
                                                        <div>
                                                            <p>Wait for first user</p>
                                                        </div>
                                                    `
                                                },3000)
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })


                get(ref(db, 'users/1')).then(data => {
                    if(data.exists()){
                        if(data.val().raund == true){
                            get(ref(db, 'users/1')).then(example => {
                                if(example.exists()){
                                    if(example.val().nameOfUser == firstUserDisplayName.innerHTML){
                                        get(ref(db, 'users/2')).then(meselen => {
                                            if(meselen.exists()){
                                                get(ref(db, 'users/2')).then(opponentName => 
                                                    senderDecision.innerHTML = `
                                                        <div>
                                                            <p>${opponentName.val().nameOfUser} Selected</p>
                                                            <img src ="./assets/images/${meselen.val().selected}.svg">
                                                            <p>${meselen.val().selected}</p>
                                                        </div>
                                                    `
                                                )
                                                setTimeout(function(){
                                                    senderDecision.innerHTML = `
                                                        <div>
                                                            <p>Select again</p>
                                                        </div>
                                                    `
                                                },3000)
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
        
        
    
    }

    await showSelected();

    function showStatistics(nameOFUserr){

        set(ref(db, 'users/2/score'), user2Score)
        set(ref(db, 'users/1/score'), user1Score)
        // burda da nece xallar oldugunu gosterir
        get(ref(db, 'users/1')).then(response => {
            if(response.val().nameOfUser == firstUserDisplayName.innerHTML){
                document.querySelector('.userStatus').innerHTML = response.val().status
                // document.querySelector('.userScore').innerHTML = `Your score is: ${response.val().score}`

                // get(ref(db, 'users/2')).then(response => {
                //     if(response.exists()){
                //         document.querySelector('.userScore').innerHTML += `<p>${response.val().nameOfUser} score is: ${response.val().score}</p>`
                //     }
                // })
            }
        })

        get(ref(db, 'users/2')).then(response => {
            if(response.val().nameOfUser == firstUserDisplayName.innerHTML){
                document.querySelector('.userStatus').innerHTML = response.val().status
                // document.querySelector('.userScore').innerHTML = `Your score is: ${response.val().score}`

                // get(ref(db, 'users/1')).then(response => {
                //     if(response.exists()){
                //         document.querySelector('.userScore').innerHTML += `<p>${response.val().nameOfUser} score is: ${response.val().score}</p>`
                //     }
                // })
            }
        })


        
    }

    var winner;
    if(user1Selection == user2Selection){
        set(ref(db, 'users/1/status'), 'Draft')
        set(ref(db, 'users/2/status'), 'Draft')
        showStatistics()
    }else if(user1Selection == 'paper' && user2Selection == "rock"){
        set(ref(db, 'users/1/status'), 'You won')
        set(ref(db, 'users/2/status'), 'You lost')

        user1Score++;
        
        winner = firstUserName;
        showStatistics(winner)
    }else if(user1Selection == 'paper' && user2Selection == "scissors"){

        set(ref(db, 'users/2/status'), 'You won')
        set(ref(db, 'users/1/status'), 'You lost')

        user2Score++;

        winner = secondUserName;
        showStatistics(winner)
    }else if(user1Selection == 'scissors' && user2Selection == "rock"){

        set(ref(db, 'users/2/status'), 'You won')
        set(ref(db, 'users/1/status'), 'You lost')
        
        user2Score++;

        winner = secondUserName;
        showStatistics(winner)
    }else if(user1Selection == 'scissors' && user2Selection == "paper"){

        set(ref(db, 'users/1/status'), 'You won')
        set(ref(db, 'users/2/status'), 'You lost')

        user1Score++;

        winner = firstUserName;
        showStatistics(winner)
    }else if(user1Selection == 'rock' && user2Selection == "scissors"){

        set(ref(db, 'users/1/status'), 'You won')
        set(ref(db, 'users/2/status'), 'You lost')

        user1Score++;

        winner = firstUserName;
        showStatistics(winner)
    }else if(user1Selection == 'rock' && user2Selection == "paper"){

        set(ref(db, 'users/2/status'), 'You won')
        set(ref(db, 'users/1/status'), 'You lost')
       
        user2Score++;

        winner = secondUserName;
        showStatistics(winner)
    }

}

var t;

// Adding selected element to database
const selectelementForUserFirst = document.querySelectorAll('.selectelement');
selectelementForUserFirst.forEach(function(item){
    item.addEventListener('click', function(){     // Sekillere basanda event ise dusur
        get(ref(db, 'users/')).then(result =>{     // users folderine zapros atiram servere
            if(result.exists()){                    // eger usersde kimse varsa novbeti addima kecirem
                if(Object.keys(result.val()).length == 2){    //eger users folderinde 2 dene user varsa girir ifin icine 

                    

                    get(ref(db, 'users/1')).then(result => {      //user 1e zapros atiram ki yoxlasin varligini
                        if(result.exists()){               // users 1in varligini yoxluyur (her zaman olacaq onsuz, olamsa oyun baslamaz)
                            if(firstUserDisplayName.innerHTML == result.val().nameOfUser){  //eger ekrandaki oyuncu adi ile user 1in adi eynidirse
                                get(ref(db, 'users/1/raund')).then(result => {  // user1in novbesi olub olmadigini yoxluyuram
                                    if(result.exists()){
                                        if(result.val() === true){   //burda yoxladiqdan sonra dusurem alta
                                            set(ref(db, 'users/1/selected'), `${item.id}`)  // burda da selectede secilen elementin adini verirem (paper/scissors/rock)
                                            set(ref(db, 'users/2/raund'), true) // burda da swith edirem novbeni ikinci usere
                                            set(ref(db, 'users/1/raund'), false)

                                            document.querySelector('.senderDecision').innerHTML = `
                                                <div>
                                                    <p>Waiting for opponent</p>
                                                </div>
                                            `

                                            if(!t){
                                                t = setInterval(function(){
                                                    get(ref(db, 'users/2/')).then(result => {
                                                        if(result.exists()){
                                                            if(result.val().raund == false){
                                                                compareSelections()
                                                                clearInterval(t)
                                                                t = undefined;
                                                            }
                                                        }
                                                    })
                                                },2000)
                                            }
                                            

                                            return false;
                                        }else{
                                            alert('please wait for opponent')

                                            return false;
                                        }
                                    }
                                })
                            }
                        }
                    })

                    get(ref(db, 'users/2')).then(result => {  //ussteki emeliyyatlarla eynidi prinsipi
                        if(result.exists()){
                            if(firstUserDisplayName.innerHTML == result.val().nameOfUser){
                                get(ref(db, 'users/2/raund')).then(result => {
                                    if(result.exists()){
                                        if(result.val() === true){
                                            set(ref(db, 'users/2/selected'), `${item.id}`)
                                            set(ref(db, 'users/1/raund'), true)
                                            set(ref(db, 'users/2/raund'), false)
                                            


                                            get(ref(db, 'users/2/raund')).then( result => {
                                                if(result.exists){
                                                    if(result.val() == false){
                                                        compareSelections();
                                                        return false
                                                    }
                                                }
                                            })

                                            return  false;                
                                        }else{
                                            document.querySelector('.senderDecision').innerHTML = `
                                                <div>
                                                    <p>Waiting for opponent</p>
                                                </div>
                                            `
                                            return false;
                                        }
                                    }
                                })
                            }
                        }
                    })                    


                }else{                                 
                    alert('Wait for second user')
                }
            }else{
                alert('please add name for begining')         //users folderi umumen yoxdursa eventler islemeyecek
            }
        })    
    })

})




// messages section

const message = document.querySelector('#messageValue');
const sendMessage = document.querySelector('#sendMessage');

// mesajlari databazaya elave edir
sendMessage.addEventListener('click', function(){
    if(message.value.trim()){
        set(ref(db, 'chat'), `<div>${firstUserDisplayName.innerHTML}: ${message.value.trim()}</div>`)
        message.value = ""
    }
})
document.addEventListener('keyup', function(e){
    if(e.key == "Enter" && message.value.trim()){
        set(ref(db, 'chat'), `<div>${firstUserDisplayName.innerHTML}: ${message.value.trim()}</div>`)
        message.value = ""
    }
})

// Chat deyisilende butun mesajlar olan boxun icini deyisdirir

onValue(ref(db, 'chat'), response => {
    if(response.exists()){
        if(response.val() == ' '){
            document.querySelector('#messagesFromDB').innerHTML = ''
        }else{
            document.querySelector('#messagesFromDB').innerHTML += response.val()
        }
    }
})


document.onchange = function(){
    setTimeout(function(){
        get(ref(db, 'users/1')).then(resultat => {
            if(resultat.exists()){
                document.querySelectorAll('#messagesFromDB div').forEach(function(item){
                    if(resultat.val().nameOfUser == firstUserDisplayName.innerHTML){
                        if(item.innerHTML.includes(`${firstUserDisplayName.innerHTML}`)){
                            item.style.alignSelf = 'flex-end'
                        }
                    }
                })
            }
        })
    
        get(ref(db, 'users/2')).then(resultat => {
            if(resultat.exists()){
                document.querySelectorAll('#messagesFromDB div').forEach(function(item){
                    if(resultat.val().nameOfUser == firstUserDisplayName.innerHTML){
                        if(item.innerHTML.includes(`${firstUserDisplayName.innerHTML}`)){
                            item.style.alignSelf = 'flex-end'
                        }
                    }
                })
            }
        })
    },100)
    
}



onValue(ref(db, 'users/2/raund'), response => {
    if(response.exists()){
        if(response.val() == true){
            get(ref(db, 'users/2')).then(response => {
                if(response.exists()){
                    if(response.val().nameOfUser == firstUserDisplayName.innerHTML){
                        document.querySelector('#senderDecision').innerHTML = "<div><p>Please select</p></div>"
                    }
                }
            })
        }
    }
})


// Clear database on closing window


window.addEventListener('beforeunload', async function(e) {
    e.preventDefault()
    set(ref(db, 'chat'), ' ')
    get(ref(db, 'users/')).then(response => {
        if(response.exists()){
            for(let key in response.val()){
                if(response.val()[key].nameOfUser == firstUserDisplayName.innerHTML){
                    if(key == 1){
                        remove(ref(db, `users/${key}`))
                        remove(ref(db, `users/2/selected`))
                        remove(ref(db, `users/2/status`))
                        remove(ref(db, `users/2/raund`))
                        user1Score = 0;
                        user2Score = 0;
                    }else if (key == 2){
                        remove(ref(db, `users/${key}`))
                        remove(ref(db, `users/1/selected`))
                        remove(ref(db, `users/1/status`))
                        remove(ref(db, `users/1/raund`))
                        user1Score = 0;
                        user2Score = 0;
                    }
                }
            }
        }
    })
});


