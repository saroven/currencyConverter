let countryCode = {
   AED: "AE",
   AFN: "AF",
   XCD: "AG",
   ALL: "AL",
   AMD: "AM",
   ANG: "AN",
   AOA: "AO",
   AQD: "AQ",
   ARS: "AR",
   AUD: "AU",
   AZN: "AZ",
   BAM: "BA",
   BBD: "BB",
   BDT: "BD",
   XOF: "BE",
   BGN: "BG",
   BHD: "BH",
   BIF: "BI",
   BMD: "BM",
   BND: "BN",
   BOB: "BO",
   BRL: "BR",
   BSD: "BS",
   NOK: "BV",
   BWP: "BW",
   BYR: "BY",
   BZD: "BZ",
   CAD: "CA",
   CDF: "CD",
   XAF: "CF",
   CHF: "CH",
   CLP: "CL",
   CNY: "CN",
   COP: "CO",
   CRC: "CR",
   CUP: "CU",
   CVE: "CV",
   CYP: "CY",
   CZK: "CZ",
   DJF: "DJ",
   DKK: "DK",
   DOP: "DO",
   DZD: "DZ",
   ECS: "EC",
   EEK: "EE",
   EGP: "EG",
   ETB: "ET",
   EUR: "FR",
   FJD: "FJ",
   FKP: "FK",
   GBP: "GB",
   GEL: "GE",
   GGP: "GG",
   GHS: "GH",
   GIP: "GI",
   GMD: "GM",
   GNF: "GN",
   GTQ: "GT",
   GYD: "GY",
   HKD: "HK",
   HNL: "HN",
   HRK: "HR",
   HTG: "HT",
   HUF: "HU",
   IDR: "ID",
   ILS: "IL",
   INR: "IN",
   IQD: "IQ",
   IRR: "IR",
   ISK: "IS",
   JMD: "JM",
   JOD: "JO",
   JPY: "JP",
   KES: "KE",
   KGS: "KG",
   KHR: "KH",
   KMF: "KM",
   KPW: "KP",
   KRW: "KR",
   KWD: "KW",
   KYD: "KY",
   KZT: "KZ",
   LAK: "LA",
   LBP: "LB",
   LKR: "LK",
   LRD: "LR",
   LSL: "LS",
   LTL: "LT",
   LVL: "LV",
   LYD: "LY",
   MAD: "MA",
   MDL: "MD",
   MGA: "MG",
   MKD: "MK",
   MMK: "MM",
   MNT: "MN",
   MOP: "MO",
   MRO: "MR",
   MTL: "MT",
   MUR: "MU",
   MVR: "MV",
   MWK: "MW",
   MXN: "MX",
   MYR: "MY",
   MZN: "MZ",
   NAD: "NA",
   XPF: "NC",
   NGN: "NG",
   NIO: "NI",
   NPR: "NP",
   NZD: "NZ",
   OMR: "OM",
   PAB: "PA",
   PEN: "PE",
   PGK: "PG",
   PHP: "PH",
   PKR: "PK",
   PLN: "PL",
   PYG: "PY",
   QAR: "QA",
   RON: "RO",
   RSD: "RS",
   RUB: "RU",
   RWF: "RW",
   SAR: "SA",
   SBD: "SB",
   SCR: "SC",
   SDG: "SD",
   SEK: "SE",
   SGD: "SG",
   SKK: "SK",
   SLL: "SL",
   SOS: "SO",
   SRD: "SR",
   STD: "ST",
   SVC: "SV",
   SYP: "SY",
   SZL: "SZ",
   THB: "TH",
   TJS: "TJ",
   TMT: "TM",
   TND: "TN",
   TOP: "TO",
   TRY: "TR",
   TTD: "TT",
   TWD: "TW",
   TZS: "TZ",
   UAH: "UA",
   UGX: "UG",
   USD: "US",
   UYU: "UY",
   UZS: "UZ",
   VEF: "VE",
   VND: "VN",
   VUV: "VU",
   YER: "YE",
   ZAR: "ZA",
   ZMK: "ZM",
   ZWD: "ZW"
};

const selectList = document.querySelectorAll(".selectGroup select"),
   convertButton = document.getElementById("button"),
   fromCurrency = document.querySelector(".from select"),
   toCurrency = document.querySelector(".to select");

for (let i = 0; i < selectList.length; i++) {
   let selected = "";

   for (currencyCode in countryCode) {
      if (i == 0) {
         selected = currencyCode == "USD" ? "selected" : "";
      } else if (i == 1) {
         selected = currencyCode == "BDT" ? "selected" : "";
      }
      let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
      selectList[i].insertAdjacentHTML("beforeend", optionTag);
   }
   selectList[i].addEventListener("change", (e) => {
      loadFlag(e.target);
   });
}

window.addEventListener("load", (e) => {
   getCurrentRate();
   loadFlag(fromCurrency);
   loadFlag(toCurrency);
});

const exchangeIcon = document.querySelector(".exchangeIcon");
exchangeIcon.addEventListener("click", (e) => {
   let tempCode = fromCurrency.value;
   fromCurrency.value = toCurrency.value;
   toCurrency.value = tempCode;
   getCurrentRate();

   loadFlag(fromCurrency);
   loadFlag(toCurrency);
});
let checkClicked = 0;
convertButton.addEventListener("click", (e) => {
   e.stopImmediatePropagation();
   e.preventDefault();
   checkClicked++;
   getCurrentRate();
});

function loadFlag(element) {
   for (code in countryCode) {
      if (code == element.value) {
         let imgTag = element.parentElement.querySelector("img");
         imgTag.src = `https://countryflagsapi.com/svg/${countryCode[code]}`;
      }
   }
}

function getCurrentRate() {
   const exchangeRateText = document.querySelector(".exchangeRate");
   exchangeRateText.innerHTML = "Getting Rate....";
   const amount = document.querySelector(".inputGroup input");
   let amountValue = amount.value;

   if (amountValue == "0" || amountValue == "") {
      amount.value = "1";
      amountValue = 1;
   }

   let apiKey = "b3bd12c6a6ef0181426d27bc";
   let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         const conversionRate = data.conversion_rates[toCurrency.value];
         let totalConversion = (amountValue * conversionRate).toFixed(2);
         let conVal = "";
         if (checkClicked !== 0) {
            conVal =
               amountValue +
               " " +
               fromCurrency.value +
               " = " +
               totalConversion +
               toCurrency.value +
               " </br> ";
         }

         let oneVal =
            "1 " +
            fromCurrency.value +
            " = " +
            totalConversion +
            toCurrency.value;

         exchangeRateText.innerHTML =
            conVal + " <span> Exchange Rate " + oneVal + "</span";
      })
      .catch(() => {
         exchangeRateText.innerHTML = "Something went wrong.";
      });
}
