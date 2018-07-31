module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String  },
    password: { type: String  },
    nickname: { type: String  },
    ctime: { type: Date, default: Date.now },
    mtime: { type: Date, default: Date.now },
    logincount: Number
  });

  return mongoose.model('User', UserSchema);
}
