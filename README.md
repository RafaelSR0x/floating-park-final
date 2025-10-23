# 🚗 Floating Park - Sistema de Gerenciamento de Estacionamento

Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento completo de estacionamento, incluindo registro de entrada/saída de veículos, cálculo automático de valores e controle de permanência.

## 📱 Sobre o Projeto

O Floating Park é um aplicativo mobile que permite o controle eficiente de um estacionamento, oferecendo funcionalidades como:

-   ✅ Autenticação de usuários (login e cadastro)
-   ✅ Registro de entrada de veículos
-   ✅ Registro de saída com cálculo automático de tempo e valor
-   ✅ Visualização de veículos ativos no estacionamento
-   ✅ Histórico de veículos por placa
-   ✅ Interface intuitiva e responsiva

## 🛠️ Tecnologias Utilizadas

-   **React Native** - Framework para desenvolvimento mobile
-   **Expo** - Plataforma para desenvolvimento e build
-   **React Navigation** - Navegação entre telas
-   **Styled Components** - Estilização de componentes
-   **Axios** - Requisições HTTP
-   **Expo Secure Store** - Armazenamento seguro de tokens
-   **Expo Vector Icons** - Ícones do Material Design

## � Dependências do Projeto

### Dependências Principais

| Pacote                | Versão   | Descrição                                                   |
| --------------------- | -------- | ----------------------------------------------------------- |
| **react**             | 19.1.0   | Biblioteca principal do React                               |
| **react-native**      | 0.81.5   | Framework para desenvolvimento mobile                       |
| **react-dom**         | 19.1.0   | Renderização React para web                                 |
| **expo**              | ~54.0.18 | Plataforma de desenvolvimento Expo                          |
| **expo-status-bar**   | ~3.0.8   | Componente para controle da status bar                      |
| **expo-font**         | ^14.0.9  | Carregamento de fontes customizadas                         |
| **expo-secure-store** | ~15.0.7  | Armazenamento criptografado de dados sensíveis (tokens JWT) |

### Navegação

| Pacote                             | Versão  | Descrição                      |
| ---------------------------------- | ------- | ------------------------------ |
| **@react-navigation/native**       | ^7.1.18 | Biblioteca base de navegação   |
| **@react-navigation/native-stack** | ^7.5.0  | Navegação em pilha (stack)     |
| **@react-navigation/bottom-tabs**  | ^7.5.0  | Navegação por abas inferiores  |
| **react-native-screens**           | ~4.16.0 | Componentes nativos de tela    |
| **react-native-safe-area-context** | ^5.6.1  | Gerenciamento de áreas seguras |

### Estilização e UI

| Pacote                        | Versão  | Descrição                                 |
| ----------------------------- | ------- | ----------------------------------------- |
| **styled-components**         | ^6.1.19 | CSS-in-JS para estilização de componentes |
| **react-native-vector-icons** | ^10.3.0 | Biblioteca de ícones (Material Icons)     |

### Requisições HTTP

| Pacote    | Versão  | Descrição                           |
| --------- | ------- | ----------------------------------- |
| **axios** | ^1.12.2 | Cliente HTTP para requisições à API |

### Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento Expo
npm run android    # Inicia o app no emulador/dispositivo Android
npm run ios        # Inicia o app no emulador/dispositivo iOS
npm run web        # Inicia o app no navegador web
```

## �📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

-   [Node.js](https://nodejs.org/) (versão 14 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
-   [Expo CLI](https://docs.expo.dev/get-started/installation/)
-   [Expo Go](https://expo.dev/client) no seu dispositivo móvel (Android/iOS)

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/RafaelSR0x/floating-park-final.git
cd floating-park-final
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure a API

O aplicativo requer conexão com uma API backend. Configure a URL da API editando o arquivo `src/api/api.js`:

```javascript
const API_URL = 'SUA_URL_DA_API_AQUI';
```

**Nota:** A URL da API não está incluída neste repositório por questões de segurança.

#### Requisitos da API Backend

A API deve implementar os seguintes endpoints:

**Autenticação:**

-   `POST /auth/register` - Cadastro de usuário
-   `POST /auth/login` - Login de usuário (retorna token JWT)
-   `GET /auth/me` - Dados do usuário autenticado

**Veículos:**

-   `GET /api/veiculos` - Listar veículos ativos
-   `GET /api/veiculos/id/{id}` - Buscar veículo por ID
-   `GET /api/veiculos/placa/{placa}` - Buscar histórico por placa
-   `POST /api/veiculos/entrada` - Registrar entrada de veículo
-   `PUT /api/veiculos/saida` - Registrar saída de veículo

A API deve suportar autenticação JWT via header `Authorization: Bearer <token>`.

### 4. Inicie o aplicativo

```bash
npm start
# ou
expo start
```

### 5. Execute no dispositivo

-   **Android**: Abra o Expo Go e escaneie o QR Code
-   **iOS**: Abra a câmera e escaneie o QR Code
-   **Emulador**: Pressione `a` para Android ou `i` para iOS no terminal

## 📁 Estrutura do Projeto

```
floating-park-final/
├── src/
│   ├── api/
│   │   └── api.js                  # Configuração do Axios e endpoints
│   ├── assets/
│   │   ├── components/             # Componentes reutilizáveis
│   │   │   ├── BottomBar.jsx       # Barra de navegação inferior
│   │   │   ├── Card.jsx            # Card de veículo
│   │   │   ├── Header.jsx          # Cabeçalho das telas
│   │   │   ├── MenuHamburger.jsx   # Menu lateral
│   │   │   ├── ModalSaidaVeiculo.jsx # Modal de confirmação de saída
│   │   │   ├── ModalSuccess.jsx    # Modal de sucesso
│   │   │   └── PrimaryButton.jsx   # Botão primário
│   │   ├── fonts/                  # Fontes personalizadas
│   │   └── images/                 # Imagens e logos
│   ├── navigation/
│   │   └── Navigation.jsx          # Configuração de rotas
│   └── screens/                    # Telas do aplicativo
│       ├── cadastro/               # Tela de cadastro de usuário
│       ├── editar-usuario/         # Tela de edição de usuário
│       ├── entrada-veiculo/        # Tela de entrada de veículo
│       ├── home/                   # Tela principal com lista de veículos
│       ├── login/                  # Tela de login
│       └── saida-veiculo/          # Tela de saída de veículo
├── App.jsx                         # Componente principal
├── index.js                        # Ponto de entrada
├── package.json                    # Dependências do projeto
└── README.md                       # Documentação
```

## 🔐 Autenticação

O aplicativo utiliza autenticação JWT (JSON Web Token):

1. O usuário faz login com email e senha
2. O backend retorna um token JWT
3. O token é armazenado no Expo Secure Store
4. Todas as requisições subsequentes incluem o token no header `Authorization: Bearer <token>`
5. Rotas públicas (`/auth/login` e `/auth/register`) não requerem token

## 🎯 Funcionalidades Principais

### 1. Login e Cadastro

-   Validação de campos
-   Armazenamento seguro de credenciais

### 2. Registro de Entrada

-   Cadastro rápido de veículo pela placa
-   Validação de formato de placa (ABC-1234 ou ABC1D23)
-   Registro automático de data e hora de entrada

### 3. Registro de Saída

-   Busca de veículo pela placa
-   Exibição de informações de entrada
-   Cálculo automático de:
    -   Tempo de permanência
    -   Valor a pagar (R$ 10,00 por hora)
-   Confirmação com modal

### 4. Visualização de Veículos

-   Lista de todos os veículos ativos
-   Exibição de placa, data e hora de entrada
-   Atualização automática ao adicionar/remover veículos

## 🎨 Paleta de Cores

-   **Primária**: `#5b37b7` (Roxo)
-   **Secundária**: `#fff` (Branco)
-   **Texto**: `#000` (Preto)
-   **Destaque**: `#5626c4` (Roxo escuro)
-   **Fundo claro**: `#DFD7F3` (Roxo claro)

## ⚙️ Configurações Importantes

### Fuso Horário

O aplicativo está configurado para o fuso horário de Brasília (UTC-3). Os horários recebidos do backend em UTC são automaticamente ajustados para exibição local.

### Regras de Cobrança

-   Valor configurável por hora
-   Frações de hora são arredondadas para cima
-   Exemplo: 1h 15min = 2 horas

### Validação de Placas

O aplicativo aceita dois formatos de placa:

-   Padrão antigo: ABC-1234 ou ABC1234
-   Mercosul: ABC1D23

## 🐛 Solução de Problemas

### Erro de conexão com a API

-   Verifique se a URL da API está correta em `src/api/api.js`
-   Certifique-se de que o backend está online
-   Verifique sua conexão com a internet

### Ícones não aparecem

-   Limpe o cache: `expo start -c`
-   Reinstale as dependências: `npm install`

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

⭐ Se este projeto foi útil para você, considere dar uma estrela!
