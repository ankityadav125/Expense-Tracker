document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const renderExpenses = () => {
    expenseList.innerHTML = "";
    expenses.forEach((expense, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${expense.name}</span>
                <span>Rs ${expense.amount}</span>
                <button onclick="editExpense(${i})">Edit</button>
                <button onclick="deleteExpense(${i})">Delete</button>
            `;
      expenseList.appendChild(li);
    });
  };

  renderExpenses();

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);

    if (name && !isNaN(amount)) {
      const expense = {
        name: name,
        amount: amount,
      };

      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();

      document.getElementById("expense-name").value = "";
      document.getElementById("expense-amount").value = "";
    } else {
      alert("Please enter valid expense name and amount.");
    }
  });

  window.editExpense = function (index) {
    const editedName = prompt("Enter new name:");
    const editedAmount = parseFloat(prompt("Enter new amount:"));

    if (editedName && !isNaN(editedAmount)) {
      expenses[index].name = editedName;
      expenses[index].amount = editedAmount;
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    } else {
      alert("Please enter valid expense name and amount.");
    }
  };

  window.deleteExpense = function (index) {
    if (confirm("Are you sure you want to delete this expense?")) {
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    }
  };
});
