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
  let today = new Date();

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

    const appliedInterestAccountArray = accountsArray.map((account) => {
      const newBalanceWithInterest = calculateMonthInterest(
        account["balance Due"],
        account.APR / 100 / 12
      );

      return new Account(
        account.name,
        newBalanceWithInterest,
        account["minimum Payment Due"],
        account.APR
      );
    });

    let smallestAccount = appliedInterestAccountArray
      .filter((account) => account["balance Due"] > 0)
      .sort((firstBalance, secondBalance) =>
        firstBalance["balance Due"] <= secondBalance["balance Due"] ? -1 : 1
      )[0];

    let paidOffAccountBonus = appliedInterestAccountArray
      .filter((account) => account["balance Due"] <= 0)
      .reduce((bonus, account) => (bonus += account["minimum Payment Due"]), 0);

    const appliedPaymentsAccountArray = appliedInterestAccountArray.map(
      (account, index) => {
        const payment = account["minimum Payment Due"];

        const paymentWithBonus =
          payment +
          (bonusPayment ? bonusPayment : 0) +
          (paidOffAccountBonus ? paidOffAccountBonus : 0);

        let appliedPaymentBalance = 0;

        if (
          account["name"] === smallestAccount["name"] &&
          account["balance Due"] === smallestAccount["balance Due"]
        ) {
          appliedPaymentBalance = account["balance Due"] - paymentWithBonus;
        } else {
          appliedPaymentBalance = account["balance Due"] - payment;
        }

        if (
          appliedPaymentBalance < 0 &&
          appliedInterestAccountArray[index + 1]
        ) {
          appliedInterestAccountArray[index + 1]["balance Due"] =
            appliedInterestAccountArray[index + 1]["balance Due"] +
            appliedPaymentBalance;

          appliedPaymentBalance = 0;
        }

        return new Account(
          account.name,
          appliedPaymentBalance,
          account["minimum Payment Due"],
          account.APR
        );
      }
    );

    let total = appliedPaymentsAccountArray.reduce(
      (totalDebt, account) => (totalDebt += account["balance Due"]),
      0
    );

    let thisMonth = new Date(today);
    thisMonth.setMonth(thisMonth.getMonth() + monthsElapsed);

    return (
      <>
        <TableRow>
          <TableCell>
            {thisMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </TableCell>
          {appliedPaymentsAccountArray.map((account) => {
            return account["balance Due"] <= 0 ? (
              <TableCell sx={{ backgroundColor: "#9effae" }}>
                {account["balance Due"].toFixed(2)}
              </TableCell>
            ) : (
              <TableCell>{account["balance Due"].toFixed(2)}</TableCell>
            );
          })}
          <TableCell>{total.toFixed(2)}</TableCell>
          <TableCell>
            {paidOffAccountBonus + bonusPayment > 0
              ? paidOffAccountBonus + bonusPayment
              : ""}
          </TableCell>
          <TableCell>
            {paidOffAccountBonus > 0 ? paidOffAccountBonus : ""}
          </TableCell>
        </TableRow>
        {buildAmoritizationTableRow(
          appliedPaymentsAccountArray,
          monthsElapsed + 1
        )}
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
            <TableCell>
              {today.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </TableCell>
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
