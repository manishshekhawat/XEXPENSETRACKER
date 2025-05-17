import ReactModal from "react-modal";

export const ExpenseForm = ({
  type = "Add",
  expenseFormData,
  setExpenseFormData,
  onClose,
  showExpenseForm,
  setShowExpenseForm,
  handleExpenseSubmit,
}) => {
  const handleSubmitButton = (e) => {
    e.preventDefault();
    handleExpenseSubmit(expenseFormData);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setExpenseFormData((previous) => {
      return { ...previous, [name]: value };
    });
  };

  return (
    <>
      
        <div className="flex flex-col justify-center items-start gap-5 w-120 h-60 bg-gray-200 rounded-xl p-8">
          <h1 className="text-xl font-semibold">{type} Expenses</h1>
          <form
            onSubmit={(e) => {
              handleSubmitButton(e);
            }}
            className="flex flex-wrap justify-start items-center gap-3"
          >
            <input
              type="text"
              name="title"
              value={expenseFormData.title}
              placeholder="Title"
              className="w-50 h-10 bg-white rounded-xl p-2"
              onChange={(e) => {
                handleInput(e);
              }}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={expenseFormData.price}
              className="w-50 h-10 bg-white rounded-xl p-2"
              onChange={(e) => {
                handleInput(e);
              }}
            />
            <select
              name="category"
              defaultValue=""
              value={expenseFormData.category}
              className="w-50 h-10 bg-white rounded-xl p-2"
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <option disabled value="">
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <input
              type="Date"
              name="date"
              placeholder="Date"
              value={expenseFormData.date}
              className="w-50 h-10 bg-white rounded-xl p-2"
              onChange={(e) => {
                handleInput(e);
              }}
            />
            <button
              type="submit"
              className="h-10 w-50 bg-orange-400 rounded-xl"
            >
              {type} Expense
            </button>
            <button
              type="button"
              className="h-10 w-30 bg-gray-400 rounded-xl"
              onClick={() => setShowExpenseForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      
    </>
  );
};
