module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String  },
    password: { type: String  },
    // nickname: { type: String  },

    ctime: { type: Date, default: Date.now },
    mtime: { type: Date, default: Date.now },

    score: { type: Number, default: 0 },
    logincount: Number,

    is_admin: { type: Boolean, default: false } // admin
  });

  return mongoose.model('User', UserSchema);
}
