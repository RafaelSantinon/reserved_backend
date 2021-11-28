import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '@repositories/user';

export default function authorize(profileTypeList: number[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { idUser } = req;

    const userRepositories = getCustomRepository(UserRepository);

    const { type } = await userRepositories.findOne(idUser);

    const hasAccess = profileTypeList.find((o: number) => o === type);

    if (hasAccess) {
      return next();
    }

    return res.status(403).end();
  };
}
