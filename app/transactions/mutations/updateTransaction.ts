import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTransaction = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(resolver.zod(UpdateTransaction), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const transaction = await db.transaction.update({ where: { id }, data })

  return transaction
})
