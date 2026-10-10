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
        tier1: "First 50 units",
        tier2: "Next 100 units",
        tier3: "Next 100 units",
        tier4: "Above 250 units",
        fixedFee: "Fixed Monthly Fee",
        tax: "Tax",
        error: "Please enter a valid positive number.",
        personalize: "Personalize Rates & Settings",
        lblCurrency: "Currency",
        lblFixed: "Fixed Monthly Fee",
        lblTax: "Tax Percentage (%)",
        lblTierRates: "Custom Tier Rates (per kWh)",
        btnResetSettings: "Reset Defaults",
        btnSaveSettings: "Save Preferences",
        settingsSaved: "Preferences Saved!"
    },
    es: {
        title: "Calculadora de Factura",
        subtitle: "Calcula tus costos al instante",
        usage: "Consumo Eléctrico",
        calcBtn: "Calcular Factura",
        resetBtn: "Calcular Otra",
        total: "Monto Total a Pagar",
        basedOn: "Basado en {units} kWh",
        breakdown: "Desglose",
        tier1: "Primeros 50 kWh",
        tier2: "Sig. 100 kWh",
        tier3: "Sig. 100 kWh",
        tier4: "Más de 250 kWh",
        fixedFee: "Cargo Fijo",
        tax: "Impuesto",
        error: "Número positivo válido.",
        personalize: "Personalizar Tarifas",
        lblCurrency: "Moneda",
        lblFixed: "Cargo Fijo Mensual",
        lblTax: "Impuesto (%)",
        lblTierRates: "Tarifas por Nivel",
        btnResetSettings: "Restablecer",
        btnSaveSettings: "Guardar",
        settingsSaved: "¡Guardado!"
    },
    fr: {
        title: "Calculateur de Facture",
        subtitle: "Calculez vos coûts instantanément",
        usage: "Consommation (kWh)",
        calcBtn: "Calculer",
        resetBtn: "Nouveau Calcul",
        total: "Montant Total",
        basedOn: "Basé sur {units} kWh",
        breakdown: "Détail",
        tier1: "50 premiers kWh",
        tier2: "100 kWh suivants",
        tier3: "100 kWh suivants",
        tier4: "Plus de 250 kWh",
        fixedFee: "Frais Fixes",
        tax: "Taxe",
        error: "Nombre positif requis.",
        personalize: "Personnaliser les Tarifs",
        lblCurrency: "Devise",
        lblFixed: "Frais Fixes Mensuels",
        lblTax: "Taxe (%)",
        lblTierRates: "Tarifs par Palier",
        btnResetSettings: "Réinitialiser",
        btnSaveSettings: "Enregistrer",
        settingsSaved: "Enregistré!"
    },
    bn: {
        title: "স্মার্ট বিল ক্যালকুলেটর",
        subtitle: "আপনার বিদ্যুৎ খরচ হিসাব করুন",
        usage: "বিদ্যুৎ ব্যবহার (kWh)",
        calcBtn: "হিসাব করুন",
        resetBtn: "আবার হিসাব করুন",
        total: "মোট প্রদেয়",
        basedOn: "{units} kWh এর উপর ভিত্তি করে",
        breakdown: "ধাপভিত্তিক খরচ",
        tier1: "প্রথম ৫০ ইউনিট",
        tier2: "পরবর্তী ১০০ ইউনিট",
        tier3: "পরবর্তী ১০০ ইউনিট",
        tier4: "২৫০ ইউনিটের উপরে",
        fixedFee: "মাসিক ফিক্সড চার্জ",
        tax: "ট্যাক্স",
        error: "সঠিক সংখ্যা লিখুন।",
        personalize: "রেট ও সেটিংস পরিবর্তন",
        lblCurrency: "মুদ্রা",
        lblFixed: "মাসিক ফিক্সড চার্জ",
        lblTax: "ট্যাক্স (%)",
        lblTierRates: "কাস্টম রেট (প্রতি kWh)",
        btnResetSettings: "রিসেট করুন",
        btnSaveSettings: "সেভ করুন",
        settingsSaved: "সেভ হয়েছে!"
    },
    hi: {
        title: "स्मार्ट बिल कैलकुलेटर",
        subtitle: "अपनी बिजली लागत की गणना करें",
        usage: "बिजली का उपयोग",
        calcBtn: "गणना करें",
        resetBtn: "दूसरी गणना",
        total: "कुल राशि",
        basedOn: "{units} kWh के आधार पर",
        breakdown: "टियर ब्रेकडाउन",
        tier1: "पहले 50 यूनिट",
        tier2: "अगले 100 यूनिट",
        tier3: "अगले 100 यूनिट",
        tier4: "250 यूनिट से ऊपर",
        fixedFee: "निश्चित शुल्क",
        tax: "कर (Tax)",
        error: "एक वैध संख्या दर्ज करें।",
        personalize: "दरें और सेटिंग्स अनुकूलित करें",
        lblCurrency: "मुद्रा",
        lblFixed: "निश्चित मासिक शुल्क",
        lblTax: "कर (%)",
        lblTierRates: "कस्टम टियर दरें",
        btnResetSettings: "डिफ़ॉल्ट रीसेट करें",
        btnSaveSettings: "सेव करें",
        settingsSaved: "सेव हो गया!"
    }
};

