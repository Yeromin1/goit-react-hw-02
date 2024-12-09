import { useState, useEffect } from "react";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";
import Description from "./components/Description/Description";

function App() {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const updateFeedback = (feedbackType) => {
    setFeedbacks((prevFeedbacks) => {
      if (feedbackType === "reset") {
        return {
          good: 0,
          neutral: 0,
          bad: 0,
        };
      }
      return {
        ...prevFeedbacks,
        [feedbackType]: prevFeedbacks[feedbackType] + 1,
      };
    });
  };

  const totalFeedback = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  const positiveFeedback =
    totalFeedback > 0 ? Math.round((feedbacks.good / totalFeedback) * 100) : 0;

  // Збереження статистики в localStorage
  useEffect(() => {
    const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks"));
    if (savedFeedbacks) {
      setFeedbacks(savedFeedbacks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedbacks.good}
          neutral={feedbacks.neutral}
          bad={feedbacks.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
