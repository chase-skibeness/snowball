import { useEffect, useState } from "react";
import Account from "../Account";

export default function SnowBallAmortizationTable({ accounts, bonusPayment }) {
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    setTotalDebt(
      accounts.reduce(
        (balanceSum, account) => (balanceSum += account["balance Due"]),
        0
      )
    );
    
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Snowball Sorted Balances</th>
          </tr>
          <tr>
            <th>Time</th>
            {accounts.map((account) => {
              return <th key={Math.random()}>{account.name}</th>;
            })}
            <th>Total Debt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Start</td>
            {accounts.map((account) => {
              return <td key={Math.random()}>{account["balance Due"]}</td>;
            })}
            <td>{totalDebt}</td>
          </tr>
          {buildAmoritizationTableRow(accounts, 1)}
        </tbody>
      </table>
    );
  }, [accounts]);

  function calculateCompoundInterest(principal, time, rate, periods) {
    return principal * (Math.pow((1 + (rate / periods)), (periods * time)));
  }

  function buildAmoritizationTableRow(accountsArray, monthsElapsed) {

    if (accountsArray.filter((account) => account["balance Due"] <= 0).length < 1) {
      return null;
    }

    let smallestAccountBalance = accountsArray.sort((firstBalance, secondBalance) => firstBalance["balance Due"] <= secondBalance["balance Due"] ? -1 : 1)[0];
    console.log(smallestAccountBalance);
    let paidOffAccountBonus = accountsArray.filter((account) => account["balance Due"] <= 0).reduce((bonus, account) => bonus += account["minimum Payment Due"], 0);

    let newAccountsArray = accountsArray.map((account) => {
      const newBalanceDue = calculateCompoundInterest(account["balance Due"], 1/12, account.APR / 100, 12);
      const payment = account["minimum Payment Due"];
      const paymentWithBonus = payment + (bonusPayment ? bonusPayment : 0) + (paidOffAccountBonus ? paidOffAccountBonus : 0);
      
      if (account === smallestAccountBalance) {
        console.log("payment with bonus");
        console.log(paymentWithBonus);
        return new Account(
          account.name,
          (newBalanceDue - paymentWithBonus > 0 ? newBalanceDue - paymentWithBonus : 0),
          account["minimum Payment Due"],
          account.APR
        );
      } else {
        console.log("payment without bonus");
        console.log(payment);
        return new Account(
        account.name,
        (newBalanceDue - payment > 0 ? newBalanceDue - payment : 0),
        account["minimum Payment Due"],
        account.APR
        );
      }
      
    });

    let total = newAccountsArray.reduce((totalDebt, account) => totalDebt += account["balance Due"], 0);

    return (
      <>
        <tr>
          <td>Month {monthsElapsed}</td>
          {newAccountsArray.map((account) => {
            return (
                <td>{account["balance Due"].toFixed(2)}</td>
            )
          })}
          <td>{total.toFixed(2)}</td>
          <td>{paidOffAccountBonus > 0 ? paidOffAccountBonus : ""}</td>
        </tr>
        {buildAmoritizationTableRow(newAccountsArray, monthsElapsed + 1)}
      </>
      
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Snowball Sorted Balances</th>
        </tr>
        <tr>
          <th>Time</th>
          {accounts.map((account) => {
            return <th key={Math.random()}>{account.name}</th>;
          })}
          <th>Total Debt</th>
          <th>Snowball Bonus</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Start</td>
          {accounts.map((account) => {
            return <td key={Math.random()}>{account["balance Due"]}</td>;
          })}
          <td>{totalDebt}</td>
          <td></td>
        </tr>
        {buildAmoritizationTableRow(accounts, 1)}
      </tbody>
    </table>
  );
}