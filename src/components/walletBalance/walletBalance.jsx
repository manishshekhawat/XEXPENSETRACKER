

export const WalletBalance=({balance,onAddWalletMoney})=>{


    return(
        <>
            <div className="w-90 h-60 bg-zinc-300 flex flex-col justify-center items-center gap-4 rounded-xl text-center">
                // In WalletBalance.js
<h1 className="text-2xl font-bold" data-testid="wallet-balance">
  Wallet Balance: <span className="text-green-500">₹{parseFloat(balance).toFixed(0) || 0}</span>
</h1>

                <button type="button" className="bg-green-700 h-10 w-35 hover:bg-green-400 hover:cursor-pointer text-white p-2 rounded-xl" onClick={onAddWalletMoney}>+ Add Income</button>
            </div>
        </>
    )
}