let currentLang = 'en';

// Settings state
let config = {
    currency: '$',
    fixedFee: 0,
    tax: 0,
    t1: 3.50,
    t2: 4.00,
    t3: 5.20,
    t4: 6.50
};

// Theme State
let isDark = false;

// Initialize
window.onload = () => {
    loadSettings();
    
    // Restore Language State
    const savedLang = localStorage.getItem('ebc_lang');
    if (savedLang) {
        currentLang = savedLang;
        document.getElementById('langSwitch').value = savedLang;
    } else {
        currentLang = document.getElementById('langSwitch').value;
    }
    updateLanguage();
    
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('ebc_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark = true;
        document.documentElement.classList.add('dark');
        document.getElementById('themeIcon').classList.replace('fa-moon', 'fa-sun');
    }
};

document.getElementById('themeToggle').addEventListener('click', () => {
    isDark = !isDark;
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    
    if (isDark) {
        html.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('ebc_theme', 'dark');
    } else {
        html.classList.remove('dark');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('ebc_theme', 'light');
    }
});

document.getElementById('langSwitch').addEventListener('change', function(e) {
    currentLang = e.target.value;
    localStorage.setItem('ebc_lang', currentLang);
    updateLanguage();
    reRenderIfCalculated();
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
    
    document.getElementById('personalizeBtn').innerText = t.personalize;
    document.getElementById('lblCurrency').innerText = t.lblCurrency;
    document.getElementById('lblFixed').innerText = t.lblFixed;
    document.getElementById('lblTax').innerText = t.lblTax;
    document.getElementById('lblTierRates').innerText = t.lblTierRates;
    document.getElementById('btnResetSettings').innerText = t.btnResetSettings;
    if(document.getElementById('btnSaveSettings').innerText !== t.settingsSaved) {
        document.getElementById('btnSaveSettings').innerText = t.btnSaveSettings;
    }
}

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    const icon = document.getElementById('settingsIcon');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        icon.style.transform = "rotate(180deg)";
    } else {
        panel.classList.add('hidden');
        icon.style.transform = "rotate(0deg)";
    }
}

function loadSettings() {
    const saved = localStorage.getItem('ebc_config');
    if (saved) {
        config = { ...config, ...JSON.parse(saved) };
    }
    document.getElementById('setCurrency').value = config.currency;
    document.getElementById('setFixed').value = config.fixedFee;
    document.getElementById('setTax').value = config.tax;
    document.getElementById('setT1').value = config.t1;
    document.getElementById('setT2').value = config.t2;
    document.getElementById('setT3').value = config.t3;
    document.getElementById('setT4').value = config.t4;
    document.getElementById('currencySymbol').innerText = config.currency;
}

