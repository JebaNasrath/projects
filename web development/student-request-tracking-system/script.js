const form = document.getElementById("requestForm");
const studentNameInput = document.getElementById("studentName");
const issueInput = document.getElementById("issue");
const statusSelect = document.getElementById("status");
const message = document.getElementById("message");

const requestList = document.getElementById("requestList");
const emptyState = document.getElementById("emptyState");

let requests = [];

function renderRequests() {
  requestList.innerHTML = "";

  if (requests.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  requests.forEach((req, index) => {
    const li = document.createElement("li");
    li.className = "request-card";

    const title = document.createElement("div");
    title.innerHTML = `<strong>${req.studentName}</strong> — ${req.issue}`;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.innerText = `Status: ${req.status}`;

    // (Optional) simple visual distinction based on status
    if (req.status === "Open") badge.style.borderColor = "#ff9800";
    if (req.status === "In Progress") badge.style.borderColor = "#2196f3";
    if (req.status === "Closed") badge.style.borderColor = "#4caf50";

    const actions = document.createElement("div");

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.innerText = "Next Status";
    nextBtn.style.padding = "6px 10px";
    nextBtn.style.fontSize = "12px";

    nextBtn.addEventListener("click", () => {
      // Open -> In Progress -> Closed
      if (requests[index].status === "Open") requests[index].status = "In Progress";
      else if (requests[index].status === "In Progress") requests[index].status = "Closed";
      else requests[index].status = "Closed";

      renderRequests();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "Delete";
    deleteBtn.style.padding = "6px 10px";
    deleteBtn.style.fontSize = "12px";
    deleteBtn.style.marginLeft = "8px";
    deleteBtn.style.background = "#dc3545";

    deleteBtn.addEventListener("click", () => {
      requests.splice(index, 1);
      renderRequests();
    });

    actions.appendChild(nextBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(badge);
    li.appendChild(actions);

    requestList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const studentName = studentNameInput.value.trim();
  const issue = issueInput.value.trim();
  const status = statusSelect.value;

  if (!studentName || !issue || !status) {
    message.style.color = "red";
    message.innerText = "Please fill all fields before submitting.";
    return;
  }

  requests.push({ studentName, issue, status });

  message.style.color = "green";
  message.innerText = "Request added successfully!";

  form.reset();
  renderRequests();
});

renderRequests();
