import { Flash } from "./components/Flash";
import Empathical from "./components/tabs/Empathical";
import Technical from "./components/tabs/Technical";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-neutral-800 h-screen w-screen rounded-lg border-1 border-neutral-700">
        <div className="p-4 h-full w-full overflow-y-auto scroll-container">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Navi Companion</h1>
            <Flash />
          </div>

          <Separator className="mb-3" />
          <Tabs defaultValue="empathic" className="w-full">
            <TabsList>
              <TabsTrigger value="empathic">Empathic</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
            <TabsContent value="empathic">
              <Empathical />
            </TabsContent>
            <TabsContent value="technical">
              <Technical />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
