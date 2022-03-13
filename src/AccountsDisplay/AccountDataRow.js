import { Edit, Save } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import Account from "../Account";

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
    <TableRow key={account.name}>
      <TableCell>
        <form id={account.name + "Form"}>
          {isReadOnly ? localAccountInput.name :
            <input
            form={account.name + "Form"}
            type="text"
            onChange={(e) => handleAccountEdit(e, "name")}
            defaultValue={localAccountInput.name}
            />
          }
        </form>
      </TableCell>
      <TableCell>
        {isReadOnly ? localAccountInput["balance Due"] :
          <input
          form={account.name + "Form"}
          type="number"
          step={0.01}
          onChange={(e) => handleAccountEdit(e, "balance Due")}
          defaultValue={localAccountInput["balance Due"]}
          />
        }
      </TableCell>
      <TableCell>
        {isReadOnly ? localAccountInput.APR :
          <input
          form={account.name + "Form"}
          type="number"
          step={0.01}
          onChange={(e) => handleAccountEdit(e, "APR")}
          defaultValue={localAccountInput["APR"]}
          />
        }
      </TableCell>
      <TableCell>
        {isReadOnly ? localAccountInput["minimum Payment Due"] :
          <input
          form={account.name + "Form"}
          type="number"
          step={0.01}
          onChange={(e) => handleAccountEdit(e, "minimum Payment Due")}
          defaultValue={localAccountInput["minimum Payment Due"]}
          />
        }
      </TableCell>
      <TableCell>
        <IconButton
          variant="contained"
          form={account.name + "Form"}
          type="submit"
          onClick={(e) => handleAccountEditSave(e)}
        >
          {isReadOnly ? <Edit /> : <Save />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
