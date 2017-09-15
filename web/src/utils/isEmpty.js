export default function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};