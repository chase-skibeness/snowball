import { useState, useEffect } from "react";
import AccountsDisplay from "./AccountsDisplay/AccountsDisplay";
import SnowBallDisplay from "./SnowBallDisplay/SnowBallDisplay";

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

  useEffect(() => {
    let sortedAccounts = accounts.sort((firstBalance, secondBalance) =>
      firstBalance["balance Due"] <= secondBalance["balance Due"] ? -1 : 1
    );
    updateAccounts(sortedAccounts);
  }, [accounts]);

  return (
    <div>
      <AccountsDisplay accounts={accounts} updateAccounts={updateAccounts} />
      <SnowBallDisplay accounts={accounts} />
    </div>
  );
}

export default App;
