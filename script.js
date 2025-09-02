const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll("select");
let button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (let currCode of Object.keys(countryList)) {
   let newOption = document.createElement("option");
   newOption.innerText = currCode; 
   newOption.value = currCode;
   if (select.name === "from" && currCode ==="USD"){
    newOption.selected = "selected";
   } else if (select.name === "to" && currCode ==="INR"){
    newOption.selected = "selected";
   }
   select.append(newOption);
}
 select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
 })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img =  element.parentElement.querySelector("img");
   img.src = newSrc;
}

button.addEventListener("click",  async (e) => {
   e.preventDefault();

   let amount = document.querySelector(".amount input")
   let amtVal = amount.value;
   if (amtVal === "" || amtVal <  1){
    amtVal = 1;
    amount.value = 1;
   }

  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
 try{

   const url = `${BASE_URL}/${from}.json`;
   let response = await fetch(url);
   let data = await response.json();

   let rate = data[from][to];

   let finalAmount = (amtVal * rate).toFixed(2);
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
 }
catch (err){
  msg.innerText = "Error fetching exchange rate";
    console.error(err);
}

});