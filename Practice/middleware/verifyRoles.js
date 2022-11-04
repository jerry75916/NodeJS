const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles]; //require roles
    console.log(req.roles.map((role) => rolesArray.includes(role)));
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    console.log(rolesArray);
    console.log(req.roles);

    next();
  };
};

export default verifyRoles;
