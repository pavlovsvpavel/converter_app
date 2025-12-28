import React, {forwardRef} from 'react';
import {
    Text as DefaultText,
    View as DefaultView,
    TouchableOpacity as DefaultTouchableOpacity,
    TextProps,
    ViewProps,
    TouchableOpacityProps,
    TextInput as DefaultTextInput, TextInputProps,
} from 'react-native';

import {Link as DefaultLink, LinkProps} from "expo-router";

type AppTextProps = TextProps & {
    weight?: FontWeight;
};

type FontWeight = 'normal' | 'semibold' | 'bold' | 'light' | 'italic';

export function Text({weight = 'normal', className, ...props}: AppTextProps) {
    const weightToClassMap: Record<FontWeight, string> = {
        normal: 'font-ubuntu-normal',
        bold: 'font-ubuntu-bold',
        semibold: 'font-ubuntu-semibold',
        light: 'font-ubuntu-light',
        italic: 'font-ubuntu-italic',
    };

    const finalClassName = `${weightToClassMap[weight]} ${className || ''}`;

    return <DefaultText className={finalClassName} {...props} />;
}

type AppTextInputProps = TextInputProps & {
    weight?: FontWeight;
};

export const TextInput = forwardRef<DefaultTextInput, AppTextInputProps>(
    ({weight = 'normal', className, ...props}, ref) => {
        const weightToClassMap: Record<FontWeight, string> = {
            normal: 'font-ubuntu-normal',
            bold: 'font-ubuntu-bold',
            semibold: 'font-ubuntu-semibold',
            light: 'font-ubuntu-light',
            italic: 'font-ubuntu-italic',
        };

        const finalClassName = `${weightToClassMap[weight]} ${className || ''}`;

        // 3. Pass the 'ref' prop down to DefaultTextInput
        return <DefaultTextInput ref={ref} className={finalClassName} {...props} />;
    }
);

type AppLinkProps = LinkProps & {
    weight?: FontWeight;
    className?: string;
};

export function Link({
                         href,
                         weight,
                         className,
                         children,
                         ...rest
                     }: AppLinkProps) {
    return (
        <DefaultLink href={href} asChild {...rest}>
            <Text weight={weight} className={className}>
                {children}
            </Text>
        </DefaultLink>
    );
}

export function View(props: ViewProps) {
    return <DefaultView {...props} />;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
    return <DefaultTouchableOpacity {...props} />;
}
