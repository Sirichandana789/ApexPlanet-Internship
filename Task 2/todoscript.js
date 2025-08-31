// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("⚠ Please fill all fields.");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("⚠ Invalid email format.");
    return;
  }
  alert("✅ Message sent successfully!");
  this.reset();
});

// Todo List
document.getElementById("addTodoBtn").addEventListener("click", function() {
  let input = document.getElementById("todoInput");
  let task = input.value.trim();
  if (task === "") return;

  let li = document.createElement("li");

  let taskText = document.createElement("span");
  taskText.textContent = task;
  li.appendChild(taskText);

  // Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = function() {
    let newTask = prompt("Edit task:", taskText.textContent);
    if (newTask) taskText.textContent = newTask;
  };

  // Delete button
  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = function() {
    li.remove();
  };

  li.appendChild(editBtn);
  li.appendChild(delBtn);

  document.getElementById("todoList").appendChild(li);
  input.value = "";
});
