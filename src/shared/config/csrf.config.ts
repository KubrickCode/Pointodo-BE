import { NextFunction, Request, Response } from 'express';

export const csrfConfg = {
  csrfOption: { cookie: { sameSite: true } },
  csrfMiddleWare: (req: Request, res: Response, next: NextFunction) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;

    next();
  },
};
