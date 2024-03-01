import db  from "/assets/javascript/script.js"
import {get, ref, set, child} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

// adding formats
const firstUserNameAddingButton = document.querySelector('#setFirstUserName');
// const secondUserNameAddingButton = document.querySelector('#setSecondUserName');
const firstUserName = document.querySelector('#firstUserName');
// const secondUserName = document.querySelector('#secondUserName');
// Display names for users
const firstUserDisplayName = document.querySelector('#firstUserDisplayName')
// const secondUserDisplayName = document.querySelector('#secondUserDisplayName')



// var user1Selection;
// var user2Selection;

// // Comparing selections
// async function compareSelections(){
//     await get(ref(db, `users/${firstUserDisplayName.innerHTML}`)).then(result => {
//         if(result.exists){
//             user1Selection = result.val().selected
//         }
//     })

//     await get(ref(db, `users/${secondUserDisplayName.innerHTML}`)).then(result => {
//         if(result.exists){
//             user2Selection = result.val().selected
//             console.log(user2Selection, user1Selection)

//             if(`${user1Selection}2` == `${user2Selection}`){
//                 alert('draw')
//             }
//             else if (user1Selection == "paper" && user2Selection == "rock2"){
//                 alert('user 1 won')
//             }else if(user1Selection == "paper" && user2Selection == "scissors2"){
//                 alert('user 2 won')
//             }
//             else if(user1Selection == "rock" && user2Selection == "paper2"){
//                 alert('user 2 won')
//             }
//             else if(user1Selection == "rock" && user2Selection == "scissor2"){
//                 alert('user 1 won')
//             }
//             else if(user1Selection == "scissors" && user2Selection == "rock2"){
//                 alert('user 2 won')
//             }
//             else if(user1Selection == "scissor" && user2Selection == "paper2"){
//                 alert('user 1 won')
//             }
//         }
//     })


    
// }





// secondUserNameAddingButton.addEventListener('click',async function(){
//     if(secondUserName.value.trim()){
//         await addNameToDataBase(secondUserName.value.trim(), false);
//         secondUserDisplayName.innerHTML = `${secondUserName.value.trim()}`
//     }
// })



 


// const selectelementForUserSecond = document.querySelectorAll('.selectelement2');
// selectelementForUserSecond.forEach(function(item){
//     item.addEventListener('click', function(){
//         set(ref(db, `users/${secondUserDisplayName.innerHTML}/selected`), `${item.id}`)
//         compareSelections();
//     })
// })


async function addNameToDataBase(nameOfUser){
    var lastIndex = 1;

    get(ref(db, `index`)).then(result => {
        if(result.exists()){
            lastIndex++;
            set(ref(db, 'index/' + 'indexCurrent'), lastIndex);
            set(ref(db, "users/" + `${nameOfUser}`), `${nameOfUser}`)
            set(ref(db, "users/" + `${nameOfUser}/indexOfUser`), `${lastIndex}`)
        }else{
            set(ref(db, 'index/' + 'indexCurrent'), 1);
            set(ref(db, "users/" + `${nameOfUser}`), `${nameOfUser}`)
            set(ref(db, "users/" + `${nameOfUser}/indexOfUser`), `${lastIndex}`)
        }
    })


    
}


// Adding names to db
firstUserNameAddingButton.addEventListener('click', function(){
    if(firstUserName.value.trim()){


        addNameToDataBase(firstUserName.value.trim());
        firstUserDisplayName.innerHTML = `${firstUserName.value.trim()}`
    }
})


// Adding selected element to database
const selectelementForUserFirst = document.querySelectorAll('.selectelement');
selectelementForUserFirst.forEach(function(item){
    item.addEventListener('click', function(){
        set(ref(db, `users/${firstUserDisplayName.innerHTML}/selected`), `${item.id}`)
    })
})

