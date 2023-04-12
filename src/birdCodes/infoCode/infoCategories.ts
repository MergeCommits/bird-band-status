export const infoCategories = [
    "Sample",
    "Capture Method",
    "Visual Aux Marker",
    "Electronic Aux Marker",
    "Other",
] as const;

export type InfoCategory = (typeof infoCategories)[number];
// Samples (includes swabs)
// Capture methods
// Other (20, 11, 09)
// Visual aux marker
// Electronic aux marker
