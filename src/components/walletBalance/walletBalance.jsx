import React from "react";

function WalletBalance({ balance, onAddExpense }) {
  return (
    <div className="flex-1 bg-zinc-300 h-[200px] p-5 rounded-lg flex flex-col justify-center items-center gap-5 min-w-[250px]">
      <p className="text-2xl font-bold">
        Wallet Balance:{" "}
        <span className=" text-green-700">
          {" "}
          ₹ {balance|| 0}
        </span>
      </p>
      <button
        type="button"
        className="bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white p-2 rounded"
        onClick={onAddExpense}
      >
        + Add Income
      </button>
    </div>
  );
}

export default WalletBalance;