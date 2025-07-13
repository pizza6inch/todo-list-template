let listState = [];

const STATE_KEY = "todo-list";

let list = document.getElementById("list");
let inputButton = document.getElementById("addButton");

initList();

inputButton.addEventListener("click", addItem);

function loadState() {
  const stringState = localStorage.getItem(STATE_KEY);
  if (stringState !== "{}") {
    return JSON.parse(stringState);
  }
  return [];
}

function saveState(list) {
  listState = [];
  for (li of list.children) {
    listState.push({
      text: li.innerHTML,
      checked: li.classList.contains("checked"),
    });
  }

  localStorage.setItem(STATE_KEY, JSON.stringify(listState));
}

function initList() {
  // load state
  listState = loadState();
  // render List
  const ul = document.getElementById("List");

  for (item of listState) {
    let li = createItem(item.text, item.checked);
    list.appendChild(li);
  }
}

function createItem(text, checked) {
  let li = document.createElement("li");
  li.innerHTML = text;

  li.addEventListener("click", function () {
    this.classList.toggle("checked");
    let text = this.innerHTML;
    saveState(list);
  });
  if (checked) {
    li.classList.add("checked");
  }

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.innerHTML = "X";
  deleteButton.addEventListener("click", removeItem);

  li.appendChild(deleteButton);
  return li;
}

function addItem() {
  let text = document.getElementById("input").value;

  if (text === "") {
    alert("You must write something!");
    return;
  }
  let li = createItem(text, false);
  list.appendChild(li);
  saveState(list);
  document.getElementById("input").value = "";
}

function removeItem() {
  this.parentNode.remove(this);
  let text = this.innerHTML;
  saveState(list);
}
