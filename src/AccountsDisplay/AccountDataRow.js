import { useState } from "react";
import Account from "../Account";
import { ReactComponent as EditIcon } from "../assets/EditIcon.svg";
import { ReactComponent as SaveIcon } from "../assets/SaveIcon.svg";

export default function AccountDataRow({ account, updateAccounts, accounts }) {
  const [isReadOnly, setReadOnly] = useState(true);
  const [localAccountInput, setLocalAccount] = useState(new Account(account.name, account["balance Due"], account["minimum Payment Due"], account["APR"]));

  function handleAccountEditSave(event) {
    event.preventDefault();
    if (!isReadOnly) {
      let changedAccounts = [...accounts];
      let match = changedAccounts.findIndex((findAccount) => {
        return account.name === findAccount.name;
      });
      changedAccounts[match] = localAccountInput;
      updateAccounts(changedAccounts);
    }
    setReadOnly(!isReadOnly);
  }

  function handleAccountEdit(event, type) {
    let newLocalAccount = localAccountInput;
    newLocalAccount[type] =
      event.target.value && !isNaN(event.target.value)
        ? parseFloat(event.target.value)
        : event.target.value;
    setLocalAccount(newLocalAccount);
  }

  return (
    <tr key={account.name}>
      <td>
        <form id={account.name + "Form"}>
          <input
            form={account.name + "Form"}
            type="text"
            onChange={(e) => handleAccountEdit(e, "name")}
            value={localAccountInput.name}
            readOnly={isReadOnly}
          ></input>
        </form>
      </td>
      <td>
        <input
          form={account.name + "Form"}
          type="number"
          step={0.01}
          onChange={(e) => handleAccountEdit(e, "balance Due")}
          value={localAccountInput["balance Due"]}
          readOnly={isReadOnly}
        ></input>
      </td>
      <td>
        <input
          form={account.name + "Form"}
          type="number"
          step={0.01}
          onChange={(e) => handleAccountEdit(e, "APR")}
          value={localAccountInput.APR}
          readOnly={isReadOnly}
        ></input>
      </td>
      <td>
        <input
          form={account.name + "Form"}
          type="number"
          step={0.01}
          onChange={(e) => handleAccountEdit(e, "minimum Payment Due")}
          value={localAccountInput["minimum Payment Due"]}
          readOnly={isReadOnly}
        ></input>
      </td>
      <td>
        <button
          form={account.name + "Form"}
          type="submit"
          onClick={(e) => handleAccountEditSave(e)}
        >
          {isReadOnly ? <EditIcon /> : <SaveIcon />}
        </button>
      </td>
    </tr>
  );
}
