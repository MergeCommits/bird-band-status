export const infoCategories = [
    "Sample",
    "Capture Method",
    "Visual Aux Marker",
    "Electronic Aux Marker",
    "Other",
] as const;

export type InfoCategory = (typeof infoCategories)[number];
