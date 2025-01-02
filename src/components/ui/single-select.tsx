"use client";

import React from "react";
import { ChevronDown, Loader2, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useTranslations } from "next-intl";
import { Separator } from "./separator";

interface SingleSelectProps {
  /**
   * Options to display in the single-select dropdown.
   */
  options: {
    /** Display label for the option. */
    label: string;
    /** Unique value for the option. */
    value: string;
    /** Optional icon component for each option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback for when the selected value changes.
   * Provides the new selected value as a string.
   */
  onValueChange: (value: string) => void;

  /** Default selected value. */
  defaultValue?: string;

  /** Placeholder text when no option is selected. */
  placeholder?: string;

  /** If true, renders as a child of another component. */
  asChild?: boolean;

  /** Additional classes for styling. */
  className?: string;

  /** If true, shows a loading spinner. */
  isLoading?: boolean;
}

export const SingleSelect = React.forwardRef<
  HTMLButtonElement,
  SingleSelectProps
>(
  (
    {
      options,
      onValueChange,
      defaultValue,
      placeholder,
      isLoading = false,
      className,
      ...props
    },
    ref
  ) => {
    const t = useTranslations();
    const [selectedValue, setSelectedValue] = React.useState<string | null>(
      defaultValue || null
    );
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        setSelectedValue(null);
        onValueChange("");
      }
    };

    const handleOptionSelect = (value: string) => {
      setSelectedValue(value);
      onValueChange(value);
      setIsPopoverOpen(false);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const handleClear = () => {
      setSelectedValue(null);
      onValueChange("");
    };

    const renderSelectedOption = () => {
      const option = options.find((option) => option.value === selectedValue);
      const IconComponent = option?.icon;
      return (
        <p
          key={option?.value}
          className="ml-2 bg-transparent text-foreground border-foreground/1 hover:bg-transparent"
        >
          {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
          {option?.label}
        </p>
      );
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={(e) => {
              // Only toggle popover when the click does not originate from the XIcon
              if (!e.defaultPrevented) {
                handleTogglePopover();
              }
            }}
            className={cn(
              "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit",
              className
            )}
          >
            {isLoading && (
              <div className="flex items-center justify-center h-4 w-4">
                <Loader2 className="animate-spin h-4 w-4" />
              </div>
            )}
            {selectedValue ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {renderSelectedOption()}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground mx-3">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Command>
            <CommandInput
              placeholder={t("common.search")}
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>{t("common.no-data-found")}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValue === option.value;
                  const IconComponent = option.icon;

                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleOptionSelect(option.value)}
                      className={cn(
                        "cursor-pointer",
                        isSelected ? "bg-neutral-200 dark:bg-neutral-800" : ""
                      )}
                    >
                      {IconComponent && (
                        <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "text-black dark:text-white",
                          isSelected ? "font-semibold" : "font-normal"
                        )}
                      >
                        {option.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    {t("title.close")}
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

SingleSelect.displayName = "SingleSelect";
