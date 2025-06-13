export const DisplayPriceInRupees = (price) => {
    return `₹${price}`
}

export const pricewithDiscount = (price, discount) => {
    if (!discount || discount === 0) {
        return price
    }
    const discountAmount = (price * discount) / 100
    return Math.round(price - discountAmount)
} 