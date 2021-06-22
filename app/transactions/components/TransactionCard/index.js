import styles from "./TransactionCard.module.css"
import Link from "next/link"

export default function TransactionCard({ transaction }) {
  const { id, sender, receiver, amount, createdAt } = transaction
  return (
    <Link href={`transactions/${id}`}>
      <div className={styles.transactionCard}>
        <div className={styles.transactionCardDetails}>
          <div className={styles.transactionCardName}>
            <h4>
              <span>Sender: </span>
              <span style={{ fontWeight: "bold" }}>{sender?.name}</span>
            </h4>
          </div>
          <div className={styles.transactionCardName}>
            <h4>
              <span>Receiver: </span>
              <span style={{ fontWeight: "bold" }}>{receiver?.name}</span>
            </h4>
          </div>
          <div className={styles.transactionCardName}>
            <h4>
              <span>Amount($): </span>
              <span style={{ fontWeight: "bold" }}>{amount}</span>
            </h4>
          </div>
          <div className={styles.transactionCardName}>
            <h4>
              <span>Created At: </span>
              <span style={{ fontWeight: "bold" }}>{createdAt.toString()}</span>
            </h4>
          </div>
        </div>
      </div>
    </Link>
  )
}
