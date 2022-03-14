import { Add } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Account from "../Account";

export default function AddAccountForm({ accounts, updateAccounts }) {
  const [newAccountInput, setNewAccount] = useState(new Account());

  function handleAddAccount(event) {
    event.preventDefault();
    updateAccounts([...accounts, newAccountInput]);
    setNewAccount(new Account("", "", "", ""));
  }
  return (
    <TableRow key="inputRow">
      <TableCell>
        <form id="accountAddForm">
          <TextField
            variant="standard"
            label="Account Name"
            InputLabelProps={{ shrink: true }}
            autoFocus={true}
            required={true}
            value={newAccountInput["name"]}
            onChange={(e) =>
              setNewAccount({ ...newAccountInput, name: e.target.value })
            }
          />
        </form>
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          label="Account Balance"
          form="accountAddForm"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required={true}
          value={newAccountInput["balance Due"]}
          onChange={(e) =>
            setNewAccount({
              ...newAccountInput,
              "balance Due": parseFloat(e.target.value),
            })
          }
          type="number"
          step={0.01}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          label="Account APR"
          form="accountAddForm"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          required={true}
          value={newAccountInput["APR"]}
          onChange={(e) =>
            setNewAccount({
              ...newAccountInput,
              APR: parseFloat(e.target.value),
            })
          }
          type="number"
          step={0.01}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          label="Minimum Payment Due"
          form="accountAddForm"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required={true}
          value={newAccountInput["minimum Payment Due"]}
          onChange={(e) =>
            setNewAccount({
              ...newAccountInput,
              "minimum Payment Due": parseFloat(e.target.value),
            })
          }
          type="number"
          step={0.01}
        />
      </TableCell>
      <TableCell>
        <IconButton
          variant="contained"
          form="accountAddForm"
          type="submit"
          onClick={(e) => handleAddAccount(e)}
        >
          <Add />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
