"use client";

import React, { useState } from "react";
import { FormElement } from "./FormElement";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATOR_ACTIONS,
  CALCULATOR_STATE,
} from "@/lib/features/calculator/calculatorSlice";
import { Button } from "./ui/button";
import { CONSTANTS } from "@/lib/constants";
import { Period } from "@/types";

export const Sidebar = () => {
  const dispatch = useDispatch();

  const [initialInvestment, setInitialInvestment] = useState(
    CONSTANTS.CALCULATOR.initial_investment
  );
  const [interestRate, setInterestRate] = useState(
    CONSTANTS.CALCULATOR.interest_rate
  );
  const [interestPeriod, setInterestPeriod] = useState(
    CONSTANTS.CALCULATOR.interest_period
  );
  const [years, setYears] = useState(CONSTANTS.CALCULATOR.period.years);
  const [months, setMonths] = useState(CONSTANTS.CALCULATOR.period.months);

  const getCalculatorState = useSelector(CALCULATOR_STATE.getCalculatorState);

  return (
    <>
      <h1 className="font-black text-lg sm:text-3xl md:5xl text-center text-primary my-4">
        Compound Calculator
      </h1>
      <section className="bg-primary rounded-lg border border-secondary/90 py-8 sm:min-w-96 p-4">
        <FormElement
          label="initial_investment"
          type="number"
          variant="price"
          value={initialInvestment}
          onChange={(e) => {
            setInitialInvestment(e.target.value);
          }}
        />

        <div className="flex justify-center items-center gap-4">
          <FormElement
            label="interest_rate"
            type="number"
            variant="percentage"
            value={interestRate}
            onChange={(e) => {
              setInterestRate(e.target.value);
            }}
          />

          <FormElement
            label="interest_period"
            type="string"
            variant="period"
            value={interestPeriod}
            onChange={(value) => {
              setInterestPeriod(value);
            }}
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <FormElement
            label="years"
            type="number"
            value={years}
            onChange={(e) => {
              setYears(e.target.value);
            }}
          />
          <FormElement
            label="months"
            type="number"
            value={months}
            onChange={(e) => {
              setMonths(e.target.value);
            }}
          />
        </div>
      </section>

      {/* Button */}
      <div className="w-full my-4 flex items-center justify-center">
        <Button
          onClick={() =>
            dispatch(
              CALCULATOR_ACTIONS.calculateCompound({
                data: {
                  initialInvestment,
                  interestRate,
                  interestPeriod: interestPeriod as Period,
                  years,
                  months,
                },
                period: CONSTANTS.CALCULATOR.breakdownPeriod as Period,
              })
            )
          }
          className="sm:w-full sm:bg-primary-foreground sm:border-2 sm:border-primary sm:text-primary sm:hover:text-primary-foreground"
          variant={"default"}
        >
          Calculate
        </Button>
      </div>
    </>
  );
};
