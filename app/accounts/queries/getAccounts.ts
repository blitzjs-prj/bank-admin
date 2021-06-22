import { NotFoundError, resolver } from "blitz"
import db, { Prisma } from "db"

export default resolver.pipe(async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return db.account.findMany()
})
