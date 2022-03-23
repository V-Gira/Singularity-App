import { InternationalizationService } from "./internationalization/InternationalizationService";


export function getDefaultInjections() {
  const internationalizationService = InternationalizationService();
  return { internationalizationService };
}

export type IInjections = ReturnType<typeof getDefaultInjections>;
