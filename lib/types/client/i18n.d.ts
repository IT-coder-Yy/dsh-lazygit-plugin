export type Language = 'zh-CN' | 'en';
export declare function getLanguage(): Language;
export declare function setLanguage(next: Language): void;
export declare function useLanguage(): Language;
/** Translate only plugin-owned copy; interpolation values remain untouched. */
export declare function t(message: string, ...values: Array<string | number>): string;
export declare function messageText(message: string): string;
