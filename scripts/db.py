import psycopg2


# Script SQL
CREATE_TABLES_SQL = """

CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    is_gordox BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS responses (
    id SERIAL PRIMARY KEY,
    video_id INT REFERENCES videos(id) ON DELETE CASCADE,
    choice VARCHAR(10) NOT NULL CHECK (choice IN ('Gordox', 'High Elo')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

# Conectar ao banco e criar as tabelas
try:
    with psycopg2.connect(**DB_CONFIG) as conn:
        with conn.cursor() as cur:
            cur.execute(CREATE_TABLES_SQL)
            conn.commit()
            print("Tables created successfully.")
except Exception as e:
    print(f"Error creating tables: {e}")
