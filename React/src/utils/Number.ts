import {isInteger} from "lodash";

function calculatePercentage(amount: number, total: number, fixed: number = 1) {
    if(amount === 0 || total === 0) {
        return 0
    }


    const percentage = (amount / total) * 100

    return isInteger(percentage) ? percentage : parseFloat(percentage.toFixed(fixed))

}

export {
    calculatePercentage
}