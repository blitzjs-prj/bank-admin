import { Suspense } from "react"
import { useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import getTransaction from "app/transactions/queries/getTransaction"
import deleteTransaction from "app/transactions/mutations/deleteTransaction"
import styles from "app/styles/AccountView.module.css"
import getAccount from "app/accounts/queries/getAccount"

export const Transaction = () => {
  const router = useRouter()
  const transactionId = useParam("transactionId", "number")
  const [deleteTransactionMutation] = useMutation(deleteTransaction)
  const [transaction] = useQuery(getTransaction, { id: transactionId })
  const [sender] = useQuery(getAccount, { id: transaction?.sender })
  const [receiver] = useQuery(getAccount, { id: transaction?.receiver })

  async function deleteTransactionFn() {
    if (confirm("Do you want to delete this transaction?")) {
      await deleteTransactionMutation({ id: transaction?.id })
      router.push(Routes.TransactionsPage())
    }
  }

  return (
    <div className={styles.accountviewcontainer}>
      <div className={styles.accountviewmain}>
        <div style={{ width: "100%" }}>
          <div className={styles.accountviewname}>
            <h1>Transaction ID: {transaction?.id}</h1>
          </div>
          <div className={styles.accountviewminidet}>
            <div>
              <h2 style={{ marginRight: "4px" }}>
                <span style={{ color: "grey" }}>Sender:</span> {sender?.name}
              </h2>
            </div>
            <div>
              <h2 style={{ marginRight: "4px" }}>
                <span style={{ color: "grey" }}>Receiver:</span> {receiver?.name}
              </h2>
            </div>
            <div>
              <h2 style={{ fontWeight: "600" }}>
                <span style={{ color: "grey" }}>Amount($):</span> {transaction?.amount}
              </h2>
            </div>
          </div>
          <div>
            <button className="btn-danger" onClick={deleteTransactionFn}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShowTransactionPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Transaction />
    </Suspense>
  )
}

export default ShowTransactionPage
