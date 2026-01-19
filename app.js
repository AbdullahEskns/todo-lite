const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const list = document.getElementById("list");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clear");

let tasks = [];

function render() {
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "item" + (t.done ? " done" : "");
    li.innerHTML = `
      <span>${escapeHtml(t.text)}</span>
      <small>#${i + 1}</small>
    `;
    li.addEventListener("click", () => {
      tasks[i].done = !tasks[i].done;
      save();
      render();
    });
    list.appendChild(li);
  });
  count.textContent = `${tasks.length} مهام`;
}

function save() {
  localStorage.setItem("todo-lite", JSON.stringify(tasks));
}

function load() {
  const raw = localStorage.getItem("todo-lite");
  tasks = raw ? JSON.parse(raw) : [];
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
  }[c]));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.unshift({ text, done: false });
  taskInput.value = "";
  save();
  render();
});

clearBtn.addEventListener("click", () => {
  tasks = [];
  save();
  render();
});

load();
render();

