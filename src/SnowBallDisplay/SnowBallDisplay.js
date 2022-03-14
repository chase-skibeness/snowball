import { Grid } from "@mui/material";
import { useState } from "react";
import SnowBallAmortizationTable from "./SnowBallAmortizationTable";
import SnowBallBonusForm from "./SnowBallBonusForm";
import SnowBallStartForm from "./SnowBallStartForm";

export default function SnowBallDisplay({ accounts }) {
  const [bonusPayment, setBonusPayments] = useState();
  const [startPayment, setStartPayment] = useState();

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={4}>
        <SnowBallBonusForm
          bonusPayment={bonusPayment}
          setBonusPayments={setBonusPayments}
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4}>
        <SnowBallStartForm
          startPayment={startPayment}
          setStartPayments={setStartPayment}
        />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={12}>
        <SnowBallAmortizationTable
          bonusPayment={bonusPayment}
          startPayment={startPayment}
          accounts={accounts}
        />
      </Grid>
    </Grid>
  );
}
