import { useState } from "react";
import SnowBallAmortizationTable from "./SnowBallAmortizationTable";
import SnowBallBonusForm from "./SnowBallBonusForm";

export default function SnowBallDisplay({accounts}) {

    const [bonusPayment, setBonusPayments] = useState();
    return (
        <div>
            <SnowBallBonusForm bonusPayment={bonusPayment} setBonusPayments={setBonusPayments} />
            <SnowBallAmortizationTable bonusPayment={bonusPayment} accounts={accounts} />
        </div>  
    )
}