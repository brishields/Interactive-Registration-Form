var nameInput = document.querySelector('input[type="text"]');
var jobTitleOption = document.getElementById('title');
var otherJobRole = document.getElementById('other-job-role');
var design = document.getElementById('design');  //shirt design option list
var color = document.getElementById('color');    //shirt color option list
var colorOptions = document.querySelectorAll('select#color > option');
var activities = document.querySelectorAll('div#activities-box > label > input');
var activityCost = document.getElementsByClassName('activity-cost');
var finalCostPrintArea = document.getElementById('activities-cost');
var finalCost = 0;
var cost;
var printedCost;

/**************************************************************************
 *************************** Onload Functions *****************************
 *************************************************************************/

//Hides the other jobe role field on load.
otherJobRole.style.display = 'none';


//Focus on the name input text field upon loading.
nameInput.focus();

//Disables the color option.
color.disabled = true;

/*****************************
 * `createOtherField` function
 ****************************/
function createOtherField () {
    if (jobTitleOption.value === 'other') {
        otherJobRole.style.display = 'block';
    }
}
/**************************************************************************
 **************************** Event Listeners ******************************
 *************************************************************************/

//Job title event listener to appropriately display the "other job role" field.
jobTitleOption.addEventListener('change', createOtherField);

//T-shirt design event listener to enable appropriate color options,
design.addEventListener('change', enableColors);

//Activities event listener to detect a change in selected activities and display an correct total.
for (let i = 0; i < activities.length; i++) {
    activities[i].addEventListener('change', totalCost)
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
}

 /*************************
 * `totalCost` function
 *************************/
 //Adds the fees for the selected activities and prints them to the display
 function totalCost () {
     //Set equal to zero so that every call of the function re-calculates from scratch
    finalCost = 0
    for (let i = 0; i < activities.length; i++)
        if (activities[i].checked === true) {
            //Extracts cost from activity cost span
            stringCost = activityCost[i].textContent;
            //Converts stringed cost into a number sans symbols
            numberCost = parseInt(stringCost.replace(/[$,]+/g,""), 10);
            finalCost += numberCost;    
        }
    finalCostPrintArea.textContent = 'Total Cost: $' + finalCost;
 }

