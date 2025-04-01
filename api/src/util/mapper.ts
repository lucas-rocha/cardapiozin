export function mapper<T extends Record<string, any>>(obj: Partial<T>, constructor: new (...args: any[]) => T): T {
    const mappedObject = new constructor(...Object.values(obj));
    return Object.assign(mappedObject, obj);
}