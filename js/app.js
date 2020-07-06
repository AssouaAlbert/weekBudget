//Varaibles
const totalBudget = document.getElementById('total');
const expense = document.getElementById('expense');
const amount = document.getElementById('amount');
const left = document.getElementById('left');
const form = document.getElementById('add-expenses');
regExp = /[0-9]+/;

//Event listeners
document.addEventListener("DOMContentLoaded", getbudgetOnload);
document.addEventListener('submit',createBudget);

//Functions
function createBudget(e){
    e.preventDefault();
    if(expense.value == '' || expense.value == null){
        htmlui.displayError('Please, Enter Transaction',"alert-danger");
        expense.value ='';
    }
    else if(!(regExp.test(amount.value))){
        htmlui.displayError('Please, Enter correct amount!!',"alert-danger");
        amount.value ='';
    }
    else{
    htmlui.displayError('Success Added',"alert-success");
    htmlui.addToList(expense.value, amount.value);
    htmlui.cal_Balance(amount.value);
    }
}
function getbudgetOnload () {
    let weeklyBudget = prompt("What is your weekly budget");
    console.log('weeklyBudget: ', typeof weeklyBudget);
    console.log('regExp.test(weeklyBudget): ', regExp.test(weeklyBudget));
    if(!regExp.test(weeklyBudget) || weeklyBudget <= 0){    
        alert("Enter a budget!!!");
        window.location.reload();
    }
    else{
        htmlui = new HTMLUI();
        balance = new NewTransaction(weeklyBudget);
        htmlui.displayStartinBudget(weeklyBudget);
    }
}
class HTMLUI {
    displayStartinBudget(weeklyBudget){
        totalBudget.textContent = `${weeklyBudget}`;
        left.textContent = `${weeklyBudget}`;
    }
    displayError(message,addClass,target){
        const emessage = document.createElement('div');
        emessage.classList.add('text-center', 'alert', addClass);
        emessage.appendChild(document.createTextNode(message));
        document.querySelector('.primary').insertBefore(emessage, form);
        let id = 0;
        id = setTimeout (() => {
        emessage.remove();
        }, 3000)
    }
    addToList(trans, amount){
        const transList = document.querySelector('#expenses ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
        ${trans}
        <span class="badge badge-primary badge-pill">$ ${amount}</span>
        `;

        // Insert Into HTML
        transList.appendChild(li);

    }  
    cal_Balance(amount){
        let balanceLeft = balance.balance(amount);
        if(balanceLeft<=(balance.budget/2)){
        // Add the class: danger
            left.parentElement.parentElement.classList.remove('alert-success');
            left.parentElement.parentElement.classList.add('alert-warning');
        }
        if(balanceLeft<=(balance.budget/4)){
            left.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            left.parentElement.parentElement.classList.add('alert-danger');
        }
        left.innerHTML=`${balanceLeft}`;

    } 
}
class NewTransaction{
    constructor (amount){
        this.budget = amount;
        this.balanceLeft = amount;
    }
    balance(expense){
        return this.balanceLeft -= expense;
    }
}
