import AccountDataRow from "./AccountDataRow";
import AddAccountForm from "./AddAccountForm";

export default function AccountsDisplay({ accounts, updateAccounts }) {
  return (
    <section>
      <table>
        <thead>
          <tr key="HeaderRow">
            <th>Account Name</th>
            <th>Balance Due</th>
            <th>APR</th>
            <th>Monthly Minimum Due</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(function (account) {
            return (
              <AccountDataRow
                account={account}
                updateAccounts={updateAccounts}
                accounts={accounts}
              />
            );
          })}
          <AddAccountForm accounts={accounts} updateAccounts={updateAccounts} />
        </tbody>
      </table>
    </section>
  );
}
