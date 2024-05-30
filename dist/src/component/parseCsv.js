"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAndExport = void 0;
// parseCsv.js
const csv_1 = require("csv");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Function to parse CSV and return a Promise
const parseCSV = () => {
    return new Promise((resolve, reject) => {
        const parser = (0, csv_1.parse)({ columns: true }, function (err, records) {
            if (err) {
                console.error("Error parsing CSV:", err);
                reject(err);
            }
            else {
                resolve(records);
            }
        });
        const stream = fs_1.default.createReadStream(path_1.default.join(__dirname, '../../public/stroke.csv'));
        stream.pipe(parser);
    });
};
function parseAndExport() {
    return __awaiter(this, void 0, void 0, function* () {
        let parsedFile = null;
        try {
            parsedFile = yield parseCSV();
            // console.log("Parsing complete:", parsedFile);
            return parsedFile;
        }
        catch (error) {
            console.error("Error parsing CSV:", error);
        }
    });
}
exports.parseAndExport = parseAndExport;
