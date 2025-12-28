import React, {useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity} from '@/components/Themed';
import {Ionicons} from "@expo/vector-icons";
import {CurrencyInputProps} from "@/interfaces/interfaces";
import {Pressable} from "react-native";


export default function CurrencyInput({
                                          value,
                                          onChangeText,
                                          currencyLabel,
                                          placeholder = "0.00"
                                      }: CurrencyInputProps) {

    const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

    return (
        <View className="relative justify-center">
            <View className="absolute left-4 top-[13px] z-20 flex-row items-center gap-2">
                <Text className="text-gray-500 font-bold">
                    {currencyLabel}
                </Text>

                {value.length > 0 && (
                    <TouchableOpacity
                        onPress={() => onChangeText('')}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    >
                        <Ionicons name="close-circle" size={20} color="#9CA3AF"/>
                    </TouchableOpacity>
                )}
            </View>

            <Pressable
                className="absolute top-0 bottom-0 left-0 right-0 z-10"
                onPress={() => inputRef.current?.focus()}
            />

            <TextInput
                ref={inputRef}
                keyboardType="numeric"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                scrollEnabled={false}
                className="text-right input-default border-default text-primary w-full h-[50px] pl-24 pr-4 focus:border-blue-500"
                placeholderTextColor="#9CA3AF"
            />
        </View>
    );
}