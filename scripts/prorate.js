function prorate(event, formData) {
    event.preventDefault();
    const allocationAmount = formData.allocation_amount;
    const investorsAmounts = formData.investor_amounts;

    // Calculate proration based on the specified requirements
    const totalRequestedAmount = investorsAmounts.reduce((total, investor) => total + investor.requested_amount, 0);
    const totalAverageAmount = investorsAmounts.reduce((total, investor) => total + investor.average_amount, 0);

    if (allocationAmount > totalRequestedAmount) {
        // No proration needed, allocate as requested
        return investorsAmounts.map(investor => ({
            name: investor.name,
            final_amount: investor.requested_amount,
        }));
    } else {
        // Calculate proration based on average amount
        const prorationFactors = investorsAmounts.map(investor => ({
            name: investor.name,
            factor: investor.average_amount / totalAverageAmount,
        }));

        return investorsAmounts.map(investor => ({
            name: investor.name,
            final_amount: allocationAmount * prorationFactors.find(current => current.name === investor.name).factor,
        }));
    }
}
module.exports = { prorate };
