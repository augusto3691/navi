import { useRef } from "react";
import { Languages, Sparkles } from "lucide-react";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Textarea } from "./components/ui/textarea";
import Translate from "./components/tabs/Translate";

function App() {
  
  const aiRef = useRef<HTMLTextAreaElement>(null);

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
              <Translate />
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
