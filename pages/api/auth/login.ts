import argon2 from "argon2";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
import { prisma } from "../../../lib/db";

// req body has email and password
export default withIronSessionApiRoute(async function loginRoute(req, res) {
 const {email,password} = req.body;
 const user = await prisma.users.findUnique({
  where: {
    email: email,
  },
  
})
if(user && await argon2.verify(user.hashedPassword,password)){
    req.session.user = {
      id:user.id,
    }
    await req.session.save();
    res.send({ok:true});
}else{
  res.send({ok:false});
}
}, ironOptions);
