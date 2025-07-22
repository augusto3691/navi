import { useRef } from "react";
import { Languages, Sparkles } from "lucide-react";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Textarea } from "./components/ui/textarea";

function App() {
  const translatorRef = useRef<HTMLTextAreaElement>(null);
  const aiRef = useRef<HTMLTextAreaElement>(null);

  // Optionally, you can focus the textarea when the tab is selected.
  // For simplicity, here's how to set autofocus on mount for the first tab:
  // If you want to autofocus when switching tabs, you can use state and effects.

  if (translatorRef.current) {
    translatorRef.current.focus();
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-neutral-800 h-screen w-screen rounded-lg border-1 border-neutral-700">
        <div className="p-4 h-full w-full overflow-y-auto scroll-container">
          <h1 className="text-xl font-bold text-white mb-3">Navi Companion</h1>
          <Separator className="mb-3" />
          <Tabs defaultValue="translator" className="w-full">
            <TabsList>
              <TabsTrigger value="translator">
                <Languages /> Tradutor
              </TabsTrigger>
              <TabsTrigger value="ai">
                <Sparkles /> AI
              </TabsTrigger>
            </TabsList>
            <TabsContent value="translator">
              <Textarea
                ref={translatorRef}
                autoFocus
                placeholder="Qual a sua dúvida na tradução?"
                className="w-full h-40 resize-none"
              />
            </TabsContent>
            <TabsContent value="ai">
              <Textarea
                ref={aiRef}
                placeholder="O que você quer deixar mais claro?"
                className="w-full h-40 resize-none"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
