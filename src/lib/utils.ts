import { Period } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CONSTANTS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fixNumber = (val: number) => {
  return Number(val.toFixed(2));
};

export const createCompoundTable = ({
  data,
  period = CONSTANTS.CALCULATOR.breakdownPeriod as Period,
}: {
  data: {
    years: number;
    months: number;
    interest: number;
    initialInvestment: number;
  };
  period?: Partial<Period>;
}): { table: number[][]; futureBalance: number; interestEarned: number } => {
  const { years, months, interest, initialInvestment } = data;

  const numberOfMonths: number = Number(months) + Number(years) * 12;
  let balance: number = Number(initialInvestment);
  let accruedInterest: number = 0;
  let arr: number[][] = [[0, 0, initialInvestment]];

  if (period === "monthly") {
    for (let i = 1; i < numberOfMonths + 1; i++) {
      const interestPrice: number = (balance * interest) / 12 / 100;
      accruedInterest = accruedInterest + interestPrice;
      balance = balance + Number(interestPrice);

      arr.push([
        fixNumber(interestPrice),
        fixNumber(accruedInterest),
        fixNumber(balance),
      ]);
    }
  }

  if (period === "yearly") {
    let annualInterest = 0;

    for (let i = 1; i < numberOfMonths + 1; i++) {
      const interestPrice: number = (balance * interest) / 12 / 100;
      accruedInterest = accruedInterest + interestPrice;
      balance = balance + Number(interestPrice);

      annualInterest = annualInterest + interestPrice;

      if (i % 12 === 0) {
        arr.push([
          fixNumber(annualInterest),
          fixNumber(accruedInterest),
          fixNumber(balance),
        ]);
        annualInterest = 0;
      }
    }
  }

  return {
    table: arr,
    futureBalance: fixNumber(balance),
    interestEarned: fixNumber(accruedInterest),
  };
};
