const i18n = {
    en: {
        title: "Smart Bill Calculator",
        subtitle: "Calculate your electricity costs instantly",
        usage: "Electricity Usage",
        calcBtn: "Calculate Bill",
        resetBtn: "Calculate Another",
        total: "Total Amount Due",
        basedOn: "Based on {units} kWh usage",
        breakdown: "Tier Breakdown",
        tier1: "First 50 units (x $3.50)",
        tier2: "Next 100 units (x $4.00)",
        tier3: "Next 100 units (x $5.20)",
        tier4: "Above 250 units (x $6.50)",
        error: "Please enter a valid positive number."
    },
    es: {
        title: "Calculadora de Factura",
        subtitle: "Calcula tus costos de electricidad al instante",
        usage: "Consumo de Electricidad",
        calcBtn: "Calcular Factura",
        resetBtn: "Calcular Otra",
        total: "Monto Total a Pagar",
        basedOn: "Basado en {units} kWh de consumo",
        breakdown: "Desglose por Niveles",
        tier1: "Primeros 50 kWh (x $3.50)",
        tier2: "Siguientes 100 kWh (x $4.00)",
        tier3: "Siguientes 100 kWh (x $5.20)",
        tier4: "Más de 250 kWh (x $6.50)",
        error: "Por favor ingrese un número positivo válido."
    },
    fr: {
        title: "Calculateur de Facture",
        subtitle: "Calculez vos coûts d'électricité instantanément",
        usage: "Consommation d'Électricité",
        calcBtn: "Calculer la Facture",
        resetBtn: "Calculer une Autre",
        total: "Montant Total Dû",
        basedOn: "Basé sur {units} kWh de consommation",
        breakdown: "Détail par Paliers",
        tier1: "50 premiers kWh (x 3,50 $)",
        tier2: "100 kWh suivants (x 4,00 $)",
        tier3: "100 kWh suivants (x 5,20 $)",
        tier4: "Au-dessus de 250 kWh (x 6,50 $)",
        error: "Veuillez entrer un nombre positif valide."
    },
    bn: {
        title: "স্মার্ট বিদ্যুৎ বিল ক্যালকুলেটর",
        subtitle: "আপনার বিদ্যুৎ খরচ সাথে সাথে হিসাব করুন",
        usage: "বিদ্যুৎ ব্যবহার",
        calcBtn: "বিল হিসাব করুন",
        resetBtn: "আবার হিসাব করুন",
        total: "মোট প্রদেয় পরিমাণ",
        basedOn: "{units} kWh ব্যবহারের উপর ভিত্তি করে",
        breakdown: "ধাপভিত্তিক খরচ",
        tier1: "প্রথম ৫০ ইউনিট (x $৩.৫০)",
        tier2: "পরবর্তী ১০০ ইউনিট (x $৪.০০)",
        tier3: "পরবর্তী ১০০ ইউনিট (x $৫.২০)",
        tier4: "২৫০ ইউনিটের উপরে (x $৬.৫০)",
        error: "অনুগ্রহ করে একটি সঠিক ধনাত্মক সংখ্যা লিখুন।"
    },
    hi: {
        title: "स्मार्ट बिल कैलकुलेटर",
        subtitle: "अपनी बिजली लागत की तुरंत गणना करें",
        usage: "बिजली का उपयोग",
        calcBtn: "बिल की गणना करें",
        resetBtn: "दूसरी गणना करें",
        total: "कुल देय राशि",
        basedOn: "{units} kWh उपयोग के आधार पर",
        breakdown: "टियर ब्रेकडाउन",
        tier1: "पहले 50 यूनिट (x $3.50)",
        tier2: "अगले 100 यूनिट (x $4.00)",
        tier3: "अगले 100 यूनिट (x $5.20)",
        tier4: "250 यूनिट से ऊपर (x $6.50)",
        error: "कृपया एक वैध धनात्मक संख्या दर्ज करें।"
    }
};

