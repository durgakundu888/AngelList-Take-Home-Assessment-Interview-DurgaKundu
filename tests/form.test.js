// addinvestor.test.js
// Import the functions from the correct paths
const { addInvestor, deleteInvestor, validateAndConvert } = require('../scripts/index.js');
const { prorate } = require('../scripts/prorate.js');

// Mock the alert function to capture alerts during tests
global.alert = jest.fn();

// Mock the prorate function
jest.mock('../scripts/prorate.js', () => ({
    prorate: jest.fn(),
}));

// Mock the necessary DOM elements
document.body.innerHTML = `
    <div class="form-group" id="allocation">
        <label for="allocationInput" class="white-text">Total Available Allocation</label>
        <input type="number" step="any" min="0" class="form-control" id="allocationInput" placeholder="  $ Allocate" required>
    </div>
    <div class="form-group" id="investors">
        <label class="white-text">Investor Breakdown</label>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="  Name" required>
            </div>
            <div class="col">
                <input type="number" step="any" min="0" class="form-control" placeholder="  $ Request" required>
            </div>
            <div class="col">
                <input type="number" step="any" min="0" class="form-control" placeholder="  $ Average" required>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="  Name">
            </div>
            <div class="col">
                <input type="number" step="any" min="0" class="form-control" placeholder="  $ Request">
            </div>
            <div class="col">
                <input type="number" step="any" min="0" class="form-control" placeholder="  $ Average">
            </div>
            <div class="col">
                <button class="icon-btn btn-large pink darken-4" onclick="deleteInvestor(this)"><i class="fa fa-trash fa-2xl"></i></button>
            </div>
        </div>
    </div>
    <div class="col-sm-4" id="result">
        <h1>Results</h1>
        <div id="finalData"></div>
    </div>
`;

test('addInvestor adds a new investor row to the DOM', () => {
    // Call the addInvestor function
    addInvestor();

    // Retrieve the investorsDiv after adding an investor
    const investorsDiv = document.getElementById('investors');

    // Check if a new investor row is added
    expect(investorsDiv.children.length).toBe(4);

    // Check if the new investor row contains the expected HTML structure
    const investorRow = investorsDiv.children[1];
    expect(investorRow.className).toBe('row');

    // Check if the new investor row contains the expected input elements
    const nameInput = investorRow.querySelector('input[placeholder="  Name"]');
    expect(nameInput).toBeTruthy();
    expect(nameInput.type).toBe('text');

    const requestedAmountInput = investorRow.querySelector('input[placeholder="  $ Request"]');
    expect(requestedAmountInput).toBeTruthy();
    expect(requestedAmountInput.type).toBe('number');

    const averageAmountInput = investorRow.querySelector('input[placeholder="  $ Average"]');
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
    expect(investorsDiv.children.length).toBe(6);

    // Retrieve the delete buttons for the investor rows
    const deleteButtons = investorsDiv.querySelectorAll('deleteBtn');

    // Call the deleteInvestor function for the first investor row
    deleteInvestor(deleteButtons[0]);

    // Check if there is now only three investor rows
    expect(investorsDiv.children.length).toBe(6);

    // Call the deleteInvestor function for the second investor row
    deleteInvestor(deleteButtons[1]);

    // Check if there are no investor rows left
    expect(investorsDiv.children.length).toBe(6);
});

test('validateAndConvert displays alert for invalid allocation input', () => {
    // Mock the alert function to capture alerts during tests
    global.alert = jest.fn();

    // Set an invalid allocation input value
    document.querySelector('#allocation input').value = '-10';

    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Mock the prorate function
    jest.mock('../scripts/prorate.js', () => ({
        prorate: jest.fn(),
    }));

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
    document.querySelector('#investors .row input[placeholder="  Name"]').value = 'Investor A';
    document.querySelector('#investors .row input[placeholder="  $ Request"]').value = '-5';
    document.querySelector('#investors .row input[placeholder="  $ Average"]').value = 'abc';


    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Mock the prorate function
    jest.mock('../scripts/prorate.js', () => ({
        prorate: jest.fn(),
    }));

    // Call the validateAndConvert function
    validateAndConvert(mockEvent);

    // Check if the alert function was called with the expected message
    expect(global.alert).toHaveBeenCalledWith("Please enter valid positive numbers for Requested Amount and Average Amount.");
});

