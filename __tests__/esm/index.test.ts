/**
 * 僅能用於能輸出為 esm 模塊測試
 */
import { jest } from '@jest/globals';

beforeEach(() => {
    jest.spyOn(console, 'log');
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Test ESM', () => {
    it('應為 truthy', () => {
        expect(import.meta).toBeTruthy();
    });
});