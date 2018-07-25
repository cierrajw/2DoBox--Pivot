
$(window).on('load', getLocalStorage);
//Event Listeners
$('.save-btn').on('click', submitToDo);

$('.card-section').on('click', checkTarget);

$('form').on('keyup', enableSave);

// $('.card-section').on('blur', saveEdits);


// jquery on event delegation, listen to specific items in the card, and use 'this'

// reassign body property of data model to the new thing they entered


//Functions

function getLocalStorage(){

    for(let i=0; i < localStorage.length; i++){

    let retrievedItem = localStorage.getItem(localStorage.key(i));

    let parsedItem = JSON.parse(retrievedItem);
        
    newToDoCard(parsedItem);

        console.log(parsedItem);
    };
};

function NewToDo(){ 

    this.title = $('.title-input').val();
    this.task =  $('.task-input').val();
    this.id = Date.now();
    this.currentImportance = "Normal";
};


function submitToDo(event){
    event.preventDefault();

    // var cards = $('.card-section')[0].childNodes;

    // if(cards){
    //     $('.input').prop('disabled', false); 
    // }

    var todo = new NewToDo();

    newToDoCard(todo);

    setLocalStorage(todo);

    clearToDoFields();
};

// Do we need these????
// function checkInputs(event) {
//     event.preventDefault();
//     if(event.target.className === ".title-input.input" || ".task-input.input") {
//         enableSave();
//     }
// };

// Why won't this work?!?!?!
// function saveButtonEnable() {
    // var titleInput = $('.title-input');
    // var taskInput = $('.task-input');
//     if(titleInput.val() != "" || taskInput.val() != "") {
//         $('.save-btn').prop( 'disabled', false );
//         console.log("you're almost there");
//     } else { 
//         $('.save-btn').prop( 'disabled', true );
//     };
// };

function enableSave() {
    var titleInput = $('.title-input');    
    var taskInput = $('.task-input');
    var submit = $('.save-btn');
    var isDisabled = (!titleInput || !taskInput);
    submit.prop('disabled', isDisabled);
};

function clearToDoFields() {
    $('.title-input').val('');
    console.log("title cleared!");
    $('.task-input').val('');
    console.log("task cleared!");
};

function setLocalStorage(NewToDo){
    var cardKey = NewToDo.id;

    var cardSerialized = localStorage.setItem(cardKey, JSON.stringify(NewToDo));

    console.log("This is the card key:" + cardSerialized);

    console.log("Set and stringified data: " + cardSerialized);

    // getLocalStorage(cardSerialized);
};

function newToDoCard(task){
    // console.log("This:" + Object.keys(this));
    var newCard = `<article class="posted-card" data-id="${task.id}">

                    <h2 class="title-of-card" contenteditable="true" data-title="${task.title}">${task.title}</h2>
                    <button id="deletebutton" class="delete-button card-buttons"></button>
                    <button class="edit-button">Edit</button>
                    <p class="card-task" contenteditable="true" data-task="${task.task}">${task.task}</p>
                    <button id="upvotebutton" class="upvote card-buttons"></button>
                    <button id="downvotebutton" class="downvote card-buttons"></button>
                    <p id="importance" class="quality card-text">Quality: <span>${task.currentImportance}</span></p>
                    </article>`

    var cardSection = $('.card-section');
    cardSection.prepend(newCard);
};

function checkTarget(event){

    if (event.target.id === 'deletebutton'){

        deleteCard(event);
    }
    else if(event.target.id === 'upvotebutton'){

        console.log("Hey u clicked the UPVOTE button!");
        storeUpVote(event);
    }
    else if(event.target.id === 'downvotebutton'){

        console.log("Hey u clicked the DOWNVOTE button!");
        downVote(event);
    }
    else if(event.target.className === 'title-of-card' || 'card-task'){

        $(this).on('keydown', saveEdits);

    };
};


function saveEdits(event){

var title = $(event.target).closest('title-of-card');

// console.log("the thing: ", $(event.target).closest('title-of-card'));


var tehtitle = title.prop('dataset').title;

console.log("The awesome title thing: ", tehtitle);

// console.log("The property trying to get: " , tehtitle);

    console.log("saved edits!!!");
    // var editButton = $(event.target).closest('edit-button');

    // editButton.prop('contenteditable', 'true');
     
};

function deleteCard(event){

    var card = $(event.target).closest('article');

    card.remove();

    console.log("The REAL dataset:", card.prop('dataset'));

    var deleteId = card.prop('dataset').id;

    localStorage.removeItem(deleteId);
};



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