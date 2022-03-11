import AccountDataRow from "./AccountDataRow";
import AddAccountForm from "./AddAccountForm";

export default function AccountsDisplay({ accounts, updateAccounts }) {

  function exportAccounts(event) {
    event.preventDefault();
    let dataStr = JSON.stringify(accounts);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    let exportFileDefaultName = 'SnowBallAccounts.json';
    let linkElement = document.createElement('a');

    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

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
      <form className="setImportExportArea">
          <label>
            Export SnowBall Accounts <br />
            <button onClick={(e) => exportAccounts(e)} >Download File</button>
          </label>
          <label>
            Import SnowBall Accounts <br />
            <button >Upload File</button>
          </label>
      </form>
    </section>
  );
}
