export const formatNumber = (amount) => {
    let total = Math.abs(amount)
    total = total.toFixed(2)

    const totalSplit = total.split('.')

    let intPart = totalSplit[0]
    if (intPart.length > 3) {
        intPart = intPart.substr(0, intPart.length - 3) + ',' + intPart.substr(intPart.length - 3, intPart.length)
    }

    let decPart = totalSplit[1]

    return intPart + '.' + decPart
}