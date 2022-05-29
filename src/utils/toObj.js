export function withoutFunc(obj) {
    for (const key in obj)
        if (Object.hasOwnProperty.call(obj, key) && typeof obj[key] == "function")
            obj[key] = obj[key](this);

    return obj;
}