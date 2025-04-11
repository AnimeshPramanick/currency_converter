const fromAmount= document.getElementById('amount');
const toAmount= document.getElementById('convertedAmount');
const fromCurrency= document.querySelector('.from-currency');
const toCurrency = document.querySelector(".to-currency");
const result = document.querySelector(".result");


const countries = [
  { code: "USD", name: "United States Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "ZAR", name: "South African Rand" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "KRW", name: "South Korean Won" },
  { code: "THB", name: "Thai Baht" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "LKR", name: "Sri Lankan Rupee" },
];

countries.forEach((country) => {
  const option1 = document.createElement("option");
  option1.value = country.code;
  option1.textContent = country.code;
  fromCurrency.appendChild(option1);
  
  const option2 = document.createElement("option");
  option2.value = country.code;
  option2.textContent = country.code;
  toCurrency.appendChild(option2);

  fromCurrency.value="USD"
  toCurrency.value="INR"
});

const getExchangeRate =async() => {
     const amount=parseFloat(fromAmount.value);
     const fCurrency=fromCurrency.value;
     const tCurrency=toCurrency.value;

     const response = await fetch(
       `https://v6.exchangerate-api.com/v6/86cf8e7643b04cfe529769f0/latest/${fCurrency}`
     );
     const data=await response.json();

     const conversionRate = data.conversion_rates[tCurrency];
     const convertedAmount=conversionRate*amount;
     toAmount.value=convertedAmount.toFixed(3);
     result.innerHTML=`1 ${fCurrency} = ${conversionRate} ${tCurrency}`
     console.log(data);
};

const getReverseExchangeRate = async () => {
  const amount = parseFloat(toAmount.value);
  const fCurrency = fromCurrency.value;
  const tCurrency = toCurrency.value;

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/86cf8e7643b04cfe529769f0/latest/${fCurrency}`
  );
  const data = await response.json();

  const conversionRate = data.conversion_rates[tCurrency];
  const originalAmount = amount / conversionRate;

  fromAmount.value = originalAmount.toFixed(3);
  result.innerHTML = `1 ${fCurrency} = ${conversionRate} ${tCurrency}`;
  console.log(data);
};


fromAmount.addEventListener('input',getExchangeRate);
fromCurrency.addEventListener("change", getExchangeRate);
toCurrency.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);
toAmount.addEventListener("input", getReverseExchangeRate);

