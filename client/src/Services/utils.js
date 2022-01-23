/* Map the errors array to an object containing a key-value pair where the key
    is the field name and the value is the error message
*/
export function validationArrayToObject(array) {
    let obj = {};

    array.forEach(field => {
        obj[field.param] = field.msg;
    });

    return obj;
}