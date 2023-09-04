import { NextFunction, Request, Response } from 'express';

export const csrfConfig = {
  csrfOption: { cookie: { sameSite: true, secure: true, httpOnly: true } },
  csrfMiddleWare: (req: Request, res: Response, next: NextFunction) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token, {
      secure: true,
      sameSite: 'strict',
    });
    res.locals.csrfToken = token;

    next();
  },
};
