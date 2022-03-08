import { useEffect, useState } from "react";

export default function SnowBallAmortizationTable({ accounts }) {
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    setTotalDebt(
      accounts.reduce(
        (balanceSum, account) => (balanceSum += account["balance Due"]),
        0
      )
    );
  }, [accounts]);

  return (
    <table>
      <thead>
        <tr>
          <td>Total Debt</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{totalDebt}</td>
        </tr>
      </tbody>
    </table>
  );
}
