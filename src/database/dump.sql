DROP TABLE IF EXISTS "usuarios";
DROP TABLE IF EXISTS "categorias";

CREATE TABLE "usuarios"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "senha" TEXT NOT NULL
);

CREATE TABLE "categorias"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "categoria" VARCHAR(255) NOT NULL
);

INSERT INTO categorias (categorias) VALUES
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');
