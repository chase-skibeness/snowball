import { useState } from "react";
import AccountsDisplay from "./AccountsDisplay/AccountsDisplay";
import SnowBallAmortizationTable from "./SnowBallAmortizationTable";

function App() {
  let [accounts, updateAccounts] = useState([
    {
      name: "BECU Line of Credit",
      "balance Due": 2887.63,
      "minimum Payment Due": 25.0,
      APR: 10.9,
    },
    {
      name: "BECU Credit Card",
      "balance Due": 17094.0,
      "minimum Payment Due": 366.0,
      APR: 10.99,
    },
    {
      name: "Capital One",
      "balance Due": 2755.71,
      "minimum Payment Due": 60.0,
      APR: 21.99,
    },
  ]);
  return (
    <div>
      <AccountsDisplay accounts={accounts} updateAccounts={updateAccounts} />
      <SnowBallAmortizationTable accounts={accounts} />
    </div>
  );
}

export default App;
