import { useState, useRef } from "react"
import { Head, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import getAccount from "app/accounts/queries/getAccount"
import updateAccount from "app/accounts/mutations/updateAccount"
import styles from "app/styles/Home.module.css"

export const EditAccountPage: BlitzPage = () => {
  const [disable, setDisable] = useState(false)
  const formRef = useRef()

  const router = useRouter()
  const accountId = useParam("accountId", "number")
  const [account, { setQueryData }] = useQuery(
    getAccount,
    { id: accountId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAccountMutation] = useMutation(updateAccount)

  async function editAccount() {
    const { accountName, accountBalance } = formRef.current

    const name = accountName.value
    const balance = accountBalance.value

    await updateAccountMutation({
      id: account?.id,
      name,
      balance,
    })
    router.push(Routes.ShowAccountPage({ accountId: account?.id }))
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
              <button onClick={() => router.push(Routes.TransactionsPage())}>Transact</button>
            </span>
          </div>
        </div>

        <div className={styles.accountcontainer}>
          <div className={styles.youraccounts}>
            <h3>Edit Account</h3>
          </div>
          <div>
            <form ref={formRef}>
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: "9px" }}>
                <div className="inputField">
                  <div className="label">
                    <label>Name</label>
                  </div>
                  <div>
                    <input id="accountName" type="text" defaultValue={account?.name} />
                  </div>
                </div>
                <div className="inputField">
                  <div className="label">
                    <label>Balance($):</label>
                  </div>
                  <div>
                    <input id="accountBalance" type="text" defaultValue={account?.balance} />
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
                    <button disabled={disable} className="btn" onClick={editAccount}>
                      Save Account
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

export default EditAccountPage
