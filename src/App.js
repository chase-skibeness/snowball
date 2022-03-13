import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import AccountsDisplay from "./AccountsDisplay/AccountsDisplay";
import SnowBallDisplay from "./SnowBallDisplay/SnowBallDisplay";

function App() {
  let [accounts, updateAccounts] = useState([]);

  useEffect(() => {
    let sortedAccounts = accounts.sort((firstBalance, secondBalance) =>
      firstBalance["balance Due"] <= secondBalance["balance Due"] ? -1 : 1
    );
    updateAccounts(sortedAccounts);
  }, [accounts]);

  return (
    <Container maxWidth="sm">
      <AccountsDisplay accounts={accounts} updateAccounts={updateAccounts} />
      <SnowBallDisplay accounts={accounts} />
    </Container>
  );
}

export default App;
