import { CONSTANTS } from "@/lib/constants";
import { RootState } from "@/lib/store";
import { createCompoundTable, fixNumber } from "@/lib/utils";
import { Contribution, Period } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CalculatorSlice {
  currency: string;
  initial_investment: number;
  interest_rate: number;
  interest_period: Period;
  period: {
    months: number;
    years: number;
  };
  additionalContribution: {
    type: Contribution;
    deposits: {
      amount: number;
      period: Period;
      increment: number;
    };
    withdrawals: {
      amount: number;
      period: Period;
      increment: number;
    };
  };
  compoundInterval: Period;
  breakdownPeriod: Partial<Period>;
  interestTable: number[][];
  interestEarned: number;
  futureBalance: number;
  ror: number;
}

const initialState: CalculatorSlice = {
  currency: "₹",
  initial_investment: CONSTANTS.CALCULATOR.initial_investment,
  interest_rate: CONSTANTS.CALCULATOR.interest_rate,
  interest_period: CONSTANTS.CALCULATOR.interest_period as Period,
  period: {
    years: CONSTANTS.CALCULATOR.period.years,
    months: CONSTANTS.CALCULATOR.period.months,
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
  interestTable: [],
  interestEarned: 0,
  futureBalance: 0,
  ror: 0,
};

interface CalculateActions {
  data?: {
    initialInvestment: number;
    interestRate: number;
    interestPeriod: Period;
    years: number;
    months: number;
  };
  period: Partial<Period>;
}

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setBreakdownPeriod: (state, action) => {
      state.breakdownPeriod = action.payload;
    },
    calculateCompound: (state, action: PayloadAction<CalculateActions>) => {
      if (action.payload?.data) {
        const {
          initialInvestment,
          interestRate,
          interestPeriod,
          years,
          months,
        } = action?.payload?.data;
        state.initial_investment = initialInvestment;
        state.interest_rate = interestRate;
        state.interest_period = interestPeriod;
        state.period.years = years;
        state.period.months = months;
      }
      const createCompound = createCompoundTable({
        data: {
          years: state.period.years,
          months: state.period.months,
          interest: state.interest_rate,
          initialInvestment: state.initial_investment,
        },
        period: state.breakdownPeriod,
      });

      state.interestTable = createCompound.table;
      state.interestEarned = createCompound.interestEarned;
      state.futureBalance = createCompound.futureBalance;
      state.ror = fixNumber(
        ((createCompound.futureBalance - state.initial_investment) /
          state.initial_investment) *
          100
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBreakdownPeriod, calculateCompound } =
  calculatorSlice.actions;

export const CALCULATOR_ACTIONS = {
  setBreakdownPeriod,
  calculateCompound,
};

export const CALCULATOR_STATE = {
  getCalculatorState: (state: RootState) => state.calculator,
  getPeriodState: (state: RootState) => state.calculator.period,
};

export default calculatorSlice.reducer;
