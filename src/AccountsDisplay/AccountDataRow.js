import { useState } from "react";
import { ReactComponent as EditIcon } from "../assets/EditIcon.svg";
import { ReactComponent as SaveIcon } from "../assets/SaveIcon.svg";

export default function AccountDataRow({ account, updateAccounts, accounts }) {
  const [isReadOnly, setReadOnly] = useState(true);
  const [localAccountInput, setLocalAccount] = useState({
    name: account.name,
    "balance Due": account["balance Due"],
    "minimum Payment Due": account["minimum Payment Due"],
    APR: account["APR"],
  });

  function handleAccountEditSave(event) {
    console.log(accounts);
    event.preventDefault();
    if (!isReadOnly) {
      let match = accounts.findIndex((findAccount) => {
        return account.name === findAccount.name;
      });
      accounts[match] = localAccountInput;
      updateAccounts(accounts);
      console.log(accounts);
      console.log(accounts[match]);
    }
    setReadOnly(!isReadOnly);
  }

  function handleAccountEdit(event, type) {
    let newLocalAccount = { ...localAccountInput };
    newLocalAccount[type] = event.target.value;
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
            defaultValue={account.name}
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
          defaultValue={account["balance Due"]}
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
          defaultValue={account.APR}
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
          defaultValue={account["minimum Payment Due"]}
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
