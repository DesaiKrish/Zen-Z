import { ApiError } from "./ApiError.js";

const convert = (date) => {
    const [day, month, year] = date.split('-').map(num => parseInt(num, 10));
    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
        throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
    }

    const parsedDate = new Date(year, month - 1, day+1);

    if (isNaN(parsedDate.getTime())) {
        throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
    }

    return parsedDate;
}

export { convert }
