"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
const patients = [
    {
        id: 1,
        name: 'asdf',
        gender: 'male',
        occupation: 'student',
        healthRating: 'healthy'
    }
];
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.get('/api/patients', (_req, res) => {
    res.send(patients);
});
app.use('/api/diagnoses', diagnoses_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