function saveSettings() {
    config.currency = document.getElementById('setCurrency').value;
    config.fixedFee = parseFloat(document.getElementById('setFixed').value) || 0;
    config.tax = parseFloat(document.getElementById('setTax').value) || 0;
    config.t1 = parseFloat(document.getElementById('setT1').value) || 0;
    config.t2 = parseFloat(document.getElementById('setT2').value) || 0;
    config.t3 = parseFloat(document.getElementById('setT3').value) || 0;
    config.t4 = parseFloat(document.getElementById('setT4').value) || 0;
    
    localStorage.setItem('ebc_config', JSON.stringify(config));
    document.getElementById('currencySymbol').innerText = config.currency;
    
    const btn = document.getElementById('btnSaveSettings');
    const ogText = btn.innerText;
    btn.innerText = i18n[currentLang].settingsSaved;
    btn.classList.add('bg-green-100', 'text-green-700');
    setTimeout(() => {
        btn.innerText = i18n[currentLang].btnSaveSettings;
        btn.classList.remove('bg-green-100', 'text-green-700');
    }, 2000);
    
    reRenderIfCalculated();
}

function resetSettings() {
    localStorage.removeItem('ebc_config');
    config = { currency: '$', fixedFee: 0, tax: 0, t1: 3.50, t2: 4.00, t3: 5.20, t4: 6.50 };
    loadSettings();
    reRenderIfCalculated();
}

function reRenderIfCalculated() {
    const units = document.getElementById('units').value;
    if (units && !document.getElementById('resultBox').classList.contains('hidden')) {
        renderBreakdown(parseFloat(units));
    }
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

    renderBreakdown(units);
    
    const resultBox = document.getElementById('resultBox');
    resultBox.classList.remove('hidden');
    resultBox.classList.remove('animate-fade-in');
    void resultBox.offsetWidth; // trigger reflow
    resultBox.classList.add('animate-fade-in');
}

function renderBreakdown(units) {
    const t = i18n[currentLang];
    
    let basedOnStr = t.basedOn.replace('{units}', units);
    document.getElementById('basedOnLabel').innerHTML = basedOnStr.replace(units, `<span id="basedOnUnits" class="font-bold">${units}</span>`);
    
    const list = document.getElementById('breakdownList');
    list.innerHTML = '';
    
    let subtotal = 0;
    const c = config.currency;

    if (units > 0) {
        const u = Math.min(50, units);
        const amt = u * config.t1;
        subtotal += amt;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier1} (x ${c}${config.t1})</span> <span class="font-bold">${c}${amt.toFixed(2)}</span></li>`;
    }
    if (units > 50) {
        const u = Math.min(100, units - 50);
        const amt = u * config.t2;
        subtotal += amt;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier2} (x ${c}${config.t2})</span> <span class="font-bold">${c}${amt.toFixed(2)}</span></li>`;
    }
    if (units > 150) {
        const u = Math.min(100, units - 150);
        const amt = u * config.t3;
        subtotal += amt;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier3} (x ${c}${config.t3})</span> <span class="font-bold">${c}${amt.toFixed(2)}</span></li>`;
    }
    if (units > 250) {
        const u = (units - 250);
        const amt = u * config.t4;
        subtotal += amt;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1"><span>${t.tier4} (x ${c}${config.t4})</span> <span class="font-bold">${c}${amt.toFixed(2)}</span></li>`;
    }

    if (config.fixedFee > 0) {
        subtotal += config.fixedFee;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1 text-green-800"><span>${t.fixedFee}</span> <span class="font-bold">${c}${config.fixedFee.toFixed(2)}</span></li>`;
    }

    let finalTotal = subtotal;
    if (config.tax > 0) {
        const taxAmt = subtotal * (config.tax / 100);
        finalTotal += taxAmt;
        list.innerHTML += `<li class="flex justify-between items-center border-b border-green-100/50 pb-1 text-green-800"><span>${t.tax} (${config.tax}%)</span> <span class="font-bold">+${c}${taxAmt.toFixed(2)}</span></li>`;
    }

    document.getElementById('totalAmount').innerText = finalTotal.toFixed(2);
}

function resetForm() {
    document.getElementById('units').disabled = false;
    document.getElementById('units').value = '';
    document.getElementById('units').focus();
    
    document.getElementById('resultBox').classList.add('hidden');
    document.getElementById('calcBtn').classList.remove('hidden');
    document.getElementById('resetBtn').classList.add('hidden');
}
