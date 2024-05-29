export const CONSTANTS = {
  CALCULATOR: {
    initial_investment: 5000,
    interest_rate: 5,
    interest_period: "yearly",
    period: {
      years: 5,
      months: 0,
    },
    additionalContribution: {
      type: "none",
      deposits: {
        amount: 0,
        period: "monthly",
        increment: 0,
      },
      withdrawals: {
        amount: 0,
        period: "monthly",
        increment: 0,
      },
    },
    compoundInterval: "monthly",
    breakdownPeriod: "yearly",
  },
  PERIOD: ["daily", "weekly", "monthly", "quarterly", "yearly"],
};
