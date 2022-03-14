import { Grid } from "@mui/material";
import { useState } from "react";
import SnowBallAmortizationTable from "./SnowBallAmortizationTable";
import SnowBallBonusForm from "./SnowBallBonusForm";

export default function SnowBallDisplay({ accounts }) {
  const [bonusPayment, setBonusPayments] = useState();
  return (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <SnowBallBonusForm
          bonusPayment={bonusPayment}
          setBonusPayments={setBonusPayments}
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <SnowBallAmortizationTable
          bonusPayment={bonusPayment}
          accounts={accounts}
        />
      </Grid>
    </Grid>
  );
}
