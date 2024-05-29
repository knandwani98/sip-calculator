"use client";

import React from "react";
import { useSelector } from "react-redux";
import { CALCULATOR_STATE } from "@/lib/features/calculator/calculatorSlice";

export const InvestmentSummary = () => {
  const calculatorState = useSelector(CALCULATOR_STATE.getCalculatorState);
  const periodState = useSelector(CALCULATOR_STATE.getPeriodState);

  const periodSummary = () => {
    let summary = "";

    if (periodState.months > 0 && periodState.years > 0) {
      summary = `${periodState.years} years and ${periodState.months} months`;
    } else if (periodState.years > 0) {
      summary = `${periodState.years} years`;
    } else if (periodState.months > 0) {
      summary = `${periodState.months} months`;
    }
    return summary;
  };

  return (
    <div>
      <h1 className="heading text-center xl:text-left">
        Projection for {periodSummary()}
      </h1>

      <hr className="my-4" />

      <section className="grid grid-cols-2">
        <div className="my-2">
          <p>Initial balance</p>
          <h2 className="heading">
            <span>{calculatorState.currency}</span>
            {calculatorState.initial_investment}
          </h2>
        </div>
        <div className="my-2">
          <p>Future Investment Value</p>
          <h2 className="heading">
            <span>{calculatorState.currency}</span>
            {calculatorState.futureBalance}
          </h2>
        </div>
        <div className="my-2">
          <p>Interest Rate (yearly)</p>
          <h2 className="heading">
            {calculatorState.interest_rate}
            <span>%</span>
          </h2>
        </div>
        <div className="my-2">
          <p>Total Interest Earned</p>
          <h2 className="heading">
            <span>{calculatorState.currency}</span>
            {calculatorState.interestEarned}
          </h2>
        </div>
        <div className="my-2">
          <p className="whitespace-nowrap">All-time Rate of Return (RoR)</p>
          <h2 className="heading">
            {calculatorState.ror}
            <span>%</span>
          </h2>
        </div>
      </section>

      <hr className="my-4 mb-8" />
    </div>
  );
};
