const bcrypt = require("bcryptjs")
const {sequelize} = require('../../core/db')

const {Sequelize, Model} = require('sequelize')

const classicFields = {
  image: Sequelize.String,
  content: Sequelize.String,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.String,
  type: Sequelize.TINYINT,
}

class Movie extends Model{

}

Movie.init(classicFields,{
  sequelize,
  tableName: 'movie'
})

class Sentence extends Model{

}

Sentence.init(classicFields,{
  sequelize,
  tableName: 'sentence'
})

class Music extends Model{

}
const musicFields = Object.assign({
  url: Sequelize.String
},classicFields)

Music.init(musicFields,{
  sequelize,
  tableName: 'music'
})

module.exports ={
  Movie,
  Sentence,
  Music
}