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

    // Evento de submissão do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        currentPage++;
        showPage(currentPage);

        // Aqui você pode adicionar o código para enviar os dados para o servidor
        // Por exemplo, utilizando fetch() ou XMLHttpRequest

        console.log('Formulário enviado!');
        form.reset();
    });
});
