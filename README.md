
# Gordox ou High Elo?

![Gordox](https://github.com/user-attachments/assets/9beb16a1-9067-475b-987d-eaf4b116bc70)

**Gordox ou High Elo?** é um jogo interativo onde os usuários assistem a clipes de jogadas do League of Legends e tentam adivinhar: foi o Gordox ou um jogador de High Elo?

---

## 🚀 Funcionalidades

- Interface simples e divertida.
- Sistema de registro de escolhas no back-end.
- Comunicação entre front-end e back-end via API.
- Totalmente dockerizado para fácil deploy.

---

## 🛠️ Tecnologias Utilizadas

- **Front-End**: React
- **Back-End**: FastAPI
- **Banco de Dados**: PostgreSQL
- **Docker**: Para containerização do projeto.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter:

- **Docker** instalado na sua máquina.
- **Git** para clonar o repositório.

---

## 📦 Como Rodar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/gordox-or-highelo.git
cd gordox-or-highelo
```

### 2. Configure as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto

Adicione as variáveis necessárias:
DATABASE_URL=postgresql://postgres:user@pass:5432/db

### 3. Suba os Containers com Docker Compose
```bash
docker-compose up --build
```

Front-End: http://localhost:3000
Back-End: http://localhost:8000
