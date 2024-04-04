document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector("input");
  const workList = document.querySelector(".work-list");
  const successList = document.querySelector(".success-list");

  function moveItemToSuccessList(event) {
    const listItem = event.target.parentNode;
    successList.appendChild(listItem);
    listItem
      .querySelector("button")
      .removeEventListener("click", moveItemToSuccessList);
    listItem.querySelector("button").innerText = "삭제";
    listItem.querySelector("button").addEventListener("click", deleteItem);
  }

  function deleteItem(event) {
    const listItem = event.target.parentNode;
    listItem.remove();
  }

  function handleInputEnter(event) {
    if (event.key === "Enter") {
      const value = inputField.value;
      if (value.trim() !== "") {
        const newItem = document.createElement("div");
        newItem.textContent = value;
        newItem.classList.add("item");
        const button = document.createElement("button");
        button.innerText = "완료";
        button.addEventListener("click", moveItemToSuccessList);
        newItem.appendChild(button);
        workList.appendChild(newItem);
        inputField.value = "";
      }
    }
  }

  inputField.addEventListener("keypress", handleInputEnter);
});
