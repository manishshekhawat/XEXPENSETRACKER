import React, { useEffect, useState } from "react";

function ExpenseCard({ expenses, onAddExpense }) {
  const [totalExpenses, setTotalExpenses] = useState();

  const calculateTotalExpenses = () => {
    console.log("expenses", expenses);
    if (expenses && expenses.length > 0) {
      return expenses.reduce(
        (total, expense) => total + parseFloat(expense.price),
        0
      );
    } else {
      return 0.0;
    }
  };
  useEffect(() => {
    let exp = calculateTotalExpenses();
    console.log("Exp", exp);
    setTotalExpenses(exp);
  }, [expenses]);
  return (
    <div className="flex-1 bg-zinc-300 h-[200px] p-5 rounded-lg flex flex-col justify-center items-center gap-5 min-w-[250px]">
      <p className="text-2xl font-bold">
        Expenses :{" "}
        <span className=" text-red-700">
          {" "}
          ₹ {totalExpenses|| 0}
        </span>
      </p>
      <button
        type="button"
        className="bg-red-700 text-white p-2 rounded"
        onClick={() => onAddExpense("Add", {})}
      >
        + Add Expense
      </button>
    </div>
  );
}

export default ExpenseCard;