"use client";

// Functional component to render a single quiz
function Quiz({ quiz }) {
  return (
    <div className="border-t border-zinc-300 dark:border-zinc-800">
      <p className="text-zinc-800 dark:text-zinc-300 font-medium text-lg">
        {quiz.title}
      </p>
      {quiz.questions.map((question: any) => (
        <div key={question._id} className="mt-4">
          <p className="text-zinc-600 dark:text-zinc-400">{question.text}</p>
          <ul className="mt-2">
            {question.choices.map((choice: any, index: any) => (
              <li key={index} className="list-disc ml-4">
                {choice}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Quiz;
