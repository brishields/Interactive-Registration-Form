/**************************************************************************
 *************************** Global Variables *****************************
 *************************************************************************/

var nameInput = document.querySelector('input[type="text"]');
var jobTitleOption = document.getElementById('title');
var otherJobRole = document.getElementById('other-job-role');
var design = document.getElementById('design');  //shirt design option list
var color = document.getElementById('color');    //shirt color option list
var colorOptions = document.querySelectorAll('select#color > option');
var activities = document.querySelectorAll('div#activities-box > label > input');
var activityCost = document.getElementsByClassName('activity-cost');
var finalCostPrintArea = document.getElementById('activities-cost');
var paymentMethod = document.getElementById('payment');
var creditCard= document.querySelector('[value="credit-card"]');
var selectColorCaption = document.createElement('option');
var selectThemeCaption = document.getElementById('color').firstElementChild;
var form = document.querySelector('form');
var hints = document.getElementsByClassName('hint');
var email = document.getElementById('email');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
var errors = document.getElementsByClassName('not-valid');
var valid = document.getElementsByClassName('valid');
var requiredField = document.querySelectorAll('span.asterisk');
var finalCost = 0;
var cost;
var printedCost;

/**************************************************************************
 *************************** Onload Functions *****************************
 *************************************************************************/

//Hides the other jobe role field on load.
otherJobRole.style.display = 'none';

//Focuses on the name input text field upon loading.
nameInput.focus();

//Disables the color option.
color.disabled = true;

//Sets default payment method to credit card and hides other payment fields.
creditCard.selected = true;
document.getElementById('paypal').style.display = 'none';
document.getElementById('bitcoin').style.display = 'none';

/*****************************
 * `createOtherField` function
 ****************************/
//Displays the other field when other job is chosen.
function createOtherField () {
    if (jobTitleOption.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
}

/*****************************
 * `checkboxFocus` function
 ****************************/
//Adds focus class to checkbox labels.
function checkboxFocus (e) {
    let checkbox = e.target
    let label = checkbox.parentNode;
    label.classList.add('focus');
}

/*****************************
 * `checkboxBlur` function
 ****************************/
//Removes focus on blur.
 function checkboxBlur (e) {
    let checkbox = e.target
    let label = checkbox.parentNode;
    label.classList.remove('focus');
}

/**************************************************************************
 **************************** Event Listeners *****************************
 *************************************************************************/

//Job title event listener to appropriately display the "other job role" field.
jobTitleOption.addEventListener('change', createOtherField);

//T-shirt design event listener to enable appropriate color options.
design.addEventListener('change', enableColors);

//Activities event listener to detect a change in selected activities and display an correct total.
for (let e = 0; e < activities.length; e++) {
    activities[e].addEventListener('change', totalCost);
}

//Payment method event listener to change displayed sub-fields.
paymentMethod.addEventListener('change', displayPaymentFields);

//Form submit listener that validates before submission.
form.addEventListener('submit', validateForm);

//Focus is on a checkbox.
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', checkboxFocus);
}

//Blur checkbox.
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('blur', checkboxBlur);
}

//Checkbox listener for activity scheduling conflicts.
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', activityConflict);
}

/**************************************************************************
 **************************** Form Functions ******************************
 *************************************************************************/

 /*************************
 * `enableColors` function
 *************************/
 //Determines the correct color options to display based on chosen design (event handler).
function enableColors() {
    //Enables the color dropdown
    color.disabled = false;

       if (design.value === 'js puns') {
           for (let i = 0; i < colorOptions.length; i++){
                if (colorOptions[i].getAttribute('data-theme') === 'js puns'){
                    colorOptions[i].style.display = 'inline-block';
                } else if (colorOptions[i].getAttribute('data-theme') === 'heart js') {
                    colorOptions[i].style.display = 'none';
                } 
            }
        } else if (design.value === 'heart js') {
            for (let i = 0; i < colorOptions.length; i++){
                 if (colorOptions[i].getAttribute('data-theme') === 'js puns'){
                     colorOptions[i].style.display = 'none';
                 } else if (colorOptions[i].getAttribute('data-theme') === 'heart js') {
                     colorOptions[i].style.display = 'inline-block';
                 } 
            }
        }
    changeColorCaption();
}

 /******************************
 * `changeColorCaption` function
 *******************************/
