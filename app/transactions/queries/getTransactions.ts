import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(async ({ where = undefined }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.transaction.findMany({ where })
})
