import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAccount = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAccount), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const account = await db.account.findFirst({ where: { id } })

  if (!account) throw new NotFoundError()

  return account
})
