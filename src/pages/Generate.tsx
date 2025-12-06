import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PRDCard } from "@/components/prd/PRDCard";
import { FeatureCard } from "@/components/prd/FeatureCard";
import { DataModelTable } from "@/components/prd/DataModelTable";
import { CodeBlock } from "@/components/prd/CodeBlock";
import { FlowDiagram } from "@/components/prd/FlowDiagram";
import { ExportButtons } from "@/components/prd/ExportButtons";
import {
  generateCursorPrompt,
  generateReplitSteps,
  generateMarkdown,
  type PRDData,
} from "@/lib/prdGenerator";
import { supabase } from "@/integrations/supabase/client";
import {
  Sparkles,
  FileText,
  Layers,
  Server,
  Database,
  GitBranch,
  CheckSquare,
  Code,
  Loader2,
  Target,
  Users,
  Monitor,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

export default function Generate() {
  const [idea, setIdea] = useState("");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prd, setPrd] = useState<PRDData | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      toast.error("Please enter your idea first!");
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-prd', {
        body: { idea, advancedMode }
      });

      if (error) {
        console.error('Error generating PRD:', error);
        toast.error(error.message || 'Failed to generate PRD');
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      if (data?.prd) {
        setPrd(data.prd);
        toast.success("PRD generated successfully!");
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Input Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold">Generate Your PRD</h1>
            <p className="text-muted-foreground">
              Describe your app idea and we'll create a structured,
              developer-ready document.
            </p>
          </div>

          <div className="card-elevated p-6">
            <Textarea
              placeholder="Describe your app idea here... For example: 'A task management app for remote teams with real-time collaboration, Kanban boards, and Slack integration.'"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-[150px] resize-none border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0"
            />

            <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  id="advanced-mode"
                  checked={advancedMode}
                  onCheckedChange={setAdvancedMode}
                />
                <Label htmlFor="advanced-mode" className="cursor-pointer text-sm">
                  Advanced Dev PRD
                </Label>
              </div>

              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary gap-2 rounded-full px-8"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate PRD
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.section>

        {/* PRD Output */}
        <AnimatePresence>
          {prd && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 space-y-8"
            >
              {/* Export Buttons */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-2xl font-bold">Your PRD</h2>
                <ExportButtons
                  prdData={prd}
                  cursorPrompt={generateCursorPrompt(prd)}
                  replitSteps={generateReplitSteps(prd)}
                  markdownContent={generateMarkdown(prd)}
                />
              </div>

              {/* 1. Project Summary */}
              <PRDCard
                title="Project Summary"
                icon={<FileText className="h-5 w-5" />}
                delay={0}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        What the user wants
                      </span>
                      <p className="mt-1 text-foreground">
                        {prd.projectSummary.whatUserWants}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Target Audience
                      </span>
                      <p className="mt-1 text-foreground">
                        {prd.projectSummary.targetAudience}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Target Platforms
                      </span>
                      <ul className="mt-1 space-y-1">
                        {prd.projectSummary.targetPlatforms.map((p) => (
                          <li key={p} className="text-foreground">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Expected Outcomes
                      </span>
                      <ul className="mt-1 space-y-1">
                        {prd.projectSummary.expectedOutcomes.map((o) => (
                          <li key={o} className="text-foreground">
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </PRDCard>

              {/* 2. Core Features */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Core Features</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {prd.coreFeatures.map((feature, idx) => (
                    <FeatureCard key={feature.title} {...feature} delay={idx * 0.1} />
                  ))}
                </div>
              </div>

              {/* 3. System Requirements */}
              <PRDCard
                title="System Requirements"
                icon={<Server className="h-5 w-5" />}
                delay={0.1}
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Tech Stack
                    </span>
                    <ul className="mt-2 space-y-1">
                      {prd.systemRequirements.techStack.map((t) => (
                        <li key={t} className="font-mono text-sm text-foreground">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Libraries
                    </span>
                    <ul className="mt-2 space-y-1">
                      {prd.systemRequirements.libraries.map((l) => (
                        <li key={l} className="font-mono text-sm text-foreground">
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Authentication
                      </span>
                      <p className="mt-1 text-foreground">
                        {prd.systemRequirements.authentication}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Database
                      </span>
                      <p className="mt-1 text-foreground">
                        {prd.systemRequirements.database}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Deployment
                      </span>
                      <p className="mt-1 text-foreground">
                        {prd.systemRequirements.deployment}
                      </p>
                    </div>
                  </div>
                </div>
              </PRDCard>

              {/* 4. Data Models */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Data Models</h3>
                </div>
                <DataModelTable entities={prd.dataModels} delay={0.2} />
              </div>

              {/* 5. User Flow */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">User Flow</h3>
                </div>
                <FlowDiagram steps={prd.userFlow} delay={0.3} />
              </div>

              {/* 6. MVP Scope */}
              <PRDCard
                title="MVP Scope (MoSCoW)"
                icon={<CheckSquare className="h-5 w-5" />}
                delay={0.4}
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Must Have
                    </span>
                    <ul className="space-y-2">
                      {prd.mvpScope.must.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">
                      Should Have
                    </span>
                    <ul className="space-y-2">
                      {prd.mvpScope.should.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="mb-3 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">
                      Could Have
                    </span>
                    <ul className="space-y-2">
                      {prd.mvpScope.could.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="mb-3 inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      Won't Have
                    </span>
                    <ul className="space-y-2">
                      {prd.mvpScope.wont.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </PRDCard>

              {/* 7. Developer Prompts */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Code className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Developer-Ready Prompts</h3>
                </div>
                <div className="space-y-6">
                  <CodeBlock
                    title="Cursor-Ready Build Prompt"
                    code={generateCursorPrompt(prd)}
                    delay={0.5}
                  />
                  <CodeBlock
                    title="Replit/Lovable Agent Build Instructions"
                    code={generateReplitSteps(prd)}
                    delay={0.6}
                  />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}