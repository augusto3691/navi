import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import useGeneralStore from "@/stores/generalStore";

const Technical: React.FC = () => {
  const [aiReturn, setAiReturn] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { triggerFlash } = useGeneralStore();

  const processText = async (value: string) => {
    try {
      const {
        data: { text },
      } = await axios.post(`http://localhost:3000/technical`, {
        message: value,
      });

      //@ts-ignore
      window.electronAPI.copyToClipboard(text);

      setAiReturn(text);
    } catch (err) {
      setError("Erro ao processar a mensagem");
    } finally {
      setLoading(false);
      triggerFlash();
    }
  };

  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setLoading(true);
        const value = textRef.current?.value || "";
        processText(value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Textarea
        ref={textRef}
        autoFocus
        placeholder="O que você quer deixar mais empatico?"
        className="w-full h-40 resize-none"
      />

      <p className="text-sm text-gray-500 mt-5">
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          error || aiReturn
        )}
      </p>
    </div>
  );
};

export default Technical;
