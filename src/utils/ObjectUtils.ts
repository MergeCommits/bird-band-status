export function getObjectEntriesAsArray<T>(object: Record<string, T>): T[] {
    return Object.entries(object).map(([, value]) => value);
}
