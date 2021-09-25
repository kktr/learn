const incrementBtn = document.getElementById("increase-btn");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const countEl = document.getElementById("count-el");
const previousEl = document.getElementById("previous-el")
let count = 0;
let saves = ""

incrementBtn.addEventListener("click", function() {
  count += 1;
  countEl.textContent = count;
})

saveBtn.addEventListener("click", function() {
  countEl.textContent = 0;
  previousEl.textContent += ` ${count} -`;
})

deleteBtn.addEventListener("click", function() {
  count = 0
  countEl.textContent = count;
})

deleteBtn.addEventListener("dblclick", function() {
  previousEl.textContent = "Previous entries:"
})

// edit after coure for training
// time needed: 50min
