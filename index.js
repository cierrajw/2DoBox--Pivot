//Event Listeners

$(window).on('load', getLocalStorage);
$('.save-btn').on('click', submitToDo);
$('.card-section').on('click', checkTarget);
$('form').on('keyup', enableDisableSave);
$('#search-input').on('keyup', filterSearch);
$('.card-section').on('keyup', '.title-of-card', saveTitleEdit);
$('.card-section').on('keyup', '.card-task', saveTaskEdit);

//Functions

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

//Functions

function getLocalStorage(){
    for(var i=0; i < localStorage.length; i++){
    var retrievedItem = localStorage.getItem(localStorage.key(i));
    var parsedItem = JSON.parse(retrievedItem);
    newToDoCard(parsedItem);
    };
};

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
    $('.task-input').val('');
    enableDisableSave();
};

function setLocalStorage(NewToDo){
    var cardKey = NewToDo.id;
    var cardSerialized = localStorage.setItem(cardKey, JSON.stringify(NewToDo));
};

function newToDoCard(task){
    var newCard = `<article class="posted-card" data-id="${task.id}" id="${task.id}">

                    <div class="search-area">
                        <h2 class="title-of-card" contenteditable="true" data-thetitle="${task.title}">${task.title}</h2>
                        <button id="deletebutton" class="delete-button card-buttons" aria-label="delete"></button>
                        <p class="card-task" contenteditable="true" data-task="${task.task}">${task.task}</p>
                    </div>

                    <button id="upvotebutton" class="upvote card-buttons" aria-label="upvote"></button>
                    <button id="downvotebutton" class="downvote card-buttons" aria-label="downvote"></button>
                    <div class="card-bottom">

                    <p id="importance" class="quality card-text">Importance: <span>${task.currentImportance}</span></p>
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
        storeUpVote(event);
    }
    else if(event.target.id === 'downvotebutton'){
      storeDownVote(event);
    }
};

function saveTitleEdit(){

    var titleID = $(this).parent().parent().prop('id');
    var title = $(event.target).closest('.title-of-card');
    var titleInnerHTML = title[0].innerHTML;
    var retrievedTitle = localStorage.getItem(titleID);
    parsedTitle = JSON.parse(retrievedTitle);
    parsedTitle.title = titleInnerHTML;
    var stringifiedTitle = JSON.stringify(parsedTitle);
    localStorage.setItem(titleID, stringifiedTitle);
};

function saveTaskEdit(){

    var taskID = $(this).parent().parent().prop('id');
    var task = $(event.target).closest('.card-task');
    var taskInnerHTML = task[0].innerHTML;
    var retrievedTask = localStorage.getItem(taskID);
    parsedTask = JSON.parse(retrievedTask);
    parsedTask.task = taskInnerHTML;
    var stringifiedTask = JSON.stringify(parsedTask);
    localStorage.setItem(taskID, stringifiedTask);
};

function deleteCard(event){
    var card = $(event.target).closest('article');
    card.remove();
    var deleteId = card.prop('dataset').id;
    localStorage.removeItem(deleteId);
};

function storeUpVote(event) {
    var cardId = $(event.target).closest(".posted-card").prop("id");
    var retrievedCard = localStorage.getItem(cardId);
    var parsedObject = JSON.parse(retrievedCard);
    upVote(parsedObject, event, cardId);
};

function storeDownVote(event) {
    var cardId = $(event.target).closest(".posted-card").prop("id");
    var retrievedCard = localStorage.getItem(cardId);
    var parsedObject = JSON.parse(retrievedCard);
    downVote(parsedObject, event, cardId);
};

function upVote(object, event) {
    var ranking = ["None", "Low", "Normal", "High", "Critical"];
    var updatedRanking;
    var currentImportance = $(event.target).nextAll('div').children('p').children('span').text();
    for(var i = 0; i < ranking.length; i++) {
        if(ranking[i] === currentImportance) {
            updatedRanking = ranking[i + 1];
            $(event.target).nextAll('div').children('p').children('span').text(ranking[i + 1]);
        };
    };
    object.currentImportance = updatedRanking;
    var stringifiedObj = localStorage.setItem(object.id, JSON.stringify(object));
};

function downVote(object, event) {
    var ranking = ["None", "Low", "Normal", "High", "Critical"];
    var updatedRanking;
    var currentImportance = $(event.target).nextAll('div').children('p').children('span').text();
    for(var i = 0; i < ranking.length; i++) {
        if(ranking[i] === currentImportance) {
            updatedRanking = ranking[i - 1];
            $(event.target).nextAll('div').children('p').children('span').text(ranking[i - 1]);
        };
    };
    object.currentImportance = updatedRanking;
    var stringifiedObj = localStorage.setItem(object.id, JSON.stringify(object));
};

