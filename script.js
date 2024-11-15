// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const formPages = document.querySelectorAll('.form-page');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const submitBtn = document.querySelector('.submit-btn');
    let currentPage = 0;

    // Mostrar a primeira página
    formPages[currentPage].classList.add('active');

    // Função para mudar de página
    function showPage(index) {
        formPages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
    }

    // Eventos dos botões "Próximo"
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validatePage(currentPage)) {
                currentPage++;
                showPage(currentPage);
            }
        });
    });

    // Eventos dos botões "Anterior"
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage--;
            showPage(currentPage);
        });
    });

    // Validação de cada página
    function validatePage(page) {
        const currentFormPage = formPages[page];
        const inputs = currentFormPage.querySelectorAll('input, select, textarea');
        let valid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                valid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }

            // Campos "Outro"
            if (input.name.includes('other') && input.disabled === false && !input.value.trim()) {
                valid = false;
                input.style.borderColor = 'red';
            }
        });

        if (!valid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }

        return valid;
    }

    // Habilitar campos "Outro" quando selecionado
    const genderRadios = document.getElementsByName('gender');
    const genderOther = document.getElementById('gender_other');

    genderRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'Outro') {
                genderOther.disabled = false;
            } else {
                genderOther.disabled = true;
                genderOther.value = '';
            }
        });
    });

    const sectorSelect = document.getElementById('sector');
    const sectorOther = document.getElementById('sector_other');

    sectorSelect.addEventListener('change', () => {
        if (sectorSelect.value === 'Outro') {
            sectorOther.disabled = false;
        } else {
            sectorOther.disabled = true;
            sectorOther.value = '';
        }
    });

    const toolsCheckboxes = document.getElementsByName('tools');
    const toolsOther = document.getElementById('tools_other');

    toolsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.value === 'Outra' && checkbox.checked) {
                toolsOther.disabled = false;
            } else if (checkbox.value === 'Outra') {
                toolsOther.disabled = true;
                toolsOther.value = '';
            }
        });
    });

    const challengesCheckboxes = document.getElementsByName('challenges');
    const challengesOther = document.getElementById('challenges_other');

    challengesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.value === 'Outro' && checkbox.checked) {
                challengesOther.disabled = false;
            } else if (checkbox.value === 'Outro') {
                challengesOther.disabled = true;
                challengesOther.value = '';
            }
        });
    });

    const motivationCheckboxes = document.getElementsByName('motivation');
    const motivationOther = document.getElementById('motivation_other');

    motivationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.value === 'Outro' && checkbox.checked) {
                motivationOther.disabled = false;
            } else if (checkbox.value === 'Outro') {
                motivationOther.disabled = true;
                motivationOther.value = '';
            }
        });
    });

    const contentTypeCheckboxes = document.getElementsByName('content_type');
    const contentTypeOther = document.getElementById('content_type_other');

    contentTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.value === 'Outro' && checkbox.checked) {
                contentTypeOther.disabled = false;
            } else if (checkbox.value === 'Outro') {
                contentTypeOther.disabled = true;
                contentTypeOther.value = '';
            }
        });
    });

    // Função para coletar os dados do formulário
    function collectFormData() {
        const formData = {};

        // Dados Pessoais
        formData.fullName = document.getElementById('fullName').value.trim();
        formData.email = document.getElementById('email').value.trim();
        formData.whatsapp = document.getElementById('whatsapp').value.trim();
        formData.age = parseInt(document.getElementById('age').value, 10);
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        formData.gender = genderSelected.value;
        if (formData.gender === 'Outro') {
            formData.gender = document.getElementById('gender_other').value.trim();
        }

        // Perfil Profissional
        formData.occupation = document.getElementById('occupation').value.trim();
        formData.sector = document.getElementById('sector').value;
        if (formData.sector === 'Outro') {
            formData.sector = document.getElementById('sector_other').value.trim();
        }
        const experienceSelected = document.querySelector('input[name="experience"]:checked');
        formData.experience = experienceSelected ? experienceSelected.value : '';
        formData.income = document.getElementById('income').value;

        // Gestão de Tempo e Tarefas
        const toolsSelected = Array.from(document.querySelectorAll('input[name="tools"]:checked')).map(el => el.value);
        if (toolsSelected.includes('Outra')) {
            const otherTool = document.getElementById('tools_other').value.trim();
            toolsSelected.splice(toolsSelected.indexOf('Outra'), 1, otherTool);
        }
        formData.tools = toolsSelected;

        const challengesSelected = Array.from(document.querySelectorAll('input[name="challenges"]:checked')).map(el => el.value);
        if (challengesSelected.includes('Outro')) {
            const otherChallenge = document.getElementById('challenges_other').value.trim();
            challengesSelected.splice(challengesSelected.indexOf('Outro'), 1, otherChallenge);
        }
        formData.challenges = challengesSelected;

        formData.impact = document.getElementById('impact').value.trim();

        // Interesse na Pepper Inc.
        const motivationSelected = Array.from(document.querySelectorAll('input[name="motivation"]:checked')).map(el => el.value);
        if (motivationSelected.includes('Outro')) {
            const otherMotivation = document.getElementById('motivation_other').value.trim();
            motivationSelected.splice(motivationSelected.indexOf('Outro'), 1, otherMotivation);
        }
        formData.motivation = motivationSelected;

        const betaInterestSelected = document.querySelector('input[name="beta_interest"]:checked');
        formData.beta_interest = betaInterestSelected ? betaInterestSelected.value : '';

        formData.beneficiaries = document.getElementById('beneficiaries').value.trim();

        // Preferências e Feedback
        const updateFrequencySelected = document.querySelector('input[name="update_frequency"]:checked');
        formData.update_frequency = updateFrequencySelected ? updateFrequencySelected.value : '';

        const contentTypeSelected = Array.from(document.querySelectorAll('input[name="content_type"]:checked')).map(el => el.value);
        if (contentTypeSelected.includes('Outro')) {
            const otherContentType = document.getElementById('content_type_other').value.trim();
            contentTypeSelected.splice(contentTypeSelected.indexOf('Outro'), 1, otherContentType);
        }
        formData.content_type = contentTypeSelected;

        const referralInterestSelected = document.querySelector('input[name="referral_interest"]:checked');
        formData.referral_interest = referralInterestSelected ? referralInterestSelected.value : '';

        formData.privacy_consent = document.querySelector('input[name="privacy_consent"]').checked;
        formData.feedback_consent = document.querySelector('input[name="feedback_consent"]').checked;

        return formData;
    }

    // Função para enviar os dados para a API
async function submitFormData(formData) {
    try {
        const response = await fetch('https://qb264wxb-5000.brs.devtunnels.ms/', { // URL da sua API Flask
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro na submissão');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        throw error;
    }
}

    // Evento de submissão do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validatePage(currentPage)) {
            // Coletar os dados do formulário
            const data = collectFormData();

            // Enviar os dados para a API
            try {
                const result = await submitFormData(data);
                console.log('Formulário enviado com sucesso:', result);

                // Mostrar a página de confirmação
                currentPage++;
                showPage(currentPage);

                // Resetar o formulário
                form.reset();

                // Resetar os campos "Outro"
                document.getElementById('gender_other').disabled = true;
                document.getElementById('sector_other').disabled = true;
                document.getElementById('tools_other').disabled = true;
                document.getElementById('challenges_other').disabled = true;
                document.getElementById('motivation_other').disabled = true;
                document.getElementById('content_type_other').disabled = true;
            } catch (error) {
                alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
            }
        }
    });
});
