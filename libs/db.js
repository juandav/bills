/*
* Collection user
*/

module.exports = function( mongoose, connect, data ) {
  mongoose.connect( connect, function(err, conn){
      if(err)
        console.log('connection error');

      console.log('successful connection');
  });
 
  var Schema = mongoose.Schema;
  var UserSchema = new Schema(
  {    
    name: String,
    user: { type: String, required: true },
    pass: String,
    email: Array,
    access: {type: Boolean, default: false},
    verify: Boolean,
    rol: {type: Array, enum: data.rol, default: data.default},
    date: {type:Date, default: new Date()}
  }, {collection:'user'});
    return mongoose.model('user', UserSchema);
}


/*
  {
    connect: '',
    rol: {
      default:'',
      states: ['', '', '']
    }
  }
*/