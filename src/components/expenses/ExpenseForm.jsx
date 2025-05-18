import React from "react";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

function ExpenseForm({
  type = "Add",
  expenseFormData,
  setExpenseFormData,
  onClose,
  showExpenseForm,
  setShowExpenseForm,
  handleExpenseSubmit,
}) {
  console.log("expenseFormData", expenseFormData);
  const handleExpenseFormChange = (key, value) => {
    setExpenseFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleExpenseSubmit(expenseFormData);
  };

  return (
    <ReactModal
      isOpen={showExpenseForm}
      onRequestClose={onClose}
      onAfterClose={onClose}
      className="bg-white bg-opacity-80 backdrop-blur-md p-3 rounded-xl shadow-xl w-[500px] mx-auto outline-none"
      overlayClassName="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="flex flex-col justify-center items-start gap-5 w-120 h-60  rounded-xl p-8">
        <h2 className="text-xl font-bold mb-2 text-center">{type} Expense</h2>

        <form onSubmit={handleSubmit} className="flex flex-wrap justify-start items-center gap-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={expenseFormData?.title || ""}
            
            className="w-48 h-10 bg-white rounded-xl p-2 shadow"
            onChange={(e) => handleExpenseFormChange("title", e.target.value)}
          />

          <input
            type="number"
            name="price"
            placeholder="Amount"
            value={expenseFormData?.price || ""}
            className="w-48 h-10 bg-white rounded-xl p-2 shadow"
            onChange={(e) =>
              handleExpenseFormChange("price", parseFloat(e.target.value))
            }
          />

          <select
            value={expenseFormData.category}
            name="category"
            onChange={(e) =>
              handleExpenseFormChange("category", e.target.value)
            }
            className="w-48 h-10 bg-white rounded-xl p-2 shadow"
          >
            <option value="">Select Category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>

          <input
            type="date"
            name="date"
            value={expenseFormData?.date || ""}
            className="w-48 h-10 bg-white rounded-xl p-2 shadow"
            onChange={(e) => handleExpenseFormChange("date", e.target.value)}
          />

          
            <button
              type="submit"
              className="h-10 w-48 bg-orange-400 rounded-xl"
            >
              {type} Expense
            </button>
            <button
              onClick={() => setShowExpenseForm(false)}
              className="h-10 w-28 bg-gray-400 rounded-xl"
            >
              Cancel
            </button>
          
        </form>
      </div>
    </ReactModal>
  );
}

export default ExpenseForm;