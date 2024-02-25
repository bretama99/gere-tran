//DOM elements

const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next'
};

function makeCurrentButton(i, id) {
  if (id === "contact") {
    DOMstrings.stepsBar.getElementsByTagName("button")[i].style.marginInlineEnd = "-7.5px";
  }
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.height = "100%";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.backgroundColor = "#d60721";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.borderRadius = "3.5px";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.marginInlineStart = "-7.5px";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.color = "white";
}

function makeButton(i, id) {
  if (id === "contact") {
    DOMstrings.stepsBar.getElementsByTagName("button")[i].style.marginInlineEnd = "0";
  }
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.height = "75%";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.backgroundColor = "#f2f4f7";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.borderRadius = "0";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.marginInlineStart = "0";
  DOMstrings.stepsBar.getElementsByTagName("button")[i].style.color = "black";
}

makeCurrentButton(0);

//remove class from a set of items
const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

//return exect parent node of the element
const findParent = (elem, parentClass) => {

  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;

};

//get active button step number
const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

  //remove active state from all the state
  removeClasses(DOMstrings.stepsBtns, 'js-active');

  //set picked items to active
  DOMstrings.stepsBtns.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }

  });
};

//get active panel
const getActivePanel = () => {

  let activePanel;

  DOMstrings.stepFormPanels.forEach(elem => {
    
    if (elem.classList.contains('js-active')) {

      activePanel = elem;

    }

  });

  return activePanel; //return of panel by active class named: "js-active" 

};

//open active panel (and close unactive panels)
const setActivePanel = activePanelNum => {

  //remove active class from all the panels
  removeClasses(DOMstrings.stepFormPanels, 'js-active');

  //show active panel
  DOMstrings.stepFormPanels.forEach((elem, index) => {

    if (index === activePanelNum) {
      elem.classList.add('js-active');
      setFormHeight(elem);
      makeCurrentButton(index, elem.id);
    } else {
      makeButton(index, elem.id);
    }

  });

};

//set form height equal to current panel height
const formHeight = activePanel => {

  if (activePanel) {
    const activePanelHeight = activePanel.offsetHeight;

    DOMstrings.stepsForm.style.minHeight = `${396}px`; // hight height value and id height of restaurant
    DOMstrings.stepsForm.style.maxHeight = `${396}px`; // hight height value and id height of restaurant
  }
};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

  //check if click target is a step button
  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  //get active button step number
  const activeStep = getActiveStep(eventTarget);

  //set all steps before clicked (and clicked too) to active
  setActiveStep(activeStep);

  //open active panel
  setActivePanel(activeStep);
});

//PREV/NEXT BTNS CLICK
if (DOMstrings.stepsForm) {
  DOMstrings.stepsForm.addEventListener('click', e => {

    const eventTarget = e.target;

    //check if we clicked on `PREV` or NEXT` buttons
    if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
      return;
    }

    //find active panel
    const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

    //set active step and active panel onclick
    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
      activePanelNum--;

    } else {

      activePanelNum++;

    }

    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);

  });
}

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);


window.onpopstate = function (event) {
  if (event.state.current === "/") {
  document.location.assign("");
  }
};

const avatar = document.getElementById("avatar");
const labelAvatar = document.getElementById("label-avatar");

console.log(avatar)

if ((avatar && labelAvatar !== null) || (avatar && labelAvatar !== undefined)) {
  avatar.addEventListener('change', function (e) {
    e.stopPropagation();
    let fileName = e.target.files[0].name;

    if (fileName.length > 0) {
      let infosDownload = avatar.parentElement.nextElementSibling
      infosDownload.innerText = fileName;

      let avatars = document.getElementsByClassName("avatar-input");

      for (let i = 0; i < avatars.length; i++) {
        avatars[i].parentElement.nextElementSibling.innerText = fileName;
      }

    }
  })
}



