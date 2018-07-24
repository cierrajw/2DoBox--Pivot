
$(window).on('load', getLocalStorage);
//Event Listeners
$('.save-btn').on('click', submitToDo);

$('.card-section').on('click', checkTarget);


//Functions

function getLocalStorage(){

    for(let i=0; i < localStorage.length; i++){

    let retrievedItem = localStorage.getItem(localStorage.key(i));

    let parsedItem = JSON.parse(retrievedItem);
        
    newToDoCard(parsedItem);

        console.log(parsedItem);
    }
}

// function getItems() { $.each(localStorage, function(key) {

//     var cardData = JSON.parse(this);

//     newToDoCard(cardData.title, cardData.task, cardData.id, cardData.currentImportance);

//     // this.key
//     //grabs every key and iterates
//     //use key to access object
//     //parse pbject with key
//     //passs in to make new card
// });
// }


    // this.key
    //grabs every key and iterates
    //use key to access object
    //parse pbject with key
    //passs in to make new card



function NewToDo(){ 

    this.title = $('.title-input').val();
    this.task =  $('.task-input').val();
    this.id = Date.now();
    this.currentImportance = "Normal";
}

function submitToDo(event){
    event.preventDefault();

    // var cards = $('.card-section')[0].childNodes;

    // if(cards){
    //     $('.input').prop('disabled', false); 
    // }

    var todo = new NewToDo();

    newToDoCard(todo);

    setLocalStorage(todo);

    // clearToDoFields();
}

// function clearToDoFields(){

//     $('.title-input').val() = '';
//     // var task = $('.task-input') = '';
// }

function setLocalStorage(NewToDo){

    var cardKey = NewToDo.id;

    var cardSerialized = localStorage.setItem(cardKey, JSON.stringify(NewToDo));

    console.log("This is the card key:" + cardSerialized);

    console.log("Set and stringified data: " + cardSerialized);

    // getLocalStorage(cardSerialized);
}

function newToDoCard(task){
    // console.log("This:" + Object.keys(this));
    var newCard = `<article class="posted-card" data-id="${task.id}">
                    <h2 class="title-of-card" contenteditable="true">${task.title}</h2>
                    <button id="deletebutton" class="delete-button card-buttons"></button>
                    <p class="card-text" contenteditable="true">${task.task}</p>
                    <button id="upvotebutton" class="upvote card-buttons"></button>
                    <button id="downvotebutton" class="downvote card-buttons"></button>
                    <p class="quality card-text">Quality: <span>${task.currentImportance}</span></p>
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

        console.log("Hey u clicked the UPVOTE button!");
        upVote(event);
    }
    else if(event.target.id === 'downvotebutton'){

        console.log("Hey u clicked the DOWNVOTE button!");
        downVote(event);
    }

}

function deleteCard(event){

    var card = $(event.target).closest('article');

    card.remove();

    var deleteId = card.prop('dataset').id;

    localStorage.removeItem(deleteId);
}

function qualityArray() {
    var qualities = ["swill", "plausible", "genius"];
    // upVote(qualities);
    // downVote(qualities);
};


function upVote(event) {
    var qualities = ["swill", "plausible", "genius"];
    var currentQual = $(event.target).nextAll("p").children().text();
    // qualities.indexOf(searchElement[]);
    if(currentQual === qualities[0]) {
        currentQual === qualities[1];
    } else if(currentQual === qualities[1]) {
        currentQual === qualities[2];
    }
    console.log(currentQual);
}

function downVote(event) {
    var qualities = ["swill", "plausible", "genius"];
};


    // numCards++;

//     $( ".card-section" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });


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