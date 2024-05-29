"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATOR_ACTIONS,
  CALCULATOR_STATE,
} from "@/lib/features/calculator/calculatorSlice";
import { LoaderCircle } from "lucide-react";
import { InvestmentSummary } from "./InvestmentSummary";
import { PeriodSwitcher } from "./PeriodSwitcher";
import { InterestTable } from "./InterestTable";
import { CONSTANTS } from "@/lib/constants";
import { Period } from "@/types";

export const RightContainer = () => {
  const dispatch = useDispatch();
  const calculatorState = useSelector(CALCULATOR_STATE.getCalculatorState);

  useEffect(() => {
    //
    dispatch(
      CALCULATOR_ACTIONS.calculateCompound({
        period: CONSTANTS.CALCULATOR.breakdownPeriod as Period,
      })
    );
  }, []);

  if (calculatorState.interestTable.length < 1) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoaderCircle className="text-primary animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <>
      <InvestmentSummary />
      <PeriodSwitcher />
      <InterestTable />
    </>
  );
};
