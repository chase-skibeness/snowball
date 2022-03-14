import { TextField } from "@mui/material";

export default function SnowBallStartForm({ startPayment, setStartPayment }) {
  return (
    <TextField
      value={startPayment}
      onChange={(e) => setStartPayment(parseFloat(e.target.value))}
      label="Extra Start Payment"
      type="number"
      helperText="How much in liquid savings can you put towards the beginning of the SnowBall?"
      InputLabelProps={{ shrink: true }}
    />
  );
}
