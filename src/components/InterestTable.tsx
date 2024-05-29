"use client";

import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { CALCULATOR_STATE } from "@/lib/features/calculator/calculatorSlice";

export const InterestTable = () => {
  const style = {
    table: {
      td: "border border-secondary-foreground py-2 px-1 text-xs sm:text-base text-center",
      th: "text-[10px] sm:text-sm bg-primary text-secondary capitalize",
    },
  };

  const calculatorState = useSelector(CALCULATOR_STATE.getCalculatorState);

  const tableData = {
    headers: [
      calculatorState.breakdownPeriod === "yearly" ? "year" : "month",
      "interest",
      "accrued interest",
      "balance",
    ],
    rows: calculatorState.interestTable,
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-collapse border border-white">
          {tableData.headers.map((heading, i) => {
            return (
              <th key={i} className={cn(style.table.td, style.table.th)}>
                {heading}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.rows.map((row, rowIdx) => (
          <tr
            className={cn(
              rowIdx % 2 !== 0 && "bg-popover-foreground/20",
              rowIdx !== 0 &&
                rowIdx % 12 === 0 &&
                calculatorState.breakdownPeriod === "monthly" &&
                "bg-accent-foreground/70 text-primary-foreground"
            )}
            key={rowIdx}
          >
            <td className={style.table.td}>{rowIdx}</td>

            {row.map((cell, valueIdx) => (
              <td key={valueIdx} className={cn(style.table.td)}>
                {cell > 0 && <span>{calculatorState.currency}</span>}
                <span>{cell ? cell : "-"}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
