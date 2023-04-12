import type { BirdStatusCode } from "birdCodes/statusCode/validStatusCodes";

type BirdStatusCodeDescription = {
    description: string;
    definition: string;
};

export const birdStatusCodeDetails: {
    [key in BirdStatusCode]: BirdStatusCodeDescription;
} = {
    2: {
        description: "Transported",
        definition:
            "Transported to a different 10-minute block, but otherwise normal wild bird (requires an additional permit from Federal Law Enforcement and/or State agencies): may or may not be held for longer than 24 hours. Banding location, age, sex, and date banded must be those at release. Capture location and date must be given in Remarks.",
    },
    3: {
        description: "Normal wild bird",
        definition:
            "Normal, wild bird: released in same 10-minute block as captured: held 24 hours or less.",
    },
    4: {
        description: "Hand-reared, game-farm or hacked bird",
        definition:
            "Hand-reared or hacked: raised in captivity from egg or taken as nestling or orphan. Banding location, age, sex, and date banded must be those at release. Hand-rearing may include transporting. If a hand-reared bird is also injured, use additional information code 85. Capture location and date must be given in Remarks.",
    },
    5: {
        description:
            "Sick, Exhausted, Over-stressed, Injured, or Physical Deformity",
        definition:
            "Sick, Exhausted, Over-stressed (or shock), Injured (old or new injury), or with a Physical Deformity; held 24 hours or less: may or may not be treated or transported. Requires an explanation in the Remarks.",
    },
    7: {
        description: "Rehabilitated and held",
        definition:
            'Rehabilitated and held longer than 24 hours: sick, exhausted, injured, or crippled: (assumes that transportation and/or blood sampling may be involved). Requires an explanation in "Remarks", including capture location, a short description of the injury and how long it was in captivity (under 250 characters). Rehab birds should NOT be banded before they are ready for release. Banding location, age, sex, and date banded must be those at release.',
    },
    8: {
        description:
            "Held for longer than 24 hours for experimental or other purposes",
        definition:
            "Held for longer than 24 hours for experimental or other purposes (including falconry under Federal and State falconry permits) otherwise normal, wild. Status 8 may include transporting, but if held only for transporting use status code 2. Holding for experimentation and transporting both require an additional permit from Fish and Wildlife Service Regional Office and/or State agencies. Age, sex, and banding date must be those at release. Requires an explanation in Remarks, including capture date and location.",
    },
};
