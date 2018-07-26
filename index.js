//Event Listeners

$(window).on('load', getLocalStorage);

$('.save-btn').on('click', submitToDo);

$('.card-section').on('click', checkTarget);

$('form').on('keyup', enableDisableSave);

$('#search-input').on('keyup', filterSearch);


function filterSearch() {

var lowerCaseInput = $('#search-input').val().toLowerCase();
$('.search-area').each(function() {
    if($(this).text().toLowerCase().indexOf(lowerCaseInput) >= 0) {
        $(this).parent().slideDown();
    } else {
        $(this).parent().slideUp();
    };
});
};





// jquery on event delegation, listen to specific items in the card, and use 'this'

// reassign body property of data model to the new thing they entered


//Functions

function getLocalStorage(){

    for(let i=0; i < localStorage.length; i++){

    let retrievedItem = localStorage.getItem(localStorage.key(i));

    let parsedItem = JSON.parse(retrievedItem);
        
    newToDoCard(parsedItem);

    // console.log(parsedItem);
    }
}

function NewToDo(){ 

    this.id = Date.now();
    this.title = $('.title-input').val();
    this.task =  $('.task-input').val();
    this.currentImportance = "Normal";
};


function submitToDo(event){
    event.preventDefault();

    var todo = new NewToDo();

    newToDoCard(todo);

    setLocalStorage(todo);

    clearToDoFields();
};

function enableDisableSave() {
    var titleInput = $('.title-input');    
    var taskInput = $('.task-input');
    var submit = $('.save-btn');
    if(titleInput.val() == '' || taskInput.val() == '') {
        submit.prop('disabled', true);
    } else {
        submit.prop('disabled', false);
    };
};

function clearToDoFields() {
    $('.title-input').val('');
    // console.log("title cleared!");
    $('.task-input').val('');
    // console.log("task cleared!");
    enableDisableSave();
};





function setLocalStorage(NewToDo){
    var cardKey = NewToDo.id;

    var cardSerialized = localStorage.setItem(cardKey, JSON.stringify(NewToDo));

    // console.log("Set and stringified data: " + cardSerialized);

    // getLocalStorage(cardSerialized);
};

function newToDoCard(task){
    // console.log("This:" + Object.keys(this));
    var newCard = `<article class="posted-card" data-id="${task.id}" id="${task.id}">

                    <div class="search-area">
                        <h2 class="title-of-card" contenteditable="true" data-thetitle="${task.title}">${task.title}</h2>
                        <button id="deletebutton" class="delete-button card-buttons" aria-label="delete"></button>
                        <p class="card-task" contenteditable="true" data-task="${task.task}">${task.task}</p>
                    </div>

                    <button id="upvotebutton" class="upvote card-buttons" aria-label="upvote"></button>
                    <button id="downvotebutton" class="downvote card-buttons" aria-label="downvote"></button>
                    <div class="card-bottom">

                    <p id="importance" class="quality card-text">Quality: <span>${task.currentImportance}</span></p>
                    <button class="completed-button" aria-label="completed">Completed</button>
                    </div>
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
    else if(event.target.className === 'title-of-card'){
        // $(this).on('keyup', saveTitle);
    }
}


// function checkKey(event) {
//     console.log('checkKey linked')
//   if (trueEnter(event)) saveEdits(event);
// };

// function trueEnter(event) {
//   if (event.which === 13 && event.shiftKey === false) {
//     $(event.target).blur();
//     return true;
//   };
// };


// }
//don't delete for now... but delete before eval
$('.card-section').on('keyup', '.title-of-card', function() {
    var titleID = $(this).parent().parent().prop('id');

    var title = $(event.target).closest('.title-of-card');
    var titleInnerHTML = title[0].innerHTML;
    var retrievedTitle = localStorage.getItem(titleID);
    parsedTitle = JSON.parse(retrievedTitle);
    parsedTitle.title = titleInnerHTML;

    var stringifiedTitle = JSON.stringify(parsedTitle);

    localStorage.setItem(titleID, stringifiedTitle);

    console.log('hello', parsedTitle)
});

$('.card-section').on('keyup', '.card-task', function() {
    var taskID = $(this).parent().parent().prop('id');

    var task = $(event.target).closest('.card-task');
    var taskInnerHTML = task[0].innerHTML;
    var retrievedTask = localStorage.getItem(taskID);
    parsedTask = JSON.parse(retrievedTask);
    parsedTask.task = taskInnerHTML;

    var stringifiedTask = JSON.stringify(parsedTask);

    localStorage.setItem(taskID, stringifiedTask);
});

// function saveEdits(event){

// var title = $(event.target).closest('.title-of-card');

// var titleID = $(this).parent().parent().prop('id');
// console.log('id', titleID)

// var titleInnerHTML = title[0].innerHTML;

// // console.log("The inner HTML: ", titleInnerHTML);

// var retrieved2do = localStorage.getItem(titleID);

// parsedToDo = JSON.parse(retrieved2do);

// var editedIdea = {
//     title: titleInnerHTML,
//     id: Date.now()
// }

// var stringifiedToDo = JSON.stringify(editedIdea);

// localStorage.setItem(titleID, stringifiedToDo);

// // var originalData = title.prop('dataset').thetitle;


// //give edited title an id

//  // var newCardId = $(event.target).closest().attr('id');

//  // console.log(newCardId);
     
// }



function deleteCard(event){

    var card = $(event.target).closest('article');

    // console.log("The card object: ", card);

    card.remove();

    var deleteId = card.prop('dataset').id;

    localStorage.removeItem(deleteId);
};



// Upvote
// function storeUpVote(event) {
//     var clickedArticle = $(event.target).closest(".posted-card");
//     var parsedObj = getNParse(clickedArticle.attr("data-id"));
//     upVote(parsedObj);
//     stringNSet(parsedObj);
//     clickedArticle.find("#importance").text(parsedObj.currentImportance);
//     console.log("This is theeee" + parsedObj)
// };

// function upVote(event) {
//     var qualities = ["None", "Low", "Normal", "High", "Critical"];
//     var currentQuality = $(event.target).nextAll("p").children().text();
//     for(var i = 0; i < qualities.length; i++) {
//         if(qualities[i] === currentQuality) {
//             $(event.target).nextAll("p").children().text(qualities[i + 1]);
//         };
//     console.log(currentQuality);
//     };
// };

// DownVote
// function downVote(event) {
//     var qualities = ["None", "Low", "Normal", "High", "Critical"];
//     var currentQuality = $(event.target).nextAll("p").children().text();
//     for(var i = 0; i < qualities.length; i++) {
//         if(qualities[i] === currentQuality) {
//             $(event.target).nextAll("p").children().text(qualities[i - 1]);
//         };
//     };

// };