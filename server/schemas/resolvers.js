const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id })=>{
            const foundUser = _id ? {_id} : {};
            await User.findOne(foundUser._id);

            if(!foundUser){
                return `Couldn't find an user with this ID.`
            }
        },
        books: async (parent, {bookId})=>{
            Book.findById(bookId).populate('user')
        },
    },
    Mutation: {
        createUser: async (parent, args)=>{
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        removeBook: async ( { user, params })=>{
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId }}},
                { new: true }
            );
            return updatedUser;
        },
        saveBook: async ( { user, body }) =>{
            const updatedUser = await User.findByIdAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body }},
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
        login: async (parent, { email, password }) =>{
            const user = await User.findOne({ email });

            if(!user){
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw AuthenticationError;
            };

            const token = signToken(user);
            return { token, user };
        },
    },
};

module.exports = resolvers;