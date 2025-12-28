import { EXCHANGE_RATE } from "@/constants/currency";
import {calculateChange, convertCurrency} from "@/utils/calculations";

describe('Currency Converter Logic', () => {

    test('converts 100 EUR to BGN correctly', () => {
        const result = convertCurrency(100, true);
        const expected = (100 * EXCHANGE_RATE).toFixed(2);
        expect(result).toBe(expected);
    });

    test('converts 100 BGN to EUR correctly', () => {
        const result = convertCurrency(100, false);
        const expected = (100 / EXCHANGE_RATE).toFixed(2);
        expect(result).toBe(expected);
    });

    test('handles 0 or Invalid inputs', () => {
        expect(convertCurrency(0, true)).toBe('0.00');
        expect(convertCurrency(NaN, true)).toBe('0.00');
    });
});

describe('Change Calculator Logic', () => {

    test('calculates simple change in EUR', () => {
        // Bill: 10 EUR, Paid: 20 EUR
        const result = calculateChange(10, 20, true);

        expect(result.eur).toBe('10.00');
        expect(result.isNegative).toBe(false);
    });

    test('calculates mixed currency change (Bill EUR, Paid BGN)', () => {
        // Bill: 10 EUR, Paid: 20 BGN
        // 20 BGN is approx 10.22 EUR
        // Change should be approx 0.22 EUR
        const result = calculateChange(10, 20, false);

        // 20 BGN / 1.95583 = 10.2258 EUR
        // 10.2258 - 10 = 0.2258 EUR
        expect(result.eur).toBe('0.23');
        expect(result.isNegative).toBe(false);
    });

    test('detects insufficient funds (Negative Change)', () => {
        // Bill: 50 EUR, Paid: 10 EUR
        const result = calculateChange(50, 10, true);

        expect(result.isNegative).toBe(true);
        expect(result.eur).toBe('-40.00');
    });
});