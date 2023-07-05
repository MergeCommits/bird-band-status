import type { InfoCategory } from "birdCodes/infoCode/infoCategories";
import type {
    InfoCode,
    InfoCodeInput,
} from "birdCodes/infoCode/validInfoCodes";
import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";

type BaseDetails = {
    onlyWith?: BirdStatusCode[];
    notWith?: BirdStatusCode[];
};

type InfoInputCodeDetails = BaseDetails &
    (
        | {
              category: "Visual Aux Marker" | "Electronic Aux Marker";
              auxMarkerVariant?: Exclude<InfoCode, InfoCodeInput>;
          }
        | {
              category: Exclude<
                  InfoCategory,
                  "Visual Aux Marker" | "Electronic Aux Marker"
              >;
              auxMarkerVariant: Exclude<InfoCode, InfoCodeInput>;
          }
    );

export const infoCodeInputDetails: {
    [key in InfoCodeInput]: InfoInputCodeDetails;
} = {
    1: {
        category: "Visual Aux Marker",
    },
    2: {
        category: "Visual Aux Marker",
    },
    3: {
        onlyWith: [3],
        category: "Visual Aux Marker",
    },
    4: {
        onlyWith: [3],
        category: "Visual Aux Marker",
    },
    6: {
        category: "Visual Aux Marker",
        auxMarkerVariant: 29,
    },
    7: {
        category: "Visual Aux Marker",
        auxMarkerVariant: 30,
    },
    8: {
        category: "Visual Aux Marker",
    },
    9: {
        onlyWith: [2, 3, 4, 8],
        category: "Other",
        auxMarkerVariant: 10,
    },
    11: {
        category: "Other",
        auxMarkerVariant: 12,
    },
    14: {
        category: "Sample",
        auxMarkerVariant: 15,
    },
    16: {
        category: "Sample",
        auxMarkerVariant: 17,
    },
    18: {
        notWith: [7],
        category: "Sample",
        auxMarkerVariant: 19,
    },
    20: {
        category: "Other",
        auxMarkerVariant: 21,
    },
    33: {
        notWith: [7],
        category: "Capture Method",
        auxMarkerVariant: 34,
    },
    39: {
        category: "Visual Aux Marker",
    },
    40: {
        onlyWith: [4, 5, 7],
        category: "Other",
        auxMarkerVariant: 41,
    },
    51: {
        category: "Visual Aux Marker",
    },
    59: {
        category: "Visual Aux Marker",
    },
    69: {
        category: "Visual Aux Marker",
    },
    70: {
        onlyWith: [2, 3, 5, 8],
        category: "Capture Method",
        auxMarkerVariant: 71,
    },
    75: {
        category: "Electronic Aux Marker",
    },
    80: {
        category: "Electronic Aux Marker",
    },
    81: {
        category: "Electronic Aux Marker",
    },
    87: {
        notWith: [4],
        category: "Capture Method",
        auxMarkerVariant: 88,
    },
    90: {
        category: "Electronic Aux Marker",
    },
};
