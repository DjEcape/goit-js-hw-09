import throttle from 'lodash.throttle';
const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('[name="email"]'),
  textArea: document.querySelector('[name="message"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onFormInput, 500));

let FEEDBACK_FORM_STATE = 'feedback-form-state';
let inputedObj = {};

function onFormSubmit(event) {
  event.preventDefault();
  if (
    refs.emailInput.value.trim() !== '' &&
    refs.textArea.value.trim() !== ''
  ) {
    console.log(inputedObj);
    this.reset();
    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(inputedObj));
    localStorage.removeItem(FEEDBACK_FORM_STATE);
  }
}
function onFormInput() {
  inputedObj = {
    email: refs.emailInput.value,
    message: refs.textArea.value,
  };
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(inputedObj));
}

function checkMyInput() {
  let parcedStrToObj = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE));
  if (parcedStrToObj) {
    refs.textArea.value = parcedStrToObj.message;
    refs.emailInput.value = parcedStrToObj.email;
  }
  inputedObj = parcedStrToObj;
  // console.log(parcedStrToObj)
}
checkMyInput();
