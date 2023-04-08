const statuses = {
    2: {
        name: "Transported",
        description:
            "Transported to a different 10-minute block, but otherwise normal wild bird (requires an additional permit from Federal Law Enforcement and/or State agencies): may or may not be held for longer than 24 hours. Banding location, age, sex, and date banded must be those at release. Capture location and date must be given in Remarks.",
        exclusions: [3, 4, 40, 41],
    },
    3: {
        name: "Normal wild bird",
        description:
            "Normal, wild bird: released in same 10-minute block as captured: held 24 hours or less.",
        exclusions: [40, 41],
    },
    4: {
        name: "Hand-reared, game-farm or hacked bird",
        description:
            "Hand-reared or hacked: raised in captivity from egg or taken as nestling or orphan. Banding location, age, sex, and date banded must be those at release. Hand-rearing may include transporting. If a hand-reared bird is also injured, use additional information code 85. Capture location and date must be given in Remarks.",
        exclusions: [3, 4, 70, 71, 87, 88],
    },
    5: {
        name: "Sick, Exhausted, Over-stressed, Injured, or Physical Deformity",
        description:
            "Sick, Exhausted, Over-stressed (or shock), Injured (old or new injury), or with a Physical Deformity; held 24 hours or less: may or may not be treated or transported. Requires an explanation in the Remarks.",
        exclusions: [3, 4, 9, 10],
    },
    7: {
        name: "Rehabilitated and held",
        description:
            'Rehabilitated and held longer than 24 hours: sick, exhausted, injured, or crippled: (assumes that transportation and/or blood sampling may be involved). Requires an explanation in "Remarks", including capture location, a short description of the injury and how long it was in captivity (under 250 characters). Rehab birds should NOT be banded before they are ready for release. Banding location, age, sex, and date banded must be those at release.',
        exclusions: [3, 4, 9, 10, 18, 19, 33, 34, 70, 71],
    },
    8: {
        name: "Held for longer than 24 hours for experimental or other purposes",
        description:
            "Held for longer than 24 hours for experimental or other purposes (including falconry under Federal and State falconry permits) otherwise normal, wild. Status 8 may include transporting, but if held only for transporting use status code 2. Holding for experimentation and transporting both require an additional permit from Fish and Wildlife Service Regional Office and/or State agencies. Age, sex, and banding date must be those at release. Requires an explanation in Remarks, including capture date and location.",
        exclusions: [3, 4, 40, 41],
    },
};

type BirdStatusCode = keyof typeof statuses;

const test: BirdStatusCode = 1;

function getAdditionalInformationCode() {
    return 0;
}
