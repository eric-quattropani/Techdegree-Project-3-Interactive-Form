// A bunch of variables that will be storing all the form inputs //

const nameElement = document.querySelector("#name");
nameElement.focus();

const jobroleElement = document.querySelector("#title");
const otherjobroleElement = document.querySelector("#other-job-role");
otherjobroleElement.style.display = "none";
//const allJobs = document.querySelectorAll("#job");


//conditional that displays and hides the Other Job Role text field when someone selects Other in the Job Role dropdown menu.
jobroleElement.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherjobroleElement.style.display = "inline";    
    } else {
        otherjobroleElement.style.display = "none";
    }
});

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


