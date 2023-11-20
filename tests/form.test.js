// addinvestor.test.js

// Import the addInvestor function
const { addInvestor, deleteInvestor, validateAndConvert } = require('../scripts/index.js');
const { prorate } = require('../scripts/prorate.js');

// Mock the alert function to capture alerts during tests
global.alert = jest.fn();

// Mock the necessary DOM elements
document.body.innerHTML = `
    <div id="allocation">
        <input type="number" step="any" min="0" class="form-control col-md-4" placeholder="$ Allocation" required/>
    </div>
    <div id="investors">
        <div class="row mb-3">
            <input type="text" class="form-control col-md-3 mr-md-2 mb-2" placeholder="Name" required/>
            <input type="number" step="any" min="0" class="form-control col-md-3 mr-md-2 mb-2" placeholder="$ Requested Amount" required/>
            <input type="number" step="any" min="0" class="form-control col-md-3 mb-2" placeholder="$ Average Amount" required/>
        </div>
    </div>
    <div id="result"></div>
`;

test('addInvestor adds a new investor row to the DOM', () => {
    // Call the addInvestor function
    addInvestor();

    // Retrieve the investorsDiv after adding an investor
    const investorsDiv = document.getElementById('investors');

    // Check if a new investor row is added
    expect(investorsDiv.children.length).toBe(2);

    // Check if the new investor row contains the expected HTML structure
    const investorRow = investorsDiv.children[0];
    expect(investorRow.className).toBe('row mb-3');

    // Check if the new investor row contains the expected input elements
    const nameInput = investorRow.querySelector('input[placeholder="Name"]');
    expect(nameInput).toBeTruthy();
    expect(nameInput.type).toBe('text');

    const requestedAmountInput = investorRow.querySelector('input[placeholder="$ Requested Amount"]');
    expect(requestedAmountInput).toBeTruthy();
    expect(requestedAmountInput.type).toBe('number');

    const averageAmountInput = investorRow.querySelector('input[placeholder="$ Average Amount"]');
    expect(averageAmountInput).toBeTruthy();
    expect(averageAmountInput.type).toBe('number');
});

test('deleteInvestor removes the investor row from the DOM', () => {
    // Call the addInvestor function twice to add two investor rows
    addInvestor();
    addInvestor();

    // Retrieve the investorsDiv after adding investors
    const investorsDiv = document.getElementById('investors');

    // Check if there are initially four investor rows
    expect(investorsDiv.children.length).toBe(4); // Update the expected value to 3

    // Retrieve the delete buttons for the investor rows
    const deleteButtons = investorsDiv.querySelectorAll('button.btn-danger');

    // Call the deleteInvestor function for the first investor row
    deleteInvestor(deleteButtons[0]);

    // Check if there is now only three investor rows
    expect(investorsDiv.children.length).toBe(3); // Update the expected value to 2

    // Call the deleteInvestor function for the second investor row
    deleteInvestor(deleteButtons[1]);

    // Check if there are no investor rows left
    expect(investorsDiv.children.length).toBe(2); // Update the expected value to 1
});

test('validateAndConvert displays alert for invalid allocation input', () => {
    // Mock the alert function to capture alerts during tests
    global.alert = jest.fn();

    // Set an invalid allocation input value
    document.querySelector('#allocation input').value = '-10';

    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Call the validateAndConvert function
    validateAndConvert(mockEvent);

    // Check if the alert function was called with the expected message
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid positive number for Allocation.");
});

test('validateAndConvert displays alert for invalid numeric input in investor form', () => {
    // Mock the alert function to capture alerts during tests
    global.alert = jest.fn();

    //Set valid allocation value
    document.querySelector('#allocation input').value = '199';

    // Set invalid numeric input values in the investor form
    document.querySelector('#investors .row input[placeholder="Name"]').value = 'Investor A';
    document.querySelector('#investors .row input[placeholder="$ Requested Amount"]').value = '-5';
    document.querySelector('#investors .row input[placeholder="$ Average Amount"]').value = 'abc';

    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Call the validateAndConvert function
    validateAndConvert(mockEvent);

    // Check if the alert function was called with the expected message
    expect(global.alert).toHaveBeenCalledWith("Please enter valid positive numbers for Requested Amount and Average Amount.");
});
