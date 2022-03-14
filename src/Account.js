function Account(
  name = undefined,
  balanceDue = undefined,
  minimumPaymentDue = undefined,
  apr = undefined
) {
  this["name"] = name;
  this["balance Due"] = balanceDue;
  this["minimum Payment Due"] = minimumPaymentDue;
  this["APR"] = apr;
}

export default Account;
