import { useEffect, useState } from "react";
import { WalletBalance } from "./components/walletBalance/walletBalance";
import { ExpenseCard } from "./components/expenses/ExpenseCard";
import { ExpensePieChart } from "./components/expenses/ExpensePieChart";
import { IncomeForm } from "./components/IncomeForm";
import { ExpenseForm } from "./components/expenses/ExpenseForm";
import {ExpenseList} from "./components/expenses/ExpenseList";
import {TopExpensesBarChart} from "./components/expenses/TopExpensesBarChart";

function App() {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const [expenseFormType, setExpenseFormType] = useState("Add");

  const handleExpenseForm = (action = "add", expense = null) => {
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
    const updatedBalance = parseFloat(balance) + parseFloat(income);
    setBalance(updatedBalance);
    localStorage.setItem("balance", updatedBalance);
    setShowIncomeForm(false);
  };

  const handleExpenseSubmit = (expense) => {
    const parsedPrice = parseFloat(expense.price);

    if (expenseFormType === "Edit") {
      const indexToEdit = expenses.findIndex(
        (e) => e.key === expenseFormData.key
      );
      if (indexToEdit === -1) return;

      const oldExpense = expenses[indexToEdit];
      const priceDifference = parsedPrice - parseFloat(oldExpense.price);
      const updatedBalance = parseFloat(balance) - parseFloat(priceDifference);
      const updatedExpenses = expenses.map((e, index) =>
        index === indexToEdit ? { ...expense, key: oldExpense.key } : e
      );

      if (updatedBalance < 0) {
        alert("Insufficient balance");
        return;
      }

      setBalance(updatedBalance);
      setExpenses(updatedExpenses);
      localStorage.setItem("balance", updatedBalance);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setShowExpenseForm(false);
      return;
    }

    const remainingBalance = parseFloat(balance) - parseFloat(parsedPrice);

    if (remainingBalance < 0) {
      alert("Insufficient balance");
      return;
    }

    const newExpense = { ...expense, key: expenses.length + 1 };
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
    const balanceFromStorage = localStorage.getItem("balance");
    const expensesFromStorage = localStorage.getItem("expenses");

    if (balanceFromStorage && !isNaN(parseFloat(balanceFromStorage))) {
      setBalance(parseFloat(balanceFromStorage));
    } else {
      localStorage.setItem("balance", 5000);
      setBalance(5000);
    }

    try {
      const parsedExpenses = JSON.parse(expensesFromStorage);
      if (Array.isArray(parsedExpenses)) {
        setExpenses(parsedExpenses);
      } else {
        throw new Error("Expenses is not an array");
      }
    } catch (error) {
      console.error("Invalid expenses data:", error);
      localStorage.setItem("expenses", JSON.stringify([]));
      setExpenses([]);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold ml-9 mt-5 text-white" data-testid="main-header">
        Expense Tracker
      </h1>
      <div className=" flex flex-wrap justify-center items-center gap-5 m-9 bg-zinc-500 w-300 h-80 text-white rounded-xl">
        <WalletBalance balance={balance} onAddWalletMoney={handleIncomeForm} />
        <ExpenseCard expenses={expenses} onAddExpense={handleExpenseForm} />

        <ExpensePieChart expenseList={expenses} />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 ml-9">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-white">Recent Transactions</h2>
          <ExpenseList
            expenseList={expenses}
            handleExpenseForm={handleExpenseForm}
            handleDeleteExpense={handleDeleteExpense}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-white">Top Expenses</h2>
          <div className="bg-white rounded-xl p-6">
            <TopExpensesBarChart expenseList={expenses} />
          </div>
        </div>
      </div>

      {showIncomeForm && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <IncomeForm
            setShowIncomeForm={setShowIncomeForm}
            showIncomeForm={showIncomeForm}
            handleIncomeFormSubmit={handleIncomeFormSubmit}
          />
        </div>
      )}

      {showExpenseForm && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
      )}
    </div>
  );
}

export default App;
