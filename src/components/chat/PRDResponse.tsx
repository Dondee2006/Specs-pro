import { PRDCard } from "@/components/prd/PRDCard";
import { FeatureCard } from "@/components/prd/FeatureCard";
import { DataModelTable } from "@/components/prd/DataModelTable";
import { CodeBlock } from "@/components/prd/CodeBlock";
import { FlowDiagram } from "@/components/prd/FlowDiagram";
import { ExportButtons } from "@/components/prd/ExportButtons";
import { SavePRDButton } from "@/components/prd/SavePRDButton";
import {
  generateCursorPrompt,
  generateReplitSteps,
  generateMarkdown,
  type PRDData,
} from "@/lib/prdGenerator";
import {
  FileText,
  Layers,
  Server,
  Database,
  GitBranch,
  CheckSquare,
  Code,
  Target,
  Users,
  Monitor,
  TrendingUp,
} from "lucide-react";

interface PRDResponseProps {
  prd: PRDData;
  userInput?: string;
}

export function PRDResponse({ prd, userInput = "" }: PRDResponseProps) {
  return (
    <div className="space-y-6">
      {/* Export & Save Buttons */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Your PRD is ready
        </span>
        <div className="flex items-center gap-2">
          <SavePRDButton
            prd={prd}
            userInput={userInput}
            defaultTitle={prd.projectSummary.whatUserWants.slice(0, 50)}
          />
          <ExportButtons
            prdData={prd}
            cursorPrompt={generateCursorPrompt(prd)}
            replitSteps={generateReplitSteps(prd)}
            markdownContent={generateMarkdown(prd)}
          />
        </div>
      </div>

      {/* 1. Project Summary */}
      <PRDCard
        title="Project Summary"
        icon={<FileText className="h-5 w-5" />}
        delay={0}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                What the user wants
              </span>
              <p className="mt-1 text-sm text-foreground">
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
              <p className="mt-1 text-sm text-foreground">
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
                  <li key={p} className="text-sm text-foreground">
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
                  <li key={o} className="text-sm text-foreground">
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
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">Core Features</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {prd.coreFeatures.map((feature, idx) => (
            <FeatureCard key={feature.title} {...feature} delay={idx * 0.05} />
          ))}
        </div>
      </div>

      {/* 3. System Requirements */}
      <PRDCard
        title="System Requirements"
        icon={<Server className="h-5 w-5" />}
        delay={0.1}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Tech Stack
            </span>
            <ul className="mt-2 space-y-1">
              {prd.systemRequirements.techStack.map((t) => (
                <li key={t} className="font-mono text-xs text-foreground">
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
                <li key={l} className="font-mono text-xs text-foreground">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Authentication
              </span>
              <p className="mt-1 text-sm text-foreground">
                {prd.systemRequirements.authentication}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Database
              </span>
              <p className="mt-1 text-sm text-foreground">
                {prd.systemRequirements.database}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Deployment
              </span>
              <p className="mt-1 text-sm text-foreground">
                {prd.systemRequirements.deployment}
              </p>
            </div>
          </div>
        </div>
      </PRDCard>

      {/* 4. Data Models */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Database className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">Data Models</h3>
        </div>
        <DataModelTable entities={prd.dataModels} delay={0.2} />
      </div>

      {/* 5. User Flow */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GitBranch className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">User Flow</h3>
        </div>
        <FlowDiagram steps={prd.userFlow} delay={0.3} />
      </div>

      {/* 6. MVP Scope */}
      <PRDCard
        title="MVP Scope (MoSCoW)"
        icon={<CheckSquare className="h-5 w-5" />}
        delay={0.4}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Must Have
            </span>
            <ul className="space-y-1.5">
              {prd.mvpScope.must.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="mb-2 inline-block rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
              Should Have
            </span>
            <ul className="space-y-1.5">
              {prd.mvpScope.should.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="mb-2 inline-block rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              Could Have
            </span>
            <ul className="space-y-1.5">
              {prd.mvpScope.could.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="mb-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              Won't Have
            </span>
            <ul className="space-y-1.5">
              {prd.mvpScope.wont.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PRDCard>

      {/* 7. Developer Prompts */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Code className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">Developer-Ready Prompts</h3>
        </div>
        <div className="space-y-4">
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
    </div>
  );
}
