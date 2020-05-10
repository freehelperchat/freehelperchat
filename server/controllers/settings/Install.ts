/* import config from '../../../config/config.json';
import StartChatForm from '../../models/settings/StartChatForm';
import Operator from '../../models/operator/Operator';
import Encrypter from '../../functions/Encrypter';

class InstallController {
  async install(req, res) {
    if (!config.server.installed) {
      const username = req.header('username');
      const pass = req.header('pass');
      const { admin } = req.body;
      await Operator.create({
        username,
        pass: Encrypter.hashPassword(pass),
        allDepartments: true,
        ...admin,
      });
    }
  },
};

export default new InstallController(); */
