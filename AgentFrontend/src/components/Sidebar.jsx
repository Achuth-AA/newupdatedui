/**
 * Sidebar Navigation Component
 *
 * Provides the main navigation interface for the application.
 * Contains user profile, project status, navigation items, and system status.
 *
 * Features:
 * - User profile with team member dropdown
 * - Current project status and progress
 * - Navigation buttons for different sections
 * - AI briefing with system status and real-time token consumption
 * - Real-time status indicators
 *
 * @param {Object} props - Component properties
 * @param {string} props.activeSection - Currently active section ID
 * @param {function} props.setActiveSection - Function to change active section
 */

import {
  FolderOpen,
  Settings,
  MessageSquare,
} from "lucide-react";
import { getUserName, getUserRole } from "../utils/localStorage";

function Sidebar({ activeSection, setActiveSection}) {

  return (
    // Main sidebar container with backdrop blur and proper scrolling
    <div className="w-72 bg-[#1e40af] flex flex-col h-full overflow-y-auto p-4 space-y-4">
      {/* User Profile Section - Updated with blue theme */}
      <div className="bg-[#2563eb] rounded-xl p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center text-sm font-medium text-white">
            {getUserName()
              .split(" ")
              .map((name) => name.charAt(0))
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-white">{getUserName()}</h3>
            <p className="text-sm text-blue-100">
              {getUserRole()?.replace("Gen-Ai-", "")?.replace("Gen-AI-", "")}
            </p>
          </div>
        </div>
      </div>

      {/* Current Project Card - Matching sidebar1.png */}
      <div className="bg-[#2563eb] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-100 uppercase tracking-wider">
            CURRENT PROJECT
          </span>
          <span className="flex items-center gap-1">
            <span className="text-xs text-white">Active</span>
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          </span>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FFFFFF1A] rounded-lg flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-medium">
            SCB 
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-[#1e40af] rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-300"
              style={{ width: "15%" }}
            ></div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-blue-100">Test Progress:</span>
            <span className="text-white font-medium">15%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-100">Your Tests:</span>
            <span className="text-white font-medium">6/45 Complete</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-100">Environment:</span>
            <span className="text-white font-medium">Staging</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-100">Sprint Version:</span>
            <span className="text-white font-medium">12th Sprint</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-100">Sprint End:</span>
            <span className="text-white font-medium">9 days left</span>
          </div>
        </div>
      </div>

      {/* AI Assistant Button - Matching sidebar1.png */}
      <button
        onClick={() => setActiveSection("ai-assistant")}
        className={`w-full text-left transition-all duration-200 rounded-xl p-4 ${
          activeSection === "ai-assistant"
            ? "bg-white text-blue-600 shadow-lg"
            : "bg-[#2563eb] text-white hover:bg-[#3b82f6]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            activeSection === "ai-assistant"
              ? "bg-blue-100"
              : "bg-[#FFFFFF1A]"
          }`}>
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">AI Assistant</p>
            <p className={`text-[11px] ${
              activeSection === "ai-assistant"
                ? "text-blue-500"
                : "text-blue-100"
            }`}>
              Chat with your AI testing Assistant
            </p>
          </div>
        </div>
      </button>

      {/* Agent Control Button - Matching sidebar1.png */}
      <button
        onClick={() => setActiveSection("agent-control")}
        className={`w-full text-left transition-all duration-200 rounded-xl p-4 ${
          activeSection === "agent-control"
            ? "bg-white text-blue-600 shadow-lg"
            : "bg-[#2563eb] text-white hover:bg-[#3b82f6]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            activeSection === "agent-control"
              ? "bg-blue-100"
              : "bg-[#FFFFFF1A]"
          }`}>
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Agent Control</p>
            <p className={`text-xs ${
              activeSection === "agent-control"
                ? "text-blue-500"
                : "text-blue-100"
            }`}>
              Monitor your assigned agents
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default Sidebar;
