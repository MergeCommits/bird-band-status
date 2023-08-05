// resources.ts file is generated with `yarn interface`
import type Resources from "@types/resources.d.ts";

declare module "i18next" {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: Resources;
    }
}
