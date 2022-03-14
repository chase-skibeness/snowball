export default function SnowBallBonusForm({ bonusPayment, setBonusPayments }) {
  return (
    <div>
      <form>
        <label>
          How much extra per month can you put towards the SnowBall?
          <br />
          <input
            type="number"
            placeholder="Extra Monthly Payments"
            value={bonusPayment}
            onChange={(e) => setBonusPayments(parseFloat(e.target.value))}
          />
        </label>
      </form>
    </div>
  );
}
