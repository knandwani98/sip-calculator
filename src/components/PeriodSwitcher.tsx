"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATOR_ACTIONS,
  CALCULATOR_STATE,
} from "@/lib/features/calculator/calculatorSlice";
import { Period } from "@/types";

export const PeriodSwitcher = () => {
  const dispatch = useDispatch();
  const getCalculatorState = useSelector(CALCULATOR_STATE.getCalculatorState);

  const breakdownButtons = ["yearly", "monthly"];

  const handleSwitchPeriod = (period: Period) => {
    dispatch(CALCULATOR_ACTIONS.setBreakdownPeriod(period));
    dispatch(
      CALCULATOR_ACTIONS.calculateCompound({
        period,
      })
    );
  };

  return (
    <div className="flex items-center sm:flex-row flex-col justify-between">
      {/* Title */}
      <h1 className="text-primary font-black text-lg sm:text-3xl md:5xl text-center py-4 capitalize order-1 ">
        {getCalculatorState.breakdownPeriod} Breakdown
      </h1>

      {/* Switcher */}
      <div className="flex rounded overflow-hidden sm:order-2">
        {breakdownButtons.map((period, i) => {
          return (
            <Button
              key={i}
              onClick={() => handleSwitchPeriod(period as Period)}
              className={cn(
                "w-full aspect-[3/1] !rounded-none capitalize",
                getCalculatorState.breakdownPeriod === period
                  ? "bg-primary"
                  : "bg-popover text-primary border border-primary hover:bg-primary/20"
              )}
            >
              {period}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
