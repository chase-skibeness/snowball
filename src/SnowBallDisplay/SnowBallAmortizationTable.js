import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import Account from "../Account";

export default function SnowBallAmortizationTable({
  accounts,
  bonusPayment,
  startPayment,
}) {
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    setTotalDebt(
      accounts.reduce(
        (balanceSum, account) => (balanceSum += account["balance Due"]),
        0
      )
    );

    return (
      <SnowBallAmortizationTable
        accounts={accounts}
        bonusPayment={bonusPayment}
        startPayment={startPayment}
      />
    );
  }, [accounts, bonusPayment, startPayment]);

  function calculateMonthInterest(principal, rate) {
    return principal + principal * rate;
  }

  function buildAmoritizationTableRow(accountsArray, monthsElapsed) {
    if (accountsArray.every((account) => account["balance Due"] <= 0)) {
      return null;
    }

    let smallestAccountBalance = accountsArray
      .filter((account) => account["balance Due"] > 0)
      .sort((firstBalance, secondBalance) =>
        firstBalance["balance Due"] <= secondBalance["balance Due"] ? -1 : 1
      )[0];
    let paidOffAccountBonus = accountsArray
      .filter((account) => account["balance Due"] <= 0)
      .reduce((bonus, account) => (bonus += account["minimum Payment Due"]), 0);

    let newAccountsArray = accountsArray.map((account) => {
      const newBalanceDue = calculateMonthInterest(
        account["balance Due"],
        account.APR / 100 / 12
      );
      const payment = account["minimum Payment Due"];
      const paymentWithBonus =
        payment +
        (bonusPayment ? bonusPayment : 0) +
        (paidOffAccountBonus ? paidOffAccountBonus : 0);

      if (account === smallestAccountBalance) {
        return new Account(
          account.name,
          newBalanceDue - paymentWithBonus > 0
            ? newBalanceDue - paymentWithBonus
            : 0,
          account["minimum Payment Due"],
          account.APR
        );
      } else {
        return new Account(
          account.name,
          newBalanceDue - payment > 0 ? newBalanceDue - payment : 0,
          account["minimum Payment Due"],
          account.APR
        );
      }
    });

    let total = newAccountsArray.reduce(
      (totalDebt, account) => (totalDebt += account["balance Due"]),
      0
    );

    return (
      <>
        <TableRow>
          <TableCell>Month {monthsElapsed}</TableCell>
          {newAccountsArray.map((account) => {
            return <TableCell>{account["balance Due"].toFixed(2)}</TableCell>;
          })}
          <TableCell>{total.toFixed(2)}</TableCell>
          <TableCell>
            {paidOffAccountBonus + bonusPayment > 0 ? paidOffAccountBonus + bonusPayment : "" }
          </TableCell>
          <TableCell>
            {paidOffAccountBonus > 0 ? paidOffAccountBonus : "" }
          </TableCell>
        </TableRow>
        {buildAmoritizationTableRow(newAccountsArray, monthsElapsed + 1)}
      </>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={accounts.length + 4} />
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={accounts.length + 3}>
              Snowball Sorted Balances
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Time</TableCell>
            {accounts.map((account) => {
              return <TableCell key={Math.random()}>{account.name}</TableCell>;
            })}
            <TableCell>Total Debt</TableCell>
            <TableCell>Extra $ Monthly</TableCell>
            <TableCell>Snowball Bonus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Start</TableCell>
            {accounts.map((account) => {
              return (
                <TableCell key={Math.random()}>
                  {account["balance Due"]}
                </TableCell>
              );
            })}
            <TableCell>{totalDebt}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          {buildAmoritizationTableRow(accounts, 1)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
