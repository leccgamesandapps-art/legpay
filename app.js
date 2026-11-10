// LEGpay — Buy Load Demo
// Frontend only. No real payments or load delivery.

const state = {
  network: null,
  number: '',
  selectedLoad: null,
  ref: null,
};

const loadCatalog = {
  recommended: [
    { id: 'r1', name: 'Regular 50', desc: 'Straight load • Valid 15 days', price: 50 },
    { id: 'r2', name: 'Regular 100', desc: 'Straight load • Valid 30 days', price: 100 },
    { id: 'r3', name: 'Regular 200', desc: 'Straight load • Valid 60 days', price: 200 },
    { id: 'r4', name: 'Data 99', desc: 'Popular data promo', price: 99 },
    { id: 'r5', name: 'Unli Text 50', desc: 'All-net texts promo', price: 50 },
  ],
  regular: [
    { id: 'reg10', name: '₱10', desc: 'Regular load', price: 10 },
    { id: 'reg15', name: '₱15', desc: 'Regular load', price: 15 },
    { id: 'reg20', name: '₱20', desc: 'Regular load', price: 20 },
    { id: 'reg30', name: '₱30', desc: 'Regular load', price: 30 },
    { id: 'reg50', name: '₱50', desc: 'Regular load', price: 50 },
    { id: 'reg75', name: '₱75', desc: 'Regular load', price: 75 },
    { id: 'reg100', name: '₱100', desc: 'Regular load', price: 100 },
    { id: 'reg150', name: '₱150', desc: 'Regular load', price: 150 },
    { id: 'reg200', name: '₱200', desc: 'Regular load', price: 200 },
    { id: 'reg300', name: '₱300', desc: 'Regular load', price: 300 },
    { id: 'reg500', name: '₱500', desc: 'Regular load', price: 500 },
    { id: 'reg1000', name: '₱1000', desc: 'Regular load', price: 1000 },
  ],
  promo: [
    { id: 'p1', name: 'GoSAKTO 50', desc: 'Calls + texts + data', price: 50 },
    { id: 'p2', name: 'Go+ 99', desc: 'All-in promo', price: 99 },
    { id: 'p3', name: 'Unli Call & Text 99', desc: 'All networks', price: 99 },
    { id: 'p4', name: 'Giga Surf 50', desc: 'Data focused', price: 50 },
    { id: 'p5', name: 'Level-Up 99', desc: 'DITO style pack', price: 99 },
    { id: 'p6', name: 'Big Bytes 299', desc: 'Heavy data', price: 299 },
  ],
  data: [
    { id: 'd1', name: 'Data 10', desc: '500MB • 1 day', price: 10 },
    { id: 'd2', name: 'Data 30', desc: '2GB • 3 days', price: 30 },
    { id: 'd3', name: 'Data 50', desc: '3–5GB • 7 days', price: 50 },
    { id: 'd4', name: 'Data 99', desc: '8–12GB • 15–30 days', price: 99 },
    { id: 'd5', name: 'Data 199', desc: '15–25GB • 30 days', price: 199 },
    { id: 'd6', name: 'Data 299', desc: '30GB+ • 30 days', price: 299 },
  ],
};

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function formatNumber(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) return digits.slice(0, 11);
  if (digits.startsWith('63')) return '0' + digits.slice(2, 12);
  if (digits.length <= 10) return '0' + digits;
  return digits.slice(0, 11);
}

function displayNumber(num) {
  if (!num) return '';
  const d = num.replace(/\D/g, '');
  if (d.length === 11) {
    return d.slice(0, 4) + ' ' + d.slice(4, 7) + ' ' + d.slice(7);
  }
  return num;
}

function generateRef() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LEG-${t}-${r}`;
}

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#${id}`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$$('.network-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.network-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.network = btn.dataset.network;
    validateForm();
  });
});

const numberInput = $('#mobile-number');
numberInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  if (val.length > 11) val = val.slice(0, 11);
  e.target.value = val;
  state.number = formatNumber(val);
  validateForm();
});

