
export const isAdult = (age) => {
    if (age >= 18) {
        return "yes";
    } else {
        return "no";
    }
}

export const canDrink = (age) => {
    if (age >= 21) {
        return true;
    } else {
        return false;
    }
}