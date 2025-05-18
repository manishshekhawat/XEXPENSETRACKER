import { useEffect, useState } from "react";

export const ExpenseCard = ({ expenses, onAddExpense }) => {

    const [totalExpenses,setTotalExpenses]=useState(0);

  const findTotalExpenses=(expenses)=>{
    console.log("expenses", expenses);
    if(expenses && expenses.length>0){
        return expenses.reduce((total,expense)=>total+parseFloat(expense.price),0);
    }
    else{
        return 0.0;
    }
  }
  
  useEffect(()=>{
    let exp=findTotalExpenses(expenses);
    console.log("Exp", exp);
    setTotalExpenses(exp);
  },[expenses]);

  return (
    <>
      <div className="w-90 h-60 bg-zinc-300 flex flex-col justify-center items-center gap-4 rounded-xl text-center">
        <h1 className="text-2xl font-bold">
          Expenses: <span className="text-red-500">₹{parseFloat(totalExpenses).toFixed(2) || 0.0}</span>
        </h1>
        <button
          type="button"
          className="bg-red-700 h-10 w-35 hover:bg-red-400 hover:cursor-pointer text-white p-2 rounded-xl"
          onClick={() => onAddExpense("Add", {})}
        >
          + Add Expense
        </button>
      </div>
    </>
  );
};
