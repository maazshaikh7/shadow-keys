import React, { useEffect, useRef, useState } from "react";

type GhostTextProps = {
  mode: string;
};

type TestResult = {
  speed: number;
  accuracy: number;
};

const GhostText: React.FC<GhostTextProps> = ({ mode }) => {
  const [paragraphs, setParagraphs] = useState<string[]>([
    "Hello My name is Maaz Shaikh. This is the first paragraph.",
    "I'm a software developer. This is the second paragraph.",
    "I enjoy coding and learning new technologies. This is the third paragraph.",
  ]);

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [showStatistics, setShowStatistics] = useState(false);

  const currentParagraph = paragraphs[currentParagraphIndex];
  const sentences = currentParagraph.split(". ");
  const currentSentence = sentences[currentSentenceIndex];
  const inputRef = useRef<HTMLInputElement>(null);
  const [incorrectWords, setIncorrectWords] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    if (
      event.nativeEvent instanceof KeyboardEvent &&
      event.nativeEvent.key === "Enter"
    ) {
      if (currentSentenceIndex === sentences.length - 1) {
        setEndTime(Date.now());
        setShowStatistics(true);
      } else {
        setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        setUserInput("");
      }
    } else if (currentSentence.startsWith(value)) {
      if (value === currentSentence) {
        if (currentSentenceIndex === sentences.length - 1) {
          setEndTime(Date.now());
          setShowStatistics(true);
        } else {
          setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
          setUserInput("");
        }
      }
    } else {
      setIncorrectWords((prevIncorrectWords) => prevIncorrectWords + 1);
    }
  };

  const handleRefreshClick = () => {
    if (currentParagraphIndex === paragraphs.length - 1) {
      setParagraphs((prevParagraphs) => shuffleArray(prevParagraphs));
      setCurrentParagraphIndex(0);
    } else {
      setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
    }
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

      // Calculate accuracy
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

  // Helper function to calculate Levenshtein distance
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className={`ghostTextContainer ${mode}`}>
      <h2>START TYPING!</h2>
      <div className={`ghostText ${mode}-text`}>{currentSentence}</div>
      {showStatistics ? (
        <div className="statistics">
          <div>Typing Speed: {testResults?.speed.toFixed(0)} WPM</div>
          <div>Accuracy: {testResults?.accuracy.toFixed(2)}%</div>
          <button onClick={handleRefreshClick}>Refresh</button>
        </div>
      ) : (
        <button onClick={handleRefreshClick}>Refresh</button>
      )}
      <input
        type="text"
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        disabled={showStatistics}
      />
    </div>
  );
};

export default GhostText;
