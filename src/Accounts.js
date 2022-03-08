import { useState } from "react";

function Accounts({accounts, updateAccounts}) {
    
    function AccountDataRow({account}) {
      const [isReadOnly, setReadOnly] = useState(true);

      return (
        <tr key={account.name}>
          <td><input type="text" defaultValue={account.name} readOnly={isReadOnly}></input></td>
          <td><input type="text" defaultValue={account["balance Due"]} readOnly={isReadOnly}></input></td>
          <td><input type="text" defaultValue={account.APR} readOnly={isReadOnly}></input></td>
          <td><input type="text" defaultValue={account["minimum Payment Due"]} readOnly={isReadOnly}></input></td>
          <button onClick={() => setReadOnly(!isReadOnly)}>{isReadOnly ? "Edit" : "Save"}</button>
        </tr>
      )
    }
    return (
        <section>
            
            <table>
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Balance Due</th>
                  <th>APR</th>
                  <th>Monthly Minimum Due</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(function(account) {
                  return (
                    <AccountDataRow account={account} />
                  )
                })}
              </tbody>
            </table>
          </section>
    )
}

export default Accounts;