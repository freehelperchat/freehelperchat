const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    chatId = {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    time:{
        type: Date,
        required: true,
    },
    previousOperatosId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operator',
    },
    nextOperatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operator',
    },
    motivo:{
        type: String
    },
});
