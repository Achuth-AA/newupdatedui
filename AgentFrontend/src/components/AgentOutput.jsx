import { useState } from "react";
import {
  X,
  Eye,
  MessageSquare,
  Clock,
  Download,
  Copy,
  ThumbsUp,
  Edit3,
  XCircle,
  Send,
  Zap,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";
import FolderFiles from "./cards/FolderFiles";

// Helper function for delay
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function AgentOutput({ onClose, agent }) {
  const { name, description, icon: Icon, iconColor } = agent;
  const [activeTab, setActiveTab] = useState("output");
  const [feedbackOption, setFeedbackOption] = useState("approve");
  const [comments, setComments] = useState("");
  const [excelData, setExcelData] = useState(null);
  const [showExcelViewer, setShowExcelViewer] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(0);

  console.log(onClose, agent);
  const FILE_API_BASE_URL = "http://localhost:8080/api";

  const historyData = [
    {
      id: 1,
      user: "Sarah Chen",
      type: "revision",
      date: "8/2/2025, 9:27:56 AM",
      comment:
        "Please add more edge cases for password validation. The current test cases miss scenarios for special characters and length requirements.",
    },
    {
      id: 2,
      user: "Michael Rodriguez",
      type: "approval",
      date: "8/2/2025, 8:57:56 AM",
      comment:
        "Great work on the user registration flows. The test coverage looks comprehensive.",
    },
    {
      id: 3,
      user: "Sarah Chen",
      type: "comment",
      date: "8/2/2025, 7:57:56 AM",
      comment:
        "Consider adding performance test cases for high-load scenarios.",
    },
  ];

  const getHistoryTypeStyle = (type) => {
    switch (type) {
      case "approval":
        return "bg-green-500 text-white";
      case "revision":
        return "bg-yellow-500 text-white";
      case "comment":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  // Add this function to your AgentOutput component
  const copyFileToLocation = async (sourcePath, destinationPath) => {
    try {
      const response = await fetch(`${FILE_API_BASE_URL}/copy-file`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: sourcePath,
          destination: destinationPath,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // You can add success notification here
      } else {
        const error = await response.text();
        console.error("Failed to regenerate:", error);
        alert("Failed to regenerate. Please try again.");
      }
    } catch (error) {
      console.error("Error copying file:", error);
      alert("Error occurred while copying file.");
    }
  };

  // Add state for loading if you want to show loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updated button with file copy functionality
  const handleSubmitFeedback = async () => {
    setIsSubmitting(true);

    try {
      // Define your source and destination paths
      const sourcePath = "outputs/regeneration/RegeneratedTestCases.xlsx";
      const destinationPath =
        "outputs/test-design/test-case/RegeneratedTestCases.xlsx";

      // Copy the file, but ensure at least 6 seconds delay
      await Promise.all([
        copyFileToLocation(sourcePath, destinationPath),
        sleep(15000),
      ]);

      // Add any additional logic here (like submitting feedback, regenerating, etc.)
      console.log("Feedback submitted and file copied");
    } catch (error) {
      console.error("Error in submit process:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle Excel file processing
  const handleExcelFile = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);

      const sheetsData = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        return {
          name: sheetName,
          data: jsonData,
        };
      });

      setExcelData(sheetsData);
      setShowExcelViewer(true);
      setSelectedSheet(0);
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  };

  // Excel Table Component
  const ExcelViewer = () => {
    if (!excelData || excelData.length === 0) return null;

    const currentSheet = excelData[selectedSheet];
    const tableData = currentSheet.data;

    if (!tableData || tableData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No data found in this sheet
        </div>
      );
    }

    const headers = tableData[0] || [];
    const rows = tableData.slice(1);

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Sheet Tabs */}
        {excelData.length > 1 && (
          <div className="border-b border-gray-200 px-4 py-2">
            <div className="flex gap-2 overflow-x-auto">
              {excelData.map((sheet, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSheet(index)}
                  className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
                    selectedSheet === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {sheet.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Table Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-gray-900">{currentSheet.name}</h3>
            <span className="text-sm text-gray-500">({rows.length} rows)</span>
          </div>
          <button
            onClick={() => setShowExcelViewer(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-auto max-h-96">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b border-gray-200"
                  >
                    {header || `Column ${index + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {headers.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100"
                    >
                      {row[colIndex] || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          Showing {rows.length} rows × {headers.length} columns
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Full-screen overlay for regenerating */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="h-12 w-12 mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xl font-semibold text-gray-700">
            Regenerating Test Cases…
          </p>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <div className="relative w-full max-w-6xl max-h-[96vh] overflow-y-auto rounded-xl shadow-2xl bg-gray-950 border border-gray-800">
          {/* Header */}
          <div className="bg-white border-b border-gray-800">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                  <h1 className="text-2xl font-semibold text-black">{name}</h1>
                </div>
              </div>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <p className="text-gray-400 text-sm px-4 pb-4">{description}</p>
          </div>

          {/* Tabs */}
          <div className="bg-white px-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("output")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors ${
                  activeTab === "output"
                    ? "bg-white text-black"
                    : "bg-transparent text-gray-400 hover:text-gray-400"
                }`}
              >
                <Eye className="w-4 h-4" />
                Output
              </button>
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors ${
                  activeTab === "feedback"
                    ? "bg-white text-black"
                    : "bg-transparent text-gray-400 hover:text-gray-400"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-colors ${
                  activeTab === "history"
                    ? "bg-white text-black"
                    : "bg-transparent text-gray-400 hover:text-gray-400"
                }`}
              >
                <Clock className="w-4 h-4" />
                History
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              {activeTab === "output" && (
                <div className="space-y-6">
                  <div className="bg-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-black">
                        {name}
                      </h2>
                      <span className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full">
                        pending review
                      </span>
                    </div>

                    {/* Show Excel Viewer if Excel data is available */}
                    {showExcelViewer && excelData ? (
                      <ExcelViewer />
                    ) : (
                      <div className="bg-gray-200/50 rounded-lg p-12 text-center">
                        <FolderFiles
                          name={name}
                          onExcelFile={handleExcelFile}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "feedback" && (
                <div className="space-y-6">
                  <div className="bg-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-black mb-2">
                      Provide Feedback
                    </h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Review the agent's work and provide guidance for
                      improvement
                    </p>

                    {/* Feedback options */}
                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => setFeedbackOption("approve")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                          feedbackOption === "approve"
                            ? "bg-green-600 text-white"
                            : "bg-gray-400 text-white hover:bg-gray-600"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => setFeedbackOption("revision")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                          feedbackOption === "revision"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-400 text-white hover:bg-gray-600"
                        }`}
                      >
                        <Edit3 className="w-4 h-4" />
                        Request Revision
                      </button>
                      <button
                        onClick={() => setFeedbackOption("reject")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                          feedbackOption === "reject"
                            ? "bg-red-600 text-white"
                            : "bg-gray-400 text-white hover:bg-gray-600"
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>

                    {/* Comments section */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-black mb-2">
                        Comments (Optional)
                      </label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add any comments or approval notes..."
                        className="w-full bg-white border border-gray-700 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                        rows={6}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                      onClick={handleSubmitFeedback}
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting
                        ? "Processing..."
                        : "Submit Feedback & Regenerate"}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-4">
                  {historyData.map((item) => (
                    <div key={item.id} className="bg-gray-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-medium">
                            {item.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-black">
                              {item.user}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs rounded ${getHistoryTypeStyle(
                                item.type
                              )}`}
                            >
                              {item.type}
                            </span>
                            <span className="text-sm text-gray-600">
                              {item.date}
                            </span>
                          </div>
                          <p className="text-gray-800">{item.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentOutput;
