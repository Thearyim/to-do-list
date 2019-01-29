function ToDoItem(listItem) {
  this.id;
  this.listItem = listItem;
  this.done = false;
}

ToDoItem.prototype.toHtml = function() {
  var htmlContent = "";
  //   <div id="todoItem-1">item1 <span><img src="img/trashCanIcon.png" /></span></div>
  htmlContent = "<div id='todoItem-" + this.id + "'>" + this.listItem + " <span><img class='trashIcon' src='img/trashCanIcon.png' /></span></div>";
  return htmlContent;
}

function ToDoList() {
  this.currentId = 0;
  this.items = [];
}

ToDoList.prototype.addItem = function(item) {
  this.currentId++;
  item.id = this.currentId;
  this.items.push(item);
}

ToDoList.prototype.toHtml = function() {
  // <div id="toDoList">
  //   <div id="todoItem-1">item1 <span><img class="trashIcon" src="img/trashCanIcon.png" /></span></div>
  //   <div id="todoItem-2">item2 <span><img class="trashIcon" src="img/trashCanIcon.png" /></span></div>
  // </div>
  var htmlContent = "";
  this.items.forEach(function(item) {
    htmlContent += item.toHtml();
  });
  return htmlContent;
}

function initializeFakeData(toDoList) {
  toDoList.addItem(new ToDoItem("Get Groceries"));
  toDoList.addItem(new ToDoItem("Pay Bills"));
  toDoList.addItem(new ToDoItem("Call Mom"));
  toDoList.addItem(new ToDoItem("Walk Dog"));

  showToDoList(toDoList);
}

function showToDoList(toDoList) {
  var remainingToDoList = new ToDoList();
  toDoList.items.forEach(function(item) {
    if (!item.done) {
      remainingToDoList.addItem(item);
    }
  });

  $("#toDoList").html(remainingToDoList.toHtml());
  $("#toDoList img").click(function(event) {
    var parentDiv = $(event.target).parent().parent();
    var parentId = parentDiv.attr("id");
    var itemId = parentId.substring(9);
    removeItem(toDoList, itemId);
    showToDoList(toDoList);
  });
}

function removeItem(toDoList, id) {
  toDoList.items.forEach(function(item) {
    if (item.id == id) {
      item.done = true;
    }
  });
}

$(document).ready(function() {
  var toDoList = new ToDoList();
  // toDoList.addItem(new ToDoItem("exampleItem"));
  // toDoList.addItem(new ToDoItem("exampleItem2"));

  initializeFakeData(toDoList);
  $("#formList").submit(function(event) {
    event.preventDefault();
    var listItem = $("input#item").val();
    toDoList.addItem(new ToDoItem(listItem));
    showToDoList(toDoList);


    //
    // var newToDo = new ToDo(listItem, false);
    // newArray.push(newToDo);
    // console.log(newArray);
    //
    // $("#listShow").append("<p>" + newToDo.listItem + "</p>");
    // $("#remove").hide();

  });
});
