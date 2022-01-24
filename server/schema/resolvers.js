const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
         user: async (parent, {username}, context) => {
              return await User.findOne({username})
         },
         users: async () => {
              return await User.find({}).populate('savedBooks')
         }
    },
    Mutation: {
         login: async (parent, {
              email,
              password
         }, context) => {
              const user = await User.findOne({
                   email
              });
              if (!user) {
                   throw new AuthenticationError('No user found with this email address')
              }
              const correctPw = await user.isCorrectPassword(password);

              if (!correctPw) {
                   throw new AuthenticationError('Incorrect credentials');
              }
              console.log(context.user)
              const token = signToken(user);
              return {
                   token,
                   user
              };
         },
         createUser: async (parent, {
              username,
              email,
              password
         }) => {
              const user = await User.create({
                   username,
                   email,
                   password
              });
              console.log(user)
              const token = signToken(user);
              return {
                   token,
                   user
              }
         },
         saveBook: async (parent, book, context, info) => {
              if (context.user) {
                   console.log(book)
                   const user = await User.findByIdAndUpdate(context.user._id,
                   {
                        $push: {
                             savedBooks: [book]
                        },
                       })
                   return book
              }
              throw new AuthenticationError('You need to be logged in!')
         },
         deleteBook: async (parent, {bookId}, context, info) => {
                 return await User.findByIdAndUpdate(context.user._id, 
                    {
                       $pull: {
                          savedBooks: {
                             bookId: bookId
                          }
                       }
                    },
                    { new: true}
              )
         }

    }
}
module.exports = resolvers;