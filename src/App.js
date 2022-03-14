import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Grid,
  Card,
  Input,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Upload, Download, Menu } from "@mui/icons-material";
import AccountsDisplay from "./AccountsDisplay/AccountsDisplay";
import SnowBallDisplay from "./SnowBallDisplay/SnowBallDisplay";

function App() {

  let [accounts, updateAccounts] = useState([]);
  const importFileInput = useRef(null);

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

  function importAccounts(event) {
    let rawData = event.target.files[0];

    rawData.text()
      .then((value) => {
        let parsedData = JSON.parse(value);
        console.log(parsedData);
      })
      .catch((err) => console.log(err));

      event.target.value = null;
  }

  function importPassThru() {
    importFileInput.current.click();
  }

  useEffect(() => {
    let sortedAccounts = accounts.sort((firstBalance, secondBalance) =>
      firstBalance["balance Due"] <= secondBalance["balance Due"] ? -1 : 1
    );
    updateAccounts(sortedAccounts);
  }, [accounts]);

  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={4} component={Card}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                SnowBall
              </Typography>
              <Button
                color="inherit"
                onClick={(e) => exportAccounts(e)}
                endIcon={<Download />}
              >
                Export Accounts
              </Button>
              <Button 
                color="inherit"
                onClick={importPassThru} 
                endIcon={<Upload />}
              >
                Import Accounts
              </Button>
              <Input ref={importFileInput} type="file" component="Button" sx={{display: 'none'}} onChange={(e) => importAccounts(e)}/>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <AccountsDisplay
            accounts={accounts}
            updateAccounts={updateAccounts}
          />
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                align="justify"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                SnowBall Amoritization
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <SnowBallDisplay accounts={accounts} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
