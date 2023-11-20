function validateAndConvert(event) {
    event.preventDefault();
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
    const resultSection = document.getElementById("finalData");
    resultSection.innerHTML = '';
    proratedInvestorsAmounts.forEach(investor => {
        const resultRow = document.createElement("div");
        const num = (Math.round(investor.final_amount*Math.pow(10,2))/Math.pow(10,2)).toFixed(2);
        resultRow.innerHTML = `${investor.name} - $${num}`;
        resultSection.appendChild(resultRow);
    });
    return false;
}
function deleteInvestor(btn) {
    const investorRow = btn.parentNode.parentNode;
    investorRow.parentNode.removeChild(investorRow);
}
function addInvestor() {
  const investorsDiv = document.getElementById('investors');

  const investorDiv = document.createElement('div');
  investorDiv.className = 'row';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'col';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'form-control';
  nameInput.placeholder = '  Name';
  nameInput.required = true;

  const requestedAmountDiv = document.createElement('div');
  requestedAmountDiv.className = 'col';
  const requestedAmountInput = document.createElement('input');
  requestedAmountInput.type = 'number';
  requestedAmountInput.step = 'any';
  requestedAmountInput.min = '0';
  requestedAmountInput.className = 'form-control';
  requestedAmountInput.placeholder = '  $ Requested';
  requestedAmountInput.required = true;

  const averageAmountDiv = document.createElement('div');
  averageAmountDiv.className = 'col';
  const averageAmountInput = document.createElement('input');
  averageAmountInput.type = 'number';
  averageAmountInput.step = 'any';
  averageAmountInput.min = '0';
  averageAmountInput.className = 'form-control';
  averageAmountInput.placeholder = '  $ Average';
  averageAmountInput.required = true;

  const deleteDiv = document.createElement('div');
  deleteDiv.className = 'col';
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'icon-btn btn-large pink darken-4';
  deleteButton.onclick = function() {
    if (investorsDiv && investorDiv) {
      investorsDiv.removeChild(investorDiv);
    } else {
      console.error('investorsDiv or investorDiv is not defined.');
    }
  };

  const tag = document.createElement('i');
  tag.className = 'fa fa-trash fa-2xl';
  tag.onclick = function() {
    if (investorsDiv && investorDiv) {
      investorsDiv.removeChild(investorDiv);
    } else {
      console.error('investorsDiv or investorDiv is not defined.');
    }
  };

  if (investorDiv) {
    deleteButton.appendChild(tag);
    nameDiv.appendChild(nameInput);
    requestedAmountDiv.appendChild(requestedAmountInput);
    averageAmountDiv.appendChild(averageAmountInput);
    deleteDiv.appendChild(deleteButton);
    investorDiv.appendChild(nameDiv);
    investorDiv.appendChild(requestedAmountDiv);
    investorDiv.appendChild(averageAmountDiv);
    investorDiv.appendChild(deleteDiv);
    investorsDiv.appendChild(investorDiv);
  } else {
    console.error('investorDiv is not defined.');
  }
}
module.exports = {
    validateAndConvert,
    addInvestor,
    deleteInvestor,
}