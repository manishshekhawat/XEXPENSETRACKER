import React, { useState } from "react";
import ReactModal from "react-modal";

function IncomeForm({ showIncomeForm, setShowIncomeForm, handleIncomeFormSubmit }) {
  const [income, setIncome] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericIncome = Number(income);
    if (!isNaN(numericIncome) && numericIncome > 0) {
      handleIncomeFormSubmit(numericIncome);
      setIncome(0); // Reset form
      setShowIncomeForm(false);
    } else {
      alert("Please enter a valid income amount");
    }
  };

  return (
    <ReactModal
      isOpen={showIncomeForm}
      onRequestClose={() => setShowIncomeForm(false)}
      className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-xl w-[500px] mx-auto outline-none"
      overlayClassName="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="flex flex-col justify-center items-start gap-5 w-120 h-40  rounded-xl p-8">
        <h2 className="text-xl font-bold mb-2 text-center">Add Balance</h2>
        <form onSubmit={handleSubmit} className="flex justify-start items-center gap-3">
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Income Amount"
            className="w-40 h-10 bg-white rounded-xl p-2 shadow"
          />
          
            <button type="submit" className="h-10 w-30 bg-orange-400 rounded-xl">
              Add Balance
            </button>
            <button type="button" onClick={() => setShowIncomeForm(false)} className="h-10 w-30 bg-gray-400 rounded-xl">
              Cancel
            </button>
          
        </form>
      </div>
    </ReactModal>
  );
}

export default IncomeForm;
