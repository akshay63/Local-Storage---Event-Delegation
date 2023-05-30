/*
 **--------- Project15: Local Storage ---------**
 */

"use strict";

const form = document.querySelector(".add-items");
const lists = document.querySelector(".plates");
const list = JSON.parse(localStorage.getItem("items")) || [];
const checkBtn = document.getElementById("check");
const deleteBtn = document.getElementById("delete");

function addItem(e) {
  e.preventDefault();
  // const textInput = e.target.querySelector("input:first-child");
  const text = this.querySelector("[name=item]").value;

  const item = {
    text,
    done: false,
  };

  list.push(item);
  populateList(list, lists);
  localStorage.setItem("items", JSON.stringify(list));
  this.reset(); //LEARNING: This reset() is available to every form element which resets the form

  // lists.insertAdjacentHTML("beforeend", `<li>${text}</li>`);
}

function populateList(lists = [], platesList) {
  platesList.innerHTML = lists
    .map((listItem, i) => {
      return `
      <li>
      <input type="checkbox" data-index="${i}" id="item${i}" ${
        listItem.done ? "checked" : ""
      }></input>
      <label for="item${i}">${listItem.text}</label></li>
      `;
    })
    .join("");
}

function toggleDone(e) {
  const el = e.target;
  if (!el.matches("input")) return; //LEARNING: matches() === is() of jquery
  const index = el.dataset.index;

  list[index].done = !list[index].done;
  localStorage.setItem("items", JSON.stringify(list));
  populateList(list, lists);
}
console.log(list);

function deleteItem(e) {
  // list.forEach((item, i) => {
  //   if (item.done === true) {
  //     console.log(item);
  //     // list.pop(item);❌🔥
  //     // filter
  //   }
  // });

  const newList = list.filter((item, itemtoremove) => {
    console.log(item);
    return item.done !== true;
  });
  console.log(list, newList);
  localStorage.setItem("items", JSON.stringify(newList));
  populateList(newList, lists);
}

function checkAllItems() {
  list.forEach((item, i) => {
    item.done = true;
  });
  console.log(list);
  localStorage.setItem("items", JSON.stringify(list));
  populateList(list, lists);
}

form.addEventListener("submit", addItem);
lists.addEventListener("click", toggleDone);
checkBtn.addEventListener("click", checkAllItems);
deleteBtn.addEventListener("click", deleteItem);

populateList(list, lists);
