// ============================================
//   FUNCIONALIDADE DE TEMA (Dark/Light Mode)
// ============================================

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

// Verifica se o botão existe antes de adicionar o listener
if (themeToggle) {
    /* Adiciona listener de clique ao botão para alternar o tema */
    themeToggle.addEventListener('click', toggleTheme);
}

// ============================================
//   FUNCIONALIDADE DE PERFIL ATIVO
// ============================================

// Obtém todos os links dos perfis
const profileLinks = document.querySelectorAll('.perfil');

// Adiciona listener de clique a cada perfil
profileLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Previne o comportamento padrão do link por um momento
        event.preventDefault();

        // Obtém a figura (figure) pai do link
        const figure = this.closest('.profile');

        // Obtém a imagem dentro do link
        const img = this.querySelector('img');

        // Obtém a legenda (figcaption) do perfil
        const figcaption = figure.querySelector('figcaption');

        // Extrai o nome do perfil
        const profileName = figcaption.textContent.trim();

        // Extrai a URL da imagem
        const profileImage = img.src;

        // Extrai o alt da imagem (descrição)
        const profileAlt = img.alt;

        // Cria um objeto com os dados do perfil
        const profileData = {
            /* nome: nome do perfil */
            nome: profileName,
            /* imagem: URL da imagem do perfil */
            imagem: profileImage,
            /* descricao: descrição alternativa da imagem */
            descricao: profileAlt,
            /* dataAcesso: timestamp de quando o perfil foi acessado */
            dataAcesso: new Date().toISOString()
        };

        // Salva os dados do perfil no localStorage em formato JSON
        localStorage.setItem('perfilAtivo', JSON.stringify(profileData));

        // Exibe mensagem no console para confirmar armazenamento
        console.log('Perfil armazenado:', profileData);

        // Aguarda 300ms antes de redirecionar (tempo para animações)
        setTimeout(() => {
            // Redireciona para a página de catálogo
            window.location.href = this.href;
        }, 300);
    });
});

// Função auxiliar para recuperar o perfil ativo do localStorage
function getPerfilAtivo() {
    /* Obtém o perfil ativo armazenado no localStorage */
    const perfilJSON = localStorage.getItem('perfilAtivo');

    // Se não houver perfil armazenado, retorna null
    if (!perfilJSON) {
        return null;
    }

    // Converte o JSON armazenado de volta para um objeto JavaScript
    try {
        return JSON.parse(perfilJSON);
    } catch (error) {
        /* Se houver erro ao fazer parse, retorna null e exibe erro no console */
        console.error('Erro ao recuperar perfil ativo:', error);
        return null;
    }
}

// Função auxiliar para limpar o perfil ativo (útil para logout)
function clearPerfilAtivo() {
    /* Remove o perfil ativo do localStorage */
    localStorage.removeItem('perfilAtivo');
    console.log('Perfil ativo removido');
}

// ============================================
//   INICIALIZAÇÃO
// ============================================

// Inicializa o tema quando a página carrega
document.addEventListener('DOMContentLoaded', initializeTheme);

// Se o script for carregado com defer, também chama direto
initializeTheme();