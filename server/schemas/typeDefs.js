const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: [bookSchema]
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {s
        token: ID
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(
            email: String!
            password: String!
        ): Auth
        addUser(
            username: String!
            email: String!
            password: String!
        ): Auth
        saveBook(
            authors: [ID]!
            description: String!
            bookId: String!
            image: String
            link: String
            title: String!
        )
        removeBook(
            bookId: ID
        ): User
    }
`