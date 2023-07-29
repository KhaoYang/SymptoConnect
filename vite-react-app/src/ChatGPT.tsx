import React from "react";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

export const ChatGPT: React.FC = () => {
  const [prompt, setPrompt] = React.useState<string | undefined>("");
  const [response, setResponse] = React.useState<string | undefined>("");
  const configuration = new Configuration({
    apiKey: "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",
  });
  const myOpenAi = new OpenAIApi(configuration);
  const chatGptMessages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: !!prompt ? prompt : "Hello",
    },
  ];
  const getOpenAIResponse = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const res = await myOpenAi.createChatCompletion({
      messages: chatGptMessages,
      model: "gpt-3.5-turbo",
    });
    setResponse(res.data.choices[0].message?.content);
  };
  return (
    <>
      <form onSubmit={getOpenAIResponse}>
        <input
          title="test"
          id="chat-input"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/* If there's no response then don't show the element */}
      {!!response && <div>{response}</div>}
    </>
  );
};
