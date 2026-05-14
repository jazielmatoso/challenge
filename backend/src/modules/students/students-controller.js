const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
  deleteStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, className, section, roll } = req.query;
  const students = await getAllStudents({ name, className, section, roll });
  res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = req.body;
  const message = await addNewStudent(payload);
  res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id: studentId } = req.params;
  const payload = req.body;
  const message = await updateStudent({ ...payload, userId: studentId });
  res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  console.log("Get student detail for userId:", userId);
  const student = await getStudentDetail(userId);
  res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  const { status } = req.body;
  const message = await setStudentStatus({ userId, status });
  res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
  const { id: studentId } = req.params;
  const message = await deleteStudent(studentId);
  res.json(message);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
  handleDeleteStudent,
};
