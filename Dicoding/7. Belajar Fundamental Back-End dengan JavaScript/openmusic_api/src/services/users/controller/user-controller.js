import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import UserRepositories from '../repositories/user-repositories.js';

export const createUser = async (req, res, next) => {
  const { username, password, fullname } = req.validated;

  // check unique username
  const isUsernameExist = await UserRepositories.verifyNewUsername(username);
  if(isUsernameExist){
    return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan.'));
  }

  // insert user
  const userId = await UserRepositories.createUser({
    username,password, fullname
  });

  if (!userId) {
    return next(new InvariantError('User gagal ditambahkan'));
  }
 
  return response(res, 201, 'User berhasil ditambahkan', { userId });
};