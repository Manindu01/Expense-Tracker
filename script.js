document.addEventListener('DOMContentLoaded', () => {
    const balanceAmount = document.getElementById('balance-amount');
    const incomeAmount = document.getElementById('income-amount');
    const expenseAmount = document.getElementById('expense-amount');
    const transactionList = document.getElementById('transaction-list');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const addTransactionBtn = document.getElementById('add-transaction');
  
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
    // Update DOM
    const updateDOM = () => {
      transactionList.innerHTML = '';
      const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
      const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
  
      incomeAmount.textContent = income.toFixed(2);
      expenseAmount.textContent = Math.abs(expense).toFixed(2);
      balanceAmount.textContent = (income + expense).toFixed(2);
  
      transactions.forEach(({ id, description, amount }) => {
        const li = document.createElement('li');
        li.className = amount > 0 ? 'income' : 'expense';
        li.innerHTML = `
          ${description} <span>${amount > 0 ? '+' : '-'}$${Math.abs(amount).toFixed(2)}</span>
          <button class="delete-btn" data-id="${id}">X</button>
        `;
        transactionList.appendChild(li);
      });
  
      localStorage.setItem('transactions', JSON.stringify(transactions));
    };
  
    // Add transaction
    const addTransaction = () => {
      const description = descriptionInput.value.trim();
      const amount = parseFloat(amountInput.value.trim());
  
      if (description && !isNaN(amount)) {
        transactions.push({ id: Date.now(), description, amount });
        updateDOM();
        descriptionInput.value = '';
        amountInput.value = '';
      }
    };
  
    // Delete transaction
    transactionList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        transactions = transactions.filter(t => t.id !== id);
        updateDOM();
      }
    });
  
    addTransactionBtn.addEventListener('click', addTransaction);
    updateDOM();
  });
  