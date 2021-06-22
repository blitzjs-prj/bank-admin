import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTransaction = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTransaction), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const transaction = await db.transaction.deleteMany({ where: { id } })

  return transaction
})
