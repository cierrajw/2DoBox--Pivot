
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

// function getLocalStorage() { $.each(localStorage, function(key) {

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
                    <p id="importance" class="quality card-text">Quality: <span>${task.currentImportance}</span></p>
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
        storeUpVote(event);
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


//Event listener on .card-section to allow for upvoting, downvoting 

//NEW CODE

// $("card-section")on.("click", qualityArray);

// Upvote
function storeUpVote(event) {
    var clickedArticle = $(event.target).closest(".posted-card");
    var parsedObj = getNParse(clickedArticle.attr("data-id"));
    upVote(parsedObj);
    stringNSet(parsedObj);
    clickedArticle.find("#importance").text(parsedObj.currentImportance);
    console.log("This is theeee" + parsedObj)
};

function upVote(event) {
    var qualities = ["None", "Low", "Normal", "High", "Critical"];
    var currentQuality = $(event.target).nextAll("p").children().text();
    for(var i = 0; i < qualities.length; i++) {
        if(qualities[i] === currentQuality) {
            $(event.target).nextAll("p").children().text(qualities[i + 1]);
        };
    console.log(currentQuality);
    };
};

// DownVote
function downVote(event) {
    var qualities = ["None", "Low", "Normal", "High", "Critical"];
    var currentQuality = $(event.target).nextAll("p").children().text();
    for(var i = 0; i < qualities.length; i++) {
        if(qualities[i] === currentQuality) {
            $(event.target).nextAll("p").children().text(qualities[i - 1]);
        };
    };

};

// Get & Parse
function stringNSet(task) {
    var stringifiedTask = JSON.stringify(task);
    localStorage.setItem(task.id, stringifiedTask);

};

function getNParse(id) {
    return JSON.parse(localStorage.getItem(id));
};

// /     var cardHTML = $(event.target).closest('.card-container');
// //     var cardHTMLId = cardHTML[0].id;
// //     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
// //     var cardObjectInJS = JSON.parse(cardObjectInJSON);

// //     cardObjectInJS.quality = qualityVariable;

// //     var newCardJSON = JSON.stringify(cardObjectInJS);
// //     localStorage.setItem(cardHTMLId, newCardJSON);
// //     }







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