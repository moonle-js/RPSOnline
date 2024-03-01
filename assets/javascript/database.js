import db  from "/assets/javascript/script.js"
import {get, ref, set, child} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

// adding formats
const firstUserNameAddingButton = document.querySelector('#setFirstUserName');
const secondUserNameAddingButton = document.querySelector('#setSecondUserName');
const firstUserName = document.querySelector('#firstUserName');
const secondUserName = document.querySelector('#secondUserName');
// Display names for users
const firstUserDisplayName = document.querySelector('#firstUserDisplayName')
const secondUserDisplayName = document.querySelector('#secondUserDisplayName')

function addNameToDataBase(nameOfUser){
    set(ref(db, "users/" + `${nameOfUser}`), `${nameOfUser}`)
}


// Adding names to db
firstUserNameAddingButton.addEventListener('click', function(){
    if(firstUserName.value.trim()){
        addNameToDataBase(firstUserName.value.trim());
        firstUserDisplayName.innerHTML = `${firstUserName.value.trim()}`
    }
})


secondUserNameAddingButton.addEventListener('click', function(){
    if(secondUserName.value.trim()){
        addNameToDataBase(secondUserName.value.trim());
        secondUserDisplayName.innerHTML = `${secondUserName.value.trim()}`
    }
})

const elavee = document.querySelector('#elavee')
const elaveEt = document.querySelector('#elaveEt')

function chooseOption(user,value){
    set(ref(db, `users/${user}/` + 'selected'), value)
}

elaveEt.addEventListener('click', function(){
    console.log(firstUserDisplayName.innerHTML, elavee.value.trim())
    chooseOption(firstUserDisplayName.innerHTML, elavee.value.trim())
}) 