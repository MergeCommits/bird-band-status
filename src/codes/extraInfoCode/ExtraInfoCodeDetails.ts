import type { BirdStatusCode } from "codes/birdStatusCodes/ValidBirdCodes";

type ExtraInfoCodeDescription = {
    shortDescription: string;
    longDescription: string;
    onlyWith?: BirdStatusCode[];
    notWith?: BirdStatusCode[];
};

export const extraInfoCodeDetails: {
    [key in number]: ExtraInfoCodeDescription;
} = {
    0: {
        shortDescription: "Federal numbered metal band only",
        longDescription: "Federal numbered metal band only.",
    },
};
