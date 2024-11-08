/*VARIABLES*/
/*Form*/
const form = document.getElementById('form-side');
const metricUnit = document.getElementById('metric-unit');

/*both radios button*/
const metricBtn = document.getElementById('Metric'); 
const imperialBtn = document.getElementById('Imperial'); 

/*metric and imperial input fields*/
const cm = document.getElementById('m-height');
const kg = document.getElementById('m-weight');


const ft = document.getElementById('ft');
const inch = document.getElementById('inch');

const st = document.getElementById('st');
const lbs = document.getElementById('lbs');

/*Result text field*/
/*default welcome text*/
const welcome = document.getElementById('welcome');

/*number result of BMI*/
const resultBmi = document.getElementById('result-BMI');
const resultNumber = document.getElementById('result-numb');
const resultBodyCont = document.getElementById('result-body');

/*range of BMI (underweight, normal etc..)*/
let rangeBmi = document.getElementById('range-bmi');
const minWeight = document.getElementById('result-min-weight');
const maxWeight = document.getElementById('result-max-weight');

/*Metric and Imperial radios*/
const radioButtons = document.querySelectorAll('input[type="radio"]');

/*to make the metricBtn the default choice*/
metricBtn.classList.add('active');

 function calcBmi() {
  if (metricBtn.classList.contains('active')) {
    const valueHeight = cm.value;
    const valueWeight = kg.value;

    bmi = ((valueWeight / (valueHeight * valueHeight)) * 10000).toFixed(1);

    resultBmi.innerText = bmi;

    const height10 = valueHeight / 100;

    /*to calc min and max weight range*/
    const minWeightRange = (18.5 * height10 * height10).toFixed(1);
    const maxWeightRange = (24.9 * height10 * height10).toFixed(1);

    /*to write the min and max weight range in both result message (inside form)*/
    minWeight.innerText = `${minWeightRange} kg`;
    maxWeight.innerText = `${maxWeightRange} kg`;

    /*to hide welcome default text and show the result box*/
    resultNumber.style.display = 'block';
    resultBodyCont.style.display = 'block';
    welcome.style.display = 'none';

    
    //if instead the user click to ImperialBtn
  } else {
    const heightToInch = ft.value * 12 + parseInt(inch.value); //convert height only in inches for semplicity
    const weightToLbs = st.value * 14 + parseInt(lbs.value); //convert weight only in lbs for semplicity
 

    resultNumber.style.display = 'block';
    resultBodyCont.style.display = 'block';
    welcome.style.display = 'none';

    const bmi = ((703 * weightToLbs) / (heightToInch * heightToInch)).toFixed(1);

    resultBmi.innerText = bmi;

    /*calcolate min weight range (express only lbs for semplicity)*/
    const minWeightLbs = (18.5 * (heightToInch * heightToInch)) / 703;

    /*calcolate max weight range (express only lbs for semplicity)*/
    const maxWeightLbs = (24.9 * (heightToInch * heightToInch)) / 703;

    /*re-converter min weight range in Stone (because the result box in the form are express in stone and lbs) and remain in lbs*/
    const minStone = Math.floor(minWeightLbs / 14);
    const minLbs = Math.round(minWeightLbs % 14);

    /*re-converter max weight range in Stone (because the result box in the form are express in stone and lbs) and remain in lbs*/
    const maxStone = Math.floor(maxWeightLbs / 14);
    const maxLbs = Math.round(maxWeightLbs % 14);

    minWeight.innerText = `${minStone}st ${minLbs}lbs`;
    maxWeight.innerText = `${maxStone}st ${maxLbs}lbs`;
  }

    if (bmi < 16) {
      rangeBmi.innerText = 'Severely underweight';

    } else if (bmi > 16 && bmi <= 18.49) {
      rangeBmi.innerText = 'Underweight';

    } else if ( bmi > 18.49 && bmi <= 24.9) {
      rangeBmi.innerText = 'Healthy weight';

    } else if (bmi > 24.9 && bmi <= 29.9) {
      rangeBmi.innerText = 'Overweight';

    } else if (bmi > 29.9 && bmi <= 34.9) {
      rangeBmi.innerText = 'Obese class I';

    } else if (bmi > 34.9 && bmi <= 39.9) {
      rangeBmi.innerText = 'Obese class II';

    } else {
      rangeBmi.innerText = 'Obese class III';
    }
};


/*Function for limit value input in all fields*/
function limitInput() {
  if (cm.value.length > 3 || kg.value.length > 3) {
      cm.value = cm.value.slice(0, 3);
      kg.value = kg.value.slice(0, 3);

  } else if (ft.value.length > 1) {
    ft.value = ft.value.slice(0, 1);

  } else if (inch.value.length > 2 || st.value.length > 2 || lbs.value.length > 2) {
    inch.value = inch.value.slice(0, 2);
    st.value = st.value.slice(0, 2);
    lbs.value = lbs.value.slice(0, 2);
  };
};

//for start function limitInput when input field change from empty to something
cm.addEventListener('input', limitInput);
kg.addEventListener('input', limitInput);
ft.addEventListener('input', limitInput);
inch.addEventListener('input', limitInput);
st.addEventListener('input', limitInput);
lbs.addEventListener('input', limitInput);

/*Function for start calc IMB after press "Enter" key*/
form.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' && cm.value !== '' && kg.value !== '') || (e.key === 'Enter' && ft.value !== '' && inch.value !== '' && st.value !== '' && lbs.value !== '')) {
    e.preventDefault();
    calcBmi();
  }
});


/*for changes radio button between metric and imperial number*/
radioButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.value === 'Imperial') {
      document.querySelector('.metric-unit').style.display = 'none';
      document.querySelector('.imperial-unit').style.display = 'flex';
      e.target.classList.add('active');
      metricBtn.classList.remove('active');
    } else {
      document.querySelector('.metric-unit').style.display = 'flex';
      document.querySelector('.imperial-unit').style.display = 'none';
      imperialBtn.classList.remove('active');
      e.target.classList.add('active');
    };
  });
});
