export const validStatusCodes = [2, 3, 4, 5, 7, 8] as const;
export type BirdStatusCode = (typeof validStatusCodes)[number];
