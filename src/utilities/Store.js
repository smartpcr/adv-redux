"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var redux_1 = require("redux");
var redux_saga_1 = require("redux-saga");
var DynamicProviderActions_1 = require("./DynamicProviderActions");
/**
 * Configure a store to which additional reducers can be registered and unregistered
 * This function will also configure the Saga Middleware for later use
 * @param staticReducers The static reducers, which should always be present on the store
 * @param preloadedState Any initial state to set
 * @param pageContext The IVSSPageContext
 * @returns A redux context object, which contains the store and the saga middleware
 */
function configureDynamicStore(staticReducers, preloadedState, pageContext) {
    var sagaMiddleware = redux_saga_1.default({
        context: {
            pageContext: pageContext
        }
    });
    var reducerFunctions = combineDynamicReducers(staticReducers);
    var composeEnhancers = redux_1.compose;
    var enhancer = composeEnhancers(redux_1.applyMiddleware(sagaMiddleware));
    var store = redux_1.createStore(reducerFunctions.reducer, preloadedState, enhancer);
    var dynamicStore = store;
    dynamicStore.addReducer = function (key, reducer) {
        reducerFunctions.addReducer(key, reducer);
        dynamicStore.dispatch(DynamicProviderActions_1.DynamicProviderActionsCreator.reducerAdded(key));
    };
    dynamicStore.removeReducer = function (key) {
        dynamicStore.dispatch(DynamicProviderActions_1.DynamicProviderActionsCreator.reducerRemoved(key));
        reducerFunctions.removeReducer(key);
    };
    return {
        store: dynamicStore,
        sagaMiddleware: sagaMiddleware
    };
}
exports.configureDynamicStore = configureDynamicStore;
/**
 * Create a combined reducer as in the fashion of Redux's combineReducers() function,
 * but allows for the dynamic registration of additional reducers
 * @param staticReducers The reducers that should always be registered with the store.
 * @returns An object with three functions: the reducer, an addReducer function, and a removeReducer function
 */
function combineDynamicReducers(staticReducers) {
    var rm = tslib_1.__assign({}, staticReducers);
    var combinedReducer = redux_1.combineReducers(staticReducers);
    var dynamicReducers = {};
    return {
        reducer: function (state, action) { return combinedReducer(state, action); },
        addReducer: function (key, reducer) {
            dynamicReducers[key] = reducer;
            rm = tslib_1.__assign({}, staticReducers, dynamicReducers);
            combinedReducer = redux_1.combineReducers(rm);
        },
        removeReducer: function (key) {
            delete dynamicReducers[key];
            rm = tslib_1.__assign({}, staticReducers, dynamicReducers);
            combinedReducer = redux_1.combineReducers(rm);
        }
    };
}
//# sourceMappingURL=Store.js.map