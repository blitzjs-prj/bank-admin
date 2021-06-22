import { Link, invoke, Head, useRouter, useMutation, useQuery, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTransaction from "app/transactions/mutations/createTransaction"
import { TransactionForm, FORM_ERROR } from "app/transactions/components/TransactionForm"
import styles from "app/styles/Home.module.css"
import { useRef, useState } from "react"
import getAccount from "app/accounts/queries/getAccount"

const NewTransactionPage: BlitzPage = () => {
  const [disable, setDisable] = useState(false)
  const [sender, setSender] = useState()
  const [fetchingSender, setFetchingSender] = useState(false)
  const [receiver, setReceiver] = useState()
  const [fetchingReceiver, setFetchingReceiver] = useState(false)

  const router = useRouter()
  const [createTransactionMutation] = useMutation(createTransaction)
  const formRef = useRef()

  async function transact() {
    const sender = formRef.current.sender.value
    const receiver = formRef.current.receiver.value
    const amount = formRef.current.amount.value
    const newTransact = await createTransactionMutation({
      sender: parseInt(sender),
      receiver: parseInt(receiver),
      amount: parseInt(amount),
    })
    router.push(Routes.TransactionsPage())
  }

  async function fetchAccountSender(e) {
    const value = e.target.value
    setSender(undefined)
    setFetchingSender(true)
    if (value.length == 0) {
      setSender(undefined)
    } else {
      const account = await invoke(getAccount, { id: parseInt(value) })
      setSender(account)
    }
    setFetchingSender(false)
  }

  async function fetchAccountReceiver(e) {
    const value = e.target.value
    setReceiver(undefined)
    setFetchingReceiver(true)
    if (value.length == 0) {
      setReceiver(undefined)
    } else {
      const account = await invoke(getAccount, { id: parseInt(value) })
      setReceiver(account)
    }
    setFetchingReceiver(false)
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
            <h3>Transact</h3>
          </div>
          <div>
            <form ref={formRef}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="inputField">
                  <div className="label">
                    <label>Sender</label>
                  </div>
                  <div>
                    <input
                      name="sender"
                      type="text"
                      onChange={fetchAccountSender}
                      placeholder="Type in account id"
                    />
                    {fetchingSender ? (
                      <span style={{ fontSize: "11px" }}>Fetching account name...</span>
                    ) : null}
                    {sender && <span style={{ fontSize: "11px" }}>Sender: {sender?.name}</span>}
                  </div>
                </div>
                <div className="inputField">
                  <div className="label">
                    <label>Receiver</label>
                  </div>
                  <div>
                    <input
                      name="receiver"
                      type="text"
                      onChange={fetchAccountReceiver}
                      placeholder="Type in account id"
                    />
                    {fetchingReceiver ? (
                      <span style={{ fontSize: "11px" }}>Fetching account name...</span>
                    ) : null}
                    {receiver && (
                      <span style={{ fontSize: "11px" }}>Receiver: {receiver?.name}</span>
                    )}
                  </div>
                </div>
                <div className="inputField">
                  <div className="label">
                    <label>Amount($)</label>
                  </div>
                  <div>
                    <input name="amount" type="text" />
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                style={{ float: "right", marginTop: "9px" }}
                className="btn"
                onClick={transact}
              >
                Transact
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NewTransactionPage
