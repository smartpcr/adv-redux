"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createAction(type, payload) {
    return payload === null ? { type: type } : { type: type, payload: payload };
}
exports.createAction = createAction;
//# sourceMappingURL=ActionHelper.js.map