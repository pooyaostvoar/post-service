import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await fetch("http://user:3004/auth-user", {
    method: "GET",
    headers: { cookie: JSON.parse(JSON.stringify(req.headers)).cookie },
  });

  if (response.status === 200) {
    const result = await response.json();
    if (result.user) {
      req.user = result.user;
      next();
    }
  } else {
    res.sendStatus(401);
  }
};
