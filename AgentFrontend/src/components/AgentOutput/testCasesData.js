export const testCasesData = [
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