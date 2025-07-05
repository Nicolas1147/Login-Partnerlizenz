document.addEventListener('DOMContentLoaded', () => {

    const appData = {
        flowInfo: {
            step1: "Die Agentur für Arbeit prüft den Antrag und stellt bei Genehmigung die Fördermittel bereit. Unser Backoffice kümmert sich um die gesamte Kommunikation und den Papierkram.",
            step2: "Der Endkunde Ihres Kunden erhält eine Lohnkostenerstattung von 75% für den teilnehmenden Mitarbeiter über einen Zeitraum von sechs Monaten. Das schafft erhebliche liquide Mittel.",
            step3: "Mit dieser neu geschaffenen Liquidität bezahlt der Endkunde Ihre Agenturdienstleistung. Ihr Angebot wird somit für ihn quasi kostenneutral.",
            step4: "Ein Teil der Förderung deckt die Kosten der Weiterbildung ab. Der zertifizierte Bildungsträger führt den Kurs durch und wird dafür vergütet.",
        },
        objections: [
            {
                keyword: "risiko ablehnung förderung",
                title: "Was passiert, wenn die Förderung nicht genehmigt wird?",
                content: `<b>Das Framing: Sicherheit & Entlastung</b><br><br> "Eine absolut berechtigte Frage, die uns zeigt, dass Sie vorausschauend planen. Genau für diesen Fall haben wir vorgesorgt: Wir arbeiten mit einem Garantievertrag. Das bedeutet für Sie: Das Angebot wird nur dann gültig, wenn die Förderung auch wirklich fließt. Sollte der Antrag wider Erwarten abgelehnt werden, entsteht für Sie keinerlei Verpflichtung. Sie haben also null Risiko, aber die volle Chance auf eine erhebliche finanzielle Entlastung. Bedenken Sie: Unsere Erfolgsquote liegt bei über 70%, die Wahrscheinlichkeit für einen Erfolg ist also sehr hoch."`
            },
            {
                keyword: "zeitaufwand mitarbeiter schulung",
                title: "Mein Mitarbeiter hat keine Zeit für eine 6-monatige Schulung.",
                content: `<b>Das Framing: Clevere & Flexible Lösung</b><br><br> "Ich verstehe vollkommen, dass im Tagesgeschäft jede Arbeitsstunde zählt. Die gute Nachricht ist: Die Weiterbildung ist als flexible Online-Maßnahme konzipiert. Die formalen Anwesenheitspflichten werden erfüllt, ohne den Betriebsablauf zu stören. In der Praxis bedeutet das für viele unserer Partner, dass der Mitarbeiter weiterhin seinen Aufgaben nachgehen kann. Sehen Sie es als eine smarte Optimierung: Sie erfüllen die formalen Anforderungen für die Förderung und sichern sich die finanzielle Freiheit, während Ihr Betrieb ungestört weiterläuft."`
            },
            {
                keyword: "seriosität betrug fördermittelbetrug",
                title: "Ist das überhaupt seriös? Das klingt nach Fördermittelbetrug.",
                content: `<b>Das Framing: Win-Win-Win & Staatlicher Wille</b><br><br> "Ein wichtiger Punkt. Lassen Sie mich das klarstellen: Dieses Modell ist 100% legal und basiert auf dem Qualifizierungschancengesetz des Staates. Der Staat hat dieses Gesetz geschaffen, weil er ein riesiges Interesse daran hat, Mitarbeiter weiterzubilden, um Arbeitsplätze für die digitale Zukunft zu sichern. Wir nutzen diesen Mechanismus auf eine clevere Weise, die allen zugutekommt: Der Staat erreicht sein Ziel, Ihr Kunde bekommt qualifizierte Mitarbeiter, Ihre Agentur kann wertvolle Dienstleistungen erbringen und der Mitarbeiter selbst profitiert von einer kostenlosen Weiterbildung. Wir nennen das 'steuereffiziente Geld-Zurückbeschaffung' – alles im Rahmen der gesetzlichen Möglichkeiten."`
            },
            {
                keyword: "falsche kunden undankbar",
                title: "Ziehe ich damit nicht nur 'Schnäppchenjäger' an?",
                content: `<b>Das Framing: Strategisches Werkzeug</b><br><br> "Das ist eine kluge strategische Überlegung. Deshalb empfehlen wir, die Förderung nicht als pauschalen Rabatt zu bewerben, sondern als Ihr 'Ass im Ärmel'. Sie setzen es gezielt dann ein, wenn Sie einen qualifizierten Kunden vor sich haben, bei dem das Budget die letzte Hürde ist. So stellen Sie sicher, dass Sie weiterhin mit wertschätzenden Kunden arbeiten, denen Sie aber eine unschlagbare Lösung für deren Finanzierungsproblem bieten können. Es ist ein Werkzeug, um gute Kunden zu gewinnen, nicht um undankbare anzuziehen."`
            },
            {
                keyword: "kündigung mitarbeiter",
                title: "Was, wenn der Mitarbeiter während oder nach der Maßnahme kündigt?",
                content: `<b>Das Framing: Absicherung & Bindung</b><br><br> "Auch daran haben wir gedacht. Für den Fall einer Kündigung *während* der Maßnahme stellen wir Ihnen Musterverträge zur Verfügung. Diese sichern Sie als Unternehmer ab, indem der Mitarbeiter sich verpflichtet, bei einer Kündigung die Kosten zu übernehmen oder für eine gewisse Zeit im Unternehmen zu bleiben. Das schafft eine starke Bindung. Wenn der Mitarbeiter *nach* der erfolgreich abgeschlossenen Weiterbildung geht, entstehen für Sie keinerlei Probleme oder Rückzahlungspflichten. Die Förderung ist dann bereits abgeschlossen."`
            }
        ],
        successfulClientsPerMonth: []
    };

    // --- Element Retrievals ---
    const navigation = document.getElementById('navigation');
    const navLinks = navigation ? navigation.querySelectorAll('.nav-link') : [];
    const contentSections = document.querySelectorAll('.content-section');
    const ticketSizeInput = document.getElementById('ticketSize');
    const applicationCountInput = document.getElementById('applicationCount');
    const roiResultElement = document.getElementById('roiResult');
    const flowSteps = document.querySelectorAll('.flow-step');
    const infoBox = document.getElementById('flow-info-box');
    const strategyTabs = document.querySelectorAll('.strategy-tab');
    const strategyContents = document.querySelectorAll('.strategy-content');
    const objectionList = document.getElementById('objectionList');
    const objectionSearch = document.getElementById('objectionSearch');
    const fundingAmountCtx = document.getElementById('fundingAmountChart'); 
    const scenarioSelect = document.getElementById('scenarioSelect');
    const calcAgencyOfferTotalValue = document.getElementById('calcAgencyOfferTotalValue');
    const calcInitialExistingClients = document.getElementById('calcInitialExistingClients');
    const calcInitialCRMLeads = document.getElementById('calcInitialCRMLeads');
    const calcInitialOpenOffers = document.getElementById('calcInitialOpenOffers');
    const calcMonthlyNewClientsTarget = document.getElementById('calcMonthlyNewClientsTarget');
    const agencyMonthlyProjectionTable = document.getElementById('agencyMonthlyProjectionTable');
    const agencyRevenueChartCanvas = document.getElementById('agencyRevenueChart'); 
    const breakEvenText = document.getElementById('breakEvenText');
    const calculatorChatBtn = document.getElementById('calculatorChatBtn');
    const calculatorChatButtonText = document.getElementById('calculatorChatButtonText');
    const calculatorChatLoadingSpinner = document.getElementById('calculatorChatLoadingSpinner');
    const calculatorChatOutput = document.getElementById('calculatorChatOutput');
    const calculatorChatResponseText = document.getElementById('calculatorChatResponseText');
    const ekEmployeeGrossSalary = document.getElementById('ekEmployeeGrossSalary');
    const ekTotalAgencyOfferValue = document.getElementById('ekTotalAgencyOfferValue');
    const ekTotalFundingResult = document.getElementById('ekTotalFundingResult');
    const ekNetEffectiveCostResult = document.getElementById('ekNetEffectiveCostResult');
    const ekSavingsPercentageResult = document.getElementById('ekSavingsPercentageResult');

    const leadContextInput = document.getElementById('leadContextInput');
    const outputTypeSelect = document.getElementById('outputTypeSelect');
    const generateLeadContentBtn = document.getElementById('generateLeadContentBtn');
    const leadButtonText = document.getElementById('leadButtonText');
    const leadLoadingSpinner = document.getElementById('leadLoadingSpinner');
    const leadOutput = document.getElementById('leadOutput');
    const leadResponseText = document.getElementById('leadResponseText');

    const caseStudyClient = document.getElementById('caseStudyClient');
    const caseStudyService = document.getElementById('caseStudyService');
    const caseStudyChallenge = document.getElementById('caseStudyChallenge');
    const caseStudyResults = document.getElementById('caseStudyResults');
    const caseStudyQCGImpact = document.getElementById('caseStudyQCGImpact');
    const generateCaseStudyBtn = document.getElementById('generateCaseStudyBtn');
    const caseStudyButtonText = document.getElementById('caseStudyButtonText');
    const caseStudyLoadingSpinner = document.getElementById('caseStudyLoadingSpinner');
    const caseStudyOutput = document.getElementById('caseStudyOutput');
    const caseStudyResponseText = document.getElementById('caseStudyResponseText');

    const educationProviderCashflowChartCanvas = document.getElementById('educationProviderCashflowChart');
    const generateBenefitExplainerBtn = document.getElementById('generateBenefitExplainerBtn');
    const benefitExplainerButtonText = document.getElementById('benefitExplainerButtonText');
    const benefitExplainerLoadingSpinner = document.getElementById('benefitExplainerLoadingSpinner');
    const benefitExplainerOutput = document.getElementById('benefitExplainerOutput');
    const benefitExplainerResponseText = document.getElementById('benefitExplainerResponseText');
    const clientPainPointInput = document.getElementById('clientPainPointInput');
    const agencySolutionInput = document.getElementById('agencySolutionInput');
    const qcgHelpInput = document.getElementById('qcgHelpInput');

    const offerClientNameInput = document.getElementById('offerClientName');
    const offerAgencyNameInput = document.getElementById('offerAgencyName');
    const offerProjectDescriptionInput = document.getElementById('offerProjectDescription');
    const generateOfferPdfBtn = document.getElementById('generateOfferPdfBtn');
    const offerPdfButtonText = document.getElementById('offerPdfButtonText');
    const offerPdfLoadingSpinner = document.getElementById('offerPdfLoadingSpinner');
    const offerPdfOutput = document.getElementById('offerPdfOutput');
    const offerPdfResponseText = document.getElementById('offerPdfResponseText');

    const forecastMonthlyTargetInput = document.getElementById('forecastMonthlyTarget');
    const annualForecastOutput = document.getElementById('annualForecast');
    const reminderTextOutput = document.getElementById('reminderText');


    let agencyRevenueChartInstance = null;
    let educationProviderCashflowChartInstance = null;

    const wrapLabel = (str, maxWidth) => {
        if (str.length <= maxWidth) return str;
        const words = str.split(' ');
        let lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            if ((currentLine + ' ' + words[i]).length > maxWidth) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine += ' ' + words[i];
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const sharedTooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        return Array.isArray(label) ? label.join(' ') : label;
    };
    
    const sharedChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: '#333333',
                titleFont: { size: 14, weight: 'bold', family: 'Arial' },
                bodyFont: { size: 12, family: 'Arial' },
                padding: 10,
                cornerRadius: 6,
                callbacks: { title: sharedTooltipTitleCallback }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#333333'
                },
                grid: {
                    color: '#CCCCCC'
                }
            },
            y: {
                ticks: {
                    color: '#333333'
                },
                grid: {
                    color: '#CCCCCC'
                }
            }
        }
    };

    const calculateROI = () => {
        const ticketSize = parseFloat(ticketSizeInput.value) || 0;
        const applicationCount = parseInt(applicationCountInput.value) || 0;
        const successRate = 0.75;
        const successfulApplications = Math.round(applicationCount * successRate);
        const roi = successfulApplications * ticketSize;
        roiResultElement.textContent = `€ ${roi.toLocaleString('de-DE')}`;
    };

    const calculateAgencyFundingAndRevenue = () => {
        const agencyOfferTotalValue = parseFloat(calcAgencyOfferTotalValue.value) || 0;
        const initialExistingClients = parseInt(calcInitialExistingClients.value) || 0;
        const initialCRMLeads = parseInt(calcInitialCRMLeads.value) || 0;
        const initialOpenOffers = parseInt(calcInitialOpenOffers.value) || 0;
        const monthlyNewClientsTarget = parseInt(calcMonthlyNewClientsTarget.value) || 0;
        const applicationSuccessRate = 0.75;
        const approvalDelayMonths = 1.5;

        agencyMonthlyProjectionTable.innerHTML = '';
        let cumulativeClients = 0;
        let cumulativeRevenue = 0;
        const monthlyRevenueChartData = [];
        const monthlyLabels = [];
        appData.successfulClientsPerMonth = [];
        let clientsPendingApproval = [];

        const agencyLicenseFee = 5000;
        let breakEvenMonth = -1;

        for (let month = 1; month <= 6; month++) {
            let clientsClosedThisMonthRaw = 0;
            if (month === 1) {
                clientsClosedThisMonthRaw = initialExistingClients + initialCRMLeads + initialOpenOffers;
            } else {
                clientsClosedThisMonthRaw = monthlyNewClientsTarget;
            }
            
            const successfulClientsThisMonth = clientsClosedThisMonthRaw * applicationSuccessRate;
            appData.successfulClientsPerMonth.push(successfulClientsThisMonth);

            if(successfulClientsThisMonth > 0) {
                 clientsPendingApproval.push({ count: successfulClientsThisMonth, approvalMonth: month + approvalDelayMonths });
            }

            let revenueRecognizedInThisMonth = 0;
            clientsPendingApproval = clientsPendingApproval.filter(cohort => {
                if (month >= cohort.approvalMonth) {
                    revenueRecognizedInThisMonth += cohort.count * agencyOfferTotalValue;
                    return false;
                }
                return true;
            });

            cumulativeClients += successfulClientsThisMonth;
            cumulativeRevenue += revenueRecognizedInThisMonth;

            monthlyLabels.push(`Monat ${month}`);
            monthlyRevenueChartData.push(cumulativeRevenue);

            if (breakEvenMonth === -1 && cumulativeRevenue >= agencyLicenseFee) {
                breakEvenMonth = month;
            }

            const row = agencyMonthlyProjectionTable.insertRow();
            row.className = 'border-b border-gray-100';
            row.innerHTML = `
                <td class="py-2 px-4">${month}</td>
                <td class="py-2 px-4">${Math.round(successfulClientsThisMonth)}</td>
                <td class="py-2 px-4">€ ${revenueRecognizedInThisMonth.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td class="py-2 px-4 font-bold">${Math.round(cumulativeClients)}</td>
                <td class="py-2 px-4 font-bold">€ ${cumulativeRevenue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            `;
        }

        if (breakEvenText) {
            if (breakEvenMonth !== -1) {
                breakEvenText.textContent = `🎉 Ihr Break-Even-Point (5.000€ Lizenzgebühr) ist in Monat ${breakEvenMonth}!`;
            } else {
                breakEvenText.textContent = `Der Break-Even-Point (5.000€ Lizenzgebühr) wird in den ersten 6 Monaten nicht erreicht.`;
            }
        }

        if (agencyRevenueChartCanvas) {
            const agencyRevenueCtx = agencyRevenueChartCanvas.getContext('2d');
            if (agencyRevenueChartInstance) {
                agencyRevenueChartInstance.data.labels = monthlyLabels;
                agencyRevenueChartInstance.data.datasets[0].data = monthlyRevenueChartData;
                agencyRevenueChartInstance.update();
            } else {
                agencyRevenueChartInstance = new Chart(agencyRevenueCtx, {
                    type: 'line',
                    data: {
                        labels: monthlyLabels,
                        datasets: [{
                            label: 'Kumulierter Umsatz Agentur',
                            data: monthlyRevenueChartData,
                            borderColor: '#FFD700',
                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#FFD700',
                            pointBorderColor: 'white',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }]
                    },
                    options: { ...sharedChartOptions, plugins: { ...sharedChartOptions.plugins, legend: { display: true, position: 'top' } },
                        scales: { 
                            y: { 
                                beginAtZero: true, 
                                ticks: { callback: (value) => `€${value / 1000}k`, color: '#333333' },
                                title: { display: true, text: 'Kumulierter Umsatz (€)', color: '#333333' }
                            },
                            x: { 
                                ticks: { color: '#333333' },
                                title: { display: true, text: 'Monat', color: '#333333' }
                            }
                        }
                    }
                });
            }
        }
        calculateEducationProviderCashflow();
    };

    const calculateClientBenefits = () => {
        const employeeGrossSalary = parseFloat(ekEmployeeGrossSalary.value) || 0;
        const totalAgencyOfferValue = parseFloat(ekTotalAgencyOfferValue.value) || 0;
        const ancillaryWageCostFactor = 1.28;
        const fundingDurationMonths = 6;
        const fundingRate = 0.75;

        const totalEmployeeCostForFunding = employeeGrossSalary * ancillaryWageCostFactor;
        const totalFundingReceived = totalEmployeeCostForFunding * fundingDurationMonths * fundingRate;
        
        ekTotalFundingResult.textContent = `€ ${totalFundingReceived.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const netEffectiveCost = totalAgencyOfferValue - totalFundingReceived;
        ekNetEffectiveCostResult.textContent = `€ ${netEffectiveCost.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const additionalProfitPercentage = totalAgencyOfferValue > 0 ? ((totalFundingReceived - totalAgencyOfferValue) / totalAgencyOfferValue) * 100 : 0;
        ekSavingsPercentageResult.textContent = `${additionalProfitPercentage.toFixed(1)} %`;
    };

    const renderObjections = (filter = '') => {
        objectionList.innerHTML = '';
        const filteredObjections = appData.objections.filter(o => 
            o.title.toLowerCase().includes(filter.toLowerCase()) || 
            o.keyword.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredObjections.length === 0) {
            objectionList.innerHTML = `<p class="text-text-medium-gray text-center">Keine passenden Einwände gefunden.</p>`;
            return;
        }

        filteredObjections.forEach(obj => {
            const element = document.createElement('div');
            element.className = 'border-b border-gray-200/80 pb-4';
            element.innerHTML = `<h4 class="font-semibold text-lg text-text-dark-gray">${obj.title}</h4><div class="text-text-medium-gray text-sm mt-2">${obj.content}</div>`;
            objectionList.appendChild(element);
        });
    };

    const calculateEducationProviderCashflow = () => {
        const educationProviderRevenuePerClient = 6000;
        const approvalDelayMonths = 1.5;

        let cumulativeCashflow = 0;
        const monthlyCashflowData = [];
        const monthlyLabels = [];
        let clientsPendingPayment = [];

        for (let month = 1; month <= 6; month++) {
            monthlyLabels.push(`Monat ${month}`);
            
            const successfulClientsAcquiredThisMonth = appData.successfulClientsPerMonth[month - 1] || 0;
            if (successfulClientsAcquiredThisMonth > 0) {
                clientsPendingPayment.push({
                    count: successfulClientsAcquiredThisMonth,
                    paymentMonth: month + approvalDelayMonths
                });
            }

            let cashflowRecognizedInThisMonth = 0;
            clientsPendingPayment = clientsPendingPayment.filter(cohort => {
                if (month >= cohort.paymentMonth) {
                    cashflowRecognizedInThisMonth += cohort.count * educationProviderRevenuePerClient;
                    return false;
                }
                return true;
            });

            cumulativeCashflow += cashflowRecognizedInThisMonth;
            monthlyCashflowData.push(cumulativeCashflow);
        }

        if (educationProviderCashflowChartCanvas) {
            const educationProviderCtx = educationProviderCashflowChartCanvas.getContext('2d');
            if (educationProviderCashflowChartInstance) {
                educationProviderCashflowChartInstance.data.labels = monthlyLabels;
                educationProviderCashflowChartInstance.data.datasets[0].data = monthlyCashflowData;
                educationProviderCashflowChartInstance.update();
            } else {
                educationProviderCashflowChartInstance = new Chart(educationProviderCtx, {
                    type: 'line',
                    data: {
                        labels: monthlyLabels,
                        datasets: [{
                            label: 'Kumulierter Cashflow Bildungsträger',
                            data: monthlyCashflowData,
                            borderColor: '#FFD700',
                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#FFD700',
                            pointBorderColor: 'white',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }]
                    },
                    options: {
                        ...sharedChartOptions,
                        plugins: { ...sharedChartOptions.plugins, legend: { display: true, position: 'top' } },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: (value) => `€${value / 1000}k`,
                                    color: '#333333'
                                },
                                title: {
                                    display: true,
                                    text: 'Kumulierter Cashflow (€)',
                                    color: '#333333'
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#333333'
                                },
                                title: {
                                    display: true,
                                    text: 'Monat',
                                    color: '#333333'
                                }
                            }
                        }
                    }
                });
            }
        }
    };

    // --- AI Lead Assistant Logic ---
    if (generateLeadContentBtn) {
        generateLeadContentBtn.addEventListener('click', async () => {
            const leadContext = leadContextInput.value.trim();
            const outputType = outputTypeSelect.value;
            if (!leadContext) {
                leadResponseText.textContent = 'Bitte geben Sie Lead-Informationen ein.';
                leadOutput.classList.remove('hidden');
                return;
            }

            leadButtonText.classList.add('hidden');
            leadLoadingSpinner.classList.remove('hidden');
            generateLeadContentBtn.disabled = true;
            leadOutput.classList.add('hidden');

            let prompt = "";
            if (outputType === "talking_points") {
                prompt = `Sie sind ein erfahrener Vertriebsmitarbeiter, spezialisiert auf die Akquise von B2B-Kunden für Agenturdienstleistungen, die über das QCG-Fördermodell finanziert werden können. Basierend auf den folgenden Lead-Informationen: "${leadContext}", generieren Sie bitte 3-5 prägnante und personalisierte Gesprächspunkte (Talking Points) für einen Erstkontakt. Fokusieren Sie auf die Schmerzpunkte des Leads und wie das QCG-Modell eine kostenlose Lösung bieten kann. Verwenden Sie eine professionelle und überzeugende Sprache.`;
            } else if (outputType === "email_outreach") {
                prompt = `Sie sind ein erfahrener Vertriebsmitarbeiter, spezialisiert auf die Akquise von B2B-Kunden für Agenturdienstleistungen, die über das QCG-Fördermodell finanziert werden können. Basierend auf den folgenden Lead-Informationen: "${leadContext}", verfassen Sie eine kurze, personalisierte E-Mail für den Erstkontakt. Heben Sie die relevantesten Vorteile des QCG-Modells (kostenlose Dienstleistung, finanzielle Entlastung, qualifizierte Mitarbeiter) hervor und enden Sie mit einem klaren Call-to-Action für ein kurzes Gespräch. Verwenden Sie eine professionelle und überzeugende Sprache.`;
            } else if (outputType === "linkedin_message") {
                prompt = `Sie sind ein erfahrener Vertriebsmitarbeiter, spezialisiert auf die Akquise von B2B-Kunden für Agenturdienstleistungen, die über das QCG-Fördermodell finanziert werden können. Basierend auf den folgenden Lead-Informationen: "${leadContext}", verfassen Sie eine kurze, personalisierte LinkedIn-Nachricht für den Erstkontakt. Heben Sie die relevantesten Vorteile des QCG-Modells (kostenlose Dienstleistung, finanzielle Entlastung, qualifizierte Mitarbeiter) hervor und enden Sie mit einem klaren Call-to-Action für ein kurzes Gespräch. Verwenden Sie eine professionelle und überzeugende Sprache.`;
            }

            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    leadResponseText.textContent = result.candidates[0].content.parts[0].text;
                } else {
                    leadResponseText.textContent = 'Entschuldigung, ich konnte keinen Inhalt generieren. Bitte versuchen Sie es später erneut.';
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der KI-Antwort:', error);
                leadResponseText.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            } finally {
                leadOutput.classList.remove('hidden');
                leadButtonText.classList.remove('hidden');
                leadLoadingSpinner.classList.add('hidden');
                generateLeadContentBtn.disabled = false;
            }
        });
    }

    // --- AI Case Study Generator Logic ---
    if (generateCaseStudyBtn) {
        generateCaseStudyBtn.addEventListener('click', async () => {
            const client = caseStudyClient.value.trim();
            const service = caseStudyService.value.trim();
            const challenge = caseStudyChallenge.value.trim();
            const results = caseStudyResults.value.trim();
            const qcgImpact = caseStudyQCGImpact.value.trim();

            if (!client || !service || !challenge || !results || !qcgImpact) {
                caseStudyResponseText.textContent = 'Bitte füllen Sie alle Felder aus, um eine Fallstudie zu generieren.';
                caseStudyOutput.classList.remove('hidden');
                return;
            }

            caseStudyButtonText.classList.add('hidden');
            caseStudyLoadingSpinner.classList.remove('hidden');
            generateCaseStudyBtn.disabled = true;
            caseStudyOutput.classList.add('hidden');

            const prompt = `Sie sind ein erfahrener Marketing- und PR-Experte für B2B-Agenturen, spezialisiert auf die Erstellung überzeugender Fallstudien. Generieren Sie eine prägnante und wirkungsvolle Fallstudie (ca. 150-250 Wörter) basierend auf den folgenden Informationen. Heben Sie die Herausforderung, die Lösung durch die Agenturdienstleistung (unter Nutzung des QCG-Modells) und die konkreten, quantifizierbaren Ergebnisse hervor. Der Fokus liegt darauf, wie das QCG-Modell dem Kunden einen signifikanten Vorteil verschafft hat. Verwenden Sie eine professionelle, ergebnisorientierte und inspirierende Sprache.

Kunde: ${client}
Dienstleistung: ${service}
Herausforderung: ${challenge}
Ergebnisse: ${results}
QCG-Impact: ${qcgImpact}`;

            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    caseStudyResponseText.textContent = result.candidates[0].content.parts[0].text;
                } else {
                    caseStudyResponseText.textContent = 'Entschuldigung, ich konnte keine Fallstudie generieren. Bitte versuchen Sie es später erneut.';
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der KI-Antwort:', error);
                caseStudyResponseText.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            } finally {
                caseStudyOutput.classList.remove('hidden');
                caseStudyButtonText.classList.remove('hidden');
                caseStudyLoadingSpinner.classList.add('hidden');
                generateCaseStudyBtn.disabled = false;
            }
        });
    }

    // --- Calculator Chat Logic ---
    if (calculatorChatBtn) {
        calculatorChatBtn.addEventListener('click', async () => {
            const question = prompt("Stellen Sie Ihre Frage zum Förderrechner:", "Wie wird der Umsatz berechnet?");
            if (!question) {
                calculatorChatOutput.classList.add('hidden');
                return;
            }

            calculatorChatButtonText.classList.add('hidden');
            calculatorChatLoadingSpinner.classList.remove('hidden');
            calculatorChatBtn.disabled = true;
            calculatorChatOutput.classList.add('hidden');

            const currentOfferValue = calcAgencyOfferTotalValue.value;
            const currentInitialClients = calcInitialExistingClients.value;
            const currentCRMLeads = calcInitialCRMLeads.value;
            const currentOpenOffers = calcInitialOpenOffers.value;
            const currentMonthlyNewClients = calcMonthlyNewClientsTarget.value;

            const promptText = `Sie sind ein Experte für den "Sell & Scale Förderrechner" einer Agentur, die Fördermittel für ihre Dienstleistungen nutzt. Der Rechner berücksichtigt einen Angebotswert von ${currentOfferValue}€, initial ${currentInitialClients} Bestandskunden, ${currentCRMLeads} Karteileichen, ${currentOpenOffers} offene Angebote (alle Monat 1) und ${currentMonthlyNewClients} neue Kunden pro Monat ab Monat 2. Es gibt eine 75%ige Genehmigungsquote und 1.5 Monate Prüfzeit. Der Break-Even der Agentur liegt bei 5000€ Lizenzgebühr.

Der Nutzer stellt folgende Frage zum Rechner: "${question}".

Antworten Sie prägnant, professionell und erklären Sie die Logik des Rechners im Kontext der Frage. Beziehen Sie sich auf die genannten Zahlen, falls relevant.`;

            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: promptText }] });
                const payload = { contents: chatHistory };
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    calculatorChatResponseText.textContent = result.candidates[0].content.parts[0].text;
                } else {
                    calculatorChatResponseText.textContent = 'Entschuldigung, ich konnte keine Antwort generieren. Bitte versuchen Sie es später erneut.';
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der KI-Antwort:', error);
                calculatorChatResponseText.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            } finally {
                calculatorChatOutput.classList.remove('hidden');
                calculatorChatButtonText.classList.remove('hidden');
                calculatorChatLoadingSpinner.classList.add('hidden');
                calculatorChatBtn.disabled = false;
            }
        });
    }

    // --- AI Benefit Explainer Logic ---
    if (generateBenefitExplainerBtn) {
        generateBenefitExplainerBtn.addEventListener('click', async () => {
            const clientPainPoint = clientPainPointInput.value.trim();
            const agencySolution = agencySolutionInput.value.trim();
            const qcgHelp = qcgHelpInput.value.trim();

            if (!clientPainPoint || !agencySolution || !qcgHelp) {
                benefitExplainerResponseText.textContent = 'Bitte füllen Sie alle Felder aus, um die Nutzen-Erklärung zu generieren.';
                benefitExplainerOutput.classList.remove('hidden');
                return;
            }

            benefitExplainerButtonText.classList.add('hidden');
            benefitExplainerLoadingSpinner.classList.remove('hidden');
            generateBenefitExplainerBtn.disabled = true;
            benefitExplainerOutput.classList.add('hidden');

            const prompt = `Sie sind ein Experte für die Kommunikation von Mehrwerten im B2B-Vertrieb, spezialisiert auf das QCG-Fördermodell. Generieren Sie eine prägnante (max. 100 Wörter) und überzeugende Erklärung des Mehrwerts für einen Endkunden, basierend auf den folgenden Informationen. Der Fokus liegt darauf, wie das QCG-Modell das Angebot der Agentur für den Kunden noch attraktiver macht.

Kundenproblem: ${clientPainPoint}
Agentur-Lösung: ${agencySolution}
QCG-Beitrag: ${qcgHelp}`;

            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    benefitExplainerResponseText.textContent = result.candidates[0].content.parts[0].text;
                } else {
                    benefitExplainerResponseText.textContent = 'Entschuldigung, ich konnte keine Nutzen-Erklärung generieren. Bitte versuchen Sie es später erneut.';
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der KI-Antwort:', error);
                benefitExplainerResponseText.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            } finally {
                benefitExplainerOutput.classList.remove('hidden');
                benefitExplainerButtonText.classList.remove('hidden');
                benefitExplainerLoadingSpinner.classList.add('hidden');
                generateBenefitExplainerBtn.disabled = false;
            }
        });
    }

    // --- Automated Offer Generation Logic ---
    if (generateOfferPdfBtn) {
        generateOfferPdfBtn.addEventListener('click', () => {
            const clientName = offerClientNameInput.value.trim();
            const agencyName = offerAgencyNameInput.value.trim();
            const projectDescription = offerProjectDescriptionInput.value.trim();

            if (!clientName || !agencyName || !projectDescription) {
                offerPdfResponseText.textContent = 'Bitte füllen Sie alle Felder aus, um das Angebot zu generieren.';
                offerPdfOutput.classList.remove('hidden');
                return;
            }

            offerPdfButtonText.classList.add('hidden');
            offerPdfLoadingSpinner.classList.remove('hidden');
            generateOfferPdfBtn.disabled = true;
            offerPdfOutput.classList.add('hidden');

            const simulatedPdfContent = `
                <h2>Angebot für ${clientName}</h2>
                <p>Erstellt von: ${agencyName}</p>
                <p>Projektbeschreibung: ${projectDescription}</p>
                <h3>ROI-Berechnung (Beispiel)</h3>
                <p>Basierend auf Ihren Eingaben würde Ihr Kunde einen ROI von X% erzielen.</p>
                <h3>Förderhöhe (Beispiel)</h3>
                <p>Ein Mitarbeiter mit 3.500€ Bruttogehalt könnte eine Förderung von ca. 20.160€ erhalten.</p>
                <p><i>(Dies ist ein simuliertes Angebot. Für ein echtes PDF-Angebot ist eine Backend-Integration erforderlich.)</i></p>
            `;

            offerPdfResponseText.innerHTML = simulatedPdfContent;

            offerPdfOutput.classList.remove('hidden');
            offerPdfButtonText.classList.remove('hidden');
            offerPdfLoadingSpinner.classList.add('hidden');
            generateOfferPdfBtn.disabled = false;
        });
    }

    // --- Forecast & Reminder Logic ---
    const updateForecastAndReminder = () => {
        const monthlyTarget = parseFloat(forecastMonthlyTargetInput.value) || 0;
        const annualForecast = monthlyTarget * 12 * (parseFloat(calcAgencyOfferTotalValue.value) || 0) * 0.75;
        annualForecastOutput.textContent = `€ ${annualForecast.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        reminderTextOutput.textContent = `Nächste Förderantrags-Deadline: ${nextMonth.toLocaleDateString('de-DE', options)}. Jetzt handeln!`;
    };

    if (forecastMonthlyTargetInput) {
        forecastMonthlyTargetInput.addEventListener('input', updateForecastAndReminder);
        updateForecastAndReminder();
    }


    // --- Initializations and Event Listeners ---
    if (navigation) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                contentSections.forEach(section => section.classList.toggle('active', section.id === targetId));
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    if (ticketSizeInput && applicationCountInput && roiResultElement) {
        ticketSizeInput.addEventListener('input', calculateROI);
        applicationCountInput.addEventListener('input', calculateROI);
        calculateROI();
    }

    if (infoBox) {
        flowSteps.forEach(step => {
            step.addEventListener('mouseenter', () => {
                infoBox.textContent = appData.flowInfo[step.dataset.infoKey];
                infoBox.classList.remove('opacity-0');
            });
            step.addEventListener('mouseleave', () => { infoBox.classList.add('opacity-0'); });
        });
    }
    
    strategyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            strategyTabs.forEach(t => { t.classList.remove('active', 'text-primary-bg'); t.classList.add('text-text-medium-gray'); });
            tab.classList.add('active', 'text-primary-bg');
            const targetId = tab.dataset.target;
            strategyContents.forEach(content => content.classList.toggle('hidden', content.id !== targetId));
        });
    });

    if (objectionSearch && objectionList) {
        objectionSearch.addEventListener('input', (e) => renderObjections(e.target.value));
        renderObjections();
    }

    if (fundingAmountCtx) {
        new Chart(fundingAmountCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [wrapLabel('3.000€ Brutto', 16), wrapLabel('3.500€ Brutto', 16), wrapLabel('4.000€ Brutto', 16)],
                datasets: [{
                    label: 'Gesamtförderung (6 Monate)',
                    data: [17280, 20160, 23040],
                    backgroundColor: ['#FFD700', '#FFD700', '#FFD700'],
                    borderWidth: 0, borderRadius: 6
                }]
            },
            options: { ...sharedChartOptions, scales: { y: { beginAtZero: true, ticks: { callback: (value) => `€${value / 1000}k`, color: '#333333' } } } }
        });
    }

    const scenarioPresets = {
        custom: {
            calcAgencyOfferTotalValue: 12000,
            calcInitialExistingClients: 3,
            calcInitialCRMLeads: 2,
            calcInitialOpenOffers: 1,
            calcMonthlyNewClientsTarget: 2
        },
        recruiting: {
            calcAgencyOfferTotalValue: 15000,
            calcInitialExistingClients: 5,
            calcInitialCRMLeads: 3,
            calcInitialOpenOffers: 2,
            calcMonthlyNewClientsTarget: 3
        },
        leadgen: {
            calcAgencyOfferTotalValue: 10000,
            calcInitialExistingClients: 4,
            calcInitialCRMLeads: 3,
            calcInitialOpenOffers: 1,
            calcMonthlyNewClientsTarget: 4
        },
        ki_process: {
            calcAgencyOfferTotalValue: 20000,
            calcInitialExistingClients: 2,
            calcInitialCRMLeads: 1,
            calcInitialOpenOffers: 1,
            calcMonthlyNewClientsTarget: 1
        }
    };

    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', () => {
            const selectedScenario = scenarioSelect.value;
            const presets = scenarioPresets[selectedScenario];
            if (presets) {
                calcAgencyOfferTotalValue.value = presets.calcAgencyOfferTotalValue;
                calcInitialExistingClients.value = presets.calcInitialExistingClients;
                calcInitialCRMLeads.value = presets.calcInitialCRMLeads;
                calcInitialOpenOffers.value = presets.calcInitialOpenOffers;
                calcMonthlyNewClientsTarget.value = presets.calcMonthlyNewClientsTarget;
                calculateAgencyFundingAndRevenue();
            }
        });
    }

    const agencyCalcInputs = [calcAgencyOfferTotalValue, calcInitialExistingClients, calcInitialCRMLeads, calcInitialOpenOffers, calcMonthlyNewClientsTarget];
    agencyCalcInputs.forEach(input => {
        if (input) input.addEventListener('input', calculateAgencyFundingAndRevenue);
    });
    calculateAgencyFundingAndRevenue();

    const clientCalcInputs = [ekEmployeeGrossSalary, ekTotalAgencyOfferValue];
    clientCalcInputs.forEach(input => {
        if (input) input.addEventListener('input', calculateClientBenefits);
    });
    calculateClientBenefits();
});
