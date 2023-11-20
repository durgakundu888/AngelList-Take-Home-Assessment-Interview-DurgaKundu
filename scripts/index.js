function validateAndConvert(event) {
    // Import prorate at the beginning of scripts/index.js
    const { prorate } = require('../scripts/prorate.js');

    const allocationInput = document.querySelector('#allocation input');
    const investorsInputs = document.querySelectorAll('#investors .row input');

    // Validate allocation input
    const allocationValue = parseFloat(allocationInput.value);
    if (isNaN(allocationValue) || allocationValue <= 0) {
        alert("Please enter a valid positive number for Allocation.");
        return;
    }

    // Collect data from the form
    const formData = {
        allocation_amount: allocationValue,
        investor_amounts: [],
    };

    investorsInputs.forEach((input, index) => {
        const investorIndex = Math.floor(index / 3); // Each investor has 3 input fields
        const inputType = index % 3;

        if (!formData.investor_amounts[investorIndex]) {
            formData.investor_amounts[investorIndex] = {};
        }

        if (inputType > 0) {
            let inputValue = parseFloat(input.value);

            //Validate numeric inputs
            if (isNaN(inputValue) || inputValue < 0) {
                alert("Please enter valid positive numbers for Requested Amount and Average Amount.");
                return;
            }
        }

        switch (inputType) {
            case 0:
                formData.investor_amounts[investorIndex].name = input.value;
                break;
            case 1:
                formData.investor_amounts[investorIndex].requested_amount = parseFloat(input.value);
                break;
            case 2:
                formData.investor_amounts[investorIndex].average_amount = parseFloat(input.value);
                break;
        }
    });

    const proratedInvestorsAmounts = prorate(event, formData);

    // Display the prorated data on the UI
    const resultSection = document.getElementById("result");
    resultSection.innerHTML = "<h1>Results</h1>";

    proratedInvestorsAmounts.forEach(investor => {
        const resultRow = document.createElement("div");
        const num = (Math.round(investor.final_amount*Math.pow(10,2))/Math.pow(10,2)).toFixed(2);
        resultRow.innerHTML = `${investor.name} - $${num}`;
        resultSection.appendChild(resultRow);
    });
}
function deleteInvestor(btn) {
    const investorRow = btn.parentNode;
    investorRow.parentNode.removeChild(investorRow);
}
function addInvestor() {
  const investorsDiv = document.getElementById('investors');

  const investorDiv = document.createElement('div');
  investorDiv.className = 'row mb-3';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'form-control col-md-3 mr-md-2 mb-2';
  nameInput.placeholder = 'Name';
  nameInput.required = true;

  const requestedAmountInput = document.createElement('input');
  requestedAmountInput.type = 'number';
  requestedAmountInput.step = 'any';
  requestedAmountInput.min = '0';
  requestedAmountInput.className = 'form-control col-md-3 mr-md-2 mb-2';
  requestedAmountInput.placeholder = '$ Requested Amount';
  requestedAmountInput.required = true;

  const averageAmountInput = document.createElement('input');
  averageAmountInput.type = 'number';
  averageAmountInput.step = 'any';
  averageAmountInput.min = '0';
  averageAmountInput.className = 'form-control col-md-3 mb-2';
  averageAmountInput.placeholder = '$ Average Amount';
  averageAmountInput.required = true;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    if (investorsDiv && investorDiv) {
      investorsDiv.removeChild(investorDiv);
    } else {
      console.error('investorsDiv or investorDiv is not defined.');
    }
  };

  if (investorDiv) {
    investorDiv.appendChild(nameInput);
    investorDiv.appendChild(requestedAmountInput);
    investorDiv.appendChild(averageAmountInput);
    investorDiv.appendChild(deleteButton);
    investorsDiv.appendChild(investorDiv);
  } else {
    console.error('investorDiv is not defined.');
  }
}

// Export the functions
module.exports = {
    addInvestor,
    deleteInvestor,
    validateAndConvert,
};
