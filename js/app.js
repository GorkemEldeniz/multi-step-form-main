const headers = document.querySelectorAll('header');
const forms = document.querySelectorAll('form');
const lastStep = document.querySelector('.step-5');
const buttons = document.querySelectorAll('form  button');
const inputs = document.querySelectorAll('.step-1 > input');
const errors = document.querySelectorAll('.error');
const cards = document.querySelectorAll('.plan-card');
const checkbox = document.querySelector('.time-plan > input');
const timePlans = document.querySelectorAll('.time-plan > label');
const adds = document.querySelectorAll('.adds');
const addCheckboxes = document.querySelectorAll('.adds > input');
const steps = document.querySelectorAll('.number');
const planTitle = document.querySelector('.title > h2');
const backBtn = document.querySelector('.title > h3');
const advantages = document.querySelectorAll('.plan-card > h5');
const yearlyPrices = document.querySelectorAll('.plan-card > h4');

let stepNumber = 0;
let isValid = true;
let data = {time : 'Monthly',addsPlan :[],plan : ''}
let addsPlan = [];
const plan = { 
  0 : 'OnlineService',
  1 : 'LargerStorage',
  2 : 'CustomizableProfile'
};

const prices = {
  Arcade : 9, 
  Advanced : 12,
  Pro : 15,
  OnlineService :1,
  LargerStorage : 2,
  CustomizableProfile :2
};
const addsArray = [...adds];
const stepArray = [...steps];

const changePrices = (time) => {
  const prices = [9,12,15];
  [...yearlyPrices].forEach((price,index) => {
    if(time === 'Yearly'){
      price.textContent = `$${prices[index] * 10}/yr`
    }
    else {
      price.textContent = `$${prices[index]}/mo`
    }
  })
}


checkbox.addEventListener('change', e => {
  const [Month,Year] = [...timePlans];
  Month.classList.toggle('selected-time',!e.target.checked)
  Year.classList.toggle('selected-time',e.target.checked)
  if(Month.classList.contains('selected-time')){
    data = {...data,time : 'Monthly'}
  }
  else data = {...data,time : 'Yearly'}
  let {time} =  data;
  [...advantages].forEach(advantage => {
    advantage.classList.toggle('none',time === 'Monthly');
  })
  changePrices(time);
});

[...addCheckboxes].forEach((checkbox,index) => {
  checkbox.addEventListener('change' , e => {
    addsArray[index].classList.toggle('active-service',e.target.checked);
    if(e.target.checked){
      addsPlan.push(plan[index])
    }
    else {
      addsPlan = addsPlan.filter((el,i) => el !== plan[index]);
    }
    data = {...data,addsPlan};
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

      if(c.classList.contains('active-card')){
        let plans = {
          0 : 'Arcade',
          1 : 'Advance',
          2: 'Prop'
        }
        data = {...data,plan : plans[i]}
      }
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


const handleStep = (stepNumber) => {
  stepArray.forEach((step,i) => {
    step.classList.toggle('active-step',stepNumber === i);
  })
}


[...buttons].forEach((button,idx) => {
  button.addEventListener('click',e => {
  e.preventDefault();
  if(button.classList.contains('back')){
      if(stepNumber == 0 || !isValid) return
      stepNumber--
      handleForm(stepNumber)
  } 
  else{
      handleError(inputs);
      if([...inputs].some(input => input.value.trim() === '') || stepNumber == 4 || !isValid) return
      stepNumber++
      handleForm(stepNumber)
  }
  if(stepNumber === 4){
    lastStep.classList.remove('none');
  }
  else lastStep.classList.add('none');
  handleStep(stepNumber);
  })
})

backBtn.addEventListener('click', e => {
  stepNumber = 1;
  handleStep(stepNumber);
  handleForm(stepNumber)
})

