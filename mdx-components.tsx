import React from 'react';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { ArchitectureDiagram } from '@/components/courses/ArchitectureDiagram';
import { TokenSimulator } from '@/components/interactive/TokenSimulator';
import { TemperatureSimulator } from '@/components/interactive/TemperatureSimulator';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { ZodInspector } from '@/components/interactive/ZodInspector';
import { ToolLoopSimulator } from '@/components/interactive/ToolLoopSimulator';
import { StreamingSimulator } from '@/components/interactive/StreamingSimulator';
import { GenerativeUISimulator } from '@/components/interactive/GenerativeUISimulator';
import { BackendRequestSimulator } from '@/components/interactive/BackendRequestSimulator';
import { RAGPipelineSimulator } from '@/components/interactive/RAGPipelineSimulator';
import { WorkflowSimulator } from '@/components/interactive/WorkflowSimulator';
import { AgentGraphSimulator } from '@/components/interactive/AgentGraphSimulator';
import { SecurityAuditSimulator } from '@/components/interactive/SecurityAuditSimulator';
import { PlatformArchitectureSimulator } from '@/components/interactive/PlatformArchitectureSimulator';
import { ConversationContextSimulator } from '@/components/interactive/ConversationContextSimulator';
import { MultimodalVisionSimulator } from '@/components/interactive/MultimodalVisionSimulator';
import { StreamVsBatchSimulator } from '@/components/interactive/StreamVsBatchSimulator';
import { VectorSimilaritySimulator } from '@/components/interactive/VectorSimilaritySimulator';
import { LangGraphInteractiveLab } from '@/components/interactive/LangGraphInteractiveLab';
import { LLMJudgeEvaluatorSimulator } from '@/components/interactive/LLMJudgeEvaluatorSimulator';
import { FrontendStateMachineSimulator } from '@/components/interactive/FrontendStateMachineSimulator';
import { MarkdownSanitizerLab } from '@/components/interactive/MarkdownSanitizerLab';
import { DebounceAbortLab } from '@/components/interactive/DebounceAbortLab';
import { EnvZodFailFastSimulator } from '@/components/interactive/EnvZodFailFastSimulator';
import { MySQLPoolIsolationSimulator } from '@/components/interactive/MySQLPoolIsolationSimulator';
import { RateLimiterSpamSimulator } from '@/components/interactive/RateLimiterSpamSimulator';
import { TimeoutCircuitSimulator } from '@/components/interactive/TimeoutCircuitSimulator';
import { ChunkingVisualizerLab } from '@/components/interactive/ChunkingVisualizerLab';
import { HybridSearchSimulator } from '@/components/interactive/HybridSearchSimulator';
import { DoubleStorageSyncLab } from '@/components/interactive/DoubleStorageSyncLab';
import { WebhookPayloadInspectorLab } from '@/components/interactive/WebhookPayloadInspectorLab';
import { GeminiClassifierWorkflowLab } from '@/components/interactive/GeminiClassifierWorkflowLab';
import { HumanInTheLoopLab } from '@/components/interactive/HumanInTheLoopLab';
import { FunctionCallingProtocolLab } from '@/components/interactive/FunctionCallingProtocolLab';
import { MultiAgentSupervisorSimulator } from '@/components/interactive/MultiAgentSupervisorSimulator';
import { CyclicEvaluatorLab } from '@/components/interactive/CyclicEvaluatorLab';
import { PromptInjectionDefenseLab } from '@/components/interactive/PromptInjectionDefenseLab';
import { HallucinationDetectorLab } from '@/components/interactive/HallucinationDetectorLab';
import { SemanticCacheSimulator } from '@/components/interactive/SemanticCacheSimulator';
import { EndToEndPlatformSimulator } from '@/components/interactive/EndToEndPlatformSimulator';
import { RBACPermissionMatrixLab } from '@/components/interactive/RBACPermissionMatrixLab';

interface CodeElementProps {
  className?: string;
  children?: React.ReactNode;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Interactive & Layout course custom components
    CodeBlock,
    Callout,
    PracticalWork,
    ArchitectureDiagram,
    TokenSimulator,
    TemperatureSimulator,
    QuickQuiz,
    ZodInspector,
    ToolLoopSimulator,
    StreamingSimulator,
    GenerativeUISimulator,
    BackendRequestSimulator,
    RAGPipelineSimulator,
    WorkflowSimulator,
    AgentGraphSimulator,
    SecurityAuditSimulator,
    PlatformArchitectureSimulator,
    ConversationContextSimulator,
    MultimodalVisionSimulator,
    StreamVsBatchSimulator,
    VectorSimilaritySimulator,
    LangGraphInteractiveLab,
    LLMJudgeEvaluatorSimulator,
    FrontendStateMachineSimulator,
    MarkdownSanitizerLab,
    DebounceAbortLab,
    EnvZodFailFastSimulator,
    MySQLPoolIsolationSimulator,
    RateLimiterSpamSimulator,
    TimeoutCircuitSimulator,
    ChunkingVisualizerLab,
    HybridSearchSimulator,
    DoubleStorageSyncLab,
    WebhookPayloadInspectorLab,
    GeminiClassifierWorkflowLab,
    HumanInTheLoopLab,
    FunctionCallingProtocolLab,
    MultiAgentSupervisorSimulator,
    CyclicEvaluatorLab,
    PromptInjectionDefenseLab,
    HallucinationDetectorLab,
    SemanticCacheSimulator,
    EndToEndPlatformSimulator,
    RBACPermissionMatrixLab,

    h1: ({ children, ...props }) => (
      <div className="rounded-3xl border-2 border-blue-200 bg-blue-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>AI Engineering</span>
        </div>
        <h1
          {...props}
          className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight"
        >
          {children}
        </h1>
      </div>
    ),

