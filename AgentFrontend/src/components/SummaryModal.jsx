// SummaryModal.jsx
import { X, TrendingUp, Clock, Zap, Calendar, FileText, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

function SummaryModal({ onClose, agent }) {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Helper function to get database agent name (same as in AgentCard)
  const getDbAgentName = (displayName) => {
    const agentNameMapping = {
      "Jira Management Agent": "jira_mcp_agent",
      "Test Case Generator Agent": "test_case_generator_agent",
      "Test Data Agent": "test_data_root_agent",
      "Test Script Generator Agent": "test_script_root_agent",
      "Environment Readiness Agent": "env_readiness_agent",
      "Test Execution and DevOps Agent": "jenkins_automation_agent",
      "Test Reporting Agent": "Test_Report_generation_agent",
      "Test Failure Analysis Agent": "Test_Failure_Analysis_agent",
      "Self Healing Agent": "self_healing_root_agent",
      "Orchestration Agent": "orchestrator_agent",
    };
    
    return (
      agentNameMapping[displayName] ||
      displayName.toLowerCase().replace(/\s+/g, "_")
    );
  };

  // Fetch summary data using the same API as AgentCard
  useEffect(() => {
    const fetchSummaryData = async () => {
      const dbName = getDbAgentName(agent.name);
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/tokens/agent/${dbName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSummaryData(data);
      } catch (err) {
        console.error("Error fetching summary data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (agent?.name) {
      fetchSummaryData();
    }
  }, [agent]);

  // Helper functions for formatting
  const formatTokens = (tokens) => {
    if (!tokens) return "0";
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    }
    if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  const formatExecutionTime = (seconds) => {
    if (!seconds) return "0 min";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.round((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.round(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${agent.iconBgColor} rounded-lg flex items-center justify-center`}>
              <agent.icon className={`w-5 h-5 ${agent.iconColor}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {agent.name} Summary
              </h2>
              <p className="text-sm text-gray-500">Performance Overview & Execution Summary</p>
            </div>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            <span className="ml-3 text-gray-600">Loading summary...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">Error loading summary</div>
            <div className="text-gray-500 text-sm">{error}</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">Total Tokens</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {formatTokens(summaryData?.tokensConsumed)}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">Execution Time</span>
                </div>
                <div className="text-2xl font-bold text-green-800">
                  {formatExecutionTime(summaryData?.executionTime)}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700">Tokens/Sec</span>
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {summaryData?.tokensPerSecond || 0}
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700">Last Updated</span>
                </div>
                <div className="text-sm font-bold text-orange-800">
                  {formatTimeAgo(summaryData?.lastUpdated || summaryData?.lastEndTime)}
                </div>
              </div>
            </div>

            {/* Final Summary Section */}
            {summaryData?.finalSummary && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Execution Summary</h3>
                    {summaryData?.summaryLength && (
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                        {summaryData.summaryLength} chars
                      </span>
                    )}
                  </div>
                  {summaryData.finalSummary.length > 200 && (
                    <button
                      onClick={() => setShowFullSummary(!showFullSummary)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      {showFullSummary ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
                
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {showFullSummary 
                      ? summaryData.finalSummary 
                      : truncateText(summaryData.finalSummary, 200)
                    }
                  </div>
                </div>

                {/* Summary metadata */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Summary Length:</span>
                      <span className="ml-2 font-medium text-gray-700">
                        {summaryData?.summaryLength || 0} characters
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Execution:</span>
                      <span className="ml-2 font-medium text-gray-700">
                        {summaryData?.lastEndTime 
                          ? new Date(summaryData.lastEndTime).toLocaleString()
                          : "Unknown"
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Execution Timeline */}
            {summaryData?.lastStartTime && summaryData?.lastEndTime && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Last Execution Timeline</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Start Time:</span>
                      <span className="text-sm font-medium text-blue-800">
                        {new Date(summaryData.lastStartTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">End Time:</span>
                      <span className="text-sm font-medium text-blue-800">
                        {new Date(summaryData.lastEndTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                      <span className="text-sm text-blue-700">Duration:</span>
                      <span className="text-sm font-bold text-blue-900">
                        {formatExecutionTime(summaryData?.executionTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional computed stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Statistics</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estimated Word Count:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {summaryData?.summaryLength ? Math.round(summaryData.summaryLength / 5) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Data Freshness:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {summaryData?.lastUpdated ? 
                        `${Math.round((new Date() - new Date(summaryData.lastUpdated)) / (1000 * 60 * 60))}h ago` : 
                        "Unknown"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryModal;
