import {EXCHANGE_RATE} from "@/constants/currency";

export const convertCurrency = (amount: number, isEuroToBgn: boolean): string => {
    if (isNaN(amount) || amount === 0) return '0.00';

    const result = isEuroToBgn ? amount * EXCHANGE_RATE : amount / EXCHANGE_RATE;
    return result.toFixed(2);
};

export const calculateChange = (bill: number, given: number, givenIsEuro: boolean) => {
    if (isNaN(bill) || isNaN(given)) return {eur: '0.00', bgn: '0.00', isNegative: false};

    const givenInEuro = givenIsEuro ? given : given / EXCHANGE_RATE;

    const diffInEuro = givenInEuro - bill;
    const diffInBgn = diffInEuro * EXCHANGE_RATE;

    return {
        eur: diffInEuro.toFixed(2),
        bgn: diffInBgn.toFixed(2),
        isNegative: diffInEuro < 0
    };
};