FROM python:3.11-slim

# Define o diretório de trabalho
WORKDIR /api

# Copia os arquivos da aplicação para o container
COPY . /api

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expor a porta da API
EXPOSE 8000

WORKDIR /

# Comando para iniciar o servidor
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
