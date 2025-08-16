import { useState, useEffect } from "react";
import { X, Search, ChevronDown, Filter, MessageSquare, HelpCircle, Check, Flag } from "lucide-react";

function AgentOutput({ onClose, agent }) {
  const { name } = agent;
  const [activeTab, setActiveTab] = useState("output");
  const [feedbackOption, setFeedbackOption] = useState("approve");
  const [comments, setComments] = useState("");
  const [selectedSprint, setSelectedSprint] = useState("1");
  const [selectedFeature, setSelectedFeature] = useState("User Registration");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("All items");
  const [isVisible, setIsVisible] = useState(false);
  const [expandedTestCase, setExpandedTestCase] = useState(null);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  // Sample test case data
  const testCases = [
    {
      id: "TC001",
      title: "Valid user registration with all required fields",
      complexity: "Medium complexity",
      duration: "15 mins",
      status: "pending review",
      statusColor: "orange",
      description: "Verify that a user can successfully register with valid email, password, and personal information",
      tags: ["registration", "happy path", "critical"],
      preconditions: "User is on registration page",
      dependencies: "None",
      testSteps: [
        "Enter valid email address",
        "Enter strong password",
        "Confirm password",
        "Fill personal information",
        "Click Register button"
      ],
      expectedResult: "User account created successfully, confirmation email sent"
    },
    {
      id: "TC002",
      title: "Registration with invalid email format",
      complexity: "Low complexity",
      duration: "10 mins",
      status: "approved",
      statusColor: "blue",
      description: "Verify system handles invalid email format during registration",
      tags: ["registration", "validation", "negative"],
      preconditions: "User is on registration page",
      dependencies: "None",
      testSteps: [
        "Enter invalid email format",
        "Fill other required fields",
        "Click Register button"
      ],
      expectedResult: "Error message displayed for invalid email format"
    },
    {
      id: "TC003",
      title: "Registration with invalid email format",
      complexity: "Low complexity",
      duration: "10 mins",
      status: "needs revision",
      statusColor: "red",
      description: "Verify password strength validation during registration",
      tags: ["registration", "security", "validation"],
      preconditions: "User is on registration page",
      dependencies: "None",
      testSteps: [
        "Enter valid email",
        "Enter weak password",
        "Fill other fields",
        "Click Register button"
      ],
      expectedResult: "Password strength error displayed"
    },
    {
      id: "TC004",
      title: "Registration with invalid email format",
      complexity: "Low complexity",
      duration: "10 mins",
      status: "pending approval",
      statusColor: "orange",
      description: "Verify duplicate email validation during registration",
      tags: ["registration", "validation", "edge case"],
      preconditions: "User with test email already exists",
      dependencies: "Existing user account",
      testSteps: [
        "Enter existing email address",
        "Fill other required fields",
        "Click Register button"
      ],
      expectedResult: "Error message for duplicate email displayed"
    },
    {
      id: "TC005",
      title: "Registration with invalid email format",
      complexity: "Low complexity",
      duration: "10 mins",
      status: "needs revision",
      statusColor: "red",
      description: "Verify mandatory field validation during registration",
      tags: ["registration", "validation", "boundary"],
      preconditions: "User is on registration page",
      dependencies: "None",
      testSteps: [
        "Leave email field empty",
        "Fill other required fields",
        "Click Register button"
      ],
      expectedResult: "Required field validation error displayed"
    }
  ];

  const getStatusBgColor = (color) => {
    switch (color) {
      case "orange": return "bg-orange-500";
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "green": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "pending review": return "text-orange-600";
      case "approved": return "text-blue-600";
      case "needs revision": return "text-red-600";
      case "pending approval": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", { feedbackOption, comments });
    onClose(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(false), 300); // Wait for animation to complete
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Right-side sliding panel */}
      <div className={`absolute right-0 top-0 h-full w-[600px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {name}: Output Review
          </h1>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Blue Gradient Navigation Tabs */}
        <div className="px-6">
          <div className="bg-custom-gradient rounded-full p-1">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("output")}
                className={`flex-1 px-6 py-3 rounded-full font-medium transition-all text-center ${
                  activeTab === "output"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex-1 px-6 py-3 rounded-full font-medium transition-all text-center ${
                  activeTab === "feedback"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Feedback
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 px-6 py-3 rounded-full font-medium transition-all text-center ${
                  activeTab === "history"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                History
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-200px)]">
          {activeTab === "output" && (
            <div className="space-y-6">
              {/* Sprint and Feature Dropdowns */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sprint</label>
                  <div className="relative">
                    <select
                      value={selectedSprint}
                      onChange={(e) => setSelectedSprint(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Feature</label>
                  <div className="relative">
                    <select
                      value={selectedFeature}
                      onChange={(e) => setSelectedFeature(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="User Registration">User Registration</option>
                      <option value="Login">Login</option>
                      <option value="Payment">Payment</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Test Cases Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">User Registration Test Cases</h2>
                  <p className="text-sm text-gray-600">Generated 8/9/2025 1:12:15 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded">
                    pending review
                  </span>
                  <span className="text-blue-600 text-sm font-medium">Confidence: 94%</span>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">24</div>
                    <div className="text-sm text-gray-600 mt-1">Total Cases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">18</div>
                    <div className="text-sm text-gray-600 mt-1">Functional</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">6</div>
                    <div className="text-sm text-gray-600 mt-1">Non-functional</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">92%</div>
                    <div className="text-sm text-gray-600 mt-1">Coverage</div>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search test cases"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="All items">All items</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Test Cases List */}
              <div className="space-y-3">
                {testCases.map((testCase) => (
                  <div key={testCase.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    {/* Collapsed View */}
                    <div 
                      className="p-4 relative cursor-pointer"
                      onClick={() => setExpandedTestCase(expandedTestCase === testCase.id ? null : testCase.id)}
                    >
                      {/* Colored half circle on the left */}
                      <div className={`absolute left-0 top-1 bottom-1 w-8 ${getStatusBgColor(testCase.statusColor)} rounded-l-2xl`}></div>
                      
                      <div className="flex items-center justify-between ml-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-gray-900">{testCase.id}:</span>
                            <span className="text-gray-900">{testCase.title}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{testCase.duration}</span>
                            <span>•</span>
                            <span>{testCase.complexity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`${getStatusBgColor(testCase.statusColor)} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                            {testCase.status}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedTestCase === testCase.id ? 'rotate-180' : 'rotate-[-90deg]'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Expanded View */}
                    {expandedTestCase === testCase.id && (
                      <div className="border-t border-gray-200 bg-gray-50 relative">
                        {/* Extended colored bar for expanded section */}
                        <div className={`absolute left-0 top-0 bottom-0 w-8 ${getStatusBgColor(testCase.statusColor)}`}></div>
                        <div className="p-6 ml-8">
                          {/* Tags */}
                          <div className="flex gap-2 mb-4">
                            {testCase.tags.map((tag, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <div className="mb-4">
                            <p className="text-gray-800 text-sm">{testCase.description}</p>
                          </div>

                          {/* Preconditions and Dependencies */}
                          <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm mb-1">Preconditions</h4>
                              <p className="text-gray-600 text-sm">{testCase.preconditions}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm mb-1">Dependencies</h4>
                              <p className="text-gray-600 text-sm">{testCase.dependencies}</p>
                            </div>
                          </div>

                          {/* Test Steps */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 text-sm mb-2">Test Steps</h4>
                            <ol className="list-decimal list-inside space-y-1">
                              {testCase.testSteps.map((step, index) => (
                                <li key={index} className="text-gray-600 text-sm">{step}</li>
                              ))}
                            </ol>
                          </div>

                          {/* Expected Result */}
                          <div className="mb-6">
                            <h4 className="font-medium text-gray-900 text-sm mb-1">Expected Result</h4>
                            <p className="text-gray-600 text-sm">{testCase.expectedResult}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                              <MessageSquare className="w-3 h-3" />
                              Comment
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                              <HelpCircle className="w-3 h-3" />
                              Ask Question
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                              <Check className="w-3 h-3" />
                              Approve
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                              <Flag className="w-3 h-3" />
                              Flag Issue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Provide Feedback</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Review the agent's work and provide guidance for improvement
                </p>

                {/* Feedback Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setFeedbackOption("approve")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "approve"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => setFeedbackOption("revision")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "revision"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ✏️ Request Revision
                  </button>
                  <button
                    onClick={() => setFeedbackOption("reject")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "reject"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🚫 Reject
                  </button>
                </div>

                {/* Comments Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add any comments or approval notes..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={8}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitFeedback}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  ✓ Submit Approval
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">History</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No history available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentOutput;