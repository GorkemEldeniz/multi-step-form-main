const headers = document.querySelectorAll('header');
const forms = document.querySelectorAll('form');
const buttons = document.querySelectorAll('form  button');
const inputs = document.querySelectorAll('.step-1 > input');
const errors = document.querySelectorAll('.error');
const cards = document.querySelectorAll('.plan-card');
const checkbox = document.querySelector('.time-plan > input');
const timePlans = document.querySelectorAll('.time-plan > label');
const adds = document.querySelectorAll('.adds');
const addCheckboxes = document.querySelectorAll('.adds > input');
const steps = document.querySelectorAll('.number');

console.table({inputs});
let stepNumber = 0;
let isValid = true;

checkbox.addEventListener('change', e => {
  const [Month,Year] = [...timePlans];
  Month.classList.toggle('selected-time',!e.target.checked)
  Year.classList.toggle('selected-time',e.target.checked)
});

const addsArray = [...adds];

[...addCheckboxes].forEach((checkbox,index) => {
  checkbox.addEventListener('change' , e => {
    addsArray[index].classList.toggle('active-service',e.target.checked);
  })
});



[...inputs].forEach(input => {
  input.addEventListener('blur',e => {
    if(e.target.value === '') isValid = false;
    else  isValid = true; 
  })
});

const cardsArray = [...cards];

cardsArray.forEach((card,index) => {
  card.addEventListener('click',e => {
    card.classList.add('active-card');
    cardsArray.forEach((c,i) => {
      if(i !== index) c.classList.remove('active-card');
    })
  })
})


const handleForm = (step) => {
  [...forms].forEach((form,id) => {
    if(id == step){
      form.classList.remove('none')
    }
    else form.classList.add('none')
  });

  [...headers].forEach((header,id) => {
    if(id == step){
      header.classList.remove('none')
    }
    else header.classList.add('none')
  })
}

const handleError = (inputs) => {
  const errorArray = [...errors];
  [...inputs].forEach((input,index) => {
    if(input.value.trim() === ''){
      errorArray[index].classList.remove('none');
      input.classList.add('error-border')
    }
    else{
      if(!errors[index].classList.contains('none')){
        errorArray[index].classList.add('none');
        input.classList.remove('error-border')
      }
    } 
  })
}

const stepArray = [...steps];

const handleStep = (stepNumber) => {
  stepArray.forEach((step,i) => {
    step.classList.toggle('active-step',stepNumber === i);
  })
}


[...buttons].forEach((button,idx) => {
  button.addEventListener('click',e => {
    e.preventDefault();;
    if(button.classList.contains('back')){
      if(stepNumber == 0 || !isValid) return
      stepNumber--
      console.log(stepNumber)
      handleForm(stepNumber)
  } 
    else{
      handleError(inputs);
      if([...inputs].some(input => input.value.trim() === '') || stepNumber == 3 || !isValid) return
      stepNumber++
      console.log(stepNumber)
      handleForm(stepNumber)
  }
  handleStep(stepNumber);
  })
})

