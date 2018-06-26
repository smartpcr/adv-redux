"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/// <amd-module name="redux/Components/DynamicProvider" />
var React = require("react");
var react_redux_1 = require("react-redux");
var DynamicProviderActions_1 = require("./DynamicProviderActions");
/**
 * The DynamicProvider wraps the default Redux Provider, but also adds a way to register Redux reducers and Redux sagas on mount
 * When this component is initialized, the reducer and saga passed as props will be registered with the system
 * On unmount, they will be unregistered
 */
var DynamicProvider = /** @class */ (function (_super) {
    tslib_1.__extends(DynamicProvider, _super);
    function DynamicProvider(props, context) {
        var _this = _super.call(this, props, context) || this;
        var reducer = props.reducer, reducerKey = props.reducerKey, _a = props.reduxContext, store = _a.store, sagaMiddleware = _a.sagaMiddleware, saga = props.saga;
        // Register the saga first, so it can potentially respond to the mount action if required
        if (saga) {
            _this._saga = sagaMiddleware.run(saga);
        }
        // Register the reducer, then dispacth a mount action
        if (reducer && reducerKey) {
            store.addReducer(reducerKey, reducer);
        }
        return _this;
    }
    /**
     * Unregister sagas and reducers
     */
    DynamicProvider.prototype.componentWillUnmount = function () {
        var _a = this.props, reducerKey = _a.reducerKey, store = _a.reduxContext.store;
        // Dispatch the unmount action, then remove the reducer
        if (reducerKey) {
            store.dispatch(DynamicProviderActions_1.DynamicProviderActionsCreator.reducerRemoved(reducerKey));
        }
        // Stop the saga
        if (this._saga) {
            this._saga.cancel();
        }
    };
    /**
     * Render a Redux provider
     */
    DynamicProvider.prototype.render = function () {
        return (React.createElement(react_redux_1.Provider, { store: this.props.reduxContext.store }, this.props.children));
    };
    return DynamicProvider;
}(React.Component));
exports.DynamicProvider = DynamicProvider;
//# sourceMappingURL=DynamicProvider.js.map