const infoInputCodes = [
    1, 2, 3, 4, 6, 7, 8, 9, 11, 14, 16, 18, 20, 33, 39, 40, 51, 59, 69, 70, 75,
    80, 81, 87, 90,
] as const;

const OtherOutputInfoCodes = [0, 25, 85] as const;

const infoCodes = [
    10,
    12,
    15,
    17,
    19,
    21,
    29,
    30,
    34,
    41,
    71,
    88,
    ...infoInputCodes,
    ...OtherOutputInfoCodes,
] as const;

export type InfoCodeInput = (typeof infoInputCodes)[number];
export type InfoCode = (typeof infoCodes)[number];
export type OtherOutputInfoCode = (typeof OtherOutputInfoCodes)[number];
