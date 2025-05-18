import React, { useState } from "react";

export const IncomeForm = ({
  showIncomeForm,
  setShowIncomeForm,
  handleIncomeFormSubmit,
}) => {
  
    const [income, setIncome] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleIncomeFormSubmit(income);
  };
  

  return (
    <>
      <div className="flex flex-col justify-center items-start gap-5 w-120 h-40 bg-gray-200 rounded-xl p-8">
        <h1 className="text-xl font-semibold">Add Balance</h1>
        <form onSubmit={handleSubmit}  className="flex justify-start items-center gap-3">
          <input
            type="number"
            placeholder="Income Amount"
            className="w-40 h-10 bg-white rounded-xl p-2"
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setIncome(val);
            }}
          />
          <button
            type="submit"
            className="h-10 w-30 bg-orange-400 rounded-xl"
            
          >
            Add Balance
          </button>
          <button
            type="button"
            className="h-10 w-30 bg-gray-400 rounded-xl"
            onClick={() => setShowIncomeForm(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};
