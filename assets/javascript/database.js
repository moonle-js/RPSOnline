import db  from "/assets/javascript/script.js"
import {get, remove,ref, set, child} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

// adding formats
const firstUserNameAddingButton = document.querySelector('#setFirstUserName');
// const secondUserNameAddingButton = document.querySelector('#setSecondUserName');
const firstUserName = document.querySelector('#firstUserName');
// const secondUserName = document.querySelector('#secondUserName');
// Display names for users
const firstUserDisplayName = document.querySelector('#firstUserDisplayName')
// const secondUserDisplayName = document.querySelector('#secondUserDisplayName')

window.addEventListener('load', async function() {
    try {
        await remove(ref(db), 'melumat');
    } catch (error) {
        console.error('Error occurred while saving data:', error);
    }
});





// // Comparing selections
async function compareSelections(){
    var user1Selection;
    var user2Selection;

    var firstUserName = ';'
    var secondUserName = ';'

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
    // Must be done
    if(user1Selection == user2Selection){
        alert('draft')
    }else if(user1Selection == 'paper' && user2Selection == "rock"){
        alert(`${firstUserName} won`)
    }

    
}


async function addNameToDataBase(nameOfUser){   // databazaya ad elave edirem
    get(ref(db, 'users/')).then(result =>{
        if(result.exists()){                    // eger users folderi varesa dalwe gedirem
            if(Object.keys(result.val()).length < 2){         // serverde nece user olub olmadigini yoxluyuram
                get(ref(db, 'users/1')).then(result => {    //eger user 1 varsa user 2niset up edirem
                    if(result.exists()){
                        firstUserDisplayName.innerHTML = `${firstUserName.value.trim()}`
                        set(ref(db, `users/2/nameOfUser`), `${nameOfUser}`)
                        set(ref(db, `users/2/raund`), false)
                        return
                    }else{                                      //eger user 1 yoxdursa user 1i set edirem
                        firstUserDisplayName.innerHTML = `${firstUserName.value.trim()}`
                        set(ref(db, `users/1/nameOfUser`), `${nameOfUser}`)
                        set(ref(db, `users/1/raund`), true)
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
                                            return false;
                                        }else{
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

                                            compareSelections()
                                            return  false;                
                                        }else{
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