let currentLang = 'en';

document.getElementById('langSwitch').addEventListener('change', function(e) {
    currentLang = e.target.value;
    updateLanguage();
    
    // Re-render breakdown if result is visible
    const units = document.getElementById('units').value;
    if (units && !document.getElementById('resultBox').classList.contains('hidden')) {
        renderBreakdown(parseFloat(units));
    }
});

function updateLanguage() {
    const t = i18n[currentLang];
    document.getElementById('appTitle').innerText = t.title;
    document.getElementById('appSubtitle').innerText = t.subtitle;
    document.getElementById('usageLabel').innerText = t.usage;
    document.querySelector('#calcBtn span').innerText = t.calcBtn;
    document.querySelector('#resetBtn span').innerText = t.resetBtn;
    document.getElementById('totalLabel').innerText = t.total;
    document.getElementById('breakdownLabel').innerText = t.breakdown;
    document.querySelector('#errorMsg span').innerText = t.error;
}

function calculateBill(e) {
    e.preventDefault();
    const unitsInput = document.getElementById('units').value;
    const units = parseFloat(unitsInput);
    
    if (isNaN(units) || units < 0) {
        document.getElementById('errorMsg').classList.remove('hidden');
        document.getElementById('resultBox').classList.add('hidden');
        return;
    }
    
    document.getElementById('errorMsg').classList.add('hidden');
    document.getElementById('calcBtn').classList.add('hidden');
    document.getElementById('resetBtn').classList.remove('hidden');
    document.getElementById('units').disabled = true;

    // Calculate total
    let total = 0;
    let remaining = units;

    if (remaining <= 50) {
        total = remaining * 3.50;
    } else if (remaining <= 150) {
        total = (50 * 3.50) + ((remaining - 50) * 4.00);
    } else if (remaining <= 250) {
        total = (50 * 3.50) + (100 * 4.00) + ((remaining - 150) * 5.20);
    } else {
        total = (50 * 3.50) + (100 * 4.00) + (100 * 5.20) + ((remaining - 250) * 6.50);
    }

    document.getElementById('totalAmount').innerText = total.toFixed(2);
    
    renderBreakdown(units);
    
    const resultBox = document.getElementById('resultBox');
    resultBox.classList.remove('hidden');
    // Re-trigger animation
    resultBox.classList.remove('animate-fade-in');
    void resultBox.offsetWidth;
    resultBox.classList.add('animate-fade-in');
}

function renderBreakdown(units) {
    const t = i18n[currentLang];
    
    let basedOnStr = t.basedOn.replace('{units}', units);
    document.getElementById('basedOnLabel').innerHTML = basedOnStr.replace(units, `<span id="basedOnUnits" class="font-bold">${units}</span>`);
    
    const list = document.getElementById('breakdownList');
    list.innerHTML = '';

    if (units > 0) {
        const amt = Math.min(50, units) * 3.50;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier1}</span> <span class="font-bold">$${amt.toFixed(2)}</span></li>`;
    }
    if (units > 50) {
        const amt = Math.min(100, units - 50) * 4.00;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier2}</span> <span class="font-bold">$${amt.toFixed(2)}</span></li>`;
    }
    if (units > 150) {
        const amt = Math.min(100, units - 150) * 5.20;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier3}</span> <span class="font-bold">$${amt.toFixed(2)}</span></li>`;
    }
    if (units > 250) {
        const amt = (units - 250) * 6.50;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier4}</span> <span class="font-bold">$${amt.toFixed(2)}</span></li>`;
    }
}

function resetForm() {
    document.getElementById('units').disabled = false;
    document.getElementById('units').value = '';
    document.getElementById('units').focus();
    
    document.getElementById('resultBox').classList.add('hidden');
    document.getElementById('calcBtn').classList.remove('hidden');
    document.getElementById('resetBtn').classList.add('hidden');
}
