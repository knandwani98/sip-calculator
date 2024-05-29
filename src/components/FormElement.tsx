"use client";

import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CONSTANTS } from "@/lib/constants";
import { Button } from "./ui/button";
import { Percent } from "lucide-react";
import { useSelector } from "react-redux";
import { CALCULATOR_STATE } from "@/lib/features/calculator/calculatorSlice";

export type InputVariant =
  | "price"
  | "percentage"
  | "period"
  | "negative"
  | "duration";

interface FormProps {
  label: string;
  type: string;
  value: number | string;
  variant?: InputVariant;
  onChange?: (value: any) => void;
  className?: string;
}

export const FormElement = (props: FormProps) => {
  const { label, className, type, value, onChange, variant } = props;

  const calculatorState = useSelector(CALCULATOR_STATE.getCalculatorState);

  if (variant === "period") {
    return (
      <div className="w-full">
        <Label className="capitalize mb-2 block text-primary-foreground">
          {label.replace("_", " ")} :
        </Label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full font-normal flex justify-start items-center"
            >
              {value}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-56">
            <DropdownMenuLabel>Choose Interest Period</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {CONSTANTS.PERIOD.map((period, i: number) => {
              return (
                <DropdownMenuCheckboxItem
                  key={i}
                  checked={value === period}
                  onCheckedChange={() => (onChange ? onChange(period) : {})}
                >
                  {period}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className={cn("py-2 w-full", className)}>
      <Label className="capitalize mb-2 block text-primary-foreground">
        {label.replace("_", " ")} :
      </Label>

      {/* Input */}
      <div className="relative">
        <Input
          onChange={(e) => (onChange ? onChange(e) : {})}
          className={cn(variant === "price" && "pl-14")}
          type={type}
          value={value}
        />

        {/* Currency */}
        {variant === "price" && (
          <Button
            variant={"link"}
            className="absolute top-0 bottom-0 left-0 cursor-default w-12 bg-primary-foreground border border-popover"
          >
            <span className="text-lg font-normal">
              {calculatorState.currency}
            </span>
          </Button>
        )}
        {/* {Percentage} */}
        {variant === "percentage" && (
          <Button
            variant={"link"}
            className="absolute top-0 bottom-0 right-0 cursor-default w-12 bg-primary-foreground border border-popover"
          >
            <Percent />
          </Button>
        )}
      </div>
    </div>
  );
};
