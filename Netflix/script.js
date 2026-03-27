// Obtém o elemento do botão de alternância de tema
const themeToggle = document.getElementById('theme-toggle');

// Obtém o elemento do ícone dentro do botão
const themeIcon = document.querySelector('.theme-icon');

// Obtém o elemento html para aplicar o atributo data-theme
const htmlElement = document.documentElement;

// Inicializa o tema baseado na preferência salva no localStorage ou preferência do sistema
function initializeTheme() {
    /* Verifica se existe uma preferência de tema salva no localStorage */
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        /* Se houver uma preferência salva, usa-a */
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        /* Caso contrário, verifica a preferência do sistema operacional */
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', initialTheme);
        updateThemeIcon(initialTheme);
    }
}

// Atualiza o ícone do botão conforme o tema
function updateThemeIcon(theme) {
    /* Se o tema for dark, exibe ícone de sol (☀️) para indicar que pode mudar para light */
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
    } else {
        /* Se o tema for light, exibe ícone de lua (🌙) para indicar que pode mudar para dark */
        themeIcon.textContent = '🌙';
    }
}

// Alterna entre os temas dark e light
function toggleTheme() {
    /* Obtém o tema atual do atributo data-theme */
    const currentTheme = htmlElement.getAttribute('data-theme');

    /* Define o novo tema como o oposto do atual */
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    /* Aplica o novo tema ao elemento html */
    htmlElement.setAttribute('data-theme', newTheme);

    /* Salva a preferência do usuário no localStorage para persistência */
    localStorage.setItem('theme', newTheme);

    /* Atualiza o ícone do botão */
    updateThemeIcon(newTheme);
}

// Adiciona listener de clique ao botão para alternar o tema
themeToggle.addEventListener('click', toggleTheme);

// Inicializa o tema quando a página carrega
initializeTheme();