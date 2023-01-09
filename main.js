// CARDHOLDER NAME
const nameCard = document.querySelector('.card__details-name');
const nameInput = document.getElementById('cardHolder')
const nameError = document.querySelector('.form__cardHolder--error')

// ingreso dinámico del nombre
nameInput.addEventListener('input', () =>{
    if(nameInput.value == '') {
        nameCard.innerText = 'JANE APPLESEED'
        showError(nameInput, nameError, "Can't be blank")
    } else {
        nameCard.innerText = nameInput.value
        showError(nameInput, nameError,'', false)
    }
})


// CARD NUMBER
const numberCard = document.querySelector('.card__number');
const numberInput = document.getElementById('cardNumber');
const numberError = document.querySelector('.form__cardNumber--error');

numberInput.addEventListener('input', (event)=>{
    
    let inputValue = event.target.value;

    numberCard.innerText = numberInput.value;

    // Validating that there are no letters
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value)) {
        showError(numberInput, numberError, "Wrong format, numbers only")
    } else {
        // Add spaces every four numbers and avoid a final space.
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberError, '', false)
    }

    if(numberInput.value == '') {
        showError(numberInput, numberError, "Can't be blank")
        numberCard.innerText = '0000 0000 0000 0000';
    }
})

// MM
const monthInput = document.getElementById('cardMonth');
const cardMonth = document.querySelector('.card__month');
const monthError = document.querySelector('.form__date-month--error')

// MONTH INPUT
monthInput.addEventListener('input', ()=>{
    if(monthInput.value > 0 && monthInput.value <= 12){
        cardMonth.innerText = monthInput.value;
        showError(monthInput, monthError, '', false)
    } else {
        cardMonth.innerText = '00'
        showError(monthInput, monthError, 'Invalid month')
    }
})

// YY
const yearInput = document.getElementById('cardYear');
const cardYear = document.querySelector('.card__year');
const yearError = document.querySelector('.form__date-year--error')

//YEAR INPUT
yearInput.addEventListener('input', ()=>{
    if(yearInput.value > 0 || yearInput.value <= 100){
        cardYear.innerText = yearInput.value;
        showError(yearInput, yearError, '', false)
    } else {
        cardYear.innerText = '00'
        showError(yearInput, yearError, 'Invalid year')
    }
})

// CARD CVC
const cvcInput = document.getElementById('cardCvc')
const cardCvc = document.querySelector('.card-back__cvc')
const cvcError = document.querySelector('.form__date-cvc--error')

//CVC INPUT
cvcInput.addEventListener('input', ()=>{
    if(cvcInput.value <= 999){
        cardCvc.innerText = cvcInput.value;
        showError(cvcInput, cvcError, '', false)
    } else {
        showError(cvcInput, cvcError, 'Invalid cvc')
    }

    if(cvcInput.value == '') {
        showError(cvcInput, cvcError, "Can't be blank")
        cardCvc.innerText = '000';
    }
})

//CONFIRM BUTTON
const confirmBtn = document.querySelector('.form__submit')
const formSection = document.querySelector('.form')
const thanksSection = document.querySelector('.thanks-section')

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

confirmBtn.addEventListener('click', (event)=> {
    event.preventDefault();

    // Valid Name
    if(verifyIsFilled(nameInput, nameError)){
        nameValidation = true
    }

    // Valid Number
    if(verifyIsFilled(numberInput, numberError) == true){
        if(numberInput.value.length !== 19){
        showError(numberInput, numberError, "Wrong number")}
        else{
            numberValidation = true
        }
    }

    // Valid MM
    if(verifyIsFilled(monthInput, monthError) == true){
        if(parseInt(monthInput.value) > 0 && parseInt(monthInput.value)<=12){
            showError(monthInput, monthError, '', false )
            monthValidation = true;
        } else {
            showError(monthInput, monthError, 'Invalid month' )
        }
    }

    //Valid YY
    if(verifyIsFilled(yearInput, yearError)){
        if(parseInt(yearInput.value) >= 0 && parseInt(yearInput.value)<=99){
            showError(yearInput, yearError, '', false );
            yearValidation = true
        } else {
            showError(yearInput, yearError, 'Invalid year' )
        }
    }

    //Valid CVC
    if(verifyIsFilled(cvcInput, cvcError)){
        if(cvcInput.value.length == 3){
            showError(cvcInput, cvcError, '', false);
            cvcValidation = true;
        } else {
            showError(cvcInput, cvcError, 'Invalid cvc')   
        }
    }

    if (
        nameValidation == true &&
        numberValidation == true &&
        monthValidation == true &&
        yearValidation == true &&
        cvcValidation == true
    ) {
        formSection.style.display = 'none'
        thanksSection.style.display = 'block'
    }
})

function verifyIsFilled (divInput, divError){
    if(divInput.value.length == 0){
        showError(divInput, divError, "Can't be blank")
        return false
    } else {
        showError(divInput, divError, "", false)
        return true
    }
}

// SHOW ERROR
function showError (divInput, divError, msgError, show = true){
    if(show){
        divError.innerText = msgError;
        divInput.style.borderColor = '#FF0000'
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)'
    }
}