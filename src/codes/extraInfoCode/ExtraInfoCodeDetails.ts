import type { BirdStatusCode } from "codes/birdStatusCodes/ValidBirdCodes";
import type { ExtraInfoCode } from "codes/extraInfoCode/ValidExtraInfoCodes";

export type ExtraInfoCodeDescription = {
    shortDescription: string;
    longDescription?: string;
    onlyWith?: BirdStatusCode[];
    notWith?: BirdStatusCode[];
};

export type ExtraInfoCodeDescriptionWithBling = {
    bling: ExtraInfoCode;
};

export const extraInfoCodeDetails: {
    [key in ExtraInfoCode]:
        | ExtraInfoCodeDescription
        | ExtraInfoCodeDescriptionWithBling;
} = {
    0: {
        shortDescription: "Federal numbered metal band only",
        longDescription: "Federal numbered metal band only.",
    },
    1: {
        shortDescription: "Colored leg band(s): plastic, metal, paint, tape",
        longDescription:
            "Colored leg band(s) of plastic or metal - This applies to painted or anodized Federal bands as well as colored tape over bands. Note: two metal bands should never be used on the same tarsus. Approval from the appropriate Banding Office is needed for use of colored leg bands.",
    },
    2: {
        shortDescription: "Neck collar - usually coded",
        longDescription:
            "Neck collar - Collar codes and colors must be reported in marker-related fields. Approval from the appropriate Banding Office is needed for use of neck collars.",
    },
    3: {
        shortDescription: "Reward band (Federal or State)",
        longDescription:
            "Reward band (Federal or State) - Approval from the appropriate Banding Office is needed for reward band use.",
        onlyWith: [3],
    },
    4: {
        shortDescription: "Control band (Reward band studies only)",
        longDescription:
            "Control band - For use in conjunction with reward band studies only.",
        onlyWith: [3],
    },
    6: {
        shortDescription:
            "Misc. metal band (State, Provincial etc) with address or telephone number, plus Federal band",
        longDescription:
            "Miscellaneous band - Metal bands with an additional address or telephone number, including State or Provincial bands, private organizations bands, and rarely banders. Explanation must be given in the Remarks field. Approval from the appropriate Banding Office is needed to use miscellaneous bands. Field-Readable bands and coded colored leg bands are not included here.",
    },
    7: {
        shortDescription:
            "Double-banded (Two Federal bands placed on a bird at the same time)",
        longDescription:
            "Two Federal bands placed on a bird at the same time. One Federal band on each tarsus -- two metal bands cannot be used on the same tarsus. This code does not apply to a bird to whom a second band was added at a subsequent encounter. Approval from the appropriate Banding Office is needed for double-banding.",
    },
    8: {
        shortDescription:
            "Temporary markers: Paint or dye; other temporary markers on feathers (imping, tape on tail)",
        longDescription:
            "Temporary markers - Any part of bird painted or dyed, or other temporary markers on feathers (e.g., imping, tail streamers, etc.). Approval from the appropriate Banding Office is needed for use of temporary markers on birds.",
    },
    9: {
        shortDescription:
            "All flight feathers on one or both wings clipped or pulled upon release",
        longDescription:
            "All flight feathers on one or both wings clipped or pulled upon release.",
        onlyWith: [2, 3, 4, 8],
    },
    10: {
        bling: 9,
    },
    11: {
        shortDescription: "Sexed by laparotomy or laparoscopy",
    },
    12: {
        bling: 11,
    },
    14: {
        shortDescription: "Mouth swab",
    },
    15: {
        bling: 14,
    },
    16: {
        shortDescription: "Tracheal swab",
    },
    17: {
        bling: 16,
    },
    18: {
        shortDescription: "Blood sample taken",
        longDescription:
            "Blood sample taken (contact the appropriate Bird Banding Office for the required permit).",
        notWith: [7],
    },
    19: {
        bling: 18,
    },
    20: {
        shortDescription: "Fostered or cross-fostered into wild nests",
    },
    21: {
        bling: 20,
    },
    25: {
        shortDescription: "Two or more types of auxiliary markers",
        longDescription:
            "Two or more types of auxiliary markers (e.g., neck collar and color leg band or wing tag and radio transmitter). All markers must be described in marker-related fields. Approval from the appropriate Banding Office is needed for use of auxiliary markers.",
    },
    29: {
        shortDescription:
            "Miscellaneous band, Federal band, plus auxiliary marker(s)",
        longDescription:
            "Miscellaneous band (see 06), Federal band, plus one or more auxiliary marker. All markers must be described in marker-related fields. Describe miscellaneous band type in Remarks. Approval from the appropriate Banding Office is needed for use of miscellaneous bands and auxiliary markers.",
    },
    30: {
        shortDescription:
            "Double-banded with Federal bands, plus auxiliary marker(s)",
        longDescription:
            "Double banded with TWO Federal bands (see 07), plus one or more auxiliary marker. All markers must be described in marker-related fields. Approval from the appropriate Banding Office is needed for double banding and the use of auxiliary markers. This code does not apply to a bird to whom a second band was added at a subsequent encounter.",
    },
    33: {
        shortDescription:
            "Taken from an artificial nest structure (eg, nest boxes, platforms, etc)",
        longDescription:
            "Taken from an artificial nest structure (e.g., nest boxes, platforms, etc.). Includes hacked birds as code 433.",
        notWith: [7],
    },
    34: {
        bling: 33,
    },
    39: {
        shortDescription: "Wing, patagial, head, back, and/or nape tag(s)",
        longDescription:
            "Wing, patagial, head, back, and/or nape tag(s). All markers must be described in marker-related fields. Approval from the appropriate Banding Office is needed for use of patagial markers.",
    },
    40: {
        shortDescription: "Oiled",
        onlyWith: [4, 5, 7],
    },
    41: {
        bling: 40,
    },
    51: {
        shortDescription: "Nasal saddle and nasal discs or other bill marker",
        longDescription:
            "Nasal saddle and nasal discs or other bill marker - Marker must be described in marker-related fields and in Remarks if necessary. Approval from the appropriate Banding Office is needed for use of nasal saddles and nasal discs.",
    },
    59: {
        shortDescription: "Web tagged, usually coded",
        longDescription:
            "Web tagged - Marker must be described in marker-related fields. Approval from the appropriate Banding Office is needed for use of web tags.",
    },
    69: {
        shortDescription: "Flag, streamer, or tab on leg",
        longDescription:
            "Flag, streamer, or tab on leg - Marker must be described in marker-related fields. Approval from the appropriate Banding Office is needed for use of leg markers.",
    },
    70: {
        shortDescription: "Captured by spotlighting",
        onlyWith: [2, 3, 5, 8],
    },
    71: {
        bling: 70,
    },
    75: {
        shortDescription: "PIT tag",
        longDescription:
            "Equipped with PIT tag only (see also additional information code 25) - Marker must be described in marker-related fields. Frequency and type of attachment may be listed in Remarks. Approval from the appropriate Banding Office is needed for use of PIT tags.",
    },
    80: {
        shortDescription: "Satellite/Cell/GPS transmitter",
        longDescription:
            "Equipped with Satellite/Cell/GPS transmitter only (see also additional information code 25) - Marker must be described in marker-related fields. Frequency and type of attachment may be listed in Remarks. Approval from the appropriate Banding Office is needed for use of Satellite/Cell/GPS transmitters.",
    },
    81: {
        shortDescription: "Radio transmitter",
        longDescription:
            "Equipped with radio transmitter only (see also additional information code 25) - Marker must be described in marker-related fields. Frequency and type of attachment may be listed in Remarks. Approval from the appropriate Banding Office is needed for use of radio transmitters.",
    },
    85: {
        shortDescription:
            "Miscellaneous (combination or situation not covered by other ai codes)",
        longDescription:
            "Miscellaneous (combination or situation not covered by other additional information codes) - An explanation is needed in Remarks. For example, a bird that was color-banded, sexed by laparotomy, and blood-sampled would be 385 with an explanation 385 = C/B, laparotomy, blood sample. All markers must be described in marker-related fields. Approval from the appropriate Banding Office may be needed.",
    },
    87: {
        shortDescription: "Captured with drugs or tranquilizers",
        longDescription:
            "Miscellaneous (combination or situation not covered by other additional information codes) - An explanation is needed in Remarks. For example, a bird that was color-banded, sexed by laparotomy, and blood-sampled would be 385 with an explanation 385 = C/B, laparotomy, blood sample. All markers must be described in marker-related fields. Approval from the appropriate Banding Office may be needed.",
        notWith: [4],
    },
    88: {
        bling: 87,
    },
    90: {
        shortDescription: "Data logger (including geolocators)",
        longDescription:
            "Equipped with data logger only (see also additional information code 25) - Marker must be described in marker-related fields. Frequency and type of attachment may be listed in Remarks. Approval from the appropriate Banding Office is needed for use of data loggers.",
    },
};
