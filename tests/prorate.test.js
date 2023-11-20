// prorate.test.js
// Import the prorate function
const { prorate } = require('../scripts/prorate.js');

// Mock the alert function to capture alerts during tests
global.alert = jest.fn();

// Define test cases
test('test simple 1 json data', () => {
    // Mock the event object (you can customize this based on your needs)
    const event = { preventDefault: jest.fn() };

    // Define test input data
    const formData = require('../data/simple_1_input.json');

    // Call the prorate function with the test data
    const proratedInvestorsAmounts = prorate(event, formData);

    // Validate that the alert function was not called (no validation errors)
    expect(alert).not.toHaveBeenCalled();

    // Validate the proratedInvestorsAmounts
    expect(proratedInvestorsAmounts).toEqual([
        {
            final_amount: 80,
            name: 'Investor A',
        },
        {
            final_amount: 20,
            name: 'Investor B',
        },
    ]);
});

test('test simple 2 json data', () => {
    // Mock the event object (you can customize this based on your needs)
    const event = { preventDefault: jest.fn() };

    // Define test input data
    const formData = require('../data/simple_2_input.json');

    // Call the prorate function with the test data
    const proratedInvestorsAmounts = prorate(event, formData);

    // Validate that the alert function was not called (no validation errors)
    expect(alert).not.toHaveBeenCalled();

    // Validate the proratedInvestorsAmounts
    expect(proratedInvestorsAmounts).toEqual([
        {
            final_amount: 100,
            name: 'Investor A',
        },
        {
            final_amount: 25,
            name: 'Investor B',
        },
    ]);
});

test('test complex 1 json data', () => {
    // Mock the event object (you can customize this based on your needs)
    const event = { preventDefault: jest.fn() };

    // Define test input data
    const formData = require('../data/complex_1_input.json');

    // Call the prorate function with the test data
    const proratedInvestorsAmounts = prorate(event, formData);

    // Validate that the alert function was not called (no validation errors)
    expect(alert).not.toHaveBeenCalled();

    // Validate the proratedInvestorsAmounts
    expect(proratedInvestorsAmounts).toEqual([
        {
            final_amount: 97.96875,
            name: 'Investor A',
        },
        {
            final_amount: 1.03125,
            name: 'Investor B',
        },
        {
            final_amount: 1,
            name: 'Investor C',
        },
    ]);
});

test('test complex 2 json data', () => {
    // Mock the event object (you can customize this based on your needs)
    const event = { preventDefault: jest.fn() };

    // Define test input data
    const formData = require('../data/complex_2_input.json');

    // Call the prorate function with the test data
    const proratedInvestorsAmounts = prorate(event, formData);

    // Validate that the alert function was not called (no validation errors)
    expect(alert).not.toHaveBeenCalled();

    // Validate the proratedInvestorsAmounts
    expect(proratedInvestorsAmounts).toEqual([
        {
            final_amount: 98,
            name: 'Investor A',
        },
        {
            final_amount: 1,
            name: 'Investor B',
        },
        {
            final_amount: 1,
            name: 'Investor C',
        },
    ]);
});

