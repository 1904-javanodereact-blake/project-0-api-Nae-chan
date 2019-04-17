
export function authMiddleware (roles: string[]) {
  return (req, res, next) => {
    const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
    if (isAuthorized) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}
export function userIdAuthMiddleware (roles: string[]) {
  return (req, res, next) => {
    const sameUser = req.session.user.userId;
    const paramsUserId = +req.params.userId;
    if (sameUser === paramsUserId) {
      next();
    } else {
      const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
    if (isAuthorized) {
      next();
    } else {
      res.sendStatus(403);
    }
  }
};
}