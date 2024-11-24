document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };
  /// hiển thị lên UI
  addItemToUI(item);
  // hiển thị item trên localStorage
  addItemToLocalStorage(item);
});

const addItemToUI = (item) => {
  const { id, name } = item;
  let newCard = document.createElement("div");
  newCard.className =
    "card d-flex flex-row justify-content-between align-items-center p-2 mb-3";
  newCard.innerHTML = `   <span>${name}</span>
                            <button class="btn btn-danger btn-remove btn-sm" data-id="${id}">Remove</button>
    `;

  document.querySelector(".list").appendChild(newCard);
};
// lấy danh sách trên localStorage về
const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

const addItemToLocalStorage = (item) => {
  let list = getList();
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
};

// hiển thị (render) lên UI
const init = () => {
  let list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
};
init();

// hàm xóa phần tử
document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    let idRemove = event.target.dataset.id;
    let nameRemove = event.target.previousElementSibling.innerHTML;
    let isConfirmed = confirm(`Bạn có muốn xóa item ${nameRemove} này không ?`);
    if (isConfirmed) {
      event.target.parentElement.remove(); // xóa item trên UI
      removeItemToLocalStorage(idRemove); // xóa item trên localStorage
    }
  }
});

const removeItemToLocalStorage = (idRemove) => {
  let list = getList();
  list = list.filter((item) => item.id !== idRemove);
  localStorage.setItem("list", JSON.stringify(list));
};

// hàm xóa all
document.querySelector("#remove-all").addEventListener("click", (event) => {
  let isConfirmed = confirm(`Bạn có muốn xóa hết phần tử này không? `);
  if (isConfirmed) {
    document.querySelector(".list").innerHTML = ""; // xóa trên UI
    localStorage.removeItem("list");
  }
});

// hàm lọc phần từ cần tìm
document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value;
  let list = getList();
  list = list.filter((item) => item.name.includes(inputValue));
  document.querySelector(".list").innerHTML = "";
  list.forEach((item) => addItemToUI(item));
});
