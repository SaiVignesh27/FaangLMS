import mongoose from 'mongoose';

// Question Schema
const questionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'fill', 'code'], required: true },
  options: [String],
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
  codeTemplate: String,
  validationProgram: {
    java: String,
    python: String,
    cpp: String,
    javascript: String
  },
  testCases: [{
    input: String,
    output: String,
    description: String
  }],
  points: { type: Number, required: true }
});

// Test Schema
const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  courseId: { type: String, required: true },
  classId: String,
  questions: [questionSchema],
  visibility: { type: String, enum: ['public', 'private'], default: 'private' },
  assignedTo: [String],
  timeLimit: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Test Submission Schema
const testSubmissionSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  userId: { type: String, required: true },
  answers: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    points: Number,
    feedback: String,
    correctAnswer: mongoose.Schema.Types.Mixed
  }],
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  results: [{
    questionId: String,
    questionText: String,
    correctAnswer: mongoose.Schema.Types.Mixed,
    userAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    points: Number
  }],
  submittedAt: { type: Date, default: Date.now }
});

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  courseId: { type: String, required: true },
  questions: [questionSchema],
  visibility: { type: String, enum: ['public', 'private'], default: 'private' },
  assignedTo: [String],
  timeWindow: {
    start: Date,
    end: Date
  },
  allowFileUpload: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Assignment Submission Schema
const assignmentSubmissionSchema = new mongoose.Schema({
  assignmentId: { type: String, required: true },
  userId: { type: String, required: true },
  answers: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    points: Number,
    feedback: String,
    correctAnswer: mongoose.Schema.Types.Mixed
  }],
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  results: [{
    questionId: String,
    questionText: String,
    correctAnswer: mongoose.Schema.Types.Mixed,
    userAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    points: Number
  }],
  submittedAt: { type: Date, default: Date.now }
});

export const Test = mongoose.model('Test', testSchema);
export const TestSubmission = mongoose.model('TestSubmission', testSubmissionSchema);
export const Assignment = mongoose.model('Assignment', assignmentSchema);
export const AssignmentSubmission = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema); 