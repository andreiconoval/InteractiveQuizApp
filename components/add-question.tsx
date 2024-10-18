import { useEffect, useState } from "react";
import { Question, Response } from "@/types";
import { Input, Button, Textarea, Card, CardBody } from "@nextui-org/react";

interface AddQuestionFormProps {
  onSubmit: (question: Question) => Promise<void>;
}

export default function AddQuestionForm({ onSubmit }: AddQuestionFormProps) {
  const [questionText, setQuestionText] = useState("");
  const [responses, setResponses] = useState<Response[]>([{ id: 1, text: "" }]);
  const [correctResponseId, setCorrectResponseId] = useState(1);

  // Handle the form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newQuestion = {
      id: Date.now(),
      text: questionText,
      responses: responses.filter((response) => response.text),
      correctResponseId: correctResponseId,
    };

    await onSubmit(newQuestion);
  };

  const addResponseField = () => {
    setResponses([...responses, { id: responses.length + 1, text: "" }]);
  };

  const deleteResponseField = (id: number) => {
    if (id == correctResponseId)
      setCorrectResponseId(responses.find((r) => r.id != id)?.id ?? 0);
    setResponses([...responses.filter((r) => r.id != id)]);
  };
  const handleResponseChange = (id: number, value: string) => {
    setResponses(
      responses.map((response) =>
        response.id === id ? { ...response, text: value } : response
      )
    );
  };

  return (
    <Card className="w-100 pa-4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Question Text"
              placeholder="Enter the question"
              fullWidth
              variant="bordered"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
            <div className="grid grid-cols-1 gap-4">
              {responses.map((response, index) => (
                <div className="flex flex-row items-center gap-2" key={index}>
                  <Textarea
                    variant="bordered"
                    placeholder={`Response ${index + 1}`}
                    label={`Response ${index + 1}`}
                    fullWidth
                    maxRows={2}
                    value={response.text}
                    onChange={(e) =>
                      handleResponseChange(response.id, e.target.value)
                    }
                    required
                  />
                  {responses.length > 2 && (
                    <Button
                      color="danger"
                      onClick={() => deleteResponseField(response.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {responses.length < 10 && (
              <Button color="primary" onClick={addResponseField}>
                Add Response
              </Button>
            )}
            <Input
              variant="bordered"
              type="number"
              label="Correct Response ID"
              min={1}
              max={responses.length}
              fullWidth
              value={`${correctResponseId}`}
              onChange={(e) => setCorrectResponseId(Number(e.target.value))}
              required
            />

            <Button color="success" type="submit">
              Add Question
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
