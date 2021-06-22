// 3. The "Name" field.
const nameElement = document.querySelector("#name");
nameElement.focus();

const jobroleElement = document.querySelector("#title");
const otherjobroleElement = document.querySelector("#other-job-role");
otherjobroleElement.style.display = "none";

//4. "Job Role" section
//conditional that displays and hides the Other Job Role text field when someone selects Other in the Job Role dropdown menu.
jobroleElement.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherjobroleElement.style.display = "inline";    
    } else {
        otherjobroleElement.style.display = "none";
    }
});

//5. "T-Shirt info" section
const designElement = document.querySelector("#design");
const colorElement = document.querySelector("#color");
const colorelementOptions = colorElement.children;

colorElement.disabled = true;

designElement.addEventListener("change", (e) => {
    const jsPuns = document.querySelectorAll('[data-theme="js puns"]');
    const iheartJS = document.querySelectorAll('[data-theme="heart js"]');
    colorElement.disabled = false;

    if (e.target.value === "js puns") {
        for (let i = 0; i < colorelementOptions.length; i++) {
            if (colorElement[i].getAttribute('data-theme') === 'js puns') {
                //looked up https://www.w3schools.com/jsref/prop_style_display.asp to find how to reset the display
               colorElement[i].style.display = "initial"
            } else {
                colorElement[i].style.display = 'none';
            }
        }
        colorElement.selectedIndex = 0
    } else if (e.target.value === "heart js") {
        for (let i = 0; i < colorelementOptions.length; i++) {
            if (colorElement[i].getAttribute('data-theme') === 'heart js') {
               colorElement[i].style.display = "initial"
            } else {
                colorElement[i].style.display = 'none';
            }
        }
        colorElement.selectedIndex = 0
    }

});

//6. "Register for Activities" section
let registerActivities = document.querySelector("#activities");
let total = document.querySelector("#activities-cost");
let totalCost = 0;

registerActivities.addEventListener("change", (e) => {
    const choice = e.target;
    let choiceCost = choice.getAttribute("data-cost");
    choiceCost = Number(choiceCost);
    if (choice.checked) {
        totalCost += choiceCost;
    } else {
        totalCost -= choiceCost;
    }
    total.innerHTML = `Total: $${totalCost}`;
});




//7. "Payment Info" section
const paymentMenu = document.querySelector("#payment");
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

paypal.style.display = "none";
bitcoin.style.display = "none";

paymentMenu[1].selected = true; //--> Automatically selecting the Credit Card. 

paymentMenu.addEventListener ('change', (e) => {
    const payDecision = e.target.value;
    if (payDecision === "paypal") {
        creditCard.style.display = "none";
        paypal.style.display = "block";
        bitcoin.style.display = "none";
    } else if (payDecision === "bitcoin"){
        creditCard.style.display = "none";
        bitcoin.style.display = "block";
        paypal.style.display= "none";
    } else {
        creditCard.style.display = "block";
        bitcoin.style.display = "none";
        paypal.style.display= "none";
    }
});

//8. Form Validation
const emailAddress = document.querySelector("#email");
const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector("form");
const activitiesBox = document.getElementById('activities-box');
const paymentMethod = document.getElementById('payment');

function validForm(element) {
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
};

function invalidForm(element) {
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
};

//validating the name field
function validName() {
    const nameTest = /.*\S.*/.test(nameElement.value); //-> took the regex code from https://regexr.com/ 
    if (nameTest == true) {
        validForm(nameElement);
    } else {
        invalidForm(nameElement);
    } return nameTest;    
};

//validating the email field
function validEmail() {
    const emailTest = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(emailAddress.value); //-> took the regex code from https://regexr.com/
    if (emailTest == true) {
        validForm(emailAddress);
    } else {
        invalidForm(emailAddress);
    } return emailTest;
};

//validating the activity section
function validActivity() {
    let activityTest = totalCost > 0;
    if (activityTest) {
        validForm(activitiesBox);
    } else {
        invalidForm(activitiesBox);
    } return activityTest;
};

// validating the credit card field
function validCard() {
    const cardTest = /^[0-9]{13,16}$/.test(creditCardNumber.value);
    if (cardTest == true) {
        validForm(creditCardNumber)
    } else {
        invalidForm(creditCardNumber)
    } return cardTest;
};

// validating the zip code field
function validZipCode() {
    const zipcodeTest = /^[0-9]{5}$/.test(zipCode.value);
    if (zipcodeTest == true) {
        validForm(zipCode)
    } else {
        invalidForm(zipCode)
    } return zipcodeTest;
};

// validating the cvv field
function validCvv() {
    const cvvTest = /^[0-9]{3}$/.test(cvv.value);
    if (cvvTest == true) {
        validForm(cvv)
    } else {
        invalidForm(cvv)
    } return cvvTest;
};


form.addEventListener('submit', (e) => {
    if (!validName()) {
        e.preventDefault();
    } if (!validEmail()) {
        e.preventDefault();
    } if (!validActivity()) {
        e.preventDefault();
    }
    if (paymentMenu.value === 'credit-card') {
        if (!validCard()) {
            e.preventDefault();
        }

        if (!validCvv()) {
            e.preventDefault();
        }

        if (!validZipCode()) {
            e.preventDefault();
        }
    }
});

//9. Accessibility
const activitiesAccessibility = document.querySelectorAll('input[type=checkbox]');
for (let i = 0; i < activitiesAccessibility.length; i += 1) {
    activitiesAccessibility[i].addEventListener("focus", e => {
        activitiesAccessibility[i].parentElement.classList.add("focus");
    });
    activitiesAccessibility[i].addEventListener("blur", e => {
        activitiesAccessibility[i].parentElement.classList.remove("focus");
    });
  };
