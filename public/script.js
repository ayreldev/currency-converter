const currencies = [
    { code: "BRL", symbol: "R$" },
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
  ];
  
  function populateDropdowns() {
    const fromDropdown = document.getElementById('from');
    const toDropdown = document.getElementById('to');
  
    currencies.forEach(currency => {
      const optionFrom = document.createElement('option');
      optionFrom.value = currency.code;
      optionFrom.textContent = `${currency.code} (${currency.symbol})`;
      fromDropdown.appendChild(optionFrom);
  
      const optionTo = document.createElement('option');
      optionTo.value = currency.code;
      optionTo.textContent = `${currency.code} (${currency.symbol})`;
      toDropdown.appendChild(optionTo);
    });
  }
  
  function addToHistory(from, to, amount, result) {
    const historyList = document.getElementById('history');
    const fromCurrency = currencies.find(currency => currency.code === from);
    const toCurrency = currencies.find(currency => currency.code === to);
  
    const listItem = document.createElement('li');
    listItem.textContent = `${amount} ${fromCurrency.symbol} (${from}) = ${result.toFixed(2)} ${toCurrency.symbol} (${to})`;
    historyList.prepend(listItem);
  }
  
  document.getElementById('currency-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const amount = document.getElementById('amount').value;
  
    try {
      const response = await fetch(`/api/convert?from=${from}&to=${to}&amount=${amount}`);
      const data = await response.json();
  
      if (response.ok) {
        document.getElementById('result').textContent = `Resultado: ${data.result.toFixed(2)} ${to}`;
        addToHistory(from, to, amount, data.result);
      } else {
        document.getElementById('result').textContent = 'Erro ao converter moeda';
      }
    } catch (error) {
      document.getElementById('result').textContent = 'Erro ao converter moeda';
    }
  });

  populateDropdowns();
  