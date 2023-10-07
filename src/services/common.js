export function getLastItem(array) {
    if (Array.isArray(array) && array.length > 0) {
        return [...array[array.length - 1]];
    } else {
        return null;
    }
}