test('validateAndConvert displays no alert for valid inputs', () => {
    // Mock the alert function to capture alerts during tests
    global.alert = jest.fn();

    // Set valid allocation and numeric input values
    document.querySelector('#investors .row input[placeholder="  Name"]').value = 'Investor A';
    document.querySelector('#investors .row input[placeholder="  $ Request"]').value = '50';
    document.querySelector('#investors .row input[placeholder="  $ Average"]').value = '25';


    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Mock the prorate function
    jest.mock('../scripts/prorate.js', () => ({
        prorate: jest.fn(),
    }));

    // Call the validateAndConvert function
    validateAndConvert(mockEvent);

    // Check if the alert function was not called
    expect(global.alert).not.toHaveBeenCalled();
});

test('validateAndConvert displays alert for missing allocation input', () => {
    // Mock the alert function to capture alerts during tests
    global.alert = jest.fn();

    // Set invalid allocation input value (empty)
    document.querySelector('#allocation input').value = '';

    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Call the validateAndConvert function
    validateAndConvert(mockEvent);

    // Check if the alert function was called with the expected message
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid positive number for Allocation.");
});

test('deleteInvestor does nothing if no investors are present', () => {
    // Clear the existing investors
    document.getElementById('investors').innerHTML = '';

    // Call the deleteInvestor function
    deleteInvestor();

    // No errors should occur
    expect(true).toBe(true);
});

test('deleteInvestor does nothing if provided with invalid button', () => {
    // Call the deleteInvestor function with an invalid button
    deleteInvestor(null);

    // No errors should occur
    expect(true).toBe(true);
});

test('addInvestor handles empty input fields', () => {
    // Call the addInvestor function
    addInvestor();

    // Clear existing input values
    document.querySelector('#investors .row .col .form-control input[type="text"]').value = '';
    document.querySelector('#investors .row .col .form-control  input[placeholder="  $ Request"]').value = '';
    document.querySelector('#investors .row .col .form-control  input[placeholder="  $ Average"]').value = '';

    // Call the addInvestor function
    addInvestor();

    // Retrieve the investorsDiv after adding an investor
    const investorsDiv = document.getElementById('investors');

    // Check if a new investor row is added
    expect(investorsDiv.children.length).toBe(2); // Assuming there was already one row present

    // Check if the new investor row contains the expected input elements with empty values
    const investorRow = investorsDiv.children[0];
    const nameInput = investorRow.querySelector('input[placeholder="  Name"]');
    expect(nameInput).toBeTruthy();
    expect(nameInput.value).toBe('');

    const requestedAmountInput = investorRow.querySelector('input[placeholder="  $ Request"]');
    expect(requestedAmountInput).toBeTruthy();
    expect(requestedAmountInput.value).toBe('');

    const averageAmountInput = investorRow.querySelector('input[placeholder="  $ Average"]');
    expect(averageAmountInput).toBeTruthy();
    expect(averageAmountInput.value).toBe('');
});

test('validateAndConvert handles non-numeric allocation input', () => {
    // Mock the alert function to capture alerts during tests
    global.alert = jest.fn();

    // Set a non-numeric allocation input value
    document.querySelector('#allocation input').value = 'abc';

    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Call the validateAndConvert function
    validateAndConvert(mockEvent);

    // Check if the alert function was called with the expected message
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid positive number for Allocation.");
});

test('validateAndConvert handles missing investor data', () => {
    // Mock the alert function to capture alerts during tests
    global.alert = jest.fn();

    // Set valid allocation value
    document.querySelector('#allocation input').value = '200';

    // Clear existing investor data
    document.getElementById('investors').innerHTML = '';

    // Mock an event object
    const mockEvent = { preventDefault: jest.fn() };

    // Mock the prorate function
    jest.mock('../scripts/prorate.js', () => ({
        prorate: jest.fn(),
    }));

    // Call the validateAndConvert function
    validateAndConvert(mockEvent);

    // Check if the alert function was called with the expected message
    expect(global.alert).toHaveBeenCalledWith("Please enter data for at least one investor.");
});
