DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS pedido_produtos;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE categorias(
    id SERIAL PRIMARY KEY NOT NULL,
    categoria VARCHAR(255) NOT NULL
);

INSERT INTO categorias (categoria) VALUES
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');

CREATE TABLE produtos(
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  descricao TEXT UNIQUE NOT NULL,
  quantidade_estoque INT NOT NULL DEFAULT 0,
  valor FLOAT NOT NULL,
  categoria_id INT NOT NULL REFERENCES categorias(id)
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  cep INT,
  rua TEXT,
  numero INT,
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  estado CHAR(2)
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  cliente_id INT NOT NULL REFERENCES clientes(id),
  observacao TEXT,
  valor_total FLOAT NOT NULL
);

CREATE TABLE pedido_produtos(
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  pedido_id INT NOT NULL REFERENCES pedidos(id),
  produto_id INT NOT NULL REFERENCES produtos(id),
  quantidade_produto INT NOT NULL,
  valor_produto FLOAT NOT NULL
);

ALTER TABLE produtos ADD produto_imagem TEXT;
