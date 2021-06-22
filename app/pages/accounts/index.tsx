import { Head, useQuery, useRouter, BlitzPage, Routes } from "blitz"
import getAccounts from "app/accounts/queries/getAccounts"

import styles from "app/styles/Home.module.css"
import AccountCard from "app/accounts/components/AccountCard"

const AccountsPage: BlitzPage = () => {
  const [accounts] = useQuery(getAccounts, {})
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
              <button onClick={() => router.push(Routes.TransactionsPage())}>
                Go to Transactions
              </button>
            </span>
          </div>
        </div>

        <div className={styles.accountcontainer}>
          <div className={styles.youraccounts}>
            <h3>All Accounts</h3>
          </div>
          <div>
            {accounts?.reverse()?.map((account, i) => (
              <AccountCard key={i} account={account} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
export default AccountsPage
