import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AccountDataRow from "./AccountDataRow";
import AddAccountForm from "./AddAccountForm";

export default function AccountsDisplay({ accounts, updateAccounts }) {
  function exportAccounts(event) {
    event.preventDefault();
    let dataStr = JSON.stringify(accounts);
    let dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    let exportFileDefaultName = "SnowBallAccounts.json";
    let linkElement = document.createElement("a");

    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow key="HeaderRow">
                <TableCell>Account Name</TableCell>
                <TableCell>Balance Due</TableCell>
                <TableCell>APR</TableCell>
                <TableCell>Monthly Minimum Due</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map(function (account) {
                return (
                  <AccountDataRow
                    account={account}
                    updateAccounts={updateAccounts}
                    accounts={accounts}
                  />
                );
              })}
              <AddAccountForm
                accounts={accounts}
                updateAccounts={updateAccounts}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <form className="setImportExportArea">
          <Grid item xs={6}>
            <label>
              Export SnowBall Accounts <br />
              <button onClick={(e) => exportAccounts(e)}>Download File</button>
            </label>
          </Grid>
          <Grid item xs={6}>
            <label>
              Import SnowBall Accounts <br />
              <button>Upload File</button>
            </label>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
