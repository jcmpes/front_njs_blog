export default function compareValues(key, order = 'asc') {
    return function compare(a, b) {
        let comparison = 0;
        if (a[key] > b[key]) {
            comparison = -1;
        } else if (a[key] < b[key]) {
            comparison = 1
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        )
    }
}