    h2: ({ children, ...props }) => (
      <h2
        {...props}
        className="text-[19px] font-bold text-slate-900 mt-8 mb-3.5 pt-3 border-t border-slate-100 first:mt-0 first-of-type:mt-0 first:pt-0 first-of-type:pt-0 first:border-t-0 first-of-type:border-t-0 flex items-center gap-2.5"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm ring-1 ring-indigo-200">
          §
        </span>
        <span>{children}</span>
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3
        {...props}
        className="text-[19px] font-bold text-slate-900 mt-6 mb-2.5 first:mt-0 first-of-type:mt-0 flex items-center gap-2 pl-3 border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50/70 via-indigo-50/20 to-transparent py-2 rounded-r-lg"
      >
        <span className="text-slate-900 font-bold">{children}</span>
      </h3>
    ),

    h4: ({ children, ...props }) => (
      <h4
        {...props}
        className="text-sm sm:text-base font-bold uppercase tracking-wider text-cyan-800 mt-6 mb-2 first:mt-0 first-of-type:mt-0 flex items-center gap-2"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-sm shadow-cyan-300" />
        <span>{children}</span>
      </h4>
    ),

    h5: ({ children, ...props }) => (
      <h5
        {...props}
        className="text-sm font-bold uppercase tracking-wider text-slate-600 mt-4 mb-1"
      >
        {children}
      </h5>
    ),

    // Paragraph typography with comfortable reading size
    p: ({ children, ...props }) => (
      <p {...props} className="my-3 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
        {children}
      </p>
    ),

    // Stylized bold text with special colored badges for labels
    strong: ({ children, ...props }) => {
      const text = typeof children === 'string' ? children.trim() : '';
      const isSpecialLabel =
        /^(exemple|attention|remarque|note|important|pourquoi|définition|objectif|résultat|astuce|cas\s+d'usage|synthèse)/i.test(text);

      if (isSpecialLabel) {
        return (
          <strong
            {...props}
            className="inline-flex items-center gap-1 font-bold text-indigo-900 bg-indigo-50/90 px-2.5 py-0.5 rounded-md border border-indigo-200/80 mr-1 shadow-xs text-sm"
          >
            {children}
          </strong>
        );
      }

      return (
        <strong {...props} className="font-extrabold text-slate-950 bg-amber-100/50 px-1 py-0.5 rounded text-inherit">
          {children}
        </strong>
      );
    },

    b: ({ children, ...props }) => (
      <strong {...props} className="font-extrabold text-slate-950 bg-amber-100/50 px-1 py-0.5 rounded text-inherit">
        {children}
      </strong>
    ),

    // Lists with custom colored bullets
    ul: ({ children, ...props }) => (
      <ul {...props} className="my-4 space-y-2.5 pl-1">
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol
        {...props}
        className="my-4 space-y-2.5 list-decimal list-inside pl-2 text-base text-slate-700 leading-relaxed marker:font-bold marker:text-indigo-600"
      >
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => (
      <li {...props} className="flex items-start gap-3 text-base sm:text-lg text-slate-700 leading-relaxed">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500 ring-4 ring-indigo-50" />
        <span className="flex-1">{children}</span>
      </li>
    ),

    // Blockquote with Cyan theme accent
    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        className="my-6 rounded-2xl border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-50/70 via-indigo-50/30 to-white p-5 shadow-xs"
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl text-cyan-600 font-serif leading-none select-none">“</span>
          <div className="text-base italic text-slate-700 leading-relaxed space-y-1">
            {children}
          </div>
        </div>
      </blockquote>
    ),

    // Inline code styling
    code: ({ children, className, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
      if (className?.includes('language-')) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          {...props}
          className="rounded-md border border-indigo-200/70 bg-indigo-50/80 px-1.5 py-0.5 font-mono text-sm sm:text-base font-semibold text-indigo-700 shadow-xs"
        >
          {children}
        </code>
      );
    },

    // Code blocks automatic interception
    pre: (props: React.ComponentPropsWithoutRef<'pre'>) => {
      const codeChild = props.children;
      if (codeChild && React.isValidElement<CodeElementProps>(codeChild)) {
        const className = codeChild.props.className || '';
        const match = /language-(\w+)/.exec(className);
        const language = match ? match[1] : 'typescript';
        const codeContent = codeChild.props.children;
        return <CodeBlock language={language}>{codeContent}</CodeBlock>;
      }
      return <CodeBlock>{props.children}</CodeBlock>;
    },

    // Decorative tri-color divider
    hr: () => (
      <div className="my-10 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        <span className="h-2 w-2 rounded-full bg-indigo-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
      </div>
    ),

    // Tables styling with subtle gradient header
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table {...props} className="w-full border-collapse text-left text-sm sm:text-base">
          {children}
        </table>
      </div>
    ),

    thead: ({ children, ...props }) => (
      <thead
        {...props}
        className="bg-gradient-to-r from-indigo-50 via-slate-50 to-cyan-50 border-b border-slate-200 text-sm uppercase font-bold text-slate-700 tracking-wider"
      >
        {children}
      </thead>
    ),

    th: ({ children, ...props }) => (
      <th {...props} className="px-4 py-3.5 font-bold text-slate-900 border-r border-slate-200/60 last:border-r-0">
        {children}
      </th>
    ),

    tr: ({ children, ...props }) => (
      <tr
        {...props}
        className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors odd:bg-white even:bg-slate-50/30"
      >
        {children}
      </tr>
    ),

    td: ({ children, ...props }) => (
      <td {...props} className="px-4 py-3.5 text-slate-700 border-r border-slate-100 last:border-r-0 leading-relaxed">
        {children}
      </td>
    ),

    ...components,
  };
}
