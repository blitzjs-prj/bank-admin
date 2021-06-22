import { useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import getAccount from "app/accounts/queries/getAccount"
import deleteAccount from "app/accounts/mutations/deleteAccount"
import TransactionCard from "app/transactions/components/TransactionCard"
import styles from "app/styles/AccountView.module.css"
import getTransactions from "app/transactions/queries/getTransactions"

export const ShowAccountPage: BlitzPage = () => {
  const router = useRouter()
  const accountId = useParam("accountId", "number")
  const [deleteAccountMutation] = useMutation(deleteAccount)
  const [account] = useQuery(getAccount, { id: accountId })

  var [transactions] = useQuery(getTransactions, {
    where: { OR: [{ sender: accountId }, { receiver: accountId }] },
  })
  transactions = transactions.map((transaction) => {
    const [sender] = useQuery(getAccount, { id: transaction?.sender })
    const [receiver] = useQuery(getAccount, { id: transaction?.receiver })
    return { ...transaction, sender, receiver }
  })

  async function deleteAccountFn() {
    if (confirm("Do you really want to delete this account?")) {
      await deleteAccountMutation({ id: account?.id })
      router.push(Routes.AccountsPage())
    }
  }

  return (
    <div className={styles.accountviewcontainer}>
      <div className={styles.accountviewmain}>
        <div style={{ width: "100%" }}>
          <div className={styles.accountviewname}>
            <h1>{account?.name}</h1>
          </div>
          <div className={styles.accountviewminidet}>
            <div>
              <span style={{ marginRight: "4px", color: "rgb(142 142 142)" }}>Balance($):</span>
              <span style={{ fontWeight: "600" }}>{account?.balance}</span>
            </div>
            <div style={{ padding: "14px 0" }}>
              <span style={{ margin: "1px" }}>
                <button
                  onClick={() => router.push(`/accounts/${account?.id}/edit`)}
                  className="btn"
                >
                  Edit
                </button>
              </span>
              <span style={{ margin: "1px" }}>
                <button onClick={deleteAccountFn} className="btn-danger">
                  Delete
                </button>
              </span>
            </div>
          </div>
          <div className={styles.accountviewtransactionscont}>
            <div className={styles.accountviewtransactions}>
              <h2>Transactions</h2>
            </div>
            <div className={styles.accountviewtransactionslist}>
              {!transactions || transactions?.length <= 0
                ? "No transactions yet."
                : transactions?.map((transaction, i) => (
                    <TransactionCard key={i} transaction={transaction} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAccountPage
