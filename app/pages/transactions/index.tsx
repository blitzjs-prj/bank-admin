import { Suspense } from "react"
import { Head, Link, useQuery, useRouter, BlitzPage, Routes } from "blitz"
import getTransactions from "app/transactions/queries/getTransactions"
import TransactionCard from "app/transactions/components/TransactionCard"
import styles from "app/styles/Home.module.css"
import getAccount from "app/accounts/queries/getAccount"

export const TransactionsList = () => {
  var [transactions] = useQuery(getTransactions, {})
  transactions = transactions.map((transaction) => {
    const [sender] = useQuery(getAccount, { id: transaction?.sender })
    const [receiver] = useQuery(getAccount, { id: transaction?.receiver })
    return { ...transaction, sender, receiver }
  })

  return (
    <>
      {transactions?.map((transaction, i) => (
        <TransactionCard transaction={transaction} key={i} />
      ))}
    </>
  )
}

const TransactionsPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Bank Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <div>
            <span style={{ margin: "1px" }}>
              <button onClick={() => router.push("/transactions/new")}>Transact</button>
            </span>
            <span style={{ margin: "1px" }}>
              <button onClick={() => router.push("/accounts/new")}>Add Account</button>
            </span>
            <span style={{ margin: "1px" }}>
              <button onClick={() => router.push(Routes.AccountsPage())}>Go to Accounts</button>
            </span>
          </div>
        </div>

        <div className={styles.accountcontainer}>
          <div className={styles.youraccounts}>
            <h3>All Transactions</h3>
          </div>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <TransactionsList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TransactionsPage
