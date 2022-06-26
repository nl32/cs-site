import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
export default withIronSessionApiRoute(async function logoutRoute(req, res) {
  req.session.destroy();
  res.send({ ok: true });
}, ironOptions);
