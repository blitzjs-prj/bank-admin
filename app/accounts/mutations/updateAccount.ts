import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateAccount = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(resolver.zod(UpdateAccount), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const account = await db.account.update({ where: { id }, data })

  return account
})