function validateForm() {
  const btn = $('#btn-continue');
  const hint = $('#number-hint');
  const num = state.number.replace(/\D/g, '');

  if (!state.network) {
    btn.disabled = true;
    hint.textContent = 'Select a network first';
    hint.classList.remove('error');
    return;
  }

  if (num.length < 10) {
    btn.disabled = true;
    hint.textContent = 'Enter a valid 10–11 digit number';
    hint.classList.remove('error');
    return;
  }

  if (!/^09\d{9}$/.test(num) && !/^9\d{9}$/.test(num)) {
    btn.disabled = true;
    hint.textContent = 'Must be a valid PH mobile number (09XXXXXXXXX)';
    hint.classList.add('error');
    return;
  }

  btn.disabled = false;
  hint.textContent = `${state.network} • Ready`;
  hint.classList.remove('error');
}

$('#btn-continue').addEventListener('click', () => {
  if (!$('#btn-continue').disabled) {
    $('#selected-network-display').textContent = state.network;
    $('#selected-number-display').textContent = displayNumber(state.number);
    renderLoads('recommended');
    showScreen('screen-load');
  }
});

$('#back-to-select').addEventListener('click', () => showScreen('screen-select'));
$('#back-to-load').addEventListener('click', () => showScreen('screen-load'));
$('#back-to-payment').addEventListener('click', () => showScreen('screen-payment'));

$$('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderLoads(tab.dataset.tab);
  });
});

function renderLoads(category) {
  const list = $('#load-list');
  list.innerHTML = '';
  const items = loadCatalog[category] || [];

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'load-item';
    btn.innerHTML = `
      <div>
        <div class="load-name">${item.name}</div>
        <div class="load-desc">${item.desc}</div>
      </div>
      <div class="load-price">₱${item.price}</div>
    `;
    btn.addEventListener('click', () => selectLoad(item));
    list.appendChild(btn);
  });
}

function selectLoad(item) {
  state.selectedLoad = item;
  state.ref = generateRef();

  $('#pay-network').textContent = state.network;
  $('#pay-number').textContent = displayNumber(state.number);
  $('#pay-load').textContent = item.name;
  $('#pay-amount').textContent = `₱${item.price}`;

  showScreen('screen-payment');
}

$('#pay-direct').addEventListener('click', () => {
  alert(
    'Demo Mode\n\n' +
    'In a real integration this would open GCash or a payment gateway checkout.\n\n' +
    'For this demo we will simulate a successful payment.'
  );
  completePayment();
});

$('#pay-qr').addEventListener('click', () => {
  $('#qr-amount-display').textContent = `₱${state.selectedLoad.price}`;
  $('#qr-ref').textContent = state.ref;
  drawSimpleQR();
  showScreen('screen-qr');
});

function drawSimpleQR() {
  const canvas = $('#qr-canvas');
  const ctx = canvas.getContext('2d');
  const size = 200;
  const cell = 8;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#000000';
  const seed = state.ref.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  function drawFinder(x, y) {
    ctx.fillRect(x, y, cell * 7, cell * 7);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + cell, y + cell, cell * 5, cell * 5);
    ctx.fillStyle = '#000';
    ctx.fillRect(x + cell * 2, y + cell * 2, cell * 3, cell * 3);
  }

  drawFinder(cell * 1, cell * 1);
  drawFinder(size - cell * 8, cell * 1);
  drawFinder(cell * 1, size - cell * 8);

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 25; x++) {
      if ((x < 9 && y < 9) || (x > 15 && y < 9) || (x < 9 && y > 15)) continue;
      const n = (seed + x * 17 + y * 31) % 100;
      if (n < 45) {
        ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
      }
    }
  }
}

$('#btn-simulate-paid').addEventListener('click', completePayment);

function completePayment() {
  const now = new Date();
  $('#success-number').textContent = displayNumber(state.number);
  $('#success-network').textContent = state.network;
  $('#success-amount').textContent = `₱${state.selectedLoad.price}`;
  $('#success-ref').textContent = state.ref;
  $('#success-date').textContent = now.toLocaleString('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  showScreen('screen-success');
}

$('#btn-new').addEventListener('click', () => {
  state.network = null;
  state.number = '';
  state.selectedLoad = null;
  state.ref = null;
  $$('.network-btn').forEach(b => b.classList.remove('selected'));
  numberInput.value = '';
  $('#number-hint').textContent = 'Select a network first';
  $('#number-hint').classList.remove('error');
  $('#btn-continue').disabled = true;
  showScreen('screen-select');
});

validateForm();
console.log('LEGpay demo ready');
