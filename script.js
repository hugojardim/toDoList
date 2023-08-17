const url = 'http://localhost:3000/todo';
const todoItems = {
    "todo": [],
    "doing": [],
    "done": []
};

async function getListItems(){
  // gets data from the Coingecko API
  let responseToDo = await fetch(url+'?status=to do');
  let dataListToDo = responseToDo.json();
  todoItems.todo = await dataListToDo;

  let responseDoing = await fetch(url+'?status=doing');
  let dataListDoing = responseDoing.json();
  todoItems.doing = await dataListDoing;

  let responseDone = await fetch(url+'?status=done');
  let dataListDone = responseDone.json();
  todoItems.done = await dataListDone;

  return await dataListToDo;
}

getListItems();

function createListItem(item) {
    let listItem = document.createElement("li");

    let div1 = document.createElement("div");
    let button = document.createElement("button");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    div1.classList.add("border-gradient");
    listItem.appendChild(div1);

    if (item.status !== "done") {
        button.classList.add("next");
        button.setAttribute("type", "button");
        button.innerHTML = "Next";
        listItem.appendChild(button);
    }

    div2.appendChild(h2);
    h2.classList.add("taskTitle");
    h2.innerHTML = item.title;
    listItem.appendChild(div2);

    div3.appendChild(p);
    p.classList.add("taskDescription");
    p.innerHTML = item.description;
    listItem.appendChild(div3);

    return listItem;
}

function populateList(section, listData) {
    let list = document.getElementById(`${section}List`);
    list.innerHTML = "";

    listData.forEach(function(item) {
        let listItem = createListItem(item);
        list.appendChild(listItem);
    });
}

function createListItems() {
    getListItems();
    populateList("todo", todoItems.todo);
    populateList("doing", todoItems.doing);
    populateList("done", todoItems.done);
}

document.addEventListener('DOMContentLoaded', function() {

    let modal = document.querySelector("dialog")

    document.getElementById("openModal").addEventListener("click", function() {
      modal.showModal();
    });

    document.getElementById("post").addEventListener("click", function(event) {
    // event.preventDefault();

    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "status": ["to do"]
        })
    })
    // .then(response => response.json())
    // .then(response => console.log(JSON.stringify(response)))
    // .catch(error => console.error('Error:', error));
    });
});