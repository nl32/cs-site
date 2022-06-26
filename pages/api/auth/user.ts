import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";

export default withIronSessionApiRoute(async function userRoute(req, res) {
  res.json({ ...req.session.user });
}, ironOptions);
