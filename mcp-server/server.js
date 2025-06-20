"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
var ai_1 = require("ai");
var mcp_stdio_1 = require("ai/mcp-stdio");
var openai_1 = require("@ai-sdk/openai");
// import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, transport, stdioClient_1, sseClient_1, toolSetOne, toolSetTwo, tools, response, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    prompt = (_a.sent()).prompt;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    transport = new mcp_stdio_1.Experimental_StdioMCPTransport({
                        command: 'node',
                        args: ['src/stdio/dist/server.js'],
                    });
                    return [4 /*yield*/, (0, ai_1.experimental_createMCPClient)({
                            transport: transport,
                        })];
                case 3:
                    stdioClient_1 = _a.sent();
                    return [4 /*yield*/, (0, ai_1.experimental_createMCPClient)({
                            transport: {
                                type: 'sse',
                                url: 'https://actions.zapier.com/mcp/[YOUR_KEY]/sse',
                            },
                        })];
                case 4:
                    sseClient_1 = _a.sent();
                    return [4 /*yield*/, stdioClient_1.tools()];
                case 5:
                    toolSetOne = _a.sent();
                    return [4 /*yield*/, sseClient_1.tools()];
                case 6:
                    toolSetTwo = _a.sent();
                    tools = __assign(__assign({}, toolSetOne), toolSetTwo);
                    return [4 /*yield*/, (0, ai_1.streamText)({
                            model: (0, openai_1.openai)('gpt-4o'),
                            tools: tools,
                            prompt: prompt,
                            // When streaming, the client should be closed after the response is finished:
                            onFinish: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, stdioClient_1.close()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, sseClient_1.close()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            // Closing clients onError is optional
                            // - Closing: Immediately frees resources, prevents hanging connections
                            // - Not closing: Keeps connection open for retries
                            onError: function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, stdioClient_1.close()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, sseClient_1.close()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        })];
                case 7:
                    response = _a.sent();
                    return [2 /*return*/, response.toDataStreamResponse()];
                case 8:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Response('Internal Server Error', { status: 500 })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
