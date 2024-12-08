import styles from "./Feedback.module.css";

function Feedback({ good, neutral, bad, totalFeedback }) {
  const positiveFeedback = Math.round((good / totalFeedback) * 100);

  return (
    <div className={styles.feedback}>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positiveFeedback}%</p>
    </div>
  );
}

export default Feedback;
