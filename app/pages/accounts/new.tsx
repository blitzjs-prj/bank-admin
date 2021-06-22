import { Head, Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import createAccount from "app/accounts/mutations/createAccount"
import styles from "app/styles/Home.module.css"
import { useState, useRef } from "react"

const NewAccountPage: BlitzPage = () => {
  const [disable, setDisable] = useState(false)
  const router = useRouter()
  const [createAccountMutation] = useMutation(createAccount)
  const formRef = useRef<string | undefined>()

  async function addAccount() {
    const { accountName, accountBalance } = formRef.current

    const name = accountName.value
    const balance = accountBalance.value
    const account = await createAccountMutation({
      name,
      balance: parseInt(balance),
    })
    router.push(Routes.AccountsPage())
  }
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
              <button onClick={() => router.push(Routes.AccountsPage())}>Go to Accounts</button>
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
            <h3>Add New Account</h3>
          </div>
          <div>
            <form ref={formRef}>
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: "9px" }}>
                <div className="inputField">
                  <div className="label">
                    <label>Name</label>
                  </div>
                  <div>
                    <input id="accountName" type="text" />
                  </div>
                </div>
                <div className="inputField">
                  <div className="label">
                    <label>Balance($):</label>
                  </div>
                  <div>
                    <input id="accountBalance" type="text" />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "12px",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <span style={{ margin: "1px" }}>
                    <button disabled={disable} className="btn" onClick={addAccount}>
                      Add Account
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NewAccountPage
