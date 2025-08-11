import { useState } from "react";
import { agentData, performanceData } from "./agentData";
import agentTabMapping from "./agentTabMapping";
import { Users, TrendingUp, AlertTriangle, CheckSquare, Clock, Zap, BarChart3, GitBranch } from "lucide-react";
import MyAssignedTasks from "./MyAssignedTasks";
import { MetricData } from "../../utils/metricData";
import AgentTabs from "./AgentTabs";
import AgentCard from "./AgentCard";
import AgentPerformanceCard from "./AgentPerformanceCard";
import TaskOverview from "./TaskOverview";
import ExceptionsCard from "./ExceptionsCard";
import NavigationTabs from "../cards/NavigationTabs";
import {
  AIAGENTSNAVTABS,
  LIFECYCLEMANAGEMENT,
  projectLifecycleData,
  tasks,
} from "../../utils/data";
import MetricCardList from "../UI/MetricCardList";
import AgentEcosystem from "../cards/AgentEcosystem";
import AutonomousAssisted from "../cards/AutonomousAssisted";
import ProjectDetailedCard from "../cards/ProjectDetailedCard";

const getInitialTab = (section) => {
  if (section === "agent-tasks" || section === "agent-exception") {
    return "lifecycle";
  }
  return "agents";
};

function AgentControl({ activeSection }) {
  const [activeTab, setActiveTab] = useState(() =>
    getInitialTab(activeSection)
  );
  const [activeAgentTab, setActiveAgentTab] = useState("all");
  // Filter agents based on active tab
  const getFilteredAgents = () => {
    if (!activeAgentTab || activeAgentTab === "all") return agentData;

    const mappedAgents = agentTabMapping[activeAgentTab] || [];

    return agentData.filter((agent) => mappedAgents.includes(agent.name));
  };

  const filteredAgents = getFilteredAgents();

  const handleSectionTabChange = (section) => {
    switch (section) {
      case "agent-tasks":
      case "agent-exception":
        return (
          <>
            <AutonomousAssisted />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={LIFECYCLEMANAGEMENT}
            />
          </>
        );
      case "agent-control":
        return (
          <>
            <AgentEcosystem />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={AIAGENTSNAVTABS}
            />
          </>
        );
      default:
        return (
          <>
            <AgentEcosystem />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={AIAGENTSNAVTABS}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Alert Notifications */}
      <div className="px-6 pt-4 flex gap-4">
        <div className="relative bg-white border border-gray-300 rounded-full flex items-center cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
          <div className="bg-red-500 px-4 py-3 rounded-l-full">
            <div className="w-6 h-6"></div>
          </div>
          <div className="px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-sm">Critical Issue</span>
              <span className="text-gray-600 text-xs">Immediate attention required</span>
            </div>
            <span className="text-red-500 font-bold text-xl mx-2">1</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="relative bg-white border border-gray-300 rounded-full flex items-center cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
          <div className="bg-orange-500 px-4 py-3 rounded-l-full">
            <div className="w-6 h-6"></div>
          </div>
          <div className="px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-sm">Pending tasks</span>
              <span className="text-gray-600 text-xs">Immediate attention required</span>
            </div>
            <span className="text-orange-500 font-bold text-xl mx-2">2</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className=" px-6 mt-4">
        <div className="bg-custom-gradient rounded-3xl p-1" style={{ color:"white"}}>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("agents")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "agents"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => setActiveTab("orchestrator")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "orchestrator"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Orchestrator
            </button>
            <button
              onClick={() => setActiveTab("lifecycle")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "lifecycle"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Lifecycle Management
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "performance"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "tasks"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Tasks & Workflows
            </button>
            <button
              onClick={() => setActiveTab("exceptions")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "exceptions"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Exceptions
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "agents" && (
          <div className="space-y-6">
            {/* Agent Control Header */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Agent Control</h2>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Sub-navigation Pills */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveAgentTab("all")}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeAgentTab === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Agents (12)
              </button>
              <button
                onClick={() => setActiveAgentTab("orchestration")}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeAgentTab === "orchestration"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <GitBranch className="w-4 h-4" />
                Orchestration (1)
              </button>
              <button
                onClick={() => setActiveAgentTab("core")}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeAgentTab === "core"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Zap className="w-4 h-4" />
                Core Testing (5)
              </button>
              <button
                onClick={() => setActiveAgentTab("integration")}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeAgentTab === "integration"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <GitBranch className="w-4 h-4" />
                Integration (1)
              </button>
              <button
                onClick={() => setActiveAgentTab("analysis")}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeAgentTab === "analysis"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analysis (4)
              </button>
            </div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "lifecycle" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Lifecycle Management</h2>
            {projectLifecycleData.map((data) => (
              <ProjectDetailedCard key={data.title} projectData={data} />
            ))}
          </div>
        )}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Agent Performance Overview</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceData.map((agent, index) => (
                  <AgentPerformanceCard key={index} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orchestrator" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Orchestrator</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600">Orchestrator configuration and management</p>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Tasks & Workflows</h2>
            <TaskOverview tasks={tasks} />
          </div>
        )}

        {activeTab === "exceptions" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Exceptions</h2>
            <ExceptionsCard />
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentControl;
