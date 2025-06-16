//Les variables
let usersList=[];
let userDatils=document.querySelector('.user-detail');

//Selections des elements de la DOM
const HtmlUserPick=document.querySelector('.users-pics');


//Les fonctions 
//Fonction elements et chargements json
async function getData() {
    try {
        const response=await fetch('../scripts/datas.json');
        const data=await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
// getData()
//Fonction afficher element
async function afficherData() {
   const data=await getData();
   console.log(data);
    let pictures=data.users;
    for(let picture of pictures){
        HtmlUserPick.innerHTML+=`
        <img class="user-img" src="${picture.image}" title="${picture.name}">
        `;
        // console.log(picture);

        //Créaction object pour affichage d'un seul USer
        const user={
            id:picture.id,
            picture :picture.image,
            name : picture.name,
            age : picture.age,
            email : picture.email,
            adresse: picture.address.street
        }
        //Ajout dans ma liste des users
        usersList.push(user)
    }
}
//Appel de la function afficherData
afficherData();

//Fonctions afficherUser detail

HtmlUserPick.addEventListener('click',(event)=>{
    event.preventDefault();
    let clickedPicture=event.target;
    if(clickedPicture.tagName ==='IMG'){
        let data=clickedPicture.src;
        console.log(data);

        let object=usersList.find((element) => element.picture === data);

        console.log(object);

        userDatils.innerHTML=`
            <img src="${object.picture}" alt="Katrina Robinson">
            <h2>${object.name}</h2>
            <div class="age">${object.age}</div>
            <a class="contact" href="mailto:${object.email}" title="Envoyez un email à ${object.name}"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
            <div class="address">${object.adresse}</div>
        `;

    }
});