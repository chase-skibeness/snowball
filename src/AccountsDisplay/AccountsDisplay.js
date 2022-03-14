import {
  Grid,
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer>
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
    </Grid>
  );
}
