import AIResponseBlock from "../ai/AIResponseBlock";

export default function AITipWidget({ tip }) {
  return (
    <AIResponseBlock label="AI Tip of the Day">
      <p>
        {tip ||
          "You have three deadlines clustering this Friday. Start the DBMS assignment today — it's the longest task and currently has the least progress."}
      </p>
    </AIResponseBlock>
  );
}
