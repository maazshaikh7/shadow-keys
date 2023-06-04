import React, { useEffect, useRef, useState } from "react";

type GhostTextProps = {
  mode: string;
};

type TestResult = {
  speed: number;
  accuracy: number;
};

const GhostText: React.FC<GhostTextProps> = ({ mode }) => {
  const [paragraphs] = useState<string[]>([
    "The wolves stared at the Grizzly and her cubs. Hungry and desperate, they hesitated. The risk of attacking the mother was high. The pack's survival was at stake.",
    "He picked up plastic trash daily. The beach was never clean. More plastic appeared every day. It seemed endless, but he persisted.",
    "She couldn't write on the blank card. Words failed her. Nothing seemed right. She struggled with her thoughts.",
    "She worried if he received the note. Should've given it personally. Trust wavered as she waited.",
    "Cooking with fire had many ways. Rotating meat on a spit. Toasting bread on hot stones. Boiling with coals. Baking in the ground. Campfire cooking was versatile.",
    "The box held the answer. She unlocked it. Empty. Years of searching, wasted.",
    "Love is boundless. Give freely. It never runs out.",
    "Cleaning the sink was a chore. It got dirty quickly. A tiny creature caused the mess.",
    "Reality was surreal. A man in a banana suit. A llama on the road. Fairies dancing. It wasn't a dream.",
    "A tingling feeling unsettled her. Something was wrong.",
    "A red rose surprised Sarah. No note attached. She wondered who left it.",
    "Dave found comfort in routine. Predictable life. Change was coming.",
    "The tree missed the kids. The swing hung empty.",
    "Panic loomed, time was running out.",
    "The treehouse was their sanctuary. The sisters turned it into a castle.",
  ]);

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(
    Math.floor(Math.random() * paragraphs.length)
  );
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [showStatistics, setShowStatistics] = useState<boolean>(false);
  const [unmatchedWord, setUnmatchedWord] = useState<string | null>(null);
  const [expectedWord, setExpectedWord] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [incorrectWords, setIncorrectWords] = useState<number>(0);

  const currentParagraph = paragraphs[currentParagraphIndex];
  const sentences = currentParagraph.split(/[.?!]\s+/);
  const currentSentence = sentences[currentSentenceIndex];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    if (value === currentSentence) {
      if (currentSentenceIndex === sentences.length - 1) {
        setEndTime(Date.now());
        setShowStatistics(true);
      } else {
        setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        setUserInput("");
      }
    } else if (!currentSentence.startsWith(value)) {
      const expectedWords = currentSentence.split(" ");
      const typedWords = value.split(" ");
      let unmatchedIndex = 0;
      for (let i = 0; i < typedWords.length; i++) {
        if (expectedWords[i] !== typedWords[i]) {
          unmatchedIndex = i;
          break;
        }
      }
      setUnmatchedWord(typedWords[unmatchedIndex]);
      setExpectedWord(expectedWords[unmatchedIndex]);
      setIncorrectWords((prevIncorrectWords) => prevIncorrectWords + 1);
    } else {
      setUnmatchedWord(null);
      setExpectedWord(currentSentence.split(" ")[value.split(" ").length]);
    }
  };

  const handleRefreshClick = () => {
    setCurrentParagraphIndex(Math.floor(Math.random() * paragraphs.length));
    setCurrentSentenceIndex(0);
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setTestResults(null);
    setShowStatistics(false);
    setIncorrectWords(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (endTime) {
      const elapsedTime = (endTime - startTime!) / 1000; // in seconds
      const typedWords = currentParagraph.split(" ").length;
      const speed = (typedWords / elapsedTime) * 60; // words per minute

      const totalChars = currentSentence.length;
      const distance = userInput.length - totalChars;
      const incorrectWordsPenalty = Math.max(0, incorrectWords - distance);
      const adjustedDistance = distance + incorrectWordsPenalty;
      const accuracy = ((totalChars - adjustedDistance) / totalChars) * 100;

      const result: TestResult = {
        speed,
        accuracy,
      };
      setTestResults(result);
    }
  }, [
    endTime,
    startTime,
    userInput,
    currentParagraph,
    currentSentence,
    incorrectWords,
  ]);

  return (
    <div className={`ghostTextContainer ${mode}`}>
      <h2>START TYPING!</h2>
      <div className={`ghostText ${mode}-text`}>
        {currentSentence.split(" ").map((word, index) => (
          <span key={index} className={index === 0 ? "current-word" : ""}>
            {index === 0 ? (
              <>
                <span className={unmatchedWord ? "incorrect" : ""}>
                  {unmatchedWord ? expectedWord : word}
                </span>{" "}
              </>
            ) : (
              <>{word} </> // Display other words normally
            )}
          </span>
        ))}
      </div>
      {unmatchedWord && (
        <div className="unmatchedWord">
          Unmatched Word: <span className="incorrect">{unmatchedWord}</span>
          <br />
          Expected Word: {expectedWord}
        </div>
      )}
      {showStatistics ? (
        <div className="statistics">
          <div>Typing Speed: {testResults?.speed.toFixed(0)} WPM</div>
          <div>Accuracy: {testResults?.accuracy.toFixed(2)}%</div>
        </div>
      ) : (
        ""
      )}
      <button id="btn" onClick={handleRefreshClick}>
        <i className="fa fa-refresh"></i>
      </button>
      <input
        placeholder="Go..."
        className={`input ${mode}`}
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        disabled={showStatistics}
      />
    </div>
  );
};

export default GhostText;
