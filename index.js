// var numCards = 0;
// var quality = "swill";

//Event Listeners
$('.save-btn').on('click', submitToDo);

$('.card-section').on('click', checkTarget);

$.each(localStorage, function(key) {

    var cardData = JSON.parse(this);

    newToDoCard(cardData.title, cardData.body, cardData.id, cardData.currentImportance);

    // this.key
    //grabs every key and iterates
    //use key to access object
    //parse pbject with key
    //passs in to make new card
});

//ToDo object
function NewToDo(){ 

    this.title = $('.title-input').val();
    this.body =  $('.body-input').val();
    this.id = Date.now();
    this.currentImportance = "Normal";


    // return {
    //     title: $('.title-input').val(),
    //     body: $('.body-input').val(),
    //     id: Date.now(),
    //     currentImportance: "Normal",
    //     }
}

function submitToDo(event){

    event.preventDefault();

    var todo = new NewToDo();

    newToDoCard(todo.title, todo.body, todo.id, todo.currentImportance);

    setLocalStorage(todo);
}

// getLocalStorage(cardSerialized);


//Functions

//set local storage of new card
function setLocalStorage(NewToDo){

    var cardKey = 'todo';

    var cardSerialized = localStorage.setItem(cardKey, JSON.stringify(NewToDo));

    console.log("This is the card key:" + cardSerialized);

    console.log("Set and stringified data: " + cardSerialized);

    // getLocalStorage(cardSerialized);
}

//Create the ToDo card
function newToDoCard(title, body, id, currentImportance){
    // console.log("This:" + Object.keys(this));
    var newCard = `<article class="posted-card" data-id="${id}">
                    <h2 class="title-of-card">${title}</h2>
                    <button id="deletebutton" class="delete-button card-buttons"></button>
                    <p class="card-text">${body}</p>
                    <button id="upvotebutton" class="upvote card-buttons"></button>
                    <button id="downvotebutton" class="downvote card-buttons"></button>
                    <p class="quality card-text">Quality: <span>${currentImportance}</span></p>
                    </article>`

    var cardSection = $('.card-section');
    cardSection.prepend(newCard);
}

function checkTarget(event){


    if (event.target.id === 'deletebutton'){

        deleteCard(event);

        // alert("Hey u clicked a DELETE button!");
    }
    else if(event.target.id === 'upvotebutton'){

        alert("Hey u clicked the UPVOTE button!");

    }
    else if(event.target.id === 'downvotebutton'){

        alert("Hey u clicked the DOWNVOTE button!");
    }

}

function deleteCard(event){
    $('deletebutton').closest('article').hide(1000);
    // $('.delete-button').on('click', function(event){
    //     console.log("This is it: " + $(this));
    //     $(this).parent().hide(1000);
    //     console.log($(this));
    // });

    if(event.target.className === 'delete-button'){
        alert("Hey u clicked a DELETE button!");
    }
    console.log("event target:" + event.target.className === 'delete-button');

     // alert("Hey u clicked the CARD SECTION!");
    // ($event.target).className == ""

    // localStorage.remove
}

// get local storage of new card
// function getLocalStorage(cardSerialized){

//     var getCard = JSON.parse(localStorage.getItem(cardSerialized));
//     console.log(getCard);
//     // newToDoCard(getCard.title);
// }








// function parseLocalStorage(cardData){

// }

//parse stored card to get it
// function parseLocalStorage(){

// }


    // numCards++;

//     $( ".card-section" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('card' + numCards  , cardString);
// }

// $('.save-btn').on('click', function(event) {
//     event.preventDefault();
//     if ($('#title-input').val() === "" || $('#body-input').val() === "") {
//        return false;
//     };  

//     numCards++;
//     $( ".card-section" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
//     localStoreCard();
//     $('form')[0].reset();
// });



// $(".card-section").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });