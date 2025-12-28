import React from "react";

export type IconName<T extends React.ComponentType<any>> = React.ComponentProps<T>['name'];
export interface TabIconProps {
    focused: boolean;
    color: string;
    size: number;
    name: IconName<typeof Ionicons>;
}

export interface CurrencySwitchProps {
    isLeftActive: boolean;
    onToggle: (val: boolean) => void;
    leftLabel?: string;
    rightLabel?: string;
}

export interface CurrencyInputProps {
    value: string;
    onChangeText: (val: string) => void;
    currencyLabel: string;
    placeholder?: string;
}