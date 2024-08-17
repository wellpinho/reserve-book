# Requeriments

## History
1. Somos uma biblioteca pequena e gostariamos de controlar a nossa entrada e saida de livros.
    1. Queremos cadastrar o usuário que irá pegar o livro emprestado.
    2. Cadastrar os livros da nossa bilioteca.
    3. Emprestar os livros para qulaquer usuário.
    4. Listar registros de livros emprestados.

## Data
1. User: [name, socialId, phoner, address, email].
2. Book: [name, quantity, author, gender, isbn].
3. Reserve: [userId, bookId, returnPeriod(prazoDevolucao), returnDate(dataDevolucao), departureDate(dataSaida)]

## Rules (Use Case)
[x] Create a new user
[x] - CPF or email should be unique

[x] Get user register by cpf
[x] - Return users or null if user not exists

[] Create a new book
[] - ISBN should be unique

[] Get a book by name or ISBN
[] - Return books or empty 

[] Lend a book to the user
[] - The return date cannot be earlier than the departure date
[] - A user cannot have more than one book of the same ISBN
[] - User can have more than one book with different isbn
[] - When registering book, email will be sent with: [name, socialId], book data:[withdrawalDate, returnDate]

[] Return of the book
[] - If the user delays delivery of the book, a fixed fee of U$10 will be charged.

[] Listar todos os empréstimos abertos, com nome do livro e ISBN, nome do usuário, CPF, data de saída e data de devolução. Ordenados pelo data de devolução mias antigo.

## Structures

## User Repository
[x] cadastrar: ({ nome, CPF, telefone, email }) => Promise<void>
[x] cpfExists(cpf) => Promise<boolean>
[x] emailExists(email) => Promise<boolean>


