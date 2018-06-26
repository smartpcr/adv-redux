"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionHelper_1 = require("./ActionHelper");
exports.DynamicProviderActionsCreator = {
    reducerAdded: function (key) { return ActionHelper_1.createAction("ReducerAdded" /* ReducerAdded */, key); },
    reducerRemoved: function (key) { return ActionHelper_1.createAction("ReducerRemoved" /* ReducerRemoved */, key); }
};
//# sourceMappingURL=DynamicProviderActions.js.map