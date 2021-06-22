import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(async (input: any) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const senderDetails = await db.account.findFirst({ where: { id: input?.sender } })
  await db.account.update({
    where: { id: senderDetails?.id },
    data: { balance: senderDetails.balance - input?.amount },
  })

  const receiverDetails = await db.account.findFirst({ where: { id: input?.receiver } })
  await db.account.update({
    where: { id: receiverDetails?.id },
    data: { balance: receiverDetails.balance + input?.amount },
  })

  const transaction = await db.transaction.create({ data: input })

  return transaction
})