//Removes `Select a Design` option when a t-shirt design is chosen.
function changeColorCaption () {
    if (document.getElementById('design').value !== 'Select theme') {
        //Hides Select a Design option 
        selectThemeCaption.style.display = 'none';
        //Selects new option element.
        selectColorCaption.selected = 'true';
        selectColorCaption.hidden = 'true'
        selectColorCaption.innerText = 'Select Color';
        //Replaces `Select a theme` option with new `Select a color` option.
        selectThemeCaption.replaceWith(selectColorCaption);
    }
}

/**********************
 * `totalCost` function
***********************/
 //Adds the fees for the selected activities and prints them to the display.
 function totalCost () {
     //Sets `finalCost` equal to zero so that every call of the function re-calculates from scratch
    finalCost = 0
    for (let i = 0; i < activities.length; i++)
        if (activities[i].checked === true) {
            //Extracts cost from activity cost span
            stringCost = activityCost[i].textContent;
            //Converts stringed cost into a number sans symbols
            numberCost = parseInt(stringCost.replace(/[$,]+/g,""), 10);
            finalCost += numberCost;    
        }
    finalCostPrintArea.textContent = 'Total: $' + finalCost;
 }

/*********************************
 * `displayPaymentFields` function
*********************************/
 //Displays only the payment fields relevant to the selected payment method.
 function displayPaymentFields () {
    if (paymentMethod.value !== 'credit-card') {
         document.getElementById('credit-card').style.display = 'none';
         document.querySelector('.year-box').style.display = 'none';
         document.querySelector('.year-box').style.display = 'none';
         document.querySelector('.zip-box').style.display = 'none';
         document.querySelector('.cvv-box').style.display = 'none';
     } 
    if (paymentMethod.value === 'paypal') {
         document.getElementById('paypal').style.display = 'block';
         document.getElementById('bitcoin').style.display = 'none';
     }
    if (paymentMethod.value === 'bitcoin') {
         document.getElementById('bitcoin').style.display = 'block';
         document.getElementById('paypal').style.display = 'none';
     }
    if (paymentMethod.value === 'credit-card') {
        document.getElementById('credit-card').style.display = 'inline-block';
        document.querySelector('.year-box').style.display = 'inline-block';
        document.querySelector('.year-box').style.display = 'inline-block';
        document.querySelector('.zip-box').style.display = 'inline-block';
        document.querySelector('.cvv-box').style.display = 'inline-block';
        document.getElementById('bitcoin').style.display = 'none';
        document.getElementById('paypal').style.display = 'none';
    }
 }

/*********************************
 * `validateForm` function
*********************************/
 //Checks to see if required fields are appropriately filled out before submitting form data.
function resetForm () {
        //Resets any hints displayed from previous submissions. 
        for (let i = 0; i < hints.length; i ++) {
            hints[i].style.display = 'none';
        }
        //Removes visual (`valid` and `not-valid`) indicators from previous submissions.
        for (let i = 0; i < requiredField.length; i ++) {
            
            if (requiredField[i].parentNode.className === 'not-valid') {
                requiredField[i].parentNode.classList.remove('not-valid'); 
            }
            if (requiredField[i].parentNode.className === 'valid') {
                requiredField[i].parentNode.classList.remove('valid')
            }
        }
        //Removes visual (`valid` and `not-valid`) indicators from previous submissions for the activities section.
        if (document.getElementById('activities').classList.contains('valid')) {
            return document.getElementById('activities').classList.remove('valid');
        } 
        if (document.getElementById('activities').classList.contains('not-valid')) {
           return  document.getElementById('activities').classList.remove('not-valid');
        }
    }

