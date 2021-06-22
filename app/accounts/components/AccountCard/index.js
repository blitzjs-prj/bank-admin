import styles from "./AccountCard.module.css"
import Link from "next/link"

export default function AccountCard({ account }) {
  const { id, name, balance, createdAt } = account
  return (
    <Link href={`accounts/${id}`}>
      <div className={styles.account}>
        <div className={styles.accountdetails}>
          <div className={styles.accountname}>
            <h3>
              <span style={{ fontWeight: "100" }}>Account: </span>
              {name}
            </h3>
          </div>
          <div className={styles.accountbalance}>
            <span>
              <span style={{ fontWeight: "100" }}>Balance($): </span>
              {balance}
            </span>
          </div>
          <div className={styles.accountcreated_at}>
            <span>Created: {createdAt.toString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
