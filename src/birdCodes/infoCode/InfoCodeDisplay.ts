import type {
    InfoCodeDescription,
    InfoCodeDescriptionWithBling,
} from "birdCodes/infoCode/infoCodeDetails";
import { infoCodeDetails } from "birdCodes/infoCode/infoCodeDetails";
import type { InfoCode } from "birdCodes/infoCode/validInfoCodes";

export function displayInfoCode(code: InfoCode): string {
    return code.toString().padStart(2, "0");
}

function buildWithAuxVariant(info: InfoCodeDescription): InfoCodeDescription {
    return {
        shortDescription: `${info.shortDescription}, plus one or more auxiliary markers used`,
        longDescription: `${info.longDescription} All markers must be described in marker-related fields.`,
        onlyWith: info.onlyWith,
        notWith: info.notWith,
    };
}

type GetDisplayInfoCodeDescriptionReturnType = {
    [key in InfoCode]: InfoCodeDescription;
};

export function getDisplayInfoCodeDescription(): GetDisplayInfoCodeDescriptionReturnType {
    const details = infoCodeDetails;

    const detailsWithoutBling = Object.fromEntries(
        Object.entries(details).filter(([, value]) => !("bling" in value))
    ) as GetDisplayInfoCodeDescriptionReturnType;
    const detailsWithBling = Object.fromEntries(
        Object.entries(details).filter(([, value]) => "bling" in value)
    );

    const detailsWithBlingAux = Object.fromEntries(
        Object.entries(detailsWithBling).map(([key, value]) => {
            const bling = (value as InfoCodeDescriptionWithBling).bling;
            return [key, buildWithAuxVariant(detailsWithoutBling[bling])];
        })
    );

    const allDetails = {
        ...detailsWithoutBling,
        ...detailsWithBlingAux,
    };

    const allDetailsWithApproval = Object.fromEntries(
        Object.entries(allDetails).map(([key, value]) => {
            return [
                key,
                {
                    ...value,
                    longDescription: `${value.longDescription} Approval from the appropriate Banding Office is needed for auxiliary markers.`,
                },
            ];
        })
    ) as GetDisplayInfoCodeDescriptionReturnType;

    return allDetailsWithApproval;
}
