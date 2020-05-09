import IdCounter from '../models/chat/IdCounter';

const Models = {
  CHAT: 'CHAT',
};

export default {
  async getIdCounter(model: string): Promise<number> {
    let counter = await IdCounter.findById(model);
    if (!counter) {
      counter = await IdCounter.create({ _id: model });
    }
    counter.value += 1;
    await counter.save();
    return counter.value;
  },

  async rollbackIdCounter(model: string): Promise<boolean> {
    const counter = await IdCounter.findById(model);
    if (!counter) return false;
    counter.value -= 1;
    if (counter.value < 0) return false;
    await counter.save();
    return true;
  },

  Models,
};
