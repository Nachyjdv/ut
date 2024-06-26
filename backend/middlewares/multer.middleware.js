const multer = require("multer");
const path = require("path");

var fs = require('fs');
var dir = './media';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        let filename = ""
        if (req.body?.type === "timetable") {
            filename = `Timetable_${req.body.semester}_Semester_${req.body.branch}.png`
        } else if (req.body?.type === "profile") {
            if (req.body.enrollmentNo) {
                filename = `Student_Profile_${req.body.enrollmentNo}_Semester_${req.body.branch}.png`
            } else {
                filename = `Faculty_Profile_${req.body.employeeId}.png`
            }
        } else if (req.body?.type === "material") {
            filename = `${req.body.title}_Subject_${req.body.subject}.pdf`
        }
        cb(null, `${filename}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
