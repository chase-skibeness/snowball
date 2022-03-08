import { useState } from "react";
import { ReactComponent as AddIcon } from "../assets/AddIcon.svg";

export default function AddAccountForm({ accounts, updateAccounts }) {
  const [newAccountInput, setNewAccount] = useState({
    name: "",
    "balance Due": "",
    "minimum Payment Due": "",
    APR: "",
  });

  function handleAddAccount(event) {
    event.preventDefault();
    updateAccounts([...accounts, newAccountInput]);
  }
  return (
    <tr key="inputRow">
      <td>
        <form id="accountAddForm">
          <input
            autoFocus="autofocus"
            placeholder="Account Name"
            required={true}
            type="text"
            value={newAccountInput["name"]}
            onChange={(e) =>
              setNewAccount({ ...newAccountInput, name: e.target.value })
            }
          ></input>
        </form>
      </td>
      <td>
        <input
          placeholder="Account Balance"
          required={true}
          form="accountAddForm"
          step={0.01}
          type="number"
          value={newAccountInput["balance Due"]}
          onChange={(e) =>
            setNewAccount({ ...newAccountInput, "balance Due": e.target.value })
          }
        ></input>
      </td>
      <td>
        <input
          placeholder="APR"
          required={true}
          form="accountAddForm"
          step={0.01}
          type="number"
          value={newAccountInput["APR"]}
          onChange={(e) =>
            setNewAccount({ ...newAccountInput, APR: e.target.value })
          }
        ></input>
      </td>
      <td>
        <input
          placeholder="Minimum Payment Due"
          required={true}
          form="accountAddForm"
          step={0.01}
          type="number"
          value={newAccountInput["minimum Payment Due"]}
          onChange={(e) =>
            setNewAccount({
              ...newAccountInput,
              "minimum Payment Due": e.target.value,
            })
          }
        ></input>
      </td>
      <td>
        <button
          form="accountAddForm"
          type="submit"
          onClick={(e) => handleAddAccount(e)}
        >
          {<AddIcon />}
        </button>
      </td>
    </tr>
  );
}
