import { useState } from "react";
import Accounts from "./Accounts";

function App() {
  let [accounts, updateAccounts] = useState([
    {
      "name": "BECU Line of Credit",
      "balance Due": 2887.63,
      "minimum Payment Due": 25.00,
      "APR": 10.90
    },
    {
      "name": "BECU Credit Card",
      "balance Due": 17094.00,
      "minimum Payment Due": 366.00,
      "APR": 10.99
    },
    {
      "name": "Capital One",
      "balance Due": 2755.71,
      "minimum Payment Due": 60.00,
      "APR": 21.99
    },
  ]);
  return (
    <div>
      <Accounts accounts={accounts} updateAccounts={updateAccounts} />
    </div>
  );
}

export default App;