function validateForm (event) {
    //Resets visual valid indicators from previous submissions.
    resetForm();

    /***************************Validation Conditionals*****************************/

    //Validates Name Input.
    if (document.getElementById('name').value === '') {
        document.getElementById('name-hint').style.display = 'inline-block';
        document.getElementById('name').parentNode.classList.add('not-valid');
        document.getElementById('name-hint').textContent = 'Cannot be blank';
        event.preventDefault();
    } else if (document.getElementById('name').value !== ''){
        document.getElementById('name').parentNode.classList.add('valid');
    }

    //**************************Email formatting*****************************
    //Validates the field was not left empty.
    if (email.value === '') {
        document.getElementById('email-hint').style.display = 'inline-block';
        document.getElementById('email').parentNode.classList.add('not-valid');
        document.getElementById('email-hint').textContent = 'Cannot be blank';
        event.preventDefault(); 
        } else
    
    //Validates the field was formatted correctly.
    if (emailRegex.test(email.value) === false) {
        document.getElementById('email-hint').style.display = 'inline-block';
        document.getElementById('email').parentNode.classList.add('not-valid');
        document.getElementById('email-hint').textContent = 'Email address must be formatted correctly'
        event.preventDefault();
    } else if  (emailRegex.test(email.value) === true){
        document.getElementById('email').parentNode.classList.add('valid');
    }

    //**************************Activity formatting*****************************
    //Validates that at least one activity is selected.
    if (document.getElementById('activities-cost').textContent === 'Total: $0') {
        document.getElementById('activities-hint').style.display = 'inline-block';
        document.getElementById('activities').classList.add('not-valid');
        event.preventDefault();
    } 
    if (document.getElementById('activities-cost').textContent !== 'Total: $0') {
        document.getElementById('activities').classList.add('valid');
    }
    //******************************Payment formatting*************************************

    //Validates CC#, zipcpde and CVV to be valid if credit card is the selected payment method.
    if (document.getElementById('payment').value === 'credit-card'){
        //Validates that CC# input is not empty.
        if (document.getElementById('cc-num').value === '') {
            document.getElementById('cc-hint').style.display = 'inline-block';
            document.getElementById('cc-num').parentNode.classList.add('not-valid');
            document.getElementById('cc-hint').textContent = 'Cannot be blank';
            event.preventDefault();
        } else
    
        //Validates that CC# input is 13-16 digits.
        if (/^\d{13,16}$/.test(document.getElementById('cc-num').value) === false){
            document.getElementById('cc-hint').style.display = 'inline-block';
            document.getElementById('cc-num').parentNode.classList.add('not-valid');
            document.getElementById('cc-hint').textContent = 'Credit card number must be between 13 - 16 digits';
            event.preventDefault();
        } else if (/^\d{13,16}$/.test(document.getElementById('cc-num').value) === true) {
            document.getElementById('cc-num').parentNode.classList.add('valid');
        }
    
        //Validates that zip input is not empty.
        if (document.getElementById('zip').value === '') {
            document.getElementById('zip-hint').style.display = 'inline-block';
            document.getElementById('zip').parentNode.classList.add('not-valid');
            document.getElementById('zip-hint').textContent = 'Cannot be blank';
            event.preventDefault();
        } else
    
        //Validates that zip input is 5 digits.
        if (/^\d{5}$/.test(document.getElementById('zip').value) === false){
            document.getElementById('zip-hint').style.display = 'inline-block';
            document.getElementById('zip').parentNode.classList.add('not-valid');
            document.getElementById('zip-hint').textContent = 'Zip Code must be 5 digits';
            event.preventDefault();
        } else if (/^\d{5}$/.test(document.getElementById('zip').value) === true) {
            document.getElementById('zip').parentNode.classList.add('valid');
        }
    
        //Validates that cvv input is not empty.
        if (document.getElementById('cvv').value === '') {
            document.getElementById('cvv-hint').style.display = 'inline-block';
            document.getElementById('cvv').parentNode.classList.add('not-valid');
            document.getElementById('cvv-hint').textContent = 'Cannot be blank';
            event.preventDefault();
        } else
    
        //validates that cvv input is 3 digits.
        if (/^\d{3}$/.test(document.getElementById('cvv').value) === false){
            document.getElementById('cvv-hint').style.display = 'inline-block';
            document.getElementById('cvv').parentNode.classList.add('not-valid');
            document.getElementById('cvv-hint').textContent = 'CVV must be 3 digits';
            event.preventDefault();
        } else if (/^\d{3}$/.test(document.getElementById('cvv').value) === true) {
            document.getElementById('cvv').parentNode.classList.add('valid');
        }

    }
}

/*****************************
 * `activityConflict` function
 ****************************/
//Prevents activity scheduling conflicts by dynamically disabling activity selections.
function activityConflict () {
    //Resets any previously disabled checkboxes.
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = false;
    }
    if (document.querySelector('input[name="js-libs"]').checked) {
         document.querySelector('input[name="js-frameworks"]').disabled = true;
    }
    if (document.querySelector('input[name="js-frameworks"]').checked) {
         document.querySelector('input[name="js-libs"]').disabled = true;
    }
    if (document.querySelector('input[name="node"]').checked) {
         document.querySelector('input[name="build-tools"]').disabled = true;
    }
    if (document.querySelector('input[name="build-tools"]').checked) {
         document.querySelector('input[name="node"]').disabled = true;
    }
}