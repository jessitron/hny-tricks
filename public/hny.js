(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequirecdde"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequirecdde"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("76YNT", function(module, exports) {
"use strict";
// This code will eventually be packaged upstream into a WebSDK package.
// Once it is released as a package, this distro will depend directly on the upstream package.
// https://github.com/open-telemetry/opentelemetry-js/pull/4325
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.WebSDK = void 0;

var $jcsIC = parcelRequire("jcsIC");

var $fdqQ1 = parcelRequire("fdqQ1");
var $kawsV = parcelRequire("kawsV");

var $39bMr = parcelRequire("39bMr");

var $dKzbF = parcelRequire("dKzbF");

var $e4oiF = parcelRequire("e4oiF");

var $bFrkE = parcelRequire("bFrkE");
parcelRequire("8ySzd");
var $7Gu1e = parcelRequire("7Gu1e");
/** This class represents everything needed to register a fully configured OpenTelemetry Web SDK */ class $52d842492960ffd7$var$WebSDK {
    /**
     * Create a new Web SDK instance
     */ constructor(configuration = {}){
        var _a, _b, _c, _d;
        this._resource = (_a = configuration.resource) !== null && _a !== void 0 ? _a : new $kawsV.Resource({});
        this._resourceDetectors = (_b = configuration.resourceDetectors) !== null && _b !== void 0 ? _b : [
            $7Gu1e.browserDetector
        ];
        this._serviceName = configuration.serviceName;
        this._autoDetectResources = (_c = configuration.autoDetectResources) !== null && _c !== void 0 ? _c : true;
        if (configuration.spanProcessor || configuration.traceExporter) {
            const tracerProviderConfig = {};
            if (configuration.sampler) tracerProviderConfig.sampler = configuration.sampler;
            if (configuration.spanLimits) tracerProviderConfig.spanLimits = configuration.spanLimits;
            if (configuration.idGenerator) tracerProviderConfig.idGenerator = configuration.idGenerator;
            const spanProcessor = (_d = configuration.spanProcessor) !== null && _d !== void 0 ? _d : new $39bMr.BatchSpanProcessor(configuration.traceExporter);
            this._tracerProviderConfig = {
                tracerConfig: tracerProviderConfig,
                spanProcessor: spanProcessor,
                contextManager: configuration.contextManager,
                textMapPropagator: configuration.textMapPropagator
            };
        }
        let instrumentations = [];
        if (configuration.instrumentations) instrumentations = configuration.instrumentations;
        this._instrumentations = instrumentations;
    }
    /**
     * Call this method to construct SDK components and register them with the OpenTelemetry API.
     */ start() {
        var _a, _b, _c;
        if (this._disabled) return;
        (0, $jcsIC.registerInstrumentations)({
            instrumentations: this._instrumentations
        });
        if (this._autoDetectResources) {
            const internalConfig = {
                detectors: this._resourceDetectors
            };
            this._resource = this._resource.merge((0, $fdqQ1.detectResourcesSync)(internalConfig));
        }
        this._resource = this._serviceName === undefined ? this._resource : this._resource.merge(new $kawsV.Resource({
            [$e4oiF.SEMRESATTRS_SERVICE_NAME]: this._serviceName
        }));
        const tracerProvider = new $dKzbF.WebTracerProvider(Object.assign(Object.assign({}, (_a = this._tracerProviderConfig) === null || _a === void 0 ? void 0 : _a.tracerConfig), {
            resource: this._resource
        }));
        this._tracerProvider = tracerProvider;
        if (this._tracerProviderConfig) tracerProvider.addSpanProcessor(this._tracerProviderConfig.spanProcessor);
        tracerProvider.register({
            contextManager: (_b = this._tracerProviderConfig) === null || _b === void 0 ? void 0 : _b.contextManager,
            propagator: (_c = this._tracerProviderConfig) === null || _c === void 0 ? void 0 : _c.textMapPropagator
        });
        // add processor for adding the sessionId attribute
        tracerProvider.addSpanProcessor(new $bFrkE.SessionIdSpanProcessor());
    }
    /* Experimental getter method: not currently part of the upstream
     * sdk's API */ getResourceAttributes() {
        return this._resource.attributes;
    }
    shutdown() {
        const promises = [];
        if (this._tracerProvider) promises.push(this._tracerProvider.shutdown());
        return Promise.all(promises)// return void instead of the array from Promise.all
        .then(()=>{});
    }
}
module.exports.WebSDK = $52d842492960ffd7$var$WebSDK;

});
parcelRegister("jcsIC", function(module, exports) {

$parcel$export(module.exports, "registerInstrumentations", () => $dfa56a393e7e8c2d$export$fc0a1ca5231d826a);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $7KVqm = parcelRequire("7KVqm");
var $ibuLL = parcelRequire("ibuLL");

var $4uQt8 = parcelRequire("4uQt8");

var $25c0u = parcelRequire("25c0u");
function $dfa56a393e7e8c2d$export$fc0a1ca5231d826a(options) {
    var _a, _b;
    var tracerProvider = options.tracerProvider || (0, $ibuLL.trace).getTracerProvider();
    var meterProvider = options.meterProvider || (0, $7KVqm.metrics).getMeterProvider();
    var loggerProvider = options.loggerProvider || (0, $4uQt8.logs).getLoggerProvider();
    var instrumentations = (_b = (_a = options.instrumentations) === null || _a === void 0 ? void 0 : _a.flat()) !== null && _b !== void 0 ? _b : [];
    (0, $25c0u.enableInstrumentations)(instrumentations, tracerProvider, meterProvider, loggerProvider);
    return function() {
        (0, $25c0u.disableInstrumentations)(instrumentations);
    };
}

});
parcelRegister("8Ur1m", function(module, exports) {

$parcel$export(module.exports, "context", () => (parcelRequire("hfZRB")).context);
$parcel$export(module.exports, "diag", () => (parcelRequire("ljza4")).diag);
$parcel$export(module.exports, "metrics", () => (parcelRequire("7KVqm")).metrics);
$parcel$export(module.exports, "propagation", () => (parcelRequire("4tmHU")).propagation);
$parcel$export(module.exports, "trace", () => (parcelRequire("ibuLL")).trace);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $i04fT = parcelRequire("i04fT");

var $cE6pj = parcelRequire("cE6pj");

var $cOtp4 = parcelRequire("cOtp4");

var $46NDq = parcelRequire("46NDq");


var $3farI = parcelRequire("3farI");




var $3jGzM = parcelRequire("3jGzM");

var $h9EcL = parcelRequire("h9EcL");

var $6lUa6 = parcelRequire("6lUa6");

var $AvSm7 = parcelRequire("AvSm7");


var $cn2YZ = parcelRequire("cn2YZ");

var $lQKpB = parcelRequire("lQKpB");

var $hfZRB = parcelRequire("hfZRB");

var $ljza4 = parcelRequire("ljza4");

var $7KVqm = parcelRequire("7KVqm");

var $4tmHU = parcelRequire("4tmHU");

var $ibuLL = parcelRequire("ibuLL");
var // Default export.
$67c8837d86f3b191$export$2e2bcd8739ae039 = {
    context: (0, $hfZRB.context),
    diag: (0, $ljza4.diag),
    metrics: (0, $7KVqm.metrics),
    propagation: (0, $4tmHU.propagation),
    trace: (0, $ibuLL.trace)
};

});
parcelRegister("i04fT", function(module, exports) {

$parcel$export(module.exports, "createBaggage", () => $d1ab8715d93ab9b4$export$1034a425c7384452);
$parcel$export(module.exports, "baggageEntryMetadataFromString", () => $d1ab8715d93ab9b4$export$c491cedc1b2b6e9e);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $87noO = parcelRequire("87noO");

var $31ebd = parcelRequire("31ebd");

var $eKeqA = parcelRequire("eKeqA");
var $d1ab8715d93ab9b4$var$diag = (0, $87noO.DiagAPI).instance();
function $d1ab8715d93ab9b4$export$1034a425c7384452(entries) {
    if (entries === void 0) entries = {};
    return new (0, $31ebd.BaggageImpl)(new Map(Object.entries(entries)));
}
function $d1ab8715d93ab9b4$export$c491cedc1b2b6e9e(str) {
    if (typeof str !== "string") {
        $d1ab8715d93ab9b4$var$diag.error("Cannot create baggage metadata from unknown type: " + typeof str);
        str = "";
    }
    return {
        __TYPE__: (0, $eKeqA.baggageEntryMetadataSymbol),
        toString: function() {
            return str;
        }
    };
}

});
parcelRegister("87noO", function(module, exports) {

$parcel$export(module.exports, "DiagAPI", () => $5e9120c1387d2385$export$5c8937ffc688cfd3);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $3OeQp = parcelRequire("3OeQp");

var $JLLUP = parcelRequire("JLLUP");

var $46NDq = parcelRequire("46NDq");

var $drRwX = parcelRequire("drRwX");
var $5e9120c1387d2385$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $5e9120c1387d2385$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $5e9120c1387d2385$var$API_NAME = "diag";
/**
 * Singleton object which represents the entry point to the OpenTelemetry internal
 * diagnostic API
 */ var $5e9120c1387d2385$export$5c8937ffc688cfd3 = /** @class */ function() {
    /**
     * Private internal constructor
     * @private
     */ function DiagAPI() {
        function _logProxy(funcName) {
            return function() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                var logger = (0, $drRwX.getGlobal)("diag");
                // shortcut if logger not set
                if (!logger) return;
                return logger[funcName].apply(logger, $5e9120c1387d2385$var$__spreadArray([], $5e9120c1387d2385$var$__read(args), false));
            };
        }
        // Using self local variable for minification purposes as 'this' cannot be minified
        var self = this;
        // DiagAPI specific functions
        var setLogger = function(logger, optionsOrLogLevel) {
            var _a, _b, _c;
            if (optionsOrLogLevel === void 0) optionsOrLogLevel = {
                logLevel: (0, $46NDq.DiagLogLevel).INFO
            };
            if (logger === self) {
                // There isn't much we can do here.
                // Logging to the console might break the user application.
                // Try to log to self. If a logger was previously registered it will receive the log.
                var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                self.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
                return false;
            }
            if (typeof optionsOrLogLevel === "number") optionsOrLogLevel = {
                logLevel: optionsOrLogLevel
            };
            var oldLogger = (0, $drRwX.getGlobal)("diag");
            var newLogger = (0, $JLLUP.createLogLevelDiagLogger)((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : (0, $46NDq.DiagLogLevel).INFO, logger);
            // There already is an logger registered. We'll let it know before overwriting it.
            if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
                var stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
                oldLogger.warn("Current logger will be overwritten from " + stack);
                newLogger.warn("Current logger will overwrite one already registered from " + stack);
            }
            return (0, $drRwX.registerGlobal)("diag", newLogger, self, true);
        };
        self.setLogger = setLogger;
        self.disable = function() {
            (0, $drRwX.unregisterGlobal)($5e9120c1387d2385$var$API_NAME, self);
        };
        self.createComponentLogger = function(options) {
            return new (0, $3OeQp.DiagComponentLogger)(options);
        };
        self.verbose = _logProxy("verbose");
        self.debug = _logProxy("debug");
        self.info = _logProxy("info");
        self.warn = _logProxy("warn");
        self.error = _logProxy("error");
    }
    /** Get the singleton instance of the DiagAPI API */ DiagAPI.instance = function() {
        if (!this._instance) this._instance = new DiagAPI();
        return this._instance;
    };
    return DiagAPI;
}();

});
parcelRegister("3OeQp", function(module, exports) {

$parcel$export(module.exports, "DiagComponentLogger", () => $2c618e667f631db9$export$b4bccc12f5b13129);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $drRwX = parcelRequire("drRwX");
var $2c618e667f631db9$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $2c618e667f631db9$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Component Logger which is meant to be used as part of any component which
 * will add automatically additional namespace in front of the log message.
 * It will then forward all message to global diag logger
 * @example
 * const cLogger = diag.createComponentLogger({ namespace: '@opentelemetry/instrumentation-http' });
 * cLogger.debug('test');
 * // @opentelemetry/instrumentation-http test
 */ var $2c618e667f631db9$export$b4bccc12f5b13129 = /** @class */ function() {
    function DiagComponentLogger(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
    }
    DiagComponentLogger.prototype.debug = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        return $2c618e667f631db9$var$logProxy("debug", this._namespace, args);
    };
    DiagComponentLogger.prototype.error = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        return $2c618e667f631db9$var$logProxy("error", this._namespace, args);
    };
    DiagComponentLogger.prototype.info = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        return $2c618e667f631db9$var$logProxy("info", this._namespace, args);
    };
    DiagComponentLogger.prototype.warn = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        return $2c618e667f631db9$var$logProxy("warn", this._namespace, args);
    };
    DiagComponentLogger.prototype.verbose = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        return $2c618e667f631db9$var$logProxy("verbose", this._namespace, args);
    };
    return DiagComponentLogger;
}();
function $2c618e667f631db9$var$logProxy(funcName, namespace, args) {
    var logger = (0, $drRwX.getGlobal)("diag");
    // shortcut if logger not set
    if (!logger) return;
    args.unshift(namespace);
    return logger[funcName].apply(logger, $2c618e667f631db9$var$__spreadArray([], $2c618e667f631db9$var$__read(args), false));
}

});
parcelRegister("drRwX", function(module, exports) {

$parcel$export(module.exports, "registerGlobal", () => $9ca752071c19610d$export$d586ae880b433238);
$parcel$export(module.exports, "getGlobal", () => $9ca752071c19610d$export$a4e55266d2135a7f);
$parcel$export(module.exports, "unregisterGlobal", () => $9ca752071c19610d$export$d42ac835f38d1fb2);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $3r1Hu = parcelRequire("3r1Hu");

var $c2X3I = parcelRequire("c2X3I");

var $1GT5U = parcelRequire("1GT5U");
var $9ca752071c19610d$var$major = (0, $c2X3I.VERSION).split(".")[0];
var $9ca752071c19610d$var$GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + $9ca752071c19610d$var$major);
var $9ca752071c19610d$var$_global = (0, $3r1Hu._globalThis);
function $9ca752071c19610d$export$d586ae880b433238(type, instance, diag, allowOverride) {
    var _a;
    if (allowOverride === void 0) allowOverride = false;
    var api = $9ca752071c19610d$var$_global[$9ca752071c19610d$var$GLOBAL_OPENTELEMETRY_API_KEY] = (_a = $9ca752071c19610d$var$_global[$9ca752071c19610d$var$GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
        version: (0, $c2X3I.VERSION)
    };
    if (!allowOverride && api[type]) {
        // already registered an API of this type
        var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
        diag.error(err.stack || err.message);
        return false;
    }
    if (api.version !== (0, $c2X3I.VERSION)) {
        // All registered APIs must be of the same version exactly
        var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + (0, $c2X3I.VERSION));
        diag.error(err.stack || err.message);
        return false;
    }
    api[type] = instance;
    diag.debug("@opentelemetry/api: Registered a global for " + type + " v" + (0, $c2X3I.VERSION) + ".");
    return true;
}
function $9ca752071c19610d$export$a4e55266d2135a7f(type) {
    var _a, _b;
    var globalVersion = (_a = $9ca752071c19610d$var$_global[$9ca752071c19610d$var$GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
    if (!globalVersion || !(0, $1GT5U.isCompatible)(globalVersion)) return;
    return (_b = $9ca752071c19610d$var$_global[$9ca752071c19610d$var$GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
function $9ca752071c19610d$export$d42ac835f38d1fb2(type, diag) {
    diag.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + (0, $c2X3I.VERSION) + ".");
    var api = $9ca752071c19610d$var$_global[$9ca752071c19610d$var$GLOBAL_OPENTELEMETRY_API_KEY];
    if (api) delete api[type];
}

});
parcelRegister("3r1Hu", function(module, exports) {

$parcel$export(module.exports, "_globalThis", () => $2805366245178137$export$5c524ddf7208c00c);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Updates to this file should also be replicated to @opentelemetry/core too.
/**
 * - globalThis (New standard)
 * - self (Will return the current window instance for supported browsers)
 * - window (fallback for older browser implementations)
 * - global (NodeJS implementation)
 * - <object> (When all else fails)
 */ /** only globals that common to node and browsers are allowed */ // eslint-disable-next-line node/no-unsupported-features/es-builtins, no-undef
var $2805366245178137$export$5c524ddf7208c00c = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof $parcel$global === "object" ? $parcel$global : {};

});

parcelRegister("c2X3I", function(module, exports) {

$parcel$export(module.exports, "VERSION", () => $8c537bd09d9d68c3$export$a4ad2735b021c132);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
var $8c537bd09d9d68c3$export$a4ad2735b021c132 = "1.9.0";

});

parcelRegister("1GT5U", function(module, exports) {

$parcel$export(module.exports, "isCompatible", () => $13b47340595c99aa$export$7fc0d8c3ab188c4c);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $c2X3I = parcelRequire("c2X3I");
var $13b47340595c99aa$var$re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function $13b47340595c99aa$export$a5733a4d26a1ec61(ownVersion) {
    var acceptedVersions = new Set([
        ownVersion
    ]);
    var rejectedVersions = new Set();
    var myVersionMatch = ownVersion.match($13b47340595c99aa$var$re);
    if (!myVersionMatch) // we cannot guarantee compatibility so we always return noop
    return function() {
        return false;
    };
    var ownVersionParsed = {
        major: +myVersionMatch[1],
        minor: +myVersionMatch[2],
        patch: +myVersionMatch[3],
        prerelease: myVersionMatch[4]
    };
    // if ownVersion has a prerelease tag, versions must match exactly
    if (ownVersionParsed.prerelease != null) return function isExactmatch(globalVersion) {
        return globalVersion === ownVersion;
    };
    function _reject(v) {
        rejectedVersions.add(v);
        return false;
    }
    function _accept(v) {
        acceptedVersions.add(v);
        return true;
    }
    return function isCompatible(globalVersion) {
        if (acceptedVersions.has(globalVersion)) return true;
        if (rejectedVersions.has(globalVersion)) return false;
        var globalVersionMatch = globalVersion.match($13b47340595c99aa$var$re);
        if (!globalVersionMatch) // cannot parse other version
        // we cannot guarantee compatibility so we always noop
        return _reject(globalVersion);
        var globalVersionParsed = {
            major: +globalVersionMatch[1],
            minor: +globalVersionMatch[2],
            patch: +globalVersionMatch[3],
            prerelease: globalVersionMatch[4]
        };
        // if globalVersion has a prerelease tag, versions must match exactly
        if (globalVersionParsed.prerelease != null) return _reject(globalVersion);
        // major versions must match
        if (ownVersionParsed.major !== globalVersionParsed.major) return _reject(globalVersion);
        if (ownVersionParsed.major === 0) {
            if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) return _accept(globalVersion);
            return _reject(globalVersion);
        }
        if (ownVersionParsed.minor <= globalVersionParsed.minor) return _accept(globalVersion);
        return _reject(globalVersion);
    };
}
var $13b47340595c99aa$export$7fc0d8c3ab188c4c = $13b47340595c99aa$export$a5733a4d26a1ec61((0, $c2X3I.VERSION));

});



parcelRegister("JLLUP", function(module, exports) {

$parcel$export(module.exports, "createLogLevelDiagLogger", () => $089942930b6f69b3$export$9a9cc475abb19689);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $46NDq = parcelRequire("46NDq");
function $089942930b6f69b3$export$9a9cc475abb19689(maxLevel, logger) {
    if (maxLevel < (0, $46NDq.DiagLogLevel).NONE) maxLevel = (0, $46NDq.DiagLogLevel).NONE;
    else if (maxLevel > (0, $46NDq.DiagLogLevel).ALL) maxLevel = (0, $46NDq.DiagLogLevel).ALL;
    // In case the logger is null or undefined
    logger = logger || {};
    function _filterFunc(funcName, theLevel) {
        var theFunc = logger[funcName];
        if (typeof theFunc === "function" && maxLevel >= theLevel) return theFunc.bind(logger);
        return function() {};
    }
    return {
        error: _filterFunc("error", (0, $46NDq.DiagLogLevel).ERROR),
        warn: _filterFunc("warn", (0, $46NDq.DiagLogLevel).WARN),
        info: _filterFunc("info", (0, $46NDq.DiagLogLevel).INFO),
        debug: _filterFunc("debug", (0, $46NDq.DiagLogLevel).DEBUG),
        verbose: _filterFunc("verbose", (0, $46NDq.DiagLogLevel).VERBOSE)
    };
}

});
parcelRegister("46NDq", function(module, exports) {

$parcel$export(module.exports, "DiagLogLevel", () => $2fde396648409cca$export$b7d7b4c0f3c95263);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Defines the available internal logging levels for the diagnostic logger, the numeric values
 * of the levels are defined to match the original values from the initial LogLevel to avoid
 * compatibility/migration issues for any implementation that assume the numeric ordering.
 */ var $2fde396648409cca$export$b7d7b4c0f3c95263;
(function(DiagLogLevel) {
    /** Diagnostic Logging level setting to disable all logging (except and forced logs) */ DiagLogLevel[DiagLogLevel["NONE"] = 0] = "NONE";
    /** Identifies an error scenario */ DiagLogLevel[DiagLogLevel["ERROR"] = 30] = "ERROR";
    /** Identifies a warning scenario */ DiagLogLevel[DiagLogLevel["WARN"] = 50] = "WARN";
    /** General informational log message */ DiagLogLevel[DiagLogLevel["INFO"] = 60] = "INFO";
    /** General debug log message */ DiagLogLevel[DiagLogLevel["DEBUG"] = 70] = "DEBUG";
    /**
     * Detailed trace level logging should only be used for development, should only be set
     * in a development environment.
     */ DiagLogLevel[DiagLogLevel["VERBOSE"] = 80] = "VERBOSE";
    /** Used to set the logging level to include all logging */ DiagLogLevel[DiagLogLevel["ALL"] = 9999] = "ALL";
})($2fde396648409cca$export$b7d7b4c0f3c95263 || ($2fde396648409cca$export$b7d7b4c0f3c95263 = {}));

});



parcelRegister("31ebd", function(module, exports) {

$parcel$export(module.exports, "BaggageImpl", () => $232c76e9d5a59688$export$b8c511fa1a5f4987);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $232c76e9d5a59688$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $232c76e9d5a59688$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $232c76e9d5a59688$export$b8c511fa1a5f4987 = /** @class */ function() {
    function BaggageImpl(entries) {
        this._entries = entries ? new Map(entries) : new Map();
    }
    BaggageImpl.prototype.getEntry = function(key) {
        var entry = this._entries.get(key);
        if (!entry) return undefined;
        return Object.assign({}, entry);
    };
    BaggageImpl.prototype.getAllEntries = function() {
        return Array.from(this._entries.entries()).map(function(_a) {
            var _b = $232c76e9d5a59688$var$__read(_a, 2), k = _b[0], v = _b[1];
            return [
                k,
                v
            ];
        });
    };
    BaggageImpl.prototype.setEntry = function(key, entry) {
        var newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
    };
    BaggageImpl.prototype.removeEntry = function(key) {
        var newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
    };
    BaggageImpl.prototype.removeEntries = function() {
        var e_1, _a;
        var keys = [];
        for(var _i = 0; _i < arguments.length; _i++)keys[_i] = arguments[_i];
        var newBaggage = new BaggageImpl(this._entries);
        try {
            for(var keys_1 = $232c76e9d5a59688$var$__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()){
                var key = keys_1_1.value;
                newBaggage._entries.delete(key);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        return newBaggage;
    };
    BaggageImpl.prototype.clear = function() {
        return new BaggageImpl();
    };
    return BaggageImpl;
}();

});

parcelRegister("eKeqA", function(module, exports) {

$parcel$export(module.exports, "baggageEntryMetadataSymbol", () => $abc08d9c01cc126a$export$92dd2fe8ddb5cb7);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Symbol used to make BaggageEntryMetadata an opaque type
 */ var $abc08d9c01cc126a$export$92dd2fe8ddb5cb7 = Symbol("BaggageEntryMetadata");

});


parcelRegister("cE6pj", function(module, exports) {

$parcel$export(module.exports, "createContextKey", () => $934e30cdbca38464$export$b8c322c5a7cfce78);
$parcel$export(module.exports, "ROOT_CONTEXT", () => $934e30cdbca38464$export$78df28f9b2f9a7dc);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Get a key to uniquely identify a context value */ function $934e30cdbca38464$export$b8c322c5a7cfce78(description) {
    // The specification states that for the same input, multiple calls should
    // return different keys. Due to the nature of the JS dependency management
    // system, this creates problems where multiple versions of some package
    // could hold different keys for the same property.
    //
    // Therefore, we use Symbol.for which returns the same key for the same input.
    return Symbol.for(description);
}
var $934e30cdbca38464$var$BaseContext = /** @class */ function() {
    /**
     * Construct a new context which inherits values from an optional parent context.
     *
     * @param parentContext a context from which to inherit values
     */ function BaseContext(parentContext) {
        // for minification
        var self = this;
        self._currentContext = parentContext ? new Map(parentContext) : new Map();
        self.getValue = function(key) {
            return self._currentContext.get(key);
        };
        self.setValue = function(key, value) {
            var context = new BaseContext(self._currentContext);
            context._currentContext.set(key, value);
            return context;
        };
        self.deleteValue = function(key) {
            var context = new BaseContext(self._currentContext);
            context._currentContext.delete(key);
            return context;
        };
    }
    return BaseContext;
}();
var $934e30cdbca38464$export$78df28f9b2f9a7dc = new $934e30cdbca38464$var$BaseContext();

});

parcelRegister("cOtp4", function(module, exports) {

$parcel$export(module.exports, "DiagConsoleLogger", () => $9540f66f2eb7e1fe$export$c55926ac8e698339);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $9540f66f2eb7e1fe$var$consoleMap = [
    {
        n: "error",
        c: "error"
    },
    {
        n: "warn",
        c: "warn"
    },
    {
        n: "info",
        c: "info"
    },
    {
        n: "debug",
        c: "debug"
    },
    {
        n: "verbose",
        c: "trace"
    }
];
/**
 * A simple Immutable Console based diagnostic logger which will output any messages to the Console.
 * If you want to limit the amount of logging to a specific level or lower use the
 * {@link createLogLevelDiagLogger}
 */ var $9540f66f2eb7e1fe$export$c55926ac8e698339 = /** @class */ function() {
    function DiagConsoleLogger() {
        function _consoleFunc(funcName) {
            return function() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                if (console) {
                    // Some environments only expose the console when the F12 developer console is open
                    // eslint-disable-next-line no-console
                    var theFunc = console[funcName];
                    if (typeof theFunc !== "function") // Not all environments support all functions
                    // eslint-disable-next-line no-console
                    theFunc = console.log;
                    // One last final check
                    if (typeof theFunc === "function") return theFunc.apply(console, args);
                }
            };
        }
        for(var i = 0; i < $9540f66f2eb7e1fe$var$consoleMap.length; i++)this[$9540f66f2eb7e1fe$var$consoleMap[i].n] = _consoleFunc($9540f66f2eb7e1fe$var$consoleMap[i].c);
    }
    return DiagConsoleLogger;
}();

});

parcelRegister("3farI", function(module, exports) {

$parcel$export(module.exports, "ValueType", () => $25cae033094ccbf5$export$f1921b45c66f982c);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** The Type of value. It describes how the data is reported. */ var $25cae033094ccbf5$export$f1921b45c66f982c;
(function(ValueType) {
    ValueType[ValueType["INT"] = 0] = "INT";
    ValueType[ValueType["DOUBLE"] = 1] = "DOUBLE";
})($25cae033094ccbf5$export$f1921b45c66f982c || ($25cae033094ccbf5$export$f1921b45c66f982c = {}));

});

parcelRegister("3jGzM", function(module, exports) {

$parcel$export(module.exports, "SamplingDecision", () => $26a42c328c7d67cf$export$94df7a7a96a92f7b);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @deprecated use the one declared in @opentelemetry/sdk-trace-base instead.
 * A sampling decision that determines how a {@link Span} will be recorded
 * and collected.
 */ var $26a42c328c7d67cf$export$94df7a7a96a92f7b;
(function(SamplingDecision) {
    /**
     * `Span.isRecording() === false`, span will not be recorded and all events
     * and attributes will be dropped.
     */ SamplingDecision[SamplingDecision["NOT_RECORD"] = 0] = "NOT_RECORD";
    /**
     * `Span.isRecording() === true`, but `Sampled` flag in {@link TraceFlags}
     * MUST NOT be set.
     */ SamplingDecision[SamplingDecision["RECORD"] = 1] = "RECORD";
    /**
     * `Span.isRecording() === true` AND `Sampled` flag in {@link TraceFlags}
     * MUST be set.
     */ SamplingDecision[SamplingDecision["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})($26a42c328c7d67cf$export$94df7a7a96a92f7b || ($26a42c328c7d67cf$export$94df7a7a96a92f7b = {}));

});

parcelRegister("h9EcL", function(module, exports) {

$parcel$export(module.exports, "SpanKind", () => $c7d276c8670f28c2$export$4da4ea8145910e8b);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $c7d276c8670f28c2$export$4da4ea8145910e8b;
(function(SpanKind) {
    /** Default value. Indicates that the span is used internally. */ SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
    /**
     * Indicates that the span covers server-side handling of an RPC or other
     * remote request.
     */ SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
    /**
     * Indicates that the span covers the client-side wrapper around an RPC or
     * other remote request.
     */ SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
    /**
     * Indicates that the span describes producer sending a message to a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */ SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
    /**
     * Indicates that the span describes consumer receiving a message from a
     * broker. Unlike client and server, there is no direct critical path latency
     * relationship between producer and consumer spans.
     */ SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
})($c7d276c8670f28c2$export$4da4ea8145910e8b || ($c7d276c8670f28c2$export$4da4ea8145910e8b = {}));

});

parcelRegister("6lUa6", function(module, exports) {

$parcel$export(module.exports, "SpanStatusCode", () => $4a0044d2fb535a6a$export$1e28dd9b5d01db83);
/**
 * An enumeration of status codes.
 */ var $4a0044d2fb535a6a$export$1e28dd9b5d01db83;
(function(SpanStatusCode) {
    /**
     * The default status.
     */ SpanStatusCode[SpanStatusCode["UNSET"] = 0] = "UNSET";
    /**
     * The operation has been validated by an Application developer or
     * Operator to have completed successfully.
     */ SpanStatusCode[SpanStatusCode["OK"] = 1] = "OK";
    /**
     * The operation contains an error.
     */ SpanStatusCode[SpanStatusCode["ERROR"] = 2] = "ERROR";
})($4a0044d2fb535a6a$export$1e28dd9b5d01db83 || ($4a0044d2fb535a6a$export$1e28dd9b5d01db83 = {}));

});

parcelRegister("AvSm7", function(module, exports) {

$parcel$export(module.exports, "TraceFlags", () => $06dc16c226890360$export$bf9049ad2b0883ff);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $06dc16c226890360$export$bf9049ad2b0883ff;
(function(TraceFlags) {
    /** Represents no flag set. */ TraceFlags[TraceFlags["NONE"] = 0] = "NONE";
    /** Bit to represent whether trace is sampled in trace flags. */ TraceFlags[TraceFlags["SAMPLED"] = 1] = "SAMPLED";
})($06dc16c226890360$export$bf9049ad2b0883ff || ($06dc16c226890360$export$bf9049ad2b0883ff = {}));

});

parcelRegister("cn2YZ", function(module, exports) {

$parcel$export(module.exports, "isValidTraceId", () => $9019f25568a7d9bd$export$29dd34cf1269f6da);
$parcel$export(module.exports, "isSpanContextValid", () => $9019f25568a7d9bd$export$e4373b9a2c09216c);
$parcel$export(module.exports, "wrapSpanContext", () => $9019f25568a7d9bd$export$c19cc0f1911bdb85);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $lQKpB = parcelRequire("lQKpB");

var $5JICn = parcelRequire("5JICn");
var $9019f25568a7d9bd$var$VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
var $9019f25568a7d9bd$var$VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function $9019f25568a7d9bd$export$29dd34cf1269f6da(traceId) {
    return $9019f25568a7d9bd$var$VALID_TRACEID_REGEX.test(traceId) && traceId !== (0, $lQKpB.INVALID_TRACEID);
}
function $9019f25568a7d9bd$export$8e51c6d8f0586aff(spanId) {
    return $9019f25568a7d9bd$var$VALID_SPANID_REGEX.test(spanId) && spanId !== (0, $lQKpB.INVALID_SPANID);
}
function $9019f25568a7d9bd$export$e4373b9a2c09216c(spanContext) {
    return $9019f25568a7d9bd$export$29dd34cf1269f6da(spanContext.traceId) && $9019f25568a7d9bd$export$8e51c6d8f0586aff(spanContext.spanId);
}
function $9019f25568a7d9bd$export$c19cc0f1911bdb85(spanContext) {
    return new (0, $5JICn.NonRecordingSpan)(spanContext);
}

});
parcelRegister("lQKpB", function(module, exports) {

$parcel$export(module.exports, "INVALID_SPANID", () => $fe8274c1e0ccb802$export$55cc39fb0d4bb4c0);
$parcel$export(module.exports, "INVALID_TRACEID", () => $fe8274c1e0ccb802$export$22be96e88d95e128);
$parcel$export(module.exports, "INVALID_SPAN_CONTEXT", () => $fe8274c1e0ccb802$export$8591e4c852b66703);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $AvSm7 = parcelRequire("AvSm7");
var $fe8274c1e0ccb802$export$55cc39fb0d4bb4c0 = "0000000000000000";
var $fe8274c1e0ccb802$export$22be96e88d95e128 = "00000000000000000000000000000000";
var $fe8274c1e0ccb802$export$8591e4c852b66703 = {
    traceId: $fe8274c1e0ccb802$export$22be96e88d95e128,
    spanId: $fe8274c1e0ccb802$export$55cc39fb0d4bb4c0,
    traceFlags: (0, $AvSm7.TraceFlags).NONE
};

});

parcelRegister("5JICn", function(module, exports) {

$parcel$export(module.exports, "NonRecordingSpan", () => $42d3c3f1fe42fcae$export$972d28f7c6a8c6c7);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $lQKpB = parcelRequire("lQKpB");
/**
 * The NonRecordingSpan is the default {@link Span} that is used when no Span
 * implementation is available. All operations are no-op including context
 * propagation.
 */ var $42d3c3f1fe42fcae$export$972d28f7c6a8c6c7 = /** @class */ function() {
    function NonRecordingSpan(_spanContext) {
        if (_spanContext === void 0) _spanContext = (0, $lQKpB.INVALID_SPAN_CONTEXT);
        this._spanContext = _spanContext;
    }
    // Returns a SpanContext.
    NonRecordingSpan.prototype.spanContext = function() {
        return this._spanContext;
    };
    // By default does nothing
    NonRecordingSpan.prototype.setAttribute = function(_key, _value) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.setAttributes = function(_attributes) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.addEvent = function(_name, _attributes) {
        return this;
    };
    NonRecordingSpan.prototype.addLink = function(_link) {
        return this;
    };
    NonRecordingSpan.prototype.addLinks = function(_links) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.setStatus = function(_status) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.updateName = function(_name) {
        return this;
    };
    // By default does nothing
    NonRecordingSpan.prototype.end = function(_endTime) {};
    // isRecording always returns false for NonRecordingSpan.
    NonRecordingSpan.prototype.isRecording = function() {
        return false;
    };
    // By default does nothing
    NonRecordingSpan.prototype.recordException = function(_exception, _time) {};
    return NonRecordingSpan;
}();

});


parcelRegister("hfZRB", function(module, exports) {

$parcel$export(module.exports, "context", () => $c903d3361d9a81c0$export$a078c61943f9dbbe);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.

var $3MPL4 = parcelRequire("3MPL4");
var $c903d3361d9a81c0$export$a078c61943f9dbbe = (0, $3MPL4.ContextAPI).getInstance();

});
parcelRegister("3MPL4", function(module, exports) {

$parcel$export(module.exports, "ContextAPI", () => $2c1e00df66d39ade$export$4148866f0a453927);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cHzHf = parcelRequire("cHzHf");

var $drRwX = parcelRequire("drRwX");

var $87noO = parcelRequire("87noO");
var $2c1e00df66d39ade$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $2c1e00df66d39ade$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $2c1e00df66d39ade$var$API_NAME = "context";
var $2c1e00df66d39ade$var$NOOP_CONTEXT_MANAGER = new (0, $cHzHf.NoopContextManager)();
/**
 * Singleton object which represents the entry point to the OpenTelemetry Context API
 */ var $2c1e00df66d39ade$export$4148866f0a453927 = /** @class */ function() {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ function ContextAPI() {}
    /** Get the singleton instance of the Context API */ ContextAPI.getInstance = function() {
        if (!this._instance) this._instance = new ContextAPI();
        return this._instance;
    };
    /**
     * Set the current context manager.
     *
     * @returns true if the context manager was successfully registered, else false
     */ ContextAPI.prototype.setGlobalContextManager = function(contextManager) {
        return (0, $drRwX.registerGlobal)($2c1e00df66d39ade$var$API_NAME, contextManager, (0, $87noO.DiagAPI).instance());
    };
    /**
     * Get the currently active context
     */ ContextAPI.prototype.active = function() {
        return this._getContextManager().active();
    };
    /**
     * Execute a function with an active context
     *
     * @param context context to be active during function execution
     * @param fn function to execute in a context
     * @param thisArg optional receiver to be used for calling fn
     * @param args optional arguments forwarded to fn
     */ ContextAPI.prototype.with = function(context, fn, thisArg) {
        var _a;
        var args = [];
        for(var _i = 3; _i < arguments.length; _i++)args[_i - 3] = arguments[_i];
        return (_a = this._getContextManager()).with.apply(_a, $2c1e00df66d39ade$var$__spreadArray([
            context,
            fn,
            thisArg
        ], $2c1e00df66d39ade$var$__read(args), false));
    };
    /**
     * Bind a context to a target function or event emitter
     *
     * @param context context to bind to the event emitter or function. Defaults to the currently active context
     * @param target function or event emitter to bind
     */ ContextAPI.prototype.bind = function(context, target) {
        return this._getContextManager().bind(context, target);
    };
    ContextAPI.prototype._getContextManager = function() {
        return (0, $drRwX.getGlobal)($2c1e00df66d39ade$var$API_NAME) || $2c1e00df66d39ade$var$NOOP_CONTEXT_MANAGER;
    };
    /** Disable and remove the global context manager */ ContextAPI.prototype.disable = function() {
        this._getContextManager().disable();
        (0, $drRwX.unregisterGlobal)($2c1e00df66d39ade$var$API_NAME, (0, $87noO.DiagAPI).instance());
    };
    return ContextAPI;
}();

});
parcelRegister("cHzHf", function(module, exports) {

$parcel$export(module.exports, "NoopContextManager", () => $93f530ca77f439c2$export$a27e5df35d1539a6);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cE6pj = parcelRequire("cE6pj");
var $93f530ca77f439c2$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $93f530ca77f439c2$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $93f530ca77f439c2$export$a27e5df35d1539a6 = /** @class */ function() {
    function NoopContextManager() {}
    NoopContextManager.prototype.active = function() {
        return 0, $cE6pj.ROOT_CONTEXT;
    };
    NoopContextManager.prototype.with = function(_context, fn, thisArg) {
        var args = [];
        for(var _i = 3; _i < arguments.length; _i++)args[_i - 3] = arguments[_i];
        return fn.call.apply(fn, $93f530ca77f439c2$var$__spreadArray([
            thisArg
        ], $93f530ca77f439c2$var$__read(args), false));
    };
    NoopContextManager.prototype.bind = function(_context, target) {
        return target;
    };
    NoopContextManager.prototype.enable = function() {
        return this;
    };
    NoopContextManager.prototype.disable = function() {
        return this;
    };
    return NoopContextManager;
}();

});



parcelRegister("ljza4", function(module, exports) {

$parcel$export(module.exports, "diag", () => $f846a5aaeff49c57$export$c042e7c2f59bc046);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.

var $87noO = parcelRequire("87noO");
var $f846a5aaeff49c57$export$c042e7c2f59bc046 = (0, $87noO.DiagAPI).instance();

});

parcelRegister("7KVqm", function(module, exports) {

$parcel$export(module.exports, "metrics", () => $5a595f8022e2c266$export$b0c5c2fac8144e54);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.

var $axvOj = parcelRequire("axvOj");
var $5a595f8022e2c266$export$b0c5c2fac8144e54 = (0, $axvOj.MetricsAPI).getInstance();

});
parcelRegister("axvOj", function(module, exports) {

$parcel$export(module.exports, "MetricsAPI", () => $7ac5a95b2a1a9bd6$export$1339f6eb6111c638);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $537rJ = parcelRequire("537rJ");

var $drRwX = parcelRequire("drRwX");

var $87noO = parcelRequire("87noO");
var $7ac5a95b2a1a9bd6$var$API_NAME = "metrics";
/**
 * Singleton object which represents the entry point to the OpenTelemetry Metrics API
 */ var $7ac5a95b2a1a9bd6$export$1339f6eb6111c638 = /** @class */ function() {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ function MetricsAPI() {}
    /** Get the singleton instance of the Metrics API */ MetricsAPI.getInstance = function() {
        if (!this._instance) this._instance = new MetricsAPI();
        return this._instance;
    };
    /**
     * Set the current global meter provider.
     * Returns true if the meter provider was successfully registered, else false.
     */ MetricsAPI.prototype.setGlobalMeterProvider = function(provider) {
        return (0, $drRwX.registerGlobal)($7ac5a95b2a1a9bd6$var$API_NAME, provider, (0, $87noO.DiagAPI).instance());
    };
    /**
     * Returns the global meter provider.
     */ MetricsAPI.prototype.getMeterProvider = function() {
        return (0, $drRwX.getGlobal)($7ac5a95b2a1a9bd6$var$API_NAME) || (0, $537rJ.NOOP_METER_PROVIDER);
    };
    /**
     * Returns a meter from the global meter provider.
     */ MetricsAPI.prototype.getMeter = function(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
    };
    /** Remove the global meter provider */ MetricsAPI.prototype.disable = function() {
        (0, $drRwX.unregisterGlobal)($7ac5a95b2a1a9bd6$var$API_NAME, (0, $87noO.DiagAPI).instance());
    };
    return MetricsAPI;
}();

});
parcelRegister("537rJ", function(module, exports) {

$parcel$export(module.exports, "NOOP_METER_PROVIDER", () => $3ad3024196ff307f$export$d21fe83355c56e18);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $1Cfz9 = parcelRequire("1Cfz9");
/**
 * An implementation of the {@link MeterProvider} which returns an impotent Meter
 * for all calls to `getMeter`
 */ var $3ad3024196ff307f$export$51c513ea08316108 = /** @class */ function() {
    function NoopMeterProvider() {}
    NoopMeterProvider.prototype.getMeter = function(_name, _version, _options) {
        return 0, $1Cfz9.NOOP_METER;
    };
    return NoopMeterProvider;
}();
var $3ad3024196ff307f$export$d21fe83355c56e18 = new $3ad3024196ff307f$export$51c513ea08316108();

});
parcelRegister("1Cfz9", function(module, exports) {

$parcel$export(module.exports, "NOOP_METER", () => $12d56a20e98a76a5$export$65e277d35235a01f);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $12d56a20e98a76a5$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * NoopMeter is a noop implementation of the {@link Meter} interface. It reuses
 * constant NoopMetrics for all of its methods.
 */ var $12d56a20e98a76a5$export$c23c6f85dd4fc1e9 = /** @class */ function() {
    function NoopMeter() {}
    /**
     * @see {@link Meter.createGauge}
     */ NoopMeter.prototype.createGauge = function(_name, _options) {
        return $12d56a20e98a76a5$export$dd01300aacbcec1c;
    };
    /**
     * @see {@link Meter.createHistogram}
     */ NoopMeter.prototype.createHistogram = function(_name, _options) {
        return $12d56a20e98a76a5$export$689c32a6a552e1a6;
    };
    /**
     * @see {@link Meter.createCounter}
     */ NoopMeter.prototype.createCounter = function(_name, _options) {
        return $12d56a20e98a76a5$export$e6d19fe5233efc54;
    };
    /**
     * @see {@link Meter.createUpDownCounter}
     */ NoopMeter.prototype.createUpDownCounter = function(_name, _options) {
        return $12d56a20e98a76a5$export$2f189cd99d2b7429;
    };
    /**
     * @see {@link Meter.createObservableGauge}
     */ NoopMeter.prototype.createObservableGauge = function(_name, _options) {
        return $12d56a20e98a76a5$export$ea67e3c6ff624776;
    };
    /**
     * @see {@link Meter.createObservableCounter}
     */ NoopMeter.prototype.createObservableCounter = function(_name, _options) {
        return $12d56a20e98a76a5$export$163422b94c3edbcb;
    };
    /**
     * @see {@link Meter.createObservableUpDownCounter}
     */ NoopMeter.prototype.createObservableUpDownCounter = function(_name, _options) {
        return $12d56a20e98a76a5$export$5b8be9ab17b673b3;
    };
    /**
     * @see {@link Meter.addBatchObservableCallback}
     */ NoopMeter.prototype.addBatchObservableCallback = function(_callback, _observables) {};
    /**
     * @see {@link Meter.removeBatchObservableCallback}
     */ NoopMeter.prototype.removeBatchObservableCallback = function(_callback) {};
    return NoopMeter;
}();
var $12d56a20e98a76a5$export$834a616d1cf278b = /** @class */ function() {
    function NoopMetric() {}
    return NoopMetric;
}();
var $12d56a20e98a76a5$export$b556ba0f560c45b = /** @class */ function(_super) {
    $12d56a20e98a76a5$var$__extends(NoopCounterMetric, _super);
    function NoopCounterMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoopCounterMetric.prototype.add = function(_value, _attributes) {};
    return NoopCounterMetric;
}($12d56a20e98a76a5$export$834a616d1cf278b);
var $12d56a20e98a76a5$export$df09a35db160df98 = /** @class */ function(_super) {
    $12d56a20e98a76a5$var$__extends(NoopUpDownCounterMetric, _super);
    function NoopUpDownCounterMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoopUpDownCounterMetric.prototype.add = function(_value, _attributes) {};
    return NoopUpDownCounterMetric;
}($12d56a20e98a76a5$export$834a616d1cf278b);
var $12d56a20e98a76a5$export$b7f4a3c7ea16c24 = /** @class */ function(_super) {
    $12d56a20e98a76a5$var$__extends(NoopGaugeMetric, _super);
    function NoopGaugeMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoopGaugeMetric.prototype.record = function(_value, _attributes) {};
    return NoopGaugeMetric;
}($12d56a20e98a76a5$export$834a616d1cf278b);
var $12d56a20e98a76a5$export$ef064c3e0426c607 = /** @class */ function(_super) {
    $12d56a20e98a76a5$var$__extends(NoopHistogramMetric, _super);
    function NoopHistogramMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoopHistogramMetric.prototype.record = function(_value, _attributes) {};
    return NoopHistogramMetric;
}($12d56a20e98a76a5$export$834a616d1cf278b);
var $12d56a20e98a76a5$export$a5a3e7829c289482 = /** @class */ function() {
    function NoopObservableMetric() {}
    NoopObservableMetric.prototype.addCallback = function(_callback) {};
    NoopObservableMetric.prototype.removeCallback = function(_callback) {};
    return NoopObservableMetric;
}();
var $12d56a20e98a76a5$export$7a7e4b169d5c93a8 = /** @class */ function(_super) {
    $12d56a20e98a76a5$var$__extends(NoopObservableCounterMetric, _super);
    function NoopObservableCounterMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoopObservableCounterMetric;
}($12d56a20e98a76a5$export$a5a3e7829c289482);
var $12d56a20e98a76a5$export$6990a2f90809ffc1 = /** @class */ function(_super) {
    $12d56a20e98a76a5$var$__extends(NoopObservableGaugeMetric, _super);
    function NoopObservableGaugeMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoopObservableGaugeMetric;
}($12d56a20e98a76a5$export$a5a3e7829c289482);
var $12d56a20e98a76a5$export$3ec3555bc6f693a4 = /** @class */ function(_super) {
    $12d56a20e98a76a5$var$__extends(NoopObservableUpDownCounterMetric, _super);
    function NoopObservableUpDownCounterMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoopObservableUpDownCounterMetric;
}($12d56a20e98a76a5$export$a5a3e7829c289482);
var $12d56a20e98a76a5$export$65e277d35235a01f = new $12d56a20e98a76a5$export$c23c6f85dd4fc1e9();
var $12d56a20e98a76a5$export$e6d19fe5233efc54 = new $12d56a20e98a76a5$export$b556ba0f560c45b();
var $12d56a20e98a76a5$export$dd01300aacbcec1c = new $12d56a20e98a76a5$export$b7f4a3c7ea16c24();
var $12d56a20e98a76a5$export$689c32a6a552e1a6 = new $12d56a20e98a76a5$export$ef064c3e0426c607();
var $12d56a20e98a76a5$export$2f189cd99d2b7429 = new $12d56a20e98a76a5$export$df09a35db160df98();
var $12d56a20e98a76a5$export$163422b94c3edbcb = new $12d56a20e98a76a5$export$7a7e4b169d5c93a8();
var $12d56a20e98a76a5$export$ea67e3c6ff624776 = new $12d56a20e98a76a5$export$6990a2f90809ffc1();
var $12d56a20e98a76a5$export$5b8be9ab17b673b3 = new $12d56a20e98a76a5$export$3ec3555bc6f693a4();
function $12d56a20e98a76a5$export$bc3a498ccbb5c2b5() {
    return $12d56a20e98a76a5$export$65e277d35235a01f;
}

});




parcelRegister("4tmHU", function(module, exports) {

$parcel$export(module.exports, "propagation", () => $341b7c0814521fae$export$3e49040daa9dba20);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.

var $ccs91 = parcelRequire("ccs91");
var $341b7c0814521fae$export$3e49040daa9dba20 = (0, $ccs91.PropagationAPI).getInstance();

});
parcelRegister("ccs91", function(module, exports) {

$parcel$export(module.exports, "PropagationAPI", () => $8e1c6ff2aba1075e$export$471eda0a6213cac9);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $drRwX = parcelRequire("drRwX");

var $1CX2R = parcelRequire("1CX2R");

var $dOP2u = parcelRequire("dOP2u");

var $bUlmp = parcelRequire("bUlmp");

var $i04fT = parcelRequire("i04fT");

var $87noO = parcelRequire("87noO");
var $8e1c6ff2aba1075e$var$API_NAME = "propagation";
var $8e1c6ff2aba1075e$var$NOOP_TEXT_MAP_PROPAGATOR = new (0, $1CX2R.NoopTextMapPropagator)();
/**
 * Singleton object which represents the entry point to the OpenTelemetry Propagation API
 */ var $8e1c6ff2aba1075e$export$471eda0a6213cac9 = /** @class */ function() {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ function PropagationAPI() {
        this.createBaggage = (0, $i04fT.createBaggage);
        this.getBaggage = (0, $bUlmp.getBaggage);
        this.getActiveBaggage = (0, $bUlmp.getActiveBaggage);
        this.setBaggage = (0, $bUlmp.setBaggage);
        this.deleteBaggage = (0, $bUlmp.deleteBaggage);
    }
    /** Get the singleton instance of the Propagator API */ PropagationAPI.getInstance = function() {
        if (!this._instance) this._instance = new PropagationAPI();
        return this._instance;
    };
    /**
     * Set the current propagator.
     *
     * @returns true if the propagator was successfully registered, else false
     */ PropagationAPI.prototype.setGlobalPropagator = function(propagator) {
        return (0, $drRwX.registerGlobal)($8e1c6ff2aba1075e$var$API_NAME, propagator, (0, $87noO.DiagAPI).instance());
    };
    /**
     * Inject context into a carrier to be propagated inter-process
     *
     * @param context Context carrying tracing data to inject
     * @param carrier carrier to inject context into
     * @param setter Function used to set values on the carrier
     */ PropagationAPI.prototype.inject = function(context, carrier, setter) {
        if (setter === void 0) setter = (0, $dOP2u.defaultTextMapSetter);
        return this._getGlobalPropagator().inject(context, carrier, setter);
    };
    /**
     * Extract context from a carrier
     *
     * @param context Context which the newly created context will inherit from
     * @param carrier Carrier to extract context from
     * @param getter Function used to extract keys from a carrier
     */ PropagationAPI.prototype.extract = function(context, carrier, getter) {
        if (getter === void 0) getter = (0, $dOP2u.defaultTextMapGetter);
        return this._getGlobalPropagator().extract(context, carrier, getter);
    };
    /**
     * Return a list of all fields which may be used by the propagator.
     */ PropagationAPI.prototype.fields = function() {
        return this._getGlobalPropagator().fields();
    };
    /** Remove the global propagator */ PropagationAPI.prototype.disable = function() {
        (0, $drRwX.unregisterGlobal)($8e1c6ff2aba1075e$var$API_NAME, (0, $87noO.DiagAPI).instance());
    };
    PropagationAPI.prototype._getGlobalPropagator = function() {
        return (0, $drRwX.getGlobal)($8e1c6ff2aba1075e$var$API_NAME) || $8e1c6ff2aba1075e$var$NOOP_TEXT_MAP_PROPAGATOR;
    };
    return PropagationAPI;
}();

});
parcelRegister("1CX2R", function(module, exports) {

$parcel$export(module.exports, "NoopTextMapPropagator", () => $12f72436c69ef3e7$export$8356c7eb3af7963b);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * No-op implementations of {@link TextMapPropagator}.
 */ var $12f72436c69ef3e7$export$8356c7eb3af7963b = /** @class */ function() {
    function NoopTextMapPropagator() {}
    /** Noop inject function does nothing */ NoopTextMapPropagator.prototype.inject = function(_context, _carrier) {};
    /** Noop extract function does nothing and returns the input context */ NoopTextMapPropagator.prototype.extract = function(context, _carrier) {
        return context;
    };
    NoopTextMapPropagator.prototype.fields = function() {
        return [];
    };
    return NoopTextMapPropagator;
}();

});

parcelRegister("dOP2u", function(module, exports) {

$parcel$export(module.exports, "defaultTextMapGetter", () => $a0f789348e91e5dc$export$a0f575f55f38720a);
$parcel$export(module.exports, "defaultTextMapSetter", () => $a0f789348e91e5dc$export$f70f1d111fccf1c1);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $a0f789348e91e5dc$export$a0f575f55f38720a = {
    get: function(carrier, key) {
        if (carrier == null) return undefined;
        return carrier[key];
    },
    keys: function(carrier) {
        if (carrier == null) return [];
        return Object.keys(carrier);
    }
};
var $a0f789348e91e5dc$export$f70f1d111fccf1c1 = {
    set: function(carrier, key, value) {
        if (carrier == null) return;
        carrier[key] = value;
    }
};

});

parcelRegister("bUlmp", function(module, exports) {

$parcel$export(module.exports, "getBaggage", () => $8ab57e672f0aaaa7$export$f3bffa0b5dd10d1e);
$parcel$export(module.exports, "getActiveBaggage", () => $8ab57e672f0aaaa7$export$120a1756099436ee);
$parcel$export(module.exports, "setBaggage", () => $8ab57e672f0aaaa7$export$adc9ca19eab3f500);
$parcel$export(module.exports, "deleteBaggage", () => $8ab57e672f0aaaa7$export$4ca3a8a743c9f633);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $3MPL4 = parcelRequire("3MPL4");

var $cE6pj = parcelRequire("cE6pj");
/**
 * Baggage key
 */ var $8ab57e672f0aaaa7$var$BAGGAGE_KEY = (0, $cE6pj.createContextKey)("OpenTelemetry Baggage Key");
function $8ab57e672f0aaaa7$export$f3bffa0b5dd10d1e(context) {
    return context.getValue($8ab57e672f0aaaa7$var$BAGGAGE_KEY) || undefined;
}
function $8ab57e672f0aaaa7$export$120a1756099436ee() {
    return $8ab57e672f0aaaa7$export$f3bffa0b5dd10d1e((0, $3MPL4.ContextAPI).getInstance().active());
}
function $8ab57e672f0aaaa7$export$adc9ca19eab3f500(context, baggage) {
    return context.setValue($8ab57e672f0aaaa7$var$BAGGAGE_KEY, baggage);
}
function $8ab57e672f0aaaa7$export$4ca3a8a743c9f633(context) {
    return context.deleteValue($8ab57e672f0aaaa7$var$BAGGAGE_KEY);
}

});



parcelRegister("ibuLL", function(module, exports) {

$parcel$export(module.exports, "trace", () => $d3d11f3bc96c5059$export$357889f174732d38);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Split module-level variable definition into separate files to allow
// tree-shaking on each api instance.

var $bfFGa = parcelRequire("bfFGa");
var $d3d11f3bc96c5059$export$357889f174732d38 = (0, $bfFGa.TraceAPI).getInstance();

});
parcelRegister("bfFGa", function(module, exports) {

$parcel$export(module.exports, "TraceAPI", () => $83116d02b018c52b$export$2cccde6fcc7b568a);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $drRwX = parcelRequire("drRwX");

var $fSiG3 = parcelRequire("fSiG3");

var $cn2YZ = parcelRequire("cn2YZ");

var $kA3Tr = parcelRequire("kA3Tr");

var $87noO = parcelRequire("87noO");
var $83116d02b018c52b$var$API_NAME = "trace";
/**
 * Singleton object which represents the entry point to the OpenTelemetry Tracing API
 */ var $83116d02b018c52b$export$2cccde6fcc7b568a = /** @class */ function() {
    /** Empty private constructor prevents end users from constructing a new instance of the API */ function TraceAPI() {
        this._proxyTracerProvider = new (0, $fSiG3.ProxyTracerProvider)();
        this.wrapSpanContext = (0, $cn2YZ.wrapSpanContext);
        this.isSpanContextValid = (0, $cn2YZ.isSpanContextValid);
        this.deleteSpan = (0, $kA3Tr.deleteSpan);
        this.getSpan = (0, $kA3Tr.getSpan);
        this.getActiveSpan = (0, $kA3Tr.getActiveSpan);
        this.getSpanContext = (0, $kA3Tr.getSpanContext);
        this.setSpan = (0, $kA3Tr.setSpan);
        this.setSpanContext = (0, $kA3Tr.setSpanContext);
    }
    /** Get the singleton instance of the Trace API */ TraceAPI.getInstance = function() {
        if (!this._instance) this._instance = new TraceAPI();
        return this._instance;
    };
    /**
     * Set the current global tracer.
     *
     * @returns true if the tracer provider was successfully registered, else false
     */ TraceAPI.prototype.setGlobalTracerProvider = function(provider) {
        var success = (0, $drRwX.registerGlobal)($83116d02b018c52b$var$API_NAME, this._proxyTracerProvider, (0, $87noO.DiagAPI).instance());
        if (success) this._proxyTracerProvider.setDelegate(provider);
        return success;
    };
    /**
     * Returns the global tracer provider.
     */ TraceAPI.prototype.getTracerProvider = function() {
        return (0, $drRwX.getGlobal)($83116d02b018c52b$var$API_NAME) || this._proxyTracerProvider;
    };
    /**
     * Returns a tracer from the global tracer provider.
     */ TraceAPI.prototype.getTracer = function(name, version) {
        return this.getTracerProvider().getTracer(name, version);
    };
    /** Remove the global tracer provider */ TraceAPI.prototype.disable = function() {
        (0, $drRwX.unregisterGlobal)($83116d02b018c52b$var$API_NAME, (0, $87noO.DiagAPI).instance());
        this._proxyTracerProvider = new (0, $fSiG3.ProxyTracerProvider)();
    };
    return TraceAPI;
}();

});
parcelRegister("fSiG3", function(module, exports) {

$parcel$export(module.exports, "ProxyTracerProvider", () => $b8ea63161ee7a92e$export$4137aabcb4254962);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $g56gM = parcelRequire("g56gM");

var $jM2m6 = parcelRequire("jM2m6");
var $b8ea63161ee7a92e$var$NOOP_TRACER_PROVIDER = new (0, $jM2m6.NoopTracerProvider)();
/**
 * Tracer provider which provides {@link ProxyTracer}s.
 *
 * Before a delegate is set, tracers provided are NoOp.
 *   When a delegate is set, traces are provided from the delegate.
 *   When a delegate is set after tracers have already been provided,
 *   all tracers already provided will use the provided delegate implementation.
 */ var $b8ea63161ee7a92e$export$4137aabcb4254962 = /** @class */ function() {
    function ProxyTracerProvider() {}
    /**
     * Get a {@link ProxyTracer}
     */ ProxyTracerProvider.prototype.getTracer = function(name, version, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new (0, $g56gM.ProxyTracer)(this, name, version, options);
    };
    ProxyTracerProvider.prototype.getDelegate = function() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : $b8ea63161ee7a92e$var$NOOP_TRACER_PROVIDER;
    };
    /**
     * Set the delegate tracer provider
     */ ProxyTracerProvider.prototype.setDelegate = function(delegate) {
        this._delegate = delegate;
    };
    ProxyTracerProvider.prototype.getDelegateTracer = function(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
    };
    return ProxyTracerProvider;
}();

});
parcelRegister("g56gM", function(module, exports) {

$parcel$export(module.exports, "ProxyTracer", () => $bb51fa02f6f6c2c6$export$df2c38268c6bb6b3);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $6qWRC = parcelRequire("6qWRC");
var $bb51fa02f6f6c2c6$var$NOOP_TRACER = new (0, $6qWRC.NoopTracer)();
/**
 * Proxy tracer provided by the proxy tracer provider
 */ var $bb51fa02f6f6c2c6$export$df2c38268c6bb6b3 = /** @class */ function() {
    function ProxyTracer(_provider, name, version, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version;
        this.options = options;
    }
    ProxyTracer.prototype.startSpan = function(name, options, context) {
        return this._getTracer().startSpan(name, options, context);
    };
    ProxyTracer.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
        var tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
    };
    /**
     * Try to get a tracer from the proxy tracer provider.
     * If the proxy tracer provider has no delegate, return a noop tracer.
     */ ProxyTracer.prototype._getTracer = function() {
        if (this._delegate) return this._delegate;
        var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) return $bb51fa02f6f6c2c6$var$NOOP_TRACER;
        this._delegate = tracer;
        return this._delegate;
    };
    return ProxyTracer;
}();

});
parcelRegister("6qWRC", function(module, exports) {

$parcel$export(module.exports, "NoopTracer", () => $4af2d4e4dda2e75d$export$714c1036cabcd223);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $3MPL4 = parcelRequire("3MPL4");

var $kA3Tr = parcelRequire("kA3Tr");

var $5JICn = parcelRequire("5JICn");

var $cn2YZ = parcelRequire("cn2YZ");
var $4af2d4e4dda2e75d$var$contextApi = (0, $3MPL4.ContextAPI).getInstance();
/**
 * No-op implementations of {@link Tracer}.
 */ var $4af2d4e4dda2e75d$export$714c1036cabcd223 = /** @class */ function() {
    function NoopTracer() {}
    // startSpan starts a noop span.
    NoopTracer.prototype.startSpan = function(name, options, context) {
        if (context === void 0) context = $4af2d4e4dda2e75d$var$contextApi.active();
        var root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) return new (0, $5JICn.NonRecordingSpan)();
        var parentFromContext = context && (0, $kA3Tr.getSpanContext)(context);
        if ($4af2d4e4dda2e75d$var$isSpanContext(parentFromContext) && (0, $cn2YZ.isSpanContextValid)(parentFromContext)) return new (0, $5JICn.NonRecordingSpan)(parentFromContext);
        else return new (0, $5JICn.NonRecordingSpan)();
    };
    NoopTracer.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) return;
        else if (arguments.length === 2) fn = arg2;
        else if (arguments.length === 3) {
            opts = arg2;
            fn = arg3;
        } else {
            opts = arg2;
            ctx = arg3;
            fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : $4af2d4e4dda2e75d$var$contextApi.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = (0, $kA3Tr.setSpan)(parentContext, span);
        return $4af2d4e4dda2e75d$var$contextApi.with(contextWithSpanSet, fn, undefined, span);
    };
    return NoopTracer;
}();
function $4af2d4e4dda2e75d$var$isSpanContext(spanContext) {
    return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
}

});
parcelRegister("kA3Tr", function(module, exports) {

$parcel$export(module.exports, "getSpan", () => $efba308f067fe673$export$246e04ba06066af1);
$parcel$export(module.exports, "getActiveSpan", () => $efba308f067fe673$export$1be426a8e585c83e);
$parcel$export(module.exports, "setSpan", () => $efba308f067fe673$export$8ab2f2e6ee8ed0a8);
$parcel$export(module.exports, "deleteSpan", () => $efba308f067fe673$export$a6bbfe9a17f7941c);
$parcel$export(module.exports, "setSpanContext", () => $efba308f067fe673$export$c90bf5428c14cdb1);
$parcel$export(module.exports, "getSpanContext", () => $efba308f067fe673$export$1a635f8f0b912781);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cE6pj = parcelRequire("cE6pj");

var $5JICn = parcelRequire("5JICn");

var $3MPL4 = parcelRequire("3MPL4");
/**
 * span key
 */ var $efba308f067fe673$var$SPAN_KEY = (0, $cE6pj.createContextKey)("OpenTelemetry Context Key SPAN");
function $efba308f067fe673$export$246e04ba06066af1(context) {
    return context.getValue($efba308f067fe673$var$SPAN_KEY) || undefined;
}
function $efba308f067fe673$export$1be426a8e585c83e() {
    return $efba308f067fe673$export$246e04ba06066af1((0, $3MPL4.ContextAPI).getInstance().active());
}
function $efba308f067fe673$export$8ab2f2e6ee8ed0a8(context, span) {
    return context.setValue($efba308f067fe673$var$SPAN_KEY, span);
}
function $efba308f067fe673$export$a6bbfe9a17f7941c(context) {
    return context.deleteValue($efba308f067fe673$var$SPAN_KEY);
}
function $efba308f067fe673$export$c90bf5428c14cdb1(context, spanContext) {
    return $efba308f067fe673$export$8ab2f2e6ee8ed0a8(context, new (0, $5JICn.NonRecordingSpan)(spanContext));
}
function $efba308f067fe673$export$1a635f8f0b912781(context) {
    var _a;
    return (_a = $efba308f067fe673$export$246e04ba06066af1(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
}

});



parcelRegister("jM2m6", function(module, exports) {

$parcel$export(module.exports, "NoopTracerProvider", () => $e65453c96dc5126c$export$87d8e93756f9e86e);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $6qWRC = parcelRequire("6qWRC");
/**
 * An implementation of the {@link TracerProvider} which returns an impotent
 * Tracer for all calls to `getTracer`.
 *
 * All operations are no-op.
 */ var $e65453c96dc5126c$export$87d8e93756f9e86e = /** @class */ function() {
    function NoopTracerProvider() {}
    NoopTracerProvider.prototype.getTracer = function(_name, _version, _options) {
        return new (0, $6qWRC.NoopTracer)();
    };
    return NoopTracerProvider;
}();

});





parcelRegister("4uQt8", function(module, exports) {

$parcel$export(module.exports, "logs", () => $3462a9fd52df50e2$export$fa0831f497706bad);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 







var $5svLb = parcelRequire("5svLb");
var $3462a9fd52df50e2$export$fa0831f497706bad = (0, $5svLb.LogsAPI).getInstance();

});
parcelRegister("5svLb", function(module, exports) {

$parcel$export(module.exports, "LogsAPI", () => $3f9834282d3f1bc8$export$f8e63508eb6a0fc1);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $gWrbU = parcelRequire("gWrbU");

var $5iaTr = parcelRequire("5iaTr");
var $3f9834282d3f1bc8$export$f8e63508eb6a0fc1 = /** @class */ function() {
    function LogsAPI() {}
    LogsAPI.getInstance = function() {
        if (!this._instance) this._instance = new LogsAPI();
        return this._instance;
    };
    LogsAPI.prototype.setGlobalLoggerProvider = function(provider) {
        if ((0, $gWrbU._global)[0, $gWrbU.GLOBAL_LOGS_API_KEY]) return this.getLoggerProvider();
        (0, $gWrbU._global)[0, $gWrbU.GLOBAL_LOGS_API_KEY] = (0, $gWrbU.makeGetter)((0, $gWrbU.API_BACKWARDS_COMPATIBILITY_VERSION), provider, (0, $5iaTr.NOOP_LOGGER_PROVIDER));
        return provider;
    };
    /**
     * Returns the global logger provider.
     *
     * @returns LoggerProvider
     */ LogsAPI.prototype.getLoggerProvider = function() {
        var _a, _b;
        return (_b = (_a = (0, $gWrbU._global)[0, $gWrbU.GLOBAL_LOGS_API_KEY]) === null || _a === void 0 ? void 0 : _a.call((0, $gWrbU._global), (0, $gWrbU.API_BACKWARDS_COMPATIBILITY_VERSION))) !== null && _b !== void 0 ? _b : (0, $5iaTr.NOOP_LOGGER_PROVIDER);
    };
    /**
     * Returns a logger from the global logger provider.
     *
     * @returns Logger
     */ LogsAPI.prototype.getLogger = function(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
    };
    /** Remove the global logger provider */ LogsAPI.prototype.disable = function() {
        delete (0, $gWrbU._global)[0, $gWrbU.GLOBAL_LOGS_API_KEY];
    };
    return LogsAPI;
}();

});
parcelRegister("gWrbU", function(module, exports) {

$parcel$export(module.exports, "GLOBAL_LOGS_API_KEY", () => $c55727afe5e16fcc$export$be5e405504011951);
$parcel$export(module.exports, "_global", () => $c55727afe5e16fcc$export$fb1208122242c205);
$parcel$export(module.exports, "makeGetter", () => $c55727afe5e16fcc$export$bf9e00ce1090794f);
$parcel$export(module.exports, "API_BACKWARDS_COMPATIBILITY_VERSION", () => $c55727afe5e16fcc$export$41e8763f7160bb4);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $3PJze = parcelRequire("3PJze");
var $c55727afe5e16fcc$export$be5e405504011951 = Symbol.for("io.opentelemetry.js.api.logs");
var $c55727afe5e16fcc$export$fb1208122242c205 = (0, $3PJze._globalThis);
function $c55727afe5e16fcc$export$bf9e00ce1090794f(requiredVersion, instance, fallback) {
    return function(version) {
        return version === requiredVersion ? instance : fallback;
    };
}
var $c55727afe5e16fcc$export$41e8763f7160bb4 = 1;

});
parcelRegister("3PJze", function(module, exports) {

$parcel$export(module.exports, "_globalThis", () => $2ca97b3e873a31af$export$5c524ddf7208c00c);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Updates to this file should also be replicated to @opentelemetry/api and
// @opentelemetry/core too.
/**
 * - globalThis (New standard)
 * - self (Will return the current window instance for supported browsers)
 * - window (fallback for older browser implementations)
 * - global (NodeJS implementation)
 * - <object> (When all else fails)
 */ /** only globals that common to node and browsers are allowed */ // eslint-disable-next-line node/no-unsupported-features/es-builtins, no-undef
var $2ca97b3e873a31af$export$5c524ddf7208c00c = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof $parcel$global === "object" ? $parcel$global : {};

});


parcelRegister("5iaTr", function(module, exports) {

$parcel$export(module.exports, "NOOP_LOGGER_PROVIDER", () => $3da715556b452efd$export$ade97358fd6ba8df);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $1o4vw = parcelRequire("1o4vw");
var $3da715556b452efd$export$8d7f6fb42e615208 = /** @class */ function() {
    function NoopLoggerProvider() {}
    NoopLoggerProvider.prototype.getLogger = function(_name, _version, _options) {
        return new (0, $1o4vw.NoopLogger)();
    };
    return NoopLoggerProvider;
}();
var $3da715556b452efd$export$ade97358fd6ba8df = new $3da715556b452efd$export$8d7f6fb42e615208();

});
parcelRegister("1o4vw", function(module, exports) {

$parcel$export(module.exports, "NoopLogger", () => $102b876a01e6c803$export$d16ba98760c74dd5);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $102b876a01e6c803$export$d16ba98760c74dd5 = /** @class */ function() {
    function NoopLogger() {}
    NoopLogger.prototype.emit = function(_logRecord) {};
    return NoopLogger;
}();
var $102b876a01e6c803$export$f5681b99b7ff4eb3 = new $102b876a01e6c803$export$d16ba98760c74dd5();

});




parcelRegister("25c0u", function(module, exports) {

$parcel$export(module.exports, "enableInstrumentations", () => $18455cb4ab530903$export$56a6415128a54b1);
$parcel$export(module.exports, "disableInstrumentations", () => $18455cb4ab530903$export$c7d87b302116dc69);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Enable instrumentations
 * @param instrumentations
 * @param tracerProvider
 * @param meterProvider
 */ function $18455cb4ab530903$export$56a6415128a54b1(instrumentations, tracerProvider, meterProvider, loggerProvider) {
    for(var i = 0, j = instrumentations.length; i < j; i++){
        var instrumentation = instrumentations[i];
        if (tracerProvider) instrumentation.setTracerProvider(tracerProvider);
        if (meterProvider) instrumentation.setMeterProvider(meterProvider);
        if (loggerProvider && instrumentation.setLoggerProvider) instrumentation.setLoggerProvider(loggerProvider);
        // instrumentations have been already enabled during creation
        // so enable only if user prevented that by setting enabled to false
        // this is to prevent double enabling but when calling register all
        // instrumentations should be now enabled
        if (!instrumentation.getConfig().enabled) instrumentation.enable();
    }
}
function $18455cb4ab530903$export$c7d87b302116dc69(instrumentations) {
    instrumentations.forEach(function(instrumentation) {
        return instrumentation.disable();
    });
}

});


parcelRegister("fdqQ1", function(module, exports) {

$parcel$export(module.exports, "detectResourcesSync", () => $b13ce36311cda672$export$a2167465c63b94e6);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $kawsV = parcelRequire("kawsV");
parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $9CzKX = parcelRequire("9CzKX");
var $b13ce36311cda672$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $b13ce36311cda672$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $b13ce36311cda672$export$864233df9af951f2 = function(config) {
    if (config === void 0) config = {};
    return $b13ce36311cda672$var$__awaiter(void 0, void 0, void 0, function() {
        var resources;
        return $b13ce36311cda672$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    return [
                        4 /*yield*/ ,
                        Promise.all((config.detectors || []).map(function(d) {
                            return $b13ce36311cda672$var$__awaiter(void 0, void 0, void 0, function() {
                                var resource, e_1;
                                return $b13ce36311cda672$var$__generator(this, function(_a) {
                                    switch(_a.label){
                                        case 0:
                                            _a.trys.push([
                                                0,
                                                2,
                                                ,
                                                3
                                            ]);
                                            return [
                                                4 /*yield*/ ,
                                                d.detect(config)
                                            ];
                                        case 1:
                                            resource = _a.sent();
                                            (0, $ljza4.diag).debug(d.constructor.name + " found resource.", resource);
                                            return [
                                                2 /*return*/ ,
                                                resource
                                            ];
                                        case 2:
                                            e_1 = _a.sent();
                                            (0, $ljza4.diag).debug(d.constructor.name + " failed: " + e_1.message);
                                            return [
                                                2 /*return*/ ,
                                                (0, $kawsV.Resource).empty()
                                            ];
                                        case 3:
                                            return [
                                                2 /*return*/ 
                                            ];
                                    }
                                });
                            });
                        }))
                    ];
                case 1:
                    resources = _a.sent();
                    // Future check if verbose logging is enabled issue #1903
                    $b13ce36311cda672$var$logResources(resources);
                    return [
                        2 /*return*/ ,
                        resources.reduce(function(acc, resource) {
                            return acc.merge(resource);
                        }, (0, $kawsV.Resource).empty())
                    ];
            }
        });
    });
};
var $b13ce36311cda672$export$a2167465c63b94e6 = function(config) {
    var _a;
    if (config === void 0) config = {};
    var resources = ((_a = config.detectors) !== null && _a !== void 0 ? _a : []).map(function(d) {
        try {
            var resourceOrPromise_1 = d.detect(config);
            var resource_1;
            if ((0, $9CzKX.isPromiseLike)(resourceOrPromise_1)) {
                var createPromise = function() {
                    return $b13ce36311cda672$var$__awaiter(void 0, void 0, void 0, function() {
                        var resolvedResource;
                        return $b13ce36311cda672$var$__generator(this, function(_a) {
                            switch(_a.label){
                                case 0:
                                    return [
                                        4 /*yield*/ ,
                                        resourceOrPromise_1
                                    ];
                                case 1:
                                    resolvedResource = _a.sent();
                                    return [
                                        2 /*return*/ ,
                                        resolvedResource.attributes
                                    ];
                            }
                        });
                    });
                };
                resource_1 = new (0, $kawsV.Resource)({}, createPromise());
            } else resource_1 = resourceOrPromise_1;
            if (resource_1.waitForAsyncAttributes) resource_1.waitForAsyncAttributes().then(function() {
                return (0, $ljza4.diag).debug(d.constructor.name + " found resource.", resource_1);
            });
            else (0, $ljza4.diag).debug(d.constructor.name + " found resource.", resource_1);
            return resource_1;
        } catch (e) {
            (0, $ljza4.diag).error(d.constructor.name + " failed: " + e.message);
            return (0, $kawsV.Resource).empty();
        }
    });
    var mergedResources = resources.reduce(function(acc, resource) {
        return acc.merge(resource);
    }, (0, $kawsV.Resource).empty());
    if (mergedResources.waitForAsyncAttributes) mergedResources.waitForAsyncAttributes().then(function() {
        // Future check if verbose logging is enabled issue #1903
        $b13ce36311cda672$var$logResources(resources);
    });
    return mergedResources;
};
/**
 * Writes debug information about the detected resources to the logger defined in the resource detection config, if one is provided.
 *
 * @param resources The array of {@link Resource} that should be logged. Empty entries will be ignored.
 */ var $b13ce36311cda672$var$logResources = function(resources) {
    resources.forEach(function(resource) {
        // Print only populated resources
        if (Object.keys(resource.attributes).length > 0) {
            var resourceDebugString = JSON.stringify(resource.attributes, null, 4);
            (0, $ljza4.diag).verbose(resourceDebugString);
        }
    });
};

});
parcelRegister("kawsV", function(module, exports) {

$parcel$export(module.exports, "Resource", () => $eaedecc9905e0881$export$39a853cfb5a94a63);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $e4oiF = parcelRequire("e4oiF");

var $727Gf = parcelRequire("727Gf");

var $8p9Id = parcelRequire("8p9Id");
var $eaedecc9905e0881$var$__assign = undefined && undefined.__assign || function() {
    $eaedecc9905e0881$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $eaedecc9905e0881$var$__assign.apply(this, arguments);
};
var $eaedecc9905e0881$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $eaedecc9905e0881$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $eaedecc9905e0881$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
/**
 * A Resource describes the entity for which a signals (metrics or trace) are
 * collected.
 */ var $eaedecc9905e0881$export$39a853cfb5a94a63 = /** @class */ function() {
    function Resource(/**
     * A dictionary of attributes with string keys and values that provide
     * information about the entity as numbers, strings or booleans
     * TODO: Consider to add check/validation on attributes.
     */ attributes, asyncAttributesPromise) {
        var _this = this;
        var _a;
        this._attributes = attributes;
        this.asyncAttributesPending = asyncAttributesPromise != null;
        this._syncAttributes = (_a = this._attributes) !== null && _a !== void 0 ? _a : {};
        this._asyncAttributesPromise = asyncAttributesPromise === null || asyncAttributesPromise === void 0 ? void 0 : asyncAttributesPromise.then(function(asyncAttributes) {
            _this._attributes = Object.assign({}, _this._attributes, asyncAttributes);
            _this.asyncAttributesPending = false;
            return asyncAttributes;
        }, function(err) {
            (0, $ljza4.diag).debug("a resource's async attributes promise rejected: %s", err);
            _this.asyncAttributesPending = false;
            return {};
        });
    }
    /**
     * Returns an empty Resource
     */ Resource.empty = function() {
        return Resource.EMPTY;
    };
    /**
     * Returns a Resource that identifies the SDK in use.
     */ Resource.default = function() {
        var _a;
        return new Resource((_a = {}, _a[0, $e4oiF.SEMRESATTRS_SERVICE_NAME] = (0, $8p9Id.defaultServiceName)(), _a[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE] = (0, $727Gf.SDK_INFO)[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE], _a[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_NAME] = (0, $727Gf.SDK_INFO)[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_NAME], _a[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_VERSION] = (0, $727Gf.SDK_INFO)[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_VERSION], _a));
    };
    Object.defineProperty(Resource.prototype, "attributes", {
        get: function() {
            var _a;
            if (this.asyncAttributesPending) (0, $ljza4.diag).error("Accessing resource attributes before async attributes settled");
            return (_a = this._attributes) !== null && _a !== void 0 ? _a : {};
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a promise that will never be rejected. Resolves when all async attributes have finished being added to
     * this Resource's attributes. This is useful in exporters to block until resource detection
     * has finished.
     */ Resource.prototype.waitForAsyncAttributes = function() {
        return $eaedecc9905e0881$var$__awaiter(this, void 0, void 0, function() {
            return $eaedecc9905e0881$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        if (!this.asyncAttributesPending) return [
                            3 /*break*/ ,
                            2
                        ];
                        return [
                            4 /*yield*/ ,
                            this._asyncAttributesPromise
                        ];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /**
     * Returns a new, merged {@link Resource} by merging the current Resource
     * with the other Resource. In case of a collision, other Resource takes
     * precedence.
     *
     * @param other the Resource that will be merged with this.
     * @returns the newly merged Resource.
     */ Resource.prototype.merge = function(other) {
        var _this = this;
        var _a;
        if (!other) return this;
        // SpanAttributes from other resource overwrite attributes from this resource.
        var mergedSyncAttributes = $eaedecc9905e0881$var$__assign($eaedecc9905e0881$var$__assign({}, this._syncAttributes), (_a = other._syncAttributes) !== null && _a !== void 0 ? _a : other.attributes);
        if (!this._asyncAttributesPromise && !other._asyncAttributesPromise) return new Resource(mergedSyncAttributes);
        var mergedAttributesPromise = Promise.all([
            this._asyncAttributesPromise,
            other._asyncAttributesPromise
        ]).then(function(_a) {
            var _b;
            var _c = $eaedecc9905e0881$var$__read(_a, 2), thisAsyncAttributes = _c[0], otherAsyncAttributes = _c[1];
            return $eaedecc9905e0881$var$__assign($eaedecc9905e0881$var$__assign($eaedecc9905e0881$var$__assign($eaedecc9905e0881$var$__assign({}, _this._syncAttributes), thisAsyncAttributes), (_b = other._syncAttributes) !== null && _b !== void 0 ? _b : other.attributes), otherAsyncAttributes);
        });
        return new Resource(mergedSyncAttributes, mergedAttributesPromise);
    };
    Resource.EMPTY = new Resource({});
    return Resource;
}();

});
parcelRegister("e4oiF", function(module, exports) {

$parcel$export(module.exports, "SEMRESATTRS_PROCESS_RUNTIME_NAME", () => $a3e449e72bc3fc4f$export$6c52ea893832d871);
$parcel$export(module.exports, "SEMRESATTRS_SERVICE_NAME", () => $a3e449e72bc3fc4f$export$48c68257f49298c9);
$parcel$export(module.exports, "SEMRESATTRS_TELEMETRY_SDK_NAME", () => $a3e449e72bc3fc4f$export$2d668a3bde1cddea);
$parcel$export(module.exports, "SEMRESATTRS_TELEMETRY_SDK_LANGUAGE", () => $a3e449e72bc3fc4f$export$b5c1717bbc4c6044);
$parcel$export(module.exports, "SEMRESATTRS_TELEMETRY_SDK_VERSION", () => $a3e449e72bc3fc4f$export$e0b67501ecc1df37);
$parcel$export(module.exports, "TELEMETRYSDKLANGUAGEVALUES_WEBJS", () => $a3e449e72bc3fc4f$export$1414beb1e03cac7c);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $1392M = parcelRequire("1392M");
//----------------------------------------------------------------------------------------------------------
// DO NOT EDIT, this is an Auto-generated file from scripts/semconv/templates//templates/SemanticAttributes.ts.j2
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
// Constant values for SemanticResourceAttributes
//----------------------------------------------------------------------------------------------------------
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $a3e449e72bc3fc4f$var$TMP_CLOUD_PROVIDER = "cloud.provider";
var $a3e449e72bc3fc4f$var$TMP_CLOUD_ACCOUNT_ID = "cloud.account.id";
var $a3e449e72bc3fc4f$var$TMP_CLOUD_REGION = "cloud.region";
var $a3e449e72bc3fc4f$var$TMP_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
var $a3e449e72bc3fc4f$var$TMP_CLOUD_PLATFORM = "cloud.platform";
var $a3e449e72bc3fc4f$var$TMP_AWS_ECS_CONTAINER_ARN = "aws.ecs.container.arn";
var $a3e449e72bc3fc4f$var$TMP_AWS_ECS_CLUSTER_ARN = "aws.ecs.cluster.arn";
var $a3e449e72bc3fc4f$var$TMP_AWS_ECS_LAUNCHTYPE = "aws.ecs.launchtype";
var $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_ARN = "aws.ecs.task.arn";
var $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_FAMILY = "aws.ecs.task.family";
var $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_REVISION = "aws.ecs.task.revision";
var $a3e449e72bc3fc4f$var$TMP_AWS_EKS_CLUSTER_ARN = "aws.eks.cluster.arn";
var $a3e449e72bc3fc4f$var$TMP_AWS_LOG_GROUP_NAMES = "aws.log.group.names";
var $a3e449e72bc3fc4f$var$TMP_AWS_LOG_GROUP_ARNS = "aws.log.group.arns";
var $a3e449e72bc3fc4f$var$TMP_AWS_LOG_STREAM_NAMES = "aws.log.stream.names";
var $a3e449e72bc3fc4f$var$TMP_AWS_LOG_STREAM_ARNS = "aws.log.stream.arns";
var $a3e449e72bc3fc4f$var$TMP_CONTAINER_NAME = "container.name";
var $a3e449e72bc3fc4f$var$TMP_CONTAINER_ID = "container.id";
var $a3e449e72bc3fc4f$var$TMP_CONTAINER_RUNTIME = "container.runtime";
var $a3e449e72bc3fc4f$var$TMP_CONTAINER_IMAGE_NAME = "container.image.name";
var $a3e449e72bc3fc4f$var$TMP_CONTAINER_IMAGE_TAG = "container.image.tag";
var $a3e449e72bc3fc4f$var$TMP_DEPLOYMENT_ENVIRONMENT = "deployment.environment";
var $a3e449e72bc3fc4f$var$TMP_DEVICE_ID = "device.id";
var $a3e449e72bc3fc4f$var$TMP_DEVICE_MODEL_IDENTIFIER = "device.model.identifier";
var $a3e449e72bc3fc4f$var$TMP_DEVICE_MODEL_NAME = "device.model.name";
var $a3e449e72bc3fc4f$var$TMP_FAAS_NAME = "faas.name";
var $a3e449e72bc3fc4f$var$TMP_FAAS_ID = "faas.id";
var $a3e449e72bc3fc4f$var$TMP_FAAS_VERSION = "faas.version";
var $a3e449e72bc3fc4f$var$TMP_FAAS_INSTANCE = "faas.instance";
var $a3e449e72bc3fc4f$var$TMP_FAAS_MAX_MEMORY = "faas.max_memory";
var $a3e449e72bc3fc4f$var$TMP_HOST_ID = "host.id";
var $a3e449e72bc3fc4f$var$TMP_HOST_NAME = "host.name";
var $a3e449e72bc3fc4f$var$TMP_HOST_TYPE = "host.type";
var $a3e449e72bc3fc4f$var$TMP_HOST_ARCH = "host.arch";
var $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_NAME = "host.image.name";
var $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_ID = "host.image.id";
var $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_VERSION = "host.image.version";
var $a3e449e72bc3fc4f$var$TMP_K8S_CLUSTER_NAME = "k8s.cluster.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_NODE_NAME = "k8s.node.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_NODE_UID = "k8s.node.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_NAMESPACE_NAME = "k8s.namespace.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_POD_UID = "k8s.pod.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_POD_NAME = "k8s.pod.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_CONTAINER_NAME = "k8s.container.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_REPLICASET_UID = "k8s.replicaset.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_REPLICASET_NAME = "k8s.replicaset.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_JOB_UID = "k8s.job.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_JOB_NAME = "k8s.job.name";
var $a3e449e72bc3fc4f$var$TMP_K8S_CRONJOB_UID = "k8s.cronjob.uid";
var $a3e449e72bc3fc4f$var$TMP_K8S_CRONJOB_NAME = "k8s.cronjob.name";
var $a3e449e72bc3fc4f$var$TMP_OS_TYPE = "os.type";
var $a3e449e72bc3fc4f$var$TMP_OS_DESCRIPTION = "os.description";
var $a3e449e72bc3fc4f$var$TMP_OS_NAME = "os.name";
var $a3e449e72bc3fc4f$var$TMP_OS_VERSION = "os.version";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_PID = "process.pid";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_EXECUTABLE_NAME = "process.executable.name";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_EXECUTABLE_PATH = "process.executable.path";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND = "process.command";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND_LINE = "process.command_line";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND_ARGS = "process.command_args";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_OWNER = "process.owner";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_NAME = "process.runtime.name";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_VERSION = "process.runtime.version";
var $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
var $a3e449e72bc3fc4f$var$TMP_SERVICE_NAME = "service.name";
var $a3e449e72bc3fc4f$var$TMP_SERVICE_NAMESPACE = "service.namespace";
var $a3e449e72bc3fc4f$var$TMP_SERVICE_INSTANCE_ID = "service.instance.id";
var $a3e449e72bc3fc4f$var$TMP_SERVICE_VERSION = "service.version";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRY_AUTO_VERSION = "telemetry.auto.version";
var $a3e449e72bc3fc4f$var$TMP_WEBENGINE_NAME = "webengine.name";
var $a3e449e72bc3fc4f$var$TMP_WEBENGINE_VERSION = "webengine.version";
var $a3e449e72bc3fc4f$var$TMP_WEBENGINE_DESCRIPTION = "webengine.description";
var $a3e449e72bc3fc4f$export$9fa486cd651f5f18 = $a3e449e72bc3fc4f$var$TMP_CLOUD_PROVIDER;
var $a3e449e72bc3fc4f$export$3b9e160fb5fd0b48 = $a3e449e72bc3fc4f$var$TMP_CLOUD_ACCOUNT_ID;
var $a3e449e72bc3fc4f$export$7dda4a2b7e6f2925 = $a3e449e72bc3fc4f$var$TMP_CLOUD_REGION;
var $a3e449e72bc3fc4f$export$ba02b007970def42 = $a3e449e72bc3fc4f$var$TMP_CLOUD_AVAILABILITY_ZONE;
var $a3e449e72bc3fc4f$export$112df106e7dd2eda = $a3e449e72bc3fc4f$var$TMP_CLOUD_PLATFORM;
var $a3e449e72bc3fc4f$export$a43adfce130205e = $a3e449e72bc3fc4f$var$TMP_AWS_ECS_CONTAINER_ARN;
var $a3e449e72bc3fc4f$export$2ba3c01be08dc7b1 = $a3e449e72bc3fc4f$var$TMP_AWS_ECS_CLUSTER_ARN;
var $a3e449e72bc3fc4f$export$323329f2ad65b2aa = $a3e449e72bc3fc4f$var$TMP_AWS_ECS_LAUNCHTYPE;
var $a3e449e72bc3fc4f$export$5275732a76e56248 = $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_ARN;
var $a3e449e72bc3fc4f$export$fb3f0b7a7be1babd = $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_FAMILY;
var $a3e449e72bc3fc4f$export$3ed6f78d5dfa8242 = $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_REVISION;
var $a3e449e72bc3fc4f$export$a7708dae05d391dc = $a3e449e72bc3fc4f$var$TMP_AWS_EKS_CLUSTER_ARN;
var $a3e449e72bc3fc4f$export$bf434df1f3c89b1 = $a3e449e72bc3fc4f$var$TMP_AWS_LOG_GROUP_NAMES;
var $a3e449e72bc3fc4f$export$c522b98ccd83a439 = $a3e449e72bc3fc4f$var$TMP_AWS_LOG_GROUP_ARNS;
var $a3e449e72bc3fc4f$export$40794b06cac6b1bc = $a3e449e72bc3fc4f$var$TMP_AWS_LOG_STREAM_NAMES;
var $a3e449e72bc3fc4f$export$c9f081f4b744b01b = $a3e449e72bc3fc4f$var$TMP_AWS_LOG_STREAM_ARNS;
var $a3e449e72bc3fc4f$export$3e6fef409a60fc1e = $a3e449e72bc3fc4f$var$TMP_CONTAINER_NAME;
var $a3e449e72bc3fc4f$export$4d0381aa96fe1c3b = $a3e449e72bc3fc4f$var$TMP_CONTAINER_ID;
var $a3e449e72bc3fc4f$export$8806c0adf7bb0584 = $a3e449e72bc3fc4f$var$TMP_CONTAINER_RUNTIME;
var $a3e449e72bc3fc4f$export$44771c6519c06259 = $a3e449e72bc3fc4f$var$TMP_CONTAINER_IMAGE_NAME;
var $a3e449e72bc3fc4f$export$9f5798300d33c86b = $a3e449e72bc3fc4f$var$TMP_CONTAINER_IMAGE_TAG;
var $a3e449e72bc3fc4f$export$4783aaf4e8f7afa0 = $a3e449e72bc3fc4f$var$TMP_DEPLOYMENT_ENVIRONMENT;
var $a3e449e72bc3fc4f$export$6e497113334fabdb = $a3e449e72bc3fc4f$var$TMP_DEVICE_ID;
var $a3e449e72bc3fc4f$export$73c71cc1c141692b = $a3e449e72bc3fc4f$var$TMP_DEVICE_MODEL_IDENTIFIER;
var $a3e449e72bc3fc4f$export$44e87b3b8704bc8a = $a3e449e72bc3fc4f$var$TMP_DEVICE_MODEL_NAME;
var $a3e449e72bc3fc4f$export$fe110625e5aee93d = $a3e449e72bc3fc4f$var$TMP_FAAS_NAME;
var $a3e449e72bc3fc4f$export$6bbd0c1523702b22 = $a3e449e72bc3fc4f$var$TMP_FAAS_ID;
var $a3e449e72bc3fc4f$export$b1cb8996c7f671f1 = $a3e449e72bc3fc4f$var$TMP_FAAS_VERSION;
var $a3e449e72bc3fc4f$export$aa4a460944af09fe = $a3e449e72bc3fc4f$var$TMP_FAAS_INSTANCE;
var $a3e449e72bc3fc4f$export$a099969737f46339 = $a3e449e72bc3fc4f$var$TMP_FAAS_MAX_MEMORY;
var $a3e449e72bc3fc4f$export$e0a684ea09b55cf4 = $a3e449e72bc3fc4f$var$TMP_HOST_ID;
var $a3e449e72bc3fc4f$export$3b62edd76224926e = $a3e449e72bc3fc4f$var$TMP_HOST_NAME;
var $a3e449e72bc3fc4f$export$ba26ec134241ab05 = $a3e449e72bc3fc4f$var$TMP_HOST_TYPE;
var $a3e449e72bc3fc4f$export$4ef6e9b690c5d3ad = $a3e449e72bc3fc4f$var$TMP_HOST_ARCH;
var $a3e449e72bc3fc4f$export$80c1be409ca0daf7 = $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_NAME;
var $a3e449e72bc3fc4f$export$ae211b0849dd0d75 = $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_ID;
var $a3e449e72bc3fc4f$export$729ea06c32794759 = $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_VERSION;
var $a3e449e72bc3fc4f$export$9e0ac736c1d187bc = $a3e449e72bc3fc4f$var$TMP_K8S_CLUSTER_NAME;
var $a3e449e72bc3fc4f$export$e2479edf033ed1cd = $a3e449e72bc3fc4f$var$TMP_K8S_NODE_NAME;
var $a3e449e72bc3fc4f$export$a348ce0508cee2d8 = $a3e449e72bc3fc4f$var$TMP_K8S_NODE_UID;
var $a3e449e72bc3fc4f$export$f74f5d90b490f9a6 = $a3e449e72bc3fc4f$var$TMP_K8S_NAMESPACE_NAME;
var $a3e449e72bc3fc4f$export$341429c1b099564 = $a3e449e72bc3fc4f$var$TMP_K8S_POD_UID;
var $a3e449e72bc3fc4f$export$9e6f11bbfd666f4d = $a3e449e72bc3fc4f$var$TMP_K8S_POD_NAME;
var $a3e449e72bc3fc4f$export$ee1ae14ab5631334 = $a3e449e72bc3fc4f$var$TMP_K8S_CONTAINER_NAME;
var $a3e449e72bc3fc4f$export$845974e52d5d977b = $a3e449e72bc3fc4f$var$TMP_K8S_REPLICASET_UID;
var $a3e449e72bc3fc4f$export$1735237e4ef99ddc = $a3e449e72bc3fc4f$var$TMP_K8S_REPLICASET_NAME;
var $a3e449e72bc3fc4f$export$ff557043393b8413 = $a3e449e72bc3fc4f$var$TMP_K8S_DEPLOYMENT_UID;
var $a3e449e72bc3fc4f$export$1b29810364e6fd87 = $a3e449e72bc3fc4f$var$TMP_K8S_DEPLOYMENT_NAME;
var $a3e449e72bc3fc4f$export$fd37db901d73f6dc = $a3e449e72bc3fc4f$var$TMP_K8S_STATEFULSET_UID;
var $a3e449e72bc3fc4f$export$8030a8ee6a430fb9 = $a3e449e72bc3fc4f$var$TMP_K8S_STATEFULSET_NAME;
var $a3e449e72bc3fc4f$export$6369d5a7f9c03019 = $a3e449e72bc3fc4f$var$TMP_K8S_DAEMONSET_UID;
var $a3e449e72bc3fc4f$export$f55c2f841978e686 = $a3e449e72bc3fc4f$var$TMP_K8S_DAEMONSET_NAME;
var $a3e449e72bc3fc4f$export$1618e60c71672510 = $a3e449e72bc3fc4f$var$TMP_K8S_JOB_UID;
var $a3e449e72bc3fc4f$export$fae3f547adbfd628 = $a3e449e72bc3fc4f$var$TMP_K8S_JOB_NAME;
var $a3e449e72bc3fc4f$export$c6a5d371a9279cc4 = $a3e449e72bc3fc4f$var$TMP_K8S_CRONJOB_UID;
var $a3e449e72bc3fc4f$export$2411967a413e48d4 = $a3e449e72bc3fc4f$var$TMP_K8S_CRONJOB_NAME;
var $a3e449e72bc3fc4f$export$832bf06644fbf55d = $a3e449e72bc3fc4f$var$TMP_OS_TYPE;
var $a3e449e72bc3fc4f$export$5ea67b5ceab8e5b2 = $a3e449e72bc3fc4f$var$TMP_OS_DESCRIPTION;
var $a3e449e72bc3fc4f$export$ba2bcf7e30621987 = $a3e449e72bc3fc4f$var$TMP_OS_NAME;
var $a3e449e72bc3fc4f$export$e0381cc218bde593 = $a3e449e72bc3fc4f$var$TMP_OS_VERSION;
var $a3e449e72bc3fc4f$export$f184e78598ab0d4c = $a3e449e72bc3fc4f$var$TMP_PROCESS_PID;
var $a3e449e72bc3fc4f$export$e2e53a1071096d12 = $a3e449e72bc3fc4f$var$TMP_PROCESS_EXECUTABLE_NAME;
var $a3e449e72bc3fc4f$export$cc1c2bacfc72d251 = $a3e449e72bc3fc4f$var$TMP_PROCESS_EXECUTABLE_PATH;
var $a3e449e72bc3fc4f$export$1921c91b182b21e6 = $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND;
var $a3e449e72bc3fc4f$export$33d6a2745a92e4bf = $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND_LINE;
var $a3e449e72bc3fc4f$export$1a3243771890bbd7 = $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND_ARGS;
var $a3e449e72bc3fc4f$export$5bc9efe4d24f374b = $a3e449e72bc3fc4f$var$TMP_PROCESS_OWNER;
var $a3e449e72bc3fc4f$export$6c52ea893832d871 = $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_NAME;
var $a3e449e72bc3fc4f$export$7c038ff97737b111 = $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_VERSION;
var $a3e449e72bc3fc4f$export$cae71c4fbbf205fb = $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_DESCRIPTION;
var $a3e449e72bc3fc4f$export$48c68257f49298c9 = $a3e449e72bc3fc4f$var$TMP_SERVICE_NAME;
var $a3e449e72bc3fc4f$export$77c0752ab7c26c9 = $a3e449e72bc3fc4f$var$TMP_SERVICE_NAMESPACE;
var $a3e449e72bc3fc4f$export$bb5ecf41777e0d0c = $a3e449e72bc3fc4f$var$TMP_SERVICE_INSTANCE_ID;
var $a3e449e72bc3fc4f$export$202d10b361b87ab2 = $a3e449e72bc3fc4f$var$TMP_SERVICE_VERSION;
var $a3e449e72bc3fc4f$export$2d668a3bde1cddea = $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_NAME;
var $a3e449e72bc3fc4f$export$b5c1717bbc4c6044 = $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_LANGUAGE;
var $a3e449e72bc3fc4f$export$e0b67501ecc1df37 = $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_VERSION;
var $a3e449e72bc3fc4f$export$3d43fbbcabb62eca = $a3e449e72bc3fc4f$var$TMP_TELEMETRY_AUTO_VERSION;
var $a3e449e72bc3fc4f$export$a6b7ffad45e0c20b = $a3e449e72bc3fc4f$var$TMP_WEBENGINE_NAME;
var $a3e449e72bc3fc4f$export$589250d7a0c7cee4 = $a3e449e72bc3fc4f$var$TMP_WEBENGINE_VERSION;
var $a3e449e72bc3fc4f$export$3318c199ccb51731 = $a3e449e72bc3fc4f$var$TMP_WEBENGINE_DESCRIPTION;
var $a3e449e72bc3fc4f$export$85d6ffe28a084c78 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $a3e449e72bc3fc4f$var$TMP_CLOUD_PROVIDER,
    $a3e449e72bc3fc4f$var$TMP_CLOUD_ACCOUNT_ID,
    $a3e449e72bc3fc4f$var$TMP_CLOUD_REGION,
    $a3e449e72bc3fc4f$var$TMP_CLOUD_AVAILABILITY_ZONE,
    $a3e449e72bc3fc4f$var$TMP_CLOUD_PLATFORM,
    $a3e449e72bc3fc4f$var$TMP_AWS_ECS_CONTAINER_ARN,
    $a3e449e72bc3fc4f$var$TMP_AWS_ECS_CLUSTER_ARN,
    $a3e449e72bc3fc4f$var$TMP_AWS_ECS_LAUNCHTYPE,
    $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_ARN,
    $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_FAMILY,
    $a3e449e72bc3fc4f$var$TMP_AWS_ECS_TASK_REVISION,
    $a3e449e72bc3fc4f$var$TMP_AWS_EKS_CLUSTER_ARN,
    $a3e449e72bc3fc4f$var$TMP_AWS_LOG_GROUP_NAMES,
    $a3e449e72bc3fc4f$var$TMP_AWS_LOG_GROUP_ARNS,
    $a3e449e72bc3fc4f$var$TMP_AWS_LOG_STREAM_NAMES,
    $a3e449e72bc3fc4f$var$TMP_AWS_LOG_STREAM_ARNS,
    $a3e449e72bc3fc4f$var$TMP_CONTAINER_NAME,
    $a3e449e72bc3fc4f$var$TMP_CONTAINER_ID,
    $a3e449e72bc3fc4f$var$TMP_CONTAINER_RUNTIME,
    $a3e449e72bc3fc4f$var$TMP_CONTAINER_IMAGE_NAME,
    $a3e449e72bc3fc4f$var$TMP_CONTAINER_IMAGE_TAG,
    $a3e449e72bc3fc4f$var$TMP_DEPLOYMENT_ENVIRONMENT,
    $a3e449e72bc3fc4f$var$TMP_DEVICE_ID,
    $a3e449e72bc3fc4f$var$TMP_DEVICE_MODEL_IDENTIFIER,
    $a3e449e72bc3fc4f$var$TMP_DEVICE_MODEL_NAME,
    $a3e449e72bc3fc4f$var$TMP_FAAS_NAME,
    $a3e449e72bc3fc4f$var$TMP_FAAS_ID,
    $a3e449e72bc3fc4f$var$TMP_FAAS_VERSION,
    $a3e449e72bc3fc4f$var$TMP_FAAS_INSTANCE,
    $a3e449e72bc3fc4f$var$TMP_FAAS_MAX_MEMORY,
    $a3e449e72bc3fc4f$var$TMP_HOST_ID,
    $a3e449e72bc3fc4f$var$TMP_HOST_NAME,
    $a3e449e72bc3fc4f$var$TMP_HOST_TYPE,
    $a3e449e72bc3fc4f$var$TMP_HOST_ARCH,
    $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_NAME,
    $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_ID,
    $a3e449e72bc3fc4f$var$TMP_HOST_IMAGE_VERSION,
    $a3e449e72bc3fc4f$var$TMP_K8S_CLUSTER_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_NODE_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_NODE_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_NAMESPACE_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_POD_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_POD_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_CONTAINER_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_REPLICASET_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_REPLICASET_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_DEPLOYMENT_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_DEPLOYMENT_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_STATEFULSET_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_STATEFULSET_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_DAEMONSET_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_DAEMONSET_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_JOB_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_JOB_NAME,
    $a3e449e72bc3fc4f$var$TMP_K8S_CRONJOB_UID,
    $a3e449e72bc3fc4f$var$TMP_K8S_CRONJOB_NAME,
    $a3e449e72bc3fc4f$var$TMP_OS_TYPE,
    $a3e449e72bc3fc4f$var$TMP_OS_DESCRIPTION,
    $a3e449e72bc3fc4f$var$TMP_OS_NAME,
    $a3e449e72bc3fc4f$var$TMP_OS_VERSION,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_PID,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_EXECUTABLE_NAME,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_EXECUTABLE_PATH,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND_LINE,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_COMMAND_ARGS,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_OWNER,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_NAME,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_VERSION,
    $a3e449e72bc3fc4f$var$TMP_PROCESS_RUNTIME_DESCRIPTION,
    $a3e449e72bc3fc4f$var$TMP_SERVICE_NAME,
    $a3e449e72bc3fc4f$var$TMP_SERVICE_NAMESPACE,
    $a3e449e72bc3fc4f$var$TMP_SERVICE_INSTANCE_ID,
    $a3e449e72bc3fc4f$var$TMP_SERVICE_VERSION,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_NAME,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_LANGUAGE,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRY_SDK_VERSION,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRY_AUTO_VERSION,
    $a3e449e72bc3fc4f$var$TMP_WEBENGINE_NAME,
    $a3e449e72bc3fc4f$var$TMP_WEBENGINE_VERSION,
    $a3e449e72bc3fc4f$var$TMP_WEBENGINE_DESCRIPTION
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for CloudProviderValues enum definition
 *
 * Name of the cloud provider.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_AWS = "aws";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_AZURE = "azure";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_GCP = "gcp";
var $a3e449e72bc3fc4f$export$1f18298beaae37d3 = $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD;
var $a3e449e72bc3fc4f$export$f56ad4bf836470f2 = $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_AWS;
var $a3e449e72bc3fc4f$export$a607df3e2371e436 = $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_AZURE;
var $a3e449e72bc3fc4f$export$b5cb559e526f402a = $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_GCP;
var $a3e449e72bc3fc4f$export$c2664345bd8aad14 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_AWS,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_AZURE,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPROVIDERVALUES_GCP
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for CloudPlatformValues enum definition
 *
 * The cloud platform in use.
 *
 * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = "alibaba_cloud_ecs";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = "alibaba_cloud_fc";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_EC2 = "aws_ec2";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_ECS = "aws_ecs";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_EKS = "aws_eks";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA = "aws_lambda";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = "aws_elastic_beanstalk";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_VM = "azure_vm";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = "azure_container_instances";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_AKS = "azure_aks";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = "azure_functions";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = "azure_app_service";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = "gcp_compute_engine";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = "gcp_cloud_run";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = "gcp_kubernetes_engine";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = "gcp_cloud_functions";
var $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE = "gcp_app_engine";
var $a3e449e72bc3fc4f$export$b7ccb6b2de7534ed = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS;
var $a3e449e72bc3fc4f$export$5e031b328860dffd = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC;
var $a3e449e72bc3fc4f$export$f0e8dec51b6cf37d = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_EC2;
var $a3e449e72bc3fc4f$export$a325ac849a598ed7 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_ECS;
var $a3e449e72bc3fc4f$export$9c3f60b2b4d542e1 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_EKS;
var $a3e449e72bc3fc4f$export$1edcff8a13326911 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA;
var $a3e449e72bc3fc4f$export$2f7128c57ade0d50 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK;
var $a3e449e72bc3fc4f$export$10256094f96cd373 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_VM;
var $a3e449e72bc3fc4f$export$ed505d4ca2b4d712 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES;
var $a3e449e72bc3fc4f$export$83131f1a1f001ee = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_AKS;
var $a3e449e72bc3fc4f$export$36f98571cef96af7 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS;
var $a3e449e72bc3fc4f$export$66faee8e64625c5d = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE;
var $a3e449e72bc3fc4f$export$dd043c2707119e75 = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE;
var $a3e449e72bc3fc4f$export$d0a1ecf47fa77b8b = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN;
var $a3e449e72bc3fc4f$export$649c271f5295d71e = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE;
var $a3e449e72bc3fc4f$export$e9becd93e8daa01a = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS;
var $a3e449e72bc3fc4f$export$5862836e4b24761c = $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE;
var $a3e449e72bc3fc4f$export$fe811090f8b1259c = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_EC2,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_ECS,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_EKS,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_VM,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_AKS,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS,
    $a3e449e72bc3fc4f$var$TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for AwsEcsLaunchtypeValues enum definition
 *
 * The [launch type](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) for an ECS task.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $a3e449e72bc3fc4f$var$TMP_AWSECSLAUNCHTYPEVALUES_EC2 = "ec2";
var $a3e449e72bc3fc4f$var$TMP_AWSECSLAUNCHTYPEVALUES_FARGATE = "fargate";
var $a3e449e72bc3fc4f$export$54d16708f9a4cde = $a3e449e72bc3fc4f$var$TMP_AWSECSLAUNCHTYPEVALUES_EC2;
var $a3e449e72bc3fc4f$export$7bf660b6e44fe06e = $a3e449e72bc3fc4f$var$TMP_AWSECSLAUNCHTYPEVALUES_FARGATE;
var $a3e449e72bc3fc4f$export$6945fb1e4f2852ef = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $a3e449e72bc3fc4f$var$TMP_AWSECSLAUNCHTYPEVALUES_EC2,
    $a3e449e72bc3fc4f$var$TMP_AWSECSLAUNCHTYPEVALUES_FARGATE
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for HostArchValues enum definition
 *
 * The CPU architecture the host system is running on.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_AMD64 = "amd64";
var $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_ARM32 = "arm32";
var $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_ARM64 = "arm64";
var $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_IA64 = "ia64";
var $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_PPC32 = "ppc32";
var $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_PPC64 = "ppc64";
var $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_X86 = "x86";
var $a3e449e72bc3fc4f$export$6050a837e7da966a = $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_AMD64;
var $a3e449e72bc3fc4f$export$3c7341cec70023f0 = $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_ARM32;
var $a3e449e72bc3fc4f$export$2fac5f715b596c6d = $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_ARM64;
var $a3e449e72bc3fc4f$export$231235882f6e6443 = $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_IA64;
var $a3e449e72bc3fc4f$export$c4a24e52d6385d55 = $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_PPC32;
var $a3e449e72bc3fc4f$export$18594ce63eac5c97 = $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_PPC64;
var $a3e449e72bc3fc4f$export$1af722303cbf3f49 = $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_X86;
var $a3e449e72bc3fc4f$export$f31e10d6db5b428b = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_AMD64,
    $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_ARM32,
    $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_ARM64,
    $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_IA64,
    $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_PPC32,
    $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_PPC64,
    $a3e449e72bc3fc4f$var$TMP_HOSTARCHVALUES_X86
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for OsTypeValues enum definition
 *
 * The operating system type.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_WINDOWS = "windows";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_LINUX = "linux";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_DARWIN = "darwin";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_FREEBSD = "freebsd";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_NETBSD = "netbsd";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_OPENBSD = "openbsd";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_DRAGONFLYBSD = "dragonflybsd";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_HPUX = "hpux";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_AIX = "aix";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_SOLARIS = "solaris";
var $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_Z_OS = "z_os";
var $a3e449e72bc3fc4f$export$9e247b47b87a5e98 = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_WINDOWS;
var $a3e449e72bc3fc4f$export$79d9a21d50f1d11b = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_LINUX;
var $a3e449e72bc3fc4f$export$29d1fb472dabfab5 = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_DARWIN;
var $a3e449e72bc3fc4f$export$41f1a684ef8f38a0 = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_FREEBSD;
var $a3e449e72bc3fc4f$export$d11e84640954119d = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_NETBSD;
var $a3e449e72bc3fc4f$export$cf6bab1412b5a24 = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_OPENBSD;
var $a3e449e72bc3fc4f$export$e902e17ab5ff9bad = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_DRAGONFLYBSD;
var $a3e449e72bc3fc4f$export$9a4c793b18e0bd5e = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_HPUX;
var $a3e449e72bc3fc4f$export$bdec18d31f5e2d9d = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_AIX;
var $a3e449e72bc3fc4f$export$6226a44babc07d2d = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_SOLARIS;
var $a3e449e72bc3fc4f$export$a81b7e7863a06968 = $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_Z_OS;
var $a3e449e72bc3fc4f$export$efc6a8b7a61f5577 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_WINDOWS,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_LINUX,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_DARWIN,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_FREEBSD,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_NETBSD,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_OPENBSD,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_DRAGONFLYBSD,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_HPUX,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_AIX,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_SOLARIS,
    $a3e449e72bc3fc4f$var$TMP_OSTYPEVALUES_Z_OS
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for TelemetrySdkLanguageValues enum definition
 *
 * The language of the telemetry SDK.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_CPP = "cpp";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET = "dotnet";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG = "erlang";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_GO = "go";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA = "java";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS = "nodejs";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_PHP = "php";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON = "python";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY = "ruby";
var $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS = "webjs";
var $a3e449e72bc3fc4f$export$bb305b29d3ff12b2 = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_CPP;
var $a3e449e72bc3fc4f$export$36f70c7fec241585 = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET;
var $a3e449e72bc3fc4f$export$9254854c1a90f699 = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG;
var $a3e449e72bc3fc4f$export$870f3d5bf5403ac2 = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_GO;
var $a3e449e72bc3fc4f$export$a115dae9eb65ef38 = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA;
var $a3e449e72bc3fc4f$export$f599ed80e3c8d29a = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS;
var $a3e449e72bc3fc4f$export$42ae93f6bda608ef = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_PHP;
var $a3e449e72bc3fc4f$export$7f6f8205f1621418 = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON;
var $a3e449e72bc3fc4f$export$3dd620b466e18cf = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY;
var $a3e449e72bc3fc4f$export$1414beb1e03cac7c = $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS;
var $a3e449e72bc3fc4f$export$b43162e16168dba6 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_CPP,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_GO,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_PHP,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY,
    $a3e449e72bc3fc4f$var$TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS
]);

});
parcelRegister("1392M", function(module, exports) {

$parcel$export(module.exports, "createConstMap", () => $0c3d162a8cf71ab8$export$8796db7ca257d576);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Creates a const map from the given values
 * @param values - An array of values to be used as keys and values in the map.
 * @returns A populated version of the map with the values and keys derived from the values.
 */ /*#__NO_SIDE_EFFECTS__*/ function $0c3d162a8cf71ab8$export$8796db7ca257d576(values) {
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
    var res = {};
    var len = values.length;
    for(var lp = 0; lp < len; lp++){
        var val = values[lp];
        if (val) res[String(val).toUpperCase().replace(/[-.]/g, "_")] = val;
    }
    return res;
}

});


parcelRegister("727Gf", function(module, exports) {

$parcel$export(module.exports, "SDK_INFO", () => $51eead7a3777e5aa$export$3c44663382dce232);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $8GbG6 = parcelRequire("8GbG6");

var $e4oiF = parcelRequire("e4oiF");
var $51eead7a3777e5aa$var$_a;
var $51eead7a3777e5aa$export$3c44663382dce232 = ($51eead7a3777e5aa$var$_a = {}, $51eead7a3777e5aa$var$_a[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_NAME] = "opentelemetry", $51eead7a3777e5aa$var$_a[0, $e4oiF.SEMRESATTRS_PROCESS_RUNTIME_NAME] = "browser", $51eead7a3777e5aa$var$_a[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE] = (0, $e4oiF.TELEMETRYSDKLANGUAGEVALUES_WEBJS), $51eead7a3777e5aa$var$_a[0, $e4oiF.SEMRESATTRS_TELEMETRY_SDK_VERSION] = (0, $8GbG6.VERSION), $51eead7a3777e5aa$var$_a);

});
parcelRegister("8GbG6", function(module, exports) {

$parcel$export(module.exports, "VERSION", () => $651b4df99e717702$export$a4ad2735b021c132);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
var $651b4df99e717702$export$a4ad2735b021c132 = "1.25.1";

});


parcelRegister("8p9Id", function(module, exports) {

$parcel$export(module.exports, "defaultServiceName", () => $61e831276b4681ea$export$b8c2abd2a6cf7c10);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $61e831276b4681ea$export$b8c2abd2a6cf7c10() {
    return "unknown_service";
}

});


parcelRegister("9CzKX", function(module, exports) {

$parcel$export(module.exports, "isPromiseLike", () => $70136620c777293c$export$ae936b9d47e5870e);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $70136620c777293c$export$ae936b9d47e5870e = function(val) {
    return val !== null && typeof val === "object" && typeof val.then === "function";
};

});


parcelRegister("39bMr", function(module, exports) {

$parcel$export(module.exports, "BatchSpanProcessor", () => $24ab59accace2f6a$export$237547059fd543f9);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $aYbOd = parcelRequire("aYbOd");
var $24ab59accace2f6a$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $24ab59accace2f6a$export$237547059fd543f9 = /** @class */ function(_super) {
    $24ab59accace2f6a$var$__extends(BatchSpanProcessor, _super);
    function BatchSpanProcessor(_exporter, config) {
        var _this = _super.call(this, _exporter, config) || this;
        _this.onInit(config);
        return _this;
    }
    BatchSpanProcessor.prototype.onInit = function(config) {
        var _this = this;
        if ((config === null || config === void 0 ? void 0 : config.disableAutoFlushOnDocumentHide) !== true && typeof document !== "undefined") {
            this._visibilityChangeListener = function() {
                if (document.visibilityState === "hidden") _this.forceFlush();
            };
            this._pageHideListener = function() {
                _this.forceFlush();
            };
            document.addEventListener("visibilitychange", this._visibilityChangeListener);
            // use 'pagehide' event as a fallback for Safari; see https://bugs.webkit.org/show_bug.cgi?id=116769
            document.addEventListener("pagehide", this._pageHideListener);
        }
    };
    BatchSpanProcessor.prototype.onShutdown = function() {
        if (typeof document !== "undefined") {
            if (this._visibilityChangeListener) document.removeEventListener("visibilitychange", this._visibilityChangeListener);
            if (this._pageHideListener) document.removeEventListener("pagehide", this._pageHideListener);
        }
    };
    return BatchSpanProcessor;
}((0, $aYbOd.BatchSpanProcessorBase));

});
parcelRegister("aYbOd", function(module, exports) {

$parcel$export(module.exports, "BatchSpanProcessorBase", () => $7fc8aaff85acee1b$export$54ea939f5d39e8a2);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $hfZRB = parcelRequire("hfZRB");
var $ljza4 = parcelRequire("ljza4");
var $AvSm7 = parcelRequire("AvSm7");

var $2cIHb = parcelRequire("2cIHb");
var $eLOET = parcelRequire("eLOET");
var $3M0CS = parcelRequire("3M0CS");
var $7U7yv = parcelRequire("7U7yv");
var $8WcVy = parcelRequire("8WcVy");
var $6gqSD = parcelRequire("6gqSD");
/**
 * Implementation of the {@link SpanProcessor} that batches spans exported by
 * the SDK then pushes them to the exporter pipeline.
 */ var $7fc8aaff85acee1b$export$54ea939f5d39e8a2 = /** @class */ function() {
    function BatchSpanProcessorBase(_exporter, config) {
        this._exporter = _exporter;
        this._isExporting = false;
        this._finishedSpans = [];
        this._droppedSpansCount = 0;
        var env = (0, $3M0CS.getEnv)();
        this._maxExportBatchSize = typeof (config === null || config === void 0 ? void 0 : config.maxExportBatchSize) === "number" ? config.maxExportBatchSize : env.OTEL_BSP_MAX_EXPORT_BATCH_SIZE;
        this._maxQueueSize = typeof (config === null || config === void 0 ? void 0 : config.maxQueueSize) === "number" ? config.maxQueueSize : env.OTEL_BSP_MAX_QUEUE_SIZE;
        this._scheduledDelayMillis = typeof (config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) === "number" ? config.scheduledDelayMillis : env.OTEL_BSP_SCHEDULE_DELAY;
        this._exportTimeoutMillis = typeof (config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) === "number" ? config.exportTimeoutMillis : env.OTEL_BSP_EXPORT_TIMEOUT;
        this._shutdownOnce = new (0, $2cIHb.BindOnceFuture)(this._shutdown, this);
        if (this._maxExportBatchSize > this._maxQueueSize) {
            (0, $ljza4.diag).warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
            this._maxExportBatchSize = this._maxQueueSize;
        }
    }
    BatchSpanProcessorBase.prototype.forceFlush = function() {
        if (this._shutdownOnce.isCalled) return this._shutdownOnce.promise;
        return this._flushAll();
    };
    // does nothing.
    BatchSpanProcessorBase.prototype.onStart = function(_span, _parentContext) {};
    BatchSpanProcessorBase.prototype.onEnd = function(span) {
        if (this._shutdownOnce.isCalled) return;
        if ((span.spanContext().traceFlags & (0, $AvSm7.TraceFlags).SAMPLED) === 0) return;
        this._addToBuffer(span);
    };
    BatchSpanProcessorBase.prototype.shutdown = function() {
        return this._shutdownOnce.call();
    };
    BatchSpanProcessorBase.prototype._shutdown = function() {
        var _this = this;
        return Promise.resolve().then(function() {
            return _this.onShutdown();
        }).then(function() {
            return _this._flushAll();
        }).then(function() {
            return _this._exporter.shutdown();
        });
    };
    /** Add a span in the buffer. */ BatchSpanProcessorBase.prototype._addToBuffer = function(span) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
            // limit reached, drop span
            if (this._droppedSpansCount === 0) (0, $ljza4.diag).debug("maxQueueSize reached, dropping spans");
            this._droppedSpansCount++;
            return;
        }
        if (this._droppedSpansCount > 0) {
            // some spans were dropped, log once with count of spans dropped
            (0, $ljza4.diag).warn("Dropped " + this._droppedSpansCount + " spans because maxQueueSize reached");
            this._droppedSpansCount = 0;
        }
        this._finishedSpans.push(span);
        this._maybeStartTimer();
    };
    /**
     * Send all spans to the exporter respecting the batch size limit
     * This function is used only on forceFlush or shutdown,
     * for all other cases _flush should be used
     * */ BatchSpanProcessorBase.prototype._flushAll = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
            var promises = [];
            // calculate number of batches
            var count = Math.ceil(_this._finishedSpans.length / _this._maxExportBatchSize);
            for(var i = 0, j = count; i < j; i++)promises.push(_this._flushOneBatch());
            Promise.all(promises).then(function() {
                resolve();
            }).catch(reject);
        });
    };
    BatchSpanProcessorBase.prototype._flushOneBatch = function() {
        var _this = this;
        this._clearTimer();
        if (this._finishedSpans.length === 0) return Promise.resolve();
        return new Promise(function(resolve, reject) {
            var timer = setTimeout(function() {
                // don't wait anymore for export, this way the next batch can start
                reject(new Error("Timeout"));
            }, _this._exportTimeoutMillis);
            // prevent downstream exporter calls from generating spans
            (0, $hfZRB.context).with((0, $8WcVy.suppressTracing)((0, $hfZRB.context).active()), function() {
                // Reset the finished spans buffer here because the next invocations of the _flush method
                // could pass the same finished spans to the exporter if the buffer is cleared
                // outside the execution of this callback.
                var spans;
                if (_this._finishedSpans.length <= _this._maxExportBatchSize) {
                    spans = _this._finishedSpans;
                    _this._finishedSpans = [];
                } else spans = _this._finishedSpans.splice(0, _this._maxExportBatchSize);
                var doExport = function() {
                    return _this._exporter.export(spans, function(result) {
                        var _a;
                        clearTimeout(timer);
                        if (result.code === (0, $eLOET.ExportResultCode).SUCCESS) resolve();
                        else reject((_a = result.error) !== null && _a !== void 0 ? _a : new Error("BatchSpanProcessor: span export failed"));
                    });
                };
                var pendingResources = null;
                for(var i = 0, len = spans.length; i < len; i++){
                    var span = spans[i];
                    if (span.resource.asyncAttributesPending && span.resource.waitForAsyncAttributes) {
                        pendingResources !== null && pendingResources !== void 0 ? pendingResources : pendingResources = [];
                        pendingResources.push(span.resource.waitForAsyncAttributes());
                    }
                }
                // Avoid scheduling a promise to make the behavior more predictable and easier to test
                if (pendingResources === null) doExport();
                else Promise.all(pendingResources).then(doExport, function(err) {
                    (0, $7U7yv.globalErrorHandler)(err);
                    reject(err);
                });
            });
        });
    };
    BatchSpanProcessorBase.prototype._maybeStartTimer = function() {
        var _this = this;
        if (this._isExporting) return;
        var flush = function() {
            _this._isExporting = true;
            _this._flushOneBatch().finally(function() {
                _this._isExporting = false;
                if (_this._finishedSpans.length > 0) {
                    _this._clearTimer();
                    _this._maybeStartTimer();
                }
            }).catch(function(e) {
                _this._isExporting = false;
                (0, $7U7yv.globalErrorHandler)(e);
            });
        };
        // we only wait if the queue doesn't have enough elements yet
        if (this._finishedSpans.length >= this._maxExportBatchSize) return flush();
        if (this._timer !== undefined) return;
        this._timer = setTimeout(function() {
            return flush();
        }, this._scheduledDelayMillis);
        (0, $6gqSD.unrefTimer)(this._timer);
    };
    BatchSpanProcessorBase.prototype._clearTimer = function() {
        if (this._timer !== undefined) {
            clearTimeout(this._timer);
            this._timer = undefined;
        }
    };
    return BatchSpanProcessorBase;
}();

});
parcelRegister("2cIHb", function(module, exports) {

$parcel$export(module.exports, "BindOnceFuture", () => $19af5f5a0ba515c8$export$c1f52ab4952184cd);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $ge6aw = parcelRequire("ge6aw");
var $19af5f5a0ba515c8$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $19af5f5a0ba515c8$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Bind the callback and only invoke the callback once regardless how many times `BindOnceFuture.call` is invoked.
 */ var $19af5f5a0ba515c8$export$c1f52ab4952184cd = /** @class */ function() {
    function BindOnceFuture(_callback, _that) {
        this._callback = _callback;
        this._that = _that;
        this._isCalled = false;
        this._deferred = new (0, $ge6aw.Deferred)();
    }
    Object.defineProperty(BindOnceFuture.prototype, "isCalled", {
        get: function() {
            return this._isCalled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindOnceFuture.prototype, "promise", {
        get: function() {
            return this._deferred.promise;
        },
        enumerable: false,
        configurable: true
    });
    BindOnceFuture.prototype.call = function() {
        var _a;
        var _this = this;
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (!this._isCalled) {
            this._isCalled = true;
            try {
                Promise.resolve((_a = this._callback).call.apply(_a, $19af5f5a0ba515c8$var$__spreadArray([
                    this._that
                ], $19af5f5a0ba515c8$var$__read(args), false))).then(function(val) {
                    return _this._deferred.resolve(val);
                }, function(err) {
                    return _this._deferred.reject(err);
                });
            } catch (err) {
                this._deferred.reject(err);
            }
        }
        return this._deferred.promise;
    };
    return BindOnceFuture;
}();

});
parcelRegister("ge6aw", function(module, exports) {

$parcel$export(module.exports, "Deferred", () => $bd02bd1d52e7aee5$export$85f6557964517f1a);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $bd02bd1d52e7aee5$export$85f6557964517f1a = /** @class */ function() {
    function Deferred() {
        var _this = this;
        this._promise = new Promise(function(resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
    }
    Object.defineProperty(Deferred.prototype, "promise", {
        get: function() {
            return this._promise;
        },
        enumerable: false,
        configurable: true
    });
    Deferred.prototype.resolve = function(val) {
        this._resolve(val);
    };
    Deferred.prototype.reject = function(err) {
        this._reject(err);
    };
    return Deferred;
}();

});


parcelRegister("eLOET", function(module, exports) {

$parcel$export(module.exports, "ExportResultCode", () => $ac0cc02fe5ac1334$export$ee0fe4df4ef0f3a1);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $ac0cc02fe5ac1334$export$ee0fe4df4ef0f3a1;
(function(ExportResultCode) {
    ExportResultCode[ExportResultCode["SUCCESS"] = 0] = "SUCCESS";
    ExportResultCode[ExportResultCode["FAILED"] = 1] = "FAILED";
})($ac0cc02fe5ac1334$export$ee0fe4df4ef0f3a1 || ($ac0cc02fe5ac1334$export$ee0fe4df4ef0f3a1 = {}));

});

parcelRegister("3M0CS", function(module, exports) {

$parcel$export(module.exports, "getEnv", () => $2bf6571a244c8719$export$4bd44a2aa29d3d6e);
$parcel$export(module.exports, "getEnvWithoutDefaults", () => $2bf6571a244c8719$export$728650dd4748d692);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $2veCN = parcelRequire("2veCN");

var $5Nb0V = parcelRequire("5Nb0V");
function $2bf6571a244c8719$export$4bd44a2aa29d3d6e() {
    var globalEnv = (0, $2veCN.parseEnvironment)((0, $5Nb0V._globalThis));
    return Object.assign({}, (0, $2veCN.DEFAULT_ENVIRONMENT), globalEnv);
}
function $2bf6571a244c8719$export$728650dd4748d692() {
    return (0, $2veCN.parseEnvironment)((0, $5Nb0V._globalThis));
}

});
parcelRegister("2veCN", function(module, exports) {

$parcel$export(module.exports, "DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT", () => $1d29d230e496f2b1$export$d9446f3c1c12def1);
$parcel$export(module.exports, "DEFAULT_ATTRIBUTE_COUNT_LIMIT", () => $1d29d230e496f2b1$export$6ad612be99f9ed48);
$parcel$export(module.exports, "DEFAULT_ENVIRONMENT", () => $1d29d230e496f2b1$export$849dbeeeda01ae98);
$parcel$export(module.exports, "parseEnvironment", () => $1d29d230e496f2b1$export$99f17f8ee99049eb);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $46NDq = parcelRequire("46NDq");

var $6Mxke = parcelRequire("6Mxke");
var $1d29d230e496f2b1$var$DEFAULT_LIST_SEPARATOR = ",";
/**
 * Environment interface to define all names
 */ var $1d29d230e496f2b1$var$ENVIRONMENT_BOOLEAN_KEYS = [
    "OTEL_SDK_DISABLED"
];
function $1d29d230e496f2b1$var$isEnvVarABoolean(key) {
    return $1d29d230e496f2b1$var$ENVIRONMENT_BOOLEAN_KEYS.indexOf(key) > -1;
}
var $1d29d230e496f2b1$var$ENVIRONMENT_NUMBERS_KEYS = [
    "OTEL_BSP_EXPORT_TIMEOUT",
    "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
    "OTEL_BSP_MAX_QUEUE_SIZE",
    "OTEL_BSP_SCHEDULE_DELAY",
    "OTEL_BLRP_EXPORT_TIMEOUT",
    "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE",
    "OTEL_BLRP_MAX_QUEUE_SIZE",
    "OTEL_BLRP_SCHEDULE_DELAY",
    "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
    "OTEL_ATTRIBUTE_COUNT_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
    "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT",
    "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT",
    "OTEL_SPAN_EVENT_COUNT_LIMIT",
    "OTEL_SPAN_LINK_COUNT_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT",
    "OTEL_EXPORTER_OTLP_TIMEOUT",
    "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
    "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
    "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT",
    "OTEL_EXPORTER_JAEGER_AGENT_PORT"
];
function $1d29d230e496f2b1$var$isEnvVarANumber(key) {
    return $1d29d230e496f2b1$var$ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
}
var $1d29d230e496f2b1$var$ENVIRONMENT_LISTS_KEYS = [
    "OTEL_NO_PATCH_MODULES",
    "OTEL_PROPAGATORS"
];
function $1d29d230e496f2b1$var$isEnvVarAList(key) {
    return $1d29d230e496f2b1$var$ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
}
var $1d29d230e496f2b1$export$d9446f3c1c12def1 = Infinity;
var $1d29d230e496f2b1$export$6ad612be99f9ed48 = 128;
var $1d29d230e496f2b1$export$c5bbf26b60de6148 = 128;
var $1d29d230e496f2b1$export$f200b88493991cbe = 128;
var $1d29d230e496f2b1$export$849dbeeeda01ae98 = {
    OTEL_SDK_DISABLED: false,
    CONTAINER_NAME: "",
    ECS_CONTAINER_METADATA_URI_V4: "",
    ECS_CONTAINER_METADATA_URI: "",
    HOSTNAME: "",
    KUBERNETES_SERVICE_HOST: "",
    NAMESPACE: "",
    OTEL_BSP_EXPORT_TIMEOUT: 30000,
    OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
    OTEL_BSP_MAX_QUEUE_SIZE: 2048,
    OTEL_BSP_SCHEDULE_DELAY: 5000,
    OTEL_BLRP_EXPORT_TIMEOUT: 30000,
    OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
    OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
    OTEL_BLRP_SCHEDULE_DELAY: 5000,
    OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
    OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
    OTEL_EXPORTER_JAEGER_ENDPOINT: "",
    OTEL_EXPORTER_JAEGER_PASSWORD: "",
    OTEL_EXPORTER_JAEGER_USER: "",
    OTEL_EXPORTER_OTLP_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_HEADERS: "",
    OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
    OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
    OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
    OTEL_EXPORTER_OTLP_TIMEOUT: 10000,
    OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 10000,
    OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 10000,
    OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 10000,
    OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
    OTEL_LOG_LEVEL: (0, $46NDq.DiagLogLevel).INFO,
    OTEL_NO_PATCH_MODULES: [],
    OTEL_PROPAGATORS: [
        "tracecontext",
        "baggage"
    ],
    OTEL_RESOURCE_ATTRIBUTES: "",
    OTEL_SERVICE_NAME: "",
    OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: $1d29d230e496f2b1$export$d9446f3c1c12def1,
    OTEL_ATTRIBUTE_COUNT_LIMIT: $1d29d230e496f2b1$export$6ad612be99f9ed48,
    OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: $1d29d230e496f2b1$export$d9446f3c1c12def1,
    OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: $1d29d230e496f2b1$export$6ad612be99f9ed48,
    OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: $1d29d230e496f2b1$export$d9446f3c1c12def1,
    OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: $1d29d230e496f2b1$export$6ad612be99f9ed48,
    OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
    OTEL_SPAN_LINK_COUNT_LIMIT: 128,
    OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: $1d29d230e496f2b1$export$c5bbf26b60de6148,
    OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: $1d29d230e496f2b1$export$f200b88493991cbe,
    OTEL_TRACES_EXPORTER: "",
    OTEL_TRACES_SAMPLER: (0, $6Mxke.TracesSamplerValues).ParentBasedAlwaysOn,
    OTEL_TRACES_SAMPLER_ARG: "",
    OTEL_LOGS_EXPORTER: "",
    OTEL_EXPORTER_OTLP_INSECURE: "",
    OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
    OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
    OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
    OTEL_EXPORTER_OTLP_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
};
/**
 * @param key
 * @param environment
 * @param values
 */ function $1d29d230e496f2b1$var$parseBoolean(key, environment, values) {
    if (typeof values[key] === "undefined") return;
    var value = String(values[key]);
    // support case-insensitive "true"
    environment[key] = value.toLowerCase() === "true";
}
/**
 * Parses a variable as number with number validation
 * @param name
 * @param environment
 * @param values
 * @param min
 * @param max
 */ function $1d29d230e496f2b1$var$parseNumber(name, environment, values, min, max) {
    if (min === void 0) min = -Infinity;
    if (max === void 0) max = Infinity;
    if (typeof values[name] !== "undefined") {
        var value = Number(values[name]);
        if (!isNaN(value)) {
            if (value < min) environment[name] = min;
            else if (value > max) environment[name] = max;
            else environment[name] = value;
        }
    }
}
/**
 * Parses list-like strings from input into output.
 * @param name
 * @param environment
 * @param values
 * @param separator
 */ function $1d29d230e496f2b1$var$parseStringList(name, output, input, separator) {
    if (separator === void 0) separator = $1d29d230e496f2b1$var$DEFAULT_LIST_SEPARATOR;
    var givenValue = input[name];
    if (typeof givenValue === "string") output[name] = givenValue.split(separator).map(function(v) {
        return v.trim();
    });
}
// The support string -> DiagLogLevel mappings
var $1d29d230e496f2b1$var$logLevelMap = {
    ALL: (0, $46NDq.DiagLogLevel).ALL,
    VERBOSE: (0, $46NDq.DiagLogLevel).VERBOSE,
    DEBUG: (0, $46NDq.DiagLogLevel).DEBUG,
    INFO: (0, $46NDq.DiagLogLevel).INFO,
    WARN: (0, $46NDq.DiagLogLevel).WARN,
    ERROR: (0, $46NDq.DiagLogLevel).ERROR,
    NONE: (0, $46NDq.DiagLogLevel).NONE
};
/**
 * Environmentally sets log level if valid log level string is provided
 * @param key
 * @param environment
 * @param values
 */ function $1d29d230e496f2b1$var$setLogLevelFromEnv(key, environment, values) {
    var value = values[key];
    if (typeof value === "string") {
        var theLevel = $1d29d230e496f2b1$var$logLevelMap[value.toUpperCase()];
        if (theLevel != null) environment[key] = theLevel;
    }
}
function $1d29d230e496f2b1$export$99f17f8ee99049eb(values) {
    var environment = {};
    for(var env in $1d29d230e496f2b1$export$849dbeeeda01ae98){
        var key = env;
        switch(key){
            case "OTEL_LOG_LEVEL":
                $1d29d230e496f2b1$var$setLogLevelFromEnv(key, environment, values);
                break;
            default:
                if ($1d29d230e496f2b1$var$isEnvVarABoolean(key)) $1d29d230e496f2b1$var$parseBoolean(key, environment, values);
                else if ($1d29d230e496f2b1$var$isEnvVarANumber(key)) $1d29d230e496f2b1$var$parseNumber(key, environment, values);
                else if ($1d29d230e496f2b1$var$isEnvVarAList(key)) $1d29d230e496f2b1$var$parseStringList(key, environment, values);
                else {
                    var value = values[key];
                    if (typeof value !== "undefined" && value !== null) environment[key] = String(value);
                }
        }
    }
    return environment;
}

});
parcelRegister("6Mxke", function(module, exports) {

$parcel$export(module.exports, "TracesSamplerValues", () => $4f01137b999274bc$export$243c1c4fe84ef188);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $4f01137b999274bc$export$243c1c4fe84ef188;
(function(TracesSamplerValues) {
    TracesSamplerValues["AlwaysOff"] = "always_off";
    TracesSamplerValues["AlwaysOn"] = "always_on";
    TracesSamplerValues["ParentBasedAlwaysOff"] = "parentbased_always_off";
    TracesSamplerValues["ParentBasedAlwaysOn"] = "parentbased_always_on";
    TracesSamplerValues["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
    TracesSamplerValues["TraceIdRatio"] = "traceidratio";
})($4f01137b999274bc$export$243c1c4fe84ef188 || ($4f01137b999274bc$export$243c1c4fe84ef188 = {}));

});


parcelRegister("5Nb0V", function(module, exports) {

$parcel$export(module.exports, "_globalThis", () => $437a12772fb2f2b6$export$5c524ddf7208c00c);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Updates to this file should also be replicated to @opentelemetry/api too.
/**
 * - globalThis (New standard)
 * - self (Will return the current window instance for supported browsers)
 * - window (fallback for older browser implementations)
 * - global (NodeJS implementation)
 * - <object> (When all else fails)
 */ /** only globals that common to node and browsers are allowed */ // eslint-disable-next-line node/no-unsupported-features/es-builtins, no-undef
var $437a12772fb2f2b6$export$5c524ddf7208c00c = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof $parcel$global === "object" ? $parcel$global : {};

});


parcelRegister("7U7yv", function(module, exports) {

$parcel$export(module.exports, "globalErrorHandler", () => $5c139fbfce029b83$export$54c6946fc34b7cc2);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $diNH0 = parcelRequire("diNH0");
/** The global error handler delegate */ var $5c139fbfce029b83$var$delegateHandler = (0, $diNH0.loggingErrorHandler)();
function $5c139fbfce029b83$export$bdff946829732435(handler) {
    $5c139fbfce029b83$var$delegateHandler = handler;
}
function $5c139fbfce029b83$export$54c6946fc34b7cc2(ex) {
    try {
        $5c139fbfce029b83$var$delegateHandler(ex);
    } catch (_a) {} // eslint-disable-line no-empty
}

});
parcelRegister("diNH0", function(module, exports) {

$parcel$export(module.exports, "loggingErrorHandler", () => $9af380beed859c7e$export$cd67a16f6d11e5bd);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
function $9af380beed859c7e$export$cd67a16f6d11e5bd() {
    return function(ex) {
        (0, $ljza4.diag).error($9af380beed859c7e$var$stringifyException(ex));
    };
}
/**
 * Converts an exception into a string representation
 * @param {Exception} ex
 */ function $9af380beed859c7e$var$stringifyException(ex) {
    if (typeof ex === "string") return ex;
    else return JSON.stringify($9af380beed859c7e$var$flattenException(ex));
}
/**
 * Flattens an exception into key-value pairs by traversing the prototype chain
 * and coercing values to strings. Duplicate properties will not be overwritten;
 * the first insert wins.
 */ function $9af380beed859c7e$var$flattenException(ex) {
    var result = {};
    var current = ex;
    while(current !== null){
        Object.getOwnPropertyNames(current).forEach(function(propertyName) {
            if (result[propertyName]) return;
            var value = current[propertyName];
            if (value) result[propertyName] = String(value);
        });
        current = Object.getPrototypeOf(current);
    }
    return result;
}

});


parcelRegister("8WcVy", function(module, exports) {

$parcel$export(module.exports, "suppressTracing", () => $681dc49ded58dd0c$export$869298f9835abc68);
$parcel$export(module.exports, "isTracingSuppressed", () => $681dc49ded58dd0c$export$7d5f2376f7cf513);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cE6pj = parcelRequire("cE6pj");
var $681dc49ded58dd0c$var$SUPPRESS_TRACING_KEY = (0, $cE6pj.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function $681dc49ded58dd0c$export$869298f9835abc68(context) {
    return context.setValue($681dc49ded58dd0c$var$SUPPRESS_TRACING_KEY, true);
}
function $681dc49ded58dd0c$export$a8cb26cef1019d30(context) {
    return context.deleteValue($681dc49ded58dd0c$var$SUPPRESS_TRACING_KEY);
}
function $681dc49ded58dd0c$export$7d5f2376f7cf513(context) {
    return context.getValue($681dc49ded58dd0c$var$SUPPRESS_TRACING_KEY) === true;
}

});

parcelRegister("6gqSD", function(module, exports) {

$parcel$export(module.exports, "unrefTimer", () => $48f9168e3b3a85e0$export$13bcdd8a72da0e8f);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $48f9168e3b3a85e0$export$13bcdd8a72da0e8f(_timer) {}

});



parcelRegister("dKzbF", function(module, exports) {

$parcel$export(module.exports, "WebTracerProvider", () => $a02addadea16a97a$export$a785009afeee3453);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $fg9Mb = parcelRequire("fg9Mb");

var $72Hpy = parcelRequire("72Hpy");
var $a02addadea16a97a$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * This class represents a web tracer with {@link StackContextManager}
 */ var $a02addadea16a97a$export$a785009afeee3453 = /** @class */ function(_super) {
    $a02addadea16a97a$var$__extends(WebTracerProvider, _super);
    /**
     * Constructs a new Tracer instance.
     * @param config Web Tracer config
     */ function WebTracerProvider(config) {
        if (config === void 0) config = {};
        var _this = _super.call(this, config) || this;
        if (config.contextManager) throw "contextManager should be defined in register method not in constructor";
        if (config.propagator) throw "propagator should be defined in register method not in constructor";
        return _this;
    }
    /**
     * Register this TracerProvider for use with the OpenTelemetry API.
     * Undefined values may be replaced with defaults, and
     * null values will be skipped.
     *
     * @param config Configuration object for SDK registration
     */ WebTracerProvider.prototype.register = function(config) {
        if (config === void 0) config = {};
        if (config.contextManager === undefined) config.contextManager = new (0, $72Hpy.StackContextManager)();
        if (config.contextManager) config.contextManager.enable();
        _super.prototype.register.call(this, config);
    };
    return WebTracerProvider;
}((0, $fg9Mb.BasicTracerProvider));

});
parcelRegister("fg9Mb", function(module, exports) {

$parcel$export(module.exports, "BasicTracerProvider", () => $b1bfeeff9fce920d$export$1f2f0f67f5ecff3b);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $hfZRB = parcelRequire("hfZRB");
var $ljza4 = parcelRequire("ljza4");
var $4tmHU = parcelRequire("4tmHU");
var $ibuLL = parcelRequire("ibuLL");

var $fNoD1 = parcelRequire("fNoD1");
var $3M0CS = parcelRequire("3M0CS");
var $ia2Wg = parcelRequire("ia2Wg");
var $9Ud6q = parcelRequire("9Ud6q");
var $3FLWz = parcelRequire("3FLWz");

var $kawsV = parcelRequire("kawsV");

var $cLual = parcelRequire("cLual");

var $caAfP = parcelRequire("caAfP");

var $iHXy1 = parcelRequire("iHXy1");

var $4N619 = parcelRequire("4N619");

var $39bMr = parcelRequire("39bMr");

var $8eAUr = parcelRequire("8eAUr");
var $b1bfeeff9fce920d$export$11a85395fcf5a7f0;
(function(ForceFlushState) {
    ForceFlushState[ForceFlushState["resolved"] = 0] = "resolved";
    ForceFlushState[ForceFlushState["timeout"] = 1] = "timeout";
    ForceFlushState[ForceFlushState["error"] = 2] = "error";
    ForceFlushState[ForceFlushState["unresolved"] = 3] = "unresolved";
})($b1bfeeff9fce920d$export$11a85395fcf5a7f0 || ($b1bfeeff9fce920d$export$11a85395fcf5a7f0 = {}));
/**
 * This class represents a basic tracer provider which platform libraries can extend
 */ var $b1bfeeff9fce920d$export$1f2f0f67f5ecff3b = /** @class */ function() {
    function BasicTracerProvider(config) {
        if (config === void 0) config = {};
        var _a;
        this._registeredSpanProcessors = [];
        this._tracers = new Map();
        var mergedConfig = (0, $ia2Wg.merge)({}, (0, $caAfP.loadDefaultConfig)(), (0, $8eAUr.reconfigureLimits)(config));
        this.resource = (_a = mergedConfig.resource) !== null && _a !== void 0 ? _a : (0, $kawsV.Resource).empty();
        this.resource = (0, $kawsV.Resource).default().merge(this.resource);
        this._config = Object.assign({}, mergedConfig, {
            resource: this.resource
        });
        var defaultExporter = this._buildExporterFromEnv();
        if (defaultExporter !== undefined) {
            var batchProcessor = new (0, $39bMr.BatchSpanProcessor)(defaultExporter);
            this.activeSpanProcessor = batchProcessor;
        } else this.activeSpanProcessor = new (0, $4N619.NoopSpanProcessor)();
    }
    BasicTracerProvider.prototype.getTracer = function(name, version, options) {
        var key = name + "@" + (version || "") + ":" + ((options === null || options === void 0 ? void 0 : options.schemaUrl) || "");
        if (!this._tracers.has(key)) this._tracers.set(key, new (0, $cLual.Tracer)({
            name: name,
            version: version,
            schemaUrl: options === null || options === void 0 ? void 0 : options.schemaUrl
        }, this._config, this));
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._tracers.get(key);
    };
    /**
     * Adds a new {@link SpanProcessor} to this tracer.
     * @param spanProcessor the new SpanProcessor to be added.
     */ BasicTracerProvider.prototype.addSpanProcessor = function(spanProcessor) {
        if (this._registeredSpanProcessors.length === 0) // since we might have enabled by default a batchProcessor, we disable it
        // before adding the new one
        this.activeSpanProcessor.shutdown().catch(function(err) {
            return (0, $ljza4.diag).error("Error while trying to shutdown current span processor", err);
        });
        this._registeredSpanProcessors.push(spanProcessor);
        this.activeSpanProcessor = new (0, $iHXy1.MultiSpanProcessor)(this._registeredSpanProcessors);
    };
    BasicTracerProvider.prototype.getActiveSpanProcessor = function() {
        return this.activeSpanProcessor;
    };
    /**
     * Register this TracerProvider for use with the OpenTelemetry API.
     * Undefined values may be replaced with defaults, and
     * null values will be skipped.
     *
     * @param config Configuration object for SDK registration
     */ BasicTracerProvider.prototype.register = function(config) {
        if (config === void 0) config = {};
        (0, $ibuLL.trace).setGlobalTracerProvider(this);
        if (config.propagator === undefined) config.propagator = this._buildPropagatorFromEnv();
        if (config.contextManager) (0, $hfZRB.context).setGlobalContextManager(config.contextManager);
        if (config.propagator) (0, $4tmHU.propagation).setGlobalPropagator(config.propagator);
    };
    BasicTracerProvider.prototype.forceFlush = function() {
        var timeout = this._config.forceFlushTimeoutMillis;
        var promises = this._registeredSpanProcessors.map(function(spanProcessor) {
            return new Promise(function(resolve) {
                var state;
                var timeoutInterval = setTimeout(function() {
                    resolve(new Error("Span processor did not completed within timeout period of " + timeout + " ms"));
                    state = $b1bfeeff9fce920d$export$11a85395fcf5a7f0.timeout;
                }, timeout);
                spanProcessor.forceFlush().then(function() {
                    clearTimeout(timeoutInterval);
                    if (state !== $b1bfeeff9fce920d$export$11a85395fcf5a7f0.timeout) {
                        state = $b1bfeeff9fce920d$export$11a85395fcf5a7f0.resolved;
                        resolve(state);
                    }
                }).catch(function(error) {
                    clearTimeout(timeoutInterval);
                    state = $b1bfeeff9fce920d$export$11a85395fcf5a7f0.error;
                    resolve(error);
                });
            });
        });
        return new Promise(function(resolve, reject) {
            Promise.all(promises).then(function(results) {
                var errors = results.filter(function(result) {
                    return result !== $b1bfeeff9fce920d$export$11a85395fcf5a7f0.resolved;
                });
                if (errors.length > 0) reject(errors);
                else resolve();
            }).catch(function(error) {
                return reject([
                    error
                ]);
            });
        });
    };
    BasicTracerProvider.prototype.shutdown = function() {
        return this.activeSpanProcessor.shutdown();
    };
    /**
     * TS cannot yet infer the type of this.constructor:
     * https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
     * There is no need to override either of the getters in your child class.
     * The type of the registered component maps should be the same across all
     * classes in the inheritance tree.
     */ BasicTracerProvider.prototype._getPropagator = function(name) {
        var _a;
        return (_a = this.constructor._registeredPropagators.get(name)) === null || _a === void 0 ? void 0 : _a();
    };
    BasicTracerProvider.prototype._getSpanExporter = function(name) {
        var _a;
        return (_a = this.constructor._registeredExporters.get(name)) === null || _a === void 0 ? void 0 : _a();
    };
    BasicTracerProvider.prototype._buildPropagatorFromEnv = function() {
        var _this = this;
        // per spec, propagators from env must be deduplicated
        var uniquePropagatorNames = Array.from(new Set((0, $3M0CS.getEnv)().OTEL_PROPAGATORS));
        var propagators = uniquePropagatorNames.map(function(name) {
            var propagator = _this._getPropagator(name);
            if (!propagator) (0, $ljza4.diag).warn('Propagator "' + name + '" requested through environment variable is unavailable.');
            return propagator;
        });
        var validPropagators = propagators.reduce(function(list, item) {
            if (item) list.push(item);
            return list;
        }, []);
        if (validPropagators.length === 0) return;
        else if (uniquePropagatorNames.length === 1) return validPropagators[0];
        else return new (0, $fNoD1.CompositePropagator)({
            propagators: validPropagators
        });
    };
    BasicTracerProvider.prototype._buildExporterFromEnv = function() {
        var exporterName = (0, $3M0CS.getEnv)().OTEL_TRACES_EXPORTER;
        if (exporterName === "none" || exporterName === "") return;
        var exporter = this._getSpanExporter(exporterName);
        if (!exporter) (0, $ljza4.diag).error('Exporter "' + exporterName + '" requested through environment variable is unavailable.');
        return exporter;
    };
    BasicTracerProvider._registeredPropagators = new Map([
        [
            "tracecontext",
            function() {
                return new (0, $3FLWz.W3CTraceContextPropagator)();
            }
        ],
        [
            "baggage",
            function() {
                return new (0, $9Ud6q.W3CBaggagePropagator)();
            }
        ]
    ]);
    BasicTracerProvider._registeredExporters = new Map();
    return BasicTracerProvider;
}();

});
parcelRegister("fNoD1", function(module, exports) {

$parcel$export(module.exports, "CompositePropagator", () => $b7fe894827773e5b$export$4beb26f46770357f);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
var $b7fe894827773e5b$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/** Combines multiple propagators into a single propagator. */ var $b7fe894827773e5b$export$4beb26f46770357f = /** @class */ function() {
    /**
     * Construct a composite propagator from a list of propagators.
     *
     * @param [config] Configuration object for composite propagator
     */ function CompositePropagator(config) {
        if (config === void 0) config = {};
        var _a;
        this._propagators = (_a = config.propagators) !== null && _a !== void 0 ? _a : [];
        this._fields = Array.from(new Set(this._propagators// older propagators may not have fields function, null check to be sure
        .map(function(p) {
            return typeof p.fields === "function" ? p.fields() : [];
        }).reduce(function(x, y) {
            return x.concat(y);
        }, [])));
    }
    /**
     * Run each of the configured propagators with the given context and carrier.
     * Propagators are run in the order they are configured, so if multiple
     * propagators write the same carrier key, the propagator later in the list
     * will "win".
     *
     * @param context Context to inject
     * @param carrier Carrier into which context will be injected
     */ CompositePropagator.prototype.inject = function(context, carrier, setter) {
        var e_1, _a;
        try {
            for(var _b = $b7fe894827773e5b$var$__values(this._propagators), _c = _b.next(); !_c.done; _c = _b.next()){
                var propagator = _c.value;
                try {
                    propagator.inject(context, carrier, setter);
                } catch (err) {
                    (0, $ljza4.diag).warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
                }
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    /**
     * Run each of the configured propagators with the given context and carrier.
     * Propagators are run in the order they are configured, so if multiple
     * propagators write the same context key, the propagator later in the list
     * will "win".
     *
     * @param context Context to add values to
     * @param carrier Carrier from which to extract context
     */ CompositePropagator.prototype.extract = function(context, carrier, getter) {
        return this._propagators.reduce(function(ctx, propagator) {
            try {
                return propagator.extract(ctx, carrier, getter);
            } catch (err) {
                (0, $ljza4.diag).warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
            }
            return ctx;
        }, context);
    };
    CompositePropagator.prototype.fields = function() {
        // return a new array so our fields cannot be modified
        return this._fields.slice();
    };
    return CompositePropagator;
}();

});

parcelRegister("ia2Wg", function(module, exports) {

$parcel$export(module.exports, "merge", () => $d38b70c327ed913f$export$4950aa0f605343fb);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /* eslint-disable @typescript-eslint/no-explicit-any */ 
var $flJ0E = parcelRequire("flJ0E");
var $d38b70c327ed913f$var$MAX_LEVEL = 20;
function $d38b70c327ed913f$export$4950aa0f605343fb() {
    var args = [];
    for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
    var result = args.shift();
    var objects = new WeakMap();
    while(args.length > 0)result = $d38b70c327ed913f$var$mergeTwoObjects(result, args.shift(), 0, objects);
    return result;
}
function $d38b70c327ed913f$var$takeValue(value) {
    if ($d38b70c327ed913f$var$isArray(value)) return value.slice();
    return value;
}
/**
 * Merges two objects
 * @param one - first object
 * @param two - second object
 * @param level - current deep level
 * @param objects - objects holder that has been already referenced - to prevent
 * cyclic dependency
 */ function $d38b70c327ed913f$var$mergeTwoObjects(one, two, level, objects) {
    if (level === void 0) level = 0;
    var result;
    if (level > $d38b70c327ed913f$var$MAX_LEVEL) return undefined;
    level++;
    if ($d38b70c327ed913f$var$isPrimitive(one) || $d38b70c327ed913f$var$isPrimitive(two) || $d38b70c327ed913f$var$isFunction(two)) result = $d38b70c327ed913f$var$takeValue(two);
    else if ($d38b70c327ed913f$var$isArray(one)) {
        result = one.slice();
        if ($d38b70c327ed913f$var$isArray(two)) for(var i = 0, j = two.length; i < j; i++)result.push($d38b70c327ed913f$var$takeValue(two[i]));
        else if ($d38b70c327ed913f$var$isObject(two)) {
            var keys = Object.keys(two);
            for(var i = 0, j = keys.length; i < j; i++){
                var key = keys[i];
                result[key] = $d38b70c327ed913f$var$takeValue(two[key]);
            }
        }
    } else if ($d38b70c327ed913f$var$isObject(one)) {
        if ($d38b70c327ed913f$var$isObject(two)) {
            if (!$d38b70c327ed913f$var$shouldMerge(one, two)) return two;
            result = Object.assign({}, one);
            var keys = Object.keys(two);
            for(var i = 0, j = keys.length; i < j; i++){
                var key = keys[i];
                var twoValue = two[key];
                if ($d38b70c327ed913f$var$isPrimitive(twoValue)) {
                    if (typeof twoValue === "undefined") delete result[key];
                    else // result[key] = takeValue(twoValue);
                    result[key] = twoValue;
                } else {
                    var obj1 = result[key];
                    var obj2 = twoValue;
                    if ($d38b70c327ed913f$var$wasObjectReferenced(one, key, objects) || $d38b70c327ed913f$var$wasObjectReferenced(two, key, objects)) delete result[key];
                    else {
                        if ($d38b70c327ed913f$var$isObject(obj1) && $d38b70c327ed913f$var$isObject(obj2)) {
                            var arr1 = objects.get(obj1) || [];
                            var arr2 = objects.get(obj2) || [];
                            arr1.push({
                                obj: one,
                                key: key
                            });
                            arr2.push({
                                obj: two,
                                key: key
                            });
                            objects.set(obj1, arr1);
                            objects.set(obj2, arr2);
                        }
                        result[key] = $d38b70c327ed913f$var$mergeTwoObjects(result[key], twoValue, level, objects);
                    }
                }
            }
        } else result = two;
    }
    return result;
}
/**
 * Function to check if object has been already reference
 * @param obj
 * @param key
 * @param objects
 */ function $d38b70c327ed913f$var$wasObjectReferenced(obj, key, objects) {
    var arr = objects.get(obj[key]) || [];
    for(var i = 0, j = arr.length; i < j; i++){
        var info = arr[i];
        if (info.key === key && info.obj === obj) return true;
    }
    return false;
}
function $d38b70c327ed913f$var$isArray(value) {
    return Array.isArray(value);
}
function $d38b70c327ed913f$var$isFunction(value) {
    return typeof value === "function";
}
function $d38b70c327ed913f$var$isObject(value) {
    return !$d38b70c327ed913f$var$isPrimitive(value) && !$d38b70c327ed913f$var$isArray(value) && !$d38b70c327ed913f$var$isFunction(value) && typeof value === "object";
}
function $d38b70c327ed913f$var$isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
}
function $d38b70c327ed913f$var$shouldMerge(one, two) {
    if (!(0, $flJ0E.isPlainObject)(one) || !(0, $flJ0E.isPlainObject)(two)) return false;
    return true;
}

});
parcelRegister("flJ0E", function(module, exports) {

$parcel$export(module.exports, "isPlainObject", () => $b2cbbb20d3b6a51b$export$53b83ca8eaab0383);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /* eslint-disable @typescript-eslint/no-explicit-any */ /**
 * based on lodash in order to support esm builds without esModuleInterop.
 * lodash is using MIT License.
 **/ var $b2cbbb20d3b6a51b$var$objectTag = "[object Object]";
var $b2cbbb20d3b6a51b$var$nullTag = "[object Null]";
var $b2cbbb20d3b6a51b$var$undefinedTag = "[object Undefined]";
var $b2cbbb20d3b6a51b$var$funcProto = Function.prototype;
var $b2cbbb20d3b6a51b$var$funcToString = $b2cbbb20d3b6a51b$var$funcProto.toString;
var $b2cbbb20d3b6a51b$var$objectCtorString = $b2cbbb20d3b6a51b$var$funcToString.call(Object);
var $b2cbbb20d3b6a51b$var$getPrototype = $b2cbbb20d3b6a51b$var$overArg(Object.getPrototypeOf, Object);
var $b2cbbb20d3b6a51b$var$objectProto = Object.prototype;
var $b2cbbb20d3b6a51b$var$hasOwnProperty = $b2cbbb20d3b6a51b$var$objectProto.hasOwnProperty;
var $b2cbbb20d3b6a51b$var$symToStringTag = Symbol ? Symbol.toStringTag : undefined;
var $b2cbbb20d3b6a51b$var$nativeObjectToString = $b2cbbb20d3b6a51b$var$objectProto.toString;
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function $b2cbbb20d3b6a51b$var$overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
function $b2cbbb20d3b6a51b$export$53b83ca8eaab0383(value) {
    if (!$b2cbbb20d3b6a51b$var$isObjectLike(value) || $b2cbbb20d3b6a51b$var$baseGetTag(value) !== $b2cbbb20d3b6a51b$var$objectTag) return false;
    var proto = $b2cbbb20d3b6a51b$var$getPrototype(value);
    if (proto === null) return true;
    var Ctor = $b2cbbb20d3b6a51b$var$hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && $b2cbbb20d3b6a51b$var$funcToString.call(Ctor) === $b2cbbb20d3b6a51b$var$objectCtorString;
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function $b2cbbb20d3b6a51b$var$isObjectLike(value) {
    return value != null && typeof value == "object";
}
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function $b2cbbb20d3b6a51b$var$baseGetTag(value) {
    if (value == null) return value === undefined ? $b2cbbb20d3b6a51b$var$undefinedTag : $b2cbbb20d3b6a51b$var$nullTag;
    return $b2cbbb20d3b6a51b$var$symToStringTag && $b2cbbb20d3b6a51b$var$symToStringTag in Object(value) ? $b2cbbb20d3b6a51b$var$getRawTag(value) : $b2cbbb20d3b6a51b$var$objectToString(value);
}
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function $b2cbbb20d3b6a51b$var$getRawTag(value) {
    var isOwn = $b2cbbb20d3b6a51b$var$hasOwnProperty.call(value, $b2cbbb20d3b6a51b$var$symToStringTag), tag = value[$b2cbbb20d3b6a51b$var$symToStringTag];
    var unmasked = false;
    try {
        value[$b2cbbb20d3b6a51b$var$symToStringTag] = undefined;
        unmasked = true;
    } catch (e) {
    // silence
    }
    var result = $b2cbbb20d3b6a51b$var$nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) value[$b2cbbb20d3b6a51b$var$symToStringTag] = tag;
        else delete value[$b2cbbb20d3b6a51b$var$symToStringTag];
    }
    return result;
}
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function $b2cbbb20d3b6a51b$var$objectToString(value) {
    return $b2cbbb20d3b6a51b$var$nativeObjectToString.call(value);
}

});


parcelRegister("9Ud6q", function(module, exports) {

$parcel$export(module.exports, "W3CBaggagePropagator", () => $736381edcc247406$export$604bcc7f2bff6bb);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $4tmHU = parcelRequire("4tmHU");

var $8WcVy = parcelRequire("8WcVy");

var $4QZ78 = parcelRequire("4QZ78");

var $e4cTs = parcelRequire("e4cTs");
/**
 * Propagates {@link Baggage} through Context format propagation.
 *
 * Based on the Baggage specification:
 * https://w3c.github.io/baggage/
 */ var $736381edcc247406$export$604bcc7f2bff6bb = /** @class */ function() {
    function W3CBaggagePropagator() {}
    W3CBaggagePropagator.prototype.inject = function(context, carrier, setter) {
        var baggage = (0, $4tmHU.propagation).getBaggage(context);
        if (!baggage || (0, $8WcVy.isTracingSuppressed)(context)) return;
        var keyPairs = (0, $e4cTs.getKeyPairs)(baggage).filter(function(pair) {
            return pair.length <= (0, $4QZ78.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS);
        }).slice(0, (0, $4QZ78.BAGGAGE_MAX_NAME_VALUE_PAIRS));
        var headerValue = (0, $e4cTs.serializeKeyPairs)(keyPairs);
        if (headerValue.length > 0) setter.set(carrier, (0, $4QZ78.BAGGAGE_HEADER), headerValue);
    };
    W3CBaggagePropagator.prototype.extract = function(context, carrier, getter) {
        var headerValue = getter.get(carrier, (0, $4QZ78.BAGGAGE_HEADER));
        var baggageString = Array.isArray(headerValue) ? headerValue.join((0, $4QZ78.BAGGAGE_ITEMS_SEPARATOR)) : headerValue;
        if (!baggageString) return context;
        var baggage = {};
        if (baggageString.length === 0) return context;
        var pairs = baggageString.split((0, $4QZ78.BAGGAGE_ITEMS_SEPARATOR));
        pairs.forEach(function(entry) {
            var keyPair = (0, $e4cTs.parsePairKeyValue)(entry);
            if (keyPair) {
                var baggageEntry = {
                    value: keyPair.value
                };
                if (keyPair.metadata) baggageEntry.metadata = keyPair.metadata;
                baggage[keyPair.key] = baggageEntry;
            }
        });
        if (Object.entries(baggage).length === 0) return context;
        return (0, $4tmHU.propagation).setBaggage(context, (0, $4tmHU.propagation).createBaggage(baggage));
    };
    W3CBaggagePropagator.prototype.fields = function() {
        return [
            (0, $4QZ78.BAGGAGE_HEADER)
        ];
    };
    return W3CBaggagePropagator;
}();

});
parcelRegister("4QZ78", function(module, exports) {

$parcel$export(module.exports, "BAGGAGE_KEY_PAIR_SEPARATOR", () => $388b6cbcf2b0a785$export$3043215ef908d54f);
$parcel$export(module.exports, "BAGGAGE_PROPERTIES_SEPARATOR", () => $388b6cbcf2b0a785$export$393a3f9e6e76438);
$parcel$export(module.exports, "BAGGAGE_ITEMS_SEPARATOR", () => $388b6cbcf2b0a785$export$1ab471785c2cf557);
$parcel$export(module.exports, "BAGGAGE_HEADER", () => $388b6cbcf2b0a785$export$a6199dd4fe419e69);
$parcel$export(module.exports, "BAGGAGE_MAX_NAME_VALUE_PAIRS", () => $388b6cbcf2b0a785$export$9a50757016085e99);
$parcel$export(module.exports, "BAGGAGE_MAX_PER_NAME_VALUE_PAIRS", () => $388b6cbcf2b0a785$export$c7d9e39bb295c1f);
$parcel$export(module.exports, "BAGGAGE_MAX_TOTAL_LENGTH", () => $388b6cbcf2b0a785$export$dd0527bee1f518e7);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $388b6cbcf2b0a785$export$3043215ef908d54f = "=";
var $388b6cbcf2b0a785$export$393a3f9e6e76438 = ";";
var $388b6cbcf2b0a785$export$1ab471785c2cf557 = ",";
var $388b6cbcf2b0a785$export$a6199dd4fe419e69 = "baggage";
var $388b6cbcf2b0a785$export$9a50757016085e99 = 180;
var $388b6cbcf2b0a785$export$c7d9e39bb295c1f = 4096;
var $388b6cbcf2b0a785$export$dd0527bee1f518e7 = 8192;

});

parcelRegister("e4cTs", function(module, exports) {

$parcel$export(module.exports, "serializeKeyPairs", () => $a3db70c75001cde7$export$790fc82b2ff5bf87);
$parcel$export(module.exports, "getKeyPairs", () => $a3db70c75001cde7$export$ed4c06f0919b1951);
$parcel$export(module.exports, "parsePairKeyValue", () => $a3db70c75001cde7$export$62659c450b08e504);
$parcel$export(module.exports, "parseKeyPairsIntoRecord", () => $a3db70c75001cde7$export$1259660ed6830e21);

var $i04fT = parcelRequire("i04fT");

var $4QZ78 = parcelRequire("4QZ78");
var $a3db70c75001cde7$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
function $a3db70c75001cde7$export$790fc82b2ff5bf87(keyPairs) {
    return keyPairs.reduce(function(hValue, current) {
        var value = "" + hValue + (hValue !== "" ? (0, $4QZ78.BAGGAGE_ITEMS_SEPARATOR) : "") + current;
        return value.length > (0, $4QZ78.BAGGAGE_MAX_TOTAL_LENGTH) ? hValue : value;
    }, "");
}
function $a3db70c75001cde7$export$ed4c06f0919b1951(baggage) {
    return baggage.getAllEntries().map(function(_a) {
        var _b = $a3db70c75001cde7$var$__read(_a, 2), key = _b[0], value = _b[1];
        var entry = encodeURIComponent(key) + "=" + encodeURIComponent(value.value);
        // include opaque metadata if provided
        // NOTE: we intentionally don't URI-encode the metadata - that responsibility falls on the metadata implementation
        if (value.metadata !== undefined) entry += (0, $4QZ78.BAGGAGE_PROPERTIES_SEPARATOR) + value.metadata.toString();
        return entry;
    });
}
function $a3db70c75001cde7$export$62659c450b08e504(entry) {
    var valueProps = entry.split((0, $4QZ78.BAGGAGE_PROPERTIES_SEPARATOR));
    if (valueProps.length <= 0) return;
    var keyPairPart = valueProps.shift();
    if (!keyPairPart) return;
    var separatorIndex = keyPairPart.indexOf((0, $4QZ78.BAGGAGE_KEY_PAIR_SEPARATOR));
    if (separatorIndex <= 0) return;
    var key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
    var value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
    var metadata;
    if (valueProps.length > 0) metadata = (0, $i04fT.baggageEntryMetadataFromString)(valueProps.join((0, $4QZ78.BAGGAGE_PROPERTIES_SEPARATOR)));
    return {
        key: key,
        value: value,
        metadata: metadata
    };
}
function $a3db70c75001cde7$export$1259660ed6830e21(value) {
    if (typeof value !== "string" || value.length === 0) return {};
    return value.split((0, $4QZ78.BAGGAGE_ITEMS_SEPARATOR)).map(function(entry) {
        return $a3db70c75001cde7$export$62659c450b08e504(entry);
    }).filter(function(keyPair) {
        return keyPair !== undefined && keyPair.value.length > 0;
    }).reduce(function(headers, keyPair) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        headers[keyPair.key] = keyPair.value;
        return headers;
    }, {});
}

});


parcelRegister("3FLWz", function(module, exports) {

$parcel$export(module.exports, "TRACE_PARENT_HEADER", () => $2aca640bec4a6daf$export$830e05fa2746348);
$parcel$export(module.exports, "W3CTraceContextPropagator", () => $2aca640bec4a6daf$export$737c747d043a1f7b);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cn2YZ = parcelRequire("cn2YZ");parcelRequire("8Ur1m");
var $ibuLL = parcelRequire("ibuLL");
var $AvSm7 = parcelRequire("AvSm7");

var $8WcVy = parcelRequire("8WcVy");

var $6au5L = parcelRequire("6au5L");
var $2aca640bec4a6daf$export$830e05fa2746348 = "traceparent";
var $2aca640bec4a6daf$export$2b12ed38dcfae2ae = "tracestate";
var $2aca640bec4a6daf$var$VERSION = "00";
var $2aca640bec4a6daf$var$VERSION_PART = "(?!ff)[\\da-f]{2}";
var $2aca640bec4a6daf$var$TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
var $2aca640bec4a6daf$var$PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
var $2aca640bec4a6daf$var$FLAGS_PART = "[\\da-f]{2}";
var $2aca640bec4a6daf$var$TRACE_PARENT_REGEX = new RegExp("^\\s?(" + $2aca640bec4a6daf$var$VERSION_PART + ")-(" + $2aca640bec4a6daf$var$TRACE_ID_PART + ")-(" + $2aca640bec4a6daf$var$PARENT_ID_PART + ")-(" + $2aca640bec4a6daf$var$FLAGS_PART + ")(-.*)?\\s?$");
function $2aca640bec4a6daf$export$f4d87f8901a93f5d(traceParent) {
    var match = $2aca640bec4a6daf$var$TRACE_PARENT_REGEX.exec(traceParent);
    if (!match) return null;
    // According to the specification the implementation should be compatible
    // with future versions. If there are more parts, we only reject it if it's using version 00
    // See https://www.w3.org/TR/trace-context/#versioning-of-traceparent
    if (match[1] === "00" && match[5]) return null;
    return {
        traceId: match[2],
        spanId: match[3],
        traceFlags: parseInt(match[4], 16)
    };
}
/**
 * Propagates {@link SpanContext} through Trace Context format propagation.
 *
 * Based on the Trace Context specification:
 * https://www.w3.org/TR/trace-context/
 */ var $2aca640bec4a6daf$export$737c747d043a1f7b = /** @class */ function() {
    function W3CTraceContextPropagator() {}
    W3CTraceContextPropagator.prototype.inject = function(context, carrier, setter) {
        var spanContext = (0, $ibuLL.trace).getSpanContext(context);
        if (!spanContext || (0, $8WcVy.isTracingSuppressed)(context) || !(0, $cn2YZ.isSpanContextValid)(spanContext)) return;
        var traceParent = $2aca640bec4a6daf$var$VERSION + "-" + spanContext.traceId + "-" + spanContext.spanId + "-0" + Number(spanContext.traceFlags || (0, $AvSm7.TraceFlags).NONE).toString(16);
        setter.set(carrier, $2aca640bec4a6daf$export$830e05fa2746348, traceParent);
        if (spanContext.traceState) setter.set(carrier, $2aca640bec4a6daf$export$2b12ed38dcfae2ae, spanContext.traceState.serialize());
    };
    W3CTraceContextPropagator.prototype.extract = function(context, carrier, getter) {
        var traceParentHeader = getter.get(carrier, $2aca640bec4a6daf$export$830e05fa2746348);
        if (!traceParentHeader) return context;
        var traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string") return context;
        var spanContext = $2aca640bec4a6daf$export$f4d87f8901a93f5d(traceParent);
        if (!spanContext) return context;
        spanContext.isRemote = true;
        var traceStateHeader = getter.get(carrier, $2aca640bec4a6daf$export$2b12ed38dcfae2ae);
        if (traceStateHeader) {
            // If more than one `tracestate` header is found, we merge them into a
            // single header.
            var state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
            spanContext.traceState = new (0, $6au5L.TraceState)(typeof state === "string" ? state : undefined);
        }
        return (0, $ibuLL.trace).setSpanContext(context, spanContext);
    };
    W3CTraceContextPropagator.prototype.fields = function() {
        return [
            $2aca640bec4a6daf$export$830e05fa2746348,
            $2aca640bec4a6daf$export$2b12ed38dcfae2ae
        ];
    };
    return W3CTraceContextPropagator;
}();

});
parcelRegister("6au5L", function(module, exports) {

$parcel$export(module.exports, "TraceState", () => $47db04e79b168501$export$b0addedc390b67c2);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $84t17 = parcelRequire("84t17");
var $47db04e79b168501$var$MAX_TRACE_STATE_ITEMS = 32;
var $47db04e79b168501$var$MAX_TRACE_STATE_LEN = 512;
var $47db04e79b168501$var$LIST_MEMBERS_SEPARATOR = ",";
var $47db04e79b168501$var$LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
/**
 * TraceState must be a class and not a simple object type because of the spec
 * requirement (https://www.w3.org/TR/trace-context/#tracestate-field).
 *
 * Here is the list of allowed mutations:
 * - New key-value pair should be added into the beginning of the list
 * - The value of any key can be updated. Modified keys MUST be moved to the
 * beginning of the list.
 */ var $47db04e79b168501$export$b0addedc390b67c2 = /** @class */ function() {
    function TraceState(rawTraceState) {
        this._internalState = new Map();
        if (rawTraceState) this._parse(rawTraceState);
    }
    TraceState.prototype.set = function(key, value) {
        // TODO: Benchmark the different approaches(map vs list) and
        // use the faster one.
        var traceState = this._clone();
        if (traceState._internalState.has(key)) traceState._internalState.delete(key);
        traceState._internalState.set(key, value);
        return traceState;
    };
    TraceState.prototype.unset = function(key) {
        var traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
    };
    TraceState.prototype.get = function(key) {
        return this._internalState.get(key);
    };
    TraceState.prototype.serialize = function() {
        var _this = this;
        return this._keys().reduce(function(agg, key) {
            agg.push(key + $47db04e79b168501$var$LIST_MEMBER_KEY_VALUE_SPLITTER + _this.get(key));
            return agg;
        }, []).join($47db04e79b168501$var$LIST_MEMBERS_SEPARATOR);
    };
    TraceState.prototype._parse = function(rawTraceState) {
        if (rawTraceState.length > $47db04e79b168501$var$MAX_TRACE_STATE_LEN) return;
        this._internalState = rawTraceState.split($47db04e79b168501$var$LIST_MEMBERS_SEPARATOR).reverse() // Store in reverse so new keys (.set(...)) will be placed at the beginning
        .reduce(function(agg, part) {
            var listMember = part.trim(); // Optional Whitespace (OWS) handling
            var i = listMember.indexOf($47db04e79b168501$var$LIST_MEMBER_KEY_VALUE_SPLITTER);
            if (i !== -1) {
                var key = listMember.slice(0, i);
                var value = listMember.slice(i + 1, part.length);
                if ((0, $84t17.validateKey)(key) && (0, $84t17.validateValue)(value)) agg.set(key, value);
            }
            return agg;
        }, new Map());
        // Because of the reverse() requirement, trunc must be done after map is created
        if (this._internalState.size > $47db04e79b168501$var$MAX_TRACE_STATE_ITEMS) this._internalState = new Map(Array.from(this._internalState.entries()).reverse() // Use reverse same as original tracestate parse chain
        .slice(0, $47db04e79b168501$var$MAX_TRACE_STATE_ITEMS));
    };
    TraceState.prototype._keys = function() {
        return Array.from(this._internalState.keys()).reverse();
    };
    TraceState.prototype._clone = function() {
        var traceState = new TraceState();
        traceState._internalState = new Map(this._internalState);
        return traceState;
    };
    return TraceState;
}();

});
parcelRegister("84t17", function(module, exports) {

$parcel$export(module.exports, "validateKey", () => $5e0534a43867e622$export$469cc9c479301ba6);
$parcel$export(module.exports, "validateValue", () => $5e0534a43867e622$export$b76e9316566cc26e);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $5e0534a43867e622$var$VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
var $5e0534a43867e622$var$VALID_KEY = "[a-z]" + $5e0534a43867e622$var$VALID_KEY_CHAR_RANGE + "{0,255}";
var $5e0534a43867e622$var$VALID_VENDOR_KEY = "[a-z0-9]" + $5e0534a43867e622$var$VALID_KEY_CHAR_RANGE + "{0,240}@[a-z]" + $5e0534a43867e622$var$VALID_KEY_CHAR_RANGE + "{0,13}";
var $5e0534a43867e622$var$VALID_KEY_REGEX = new RegExp("^(?:" + $5e0534a43867e622$var$VALID_KEY + "|" + $5e0534a43867e622$var$VALID_VENDOR_KEY + ")$");
var $5e0534a43867e622$var$VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
var $5e0534a43867e622$var$INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
function $5e0534a43867e622$export$469cc9c479301ba6(key) {
    return $5e0534a43867e622$var$VALID_KEY_REGEX.test(key);
}
function $5e0534a43867e622$export$b76e9316566cc26e(value) {
    return $5e0534a43867e622$var$VALID_VALUE_BASE_REGEX.test(value) && !$5e0534a43867e622$var$INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}

});



parcelRegister("cLual", function(module, exports) {

$parcel$export(module.exports, "Tracer", () => $94b146260db2f96d$export$c4b9363e2fc65361);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $hfZRB = parcelRequire("hfZRB");
var $ljza4 = parcelRequire("ljza4");
var $ibuLL = parcelRequire("ibuLL");
var $lQKpB = parcelRequire("lQKpB");
var $3jGzM = parcelRequire("3jGzM");
var $h9EcL = parcelRequire("h9EcL");
var $AvSm7 = parcelRequire("AvSm7");

var $8WcVy = parcelRequire("8WcVy");
var $fv5Y1 = parcelRequire("fv5Y1");

var $8uR4b = parcelRequire("8uR4b");

var $8eAUr = parcelRequire("8eAUr");

var $dIVFU = parcelRequire("dIVFU");
/**
 * This class represents a basic tracer.
 */ var $94b146260db2f96d$export$c4b9363e2fc65361 = /** @class */ function() {
    /**
     * Constructs a new Tracer instance.
     */ function Tracer(instrumentationLibrary, config, _tracerProvider) {
        this._tracerProvider = _tracerProvider;
        var localConfig = (0, $8eAUr.mergeConfig)(config);
        this._sampler = localConfig.sampler;
        this._generalLimits = localConfig.generalLimits;
        this._spanLimits = localConfig.spanLimits;
        this._idGenerator = config.idGenerator || new (0, $dIVFU.RandomIdGenerator)();
        this.resource = _tracerProvider.resource;
        this.instrumentationLibrary = instrumentationLibrary;
    }
    /**
     * Starts a new Span or returns the default NoopSpan based on the sampling
     * decision.
     */ Tracer.prototype.startSpan = function(name, options, context) {
        var _a, _b, _c;
        if (options === void 0) options = {};
        if (context === void 0) context = $hfZRB.context.active();
        // remove span from context in case a root span is requested via options
        if (options.root) context = $ibuLL.trace.deleteSpan(context);
        var parentSpan = $ibuLL.trace.getSpan(context);
        if ((0, $8WcVy.isTracingSuppressed)(context)) {
            $ljza4.diag.debug("Instrumentation suppressed, returning Noop Span");
            var nonRecordingSpan = $ibuLL.trace.wrapSpanContext($lQKpB.INVALID_SPAN_CONTEXT);
            return nonRecordingSpan;
        }
        var parentSpanContext = parentSpan === null || parentSpan === void 0 ? void 0 : parentSpan.spanContext();
        var spanId = this._idGenerator.generateSpanId();
        var traceId;
        var traceState;
        var parentSpanId;
        if (!parentSpanContext || !$ibuLL.trace.isSpanContextValid(parentSpanContext)) // New root span.
        traceId = this._idGenerator.generateTraceId();
        else {
            // New child span.
            traceId = parentSpanContext.traceId;
            traceState = parentSpanContext.traceState;
            parentSpanId = parentSpanContext.spanId;
        }
        var spanKind = (_a = options.kind) !== null && _a !== void 0 ? _a : $h9EcL.SpanKind.INTERNAL;
        var links = ((_b = options.links) !== null && _b !== void 0 ? _b : []).map(function(link) {
            return {
                context: link.context,
                attributes: (0, $fv5Y1.sanitizeAttributes)(link.attributes)
            };
        });
        var attributes = (0, $fv5Y1.sanitizeAttributes)(options.attributes);
        // make sampling decision
        var samplingResult = this._sampler.shouldSample(context, traceId, name, spanKind, attributes, links);
        traceState = (_c = samplingResult.traceState) !== null && _c !== void 0 ? _c : traceState;
        var traceFlags = samplingResult.decision === $3jGzM.SamplingDecision.RECORD_AND_SAMPLED ? $AvSm7.TraceFlags.SAMPLED : $AvSm7.TraceFlags.NONE;
        var spanContext = {
            traceId: traceId,
            spanId: spanId,
            traceFlags: traceFlags,
            traceState: traceState
        };
        if (samplingResult.decision === $3jGzM.SamplingDecision.NOT_RECORD) {
            $ljza4.diag.debug("Recording is off, propagating context in a non-recording span");
            var nonRecordingSpan = $ibuLL.trace.wrapSpanContext(spanContext);
            return nonRecordingSpan;
        }
        // Set initial span attributes. The attributes object may have been mutated
        // by the sampler, so we sanitize the merged attributes before setting them.
        var initAttributes = (0, $fv5Y1.sanitizeAttributes)(Object.assign(attributes, samplingResult.attributes));
        var span = new (0, $8uR4b.Span)(this, context, name, spanContext, spanKind, parentSpanId, links, options.startTime, undefined, initAttributes);
        return span;
    };
    Tracer.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) return;
        else if (arguments.length === 2) fn = arg2;
        else if (arguments.length === 3) {
            opts = arg2;
            fn = arg3;
        } else {
            opts = arg2;
            ctx = arg3;
            fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : $hfZRB.context.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = $ibuLL.trace.setSpan(parentContext, span);
        return $hfZRB.context.with(contextWithSpanSet, fn, undefined, span);
    };
    /** Returns the active {@link GeneralLimits}. */ Tracer.prototype.getGeneralLimits = function() {
        return this._generalLimits;
    };
    /** Returns the active {@link SpanLimits}. */ Tracer.prototype.getSpanLimits = function() {
        return this._spanLimits;
    };
    Tracer.prototype.getActiveSpanProcessor = function() {
        return this._tracerProvider.getActiveSpanProcessor();
    };
    return Tracer;
}();

});
parcelRegister("fv5Y1", function(module, exports) {

$parcel$export(module.exports, "sanitizeAttributes", () => $b48e61364f31e119$export$b0663eba150d60c9);
$parcel$export(module.exports, "isAttributeValue", () => $b48e61364f31e119$export$1daad3d2aacf48c5);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
var $b48e61364f31e119$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $b48e61364f31e119$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
function $b48e61364f31e119$export$b0663eba150d60c9(attributes) {
    var e_1, _a;
    var out = {};
    if (typeof attributes !== "object" || attributes == null) return out;
    try {
        for(var _b = $b48e61364f31e119$var$__values(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()){
            var _d = $b48e61364f31e119$var$__read(_c.value, 2), key = _d[0], val = _d[1];
            if (!$b48e61364f31e119$export$d3dd8ead6a0318c3(key)) {
                (0, $ljza4.diag).warn("Invalid attribute key: " + key);
                continue;
            }
            if (!$b48e61364f31e119$export$1daad3d2aacf48c5(val)) {
                (0, $ljza4.diag).warn("Invalid attribute value set for key: " + key);
                continue;
            }
            if (Array.isArray(val)) out[key] = val.slice();
            else out[key] = val;
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    return out;
}
function $b48e61364f31e119$export$d3dd8ead6a0318c3(key) {
    return typeof key === "string" && key.length > 0;
}
function $b48e61364f31e119$export$1daad3d2aacf48c5(val) {
    if (val == null) return true;
    if (Array.isArray(val)) return $b48e61364f31e119$var$isHomogeneousAttributeValueArray(val);
    return $b48e61364f31e119$var$isValidPrimitiveAttributeValue(val);
}
function $b48e61364f31e119$var$isHomogeneousAttributeValueArray(arr) {
    var e_2, _a;
    var type;
    try {
        for(var arr_1 = $b48e61364f31e119$var$__values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()){
            var element = arr_1_1.value;
            // null/undefined elements are allowed
            if (element == null) continue;
            if (!type) {
                if ($b48e61364f31e119$var$isValidPrimitiveAttributeValue(element)) {
                    type = typeof element;
                    continue;
                }
                // encountered an invalid primitive
                return false;
            }
            if (typeof element === type) continue;
            return false;
        }
    } catch (e_2_1) {
        e_2 = {
            error: e_2_1
        };
    } finally{
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        } finally{
            if (e_2) throw e_2.error;
        }
    }
    return true;
}
function $b48e61364f31e119$var$isValidPrimitiveAttributeValue(val) {
    switch(typeof val){
        case "number":
        case "boolean":
        case "string":
            return true;
    }
    return false;
}

});

parcelRegister("8uR4b", function(module, exports) {

$parcel$export(module.exports, "Span", () => $62fa49f17a71d6a0$export$5f1714a13ed34c01);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
var $6lUa6 = parcelRequire("6lUa6");

var $hTf1k = parcelRequire("hTf1k");
var $fv5Y1 = parcelRequire("fv5Y1");
var $lzSn1 = parcelRequire("lzSn1");

var $3Bhxa = parcelRequire("3Bhxa");

var $8eI4c = parcelRequire("8eI4c");
var $62fa49f17a71d6a0$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $62fa49f17a71d6a0$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $62fa49f17a71d6a0$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * This class represents a span.
 */ var $62fa49f17a71d6a0$export$5f1714a13ed34c01 = /** @class */ function() {
    /**
     * Constructs a new Span instance.
     *
     * @deprecated calling Span constructor directly is not supported. Please use tracer.startSpan.
     * */ function Span(parentTracer, context, spanName, spanContext, kind, parentSpanId, links, startTime, _deprecatedClock, attributes) {
        if (links === void 0) links = [];
        this.attributes = {};
        this.links = [];
        this.events = [];
        this._droppedAttributesCount = 0;
        this._droppedEventsCount = 0;
        this._droppedLinksCount = 0;
        this.status = {
            code: (0, $6lUa6.SpanStatusCode).UNSET
        };
        this.endTime = [
            0,
            0
        ];
        this._ended = false;
        this._duration = [
            -1,
            -1
        ];
        this.name = spanName;
        this._spanContext = spanContext;
        this.parentSpanId = parentSpanId;
        this.kind = kind;
        this.links = links;
        var now = Date.now();
        this._performanceStartTime = (0, $lzSn1.otperformance).now();
        this._performanceOffset = now - (this._performanceStartTime + (0, $hTf1k.getTimeOrigin)());
        this._startTimeProvided = startTime != null;
        this.startTime = this._getTime(startTime !== null && startTime !== void 0 ? startTime : now);
        this.resource = parentTracer.resource;
        this.instrumentationLibrary = parentTracer.instrumentationLibrary;
        this._spanLimits = parentTracer.getSpanLimits();
        this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
        if (attributes != null) this.setAttributes(attributes);
        this._spanProcessor = parentTracer.getActiveSpanProcessor();
        this._spanProcessor.onStart(this, context);
    }
    Span.prototype.spanContext = function() {
        return this._spanContext;
    };
    Span.prototype.setAttribute = function(key, value) {
        if (value == null || this._isSpanEnded()) return this;
        if (key.length === 0) {
            (0, $ljza4.diag).warn("Invalid attribute key: " + key);
            return this;
        }
        if (!(0, $fv5Y1.isAttributeValue)(value)) {
            (0, $ljza4.diag).warn("Invalid attribute value set for key: " + key);
            return this;
        }
        if (Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
            this._droppedAttributesCount++;
            return this;
        }
        this.attributes[key] = this._truncateToSize(value);
        return this;
    };
    Span.prototype.setAttributes = function(attributes) {
        var e_1, _a;
        try {
            for(var _b = $62fa49f17a71d6a0$var$__values(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()){
                var _d = $62fa49f17a71d6a0$var$__read(_c.value, 2), k = _d[0], v = _d[1];
                this.setAttribute(k, v);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        return this;
    };
    /**
     *
     * @param name Span Name
     * @param [attributesOrStartTime] Span attributes or start time
     *     if type is {@type TimeInput} and 3rd param is undefined
     * @param [timeStamp] Specified time stamp for the event
     */ Span.prototype.addEvent = function(name, attributesOrStartTime, timeStamp) {
        if (this._isSpanEnded()) return this;
        if (this._spanLimits.eventCountLimit === 0) {
            (0, $ljza4.diag).warn("No events allowed.");
            this._droppedEventsCount++;
            return this;
        }
        if (this.events.length >= this._spanLimits.eventCountLimit) {
            if (this._droppedEventsCount === 0) (0, $ljza4.diag).debug("Dropping extra events.");
            this.events.shift();
            this._droppedEventsCount++;
        }
        if ((0, $hTf1k.isTimeInput)(attributesOrStartTime)) {
            if (!(0, $hTf1k.isTimeInput)(timeStamp)) timeStamp = attributesOrStartTime;
            attributesOrStartTime = undefined;
        }
        var attributes = (0, $fv5Y1.sanitizeAttributes)(attributesOrStartTime);
        this.events.push({
            name: name,
            attributes: attributes,
            time: this._getTime(timeStamp),
            droppedAttributesCount: 0
        });
        return this;
    };
    Span.prototype.addLink = function(link) {
        this.links.push(link);
        return this;
    };
    Span.prototype.addLinks = function(links) {
        var _a;
        (_a = this.links).push.apply(_a, $62fa49f17a71d6a0$var$__spreadArray([], $62fa49f17a71d6a0$var$__read(links), false));
        return this;
    };
    Span.prototype.setStatus = function(status) {
        if (this._isSpanEnded()) return this;
        this.status = status;
        return this;
    };
    Span.prototype.updateName = function(name) {
        if (this._isSpanEnded()) return this;
        this.name = name;
        return this;
    };
    Span.prototype.end = function(endTime) {
        if (this._isSpanEnded()) {
            (0, $ljza4.diag).error(this.name + " " + this._spanContext.traceId + "-" + this._spanContext.spanId + " - You can only call end() on a span once.");
            return;
        }
        this._ended = true;
        this.endTime = this._getTime(endTime);
        this._duration = (0, $hTf1k.hrTimeDuration)(this.startTime, this.endTime);
        if (this._duration[0] < 0) {
            (0, $ljza4.diag).warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
            this.endTime = this.startTime.slice();
            this._duration = [
                0,
                0
            ];
        }
        if (this._droppedEventsCount > 0) (0, $ljza4.diag).warn("Dropped " + this._droppedEventsCount + " events because eventCountLimit reached");
        this._spanProcessor.onEnd(this);
    };
    Span.prototype._getTime = function(inp) {
        if (typeof inp === "number" && inp < (0, $lzSn1.otperformance).now()) // must be a performance timestamp
        // apply correction and convert to hrtime
        return (0, $hTf1k.hrTime)(inp + this._performanceOffset);
        if (typeof inp === "number") return (0, $hTf1k.millisToHrTime)(inp);
        if (inp instanceof Date) return (0, $hTf1k.millisToHrTime)(inp.getTime());
        if ((0, $hTf1k.isTimeInputHrTime)(inp)) return inp;
        if (this._startTimeProvided) // if user provided a time for the start manually
        // we can't use duration to calculate event/end times
        return (0, $hTf1k.millisToHrTime)(Date.now());
        var msDuration = (0, $lzSn1.otperformance).now() - this._performanceStartTime;
        return (0, $hTf1k.addHrTimes)(this.startTime, (0, $hTf1k.millisToHrTime)(msDuration));
    };
    Span.prototype.isRecording = function() {
        return this._ended === false;
    };
    Span.prototype.recordException = function(exception, time) {
        var attributes = {};
        if (typeof exception === "string") attributes[0, $3Bhxa.SEMATTRS_EXCEPTION_MESSAGE] = exception;
        else if (exception) {
            if (exception.code) attributes[0, $3Bhxa.SEMATTRS_EXCEPTION_TYPE] = exception.code.toString();
            else if (exception.name) attributes[0, $3Bhxa.SEMATTRS_EXCEPTION_TYPE] = exception.name;
            if (exception.message) attributes[0, $3Bhxa.SEMATTRS_EXCEPTION_MESSAGE] = exception.message;
            if (exception.stack) attributes[0, $3Bhxa.SEMATTRS_EXCEPTION_STACKTRACE] = exception.stack;
        }
        // these are minimum requirements from spec
        if (attributes[0, $3Bhxa.SEMATTRS_EXCEPTION_TYPE] || attributes[0, $3Bhxa.SEMATTRS_EXCEPTION_MESSAGE]) this.addEvent((0, $8eI4c.ExceptionEventName), attributes, time);
        else (0, $ljza4.diag).warn("Failed to record an exception " + exception);
    };
    Object.defineProperty(Span.prototype, "duration", {
        get: function() {
            return this._duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Span.prototype, "ended", {
        get: function() {
            return this._ended;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Span.prototype, "droppedAttributesCount", {
        get: function() {
            return this._droppedAttributesCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Span.prototype, "droppedEventsCount", {
        get: function() {
            return this._droppedEventsCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Span.prototype, "droppedLinksCount", {
        get: function() {
            return this._droppedLinksCount;
        },
        enumerable: false,
        configurable: true
    });
    Span.prototype._isSpanEnded = function() {
        if (this._ended) (0, $ljza4.diag).warn("Can not execute the operation on ended Span {traceId: " + this._spanContext.traceId + ", spanId: " + this._spanContext.spanId + "}");
        return this._ended;
    };
    // Utility function to truncate given value within size
    // for value type of string, will truncate to given limit
    // for type of non-string, will return same value
    Span.prototype._truncateToLimitUtil = function(value, limit) {
        if (value.length <= limit) return value;
        return value.substr(0, limit);
    };
    /**
     * If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
     * return string with truncated to {@code attributeValueLengthLimit} characters
     *
     * If the given attribute value is array of strings then
     * return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
     *
     * Otherwise return same Attribute {@code value}
     *
     * @param value Attribute value
     * @returns truncated attribute value if required, otherwise same value
     */ Span.prototype._truncateToSize = function(value) {
        var _this = this;
        var limit = this._attributeValueLengthLimit;
        // Check limit
        if (limit <= 0) {
            // Negative values are invalid, so do not truncate
            (0, $ljza4.diag).warn("Attribute value limit must be positive, got " + limit);
            return value;
        }
        // String
        if (typeof value === "string") return this._truncateToLimitUtil(value, limit);
        // Array of strings
        if (Array.isArray(value)) return value.map(function(val) {
            return typeof val === "string" ? _this._truncateToLimitUtil(val, limit) : val;
        });
        // Other types, no need to apply value length limit
        return value;
    };
    return Span;
}();

});
parcelRegister("hTf1k", function(module, exports) {

$parcel$export(module.exports, "millisToHrTime", () => $d06339726fb5d441$export$e7ec5c82995537b1);
$parcel$export(module.exports, "getTimeOrigin", () => $d06339726fb5d441$export$e752b05e58096a2f);
$parcel$export(module.exports, "hrTime", () => $d06339726fb5d441$export$24b3f7dcd2848fa8);
$parcel$export(module.exports, "addHrTimes", () => $d06339726fb5d441$export$f07bb1dbc72184c3);
$parcel$export(module.exports, "timeInputToHrTime", () => $d06339726fb5d441$export$5f4c8a8ba0e36226);
$parcel$export(module.exports, "isTimeInputHrTime", () => $d06339726fb5d441$export$390c59432f173a9f);
$parcel$export(module.exports, "hrTimeDuration", () => $d06339726fb5d441$export$b783ad6617389e3e);
$parcel$export(module.exports, "hrTimeToNanoseconds", () => $d06339726fb5d441$export$2d91441ae30ebcfc);
$parcel$export(module.exports, "isTimeInput", () => $d06339726fb5d441$export$a5e58227c317ebb9);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $lzSn1 = parcelRequire("lzSn1");
var $d06339726fb5d441$var$NANOSECOND_DIGITS = 9;
var $d06339726fb5d441$var$NANOSECOND_DIGITS_IN_MILLIS = 6;
var $d06339726fb5d441$var$MILLISECONDS_TO_NANOSECONDS = Math.pow(10, $d06339726fb5d441$var$NANOSECOND_DIGITS_IN_MILLIS);
var $d06339726fb5d441$var$SECOND_TO_NANOSECONDS = Math.pow(10, $d06339726fb5d441$var$NANOSECOND_DIGITS);
function $d06339726fb5d441$export$e7ec5c82995537b1(epochMillis) {
    var epochSeconds = epochMillis / 1000;
    // Decimals only.
    var seconds = Math.trunc(epochSeconds);
    // Round sub-nanosecond accuracy to nanosecond.
    var nanos = Math.round(epochMillis % 1000 * $d06339726fb5d441$var$MILLISECONDS_TO_NANOSECONDS);
    return [
        seconds,
        nanos
    ];
}
function $d06339726fb5d441$export$e752b05e58096a2f() {
    var timeOrigin = (0, $lzSn1.otperformance).timeOrigin;
    if (typeof timeOrigin !== "number") {
        var perf = (0, $lzSn1.otperformance);
        timeOrigin = perf.timing && perf.timing.fetchStart;
    }
    return timeOrigin;
}
function $d06339726fb5d441$export$24b3f7dcd2848fa8(performanceNow) {
    var timeOrigin = $d06339726fb5d441$export$e7ec5c82995537b1($d06339726fb5d441$export$e752b05e58096a2f());
    var now = $d06339726fb5d441$export$e7ec5c82995537b1(typeof performanceNow === "number" ? performanceNow : (0, $lzSn1.otperformance).now());
    return $d06339726fb5d441$export$f07bb1dbc72184c3(timeOrigin, now);
}
function $d06339726fb5d441$export$5f4c8a8ba0e36226(time) {
    // process.hrtime
    if ($d06339726fb5d441$export$390c59432f173a9f(time)) return time;
    else if (typeof time === "number") {
        // Must be a performance.now() if it's smaller than process start time.
        if (time < $d06339726fb5d441$export$e752b05e58096a2f()) return $d06339726fb5d441$export$24b3f7dcd2848fa8(time);
        else // epoch milliseconds or performance.timeOrigin
        return $d06339726fb5d441$export$e7ec5c82995537b1(time);
    } else if (time instanceof Date) return $d06339726fb5d441$export$e7ec5c82995537b1(time.getTime());
    else throw TypeError("Invalid input type");
}
function $d06339726fb5d441$export$b783ad6617389e3e(startTime, endTime) {
    var seconds = endTime[0] - startTime[0];
    var nanos = endTime[1] - startTime[1];
    // overflow
    if (nanos < 0) {
        seconds -= 1;
        // negate
        nanos += $d06339726fb5d441$var$SECOND_TO_NANOSECONDS;
    }
    return [
        seconds,
        nanos
    ];
}
function $d06339726fb5d441$export$973c1c4fad6103e(time) {
    var precision = $d06339726fb5d441$var$NANOSECOND_DIGITS;
    var tmp = "" + "0".repeat(precision) + time[1] + "Z";
    var nanoString = tmp.substr(tmp.length - precision - 1);
    var date = new Date(time[0] * 1000).toISOString();
    return date.replace("000Z", nanoString);
}
function $d06339726fb5d441$export$2d91441ae30ebcfc(time) {
    return time[0] * $d06339726fb5d441$var$SECOND_TO_NANOSECONDS + time[1];
}
function $d06339726fb5d441$export$30b3706e4e35edf0(time) {
    return time[0] * 1e3 + time[1] / 1e6;
}
function $d06339726fb5d441$export$95601fd64fa689b7(time) {
    return time[0] * 1e6 + time[1] / 1e3;
}
function $d06339726fb5d441$export$390c59432f173a9f(value) {
    return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
}
function $d06339726fb5d441$export$a5e58227c317ebb9(value) {
    return $d06339726fb5d441$export$390c59432f173a9f(value) || typeof value === "number" || value instanceof Date;
}
function $d06339726fb5d441$export$f07bb1dbc72184c3(time1, time2) {
    var out = [
        time1[0] + time2[0],
        time1[1] + time2[1]
    ];
    // Nanoseconds
    if (out[1] >= $d06339726fb5d441$var$SECOND_TO_NANOSECONDS) {
        out[1] -= $d06339726fb5d441$var$SECOND_TO_NANOSECONDS;
        out[0] += 1;
    }
    return out;
}

});
parcelRegister("lzSn1", function(module, exports) {

$parcel$export(module.exports, "otperformance", () => $fb570aa63c9bb090$export$b22daef4119238cd);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $fb570aa63c9bb090$export$b22daef4119238cd = performance;

});


parcelRegister("3Bhxa", function(module, exports) {

$parcel$export(module.exports, "SEMATTRS_EXCEPTION_TYPE", () => $29f26dae6e075eca$export$ecc84ea0f5a24384);
$parcel$export(module.exports, "SEMATTRS_EXCEPTION_MESSAGE", () => $29f26dae6e075eca$export$ff69507dfa9dcf0c);
$parcel$export(module.exports, "SEMATTRS_EXCEPTION_STACKTRACE", () => $29f26dae6e075eca$export$d9432f0c350b687d);
$parcel$export(module.exports, "SEMATTRS_HTTP_METHOD", () => $29f26dae6e075eca$export$5ec7d06d671a3fbe);
$parcel$export(module.exports, "SEMATTRS_HTTP_URL", () => $29f26dae6e075eca$export$2f4ef7e39c2be395);
$parcel$export(module.exports, "SEMATTRS_HTTP_HOST", () => $29f26dae6e075eca$export$547e24d3f59a53ea);
$parcel$export(module.exports, "SEMATTRS_HTTP_SCHEME", () => $29f26dae6e075eca$export$a2928efa45f0acf4);
$parcel$export(module.exports, "SEMATTRS_HTTP_STATUS_CODE", () => $29f26dae6e075eca$export$d381c7525d715413);
$parcel$export(module.exports, "SEMATTRS_HTTP_USER_AGENT", () => $29f26dae6e075eca$export$7472b18f42d2d02f);
$parcel$export(module.exports, "SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH", () => $29f26dae6e075eca$export$58d4fbfe35e08be0);
$parcel$export(module.exports, "SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED", () => $29f26dae6e075eca$export$b9d3e41cd56c56cc);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $1392M = parcelRequire("1392M");
//----------------------------------------------------------------------------------------------------------
// DO NOT EDIT, this is an Auto-generated file from scripts/semconv/templates//templates/SemanticAttributes.ts.j2
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
// Constant values for SemanticAttributes
//----------------------------------------------------------------------------------------------------------
// Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_AWS_LAMBDA_INVOKED_ARN = "aws.lambda.invoked_arn";
var $29f26dae6e075eca$var$TMP_DB_SYSTEM = "db.system";
var $29f26dae6e075eca$var$TMP_DB_CONNECTION_STRING = "db.connection_string";
var $29f26dae6e075eca$var$TMP_DB_USER = "db.user";
var $29f26dae6e075eca$var$TMP_DB_JDBC_DRIVER_CLASSNAME = "db.jdbc.driver_classname";
var $29f26dae6e075eca$var$TMP_DB_NAME = "db.name";
var $29f26dae6e075eca$var$TMP_DB_STATEMENT = "db.statement";
var $29f26dae6e075eca$var$TMP_DB_OPERATION = "db.operation";
var $29f26dae6e075eca$var$TMP_DB_MSSQL_INSTANCE_NAME = "db.mssql.instance_name";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_KEYSPACE = "db.cassandra.keyspace";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_PAGE_SIZE = "db.cassandra.page_size";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_CONSISTENCY_LEVEL = "db.cassandra.consistency_level";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_TABLE = "db.cassandra.table";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_IDEMPOTENCE = "db.cassandra.idempotence";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "db.cassandra.speculative_execution_count";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_COORDINATOR_ID = "db.cassandra.coordinator.id";
var $29f26dae6e075eca$var$TMP_DB_CASSANDRA_COORDINATOR_DC = "db.cassandra.coordinator.dc";
var $29f26dae6e075eca$var$TMP_DB_HBASE_NAMESPACE = "db.hbase.namespace";
var $29f26dae6e075eca$var$TMP_DB_REDIS_DATABASE_INDEX = "db.redis.database_index";
var $29f26dae6e075eca$var$TMP_DB_MONGODB_COLLECTION = "db.mongodb.collection";
var $29f26dae6e075eca$var$TMP_DB_SQL_TABLE = "db.sql.table";
var $29f26dae6e075eca$var$TMP_EXCEPTION_TYPE = "exception.type";
var $29f26dae6e075eca$var$TMP_EXCEPTION_MESSAGE = "exception.message";
var $29f26dae6e075eca$var$TMP_EXCEPTION_STACKTRACE = "exception.stacktrace";
var $29f26dae6e075eca$var$TMP_EXCEPTION_ESCAPED = "exception.escaped";
var $29f26dae6e075eca$var$TMP_FAAS_TRIGGER = "faas.trigger";
var $29f26dae6e075eca$var$TMP_FAAS_EXECUTION = "faas.execution";
var $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_COLLECTION = "faas.document.collection";
var $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_OPERATION = "faas.document.operation";
var $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_TIME = "faas.document.time";
var $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_NAME = "faas.document.name";
var $29f26dae6e075eca$var$TMP_FAAS_TIME = "faas.time";
var $29f26dae6e075eca$var$TMP_FAAS_CRON = "faas.cron";
var $29f26dae6e075eca$var$TMP_FAAS_COLDSTART = "faas.coldstart";
var $29f26dae6e075eca$var$TMP_FAAS_INVOKED_NAME = "faas.invoked_name";
var $29f26dae6e075eca$var$TMP_FAAS_INVOKED_PROVIDER = "faas.invoked_provider";
var $29f26dae6e075eca$var$TMP_FAAS_INVOKED_REGION = "faas.invoked_region";
var $29f26dae6e075eca$var$TMP_NET_TRANSPORT = "net.transport";
var $29f26dae6e075eca$var$TMP_NET_PEER_IP = "net.peer.ip";
var $29f26dae6e075eca$var$TMP_NET_PEER_PORT = "net.peer.port";
var $29f26dae6e075eca$var$TMP_NET_PEER_NAME = "net.peer.name";
var $29f26dae6e075eca$var$TMP_NET_HOST_IP = "net.host.ip";
var $29f26dae6e075eca$var$TMP_NET_HOST_PORT = "net.host.port";
var $29f26dae6e075eca$var$TMP_NET_HOST_NAME = "net.host.name";
var $29f26dae6e075eca$var$TMP_NET_HOST_CONNECTION_TYPE = "net.host.connection.type";
var $29f26dae6e075eca$var$TMP_NET_HOST_CONNECTION_SUBTYPE = "net.host.connection.subtype";
var $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_NAME = "net.host.carrier.name";
var $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_MCC = "net.host.carrier.mcc";
var $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_MNC = "net.host.carrier.mnc";
var $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_ICC = "net.host.carrier.icc";
var $29f26dae6e075eca$var$TMP_PEER_SERVICE = "peer.service";
var $29f26dae6e075eca$var$TMP_ENDUSER_ID = "enduser.id";
var $29f26dae6e075eca$var$TMP_ENDUSER_ROLE = "enduser.role";
var $29f26dae6e075eca$var$TMP_ENDUSER_SCOPE = "enduser.scope";
var $29f26dae6e075eca$var$TMP_THREAD_ID = "thread.id";
var $29f26dae6e075eca$var$TMP_THREAD_NAME = "thread.name";
var $29f26dae6e075eca$var$TMP_CODE_FUNCTION = "code.function";
var $29f26dae6e075eca$var$TMP_CODE_NAMESPACE = "code.namespace";
var $29f26dae6e075eca$var$TMP_CODE_FILEPATH = "code.filepath";
var $29f26dae6e075eca$var$TMP_CODE_LINENO = "code.lineno";
var $29f26dae6e075eca$var$TMP_HTTP_METHOD = "http.method";
var $29f26dae6e075eca$var$TMP_HTTP_URL = "http.url";
var $29f26dae6e075eca$var$TMP_HTTP_TARGET = "http.target";
var $29f26dae6e075eca$var$TMP_HTTP_HOST = "http.host";
var $29f26dae6e075eca$var$TMP_HTTP_SCHEME = "http.scheme";
var $29f26dae6e075eca$var$TMP_HTTP_STATUS_CODE = "http.status_code";
var $29f26dae6e075eca$var$TMP_HTTP_FLAVOR = "http.flavor";
var $29f26dae6e075eca$var$TMP_HTTP_USER_AGENT = "http.user_agent";
var $29f26dae6e075eca$var$TMP_HTTP_REQUEST_CONTENT_LENGTH = "http.request_content_length";
var $29f26dae6e075eca$var$TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = "http.request_content_length_uncompressed";
var $29f26dae6e075eca$var$TMP_HTTP_RESPONSE_CONTENT_LENGTH = "http.response_content_length";
var $29f26dae6e075eca$var$TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = "http.response_content_length_uncompressed";
var $29f26dae6e075eca$var$TMP_HTTP_SERVER_NAME = "http.server_name";
var $29f26dae6e075eca$var$TMP_HTTP_ROUTE = "http.route";
var $29f26dae6e075eca$var$TMP_HTTP_CLIENT_IP = "http.client_ip";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TABLE_NAMES = "aws.dynamodb.table_names";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_CONSUMED_CAPACITY = "aws.dynamodb.consumed_capacity";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = "aws.dynamodb.item_collection_metrics";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = "aws.dynamodb.provisioned_read_capacity";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = "aws.dynamodb.provisioned_write_capacity";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_CONSISTENT_READ = "aws.dynamodb.consistent_read";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROJECTION = "aws.dynamodb.projection";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_LIMIT = "aws.dynamodb.limit";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET = "aws.dynamodb.attributes_to_get";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_INDEX_NAME = "aws.dynamodb.index_name";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SELECT = "aws.dynamodb.select";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = "aws.dynamodb.global_secondary_indexes";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = "aws.dynamodb.local_secondary_indexes";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = "aws.dynamodb.exclusive_start_table";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TABLE_COUNT = "aws.dynamodb.table_count";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SCAN_FORWARD = "aws.dynamodb.scan_forward";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SEGMENT = "aws.dynamodb.segment";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TOTAL_SEGMENTS = "aws.dynamodb.total_segments";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_COUNT = "aws.dynamodb.count";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SCANNED_COUNT = "aws.dynamodb.scanned_count";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = "aws.dynamodb.attribute_definitions";
var $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = "aws.dynamodb.global_secondary_index_updates";
var $29f26dae6e075eca$var$TMP_MESSAGING_SYSTEM = "messaging.system";
var $29f26dae6e075eca$var$TMP_MESSAGING_DESTINATION = "messaging.destination";
var $29f26dae6e075eca$var$TMP_MESSAGING_DESTINATION_KIND = "messaging.destination_kind";
var $29f26dae6e075eca$var$TMP_MESSAGING_TEMP_DESTINATION = "messaging.temp_destination";
var $29f26dae6e075eca$var$TMP_MESSAGING_PROTOCOL = "messaging.protocol";
var $29f26dae6e075eca$var$TMP_MESSAGING_PROTOCOL_VERSION = "messaging.protocol_version";
var $29f26dae6e075eca$var$TMP_MESSAGING_URL = "messaging.url";
var $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_ID = "messaging.message_id";
var $29f26dae6e075eca$var$TMP_MESSAGING_CONVERSATION_ID = "messaging.conversation_id";
var $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = "messaging.message_payload_size_bytes";
var $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = "messaging.message_payload_compressed_size_bytes";
var $29f26dae6e075eca$var$TMP_MESSAGING_OPERATION = "messaging.operation";
var $29f26dae6e075eca$var$TMP_MESSAGING_CONSUMER_ID = "messaging.consumer_id";
var $29f26dae6e075eca$var$TMP_MESSAGING_RABBITMQ_ROUTING_KEY = "messaging.rabbitmq.routing_key";
var $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message_key";
var $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_CONSUMER_GROUP = "messaging.kafka.consumer_group";
var $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_CLIENT_ID = "messaging.kafka.client_id";
var $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_PARTITION = "messaging.kafka.partition";
var $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_TOMBSTONE = "messaging.kafka.tombstone";
var $29f26dae6e075eca$var$TMP_RPC_SYSTEM = "rpc.system";
var $29f26dae6e075eca$var$TMP_RPC_SERVICE = "rpc.service";
var $29f26dae6e075eca$var$TMP_RPC_METHOD = "rpc.method";
var $29f26dae6e075eca$var$TMP_RPC_GRPC_STATUS_CODE = "rpc.grpc.status_code";
var $29f26dae6e075eca$var$TMP_RPC_JSONRPC_VERSION = "rpc.jsonrpc.version";
var $29f26dae6e075eca$var$TMP_RPC_JSONRPC_REQUEST_ID = "rpc.jsonrpc.request_id";
var $29f26dae6e075eca$var$TMP_RPC_JSONRPC_ERROR_CODE = "rpc.jsonrpc.error_code";
var $29f26dae6e075eca$var$TMP_RPC_JSONRPC_ERROR_MESSAGE = "rpc.jsonrpc.error_message";
var $29f26dae6e075eca$var$TMP_MESSAGE_TYPE = "message.type";
var $29f26dae6e075eca$var$TMP_MESSAGE_ID = "message.id";
var $29f26dae6e075eca$var$TMP_MESSAGE_COMPRESSED_SIZE = "message.compressed_size";
var $29f26dae6e075eca$var$TMP_MESSAGE_UNCOMPRESSED_SIZE = "message.uncompressed_size";
var $29f26dae6e075eca$export$170bb395abfdb74 = $29f26dae6e075eca$var$TMP_AWS_LAMBDA_INVOKED_ARN;
var $29f26dae6e075eca$export$4d8f9683caa766fd = $29f26dae6e075eca$var$TMP_DB_SYSTEM;
var $29f26dae6e075eca$export$d367aaf68e61a0d5 = $29f26dae6e075eca$var$TMP_DB_CONNECTION_STRING;
var $29f26dae6e075eca$export$310240ea93b3fe22 = $29f26dae6e075eca$var$TMP_DB_USER;
var $29f26dae6e075eca$export$aa8b483f52799ba9 = $29f26dae6e075eca$var$TMP_DB_JDBC_DRIVER_CLASSNAME;
var $29f26dae6e075eca$export$d1ee0266d0ce708f = $29f26dae6e075eca$var$TMP_DB_NAME;
var $29f26dae6e075eca$export$ce244300665216c6 = $29f26dae6e075eca$var$TMP_DB_STATEMENT;
var $29f26dae6e075eca$export$dfb6a782675c717b = $29f26dae6e075eca$var$TMP_DB_OPERATION;
var $29f26dae6e075eca$export$ce5040faeb6d8f08 = $29f26dae6e075eca$var$TMP_DB_MSSQL_INSTANCE_NAME;
var $29f26dae6e075eca$export$e241e7101e6d4783 = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_KEYSPACE;
var $29f26dae6e075eca$export$8823a63ac409681b = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_PAGE_SIZE;
var $29f26dae6e075eca$export$b838c3d1859a7260 = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_CONSISTENCY_LEVEL;
var $29f26dae6e075eca$export$3f3068d83ae4cca5 = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_TABLE;
var $29f26dae6e075eca$export$17334025dcb96205 = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_IDEMPOTENCE;
var $29f26dae6e075eca$export$a63f22381e3297f2 = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT;
var $29f26dae6e075eca$export$e06ccece5268ed3 = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_COORDINATOR_ID;
var $29f26dae6e075eca$export$ab77f08d0cc7144 = $29f26dae6e075eca$var$TMP_DB_CASSANDRA_COORDINATOR_DC;
var $29f26dae6e075eca$export$f83bf50700108cdb = $29f26dae6e075eca$var$TMP_DB_HBASE_NAMESPACE;
var $29f26dae6e075eca$export$f9c9b189f60bce02 = $29f26dae6e075eca$var$TMP_DB_REDIS_DATABASE_INDEX;
var $29f26dae6e075eca$export$b73e684c351bf304 = $29f26dae6e075eca$var$TMP_DB_MONGODB_COLLECTION;
var $29f26dae6e075eca$export$5b02e077c84b0dc7 = $29f26dae6e075eca$var$TMP_DB_SQL_TABLE;
var $29f26dae6e075eca$export$ecc84ea0f5a24384 = $29f26dae6e075eca$var$TMP_EXCEPTION_TYPE;
var $29f26dae6e075eca$export$ff69507dfa9dcf0c = $29f26dae6e075eca$var$TMP_EXCEPTION_MESSAGE;
var $29f26dae6e075eca$export$d9432f0c350b687d = $29f26dae6e075eca$var$TMP_EXCEPTION_STACKTRACE;
var $29f26dae6e075eca$export$4d3c212dd7c75f9d = $29f26dae6e075eca$var$TMP_EXCEPTION_ESCAPED;
var $29f26dae6e075eca$export$7e853a3dbd95b3a2 = $29f26dae6e075eca$var$TMP_FAAS_TRIGGER;
var $29f26dae6e075eca$export$68a5b08142e33c1d = $29f26dae6e075eca$var$TMP_FAAS_EXECUTION;
var $29f26dae6e075eca$export$f4b6288b42b8d4f8 = $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_COLLECTION;
var $29f26dae6e075eca$export$7e6d28b35ab8e751 = $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_OPERATION;
var $29f26dae6e075eca$export$b36094664197ebd9 = $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_TIME;
var $29f26dae6e075eca$export$2401d669e1b7f304 = $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_NAME;
var $29f26dae6e075eca$export$4630b1edb758007c = $29f26dae6e075eca$var$TMP_FAAS_TIME;
var $29f26dae6e075eca$export$4358b4189d5aa75e = $29f26dae6e075eca$var$TMP_FAAS_CRON;
var $29f26dae6e075eca$export$18a88fa49bf141a8 = $29f26dae6e075eca$var$TMP_FAAS_COLDSTART;
var $29f26dae6e075eca$export$ba620de28d483834 = $29f26dae6e075eca$var$TMP_FAAS_INVOKED_NAME;
var $29f26dae6e075eca$export$1ac1158b40ce77df = $29f26dae6e075eca$var$TMP_FAAS_INVOKED_PROVIDER;
var $29f26dae6e075eca$export$e8b3f54186b03f93 = $29f26dae6e075eca$var$TMP_FAAS_INVOKED_REGION;
var $29f26dae6e075eca$export$958ce88767ff5cae = $29f26dae6e075eca$var$TMP_NET_TRANSPORT;
var $29f26dae6e075eca$export$5f5e19d7784bcab5 = $29f26dae6e075eca$var$TMP_NET_PEER_IP;
var $29f26dae6e075eca$export$83ab392b303d5cc4 = $29f26dae6e075eca$var$TMP_NET_PEER_PORT;
var $29f26dae6e075eca$export$869dc6e245da8a3c = $29f26dae6e075eca$var$TMP_NET_PEER_NAME;
var $29f26dae6e075eca$export$8363f5dd3626d1c7 = $29f26dae6e075eca$var$TMP_NET_HOST_IP;
var $29f26dae6e075eca$export$7c05177443136588 = $29f26dae6e075eca$var$TMP_NET_HOST_PORT;
var $29f26dae6e075eca$export$67ebd91e5927c9b6 = $29f26dae6e075eca$var$TMP_NET_HOST_NAME;
var $29f26dae6e075eca$export$b4399aff72c58221 = $29f26dae6e075eca$var$TMP_NET_HOST_CONNECTION_TYPE;
var $29f26dae6e075eca$export$29124138bf62c161 = $29f26dae6e075eca$var$TMP_NET_HOST_CONNECTION_SUBTYPE;
var $29f26dae6e075eca$export$a1a35234333f42fa = $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_NAME;
var $29f26dae6e075eca$export$593e7f806b5bd9d0 = $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_MCC;
var $29f26dae6e075eca$export$92c4882b0877ce0 = $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_MNC;
var $29f26dae6e075eca$export$7158946157fdda52 = $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_ICC;
var $29f26dae6e075eca$export$706484bff197aa2f = $29f26dae6e075eca$var$TMP_PEER_SERVICE;
var $29f26dae6e075eca$export$37fdcbb3cc34507a = $29f26dae6e075eca$var$TMP_ENDUSER_ID;
var $29f26dae6e075eca$export$7486a34c0c780913 = $29f26dae6e075eca$var$TMP_ENDUSER_ROLE;
var $29f26dae6e075eca$export$c531f20a7a107be = $29f26dae6e075eca$var$TMP_ENDUSER_SCOPE;
var $29f26dae6e075eca$export$96304c684b1fe5bd = $29f26dae6e075eca$var$TMP_THREAD_ID;
var $29f26dae6e075eca$export$b1c76a722c30a73e = $29f26dae6e075eca$var$TMP_THREAD_NAME;
var $29f26dae6e075eca$export$f5b0a970f81eb82 = $29f26dae6e075eca$var$TMP_CODE_FUNCTION;
var $29f26dae6e075eca$export$ebd9bc6b684ae79f = $29f26dae6e075eca$var$TMP_CODE_NAMESPACE;
var $29f26dae6e075eca$export$f5c7dbf024e089b1 = $29f26dae6e075eca$var$TMP_CODE_FILEPATH;
var $29f26dae6e075eca$export$9bc82da636767e36 = $29f26dae6e075eca$var$TMP_CODE_LINENO;
var $29f26dae6e075eca$export$5ec7d06d671a3fbe = $29f26dae6e075eca$var$TMP_HTTP_METHOD;
var $29f26dae6e075eca$export$2f4ef7e39c2be395 = $29f26dae6e075eca$var$TMP_HTTP_URL;
var $29f26dae6e075eca$export$5284fc3356124326 = $29f26dae6e075eca$var$TMP_HTTP_TARGET;
var $29f26dae6e075eca$export$547e24d3f59a53ea = $29f26dae6e075eca$var$TMP_HTTP_HOST;
var $29f26dae6e075eca$export$a2928efa45f0acf4 = $29f26dae6e075eca$var$TMP_HTTP_SCHEME;
var $29f26dae6e075eca$export$d381c7525d715413 = $29f26dae6e075eca$var$TMP_HTTP_STATUS_CODE;
var $29f26dae6e075eca$export$1e443919b8f6a42e = $29f26dae6e075eca$var$TMP_HTTP_FLAVOR;
var $29f26dae6e075eca$export$7472b18f42d2d02f = $29f26dae6e075eca$var$TMP_HTTP_USER_AGENT;
var $29f26dae6e075eca$export$616f2909238995e9 = $29f26dae6e075eca$var$TMP_HTTP_REQUEST_CONTENT_LENGTH;
var $29f26dae6e075eca$export$4352992cf528a286 = $29f26dae6e075eca$var$TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED;
var $29f26dae6e075eca$export$58d4fbfe35e08be0 = $29f26dae6e075eca$var$TMP_HTTP_RESPONSE_CONTENT_LENGTH;
var $29f26dae6e075eca$export$b9d3e41cd56c56cc = $29f26dae6e075eca$var$TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED;
var $29f26dae6e075eca$export$ae4c9cf5cd38f75e = $29f26dae6e075eca$var$TMP_HTTP_SERVER_NAME;
var $29f26dae6e075eca$export$391e30d1bcbfedd6 = $29f26dae6e075eca$var$TMP_HTTP_ROUTE;
var $29f26dae6e075eca$export$f21601c3f29048e9 = $29f26dae6e075eca$var$TMP_HTTP_CLIENT_IP;
var $29f26dae6e075eca$export$22c9c5cd37ccec8d = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TABLE_NAMES;
var $29f26dae6e075eca$export$636d932d69359471 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_CONSUMED_CAPACITY;
var $29f26dae6e075eca$export$79414a2a1b36e0e4 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS;
var $29f26dae6e075eca$export$a17bc449a5f10183 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY;
var $29f26dae6e075eca$export$6d8e225848319009 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY;
var $29f26dae6e075eca$export$2daa7ca667f19522 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_CONSISTENT_READ;
var $29f26dae6e075eca$export$d04f1e16b6682958 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROJECTION;
var $29f26dae6e075eca$export$9017e26d3dee82a7 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_LIMIT;
var $29f26dae6e075eca$export$734476f2cddb4e = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET;
var $29f26dae6e075eca$export$6ffa6129be32f13f = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_INDEX_NAME;
var $29f26dae6e075eca$export$e439ba599235e943 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SELECT;
var $29f26dae6e075eca$export$691e052bf6ec1b50 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES;
var $29f26dae6e075eca$export$4a8114ba4973adf9 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES;
var $29f26dae6e075eca$export$3d3dcdb04b37b602 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE;
var $29f26dae6e075eca$export$a3ed03c10bfca049 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TABLE_COUNT;
var $29f26dae6e075eca$export$70f2263412a5d6f8 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SCAN_FORWARD;
var $29f26dae6e075eca$export$cc291bca867c839c = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SEGMENT;
var $29f26dae6e075eca$export$2bd41520dd577767 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TOTAL_SEGMENTS;
var $29f26dae6e075eca$export$e3002f59defbb848 = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_COUNT;
var $29f26dae6e075eca$export$338ee58c976503fa = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SCANNED_COUNT;
var $29f26dae6e075eca$export$9ef2d520d3111ebb = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS;
var $29f26dae6e075eca$export$50eb8413f579535b = $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES;
var $29f26dae6e075eca$export$e907440d5c8aa7ea = $29f26dae6e075eca$var$TMP_MESSAGING_SYSTEM;
var $29f26dae6e075eca$export$331bf1abb96af02c = $29f26dae6e075eca$var$TMP_MESSAGING_DESTINATION;
var $29f26dae6e075eca$export$ca3944a0a0fdb278 = $29f26dae6e075eca$var$TMP_MESSAGING_DESTINATION_KIND;
var $29f26dae6e075eca$export$b1f595d071164a5c = $29f26dae6e075eca$var$TMP_MESSAGING_TEMP_DESTINATION;
var $29f26dae6e075eca$export$734e634f7ff28b65 = $29f26dae6e075eca$var$TMP_MESSAGING_PROTOCOL;
var $29f26dae6e075eca$export$62c96eec39d4f8fa = $29f26dae6e075eca$var$TMP_MESSAGING_PROTOCOL_VERSION;
var $29f26dae6e075eca$export$8185788dec47d17c = $29f26dae6e075eca$var$TMP_MESSAGING_URL;
var $29f26dae6e075eca$export$6465ca78c6aedebd = $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_ID;
var $29f26dae6e075eca$export$9e29dbd41c4d02d5 = $29f26dae6e075eca$var$TMP_MESSAGING_CONVERSATION_ID;
var $29f26dae6e075eca$export$ded3a3185a1522d5 = $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES;
var $29f26dae6e075eca$export$c42edeca94088e4d = $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES;
var $29f26dae6e075eca$export$b0a29003262c7994 = $29f26dae6e075eca$var$TMP_MESSAGING_OPERATION;
var $29f26dae6e075eca$export$283c55d09fbdb92c = $29f26dae6e075eca$var$TMP_MESSAGING_CONSUMER_ID;
var $29f26dae6e075eca$export$78385ca43d0e8556 = $29f26dae6e075eca$var$TMP_MESSAGING_RABBITMQ_ROUTING_KEY;
var $29f26dae6e075eca$export$b6969aab3cf94e74 = $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_MESSAGE_KEY;
var $29f26dae6e075eca$export$45eb738152aa5dd4 = $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_CONSUMER_GROUP;
var $29f26dae6e075eca$export$bc66f788b071fbad = $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_CLIENT_ID;
var $29f26dae6e075eca$export$ff4aad497ab5213e = $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_PARTITION;
var $29f26dae6e075eca$export$256d25d7635b3a79 = $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_TOMBSTONE;
var $29f26dae6e075eca$export$8b1a1f43d7106aea = $29f26dae6e075eca$var$TMP_RPC_SYSTEM;
var $29f26dae6e075eca$export$7eb60929eaa797de = $29f26dae6e075eca$var$TMP_RPC_SERVICE;
var $29f26dae6e075eca$export$c6d175d5e9b8105b = $29f26dae6e075eca$var$TMP_RPC_METHOD;
var $29f26dae6e075eca$export$ccc8405c8a911fb7 = $29f26dae6e075eca$var$TMP_RPC_GRPC_STATUS_CODE;
var $29f26dae6e075eca$export$ce0f2ec42ba79570 = $29f26dae6e075eca$var$TMP_RPC_JSONRPC_VERSION;
var $29f26dae6e075eca$export$2e981273bb2873ea = $29f26dae6e075eca$var$TMP_RPC_JSONRPC_REQUEST_ID;
var $29f26dae6e075eca$export$214058615970c3e4 = $29f26dae6e075eca$var$TMP_RPC_JSONRPC_ERROR_CODE;
var $29f26dae6e075eca$export$2ad4f2a86baa9b1e = $29f26dae6e075eca$var$TMP_RPC_JSONRPC_ERROR_MESSAGE;
var $29f26dae6e075eca$export$e6c57355a990f7ee = $29f26dae6e075eca$var$TMP_MESSAGE_TYPE;
var $29f26dae6e075eca$export$ba8e66ad5476d59f = $29f26dae6e075eca$var$TMP_MESSAGE_ID;
var $29f26dae6e075eca$export$16f3d59837418b1f = $29f26dae6e075eca$var$TMP_MESSAGE_COMPRESSED_SIZE;
var $29f26dae6e075eca$export$4b889081ab98b61 = $29f26dae6e075eca$var$TMP_MESSAGE_UNCOMPRESSED_SIZE;
var $29f26dae6e075eca$export$949e366c5c69d2e9 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_AWS_LAMBDA_INVOKED_ARN,
    $29f26dae6e075eca$var$TMP_DB_SYSTEM,
    $29f26dae6e075eca$var$TMP_DB_CONNECTION_STRING,
    $29f26dae6e075eca$var$TMP_DB_USER,
    $29f26dae6e075eca$var$TMP_DB_JDBC_DRIVER_CLASSNAME,
    $29f26dae6e075eca$var$TMP_DB_NAME,
    $29f26dae6e075eca$var$TMP_DB_STATEMENT,
    $29f26dae6e075eca$var$TMP_DB_OPERATION,
    $29f26dae6e075eca$var$TMP_DB_MSSQL_INSTANCE_NAME,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_KEYSPACE,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_PAGE_SIZE,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_CONSISTENCY_LEVEL,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_TABLE,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_IDEMPOTENCE,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_COORDINATOR_ID,
    $29f26dae6e075eca$var$TMP_DB_CASSANDRA_COORDINATOR_DC,
    $29f26dae6e075eca$var$TMP_DB_HBASE_NAMESPACE,
    $29f26dae6e075eca$var$TMP_DB_REDIS_DATABASE_INDEX,
    $29f26dae6e075eca$var$TMP_DB_MONGODB_COLLECTION,
    $29f26dae6e075eca$var$TMP_DB_SQL_TABLE,
    $29f26dae6e075eca$var$TMP_EXCEPTION_TYPE,
    $29f26dae6e075eca$var$TMP_EXCEPTION_MESSAGE,
    $29f26dae6e075eca$var$TMP_EXCEPTION_STACKTRACE,
    $29f26dae6e075eca$var$TMP_EXCEPTION_ESCAPED,
    $29f26dae6e075eca$var$TMP_FAAS_TRIGGER,
    $29f26dae6e075eca$var$TMP_FAAS_EXECUTION,
    $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_COLLECTION,
    $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_OPERATION,
    $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_TIME,
    $29f26dae6e075eca$var$TMP_FAAS_DOCUMENT_NAME,
    $29f26dae6e075eca$var$TMP_FAAS_TIME,
    $29f26dae6e075eca$var$TMP_FAAS_CRON,
    $29f26dae6e075eca$var$TMP_FAAS_COLDSTART,
    $29f26dae6e075eca$var$TMP_FAAS_INVOKED_NAME,
    $29f26dae6e075eca$var$TMP_FAAS_INVOKED_PROVIDER,
    $29f26dae6e075eca$var$TMP_FAAS_INVOKED_REGION,
    $29f26dae6e075eca$var$TMP_NET_TRANSPORT,
    $29f26dae6e075eca$var$TMP_NET_PEER_IP,
    $29f26dae6e075eca$var$TMP_NET_PEER_PORT,
    $29f26dae6e075eca$var$TMP_NET_PEER_NAME,
    $29f26dae6e075eca$var$TMP_NET_HOST_IP,
    $29f26dae6e075eca$var$TMP_NET_HOST_PORT,
    $29f26dae6e075eca$var$TMP_NET_HOST_NAME,
    $29f26dae6e075eca$var$TMP_NET_HOST_CONNECTION_TYPE,
    $29f26dae6e075eca$var$TMP_NET_HOST_CONNECTION_SUBTYPE,
    $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_NAME,
    $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_MCC,
    $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_MNC,
    $29f26dae6e075eca$var$TMP_NET_HOST_CARRIER_ICC,
    $29f26dae6e075eca$var$TMP_PEER_SERVICE,
    $29f26dae6e075eca$var$TMP_ENDUSER_ID,
    $29f26dae6e075eca$var$TMP_ENDUSER_ROLE,
    $29f26dae6e075eca$var$TMP_ENDUSER_SCOPE,
    $29f26dae6e075eca$var$TMP_THREAD_ID,
    $29f26dae6e075eca$var$TMP_THREAD_NAME,
    $29f26dae6e075eca$var$TMP_CODE_FUNCTION,
    $29f26dae6e075eca$var$TMP_CODE_NAMESPACE,
    $29f26dae6e075eca$var$TMP_CODE_FILEPATH,
    $29f26dae6e075eca$var$TMP_CODE_LINENO,
    $29f26dae6e075eca$var$TMP_HTTP_METHOD,
    $29f26dae6e075eca$var$TMP_HTTP_URL,
    $29f26dae6e075eca$var$TMP_HTTP_TARGET,
    $29f26dae6e075eca$var$TMP_HTTP_HOST,
    $29f26dae6e075eca$var$TMP_HTTP_SCHEME,
    $29f26dae6e075eca$var$TMP_HTTP_STATUS_CODE,
    $29f26dae6e075eca$var$TMP_HTTP_FLAVOR,
    $29f26dae6e075eca$var$TMP_HTTP_USER_AGENT,
    $29f26dae6e075eca$var$TMP_HTTP_REQUEST_CONTENT_LENGTH,
    $29f26dae6e075eca$var$TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
    $29f26dae6e075eca$var$TMP_HTTP_RESPONSE_CONTENT_LENGTH,
    $29f26dae6e075eca$var$TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
    $29f26dae6e075eca$var$TMP_HTTP_SERVER_NAME,
    $29f26dae6e075eca$var$TMP_HTTP_ROUTE,
    $29f26dae6e075eca$var$TMP_HTTP_CLIENT_IP,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TABLE_NAMES,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_CONSUMED_CAPACITY,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_CONSISTENT_READ,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_PROJECTION,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_LIMIT,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_INDEX_NAME,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SELECT,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TABLE_COUNT,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SCAN_FORWARD,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SEGMENT,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_TOTAL_SEGMENTS,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_COUNT,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_SCANNED_COUNT,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
    $29f26dae6e075eca$var$TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
    $29f26dae6e075eca$var$TMP_MESSAGING_SYSTEM,
    $29f26dae6e075eca$var$TMP_MESSAGING_DESTINATION,
    $29f26dae6e075eca$var$TMP_MESSAGING_DESTINATION_KIND,
    $29f26dae6e075eca$var$TMP_MESSAGING_TEMP_DESTINATION,
    $29f26dae6e075eca$var$TMP_MESSAGING_PROTOCOL,
    $29f26dae6e075eca$var$TMP_MESSAGING_PROTOCOL_VERSION,
    $29f26dae6e075eca$var$TMP_MESSAGING_URL,
    $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_ID,
    $29f26dae6e075eca$var$TMP_MESSAGING_CONVERSATION_ID,
    $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
    $29f26dae6e075eca$var$TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
    $29f26dae6e075eca$var$TMP_MESSAGING_OPERATION,
    $29f26dae6e075eca$var$TMP_MESSAGING_CONSUMER_ID,
    $29f26dae6e075eca$var$TMP_MESSAGING_RABBITMQ_ROUTING_KEY,
    $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_MESSAGE_KEY,
    $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_CONSUMER_GROUP,
    $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_CLIENT_ID,
    $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_PARTITION,
    $29f26dae6e075eca$var$TMP_MESSAGING_KAFKA_TOMBSTONE,
    $29f26dae6e075eca$var$TMP_RPC_SYSTEM,
    $29f26dae6e075eca$var$TMP_RPC_SERVICE,
    $29f26dae6e075eca$var$TMP_RPC_METHOD,
    $29f26dae6e075eca$var$TMP_RPC_GRPC_STATUS_CODE,
    $29f26dae6e075eca$var$TMP_RPC_JSONRPC_VERSION,
    $29f26dae6e075eca$var$TMP_RPC_JSONRPC_REQUEST_ID,
    $29f26dae6e075eca$var$TMP_RPC_JSONRPC_ERROR_CODE,
    $29f26dae6e075eca$var$TMP_RPC_JSONRPC_ERROR_MESSAGE,
    $29f26dae6e075eca$var$TMP_MESSAGE_TYPE,
    $29f26dae6e075eca$var$TMP_MESSAGE_ID,
    $29f26dae6e075eca$var$TMP_MESSAGE_COMPRESSED_SIZE,
    $29f26dae6e075eca$var$TMP_MESSAGE_UNCOMPRESSED_SIZE
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for DbSystemValues enum definition
 *
 * An identifier for the database management system (DBMS) product being used. See below for a list of well-known identifiers.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_OTHER_SQL = "other_sql";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MSSQL = "mssql";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MYSQL = "mysql";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ORACLE = "oracle";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DB2 = "db2";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_POSTGRESQL = "postgresql";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_REDSHIFT = "redshift";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HIVE = "hive";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CLOUDSCAPE = "cloudscape";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HSQLDB = "hsqldb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_PROGRESS = "progress";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MAXDB = "maxdb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HANADB = "hanadb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INGRES = "ingres";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FIRSTSQL = "firstsql";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_EDB = "edb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CACHE = "cache";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ADABAS = "adabas";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FIREBIRD = "firebird";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DERBY = "derby";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FILEMAKER = "filemaker";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INFORMIX = "informix";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INSTANTDB = "instantdb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INTERBASE = "interbase";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MARIADB = "mariadb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_NETEZZA = "netezza";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_PERVASIVE = "pervasive";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_POINTBASE = "pointbase";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_SQLITE = "sqlite";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_SYBASE = "sybase";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_TERADATA = "teradata";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_VERTICA = "vertica";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_H2 = "h2";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COLDFUSION = "coldfusion";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CASSANDRA = "cassandra";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HBASE = "hbase";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MONGODB = "mongodb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_REDIS = "redis";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COUCHBASE = "couchbase";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COUCHDB = "couchdb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COSMOSDB = "cosmosdb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DYNAMODB = "dynamodb";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_NEO4J = "neo4j";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_GEODE = "geode";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ELASTICSEARCH = "elasticsearch";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MEMCACHED = "memcached";
var $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COCKROACHDB = "cockroachdb";
var $29f26dae6e075eca$export$a8dac6c506518069 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_OTHER_SQL;
var $29f26dae6e075eca$export$ea0447329a58abf0 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MSSQL;
var $29f26dae6e075eca$export$f10ddff4d378463e = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MYSQL;
var $29f26dae6e075eca$export$1187a6d6f356ed08 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ORACLE;
var $29f26dae6e075eca$export$c99652dcdf96b994 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DB2;
var $29f26dae6e075eca$export$fa83a16930a97d3b = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_POSTGRESQL;
var $29f26dae6e075eca$export$502f4a0041906d71 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_REDSHIFT;
var $29f26dae6e075eca$export$9ca2599ef62580aa = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HIVE;
var $29f26dae6e075eca$export$910728553bdc4f2 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CLOUDSCAPE;
var $29f26dae6e075eca$export$927252a026981dbc = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HSQLDB;
var $29f26dae6e075eca$export$1d4496dd2fb6e5bf = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_PROGRESS;
var $29f26dae6e075eca$export$eeac513ec469c0cd = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MAXDB;
var $29f26dae6e075eca$export$accdcd0fb0e8e3f2 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HANADB;
var $29f26dae6e075eca$export$3dcc190bf239314c = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INGRES;
var $29f26dae6e075eca$export$ff4c8094bbcf5fa7 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FIRSTSQL;
var $29f26dae6e075eca$export$3277e5141d071eb2 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_EDB;
var $29f26dae6e075eca$export$4a79cae41e08a0dd = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CACHE;
var $29f26dae6e075eca$export$cf3b85811d34c73b = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ADABAS;
var $29f26dae6e075eca$export$48eca9ca7c84a995 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FIREBIRD;
var $29f26dae6e075eca$export$bc5d7654a3e6dc01 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DERBY;
var $29f26dae6e075eca$export$422940b84b884f99 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FILEMAKER;
var $29f26dae6e075eca$export$a49658a36841921 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INFORMIX;
var $29f26dae6e075eca$export$dd1bda064bc12f55 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INSTANTDB;
var $29f26dae6e075eca$export$3845f6f803a923b1 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INTERBASE;
var $29f26dae6e075eca$export$1b74fece6a0567e8 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MARIADB;
var $29f26dae6e075eca$export$8fc04abe03bce8d5 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_NETEZZA;
var $29f26dae6e075eca$export$f9406b4f00b760b4 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_PERVASIVE;
var $29f26dae6e075eca$export$5bc787da6daf8e9c = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_POINTBASE;
var $29f26dae6e075eca$export$92e0362f5610565 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_SQLITE;
var $29f26dae6e075eca$export$ec03fbd64421b165 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_SYBASE;
var $29f26dae6e075eca$export$486b763280f7312f = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_TERADATA;
var $29f26dae6e075eca$export$424b3c529411045a = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_VERTICA;
var $29f26dae6e075eca$export$5b4c7807bd4e54d0 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_H2;
var $29f26dae6e075eca$export$998c3a6fdfbcf7df = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COLDFUSION;
var $29f26dae6e075eca$export$dc18027519a667a3 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CASSANDRA;
var $29f26dae6e075eca$export$a3cbb4bc103ae284 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HBASE;
var $29f26dae6e075eca$export$b1615e3bbcf0dea5 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MONGODB;
var $29f26dae6e075eca$export$e236e209844f1272 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_REDIS;
var $29f26dae6e075eca$export$a3861a07874f1889 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COUCHBASE;
var $29f26dae6e075eca$export$f84afd1ccf7f622f = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COUCHDB;
var $29f26dae6e075eca$export$408510df30ac38f0 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COSMOSDB;
var $29f26dae6e075eca$export$f704654eab77c7c7 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DYNAMODB;
var $29f26dae6e075eca$export$5eea4c4dfe97cf90 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_NEO4J;
var $29f26dae6e075eca$export$f6740c7ce8d8a59 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_GEODE;
var $29f26dae6e075eca$export$25d0355c3ecc82d5 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ELASTICSEARCH;
var $29f26dae6e075eca$export$3566ede46e0a8a41 = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MEMCACHED;
var $29f26dae6e075eca$export$2844c6dfa3d1660a = $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COCKROACHDB;
var $29f26dae6e075eca$export$53ce5c6571db6866 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_OTHER_SQL,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MSSQL,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MYSQL,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ORACLE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DB2,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_POSTGRESQL,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_REDSHIFT,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HIVE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CLOUDSCAPE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HSQLDB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_PROGRESS,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MAXDB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HANADB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INGRES,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FIRSTSQL,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_EDB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CACHE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ADABAS,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FIREBIRD,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DERBY,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_FILEMAKER,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INFORMIX,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INSTANTDB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_INTERBASE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MARIADB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_NETEZZA,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_PERVASIVE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_POINTBASE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_SQLITE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_SYBASE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_TERADATA,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_VERTICA,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_H2,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COLDFUSION,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_CASSANDRA,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_HBASE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MONGODB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_REDIS,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COUCHBASE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COUCHDB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COSMOSDB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_DYNAMODB,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_NEO4J,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_GEODE,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_ELASTICSEARCH,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_MEMCACHED,
    $29f26dae6e075eca$var$TMP_DBSYSTEMVALUES_COCKROACHDB
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for DbCassandraConsistencyLevelValues enum definition
 *
 * The consistency level of the query. Based on consistency values from [CQL](https://docs.datastax.com/en/cassandra-oss/3.0/cassandra/dml/dmlConfigConsistency.html).
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL = "all";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = "each_quorum";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = "quorum";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = "local_quorum";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE = "one";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO = "two";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE = "three";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = "local_one";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY = "any";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = "serial";
var $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = "local_serial";
var $29f26dae6e075eca$export$8c965dbb4c30de17 = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL;
var $29f26dae6e075eca$export$28269849572f223a = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM;
var $29f26dae6e075eca$export$c31be6925d18faf4 = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM;
var $29f26dae6e075eca$export$dd2d046c43b425dc = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM;
var $29f26dae6e075eca$export$d567e6085f609657 = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE;
var $29f26dae6e075eca$export$2638f2ef2b3637ea = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO;
var $29f26dae6e075eca$export$444dff27642c23a3 = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE;
var $29f26dae6e075eca$export$be0e7a9b9b7460eb = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE;
var $29f26dae6e075eca$export$9cda430306f12b08 = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY;
var $29f26dae6e075eca$export$79a04d8aacdacbe9 = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL;
var $29f26dae6e075eca$export$42bf18043dacb777 = $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL;
var $29f26dae6e075eca$export$a6eeaa6fe6488373 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL,
    $29f26dae6e075eca$var$TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for FaasTriggerValues enum definition
 *
 * Type of the trigger on which the function is executed.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_DATASOURCE = "datasource";
var $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_HTTP = "http";
var $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_PUBSUB = "pubsub";
var $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_TIMER = "timer";
var $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_OTHER = "other";
var $29f26dae6e075eca$export$a116a6c98ad82a77 = $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_DATASOURCE;
var $29f26dae6e075eca$export$1b8130a1d4406030 = $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_HTTP;
var $29f26dae6e075eca$export$2c3c25968f77e7b3 = $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_PUBSUB;
var $29f26dae6e075eca$export$f1adafe5047573a = $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_TIMER;
var $29f26dae6e075eca$export$2aa5343c84c7d0a6 = $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_OTHER;
var $29f26dae6e075eca$export$8bd13b593ef4858d = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_DATASOURCE,
    $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_HTTP,
    $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_PUBSUB,
    $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_TIMER,
    $29f26dae6e075eca$var$TMP_FAASTRIGGERVALUES_OTHER
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for FaasDocumentOperationValues enum definition
 *
 * Describes the type of the operation that was performed on the data.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_INSERT = "insert";
var $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_EDIT = "edit";
var $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_DELETE = "delete";
var $29f26dae6e075eca$export$58594a32d0721c01 = $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_INSERT;
var $29f26dae6e075eca$export$fb5981e11be92c91 = $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_EDIT;
var $29f26dae6e075eca$export$8617289d67ca4e43 = $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_DELETE;
var $29f26dae6e075eca$export$d6463783e5bb27f9 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_INSERT,
    $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_EDIT,
    $29f26dae6e075eca$var$TMP_FAASDOCUMENTOPERATIONVALUES_DELETE
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for FaasInvokedProviderValues enum definition
 *
 * The cloud provider of the invoked function.
 *
 * Note: SHOULD be equal to the `cloud.provider` resource attribute of the invoked function.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
var $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_AWS = "aws";
var $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_AZURE = "azure";
var $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_GCP = "gcp";
var $29f26dae6e075eca$export$a7a256059bf89bd1 = $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD;
var $29f26dae6e075eca$export$8716f61e9f3c2aeb = $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_AWS;
var $29f26dae6e075eca$export$ec924dafe3d951e3 = $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_AZURE;
var $29f26dae6e075eca$export$40370ddcd5c5f6d7 = $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_GCP;
var $29f26dae6e075eca$export$668b545a1de0448 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD,
    $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_AWS,
    $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_AZURE,
    $29f26dae6e075eca$var$TMP_FAASINVOKEDPROVIDERVALUES_GCP
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for NetTransportValues enum definition
 *
 * Transport protocol used. See note below.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP_TCP = "ip_tcp";
var $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP_UDP = "ip_udp";
var $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP = "ip";
var $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_UNIX = "unix";
var $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_PIPE = "pipe";
var $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_INPROC = "inproc";
var $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_OTHER = "other";
var $29f26dae6e075eca$export$98ad64057f1fab9f = $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP_TCP;
var $29f26dae6e075eca$export$efc9b6ce6290a881 = $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP_UDP;
var $29f26dae6e075eca$export$f3aeea475f2d61eb = $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP;
var $29f26dae6e075eca$export$2ff43587ce3a6428 = $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_UNIX;
var $29f26dae6e075eca$export$8a59379768b7dcc2 = $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_PIPE;
var $29f26dae6e075eca$export$24d541ca01c48083 = $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_INPROC;
var $29f26dae6e075eca$export$61986d2ea3f68e4 = $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_OTHER;
var $29f26dae6e075eca$export$3818cf83a3542239 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP_TCP,
    $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP_UDP,
    $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_IP,
    $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_UNIX,
    $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_PIPE,
    $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_INPROC,
    $29f26dae6e075eca$var$TMP_NETTRANSPORTVALUES_OTHER
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for NetHostConnectionTypeValues enum definition
 *
 * The internet connection type currently being used by the host.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI = "wifi";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED = "wired";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_CELL = "cell";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = "unavailable";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = "unknown";
var $29f26dae6e075eca$export$9f02ba1730e68d64 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI;
var $29f26dae6e075eca$export$ff976cfa645183ea = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED;
var $29f26dae6e075eca$export$9dac5d5db0d7302d = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_CELL;
var $29f26dae6e075eca$export$856320690b0a4ede = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE;
var $29f26dae6e075eca$export$b93b5033f8372e2b = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN;
var $29f26dae6e075eca$export$a5c9a789b3c34827 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_CELL,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for NetHostConnectionSubtypeValues enum definition
 *
 * This describes more details regarding the connection.type. It may be the type of cell technology connection, but it could be used for describing details about a wifi connection.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = "gprs";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = "edge";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = "umts";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = "cdma";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = "evdo_0";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = "evdo_a";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = "cdma2000_1xrtt";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = "hsdpa";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = "hsupa";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = "hspa";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = "iden";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = "evdo_b";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE = "lte";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = "ehrpd";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = "hspap";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM = "gsm";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = "td_scdma";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = "iwlan";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR = "nr";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = "nrnsa";
var $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = "lte_ca";
var $29f26dae6e075eca$export$b3928d079bcf0650 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS;
var $29f26dae6e075eca$export$869e5d9e2d7d058f = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE;
var $29f26dae6e075eca$export$4fb8dba98d516457 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS;
var $29f26dae6e075eca$export$4c80eef388ebaccf = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA;
var $29f26dae6e075eca$export$fa867825f37e79db = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0;
var $29f26dae6e075eca$export$27a67e3163ce1ca1 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A;
var $29f26dae6e075eca$export$64eea596575c6ac7 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT;
var $29f26dae6e075eca$export$ac76a80a244a93c4 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA;
var $29f26dae6e075eca$export$1f6c75de7c7b16c8 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA;
var $29f26dae6e075eca$export$546b89c4781a174b = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA;
var $29f26dae6e075eca$export$76ada84046ded2cf = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN;
var $29f26dae6e075eca$export$cbc44b2ef04c23f2 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B;
var $29f26dae6e075eca$export$7df810136272d3ca = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE;
var $29f26dae6e075eca$export$6d0261a99bb34b75 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD;
var $29f26dae6e075eca$export$f5609166f18e0da4 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP;
var $29f26dae6e075eca$export$bb1d1d2dc1514ff9 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM;
var $29f26dae6e075eca$export$f39e3589dec1b486 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA;
var $29f26dae6e075eca$export$2ea90d5cadafeb66 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN;
var $29f26dae6e075eca$export$dacf20f714c7dfe3 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR;
var $29f26dae6e075eca$export$3057d75e98c27a82 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA;
var $29f26dae6e075eca$export$ac7da250598a79b7 = $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA;
var $29f26dae6e075eca$export$2f6476d8343c332 = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA,
    $29f26dae6e075eca$var$TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for HttpFlavorValues enum definition
 *
 * Kind of HTTP protocol used.
 *
 * Note: If `net.transport` is not specified, it can be assumed to be `IP.TCP` except if `http.flavor` is `QUIC`, in which case `IP.UDP` is assumed.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_1_0 = "1.0";
var $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_1_1 = "1.1";
var $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_2_0 = "2.0";
var $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_SPDY = "SPDY";
var $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_QUIC = "QUIC";
var $29f26dae6e075eca$export$a5eaf604e08c3278 = $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_1_0;
var $29f26dae6e075eca$export$90c81a0909f2ae50 = $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_1_1;
var $29f26dae6e075eca$export$76fedb424c637ab1 = $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_2_0;
var $29f26dae6e075eca$export$64a9fa17294d693a = $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_SPDY;
var $29f26dae6e075eca$export$71f9f90e022dd018 = $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_QUIC;
var $29f26dae6e075eca$export$98fa65d23b3ad768 = {
    HTTP_1_0: $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_1_0,
    HTTP_1_1: $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_1_1,
    HTTP_2_0: $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_HTTP_2_0,
    SPDY: $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_SPDY,
    QUIC: $29f26dae6e075eca$var$TMP_HTTPFLAVORVALUES_QUIC
};
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for MessagingDestinationKindValues enum definition
 *
 * The kind of message destination.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE = "queue";
var $29f26dae6e075eca$var$TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC = "topic";
var $29f26dae6e075eca$export$3c00656cec2b971b = $29f26dae6e075eca$var$TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE;
var $29f26dae6e075eca$export$5b3434288d57e9db = $29f26dae6e075eca$var$TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC;
var $29f26dae6e075eca$export$c97cf0959c06f2eb = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE,
    $29f26dae6e075eca$var$TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for MessagingOperationValues enum definition
 *
 * A string identifying the kind of message consumption as defined in the [Operation names](#operation-names) section above. If the operation is &#34;send&#34;, this attribute MUST NOT be set, since the operation can be inferred from the span kind in that case.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_MESSAGINGOPERATIONVALUES_RECEIVE = "receive";
var $29f26dae6e075eca$var$TMP_MESSAGINGOPERATIONVALUES_PROCESS = "process";
var $29f26dae6e075eca$export$84220b734749f5b0 = $29f26dae6e075eca$var$TMP_MESSAGINGOPERATIONVALUES_RECEIVE;
var $29f26dae6e075eca$export$e4e81e41cac54813 = $29f26dae6e075eca$var$TMP_MESSAGINGOPERATIONVALUES_PROCESS;
var $29f26dae6e075eca$export$4a89c511599cd2ec = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_MESSAGINGOPERATIONVALUES_RECEIVE,
    $29f26dae6e075eca$var$TMP_MESSAGINGOPERATIONVALUES_PROCESS
]);
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for RpcGrpcStatusCodeValues enum definition
 *
 * The [numeric status code](https://github.com/grpc/grpc/blob/v1.33.2/doc/statuscodes.md) of the gRPC request.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_OK = 0;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED = 1;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN = 2;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = 3;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = 4;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND = 5;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = 6;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = 7;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = 8;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = 9;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_ABORTED = 10;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = 11;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = 12;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL = 13;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = 14;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS = 15;
var $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = 16;
var $29f26dae6e075eca$export$949d8f2733439fe0 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_OK;
var $29f26dae6e075eca$export$3ab4e217bae3a065 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED;
var $29f26dae6e075eca$export$82114f8ba92008f1 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN;
var $29f26dae6e075eca$export$4747f09ec996ed1a = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT;
var $29f26dae6e075eca$export$2f64e796efee7806 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED;
var $29f26dae6e075eca$export$c2b894d36cd1d993 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND;
var $29f26dae6e075eca$export$e675f9346907cdbf = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS;
var $29f26dae6e075eca$export$ee7173f54f1f7e52 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED;
var $29f26dae6e075eca$export$a2e4b937aa6d8799 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED;
var $29f26dae6e075eca$export$ef9ed8d6d4e5cd73 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION;
var $29f26dae6e075eca$export$5186c1c5a9145ea6 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_ABORTED;
var $29f26dae6e075eca$export$e67583738364c597 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE;
var $29f26dae6e075eca$export$90f86b1e23bb678f = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED;
var $29f26dae6e075eca$export$133efbe81a3e3b7a = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL;
var $29f26dae6e075eca$export$8d87e3aaaab1d8c1 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE;
var $29f26dae6e075eca$export$2acca698ff2f1632 = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS;
var $29f26dae6e075eca$export$fc7c44549e950bf = $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED;
var $29f26dae6e075eca$export$759a06c32b696c70 = {
    OK: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_OK,
    CANCELLED: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED,
    UNKNOWN: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN,
    INVALID_ARGUMENT: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT,
    DEADLINE_EXCEEDED: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED,
    NOT_FOUND: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND,
    ALREADY_EXISTS: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS,
    PERMISSION_DENIED: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED,
    RESOURCE_EXHAUSTED: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED,
    FAILED_PRECONDITION: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION,
    ABORTED: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_ABORTED,
    OUT_OF_RANGE: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE,
    UNIMPLEMENTED: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED,
    INTERNAL: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL,
    UNAVAILABLE: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE,
    DATA_LOSS: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS,
    UNAUTHENTICATED: $29f26dae6e075eca$var$TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED
};
/* ----------------------------------------------------------------------------------------------------------
 * Constant values for MessageTypeValues enum definition
 *
 * Whether this is a received or sent message.
 * ---------------------------------------------------------------------------------------------------------- */ // Temporary local constants to assign to the individual exports and the namespaced version
// Required to avoid the namespace exports using the unminifable export names for some package types
var $29f26dae6e075eca$var$TMP_MESSAGETYPEVALUES_SENT = "SENT";
var $29f26dae6e075eca$var$TMP_MESSAGETYPEVALUES_RECEIVED = "RECEIVED";
var $29f26dae6e075eca$export$10fb24096e4ea8a3 = $29f26dae6e075eca$var$TMP_MESSAGETYPEVALUES_SENT;
var $29f26dae6e075eca$export$e520006d57a4745f = $29f26dae6e075eca$var$TMP_MESSAGETYPEVALUES_RECEIVED;
var $29f26dae6e075eca$export$c83b17f5976c727c = /*#__PURE__*/ (0, $1392M.createConstMap)([
    $29f26dae6e075eca$var$TMP_MESSAGETYPEVALUES_SENT,
    $29f26dae6e075eca$var$TMP_MESSAGETYPEVALUES_RECEIVED
]);

});

parcelRegister("8eI4c", function(module, exports) {

$parcel$export(module.exports, "ExceptionEventName", () => $5ff1d0471318721d$export$a0fff09a5370d06f);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Event name definitions
var $5ff1d0471318721d$export$a0fff09a5370d06f = "exception";

});


parcelRegister("8eAUr", function(module, exports) {

$parcel$export(module.exports, "mergeConfig", () => $5fec42f54608bc30$export$7ec1ebcfa9d8bd6a);
$parcel$export(module.exports, "reconfigureLimits", () => $5fec42f54608bc30$export$9f9fb435f8494555);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $caAfP = parcelRequire("caAfP");

var $2veCN = parcelRequire("2veCN");
var $3M0CS = parcelRequire("3M0CS");
function $5fec42f54608bc30$export$7ec1ebcfa9d8bd6a(userConfig) {
    var perInstanceDefaults = {
        sampler: (0, $caAfP.buildSamplerFromEnv)()
    };
    var DEFAULT_CONFIG = (0, $caAfP.loadDefaultConfig)();
    var target = Object.assign({}, DEFAULT_CONFIG, perInstanceDefaults, userConfig);
    target.generalLimits = Object.assign({}, DEFAULT_CONFIG.generalLimits, userConfig.generalLimits || {});
    target.spanLimits = Object.assign({}, DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
    return target;
}
function $5fec42f54608bc30$export$9f9fb435f8494555(userConfig) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var spanLimits = Object.assign({}, userConfig.spanLimits);
    var parsedEnvConfig = (0, $3M0CS.getEnvWithoutDefaults)();
    /**
     * Reassign span attribute count limit to use first non null value defined by user or use default value
     */ spanLimits.attributeCountLimit = (_f = (_e = (_d = (_b = (_a = userConfig.spanLimits) === null || _a === void 0 ? void 0 : _a.attributeCountLimit) !== null && _b !== void 0 ? _b : (_c = userConfig.generalLimits) === null || _c === void 0 ? void 0 : _c.attributeCountLimit) !== null && _d !== void 0 ? _d : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && _e !== void 0 ? _e : parsedEnvConfig.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && _f !== void 0 ? _f : (0, $2veCN.DEFAULT_ATTRIBUTE_COUNT_LIMIT);
    /**
     * Reassign span attribute value length limit to use first non null value defined by user or use default value
     */ spanLimits.attributeValueLengthLimit = (_m = (_l = (_k = (_h = (_g = userConfig.spanLimits) === null || _g === void 0 ? void 0 : _g.attributeValueLengthLimit) !== null && _h !== void 0 ? _h : (_j = userConfig.generalLimits) === null || _j === void 0 ? void 0 : _j.attributeValueLengthLimit) !== null && _k !== void 0 ? _k : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _l !== void 0 ? _l : parsedEnvConfig.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _m !== void 0 ? _m : (0, $2veCN.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT);
    return Object.assign({}, userConfig, {
        spanLimits: spanLimits
    });
}

});
parcelRegister("caAfP", function(module, exports) {

$parcel$export(module.exports, "loadDefaultConfig", () => $8dc28a88f1c90fe9$export$d25a2c2f78a5e968);
$parcel$export(module.exports, "buildSamplerFromEnv", () => $8dc28a88f1c90fe9$export$534308d7e73f0e71);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $3M0CS = parcelRequire("3M0CS");
var $6Mxke = parcelRequire("6Mxke");

var $lX0lO = parcelRequire("lX0lO");

var $6ai7P = parcelRequire("6ai7P");

var $gLJr3 = parcelRequire("gLJr3");

var $dKvNN = parcelRequire("dKvNN");
var $8dc28a88f1c90fe9$var$env = (0, $3M0CS.getEnv)();
var $8dc28a88f1c90fe9$var$FALLBACK_OTEL_TRACES_SAMPLER = (0, $6Mxke.TracesSamplerValues).AlwaysOn;
var $8dc28a88f1c90fe9$var$DEFAULT_RATIO = 1;
function $8dc28a88f1c90fe9$export$d25a2c2f78a5e968() {
    return {
        sampler: $8dc28a88f1c90fe9$export$534308d7e73f0e71($8dc28a88f1c90fe9$var$env),
        forceFlushTimeoutMillis: 30000,
        generalLimits: {
            attributeValueLengthLimit: (0, $3M0CS.getEnv)().OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, $3M0CS.getEnv)().OTEL_ATTRIBUTE_COUNT_LIMIT
        },
        spanLimits: {
            attributeValueLengthLimit: (0, $3M0CS.getEnv)().OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, $3M0CS.getEnv)().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
            linkCountLimit: (0, $3M0CS.getEnv)().OTEL_SPAN_LINK_COUNT_LIMIT,
            eventCountLimit: (0, $3M0CS.getEnv)().OTEL_SPAN_EVENT_COUNT_LIMIT,
            attributePerEventCountLimit: (0, $3M0CS.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
            attributePerLinkCountLimit: (0, $3M0CS.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT
        }
    };
}
function $8dc28a88f1c90fe9$export$534308d7e73f0e71(environment) {
    if (environment === void 0) environment = (0, $3M0CS.getEnv)();
    switch(environment.OTEL_TRACES_SAMPLER){
        case (0, $6Mxke.TracesSamplerValues).AlwaysOn:
            return new (0, $6ai7P.AlwaysOnSampler)();
        case (0, $6Mxke.TracesSamplerValues).AlwaysOff:
            return new (0, $lX0lO.AlwaysOffSampler)();
        case (0, $6Mxke.TracesSamplerValues).ParentBasedAlwaysOn:
            return new (0, $gLJr3.ParentBasedSampler)({
                root: new (0, $6ai7P.AlwaysOnSampler)()
            });
        case (0, $6Mxke.TracesSamplerValues).ParentBasedAlwaysOff:
            return new (0, $gLJr3.ParentBasedSampler)({
                root: new (0, $lX0lO.AlwaysOffSampler)()
            });
        case (0, $6Mxke.TracesSamplerValues).TraceIdRatio:
            return new (0, $dKvNN.TraceIdRatioBasedSampler)($8dc28a88f1c90fe9$var$getSamplerProbabilityFromEnv(environment));
        case (0, $6Mxke.TracesSamplerValues).ParentBasedTraceIdRatio:
            return new (0, $gLJr3.ParentBasedSampler)({
                root: new (0, $dKvNN.TraceIdRatioBasedSampler)($8dc28a88f1c90fe9$var$getSamplerProbabilityFromEnv(environment))
            });
        default:
            (0, $ljza4.diag).error('OTEL_TRACES_SAMPLER value "' + environment.OTEL_TRACES_SAMPLER + " invalid, defaulting to " + $8dc28a88f1c90fe9$var$FALLBACK_OTEL_TRACES_SAMPLER + '".');
            return new (0, $6ai7P.AlwaysOnSampler)();
    }
}
function $8dc28a88f1c90fe9$var$getSamplerProbabilityFromEnv(environment) {
    if (environment.OTEL_TRACES_SAMPLER_ARG === undefined || environment.OTEL_TRACES_SAMPLER_ARG === "") {
        (0, $ljza4.diag).error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to " + $8dc28a88f1c90fe9$var$DEFAULT_RATIO + ".");
        return $8dc28a88f1c90fe9$var$DEFAULT_RATIO;
    }
    var probability = Number(environment.OTEL_TRACES_SAMPLER_ARG);
    if (isNaN(probability)) {
        (0, $ljza4.diag).error("OTEL_TRACES_SAMPLER_ARG=" + environment.OTEL_TRACES_SAMPLER_ARG + " was given, but it is invalid, defaulting to " + $8dc28a88f1c90fe9$var$DEFAULT_RATIO + ".");
        return $8dc28a88f1c90fe9$var$DEFAULT_RATIO;
    }
    if (probability < 0 || probability > 1) {
        (0, $ljza4.diag).error("OTEL_TRACES_SAMPLER_ARG=" + environment.OTEL_TRACES_SAMPLER_ARG + " was given, but it is out of range ([0..1]), defaulting to " + $8dc28a88f1c90fe9$var$DEFAULT_RATIO + ".");
        return $8dc28a88f1c90fe9$var$DEFAULT_RATIO;
    }
    return probability;
}

});
parcelRegister("lX0lO", function(module, exports) {

$parcel$export(module.exports, "AlwaysOffSampler", () => $ffaf61536d9605bb$export$abc5f11618c4d6a3);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $kbNPy = parcelRequire("kbNPy");
/** Sampler that samples no traces. */ var $ffaf61536d9605bb$export$abc5f11618c4d6a3 = /** @class */ function() {
    function AlwaysOffSampler() {}
    AlwaysOffSampler.prototype.shouldSample = function() {
        return {
            decision: (0, $kbNPy.SamplingDecision).NOT_RECORD
        };
    };
    AlwaysOffSampler.prototype.toString = function() {
        return "AlwaysOffSampler";
    };
    return AlwaysOffSampler;
}();

});
parcelRegister("kbNPy", function(module, exports) {

$parcel$export(module.exports, "SamplingDecision", () => $eb2b7d0a8ba2c2ae$export$94df7a7a96a92f7b);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A sampling decision that determines how a {@link Span} will be recorded
 * and collected.
 */ var $eb2b7d0a8ba2c2ae$export$94df7a7a96a92f7b;
(function(SamplingDecision) {
    /**
     * `Span.isRecording() === false`, span will not be recorded and all events
     * and attributes will be dropped.
     */ SamplingDecision[SamplingDecision["NOT_RECORD"] = 0] = "NOT_RECORD";
    /**
     * `Span.isRecording() === true`, but `Sampled` flag in {@link TraceFlags}
     * MUST NOT be set.
     */ SamplingDecision[SamplingDecision["RECORD"] = 1] = "RECORD";
    /**
     * `Span.isRecording() === true` AND `Sampled` flag in {@link TraceFlags}
     * MUST be set.
     */ SamplingDecision[SamplingDecision["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})($eb2b7d0a8ba2c2ae$export$94df7a7a96a92f7b || ($eb2b7d0a8ba2c2ae$export$94df7a7a96a92f7b = {}));

});


parcelRegister("6ai7P", function(module, exports) {

$parcel$export(module.exports, "AlwaysOnSampler", () => $47d1bc9271eaba6b$export$653f832afb4ffa27);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $kbNPy = parcelRequire("kbNPy");
/** Sampler that samples all traces. */ var $47d1bc9271eaba6b$export$653f832afb4ffa27 = /** @class */ function() {
    function AlwaysOnSampler() {}
    AlwaysOnSampler.prototype.shouldSample = function() {
        return {
            decision: (0, $kbNPy.SamplingDecision).RECORD_AND_SAMPLED
        };
    };
    AlwaysOnSampler.prototype.toString = function() {
        return "AlwaysOnSampler";
    };
    return AlwaysOnSampler;
}();

});

parcelRegister("gLJr3", function(module, exports) {

$parcel$export(module.exports, "ParentBasedSampler", () => $c354479e6402d939$export$2bc0b1b09c2e3b47);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cn2YZ = parcelRequire("cn2YZ");parcelRequire("8Ur1m");
var $ibuLL = parcelRequire("ibuLL");
var $AvSm7 = parcelRequire("AvSm7");

var $7U7yv = parcelRequire("7U7yv");

var $lX0lO = parcelRequire("lX0lO");

var $6ai7P = parcelRequire("6ai7P");
/**
 * A composite sampler that either respects the parent span's sampling decision
 * or delegates to `delegateSampler` for root spans.
 */ var $c354479e6402d939$export$2bc0b1b09c2e3b47 = /** @class */ function() {
    function ParentBasedSampler(config) {
        var _a, _b, _c, _d;
        this._root = config.root;
        if (!this._root) {
            (0, $7U7yv.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
            this._root = new (0, $6ai7P.AlwaysOnSampler)();
        }
        this._remoteParentSampled = (_a = config.remoteParentSampled) !== null && _a !== void 0 ? _a : new (0, $6ai7P.AlwaysOnSampler)();
        this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new (0, $lX0lO.AlwaysOffSampler)();
        this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new (0, $6ai7P.AlwaysOnSampler)();
        this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new (0, $lX0lO.AlwaysOffSampler)();
    }
    ParentBasedSampler.prototype.shouldSample = function(context, traceId, spanName, spanKind, attributes, links) {
        var parentContext = (0, $ibuLL.trace).getSpanContext(context);
        if (!parentContext || !(0, $cn2YZ.isSpanContextValid)(parentContext)) return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        if (parentContext.isRemote) {
            if (parentContext.traceFlags & (0, $AvSm7.TraceFlags).SAMPLED) return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
            return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & (0, $AvSm7.TraceFlags).SAMPLED) return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
    };
    ParentBasedSampler.prototype.toString = function() {
        return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}";
    };
    return ParentBasedSampler;
}();

});

parcelRegister("dKvNN", function(module, exports) {

$parcel$export(module.exports, "TraceIdRatioBasedSampler", () => $a0283d7e7b94aa53$export$f1624f887f708bbf);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cn2YZ = parcelRequire("cn2YZ");

var $kbNPy = parcelRequire("kbNPy");
/** Sampler that samples a given fraction of traces based of trace id deterministically. */ var $a0283d7e7b94aa53$export$f1624f887f708bbf = /** @class */ function() {
    function TraceIdRatioBasedSampler(_ratio) {
        if (_ratio === void 0) _ratio = 0;
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 0xffffffff);
    }
    TraceIdRatioBasedSampler.prototype.shouldSample = function(context, traceId) {
        return {
            decision: (0, $cn2YZ.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? (0, $kbNPy.SamplingDecision).RECORD_AND_SAMPLED : (0, $kbNPy.SamplingDecision).NOT_RECORD
        };
    };
    TraceIdRatioBasedSampler.prototype.toString = function() {
        return "TraceIdRatioBased{" + this._ratio + "}";
    };
    TraceIdRatioBasedSampler.prototype._normalize = function(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio)) return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
    };
    TraceIdRatioBasedSampler.prototype._accumulate = function(traceId) {
        var accumulation = 0;
        for(var i = 0; i < traceId.length / 8; i++){
            var pos = i * 8;
            var part = parseInt(traceId.slice(pos, pos + 8), 16);
            accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
    };
    return TraceIdRatioBasedSampler;
}();

});



parcelRegister("dIVFU", function(module, exports) {

$parcel$export(module.exports, "RandomIdGenerator", () => $9fdc1f7644704bb8$export$97307207ef48da75);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $9fdc1f7644704bb8$var$SPAN_ID_BYTES = 8;
var $9fdc1f7644704bb8$var$TRACE_ID_BYTES = 16;
var $9fdc1f7644704bb8$export$97307207ef48da75 = /** @class */ function() {
    function RandomIdGenerator() {
        /**
         * Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
         * characters corresponding to 128 bits.
         */ this.generateTraceId = $9fdc1f7644704bb8$var$getIdGenerator($9fdc1f7644704bb8$var$TRACE_ID_BYTES);
        /**
         * Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
         * characters corresponding to 64 bits.
         */ this.generateSpanId = $9fdc1f7644704bb8$var$getIdGenerator($9fdc1f7644704bb8$var$SPAN_ID_BYTES);
    }
    return RandomIdGenerator;
}();
var $9fdc1f7644704bb8$var$SHARED_CHAR_CODES_ARRAY = Array(32);
function $9fdc1f7644704bb8$var$getIdGenerator(bytes) {
    return function generateId() {
        for(var i = 0; i < bytes * 2; i++){
            $9fdc1f7644704bb8$var$SHARED_CHAR_CODES_ARRAY[i] = Math.floor(Math.random() * 16) + 48;
            // valid hex characters in the range 48-57 and 97-102
            if ($9fdc1f7644704bb8$var$SHARED_CHAR_CODES_ARRAY[i] >= 58) $9fdc1f7644704bb8$var$SHARED_CHAR_CODES_ARRAY[i] += 39;
        }
        return String.fromCharCode.apply(null, $9fdc1f7644704bb8$var$SHARED_CHAR_CODES_ARRAY.slice(0, bytes * 2));
    };
}

});


parcelRegister("iHXy1", function(module, exports) {

$parcel$export(module.exports, "MultiSpanProcessor", () => $d9ea6f195f1e4f29$export$3012fe5a49154394);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $7U7yv = parcelRequire("7U7yv");
var $d9ea6f195f1e4f29$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Implementation of the {@link SpanProcessor} that simply forwards all
 * received events to a list of {@link SpanProcessor}s.
 */ var $d9ea6f195f1e4f29$export$3012fe5a49154394 = /** @class */ function() {
    function MultiSpanProcessor(_spanProcessors) {
        this._spanProcessors = _spanProcessors;
    }
    MultiSpanProcessor.prototype.forceFlush = function() {
        var e_1, _a;
        var promises = [];
        try {
            for(var _b = $d9ea6f195f1e4f29$var$__values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()){
                var spanProcessor = _c.value;
                promises.push(spanProcessor.forceFlush());
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        return new Promise(function(resolve) {
            Promise.all(promises).then(function() {
                resolve();
            }).catch(function(error) {
                (0, $7U7yv.globalErrorHandler)(error || new Error("MultiSpanProcessor: forceFlush failed"));
                resolve();
            });
        });
    };
    MultiSpanProcessor.prototype.onStart = function(span, context) {
        var e_2, _a;
        try {
            for(var _b = $d9ea6f195f1e4f29$var$__values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()){
                var spanProcessor = _c.value;
                spanProcessor.onStart(span, context);
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
    };
    MultiSpanProcessor.prototype.onEnd = function(span) {
        var e_3, _a;
        try {
            for(var _b = $d9ea6f195f1e4f29$var$__values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()){
                var spanProcessor = _c.value;
                spanProcessor.onEnd(span);
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
    };
    MultiSpanProcessor.prototype.shutdown = function() {
        var e_4, _a;
        var promises = [];
        try {
            for(var _b = $d9ea6f195f1e4f29$var$__values(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()){
                var spanProcessor = _c.value;
                promises.push(spanProcessor.shutdown());
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        return new Promise(function(resolve, reject) {
            Promise.all(promises).then(function() {
                resolve();
            }, reject);
        });
    };
    return MultiSpanProcessor;
}();

});

parcelRegister("4N619", function(module, exports) {

$parcel$export(module.exports, "NoopSpanProcessor", () => $37d06802574fdfad$export$27767823ad33d189);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** No-op implementation of SpanProcessor */ var $37d06802574fdfad$export$27767823ad33d189 = /** @class */ function() {
    function NoopSpanProcessor() {}
    NoopSpanProcessor.prototype.onStart = function(_span, _context) {};
    NoopSpanProcessor.prototype.onEnd = function(_span) {};
    NoopSpanProcessor.prototype.shutdown = function() {
        return Promise.resolve();
    };
    NoopSpanProcessor.prototype.forceFlush = function() {
        return Promise.resolve();
    };
    return NoopSpanProcessor;
}();

});


parcelRegister("72Hpy", function(module, exports) {

$parcel$export(module.exports, "StackContextManager", () => $520a64d9d4e39fa9$export$3dfe62dd209faf13);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $cE6pj = parcelRequire("cE6pj");
var $520a64d9d4e39fa9$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $520a64d9d4e39fa9$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Stack Context Manager for managing the state in web
 * it doesn't fully support the async calls though
 */ var $520a64d9d4e39fa9$export$3dfe62dd209faf13 = /** @class */ function() {
    function StackContextManager() {
        /**
         * whether the context manager is enabled or not
         */ this._enabled = false;
        /**
         * Keeps the reference to current context
         */ this._currentContext = (0, $cE6pj.ROOT_CONTEXT);
    }
    /**
     *
     * @param context
     * @param target Function to be executed within the context
     */ // eslint-disable-next-line @typescript-eslint/ban-types
    StackContextManager.prototype._bindFunction = function(context, target) {
        if (context === void 0) context = (0, $cE6pj.ROOT_CONTEXT);
        var manager = this;
        var contextWrapper = function() {
            var _this = this;
            var args = [];
            for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
            return manager.with(context, function() {
                return target.apply(_this, args);
            });
        };
        Object.defineProperty(contextWrapper, "length", {
            enumerable: false,
            configurable: true,
            writable: false,
            value: target.length
        });
        return contextWrapper;
    };
    /**
     * Returns the active context
     */ StackContextManager.prototype.active = function() {
        return this._currentContext;
    };
    /**
     * Binds a the certain context or the active one to the target function and then returns the target
     * @param context A context (span) to be bind to target
     * @param target a function or event emitter. When target or one of its callbacks is called,
     *  the provided context will be used as the active context for the duration of the call.
     */ StackContextManager.prototype.bind = function(context, target) {
        // if no specific context to propagate is given, we use the current one
        if (context === undefined) context = this.active();
        if (typeof target === "function") return this._bindFunction(context, target);
        return target;
    };
    /**
     * Disable the context manager (clears the current context)
     */ StackContextManager.prototype.disable = function() {
        this._currentContext = (0, $cE6pj.ROOT_CONTEXT);
        this._enabled = false;
        return this;
    };
    /**
     * Enables the context manager and creates a default(root) context
     */ StackContextManager.prototype.enable = function() {
        if (this._enabled) return this;
        this._enabled = true;
        this._currentContext = (0, $cE6pj.ROOT_CONTEXT);
        return this;
    };
    /**
     * Calls the callback function [fn] with the provided [context]. If [context] is undefined then it will use the window.
     * The context will be set as active
     * @param context
     * @param fn Callback function
     * @param thisArg optional receiver to be used for calling fn
     * @param args optional arguments forwarded to fn
     */ StackContextManager.prototype.with = function(context, fn, thisArg) {
        var args = [];
        for(var _i = 3; _i < arguments.length; _i++)args[_i - 3] = arguments[_i];
        var previousContext = this._currentContext;
        this._currentContext = context || (0, $cE6pj.ROOT_CONTEXT);
        try {
            return fn.call.apply(fn, $520a64d9d4e39fa9$var$__spreadArray([
                thisArg
            ], $520a64d9d4e39fa9$var$__read(args), false));
        } finally{
            this._currentContext = previousContext;
        }
    };
    return StackContextManager;
}();

});


parcelRegister("bFrkE", function(module, exports) {
"use strict";
// This code will eventually be packaged upstream into a WebSDK package.
// Once it is released as a package, this distro will depend directly on the upstream package.
// https://github.com/open-telemetry/opentelemetry-js/pull/4325
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.SessionIdSpanProcessor = void 0;
const $87e8b9a435b761a5$var$SESSION_ID_BYTES = 16;
const $87e8b9a435b761a5$var$SHARED_CHAR_CODES_ARRAY = Array(32);
class $87e8b9a435b761a5$var$SessionIdSpanProcessor {
    constructor(){
        this._idGenerator = $87e8b9a435b761a5$var$getIdGenerator($87e8b9a435b761a5$var$SESSION_ID_BYTES);
        this._sessionId = this._idGenerator();
    }
    onStart(span) {
        span.setAttribute("session.id", this._sessionId);
    }
    onEnd() {}
    forceFlush() {
        return Promise.resolve();
    }
    shutdown() {
        return Promise.resolve();
    }
}
module.exports.SessionIdSpanProcessor = $87e8b9a435b761a5$var$SessionIdSpanProcessor;
function $87e8b9a435b761a5$var$getIdGenerator(bytes) {
    return function generateId() {
        for(let i = 0; i < bytes * 2; i++){
            $87e8b9a435b761a5$var$SHARED_CHAR_CODES_ARRAY[i] = Math.floor(Math.random() * 16) + 48;
            // valid hex characters in the range 48-57 and 97-102
            if ($87e8b9a435b761a5$var$SHARED_CHAR_CODES_ARRAY[i] >= 58) $87e8b9a435b761a5$var$SHARED_CHAR_CODES_ARRAY[i] += 39;
        }
        return String.fromCharCode.apply(null, $87e8b9a435b761a5$var$SHARED_CHAR_CODES_ARRAY.slice(0, bytes * 2));
    };
}

});

parcelRegister("8ySzd", function(module, exports) {
$parcel$export(module.exports, "browserDetector", () => (parcelRequire("7Gu1e")).browserDetector);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("7Gu1e");

});
parcelRegister("7Gu1e", function(module, exports) {

$parcel$export(module.exports, "browserDetector", () => $5983bdc1e50ed1ad$export$a23a90002feb7ef);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $kawsV = parcelRequire("kawsV");

var $3eJ2c = parcelRequire("3eJ2c");
var $5983bdc1e50ed1ad$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $5983bdc1e50ed1ad$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
/**
 * BrowserDetector will be used to detect the resources related to browser.
 */ var $5983bdc1e50ed1ad$var$BrowserDetector = /** @class */ function() {
    function BrowserDetector() {}
    BrowserDetector.prototype.detect = function(config) {
        return $5983bdc1e50ed1ad$var$__awaiter(this, void 0, void 0, function() {
            var isBrowser, browserResource;
            return $5983bdc1e50ed1ad$var$__generator(this, function(_a) {
                isBrowser = typeof navigator !== "undefined";
                if (!isBrowser) return [
                    2 /*return*/ ,
                    (0, $kawsV.Resource).empty()
                ];
                browserResource = $5983bdc1e50ed1ad$var$getBrowserAttributes();
                return [
                    2 /*return*/ ,
                    this._getResourceAttributes(browserResource, config)
                ];
            });
        });
    };
    /**
     * Validates browser resource attribute map from browser variables
     *
     * @param browserResource The un-sanitized resource attributes from browser as key/value pairs.
     * @param config: Config
     * @returns The sanitized resource attributes.
     */ BrowserDetector.prototype._getResourceAttributes = function(browserResource, _config) {
        if (!browserResource[(0, $3eJ2c.BROWSER_ATTRIBUTES).USER_AGENT] && !browserResource[(0, $3eJ2c.BROWSER_ATTRIBUTES).PLATFORM]) {
            (0, $ljza4.diag).debug("BrowserDetector failed: Unable to find required browser resources. ");
            return (0, $kawsV.Resource).empty();
        } else return new (0, $kawsV.Resource)(browserResource);
    };
    return BrowserDetector;
}();
// Add Browser related attributes to resources
function $5983bdc1e50ed1ad$var$getBrowserAttributes() {
    var browserAttribs = {};
    var userAgentData = navigator.userAgentData;
    if (userAgentData) {
        browserAttribs[(0, $3eJ2c.BROWSER_ATTRIBUTES).PLATFORM] = userAgentData.platform;
        browserAttribs[(0, $3eJ2c.BROWSER_ATTRIBUTES).BRANDS] = userAgentData.brands.map(function(b) {
            return b.brand + " " + b.version;
        });
        browserAttribs[(0, $3eJ2c.BROWSER_ATTRIBUTES).MOBILE] = userAgentData.mobile;
    } else browserAttribs[(0, $3eJ2c.BROWSER_ATTRIBUTES).USER_AGENT] = navigator.userAgent;
    browserAttribs[(0, $3eJ2c.BROWSER_ATTRIBUTES).LANGUAGE] = navigator.language;
    return browserAttribs;
}
var $5983bdc1e50ed1ad$export$a23a90002feb7ef = new $5983bdc1e50ed1ad$var$BrowserDetector();

});
parcelRegister("3eJ2c", function(module, exports) {

$parcel$export(module.exports, "BROWSER_ATTRIBUTES", () => $25b59ccdc12c2f78$export$a0d08692cc547dcb);
var $25b59ccdc12c2f78$export$a0d08692cc547dcb = {
    PLATFORM: "browser.platform",
    BRANDS: "browser.brands",
    MOBILE: "browser.mobile",
    LANGUAGE: "browser.language",
    USER_AGENT: "browser.user_agent"
};

});




parcelRegister("5ztjy", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.HoneycombWebSDK = void 0;

var $76YNT = parcelRequire("76YNT");

var $df42J = parcelRequire("df42J");

var $eQd16 = parcelRequire("eQd16");

var $9ib7v = parcelRequire("9ib7v");

var $3ULWd = parcelRequire("3ULWd");

var $3Mtl8 = parcelRequire("3Mtl8");

var $8SJjW = parcelRequire("8SJjW");

var $3c1t1 = parcelRequire("3c1t1");

var $fcSAX = parcelRequire("fcSAX");

var $okhup = parcelRequire("okhup");
class $40e6f5dcb36dc3c7$var$HoneycombWebSDK extends $76YNT.WebSDK {
    constructor(options){
        var _a;
        const instrumentations = [
            ...(options === null || options === void 0 ? void 0 : options.instrumentations) || []
        ];
        // Automatically include web vitals instrumentation unless explicitly set to false
        if (((_a = options === null || options === void 0 ? void 0 : options.webVitalsInstrumentationConfig) === null || _a === void 0 ? void 0 : _a.enabled) !== false) instrumentations.push(new $okhup.WebVitalsInstrumentation(options === null || options === void 0 ? void 0 : options.webVitalsInstrumentationConfig));
        super(Object.assign(Object.assign({}, options), {
            instrumentations: instrumentations,
            resource: (0, $3ULWd.mergeResources)([
                (0, $9ib7v.configureBrowserAttributesResource)(),
                (0, $eQd16.configureEntryPageResource)(options === null || options === void 0 ? void 0 : options.entryPageAttributes),
                options === null || options === void 0 ? void 0 : options.resource,
                options === null || options === void 0 ? void 0 : options.resourceAttributes,
                (0, $df42J.configureHoneycombResource)()
            ]),
            sampler: (0, $3c1t1.configureDeterministicSampler)(options),
            // Exporter is configured through the span processor because
            // the base SDK does not allow having both a spanProcessor and a
            // traceExporter configured at the same time.
            spanProcessor: (0, $8SJjW.configureSpanProcessors)(options)
        }));
        (0, $fcSAX.validateOptionsWarnings)(options);
        if (options === null || options === void 0 ? void 0 : options.debug) (0, $3Mtl8.configureDebug)(options);
    }
}
module.exports.HoneycombWebSDK = $40e6f5dcb36dc3c7$var$HoneycombWebSDK;

});
parcelRegister("df42J", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.configureHoneycombResource = $9a3fcfeea09081dc$var$configureHoneycombResource;

var $kawsV = parcelRequire("kawsV");

var $8W2wk = parcelRequire("8W2wk");
function $9a3fcfeea09081dc$var$configureHoneycombResource() {
    return new $kawsV.Resource({
        "honeycomb.distro.version": $8W2wk.VERSION,
        "honeycomb.distro.runtime_version": "browser"
    });
}

});
parcelRegister("8W2wk", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.VERSION = void 0;
module.exports.VERSION = "0.4.0";

});


parcelRegister("eQd16", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.defaultConfig = void 0;
module.exports.configureEntryPageResource = $ace004df75b0c3ac$var$configureEntryPageResource;

var $kawsV = parcelRequire("kawsV");
module.exports.defaultConfig = {
    path: true,
    hash: true,
    hostname: true,
    referrer: true,
    url: false,
    search: false
};
function $ace004df75b0c3ac$var$configureEntryPageResource(config) {
    if (config === false || !(window === null || window === void 0 ? void 0 : window.location)) return new $kawsV.Resource({});
    const options = $ace004df75b0c3ac$var$getOptions(config);
    const { href: href, pathname: pathname, search: search, hash: hash, hostname: hostname } = window.location;
    const attributes = {
        "entry_page.url": $ace004df75b0c3ac$var$optionalAttribute(options.url, href),
        "entry_page.path": $ace004df75b0c3ac$var$optionalAttribute(options.path, pathname),
        "entry_page.search": $ace004df75b0c3ac$var$optionalAttribute(options.search, search),
        "entry_page.hash": $ace004df75b0c3ac$var$optionalAttribute(options.hash, hash),
        "entry_page.hostname": $ace004df75b0c3ac$var$optionalAttribute(options.hostname, hostname),
        "entry_page.referrer": $ace004df75b0c3ac$var$optionalAttribute(options.referrer, document.referrer)
    };
    return new $kawsV.Resource(attributes);
}
function $ace004df75b0c3ac$var$getOptions(config) {
    if (!config) return module.exports.defaultConfig;
    return Object.assign(Object.assign({}, module.exports.defaultConfig), config);
}
function $ace004df75b0c3ac$var$optionalAttribute(shouldInclude, attribute) {
    if (!shouldInclude) return undefined;
    return attribute;
}

});

parcelRegister("9ib7v", function(module, exports) {
"use strict";
var $6c3e6bb8a0666de6$var$__importDefault = module.exports && module.exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.computeDeviceProperties = module.exports.computeNetworkType = module.exports.computeScreenSize = void 0;
module.exports.configureBrowserAttributesResource = $6c3e6bb8a0666de6$var$configureBrowserAttributesResource;

var $kawsV = parcelRequire("kawsV");

const $6c3e6bb8a0666de6$var$ua_parser_js_1 = $6c3e6bb8a0666de6$var$__importDefault((parcelRequire("6Wt0I")));
const $6c3e6bb8a0666de6$var$computeScreenSize = (screenWidth)=>{
    if (screenWidth <= 768) return "small";
    else if (screenWidth > 768 && screenWidth <= 1024) return "medium";
    else if (screenWidth > 1024) return "large";
    return "unknown";
};
module.exports.computeScreenSize = $6c3e6bb8a0666de6$var$computeScreenSize;
const $6c3e6bb8a0666de6$var$computeNetworkType = (networkInformation)=>{
    var _a;
    return (_a = networkInformation === null || networkInformation === void 0 ? void 0 : networkInformation.effectiveType) !== null && _a !== void 0 ? _a : "unknown";
};
module.exports.computeNetworkType = $6c3e6bb8a0666de6$var$computeNetworkType;
const $6c3e6bb8a0666de6$var$computeDeviceType = (detectedDeviceType, detectedBrowserName)=>{
    // ua-parser-js doesn't fill in device type unless it's in the user agent directly
    // which means that desktops/laptops show up as undefined
    // https://github.com/faisalman/ua-parser-js/issues/182
    //
    // we're going to do this:
    // browser name & device type both undefined -> unknown
    // browser name defined & device type undefined -> desktop
    // device type defined -> use that
    if (!detectedDeviceType && !detectedBrowserName) return "unknown";
    if (!detectedDeviceType) return "desktop";
    return detectedDeviceType;
};
const $6c3e6bb8a0666de6$var$computeDeviceProperties = (userAgent)=>{
    const uaParser = new $6c3e6bb8a0666de6$var$ua_parser_js_1.default(userAgent);
    const { name: browserName, version: browserVersion } = uaParser.getBrowser();
    return {
        browserName: browserName !== null && browserName !== void 0 ? browserName : "unknown",
        browserVersion: browserVersion !== null && browserVersion !== void 0 ? browserVersion : "unknown",
        deviceType: $6c3e6bb8a0666de6$var$computeDeviceType(uaParser.getDevice().type, browserName)
    };
};
module.exports.computeDeviceProperties = $6c3e6bb8a0666de6$var$computeDeviceProperties;
function $6c3e6bb8a0666de6$var$configureBrowserAttributesResource() {
    const { browserName: browserName, browserVersion: browserVersion, deviceType: deviceType } = (0, module.exports.computeDeviceProperties)(navigator.userAgent);
    return new $kawsV.Resource({
        "user_agent.original": navigator.userAgent,
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop
        "browser.mobile": navigator.userAgent.includes("Mobi"),
        "browser.touch_screen_enabled": navigator.maxTouchPoints > 0,
        "browser.language": navigator.language,
        "browser.name": browserName,
        "browser.version": browserVersion,
        "device.type": deviceType,
        "network.effectiveType": (0, module.exports.computeNetworkType)(navigator.connection),
        "screen.width": window.screen.width,
        "screen.height": window.screen.height,
        "screen.size": (0, module.exports.computeScreenSize)(window.screen.width)
    });
}

});
parcelRegister("6Wt0I", function(module, exports) {
/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v1.0.38
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */ /*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */ /////////////////////////////////////////////////////////////////////////////////
(function(window1, undefined) {
    "use strict";
    //////////////
    // Constants
    /////////////
    var LIBVERSION = "1.0.38", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 500;
    var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS";
    ///////////
    // Helper
    //////////
    var extend = function(regexes, extensions) {
        var mergedRegexes = {};
        for(var i in regexes)if (extensions[i] && extensions[i].length % 2 === 0) mergedRegexes[i] = extensions[i].concat(regexes[i]);
        else mergedRegexes[i] = regexes[i];
        return mergedRegexes;
    }, enumerize = function(arr) {
        var enums = {};
        for(var i = 0; i < arr.length; i++)enums[arr[i].toUpperCase()] = arr[i];
        return enums;
    }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
    }, lowerize = function(str) {
        return str.toLowerCase();
    }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined;
    }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
            str = str.replace(/^\s\s*/, EMPTY);
            return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
    };
    ///////////////
    // Map helper
    //////////////
    var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        // loop through all regexes maps
        while(i < arrays.length && !matches){
            var regex = arrays[i], props = arrays[i + 1]; // odd sequence (1,3,5,..)
            j = k = 0;
            // try matching uastring with regexes
            while(j < regex.length && !matches){
                if (!regex[j]) break;
                matches = regex[j++].exec(ua);
                if (!!matches) for(p = 0; p < props.length; p++){
                    match = matches[++k];
                    q = props[p];
                    // check if given property is actually array
                    if (typeof q === OBJ_TYPE && q.length > 0) {
                        if (q.length === 2) {
                            if (typeof q[1] == FUNC_TYPE) // assign modified match
                            this[q[0]] = q[1].call(this, match);
                            else // assign given value, ignore regex match
                            this[q[0]] = q[1];
                        } else if (q.length === 3) {
                            // check whether function or regex
                            if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) // call function (usually string mapper)
                            this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                            else // sanitize match using given regex
                            this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                        } else if (q.length === 4) this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                    } else this[q] = match ? match : undefined;
                }
            }
            i += 2;
        }
    }, strMapper = function(str, map) {
        for(var i in map){
            // check if current value is array
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) for(var j = 0; j < map[i].length; j++){
                if (has(map[i][j], str)) return i === UNKNOWN ? undefined : i;
            }
            else if (has(map[i], str)) return i === UNKNOWN ? undefined : i;
        }
        return str;
    };
    ///////////////
    // String map
    //////////////
    // Safari < 3.0
    var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
    }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": [
            "NT 5.1",
            "NT 5.2"
        ],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": [
            "NT 6.4",
            "NT 10.0"
        ],
        "RT": "ARM"
    };
    //////////////
    // Regex map
    /////////////
    var regexes = {
        browser: [
            [
                /\b(?:crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "Chrome"
                ]
            ],
            [
                /edg(?:e|ios|a)?\/([\w\.]+)/i // Microsoft Edge
            ],
            [
                VERSION,
                [
                    NAME,
                    "Edge"
                ]
            ],
            [
                // Presto based
                /(opera mini)\/([-\w\.]+)/i,
                /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i // Opera
            ],
            [
                NAME,
                VERSION
            ],
            [
                /opios[\/ ]+([\w\.]+)/i // Opera mini on iphone >= 8.0
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA + " Mini"
                ]
            ],
            [
                /\bop(?:rg)?x\/([\w\.]+)/i // Opera GX
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA + " GX"
                ]
            ],
            [
                /\bopr\/([\w\.]+)/i // Opera Webkit
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA
                ]
            ],
            [
                // Mixed
                /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i // Baidu
            ],
            [
                VERSION,
                [
                    NAME,
                    "Baidu"
                ]
            ],
            [
                /(kindle)\/([\w\.]+)/i,
                /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                // Trident based
                /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
                /(?:ms|\()(ie) ([\w\.]+)/i,
                // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
                /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
                /(heytap|ovi)browser\/([\d\.]+)/i,
                /(weibo)__([\d\.]+)/i // Weibo
            ],
            [
                NAME,
                VERSION
            ],
            [
                /\bddg\/([\w\.]+)/i // DuckDuckGo
            ],
            [
                VERSION,
                [
                    NAME,
                    "DuckDuckGo"
                ]
            ],
            [
                /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i // UCBrowser
            ],
            [
                VERSION,
                [
                    NAME,
                    "UC" + BROWSER
                ]
            ],
            [
                /microm.+\bqbcore\/([\w\.]+)/i,
                /\bqbcore\/([\w\.]+).+microm/i,
                /micromessenger\/([\w\.]+)/i // WeChat
            ],
            [
                VERSION,
                [
                    NAME,
                    "WeChat"
                ]
            ],
            [
                /konqueror\/([\w\.]+)/i // Konqueror
            ],
            [
                VERSION,
                [
                    NAME,
                    "Konqueror"
                ]
            ],
            [
                /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i // IE11
            ],
            [
                VERSION,
                [
                    NAME,
                    "IE"
                ]
            ],
            [
                /ya(?:search)?browser\/([\w\.]+)/i // Yandex
            ],
            [
                VERSION,
                [
                    NAME,
                    "Yandex"
                ]
            ],
            [
                /slbrowser\/([\w\.]+)/i // Smart Lenovo Browser
            ],
            [
                VERSION,
                [
                    NAME,
                    "Smart Lenovo " + BROWSER
                ]
            ],
            [
                /(avast|avg)\/([\w\.]+)/i // Avast/AVG Secure Browser
            ],
            [
                [
                    NAME,
                    /(.+)/,
                    "$1 Secure " + BROWSER
                ],
                VERSION
            ],
            [
                /\bfocus\/([\w\.]+)/i // Firefox Focus
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX + " Focus"
                ]
            ],
            [
                /\bopt\/([\w\.]+)/i // Opera Touch
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA + " Touch"
                ]
            ],
            [
                /coc_coc\w+\/([\w\.]+)/i // Coc Coc Browser
            ],
            [
                VERSION,
                [
                    NAME,
                    "Coc Coc"
                ]
            ],
            [
                /dolfin\/([\w\.]+)/i // Dolphin
            ],
            [
                VERSION,
                [
                    NAME,
                    "Dolphin"
                ]
            ],
            [
                /coast\/([\w\.]+)/i // Opera Coast
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA + " Coast"
                ]
            ],
            [
                /miuibrowser\/([\w\.]+)/i // MIUI Browser
            ],
            [
                VERSION,
                [
                    NAME,
                    "MIUI " + BROWSER
                ]
            ],
            [
                /fxios\/([-\w\.]+)/i // Firefox for iOS
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX
                ]
            ],
            [
                /\bqihu|(qi?ho?o?|360)browser/i // 360
            ],
            [
                [
                    NAME,
                    "360 " + BROWSER
                ]
            ],
            [
                /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
            ],
            [
                [
                    NAME,
                    /(.+)/,
                    "$1 " + BROWSER
                ],
                VERSION
            ],
            [
                /samsungbrowser\/([\w\.]+)/i // Samsung Internet
            ],
            [
                VERSION,
                [
                    NAME,
                    SAMSUNG + " Internet"
                ]
            ],
            [
                /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
            ],
            [
                [
                    NAME,
                    /_/g,
                    " "
                ],
                VERSION
            ],
            [
                /metasr[\/ ]?([\d\.]+)/i // Sogou Explorer
            ],
            [
                VERSION,
                [
                    NAME,
                    "Sogou Explorer"
                ]
            ],
            [
                /(sogou)mo\w+\/([\d\.]+)/i // Sogou Mobile
            ],
            [
                [
                    NAME,
                    "Sogou Mobile"
                ],
                VERSION
            ],
            [
                /(electron)\/([\w\.]+) safari/i,
                /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i // QQBrowser/2345 Browser
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(lbbrowser)/i,
                /\[(linkedin)app\]/i // LinkedIn App for iOS & Android
            ],
            [
                NAME
            ],
            [
                // WebView
                /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i // Facebook App for iOS & Android
            ],
            [
                [
                    NAME,
                    FACEBOOK
                ],
                VERSION
            ],
            [
                /(Klarna)\/([\w\.]+)/i,
                /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                /safari (line)\/([\w\.]+)/i,
                /\b(line)\/([\w\.]+)\/iab/i,
                /(alipay)client\/([\w\.]+)/i,
                /(twitter)(?:and| f.+e\/([\w\.]+))/i,
                /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i // Chromium/Instagram/Snapchat
            ],
            [
                NAME,
                VERSION
            ],
            [
                /\bgsa\/([\w\.]+) .*safari\//i // Google Search Appliance on iOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "GSA"
                ]
            ],
            [
                /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i // TikTok
            ],
            [
                VERSION,
                [
                    NAME,
                    "TikTok"
                ]
            ],
            [
                /headlesschrome(?:\/([\w\.]+)| )/i // Chrome Headless
            ],
            [
                VERSION,
                [
                    NAME,
                    CHROME + " Headless"
                ]
            ],
            [
                / wv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
            ],
            [
                [
                    NAME,
                    CHROME + " WebView"
                ],
                VERSION
            ],
            [
                /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i // Android Browser
            ],
            [
                VERSION,
                [
                    NAME,
                    "Android " + BROWSER
                ]
            ],
            [
                /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
            ],
            [
                NAME,
                VERSION
            ],
            [
                /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i // Mobile Safari
            ],
            [
                VERSION,
                [
                    NAME,
                    "Mobile Safari"
                ]
            ],
            [
                /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i // Safari & Safari Mobile
            ],
            [
                VERSION,
                NAME
            ],
            [
                /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
            ],
            [
                NAME,
                [
                    VERSION,
                    strMapper,
                    oldSafariMap
                ]
            ],
            [
                /(webkit|khtml)\/([\w\.]+)/i
            ],
            [
                NAME,
                VERSION
            ],
            [
                // Gecko based
                /(navigator|netscape\d?)\/([-\w\.]+)/i // Netscape
            ],
            [
                [
                    NAME,
                    "Netscape"
                ],
                VERSION
            ],
            [
                /mobile vr; rv:([\w\.]+)\).+firefox/i // Firefox Reality
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX + " Reality"
                ]
            ],
            [
                /ekiohf.+(flow)\/([\w\.]+)/i,
                /(swiftfox)/i,
                /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
                /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
                /(firefox)\/([\w\.]+)/i,
                /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                // Other
                /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
                /(links) \(([\w\.]+)/i,
                /panasonic;(viera)/i // Panasonic Viera
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(cobalt)\/([\w\.]+)/i // Cobalt
            ],
            [
                NAME,
                [
                    VERSION,
                    /master.|lts./,
                    ""
                ]
            ]
        ],
        cpu: [
            [
                /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i // AMD64 (x64)
            ],
            [
                [
                    ARCHITECTURE,
                    "amd64"
                ]
            ],
            [
                /(ia32(?=;))/i // IA32 (quicktime)
            ],
            [
                [
                    ARCHITECTURE,
                    lowerize
                ]
            ],
            [
                /((?:i[346]|x)86)[;\)]/i // IA32 (x86)
            ],
            [
                [
                    ARCHITECTURE,
                    "ia32"
                ]
            ],
            [
                /\b(aarch64|arm(v?8e?l?|_?64))\b/i // ARM64
            ],
            [
                [
                    ARCHITECTURE,
                    "arm64"
                ]
            ],
            [
                /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i // ARMHF
            ],
            [
                [
                    ARCHITECTURE,
                    "armhf"
                ]
            ],
            [
                // PocketPC mistakenly identified as PowerPC
                /windows (ce|mobile); ppc;/i
            ],
            [
                [
                    ARCHITECTURE,
                    "arm"
                ]
            ],
            [
                /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i // PowerPC
            ],
            [
                [
                    ARCHITECTURE,
                    /ower/,
                    EMPTY,
                    lowerize
                ]
            ],
            [
                /(sun4\w)[;\)]/i // SPARC
            ],
            [
                [
                    ARCHITECTURE,
                    "sparc"
                ]
            ],
            [
                /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
            ],
            [
                [
                    ARCHITECTURE,
                    lowerize
                ]
            ]
        ],
        device: [
            [
                //////////////////////////
                // MOBILES & TABLETS
                /////////////////////////
                // Samsung
                /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SAMSUNG
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                /samsung[- ]([-\w]+)/i,
                /sec-(sgh\w+)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SAMSUNG
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Apple
                /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i // iPod/iPhone
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\((ipad);[-\w\),; ]+apple/i,
                /applecoremedia\/[\w\.]+ \((ipad)/i,
                /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(macintosh);/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ]
            ],
            [
                // Sharp
                /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SHARP
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Huawei
                /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    HUAWEI
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(?:huawei|honor)([-\w ]+)[;\)]/i,
                /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    HUAWEI
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Xiaomi
                /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
                /\b; (\w+) build\/hm\1/i,
                /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
                /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
            ],
            [
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    VENDOR,
                    XIAOMI
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
                /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i // Mi Pad tablets
            ],
            [
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    VENDOR,
                    XIAOMI
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // OPPO
                /; (\w+) bui.+ oppo/i,
                /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "OPPO"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(opd2\d{3}a?) bui/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "OPPO"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // Vivo
                /vivo (\w+)(?: bui|\))/i,
                /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Vivo"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Realme
                /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Realme"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Motorola
                /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                /\bmot(?:orola)?[- ](\w*)/i,
                /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MOTOROLA
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MOTOROLA
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // LG
                /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    LG
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                /\blg-?([\d\w]+) bui/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    LG
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Lenovo
                /(ideatab[-\w ]+)/i,
                /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Lenovo"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // Nokia
                /(?:maemo|nokia).*(n900|lumia \d+)/i,
                /nokia[-_ ]?([-\w\.]*)/i
            ],
            [
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    VENDOR,
                    "Nokia"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Google
                /(pixel c)\b/i // Google Pixel C
            ],
            [
                MODEL,
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i // Google Pixel
            ],
            [
                MODEL,
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Sony
                /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /sony tablet [ps]/i,
                /\b(?:sony)?sgp\w+(?: bui|\))/i
            ],
            [
                [
                    MODEL,
                    "Xperia Tablet"
                ],
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // OnePlus
                / (kb2005|in20[12]5|be20[12][59])\b/i,
                /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "OnePlus"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Amazon
                /(alexa)webm/i,
                /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                /(kf[a-z]+)( bui|\)).+silk\//i // Kindle Fire HD
            ],
            [
                MODEL,
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i // Fire Phone
            ],
            [
                [
                    MODEL,
                    /(.+)/g,
                    "Fire Phone $1"
                ],
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // BlackBerry
                /(playbook);[-\w\),; ]+(rim)/i // BlackBerry PlayBook
            ],
            [
                MODEL,
                VENDOR,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((?:bb[a-f]|st[hv])100-\d)/i,
                /\(bb10; (\w+)/i // BlackBerry 10
            ],
            [
                MODEL,
                [
                    VENDOR,
                    BLACKBERRY
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Asus
                /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ASUS
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ASUS
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // HTC
                /(nexus 9)/i // HTC Nexus 9
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "HTC"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                // ZTE
                /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ],
            [
                VENDOR,
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Acer
                /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Acer"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // Meizu
                /droid.+; (m[1-5] note) bui/i,
                /\bmz-([-\w]{2,})/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Meizu"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Ulefone
                /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Ulefone"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // MIXED
                /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
                /(hp) ([\w ]+\w)/i,
                /(asus)-?(\w+)/i,
                /(microsoft); (lumia[\w ]+)/i,
                /(lenovo)[-_ ]?([-\w]+)/i,
                /(jolla)/i,
                /(oppo) ?([\w ]+) bui/i // OPPO
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(kobo)\s(ereader|touch)/i,
                /(archos) (gamepad2?)/i,
                /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                /(kindle)\/([\w\.]+)/i,
                /(nook)[\w ]+build\/(\w+)/i,
                /(dell) (strea[kpr\d ]*[\dko])/i,
                /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                /(trinity)[- ]*(t\d{3}) bui/i,
                /(gigaset)[- ]+(q\w{1,9}) bui/i,
                /(vodafone) ([\w ]+)(?:\)| bui)/i // Vodafone
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(surface duo)/i // Surface Duo
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MICROSOFT
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /droid [\d\.]+; (fp\du?)(?: b|\))/i // Fairphone
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Fairphone"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(u304aa)/i // AT&T
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "AT&T"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\bsie-(\w*)/i // Siemens
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Siemens"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(rct\w+) b/i // RCA Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "RCA"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(venue[\d ]{2,7}) b/i // Dell Venue Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Dell"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(q(?:mv|ta)\w+) b/i // Verizon Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Verizon"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i // Barnes & Noble Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Barnes & Noble"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(tm\d{3}\w+) b/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "NuVision"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(k88) b/i // ZTE K Series Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "ZTE"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(nx\d{3}j) b/i // ZTE Nubia
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "ZTE"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(gen\d{3}) b.+49h/i // Swiss GEN Mobile
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Swiss"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(zur\d{3}) b/i // Swiss ZUR Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Swiss"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((zeki)?tb.*\b) b/i // Zeki Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Zeki"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b([yr]\d{2}) b/i,
                /\b(dragon[- ]+touch |dt)(\w{5}) b/i // Dragon Touch Tablet
            ],
            [
                [
                    VENDOR,
                    "Dragon Touch"
                ],
                MODEL,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(ns-?\w{0,9}) b/i // Insignia Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Insignia"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((nxa|next)-?\w{0,9}) b/i // NextBook Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "NextBook"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i // Voice Xtreme Phones
            ],
            [
                [
                    VENDOR,
                    "Voice"
                ],
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(lvtel\-)?(v1[12]) b/i // LvTel Phones
            ],
            [
                [
                    VENDOR,
                    "LvTel"
                ],
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(ph-1) /i // Essential PH-1
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Essential"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(v(100md|700na|7011|917g).*\b) b/i // Envizen Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Envizen"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(trio[-\w\. ]+) b/i // MachSpeed Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "MachSpeed"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\btu_(1491) b/i // Rotor Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Rotor"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(shield[\w ]+) b/i // Nvidia Shield Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Nvidia"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(sprint) (\w+)/i // Sprint Phones
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(kin\.[onetw]{3})/i // Microsoft Kin
            ],
            [
                [
                    MODEL,
                    /\./g,
                    " "
                ],
                [
                    VENDOR,
                    MICROSOFT
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i // Zebra
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ZEBRA
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ZEBRA
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                ///////////////////
                // SMARTTVS
                ///////////////////
                /smart-tv.+(samsung)/i // Samsung
            ],
            [
                VENDOR,
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /hbbtv.+maple;(\d+)/i
            ],
            [
                [
                    MODEL,
                    /^/,
                    "SmartTV"
                ],
                [
                    VENDOR,
                    SAMSUNG
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i // LG SmartTV
            ],
            [
                [
                    VENDOR,
                    LG
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(apple) ?tv/i // Apple TV
            ],
            [
                VENDOR,
                [
                    MODEL,
                    APPLE + " TV"
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /crkey/i // Google Chromecast
            ],
            [
                [
                    MODEL,
                    CHROME + "cast"
                ],
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /droid.+aft(\w+)( bui|\))/i // Fire TV
            ],
            [
                MODEL,
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /\(dtv[\);].+(aquos)/i,
                /(aquos-tv[\w ]+)\)/i // Sharp
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SHARP
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(bravia[\w ]+)( bui|\))/i // Sony
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(mitv-\w{5}) bui/i // Xiaomi
            ],
            [
                MODEL,
                [
                    VENDOR,
                    XIAOMI
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /Hbbtv.*(technisat) (.*);/i // TechniSAT
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i // HbbTV devices
            ],
            [
                [
                    VENDOR,
                    trim
                ],
                [
                    MODEL,
                    trim
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i // SmartTV from Unidentified Vendors
            ],
            [
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                ///////////////////
                // CONSOLES
                ///////////////////
                /(ouya)/i,
                /(nintendo) ([wids3utch]+)/i // Nintendo
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                /droid.+; (shield) bui/i // Nvidia
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Nvidia"
                ],
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                /(playstation [345portablevi]+)/i // Playstation
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                /\b(xbox(?: one)?(?!; xbox))[\); ]/i // Microsoft Xbox
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MICROSOFT
                ],
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                ///////////////////
                // WEARABLES
                ///////////////////
                /((pebble))app/i // Pebble
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i // Apple Watch
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /droid.+; (glass) \d/i // Google Glass
            ],
            [
                MODEL,
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /droid.+; (wt63?0{2,3})\)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ZEBRA
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /(quest( \d| pro)?)/i // Oculus Quest
            ],
            [
                MODEL,
                [
                    VENDOR,
                    FACEBOOK
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                ///////////////////
                // EMBEDDED
                ///////////////////
                /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i // Tesla
            ],
            [
                VENDOR,
                [
                    TYPE,
                    EMBEDDED
                ]
            ],
            [
                /(aeobc)\b/i // Echo Dot
            ],
            [
                MODEL,
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    EMBEDDED
                ]
            ],
            [
                ////////////////////
                // MIXED (GENERIC)
                ///////////////////
                /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i // Android Phones from Unidentified Vendors
            ],
            [
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i // Android Tablets from Unidentified Vendors
            ],
            [
                MODEL,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i // Unidentifiable Tablet
            ],
            [
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i // Unidentifiable Mobile
            ],
            [
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(android[-\w\. ]{0,9});.+buil/i // Generic Android Device
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Generic"
                ]
            ]
        ],
        engine: [
            [
                /windows.+ edge\/([\w\.]+)/i // EdgeHTML
            ],
            [
                VERSION,
                [
                    NAME,
                    EDGE + "HTML"
                ]
            ],
            [
                /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i // Blink
            ],
            [
                VERSION,
                [
                    NAME,
                    "Blink"
                ]
            ],
            [
                /(presto)\/([\w\.]+)/i,
                /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                /ekioh(flow)\/([\w\.]+)/i,
                /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                /(icab)[\/ ]([23]\.[\d\.]+)/i,
                /\b(libweb)/i
            ],
            [
                NAME,
                VERSION
            ],
            [
                /rv\:([\w\.]{1,9})\b.+(gecko)/i // Gecko
            ],
            [
                VERSION,
                NAME
            ]
        ],
        os: [
            [
                // Windows
                /microsoft (windows) (vista|xp)/i // Windows (iTunes)
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i // Windows Phone
            ],
            [
                NAME,
                [
                    VERSION,
                    strMapper,
                    windowsVersionMap
                ]
            ],
            [
                /windows nt 6\.2; (arm)/i,
                /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ],
            [
                [
                    VERSION,
                    strMapper,
                    windowsVersionMap
                ],
                [
                    NAME,
                    "Windows"
                ]
            ],
            [
                // iOS/macOS
                /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
                /cfnetwork\/.+darwin/i
            ],
            [
                [
                    VERSION,
                    /_/g,
                    "."
                ],
                [
                    NAME,
                    "iOS"
                ]
            ],
            [
                /(mac os x) ?([\w\. ]*)/i,
                /(macintosh|mac_powerpc\b)(?!.+haiku)/i // Mac OS
            ],
            [
                [
                    NAME,
                    MAC_OS
                ],
                [
                    VERSION,
                    /_/g,
                    "."
                ]
            ],
            [
                // Mobile OSes
                /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i // Android-x86/HarmonyOS
            ],
            [
                VERSION,
                NAME
            ],
            [
                /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                /(blackberry)\w*\/([\w\.]*)/i,
                /(tizen|kaios)[\/ ]([\w\.]+)/i,
                /\((series40);/i // Series 40
            ],
            [
                NAME,
                VERSION
            ],
            [
                /\(bb(10);/i // BlackBerry 10
            ],
            [
                VERSION,
                [
                    NAME,
                    BLACKBERRY
                ]
            ],
            [
                /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i // Symbian
            ],
            [
                VERSION,
                [
                    NAME,
                    "Symbian"
                ]
            ],
            [
                /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX + " OS"
                ]
            ],
            [
                /web0s;.+rt(tv)/i,
                /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i // WebOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "webOS"
                ]
            ],
            [
                /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i // watchOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "watchOS"
                ]
            ],
            [
                // Google Chromecast
                /crkey\/([\d\.]+)/i // Google Chromecast
            ],
            [
                VERSION,
                [
                    NAME,
                    CHROME + "cast"
                ]
            ],
            [
                /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i // Chromium OS
            ],
            [
                [
                    NAME,
                    CHROMIUM_OS
                ],
                VERSION
            ],
            [
                // Smart TVs
                /panasonic;(viera)/i,
                /(netrange)mmh/i,
                /(nettv)\/(\d+\.[\w\.]+)/i,
                // Console
                /(nintendo|playstation) ([wids345portablevuch]+)/i,
                /(xbox); +xbox ([^\);]+)/i,
                // Other
                /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                /(mint)[\/\(\) ]?(\w*)/i,
                /(mageia|vectorlinux)[; ]/i,
                /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
                /(hurd|linux) ?([\w\.]*)/i,
                /(gnu) ?([\w\.]*)/i,
                /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                /(haiku) (\w+)/i // Haiku
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(sunos) ?([\w\.\d]*)/i // Solaris
            ],
            [
                [
                    NAME,
                    "Solaris"
                ],
                VERSION
            ],
            [
                /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                /(unix) ?([\w\.]*)/i // UNIX
            ],
            [
                NAME,
                VERSION
            ]
        ]
    };
    /////////////////
    // Constructor
    ////////////////
    var UAParser = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined;
        }
        if (!(this instanceof UAParser)) return new UAParser(ua, extensions).getResult();
        var _navigator = typeof window1 !== UNDEF_TYPE && window1.navigator ? window1.navigator : undefined;
        var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
        var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;
        this.getBrowser = function() {
            var _browser = {};
            _browser[NAME] = undefined;
            _browser[VERSION] = undefined;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser[MAJOR] = majorize(_browser[VERSION]);
            // Brave-specific detection
            if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) _browser[NAME] = "Brave";
            return _browser;
        };
        this.getCPU = function() {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
        };
        this.getDevice = function() {
            var _device = {};
            _device[VENDOR] = undefined;
            _device[MODEL] = undefined;
            _device[TYPE] = undefined;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) _device[TYPE] = MOBILE;
            // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
            if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
                _device[MODEL] = "iPad";
                _device[TYPE] = TABLET;
            }
            return _device;
        };
        this.getEngine = function() {
            var _engine = {};
            _engine[NAME] = undefined;
            _engine[VERSION] = undefined;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
        };
        this.getOS = function() {
            var _os = {};
            _os[NAME] = undefined;
            _os[VERSION] = undefined;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            if (_isSelfNav && !_os[NAME] && _uach && _uach.platform && _uach.platform != "Unknown") _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS); // backward compatibility
            return _os;
        };
        this.getResult = function() {
            return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU()
            };
        };
        this.getUA = function() {
            return _ua;
        };
        this.setUA = function(ua) {
            _ua = typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
        };
        this.setUA(_ua);
        return this;
    };
    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = enumerize([
        NAME,
        VERSION,
        MAJOR
    ]);
    UAParser.CPU = enumerize([
        ARCHITECTURE
    ]);
    UAParser.DEVICE = enumerize([
        MODEL,
        VENDOR,
        TYPE,
        CONSOLE,
        MOBILE,
        SMARTTV,
        TABLET,
        WEARABLE,
        EMBEDDED
    ]);
    UAParser.ENGINE = UAParser.OS = enumerize([
        NAME,
        VERSION
    ]);
    ///////////
    // Export
    //////////
    // check js environment
    if (typeof exports !== UNDEF_TYPE) {
        // nodejs env
        if ("object" !== UNDEF_TYPE && module.exports) exports = module.exports = UAParser;
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (typeof define === FUNC_TYPE && define.amd) define(function() {
            return UAParser;
        });
        else if (typeof window1 !== UNDEF_TYPE) // browser env
        window1.UAParser = UAParser;
    }
    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = typeof window1 !== UNDEF_TYPE && (window1.jQuery || window1.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
            return parser.getUA();
        };
        $.ua.set = function(ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for(var prop in result)$.ua[prop] = result[prop];
        };
    }
})(typeof window === "object" ? window : this);

});


parcelRegister("3ULWd", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.mergeResources = $2d9bc987e10faead$var$mergeResources;

var $kawsV = parcelRequire("kawsV");
/* Takes an array of resources and merges into one mega-resource */ function $2d9bc987e10faead$var$mergeResources(resources) {
    let mergedResources = $2d9bc987e10faead$var$validateResource(resources[0]);
    for(let i = 1; i < resources.length; i++){
        if (!resources[i]) continue;
        const resource = $2d9bc987e10faead$var$validateResource(resources[i]);
        mergedResources = mergedResources.merge(resource);
    }
    return mergedResources;
}
function $2d9bc987e10faead$var$validateResource(resource) {
    if (resource instanceof $kawsV.Resource) return resource;
    if (resource) return new $kawsV.Resource(resource);
    return new $kawsV.Resource({});
}

});

parcelRegister("3Mtl8", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.configureDebug = $2c0c9d1628c214f2$var$configureDebug;
parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
var $cOtp4 = parcelRequire("cOtp4");
var $46NDq = parcelRequire("46NDq");

var $4VF80 = parcelRequire("4VF80");

var $fcSAX = parcelRequire("fcSAX");
/**
 * Configures the Honeycomb Web SDK to log debug information to the console.
 * Enables the DiagConsoleLogger and sets the log level to DEBUG.
 * Logs the provided Honeycomb options to the console, as well as defaults.
 *
 * @param options the provided Honeycomb options
 */ function $2c0c9d1628c214f2$var$configureDebug(options) {
    if (!(options === null || options === void 0 ? void 0 : options.debug)) return;
    $ljza4.diag.setLogger(new $cOtp4.DiagConsoleLogger(), $46NDq.DiagLogLevel.DEBUG);
    $ljza4.diag.debug((0, $4VF80.createHoneycombSDKLogMessage)("\uD83D\uDC1D Honeycomb Web SDK Debug Mode Enabled \uD83D\uDC1D"));
    // traces endpoint must be computed from provided options
    const tracesEndpoint = (0, $4VF80.getTracesEndpoint)(options);
    const currentOptions = Object.assign(Object.assign(Object.assign({}, $4VF80.defaultOptions), options), {
        tracesEndpoint: tracesEndpoint
    });
    $2c0c9d1628c214f2$var$debugTracesApiKey(currentOptions);
    $2c0c9d1628c214f2$var$debugServiceName(currentOptions);
    $2c0c9d1628c214f2$var$debugTracesEndpoint(currentOptions);
    $2c0c9d1628c214f2$var$debugSampleRate(currentOptions);
}
function $2c0c9d1628c214f2$var$debugTracesApiKey(options) {
    const tracesApiKey = (0, $4VF80.getTracesApiKey)(options) || "";
    if (!tracesApiKey) {
        $ljza4.diag.debug($fcSAX.MISSING_API_KEY_ERROR);
        return;
    }
    $ljza4.diag.debug((0, $4VF80.createHoneycombSDKLogMessage)(`API Key configured for traces: '${tracesApiKey}'`));
}
function $2c0c9d1628c214f2$var$debugServiceName(options) {
    const serviceName = options.serviceName || $4VF80.defaultOptions.serviceName;
    if (serviceName === $4VF80.defaultOptions.serviceName) {
        $ljza4.diag.debug($fcSAX.MISSING_SERVICE_NAME_ERROR);
        return;
    }
    $ljza4.diag.debug(`@honeycombio/opentelemetry-web: Service Name configured for traces: '${serviceName}'`);
}
function $2c0c9d1628c214f2$var$debugTracesEndpoint(options) {
    const tracesEndpoint = (0, $4VF80.getTracesEndpoint)(options);
    if (!tracesEndpoint) {
        $ljza4.diag.debug((0, $4VF80.createHoneycombSDKLogMessage)("No endpoint configured for traces"));
        return;
    }
    $ljza4.diag.debug((0, $4VF80.createHoneycombSDKLogMessage)(`Endpoint configured for traces: '${tracesEndpoint}'`));
}
function $2c0c9d1628c214f2$var$debugSampleRate(options) {
    const sampleRate = (0, $4VF80.getSampleRate)(options);
    if (!sampleRate) {
        // this should never happen, but guard just in case?
        $ljza4.diag.debug("No sampler configured for traces");
        return;
    }
    $ljza4.diag.debug((0, $4VF80.createHoneycombSDKLogMessage)(`Sample Rate configured for traces: '${sampleRate}'`));
}

});
parcelRegister("4VF80", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getSampleRate = module.exports.getTracesApiKey = module.exports.getTracesEndpoint = module.exports.createHoneycombSDKLogMessage = module.exports.defaultOptions = module.exports.DEFAULT_SAMPLE_RATE = module.exports.DEFAULT_SERVICE_NAME = module.exports.DEFAULT_TRACES_ENDPOINT = module.exports.TRACES_PATH = module.exports.DEFAULT_API_ENDPOINT = void 0;
module.exports.isClassic = $396c637bbce82f37$var$isClassic;
module.exports.maybeAppendTracesPath = $396c637bbce82f37$var$maybeAppendTracesPath;
// Constants
module.exports.DEFAULT_API_ENDPOINT = "https://api.honeycomb.io";
module.exports.TRACES_PATH = "v1/traces";
module.exports.DEFAULT_TRACES_ENDPOINT = `${module.exports.DEFAULT_API_ENDPOINT}/${module.exports.TRACES_PATH}`;
module.exports.DEFAULT_SERVICE_NAME = "unknown_service";
module.exports.DEFAULT_SAMPLE_RATE = 1;
/**
 * Default options for the Honeycomb Web SDK.
 */ module.exports.defaultOptions = {
    apiKey: "",
    tracesApiKey: "",
    endpoint: module.exports.DEFAULT_TRACES_ENDPOINT,
    tracesEndpoint: module.exports.DEFAULT_TRACES_ENDPOINT,
    serviceName: module.exports.DEFAULT_SERVICE_NAME,
    debug: false,
    sampleRate: 1,
    skipOptionsValidation: false,
    localVisualizations: false,
    webVitalsInstrumentationConfig: {
        enabled: true
    }
};
const $396c637bbce82f37$var$createHoneycombSDKLogMessage = (message)=>`@honeycombio/opentelemetry-web: ${message}`;
module.exports.createHoneycombSDKLogMessage = $396c637bbce82f37$var$createHoneycombSDKLogMessage;
const $396c637bbce82f37$var$classicKeyRegex = /^[a-f0-9]*$/;
const $396c637bbce82f37$var$ingestClassicKeyRegex = /^hc[a-z]ic_[a-z0-9]*$/;
/**
 * Determines whether the passed in apikey is classic or not.
 *
 * @param apikey the apikey
 * @returns a boolean to indicate if the apikey was a classic key
 */ function $396c637bbce82f37$var$isClassic(apikey) {
    if (apikey == null || apikey.length === 0) return false;
    else if (apikey.length === 32) return $396c637bbce82f37$var$classicKeyRegex.test(apikey);
    else if (apikey.length === 64) return $396c637bbce82f37$var$ingestClassicKeyRegex.test(apikey);
    return false;
}
/**
 * Checks for and appends v1/traces to provided URL if missing when using an HTTP
 * based exporter protocol.
 *
 * @param url the base URL to append traces path to if missing
 * @returns the endpoint with traces path appended if missing
 */ function $396c637bbce82f37$var$maybeAppendTracesPath(url) {
    if (url.endsWith(module.exports.TRACES_PATH) || url.endsWith(`${module.exports.TRACES_PATH}/`)) return url;
    return url.endsWith("/") ? url + module.exports.TRACES_PATH : url + "/" + module.exports.TRACES_PATH;
}
const $396c637bbce82f37$var$getTracesEndpoint = (options)=>{
    // use `tracesEndpoint` option unchanged if provided
    if (options === null || options === void 0 ? void 0 : options.tracesEndpoint) return options.tracesEndpoint;
    // use `endpoint` option if provided and append '/v1/traces' if not already appended
    if (options === null || options === void 0 ? void 0 : options.endpoint) return $396c637bbce82f37$var$maybeAppendTracesPath(options.endpoint);
    return module.exports.DEFAULT_TRACES_ENDPOINT;
};
module.exports.getTracesEndpoint = $396c637bbce82f37$var$getTracesEndpoint;
const $396c637bbce82f37$var$getTracesApiKey = (options)=>{
    return (options === null || options === void 0 ? void 0 : options.tracesApiKey) || (options === null || options === void 0 ? void 0 : options.apiKey);
};
module.exports.getTracesApiKey = $396c637bbce82f37$var$getTracesApiKey;
const $396c637bbce82f37$var$getSampleRate = (options)=>{
    if (// must be a whole positive integer
    typeof (options === null || options === void 0 ? void 0 : options.sampleRate) === "number" && Number.isSafeInteger(options === null || options === void 0 ? void 0 : options.sampleRate) && (options === null || options === void 0 ? void 0 : options.sampleRate) >= 0) return options === null || options === void 0 ? void 0 : options.sampleRate;
    return module.exports.DEFAULT_SAMPLE_RATE;
};
module.exports.getSampleRate = $396c637bbce82f37$var$getSampleRate;

});

parcelRegister("fcSAX", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.validateOptionsWarnings = module.exports.FAILED_AUTH_FOR_LOCAL_VISUALIZATIONS = module.exports.MISSING_FIELDS_FOR_LOCAL_VISUALIZATIONS = module.exports.SAMPLER_OVERRIDE_WARNING = module.exports.SKIPPING_OPTIONS_VALIDATION_MSG = module.exports.MISSING_DATASET_ERROR = module.exports.IGNORED_DATASET_ERROR = module.exports.MISSING_SERVICE_NAME_ERROR = module.exports.MISSING_API_KEY_ERROR = void 0;

var $4VF80 = parcelRequire("4VF80");
module.exports.MISSING_API_KEY_ERROR = (0, $4VF80.createHoneycombSDKLogMessage)("\u274C Missing API Key. Set `apiKey` in HoneycombOptions. Telemetry will not be exported.");
module.exports.MISSING_SERVICE_NAME_ERROR = (0, $4VF80.createHoneycombSDKLogMessage)(`\u{274C} Missing Service Name. Set \`serviceName\` in HoneycombOptions. Defaulting to '${$4VF80.defaultOptions.serviceName}'`);
module.exports.IGNORED_DATASET_ERROR = (0, $4VF80.createHoneycombSDKLogMessage)("\uD83D\uDD15 Dataset is ignored in favor of service name.");
module.exports.MISSING_DATASET_ERROR = (0, $4VF80.createHoneycombSDKLogMessage)("\u274C Missing dataset. Specify either HONEYCOMB_DATASET environment variable or dataset in the options parameter.");
module.exports.SKIPPING_OPTIONS_VALIDATION_MSG = (0, $4VF80.createHoneycombSDKLogMessage)("\u23ED\uFE0F Skipping options validation. To re-enable, set skipOptionsValidation option or HONEYCOMB_SKIP_OPTIONS_VALIDATION to false.");
module.exports.SAMPLER_OVERRIDE_WARNING = (0, $4VF80.createHoneycombSDKLogMessage)("\uD83D\uDD28 Default deterministic sampler has been overridden. Honeycomb requires a resource attribute called SampleRate to properly show weighted values. Non-deterministic sampleRate could lead to missing spans in Honeycomb. See our docs for more details. https://docs.honeycomb.io/getting-data-in/opentelemetry/node-distro/#sampling-without-the-honeycomb-sdk");
module.exports.MISSING_FIELDS_FOR_LOCAL_VISUALIZATIONS = (0, $4VF80.createHoneycombSDKLogMessage)("\uD83D\uDD15 Disabling local visualizations - must have both service name and API key configured.");
module.exports.FAILED_AUTH_FOR_LOCAL_VISUALIZATIONS = (0, $4VF80.createHoneycombSDKLogMessage)("\uD83D\uDD15 Failed to get proper auth response from Honeycomb. No local visualization available.");
const $b1225376f44a7b7f$var$validateOptionsWarnings = (options)=>{
    if (options === null || options === void 0 ? void 0 : options.skipOptionsValidation) {
        console.debug(module.exports.SKIPPING_OPTIONS_VALIDATION_MSG);
        return;
    }
    // warn if api key is missing
    if (!(options === null || options === void 0 ? void 0 : options.apiKey)) console.warn(module.exports.MISSING_API_KEY_ERROR);
    // warn if service name is missing
    if (!(options === null || options === void 0 ? void 0 : options.serviceName)) console.warn(module.exports.MISSING_SERVICE_NAME_ERROR);
    // warn if dataset is set while using an environment-aware key
    if ((options === null || options === void 0 ? void 0 : options.apiKey) && !(0, $4VF80.isClassic)(options === null || options === void 0 ? void 0 : options.apiKey) && (options === null || options === void 0 ? void 0 : options.dataset)) console.warn(module.exports.IGNORED_DATASET_ERROR);
    // warn if dataset is missing if using classic key
    if ((options === null || options === void 0 ? void 0 : options.apiKey) && (0, $4VF80.isClassic)(options === null || options === void 0 ? void 0 : options.apiKey) && !(options === null || options === void 0 ? void 0 : options.dataset)) console.warn(module.exports.MISSING_DATASET_ERROR);
    // warn if custom sampler provided
    if (options === null || options === void 0 ? void 0 : options.sampler) console.debug(module.exports.SAMPLER_OVERRIDE_WARNING);
    return options;
};
module.exports.validateOptionsWarnings = $b1225376f44a7b7f$var$validateOptionsWarnings;

});


parcelRegister("8SJjW", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.CompositeSpanProcessor = module.exports.configureSpanProcessors = void 0;

var $8TAWZ = parcelRequire("8TAWZ");

var $hMZez = parcelRequire("hMZez");

var $39bMr = parcelRequire("39bMr");

var $6AbMX = parcelRequire("6AbMX");

var $6cXBs = parcelRequire("6cXBs");

var $fE3mf = parcelRequire("fE3mf");
/**
 * Builds and returns Span Processor that combines the BatchSpanProcessor, BrowserSpanProcessor,
 * BaggageSpanProcessor, and optionally a user provided Span Processor.
 * @param options The {@link HoneycombOptions}
 * @returns a {@link CompositeSpanProcessor}
 */ const $6776859a6ea98899$var$configureSpanProcessors = (options)=>{
    const honeycombSpanProcessor = new $6776859a6ea98899$var$CompositeSpanProcessor();
    const honeycombTraceExporters = [];
    if (options === null || options === void 0 ? void 0 : options.localVisualizations) honeycombTraceExporters.push((0, $fE3mf.configureConsoleTraceLinkExporter)(options));
    // if there is a user-provided exporter, add to the composite exporter
    if (options === null || options === void 0 ? void 0 : options.traceExporter) honeycombTraceExporters.push(options === null || options === void 0 ? void 0 : options.traceExporter);
    // We have to configure the exporter here because the way the base SDK is setup
    // does not allow having both a `spanProcessor` and `traceExporter` configured.
    honeycombSpanProcessor.addProcessor(new $39bMr.BatchSpanProcessor((0, $6cXBs.configureCompositeExporter)([
        (0, $6AbMX.configureHoneycombHttpJsonTraceExporter)(options),
        ...honeycombTraceExporters
    ])));
    // we always want to add the baggage span processor
    honeycombSpanProcessor.addProcessor(new $8TAWZ.BaggageSpanProcessor());
    // we always want to add the browser attrs span processor
    honeycombSpanProcessor.addProcessor(new $hMZez.BrowserAttributesSpanProcessor());
    // if there is a user provided span processor, add it to the composite span processor
    if (options === null || options === void 0 ? void 0 : options.spanProcessor) honeycombSpanProcessor.addProcessor(options === null || options === void 0 ? void 0 : options.spanProcessor);
    return honeycombSpanProcessor;
};
module.exports.configureSpanProcessors = $6776859a6ea98899$var$configureSpanProcessors;
/**
 * A {@link SpanProcessor} that combines multiple span processors into a single
 * span processor that can be passed into the SDKs `spanProcessor` option.
 */ class $6776859a6ea98899$var$CompositeSpanProcessor {
    constructor(){
        this.spanProcessors = [];
    }
    addProcessor(processor) {
        this.spanProcessors.push(processor);
    }
    getSpanProcessors() {
        return this.spanProcessors;
    }
    onStart(span, parentContext) {
        this.spanProcessors.forEach((processor)=>{
            processor.onStart(span, parentContext);
        });
    }
    onEnd(span) {
        this.spanProcessors.forEach((processor)=>{
            processor.onEnd(span);
        });
    }
    forceFlush() {
        return Promise.all(this.spanProcessors.map((processor)=>processor.forceFlush())).then(()=>{});
    }
    shutdown() {
        return Promise.all(this.spanProcessors.map((processor)=>processor.forceFlush())).then(()=>{});
    }
}
module.exports.CompositeSpanProcessor = $6776859a6ea98899$var$CompositeSpanProcessor;

});
parcelRegister("8TAWZ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.BaggageSpanProcessor = void 0;
parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
var $4tmHU = parcelRequire("4tmHU");
/**
 * A {@link SpanProcessor} that reads entries stored in {@link Baggage}
 * from the parent context and adds the baggage entries' keys and values
 * to the span as attributes on span start.
 *
 * Keys and values added to Baggage will appear on subsequent child
 * spans for a trace within this service *and* be propagated to external
 * services in accordance with any configured propagation formats
 * configured. If the external services also have a Baggage span
 * processor, the keys and values will appear in those child spans as
 * well.
 *
 * ⚠ Warning ⚠️
 *
 * Do not put sensitive information in Baggage.
 *
 * To repeat: a consequence of adding data to Baggage is that the keys and
 * values will appear in all outgoing HTTP headers from the application.
 */ class $67a01f5a6c62f725$var$BaggageSpanProcessor {
    constructor(){}
    onStart(span, parentContext) {
        var _a, _b;
        ((_b = (_a = $4tmHU.propagation.getBaggage(parentContext)) === null || _a === void 0 ? void 0 : _a.getAllEntries()) !== null && _b !== void 0 ? _b : []).forEach((entry)=>{
            span.setAttribute(entry[0], entry[1].value);
            $ljza4.diag.debug(`@honeycombio/opentelemetry-web: \u{1F6A8} Baggage in all outgoing headers: ${entry[0]}=${entry[1].value} `);
        });
    }
    onEnd() {}
    forceFlush() {
        return Promise.resolve();
    }
    shutdown() {
        return Promise.resolve();
    }
}
module.exports.BaggageSpanProcessor = $67a01f5a6c62f725$var$BaggageSpanProcessor;

});

parcelRegister("hMZez", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.BrowserAttributesSpanProcessor = void 0;
/**
 * A {@link SpanProcessor} that adds browser specific attributes to each span
 * that might change over the course of a session.
 * Static attributes (e.g. User Agent) are added to the Resource.
 */ class $cf366b2d57671c38$var$BrowserAttributesSpanProcessor {
    constructor(){}
    onStart(span) {
        const { href: href, pathname: pathname, search: search, hash: hash, hostname: hostname } = window.location;
        span.setAttributes({
            "browser.width": window.innerWidth,
            "browser.height": window.innerHeight,
            "page.hash": hash,
            "page.url": href,
            "page.route": pathname,
            "page.hostname": hostname,
            "page.search": search,
            "url.path": pathname
        });
    }
    onEnd() {}
    forceFlush() {
        return Promise.resolve();
    }
    shutdown() {
        return Promise.resolve();
    }
}
module.exports.BrowserAttributesSpanProcessor = $cf366b2d57671c38$var$BrowserAttributesSpanProcessor;

});

parcelRegister("6AbMX", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.DATASET_HEADER_KEY = module.exports.TEAM_HEADER_KEY = void 0;
module.exports.configureHoneycombHttpJsonTraceExporter = $4caf3fdfa1c33246$var$configureHoneycombHttpJsonTraceExporter;

var $kw1YN = parcelRequire("kw1YN");

var $4VF80 = parcelRequire("4VF80");
module.exports.TEAM_HEADER_KEY = "x-honeycomb-team";
module.exports.DATASET_HEADER_KEY = "x-honeycomb-dataset";
/**
 * Builds and returns an OTLP Traces exporter that sends data over http/json
 * @param options The {@link HoneycombOptions} used to configure the exporter
 * @returns a {@link SpanExporter} configured to send telemetry to Honeycomb over http/json
 */ function $4caf3fdfa1c33246$var$configureHoneycombHttpJsonTraceExporter(options) {
    const apiKey = (0, $4VF80.getTracesApiKey)(options);
    return new $kw1YN.OTLPTraceExporter({
        url: (0, $4VF80.getTracesEndpoint)(options),
        headers: Object.assign({
            [module.exports.TEAM_HEADER_KEY]: apiKey,
            [module.exports.DATASET_HEADER_KEY]: (0, $4VF80.isClassic)(apiKey) ? options === null || options === void 0 ? void 0 : options.dataset : undefined
        }, options === null || options === void 0 ? void 0 : options.headers)
    });
}

});
parcelRegister("kw1YN", function(module, exports) {

$parcel$export(module.exports, "OTLPTraceExporter", () => $eef854ea05b36022$export$f73dc942b4b27de3);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $e4cTs = parcelRequire("e4cTs");
var $3M0CS = parcelRequire("3M0CS");

var $5QpNP = parcelRequire("5QpNP");
var $44Bg1 = parcelRequire("44Bg1");

var $atpLe = parcelRequire("atpLe");
var $eef854ea05b36022$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $eef854ea05b36022$var$DEFAULT_COLLECTOR_RESOURCE_PATH = "v1/traces";
var $eef854ea05b36022$var$DEFAULT_COLLECTOR_URL = "http://localhost:4318/" + $eef854ea05b36022$var$DEFAULT_COLLECTOR_RESOURCE_PATH;
/**
 * Collector Trace Exporter for Web
 */ var $eef854ea05b36022$export$f73dc942b4b27de3 = /** @class */ function(_super) {
    $eef854ea05b36022$var$__extends(OTLPTraceExporter, _super);
    function OTLPTraceExporter(config) {
        if (config === void 0) config = {};
        var _this = _super.call(this, config, (0, $atpLe.JsonTraceSerializer), "application/json") || this;
        _this._headers = Object.assign(_this._headers, (0, $e4cTs).parseKeyPairsIntoRecord((0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_TRACES_HEADERS));
        return _this;
    }
    OTLPTraceExporter.prototype.getDefaultUrl = function(config) {
        return typeof config.url === "string" ? config.url : (0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT.length > 0 ? (0, $5QpNP.appendRootPathToUrlIfNeeded)((0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) : (0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0 ? (0, $5QpNP.appendResourcePathToUrl)((0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT, $eef854ea05b36022$var$DEFAULT_COLLECTOR_RESOURCE_PATH) : $eef854ea05b36022$var$DEFAULT_COLLECTOR_URL;
    };
    return OTLPTraceExporter;
}((0, $44Bg1.OTLPExporterBrowserBase));

});
parcelRegister("5QpNP", function(module, exports) {

$parcel$export(module.exports, "DEFAULT_EXPORT_MAX_ATTEMPTS", () => $4415d2f436518b48$export$437cb26a1d99f35f);
$parcel$export(module.exports, "DEFAULT_EXPORT_INITIAL_BACKOFF", () => $4415d2f436518b48$export$8234d6fdc73f98ad);
$parcel$export(module.exports, "DEFAULT_EXPORT_MAX_BACKOFF", () => $4415d2f436518b48$export$13ad5a7ba71c0e0e);
$parcel$export(module.exports, "DEFAULT_EXPORT_BACKOFF_MULTIPLIER", () => $4415d2f436518b48$export$7a6064683182b48c);
$parcel$export(module.exports, "parseHeaders", () => $4415d2f436518b48$export$eea2c1c5e1a37e50);
$parcel$export(module.exports, "appendResourcePathToUrl", () => $4415d2f436518b48$export$cf96c940bd801f14);
$parcel$export(module.exports, "appendRootPathToUrlIfNeeded", () => $4415d2f436518b48$export$744a53bd000073f5);
$parcel$export(module.exports, "configureExporterTimeout", () => $4415d2f436518b48$export$d05637f28599e6ce);
$parcel$export(module.exports, "isExportRetryable", () => $4415d2f436518b48$export$bc409a649b31360b);
$parcel$export(module.exports, "parseRetryAfterToMills", () => $4415d2f436518b48$export$4e009558974ad065);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $3M0CS = parcelRequire("3M0CS");
var $4415d2f436518b48$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $4415d2f436518b48$var$DEFAULT_TRACE_TIMEOUT = 10000;
var $4415d2f436518b48$export$437cb26a1d99f35f = 5;
var $4415d2f436518b48$export$8234d6fdc73f98ad = 1000;
var $4415d2f436518b48$export$13ad5a7ba71c0e0e = 5000;
var $4415d2f436518b48$export$7a6064683182b48c = 1.5;
function $4415d2f436518b48$export$eea2c1c5e1a37e50(partialHeaders) {
    if (partialHeaders === void 0) partialHeaders = {};
    var headers = {};
    Object.entries(partialHeaders).forEach(function(_a) {
        var _b = $4415d2f436518b48$var$__read(_a, 2), key = _b[0], value = _b[1];
        if (typeof value !== "undefined") headers[key] = String(value);
        else (0, $ljza4.diag).warn('Header "' + key + '" has invalid value (' + value + ") and will be ignored");
    });
    return headers;
}
function $4415d2f436518b48$export$cf96c940bd801f14(url, path) {
    if (!url.endsWith("/")) url = url + "/";
    return url + path;
}
function $4415d2f436518b48$export$744a53bd000073f5(url) {
    try {
        var parsedUrl = new URL(url);
        if (parsedUrl.pathname === "") parsedUrl.pathname = parsedUrl.pathname + "/";
        return parsedUrl.toString();
    } catch (_a) {
        (0, $ljza4.diag).warn("Could not parse export URL: '" + url + "'");
        return url;
    }
}
function $4415d2f436518b48$export$d05637f28599e6ce(timeoutMillis) {
    if (typeof timeoutMillis === "number") {
        if (timeoutMillis <= 0) // OTLP exporter configured timeout - using default value of 10000ms
        return $4415d2f436518b48$export$ed1c73add0a74dba(timeoutMillis, $4415d2f436518b48$var$DEFAULT_TRACE_TIMEOUT);
        return timeoutMillis;
    } else return $4415d2f436518b48$var$getExporterTimeoutFromEnv();
}
function $4415d2f436518b48$var$getExporterTimeoutFromEnv() {
    var _a;
    var definedTimeout = Number((_a = (0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null && _a !== void 0 ? _a : (0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_TIMEOUT);
    if (definedTimeout <= 0) // OTLP exporter configured timeout - using default value of 10000ms
    return $4415d2f436518b48$export$ed1c73add0a74dba(definedTimeout, $4415d2f436518b48$var$DEFAULT_TRACE_TIMEOUT);
    else return definedTimeout;
}
function $4415d2f436518b48$export$ed1c73add0a74dba(timeout, defaultTimeout) {
    (0, $ljza4.diag).warn("Timeout must be greater than 0", timeout);
    return defaultTimeout;
}
function $4415d2f436518b48$export$bc409a649b31360b(statusCode) {
    var retryCodes = [
        429,
        502,
        503,
        504
    ];
    return retryCodes.includes(statusCode);
}
function $4415d2f436518b48$export$4e009558974ad065(retryAfter) {
    if (retryAfter == null) return -1;
    var seconds = Number.parseInt(retryAfter, 10);
    if (Number.isInteger(seconds)) return seconds > 0 ? seconds * 1000 : -1;
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After#directives
    var delay = new Date(retryAfter).getTime() - Date.now();
    if (delay >= 0) return delay;
    return 0;
}

});

parcelRegister("44Bg1", function(module, exports) {

$parcel$export(module.exports, "OTLPExporterBrowserBase", () => $2f746fb1ccf1ffd6$export$d0874567cb949b29);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $3oozw = parcelRequire("3oozw");

var $5QpNP = parcelRequire("5QpNP");

var $5qvDL = parcelRequire("5qvDL");
parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $e4cTs = parcelRequire("e4cTs");
var $3M0CS = parcelRequire("3M0CS");
var $2f746fb1ccf1ffd6$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $2f746fb1ccf1ffd6$var$__assign = undefined && undefined.__assign || function() {
    $2f746fb1ccf1ffd6$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $2f746fb1ccf1ffd6$var$__assign.apply(this, arguments);
};
/**
 * Collector Metric Exporter abstract base class
 */ var $2f746fb1ccf1ffd6$export$d0874567cb949b29 = /** @class */ function(_super) {
    $2f746fb1ccf1ffd6$var$__extends(OTLPExporterBrowserBase, _super);
    /**
     * @param config
     * @param serializer
     * @param contentType
     */ function OTLPExporterBrowserBase(config, serializer, contentType) {
        if (config === void 0) config = {};
        var _this = _super.call(this, config) || this;
        _this._useXHR = false;
        _this._serializer = serializer;
        _this._contentType = contentType;
        _this._useXHR = !!config.headers || typeof navigator.sendBeacon !== "function";
        if (_this._useXHR) _this._headers = Object.assign({}, (0, $5QpNP.parseHeaders)(config.headers), (0, $e4cTs).parseKeyPairsIntoRecord((0, $3M0CS.getEnv)().OTEL_EXPORTER_OTLP_HEADERS));
        else _this._headers = {};
        return _this;
    }
    OTLPExporterBrowserBase.prototype.onInit = function() {};
    OTLPExporterBrowserBase.prototype.onShutdown = function() {};
    OTLPExporterBrowserBase.prototype.send = function(items, onSuccess, onError) {
        var _this = this;
        var _a;
        if (this._shutdownOnce.isCalled) {
            (0, $ljza4.diag).debug("Shutdown already started. Cannot send objects");
            return;
        }
        var body = (_a = this._serializer.serializeRequest(items)) !== null && _a !== void 0 ? _a : new Uint8Array();
        var promise = new Promise(function(resolve, reject) {
            if (_this._useXHR) (0, $5qvDL.sendWithXhr)(body, _this.url, $2f746fb1ccf1ffd6$var$__assign($2f746fb1ccf1ffd6$var$__assign({}, _this._headers), {
                "Content-Type": _this._contentType
            }), _this.timeoutMillis, resolve, reject);
            else (0, $5qvDL.sendWithBeacon)(body, _this.url, {
                type: _this._contentType
            }, resolve, reject);
        }).then(onSuccess, onError);
        this._sendingPromises.push(promise);
        var popPromise = function() {
            var index = _this._sendingPromises.indexOf(promise);
            _this._sendingPromises.splice(index, 1);
        };
        promise.then(popPromise, popPromise);
    };
    return OTLPExporterBrowserBase;
}((0, $3oozw.OTLPExporterBase));

});
parcelRegister("3oozw", function(module, exports) {

$parcel$export(module.exports, "OTLPExporterBase", () => $2786ac7b645528cd$export$a756c21bf453f1b5);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $2cIHb = parcelRequire("2cIHb");
var $eLOET = parcelRequire("eLOET");

var $5QpNP = parcelRequire("5QpNP");
/**
 * Collector Exporter abstract base class
 */ var $2786ac7b645528cd$export$a756c21bf453f1b5 = /** @class */ function() {
    /**
     * @param config
     */ function OTLPExporterBase(config) {
        if (config === void 0) config = {};
        this._sendingPromises = [];
        this.url = this.getDefaultUrl(config);
        if (typeof config.hostname === "string") this.hostname = config.hostname;
        this.shutdown = this.shutdown.bind(this);
        this._shutdownOnce = new (0, $2cIHb.BindOnceFuture)(this._shutdown, this);
        this._concurrencyLimit = typeof config.concurrencyLimit === "number" ? config.concurrencyLimit : 30;
        this.timeoutMillis = (0, $5QpNP.configureExporterTimeout)(config.timeoutMillis);
        // platform dependent
        this.onInit(config);
    }
    /**
     * Export items.
     * @param items
     * @param resultCallback
     */ OTLPExporterBase.prototype.export = function(items, resultCallback) {
        if (this._shutdownOnce.isCalled) {
            resultCallback({
                code: (0, $eLOET.ExportResultCode).FAILED,
                error: new Error("Exporter has been shutdown")
            });
            return;
        }
        if (this._sendingPromises.length >= this._concurrencyLimit) {
            resultCallback({
                code: (0, $eLOET.ExportResultCode).FAILED,
                error: new Error("Concurrent export limit reached")
            });
            return;
        }
        this._export(items).then(function() {
            resultCallback({
                code: (0, $eLOET.ExportResultCode).SUCCESS
            });
        }).catch(function(error) {
            resultCallback({
                code: (0, $eLOET.ExportResultCode).FAILED,
                error: error
            });
        });
    };
    OTLPExporterBase.prototype._export = function(items) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            try {
                (0, $ljza4.diag).debug("items to be sent", items);
                _this.send(items, resolve, reject);
            } catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Shutdown the exporter.
     */ OTLPExporterBase.prototype.shutdown = function() {
        return this._shutdownOnce.call();
    };
    /**
     * Exports any pending spans in the exporter
     */ OTLPExporterBase.prototype.forceFlush = function() {
        return Promise.all(this._sendingPromises).then(function() {
        /** ignore resolved values */ });
    };
    /**
     * Called by _shutdownOnce with BindOnceFuture
     */ OTLPExporterBase.prototype._shutdown = function() {
        (0, $ljza4.diag).debug("shutdown started");
        this.onShutdown();
        return this.forceFlush();
    };
    return OTLPExporterBase;
}();

});

parcelRegister("5qvDL", function(module, exports) {

$parcel$export(module.exports, "sendWithBeacon", () => $3f37ec95dd0d9e7e$export$7b15ee654b029dd0);
$parcel$export(module.exports, "sendWithXhr", () => $3f37ec95dd0d9e7e$export$3025e92bca21971c);
parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");

var $2QZdR = parcelRequire("2QZdR");

var $5QpNP = parcelRequire("5QpNP");
var $3f37ec95dd0d9e7e$var$__assign = undefined && undefined.__assign || function() {
    $3f37ec95dd0d9e7e$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $3f37ec95dd0d9e7e$var$__assign.apply(this, arguments);
};
var $3f37ec95dd0d9e7e$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
function $3f37ec95dd0d9e7e$export$7b15ee654b029dd0(body, url, blobPropertyBag, onSuccess, onError) {
    if (navigator.sendBeacon(url, new Blob([
        body
    ], blobPropertyBag))) {
        (0, $ljza4.diag).debug("sendBeacon - can send", body);
        onSuccess();
    } else {
        var error = new (0, $2QZdR.OTLPExporterError)("sendBeacon - cannot send " + body);
        onError(error);
    }
}
function $3f37ec95dd0d9e7e$export$3025e92bca21971c(body, url, headers, exporterTimeout, onSuccess, onError) {
    var retryTimer;
    var xhr;
    var reqIsDestroyed = false;
    var exporterTimer = setTimeout(function() {
        clearTimeout(retryTimer);
        reqIsDestroyed = true;
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var err = new (0, $2QZdR.OTLPExporterError)("Request Timeout");
            onError(err);
        } else xhr.abort();
    }, exporterTimeout);
    var sendWithRetry = function(retries, minDelay) {
        if (retries === void 0) retries = (0, $5QpNP.DEFAULT_EXPORT_MAX_ATTEMPTS);
        if (minDelay === void 0) minDelay = (0, $5QpNP.DEFAULT_EXPORT_INITIAL_BACKOFF);
        xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        var defaultHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        Object.entries($3f37ec95dd0d9e7e$var$__assign($3f37ec95dd0d9e7e$var$__assign({}, defaultHeaders), headers)).forEach(function(_a) {
            var _b = $3f37ec95dd0d9e7e$var$__read(_a, 2), k = _b[0], v = _b[1];
            xhr.setRequestHeader(k, v);
        });
        xhr.send(body);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && reqIsDestroyed === false) {
                if (xhr.status >= 200 && xhr.status <= 299) {
                    (0, $ljza4.diag).debug("xhr success", body);
                    onSuccess();
                    clearTimeout(exporterTimer);
                    clearTimeout(retryTimer);
                } else if (xhr.status && (0, $5QpNP.isExportRetryable)(xhr.status) && retries > 0) {
                    var retryTime = void 0;
                    minDelay = (0, $5QpNP.DEFAULT_EXPORT_BACKOFF_MULTIPLIER) * minDelay;
                    // retry after interval specified in Retry-After header
                    if (xhr.getResponseHeader("Retry-After")) retryTime = (0, $5QpNP.parseRetryAfterToMills)(xhr.getResponseHeader("Retry-After"));
                    else // exponential backoff with jitter
                    retryTime = Math.round(Math.random() * ((0, $5QpNP.DEFAULT_EXPORT_MAX_BACKOFF) - minDelay) + minDelay);
                    retryTimer = setTimeout(function() {
                        sendWithRetry(retries - 1, minDelay);
                    }, retryTime);
                } else {
                    var error = new (0, $2QZdR.OTLPExporterError)("Failed to export with XHR (status: " + xhr.status + ")", xhr.status);
                    onError(error);
                    clearTimeout(exporterTimer);
                    clearTimeout(retryTimer);
                }
            }
        };
        xhr.onabort = function() {
            if (reqIsDestroyed) {
                var err = new (0, $2QZdR.OTLPExporterError)("Request Timeout");
                onError(err);
            }
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
        };
        xhr.onerror = function() {
            if (reqIsDestroyed) {
                var err = new (0, $2QZdR.OTLPExporterError)("Request Timeout");
                onError(err);
            }
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
        };
    };
    sendWithRetry();
}

});
parcelRegister("2QZdR", function(module, exports) {

$parcel$export(module.exports, "OTLPExporterError", () => $213feda327302c81$export$26c718c16cda30c6);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $213feda327302c81$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * Interface for handling error
 */ var $213feda327302c81$export$26c718c16cda30c6 = /** @class */ function(_super) {
    $213feda327302c81$var$__extends(OTLPExporterError, _super);
    function OTLPExporterError(message, code, data) {
        var _this = _super.call(this, message) || this;
        _this.name = "OTLPExporterError";
        _this.data = data;
        _this.code = code;
        return _this;
    }
    return OTLPExporterError;
}(Error);

});



parcelRegister("atpLe", function(module, exports) {

$parcel$export(module.exports, "JsonTraceSerializer", () => $7a00985a2e4e148c$export$dfba2b8376f2d3f5);

var $6BPFg = parcelRequire("6BPFg");

var $awurf = parcelRequire("awurf");

var $7OQIP = parcelRequire("7OQIP");
var $7a00985a2e4e148c$export$dfba2b8376f2d3f5 = {
    serializeRequest: function(arg) {
        var request = (0, $6BPFg.createExportTraceServiceRequest)(arg, {
            useHex: true,
            useLongBits: false
        });
        var encoder = new TextEncoder();
        return encoder.encode(JSON.stringify(request));
    },
    deserializeResponse: function(arg) {
        var decoder = new TextDecoder();
        return JSON.parse(decoder.decode(arg));
    }
};
var $7a00985a2e4e148c$export$101e77d9846ae2ef = {
    serializeRequest: function(arg) {
        var request = (0, $awurf.createExportMetricsServiceRequest)(arg, {
            useLongBits: false
        });
        var encoder = new TextEncoder();
        return encoder.encode(JSON.stringify(request));
    },
    deserializeResponse: function(arg) {
        var decoder = new TextDecoder();
        return JSON.parse(decoder.decode(arg));
    }
};
var $7a00985a2e4e148c$export$ee58b240ff91dc51 = {
    serializeRequest: function(arg) {
        var request = (0, $7OQIP.createExportLogsServiceRequest)(arg, {
            useHex: true,
            useLongBits: false
        });
        var encoder = new TextEncoder();
        return encoder.encode(JSON.stringify(request));
    },
    deserializeResponse: function(arg) {
        var decoder = new TextDecoder();
        return JSON.parse(decoder.decode(arg));
    }
};

});
parcelRegister("6BPFg", function(module, exports) {

$parcel$export(module.exports, "createExportTraceServiceRequest", () => $4cfe464b663f914a$export$4bd5e67fadfa9fe0);

var $bmQJB = parcelRequire("bmQJB");

var $fxlDP = parcelRequire("fxlDP");

var $l179N = parcelRequire("l179N");

var $hWCgd = parcelRequire("hWCgd");
var $4cfe464b663f914a$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $4cfe464b663f914a$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
function $4cfe464b663f914a$export$4bd5e67fadfa9fe0(spans, options) {
    var encoder = (0, $fxlDP.getOtlpEncoder)(options);
    return {
        resourceSpans: $4cfe464b663f914a$var$spanRecordsToResourceSpans(spans, encoder)
    };
}
function $4cfe464b663f914a$var$createResourceMap(readableSpans) {
    var e_1, _a;
    var resourceMap = new Map();
    try {
        for(var readableSpans_1 = $4cfe464b663f914a$var$__values(readableSpans), readableSpans_1_1 = readableSpans_1.next(); !readableSpans_1_1.done; readableSpans_1_1 = readableSpans_1.next()){
            var record = readableSpans_1_1.value;
            var ilmMap = resourceMap.get(record.resource);
            if (!ilmMap) {
                ilmMap = new Map();
                resourceMap.set(record.resource, ilmMap);
            }
            // TODO this is duplicated in basic tracer. Consolidate on a common helper in core
            var instrumentationLibraryKey = record.instrumentationLibrary.name + "@" + (record.instrumentationLibrary.version || "") + ":" + (record.instrumentationLibrary.schemaUrl || "");
            var records = ilmMap.get(instrumentationLibraryKey);
            if (!records) {
                records = [];
                ilmMap.set(instrumentationLibraryKey, records);
            }
            records.push(record);
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (readableSpans_1_1 && !readableSpans_1_1.done && (_a = readableSpans_1.return)) _a.call(readableSpans_1);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    return resourceMap;
}
function $4cfe464b663f914a$var$spanRecordsToResourceSpans(readableSpans, encoder) {
    var resourceMap = $4cfe464b663f914a$var$createResourceMap(readableSpans);
    var out = [];
    var entryIterator = resourceMap.entries();
    var entry = entryIterator.next();
    while(!entry.done){
        var _a = $4cfe464b663f914a$var$__read(entry.value, 2), resource = _a[0], ilmMap = _a[1];
        var scopeResourceSpans = [];
        var ilmIterator = ilmMap.values();
        var ilmEntry = ilmIterator.next();
        while(!ilmEntry.done){
            var scopeSpans = ilmEntry.value;
            if (scopeSpans.length > 0) {
                var spans = scopeSpans.map(function(readableSpan) {
                    return (0, $bmQJB.sdkSpanToOtlpSpan)(readableSpan, encoder);
                });
                scopeResourceSpans.push({
                    scope: (0, $l179N.createInstrumentationScope)(scopeSpans[0].instrumentationLibrary),
                    spans: spans,
                    schemaUrl: scopeSpans[0].instrumentationLibrary.schemaUrl
                });
            }
            ilmEntry = ilmIterator.next();
        }
        // TODO SDK types don't provide resource schema URL at this time
        var transformedSpans = {
            resource: (0, $hWCgd.createResource)(resource),
            scopeSpans: scopeResourceSpans,
            schemaUrl: undefined
        };
        out.push(transformedSpans);
        entry = entryIterator.next();
    }
    return out;
}

});
parcelRegister("bmQJB", function(module, exports) {

$parcel$export(module.exports, "sdkSpanToOtlpSpan", () => $846aa7bf6a45c204$export$8c81c8011901e012);

var $l179N = parcelRequire("l179N");
function $846aa7bf6a45c204$export$8c81c8011901e012(span, encoder) {
    var _a;
    var ctx = span.spanContext();
    var status = span.status;
    return {
        traceId: encoder.encodeSpanContext(ctx.traceId),
        spanId: encoder.encodeSpanContext(ctx.spanId),
        parentSpanId: encoder.encodeOptionalSpanContext(span.parentSpanId),
        traceState: (_a = ctx.traceState) === null || _a === void 0 ? void 0 : _a.serialize(),
        name: span.name,
        // Span kind is offset by 1 because the API does not define a value for unset
        kind: span.kind == null ? 0 : span.kind + 1,
        startTimeUnixNano: encoder.encodeHrTime(span.startTime),
        endTimeUnixNano: encoder.encodeHrTime(span.endTime),
        attributes: (0, $l179N.toAttributes)(span.attributes),
        droppedAttributesCount: span.droppedAttributesCount,
        events: span.events.map(function(event) {
            return $846aa7bf6a45c204$export$c0221297e49388cc(event, encoder);
        }),
        droppedEventsCount: span.droppedEventsCount,
        status: {
            // API and proto enums share the same values
            code: status.code,
            message: status.message
        },
        links: span.links.map(function(link) {
            return $846aa7bf6a45c204$export$d40a678c50e6f4f2(link, encoder);
        }),
        droppedLinksCount: span.droppedLinksCount
    };
}
function $846aa7bf6a45c204$export$d40a678c50e6f4f2(link, encoder) {
    var _a;
    return {
        attributes: link.attributes ? (0, $l179N.toAttributes)(link.attributes) : [],
        spanId: encoder.encodeSpanContext(link.context.spanId),
        traceId: encoder.encodeSpanContext(link.context.traceId),
        traceState: (_a = link.context.traceState) === null || _a === void 0 ? void 0 : _a.serialize(),
        droppedAttributesCount: link.droppedAttributesCount || 0
    };
}
function $846aa7bf6a45c204$export$c0221297e49388cc(timedEvent, encoder) {
    return {
        attributes: timedEvent.attributes ? (0, $l179N.toAttributes)(timedEvent.attributes) : [],
        name: timedEvent.name,
        timeUnixNano: encoder.encodeHrTime(timedEvent.time),
        droppedAttributesCount: timedEvent.droppedAttributesCount || 0
    };
}

});
parcelRegister("l179N", function(module, exports) {

$parcel$export(module.exports, "createInstrumentationScope", () => $f4cf3e3533c3cc2a$export$5a2377b8e90dd1bf);
$parcel$export(module.exports, "toAttributes", () => $f4cf3e3533c3cc2a$export$b6255b619acd6709);
$parcel$export(module.exports, "toKeyValue", () => $f4cf3e3533c3cc2a$export$155f69accf533147);
$parcel$export(module.exports, "toAnyValue", () => $f4cf3e3533c3cc2a$export$9544ab3c60b2d8ce);
var $f4cf3e3533c3cc2a$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
function $f4cf3e3533c3cc2a$export$5a2377b8e90dd1bf(scope) {
    return {
        name: scope.name,
        version: scope.version
    };
}
function $f4cf3e3533c3cc2a$export$b6255b619acd6709(attributes) {
    return Object.keys(attributes).map(function(key) {
        return $f4cf3e3533c3cc2a$export$155f69accf533147(key, attributes[key]);
    });
}
function $f4cf3e3533c3cc2a$export$155f69accf533147(key, value) {
    return {
        key: key,
        value: $f4cf3e3533c3cc2a$export$9544ab3c60b2d8ce(value)
    };
}
function $f4cf3e3533c3cc2a$export$9544ab3c60b2d8ce(value) {
    var t = typeof value;
    if (t === "string") return {
        stringValue: value
    };
    if (t === "number") {
        if (!Number.isInteger(value)) return {
            doubleValue: value
        };
        return {
            intValue: value
        };
    }
    if (t === "boolean") return {
        boolValue: value
    };
    if (value instanceof Uint8Array) return {
        bytesValue: value
    };
    if (Array.isArray(value)) return {
        arrayValue: {
            values: value.map($f4cf3e3533c3cc2a$export$9544ab3c60b2d8ce)
        }
    };
    if (t === "object" && value != null) return {
        kvlistValue: {
            values: Object.entries(value).map(function(_a) {
                var _b = $f4cf3e3533c3cc2a$var$__read(_a, 2), k = _b[0], v = _b[1];
                return $f4cf3e3533c3cc2a$export$155f69accf533147(k, v);
            })
        }
    };
    return {};
}

});


parcelRegister("fxlDP", function(module, exports) {

$parcel$export(module.exports, "getOtlpEncoder", () => $b4fab998578f81b8$export$2d50162b78680823);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $daehI = parcelRequire("daehI");
var $hTf1k = parcelRequire("hTf1k");
function $b4fab998578f81b8$export$93fd2c60d7ab39e5(hrTime) {
    var NANOSECONDS = BigInt(1000000000);
    return BigInt(hrTime[0]) * NANOSECONDS + BigInt(hrTime[1]);
}
function $b4fab998578f81b8$export$25fa08d6f84e69de(value) {
    var low = Number(BigInt.asUintN(32, value));
    var high = Number(BigInt.asUintN(32, value >> BigInt(32)));
    return {
        low: low,
        high: high
    };
}
function $b4fab998578f81b8$export$9aa1c44d160043e3(hrTime) {
    var nanos = $b4fab998578f81b8$export$93fd2c60d7ab39e5(hrTime);
    return $b4fab998578f81b8$export$25fa08d6f84e69de(nanos);
}
function $b4fab998578f81b8$export$91e61e5f118af2ed(hrTime) {
    var nanos = $b4fab998578f81b8$export$93fd2c60d7ab39e5(hrTime);
    return nanos.toString();
}
var $b4fab998578f81b8$var$encodeTimestamp = typeof BigInt !== "undefined" ? $b4fab998578f81b8$export$91e61e5f118af2ed : (0, $hTf1k.hrTimeToNanoseconds);
function $b4fab998578f81b8$var$identity(value) {
    return value;
}
function $b4fab998578f81b8$var$optionalHexToBinary(str) {
    if (str === undefined) return undefined;
    return (0, $daehI.hexToBinary)(str);
}
var $b4fab998578f81b8$var$DEFAULT_ENCODER = {
    encodeHrTime: $b4fab998578f81b8$export$9aa1c44d160043e3,
    encodeSpanContext: (0, $daehI.hexToBinary),
    encodeOptionalSpanContext: $b4fab998578f81b8$var$optionalHexToBinary
};
function $b4fab998578f81b8$export$2d50162b78680823(options) {
    var _a, _b;
    if (options === undefined) return $b4fab998578f81b8$var$DEFAULT_ENCODER;
    var useLongBits = (_a = options.useLongBits) !== null && _a !== void 0 ? _a : true;
    var useHex = (_b = options.useHex) !== null && _b !== void 0 ? _b : false;
    return {
        encodeHrTime: useLongBits ? $b4fab998578f81b8$export$9aa1c44d160043e3 : $b4fab998578f81b8$var$encodeTimestamp,
        encodeSpanContext: useHex ? $b4fab998578f81b8$var$identity : (0, $daehI.hexToBinary),
        encodeOptionalSpanContext: useHex ? $b4fab998578f81b8$var$identity : $b4fab998578f81b8$var$optionalHexToBinary
    };
}

});
parcelRegister("daehI", function(module, exports) {

$parcel$export(module.exports, "hexToBinary", () => $99574a2ba688d153$export$f7e0d8803cecbdc0);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $99574a2ba688d153$var$intValue(charCode) {
    // 0-9
    if (charCode >= 48 && charCode <= 57) return charCode - 48;
    // a-f
    if (charCode >= 97 && charCode <= 102) return charCode - 87;
    // A-F
    return charCode - 55;
}
function $99574a2ba688d153$export$f7e0d8803cecbdc0(hexStr) {
    var buf = new Uint8Array(hexStr.length / 2);
    var offset = 0;
    for(var i = 0; i < hexStr.length; i += 2){
        var hi = $99574a2ba688d153$var$intValue(hexStr.charCodeAt(i));
        var lo = $99574a2ba688d153$var$intValue(hexStr.charCodeAt(i + 1));
        buf[offset++] = hi << 4 | lo;
    }
    return buf;
}

});


parcelRegister("hWCgd", function(module, exports) {

$parcel$export(module.exports, "createResource", () => $d105882dd9656cdd$export$edd172c6c83c39cc);

var $l179N = parcelRequire("l179N");
function $d105882dd9656cdd$export$edd172c6c83c39cc(resource) {
    return {
        attributes: (0, $l179N.toAttributes)(resource.attributes),
        droppedAttributesCount: 0
    };
}

});


parcelRegister("awurf", function(module, exports) {

$parcel$export(module.exports, "createExportMetricsServiceRequest", () => $7a9481040b933c88$export$5810c6592a5368b8);

var $iFDKD = parcelRequire("iFDKD");
function $7a9481040b933c88$export$5810c6592a5368b8(resourceMetrics, options) {
    return {
        resourceMetrics: resourceMetrics.map(function(metrics) {
            return (0, $iFDKD.toResourceMetrics)(metrics, options);
        })
    };
}

});
parcelRegister("iFDKD", function(module, exports) {

$parcel$export(module.exports, "toResourceMetrics", () => $d97ae41a54fd35cd$export$4bd1f5f04f2e76e7);

var $3farI = parcelRequire("3farI");

var $8vh08 = parcelRequire("8vh08");
var $buM4V = parcelRequire("buM4V");

var $fxlDP = parcelRequire("fxlDP");

var $l179N = parcelRequire("l179N");

var $hWCgd = parcelRequire("hWCgd");
function $d97ae41a54fd35cd$export$4bd1f5f04f2e76e7(resourceMetrics, options) {
    var encoder = (0, $fxlDP.getOtlpEncoder)(options);
    return {
        resource: (0, $hWCgd.createResource)(resourceMetrics.resource),
        schemaUrl: undefined,
        scopeMetrics: $d97ae41a54fd35cd$export$b61ebd2fe6a99df0(resourceMetrics.scopeMetrics, encoder)
    };
}
function $d97ae41a54fd35cd$export$b61ebd2fe6a99df0(scopeMetrics, encoder) {
    return Array.from(scopeMetrics.map(function(metrics) {
        return {
            scope: (0, $l179N.createInstrumentationScope)(metrics.scope),
            metrics: metrics.metrics.map(function(metricData) {
                return $d97ae41a54fd35cd$export$c4dede0d28ee35f3(metricData, encoder);
            }),
            schemaUrl: metrics.scope.schemaUrl
        };
    }));
}
function $d97ae41a54fd35cd$export$c4dede0d28ee35f3(metricData, encoder) {
    var out = {
        name: metricData.descriptor.name,
        description: metricData.descriptor.description,
        unit: metricData.descriptor.unit
    };
    var aggregationTemporality = $d97ae41a54fd35cd$var$toAggregationTemporality(metricData.aggregationTemporality);
    switch(metricData.dataPointType){
        case (0, $buM4V.DataPointType).SUM:
            out.sum = {
                aggregationTemporality: aggregationTemporality,
                isMonotonic: metricData.isMonotonic,
                dataPoints: $d97ae41a54fd35cd$var$toSingularDataPoints(metricData, encoder)
            };
            break;
        case (0, $buM4V.DataPointType).GAUGE:
            out.gauge = {
                dataPoints: $d97ae41a54fd35cd$var$toSingularDataPoints(metricData, encoder)
            };
            break;
        case (0, $buM4V.DataPointType).HISTOGRAM:
            out.histogram = {
                aggregationTemporality: aggregationTemporality,
                dataPoints: $d97ae41a54fd35cd$var$toHistogramDataPoints(metricData, encoder)
            };
            break;
        case (0, $buM4V.DataPointType).EXPONENTIAL_HISTOGRAM:
            out.exponentialHistogram = {
                aggregationTemporality: aggregationTemporality,
                dataPoints: $d97ae41a54fd35cd$var$toExponentialHistogramDataPoints(metricData, encoder)
            };
            break;
    }
    return out;
}
function $d97ae41a54fd35cd$var$toSingularDataPoint(dataPoint, valueType, encoder) {
    var out = {
        attributes: (0, $l179N.toAttributes)(dataPoint.attributes),
        startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
        timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
    };
    switch(valueType){
        case (0, $3farI.ValueType).INT:
            out.asInt = dataPoint.value;
            break;
        case (0, $3farI.ValueType).DOUBLE:
            out.asDouble = dataPoint.value;
            break;
    }
    return out;
}
function $d97ae41a54fd35cd$var$toSingularDataPoints(metricData, encoder) {
    return metricData.dataPoints.map(function(dataPoint) {
        return $d97ae41a54fd35cd$var$toSingularDataPoint(dataPoint, metricData.descriptor.valueType, encoder);
    });
}
function $d97ae41a54fd35cd$var$toHistogramDataPoints(metricData, encoder) {
    return metricData.dataPoints.map(function(dataPoint) {
        var histogram = dataPoint.value;
        return {
            attributes: (0, $l179N.toAttributes)(dataPoint.attributes),
            bucketCounts: histogram.buckets.counts,
            explicitBounds: histogram.buckets.boundaries,
            count: histogram.count,
            sum: histogram.sum,
            min: histogram.min,
            max: histogram.max,
            startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
            timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
        };
    });
}
function $d97ae41a54fd35cd$var$toExponentialHistogramDataPoints(metricData, encoder) {
    return metricData.dataPoints.map(function(dataPoint) {
        var histogram = dataPoint.value;
        return {
            attributes: (0, $l179N.toAttributes)(dataPoint.attributes),
            count: histogram.count,
            min: histogram.min,
            max: histogram.max,
            sum: histogram.sum,
            positive: {
                offset: histogram.positive.offset,
                bucketCounts: histogram.positive.bucketCounts
            },
            negative: {
                offset: histogram.negative.offset,
                bucketCounts: histogram.negative.bucketCounts
            },
            scale: histogram.scale,
            zeroCount: histogram.zeroCount,
            startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
            timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
        };
    });
}
function $d97ae41a54fd35cd$var$toAggregationTemporality(temporality) {
    switch(temporality){
        case (0, $8vh08.AggregationTemporality).DELTA:
            return 1 /* AGGREGATION_TEMPORALITY_DELTA */ ;
        case (0, $8vh08.AggregationTemporality).CUMULATIVE:
            return 2 /* AGGREGATION_TEMPORALITY_CUMULATIVE */ ;
    }
}

});
parcelRegister("8vh08", function(module, exports) {

$parcel$export(module.exports, "AggregationTemporality", () => $630e680af581ad6d$export$679eaf10b59c0fb6);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * AggregationTemporality indicates the way additive quantities are expressed.
 */ var $630e680af581ad6d$export$679eaf10b59c0fb6;
(function(AggregationTemporality) {
    AggregationTemporality[AggregationTemporality["DELTA"] = 0] = "DELTA";
    AggregationTemporality[AggregationTemporality["CUMULATIVE"] = 1] = "CUMULATIVE";
})($630e680af581ad6d$export$679eaf10b59c0fb6 || ($630e680af581ad6d$export$679eaf10b59c0fb6 = {}));

});

parcelRegister("buM4V", function(module, exports) {

$parcel$export(module.exports, "DataPointType", () => $85e7ca6aea9f5f7e$export$ab80bc47114adffb);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * The aggregated point data type.
 */ var $85e7ca6aea9f5f7e$export$ab80bc47114adffb;
(function(DataPointType) {
    /**
     * A histogram data point contains a histogram statistics of collected
     * values with a list of explicit bucket boundaries and statistics such
     * as min, max, count, and sum of all collected values.
     */ DataPointType[DataPointType["HISTOGRAM"] = 0] = "HISTOGRAM";
    /**
     * An exponential histogram data point contains a histogram statistics of
     * collected values where bucket boundaries are automatically calculated
     * using an exponential function, and statistics such as min, max, count,
     * and sum of all collected values.
     */ DataPointType[DataPointType["EXPONENTIAL_HISTOGRAM"] = 1] = "EXPONENTIAL_HISTOGRAM";
    /**
     * A gauge metric data point has only a single numeric value.
     */ DataPointType[DataPointType["GAUGE"] = 2] = "GAUGE";
    /**
     * A sum metric data point has a single numeric value and a
     * monotonicity-indicator.
     */ DataPointType[DataPointType["SUM"] = 3] = "SUM";
})($85e7ca6aea9f5f7e$export$ab80bc47114adffb || ($85e7ca6aea9f5f7e$export$ab80bc47114adffb = {}));

});



parcelRegister("7OQIP", function(module, exports) {

$parcel$export(module.exports, "createExportLogsServiceRequest", () => $5b16196d80cfde18$export$5700a2327d5ce50d);
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $fxlDP = parcelRequire("fxlDP");

var $l179N = parcelRequire("l179N");

var $hWCgd = parcelRequire("hWCgd");
var $5b16196d80cfde18$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $5b16196d80cfde18$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
function $5b16196d80cfde18$export$5700a2327d5ce50d(logRecords, options) {
    var encoder = (0, $fxlDP.getOtlpEncoder)(options);
    return {
        resourceLogs: $5b16196d80cfde18$var$logRecordsToResourceLogs(logRecords, encoder)
    };
}
function $5b16196d80cfde18$var$createResourceMap(logRecords) {
    var e_1, _a;
    var resourceMap = new Map();
    try {
        for(var logRecords_1 = $5b16196d80cfde18$var$__values(logRecords), logRecords_1_1 = logRecords_1.next(); !logRecords_1_1.done; logRecords_1_1 = logRecords_1.next()){
            var record = logRecords_1_1.value;
            var resource = record.resource, _b = record.instrumentationScope, name_1 = _b.name, _c = _b.version, version = _c === void 0 ? "" : _c, _d = _b.schemaUrl, schemaUrl = _d === void 0 ? "" : _d;
            var ismMap = resourceMap.get(resource);
            if (!ismMap) {
                ismMap = new Map();
                resourceMap.set(resource, ismMap);
            }
            var ismKey = name_1 + "@" + version + ":" + schemaUrl;
            var records = ismMap.get(ismKey);
            if (!records) {
                records = [];
                ismMap.set(ismKey, records);
            }
            records.push(record);
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (logRecords_1_1 && !logRecords_1_1.done && (_a = logRecords_1.return)) _a.call(logRecords_1);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    return resourceMap;
}
function $5b16196d80cfde18$var$logRecordsToResourceLogs(logRecords, encoder) {
    var resourceMap = $5b16196d80cfde18$var$createResourceMap(logRecords);
    return Array.from(resourceMap, function(_a) {
        var _b = $5b16196d80cfde18$var$__read(_a, 2), resource = _b[0], ismMap = _b[1];
        return {
            resource: (0, $hWCgd.createResource)(resource),
            scopeLogs: Array.from(ismMap, function(_a) {
                var _b = $5b16196d80cfde18$var$__read(_a, 2), scopeLogs = _b[1];
                return {
                    scope: (0, $l179N.createInstrumentationScope)(scopeLogs[0].instrumentationScope),
                    logRecords: scopeLogs.map(function(log) {
                        return $5b16196d80cfde18$var$toLogRecord(log, encoder);
                    }),
                    schemaUrl: scopeLogs[0].instrumentationScope.schemaUrl
                };
            }),
            schemaUrl: undefined
        };
    });
}
function $5b16196d80cfde18$var$toLogRecord(log, encoder) {
    var _a, _b, _c;
    return {
        timeUnixNano: encoder.encodeHrTime(log.hrTime),
        observedTimeUnixNano: encoder.encodeHrTime(log.hrTimeObserved),
        severityNumber: $5b16196d80cfde18$var$toSeverityNumber(log.severityNumber),
        severityText: log.severityText,
        body: (0, $l179N.toAnyValue)(log.body),
        attributes: $5b16196d80cfde18$export$76409c6e9b7f33ec(log.attributes),
        droppedAttributesCount: log.droppedAttributesCount,
        flags: (_a = log.spanContext) === null || _a === void 0 ? void 0 : _a.traceFlags,
        traceId: encoder.encodeOptionalSpanContext((_b = log.spanContext) === null || _b === void 0 ? void 0 : _b.traceId),
        spanId: encoder.encodeOptionalSpanContext((_c = log.spanContext) === null || _c === void 0 ? void 0 : _c.spanId)
    };
}
function $5b16196d80cfde18$var$toSeverityNumber(severityNumber) {
    return severityNumber;
}
function $5b16196d80cfde18$export$76409c6e9b7f33ec(attributes) {
    return Object.keys(attributes).map(function(key) {
        return (0, $l179N.toKeyValue)(key, attributes[key]);
    });
}

});




parcelRegister("6cXBs", function(module, exports) {
"use strict";
var $48521905a33cb823$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.configureCompositeExporter = $48521905a33cb823$var$configureCompositeExporter;

var $eLOET = parcelRequire("eLOET");
/**
 * Builds and returns a new {@link SpanExporter} that wraps the provided array
 * of {@link SpanExporter}s
 *
 * @param exporters the exporters to wrap with the composite exporter
 * @returns the configured {@link SpanExporter} instance
 */ function $48521905a33cb823$var$configureCompositeExporter(exporters) {
    return new $48521905a33cb823$var$CompositeSpanExporter(exporters);
}
/**
 * A custom SpanExporter that wraps a number of other exporters and calls export and shutdown
 * for each.
 */ class $48521905a33cb823$var$CompositeSpanExporter {
    constructor(exporters){
        this._exporters = exporters;
    }
    export(spans, resultCallback) {
        this._exporters.forEach((exporter)=>exporter.export(spans, resultCallback));
        resultCallback({
            code: $eLOET.ExportResultCode.SUCCESS
        });
    }
    shutdown() {
        return $48521905a33cb823$var$__awaiter(this, void 0, void 0, function*() {
            const results = [];
            this._exporters.forEach((exporter)=>results.push(exporter.shutdown()));
            yield Promise.all(results);
        });
    }
}

});

parcelRegister("fE3mf", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.configureConsoleTraceLinkExporter = $b63d3238a28554bf$var$configureConsoleTraceLinkExporter;
module.exports.buildTraceUrl = $b63d3238a28554bf$var$buildTraceUrl;

var $eLOET = parcelRequire("eLOET");

var $4VF80 = parcelRequire("4VF80");

var $fcSAX = parcelRequire("fcSAX");
/**
 * Builds and returns a {@link SpanExporter} that logs Honeycomb URLs for completed traces
 *
 * @remark This is not for production use.
 * @param options The {@link HoneycombOptions} used to configure the exporter
 * @returns the configured {@link ConsoleTraceLinkExporter} instance
 */ function $b63d3238a28554bf$var$configureConsoleTraceLinkExporter(options) {
    const apiKey = (0, $4VF80.getTracesApiKey)(options);
    return new $b63d3238a28554bf$var$ConsoleTraceLinkExporter(options === null || options === void 0 ? void 0 : options.serviceName, apiKey);
}
/**
 * A custom {@link SpanExporter} that logs Honeycomb URLs for completed traces.
 *
 * @remark This is not for production use.
 */ class $b63d3238a28554bf$var$ConsoleTraceLinkExporter {
    constructor(serviceName, apikey){
        this._traceUrl = "";
        if (!serviceName || !apikey) {
            console.debug($fcSAX.MISSING_FIELDS_FOR_LOCAL_VISUALIZATIONS);
            return;
        }
        const options = {
            headers: {
                "x-honeycomb-team": apikey
            }
        };
        fetch("https://api.honeycomb.io/1/auth", options).then((resp)=>{
            if (resp.ok) return resp.json();
            throw new Error();
        }).then((data)=>{
            var _a, _b, _c;
            const respData = data;
            if ((_a = respData.team) === null || _a === void 0 ? void 0 : _a.slug) this._traceUrl = $b63d3238a28554bf$var$buildTraceUrl(apikey, serviceName, (_b = respData.team) === null || _b === void 0 ? void 0 : _b.slug, (_c = respData.environment) === null || _c === void 0 ? void 0 : _c.slug);
            else throw new Error();
        }).catch(()=>{
            console.log($fcSAX.FAILED_AUTH_FOR_LOCAL_VISUALIZATIONS);
        });
    }
    export(spans, resultCallback) {
        if (this._traceUrl) spans.forEach((span)=>{
            // only log root spans (ones without a parent span)
            if (!span.parentSpanId) console.log((0, $4VF80.createHoneycombSDKLogMessage)(`Honeycomb link: ${this._traceUrl}=${span.spanContext().traceId}`));
        });
        resultCallback({
            code: $eLOET.ExportResultCode.SUCCESS
        });
    }
    shutdown() {
        return Promise.resolve();
    }
}
/**
 * Builds and returns a URL that is used to log when a trace is completed in the {@link ConsoleTraceLinkExporter}.
 *
 * @param apikey the Honeycomb API key used to retrieve the Honeycomb team and environment
 * @param serviceName the Honeycomb service name (or classic dataset) where data is stored
 * @param team the Honeycomb team
 * @param environment the Honeycomb environment
 * @returns
 */ function $b63d3238a28554bf$var$buildTraceUrl(apikey, serviceName, team, environment) {
    let url = `https://ui.honeycomb.io/${team}`;
    if (!(0, $4VF80.isClassic)(apikey) && environment) url += `/environments/${environment}`;
    url += `/datasets/${serviceName}/trace?trace_id`;
    return url;
}

});


parcelRegister("3c1t1", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.DeterministicSampler = module.exports.configureDeterministicSampler = void 0;

var $lX0lO = parcelRequire("lX0lO");
var $6ai7P = parcelRequire("6ai7P");
var $dKvNN = parcelRequire("dKvNN");

var $4VF80 = parcelRequire("4VF80");
/**
 * Builds and returns a Deterministic Sampler that uses the provided sample rate to
 * configure the inner sampler.
 * @param options The {@link HoneycombOptions}
 * @returns a {@link DeterministicSampler}
 */ const $2533a167460dbcb1$var$configureDeterministicSampler = (options)=>{
    const sampleRate = (0, $4VF80.getSampleRate)(options);
    return new $2533a167460dbcb1$var$DeterministicSampler(sampleRate);
};
module.exports.configureDeterministicSampler = $2533a167460dbcb1$var$configureDeterministicSampler;
/**
 * A {@link Sampler} that uses a deterministic sample rate to configure the sampler.
 */ class $2533a167460dbcb1$var$DeterministicSampler {
    constructor(sampleRate){
        this._sampleRate = sampleRate;
        switch(sampleRate){
            // sample rate of 0 means send nothing
            case 0:
                this._sampler = new $lX0lO.AlwaysOffSampler();
                break;
            // sample rate of 1 is default, send everything
            case 1:
                this._sampler = new $6ai7P.AlwaysOnSampler();
                break;
            default:
                {
                    const ratio = 1.0 / sampleRate;
                    this._sampler = new $dKvNN.TraceIdRatioBasedSampler(ratio);
                    break;
                }
        }
    }
    shouldSample(context, traceId, spanName, spanKind, attributes, links) {
        const result = this._sampler.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        return Object.assign(Object.assign({}, result), {
            attributes: Object.assign(Object.assign({}, result.attributes), {
                SampleRate: this._sampleRate
            })
        });
    }
    toString() {
        return `DeterministicSampler(${this._sampler.toString()})`;
    }
}
module.exports.DeterministicSampler = $2533a167460dbcb1$var$DeterministicSampler;

});

parcelRegister("okhup", function(module, exports) {
"use strict";
var $0491f9685692295b$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $0491f9685692295b$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $0491f9685692295b$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) $0491f9685692295b$var$__createBinding(result, mod, k);
    }
    $0491f9685692295b$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.WebVitalsInstrumentation = module.exports.InstrumentationAbstract = void 0;
parcelRequire("6wZzX");
var $f42ld = parcelRequire("f42ld");

var $8W2wk = parcelRequire("8W2wk");
parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
var $7KVqm = parcelRequire("7KVqm");
var $ibuLL = parcelRequire("ibuLL");

const $0491f9685692295b$var$shimmer = $0491f9685692295b$var$__importStar((parcelRequire("3ZrsG")));
// To avoid importing InstrumentationAbstract from:
// import { InstrumentationAbstract } from '@opentelemetry/instrumentation/build/src/instrumentation';
// When this is exposed we can import from there.
class $0491f9685692295b$var$InstrumentationAbstract {
    constructor(instrumentationName, instrumentationVersion, config = {}){
        this.instrumentationName = instrumentationName;
        this.instrumentationVersion = instrumentationVersion;
        /* Api to wrap instrumented method */ // eslint-disable-next-line @typescript-eslint/unbound-method
        this._wrap = $0491f9685692295b$var$shimmer.wrap;
        /* Api to unwrap instrumented methods */ // eslint-disable-next-line @typescript-eslint/unbound-method
        this._unwrap = $0491f9685692295b$var$shimmer.unwrap;
        /* Api to mass wrap instrumented method */ // eslint-disable-next-line @typescript-eslint/unbound-method
        this._massWrap = $0491f9685692295b$var$shimmer.massWrap;
        /* Api to mass unwrap instrumented methods */ // eslint-disable-next-line @typescript-eslint/unbound-method
        this._massUnwrap = $0491f9685692295b$var$shimmer.massUnwrap;
        this._config = Object.assign({
            enabled: true
        }, config);
        this._diag = $ljza4.diag.createComponentLogger({
            namespace: instrumentationName
        });
        this._tracer = $ibuLL.trace.getTracer(instrumentationName, instrumentationVersion);
        this._meter = $7KVqm.metrics.getMeter(instrumentationName, instrumentationVersion);
        this._updateMetricInstruments();
    }
    /* Returns meter */ get meter() {
        return this._meter;
    }
    /**
     * Sets MeterProvider to this plugin
     * @param meterProvider
     */ setMeterProvider(meterProvider) {
        this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
        this._updateMetricInstruments();
    }
    /**
     * Sets the new metric instruments with the current Meter.
     */ _updateMetricInstruments() {
        return;
    }
    /* Returns InstrumentationConfig */ getConfig() {
        return this._config;
    }
    /**
     * Sets InstrumentationConfig to this plugin
     * @param InstrumentationConfig
     */ setConfig(config = {}) {
        this._config = Object.assign({}, config);
    }
    /**
     * Sets TraceProvider to this plugin
     * @param tracerProvider
     */ setTracerProvider(tracerProvider) {
        this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
    }
    /* Returns tracer */ get tracer() {
        return this._tracer;
    }
}
module.exports.InstrumentationAbstract = $0491f9685692295b$var$InstrumentationAbstract;
/**
 * Web vitals auto-instrumentation, sends spans automatically for CLS, LCP, INP, FCP, FID, TTFB.
 * Defaults to sending spans for CLS, LCP, INP, FCP and TTFB.
 * @param config The {@link WebVitalsInstrumentationConfig }
 */ class $0491f9685692295b$var$WebVitalsInstrumentation extends $0491f9685692295b$var$InstrumentationAbstract {
    constructor({ enabled: enabled = true, vitalsToTrack: vitalsToTrack = [
        "CLS",
        "LCP",
        "INP"
    ], lcp: lcp, cls: cls, inp: inp, fid: fid, fcp: fcp, ttfb: ttfb } = {}){
        const config = {
            enabled: enabled,
            vitalsToTrack: vitalsToTrack,
            lcp: lcp,
            cls: cls,
            inp: inp,
            fid: fid,
            fcp: fcp,
            ttfb: ttfb
        };
        super("@honeycombio/instrumentation-web-vitals", $8W2wk.VERSION, config);
        this.onReportCLS = (cls, applyCustomAttributes)=>{
            if (!this.isEnabled()) return;
            const { name: name, attribution: attribution } = cls;
            const { largestShiftTarget: largestShiftTarget, largestShiftTime: largestShiftTime, largestShiftValue: largestShiftValue, loadState: loadState, largestShiftEntry: largestShiftEntry } = attribution;
            const attrPrefix = this.getAttrPrefix(name);
            const span = this.tracer.startSpan(name);
            span.setAttributes(Object.assign(Object.assign({}, this.getSharedAttributes(cls)), {
                [`${attrPrefix}.largest_shift_target`]: largestShiftTarget,
                [`${attrPrefix}.element`]: largestShiftTarget,
                [`${attrPrefix}.largest_shift_time`]: largestShiftTime,
                [`${attrPrefix}.largest_shift_value`]: largestShiftValue,
                [`${attrPrefix}.load_state`]: loadState,
                [`${attrPrefix}.had_recent_input`]: largestShiftEntry === null || largestShiftEntry === void 0 ? void 0 : largestShiftEntry.hadRecentInput
            }));
            if (applyCustomAttributes) applyCustomAttributes(cls, span);
            span.end();
        };
        this.onReportLCP = (lcp, applyCustomAttributes)=>{
            if (!this.isEnabled()) return;
            const { name: name, attribution: attribution } = lcp;
            const { element: element, url: url, timeToFirstByte: timeToFirstByte, resourceLoadDelay: resourceLoadDelay, resourceLoadDuration: resourceLoadDuration, elementRenderDelay: elementRenderDelay } = attribution;
            const attrPrefix = this.getAttrPrefix(name);
            const span = this.tracer.startSpan(name);
            span.setAttributes(Object.assign(Object.assign({}, this.getSharedAttributes(lcp)), {
                [`${attrPrefix}.element`]: element,
                [`${attrPrefix}.url`]: url,
                [`${attrPrefix}.time_to_first_byte`]: timeToFirstByte,
                [`${attrPrefix}.resource_load_delay`]: resourceLoadDelay,
                [`${attrPrefix}.resource_load_duration`]: resourceLoadDuration,
                [`${attrPrefix}.element_render_delay`]: elementRenderDelay,
                // This will be deprecated in a future version
                [`${attrPrefix}.resource_load_time`]: resourceLoadDuration
            }));
            if (applyCustomAttributes) applyCustomAttributes(lcp, span);
            span.end();
        };
        this.onReportINP = (inp, applyCustomAttributes)=>{
            if (!this.isEnabled()) return;
            const { name: name, attribution: attribution } = inp;
            const { inputDelay: inputDelay, interactionTarget: interactionTarget, interactionTime: interactionTime, interactionType: interactionType, loadState: loadState, nextPaintTime: nextPaintTime, presentationDelay: presentationDelay, processingDuration: processingDuration } = attribution;
            const attrPrefix = this.getAttrPrefix(name);
            const span = this.tracer.startSpan(name);
            span.setAttributes(Object.assign(Object.assign({}, this.getSharedAttributes(inp)), {
                [`${attrPrefix}.input_delay`]: inputDelay,
                [`${attrPrefix}.interaction_target`]: interactionTarget,
                [`${attrPrefix}.interaction_time`]: interactionTime,
                [`${attrPrefix}.interaction_type`]: interactionType,
                [`${attrPrefix}.load_state`]: loadState,
                [`${attrPrefix}.next_paint_time`]: nextPaintTime,
                [`${attrPrefix}.presentation_delay`]: presentationDelay,
                [`${attrPrefix}.processing_duration`]: processingDuration,
                // These will be deprecated in a future version
                [`${attrPrefix}.element`]: interactionTarget,
                [`${attrPrefix}.event_type`]: interactionType
            }));
            if (applyCustomAttributes) applyCustomAttributes(inp, span);
            span.end();
        };
        this.onReportFCP = (fcp, applyCustomAttributes)=>{
            if (!this.isEnabled()) return;
            const { name: name, attribution: attribution } = fcp;
            const { timeToFirstByte: timeToFirstByte, firstByteToFCP: firstByteToFCP, loadState: loadState } = attribution;
            const attrPrefix = this.getAttrPrefix(name);
            const span = this.tracer.startSpan(name);
            span.setAttributes(Object.assign(Object.assign({}, this.getSharedAttributes(fcp)), {
                [`${attrPrefix}.time_to_first_byte`]: timeToFirstByte,
                [`${attrPrefix}.time_since_first_byte`]: firstByteToFCP,
                [`${attrPrefix}.load_state`]: loadState
            }));
            if (applyCustomAttributes) applyCustomAttributes(fcp, span);
            span.end();
        };
        /**
         *  @deprecated this will be removed in the next major version, use INP instead.
         */ this.onReportFID = (fid, applyCustomAttributes)=>{
            if (!this.isEnabled()) return;
            const { name: name, attribution: attribution } = fid;
            const { eventTarget: eventTarget, eventType: eventType, loadState: loadState } = attribution;
            const attrPrefix = this.getAttrPrefix(name);
            const span = this.tracer.startSpan(name);
            span.setAttributes(Object.assign(Object.assign({}, this.getSharedAttributes(fid)), {
                [`${attrPrefix}.element`]: eventTarget,
                [`${attrPrefix}.event_type`]: eventType,
                [`${attrPrefix}.load_state`]: loadState
            }));
            if (applyCustomAttributes) applyCustomAttributes(fid, span);
            span.end();
        };
        this.onReportTTFB = (ttfb, applyCustomAttributes)=>{
            if (!this.isEnabled()) return;
            const { name: name, attribution: attribution } = ttfb;
            const { cacheDuration: cacheDuration, connectionDuration: connectionDuration, dnsDuration: dnsDuration, requestDuration: requestDuration, waitingDuration: waitingDuration } = attribution;
            const attrPrefix = this.getAttrPrefix(name);
            const span = this.tracer.startSpan(name);
            span.setAttributes(Object.assign(Object.assign({}, this.getSharedAttributes(ttfb)), {
                [`${attrPrefix}.waiting_duration`]: waitingDuration,
                [`${attrPrefix}.dns_duration`]: dnsDuration,
                [`${attrPrefix}.connection_duration`]: connectionDuration,
                [`${attrPrefix}.request_duration`]: requestDuration,
                [`${attrPrefix}.cache_duration`]: cacheDuration,
                // These will be deprecated ina future version
                [`${attrPrefix}.waiting_time`]: waitingDuration,
                [`${attrPrefix}.dns_time`]: dnsDuration,
                [`${attrPrefix}.connection_time`]: connectionDuration,
                [`${attrPrefix}.request_time`]: requestDuration
            }));
            if (applyCustomAttributes) applyCustomAttributes(ttfb, span);
            span.end();
        };
        this.vitalsToTrack = [
            ...vitalsToTrack
        ];
        this.lcpOpts = lcp;
        this.clsOpts = cls;
        this.inpOpts = inp;
        this.fidOpts = fid;
        this.fcpOpts = fcp;
        this.ttfbOpts = ttfb;
        this._isEnabled = enabled;
        this._setupWebVitalsCallbacks();
    }
    init() {}
    _setupWebVitalsCallbacks() {
        if (this.vitalsToTrack.includes("CLS")) (0, $f42ld.onCLS)((vital)=>{
            var _a;
            this.onReportCLS(vital, (_a = this.clsOpts) === null || _a === void 0 ? void 0 : _a.applyCustomAttributes);
        }, this.clsOpts);
        if (this.vitalsToTrack.includes("LCP")) (0, $f42ld.onLCP)((vital)=>{
            var _a;
            this.onReportLCP(vital, (_a = this.lcpOpts) === null || _a === void 0 ? void 0 : _a.applyCustomAttributes);
        }, this.lcpOpts);
        if (this.vitalsToTrack.includes("INP")) (0, $f42ld.onINP)((vital)=>{
            var _a;
            this.onReportINP(vital, (_a = this.inpOpts) === null || _a === void 0 ? void 0 : _a.applyCustomAttributes);
        }, this.inpOpts);
        if (this.vitalsToTrack.includes("FID")) (0, $f42ld.onFID)((vital)=>{
            var _a;
            this.onReportFID(vital, (_a = this.fidOpts) === null || _a === void 0 ? void 0 : _a.applyCustomAttributes);
        }, this.fidOpts);
        if (this.vitalsToTrack.includes("TTFB")) (0, $f42ld.onTTFB)((vital)=>{
            var _a;
            this.onReportTTFB(vital, (_a = this.ttfbOpts) === null || _a === void 0 ? void 0 : _a.applyCustomAttributes);
        }, this.ttfbOpts);
        if (this.vitalsToTrack.includes("FCP")) (0, $f42ld.onFCP)((vital)=>{
            var _a;
            this.onReportFCP(vital, (_a = this.fcpOpts) === null || _a === void 0 ? void 0 : _a.applyCustomAttributes);
        }, this.fcpOpts);
    }
    getAttrPrefix(name) {
        return name.toLowerCase();
    }
    getSharedAttributes(vital) {
        const { name: name, id: id, delta: delta, rating: rating, value: value, navigationType: navigationType } = vital;
        const attrPrefix = this.getAttrPrefix(name);
        return {
            [`${attrPrefix}.id`]: id,
            [`${attrPrefix}.delta`]: delta,
            [`${attrPrefix}.value`]: value,
            [`${attrPrefix}.rating`]: rating,
            [`${attrPrefix}.navigation_type`]: navigationType
        };
    }
    disable() {
        if (!this.isEnabled()) {
            this._diag.debug(`Instrumentation already disabled`);
            return;
        }
        this._isEnabled = false;
        this._diag.debug(`Instrumentation  disabled`);
    }
    enable() {
        if (this.isEnabled()) {
            this._diag.debug(`Instrumentation already enabled`);
            return;
        }
        this._isEnabled = true;
        this._diag.debug(`Instrumentation  enabled`);
        this._diag.debug(`Sending spans for ${this.vitalsToTrack.join(",")}`);
    }
    isEnabled() {
        return this._isEnabled;
    }
}
module.exports.WebVitalsInstrumentation = $0491f9685692295b$var$WebVitalsInstrumentation;

});
parcelRegister("6wZzX", function(module, exports) {
$parcel$export(module.exports, "onCLS", () => (parcelRequire("f42ld")).onCLS);
$parcel$export(module.exports, "onFCP", () => (parcelRequire("f42ld")).onFCP);
$parcel$export(module.exports, "onFID", () => (parcelRequire("f42ld")).onFID);
$parcel$export(module.exports, "onINP", () => (parcelRequire("f42ld")).onINP);
$parcel$export(module.exports, "onLCP", () => (parcelRequire("f42ld")).onLCP);
$parcel$export(module.exports, "onTTFB", () => (parcelRequire("f42ld")).onTTFB);
/*
 Copyright 2022 Google LLC
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/ // Creates the `web-vitals/attribution` import in node-based bundlers.
// This will not be needed when export maps are widely supported.
parcelRequire("f42ld");

});
parcelRegister("f42ld", function(module, exports) {

$parcel$export(module.exports, "onCLS", () => $af790ba5c087de3a$export$a7873055838e5ad8);
$parcel$export(module.exports, "onFCP", () => $af790ba5c087de3a$export$fe3c86b74e15d5de);
$parcel$export(module.exports, "onINP", () => $af790ba5c087de3a$export$7df4b36ecaed99e1);
$parcel$export(module.exports, "onLCP", () => $af790ba5c087de3a$export$947b1626ab8d5632);
$parcel$export(module.exports, "onTTFB", () => $af790ba5c087de3a$export$33a01e6c5f2c7e33);
$parcel$export(module.exports, "onFID", () => $af790ba5c087de3a$export$39705a25c49af873);
var $af790ba5c087de3a$var$t, $af790ba5c087de3a$var$e, $af790ba5c087de3a$var$n, $af790ba5c087de3a$var$r = function() {
    var t = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    if (t && t.responseStart > 0 && t.responseStart < performance.now()) return t;
}, $af790ba5c087de3a$var$i = function(t) {
    if ("loading" === document.readyState) return "loading";
    var e = $af790ba5c087de3a$var$r();
    if (e) {
        if (t < e.domInteractive) return "loading";
        if (0 === e.domContentLoadedEventStart || t < e.domContentLoadedEventStart) return "dom-interactive";
        if (0 === e.domComplete || t < e.domComplete) return "dom-content-loaded";
    }
    return "complete";
}, $af790ba5c087de3a$var$a = function(t) {
    var e = t.nodeName;
    return 1 === t.nodeType ? e.toLowerCase() : e.toUpperCase().replace(/^#/, "");
}, $af790ba5c087de3a$var$o = function(t, e) {
    var n = "";
    try {
        for(; t && 9 !== t.nodeType;){
            var r = t, i = r.id ? "#" + r.id : $af790ba5c087de3a$var$a(r) + (r.classList && r.classList.value && r.classList.value.trim() && r.classList.value.trim().length ? "." + r.classList.value.trim().replace(/\s+/g, ".") : "");
            if (n.length + i.length > (e || 100) - 1) return n || i;
            if (n = n ? i + ">" + n : i, r.id) break;
            t = r.parentNode;
        }
    } catch (t) {}
    return n;
}, $af790ba5c087de3a$var$c = -1, $af790ba5c087de3a$var$u = function() {
    return $af790ba5c087de3a$var$c;
}, $af790ba5c087de3a$var$s = function(t) {
    addEventListener("pageshow", function(e) {
        e.persisted && ($af790ba5c087de3a$var$c = e.timeStamp, t(e));
    }, !0);
}, $af790ba5c087de3a$var$f = function() {
    var t = $af790ba5c087de3a$var$r();
    return t && t.activationStart || 0;
}, $af790ba5c087de3a$var$d = function(t, e) {
    var n = $af790ba5c087de3a$var$r(), i = "navigate";
    $af790ba5c087de3a$var$u() >= 0 ? i = "back-forward-cache" : n && (document.prerendering || $af790ba5c087de3a$var$f() > 0 ? i = "prerender" : document.wasDiscarded ? i = "restore" : n.type && (i = n.type.replace(/_/g, "-")));
    return {
        name: t,
        value: void 0 === e ? -1 : e,
        rating: "good",
        delta: 0,
        entries: [],
        id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
        navigationType: i
    };
}, $af790ba5c087de3a$var$l = function(t, e, n) {
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(t)) {
            var r = new PerformanceObserver(function(t) {
                Promise.resolve().then(function() {
                    e(t.getEntries());
                });
            });
            return r.observe(Object.assign({
                type: t,
                buffered: !0
            }, n || {})), r;
        }
    } catch (t) {}
}, $af790ba5c087de3a$var$m = function(t, e, n, r) {
    var i, a;
    return function(o) {
        e.value >= 0 && (o || r) && ((a = e.value - (i || 0)) || void 0 === i) && (i = e.value, e.delta = a, e.rating = function(t, e) {
            return t > e[1] ? "poor" : t > e[0] ? "needs-improvement" : "good";
        }(e.value, n), t(e));
    };
}, $af790ba5c087de3a$var$p = function(t) {
    requestAnimationFrame(function() {
        return requestAnimationFrame(function() {
            return t();
        });
    });
}, $af790ba5c087de3a$var$v = function(t) {
    document.addEventListener("visibilitychange", function() {
        "hidden" === document.visibilityState && t();
    });
}, $af790ba5c087de3a$var$g = function(t) {
    var e = !1;
    return function() {
        e || (t(), e = !0);
    };
}, $af790ba5c087de3a$var$h = -1, $af790ba5c087de3a$var$T = function() {
    return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
}, $af790ba5c087de3a$var$y = function(t) {
    "hidden" === document.visibilityState && $af790ba5c087de3a$var$h > -1 && ($af790ba5c087de3a$var$h = "visibilitychange" === t.type ? t.timeStamp : 0, $af790ba5c087de3a$var$S());
}, $af790ba5c087de3a$var$E = function() {
    addEventListener("visibilitychange", $af790ba5c087de3a$var$y, !0), addEventListener("prerenderingchange", $af790ba5c087de3a$var$y, !0);
}, $af790ba5c087de3a$var$S = function() {
    removeEventListener("visibilitychange", $af790ba5c087de3a$var$y, !0), removeEventListener("prerenderingchange", $af790ba5c087de3a$var$y, !0);
}, $af790ba5c087de3a$var$b = function() {
    return $af790ba5c087de3a$var$h < 0 && ($af790ba5c087de3a$var$h = $af790ba5c087de3a$var$T(), $af790ba5c087de3a$var$E(), $af790ba5c087de3a$var$s(function() {
        setTimeout(function() {
            $af790ba5c087de3a$var$h = $af790ba5c087de3a$var$T(), $af790ba5c087de3a$var$E();
        }, 0);
    })), {
        get firstHiddenTime () {
            return $af790ba5c087de3a$var$h;
        }
    };
}, $af790ba5c087de3a$var$L = function(t) {
    document.prerendering ? addEventListener("prerenderingchange", function() {
        return t();
    }, !0) : t();
}, $af790ba5c087de3a$export$e610c735b5510cec = [
    1800,
    3e3
], $af790ba5c087de3a$var$M = function(t, e) {
    e = e || {}, $af790ba5c087de3a$var$L(function() {
        var n, r = $af790ba5c087de3a$var$b(), i = $af790ba5c087de3a$var$d("FCP"), a = $af790ba5c087de3a$var$l("paint", function(t) {
            t.forEach(function(t) {
                "first-contentful-paint" === t.name && (a.disconnect(), t.startTime < r.firstHiddenTime && (i.value = Math.max(t.startTime - $af790ba5c087de3a$var$f(), 0), i.entries.push(t), n(!0)));
            });
        });
        a && (n = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$e610c735b5510cec, e.reportAllChanges), $af790ba5c087de3a$var$s(function(r) {
            i = $af790ba5c087de3a$var$d("FCP"), n = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$e610c735b5510cec, e.reportAllChanges), $af790ba5c087de3a$var$p(function() {
                i.value = performance.now() - r.timeStamp, n(!0);
            });
        }));
    });
}, $af790ba5c087de3a$export$3f20d8e089ac35b2 = [
    .1,
    .25
], $af790ba5c087de3a$export$a7873055838e5ad8 = function(t, e) {
    !function(t, e) {
        e = e || {}, $af790ba5c087de3a$var$M($af790ba5c087de3a$var$g(function() {
            var n, r = $af790ba5c087de3a$var$d("CLS", 0), i = 0, a = [], o = function(t) {
                t.forEach(function(t) {
                    if (!t.hadRecentInput) {
                        var e = a[0], n = a[a.length - 1];
                        i && t.startTime - n.startTime < 1e3 && t.startTime - e.startTime < 5e3 ? (i += t.value, a.push(t)) : (i = t.value, a = [
                            t
                        ]);
                    }
                }), i > r.value && (r.value = i, r.entries = a, n());
            }, c = $af790ba5c087de3a$var$l("layout-shift", o);
            c && (n = $af790ba5c087de3a$var$m(t, r, $af790ba5c087de3a$export$3f20d8e089ac35b2, e.reportAllChanges), $af790ba5c087de3a$var$v(function() {
                o(c.takeRecords()), n(!0);
            }), $af790ba5c087de3a$var$s(function() {
                i = 0, r = $af790ba5c087de3a$var$d("CLS", 0), n = $af790ba5c087de3a$var$m(t, r, $af790ba5c087de3a$export$3f20d8e089ac35b2, e.reportAllChanges), $af790ba5c087de3a$var$p(function() {
                    return n();
                });
            }), setTimeout(n, 0));
        }));
    }(function(e) {
        var n = function(t) {
            var e, n = {};
            if (t.entries.length) {
                var r = t.entries.reduce(function(t, e) {
                    return t && t.value > e.value ? t : e;
                });
                if (r && r.sources && r.sources.length) {
                    var a = (e = r.sources).find(function(t) {
                        return t.node && 1 === t.node.nodeType;
                    }) || e[0];
                    a && (n = {
                        largestShiftTarget: $af790ba5c087de3a$var$o(a.node),
                        largestShiftTime: r.startTime,
                        largestShiftValue: r.value,
                        largestShiftSource: a,
                        largestShiftEntry: r,
                        loadState: $af790ba5c087de3a$var$i(r.startTime)
                    });
                }
            }
            return Object.assign(t, {
                attribution: n
            });
        }(e);
        t(n);
    }, e);
}, $af790ba5c087de3a$export$fe3c86b74e15d5de = function(t, e) {
    $af790ba5c087de3a$var$M(function(e) {
        var n = function(t) {
            var e = {
                timeToFirstByte: 0,
                firstByteToFCP: t.value,
                loadState: $af790ba5c087de3a$var$i($af790ba5c087de3a$var$u())
            };
            if (t.entries.length) {
                var n = $af790ba5c087de3a$var$r(), a = t.entries[t.entries.length - 1];
                if (n) {
                    var o = n.activationStart || 0, c = Math.max(0, n.responseStart - o);
                    e = {
                        timeToFirstByte: c,
                        firstByteToFCP: t.value - c,
                        loadState: $af790ba5c087de3a$var$i(t.entries[0].startTime),
                        navigationEntry: n,
                        fcpEntry: a
                    };
                }
            }
            return Object.assign(t, {
                attribution: e
            });
        }(e);
        t(n);
    }, e);
}, $af790ba5c087de3a$var$I = 0, $af790ba5c087de3a$var$k = 1 / 0, $af790ba5c087de3a$var$A = 0, $af790ba5c087de3a$var$F = function(t) {
    t.forEach(function(t) {
        t.interactionId && ($af790ba5c087de3a$var$k = Math.min($af790ba5c087de3a$var$k, t.interactionId), $af790ba5c087de3a$var$A = Math.max($af790ba5c087de3a$var$A, t.interactionId), $af790ba5c087de3a$var$I = $af790ba5c087de3a$var$A ? ($af790ba5c087de3a$var$A - $af790ba5c087de3a$var$k) / 7 + 1 : 0);
    });
}, $af790ba5c087de3a$var$P = function() {
    "interactionCount" in performance || $af790ba5c087de3a$var$t || ($af790ba5c087de3a$var$t = $af790ba5c087de3a$var$l("event", $af790ba5c087de3a$var$F, {
        type: "event",
        buffered: !0,
        durationThreshold: 0
    }));
}, $af790ba5c087de3a$var$B = [], $af790ba5c087de3a$var$O = new Map, $af790ba5c087de3a$var$R = 0, $af790ba5c087de3a$var$j = function() {
    return ($af790ba5c087de3a$var$t ? $af790ba5c087de3a$var$I : performance.interactionCount || 0) - $af790ba5c087de3a$var$R;
}, $af790ba5c087de3a$var$q = [], $af790ba5c087de3a$var$H = function(t) {
    if ($af790ba5c087de3a$var$q.forEach(function(e) {
        return e(t);
    }), t.interactionId || "first-input" === t.entryType) {
        var e = $af790ba5c087de3a$var$B[$af790ba5c087de3a$var$B.length - 1], n = $af790ba5c087de3a$var$O.get(t.interactionId);
        if (n || $af790ba5c087de3a$var$B.length < 10 || t.duration > e.latency) {
            if (n) t.duration > n.latency ? (n.entries = [
                t
            ], n.latency = t.duration) : t.duration === n.latency && t.startTime === n.entries[0].startTime && n.entries.push(t);
            else {
                var r = {
                    id: t.interactionId,
                    latency: t.duration,
                    entries: [
                        t
                    ]
                };
                $af790ba5c087de3a$var$O.set(r.id, r), $af790ba5c087de3a$var$B.push(r);
            }
            $af790ba5c087de3a$var$B.sort(function(t, e) {
                return e.latency - t.latency;
            }), $af790ba5c087de3a$var$B.length > 10 && $af790ba5c087de3a$var$B.splice(10).forEach(function(t) {
                return $af790ba5c087de3a$var$O.delete(t.id);
            });
        }
    }
}, $af790ba5c087de3a$var$N = function(t) {
    var e = self.requestIdleCallback || self.setTimeout, n = -1;
    return t = $af790ba5c087de3a$var$g(t), "hidden" === document.visibilityState ? t() : (n = e(t), $af790ba5c087de3a$var$v(t)), n;
}, $af790ba5c087de3a$export$7f4cb060ded9173c = [
    200,
    500
], $af790ba5c087de3a$var$z = function(t, e) {
    "PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (e = e || {}, $af790ba5c087de3a$var$L(function() {
        var n;
        $af790ba5c087de3a$var$P();
        var r, i = $af790ba5c087de3a$var$d("INP"), a = function(t) {
            $af790ba5c087de3a$var$N(function() {
                t.forEach($af790ba5c087de3a$var$H);
                var e, n = (e = Math.min($af790ba5c087de3a$var$B.length - 1, Math.floor($af790ba5c087de3a$var$j() / 50)), $af790ba5c087de3a$var$B[e]);
                n && n.latency !== i.value && (i.value = n.latency, i.entries = n.entries, r());
            });
        }, o = $af790ba5c087de3a$var$l("event", a, {
            durationThreshold: null !== (n = e.durationThreshold) && void 0 !== n ? n : 40
        });
        r = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$7f4cb060ded9173c, e.reportAllChanges), o && (o.observe({
            type: "first-input",
            buffered: !0
        }), $af790ba5c087de3a$var$v(function() {
            a(o.takeRecords()), r(!0);
        }), $af790ba5c087de3a$var$s(function() {
            $af790ba5c087de3a$var$R = 0, $af790ba5c087de3a$var$B.length = 0, $af790ba5c087de3a$var$O.clear(), i = $af790ba5c087de3a$var$d("INP"), r = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$7f4cb060ded9173c, e.reportAllChanges);
        }));
    }));
}, $af790ba5c087de3a$var$U = [], $af790ba5c087de3a$var$V = [], $af790ba5c087de3a$var$_ = new WeakMap, $af790ba5c087de3a$var$G = new Map, $af790ba5c087de3a$var$J = -1, $af790ba5c087de3a$var$K = function(t) {
    $af790ba5c087de3a$var$U = $af790ba5c087de3a$var$U.concat(t), $af790ba5c087de3a$var$Q();
}, $af790ba5c087de3a$var$Q = function() {
    $af790ba5c087de3a$var$J < 0 && ($af790ba5c087de3a$var$J = $af790ba5c087de3a$var$N($af790ba5c087de3a$var$X));
}, $af790ba5c087de3a$var$X = function() {
    $af790ba5c087de3a$var$G.size > 10 && $af790ba5c087de3a$var$G.forEach(function(t, e) {
        $af790ba5c087de3a$var$O.has(e) || $af790ba5c087de3a$var$G.delete(e);
    });
    var t = $af790ba5c087de3a$var$B.map(function(t) {
        return $af790ba5c087de3a$var$_.get(t.entries[0]);
    }), e = $af790ba5c087de3a$var$V.length - 50;
    $af790ba5c087de3a$var$V = $af790ba5c087de3a$var$V.filter(function(n, r) {
        return r >= e || t.includes(n);
    });
    for(var r = new Set, i = 0; i < $af790ba5c087de3a$var$V.length; i++){
        var a = $af790ba5c087de3a$var$V[i];
        $af790ba5c087de3a$var$et(a.startTime, a.processingEnd).forEach(function(t) {
            r.add(t);
        });
    }
    for(var o = 0; o < 50; o++){
        var c = $af790ba5c087de3a$var$U[$af790ba5c087de3a$var$U.length - 1 - o];
        if (!c || c.startTime < $af790ba5c087de3a$var$n) break;
        r.add(c);
    }
    $af790ba5c087de3a$var$U = Array.from(r), $af790ba5c087de3a$var$J = -1;
};
$af790ba5c087de3a$var$q.push(function(t) {
    t.interactionId && t.target && !$af790ba5c087de3a$var$G.has(t.interactionId) && $af790ba5c087de3a$var$G.set(t.interactionId, t.target);
}, function(t) {
    var e, r = t.startTime + t.duration;
    $af790ba5c087de3a$var$n = Math.max($af790ba5c087de3a$var$n, t.processingEnd);
    for(var i = $af790ba5c087de3a$var$V.length - 1; i >= 0; i--){
        var a = $af790ba5c087de3a$var$V[i];
        if (Math.abs(r - a.renderTime) <= 8) {
            (e = a).startTime = Math.min(t.startTime, e.startTime), e.processingStart = Math.min(t.processingStart, e.processingStart), e.processingEnd = Math.max(t.processingEnd, e.processingEnd), e.entries.push(t);
            break;
        }
    }
    e || (e = {
        startTime: t.startTime,
        processingStart: t.processingStart,
        processingEnd: t.processingEnd,
        renderTime: r,
        entries: [
            t
        ]
    }, $af790ba5c087de3a$var$V.push(e)), (t.interactionId || "first-input" === t.entryType) && $af790ba5c087de3a$var$_.set(t, e), $af790ba5c087de3a$var$Q();
});
var $af790ba5c087de3a$var$Y, $af790ba5c087de3a$var$Z, $af790ba5c087de3a$var$$, $af790ba5c087de3a$var$tt, $af790ba5c087de3a$var$et = function(t, e) {
    for(var n, r = [], i = 0; n = $af790ba5c087de3a$var$U[i]; i++)if (!(n.startTime + n.duration < t)) {
        if (n.startTime > e) break;
        r.push(n);
    }
    return r;
}, $af790ba5c087de3a$export$7df4b36ecaed99e1 = function(t, n) {
    $af790ba5c087de3a$var$e || ($af790ba5c087de3a$var$e = $af790ba5c087de3a$var$l("long-animation-frame", $af790ba5c087de3a$var$K)), $af790ba5c087de3a$var$z(function(e) {
        var n = function(t) {
            var e = t.entries[0], n = $af790ba5c087de3a$var$_.get(e), r = e.processingStart, a = n.processingEnd, c = n.entries.sort(function(t, e) {
                return t.processingStart - e.processingStart;
            }), u = $af790ba5c087de3a$var$et(e.startTime, a), s = t.entries.find(function(t) {
                return t.target;
            }), f = s && s.target || $af790ba5c087de3a$var$G.get(e.interactionId), d = [
                e.startTime + e.duration,
                a
            ].concat(u.map(function(t) {
                return t.startTime + t.duration;
            })), l = Math.max.apply(Math, d), m = {
                interactionTarget: $af790ba5c087de3a$var$o(f),
                interactionTargetElement: f,
                interactionType: e.name.startsWith("key") ? "keyboard" : "pointer",
                interactionTime: e.startTime,
                nextPaintTime: l,
                processedEventEntries: c,
                longAnimationFrameEntries: u,
                inputDelay: r - e.startTime,
                processingDuration: a - r,
                presentationDelay: Math.max(l - a, 0),
                loadState: $af790ba5c087de3a$var$i(e.startTime)
            };
            return Object.assign(t, {
                attribution: m
            });
        }(e);
        t(n);
    }, n);
}, $af790ba5c087de3a$export$948521ca5b0e1b17 = [
    2500,
    4e3
], $af790ba5c087de3a$var$it = {}, $af790ba5c087de3a$export$947b1626ab8d5632 = function(t, e) {
    !function(t, e) {
        e = e || {}, $af790ba5c087de3a$var$L(function() {
            var n, r = $af790ba5c087de3a$var$b(), i = $af790ba5c087de3a$var$d("LCP"), a = function(t) {
                e.reportAllChanges || (t = t.slice(-1)), t.forEach(function(t) {
                    t.startTime < r.firstHiddenTime && (i.value = Math.max(t.startTime - $af790ba5c087de3a$var$f(), 0), i.entries = [
                        t
                    ], n());
                });
            }, o = $af790ba5c087de3a$var$l("largest-contentful-paint", a);
            if (o) {
                n = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$948521ca5b0e1b17, e.reportAllChanges);
                var c = $af790ba5c087de3a$var$g(function() {
                    $af790ba5c087de3a$var$it[i.id] || (a(o.takeRecords()), o.disconnect(), $af790ba5c087de3a$var$it[i.id] = !0, n(!0));
                });
                [
                    "keydown",
                    "click"
                ].forEach(function(t) {
                    addEventListener(t, function() {
                        return $af790ba5c087de3a$var$N(c);
                    }, !0);
                }), $af790ba5c087de3a$var$v(c), $af790ba5c087de3a$var$s(function(r) {
                    i = $af790ba5c087de3a$var$d("LCP"), n = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$948521ca5b0e1b17, e.reportAllChanges), $af790ba5c087de3a$var$p(function() {
                        i.value = performance.now() - r.timeStamp, $af790ba5c087de3a$var$it[i.id] = !0, n(!0);
                    });
                });
            }
        });
    }(function(e) {
        var n = function(t) {
            var e = {
                timeToFirstByte: 0,
                resourceLoadDelay: 0,
                resourceLoadDuration: 0,
                elementRenderDelay: t.value
            };
            if (t.entries.length) {
                var n = $af790ba5c087de3a$var$r();
                if (n) {
                    var i = n.activationStart || 0, a = t.entries[t.entries.length - 1], c = a.url && performance.getEntriesByType("resource").filter(function(t) {
                        return t.name === a.url;
                    })[0], u = Math.max(0, n.responseStart - i), s = Math.max(u, c ? (c.requestStart || c.startTime) - i : 0), f = Math.max(s, c ? c.responseEnd - i : 0), d = Math.max(f, a.startTime - i);
                    e = {
                        element: $af790ba5c087de3a$var$o(a.element),
                        timeToFirstByte: u,
                        resourceLoadDelay: s - u,
                        resourceLoadDuration: f - s,
                        elementRenderDelay: d - f,
                        navigationEntry: n,
                        lcpEntry: a
                    }, a.url && (e.url = a.url), c && (e.lcpResourceEntry = c);
                }
            }
            return Object.assign(t, {
                attribution: e
            });
        }(e);
        t(n);
    }, e);
}, $af790ba5c087de3a$export$65c59ea8064668fc = [
    800,
    1800
], $af790ba5c087de3a$var$ct = function t(e) {
    document.prerendering ? $af790ba5c087de3a$var$L(function() {
        return t(e);
    }) : "complete" !== document.readyState ? addEventListener("load", function() {
        return t(e);
    }, !0) : setTimeout(e, 0);
}, $af790ba5c087de3a$var$ut = function(t, e) {
    e = e || {};
    var n = $af790ba5c087de3a$var$d("TTFB"), i = $af790ba5c087de3a$var$m(t, n, $af790ba5c087de3a$export$65c59ea8064668fc, e.reportAllChanges);
    $af790ba5c087de3a$var$ct(function() {
        var a = $af790ba5c087de3a$var$r();
        a && (n.value = Math.max(a.responseStart - $af790ba5c087de3a$var$f(), 0), n.entries = [
            a
        ], i(!0), $af790ba5c087de3a$var$s(function() {
            n = $af790ba5c087de3a$var$d("TTFB", 0), (i = $af790ba5c087de3a$var$m(t, n, $af790ba5c087de3a$export$65c59ea8064668fc, e.reportAllChanges))(!0);
        }));
    });
}, $af790ba5c087de3a$export$33a01e6c5f2c7e33 = function(t, e) {
    $af790ba5c087de3a$var$ut(function(e) {
        var n = function(t) {
            var e = {
                waitingDuration: 0,
                cacheDuration: 0,
                dnsDuration: 0,
                connectionDuration: 0,
                requestDuration: 0
            };
            if (t.entries.length) {
                var n = t.entries[0], r = n.activationStart || 0, i = Math.max((n.workerStart || n.fetchStart) - r, 0), a = Math.max(n.domainLookupStart - r, 0), o = Math.max(n.connectStart - r, 0), c = Math.max(n.connectEnd - r, 0);
                e = {
                    waitingDuration: i,
                    cacheDuration: a - i,
                    dnsDuration: o - a,
                    connectionDuration: c - o,
                    requestDuration: t.value - c,
                    navigationEntry: n
                };
            }
            return Object.assign(t, {
                attribution: e
            });
        }(e);
        t(n);
    }, e);
}, $af790ba5c087de3a$var$ft = {
    passive: !0,
    capture: !0
}, $af790ba5c087de3a$var$dt = new Date, $af790ba5c087de3a$var$lt = function(t, e) {
    $af790ba5c087de3a$var$Y || ($af790ba5c087de3a$var$Y = e, $af790ba5c087de3a$var$Z = t, $af790ba5c087de3a$var$$ = new Date, $af790ba5c087de3a$var$vt(removeEventListener), $af790ba5c087de3a$var$mt());
}, $af790ba5c087de3a$var$mt = function() {
    if ($af790ba5c087de3a$var$Z >= 0 && $af790ba5c087de3a$var$Z < $af790ba5c087de3a$var$$ - $af790ba5c087de3a$var$dt) {
        var t = {
            entryType: "first-input",
            name: $af790ba5c087de3a$var$Y.type,
            target: $af790ba5c087de3a$var$Y.target,
            cancelable: $af790ba5c087de3a$var$Y.cancelable,
            startTime: $af790ba5c087de3a$var$Y.timeStamp,
            processingStart: $af790ba5c087de3a$var$Y.timeStamp + $af790ba5c087de3a$var$Z
        };
        $af790ba5c087de3a$var$tt.forEach(function(e) {
            e(t);
        }), $af790ba5c087de3a$var$tt = [];
    }
}, $af790ba5c087de3a$var$pt = function(t) {
    if (t.cancelable) {
        var e = (t.timeStamp > 1e12 ? new Date : performance.now()) - t.timeStamp;
        "pointerdown" == t.type ? function(t, e) {
            var n = function() {
                $af790ba5c087de3a$var$lt(t, e), i();
            }, r = function() {
                i();
            }, i = function() {
                removeEventListener("pointerup", n, $af790ba5c087de3a$var$ft), removeEventListener("pointercancel", r, $af790ba5c087de3a$var$ft);
            };
            addEventListener("pointerup", n, $af790ba5c087de3a$var$ft), addEventListener("pointercancel", r, $af790ba5c087de3a$var$ft);
        }(e, t) : $af790ba5c087de3a$var$lt(e, t);
    }
}, $af790ba5c087de3a$var$vt = function(t) {
    [
        "mousedown",
        "keydown",
        "touchstart",
        "pointerdown"
    ].forEach(function(e) {
        return t(e, $af790ba5c087de3a$var$pt, $af790ba5c087de3a$var$ft);
    });
}, $af790ba5c087de3a$export$8f7f3c48ca6fbe34 = [
    100,
    300
], $af790ba5c087de3a$var$ht = function(t, e) {
    e = e || {}, $af790ba5c087de3a$var$L(function() {
        var n, r = $af790ba5c087de3a$var$b(), i = $af790ba5c087de3a$var$d("FID"), a = function(t) {
            t.startTime < r.firstHiddenTime && (i.value = t.processingStart - t.startTime, i.entries.push(t), n(!0));
        }, o = function(t) {
            t.forEach(a);
        }, c = $af790ba5c087de3a$var$l("first-input", o);
        n = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$8f7f3c48ca6fbe34, e.reportAllChanges), c && ($af790ba5c087de3a$var$v($af790ba5c087de3a$var$g(function() {
            o(c.takeRecords()), c.disconnect();
        })), $af790ba5c087de3a$var$s(function() {
            var r;
            i = $af790ba5c087de3a$var$d("FID"), n = $af790ba5c087de3a$var$m(t, i, $af790ba5c087de3a$export$8f7f3c48ca6fbe34, e.reportAllChanges), $af790ba5c087de3a$var$tt = [], $af790ba5c087de3a$var$Z = -1, $af790ba5c087de3a$var$Y = null, $af790ba5c087de3a$var$vt(addEventListener), r = a, $af790ba5c087de3a$var$tt.push(r), $af790ba5c087de3a$var$mt();
        }));
    });
}, $af790ba5c087de3a$export$39705a25c49af873 = function(t, e) {
    $af790ba5c087de3a$var$ht(function(e) {
        var n = function(t) {
            var e = t.entries[0], n = {
                eventTarget: $af790ba5c087de3a$var$o(e.target),
                eventType: e.name,
                eventTime: e.startTime,
                eventEntry: e,
                loadState: $af790ba5c087de3a$var$i(e.startTime)
            };
            return Object.assign(t, {
                attribution: n
            });
        }(e);
        t(n);
    }, e);
};

});


parcelRegister("3ZrsG", function(module, exports) {
"use strict";
function $2e7c5eeb38eeb049$var$isFunction(funktion) {
    return typeof funktion === "function";
}
// Default to complaining loudly when things don't go according to plan.
var $2e7c5eeb38eeb049$var$logger = console.error.bind(console);
// Sets a property on an object, preserving its enumerability.
// This function assumes that the property is already writable.
function $2e7c5eeb38eeb049$var$defineProperty(obj, name, value) {
    var enumerable = !!obj[name] && obj.propertyIsEnumerable(name);
    Object.defineProperty(obj, name, {
        configurable: true,
        enumerable: enumerable,
        writable: true,
        value: value
    });
}
// Keep initialization idempotent.
function $2e7c5eeb38eeb049$var$shimmer(options) {
    if (options && options.logger) {
        if (!$2e7c5eeb38eeb049$var$isFunction(options.logger)) $2e7c5eeb38eeb049$var$logger("new logger isn't a function, not replacing");
        else $2e7c5eeb38eeb049$var$logger = options.logger;
    }
}
function $2e7c5eeb38eeb049$var$wrap(nodule, name, wrapper) {
    if (!nodule || !nodule[name]) {
        $2e7c5eeb38eeb049$var$logger("no original function " + name + " to wrap");
        return;
    }
    if (!wrapper) {
        $2e7c5eeb38eeb049$var$logger("no wrapper function");
        $2e7c5eeb38eeb049$var$logger(new Error().stack);
        return;
    }
    if (!$2e7c5eeb38eeb049$var$isFunction(nodule[name]) || !$2e7c5eeb38eeb049$var$isFunction(wrapper)) {
        $2e7c5eeb38eeb049$var$logger("original object and wrapper must be functions");
        return;
    }
    var original = nodule[name];
    var wrapped = wrapper(original, name);
    $2e7c5eeb38eeb049$var$defineProperty(wrapped, "__original", original);
    $2e7c5eeb38eeb049$var$defineProperty(wrapped, "__unwrap", function() {
        if (nodule[name] === wrapped) $2e7c5eeb38eeb049$var$defineProperty(nodule, name, original);
    });
    $2e7c5eeb38eeb049$var$defineProperty(wrapped, "__wrapped", true);
    $2e7c5eeb38eeb049$var$defineProperty(nodule, name, wrapped);
    return wrapped;
}
function $2e7c5eeb38eeb049$var$massWrap(nodules, names, wrapper) {
    if (!nodules) {
        $2e7c5eeb38eeb049$var$logger("must provide one or more modules to patch");
        $2e7c5eeb38eeb049$var$logger(new Error().stack);
        return;
    } else if (!Array.isArray(nodules)) nodules = [
        nodules
    ];
    if (!(names && Array.isArray(names))) {
        $2e7c5eeb38eeb049$var$logger("must provide one or more functions to wrap on modules");
        return;
    }
    nodules.forEach(function(nodule) {
        names.forEach(function(name) {
            $2e7c5eeb38eeb049$var$wrap(nodule, name, wrapper);
        });
    });
}
function $2e7c5eeb38eeb049$var$unwrap(nodule, name) {
    if (!nodule || !nodule[name]) {
        $2e7c5eeb38eeb049$var$logger("no function to unwrap.");
        $2e7c5eeb38eeb049$var$logger(new Error().stack);
        return;
    }
    if (!nodule[name].__unwrap) $2e7c5eeb38eeb049$var$logger("no original to unwrap to -- has " + name + " already been unwrapped?");
    else return nodule[name].__unwrap();
}
function $2e7c5eeb38eeb049$var$massUnwrap(nodules, names) {
    if (!nodules) {
        $2e7c5eeb38eeb049$var$logger("must provide one or more modules to patch");
        $2e7c5eeb38eeb049$var$logger(new Error().stack);
        return;
    } else if (!Array.isArray(nodules)) nodules = [
        nodules
    ];
    if (!(names && Array.isArray(names))) {
        $2e7c5eeb38eeb049$var$logger("must provide one or more functions to unwrap on modules");
        return;
    }
    nodules.forEach(function(nodule) {
        names.forEach(function(name) {
            $2e7c5eeb38eeb049$var$unwrap(nodule, name);
        });
    });
}
$2e7c5eeb38eeb049$var$shimmer.wrap = $2e7c5eeb38eeb049$var$wrap;
$2e7c5eeb38eeb049$var$shimmer.massWrap = $2e7c5eeb38eeb049$var$massWrap;
$2e7c5eeb38eeb049$var$shimmer.unwrap = $2e7c5eeb38eeb049$var$unwrap;
$2e7c5eeb38eeb049$var$shimmer.massUnwrap = $2e7c5eeb38eeb049$var$massUnwrap;
module.exports = $2e7c5eeb38eeb049$var$shimmer;

});



var $1ac2b3a10e272555$exports = {};
"use strict";
var $1ac2b3a10e272555$var$__createBinding = $1ac2b3a10e272555$exports && $1ac2b3a10e272555$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $1ac2b3a10e272555$var$__exportStar = $1ac2b3a10e272555$exports && $1ac2b3a10e272555$exports.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) $1ac2b3a10e272555$var$__createBinding(exports1, m, p);
};
Object.defineProperty($1ac2b3a10e272555$exports, "__esModule", {
    value: true
});

$1ac2b3a10e272555$var$__exportStar((parcelRequire("76YNT")), $1ac2b3a10e272555$exports);

$1ac2b3a10e272555$var$__exportStar((parcelRequire("5ztjy")), $1ac2b3a10e272555$exports);

$1ac2b3a10e272555$var$__exportStar((parcelRequire("okhup")), $1ac2b3a10e272555$exports);


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $hfZRB = parcelRequire("hfZRB");
var $4tmHU = parcelRequire("4tmHU");
var $ibuLL = parcelRequire("ibuLL");
var $cE6pj = parcelRequire("cE6pj");

var $lzSn1 = parcelRequire("lzSn1");
var $3FLWz = parcelRequire("3FLWz");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $4485e1475008eb40$export$74be52df2d6fd28c;
(function(PerformanceTimingNames) {
    PerformanceTimingNames["CONNECT_END"] = "connectEnd";
    PerformanceTimingNames["CONNECT_START"] = "connectStart";
    PerformanceTimingNames["DECODED_BODY_SIZE"] = "decodedBodySize";
    PerformanceTimingNames["DOM_COMPLETE"] = "domComplete";
    PerformanceTimingNames["DOM_CONTENT_LOADED_EVENT_END"] = "domContentLoadedEventEnd";
    PerformanceTimingNames["DOM_CONTENT_LOADED_EVENT_START"] = "domContentLoadedEventStart";
    PerformanceTimingNames["DOM_INTERACTIVE"] = "domInteractive";
    PerformanceTimingNames["DOMAIN_LOOKUP_END"] = "domainLookupEnd";
    PerformanceTimingNames["DOMAIN_LOOKUP_START"] = "domainLookupStart";
    PerformanceTimingNames["ENCODED_BODY_SIZE"] = "encodedBodySize";
    PerformanceTimingNames["FETCH_START"] = "fetchStart";
    PerformanceTimingNames["LOAD_EVENT_END"] = "loadEventEnd";
    PerformanceTimingNames["LOAD_EVENT_START"] = "loadEventStart";
    PerformanceTimingNames["NAVIGATION_START"] = "navigationStart";
    PerformanceTimingNames["REDIRECT_END"] = "redirectEnd";
    PerformanceTimingNames["REDIRECT_START"] = "redirectStart";
    PerformanceTimingNames["REQUEST_START"] = "requestStart";
    PerformanceTimingNames["RESPONSE_END"] = "responseEnd";
    PerformanceTimingNames["RESPONSE_START"] = "responseStart";
    PerformanceTimingNames["SECURE_CONNECTION_START"] = "secureConnectionStart";
    PerformanceTimingNames["UNLOAD_EVENT_END"] = "unloadEventEnd";
    PerformanceTimingNames["UNLOAD_EVENT_START"] = "unloadEventStart";
})($4485e1475008eb40$export$74be52df2d6fd28c || ($4485e1475008eb40$export$74be52df2d6fd28c = {}));



var $hTf1k = parcelRequire("hTf1k");var $d841c88136dbe83b$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
function $d841c88136dbe83b$export$c2a944331f80ae92(url, urlToMatch) {
    if (typeof urlToMatch === "string") return url === urlToMatch;
    else return !!url.match(urlToMatch);
}
function $d841c88136dbe83b$export$172b5a1c42a6f83d(url, ignoredUrls) {
    var e_1, _a;
    if (!ignoredUrls) return false;
    try {
        for(var ignoredUrls_1 = $d841c88136dbe83b$var$__values(ignoredUrls), ignoredUrls_1_1 = ignoredUrls_1.next(); !ignoredUrls_1_1.done; ignoredUrls_1_1 = ignoredUrls_1.next()){
            var ignoreUrl = ignoredUrls_1_1.value;
            if ($d841c88136dbe83b$export$c2a944331f80ae92(url, ignoreUrl)) return true;
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (ignoredUrls_1_1 && !ignoredUrls_1_1.done && (_a = ignoredUrls_1.return)) _a.call(ignoredUrls_1);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    return false;
}



var $3Bhxa = parcelRequire("3Bhxa");
// Used to normalize relative URLs
var $79aec9cc23f983ad$var$urlNormalizingAnchor;
function $79aec9cc23f983ad$var$getUrlNormalizingAnchor() {
    if (!$79aec9cc23f983ad$var$urlNormalizingAnchor) $79aec9cc23f983ad$var$urlNormalizingAnchor = document.createElement("a");
    return $79aec9cc23f983ad$var$urlNormalizingAnchor;
}
function $79aec9cc23f983ad$export$94df19ecb868bc1a(obj, key) {
    return key in obj;
}
function $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, performanceName, entries, refPerfName) {
    var perfTime = undefined;
    var refTime = undefined;
    if ($79aec9cc23f983ad$export$94df19ecb868bc1a(entries, performanceName) && typeof entries[performanceName] === "number") perfTime = entries[performanceName];
    var refName = refPerfName || (0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START;
    // Use a reference time which is the earliest possible value so that the performance timings that are earlier should not be added
    // using FETCH START time in case no reference is provided
    if ($79aec9cc23f983ad$export$94df19ecb868bc1a(entries, refName) && typeof entries[refName] === "number") refTime = entries[refName];
    if (perfTime !== undefined && refTime !== undefined && perfTime >= refTime) {
        span.addEvent(performanceName, perfTime);
        return span;
    }
    return undefined;
}
function $79aec9cc23f983ad$export$e2385716cf129455(span, resource) {
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START, resource);
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).DOMAIN_LOOKUP_START, resource);
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).DOMAIN_LOOKUP_END, resource);
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).CONNECT_START, resource);
    if ($79aec9cc23f983ad$export$94df19ecb868bc1a(resource, "name") && resource["name"].startsWith("https:")) $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).SECURE_CONNECTION_START, resource);
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).CONNECT_END, resource);
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).REQUEST_START, resource);
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_START, resource);
    $79aec9cc23f983ad$export$7e5e8f17966d37d1(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END, resource);
    var encodedLength = resource[(0, $4485e1475008eb40$export$74be52df2d6fd28c).ENCODED_BODY_SIZE];
    if (encodedLength !== undefined) span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH), encodedLength);
    var decodedLength = resource[(0, $4485e1475008eb40$export$74be52df2d6fd28c).DECODED_BODY_SIZE];
    // Spec: Not set if transport encoding not used (in which case encoded and decoded sizes match)
    if (decodedLength !== undefined && encodedLength !== decodedLength) span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED), decodedLength);
}
function $79aec9cc23f983ad$export$5d17283e524de23c(filteredResources) {
    return filteredResources.slice().sort(function(a, b) {
        var valueA = a[(0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START];
        var valueB = b[(0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START];
        if (valueA > valueB) return 1;
        else if (valueA < valueB) return -1;
        return 0;
    });
}
/** Returns the origin if present (if in browser context). */ function $79aec9cc23f983ad$var$getOrigin() {
    return typeof location !== "undefined" ? location.origin : undefined;
}
function $79aec9cc23f983ad$export$cdcba7438a7553e8(spanUrl, startTimeHR, endTimeHR, resources, ignoredResources, initiatorType) {
    if (ignoredResources === void 0) ignoredResources = new WeakSet();
    // de-relativize the URL before usage (does no harm to absolute URLs)
    var parsedSpanUrl = $79aec9cc23f983ad$export$7a5253c0f62e0150(spanUrl);
    spanUrl = parsedSpanUrl.toString();
    var filteredResources = $79aec9cc23f983ad$var$filterResourcesForSpan(spanUrl, startTimeHR, endTimeHR, resources, ignoredResources, initiatorType);
    if (filteredResources.length === 0) return {
        mainRequest: undefined
    };
    if (filteredResources.length === 1) return {
        mainRequest: filteredResources[0]
    };
    var sorted = $79aec9cc23f983ad$export$5d17283e524de23c(filteredResources);
    if (parsedSpanUrl.origin !== $79aec9cc23f983ad$var$getOrigin() && sorted.length > 1) {
        var corsPreFlightRequest = sorted[0];
        var mainRequest = $79aec9cc23f983ad$var$findMainRequest(sorted, corsPreFlightRequest[(0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END], endTimeHR);
        var responseEnd = corsPreFlightRequest[(0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END];
        var fetchStart = mainRequest[(0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START];
        // no corsPreFlightRequest
        if (fetchStart < responseEnd) {
            mainRequest = corsPreFlightRequest;
            corsPreFlightRequest = undefined;
        }
        return {
            corsPreFlightRequest: corsPreFlightRequest,
            mainRequest: mainRequest
        };
    } else return {
        mainRequest: filteredResources[0]
    };
}
/**
 * Will find the main request skipping the cors pre flight requests
 * @param resources
 * @param corsPreFlightRequestEndTime
 * @param spanEndTimeHR
 */ function $79aec9cc23f983ad$var$findMainRequest(resources, corsPreFlightRequestEndTime, spanEndTimeHR) {
    var spanEndTime = (0, $hTf1k.hrTimeToNanoseconds)(spanEndTimeHR);
    var minTime = (0, $hTf1k.hrTimeToNanoseconds)((0, $hTf1k.timeInputToHrTime)(corsPreFlightRequestEndTime));
    var mainRequest = resources[1];
    var bestGap;
    var length = resources.length;
    for(var i = 1; i < length; i++){
        var resource = resources[i];
        var resourceStartTime = (0, $hTf1k.hrTimeToNanoseconds)((0, $hTf1k.timeInputToHrTime)(resource[(0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START]));
        var resourceEndTime = (0, $hTf1k.hrTimeToNanoseconds)((0, $hTf1k.timeInputToHrTime)(resource[(0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END]));
        var currentGap = spanEndTime - resourceEndTime;
        if (resourceStartTime >= minTime && (!bestGap || currentGap < bestGap)) {
            bestGap = currentGap;
            mainRequest = resource;
        }
    }
    return mainRequest;
}
/**
 * Filter all resources that has started and finished according to span start time and end time.
 *     It will return the closest resource to a start time
 * @param spanUrl
 * @param startTimeHR
 * @param endTimeHR
 * @param resources
 * @param ignoredResources
 */ function $79aec9cc23f983ad$var$filterResourcesForSpan(spanUrl, startTimeHR, endTimeHR, resources, ignoredResources, initiatorType) {
    var startTime = (0, $hTf1k.hrTimeToNanoseconds)(startTimeHR);
    var endTime = (0, $hTf1k.hrTimeToNanoseconds)(endTimeHR);
    var filteredResources = resources.filter(function(resource) {
        var resourceStartTime = (0, $hTf1k.hrTimeToNanoseconds)((0, $hTf1k.timeInputToHrTime)(resource[(0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START]));
        var resourceEndTime = (0, $hTf1k.hrTimeToNanoseconds)((0, $hTf1k.timeInputToHrTime)(resource[(0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END]));
        return resource.initiatorType.toLowerCase() === (initiatorType || "xmlhttprequest") && resource.name === spanUrl && resourceStartTime >= startTime && resourceEndTime <= endTime;
    });
    if (filteredResources.length > 0) filteredResources = filteredResources.filter(function(resource) {
        return !ignoredResources.has(resource);
    });
    return filteredResources;
}
function $79aec9cc23f983ad$export$7a5253c0f62e0150(url) {
    if (typeof URL === "function") return new URL(url, typeof document !== "undefined" ? document.baseURI : typeof location !== "undefined" // Some JS runtimes (e.g. Deno) don't define this
     ? location.href : undefined);
    var element = $79aec9cc23f983ad$var$getUrlNormalizingAnchor();
    element.href = url;
    return element;
}
function $79aec9cc23f983ad$export$6535eb414fa2c8b6(url) {
    var urlLike = $79aec9cc23f983ad$export$7a5253c0f62e0150(url);
    return urlLike.href;
}
function $79aec9cc23f983ad$export$fabdebd274ccbd1c(target, optimised) {
    if (target.nodeType === Node.DOCUMENT_NODE) return "/";
    var targetValue = $79aec9cc23f983ad$var$getNodeValue(target, optimised);
    if (optimised && targetValue.indexOf("@id") > 0) return targetValue;
    var xpath = "";
    if (target.parentNode) xpath += $79aec9cc23f983ad$export$fabdebd274ccbd1c(target.parentNode, false);
    xpath += targetValue;
    return xpath;
}
/**
 * get node index within the siblings
 * @param target
 */ function $79aec9cc23f983ad$var$getNodeIndex(target) {
    if (!target.parentNode) return 0;
    var allowedTypes = [
        target.nodeType
    ];
    if (target.nodeType === Node.CDATA_SECTION_NODE) allowedTypes.push(Node.TEXT_NODE);
    var elements = Array.from(target.parentNode.childNodes);
    elements = elements.filter(function(element) {
        var localName = element.localName;
        return allowedTypes.indexOf(element.nodeType) >= 0 && localName === target.localName;
    });
    if (elements.length >= 1) return elements.indexOf(target) + 1; // xpath starts from 1
    // if there are no other similar child xpath doesn't need index
    return 0;
}
/**
 * get node value for xpath
 * @param target
 * @param optimised
 */ function $79aec9cc23f983ad$var$getNodeValue(target, optimised) {
    var nodeType = target.nodeType;
    var index = $79aec9cc23f983ad$var$getNodeIndex(target);
    var nodeValue = "";
    if (nodeType === Node.ELEMENT_NODE) {
        var id = target.getAttribute("id");
        if (optimised && id) return '//*[@id="' + id + '"]';
        nodeValue = target.localName;
    } else if (nodeType === Node.TEXT_NODE || nodeType === Node.CDATA_SECTION_NODE) nodeValue = "text()";
    else if (nodeType === Node.COMMENT_NODE) nodeValue = "comment()";
    else return "";
    // if index is 1 it can be omitted in xpath
    if (nodeValue && index > 1) return "/" + nodeValue + "[" + index + "]";
    return "/" + nodeValue;
}
function $79aec9cc23f983ad$export$c6501d7e56a5b40a(spanUrl, propagateTraceHeaderCorsUrls) {
    var propagateTraceHeaderUrls = propagateTraceHeaderCorsUrls || [];
    if (typeof propagateTraceHeaderUrls === "string" || propagateTraceHeaderUrls instanceof RegExp) propagateTraceHeaderUrls = [
        propagateTraceHeaderUrls
    ];
    var parsedSpanUrl = $79aec9cc23f983ad$export$7a5253c0f62e0150(spanUrl);
    if (parsedSpanUrl.origin === $79aec9cc23f983ad$var$getOrigin()) return true;
    else return propagateTraceHeaderUrls.some(function(propagateTraceHeaderUrl) {
        return (0, $d841c88136dbe83b$export$c2a944331f80ae92)(spanUrl, propagateTraceHeaderUrl);
    });
}


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $ljza4 = parcelRequire("ljza4");
var $7KVqm = parcelRequire("7KVqm");
var $ibuLL = parcelRequire("ibuLL");

var $4uQt8 = parcelRequire("4uQt8");

var $3ZrsG = parcelRequire("3ZrsG");
var $ad1cb4be6c851b19$var$__assign = undefined && undefined.__assign || function() {
    $ad1cb4be6c851b19$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $ad1cb4be6c851b19$var$__assign.apply(this, arguments);
};
/**
 * Base abstract internal class for instrumenting node and web plugins
 */ var $ad1cb4be6c851b19$export$74c31cfd4e541b89 = /** @class */ function() {
    function InstrumentationAbstract(instrumentationName, instrumentationVersion, config) {
        this.instrumentationName = instrumentationName;
        this.instrumentationVersion = instrumentationVersion;
        /* Api to wrap instrumented method */ this._wrap = $3ZrsG.wrap;
        /* Api to unwrap instrumented methods */ this._unwrap = $3ZrsG.unwrap;
        /* Api to mass wrap instrumented method */ this._massWrap = $3ZrsG.massWrap;
        /* Api to mass unwrap instrumented methods */ this._massUnwrap = $3ZrsG.massUnwrap;
        // copy config first level properties to ensure they are immutable.
        // nested properties are not copied, thus are mutable from the outside.
        this._config = $ad1cb4be6c851b19$var$__assign({
            enabled: true
        }, config);
        this._diag = (0, $ljza4.diag).createComponentLogger({
            namespace: instrumentationName
        });
        this._tracer = (0, $ibuLL.trace).getTracer(instrumentationName, instrumentationVersion);
        this._meter = (0, $7KVqm.metrics).getMeter(instrumentationName, instrumentationVersion);
        this._logger = (0, $4uQt8.logs).getLogger(instrumentationName, instrumentationVersion);
        this._updateMetricInstruments();
    }
    Object.defineProperty(InstrumentationAbstract.prototype, "meter", {
        /* Returns meter */ get: function() {
            return this._meter;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets MeterProvider to this plugin
     * @param meterProvider
     */ InstrumentationAbstract.prototype.setMeterProvider = function(meterProvider) {
        this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
        this._updateMetricInstruments();
    };
    Object.defineProperty(InstrumentationAbstract.prototype, "logger", {
        /* Returns logger */ get: function() {
            return this._logger;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets LoggerProvider to this plugin
     * @param loggerProvider
     */ InstrumentationAbstract.prototype.setLoggerProvider = function(loggerProvider) {
        this._logger = loggerProvider.getLogger(this.instrumentationName, this.instrumentationVersion);
    };
    /**
     * @experimental
     *
     * Get module definitions defined by {@link init}.
     * This can be used for experimental compile-time instrumentation.
     *
     * @returns an array of {@link InstrumentationModuleDefinition}
     */ InstrumentationAbstract.prototype.getModuleDefinitions = function() {
        var _a;
        var initResult = (_a = this.init()) !== null && _a !== void 0 ? _a : [];
        if (!Array.isArray(initResult)) return [
            initResult
        ];
        return initResult;
    };
    /**
     * Sets the new metric instruments with the current Meter.
     */ InstrumentationAbstract.prototype._updateMetricInstruments = function() {
        return;
    };
    /* Returns InstrumentationConfig */ InstrumentationAbstract.prototype.getConfig = function() {
        return this._config;
    };
    /**
     * Sets InstrumentationConfig to this plugin
     * @param InstrumentationConfig
     */ InstrumentationAbstract.prototype.setConfig = function(config) {
        // copy config first level properties to ensure they are immutable.
        // nested properties are not copied, thus are mutable from the outside.
        this._config = $ad1cb4be6c851b19$var$__assign({}, config);
    };
    /**
     * Sets TraceProvider to this plugin
     * @param tracerProvider
     */ InstrumentationAbstract.prototype.setTracerProvider = function(tracerProvider) {
        this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
    };
    Object.defineProperty(InstrumentationAbstract.prototype, "tracer", {
        /* Returns tracer */ get: function() {
            return this._tracer;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Execute span customization hook, if configured, and log any errors.
     * Any semantics of the trigger and info are defined by the specific instrumentation.
     * @param hookHandler The optional hook handler which the user has configured via instrumentation config
     * @param triggerName The name of the trigger for executing the hook for logging purposes
     * @param span The span to which the hook should be applied
     * @param info The info object to be passed to the hook, with useful data the hook may use
     */ InstrumentationAbstract.prototype._runSpanCustomizationHook = function(hookHandler, triggerName, span, info) {
        if (!hookHandler) return;
        try {
            hookHandler(span, info);
        } catch (e) {
            this._diag.error("Error running span customization hook due to exception in handler", {
                triggerName: triggerName
            }, e);
        }
    };
    return InstrumentationAbstract;
}();


var $ef8753615ddb495d$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * Base abstract class for instrumenting web plugins
 */ var $ef8753615ddb495d$export$436b1c2bf7e9756b = /** @class */ function(_super) {
    $ef8753615ddb495d$var$__extends(InstrumentationBase, _super);
    function InstrumentationBase(instrumentationName, instrumentationVersion, config) {
        var _this = _super.call(this, instrumentationName, instrumentationVersion, config) || this;
        if (_this._config.enabled) _this.enable();
        return _this;
    }
    return InstrumentationBase;
}((0, $ad1cb4be6c851b19$export$74c31cfd4e541b89));

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $5381fad8f5f1a0cb$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $5381fad8f5f1a0cb$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
function $5381fad8f5f1a0cb$export$fdff7e10f8ca069e(execute, onFinish, preventThrowingError) {
    var error;
    var result;
    try {
        result = execute();
    } catch (e) {
        error = e;
    } finally{
        onFinish(error, result);
        if (error && !preventThrowingError) // eslint-disable-next-line no-unsafe-finally
        throw error;
        // eslint-disable-next-line no-unsafe-finally
        return result;
    }
}
function $5381fad8f5f1a0cb$export$75852fe3c08f1502(execute, onFinish, preventThrowingError) {
    return $5381fad8f5f1a0cb$var$__awaiter(this, void 0, void 0, function() {
        var error, result, e_1;
        return $5381fad8f5f1a0cb$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    _a.trys.push([
                        0,
                        2,
                        3,
                        4
                    ]);
                    return [
                        4 /*yield*/ ,
                        execute()
                    ];
                case 1:
                    result = _a.sent();
                    return [
                        3 /*break*/ ,
                        4
                    ];
                case 2:
                    e_1 = _a.sent();
                    error = e_1;
                    return [
                        3 /*break*/ ,
                        4
                    ];
                case 3:
                    onFinish(error, result);
                    if (error && !preventThrowingError) // eslint-disable-next-line no-unsafe-finally
                    throw error;
                    // eslint-disable-next-line no-unsafe-finally
                    return [
                        2 /*return*/ ,
                        result
                    ];
                case 4:
                    return [
                        2 /*return*/ 
                    ];
            }
        });
    });
}
function $5381fad8f5f1a0cb$export$ec0fd572751979bc(func) {
    return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
}


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $32068f6429bc62b9$export$668754fb61dd076c;
(function(AttributeNames) {
    AttributeNames["DOCUMENT_LOAD"] = "documentLoad";
    AttributeNames["DOCUMENT_FETCH"] = "documentFetch";
    AttributeNames["RESOURCE_FETCH"] = "resourceFetch";
})($32068f6429bc62b9$export$668754fb61dd076c || ($32068f6429bc62b9$export$668754fb61dd076c = {}));


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
var $bcfe5daa8cc612d1$export$4a03ffab3315ee34 = "0.39.0";
var $bcfe5daa8cc612d1$export$b8b9d90f9e5bd72b = "@opentelemetry/instrumentation-document-load";



var $3Bhxa = parcelRequire("3Bhxa");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
var $lzSn1 = parcelRequire("lzSn1");

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $f3b6a865bbc558cf$export$3fd36d65bf762270;
(function(EventNames) {
    EventNames["FIRST_PAINT"] = "firstPaint";
    EventNames["FIRST_CONTENTFUL_PAINT"] = "firstContentfulPaint";
})($f3b6a865bbc558cf$export$3fd36d65bf762270 || ($f3b6a865bbc558cf$export$3fd36d65bf762270 = {}));


var $100cd572f10ce7d8$export$1edb6265ef1ecc26 = function() {
    var _a, _b;
    var entries = {};
    var performanceNavigationTiming = (_b = (_a = (0, $lzSn1.otperformance)).getEntriesByType) === null || _b === void 0 ? void 0 : _b.call(_a, "navigation")[0];
    if (performanceNavigationTiming) {
        var keys = Object.values((0, $4485e1475008eb40$export$74be52df2d6fd28c));
        keys.forEach(function(key) {
            if ((0, $79aec9cc23f983ad$export$94df19ecb868bc1a)(performanceNavigationTiming, key)) {
                var value = performanceNavigationTiming[key];
                if (typeof value === "number") entries[key] = value;
            }
        });
    } else {
        // // fallback to previous version
        var perf = (0, $lzSn1.otperformance);
        var performanceTiming_1 = perf.timing;
        if (performanceTiming_1) {
            var keys = Object.values((0, $4485e1475008eb40$export$74be52df2d6fd28c));
            keys.forEach(function(key) {
                if ((0, $79aec9cc23f983ad$export$94df19ecb868bc1a)(performanceTiming_1, key)) {
                    var value = performanceTiming_1[key];
                    if (typeof value === "number") entries[key] = value;
                }
            });
        }
    }
    return entries;
};
var $100cd572f10ce7d8$var$performancePaintNames = {
    "first-paint": (0, $f3b6a865bbc558cf$export$3fd36d65bf762270).FIRST_PAINT,
    "first-contentful-paint": (0, $f3b6a865bbc558cf$export$3fd36d65bf762270).FIRST_CONTENTFUL_PAINT
};
var $100cd572f10ce7d8$export$dbffc7a51b89acf6 = function(span) {
    var _a, _b;
    var performancePaintTiming = (_b = (_a = (0, $lzSn1.otperformance)).getEntriesByType) === null || _b === void 0 ? void 0 : _b.call(_a, "paint");
    if (performancePaintTiming) performancePaintTiming.forEach(function(_a) {
        var name = _a.name, startTime = _a.startTime;
        if ((0, $79aec9cc23f983ad$export$94df19ecb868bc1a)($100cd572f10ce7d8$var$performancePaintNames, name)) span.addEvent($100cd572f10ce7d8$var$performancePaintNames[name], startTime);
    });
};


var $61e5230b21382ad6$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
/**
 * This class represents a document load plugin
 */ var $61e5230b21382ad6$export$381e8ef2e310d2c3 = /** @class */ function(_super) {
    $61e5230b21382ad6$var$__extends(DocumentLoadInstrumentation, _super);
    /**
     *
     * @param config
     */ function DocumentLoadInstrumentation(config) {
        if (config === void 0) config = {};
        var _this = _super.call(this, (0, $bcfe5daa8cc612d1$export$b8b9d90f9e5bd72b), (0, $bcfe5daa8cc612d1$export$4a03ffab3315ee34), config) || this;
        _this.component = "document-load";
        _this.version = "1";
        _this.moduleName = _this.component;
        return _this;
    }
    DocumentLoadInstrumentation.prototype.init = function() {};
    /**
     * callback to be executed when page is loaded
     */ DocumentLoadInstrumentation.prototype._onDocumentLoaded = function() {
        var _this = this;
        // Timeout is needed as load event doesn't have yet the performance metrics for loadEnd.
        // Support for event "loadend" is very limited and cannot be used
        window.setTimeout(function() {
            _this._collectPerformance();
        });
    };
    /**
     * Adds spans for all resources
     * @param rootSpan
     */ DocumentLoadInstrumentation.prototype._addResourcesSpans = function(rootSpan) {
        var _this = this;
        var _a, _b;
        var resources = (_b = (_a = (0, $lzSn1.otperformance)).getEntriesByType) === null || _b === void 0 ? void 0 : _b.call(_a, "resource");
        if (resources) resources.forEach(function(resource) {
            _this._initResourceSpan(resource, rootSpan);
        });
    };
    /**
     * Collects information about performance and creates appropriate spans
     */ DocumentLoadInstrumentation.prototype._collectPerformance = function() {
        var _this = this;
        var metaElement = Array.from(document.getElementsByTagName("meta")).find(function(e) {
            return e.getAttribute("name") === (0, $3FLWz.TRACE_PARENT_HEADER);
        });
        var entries = (0, $100cd572f10ce7d8$export$1edb6265ef1ecc26)();
        var traceparent = metaElement && metaElement.content || "";
        (0, $hfZRB.context).with((0, $4tmHU.propagation).extract((0, $cE6pj.ROOT_CONTEXT), {
            traceparent: traceparent
        }), function() {
            var _a;
            var rootSpan = _this._startSpan((0, $32068f6429bc62b9$export$668754fb61dd076c).DOCUMENT_LOAD, (0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START, entries);
            if (!rootSpan) return;
            (0, $hfZRB.context).with((0, $ibuLL.trace).setSpan((0, $hfZRB.context).active(), rootSpan), function() {
                var fetchSpan = _this._startSpan((0, $32068f6429bc62b9$export$668754fb61dd076c).DOCUMENT_FETCH, (0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START, entries);
                if (fetchSpan) {
                    fetchSpan.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_URL), location.href);
                    (0, $hfZRB.context).with((0, $ibuLL.trace).setSpan((0, $hfZRB.context).active(), fetchSpan), function() {
                        var _a;
                        if (!_this._getConfig().ignoreNetworkEvents) (0, $79aec9cc23f983ad$export$e2385716cf129455)(fetchSpan, entries);
                        _this._addCustomAttributesOnSpan(fetchSpan, (_a = _this._getConfig().applyCustomAttributesOnSpan) === null || _a === void 0 ? void 0 : _a.documentFetch);
                        _this._endSpan(fetchSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END, entries);
                    });
                }
            });
            rootSpan.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_URL), location.href);
            rootSpan.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_USER_AGENT), navigator.userAgent);
            _this._addResourcesSpans(rootSpan);
            if (!_this._getConfig().ignoreNetworkEvents) {
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).UNLOAD_EVENT_START, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).UNLOAD_EVENT_END, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).DOM_INTERACTIVE, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).DOM_CONTENT_LOADED_EVENT_START, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).DOM_CONTENT_LOADED_EVENT_END, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).DOM_COMPLETE, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).LOAD_EVENT_START, entries);
                (0, $79aec9cc23f983ad$export$7e5e8f17966d37d1)(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).LOAD_EVENT_END, entries);
            }
            if (!_this._getConfig().ignorePerformancePaintEvents) (0, $100cd572f10ce7d8$export$dbffc7a51b89acf6)(rootSpan);
            _this._addCustomAttributesOnSpan(rootSpan, (_a = _this._getConfig().applyCustomAttributesOnSpan) === null || _a === void 0 ? void 0 : _a.documentLoad);
            _this._endSpan(rootSpan, (0, $4485e1475008eb40$export$74be52df2d6fd28c).LOAD_EVENT_END, entries);
        });
    };
    /**
     * Helper function for ending span
     * @param span
     * @param performanceName name of performance entry for time end
     * @param entries
     */ DocumentLoadInstrumentation.prototype._endSpan = function(span, performanceName, entries) {
        // span can be undefined when entries are missing the certain performance - the span will not be created
        if (span) {
            if ((0, $79aec9cc23f983ad$export$94df19ecb868bc1a)(entries, performanceName)) span.end(entries[performanceName]);
            else // just end span
            span.end();
        }
    };
    /**
     * Creates and ends a span with network information about resource added as timed events
     * @param resource
     * @param parentSpan
     */ DocumentLoadInstrumentation.prototype._initResourceSpan = function(resource, parentSpan) {
        var _a;
        var span = this._startSpan((0, $32068f6429bc62b9$export$668754fb61dd076c).RESOURCE_FETCH, (0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START, resource, parentSpan);
        if (span) {
            span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_URL), resource.name);
            if (!this._getConfig().ignoreNetworkEvents) (0, $79aec9cc23f983ad$export$e2385716cf129455)(span, resource);
            this._addCustomAttributesOnResourceSpan(span, resource, (_a = this._getConfig().applyCustomAttributesOnSpan) === null || _a === void 0 ? void 0 : _a.resourceFetch);
            this._endSpan(span, (0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END, resource);
        }
    };
    /**
     * Helper function for starting a span
     * @param spanName name of span
     * @param performanceName name of performance entry for time start
     * @param entries
     * @param parentSpan
     */ DocumentLoadInstrumentation.prototype._startSpan = function(spanName, performanceName, entries, parentSpan) {
        if ((0, $79aec9cc23f983ad$export$94df19ecb868bc1a)(entries, performanceName) && typeof entries[performanceName] === "number") {
            var span = this.tracer.startSpan(spanName, {
                startTime: entries[performanceName]
            }, parentSpan ? (0, $ibuLL.trace).setSpan((0, $hfZRB.context).active(), parentSpan) : undefined);
            return span;
        }
        return undefined;
    };
    /**
     * executes callback {_onDocumentLoaded} when the page is loaded
     */ DocumentLoadInstrumentation.prototype._waitForPageLoad = function() {
        if (window.document.readyState === "complete") this._onDocumentLoaded();
        else {
            this._onDocumentLoaded = this._onDocumentLoaded.bind(this);
            window.addEventListener("load", this._onDocumentLoaded);
        }
    };
    DocumentLoadInstrumentation.prototype._getConfig = function() {
        return this._config;
    };
    /**
     * adds custom attributes to root span if configured
     */ DocumentLoadInstrumentation.prototype._addCustomAttributesOnSpan = function(span, applyCustomAttributesOnSpan) {
        var _this = this;
        if (applyCustomAttributesOnSpan) (0, $5381fad8f5f1a0cb$export$fdff7e10f8ca069e)(function() {
            return applyCustomAttributesOnSpan(span);
        }, function(error) {
            if (!error) return;
            _this._diag.error("addCustomAttributesOnSpan", error);
        }, true);
    };
    /**
     * adds custom attributes to span if configured
     */ DocumentLoadInstrumentation.prototype._addCustomAttributesOnResourceSpan = function(span, resource, applyCustomAttributesOnSpan) {
        var _this = this;
        if (applyCustomAttributesOnSpan) (0, $5381fad8f5f1a0cb$export$fdff7e10f8ca069e)(function() {
            return applyCustomAttributesOnSpan(span, resource);
        }, function(error) {
            if (!error) return;
            _this._diag.error("addCustomAttributesOnResourceSpan", error);
        }, true);
    };
    /**
     * implements enable function
     */ DocumentLoadInstrumentation.prototype.enable = function() {
        // remove previously attached load to avoid adding the same event twice
        // in case of multiple enable calling.
        window.removeEventListener("load", this._onDocumentLoaded);
        this._waitForPageLoad();
    };
    /**
     * implements disable function
     */ DocumentLoadInstrumentation.prototype.disable = function() {
        window.removeEventListener("load", this._onDocumentLoaded);
    };
    return DocumentLoadInstrumentation;
}((0, $ef8753615ddb495d$export$436b1c2bf7e9756b));







/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $hfZRB = parcelRequire("hfZRB");
var $4tmHU = parcelRequire("4tmHU");
var $ibuLL = parcelRequire("ibuLL");
var $h9EcL = parcelRequire("h9EcL");


var $5Nb0V = parcelRequire("5Nb0V");
var $hTf1k = parcelRequire("hTf1k");

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/semantic_conventions/http.md
 */ var $bb570246607e635d$export$668754fb61dd076c;
(function(AttributeNames) {
    AttributeNames["COMPONENT"] = "component";
    AttributeNames["HTTP_ERROR_NAME"] = "http.error_name";
    AttributeNames["HTTP_STATUS_TEXT"] = "http.status_text";
})($bb570246607e635d$export$668754fb61dd076c || ($bb570246607e635d$export$668754fb61dd076c = {}));



var $3Bhxa = parcelRequire("3Bhxa");
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
var $e4172760070e556a$export$a4ad2735b021c132 = "0.52.1";


var $c176d395fa3c7997$exports = {};
// shim for using process in browser
var $c176d395fa3c7997$var$process = $c176d395fa3c7997$exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $c176d395fa3c7997$var$cachedSetTimeout;
var $c176d395fa3c7997$var$cachedClearTimeout;
function $c176d395fa3c7997$var$defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function $c176d395fa3c7997$var$defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") $c176d395fa3c7997$var$cachedSetTimeout = setTimeout;
        else $c176d395fa3c7997$var$cachedSetTimeout = $c176d395fa3c7997$var$defaultSetTimout;
    } catch (e) {
        $c176d395fa3c7997$var$cachedSetTimeout = $c176d395fa3c7997$var$defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") $c176d395fa3c7997$var$cachedClearTimeout = clearTimeout;
        else $c176d395fa3c7997$var$cachedClearTimeout = $c176d395fa3c7997$var$defaultClearTimeout;
    } catch (e) {
        $c176d395fa3c7997$var$cachedClearTimeout = $c176d395fa3c7997$var$defaultClearTimeout;
    }
})();
function $c176d395fa3c7997$var$runTimeout(fun) {
    if ($c176d395fa3c7997$var$cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if (($c176d395fa3c7997$var$cachedSetTimeout === $c176d395fa3c7997$var$defaultSetTimout || !$c176d395fa3c7997$var$cachedSetTimeout) && setTimeout) {
        $c176d395fa3c7997$var$cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $c176d395fa3c7997$var$cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return $c176d395fa3c7997$var$cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return $c176d395fa3c7997$var$cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function $c176d395fa3c7997$var$runClearTimeout(marker) {
    if ($c176d395fa3c7997$var$cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if (($c176d395fa3c7997$var$cachedClearTimeout === $c176d395fa3c7997$var$defaultClearTimeout || !$c176d395fa3c7997$var$cachedClearTimeout) && clearTimeout) {
        $c176d395fa3c7997$var$cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $c176d395fa3c7997$var$cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return $c176d395fa3c7997$var$cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return $c176d395fa3c7997$var$cachedClearTimeout.call(this, marker);
        }
    }
}
var $c176d395fa3c7997$var$queue = [];
var $c176d395fa3c7997$var$draining = false;
var $c176d395fa3c7997$var$currentQueue;
var $c176d395fa3c7997$var$queueIndex = -1;
function $c176d395fa3c7997$var$cleanUpNextTick() {
    if (!$c176d395fa3c7997$var$draining || !$c176d395fa3c7997$var$currentQueue) return;
    $c176d395fa3c7997$var$draining = false;
    if ($c176d395fa3c7997$var$currentQueue.length) $c176d395fa3c7997$var$queue = $c176d395fa3c7997$var$currentQueue.concat($c176d395fa3c7997$var$queue);
    else $c176d395fa3c7997$var$queueIndex = -1;
    if ($c176d395fa3c7997$var$queue.length) $c176d395fa3c7997$var$drainQueue();
}
function $c176d395fa3c7997$var$drainQueue() {
    if ($c176d395fa3c7997$var$draining) return;
    var timeout = $c176d395fa3c7997$var$runTimeout($c176d395fa3c7997$var$cleanUpNextTick);
    $c176d395fa3c7997$var$draining = true;
    var len = $c176d395fa3c7997$var$queue.length;
    while(len){
        $c176d395fa3c7997$var$currentQueue = $c176d395fa3c7997$var$queue;
        $c176d395fa3c7997$var$queue = [];
        while(++$c176d395fa3c7997$var$queueIndex < len)if ($c176d395fa3c7997$var$currentQueue) $c176d395fa3c7997$var$currentQueue[$c176d395fa3c7997$var$queueIndex].run();
        $c176d395fa3c7997$var$queueIndex = -1;
        len = $c176d395fa3c7997$var$queue.length;
    }
    $c176d395fa3c7997$var$currentQueue = null;
    $c176d395fa3c7997$var$draining = false;
    $c176d395fa3c7997$var$runClearTimeout(timeout);
}
$c176d395fa3c7997$var$process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    $c176d395fa3c7997$var$queue.push(new $c176d395fa3c7997$var$Item(fun, args));
    if ($c176d395fa3c7997$var$queue.length === 1 && !$c176d395fa3c7997$var$draining) $c176d395fa3c7997$var$runTimeout($c176d395fa3c7997$var$drainQueue);
};
// v8 likes predictible objects
function $c176d395fa3c7997$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
$c176d395fa3c7997$var$Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
$c176d395fa3c7997$var$process.title = "browser";
$c176d395fa3c7997$var$process.browser = true;
$c176d395fa3c7997$var$process.env = {};
$c176d395fa3c7997$var$process.argv = [];
$c176d395fa3c7997$var$process.version = ""; // empty string to avoid regexp issues
$c176d395fa3c7997$var$process.versions = {};
function $c176d395fa3c7997$var$noop() {}
$c176d395fa3c7997$var$process.on = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.addListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.once = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.off = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.removeListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.removeAllListeners = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.emit = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.prependListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.prependOnceListener = $c176d395fa3c7997$var$noop;
$c176d395fa3c7997$var$process.listeners = function(name) {
    return [];
};
$c176d395fa3c7997$var$process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
$c176d395fa3c7997$var$process.cwd = function() {
    return "/";
};
$c176d395fa3c7997$var$process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
$c176d395fa3c7997$var$process.umask = function() {
    return 0;
};


var $e1ad2252bbbbbc3e$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $e1ad2252bbbbbc3e$var$_a;
// how long to wait for observer to collect information about resources
// this is needed as event "load" is called before observer
// hard to say how long it should really wait, seems like 300ms is
// safe enough
var $e1ad2252bbbbbc3e$var$OBSERVER_WAIT_TIME_MS = 300;
var $e1ad2252bbbbbc3e$var$isNode = typeof $c176d395fa3c7997$exports === "object" && (($e1ad2252bbbbbc3e$var$_a = $c176d395fa3c7997$exports.release) === null || $e1ad2252bbbbbc3e$var$_a === void 0 ? void 0 : $e1ad2252bbbbbc3e$var$_a.name) === "node";
/**
 * This class represents a fetch plugin for auto instrumentation
 */ var $e1ad2252bbbbbc3e$export$f922a490458c98a8 = /** @class */ function(_super) {
    $e1ad2252bbbbbc3e$var$__extends(FetchInstrumentation, _super);
    function FetchInstrumentation(config) {
        if (config === void 0) config = {};
        var _this = _super.call(this, "@opentelemetry/instrumentation-fetch", (0, $e4172760070e556a$export$a4ad2735b021c132), config) || this;
        _this.component = "fetch";
        _this.version = (0, $e4172760070e556a$export$a4ad2735b021c132);
        _this.moduleName = _this.component;
        _this._usedResources = new WeakSet();
        _this._tasksCount = 0;
        return _this;
    }
    FetchInstrumentation.prototype.init = function() {};
    /**
     * Add cors pre flight child span
     * @param span
     * @param corsPreFlightRequest
     */ FetchInstrumentation.prototype._addChildSpan = function(span, corsPreFlightRequest) {
        var childSpan = this.tracer.startSpan("CORS Preflight", {
            startTime: corsPreFlightRequest[$4485e1475008eb40$export$74be52df2d6fd28c.FETCH_START]
        }, $ibuLL.trace.setSpan($hfZRB.context.active(), span));
        if (!this.getConfig().ignoreNetworkEvents) $79aec9cc23f983ad$export$e2385716cf129455(childSpan, corsPreFlightRequest);
        childSpan.end(corsPreFlightRequest[$4485e1475008eb40$export$74be52df2d6fd28c.RESPONSE_END]);
    };
    /**
     * Adds more attributes to span just before ending it
     * @param span
     * @param response
     */ FetchInstrumentation.prototype._addFinalSpanAttributes = function(span, response) {
        var parsedUrl = $79aec9cc23f983ad$export$7a5253c0f62e0150(response.url);
        span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_STATUS_CODE), response.status);
        if (response.statusText != null) span.setAttribute((0, $bb570246607e635d$export$668754fb61dd076c).HTTP_STATUS_TEXT, response.statusText);
        span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_HOST), parsedUrl.host);
        span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_SCHEME), parsedUrl.protocol.replace(":", ""));
        if (typeof navigator !== "undefined") span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_USER_AGENT), navigator.userAgent);
    };
    /**
     * Add headers
     * @param options
     * @param spanUrl
     */ FetchInstrumentation.prototype._addHeaders = function(options, spanUrl) {
        if (!$79aec9cc23f983ad$export$c6501d7e56a5b40a(spanUrl, this.getConfig().propagateTraceHeaderCorsUrls)) {
            var headers = {};
            $4tmHU.propagation.inject($hfZRB.context.active(), headers);
            if (Object.keys(headers).length > 0) this._diag.debug("headers inject skipped due to CORS policy");
            return;
        }
        if (options instanceof Request) $4tmHU.propagation.inject($hfZRB.context.active(), options.headers, {
            set: function(h, k, v) {
                return h.set(k, typeof v === "string" ? v : String(v));
            }
        });
        else if (options.headers instanceof Headers) $4tmHU.propagation.inject($hfZRB.context.active(), options.headers, {
            set: function(h, k, v) {
                return h.set(k, typeof v === "string" ? v : String(v));
            }
        });
        else if (options.headers instanceof Map) $4tmHU.propagation.inject($hfZRB.context.active(), options.headers, {
            set: function(h, k, v) {
                return h.set(k, typeof v === "string" ? v : String(v));
            }
        });
        else {
            var headers = {};
            $4tmHU.propagation.inject($hfZRB.context.active(), headers);
            options.headers = Object.assign({}, headers, options.headers || {});
        }
    };
    /**
     * Clears the resource timings and all resources assigned with spans
     *     when {@link FetchPluginConfig.clearTimingResources} is
     *     set to true (default false)
     * @private
     */ FetchInstrumentation.prototype._clearResources = function() {
        if (this._tasksCount === 0 && this.getConfig().clearTimingResources) {
            performance.clearResourceTimings();
            this._usedResources = new WeakSet();
        }
    };
    /**
     * Creates a new span
     * @param url
     * @param options
     */ FetchInstrumentation.prototype._createSpan = function(url, options) {
        var _a;
        if (options === void 0) options = {};
        if ($d841c88136dbe83b$export$172b5a1c42a6f83d(url, this.getConfig().ignoreUrls)) {
            this._diag.debug("ignoring span as url matches ignored url");
            return;
        }
        var method = (options.method || "GET").toUpperCase();
        var spanName = "HTTP " + method;
        return this.tracer.startSpan(spanName, {
            kind: $h9EcL.SpanKind.CLIENT,
            attributes: (_a = {}, _a[(0, $bb570246607e635d$export$668754fb61dd076c).COMPONENT] = this.moduleName, _a[0, $3Bhxa.SEMATTRS_HTTP_METHOD] = method, _a[0, $3Bhxa.SEMATTRS_HTTP_URL] = url, _a)
        });
    };
    /**
     * Finds appropriate resource and add network events to the span
     * @param span
     * @param resourcesObserver
     * @param endTime
     */ FetchInstrumentation.prototype._findResourceAndAddNetworkEvents = function(span, resourcesObserver, endTime) {
        var resources = resourcesObserver.entries;
        if (!resources.length) {
            if (!performance.getEntriesByType) return;
            // fallback - either Observer is not available or it took longer
            // then OBSERVER_WAIT_TIME_MS and observer didn't collect enough
            // information
            resources = performance.getEntriesByType("resource");
        }
        var resource = $79aec9cc23f983ad$export$cdcba7438a7553e8(resourcesObserver.spanUrl, resourcesObserver.startTime, endTime, resources, this._usedResources, "fetch");
        if (resource.mainRequest) {
            var mainRequest = resource.mainRequest;
            this._markResourceAsUsed(mainRequest);
            var corsPreFlightRequest = resource.corsPreFlightRequest;
            if (corsPreFlightRequest) {
                this._addChildSpan(span, corsPreFlightRequest);
                this._markResourceAsUsed(corsPreFlightRequest);
            }
            if (!this.getConfig().ignoreNetworkEvents) $79aec9cc23f983ad$export$e2385716cf129455(span, mainRequest);
        }
    };
    /**
     * Marks certain [resource]{@link PerformanceResourceTiming} when information
     * from this is used to add events to span.
     * This is done to avoid reusing the same resource again for next span
     * @param resource
     */ FetchInstrumentation.prototype._markResourceAsUsed = function(resource) {
        this._usedResources.add(resource);
    };
    /**
     * Finish span, add attributes, network events etc.
     * @param span
     * @param spanData
     * @param response
     */ FetchInstrumentation.prototype._endSpan = function(span, spanData, response) {
        var _this = this;
        var endTime = $hTf1k.millisToHrTime(Date.now());
        var performanceEndTime = $hTf1k.hrTime();
        this._addFinalSpanAttributes(span, response);
        setTimeout(function() {
            var _a;
            (_a = spanData.observer) === null || _a === void 0 || _a.disconnect();
            _this._findResourceAndAddNetworkEvents(span, spanData, performanceEndTime);
            _this._tasksCount--;
            _this._clearResources();
            span.end(endTime);
        }, $e1ad2252bbbbbc3e$var$OBSERVER_WAIT_TIME_MS);
    };
    /**
     * Patches the constructor of fetch
     */ FetchInstrumentation.prototype._patchConstructor = function() {
        var _this = this;
        return function(original) {
            var plugin = _this;
            return function patchConstructor() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                var self = this;
                var url = $79aec9cc23f983ad$export$7a5253c0f62e0150(args[0] instanceof Request ? args[0].url : String(args[0])).href;
                var options = args[0] instanceof Request ? args[0] : args[1] || {};
                var createdSpan = plugin._createSpan(url, options);
                if (!createdSpan) return original.apply(this, args);
                var spanData = plugin._prepareSpanData(url);
                function endSpanOnError(span, error) {
                    plugin._applyAttributesAfterFetch(span, options, error);
                    plugin._endSpan(span, spanData, {
                        status: error.status || 0,
                        statusText: error.message,
                        url: url
                    });
                }
                function endSpanOnSuccess(span, response) {
                    plugin._applyAttributesAfterFetch(span, options, response);
                    if (response.status >= 200 && response.status < 400) plugin._endSpan(span, spanData, response);
                    else plugin._endSpan(span, spanData, {
                        status: response.status,
                        statusText: response.statusText,
                        url: url
                    });
                }
                function onSuccess(span, resolve, response) {
                    try {
                        var resClone = response.clone();
                        var resClone4Hook_1 = response.clone();
                        var body = resClone.body;
                        if (body) {
                            var reader_1 = body.getReader();
                            var read_1 = function() {
                                reader_1.read().then(function(_a) {
                                    var done = _a.done;
                                    if (done) endSpanOnSuccess(span, resClone4Hook_1);
                                    else read_1();
                                }, function(error) {
                                    endSpanOnError(span, error);
                                });
                            };
                            read_1();
                        } else // some older browsers don't have .body implemented
                        endSpanOnSuccess(span, response);
                    } finally{
                        resolve(response);
                    }
                }
                function onError(span, reject, error) {
                    try {
                        endSpanOnError(span, error);
                    } finally{
                        reject(error);
                    }
                }
                return new Promise(function(resolve, reject) {
                    return $hfZRB.context.with($ibuLL.trace.setSpan($hfZRB.context.active(), createdSpan), function() {
                        plugin._addHeaders(options, url);
                        plugin._tasksCount++;
                        // TypeScript complains about arrow function captured a this typed as globalThis
                        // ts(7041)
                        return original.apply(self, options instanceof Request ? [
                            options
                        ] : [
                            url,
                            options
                        ]).then(onSuccess.bind(self, createdSpan, resolve), onError.bind(self, createdSpan, reject));
                    });
                });
            };
        };
    };
    FetchInstrumentation.prototype._applyAttributesAfterFetch = function(span, request, result) {
        var _this = this;
        var applyCustomAttributesOnSpan = this.getConfig().applyCustomAttributesOnSpan;
        if (applyCustomAttributesOnSpan) (0, $5381fad8f5f1a0cb$export$fdff7e10f8ca069e)(function() {
            return applyCustomAttributesOnSpan(span, request, result);
        }, function(error) {
            if (!error) return;
            _this._diag.error("applyCustomAttributesOnSpan", error);
        }, true);
    };
    /**
     * Prepares a span data - needed later for matching appropriate network
     *     resources
     * @param spanUrl
     */ FetchInstrumentation.prototype._prepareSpanData = function(spanUrl) {
        var startTime = $hTf1k.hrTime();
        var entries = [];
        if (typeof PerformanceObserver !== "function") return {
            entries: entries,
            startTime: startTime,
            spanUrl: spanUrl
        };
        var observer = new PerformanceObserver(function(list) {
            var perfObsEntries = list.getEntries();
            perfObsEntries.forEach(function(entry) {
                if (entry.initiatorType === "fetch" && entry.name === spanUrl) entries.push(entry);
            });
        });
        observer.observe({
            entryTypes: [
                "resource"
            ]
        });
        return {
            entries: entries,
            observer: observer,
            startTime: startTime,
            spanUrl: spanUrl
        };
    };
    /**
     * implements enable function
     */ FetchInstrumentation.prototype.enable = function() {
        if ($e1ad2252bbbbbc3e$var$isNode) {
            // Node.js v18+ *does* have a global `fetch()`, but this package does not
            // support instrumenting it.
            this._diag.warn("this instrumentation is intended for web usage only, it does not instrument Node.js's fetch()");
            return;
        }
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(fetch)) {
            this._unwrap((0, $5Nb0V._globalThis), "fetch");
            this._diag.debug("removing previous patch for constructor");
        }
        this._wrap((0, $5Nb0V._globalThis), "fetch", this._patchConstructor());
    };
    /**
     * implements unpatch function
     */ FetchInstrumentation.prototype.disable = function() {
        if ($e1ad2252bbbbbc3e$var$isNode) return;
        this._unwrap((0, $5Nb0V._globalThis), "fetch");
        this._usedResources = new WeakSet();
    };
    return FetchInstrumentation;
}((0, $ef8753615ddb495d$export$436b1c2bf7e9756b));


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
parcelRequire("8Ur1m");
var $hfZRB = parcelRequire("hfZRB");
var $ibuLL = parcelRequire("ibuLL");

var $hTf1k = parcelRequire("hTf1k");

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $60553d9ec4776635$export$668754fb61dd076c;
(function(AttributeNames) {
    AttributeNames["EVENT_TYPE"] = "event_type";
    AttributeNames["TARGET_ELEMENT"] = "target_element";
    AttributeNames["TARGET_XPATH"] = "target_xpath";
    AttributeNames["HTTP_URL"] = "http.url";
})($60553d9ec4776635$export$668754fb61dd076c || ($60553d9ec4776635$export$668754fb61dd076c = {}));


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
var $a1d4c38906b30b7b$export$4a03ffab3315ee34 = "0.39.0";
var $a1d4c38906b30b7b$export$b8b9d90f9e5bd72b = "@opentelemetry/instrumentation-user-interaction";


var $a6d475838e227c13$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $a6d475838e227c13$var$ZONE_CONTEXT_KEY = "OT_ZONE_CONTEXT";
var $a6d475838e227c13$var$EVENT_NAVIGATION_NAME = "Navigation:";
var $a6d475838e227c13$var$DEFAULT_EVENT_NAMES = [
    "click"
];
function $a6d475838e227c13$var$defaultShouldPreventSpanCreation() {
    return false;
}
/**
 * This class represents a UserInteraction plugin for auto instrumentation.
 * If zone.js is available then it patches the zone otherwise it patches
 * addEventListener of HTMLElement
 */ var $a6d475838e227c13$export$e96a40d3914620d1 = /** @class */ function(_super) {
    $a6d475838e227c13$var$__extends(UserInteractionInstrumentation, _super);
    function UserInteractionInstrumentation(config) {
        if (config === void 0) config = {};
        var _a;
        var _this = _super.call(this, (0, $a1d4c38906b30b7b$export$b8b9d90f9e5bd72b), (0, $a1d4c38906b30b7b$export$4a03ffab3315ee34), config) || this;
        _this.version = (0, $a1d4c38906b30b7b$export$4a03ffab3315ee34);
        _this.moduleName = "user-interaction";
        _this._spansData = new WeakMap();
        // for addEventListener/removeEventListener state
        _this._wrappedListeners = new WeakMap();
        // for event bubbling
        _this._eventsSpanMap = new WeakMap();
        _this._eventNames = new Set((_a = config === null || config === void 0 ? void 0 : config.eventNames) !== null && _a !== void 0 ? _a : $a6d475838e227c13$var$DEFAULT_EVENT_NAMES);
        _this._shouldPreventSpanCreation = typeof (config === null || config === void 0 ? void 0 : config.shouldPreventSpanCreation) === "function" ? config.shouldPreventSpanCreation : $a6d475838e227c13$var$defaultShouldPreventSpanCreation;
        return _this;
    }
    UserInteractionInstrumentation.prototype.init = function() {};
    /**
     * This will check if last task was timeout and will save the time to
     * fix the user interaction when nothing happens
     * This timeout comes from xhr plugin which is needed to collect information
     * about last xhr main request from observer
     * @param task
     * @param span
     */ UserInteractionInstrumentation.prototype._checkForTimeout = function(task, span) {
        var spanData = this._spansData.get(span);
        if (spanData) {
            if (task.source === "setTimeout") spanData.hrTimeLastTimeout = (0, $hTf1k.hrTime)();
            else if (task.source !== "Promise.then" && task.source !== "setTimeout") spanData.hrTimeLastTimeout = undefined;
        }
    };
    /**
     * Controls whether or not to create a span, based on the event type.
     */ UserInteractionInstrumentation.prototype._allowEventName = function(eventName) {
        return this._eventNames.has(eventName);
    };
    /**
     * Creates a new span
     * @param element
     * @param eventName
     * @param parentSpan
     */ UserInteractionInstrumentation.prototype._createSpan = function(element, eventName, parentSpan) {
        var _a;
        if (!(element instanceof HTMLElement)) return undefined;
        if (!element.getAttribute) return undefined;
        if (element.hasAttribute("disabled")) return undefined;
        if (!this._allowEventName(eventName)) return undefined;
        var xpath = (0, $79aec9cc23f983ad$export$fabdebd274ccbd1c)(element, true);
        try {
            var span = this.tracer.startSpan(eventName, {
                attributes: (_a = {}, _a[(0, $60553d9ec4776635$export$668754fb61dd076c).EVENT_TYPE] = eventName, _a[(0, $60553d9ec4776635$export$668754fb61dd076c).TARGET_ELEMENT] = element.tagName, _a[(0, $60553d9ec4776635$export$668754fb61dd076c).TARGET_XPATH] = xpath, _a[(0, $60553d9ec4776635$export$668754fb61dd076c).HTTP_URL] = window.location.href, _a)
            }, parentSpan ? $ibuLL.trace.setSpan($hfZRB.context.active(), parentSpan) : undefined);
            if (this._shouldPreventSpanCreation(eventName, element, span) === true) return undefined;
            this._spansData.set(span, {
                taskCount: 0
            });
            return span;
        } catch (e) {
            this._diag.error("failed to start create new user interaction span", e);
        }
        return undefined;
    };
    /**
     * Decrement number of tasks that left in zone,
     * This is needed to be able to end span when no more tasks left
     * @param span
     */ UserInteractionInstrumentation.prototype._decrementTask = function(span) {
        var spanData = this._spansData.get(span);
        if (spanData) {
            spanData.taskCount--;
            if (spanData.taskCount === 0) this._tryToEndSpan(span, spanData.hrTimeLastTimeout);
        }
    };
    /**
     * Return the current span
     * @param zone
     * @private
     */ UserInteractionInstrumentation.prototype._getCurrentSpan = function(zone) {
        var context = zone.get($a6d475838e227c13$var$ZONE_CONTEXT_KEY);
        if (context) return $ibuLL.trace.getSpan(context);
        return context;
    };
    /**
     * Increment number of tasks that are run within the same zone.
     *     This is needed to be able to end span when no more tasks left
     * @param span
     */ UserInteractionInstrumentation.prototype._incrementTask = function(span) {
        var spanData = this._spansData.get(span);
        if (spanData) spanData.taskCount++;
    };
    /**
     * Returns true iff we should use the patched callback; false if it's already been patched
     */ UserInteractionInstrumentation.prototype.addPatchedListener = function(on, type, listener, wrappedListener) {
        var listener2Type = this._wrappedListeners.get(listener);
        if (!listener2Type) {
            listener2Type = new Map();
            this._wrappedListeners.set(listener, listener2Type);
        }
        var element2patched = listener2Type.get(type);
        if (!element2patched) {
            element2patched = new Map();
            listener2Type.set(type, element2patched);
        }
        if (element2patched.has(on)) return false;
        element2patched.set(on, wrappedListener);
        return true;
    };
    /**
     * Returns the patched version of the callback (or undefined)
     */ UserInteractionInstrumentation.prototype.removePatchedListener = function(on, type, listener) {
        var listener2Type = this._wrappedListeners.get(listener);
        if (!listener2Type) return undefined;
        var element2patched = listener2Type.get(type);
        if (!element2patched) return undefined;
        var patched = element2patched.get(on);
        if (patched) {
            element2patched.delete(on);
            if (element2patched.size === 0) {
                listener2Type.delete(type);
                if (listener2Type.size === 0) this._wrappedListeners.delete(listener);
            }
        }
        return patched;
    };
    // utility method to deal with the Function|EventListener nature of addEventListener
    UserInteractionInstrumentation.prototype._invokeListener = function(listener, target, args) {
        if (typeof listener === "function") return listener.apply(target, args);
        else return listener.handleEvent(args[0]);
    };
    /**
     * This patches the addEventListener of HTMLElement to be able to
     * auto instrument the click events
     * This is done when zone is not available
     */ UserInteractionInstrumentation.prototype._patchAddEventListener = function() {
        var plugin = this;
        return function(original) {
            return function addEventListenerPatched(type, listener, useCapture) {
                // Forward calls with listener = null
                if (!listener) return original.call(this, type, listener, useCapture);
                // filter out null (typeof null === 'object')
                var once = useCapture && typeof useCapture === "object" && useCapture.once;
                var patchedListener = function() {
                    var _this = this;
                    var args = [];
                    for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                    var parentSpan;
                    var event = args[0];
                    var target = event === null || event === void 0 ? void 0 : event.target;
                    if (event) parentSpan = plugin._eventsSpanMap.get(event);
                    if (once) plugin.removePatchedListener(this, type, listener);
                    var span = plugin._createSpan(target, type, parentSpan);
                    if (span) {
                        if (event) plugin._eventsSpanMap.set(event, span);
                        return $hfZRB.context.with($ibuLL.trace.setSpan($hfZRB.context.active(), span), function() {
                            var result = plugin._invokeListener(listener, _this, args);
                            // no zone so end span immediately
                            span.end();
                            return result;
                        });
                    } else return plugin._invokeListener(listener, this, args);
                };
                if (plugin.addPatchedListener(this, type, listener, patchedListener)) return original.call(this, type, patchedListener, useCapture);
            };
        };
    };
    /**
     * This patches the removeEventListener of HTMLElement to handle the fact that
     * we patched the original callbacks
     * This is done when zone is not available
     */ UserInteractionInstrumentation.prototype._patchRemoveEventListener = function() {
        var plugin = this;
        return function(original) {
            return function removeEventListenerPatched(type, listener, useCapture) {
                var wrappedListener = plugin.removePatchedListener(this, type, listener);
                if (wrappedListener) return original.call(this, type, wrappedListener, useCapture);
                else return original.call(this, type, listener, useCapture);
            };
        };
    };
    /**
     * Most browser provide event listener api via EventTarget in prototype chain.
     * Exception to this is IE 11 which has it on the prototypes closest to EventTarget:
     *
     * * - has addEventListener in IE
     * ** - has addEventListener in all other browsers
     * ! - missing in IE
     *
     * HTMLElement -> Element -> Node * -> EventTarget **! -> Object
     * Document -> Node * -> EventTarget **! -> Object
     * Window * -> WindowProperties ! -> EventTarget **! -> Object
     */ UserInteractionInstrumentation.prototype._getPatchableEventTargets = function() {
        return window.EventTarget ? [
            EventTarget.prototype
        ] : [
            Node.prototype,
            Window.prototype
        ];
    };
    /**
     * Patches the history api
     */ UserInteractionInstrumentation.prototype._patchHistoryApi = function() {
        this._unpatchHistoryApi();
        this._wrap(history, "replaceState", this._patchHistoryMethod());
        this._wrap(history, "pushState", this._patchHistoryMethod());
        this._wrap(history, "back", this._patchHistoryMethod());
        this._wrap(history, "forward", this._patchHistoryMethod());
        this._wrap(history, "go", this._patchHistoryMethod());
    };
    /**
     * Patches the certain history api method
     */ UserInteractionInstrumentation.prototype._patchHistoryMethod = function() {
        var plugin = this;
        return function(original) {
            return function patchHistoryMethod() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                var url = "" + location.pathname + location.hash + location.search;
                var result = original.apply(this, args);
                var urlAfter = "" + location.pathname + location.hash + location.search;
                if (url !== urlAfter) plugin._updateInteractionName(urlAfter);
                return result;
            };
        };
    };
    /**
     * unpatch the history api methods
     */ UserInteractionInstrumentation.prototype._unpatchHistoryApi = function() {
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(history.replaceState)) this._unwrap(history, "replaceState");
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(history.pushState)) this._unwrap(history, "pushState");
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(history.back)) this._unwrap(history, "back");
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(history.forward)) this._unwrap(history, "forward");
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(history.go)) this._unwrap(history, "go");
    };
    /**
     * Updates interaction span name
     * @param url
     */ UserInteractionInstrumentation.prototype._updateInteractionName = function(url) {
        var span = $ibuLL.trace.getSpan($hfZRB.context.active());
        if (span && typeof span.updateName === "function") span.updateName($a6d475838e227c13$var$EVENT_NAVIGATION_NAME + " " + url);
    };
    /**
     * Patches zone cancel task - this is done to be able to correctly
     * decrement the number of remaining tasks
     */ UserInteractionInstrumentation.prototype._patchZoneCancelTask = function() {
        var plugin = this;
        return function(original) {
            return function patchCancelTask(task) {
                var currentZone = Zone.current;
                var currentSpan = plugin._getCurrentSpan(currentZone);
                if (currentSpan && plugin._shouldCountTask(task, currentZone)) plugin._decrementTask(currentSpan);
                return original.call(this, task);
            };
        };
    };
    /**
     * Patches zone schedule task - this is done to be able to correctly
     * increment the number of tasks running within current zone but also to
     * save time in case of timeout running from xhr plugin when waiting for
     * main request from PerformanceResourceTiming
     */ UserInteractionInstrumentation.prototype._patchZoneScheduleTask = function() {
        var plugin = this;
        return function(original) {
            return function patchScheduleTask(task) {
                var currentZone = Zone.current;
                var currentSpan = plugin._getCurrentSpan(currentZone);
                if (currentSpan && plugin._shouldCountTask(task, currentZone)) {
                    plugin._incrementTask(currentSpan);
                    plugin._checkForTimeout(task, currentSpan);
                }
                return original.call(this, task);
            };
        };
    };
    /**
     * Patches zone run task - this is done to be able to create a span when
     * user interaction starts
     * @private
     */ UserInteractionInstrumentation.prototype._patchZoneRunTask = function() {
        var plugin = this;
        return function(original) {
            return function patchRunTask(task, applyThis, applyArgs) {
                var event = Array.isArray(applyArgs) && applyArgs[0] instanceof Event ? applyArgs[0] : undefined;
                var target = event === null || event === void 0 ? void 0 : event.target;
                var span;
                var activeZone = this;
                if (target) {
                    span = plugin._createSpan(target, task.eventName);
                    if (span) {
                        plugin._incrementTask(span);
                        return activeZone.run(function() {
                            try {
                                return $hfZRB.context.with($ibuLL.trace.setSpan($hfZRB.context.active(), span), function() {
                                    var currentZone = Zone.current;
                                    task._zone = currentZone;
                                    return original.call(currentZone, task, applyThis, applyArgs);
                                });
                            } finally{
                                plugin._decrementTask(span);
                            }
                        });
                    }
                } else span = plugin._getCurrentSpan(activeZone);
                try {
                    return original.call(activeZone, task, applyThis, applyArgs);
                } finally{
                    if (span && plugin._shouldCountTask(task, activeZone)) plugin._decrementTask(span);
                }
            };
        };
    };
    /**
     * Decides if task should be counted.
     * @param task
     * @param currentZone
     * @private
     */ UserInteractionInstrumentation.prototype._shouldCountTask = function(task, currentZone) {
        if (task._zone) currentZone = task._zone;
        if (!currentZone || !task.data || task.data.isPeriodic) return false;
        var currentSpan = this._getCurrentSpan(currentZone);
        if (!currentSpan) return false;
        if (!this._spansData.get(currentSpan)) return false;
        return task.type === "macroTask" || task.type === "microTask";
    };
    /**
     * Will try to end span when such span still exists.
     * @param span
     * @param endTime
     * @private
     */ UserInteractionInstrumentation.prototype._tryToEndSpan = function(span, endTime) {
        if (span) {
            var spanData = this._spansData.get(span);
            if (spanData) {
                span.end(endTime);
                this._spansData.delete(span);
            }
        }
    };
    /**
     * implements enable function
     */ UserInteractionInstrumentation.prototype.enable = function() {
        var _this = this;
        var ZoneWithPrototype = this.getZoneWithPrototype();
        this._diag.debug("applying patch to", this.moduleName, this.version, "zone:", !!ZoneWithPrototype);
        if (ZoneWithPrototype) {
            if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(ZoneWithPrototype.prototype.runTask)) {
                this._unwrap(ZoneWithPrototype.prototype, "runTask");
                this._diag.debug("removing previous patch from method runTask");
            }
            if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(ZoneWithPrototype.prototype.scheduleTask)) {
                this._unwrap(ZoneWithPrototype.prototype, "scheduleTask");
                this._diag.debug("removing previous patch from method scheduleTask");
            }
            if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(ZoneWithPrototype.prototype.cancelTask)) {
                this._unwrap(ZoneWithPrototype.prototype, "cancelTask");
                this._diag.debug("removing previous patch from method cancelTask");
            }
            this._zonePatched = true;
            this._wrap(ZoneWithPrototype.prototype, "runTask", this._patchZoneRunTask());
            this._wrap(ZoneWithPrototype.prototype, "scheduleTask", this._patchZoneScheduleTask());
            this._wrap(ZoneWithPrototype.prototype, "cancelTask", this._patchZoneCancelTask());
        } else {
            this._zonePatched = false;
            var targets = this._getPatchableEventTargets();
            targets.forEach(function(target) {
                if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(target.addEventListener)) {
                    _this._unwrap(target, "addEventListener");
                    _this._diag.debug("removing previous patch from method addEventListener");
                }
                if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(target.removeEventListener)) {
                    _this._unwrap(target, "removeEventListener");
                    _this._diag.debug("removing previous patch from method removeEventListener");
                }
                _this._wrap(target, "addEventListener", _this._patchAddEventListener());
                _this._wrap(target, "removeEventListener", _this._patchRemoveEventListener());
            });
        }
        this._patchHistoryApi();
    };
    /**
     * implements unpatch function
     */ UserInteractionInstrumentation.prototype.disable = function() {
        var _this = this;
        var ZoneWithPrototype = this.getZoneWithPrototype();
        this._diag.debug("removing patch from", this.moduleName, this.version, "zone:", !!ZoneWithPrototype);
        if (ZoneWithPrototype && this._zonePatched) {
            if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(ZoneWithPrototype.prototype.runTask)) this._unwrap(ZoneWithPrototype.prototype, "runTask");
            if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(ZoneWithPrototype.prototype.scheduleTask)) this._unwrap(ZoneWithPrototype.prototype, "scheduleTask");
            if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(ZoneWithPrototype.prototype.cancelTask)) this._unwrap(ZoneWithPrototype.prototype, "cancelTask");
        } else {
            var targets = this._getPatchableEventTargets();
            targets.forEach(function(target) {
                if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(target.addEventListener)) _this._unwrap(target, "addEventListener");
                if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(target.removeEventListener)) _this._unwrap(target, "removeEventListener");
            });
        }
        this._unpatchHistoryApi();
    };
    /**
     * returns Zone
     */ UserInteractionInstrumentation.prototype.getZoneWithPrototype = function() {
        var _window = window;
        return _window.Zone;
    };
    return UserInteractionInstrumentation;
}((0, $ef8753615ddb495d$export$436b1c2bf7e9756b));


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ parcelRequire("8Ur1m");
var $hfZRB = parcelRequire("hfZRB");
var $4tmHU = parcelRequire("4tmHU");
var $ibuLL = parcelRequire("ibuLL");
var $h9EcL = parcelRequire("h9EcL");


var $hTf1k = parcelRequire("hTf1k");
var $lzSn1 = parcelRequire("lzSn1");

var $3Bhxa = parcelRequire("3Bhxa");

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var $1b32a9779c72d22f$export$3fd36d65bf762270;
(function(EventNames) {
    EventNames["METHOD_OPEN"] = "open";
    EventNames["METHOD_SEND"] = "send";
    EventNames["EVENT_ABORT"] = "abort";
    EventNames["EVENT_ERROR"] = "error";
    EventNames["EVENT_LOAD"] = "loaded";
    EventNames["EVENT_TIMEOUT"] = "timeout";
})($1b32a9779c72d22f$export$3fd36d65bf762270 || ($1b32a9779c72d22f$export$3fd36d65bf762270 = {}));


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // this is autogenerated file, see scripts/version-update.js
var $9f717dd2a40a5877$export$a4ad2735b021c132 = "0.52.1";


/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/semantic_conventions/http.md
 */ var $2c2a0c767c4347a0$export$668754fb61dd076c;
(function(AttributeNames) {
    AttributeNames["HTTP_STATUS_TEXT"] = "http.status_text";
})($2c2a0c767c4347a0$export$668754fb61dd076c || ($2c2a0c767c4347a0$export$668754fb61dd076c = {}));


var $a34dbbc372f6a977$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
// how long to wait for observer to collect information about resources
// this is needed as event "load" is called before observer
// hard to say how long it should really wait, seems like 300ms is
// safe enough
var $a34dbbc372f6a977$var$OBSERVER_WAIT_TIME_MS = 300;
/**
 * This class represents a XMLHttpRequest plugin for auto instrumentation
 */ var $a34dbbc372f6a977$export$35de81ee328d915e = /** @class */ function(_super) {
    $a34dbbc372f6a977$var$__extends(XMLHttpRequestInstrumentation, _super);
    function XMLHttpRequestInstrumentation(config) {
        if (config === void 0) config = {};
        var _this = _super.call(this, "@opentelemetry/instrumentation-xml-http-request", (0, $9f717dd2a40a5877$export$a4ad2735b021c132), config) || this;
        _this.component = "xml-http-request";
        _this.version = (0, $9f717dd2a40a5877$export$a4ad2735b021c132);
        _this.moduleName = _this.component;
        _this._tasksCount = 0;
        _this._xhrMem = new WeakMap();
        _this._usedResources = new WeakSet();
        return _this;
    }
    XMLHttpRequestInstrumentation.prototype.init = function() {};
    /**
     * Adds custom headers to XMLHttpRequest
     * @param xhr
     * @param spanUrl
     * @private
     */ XMLHttpRequestInstrumentation.prototype._addHeaders = function(xhr, spanUrl) {
        var url = (0, $79aec9cc23f983ad$export$7a5253c0f62e0150)(spanUrl).href;
        if (!(0, $79aec9cc23f983ad$export$c6501d7e56a5b40a)(url, this.getConfig().propagateTraceHeaderCorsUrls)) {
            var headers_1 = {};
            $4tmHU.propagation.inject($hfZRB.context.active(), headers_1);
            if (Object.keys(headers_1).length > 0) this._diag.debug("headers inject skipped due to CORS policy");
            return;
        }
        var headers = {};
        $4tmHU.propagation.inject($hfZRB.context.active(), headers);
        Object.keys(headers).forEach(function(key) {
            xhr.setRequestHeader(key, String(headers[key]));
        });
    };
    /**
     * Add cors pre flight child span
     * @param span
     * @param corsPreFlightRequest
     * @private
     */ XMLHttpRequestInstrumentation.prototype._addChildSpan = function(span, corsPreFlightRequest) {
        var _this = this;
        $hfZRB.context.with($ibuLL.trace.setSpan($hfZRB.context.active(), span), function() {
            var childSpan = _this.tracer.startSpan("CORS Preflight", {
                startTime: corsPreFlightRequest[(0, $4485e1475008eb40$export$74be52df2d6fd28c).FETCH_START]
            });
            if (!_this.getConfig().ignoreNetworkEvents) (0, $79aec9cc23f983ad$export$e2385716cf129455)(childSpan, corsPreFlightRequest);
            childSpan.end(corsPreFlightRequest[(0, $4485e1475008eb40$export$74be52df2d6fd28c).RESPONSE_END]);
        });
    };
    /**
     * Add attributes when span is going to end
     * @param span
     * @param xhr
     * @param spanUrl
     * @private
     */ XMLHttpRequestInstrumentation.prototype._addFinalSpanAttributes = function(span, xhrMem, spanUrl) {
        if (typeof spanUrl === "string") {
            var parsedUrl = (0, $79aec9cc23f983ad$export$7a5253c0f62e0150)(spanUrl);
            if (xhrMem.status !== undefined) span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_STATUS_CODE), xhrMem.status);
            if (xhrMem.statusText !== undefined) span.setAttribute((0, $2c2a0c767c4347a0$export$668754fb61dd076c).HTTP_STATUS_TEXT, xhrMem.statusText);
            span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_HOST), parsedUrl.host);
            span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_SCHEME), parsedUrl.protocol.replace(":", ""));
            // @TODO do we want to collect this or it will be collected earlier once only or
            //    maybe when parent span is not available ?
            span.setAttribute((0, $3Bhxa.SEMATTRS_HTTP_USER_AGENT), navigator.userAgent);
        }
    };
    XMLHttpRequestInstrumentation.prototype._applyAttributesAfterXHR = function(span, xhr) {
        var _this = this;
        var applyCustomAttributesOnSpan = this.getConfig().applyCustomAttributesOnSpan;
        if (typeof applyCustomAttributesOnSpan === "function") (0, $5381fad8f5f1a0cb$export$fdff7e10f8ca069e)(function() {
            return applyCustomAttributesOnSpan(span, xhr);
        }, function(error) {
            if (!error) return;
            _this._diag.error("applyCustomAttributesOnSpan", error);
        }, true);
    };
    /**
     * will collect information about all resources created
     * between "send" and "end" with additional waiting for main resource
     * @param xhr
     * @param spanUrl
     * @private
     */ XMLHttpRequestInstrumentation.prototype._addResourceObserver = function(xhr, spanUrl) {
        var xhrMem = this._xhrMem.get(xhr);
        if (!xhrMem || typeof PerformanceObserver !== "function" || typeof PerformanceResourceTiming !== "function") return;
        xhrMem.createdResources = {
            observer: new PerformanceObserver(function(list) {
                var entries = list.getEntries();
                var parsedUrl = (0, $79aec9cc23f983ad$export$7a5253c0f62e0150)(spanUrl);
                entries.forEach(function(entry) {
                    if (entry.initiatorType === "xmlhttprequest" && entry.name === parsedUrl.href) {
                        if (xhrMem.createdResources) xhrMem.createdResources.entries.push(entry);
                    }
                });
            }),
            entries: []
        };
        xhrMem.createdResources.observer.observe({
            entryTypes: [
                "resource"
            ]
        });
    };
    /**
     * Clears the resource timings and all resources assigned with spans
     *     when {@link XMLHttpRequestInstrumentationConfig.clearTimingResources} is
     *     set to true (default false)
     * @private
     */ XMLHttpRequestInstrumentation.prototype._clearResources = function() {
        if (this._tasksCount === 0 && this.getConfig().clearTimingResources) {
            (0, $lzSn1.otperformance).clearResourceTimings();
            this._xhrMem = new WeakMap();
            this._usedResources = new WeakSet();
        }
    };
    /**
     * Finds appropriate resource and add network events to the span
     * @param span
     */ XMLHttpRequestInstrumentation.prototype._findResourceAndAddNetworkEvents = function(xhrMem, span, spanUrl, startTime, endTime) {
        if (!spanUrl || !startTime || !endTime || !xhrMem.createdResources) return;
        var resources = xhrMem.createdResources.entries;
        if (!resources || !resources.length) // fallback - either Observer is not available or it took longer
        // then OBSERVER_WAIT_TIME_MS and observer didn't collect enough
        // information
        // ts thinks this is the perf_hooks module, but it is the browser performance api
        resources = (0, $lzSn1.otperformance).getEntriesByType("resource");
        var resource = (0, $79aec9cc23f983ad$export$cdcba7438a7553e8)((0, $79aec9cc23f983ad$export$7a5253c0f62e0150)(spanUrl).href, startTime, endTime, resources, this._usedResources);
        if (resource.mainRequest) {
            var mainRequest = resource.mainRequest;
            this._markResourceAsUsed(mainRequest);
            var corsPreFlightRequest = resource.corsPreFlightRequest;
            if (corsPreFlightRequest) {
                this._addChildSpan(span, corsPreFlightRequest);
                this._markResourceAsUsed(corsPreFlightRequest);
            }
            if (!this.getConfig().ignoreNetworkEvents) (0, $79aec9cc23f983ad$export$e2385716cf129455)(span, mainRequest);
        }
    };
    /**
     * Removes the previous information about span.
     * This might happened when the same xhr is used again.
     * @param xhr
     * @private
     */ XMLHttpRequestInstrumentation.prototype._cleanPreviousSpanInformation = function(xhr) {
        var xhrMem = this._xhrMem.get(xhr);
        if (xhrMem) {
            var callbackToRemoveEvents = xhrMem.callbackToRemoveEvents;
            if (callbackToRemoveEvents) callbackToRemoveEvents();
            this._xhrMem.delete(xhr);
        }
    };
    /**
     * Creates a new span when method "open" is called
     * @param xhr
     * @param url
     * @param method
     * @private
     */ XMLHttpRequestInstrumentation.prototype._createSpan = function(xhr, url, method) {
        var _a;
        if ((0, $d841c88136dbe83b$export$172b5a1c42a6f83d)(url, this.getConfig().ignoreUrls)) {
            this._diag.debug("ignoring span as url matches ignored url");
            return;
        }
        var spanName = method.toUpperCase();
        var currentSpan = this.tracer.startSpan(spanName, {
            kind: $h9EcL.SpanKind.CLIENT,
            attributes: (_a = {}, _a[0, $3Bhxa.SEMATTRS_HTTP_METHOD] = method, _a[0, $3Bhxa.SEMATTRS_HTTP_URL] = (0, $79aec9cc23f983ad$export$7a5253c0f62e0150)(url).toString(), _a)
        });
        currentSpan.addEvent((0, $1b32a9779c72d22f$export$3fd36d65bf762270).METHOD_OPEN);
        this._cleanPreviousSpanInformation(xhr);
        this._xhrMem.set(xhr, {
            span: currentSpan,
            spanUrl: url
        });
        return currentSpan;
    };
    /**
     * Marks certain [resource]{@link PerformanceResourceTiming} when information
     * from this is used to add events to span.
     * This is done to avoid reusing the same resource again for next span
     * @param resource
     * @private
     */ XMLHttpRequestInstrumentation.prototype._markResourceAsUsed = function(resource) {
        this._usedResources.add(resource);
    };
    /**
     * Patches the method open
     * @private
     */ XMLHttpRequestInstrumentation.prototype._patchOpen = function() {
        var _this = this;
        return function(original) {
            var plugin = _this;
            return function patchOpen() {
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                var method = args[0];
                var url = args[1];
                plugin._createSpan(this, url, method);
                return original.apply(this, args);
            };
        };
    };
    /**
     * Patches the method send
     * @private
     */ XMLHttpRequestInstrumentation.prototype._patchSend = function() {
        var plugin = this;
        function endSpanTimeout(eventName, xhrMem, performanceEndTime, endTime) {
            var callbackToRemoveEvents = xhrMem.callbackToRemoveEvents;
            if (typeof callbackToRemoveEvents === "function") callbackToRemoveEvents();
            var span = xhrMem.span, spanUrl = xhrMem.spanUrl, sendStartTime = xhrMem.sendStartTime;
            if (span) {
                plugin._findResourceAndAddNetworkEvents(xhrMem, span, spanUrl, sendStartTime, performanceEndTime);
                span.addEvent(eventName, endTime);
                plugin._addFinalSpanAttributes(span, xhrMem, spanUrl);
                span.end(endTime);
                plugin._tasksCount--;
            }
            plugin._clearResources();
        }
        function endSpan(eventName, xhr) {
            var xhrMem = plugin._xhrMem.get(xhr);
            if (!xhrMem) return;
            xhrMem.status = xhr.status;
            xhrMem.statusText = xhr.statusText;
            plugin._xhrMem.delete(xhr);
            if (xhrMem.span) plugin._applyAttributesAfterXHR(xhrMem.span, xhr);
            var performanceEndTime = (0, $hTf1k.hrTime)();
            var endTime = Date.now();
            // the timeout is needed as observer doesn't have yet information
            // when event "load" is called. Also the time may differ depends on
            // browser and speed of computer
            setTimeout(function() {
                endSpanTimeout(eventName, xhrMem, performanceEndTime, endTime);
            }, $a34dbbc372f6a977$var$OBSERVER_WAIT_TIME_MS);
        }
        function onError() {
            endSpan((0, $1b32a9779c72d22f$export$3fd36d65bf762270).EVENT_ERROR, this);
        }
        function onAbort() {
            endSpan((0, $1b32a9779c72d22f$export$3fd36d65bf762270).EVENT_ABORT, this);
        }
        function onTimeout() {
            endSpan((0, $1b32a9779c72d22f$export$3fd36d65bf762270).EVENT_TIMEOUT, this);
        }
        function onLoad() {
            if (this.status < 299) endSpan((0, $1b32a9779c72d22f$export$3fd36d65bf762270).EVENT_LOAD, this);
            else endSpan((0, $1b32a9779c72d22f$export$3fd36d65bf762270).EVENT_ERROR, this);
        }
        function unregister(xhr) {
            xhr.removeEventListener("abort", onAbort);
            xhr.removeEventListener("error", onError);
            xhr.removeEventListener("load", onLoad);
            xhr.removeEventListener("timeout", onTimeout);
            var xhrMem = plugin._xhrMem.get(xhr);
            if (xhrMem) xhrMem.callbackToRemoveEvents = undefined;
        }
        return function(original) {
            return function patchSend() {
                var _this = this;
                var args = [];
                for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
                var xhrMem = plugin._xhrMem.get(this);
                if (!xhrMem) return original.apply(this, args);
                var currentSpan = xhrMem.span;
                var spanUrl = xhrMem.spanUrl;
                if (currentSpan && spanUrl) $hfZRB.context.with($ibuLL.trace.setSpan($hfZRB.context.active(), currentSpan), function() {
                    plugin._tasksCount++;
                    xhrMem.sendStartTime = (0, $hTf1k.hrTime)();
                    currentSpan.addEvent((0, $1b32a9779c72d22f$export$3fd36d65bf762270).METHOD_SEND);
                    _this.addEventListener("abort", onAbort);
                    _this.addEventListener("error", onError);
                    _this.addEventListener("load", onLoad);
                    _this.addEventListener("timeout", onTimeout);
                    xhrMem.callbackToRemoveEvents = function() {
                        unregister(_this);
                        if (xhrMem.createdResources) xhrMem.createdResources.observer.disconnect();
                    };
                    plugin._addHeaders(_this, spanUrl);
                    plugin._addResourceObserver(_this, spanUrl);
                });
                return original.apply(this, args);
            };
        };
    };
    /**
     * implements enable function
     */ XMLHttpRequestInstrumentation.prototype.enable = function() {
        this._diag.debug("applying patch to", this.moduleName, this.version);
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(XMLHttpRequest.prototype.open)) {
            this._unwrap(XMLHttpRequest.prototype, "open");
            this._diag.debug("removing previous patch from method open");
        }
        if ((0, $5381fad8f5f1a0cb$export$ec0fd572751979bc)(XMLHttpRequest.prototype.send)) {
            this._unwrap(XMLHttpRequest.prototype, "send");
            this._diag.debug("removing previous patch from method send");
        }
        this._wrap(XMLHttpRequest.prototype, "open", this._patchOpen());
        this._wrap(XMLHttpRequest.prototype, "send", this._patchSend());
    };
    /**
     * implements disable function
     */ XMLHttpRequestInstrumentation.prototype.disable = function() {
        this._diag.debug("removing patch from", this.moduleName, this.version);
        this._unwrap(XMLHttpRequest.prototype, "open");
        this._unwrap(XMLHttpRequest.prototype, "send");
        this._tasksCount = 0;
        this._xhrMem = new WeakMap();
        this._usedResources = new WeakSet();
    };
    return XMLHttpRequestInstrumentation;
}((0, $ef8753615ddb495d$export$436b1c2bf7e9756b));


var $8df99eb3798ae4b9$var$InstrumentationMap = {
    "@opentelemetry/instrumentation-document-load": (0, $61e5230b21382ad6$export$381e8ef2e310d2c3),
    "@opentelemetry/instrumentation-fetch": (0, $e1ad2252bbbbbc3e$export$f922a490458c98a8),
    "@opentelemetry/instrumentation-user-interaction": (0, $a6d475838e227c13$export$e96a40d3914620d1),
    "@opentelemetry/instrumentation-xml-http-request": (0, $a34dbbc372f6a977$export$35de81ee328d915e)
};
function $8df99eb3798ae4b9$export$2b6a8cc738089ff9(inputConfigs) {
    var _a;
    if (inputConfigs === void 0) inputConfigs = {};
    for(var _i = 0, _b = Object.keys(inputConfigs); _i < _b.length; _i++){
        var name_1 = _b[_i];
        if (!Object.prototype.hasOwnProperty.call($8df99eb3798ae4b9$var$InstrumentationMap, name_1)) {
            (0, $ljza4.diag).error('Provided instrumentation name "' + name_1 + '" not found');
            continue;
        }
    }
    var instrumentations = [];
    for(var _c = 0, _d = Object.keys($8df99eb3798ae4b9$var$InstrumentationMap); _c < _d.length; _c++){
        var name_2 = _d[_c];
        var Instance = $8df99eb3798ae4b9$var$InstrumentationMap[name_2];
        // Defaults are defined by the instrumentation itself
        var userConfig = (_a = inputConfigs[name_2]) !== null && _a !== void 0 ? _a : {};
        if (userConfig.enabled === false) {
            (0, $ljza4.diag).debug("Disabling instrumentation for " + name_2);
            continue;
        }
        try {
            (0, $ljza4.diag).debug("Loading instrumentation for " + name_2);
            instrumentations.push(new Instance(userConfig));
        } catch (e) {
            (0, $ljza4.diag).error(e);
        }
    }
    return instrumentations;
}




parcelRequire("8Ur1m");
var $ibuLL = parcelRequire("ibuLL");
function $c9f3acea5fa71cd0$var$initializeTracing(params /* { apiKey: string, serviceName: string } */ ) {
    if (!params) params = {};
    if (!params.apiKey) throw new Error("Usage: initializeTracing({ apiKey: 'honeycomb api key', serviceName: 'name of this service' })");
    if (!params.serviceName) {
        console.log("No service name provided to initializeTracing. Defaulting to unknown_service");
        params.serviceName = "unknown_service";
    }
    const configDefaults = {
        ignoreNetworkEvents: true
    };
    const sdk = new (0, $1ac2b3a10e272555$exports.HoneycombWebSDK)({
        // endpoint: "https://api.eu1.honeycomb.io/v1/traces", // Send to EU instance of Honeycomb. Defaults to sending to US instance.
        localVisualizations: params.debug,
        instrumentations: [
            (0, $8df99eb3798ae4b9$export$2b6a8cc738089ff9)({
                // Loads custom configuration for xml-http-request instrumentation.
                "@opentelemetry/instrumentation-xml-http-request": configDefaults,
                "@opentelemetry/instrumentation-fetch": configDefaults,
                "@opentelemetry/instrumentation-document-load": configDefaults
            })
        ],
        ...params
    });
    sdk.start();
    $c9f3acea5fa71cd0$var$instrumentGlobalErrors();
    if (params.debug) $c9f3acea5fa71cd0$var$sendTestSpan();
    // TODO: add the version of this library. Can i get parcel to import a json file?
    console.log("Tracing initialized");
}
function $c9f3acea5fa71cd0$var$instrumentGlobalErrors() {
    const tracer = (0, $ibuLL.trace).getTracer("@jessitron/errors");
    window.addEventListener("error", (e)=>{
        const span = tracer.startSpan("Error on page");
        span.setAttributes({
            error: true,
            "error.message": e.message,
            "error.stack": e.error?.stack,
            "error.filename": e.filename,
            "error.line_number": e.lineno,
            "error.column_number": e.colno
        });
        span.end();
    });
}
function $c9f3acea5fa71cd0$var$sendTestSpan() {
    const span = (0, $ibuLL.trace).getTracer("test span").startSpan("test span");
    console.log("Sending test span", span.spanContext());
    span.end();
}
function $c9f3acea5fa71cd0$var$setAttributes(attributes) {
    const span = (0, $ibuLL.trace).getActiveSpan();
    span && span.setAttributes(attributes); // maybe there is no active span, nbd
}
function $c9f3acea5fa71cd0$var$inSpan(tracerName, spanName, fn) {
    if (fn === undefined) console.log("USAGE: inSpan(tracerName, spanName, () => { ... })");
    return (0, $ibuLL.trace).getTracer(tracerName).startActiveSpan(spanName, (span)=>{
        try {
            return fn();
        } catch (err) {
            span.setStatus({
                code: 2,
                message: err.message
            });
            span.recordException(err);
            throw err;
        } finally{
            span.end();
        }
    });
}
async function $c9f3acea5fa71cd0$var$inSpanAsync(tracerName, spanName, fn) {
    if (fn === undefined) console.log("USAGE: inSpanAsync(tracerName, spanName, async () => { ... })");
    return (0, $ibuLL.trace).getTracer(tracerName).startActiveSpan(spanName, async (span)=>{
        try {
            return await fn();
        } catch (err) {
            span.setStatus({
                code: 2,
                message: err.message
            });
            span.recordException(err);
            throw err;
        } finally{
            span.end();
        }
    });
}
async function $c9f3acea5fa71cd0$var$recordException(err) {
    const span = (0, $ibuLL.trace).getActiveSpan();
    span.setStatus({
        code: 2,
        message: err.message
    });
    span.recordException(err);
}
async function $c9f3acea5fa71cd0$var$addSpanEvent(message, attributes) {
    const span = (0, $ibuLL.trace).getActiveSpan();
    span.addEvent(message, attributes);
}
const $c9f3acea5fa71cd0$export$8e18f7a649cdb84b = {
    initializeTracing: $c9f3acea5fa71cd0$var$initializeTracing,
    setAttributes: $c9f3acea5fa71cd0$var$setAttributes,
    inSpan: $c9f3acea5fa71cd0$var$inSpan,
    inSpanAsync: $c9f3acea5fa71cd0$var$inSpanAsync,
    recordException: $c9f3acea5fa71cd0$var$recordException,
    addSpanEvent: $c9f3acea5fa71cd0$var$addSpanEvent
};
// Now for the REAL export
window.Hny = $c9f3acea5fa71cd0$export$8e18f7a649cdb84b;

})();
