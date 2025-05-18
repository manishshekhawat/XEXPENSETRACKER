import { useEffect, useState } from "react";

import ExpenseCard from "./components/expenses/ExpenseCard";
import ExpenseForm from "./components/expenses/ExpenseForm";
import ExpenseList from "./components/expenses/ExpenseList";
import ExpensePieChart from "./components/expenses/ExpensePieChart";
import TopExpensesBarChart from "./components/expenses/TopExpensesBarChart";
import IncomeForm from "./components/IncomeForm";
import WalletBalance from "./components/walletBalance/WalletBalance";

function App() {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [expenseFormType, setExpenseFormType] = useState("Add");
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleExpenseForm = (action = "Add", expense) => {
    setShowExpenseForm(true);
    setExpenseFormType(action);
    if (expense) {
      setExpenseFormData(expense);
    }
  };

  const closeExpenseForm = () => {
    setExpenseFormType("Add");
    setExpenseFormData({ title: "", price: "", category: "", date: "" });
    setShowExpenseForm(false);
  };

  const handleIncomeForm = () => {
    setShowIncomeForm(true);
  };

  const handleIncomeFormSubmit = (income) => {
    const parsedIncome = parseFloat(income);
    if (isNaN(parsedIncome)) {
      alert("Invalid income amount.");
      return;
    }
    const updatedBalance = balance + parsedIncome;
    setBalance(updatedBalance);
    localStorage.setItem("balance", updatedBalance.toString());
    setShowIncomeForm(false);
  };

  const handleExpenseSubmit = (expense) => {
    const parsedPrice = parseFloat(expense.price);
    if (isNaN(parsedPrice)) {
      alert("Please enter a valid number for price.");
      return;
    }

    if (expenseFormType === "Edit") {
      const indexToEdit = expenses.findIndex(
        (e) => e.key === expenseFormData.key
      );
      if (indexToEdit === -1) return;

      const oldExpense = expenses[indexToEdit];
      const priceDifference = parsedPrice - parseFloat(oldExpense.price);
      const updatedBalance = balance - priceDifference;

      if (updatedBalance < 0) {
        alert("Insufficient balance");
        return;
      }

      const updatedExpenses = expenses.map((e, index) =>
        index === indexToEdit
          ? { ...expense, price: parsedPrice, key: oldExpense.key }
          : e
      );

      setBalance(updatedBalance);
      setExpenses(updatedExpenses);
      localStorage.setItem("balance", updatedBalance);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setShowExpenseForm(false);
      return;
    }

    const remainingBalance = balance - parsedPrice;
    if (remainingBalance < 0) {
      alert("Insufficient balance");
      return;
    }

    const newExpense = {
      ...expense,
      price: parsedPrice,
      key: expenses.length + 1,
    };
    const updatedExpenses = [...expenses, newExpense];

    setBalance(remainingBalance);
    setExpenses(updatedExpenses);
    localStorage.setItem("balance", remainingBalance);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setShowExpenseForm(false);
  };

  const handleDeleteExpense = (expenseKey) => {
    const expenseToDelete = expenses.find(
      (expense) => expense.key === expenseKey
    );
    const updatedExpenses = expenses.filter(
      (expense) => expense.key !== expenseKey
    );

    const updatedBalance = balance + parseFloat(expenseToDelete.price);
    setBalance(updatedBalance);
    setExpenses(updatedExpenses);
    localStorage.setItem("balance", updatedBalance);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  useEffect(() => {
    
    const storedBalance = localStorage.getItem("balance");
    const storedExpenses = localStorage.getItem("expenses");

    setBalance(
      isNaN(parseFloat(storedBalance)) ? 5000 : parseFloat(storedBalance)
    );

    try {
      const parsedExpenses = JSON.parse(storedExpenses);
      if (Array.isArray(parsedExpenses)) {
        setExpenses(parsedExpenses);
      } else {
        setExpenses([]);
      }
    } catch {
      setExpenses([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white px-10 py-6">
      <header className="mb-6">
        <h1 className="text-5xl font-bold">Expense Tracker</h1>
      </header>

      <section className="bg-zinc-500 p-6 rounded-xl mb-8">
        <div className="flex-wrap gap-6 w-full flex md:flex-row flex-col justify-around items-center">
          <WalletBalance balance={balance} onAddExpense={handleIncomeForm} />
          <ExpenseCard expenses={expenses} onAddExpense={handleExpenseForm} />
          <ExpensePieChart expenseList={expenses} />
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <ExpenseList
            expenseList={expenses}
            handleExpenseForm={handleExpenseForm}
            handleDeleteExpense={handleDeleteExpense}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Top Expenses</h2>
          <TopExpensesBarChart expenseList={expenses} />
        </div>
      </div>

      <IncomeForm
        showIncomeForm={showIncomeForm}
        setShowIncomeForm={setShowIncomeForm}
        handleIncomeFormSubmit={handleIncomeFormSubmit}
      />
      <ExpenseForm
        type={expenseFormType}
        showExpenseForm={showExpenseForm}
        setShowExpenseForm={setShowExpenseForm}
        onClose={closeExpenseForm}
        expenseFormData={expenseFormData}
        setExpenseFormData={setExpenseFormData}
        handleExpenseSubmit={handleExpenseSubmit}
      />
    </div>
  );
}

export default App;
