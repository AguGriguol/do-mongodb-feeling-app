const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI_CONNECTION, JSON.parse(process.env.MONGO_PARAMS_CONNECTION));
mongoose.set('debug', true);

const FeelingType = require('../../models/feelingType');

(async () => {
  try {
    const types = [
      {
        code: 'happy'
      },
      {
        code: 'sad'
      },
      {
        code: 'relaxed'
      },
      {
        code: 'angry'
      },
      {
        code: 'bored'
      },
      {
        code: 'in_love'
      },
      {
        code: 'scared'
      },
      {
        code: 'sleepy'
      },
      {
        code: 'furious'
      }
    ];

    for (const type of types) await new FeelingType(type).save();
  } catch (err) {
    console.log(err);
  }
})();
