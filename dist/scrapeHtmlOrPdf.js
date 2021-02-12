/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8926:
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ 7757:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(5666);


/***/ }),

/***/ 8230:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _ = __webpack_require__(1387).runInContext();
module.exports = __webpack_require__(4599)(_, _);


/***/ }),

/***/ 4599:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapping = __webpack_require__(8836),
    fallbackHolder = __webpack_require__(9306);

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2
    ? function(a, b) { return func.apply(undefined, arguments); }
    : function(a) { return func.apply(undefined, arguments); };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2
    ? function(a, b) { return func(a, b); }
    : function(a) { return func(a); };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function() {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError;
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var defaultHolder = isLib ? func : fallbackHolder,
      forceCurry = ('curry' in options) && options.curry,
      forceFixed = ('fixed' in options) && options.fixed,
      forceRearg = ('rearg' in options) && options.rearg,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isError': util.isError,
    'isFunction': util.isFunction,
    'isWeakMap': util.isWeakMap,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isError = helpers.isError,
      isFunction = helpers.isFunction,
      isWeakMap = helpers.isWeakMap,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value)
          ? castArray(cloneArray(value))
          : castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function(iteratee) {
      return function() {
        var func = arguments[0],
            arity = arguments[1],
            result = iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? (arity - 2) : 1;
          return (length && length <= arity) ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function(mixin) {
      return function(source) {
        var func = this;
        if (!isFunction(func)) {
          return mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        mixin(func, Object(source));

        each(pairs, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : (toInteger(n) + 1);
        return curry(nthArg(n), arity);
      };
    },
    'rearg': function(rearg) {
      return function(func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg(func, indexes), arity);
      };
    },
    'runInContext': function(runInContext) {
      return function(context) {
        return baseConvert(util, runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return (forceCurry || (config.curry && n > 1))
      ? curry(func, n)
      : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start  === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
      : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null &&
          !(isFunction(value) || isError(value) || isWeakMap(value))) {
        nested[key] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function(options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function(func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function(func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : (length - 1);
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func, placeholder) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    }
    else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      }
      else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      }
      else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg
            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function() {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    result.placeholder = func.placeholder = placeholder;

    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func, defaultHolder);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func, _)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function(key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  _.placeholder = _;

  // Assign aliases.
  each(keys(_), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;


/***/ }),

/***/ 8836:
/***/ ((__unused_webpack_module, exports) => {

/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': [
    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
    'uniqueId', 'words', 'zipAll'
  ],
  '2': [
    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
    'zipObjectDeep'
  ],
  '3': [
    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
    'xorWith', 'zipWith'
  ],
  '4': [
    'fill', 'setWith', 'updateWith'
  ]
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true,
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to map real names to their aliases. */
exports.realToAlias = (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}());

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};


/***/ }),

/***/ 9306:
/***/ ((module) => {

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
module.exports = {};


/***/ }),

/***/ 1387:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(){function n(n,t,r){switch(r.length){case 0:return n.call(t);case 1:return n.call(t,r[0]);case 2:return n.call(t,r[0],r[1]);case 3:return n.call(t,r[0],r[1],r[2])}return n.apply(t,r)}function t(n,t,r,e){for(var u=-1,i=null==n?0:n.length;++u<i;){var o=n[u];t(e,o,r(o),n)}return e}function r(n,t){for(var r=-1,e=null==n?0:n.length;++r<e&&t(n[r],r,n)!==!1;);return n}function e(n,t){for(var r=null==n?0:n.length;r--&&t(n[r],r,n)!==!1;);return n}function u(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(!t(n[r],r,n))return!1;
return!0}function i(n,t){for(var r=-1,e=null==n?0:n.length,u=0,i=[];++r<e;){var o=n[r];t(o,r,n)&&(i[u++]=o)}return i}function o(n,t){return!!(null==n?0:n.length)&&y(n,t,0)>-1}function f(n,t,r){for(var e=-1,u=null==n?0:n.length;++e<u;)if(r(t,n[e]))return!0;return!1}function c(n,t){for(var r=-1,e=null==n?0:n.length,u=Array(e);++r<e;)u[r]=t(n[r],r,n);return u}function a(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function l(n,t,r,e){var u=-1,i=null==n?0:n.length;for(e&&i&&(r=n[++u]);++u<i;)r=t(r,n[u],u,n);
return r}function s(n,t,r,e){var u=null==n?0:n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r}function h(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(t(n[r],r,n))return!0;return!1}function p(n){return n.split("")}function _(n){return n.match(Bt)||[]}function v(n,t,r){var e;return r(n,function(n,r,u){if(t(n,r,u))return e=r,!1}),e}function g(n,t,r,e){for(var u=n.length,i=r+(e?1:-1);e?i--:++i<u;)if(t(n[i],i,n))return i;return-1}function y(n,t,r){return t===t?q(n,t,r):g(n,b,r)}function d(n,t,r,e){
for(var u=r-1,i=n.length;++u<i;)if(e(n[u],t))return u;return-1}function b(n){return n!==n}function w(n,t){var r=null==n?0:n.length;return r?k(n,t)/r:Sn}function m(n){return function(t){return null==t?Y:t[n]}}function x(n){return function(t){return null==n?Y:n[t]}}function j(n,t,r,e,u){return u(n,function(n,u,i){r=e?(e=!1,n):t(r,n,u,i)}),r}function A(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].value;return n}function k(n,t){for(var r,e=-1,u=n.length;++e<u;){var i=t(n[e]);i!==Y&&(r=r===Y?i:r+i);
}return r}function O(n,t){for(var r=-1,e=Array(n);++r<n;)e[r]=t(r);return e}function I(n,t){return c(t,function(t){return[t,n[t]]})}function R(n){return function(t){return n(t)}}function z(n,t){return c(t,function(t){return n[t]})}function E(n,t){return n.has(t)}function S(n,t){for(var r=-1,e=n.length;++r<e&&y(t,n[r],0)>-1;);return r}function W(n,t){for(var r=n.length;r--&&y(t,n[r],0)>-1;);return r}function L(n,t){for(var r=n.length,e=0;r--;)n[r]===t&&++e;return e}function C(n){return"\\"+Gr[n]}function U(n,t){
return null==n?Y:n[t]}function B(n){return Dr.test(n)}function T(n){return Mr.test(n)}function $(n){for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r}function D(n){var t=-1,r=Array(n.size);return n.forEach(function(n,e){r[++t]=[e,n]}),r}function M(n,t){return function(r){return n(t(r))}}function F(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r];o!==t&&o!==un||(n[r]=un,i[u++]=r)}return i}function N(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=n}),r}function P(n){
var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=[n,n]}),r}function q(n,t,r){for(var e=r-1,u=n.length;++e<u;)if(n[e]===t)return e;return-1}function Z(n,t,r){for(var e=r+1;e--;)if(n[e]===t)return e;return e}function K(n){return B(n)?G(n):se(n)}function V(n){return B(n)?H(n):p(n)}function G(n){for(var t=Tr.lastIndex=0;Tr.test(n);)++t;return t}function H(n){return n.match(Tr)||[]}function J(n){return n.match($r)||[]}var Y,Q="4.17.20",X=200,nn="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",tn="Expected a function",rn="__lodash_hash_undefined__",en=500,un="__lodash_placeholder__",on=1,fn=2,cn=4,an=1,ln=2,sn=1,hn=2,pn=4,_n=8,vn=16,gn=32,yn=64,dn=128,bn=256,wn=512,mn=30,xn="...",jn=800,An=16,kn=1,On=2,In=3,Rn=1/0,zn=9007199254740991,En=1.7976931348623157e308,Sn=NaN,Wn=4294967295,Ln=Wn-1,Cn=Wn>>>1,Un=[["ary",dn],["bind",sn],["bindKey",hn],["curry",_n],["curryRight",vn],["flip",wn],["partial",gn],["partialRight",yn],["rearg",bn]],Bn="[object Arguments]",Tn="[object Array]",$n="[object AsyncFunction]",Dn="[object Boolean]",Mn="[object Date]",Fn="[object DOMException]",Nn="[object Error]",Pn="[object Function]",qn="[object GeneratorFunction]",Zn="[object Map]",Kn="[object Number]",Vn="[object Null]",Gn="[object Object]",Hn="[object Promise]",Jn="[object Proxy]",Yn="[object RegExp]",Qn="[object Set]",Xn="[object String]",nt="[object Symbol]",tt="[object Undefined]",rt="[object WeakMap]",et="[object WeakSet]",ut="[object ArrayBuffer]",it="[object DataView]",ot="[object Float32Array]",ft="[object Float64Array]",ct="[object Int8Array]",at="[object Int16Array]",lt="[object Int32Array]",st="[object Uint8Array]",ht="[object Uint8ClampedArray]",pt="[object Uint16Array]",_t="[object Uint32Array]",vt=/\b__p \+= '';/g,gt=/\b(__p \+=) '' \+/g,yt=/(__e\(.*?\)|\b__t\)) \+\n'';/g,dt=/&(?:amp|lt|gt|quot|#39);/g,bt=/[&<>"']/g,wt=RegExp(dt.source),mt=RegExp(bt.source),xt=/<%-([\s\S]+?)%>/g,jt=/<%([\s\S]+?)%>/g,At=/<%=([\s\S]+?)%>/g,kt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ot=/^\w*$/,It=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Rt=/[\\^$.*+?()[\]{}|]/g,zt=RegExp(Rt.source),Et=/^\s+|\s+$/g,St=/^\s+/,Wt=/\s+$/,Lt=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Ct=/\{\n\/\* \[wrapped with (.+)\] \*/,Ut=/,? & /,Bt=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Tt=/\\(\\)?/g,$t=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,Dt=/\w*$/,Mt=/^[-+]0x[0-9a-f]+$/i,Ft=/^0b[01]+$/i,Nt=/^\[object .+?Constructor\]$/,Pt=/^0o[0-7]+$/i,qt=/^(?:0|[1-9]\d*)$/,Zt=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Kt=/($^)/,Vt=/['\n\r\u2028\u2029\\]/g,Gt="\\ud800-\\udfff",Ht="\\u0300-\\u036f",Jt="\\ufe20-\\ufe2f",Yt="\\u20d0-\\u20ff",Qt=Ht+Jt+Yt,Xt="\\u2700-\\u27bf",nr="a-z\\xdf-\\xf6\\xf8-\\xff",tr="\\xac\\xb1\\xd7\\xf7",rr="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",er="\\u2000-\\u206f",ur=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",ir="A-Z\\xc0-\\xd6\\xd8-\\xde",or="\\ufe0e\\ufe0f",fr=tr+rr+er+ur,cr="['\u2019]",ar="["+Gt+"]",lr="["+fr+"]",sr="["+Qt+"]",hr="\\d+",pr="["+Xt+"]",_r="["+nr+"]",vr="[^"+Gt+fr+hr+Xt+nr+ir+"]",gr="\\ud83c[\\udffb-\\udfff]",yr="(?:"+sr+"|"+gr+")",dr="[^"+Gt+"]",br="(?:\\ud83c[\\udde6-\\uddff]){2}",wr="[\\ud800-\\udbff][\\udc00-\\udfff]",mr="["+ir+"]",xr="\\u200d",jr="(?:"+_r+"|"+vr+")",Ar="(?:"+mr+"|"+vr+")",kr="(?:"+cr+"(?:d|ll|m|re|s|t|ve))?",Or="(?:"+cr+"(?:D|LL|M|RE|S|T|VE))?",Ir=yr+"?",Rr="["+or+"]?",zr="(?:"+xr+"(?:"+[dr,br,wr].join("|")+")"+Rr+Ir+")*",Er="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Sr="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Wr=Rr+Ir+zr,Lr="(?:"+[pr,br,wr].join("|")+")"+Wr,Cr="(?:"+[dr+sr+"?",sr,br,wr,ar].join("|")+")",Ur=RegExp(cr,"g"),Br=RegExp(sr,"g"),Tr=RegExp(gr+"(?="+gr+")|"+Cr+Wr,"g"),$r=RegExp([mr+"?"+_r+"+"+kr+"(?="+[lr,mr,"$"].join("|")+")",Ar+"+"+Or+"(?="+[lr,mr+jr,"$"].join("|")+")",mr+"?"+jr+"+"+kr,mr+"+"+Or,Sr,Er,hr,Lr].join("|"),"g"),Dr=RegExp("["+xr+Gt+Qt+or+"]"),Mr=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Fr=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Nr=-1,Pr={};
Pr[ot]=Pr[ft]=Pr[ct]=Pr[at]=Pr[lt]=Pr[st]=Pr[ht]=Pr[pt]=Pr[_t]=!0,Pr[Bn]=Pr[Tn]=Pr[ut]=Pr[Dn]=Pr[it]=Pr[Mn]=Pr[Nn]=Pr[Pn]=Pr[Zn]=Pr[Kn]=Pr[Gn]=Pr[Yn]=Pr[Qn]=Pr[Xn]=Pr[rt]=!1;var qr={};qr[Bn]=qr[Tn]=qr[ut]=qr[it]=qr[Dn]=qr[Mn]=qr[ot]=qr[ft]=qr[ct]=qr[at]=qr[lt]=qr[Zn]=qr[Kn]=qr[Gn]=qr[Yn]=qr[Qn]=qr[Xn]=qr[nt]=qr[st]=qr[ht]=qr[pt]=qr[_t]=!0,qr[Nn]=qr[Pn]=qr[rt]=!1;var Zr={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a",
"\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae",
"\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g",
"\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i","\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O",
"\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S","\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w",
"\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe","\u0149":"'n","\u017f":"s"},Kr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vr={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Gr={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Hr=parseFloat,Jr=parseInt,Yr="object"==typeof __webpack_require__.g&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g,Qr="object"==typeof self&&self&&self.Object===Object&&self,Xr=Yr||Qr||Function("return this")(),ne= true&&exports&&!exports.nodeType&&exports,te=ne&&"object"=="object"&&module&&!module.nodeType&&module,re=te&&te.exports===ne,ee=re&&Yr.process,ue=function(){
try{var n=te&&te.require&&te.require("util").types;return n?n:ee&&ee.binding&&ee.binding("util")}catch(n){}}(),ie=ue&&ue.isArrayBuffer,oe=ue&&ue.isDate,fe=ue&&ue.isMap,ce=ue&&ue.isRegExp,ae=ue&&ue.isSet,le=ue&&ue.isTypedArray,se=m("length"),he=x(Zr),pe=x(Kr),_e=x(Vr),ve=function p(x){function q(n){if(oc(n)&&!yh(n)&&!(n instanceof Bt)){if(n instanceof H)return n;if(yl.call(n,"__wrapped__"))return to(n)}return new H(n)}function G(){}function H(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t,
this.__index__=0,this.__values__=Y}function Bt(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Wn,this.__views__=[]}function Gt(){var n=new Bt(this.__wrapped__);return n.__actions__=Uu(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=Uu(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=Uu(this.__views__),n}function Ht(){if(this.__filtered__){var n=new Bt(this);n.__dir__=-1,
n.__filtered__=!0}else n=this.clone(),n.__dir__*=-1;return n}function Jt(){var n=this.__wrapped__.value(),t=this.__dir__,r=yh(n),e=t<0,u=r?n.length:0,i=Ai(0,u,this.__views__),o=i.start,f=i.end,c=f-o,a=e?f:o-1,l=this.__iteratees__,s=l.length,h=0,p=Vl(c,this.__takeCount__);if(!r||!e&&u==c&&p==c)return du(n,this.__actions__);var _=[];n:for(;c--&&h<p;){a+=t;for(var v=-1,g=n[a];++v<s;){var y=l[v],d=y.iteratee,b=y.type,w=d(g);if(b==On)g=w;else if(!w){if(b==kn)continue n;break n}}_[h++]=g}return _}function Yt(n){
var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Qt(){this.__data__=es?es(null):{},this.size=0}function Xt(n){var t=this.has(n)&&delete this.__data__[n];return this.size-=t?1:0,t}function nr(n){var t=this.__data__;if(es){var r=t[n];return r===rn?Y:r}return yl.call(t,n)?t[n]:Y}function tr(n){var t=this.__data__;return es?t[n]!==Y:yl.call(t,n)}function rr(n,t){var r=this.__data__;return this.size+=this.has(n)?0:1,r[n]=es&&t===Y?rn:t,this}function er(n){
var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function ur(){this.__data__=[],this.size=0}function ir(n){var t=this.__data__,r=Er(t,n);return!(r<0)&&(r==t.length-1?t.pop():Sl.call(t,r,1),--this.size,!0)}function or(n){var t=this.__data__,r=Er(t,n);return r<0?Y:t[r][1]}function fr(n){return Er(this.__data__,n)>-1}function cr(n,t){var r=this.__data__,e=Er(r,n);return e<0?(++this.size,r.push([n,t])):r[e][1]=t,this}function ar(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){
var e=n[t];this.set(e[0],e[1])}}function lr(){this.size=0,this.__data__={hash:new Yt,map:new(Xl||er),string:new Yt}}function sr(n){var t=wi(this,n).delete(n);return this.size-=t?1:0,t}function hr(n){return wi(this,n).get(n)}function pr(n){return wi(this,n).has(n)}function _r(n,t){var r=wi(this,n),e=r.size;return r.set(n,t),this.size+=r.size==e?0:1,this}function vr(n){var t=-1,r=null==n?0:n.length;for(this.__data__=new ar;++t<r;)this.add(n[t])}function gr(n){return this.__data__.set(n,rn),this}function yr(n){
return this.__data__.has(n)}function dr(n){this.size=(this.__data__=new er(n)).size}function br(){this.__data__=new er,this.size=0}function wr(n){var t=this.__data__,r=t.delete(n);return this.size=t.size,r}function mr(n){return this.__data__.get(n)}function xr(n){return this.__data__.has(n)}function jr(n,t){var r=this.__data__;if(r instanceof er){var e=r.__data__;if(!Xl||e.length<X-1)return e.push([n,t]),this.size=++r.size,this;r=this.__data__=new ar(e)}return r.set(n,t),this.size=r.size,this}function Ar(n,t){
var r=yh(n),e=!r&&gh(n),u=!r&&!e&&bh(n),i=!r&&!e&&!u&&Ah(n),o=r||e||u||i,f=o?O(n.length,ll):[],c=f.length;for(var a in n)!t&&!yl.call(n,a)||o&&("length"==a||u&&("offset"==a||"parent"==a)||i&&("buffer"==a||"byteLength"==a||"byteOffset"==a)||Wi(a,c))||f.push(a);return f}function kr(n){var t=n.length;return t?n[Xe(0,t-1)]:Y}function Or(n,t){return Yi(Uu(n),$r(t,0,n.length))}function Ir(n){return Yi(Uu(n))}function Rr(n,t,r){(r===Y||Kf(n[t],r))&&(r!==Y||t in n)||Cr(n,t,r)}function zr(n,t,r){var e=n[t];
yl.call(n,t)&&Kf(e,r)&&(r!==Y||t in n)||Cr(n,t,r)}function Er(n,t){for(var r=n.length;r--;)if(Kf(n[r][0],t))return r;return-1}function Sr(n,t,r,e){return vs(n,function(n,u,i){t(e,n,r(n),i)}),e}function Wr(n,t){return n&&Bu(t,Fc(t),n)}function Lr(n,t){return n&&Bu(t,Nc(t),n)}function Cr(n,t,r){"__proto__"==t&&Ul?Ul(n,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):n[t]=r}function Tr(n,t){for(var r=-1,e=t.length,u=el(e),i=null==n;++r<e;)u[r]=i?Y:$c(n,t[r]);return u}function $r(n,t,r){return n===n&&(r!==Y&&(n=n<=r?n:r),
t!==Y&&(n=n>=t?n:t)),n}function Dr(n,t,e,u,i,o){var f,c=t&on,a=t&fn,l=t&cn;if(e&&(f=i?e(n,u,i,o):e(n)),f!==Y)return f;if(!ic(n))return n;var s=yh(n);if(s){if(f=Ii(n),!c)return Uu(n,f)}else{var h=Is(n),p=h==Pn||h==qn;if(bh(n))return ku(n,c);if(h==Gn||h==Bn||p&&!i){if(f=a||p?{}:Ri(n),!c)return a?$u(n,Lr(f,n)):Tu(n,Wr(f,n))}else{if(!qr[h])return i?n:{};f=zi(n,h,c)}}o||(o=new dr);var _=o.get(n);if(_)return _;o.set(n,f),jh(n)?n.forEach(function(r){f.add(Dr(r,t,e,r,n,o))}):mh(n)&&n.forEach(function(r,u){
f.set(u,Dr(r,t,e,u,n,o))});var v=l?a?gi:vi:a?Nc:Fc,g=s?Y:v(n);return r(g||n,function(r,u){g&&(u=r,r=n[u]),zr(f,u,Dr(r,t,e,u,n,o))}),f}function Mr(n){var t=Fc(n);return function(r){return Zr(r,n,t)}}function Zr(n,t,r){var e=r.length;if(null==n)return!e;for(n=cl(n);e--;){var u=r[e],i=t[u],o=n[u];if(o===Y&&!(u in n)||!i(o))return!1}return!0}function Kr(n,t,r){if("function"!=typeof n)throw new sl(tn);return Es(function(){n.apply(Y,r)},t)}function Vr(n,t,r,e){var u=-1,i=o,a=!0,l=n.length,s=[],h=t.length;
if(!l)return s;r&&(t=c(t,R(r))),e?(i=f,a=!1):t.length>=X&&(i=E,a=!1,t=new vr(t));n:for(;++u<l;){var p=n[u],_=null==r?p:r(p);if(p=e||0!==p?p:0,a&&_===_){for(var v=h;v--;)if(t[v]===_)continue n;s.push(p)}else i(t,_,e)||s.push(p)}return s}function Gr(n,t){var r=!0;return vs(n,function(n,e,u){return r=!!t(n,e,u)}),r}function Yr(n,t,r){for(var e=-1,u=n.length;++e<u;){var i=n[e],o=t(i);if(null!=o&&(f===Y?o===o&&!yc(o):r(o,f)))var f=o,c=i}return c}function Qr(n,t,r,e){var u=n.length;for(r=jc(r),r<0&&(r=-r>u?0:u+r),
e=e===Y||e>u?u:jc(e),e<0&&(e+=u),e=r>e?0:Ac(e);r<e;)n[r++]=t;return n}function ne(n,t){var r=[];return vs(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function te(n,t,r,e,u){var i=-1,o=n.length;for(r||(r=Si),u||(u=[]);++i<o;){var f=n[i];t>0&&r(f)?t>1?te(f,t-1,r,e,u):a(u,f):e||(u[u.length]=f)}return u}function ee(n,t){return n&&ys(n,t,Fc)}function ue(n,t){return n&&ds(n,t,Fc)}function se(n,t){return i(t,function(t){return rc(n[t])})}function ve(n,t){t=ju(t,n);for(var r=0,e=t.length;null!=n&&r<e;)n=n[Qi(t[r++])];
return r&&r==e?n:Y}function ye(n,t,r){var e=t(n);return yh(n)?e:a(e,r(n))}function de(n){return null==n?n===Y?tt:Vn:Cl&&Cl in cl(n)?ji(n):qi(n)}function be(n,t){return n>t}function we(n,t){return null!=n&&yl.call(n,t)}function me(n,t){return null!=n&&t in cl(n)}function xe(n,t,r){return n>=Vl(t,r)&&n<Kl(t,r)}function je(n,t,r){for(var e=r?f:o,u=n[0].length,i=n.length,a=i,l=el(i),s=1/0,h=[];a--;){var p=n[a];a&&t&&(p=c(p,R(t))),s=Vl(p.length,s),l[a]=!r&&(t||u>=120&&p.length>=120)?new vr(a&&p):Y}p=n[0];
var _=-1,v=l[0];n:for(;++_<u&&h.length<s;){var g=p[_],y=t?t(g):g;if(g=r||0!==g?g:0,!(v?E(v,y):e(h,y,r))){for(a=i;--a;){var d=l[a];if(!(d?E(d,y):e(n[a],y,r)))continue n}v&&v.push(y),h.push(g)}}return h}function Ae(n,t,r,e){return ee(n,function(n,u,i){t(e,r(n),u,i)}),e}function ke(t,r,e){r=ju(r,t),t=Ki(t,r);var u=null==t?t:t[Qi(mo(r))];return null==u?Y:n(u,t,e)}function Oe(n){return oc(n)&&de(n)==Bn}function Ie(n){return oc(n)&&de(n)==ut}function Re(n){return oc(n)&&de(n)==Mn}function ze(n,t,r,e,u){
return n===t||(null==n||null==t||!oc(n)&&!oc(t)?n!==n&&t!==t:Ee(n,t,r,e,ze,u))}function Ee(n,t,r,e,u,i){var o=yh(n),f=yh(t),c=o?Tn:Is(n),a=f?Tn:Is(t);c=c==Bn?Gn:c,a=a==Bn?Gn:a;var l=c==Gn,s=a==Gn,h=c==a;if(h&&bh(n)){if(!bh(t))return!1;o=!0,l=!1}if(h&&!l)return i||(i=new dr),o||Ah(n)?si(n,t,r,e,u,i):hi(n,t,c,r,e,u,i);if(!(r&an)){var p=l&&yl.call(n,"__wrapped__"),_=s&&yl.call(t,"__wrapped__");if(p||_){var v=p?n.value():n,g=_?t.value():t;return i||(i=new dr),u(v,g,r,e,i)}}return!!h&&(i||(i=new dr),pi(n,t,r,e,u,i));
}function Se(n){return oc(n)&&Is(n)==Zn}function We(n,t,r,e){var u=r.length,i=u,o=!e;if(null==n)return!i;for(n=cl(n);u--;){var f=r[u];if(o&&f[2]?f[1]!==n[f[0]]:!(f[0]in n))return!1}for(;++u<i;){f=r[u];var c=f[0],a=n[c],l=f[1];if(o&&f[2]){if(a===Y&&!(c in n))return!1}else{var s=new dr;if(e)var h=e(a,l,c,n,t,s);if(!(h===Y?ze(l,a,an|ln,e,s):h))return!1}}return!0}function Le(n){return!(!ic(n)||Ti(n))&&(rc(n)?jl:Nt).test(Xi(n))}function Ce(n){return oc(n)&&de(n)==Yn}function Ue(n){return oc(n)&&Is(n)==Qn;
}function Be(n){return oc(n)&&uc(n.length)&&!!Pr[de(n)]}function Te(n){return"function"==typeof n?n:null==n?Sa:"object"==typeof n?yh(n)?Pe(n[0],n[1]):Ne(n):Da(n)}function $e(n){if(!$i(n))return Zl(n);var t=[];for(var r in cl(n))yl.call(n,r)&&"constructor"!=r&&t.push(r);return t}function De(n){if(!ic(n))return Pi(n);var t=$i(n),r=[];for(var e in n)("constructor"!=e||!t&&yl.call(n,e))&&r.push(e);return r}function Me(n,t){return n<t}function Fe(n,t){var r=-1,e=Vf(n)?el(n.length):[];return vs(n,function(n,u,i){
e[++r]=t(n,u,i)}),e}function Ne(n){var t=mi(n);return 1==t.length&&t[0][2]?Mi(t[0][0],t[0][1]):function(r){return r===n||We(r,n,t)}}function Pe(n,t){return Ci(n)&&Di(t)?Mi(Qi(n),t):function(r){var e=$c(r,n);return e===Y&&e===t?Mc(r,n):ze(t,e,an|ln)}}function qe(n,t,r,e,u){n!==t&&ys(t,function(i,o){if(u||(u=new dr),ic(i))Ze(n,t,o,r,qe,e,u);else{var f=e?e(Gi(n,o),i,o+"",n,t,u):Y;f===Y&&(f=i),Rr(n,o,f)}},Nc)}function Ze(n,t,r,e,u,i,o){var f=Gi(n,r),c=Gi(t,r),a=o.get(c);if(a)return Rr(n,r,a),Y;var l=i?i(f,c,r+"",n,t,o):Y,s=l===Y;
if(s){var h=yh(c),p=!h&&bh(c),_=!h&&!p&&Ah(c);l=c,h||p||_?yh(f)?l=f:Gf(f)?l=Uu(f):p?(s=!1,l=ku(c,!0)):_?(s=!1,l=Eu(c,!0)):l=[]:_c(c)||gh(c)?(l=f,gh(f)?l=Oc(f):ic(f)&&!rc(f)||(l=Ri(c))):s=!1}s&&(o.set(c,l),u(l,c,e,i,o),o.delete(c)),Rr(n,r,l)}function Ke(n,t){var r=n.length;if(r)return t+=t<0?r:0,Wi(t,r)?n[t]:Y}function Ve(n,t,r){t=t.length?c(t,function(n){return yh(n)?function(t){return ve(t,1===n.length?n[0]:n)}:n}):[Sa];var e=-1;return t=c(t,R(bi())),A(Fe(n,function(n,r,u){return{criteria:c(t,function(t){
return t(n)}),index:++e,value:n}}),function(n,t){return Wu(n,t,r)})}function Ge(n,t){return He(n,t,function(t,r){return Mc(n,r)})}function He(n,t,r){for(var e=-1,u=t.length,i={};++e<u;){var o=t[e],f=ve(n,o);r(f,o)&&iu(i,ju(o,n),f)}return i}function Je(n){return function(t){return ve(t,n)}}function Ye(n,t,r,e){var u=e?d:y,i=-1,o=t.length,f=n;for(n===t&&(t=Uu(t)),r&&(f=c(n,R(r)));++i<o;)for(var a=0,l=t[i],s=r?r(l):l;(a=u(f,s,a,e))>-1;)f!==n&&Sl.call(f,a,1),Sl.call(n,a,1);return n}function Qe(n,t){for(var r=n?t.length:0,e=r-1;r--;){
var u=t[r];if(r==e||u!==i){var i=u;Wi(u)?Sl.call(n,u,1):vu(n,u)}}return n}function Xe(n,t){return n+Ml(Jl()*(t-n+1))}function nu(n,t,r,e){for(var u=-1,i=Kl(Dl((t-n)/(r||1)),0),o=el(i);i--;)o[e?i:++u]=n,n+=r;return o}function tu(n,t){var r="";if(!n||t<1||t>zn)return r;do t%2&&(r+=n),t=Ml(t/2),t&&(n+=n);while(t);return r}function ru(n,t){return Ss(Zi(n,t,Sa),n+"")}function eu(n){return kr(na(n))}function uu(n,t){var r=na(n);return Yi(r,$r(t,0,r.length))}function iu(n,t,r,e){if(!ic(n))return n;t=ju(t,n);
for(var u=-1,i=t.length,o=i-1,f=n;null!=f&&++u<i;){var c=Qi(t[u]),a=r;if("__proto__"===c||"constructor"===c||"prototype"===c)return n;if(u!=o){var l=f[c];a=e?e(l,c,f):Y,a===Y&&(a=ic(l)?l:Wi(t[u+1])?[]:{})}zr(f,c,a),f=f[c]}return n}function ou(n){return Yi(na(n))}function fu(n,t,r){var e=-1,u=n.length;t<0&&(t=-t>u?0:u+t),r=r>u?u:r,r<0&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0;for(var i=el(u);++e<u;)i[e]=n[e+t];return i}function cu(n,t){var r;return vs(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function au(n,t,r){
var e=0,u=null==n?e:n.length;if("number"==typeof t&&t===t&&u<=Cn){for(;e<u;){var i=e+u>>>1,o=n[i];null!==o&&!yc(o)&&(r?o<=t:o<t)?e=i+1:u=i}return u}return lu(n,t,Sa,r)}function lu(n,t,r,e){var u=0,i=null==n?0:n.length;if(0===i)return 0;t=r(t);for(var o=t!==t,f=null===t,c=yc(t),a=t===Y;u<i;){var l=Ml((u+i)/2),s=r(n[l]),h=s!==Y,p=null===s,_=s===s,v=yc(s);if(o)var g=e||_;else g=a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):!p&&!v&&(e?s<=t:s<t);g?u=l+1:i=l}return Vl(i,Ln)}function su(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){
var o=n[r],f=t?t(o):o;if(!r||!Kf(f,c)){var c=f;i[u++]=0===o?0:o}}return i}function hu(n){return"number"==typeof n?n:yc(n)?Sn:+n}function pu(n){if("string"==typeof n)return n;if(yh(n))return c(n,pu)+"";if(yc(n))return ps?ps.call(n):"";var t=n+"";return"0"==t&&1/n==-Rn?"-0":t}function _u(n,t,r){var e=-1,u=o,i=n.length,c=!0,a=[],l=a;if(r)c=!1,u=f;else if(i>=X){var s=t?null:js(n);if(s)return N(s);c=!1,u=E,l=new vr}else l=t?[]:a;n:for(;++e<i;){var h=n[e],p=t?t(h):h;if(h=r||0!==h?h:0,c&&p===p){for(var _=l.length;_--;)if(l[_]===p)continue n;
t&&l.push(p),a.push(h)}else u(l,p,r)||(l!==a&&l.push(p),a.push(h))}return a}function vu(n,t){return t=ju(t,n),n=Ki(n,t),null==n||delete n[Qi(mo(t))]}function gu(n,t,r,e){return iu(n,t,r(ve(n,t)),e)}function yu(n,t,r,e){for(var u=n.length,i=e?u:-1;(e?i--:++i<u)&&t(n[i],i,n););return r?fu(n,e?0:i,e?i+1:u):fu(n,e?i+1:0,e?u:i)}function du(n,t){var r=n;return r instanceof Bt&&(r=r.value()),l(t,function(n,t){return t.func.apply(t.thisArg,a([n],t.args))},r)}function bu(n,t,r){var e=n.length;if(e<2)return e?_u(n[0]):[];
for(var u=-1,i=el(e);++u<e;)for(var o=n[u],f=-1;++f<e;)f!=u&&(i[u]=Vr(i[u]||o,n[f],t,r));return _u(te(i,1),t,r)}function wu(n,t,r){for(var e=-1,u=n.length,i=t.length,o={};++e<u;){r(o,n[e],e<i?t[e]:Y)}return o}function mu(n){return Gf(n)?n:[]}function xu(n){return"function"==typeof n?n:Sa}function ju(n,t){return yh(n)?n:Ci(n,t)?[n]:Ws(Rc(n))}function Au(n,t,r){var e=n.length;return r=r===Y?e:r,!t&&r>=e?n:fu(n,t,r)}function ku(n,t){if(t)return n.slice();var r=n.length,e=Il?Il(r):new n.constructor(r);
return n.copy(e),e}function Ou(n){var t=new n.constructor(n.byteLength);return new Ol(t).set(new Ol(n)),t}function Iu(n,t){return new n.constructor(t?Ou(n.buffer):n.buffer,n.byteOffset,n.byteLength)}function Ru(n){var t=new n.constructor(n.source,Dt.exec(n));return t.lastIndex=n.lastIndex,t}function zu(n){return hs?cl(hs.call(n)):{}}function Eu(n,t){return new n.constructor(t?Ou(n.buffer):n.buffer,n.byteOffset,n.length)}function Su(n,t){if(n!==t){var r=n!==Y,e=null===n,u=n===n,i=yc(n),o=t!==Y,f=null===t,c=t===t,a=yc(t);
if(!f&&!a&&!i&&n>t||i&&o&&c&&!f&&!a||e&&o&&c||!r&&c||!u)return 1;if(!e&&!i&&!a&&n<t||a&&r&&u&&!e&&!i||f&&r&&u||!o&&u||!c)return-1}return 0}function Wu(n,t,r){for(var e=-1,u=n.criteria,i=t.criteria,o=u.length,f=r.length;++e<o;){var c=Su(u[e],i[e]);if(c){if(e>=f)return c;return c*("desc"==r[e]?-1:1)}}return n.index-t.index}function Lu(n,t,r,e){for(var u=-1,i=n.length,o=r.length,f=-1,c=t.length,a=Kl(i-o,0),l=el(c+a),s=!e;++f<c;)l[f]=t[f];for(;++u<o;)(s||u<i)&&(l[r[u]]=n[u]);for(;a--;)l[f++]=n[u++];return l;
}function Cu(n,t,r,e){for(var u=-1,i=n.length,o=-1,f=r.length,c=-1,a=t.length,l=Kl(i-f,0),s=el(l+a),h=!e;++u<l;)s[u]=n[u];for(var p=u;++c<a;)s[p+c]=t[c];for(;++o<f;)(h||u<i)&&(s[p+r[o]]=n[u++]);return s}function Uu(n,t){var r=-1,e=n.length;for(t||(t=el(e));++r<e;)t[r]=n[r];return t}function Bu(n,t,r,e){var u=!r;r||(r={});for(var i=-1,o=t.length;++i<o;){var f=t[i],c=e?e(r[f],n[f],f,r,n):Y;c===Y&&(c=n[f]),u?Cr(r,f,c):zr(r,f,c)}return r}function Tu(n,t){return Bu(n,ks(n),t)}function $u(n,t){return Bu(n,Os(n),t);
}function Du(n,r){return function(e,u){var i=yh(e)?t:Sr,o=r?r():{};return i(e,n,bi(u,2),o)}}function Mu(n){return ru(function(t,r){var e=-1,u=r.length,i=u>1?r[u-1]:Y,o=u>2?r[2]:Y;for(i=n.length>3&&"function"==typeof i?(u--,i):Y,o&&Li(r[0],r[1],o)&&(i=u<3?Y:i,u=1),t=cl(t);++e<u;){var f=r[e];f&&n(t,f,e,i)}return t})}function Fu(n,t){return function(r,e){if(null==r)return r;if(!Vf(r))return n(r,e);for(var u=r.length,i=t?u:-1,o=cl(r);(t?i--:++i<u)&&e(o[i],i,o)!==!1;);return r}}function Nu(n){return function(t,r,e){
for(var u=-1,i=cl(t),o=e(t),f=o.length;f--;){var c=o[n?f:++u];if(r(i[c],c,i)===!1)break}return t}}function Pu(n,t,r){function e(){return(this&&this!==Xr&&this instanceof e?i:n).apply(u?r:this,arguments)}var u=t&sn,i=Ku(n);return e}function qu(n){return function(t){t=Rc(t);var r=B(t)?V(t):Y,e=r?r[0]:t.charAt(0),u=r?Au(r,1).join(""):t.slice(1);return e[n]()+u}}function Zu(n){return function(t){return l(Oa(oa(t).replace(Ur,"")),n,"")}}function Ku(n){return function(){var t=arguments;switch(t.length){
case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=_s(n.prototype),e=n.apply(r,t);return ic(e)?e:r}}function Vu(t,r,e){function u(){for(var o=arguments.length,f=el(o),c=o,a=di(u);c--;)f[c]=arguments[c];var l=o<3&&f[0]!==a&&f[o-1]!==a?[]:F(f,a);
return o-=l.length,o<e?ui(t,r,Ju,u.placeholder,Y,f,l,Y,Y,e-o):n(this&&this!==Xr&&this instanceof u?i:t,this,f)}var i=Ku(t);return u}function Gu(n){return function(t,r,e){var u=cl(t);if(!Vf(t)){var i=bi(r,3);t=Fc(t),r=function(n){return i(u[n],n,u)}}var o=n(t,r,e);return o>-1?u[i?t[o]:o]:Y}}function Hu(n){return _i(function(t){var r=t.length,e=r,u=H.prototype.thru;for(n&&t.reverse();e--;){var i=t[e];if("function"!=typeof i)throw new sl(tn);if(u&&!o&&"wrapper"==yi(i))var o=new H([],!0)}for(e=o?e:r;++e<r;){
i=t[e];var f=yi(i),c="wrapper"==f?As(i):Y;o=c&&Bi(c[0])&&c[1]==(dn|_n|gn|bn)&&!c[4].length&&1==c[9]?o[yi(c[0])].apply(o,c[3]):1==i.length&&Bi(i)?o[f]():o.thru(i)}return function(){var n=arguments,e=n[0];if(o&&1==n.length&&yh(e))return o.plant(e).value();for(var u=0,i=r?t[u].apply(this,n):e;++u<r;)i=t[u].call(this,i);return i}})}function Ju(n,t,r,e,u,i,o,f,c,a){function l(){for(var y=arguments.length,d=el(y),b=y;b--;)d[b]=arguments[b];if(_)var w=di(l),m=L(d,w);if(e&&(d=Lu(d,e,u,_)),i&&(d=Cu(d,i,o,_)),
y-=m,_&&y<a){return ui(n,t,Ju,l.placeholder,r,d,F(d,w),f,c,a-y)}var x=h?r:this,j=p?x[n]:n;return y=d.length,f?d=Vi(d,f):v&&y>1&&d.reverse(),s&&c<y&&(d.length=c),this&&this!==Xr&&this instanceof l&&(j=g||Ku(j)),j.apply(x,d)}var s=t&dn,h=t&sn,p=t&hn,_=t&(_n|vn),v=t&wn,g=p?Y:Ku(n);return l}function Yu(n,t){return function(r,e){return Ae(r,n,t(e),{})}}function Qu(n,t){return function(r,e){var u;if(r===Y&&e===Y)return t;if(r!==Y&&(u=r),e!==Y){if(u===Y)return e;"string"==typeof r||"string"==typeof e?(r=pu(r),
e=pu(e)):(r=hu(r),e=hu(e)),u=n(r,e)}return u}}function Xu(t){return _i(function(r){return r=c(r,R(bi())),ru(function(e){var u=this;return t(r,function(t){return n(t,u,e)})})})}function ni(n,t){t=t===Y?" ":pu(t);var r=t.length;if(r<2)return r?tu(t,n):t;var e=tu(t,Dl(n/K(t)));return B(t)?Au(V(e),0,n).join(""):e.slice(0,n)}function ti(t,r,e,u){function i(){for(var r=-1,c=arguments.length,a=-1,l=u.length,s=el(l+c),h=this&&this!==Xr&&this instanceof i?f:t;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++r];
return n(h,o?e:this,s)}var o=r&sn,f=Ku(t);return i}function ri(n){return function(t,r,e){return e&&"number"!=typeof e&&Li(t,r,e)&&(r=e=Y),t=xc(t),r===Y?(r=t,t=0):r=xc(r),e=e===Y?t<r?1:-1:xc(e),nu(t,r,e,n)}}function ei(n){return function(t,r){return"string"==typeof t&&"string"==typeof r||(t=kc(t),r=kc(r)),n(t,r)}}function ui(n,t,r,e,u,i,o,f,c,a){var l=t&_n,s=l?o:Y,h=l?Y:o,p=l?i:Y,_=l?Y:i;t|=l?gn:yn,t&=~(l?yn:gn),t&pn||(t&=~(sn|hn));var v=[n,t,u,p,s,_,h,f,c,a],g=r.apply(Y,v);return Bi(n)&&zs(g,v),g.placeholder=e,
Hi(g,n,t)}function ii(n){var t=fl[n];return function(n,r){if(n=kc(n),r=null==r?0:Vl(jc(r),292),r&&Pl(n)){var e=(Rc(n)+"e").split("e");return e=(Rc(t(e[0]+"e"+(+e[1]+r)))+"e").split("e"),+(e[0]+"e"+(+e[1]-r))}return t(n)}}function oi(n){return function(t){var r=Is(t);return r==Zn?D(t):r==Qn?P(t):I(t,n(t))}}function fi(n,t,r,e,u,i,o,f){var c=t&hn;if(!c&&"function"!=typeof n)throw new sl(tn);var a=e?e.length:0;if(a||(t&=~(gn|yn),e=u=Y),o=o===Y?o:Kl(jc(o),0),f=f===Y?f:jc(f),a-=u?u.length:0,t&yn){var l=e,s=u;
e=u=Y}var h=c?Y:As(n),p=[n,t,r,e,u,l,s,i,o,f];if(h&&Ni(p,h),n=p[0],t=p[1],r=p[2],e=p[3],u=p[4],f=p[9]=p[9]===Y?c?0:n.length:Kl(p[9]-a,0),!f&&t&(_n|vn)&&(t&=~(_n|vn)),t&&t!=sn)_=t==_n||t==vn?Vu(n,t,f):t!=gn&&t!=(sn|gn)||u.length?Ju.apply(Y,p):ti(n,t,r,e);else var _=Pu(n,t,r);return Hi((h?bs:zs)(_,p),n,t)}function ci(n,t,r,e){return n===Y||Kf(n,_l[r])&&!yl.call(e,r)?t:n}function ai(n,t,r,e,u,i){return ic(n)&&ic(t)&&(i.set(t,n),qe(n,t,Y,ai,i),i.delete(t)),n}function li(n){return _c(n)?Y:n}function si(n,t,r,e,u,i){
var o=r&an,f=n.length,c=t.length;if(f!=c&&!(o&&c>f))return!1;var a=i.get(n),l=i.get(t);if(a&&l)return a==t&&l==n;var s=-1,p=!0,_=r&ln?new vr:Y;for(i.set(n,t),i.set(t,n);++s<f;){var v=n[s],g=t[s];if(e)var y=o?e(g,v,s,t,n,i):e(v,g,s,n,t,i);if(y!==Y){if(y)continue;p=!1;break}if(_){if(!h(t,function(n,t){if(!E(_,t)&&(v===n||u(v,n,r,e,i)))return _.push(t)})){p=!1;break}}else if(v!==g&&!u(v,g,r,e,i)){p=!1;break}}return i.delete(n),i.delete(t),p}function hi(n,t,r,e,u,i,o){switch(r){case it:if(n.byteLength!=t.byteLength||n.byteOffset!=t.byteOffset)return!1;
n=n.buffer,t=t.buffer;case ut:return!(n.byteLength!=t.byteLength||!i(new Ol(n),new Ol(t)));case Dn:case Mn:case Kn:return Kf(+n,+t);case Nn:return n.name==t.name&&n.message==t.message;case Yn:case Xn:return n==t+"";case Zn:var f=D;case Qn:var c=e&an;if(f||(f=N),n.size!=t.size&&!c)return!1;var a=o.get(n);if(a)return a==t;e|=ln,o.set(n,t);var l=si(f(n),f(t),e,u,i,o);return o.delete(n),l;case nt:if(hs)return hs.call(n)==hs.call(t)}return!1}function pi(n,t,r,e,u,i){var o=r&an,f=vi(n),c=f.length;if(c!=vi(t).length&&!o)return!1;
for(var a=c;a--;){var l=f[a];if(!(o?l in t:yl.call(t,l)))return!1}var s=i.get(n),h=i.get(t);if(s&&h)return s==t&&h==n;var p=!0;i.set(n,t),i.set(t,n);for(var _=o;++a<c;){l=f[a];var v=n[l],g=t[l];if(e)var y=o?e(g,v,l,t,n,i):e(v,g,l,n,t,i);if(!(y===Y?v===g||u(v,g,r,e,i):y)){p=!1;break}_||(_="constructor"==l)}if(p&&!_){var d=n.constructor,b=t.constructor;d!=b&&"constructor"in n&&"constructor"in t&&!("function"==typeof d&&d instanceof d&&"function"==typeof b&&b instanceof b)&&(p=!1)}return i.delete(n),
i.delete(t),p}function _i(n){return Ss(Zi(n,Y,ho),n+"")}function vi(n){return ye(n,Fc,ks)}function gi(n){return ye(n,Nc,Os)}function yi(n){for(var t=n.name+"",r=is[t],e=yl.call(is,t)?r.length:0;e--;){var u=r[e],i=u.func;if(null==i||i==n)return u.name}return t}function di(n){return(yl.call(q,"placeholder")?q:n).placeholder}function bi(){var n=q.iteratee||Wa;return n=n===Wa?Te:n,arguments.length?n(arguments[0],arguments[1]):n}function wi(n,t){var r=n.__data__;return Ui(t)?r["string"==typeof t?"string":"hash"]:r.map;
}function mi(n){for(var t=Fc(n),r=t.length;r--;){var e=t[r],u=n[e];t[r]=[e,u,Di(u)]}return t}function xi(n,t){var r=U(n,t);return Le(r)?r:Y}function ji(n){var t=yl.call(n,Cl),r=n[Cl];try{n[Cl]=Y;var e=!0}catch(n){}var u=wl.call(n);return e&&(t?n[Cl]=r:delete n[Cl]),u}function Ai(n,t,r){for(var e=-1,u=r.length;++e<u;){var i=r[e],o=i.size;switch(i.type){case"drop":n+=o;break;case"dropRight":t-=o;break;case"take":t=Vl(t,n+o);break;case"takeRight":n=Kl(n,t-o)}}return{start:n,end:t}}function ki(n){var t=n.match(Ct);
return t?t[1].split(Ut):[]}function Oi(n,t,r){t=ju(t,n);for(var e=-1,u=t.length,i=!1;++e<u;){var o=Qi(t[e]);if(!(i=null!=n&&r(n,o)))break;n=n[o]}return i||++e!=u?i:(u=null==n?0:n.length,!!u&&uc(u)&&Wi(o,u)&&(yh(n)||gh(n)))}function Ii(n){var t=n.length,r=new n.constructor(t);return t&&"string"==typeof n[0]&&yl.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function Ri(n){return"function"!=typeof n.constructor||$i(n)?{}:_s(Rl(n))}function zi(n,t,r){var e=n.constructor;switch(t){case ut:return Ou(n);
case Dn:case Mn:return new e(+n);case it:return Iu(n,r);case ot:case ft:case ct:case at:case lt:case st:case ht:case pt:case _t:return Eu(n,r);case Zn:return new e;case Kn:case Xn:return new e(n);case Yn:return Ru(n);case Qn:return new e;case nt:return zu(n)}}function Ei(n,t){var r=t.length;if(!r)return n;var e=r-1;return t[e]=(r>1?"& ":"")+t[e],t=t.join(r>2?", ":" "),n.replace(Lt,"{\n/* [wrapped with "+t+"] */\n")}function Si(n){return yh(n)||gh(n)||!!(Wl&&n&&n[Wl])}function Wi(n,t){var r=typeof n;
return t=null==t?zn:t,!!t&&("number"==r||"symbol"!=r&&qt.test(n))&&n>-1&&n%1==0&&n<t}function Li(n,t,r){if(!ic(r))return!1;var e=typeof t;return!!("number"==e?Vf(r)&&Wi(t,r.length):"string"==e&&t in r)&&Kf(r[t],n)}function Ci(n,t){if(yh(n))return!1;var r=typeof n;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=n&&!yc(n))||(Ot.test(n)||!kt.test(n)||null!=t&&n in cl(t))}function Ui(n){var t=typeof n;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==n:null===n}function Bi(n){
var t=yi(n),r=q[t];if("function"!=typeof r||!(t in Bt.prototype))return!1;if(n===r)return!0;var e=As(r);return!!e&&n===e[0]}function Ti(n){return!!bl&&bl in n}function $i(n){var t=n&&n.constructor;return n===("function"==typeof t&&t.prototype||_l)}function Di(n){return n===n&&!ic(n)}function Mi(n,t){return function(r){return null!=r&&(r[n]===t&&(t!==Y||n in cl(r)))}}function Fi(n){var t=Wf(n,function(n){return r.size===en&&r.clear(),n}),r=t.cache;return t}function Ni(n,t){var r=n[1],e=t[1],u=r|e,i=u<(sn|hn|dn),o=e==dn&&r==_n||e==dn&&r==bn&&n[7].length<=t[8]||e==(dn|bn)&&t[7].length<=t[8]&&r==_n;
if(!i&&!o)return n;e&sn&&(n[2]=t[2],u|=r&sn?0:pn);var f=t[3];if(f){var c=n[3];n[3]=c?Lu(c,f,t[4]):f,n[4]=c?F(n[3],un):t[4]}return f=t[5],f&&(c=n[5],n[5]=c?Cu(c,f,t[6]):f,n[6]=c?F(n[5],un):t[6]),f=t[7],f&&(n[7]=f),e&dn&&(n[8]=null==n[8]?t[8]:Vl(n[8],t[8])),null==n[9]&&(n[9]=t[9]),n[0]=t[0],n[1]=u,n}function Pi(n){var t=[];if(null!=n)for(var r in cl(n))t.push(r);return t}function qi(n){return wl.call(n)}function Zi(t,r,e){return r=Kl(r===Y?t.length-1:r,0),function(){for(var u=arguments,i=-1,o=Kl(u.length-r,0),f=el(o);++i<o;)f[i]=u[r+i];
i=-1;for(var c=el(r+1);++i<r;)c[i]=u[i];return c[r]=e(f),n(t,this,c)}}function Ki(n,t){return t.length<2?n:ve(n,fu(t,0,-1))}function Vi(n,t){for(var r=n.length,e=Vl(t.length,r),u=Uu(n);e--;){var i=t[e];n[e]=Wi(i,r)?u[i]:Y}return n}function Gi(n,t){if(("constructor"!==t||"function"!=typeof n[t])&&"__proto__"!=t)return n[t]}function Hi(n,t,r){var e=t+"";return Ss(n,Ei(e,no(ki(e),r)))}function Ji(n){var t=0,r=0;return function(){var e=Gl(),u=An-(e-r);if(r=e,u>0){if(++t>=jn)return arguments[0]}else t=0;
return n.apply(Y,arguments)}}function Yi(n,t){var r=-1,e=n.length,u=e-1;for(t=t===Y?e:t;++r<t;){var i=Xe(r,u),o=n[i];n[i]=n[r],n[r]=o}return n.length=t,n}function Qi(n){if("string"==typeof n||yc(n))return n;var t=n+"";return"0"==t&&1/n==-Rn?"-0":t}function Xi(n){if(null!=n){try{return gl.call(n)}catch(n){}try{return n+""}catch(n){}}return""}function no(n,t){return r(Un,function(r){var e="_."+r[0];t&r[1]&&!o(n,e)&&n.push(e)}),n.sort()}function to(n){if(n instanceof Bt)return n.clone();var t=new H(n.__wrapped__,n.__chain__);
return t.__actions__=Uu(n.__actions__),t.__index__=n.__index__,t.__values__=n.__values__,t}function ro(n,t,r){t=(r?Li(n,t,r):t===Y)?1:Kl(jc(t),0);var e=null==n?0:n.length;if(!e||t<1)return[];for(var u=0,i=0,o=el(Dl(e/t));u<e;)o[i++]=fu(n,u,u+=t);return o}function eo(n){for(var t=-1,r=null==n?0:n.length,e=0,u=[];++t<r;){var i=n[t];i&&(u[e++]=i)}return u}function uo(){var n=arguments.length;if(!n)return[];for(var t=el(n-1),r=arguments[0],e=n;e--;)t[e-1]=arguments[e];return a(yh(r)?Uu(r):[r],te(t,1));
}function io(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===Y?1:jc(t),fu(n,t<0?0:t,e)):[]}function oo(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===Y?1:jc(t),t=e-t,fu(n,0,t<0?0:t)):[]}function fo(n,t){return n&&n.length?yu(n,bi(t,3),!0,!0):[]}function co(n,t){return n&&n.length?yu(n,bi(t,3),!0):[]}function ao(n,t,r,e){var u=null==n?0:n.length;return u?(r&&"number"!=typeof r&&Li(n,t,r)&&(r=0,e=u),Qr(n,t,r,e)):[]}function lo(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=null==r?0:jc(r);
return u<0&&(u=Kl(e+u,0)),g(n,bi(t,3),u)}function so(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e-1;return r!==Y&&(u=jc(r),u=r<0?Kl(e+u,0):Vl(u,e-1)),g(n,bi(t,3),u,!0)}function ho(n){return(null==n?0:n.length)?te(n,1):[]}function po(n){return(null==n?0:n.length)?te(n,Rn):[]}function _o(n,t){return(null==n?0:n.length)?(t=t===Y?1:jc(t),te(n,t)):[]}function vo(n){for(var t=-1,r=null==n?0:n.length,e={};++t<r;){var u=n[t];e[u[0]]=u[1]}return e}function go(n){return n&&n.length?n[0]:Y}function yo(n,t,r){
var e=null==n?0:n.length;if(!e)return-1;var u=null==r?0:jc(r);return u<0&&(u=Kl(e+u,0)),y(n,t,u)}function bo(n){return(null==n?0:n.length)?fu(n,0,-1):[]}function wo(n,t){return null==n?"":ql.call(n,t)}function mo(n){var t=null==n?0:n.length;return t?n[t-1]:Y}function xo(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e;return r!==Y&&(u=jc(r),u=u<0?Kl(e+u,0):Vl(u,e-1)),t===t?Z(n,t,u):g(n,b,u,!0)}function jo(n,t){return n&&n.length?Ke(n,jc(t)):Y}function Ao(n,t){return n&&n.length&&t&&t.length?Ye(n,t):n;
}function ko(n,t,r){return n&&n.length&&t&&t.length?Ye(n,t,bi(r,2)):n}function Oo(n,t,r){return n&&n.length&&t&&t.length?Ye(n,t,Y,r):n}function Io(n,t){var r=[];if(!n||!n.length)return r;var e=-1,u=[],i=n.length;for(t=bi(t,3);++e<i;){var o=n[e];t(o,e,n)&&(r.push(o),u.push(e))}return Qe(n,u),r}function Ro(n){return null==n?n:Yl.call(n)}function zo(n,t,r){var e=null==n?0:n.length;return e?(r&&"number"!=typeof r&&Li(n,t,r)?(t=0,r=e):(t=null==t?0:jc(t),r=r===Y?e:jc(r)),fu(n,t,r)):[]}function Eo(n,t){
return au(n,t)}function So(n,t,r){return lu(n,t,bi(r,2))}function Wo(n,t){var r=null==n?0:n.length;if(r){var e=au(n,t);if(e<r&&Kf(n[e],t))return e}return-1}function Lo(n,t){return au(n,t,!0)}function Co(n,t,r){return lu(n,t,bi(r,2),!0)}function Uo(n,t){if(null==n?0:n.length){var r=au(n,t,!0)-1;if(Kf(n[r],t))return r}return-1}function Bo(n){return n&&n.length?su(n):[]}function To(n,t){return n&&n.length?su(n,bi(t,2)):[]}function $o(n){var t=null==n?0:n.length;return t?fu(n,1,t):[]}function Do(n,t,r){
return n&&n.length?(t=r||t===Y?1:jc(t),fu(n,0,t<0?0:t)):[]}function Mo(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===Y?1:jc(t),t=e-t,fu(n,t<0?0:t,e)):[]}function Fo(n,t){return n&&n.length?yu(n,bi(t,3),!1,!0):[]}function No(n,t){return n&&n.length?yu(n,bi(t,3)):[]}function Po(n){return n&&n.length?_u(n):[]}function qo(n,t){return n&&n.length?_u(n,bi(t,2)):[]}function Zo(n,t){return t="function"==typeof t?t:Y,n&&n.length?_u(n,Y,t):[]}function Ko(n){if(!n||!n.length)return[];var t=0;return n=i(n,function(n){
if(Gf(n))return t=Kl(n.length,t),!0}),O(t,function(t){return c(n,m(t))})}function Vo(t,r){if(!t||!t.length)return[];var e=Ko(t);return null==r?e:c(e,function(t){return n(r,Y,t)})}function Go(n,t){return wu(n||[],t||[],zr)}function Ho(n,t){return wu(n||[],t||[],iu)}function Jo(n){var t=q(n);return t.__chain__=!0,t}function Yo(n,t){return t(n),n}function Qo(n,t){return t(n)}function Xo(){return Jo(this)}function nf(){return new H(this.value(),this.__chain__)}function tf(){this.__values__===Y&&(this.__values__=mc(this.value()));
var n=this.__index__>=this.__values__.length;return{done:n,value:n?Y:this.__values__[this.__index__++]}}function rf(){return this}function ef(n){for(var t,r=this;r instanceof G;){var e=to(r);e.__index__=0,e.__values__=Y,t?u.__wrapped__=e:t=e;var u=e;r=r.__wrapped__}return u.__wrapped__=n,t}function uf(){var n=this.__wrapped__;if(n instanceof Bt){var t=n;return this.__actions__.length&&(t=new Bt(this)),t=t.reverse(),t.__actions__.push({func:Qo,args:[Ro],thisArg:Y}),new H(t,this.__chain__)}return this.thru(Ro);
}function of(){return du(this.__wrapped__,this.__actions__)}function ff(n,t,r){var e=yh(n)?u:Gr;return r&&Li(n,t,r)&&(t=Y),e(n,bi(t,3))}function cf(n,t){return(yh(n)?i:ne)(n,bi(t,3))}function af(n,t){return te(vf(n,t),1)}function lf(n,t){return te(vf(n,t),Rn)}function sf(n,t,r){return r=r===Y?1:jc(r),te(vf(n,t),r)}function hf(n,t){return(yh(n)?r:vs)(n,bi(t,3))}function pf(n,t){return(yh(n)?e:gs)(n,bi(t,3))}function _f(n,t,r,e){n=Vf(n)?n:na(n),r=r&&!e?jc(r):0;var u=n.length;return r<0&&(r=Kl(u+r,0)),
gc(n)?r<=u&&n.indexOf(t,r)>-1:!!u&&y(n,t,r)>-1}function vf(n,t){return(yh(n)?c:Fe)(n,bi(t,3))}function gf(n,t,r,e){return null==n?[]:(yh(t)||(t=null==t?[]:[t]),r=e?Y:r,yh(r)||(r=null==r?[]:[r]),Ve(n,t,r))}function yf(n,t,r){var e=yh(n)?l:j,u=arguments.length<3;return e(n,bi(t,4),r,u,vs)}function df(n,t,r){var e=yh(n)?s:j,u=arguments.length<3;return e(n,bi(t,4),r,u,gs)}function bf(n,t){return(yh(n)?i:ne)(n,Lf(bi(t,3)))}function wf(n){return(yh(n)?kr:eu)(n)}function mf(n,t,r){return t=(r?Li(n,t,r):t===Y)?1:jc(t),
(yh(n)?Or:uu)(n,t)}function xf(n){return(yh(n)?Ir:ou)(n)}function jf(n){if(null==n)return 0;if(Vf(n))return gc(n)?K(n):n.length;var t=Is(n);return t==Zn||t==Qn?n.size:$e(n).length}function Af(n,t,r){var e=yh(n)?h:cu;return r&&Li(n,t,r)&&(t=Y),e(n,bi(t,3))}function kf(n,t){if("function"!=typeof t)throw new sl(tn);return n=jc(n),function(){if(--n<1)return t.apply(this,arguments)}}function Of(n,t,r){return t=r?Y:t,t=n&&null==t?n.length:t,fi(n,dn,Y,Y,Y,Y,t)}function If(n,t){var r;if("function"!=typeof t)throw new sl(tn);
return n=jc(n),function(){return--n>0&&(r=t.apply(this,arguments)),n<=1&&(t=Y),r}}function Rf(n,t,r){t=r?Y:t;var e=fi(n,_n,Y,Y,Y,Y,Y,t);return e.placeholder=Rf.placeholder,e}function zf(n,t,r){t=r?Y:t;var e=fi(n,vn,Y,Y,Y,Y,Y,t);return e.placeholder=zf.placeholder,e}function Ef(n,t,r){function e(t){var r=h,e=p;return h=p=Y,d=t,v=n.apply(e,r)}function u(n){return d=n,g=Es(f,t),b?e(n):v}function i(n){var r=n-y,e=n-d,u=t-r;return w?Vl(u,_-e):u}function o(n){var r=n-y,e=n-d;return y===Y||r>=t||r<0||w&&e>=_;
}function f(){var n=ih();return o(n)?c(n):(g=Es(f,i(n)),Y)}function c(n){return g=Y,m&&h?e(n):(h=p=Y,v)}function a(){g!==Y&&xs(g),d=0,h=y=p=g=Y}function l(){return g===Y?v:c(ih())}function s(){var n=ih(),r=o(n);if(h=arguments,p=this,y=n,r){if(g===Y)return u(y);if(w)return xs(g),g=Es(f,t),e(y)}return g===Y&&(g=Es(f,t)),v}var h,p,_,v,g,y,d=0,b=!1,w=!1,m=!0;if("function"!=typeof n)throw new sl(tn);return t=kc(t)||0,ic(r)&&(b=!!r.leading,w="maxWait"in r,_=w?Kl(kc(r.maxWait)||0,t):_,m="trailing"in r?!!r.trailing:m),
s.cancel=a,s.flush=l,s}function Sf(n){return fi(n,wn)}function Wf(n,t){if("function"!=typeof n||null!=t&&"function"!=typeof t)throw new sl(tn);var r=function(){var e=arguments,u=t?t.apply(this,e):e[0],i=r.cache;if(i.has(u))return i.get(u);var o=n.apply(this,e);return r.cache=i.set(u,o)||i,o};return r.cache=new(Wf.Cache||ar),r}function Lf(n){if("function"!=typeof n)throw new sl(tn);return function(){var t=arguments;switch(t.length){case 0:return!n.call(this);case 1:return!n.call(this,t[0]);case 2:
return!n.call(this,t[0],t[1]);case 3:return!n.call(this,t[0],t[1],t[2])}return!n.apply(this,t)}}function Cf(n){return If(2,n)}function Uf(n,t){if("function"!=typeof n)throw new sl(tn);return t=t===Y?t:jc(t),ru(n,t)}function Bf(t,r){if("function"!=typeof t)throw new sl(tn);return r=null==r?0:Kl(jc(r),0),ru(function(e){var u=e[r],i=Au(e,0,r);return u&&a(i,u),n(t,this,i)})}function Tf(n,t,r){var e=!0,u=!0;if("function"!=typeof n)throw new sl(tn);return ic(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),
Ef(n,t,{leading:e,maxWait:t,trailing:u})}function $f(n){return Of(n,1)}function Df(n,t){return sh(xu(t),n)}function Mf(){if(!arguments.length)return[];var n=arguments[0];return yh(n)?n:[n]}function Ff(n){return Dr(n,cn)}function Nf(n,t){return t="function"==typeof t?t:Y,Dr(n,cn,t)}function Pf(n){return Dr(n,on|cn)}function qf(n,t){return t="function"==typeof t?t:Y,Dr(n,on|cn,t)}function Zf(n,t){return null==t||Zr(n,t,Fc(t))}function Kf(n,t){return n===t||n!==n&&t!==t}function Vf(n){return null!=n&&uc(n.length)&&!rc(n);
}function Gf(n){return oc(n)&&Vf(n)}function Hf(n){return n===!0||n===!1||oc(n)&&de(n)==Dn}function Jf(n){return oc(n)&&1===n.nodeType&&!_c(n)}function Yf(n){if(null==n)return!0;if(Vf(n)&&(yh(n)||"string"==typeof n||"function"==typeof n.splice||bh(n)||Ah(n)||gh(n)))return!n.length;var t=Is(n);if(t==Zn||t==Qn)return!n.size;if($i(n))return!$e(n).length;for(var r in n)if(yl.call(n,r))return!1;return!0}function Qf(n,t){return ze(n,t)}function Xf(n,t,r){r="function"==typeof r?r:Y;var e=r?r(n,t):Y;return e===Y?ze(n,t,Y,r):!!e;
}function nc(n){if(!oc(n))return!1;var t=de(n);return t==Nn||t==Fn||"string"==typeof n.message&&"string"==typeof n.name&&!_c(n)}function tc(n){return"number"==typeof n&&Pl(n)}function rc(n){if(!ic(n))return!1;var t=de(n);return t==Pn||t==qn||t==$n||t==Jn}function ec(n){return"number"==typeof n&&n==jc(n)}function uc(n){return"number"==typeof n&&n>-1&&n%1==0&&n<=zn}function ic(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function oc(n){return null!=n&&"object"==typeof n}function fc(n,t){
return n===t||We(n,t,mi(t))}function cc(n,t,r){return r="function"==typeof r?r:Y,We(n,t,mi(t),r)}function ac(n){return pc(n)&&n!=+n}function lc(n){if(Rs(n))throw new il(nn);return Le(n)}function sc(n){return null===n}function hc(n){return null==n}function pc(n){return"number"==typeof n||oc(n)&&de(n)==Kn}function _c(n){if(!oc(n)||de(n)!=Gn)return!1;var t=Rl(n);if(null===t)return!0;var r=yl.call(t,"constructor")&&t.constructor;return"function"==typeof r&&r instanceof r&&gl.call(r)==ml}function vc(n){
return ec(n)&&n>=-zn&&n<=zn}function gc(n){return"string"==typeof n||!yh(n)&&oc(n)&&de(n)==Xn}function yc(n){return"symbol"==typeof n||oc(n)&&de(n)==nt}function dc(n){return n===Y}function bc(n){return oc(n)&&Is(n)==rt}function wc(n){return oc(n)&&de(n)==et}function mc(n){if(!n)return[];if(Vf(n))return gc(n)?V(n):Uu(n);if(Ll&&n[Ll])return $(n[Ll]());var t=Is(n);return(t==Zn?D:t==Qn?N:na)(n)}function xc(n){if(!n)return 0===n?n:0;if(n=kc(n),n===Rn||n===-Rn){return(n<0?-1:1)*En}return n===n?n:0}function jc(n){
var t=xc(n),r=t%1;return t===t?r?t-r:t:0}function Ac(n){return n?$r(jc(n),0,Wn):0}function kc(n){if("number"==typeof n)return n;if(yc(n))return Sn;if(ic(n)){var t="function"==typeof n.valueOf?n.valueOf():n;n=ic(t)?t+"":t}if("string"!=typeof n)return 0===n?n:+n;n=n.replace(Et,"");var r=Ft.test(n);return r||Pt.test(n)?Jr(n.slice(2),r?2:8):Mt.test(n)?Sn:+n}function Oc(n){return Bu(n,Nc(n))}function Ic(n){return n?$r(jc(n),-zn,zn):0===n?n:0}function Rc(n){return null==n?"":pu(n)}function zc(n,t){var r=_s(n);
return null==t?r:Wr(r,t)}function Ec(n,t){return v(n,bi(t,3),ee)}function Sc(n,t){return v(n,bi(t,3),ue)}function Wc(n,t){return null==n?n:ys(n,bi(t,3),Nc)}function Lc(n,t){return null==n?n:ds(n,bi(t,3),Nc)}function Cc(n,t){return n&&ee(n,bi(t,3))}function Uc(n,t){return n&&ue(n,bi(t,3))}function Bc(n){return null==n?[]:se(n,Fc(n))}function Tc(n){return null==n?[]:se(n,Nc(n))}function $c(n,t,r){var e=null==n?Y:ve(n,t);return e===Y?r:e}function Dc(n,t){return null!=n&&Oi(n,t,we)}function Mc(n,t){return null!=n&&Oi(n,t,me);
}function Fc(n){return Vf(n)?Ar(n):$e(n)}function Nc(n){return Vf(n)?Ar(n,!0):De(n)}function Pc(n,t){var r={};return t=bi(t,3),ee(n,function(n,e,u){Cr(r,t(n,e,u),n)}),r}function qc(n,t){var r={};return t=bi(t,3),ee(n,function(n,e,u){Cr(r,e,t(n,e,u))}),r}function Zc(n,t){return Kc(n,Lf(bi(t)))}function Kc(n,t){if(null==n)return{};var r=c(gi(n),function(n){return[n]});return t=bi(t),He(n,r,function(n,r){return t(n,r[0])})}function Vc(n,t,r){t=ju(t,n);var e=-1,u=t.length;for(u||(u=1,n=Y);++e<u;){var i=null==n?Y:n[Qi(t[e])];
i===Y&&(e=u,i=r),n=rc(i)?i.call(n):i}return n}function Gc(n,t,r){return null==n?n:iu(n,t,r)}function Hc(n,t,r,e){return e="function"==typeof e?e:Y,null==n?n:iu(n,t,r,e)}function Jc(n,t,e){var u=yh(n),i=u||bh(n)||Ah(n);if(t=bi(t,4),null==e){var o=n&&n.constructor;e=i?u?new o:[]:ic(n)&&rc(o)?_s(Rl(n)):{}}return(i?r:ee)(n,function(n,r,u){return t(e,n,r,u)}),e}function Yc(n,t){return null==n||vu(n,t)}function Qc(n,t,r){return null==n?n:gu(n,t,xu(r))}function Xc(n,t,r,e){return e="function"==typeof e?e:Y,
null==n?n:gu(n,t,xu(r),e)}function na(n){return null==n?[]:z(n,Fc(n))}function ta(n){return null==n?[]:z(n,Nc(n))}function ra(n,t,r){return r===Y&&(r=t,t=Y),r!==Y&&(r=kc(r),r=r===r?r:0),t!==Y&&(t=kc(t),t=t===t?t:0),$r(kc(n),t,r)}function ea(n,t,r){return t=xc(t),r===Y?(r=t,t=0):r=xc(r),n=kc(n),xe(n,t,r)}function ua(n,t,r){if(r&&"boolean"!=typeof r&&Li(n,t,r)&&(t=r=Y),r===Y&&("boolean"==typeof t?(r=t,t=Y):"boolean"==typeof n&&(r=n,n=Y)),n===Y&&t===Y?(n=0,t=1):(n=xc(n),t===Y?(t=n,n=0):t=xc(t)),n>t){
var e=n;n=t,t=e}if(r||n%1||t%1){var u=Jl();return Vl(n+u*(t-n+Hr("1e-"+((u+"").length-1))),t)}return Xe(n,t)}function ia(n){return Jh(Rc(n).toLowerCase())}function oa(n){return n=Rc(n),n&&n.replace(Zt,he).replace(Br,"")}function fa(n,t,r){n=Rc(n),t=pu(t);var e=n.length;r=r===Y?e:$r(jc(r),0,e);var u=r;return r-=t.length,r>=0&&n.slice(r,u)==t}function ca(n){return n=Rc(n),n&&mt.test(n)?n.replace(bt,pe):n}function aa(n){return n=Rc(n),n&&zt.test(n)?n.replace(Rt,"\\$&"):n}function la(n,t,r){n=Rc(n),t=jc(t);
var e=t?K(n):0;if(!t||e>=t)return n;var u=(t-e)/2;return ni(Ml(u),r)+n+ni(Dl(u),r)}function sa(n,t,r){n=Rc(n),t=jc(t);var e=t?K(n):0;return t&&e<t?n+ni(t-e,r):n}function ha(n,t,r){n=Rc(n),t=jc(t);var e=t?K(n):0;return t&&e<t?ni(t-e,r)+n:n}function pa(n,t,r){return r||null==t?t=0:t&&(t=+t),Hl(Rc(n).replace(St,""),t||0)}function _a(n,t,r){return t=(r?Li(n,t,r):t===Y)?1:jc(t),tu(Rc(n),t)}function va(){var n=arguments,t=Rc(n[0]);return n.length<3?t:t.replace(n[1],n[2])}function ga(n,t,r){return r&&"number"!=typeof r&&Li(n,t,r)&&(t=r=Y),
(r=r===Y?Wn:r>>>0)?(n=Rc(n),n&&("string"==typeof t||null!=t&&!xh(t))&&(t=pu(t),!t&&B(n))?Au(V(n),0,r):n.split(t,r)):[]}function ya(n,t,r){return n=Rc(n),r=null==r?0:$r(jc(r),0,n.length),t=pu(t),n.slice(r,r+t.length)==t}function da(n,t,r){var e=q.templateSettings;r&&Li(n,t,r)&&(t=Y),n=Rc(n),t=zh({},t,e,ci);var u,i,o=zh({},t.imports,e.imports,ci),f=Fc(o),c=z(o,f),a=0,l=t.interpolate||Kt,s="__p += '",h=al((t.escape||Kt).source+"|"+l.source+"|"+(l===At?$t:Kt).source+"|"+(t.evaluate||Kt).source+"|$","g"),p="//# sourceURL="+(yl.call(t,"sourceURL")?(t.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Nr+"]")+"\n";
n.replace(h,function(t,r,e,o,f,c){return e||(e=o),s+=n.slice(a,c).replace(Vt,C),r&&(u=!0,s+="' +\n__e("+r+") +\n'"),f&&(i=!0,s+="';\n"+f+";\n__p += '"),e&&(s+="' +\n((__t = ("+e+")) == null ? '' : __t) +\n'"),a=c+t.length,t}),s+="';\n";var _=yl.call(t,"variable")&&t.variable;_||(s="with (obj) {\n"+s+"\n}\n"),s=(i?s.replace(vt,""):s).replace(gt,"$1").replace(yt,"$1;"),s="function("+(_||"obj")+") {\n"+(_?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(u?", __e = _.escape":"")+(i?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+s+"return __p\n}";
var v=Yh(function(){return ol(f,p+"return "+s).apply(Y,c)});if(v.source=s,nc(v))throw v;return v}function ba(n){return Rc(n).toLowerCase()}function wa(n){return Rc(n).toUpperCase()}function ma(n,t,r){if(n=Rc(n),n&&(r||t===Y))return n.replace(Et,"");if(!n||!(t=pu(t)))return n;var e=V(n),u=V(t);return Au(e,S(e,u),W(e,u)+1).join("")}function xa(n,t,r){if(n=Rc(n),n&&(r||t===Y))return n.replace(Wt,"");if(!n||!(t=pu(t)))return n;var e=V(n);return Au(e,0,W(e,V(t))+1).join("")}function ja(n,t,r){if(n=Rc(n),
n&&(r||t===Y))return n.replace(St,"");if(!n||!(t=pu(t)))return n;var e=V(n);return Au(e,S(e,V(t))).join("")}function Aa(n,t){var r=mn,e=xn;if(ic(t)){var u="separator"in t?t.separator:u;r="length"in t?jc(t.length):r,e="omission"in t?pu(t.omission):e}n=Rc(n);var i=n.length;if(B(n)){var o=V(n);i=o.length}if(r>=i)return n;var f=r-K(e);if(f<1)return e;var c=o?Au(o,0,f).join(""):n.slice(0,f);if(u===Y)return c+e;if(o&&(f+=c.length-f),xh(u)){if(n.slice(f).search(u)){var a,l=c;for(u.global||(u=al(u.source,Rc(Dt.exec(u))+"g")),
u.lastIndex=0;a=u.exec(l);)var s=a.index;c=c.slice(0,s===Y?f:s)}}else if(n.indexOf(pu(u),f)!=f){var h=c.lastIndexOf(u);h>-1&&(c=c.slice(0,h))}return c+e}function ka(n){return n=Rc(n),n&&wt.test(n)?n.replace(dt,_e):n}function Oa(n,t,r){return n=Rc(n),t=r?Y:t,t===Y?T(n)?J(n):_(n):n.match(t)||[]}function Ia(t){var r=null==t?0:t.length,e=bi();return t=r?c(t,function(n){if("function"!=typeof n[1])throw new sl(tn);return[e(n[0]),n[1]]}):[],ru(function(e){for(var u=-1;++u<r;){var i=t[u];if(n(i[0],this,e))return n(i[1],this,e);
}})}function Ra(n){return Mr(Dr(n,on))}function za(n){return function(){return n}}function Ea(n,t){return null==n||n!==n?t:n}function Sa(n){return n}function Wa(n){return Te("function"==typeof n?n:Dr(n,on))}function La(n){return Ne(Dr(n,on))}function Ca(n,t){return Pe(n,Dr(t,on))}function Ua(n,t,e){var u=Fc(t),i=se(t,u);null!=e||ic(t)&&(i.length||!u.length)||(e=t,t=n,n=this,i=se(t,Fc(t)));var o=!(ic(e)&&"chain"in e&&!e.chain),f=rc(n);return r(i,function(r){var e=t[r];n[r]=e,f&&(n.prototype[r]=function(){
var t=this.__chain__;if(o||t){var r=n(this.__wrapped__);return(r.__actions__=Uu(this.__actions__)).push({func:e,args:arguments,thisArg:n}),r.__chain__=t,r}return e.apply(n,a([this.value()],arguments))})}),n}function Ba(){return Xr._===this&&(Xr._=xl),this}function Ta(){}function $a(n){return n=jc(n),ru(function(t){return Ke(t,n)})}function Da(n){return Ci(n)?m(Qi(n)):Je(n)}function Ma(n){return function(t){return null==n?Y:ve(n,t)}}function Fa(){return[]}function Na(){return!1}function Pa(){return{};
}function qa(){return""}function Za(){return!0}function Ka(n,t){if(n=jc(n),n<1||n>zn)return[];var r=Wn,e=Vl(n,Wn);t=bi(t),n-=Wn;for(var u=O(e,t);++r<n;)t(r);return u}function Va(n){return yh(n)?c(n,Qi):yc(n)?[n]:Uu(Ws(Rc(n)))}function Ga(n){var t=++dl;return Rc(n)+t}function Ha(n){return n&&n.length?Yr(n,Sa,be):Y}function Ja(n,t){return n&&n.length?Yr(n,bi(t,2),be):Y}function Ya(n){return w(n,Sa)}function Qa(n,t){return w(n,bi(t,2))}function Xa(n){return n&&n.length?Yr(n,Sa,Me):Y}function nl(n,t){
return n&&n.length?Yr(n,bi(t,2),Me):Y}function tl(n){return n&&n.length?k(n,Sa):0}function rl(n,t){return n&&n.length?k(n,bi(t,2)):0}x=null==x?Xr:ge.defaults(Xr.Object(),x,ge.pick(Xr,Fr));var el=x.Array,ul=x.Date,il=x.Error,ol=x.Function,fl=x.Math,cl=x.Object,al=x.RegExp,ll=x.String,sl=x.TypeError,hl=el.prototype,pl=ol.prototype,_l=cl.prototype,vl=x["__core-js_shared__"],gl=pl.toString,yl=_l.hasOwnProperty,dl=0,bl=function(){var n=/[^.]+$/.exec(vl&&vl.keys&&vl.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:"";
}(),wl=_l.toString,ml=gl.call(cl),xl=Xr._,jl=al("^"+gl.call(yl).replace(Rt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Al=re?x.Buffer:Y,kl=x.Symbol,Ol=x.Uint8Array,Il=Al?Al.allocUnsafe:Y,Rl=M(cl.getPrototypeOf,cl),zl=cl.create,El=_l.propertyIsEnumerable,Sl=hl.splice,Wl=kl?kl.isConcatSpreadable:Y,Ll=kl?kl.iterator:Y,Cl=kl?kl.toStringTag:Y,Ul=function(){try{var n=xi(cl,"defineProperty");return n({},"",{}),n}catch(n){}}(),Bl=x.clearTimeout!==Xr.clearTimeout&&x.clearTimeout,Tl=ul&&ul.now!==Xr.Date.now&&ul.now,$l=x.setTimeout!==Xr.setTimeout&&x.setTimeout,Dl=fl.ceil,Ml=fl.floor,Fl=cl.getOwnPropertySymbols,Nl=Al?Al.isBuffer:Y,Pl=x.isFinite,ql=hl.join,Zl=M(cl.keys,cl),Kl=fl.max,Vl=fl.min,Gl=ul.now,Hl=x.parseInt,Jl=fl.random,Yl=hl.reverse,Ql=xi(x,"DataView"),Xl=xi(x,"Map"),ns=xi(x,"Promise"),ts=xi(x,"Set"),rs=xi(x,"WeakMap"),es=xi(cl,"create"),us=rs&&new rs,is={},os=Xi(Ql),fs=Xi(Xl),cs=Xi(ns),as=Xi(ts),ls=Xi(rs),ss=kl?kl.prototype:Y,hs=ss?ss.valueOf:Y,ps=ss?ss.toString:Y,_s=function(){
function n(){}return function(t){if(!ic(t))return{};if(zl)return zl(t);n.prototype=t;var r=new n;return n.prototype=Y,r}}();q.templateSettings={escape:xt,evaluate:jt,interpolate:At,variable:"",imports:{_:q}},q.prototype=G.prototype,q.prototype.constructor=q,H.prototype=_s(G.prototype),H.prototype.constructor=H,Bt.prototype=_s(G.prototype),Bt.prototype.constructor=Bt,Yt.prototype.clear=Qt,Yt.prototype.delete=Xt,Yt.prototype.get=nr,Yt.prototype.has=tr,Yt.prototype.set=rr,er.prototype.clear=ur,er.prototype.delete=ir,
er.prototype.get=or,er.prototype.has=fr,er.prototype.set=cr,ar.prototype.clear=lr,ar.prototype.delete=sr,ar.prototype.get=hr,ar.prototype.has=pr,ar.prototype.set=_r,vr.prototype.add=vr.prototype.push=gr,vr.prototype.has=yr,dr.prototype.clear=br,dr.prototype.delete=wr,dr.prototype.get=mr,dr.prototype.has=xr,dr.prototype.set=jr;var vs=Fu(ee),gs=Fu(ue,!0),ys=Nu(),ds=Nu(!0),bs=us?function(n,t){return us.set(n,t),n}:Sa,ws=Ul?function(n,t){return Ul(n,"toString",{configurable:!0,enumerable:!1,value:za(t),
writable:!0})}:Sa,ms=ru,xs=Bl||function(n){return Xr.clearTimeout(n)},js=ts&&1/N(new ts([,-0]))[1]==Rn?function(n){return new ts(n)}:Ta,As=us?function(n){return us.get(n)}:Ta,ks=Fl?function(n){return null==n?[]:(n=cl(n),i(Fl(n),function(t){return El.call(n,t)}))}:Fa,Os=Fl?function(n){for(var t=[];n;)a(t,ks(n)),n=Rl(n);return t}:Fa,Is=de;(Ql&&Is(new Ql(new ArrayBuffer(1)))!=it||Xl&&Is(new Xl)!=Zn||ns&&Is(ns.resolve())!=Hn||ts&&Is(new ts)!=Qn||rs&&Is(new rs)!=rt)&&(Is=function(n){var t=de(n),r=t==Gn?n.constructor:Y,e=r?Xi(r):"";
if(e)switch(e){case os:return it;case fs:return Zn;case cs:return Hn;case as:return Qn;case ls:return rt}return t});var Rs=vl?rc:Na,zs=Ji(bs),Es=$l||function(n,t){return Xr.setTimeout(n,t)},Ss=Ji(ws),Ws=Fi(function(n){var t=[];return 46===n.charCodeAt(0)&&t.push(""),n.replace(It,function(n,r,e,u){t.push(e?u.replace(Tt,"$1"):r||n)}),t}),Ls=ru(function(n,t){return Gf(n)?Vr(n,te(t,1,Gf,!0)):[]}),Cs=ru(function(n,t){var r=mo(t);return Gf(r)&&(r=Y),Gf(n)?Vr(n,te(t,1,Gf,!0),bi(r,2)):[]}),Us=ru(function(n,t){
var r=mo(t);return Gf(r)&&(r=Y),Gf(n)?Vr(n,te(t,1,Gf,!0),Y,r):[]}),Bs=ru(function(n){var t=c(n,mu);return t.length&&t[0]===n[0]?je(t):[]}),Ts=ru(function(n){var t=mo(n),r=c(n,mu);return t===mo(r)?t=Y:r.pop(),r.length&&r[0]===n[0]?je(r,bi(t,2)):[]}),$s=ru(function(n){var t=mo(n),r=c(n,mu);return t="function"==typeof t?t:Y,t&&r.pop(),r.length&&r[0]===n[0]?je(r,Y,t):[]}),Ds=ru(Ao),Ms=_i(function(n,t){var r=null==n?0:n.length,e=Tr(n,t);return Qe(n,c(t,function(n){return Wi(n,r)?+n:n}).sort(Su)),e}),Fs=ru(function(n){
return _u(te(n,1,Gf,!0))}),Ns=ru(function(n){var t=mo(n);return Gf(t)&&(t=Y),_u(te(n,1,Gf,!0),bi(t,2))}),Ps=ru(function(n){var t=mo(n);return t="function"==typeof t?t:Y,_u(te(n,1,Gf,!0),Y,t)}),qs=ru(function(n,t){return Gf(n)?Vr(n,t):[]}),Zs=ru(function(n){return bu(i(n,Gf))}),Ks=ru(function(n){var t=mo(n);return Gf(t)&&(t=Y),bu(i(n,Gf),bi(t,2))}),Vs=ru(function(n){var t=mo(n);return t="function"==typeof t?t:Y,bu(i(n,Gf),Y,t)}),Gs=ru(Ko),Hs=ru(function(n){var t=n.length,r=t>1?n[t-1]:Y;return r="function"==typeof r?(n.pop(),
r):Y,Vo(n,r)}),Js=_i(function(n){var t=n.length,r=t?n[0]:0,e=this.__wrapped__,u=function(t){return Tr(t,n)};return!(t>1||this.__actions__.length)&&e instanceof Bt&&Wi(r)?(e=e.slice(r,+r+(t?1:0)),e.__actions__.push({func:Qo,args:[u],thisArg:Y}),new H(e,this.__chain__).thru(function(n){return t&&!n.length&&n.push(Y),n})):this.thru(u)}),Ys=Du(function(n,t,r){yl.call(n,r)?++n[r]:Cr(n,r,1)}),Qs=Gu(lo),Xs=Gu(so),nh=Du(function(n,t,r){yl.call(n,r)?n[r].push(t):Cr(n,r,[t])}),th=ru(function(t,r,e){var u=-1,i="function"==typeof r,o=Vf(t)?el(t.length):[];
return vs(t,function(t){o[++u]=i?n(r,t,e):ke(t,r,e)}),o}),rh=Du(function(n,t,r){Cr(n,r,t)}),eh=Du(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),uh=ru(function(n,t){if(null==n)return[];var r=t.length;return r>1&&Li(n,t[0],t[1])?t=[]:r>2&&Li(t[0],t[1],t[2])&&(t=[t[0]]),Ve(n,te(t,1),[])}),ih=Tl||function(){return Xr.Date.now()},oh=ru(function(n,t,r){var e=sn;if(r.length){var u=F(r,di(oh));e|=gn}return fi(n,e,t,r,u)}),fh=ru(function(n,t,r){var e=sn|hn;if(r.length){var u=F(r,di(fh));e|=gn;
}return fi(t,e,n,r,u)}),ch=ru(function(n,t){return Kr(n,1,t)}),ah=ru(function(n,t,r){return Kr(n,kc(t)||0,r)});Wf.Cache=ar;var lh=ms(function(t,r){r=1==r.length&&yh(r[0])?c(r[0],R(bi())):c(te(r,1),R(bi()));var e=r.length;return ru(function(u){for(var i=-1,o=Vl(u.length,e);++i<o;)u[i]=r[i].call(this,u[i]);return n(t,this,u)})}),sh=ru(function(n,t){return fi(n,gn,Y,t,F(t,di(sh)))}),hh=ru(function(n,t){return fi(n,yn,Y,t,F(t,di(hh)))}),ph=_i(function(n,t){return fi(n,bn,Y,Y,Y,t)}),_h=ei(be),vh=ei(function(n,t){
return n>=t}),gh=Oe(function(){return arguments}())?Oe:function(n){return oc(n)&&yl.call(n,"callee")&&!El.call(n,"callee")},yh=el.isArray,dh=ie?R(ie):Ie,bh=Nl||Na,wh=oe?R(oe):Re,mh=fe?R(fe):Se,xh=ce?R(ce):Ce,jh=ae?R(ae):Ue,Ah=le?R(le):Be,kh=ei(Me),Oh=ei(function(n,t){return n<=t}),Ih=Mu(function(n,t){if($i(t)||Vf(t))return Bu(t,Fc(t),n),Y;for(var r in t)yl.call(t,r)&&zr(n,r,t[r])}),Rh=Mu(function(n,t){Bu(t,Nc(t),n)}),zh=Mu(function(n,t,r,e){Bu(t,Nc(t),n,e)}),Eh=Mu(function(n,t,r,e){Bu(t,Fc(t),n,e);
}),Sh=_i(Tr),Wh=ru(function(n,t){n=cl(n);var r=-1,e=t.length,u=e>2?t[2]:Y;for(u&&Li(t[0],t[1],u)&&(e=1);++r<e;)for(var i=t[r],o=Nc(i),f=-1,c=o.length;++f<c;){var a=o[f],l=n[a];(l===Y||Kf(l,_l[a])&&!yl.call(n,a))&&(n[a]=i[a])}return n}),Lh=ru(function(t){return t.push(Y,ai),n($h,Y,t)}),Ch=Yu(function(n,t,r){null!=t&&"function"!=typeof t.toString&&(t=wl.call(t)),n[t]=r},za(Sa)),Uh=Yu(function(n,t,r){null!=t&&"function"!=typeof t.toString&&(t=wl.call(t)),yl.call(n,t)?n[t].push(r):n[t]=[r]},bi),Bh=ru(ke),Th=Mu(function(n,t,r){
qe(n,t,r)}),$h=Mu(function(n,t,r,e){qe(n,t,r,e)}),Dh=_i(function(n,t){var r={};if(null==n)return r;var e=!1;t=c(t,function(t){return t=ju(t,n),e||(e=t.length>1),t}),Bu(n,gi(n),r),e&&(r=Dr(r,on|fn|cn,li));for(var u=t.length;u--;)vu(r,t[u]);return r}),Mh=_i(function(n,t){return null==n?{}:Ge(n,t)}),Fh=oi(Fc),Nh=oi(Nc),Ph=Zu(function(n,t,r){return t=t.toLowerCase(),n+(r?ia(t):t)}),qh=Zu(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Zh=Zu(function(n,t,r){return n+(r?" ":"")+t.toLowerCase()}),Kh=qu("toLowerCase"),Vh=Zu(function(n,t,r){
return n+(r?"_":"")+t.toLowerCase()}),Gh=Zu(function(n,t,r){return n+(r?" ":"")+Jh(t)}),Hh=Zu(function(n,t,r){return n+(r?" ":"")+t.toUpperCase()}),Jh=qu("toUpperCase"),Yh=ru(function(t,r){try{return n(t,Y,r)}catch(n){return nc(n)?n:new il(n)}}),Qh=_i(function(n,t){return r(t,function(t){t=Qi(t),Cr(n,t,oh(n[t],n))}),n}),Xh=Hu(),np=Hu(!0),tp=ru(function(n,t){return function(r){return ke(r,n,t)}}),rp=ru(function(n,t){return function(r){return ke(n,r,t)}}),ep=Xu(c),up=Xu(u),ip=Xu(h),op=ri(),fp=ri(!0),cp=Qu(function(n,t){
return n+t},0),ap=ii("ceil"),lp=Qu(function(n,t){return n/t},1),sp=ii("floor"),hp=Qu(function(n,t){return n*t},1),pp=ii("round"),_p=Qu(function(n,t){return n-t},0);return q.after=kf,q.ary=Of,q.assign=Ih,q.assignIn=Rh,q.assignInWith=zh,q.assignWith=Eh,q.at=Sh,q.before=If,q.bind=oh,q.bindAll=Qh,q.bindKey=fh,q.castArray=Mf,q.chain=Jo,q.chunk=ro,q.compact=eo,q.concat=uo,q.cond=Ia,q.conforms=Ra,q.constant=za,q.countBy=Ys,q.create=zc,q.curry=Rf,q.curryRight=zf,q.debounce=Ef,q.defaults=Wh,q.defaultsDeep=Lh,
q.defer=ch,q.delay=ah,q.difference=Ls,q.differenceBy=Cs,q.differenceWith=Us,q.drop=io,q.dropRight=oo,q.dropRightWhile=fo,q.dropWhile=co,q.fill=ao,q.filter=cf,q.flatMap=af,q.flatMapDeep=lf,q.flatMapDepth=sf,q.flatten=ho,q.flattenDeep=po,q.flattenDepth=_o,q.flip=Sf,q.flow=Xh,q.flowRight=np,q.fromPairs=vo,q.functions=Bc,q.functionsIn=Tc,q.groupBy=nh,q.initial=bo,q.intersection=Bs,q.intersectionBy=Ts,q.intersectionWith=$s,q.invert=Ch,q.invertBy=Uh,q.invokeMap=th,q.iteratee=Wa,q.keyBy=rh,q.keys=Fc,q.keysIn=Nc,
q.map=vf,q.mapKeys=Pc,q.mapValues=qc,q.matches=La,q.matchesProperty=Ca,q.memoize=Wf,q.merge=Th,q.mergeWith=$h,q.method=tp,q.methodOf=rp,q.mixin=Ua,q.negate=Lf,q.nthArg=$a,q.omit=Dh,q.omitBy=Zc,q.once=Cf,q.orderBy=gf,q.over=ep,q.overArgs=lh,q.overEvery=up,q.overSome=ip,q.partial=sh,q.partialRight=hh,q.partition=eh,q.pick=Mh,q.pickBy=Kc,q.property=Da,q.propertyOf=Ma,q.pull=Ds,q.pullAll=Ao,q.pullAllBy=ko,q.pullAllWith=Oo,q.pullAt=Ms,q.range=op,q.rangeRight=fp,q.rearg=ph,q.reject=bf,q.remove=Io,q.rest=Uf,
q.reverse=Ro,q.sampleSize=mf,q.set=Gc,q.setWith=Hc,q.shuffle=xf,q.slice=zo,q.sortBy=uh,q.sortedUniq=Bo,q.sortedUniqBy=To,q.split=ga,q.spread=Bf,q.tail=$o,q.take=Do,q.takeRight=Mo,q.takeRightWhile=Fo,q.takeWhile=No,q.tap=Yo,q.throttle=Tf,q.thru=Qo,q.toArray=mc,q.toPairs=Fh,q.toPairsIn=Nh,q.toPath=Va,q.toPlainObject=Oc,q.transform=Jc,q.unary=$f,q.union=Fs,q.unionBy=Ns,q.unionWith=Ps,q.uniq=Po,q.uniqBy=qo,q.uniqWith=Zo,q.unset=Yc,q.unzip=Ko,q.unzipWith=Vo,q.update=Qc,q.updateWith=Xc,q.values=na,q.valuesIn=ta,
q.without=qs,q.words=Oa,q.wrap=Df,q.xor=Zs,q.xorBy=Ks,q.xorWith=Vs,q.zip=Gs,q.zipObject=Go,q.zipObjectDeep=Ho,q.zipWith=Hs,q.entries=Fh,q.entriesIn=Nh,q.extend=Rh,q.extendWith=zh,Ua(q,q),q.add=cp,q.attempt=Yh,q.camelCase=Ph,q.capitalize=ia,q.ceil=ap,q.clamp=ra,q.clone=Ff,q.cloneDeep=Pf,q.cloneDeepWith=qf,q.cloneWith=Nf,q.conformsTo=Zf,q.deburr=oa,q.defaultTo=Ea,q.divide=lp,q.endsWith=fa,q.eq=Kf,q.escape=ca,q.escapeRegExp=aa,q.every=ff,q.find=Qs,q.findIndex=lo,q.findKey=Ec,q.findLast=Xs,q.findLastIndex=so,
q.findLastKey=Sc,q.floor=sp,q.forEach=hf,q.forEachRight=pf,q.forIn=Wc,q.forInRight=Lc,q.forOwn=Cc,q.forOwnRight=Uc,q.get=$c,q.gt=_h,q.gte=vh,q.has=Dc,q.hasIn=Mc,q.head=go,q.identity=Sa,q.includes=_f,q.indexOf=yo,q.inRange=ea,q.invoke=Bh,q.isArguments=gh,q.isArray=yh,q.isArrayBuffer=dh,q.isArrayLike=Vf,q.isArrayLikeObject=Gf,q.isBoolean=Hf,q.isBuffer=bh,q.isDate=wh,q.isElement=Jf,q.isEmpty=Yf,q.isEqual=Qf,q.isEqualWith=Xf,q.isError=nc,q.isFinite=tc,q.isFunction=rc,q.isInteger=ec,q.isLength=uc,q.isMap=mh,
q.isMatch=fc,q.isMatchWith=cc,q.isNaN=ac,q.isNative=lc,q.isNil=hc,q.isNull=sc,q.isNumber=pc,q.isObject=ic,q.isObjectLike=oc,q.isPlainObject=_c,q.isRegExp=xh,q.isSafeInteger=vc,q.isSet=jh,q.isString=gc,q.isSymbol=yc,q.isTypedArray=Ah,q.isUndefined=dc,q.isWeakMap=bc,q.isWeakSet=wc,q.join=wo,q.kebabCase=qh,q.last=mo,q.lastIndexOf=xo,q.lowerCase=Zh,q.lowerFirst=Kh,q.lt=kh,q.lte=Oh,q.max=Ha,q.maxBy=Ja,q.mean=Ya,q.meanBy=Qa,q.min=Xa,q.minBy=nl,q.stubArray=Fa,q.stubFalse=Na,q.stubObject=Pa,q.stubString=qa,
q.stubTrue=Za,q.multiply=hp,q.nth=jo,q.noConflict=Ba,q.noop=Ta,q.now=ih,q.pad=la,q.padEnd=sa,q.padStart=ha,q.parseInt=pa,q.random=ua,q.reduce=yf,q.reduceRight=df,q.repeat=_a,q.replace=va,q.result=Vc,q.round=pp,q.runInContext=p,q.sample=wf,q.size=jf,q.snakeCase=Vh,q.some=Af,q.sortedIndex=Eo,q.sortedIndexBy=So,q.sortedIndexOf=Wo,q.sortedLastIndex=Lo,q.sortedLastIndexBy=Co,q.sortedLastIndexOf=Uo,q.startCase=Gh,q.startsWith=ya,q.subtract=_p,q.sum=tl,q.sumBy=rl,q.template=da,q.times=Ka,q.toFinite=xc,q.toInteger=jc,
q.toLength=Ac,q.toLower=ba,q.toNumber=kc,q.toSafeInteger=Ic,q.toString=Rc,q.toUpper=wa,q.trim=ma,q.trimEnd=xa,q.trimStart=ja,q.truncate=Aa,q.unescape=ka,q.uniqueId=Ga,q.upperCase=Hh,q.upperFirst=Jh,q.each=hf,q.eachRight=pf,q.first=go,Ua(q,function(){var n={};return ee(q,function(t,r){yl.call(q.prototype,r)||(n[r]=t)}),n}(),{chain:!1}),q.VERSION=Q,r(["bind","bindKey","curry","curryRight","partial","partialRight"],function(n){q[n].placeholder=q}),r(["drop","take"],function(n,t){Bt.prototype[n]=function(r){
r=r===Y?1:Kl(jc(r),0);var e=this.__filtered__&&!t?new Bt(this):this.clone();return e.__filtered__?e.__takeCount__=Vl(r,e.__takeCount__):e.__views__.push({size:Vl(r,Wn),type:n+(e.__dir__<0?"Right":"")}),e},Bt.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()}}),r(["filter","map","takeWhile"],function(n,t){var r=t+1,e=r==kn||r==In;Bt.prototype[n]=function(n){var t=this.clone();return t.__iteratees__.push({iteratee:bi(n,3),type:r}),t.__filtered__=t.__filtered__||e,t}}),r(["head","last"],function(n,t){
var r="take"+(t?"Right":"");Bt.prototype[n]=function(){return this[r](1).value()[0]}}),r(["initial","tail"],function(n,t){var r="drop"+(t?"":"Right");Bt.prototype[n]=function(){return this.__filtered__?new Bt(this):this[r](1)}}),Bt.prototype.compact=function(){return this.filter(Sa)},Bt.prototype.find=function(n){return this.filter(n).head()},Bt.prototype.findLast=function(n){return this.reverse().find(n)},Bt.prototype.invokeMap=ru(function(n,t){return"function"==typeof n?new Bt(this):this.map(function(r){
return ke(r,n,t)})}),Bt.prototype.reject=function(n){return this.filter(Lf(bi(n)))},Bt.prototype.slice=function(n,t){n=jc(n);var r=this;return r.__filtered__&&(n>0||t<0)?new Bt(r):(n<0?r=r.takeRight(-n):n&&(r=r.drop(n)),t!==Y&&(t=jc(t),r=t<0?r.dropRight(-t):r.take(t-n)),r)},Bt.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Bt.prototype.toArray=function(){return this.take(Wn)},ee(Bt.prototype,function(n,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),e=/^(?:head|last)$/.test(t),u=q[e?"take"+("last"==t?"Right":""):t],i=e||/^find/.test(t);
u&&(q.prototype[t]=function(){var t=this.__wrapped__,o=e?[1]:arguments,f=t instanceof Bt,c=o[0],l=f||yh(t),s=function(n){var t=u.apply(q,a([n],o));return e&&h?t[0]:t};l&&r&&"function"==typeof c&&1!=c.length&&(f=l=!1);var h=this.__chain__,p=!!this.__actions__.length,_=i&&!h,v=f&&!p;if(!i&&l){t=v?t:new Bt(this);var g=n.apply(t,o);return g.__actions__.push({func:Qo,args:[s],thisArg:Y}),new H(g,h)}return _&&v?n.apply(this,o):(g=this.thru(s),_?e?g.value()[0]:g.value():g)})}),r(["pop","push","shift","sort","splice","unshift"],function(n){
var t=hl[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|shift)$/.test(n);q.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(yh(u)?u:[],n)}return this[r](function(r){return t.apply(yh(r)?r:[],n)})}}),ee(Bt.prototype,function(n,t){var r=q[t];if(r){var e=r.name+"";yl.call(is,e)||(is[e]=[]),is[e].push({name:t,func:r})}}),is[Ju(Y,hn).name]=[{name:"wrapper",func:Y}],Bt.prototype.clone=Gt,Bt.prototype.reverse=Ht,Bt.prototype.value=Jt,q.prototype.at=Js,
q.prototype.chain=Xo,q.prototype.commit=nf,q.prototype.next=tf,q.prototype.plant=ef,q.prototype.reverse=uf,q.prototype.toJSON=q.prototype.valueOf=q.prototype.value=of,q.prototype.first=q.prototype.head,Ll&&(q.prototype[Ll]=rf),q},ge=ve(); true?(Xr._=ge,!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return ge}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))):0}).call(this);

/***/ }),

/***/ 5666:
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(7757);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(8926);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);
// EXTERNAL MODULE: ./node_modules/lodash/fp.js
var fp = __webpack_require__(8230);
;// CONCATENATED MODULE: ./src/constants.js
var SAVE_OPTIONS = {
  IPFS: "ipfs",
  DOWNLOADS: "downloads",
  BOTH: "both"
};
var MESSAGE_TYPES = {
  SCRAPE_ACTIVE_TAB: "SCRAPE_ACTIVE_TAB",
  SCRAPE_NEW_TAB: "SCRAPE_NEW_TAB",
  HTML: "HTML",
  PDF_WITH_SAVED_METADATA: "PDF_WITH_SAVED_METADATA",
  PDF_WITHOUT_SAVED_METADATA: "PDF_WITHOUT_SAVED_METADATA",
  DETAILS: "DETAILS",
  ERROR: "ERROR"
};

;// CONCATENATED MODULE: ./src/functions/utils/send-message.js


function sendMessage(_x) {
  return _sendMessage.apply(this, arguments);
}

function _sendMessage() {
  _sendMessage = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(obj) {
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              return chrome.runtime.sendMessage(obj, function (res) {
                return resolve(res);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendMessage.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/functions/get-details.js




function getDetails() {
  return _getDetails.apply(this, arguments);
}

function _getDetails() {
  _getDetails = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sendMessage({
              type: MESSAGE_TYPES.DETAILS
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getDetails.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/functions/utils/is-pdf.js
//This code was copied from https://github.com/kevva/is-pdf/blob/master/index.js
function isPdf(buf) {
  if (!buf || buf.length < 4) {
    return false;
  }

  return buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46;
}
;// CONCATENATED MODULE: ./src/scrapeHtmlOrPdf.js







asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
  var details, response, responseClone, isUrlAPdf, message;
  return regenerator_default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return getDetails();

        case 3:
          details = _context.sent;
          _context.next = 6;
          return fetch(details && details.indirectFetch ? details.url : location.href);

        case 6:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 29;
            break;
          }

          responseClone = response.clone();
          _context.t0 = isPdf;
          _context.next = 12;
          return responseClone.arrayBuffer();

        case 12:
          _context.t1 = _context.sent;
          isUrlAPdf = (0, _context.t0)(_context.t1);

          if (!isUrlAPdf) {
            _context.next = 24;
            break;
          }

          _context.t3 = MESSAGE_TYPES.PDF_WITHOUT_SAVED_METADATA;
          _context.t4 = URL;
          _context.next = 19;
          return response.blob();

        case 19:
          _context.t5 = _context.sent;
          _context.t6 = _context.t4.createObjectURL.call(_context.t4, _context.t5);
          _context.t2 = {
            type: _context.t3,
            pdf: _context.t6
          };
          _context.next = 25;
          break;

        case 24:
          _context.t2 = {
            type: MESSAGE_TYPES.HTML,
            html: document.documentElement.outerHTML
          };

        case 25:
          message = _context.t2;
          chrome.runtime.sendMessage(message);
          _context.next = 30;
          break;

        case 29:
          throw "bad response status: " + response.status;

        case 30:
          _context.next = 35;
          break;

        case 32:
          _context.prev = 32;
          _context.t7 = _context["catch"](0);
          chrome.runtime.sendMessage({
            type: MESSAGE_TYPES.ERROR,
            error: (0,fp.toString)(_context.t7)
          });

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 32]]);
}))();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2ZwLmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvZnAvX2Jhc2VDb252ZXJ0LmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvZnAvX21hcHBpbmcuanMiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9mcC9wbGFjZWhvbGRlci5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2xvZGFzaC5taW4uanMiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9zcmMvZnVuY3Rpb25zL3V0aWxzL3NlbmQtbWVzc2FnZS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9zcmMvZnVuY3Rpb25zL2dldC1kZXRhaWxzLmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL3NyYy9mdW5jdGlvbnMvdXRpbHMvaXMtcGRmLmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL3NyYy9zY3JhcGVIdG1sT3JQZGYuanMiXSwibmFtZXMiOlsiU0FWRV9PUFRJT05TIiwiSVBGUyIsIkRPV05MT0FEUyIsIkJPVEgiLCJNRVNTQUdFX1RZUEVTIiwiU0NSQVBFX0FDVElWRV9UQUIiLCJTQ1JBUEVfTkVXX1RBQiIsIkhUTUwiLCJQREZfV0lUSF9TQVZFRF9NRVRBREFUQSIsIlBERl9XSVRIT1VUX1NBVkVEX01FVEFEQVRBIiwiREVUQUlMUyIsIkVSUk9SIiwic2VuZE1lc3NhZ2UiLCJvYmoiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNocm9tZSIsInJ1bnRpbWUiLCJyZXMiLCJnZXREZXRhaWxzIiwidHlwZSIsImlzUGRmIiwiYnVmIiwibGVuZ3RoIiwiZGV0YWlscyIsImZldGNoIiwiaW5kaXJlY3RGZXRjaCIsInVybCIsImxvY2F0aW9uIiwiaHJlZiIsInJlc3BvbnNlIiwib2siLCJyZXNwb25zZUNsb25lIiwiY2xvbmUiLCJhcnJheUJ1ZmZlciIsImlzVXJsQVBkZiIsIlVSTCIsImJsb2IiLCJjcmVhdGVPYmplY3RVUkwiLCJwZGYiLCJodG1sIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJvdXRl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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFF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QUNDLE9BQVAsQ0FBZU4sV0FBZixDQUEyQjtBQUN6QlMsZ0JBQUksRUFBRWpCLG1CQURtQjtBQUV6QjJDLGlCQUFLLEVBQUVDLGVBQVE7QUFGVSxXQUEzQjs7QUEzQkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBRCxLIiwiZmlsZSI6InNjcmFwZUh0bWxPclBkZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vbG9kYXNoLm1pbicpLnJ1bkluQ29udGV4dCgpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZwL19iYXNlQ29udmVydCcpKF8sIF8pO1xuIiwidmFyIG1hcHBpbmcgPSByZXF1aXJlKCcuL19tYXBwaW5nJyksXG4gICAgZmFsbGJhY2tIb2xkZXIgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2UuICovXG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiwgd2l0aCBhbiBhcml0eSBvZiBgbmAsIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGVcbiAqIGFyZ3VtZW50cyBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBcml0eShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpOyB9XG4gICAgOiBmdW5jdGlvbihhKSB7IHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTsgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCwgd2l0aCB1cCB0byBgbmAgYXJndW1lbnRzLCBpZ25vcmluZ1xuICogYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBjYXAuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFyeShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMoYSwgYik7IH1cbiAgICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGZ1bmMoYSk7IH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHJlc3VsdFtsZW5ndGhdID0gYXJyYXlbbGVuZ3RoXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNsb25lcyBhIGdpdmVuIG9iamVjdCB1c2luZyB0aGUgYXNzaWdubWVudCBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGFzc2lnbm1lbnQgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjbG9uZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNsb25lcihmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gZnVuYyh7fSwgb2JqZWN0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc3ByZWFkYCB3aGljaCBmbGF0dGVucyB0aGUgc3ByZWFkIGFycmF5IGludG9cbiAqIHRoZSBhcmd1bWVudHMgb2YgdGhlIGludm9rZWQgYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBzcHJlYWQgYXJndW1lbnRzIG92ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBzcHJlYWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gZmxhdFNwcmVhZChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDEsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICB9XG4gICAgdmFyIGFycmF5ID0gYXJnc1tzdGFydF0sXG4gICAgICAgIG90aGVyQXJncyA9IGFyZ3Muc2xpY2UoMCwgc3RhcnQpO1xuXG4gICAgaWYgKGFycmF5KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJyYXkpO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgIT0gbGFzdEluZGV4KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJncy5zbGljZShzdGFydCArIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgYW5kIHVzZXMgYGNsb25lcmAgdG8gY2xvbmUgdGhlIGZpcnN0XG4gKiBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lciBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgYXJndW1lbnRzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgaW1tdXRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgYXJnc1tsZW5ndGhdID0gYXJndW1lbnRzW2xlbmd0aF07XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBhcmdzWzBdID0gY2xvbmVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGNvbnZlcnRgIHdoaWNoIGFjY2VwdHMgYSBgdXRpbGAgb2JqZWN0IG9mIG1ldGhvZHNcbiAqIHJlcXVpcmVkIHRvIHBlcmZvcm0gY29udmVyc2lvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHV0aWwgVGhlIHV0aWwgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNhcD10cnVlXSBTcGVjaWZ5IGNhcHBpbmcgaXRlcmF0ZWUgYXJndW1lbnRzLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jdXJyeT10cnVlXSBTcGVjaWZ5IGN1cnJ5aW5nLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5maXhlZD10cnVlXSBTcGVjaWZ5IGZpeGVkIGFyaXR5LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pbW11dGFibGU9dHJ1ZV0gU3BlY2lmeSBpbW11dGFibGUgb3BlcmF0aW9ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmVhcmc9dHJ1ZV0gU3BlY2lmeSByZWFycmFuZ2luZyBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgZnVuY3Rpb24gb3Igb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ29udmVydCh1dGlsLCBuYW1lLCBmdW5jLCBvcHRpb25zKSB7XG4gIHZhciBpc0xpYiA9IHR5cGVvZiBuYW1lID09ICdmdW5jdGlvbicsXG4gICAgICBpc09iaiA9IG5hbWUgPT09IE9iamVjdChuYW1lKTtcblxuICBpZiAoaXNPYmopIHtcbiAgICBvcHRpb25zID0gZnVuYztcbiAgICBmdW5jID0gbmFtZTtcbiAgICBuYW1lID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChmdW5jID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB9XG4gIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG5cbiAgdmFyIGNvbmZpZyA9IHtcbiAgICAnY2FwJzogJ2NhcCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuY2FwIDogdHJ1ZSxcbiAgICAnY3VycnknOiAnY3VycnknIGluIG9wdGlvbnMgPyBvcHRpb25zLmN1cnJ5IDogdHJ1ZSxcbiAgICAnZml4ZWQnOiAnZml4ZWQnIGluIG9wdGlvbnMgPyBvcHRpb25zLmZpeGVkIDogdHJ1ZSxcbiAgICAnaW1tdXRhYmxlJzogJ2ltbXV0YWJsZScgaW4gb3B0aW9ucyA/IG9wdGlvbnMuaW1tdXRhYmxlIDogdHJ1ZSxcbiAgICAncmVhcmcnOiAncmVhcmcnIGluIG9wdGlvbnMgPyBvcHRpb25zLnJlYXJnIDogdHJ1ZVxuICB9O1xuXG4gIHZhciBkZWZhdWx0SG9sZGVyID0gaXNMaWIgPyBmdW5jIDogZmFsbGJhY2tIb2xkZXIsXG4gICAgICBmb3JjZUN1cnJ5ID0gKCdjdXJyeScgaW4gb3B0aW9ucykgJiYgb3B0aW9ucy5jdXJyeSxcbiAgICAgIGZvcmNlRml4ZWQgPSAoJ2ZpeGVkJyBpbiBvcHRpb25zKSAmJiBvcHRpb25zLmZpeGVkLFxuICAgICAgZm9yY2VSZWFyZyA9ICgncmVhcmcnIGluIG9wdGlvbnMpICYmIG9wdGlvbnMucmVhcmcsXG4gICAgICBwcmlzdGluZSA9IGlzTGliID8gZnVuYy5ydW5JbkNvbnRleHQoKSA6IHVuZGVmaW5lZDtcblxuICB2YXIgaGVscGVycyA9IGlzTGliID8gZnVuYyA6IHtcbiAgICAnYXJ5JzogdXRpbC5hcnksXG4gICAgJ2Fzc2lnbic6IHV0aWwuYXNzaWduLFxuICAgICdjbG9uZSc6IHV0aWwuY2xvbmUsXG4gICAgJ2N1cnJ5JzogdXRpbC5jdXJyeSxcbiAgICAnZm9yRWFjaCc6IHV0aWwuZm9yRWFjaCxcbiAgICAnaXNBcnJheSc6IHV0aWwuaXNBcnJheSxcbiAgICAnaXNFcnJvcic6IHV0aWwuaXNFcnJvcixcbiAgICAnaXNGdW5jdGlvbic6IHV0aWwuaXNGdW5jdGlvbixcbiAgICAnaXNXZWFrTWFwJzogdXRpbC5pc1dlYWtNYXAsXG4gICAgJ2l0ZXJhdGVlJzogdXRpbC5pdGVyYXRlZSxcbiAgICAna2V5cyc6IHV0aWwua2V5cyxcbiAgICAncmVhcmcnOiB1dGlsLnJlYXJnLFxuICAgICd0b0ludGVnZXInOiB1dGlsLnRvSW50ZWdlcixcbiAgICAndG9QYXRoJzogdXRpbC50b1BhdGhcbiAgfTtcblxuICB2YXIgYXJ5ID0gaGVscGVycy5hcnksXG4gICAgICBhc3NpZ24gPSBoZWxwZXJzLmFzc2lnbixcbiAgICAgIGNsb25lID0gaGVscGVycy5jbG9uZSxcbiAgICAgIGN1cnJ5ID0gaGVscGVycy5jdXJyeSxcbiAgICAgIGVhY2ggPSBoZWxwZXJzLmZvckVhY2gsXG4gICAgICBpc0FycmF5ID0gaGVscGVycy5pc0FycmF5LFxuICAgICAgaXNFcnJvciA9IGhlbHBlcnMuaXNFcnJvcixcbiAgICAgIGlzRnVuY3Rpb24gPSBoZWxwZXJzLmlzRnVuY3Rpb24sXG4gICAgICBpc1dlYWtNYXAgPSBoZWxwZXJzLmlzV2Vha01hcCxcbiAgICAgIGtleXMgPSBoZWxwZXJzLmtleXMsXG4gICAgICByZWFyZyA9IGhlbHBlcnMucmVhcmcsXG4gICAgICB0b0ludGVnZXIgPSBoZWxwZXJzLnRvSW50ZWdlcixcbiAgICAgIHRvUGF0aCA9IGhlbHBlcnMudG9QYXRoO1xuXG4gIHZhciBhcnlNZXRob2RLZXlzID0ga2V5cyhtYXBwaW5nLmFyeU1ldGhvZCk7XG5cbiAgdmFyIHdyYXBwZXJzID0ge1xuICAgICdjYXN0QXJyYXknOiBmdW5jdGlvbihjYXN0QXJyYXkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzWzBdO1xuICAgICAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgICAgICA/IGNhc3RBcnJheShjbG9uZUFycmF5KHZhbHVlKSlcbiAgICAgICAgICA6IGNhc3RBcnJheS5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ2l0ZXJhdGVlJzogZnVuY3Rpb24oaXRlcmF0ZWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICBhcml0eSA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgIHJlc3VsdCA9IGl0ZXJhdGVlKGZ1bmMsIGFyaXR5KSxcbiAgICAgICAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5jYXAgJiYgdHlwZW9mIGFyaXR5ID09ICdudW1iZXInKSB7XG4gICAgICAgICAgYXJpdHkgPSBhcml0eSA+IDIgPyAoYXJpdHkgLSAyKSA6IDE7XG4gICAgICAgICAgcmV0dXJuIChsZW5ndGggJiYgbGVuZ3RoIDw9IGFyaXR5KSA/IHJlc3VsdCA6IGJhc2VBcnkocmVzdWx0LCBhcml0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfSxcbiAgICAnbWl4aW4nOiBmdW5jdGlvbihtaXhpbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICB2YXIgZnVuYyA9IHRoaXM7XG4gICAgICAgIGlmICghaXNGdW5jdGlvbihmdW5jKSkge1xuICAgICAgICAgIHJldHVybiBtaXhpbihmdW5jLCBPYmplY3Qoc291cmNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhaXJzID0gW107XG4gICAgICAgIGVhY2goa2V5cyhzb3VyY2UpLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICBpZiAoaXNGdW5jdGlvbihzb3VyY2Vba2V5XSkpIHtcbiAgICAgICAgICAgIHBhaXJzLnB1c2goW2tleSwgZnVuYy5wcm90b3R5cGVba2V5XV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWl4aW4oZnVuYywgT2JqZWN0KHNvdXJjZSkpO1xuXG4gICAgICAgIGVhY2gocGFpcnMsIGZ1bmN0aW9uKHBhaXIpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBwYWlyWzFdO1xuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgICAgZnVuYy5wcm90b3R5cGVbcGFpclswXV0gPSB2YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGZ1bmMucHJvdG90eXBlW3BhaXJbMF1dO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgfTtcbiAgICB9LFxuICAgICdudGhBcmcnOiBmdW5jdGlvbihudGhBcmcpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihuKSB7XG4gICAgICAgIHZhciBhcml0eSA9IG4gPCAwID8gMSA6ICh0b0ludGVnZXIobikgKyAxKTtcbiAgICAgICAgcmV0dXJuIGN1cnJ5KG50aEFyZyhuKSwgYXJpdHkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgICdyZWFyZyc6IGZ1bmN0aW9uKHJlYXJnKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZnVuYywgaW5kZXhlcykge1xuICAgICAgICB2YXIgYXJpdHkgPSBpbmRleGVzID8gaW5kZXhlcy5sZW5ndGggOiAwO1xuICAgICAgICByZXR1cm4gY3VycnkocmVhcmcoZnVuYywgaW5kZXhlcyksIGFyaXR5KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICAncnVuSW5Db250ZXh0JzogZnVuY3Rpb24ocnVuSW5Db250ZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgICByZXR1cm4gYmFzZUNvbnZlcnQodXRpbCwgcnVuSW5Db250ZXh0KGNvbnRleHQpLCBvcHRpb25zKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDYXN0cyBgZnVuY2AgdG8gYSBmdW5jdGlvbiB3aXRoIGFuIGFyaXR5IGNhcHBlZCBpdGVyYXRlZSBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0Q2FwKG5hbWUsIGZ1bmMpIHtcbiAgICBpZiAoY29uZmlnLmNhcCkge1xuICAgICAgdmFyIGluZGV4ZXMgPSBtYXBwaW5nLml0ZXJhdGVlUmVhcmdbbmFtZV07XG4gICAgICBpZiAoaW5kZXhlcykge1xuICAgICAgICByZXR1cm4gaXRlcmF0ZWVSZWFyZyhmdW5jLCBpbmRleGVzKTtcbiAgICAgIH1cbiAgICAgIHZhciBuID0gIWlzTGliICYmIG1hcHBpbmcuaXRlcmF0ZWVBcnlbbmFtZV07XG4gICAgICBpZiAobikge1xuICAgICAgICByZXR1cm4gaXRlcmF0ZWVBcnkoZnVuYywgbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhIGN1cnJpZWQgZnVuY3Rpb24gaWYgbmVlZGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IG9mIGBmdW5jYC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYXN0IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY2FzdEN1cnJ5KG5hbWUsIGZ1bmMsIG4pIHtcbiAgICByZXR1cm4gKGZvcmNlQ3VycnkgfHwgKGNvbmZpZy5jdXJyeSAmJiBuID4gMSkpXG4gICAgICA/IGN1cnJ5KGZ1bmMsIG4pXG4gICAgICA6IGZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQ2FzdHMgYGZ1bmNgIHRvIGEgZml4ZWQgYXJpdHkgZnVuY3Rpb24gaWYgbmVlZGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IGNhcC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYXN0IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY2FzdEZpeGVkKG5hbWUsIGZ1bmMsIG4pIHtcbiAgICBpZiAoY29uZmlnLmZpeGVkICYmIChmb3JjZUZpeGVkIHx8ICFtYXBwaW5nLnNraXBGaXhlZFtuYW1lXSkpIHtcbiAgICAgIHZhciBkYXRhID0gbWFwcGluZy5tZXRob2RTcHJlYWRbbmFtZV0sXG4gICAgICAgICAgc3RhcnQgPSBkYXRhICYmIGRhdGEuc3RhcnQ7XG5cbiAgICAgIHJldHVybiBzdGFydCAgPT09IHVuZGVmaW5lZCA/IGFyeShmdW5jLCBuKSA6IGZsYXRTcHJlYWQoZnVuYywgc3RhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0cyBgZnVuY2AgdG8gYW4gcmVhcmdlZCBmdW5jdGlvbiBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0UmVhcmcobmFtZSwgZnVuYywgbikge1xuICAgIHJldHVybiAoY29uZmlnLnJlYXJnICYmIG4gPiAxICYmIChmb3JjZVJlYXJnIHx8ICFtYXBwaW5nLnNraXBSZWFyZ1tuYW1lXSkpXG4gICAgICA/IHJlYXJnKGZ1bmMsIG1hcHBpbmcubWV0aG9kUmVhcmdbbmFtZV0gfHwgbWFwcGluZy5hcnlSZWFyZ1tuXSlcbiAgICAgIDogZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG9iamVjdGAgYnkgYHBhdGhgLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNsb25lIGJ5LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgb2JqZWN0LlxuICAgKi9cbiAgZnVuY3Rpb24gY2xvbmVCeVBhdGgob2JqZWN0LCBwYXRoKSB7XG4gICAgcGF0aCA9IHRvUGF0aChwYXRoKTtcblxuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMSxcbiAgICAgICAgcmVzdWx0ID0gY2xvbmUoT2JqZWN0KG9iamVjdCkpLFxuICAgICAgICBuZXN0ZWQgPSByZXN1bHQ7XG5cbiAgICB3aGlsZSAobmVzdGVkICE9IG51bGwgJiYgKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIGtleSA9IHBhdGhbaW5kZXhdLFxuICAgICAgICAgIHZhbHVlID0gbmVzdGVkW2tleV07XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmXG4gICAgICAgICAgIShpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0Vycm9yKHZhbHVlKSB8fCBpc1dlYWtNYXAodmFsdWUpKSkge1xuICAgICAgICBuZXN0ZWRba2V5XSA9IGNsb25lKGluZGV4ID09IGxhc3RJbmRleCA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKSk7XG4gICAgICB9XG4gICAgICBuZXN0ZWQgPSBuZXN0ZWRba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBgbG9kYXNoYCB0byBhbiBpbW11dGFibGUgYXV0by1jdXJyaWVkIGl0ZXJhdGVlLWZpcnN0IGRhdGEtbGFzdFxuICAgKiB2ZXJzaW9uIHdpdGggY29udmVyc2lvbiBgb3B0aW9uc2AgYXBwbGllZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuIFNlZSBgYmFzZUNvbnZlcnRgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGBsb2Rhc2hgLlxuICAgKi9cbiAgZnVuY3Rpb24gY29udmVydExpYihvcHRpb25zKSB7XG4gICAgcmV0dXJuIF8ucnVuSW5Db250ZXh0LmNvbnZlcnQob3B0aW9ucykodW5kZWZpbmVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb252ZXJ0ZXIgZnVuY3Rpb24gZm9yIGBmdW5jYCBvZiBgbmFtZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb252ZXJ0ZXIgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDb252ZXJ0ZXIobmFtZSwgZnVuYykge1xuICAgIHZhciByZWFsTmFtZSA9IG1hcHBpbmcuYWxpYXNUb1JlYWxbbmFtZV0gfHwgbmFtZSxcbiAgICAgICAgbWV0aG9kTmFtZSA9IG1hcHBpbmcucmVtYXBbcmVhbE5hbWVdIHx8IHJlYWxOYW1lLFxuICAgICAgICBvbGRPcHRpb25zID0gb3B0aW9ucztcblxuICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgbmV3VXRpbCA9IGlzTGliID8gcHJpc3RpbmUgOiBoZWxwZXJzLFxuICAgICAgICAgIG5ld0Z1bmMgPSBpc0xpYiA/IHByaXN0aW5lW21ldGhvZE5hbWVdIDogZnVuYyxcbiAgICAgICAgICBuZXdPcHRpb25zID0gYXNzaWduKGFzc2lnbih7fSwgb2xkT3B0aW9ucyksIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gYmFzZUNvbnZlcnQobmV3VXRpbCwgcmVhbE5hbWUsIG5ld0Z1bmMsIG5ld09wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdHMgaXRlcmF0ZWUsIHdpdGggdXAgdG8gYG5gXG4gICAqIGFyZ3VtZW50cywgaWdub3JpbmcgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgaXRlcmF0ZWUgYXJndW1lbnRzIGZvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IGNhcC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBpdGVyYXRlZUFyeShmdW5jLCBuKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicgPyBiYXNlQXJ5KGZ1bmMsIG4pIDogZnVuYztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0cyBpdGVyYXRlZSB3aXRoIGFyZ3VtZW50c1xuICAgKiBhcnJhbmdlZCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCBgaW5kZXhlc2Agd2hlcmUgdGhlIGFyZ3VtZW50IHZhbHVlIGF0XG4gICAqIHRoZSBmaXJzdCBpbmRleCBpcyBwcm92aWRlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQsIHRoZSBhcmd1bWVudCB2YWx1ZSBhdFxuICAgKiB0aGUgc2Vjb25kIGluZGV4IGlzIHByb3ZpZGVkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQsIGFuZCBzbyBvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVhcnJhbmdlIGl0ZXJhdGVlIGFyZ3VtZW50cyBmb3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGFycmFuZ2VkIGFyZ3VtZW50IGluZGV4ZXMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gaXRlcmF0ZWVSZWFyZyhmdW5jLCBpbmRleGVzKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgdmFyIG4gPSBpbmRleGVzLmxlbmd0aDtcbiAgICAgIHJldHVybiBiYXNlQXJpdHkocmVhcmcoYmFzZUFyeShmdW5jLCBuKSwgaW5kZXhlcyksIG4pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGZpcnN0IGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMoKTtcbiAgICAgIH1cbiAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGNvbmZpZy5yZWFyZyA/IDAgOiAobGVuZ3RoIC0gMSk7XG4gICAgICBhcmdzW2luZGV4XSA9IHRyYW5zZm9ybShhcmdzW2luZGV4XSk7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIGFuZCBhcHBseXMgdGhlIGNvbnZlcnNpb25zXG4gICAqIHJ1bGVzIGJ5IGBuYW1lYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gd3JhcChuYW1lLCBmdW5jLCBwbGFjZWhvbGRlcikge1xuICAgIHZhciByZXN1bHQsXG4gICAgICAgIHJlYWxOYW1lID0gbWFwcGluZy5hbGlhc1RvUmVhbFtuYW1lXSB8fCBuYW1lLFxuICAgICAgICB3cmFwcGVkID0gZnVuYyxcbiAgICAgICAgd3JhcHBlciA9IHdyYXBwZXJzW3JlYWxOYW1lXTtcblxuICAgIGlmICh3cmFwcGVyKSB7XG4gICAgICB3cmFwcGVkID0gd3JhcHBlcihmdW5jKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29uZmlnLmltbXV0YWJsZSkge1xuICAgICAgaWYgKG1hcHBpbmcubXV0YXRlLmFycmF5W3JlYWxOYW1lXSkge1xuICAgICAgICB3cmFwcGVkID0gd3JhcEltbXV0YWJsZShmdW5jLCBjbG9uZUFycmF5KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG1hcHBpbmcubXV0YXRlLm9iamVjdFtyZWFsTmFtZV0pIHtcbiAgICAgICAgd3JhcHBlZCA9IHdyYXBJbW11dGFibGUoZnVuYywgY3JlYXRlQ2xvbmVyKGZ1bmMpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG1hcHBpbmcubXV0YXRlLnNldFtyZWFsTmFtZV0pIHtcbiAgICAgICAgd3JhcHBlZCA9IHdyYXBJbW11dGFibGUoZnVuYywgY2xvbmVCeVBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICBlYWNoKGFyeU1ldGhvZEtleXMsIGZ1bmN0aW9uKGFyeUtleSkge1xuICAgICAgZWFjaChtYXBwaW5nLmFyeU1ldGhvZFthcnlLZXldLCBmdW5jdGlvbihvdGhlck5hbWUpIHtcbiAgICAgICAgaWYgKHJlYWxOYW1lID09IG90aGVyTmFtZSkge1xuICAgICAgICAgIHZhciBkYXRhID0gbWFwcGluZy5tZXRob2RTcHJlYWRbcmVhbE5hbWVdLFxuICAgICAgICAgICAgICBhZnRlclJlYXJnID0gZGF0YSAmJiBkYXRhLmFmdGVyUmVhcmc7XG5cbiAgICAgICAgICByZXN1bHQgPSBhZnRlclJlYXJnXG4gICAgICAgICAgICA/IGNhc3RGaXhlZChyZWFsTmFtZSwgY2FzdFJlYXJnKHJlYWxOYW1lLCB3cmFwcGVkLCBhcnlLZXkpLCBhcnlLZXkpXG4gICAgICAgICAgICA6IGNhc3RSZWFyZyhyZWFsTmFtZSwgY2FzdEZpeGVkKHJlYWxOYW1lLCB3cmFwcGVkLCBhcnlLZXkpLCBhcnlLZXkpO1xuXG4gICAgICAgICAgcmVzdWx0ID0gY2FzdENhcChyZWFsTmFtZSwgcmVzdWx0KTtcbiAgICAgICAgICByZXN1bHQgPSBjYXN0Q3VycnkocmVhbE5hbWUsIHJlc3VsdCwgYXJ5S2V5KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgfSk7XG5cbiAgICByZXN1bHQgfHwgKHJlc3VsdCA9IHdyYXBwZWQpO1xuICAgIGlmIChyZXN1bHQgPT0gZnVuYykge1xuICAgICAgcmVzdWx0ID0gZm9yY2VDdXJyeSA/IGN1cnJ5KHJlc3VsdCwgMSkgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJlc3VsdC5jb252ZXJ0ID0gY3JlYXRlQ29udmVydGVyKHJlYWxOYW1lLCBmdW5jKTtcbiAgICByZXN1bHQucGxhY2Vob2xkZXIgPSBmdW5jLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgaWYgKCFpc09iaikge1xuICAgIHJldHVybiB3cmFwKG5hbWUsIGZ1bmMsIGRlZmF1bHRIb2xkZXIpO1xuICB9XG4gIHZhciBfID0gZnVuYztcblxuICAvLyBDb252ZXJ0IG1ldGhvZHMgYnkgYXJ5IGNhcC5cbiAgdmFyIHBhaXJzID0gW107XG4gIGVhY2goYXJ5TWV0aG9kS2V5cywgZnVuY3Rpb24oYXJ5S2V5KSB7XG4gICAgZWFjaChtYXBwaW5nLmFyeU1ldGhvZFthcnlLZXldLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBmdW5jID0gX1ttYXBwaW5nLnJlbWFwW2tleV0gfHwga2V5XTtcbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHBhaXJzLnB1c2goW2tleSwgd3JhcChrZXksIGZ1bmMsIF8pXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIENvbnZlcnQgcmVtYWluaW5nIG1ldGhvZHMuXG4gIGVhY2goa2V5cyhfKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIGZ1bmMgPSBfW2tleV07XG4gICAgaWYgKHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBsZW5ndGggPSBwYWlycy5sZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKHBhaXJzW2xlbmd0aF1bMF0gPT0ga2V5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jLmNvbnZlcnQgPSBjcmVhdGVDb252ZXJ0ZXIoa2V5LCBmdW5jKTtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgZnVuY10pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQXNzaWduIHRvIGBfYCBsZWF2aW5nIGBfLnByb3RvdHlwZWAgdW5jaGFuZ2VkIHRvIGFsbG93IGNoYWluaW5nLlxuICBlYWNoKHBhaXJzLCBmdW5jdGlvbihwYWlyKSB7XG4gICAgX1twYWlyWzBdXSA9IHBhaXJbMV07XG4gIH0pO1xuXG4gIF8uY29udmVydCA9IGNvbnZlcnRMaWI7XG4gIF8ucGxhY2Vob2xkZXIgPSBfO1xuXG4gIC8vIEFzc2lnbiBhbGlhc2VzLlxuICBlYWNoKGtleXMoXyksIGZ1bmN0aW9uKGtleSkge1xuICAgIGVhY2gobWFwcGluZy5yZWFsVG9BbGlhc1trZXldIHx8IFtdLCBmdW5jdGlvbihhbGlhcykge1xuICAgICAgX1thbGlhc10gPSBfW2tleV07XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb252ZXJ0O1xuIiwiLyoqIFVzZWQgdG8gbWFwIGFsaWFzZXMgdG8gdGhlaXIgcmVhbCBuYW1lcy4gKi9cbmV4cG9ydHMuYWxpYXNUb1JlYWwgPSB7XG5cbiAgLy8gTG9kYXNoIGFsaWFzZXMuXG4gICdlYWNoJzogJ2ZvckVhY2gnLFxuICAnZWFjaFJpZ2h0JzogJ2ZvckVhY2hSaWdodCcsXG4gICdlbnRyaWVzJzogJ3RvUGFpcnMnLFxuICAnZW50cmllc0luJzogJ3RvUGFpcnNJbicsXG4gICdleHRlbmQnOiAnYXNzaWduSW4nLFxuICAnZXh0ZW5kQWxsJzogJ2Fzc2lnbkluQWxsJyxcbiAgJ2V4dGVuZEFsbFdpdGgnOiAnYXNzaWduSW5BbGxXaXRoJyxcbiAgJ2V4dGVuZFdpdGgnOiAnYXNzaWduSW5XaXRoJyxcbiAgJ2ZpcnN0JzogJ2hlYWQnLFxuXG4gIC8vIE1ldGhvZHMgdGhhdCBhcmUgY3VycmllZCB2YXJpYW50cyBvZiBvdGhlcnMuXG4gICdjb25mb3Jtcyc6ICdjb25mb3Jtc1RvJyxcbiAgJ21hdGNoZXMnOiAnaXNNYXRjaCcsXG4gICdwcm9wZXJ0eSc6ICdnZXQnLFxuXG4gIC8vIFJhbWRhIGFsaWFzZXMuXG4gICdfXyc6ICdwbGFjZWhvbGRlcicsXG4gICdGJzogJ3N0dWJGYWxzZScsXG4gICdUJzogJ3N0dWJUcnVlJyxcbiAgJ2FsbCc6ICdldmVyeScsXG4gICdhbGxQYXNzJzogJ292ZXJFdmVyeScsXG4gICdhbHdheXMnOiAnY29uc3RhbnQnLFxuICAnYW55JzogJ3NvbWUnLFxuICAnYW55UGFzcyc6ICdvdmVyU29tZScsXG4gICdhcHBseSc6ICdzcHJlYWQnLFxuICAnYXNzb2MnOiAnc2V0JyxcbiAgJ2Fzc29jUGF0aCc6ICdzZXQnLFxuICAnY29tcGxlbWVudCc6ICduZWdhdGUnLFxuICAnY29tcG9zZSc6ICdmbG93UmlnaHQnLFxuICAnY29udGFpbnMnOiAnaW5jbHVkZXMnLFxuICAnZGlzc29jJzogJ3Vuc2V0JyxcbiAgJ2Rpc3NvY1BhdGgnOiAndW5zZXQnLFxuICAnZHJvcExhc3QnOiAnZHJvcFJpZ2h0JyxcbiAgJ2Ryb3BMYXN0V2hpbGUnOiAnZHJvcFJpZ2h0V2hpbGUnLFxuICAnZXF1YWxzJzogJ2lzRXF1YWwnLFxuICAnaWRlbnRpY2FsJzogJ2VxJyxcbiAgJ2luZGV4QnknOiAna2V5QnknLFxuICAnaW5pdCc6ICdpbml0aWFsJyxcbiAgJ2ludmVydE9iaic6ICdpbnZlcnQnLFxuICAnanV4dCc6ICdvdmVyJyxcbiAgJ29taXRBbGwnOiAnb21pdCcsXG4gICduQXJ5JzogJ2FyeScsXG4gICdwYXRoJzogJ2dldCcsXG4gICdwYXRoRXEnOiAnbWF0Y2hlc1Byb3BlcnR5JyxcbiAgJ3BhdGhPcic6ICdnZXRPcicsXG4gICdwYXRocyc6ICdhdCcsXG4gICdwaWNrQWxsJzogJ3BpY2snLFxuICAncGlwZSc6ICdmbG93JyxcbiAgJ3BsdWNrJzogJ21hcCcsXG4gICdwcm9wJzogJ2dldCcsXG4gICdwcm9wRXEnOiAnbWF0Y2hlc1Byb3BlcnR5JyxcbiAgJ3Byb3BPcic6ICdnZXRPcicsXG4gICdwcm9wcyc6ICdhdCcsXG4gICdzeW1tZXRyaWNEaWZmZXJlbmNlJzogJ3hvcicsXG4gICdzeW1tZXRyaWNEaWZmZXJlbmNlQnknOiAneG9yQnknLFxuICAnc3ltbWV0cmljRGlmZmVyZW5jZVdpdGgnOiAneG9yV2l0aCcsXG4gICd0YWtlTGFzdCc6ICd0YWtlUmlnaHQnLFxuICAndGFrZUxhc3RXaGlsZSc6ICd0YWtlUmlnaHRXaGlsZScsXG4gICd1bmFwcGx5JzogJ3Jlc3QnLFxuICAndW5uZXN0JzogJ2ZsYXR0ZW4nLFxuICAndXNlV2l0aCc6ICdvdmVyQXJncycsXG4gICd3aGVyZSc6ICdjb25mb3Jtc1RvJyxcbiAgJ3doZXJlRXEnOiAnaXNNYXRjaCcsXG4gICd6aXBPYmonOiAnemlwT2JqZWN0J1xufTtcblxuLyoqIFVzZWQgdG8gbWFwIGFyeSB0byBtZXRob2QgbmFtZXMuICovXG5leHBvcnRzLmFyeU1ldGhvZCA9IHtcbiAgJzEnOiBbXG4gICAgJ2Fzc2lnbkFsbCcsICdhc3NpZ25JbkFsbCcsICdhdHRlbXB0JywgJ2Nhc3RBcnJheScsICdjZWlsJywgJ2NyZWF0ZScsXG4gICAgJ2N1cnJ5JywgJ2N1cnJ5UmlnaHQnLCAnZGVmYXVsdHNBbGwnLCAnZGVmYXVsdHNEZWVwQWxsJywgJ2Zsb29yJywgJ2Zsb3cnLFxuICAgICdmbG93UmlnaHQnLCAnZnJvbVBhaXJzJywgJ2ludmVydCcsICdpdGVyYXRlZScsICdtZW1vaXplJywgJ21ldGhvZCcsICdtZXJnZUFsbCcsXG4gICAgJ21ldGhvZE9mJywgJ21peGluJywgJ250aEFyZycsICdvdmVyJywgJ292ZXJFdmVyeScsICdvdmVyU29tZScsJ3Jlc3QnLCAncmV2ZXJzZScsXG4gICAgJ3JvdW5kJywgJ3J1bkluQ29udGV4dCcsICdzcHJlYWQnLCAndGVtcGxhdGUnLCAndHJpbScsICd0cmltRW5kJywgJ3RyaW1TdGFydCcsXG4gICAgJ3VuaXF1ZUlkJywgJ3dvcmRzJywgJ3ppcEFsbCdcbiAgXSxcbiAgJzInOiBbXG4gICAgJ2FkZCcsICdhZnRlcicsICdhcnknLCAnYXNzaWduJywgJ2Fzc2lnbkFsbFdpdGgnLCAnYXNzaWduSW4nLCAnYXNzaWduSW5BbGxXaXRoJyxcbiAgICAnYXQnLCAnYmVmb3JlJywgJ2JpbmQnLCAnYmluZEFsbCcsICdiaW5kS2V5JywgJ2NodW5rJywgJ2Nsb25lRGVlcFdpdGgnLFxuICAgICdjbG9uZVdpdGgnLCAnY29uY2F0JywgJ2NvbmZvcm1zVG8nLCAnY291bnRCeScsICdjdXJyeU4nLCAnY3VycnlSaWdodE4nLFxuICAgICdkZWJvdW5jZScsICdkZWZhdWx0cycsICdkZWZhdWx0c0RlZXAnLCAnZGVmYXVsdFRvJywgJ2RlbGF5JywgJ2RpZmZlcmVuY2UnLFxuICAgICdkaXZpZGUnLCAnZHJvcCcsICdkcm9wUmlnaHQnLCAnZHJvcFJpZ2h0V2hpbGUnLCAnZHJvcFdoaWxlJywgJ2VuZHNXaXRoJywgJ2VxJyxcbiAgICAnZXZlcnknLCAnZmlsdGVyJywgJ2ZpbmQnLCAnZmluZEluZGV4JywgJ2ZpbmRLZXknLCAnZmluZExhc3QnLCAnZmluZExhc3RJbmRleCcsXG4gICAgJ2ZpbmRMYXN0S2V5JywgJ2ZsYXRNYXAnLCAnZmxhdE1hcERlZXAnLCAnZmxhdHRlbkRlcHRoJywgJ2ZvckVhY2gnLFxuICAgICdmb3JFYWNoUmlnaHQnLCAnZm9ySW4nLCAnZm9ySW5SaWdodCcsICdmb3JPd24nLCAnZm9yT3duUmlnaHQnLCAnZ2V0JyxcbiAgICAnZ3JvdXBCeScsICdndCcsICdndGUnLCAnaGFzJywgJ2hhc0luJywgJ2luY2x1ZGVzJywgJ2luZGV4T2YnLCAnaW50ZXJzZWN0aW9uJyxcbiAgICAnaW52ZXJ0QnknLCAnaW52b2tlJywgJ2ludm9rZU1hcCcsICdpc0VxdWFsJywgJ2lzTWF0Y2gnLCAnam9pbicsICdrZXlCeScsXG4gICAgJ2xhc3RJbmRleE9mJywgJ2x0JywgJ2x0ZScsICdtYXAnLCAnbWFwS2V5cycsICdtYXBWYWx1ZXMnLCAnbWF0Y2hlc1Byb3BlcnR5JyxcbiAgICAnbWF4QnknLCAnbWVhbkJ5JywgJ21lcmdlJywgJ21lcmdlQWxsV2l0aCcsICdtaW5CeScsICdtdWx0aXBseScsICdudGgnLCAnb21pdCcsXG4gICAgJ29taXRCeScsICdvdmVyQXJncycsICdwYWQnLCAncGFkRW5kJywgJ3BhZFN0YXJ0JywgJ3BhcnNlSW50JywgJ3BhcnRpYWwnLFxuICAgICdwYXJ0aWFsUmlnaHQnLCAncGFydGl0aW9uJywgJ3BpY2snLCAncGlja0J5JywgJ3Byb3BlcnR5T2YnLCAncHVsbCcsICdwdWxsQWxsJyxcbiAgICAncHVsbEF0JywgJ3JhbmRvbScsICdyYW5nZScsICdyYW5nZVJpZ2h0JywgJ3JlYXJnJywgJ3JlamVjdCcsICdyZW1vdmUnLFxuICAgICdyZXBlYXQnLCAncmVzdEZyb20nLCAncmVzdWx0JywgJ3NhbXBsZVNpemUnLCAnc29tZScsICdzb3J0QnknLCAnc29ydGVkSW5kZXgnLFxuICAgICdzb3J0ZWRJbmRleE9mJywgJ3NvcnRlZExhc3RJbmRleCcsICdzb3J0ZWRMYXN0SW5kZXhPZicsICdzb3J0ZWRVbmlxQnknLFxuICAgICdzcGxpdCcsICdzcHJlYWRGcm9tJywgJ3N0YXJ0c1dpdGgnLCAnc3VidHJhY3QnLCAnc3VtQnknLCAndGFrZScsICd0YWtlUmlnaHQnLFxuICAgICd0YWtlUmlnaHRXaGlsZScsICd0YWtlV2hpbGUnLCAndGFwJywgJ3Rocm90dGxlJywgJ3RocnUnLCAndGltZXMnLCAndHJpbUNoYXJzJyxcbiAgICAndHJpbUNoYXJzRW5kJywgJ3RyaW1DaGFyc1N0YXJ0JywgJ3RydW5jYXRlJywgJ3VuaW9uJywgJ3VuaXFCeScsICd1bmlxV2l0aCcsXG4gICAgJ3Vuc2V0JywgJ3VuemlwV2l0aCcsICd3aXRob3V0JywgJ3dyYXAnLCAneG9yJywgJ3ppcCcsICd6aXBPYmplY3QnLFxuICAgICd6aXBPYmplY3REZWVwJ1xuICBdLFxuICAnMyc6IFtcbiAgICAnYXNzaWduSW5XaXRoJywgJ2Fzc2lnbldpdGgnLCAnY2xhbXAnLCAnZGlmZmVyZW5jZUJ5JywgJ2RpZmZlcmVuY2VXaXRoJyxcbiAgICAnZmluZEZyb20nLCAnZmluZEluZGV4RnJvbScsICdmaW5kTGFzdEZyb20nLCAnZmluZExhc3RJbmRleEZyb20nLCAnZ2V0T3InLFxuICAgICdpbmNsdWRlc0Zyb20nLCAnaW5kZXhPZkZyb20nLCAnaW5SYW5nZScsICdpbnRlcnNlY3Rpb25CeScsICdpbnRlcnNlY3Rpb25XaXRoJyxcbiAgICAnaW52b2tlQXJncycsICdpbnZva2VBcmdzTWFwJywgJ2lzRXF1YWxXaXRoJywgJ2lzTWF0Y2hXaXRoJywgJ2ZsYXRNYXBEZXB0aCcsXG4gICAgJ2xhc3RJbmRleE9mRnJvbScsICdtZXJnZVdpdGgnLCAnb3JkZXJCeScsICdwYWRDaGFycycsICdwYWRDaGFyc0VuZCcsXG4gICAgJ3BhZENoYXJzU3RhcnQnLCAncHVsbEFsbEJ5JywgJ3B1bGxBbGxXaXRoJywgJ3JhbmdlU3RlcCcsICdyYW5nZVN0ZXBSaWdodCcsXG4gICAgJ3JlZHVjZScsICdyZWR1Y2VSaWdodCcsICdyZXBsYWNlJywgJ3NldCcsICdzbGljZScsICdzb3J0ZWRJbmRleEJ5JyxcbiAgICAnc29ydGVkTGFzdEluZGV4QnknLCAndHJhbnNmb3JtJywgJ3VuaW9uQnknLCAndW5pb25XaXRoJywgJ3VwZGF0ZScsICd4b3JCeScsXG4gICAgJ3hvcldpdGgnLCAnemlwV2l0aCdcbiAgXSxcbiAgJzQnOiBbXG4gICAgJ2ZpbGwnLCAnc2V0V2l0aCcsICd1cGRhdGVXaXRoJ1xuICBdXG59O1xuXG4vKiogVXNlZCB0byBtYXAgYXJ5IHRvIHJlYXJnIGNvbmZpZ3MuICovXG5leHBvcnRzLmFyeVJlYXJnID0ge1xuICAnMic6IFsxLCAwXSxcbiAgJzMnOiBbMiwgMCwgMV0sXG4gICc0JzogWzMsIDIsIDAsIDFdXG59O1xuXG4vKiogVXNlZCB0byBtYXAgbWV0aG9kIG5hbWVzIHRvIHRoZWlyIGl0ZXJhdGVlIGFyeS4gKi9cbmV4cG9ydHMuaXRlcmF0ZWVBcnkgPSB7XG4gICdkcm9wUmlnaHRXaGlsZSc6IDEsXG4gICdkcm9wV2hpbGUnOiAxLFxuICAnZXZlcnknOiAxLFxuICAnZmlsdGVyJzogMSxcbiAgJ2ZpbmQnOiAxLFxuICAnZmluZEZyb20nOiAxLFxuICAnZmluZEluZGV4JzogMSxcbiAgJ2ZpbmRJbmRleEZyb20nOiAxLFxuICAnZmluZEtleSc6IDEsXG4gICdmaW5kTGFzdCc6IDEsXG4gICdmaW5kTGFzdEZyb20nOiAxLFxuICAnZmluZExhc3RJbmRleCc6IDEsXG4gICdmaW5kTGFzdEluZGV4RnJvbSc6IDEsXG4gICdmaW5kTGFzdEtleSc6IDEsXG4gICdmbGF0TWFwJzogMSxcbiAgJ2ZsYXRNYXBEZWVwJzogMSxcbiAgJ2ZsYXRNYXBEZXB0aCc6IDEsXG4gICdmb3JFYWNoJzogMSxcbiAgJ2ZvckVhY2hSaWdodCc6IDEsXG4gICdmb3JJbic6IDEsXG4gICdmb3JJblJpZ2h0JzogMSxcbiAgJ2Zvck93bic6IDEsXG4gICdmb3JPd25SaWdodCc6IDEsXG4gICdtYXAnOiAxLFxuICAnbWFwS2V5cyc6IDEsXG4gICdtYXBWYWx1ZXMnOiAxLFxuICAncGFydGl0aW9uJzogMSxcbiAgJ3JlZHVjZSc6IDIsXG4gICdyZWR1Y2VSaWdodCc6IDIsXG4gICdyZWplY3QnOiAxLFxuICAncmVtb3ZlJzogMSxcbiAgJ3NvbWUnOiAxLFxuICAndGFrZVJpZ2h0V2hpbGUnOiAxLFxuICAndGFrZVdoaWxlJzogMSxcbiAgJ3RpbWVzJzogMSxcbiAgJ3RyYW5zZm9ybSc6IDJcbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBtZXRob2QgbmFtZXMgdG8gaXRlcmF0ZWUgcmVhcmcgY29uZmlncy4gKi9cbmV4cG9ydHMuaXRlcmF0ZWVSZWFyZyA9IHtcbiAgJ21hcEtleXMnOiBbMV0sXG4gICdyZWR1Y2VSaWdodCc6IFsxLCAwXVxufTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byByZWFyZyBjb25maWdzLiAqL1xuZXhwb3J0cy5tZXRob2RSZWFyZyA9IHtcbiAgJ2Fzc2lnbkluQWxsV2l0aCc6IFsxLCAwXSxcbiAgJ2Fzc2lnbkluV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ2Fzc2lnbkFsbFdpdGgnOiBbMSwgMF0sXG4gICdhc3NpZ25XaXRoJzogWzEsIDIsIDBdLFxuICAnZGlmZmVyZW5jZUJ5JzogWzEsIDIsIDBdLFxuICAnZGlmZmVyZW5jZVdpdGgnOiBbMSwgMiwgMF0sXG4gICdnZXRPcic6IFsyLCAxLCAwXSxcbiAgJ2ludGVyc2VjdGlvbkJ5JzogWzEsIDIsIDBdLFxuICAnaW50ZXJzZWN0aW9uV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ2lzRXF1YWxXaXRoJzogWzEsIDIsIDBdLFxuICAnaXNNYXRjaFdpdGgnOiBbMiwgMSwgMF0sXG4gICdtZXJnZUFsbFdpdGgnOiBbMSwgMF0sXG4gICdtZXJnZVdpdGgnOiBbMSwgMiwgMF0sXG4gICdwYWRDaGFycyc6IFsyLCAxLCAwXSxcbiAgJ3BhZENoYXJzRW5kJzogWzIsIDEsIDBdLFxuICAncGFkQ2hhcnNTdGFydCc6IFsyLCAxLCAwXSxcbiAgJ3B1bGxBbGxCeSc6IFsyLCAxLCAwXSxcbiAgJ3B1bGxBbGxXaXRoJzogWzIsIDEsIDBdLFxuICAncmFuZ2VTdGVwJzogWzEsIDIsIDBdLFxuICAncmFuZ2VTdGVwUmlnaHQnOiBbMSwgMiwgMF0sXG4gICdzZXRXaXRoJzogWzMsIDEsIDIsIDBdLFxuICAnc29ydGVkSW5kZXhCeSc6IFsyLCAxLCAwXSxcbiAgJ3NvcnRlZExhc3RJbmRleEJ5JzogWzIsIDEsIDBdLFxuICAndW5pb25CeSc6IFsxLCAyLCAwXSxcbiAgJ3VuaW9uV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ3VwZGF0ZVdpdGgnOiBbMywgMSwgMiwgMF0sXG4gICd4b3JCeSc6IFsxLCAyLCAwXSxcbiAgJ3hvcldpdGgnOiBbMSwgMiwgMF0sXG4gICd6aXBXaXRoJzogWzEsIDIsIDBdXG59O1xuXG4vKiogVXNlZCB0byBtYXAgbWV0aG9kIG5hbWVzIHRvIHNwcmVhZCBjb25maWdzLiAqL1xuZXhwb3J0cy5tZXRob2RTcHJlYWQgPSB7XG4gICdhc3NpZ25BbGwnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ2Fzc2lnbkFsbFdpdGgnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ2Fzc2lnbkluQWxsJzogeyAnc3RhcnQnOiAwIH0sXG4gICdhc3NpZ25JbkFsbFdpdGgnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ2RlZmF1bHRzQWxsJzogeyAnc3RhcnQnOiAwIH0sXG4gICdkZWZhdWx0c0RlZXBBbGwnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ2ludm9rZUFyZ3MnOiB7ICdzdGFydCc6IDIgfSxcbiAgJ2ludm9rZUFyZ3NNYXAnOiB7ICdzdGFydCc6IDIgfSxcbiAgJ21lcmdlQWxsJzogeyAnc3RhcnQnOiAwIH0sXG4gICdtZXJnZUFsbFdpdGgnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ3BhcnRpYWwnOiB7ICdzdGFydCc6IDEgfSxcbiAgJ3BhcnRpYWxSaWdodCc6IHsgJ3N0YXJ0JzogMSB9LFxuICAnd2l0aG91dCc6IHsgJ3N0YXJ0JzogMSB9LFxuICAnemlwQWxsJzogeyAnc3RhcnQnOiAwIH1cbn07XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IG1ldGhvZHMgd2hpY2ggbXV0YXRlIGFycmF5cyBvciBvYmplY3RzLiAqL1xuZXhwb3J0cy5tdXRhdGUgPSB7XG4gICdhcnJheSc6IHtcbiAgICAnZmlsbCc6IHRydWUsXG4gICAgJ3B1bGwnOiB0cnVlLFxuICAgICdwdWxsQWxsJzogdHJ1ZSxcbiAgICAncHVsbEFsbEJ5JzogdHJ1ZSxcbiAgICAncHVsbEFsbFdpdGgnOiB0cnVlLFxuICAgICdwdWxsQXQnOiB0cnVlLFxuICAgICdyZW1vdmUnOiB0cnVlLFxuICAgICdyZXZlcnNlJzogdHJ1ZVxuICB9LFxuICAnb2JqZWN0Jzoge1xuICAgICdhc3NpZ24nOiB0cnVlLFxuICAgICdhc3NpZ25BbGwnOiB0cnVlLFxuICAgICdhc3NpZ25BbGxXaXRoJzogdHJ1ZSxcbiAgICAnYXNzaWduSW4nOiB0cnVlLFxuICAgICdhc3NpZ25JbkFsbCc6IHRydWUsXG4gICAgJ2Fzc2lnbkluQWxsV2l0aCc6IHRydWUsXG4gICAgJ2Fzc2lnbkluV2l0aCc6IHRydWUsXG4gICAgJ2Fzc2lnbldpdGgnOiB0cnVlLFxuICAgICdkZWZhdWx0cyc6IHRydWUsXG4gICAgJ2RlZmF1bHRzQWxsJzogdHJ1ZSxcbiAgICAnZGVmYXVsdHNEZWVwJzogdHJ1ZSxcbiAgICAnZGVmYXVsdHNEZWVwQWxsJzogdHJ1ZSxcbiAgICAnbWVyZ2UnOiB0cnVlLFxuICAgICdtZXJnZUFsbCc6IHRydWUsXG4gICAgJ21lcmdlQWxsV2l0aCc6IHRydWUsXG4gICAgJ21lcmdlV2l0aCc6IHRydWUsXG4gIH0sXG4gICdzZXQnOiB7XG4gICAgJ3NldCc6IHRydWUsXG4gICAgJ3NldFdpdGgnOiB0cnVlLFxuICAgICd1bnNldCc6IHRydWUsXG4gICAgJ3VwZGF0ZSc6IHRydWUsXG4gICAgJ3VwZGF0ZVdpdGgnOiB0cnVlXG4gIH1cbn07XG5cbi8qKiBVc2VkIHRvIG1hcCByZWFsIG5hbWVzIHRvIHRoZWlyIGFsaWFzZXMuICovXG5leHBvcnRzLnJlYWxUb0FsaWFzID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgb2JqZWN0ID0gZXhwb3J0cy5hbGlhc1RvUmVhbCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsIHZhbHVlKSkge1xuICAgICAgcmVzdWx0W3ZhbHVlXS5wdXNoKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt2YWx1ZV0gPSBba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIG1hcCBtZXRob2QgbmFtZXMgdG8gb3RoZXIgbmFtZXMuICovXG5leHBvcnRzLnJlbWFwID0ge1xuICAnYXNzaWduQWxsJzogJ2Fzc2lnbicsXG4gICdhc3NpZ25BbGxXaXRoJzogJ2Fzc2lnbldpdGgnLFxuICAnYXNzaWduSW5BbGwnOiAnYXNzaWduSW4nLFxuICAnYXNzaWduSW5BbGxXaXRoJzogJ2Fzc2lnbkluV2l0aCcsXG4gICdjdXJyeU4nOiAnY3VycnknLFxuICAnY3VycnlSaWdodE4nOiAnY3VycnlSaWdodCcsXG4gICdkZWZhdWx0c0FsbCc6ICdkZWZhdWx0cycsXG4gICdkZWZhdWx0c0RlZXBBbGwnOiAnZGVmYXVsdHNEZWVwJyxcbiAgJ2ZpbmRGcm9tJzogJ2ZpbmQnLFxuICAnZmluZEluZGV4RnJvbSc6ICdmaW5kSW5kZXgnLFxuICAnZmluZExhc3RGcm9tJzogJ2ZpbmRMYXN0JyxcbiAgJ2ZpbmRMYXN0SW5kZXhGcm9tJzogJ2ZpbmRMYXN0SW5kZXgnLFxuICAnZ2V0T3InOiAnZ2V0JyxcbiAgJ2luY2x1ZGVzRnJvbSc6ICdpbmNsdWRlcycsXG4gICdpbmRleE9mRnJvbSc6ICdpbmRleE9mJyxcbiAgJ2ludm9rZUFyZ3MnOiAnaW52b2tlJyxcbiAgJ2ludm9rZUFyZ3NNYXAnOiAnaW52b2tlTWFwJyxcbiAgJ2xhc3RJbmRleE9mRnJvbSc6ICdsYXN0SW5kZXhPZicsXG4gICdtZXJnZUFsbCc6ICdtZXJnZScsXG4gICdtZXJnZUFsbFdpdGgnOiAnbWVyZ2VXaXRoJyxcbiAgJ3BhZENoYXJzJzogJ3BhZCcsXG4gICdwYWRDaGFyc0VuZCc6ICdwYWRFbmQnLFxuICAncGFkQ2hhcnNTdGFydCc6ICdwYWRTdGFydCcsXG4gICdwcm9wZXJ0eU9mJzogJ2dldCcsXG4gICdyYW5nZVN0ZXAnOiAncmFuZ2UnLFxuICAncmFuZ2VTdGVwUmlnaHQnOiAncmFuZ2VSaWdodCcsXG4gICdyZXN0RnJvbSc6ICdyZXN0JyxcbiAgJ3NwcmVhZEZyb20nOiAnc3ByZWFkJyxcbiAgJ3RyaW1DaGFycyc6ICd0cmltJyxcbiAgJ3RyaW1DaGFyc0VuZCc6ICd0cmltRW5kJyxcbiAgJ3RyaW1DaGFyc1N0YXJ0JzogJ3RyaW1TdGFydCcsXG4gICd6aXBBbGwnOiAnemlwJ1xufTtcblxuLyoqIFVzZWQgdG8gdHJhY2sgbWV0aG9kcyB0aGF0IHNraXAgZml4aW5nIHRoZWlyIGFyaXR5LiAqL1xuZXhwb3J0cy5za2lwRml4ZWQgPSB7XG4gICdjYXN0QXJyYXknOiB0cnVlLFxuICAnZmxvdyc6IHRydWUsXG4gICdmbG93UmlnaHQnOiB0cnVlLFxuICAnaXRlcmF0ZWUnOiB0cnVlLFxuICAnbWl4aW4nOiB0cnVlLFxuICAncmVhcmcnOiB0cnVlLFxuICAncnVuSW5Db250ZXh0JzogdHJ1ZVxufTtcblxuLyoqIFVzZWQgdG8gdHJhY2sgbWV0aG9kcyB0aGF0IHNraXAgcmVhcnJhbmdpbmcgYXJndW1lbnRzLiAqL1xuZXhwb3J0cy5za2lwUmVhcmcgPSB7XG4gICdhZGQnOiB0cnVlLFxuICAnYXNzaWduJzogdHJ1ZSxcbiAgJ2Fzc2lnbkluJzogdHJ1ZSxcbiAgJ2JpbmQnOiB0cnVlLFxuICAnYmluZEtleSc6IHRydWUsXG4gICdjb25jYXQnOiB0cnVlLFxuICAnZGlmZmVyZW5jZSc6IHRydWUsXG4gICdkaXZpZGUnOiB0cnVlLFxuICAnZXEnOiB0cnVlLFxuICAnZ3QnOiB0cnVlLFxuICAnZ3RlJzogdHJ1ZSxcbiAgJ2lzRXF1YWwnOiB0cnVlLFxuICAnbHQnOiB0cnVlLFxuICAnbHRlJzogdHJ1ZSxcbiAgJ21hdGNoZXNQcm9wZXJ0eSc6IHRydWUsXG4gICdtZXJnZSc6IHRydWUsXG4gICdtdWx0aXBseSc6IHRydWUsXG4gICdvdmVyQXJncyc6IHRydWUsXG4gICdwYXJ0aWFsJzogdHJ1ZSxcbiAgJ3BhcnRpYWxSaWdodCc6IHRydWUsXG4gICdwcm9wZXJ0eU9mJzogdHJ1ZSxcbiAgJ3JhbmRvbSc6IHRydWUsXG4gICdyYW5nZSc6IHRydWUsXG4gICdyYW5nZVJpZ2h0JzogdHJ1ZSxcbiAgJ3N1YnRyYWN0JzogdHJ1ZSxcbiAgJ3ppcCc6IHRydWUsXG4gICd6aXBPYmplY3QnOiB0cnVlLFxuICAnemlwT2JqZWN0RGVlcCc6IHRydWVcbn07XG4iLCIvKipcbiAqIFRoZSBkZWZhdWx0IGFyZ3VtZW50IHBsYWNlaG9sZGVyIHZhbHVlIGZvciBtZXRob2RzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBMb2Rhc2ggPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBDb3B5cmlnaHQgT3BlbkpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9vcGVuanNmLm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cbihmdW5jdGlvbigpe2Z1bmN0aW9uIG4obix0LHIpe3N3aXRjaChyLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuLmNhbGwodCk7Y2FzZSAxOnJldHVybiBuLmNhbGwodCxyWzBdKTtjYXNlIDI6cmV0dXJuIG4uY2FsbCh0LHJbMF0sclsxXSk7Y2FzZSAzOnJldHVybiBuLmNhbGwodCxyWzBdLHJbMV0sclsyXSl9cmV0dXJuIG4uYXBwbHkodCxyKX1mdW5jdGlvbiB0KG4sdCxyLGUpe2Zvcih2YXIgdT0tMSxpPW51bGw9PW4/MDpuLmxlbmd0aDsrK3U8aTspe3ZhciBvPW5bdV07dChlLG8scihvKSxuKX1yZXR1cm4gZX1mdW5jdGlvbiByKG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoOysrcjxlJiZ0KG5bcl0scixuKSE9PSExOyk7cmV0dXJuIG59ZnVuY3Rpb24gZShuLHQpe2Zvcih2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGg7ci0tJiZ0KG5bcl0scixuKSE9PSExOyk7cmV0dXJuIG59ZnVuY3Rpb24gdShuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aDsrK3I8ZTspaWYoIXQobltyXSxyLG4pKXJldHVybiExO1xucmV0dXJuITB9ZnVuY3Rpb24gaShuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aCx1PTAsaT1bXTsrK3I8ZTspe3ZhciBvPW5bcl07dChvLHIsbikmJihpW3UrK109byl9cmV0dXJuIGl9ZnVuY3Rpb24gbyhuLHQpe3JldHVybiEhKG51bGw9PW4/MDpuLmxlbmd0aCkmJnkobix0LDApPi0xfWZ1bmN0aW9uIGYobix0LHIpe2Zvcih2YXIgZT0tMSx1PW51bGw9PW4/MDpuLmxlbmd0aDsrK2U8dTspaWYocih0LG5bZV0pKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIGMobix0KXtmb3IodmFyIHI9LTEsZT1udWxsPT1uPzA6bi5sZW5ndGgsdT1BcnJheShlKTsrK3I8ZTspdVtyXT10KG5bcl0scixuKTtyZXR1cm4gdX1mdW5jdGlvbiBhKG4sdCl7Zm9yKHZhciByPS0xLGU9dC5sZW5ndGgsdT1uLmxlbmd0aDsrK3I8ZTspblt1K3JdPXRbcl07cmV0dXJuIG59ZnVuY3Rpb24gbChuLHQscixlKXt2YXIgdT0tMSxpPW51bGw9PW4/MDpuLmxlbmd0aDtmb3IoZSYmaSYmKHI9blsrK3VdKTsrK3U8aTspcj10KHIsblt1XSx1LG4pO1xucmV0dXJuIHJ9ZnVuY3Rpb24gcyhuLHQscixlKXt2YXIgdT1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKGUmJnUmJihyPW5bLS11XSk7dS0tOylyPXQocixuW3VdLHUsbik7cmV0dXJuIHJ9ZnVuY3Rpb24gaChuLHQpe2Zvcih2YXIgcj0tMSxlPW51bGw9PW4/MDpuLmxlbmd0aDsrK3I8ZTspaWYodChuW3JdLHIsbikpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gcChuKXtyZXR1cm4gbi5zcGxpdChcIlwiKX1mdW5jdGlvbiBfKG4pe3JldHVybiBuLm1hdGNoKEJ0KXx8W119ZnVuY3Rpb24gdihuLHQscil7dmFyIGU7cmV0dXJuIHIobixmdW5jdGlvbihuLHIsdSl7aWYodChuLHIsdSkpcmV0dXJuIGU9ciwhMX0pLGV9ZnVuY3Rpb24gZyhuLHQscixlKXtmb3IodmFyIHU9bi5sZW5ndGgsaT1yKyhlPzE6LTEpO2U/aS0tOisraTx1OylpZih0KG5baV0saSxuKSlyZXR1cm4gaTtyZXR1cm4tMX1mdW5jdGlvbiB5KG4sdCxyKXtyZXR1cm4gdD09PXQ/cShuLHQscik6ZyhuLGIscil9ZnVuY3Rpb24gZChuLHQscixlKXtcbmZvcih2YXIgdT1yLTEsaT1uLmxlbmd0aDsrK3U8aTspaWYoZShuW3VdLHQpKXJldHVybiB1O3JldHVybi0xfWZ1bmN0aW9uIGIobil7cmV0dXJuIG4hPT1ufWZ1bmN0aW9uIHcobix0KXt2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIHI/ayhuLHQpL3I6U259ZnVuY3Rpb24gbShuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXQ/WTp0W25dfX1mdW5jdGlvbiB4KG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09bj9ZOm5bdF19fWZ1bmN0aW9uIGoobix0LHIsZSx1KXtyZXR1cm4gdShuLGZ1bmN0aW9uKG4sdSxpKXtyPWU/KGU9ITEsbik6dChyLG4sdSxpKX0pLHJ9ZnVuY3Rpb24gQShuLHQpe3ZhciByPW4ubGVuZ3RoO2ZvcihuLnNvcnQodCk7ci0tOyluW3JdPW5bcl0udmFsdWU7cmV0dXJuIG59ZnVuY3Rpb24gayhuLHQpe2Zvcih2YXIgcixlPS0xLHU9bi5sZW5ndGg7KytlPHU7KXt2YXIgaT10KG5bZV0pO2khPT1ZJiYocj1yPT09WT9pOnIraSk7XG59cmV0dXJuIHJ9ZnVuY3Rpb24gTyhuLHQpe2Zvcih2YXIgcj0tMSxlPUFycmF5KG4pOysrcjxuOyllW3JdPXQocik7cmV0dXJuIGV9ZnVuY3Rpb24gSShuLHQpe3JldHVybiBjKHQsZnVuY3Rpb24odCl7cmV0dXJuW3Qsblt0XV19KX1mdW5jdGlvbiBSKG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbih0KX19ZnVuY3Rpb24geihuLHQpe3JldHVybiBjKHQsZnVuY3Rpb24odCl7cmV0dXJuIG5bdF19KX1mdW5jdGlvbiBFKG4sdCl7cmV0dXJuIG4uaGFzKHQpfWZ1bmN0aW9uIFMobix0KXtmb3IodmFyIHI9LTEsZT1uLmxlbmd0aDsrK3I8ZSYmeSh0LG5bcl0sMCk+LTE7KTtyZXR1cm4gcn1mdW5jdGlvbiBXKG4sdCl7Zm9yKHZhciByPW4ubGVuZ3RoO3ItLSYmeSh0LG5bcl0sMCk+LTE7KTtyZXR1cm4gcn1mdW5jdGlvbiBMKG4sdCl7Zm9yKHZhciByPW4ubGVuZ3RoLGU9MDtyLS07KW5bcl09PT10JiYrK2U7cmV0dXJuIGV9ZnVuY3Rpb24gQyhuKXtyZXR1cm5cIlxcXFxcIitHcltuXX1mdW5jdGlvbiBVKG4sdCl7XG5yZXR1cm4gbnVsbD09bj9ZOm5bdF19ZnVuY3Rpb24gQihuKXtyZXR1cm4gRHIudGVzdChuKX1mdW5jdGlvbiBUKG4pe3JldHVybiBNci50ZXN0KG4pfWZ1bmN0aW9uICQobil7Zm9yKHZhciB0LHI9W107ISh0PW4ubmV4dCgpKS5kb25lOylyLnB1c2godC52YWx1ZSk7cmV0dXJuIHJ9ZnVuY3Rpb24gRChuKXt2YXIgdD0tMSxyPUFycmF5KG4uc2l6ZSk7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihuLGUpe3JbKyt0XT1bZSxuXX0pLHJ9ZnVuY3Rpb24gTShuLHQpe3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gbih0KHIpKX19ZnVuY3Rpb24gRihuLHQpe2Zvcih2YXIgcj0tMSxlPW4ubGVuZ3RoLHU9MCxpPVtdOysrcjxlOyl7dmFyIG89bltyXTtvIT09dCYmbyE9PXVufHwobltyXT11bixpW3UrK109cil9cmV0dXJuIGl9ZnVuY3Rpb24gTihuKXt2YXIgdD0tMSxyPUFycmF5KG4uc2l6ZSk7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihuKXtyWysrdF09bn0pLHJ9ZnVuY3Rpb24gUChuKXtcbnZhciB0PS0xLHI9QXJyYXkobi5zaXplKTtyZXR1cm4gbi5mb3JFYWNoKGZ1bmN0aW9uKG4pe3JbKyt0XT1bbixuXX0pLHJ9ZnVuY3Rpb24gcShuLHQscil7Zm9yKHZhciBlPXItMSx1PW4ubGVuZ3RoOysrZTx1OylpZihuW2VdPT09dClyZXR1cm4gZTtyZXR1cm4tMX1mdW5jdGlvbiBaKG4sdCxyKXtmb3IodmFyIGU9cisxO2UtLTspaWYobltlXT09PXQpcmV0dXJuIGU7cmV0dXJuIGV9ZnVuY3Rpb24gSyhuKXtyZXR1cm4gQihuKT9HKG4pOnNlKG4pfWZ1bmN0aW9uIFYobil7cmV0dXJuIEIobik/SChuKTpwKG4pfWZ1bmN0aW9uIEcobil7Zm9yKHZhciB0PVRyLmxhc3RJbmRleD0wO1RyLnRlc3Qobik7KSsrdDtyZXR1cm4gdH1mdW5jdGlvbiBIKG4pe3JldHVybiBuLm1hdGNoKFRyKXx8W119ZnVuY3Rpb24gSihuKXtyZXR1cm4gbi5tYXRjaCgkcil8fFtdfXZhciBZLFE9XCI0LjE3LjIwXCIsWD0yMDAsbm49XCJVbnN1cHBvcnRlZCBjb3JlLWpzIHVzZS4gVHJ5IGh0dHBzOi8vbnBtcy5pby9zZWFyY2g/cT1wb255ZmlsbC5cIix0bj1cIkV4cGVjdGVkIGEgZnVuY3Rpb25cIixybj1cIl9fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX19cIixlbj01MDAsdW49XCJfX2xvZGFzaF9wbGFjZWhvbGRlcl9fXCIsb249MSxmbj0yLGNuPTQsYW49MSxsbj0yLHNuPTEsaG49Mixwbj00LF9uPTgsdm49MTYsZ249MzIseW49NjQsZG49MTI4LGJuPTI1Nix3bj01MTIsbW49MzAseG49XCIuLi5cIixqbj04MDAsQW49MTYsa249MSxPbj0yLEluPTMsUm49MS8wLHpuPTkwMDcxOTkyNTQ3NDA5OTEsRW49MS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCxTbj1OYU4sV249NDI5NDk2NzI5NSxMbj1Xbi0xLENuPVduPj4+MSxVbj1bW1wiYXJ5XCIsZG5dLFtcImJpbmRcIixzbl0sW1wiYmluZEtleVwiLGhuXSxbXCJjdXJyeVwiLF9uXSxbXCJjdXJyeVJpZ2h0XCIsdm5dLFtcImZsaXBcIix3bl0sW1wicGFydGlhbFwiLGduXSxbXCJwYXJ0aWFsUmlnaHRcIix5bl0sW1wicmVhcmdcIixibl1dLEJuPVwiW29iamVjdCBBcmd1bWVudHNdXCIsVG49XCJbb2JqZWN0IEFycmF5XVwiLCRuPVwiW29iamVjdCBBc3luY0Z1bmN0aW9uXVwiLERuPVwiW29iamVjdCBCb29sZWFuXVwiLE1uPVwiW29iamVjdCBEYXRlXVwiLEZuPVwiW29iamVjdCBET01FeGNlcHRpb25dXCIsTm49XCJbb2JqZWN0IEVycm9yXVwiLFBuPVwiW29iamVjdCBGdW5jdGlvbl1cIixxbj1cIltvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dXCIsWm49XCJbb2JqZWN0IE1hcF1cIixLbj1cIltvYmplY3QgTnVtYmVyXVwiLFZuPVwiW29iamVjdCBOdWxsXVwiLEduPVwiW29iamVjdCBPYmplY3RdXCIsSG49XCJbb2JqZWN0IFByb21pc2VdXCIsSm49XCJbb2JqZWN0IFByb3h5XVwiLFluPVwiW29iamVjdCBSZWdFeHBdXCIsUW49XCJbb2JqZWN0IFNldF1cIixYbj1cIltvYmplY3QgU3RyaW5nXVwiLG50PVwiW29iamVjdCBTeW1ib2xdXCIsdHQ9XCJbb2JqZWN0IFVuZGVmaW5lZF1cIixydD1cIltvYmplY3QgV2Vha01hcF1cIixldD1cIltvYmplY3QgV2Vha1NldF1cIix1dD1cIltvYmplY3QgQXJyYXlCdWZmZXJdXCIsaXQ9XCJbb2JqZWN0IERhdGFWaWV3XVwiLG90PVwiW29iamVjdCBGbG9hdDMyQXJyYXldXCIsZnQ9XCJbb2JqZWN0IEZsb2F0NjRBcnJheV1cIixjdD1cIltvYmplY3QgSW50OEFycmF5XVwiLGF0PVwiW29iamVjdCBJbnQxNkFycmF5XVwiLGx0PVwiW29iamVjdCBJbnQzMkFycmF5XVwiLHN0PVwiW29iamVjdCBVaW50OEFycmF5XVwiLGh0PVwiW29iamVjdCBVaW50OENsYW1wZWRBcnJheV1cIixwdD1cIltvYmplY3QgVWludDE2QXJyYXldXCIsX3Q9XCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiLHZ0PS9cXGJfX3AgXFwrPSAnJzsvZyxndD0vXFxiKF9fcCBcXCs9KSAnJyBcXCsvZyx5dD0vKF9fZVxcKC4qP1xcKXxcXGJfX3RcXCkpIFxcK1xcbicnOy9nLGR0PS8mKD86YW1wfGx0fGd0fHF1b3R8IzM5KTsvZyxidD0vWyY8PlwiJ10vZyx3dD1SZWdFeHAoZHQuc291cmNlKSxtdD1SZWdFeHAoYnQuc291cmNlKSx4dD0vPCUtKFtcXHNcXFNdKz8pJT4vZyxqdD0vPCUoW1xcc1xcU10rPyklPi9nLEF0PS88JT0oW1xcc1xcU10rPyklPi9nLGt0PS9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sT3Q9L15cXHcqJC8sSXQ9L1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nLFJ0PS9bXFxcXF4kLiorPygpW1xcXXt9fF0vZyx6dD1SZWdFeHAoUnQuc291cmNlKSxFdD0vXlxccyt8XFxzKyQvZyxTdD0vXlxccysvLFd0PS9cXHMrJC8sTHQ9L1xceyg/OlxcblxcL1xcKiBcXFt3cmFwcGVkIHdpdGggLitcXF0gXFwqXFwvKT9cXG4/LyxDdD0vXFx7XFxuXFwvXFwqIFxcW3dyYXBwZWQgd2l0aCAoLispXFxdIFxcKi8sVXQ9Lyw/ICYgLyxCdD0vW15cXHgwMC1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHg3Zl0rL2csVHQ9L1xcXFwoXFxcXCk/L2csJHQ9L1xcJFxceyhbXlxcXFx9XSooPzpcXFxcLlteXFxcXH1dKikqKVxcfS9nLER0PS9cXHcqJC8sTXQ9L15bLStdMHhbMC05YS1mXSskL2ksRnQ9L14wYlswMV0rJC9pLE50PS9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC8sUHQ9L14wb1swLTddKyQvaSxxdD0vXig/OjB8WzEtOV1cXGQqKSQvLFp0PS9bXFx4YzAtXFx4ZDZcXHhkOC1cXHhmNlxceGY4LVxceGZmXFx1MDEwMC1cXHUwMTdmXS9nLEt0PS8oJF4pLyxWdD0vWydcXG5cXHJcXHUyMDI4XFx1MjAyOVxcXFxdL2csR3Q9XCJcXFxcdWQ4MDAtXFxcXHVkZmZmXCIsSHQ9XCJcXFxcdTAzMDAtXFxcXHUwMzZmXCIsSnQ9XCJcXFxcdWZlMjAtXFxcXHVmZTJmXCIsWXQ9XCJcXFxcdTIwZDAtXFxcXHUyMGZmXCIsUXQ9SHQrSnQrWXQsWHQ9XCJcXFxcdTI3MDAtXFxcXHUyN2JmXCIsbnI9XCJhLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmZcIix0cj1cIlxcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjdcIixycj1cIlxcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZlwiLGVyPVwiXFxcXHUyMDAwLVxcXFx1MjA2ZlwiLHVyPVwiIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDBcIixpcj1cIkEtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZVwiLG9yPVwiXFxcXHVmZTBlXFxcXHVmZTBmXCIsZnI9dHIrcnIrZXIrdXIsY3I9XCJbJ1xcdTIwMTldXCIsYXI9XCJbXCIrR3QrXCJdXCIsbHI9XCJbXCIrZnIrXCJdXCIsc3I9XCJbXCIrUXQrXCJdXCIsaHI9XCJcXFxcZCtcIixwcj1cIltcIitYdCtcIl1cIixfcj1cIltcIitucitcIl1cIix2cj1cIlteXCIrR3QrZnIraHIrWHQrbnIraXIrXCJdXCIsZ3I9XCJcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl1cIix5cj1cIig/OlwiK3NyK1wifFwiK2dyK1wiKVwiLGRyPVwiW15cIitHdCtcIl1cIixicj1cIig/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn1cIix3cj1cIltcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXVwiLG1yPVwiW1wiK2lyK1wiXVwiLHhyPVwiXFxcXHUyMDBkXCIsanI9XCIoPzpcIitfcitcInxcIit2citcIilcIixBcj1cIig/OlwiK21yK1wifFwiK3ZyK1wiKVwiLGtyPVwiKD86XCIrY3IrXCIoPzpkfGxsfG18cmV8c3x0fHZlKSk/XCIsT3I9XCIoPzpcIitjcitcIig/OkR8TEx8TXxSRXxTfFR8VkUpKT9cIixJcj15citcIj9cIixScj1cIltcIitvcitcIl0/XCIsenI9XCIoPzpcIit4citcIig/OlwiK1tkcixicix3cl0uam9pbihcInxcIikrXCIpXCIrUnIrSXIrXCIpKlwiLEVyPVwiXFxcXGQqKD86MXN0fDJuZHwzcmR8KD8hWzEyM10pXFxcXGR0aCkoPz1cXFxcYnxbQS1aX10pXCIsU3I9XCJcXFxcZCooPzoxU1R8Mk5EfDNSRHwoPyFbMTIzXSlcXFxcZFRIKSg/PVxcXFxifFthLXpfXSlcIixXcj1ScitJcit6cixMcj1cIig/OlwiK1twcixicix3cl0uam9pbihcInxcIikrXCIpXCIrV3IsQ3I9XCIoPzpcIitbZHIrc3IrXCI/XCIsc3IsYnIsd3IsYXJdLmpvaW4oXCJ8XCIpK1wiKVwiLFVyPVJlZ0V4cChjcixcImdcIiksQnI9UmVnRXhwKHNyLFwiZ1wiKSxUcj1SZWdFeHAoZ3IrXCIoPz1cIitncitcIil8XCIrQ3IrV3IsXCJnXCIpLCRyPVJlZ0V4cChbbXIrXCI/XCIrX3IrXCIrXCIra3IrXCIoPz1cIitbbHIsbXIsXCIkXCJdLmpvaW4oXCJ8XCIpK1wiKVwiLEFyK1wiK1wiK09yK1wiKD89XCIrW2xyLG1yK2pyLFwiJFwiXS5qb2luKFwifFwiKStcIilcIixtcitcIj9cIitqcitcIitcIitrcixtcitcIitcIitPcixTcixFcixocixMcl0uam9pbihcInxcIiksXCJnXCIpLERyPVJlZ0V4cChcIltcIit4citHdCtRdCtvcitcIl1cIiksTXI9L1thLXpdW0EtWl18W0EtWl17Mn1bYS16XXxbMC05XVthLXpBLVpdfFthLXpBLVpdWzAtOV18W15hLXpBLVowLTkgXS8sRnI9W1wiQXJyYXlcIixcIkJ1ZmZlclwiLFwiRGF0YVZpZXdcIixcIkRhdGVcIixcIkVycm9yXCIsXCJGbG9hdDMyQXJyYXlcIixcIkZsb2F0NjRBcnJheVwiLFwiRnVuY3Rpb25cIixcIkludDhBcnJheVwiLFwiSW50MTZBcnJheVwiLFwiSW50MzJBcnJheVwiLFwiTWFwXCIsXCJNYXRoXCIsXCJPYmplY3RcIixcIlByb21pc2VcIixcIlJlZ0V4cFwiLFwiU2V0XCIsXCJTdHJpbmdcIixcIlN5bWJvbFwiLFwiVHlwZUVycm9yXCIsXCJVaW50OEFycmF5XCIsXCJVaW50OENsYW1wZWRBcnJheVwiLFwiVWludDE2QXJyYXlcIixcIlVpbnQzMkFycmF5XCIsXCJXZWFrTWFwXCIsXCJfXCIsXCJjbGVhclRpbWVvdXRcIixcImlzRmluaXRlXCIsXCJwYXJzZUludFwiLFwic2V0VGltZW91dFwiXSxOcj0tMSxQcj17fTtcblByW290XT1QcltmdF09UHJbY3RdPVByW2F0XT1QcltsdF09UHJbc3RdPVByW2h0XT1QcltwdF09UHJbX3RdPSEwLFByW0JuXT1QcltUbl09UHJbdXRdPVByW0RuXT1QcltpdF09UHJbTW5dPVByW05uXT1QcltQbl09UHJbWm5dPVByW0tuXT1QcltHbl09UHJbWW5dPVByW1FuXT1QcltYbl09UHJbcnRdPSExO3ZhciBxcj17fTtxcltCbl09cXJbVG5dPXFyW3V0XT1xcltpdF09cXJbRG5dPXFyW01uXT1xcltvdF09cXJbZnRdPXFyW2N0XT1xclthdF09cXJbbHRdPXFyW1puXT1xcltLbl09cXJbR25dPXFyW1luXT1xcltRbl09cXJbWG5dPXFyW250XT1xcltzdF09cXJbaHRdPXFyW3B0XT1xcltfdF09ITAscXJbTm5dPXFyW1BuXT1xcltydF09ITE7dmFyIFpyPXtcIlxceGMwXCI6XCJBXCIsXCJcXHhjMVwiOlwiQVwiLFwiXFx4YzJcIjpcIkFcIixcIlxceGMzXCI6XCJBXCIsXCJcXHhjNFwiOlwiQVwiLFwiXFx4YzVcIjpcIkFcIixcIlxceGUwXCI6XCJhXCIsXCJcXHhlMVwiOlwiYVwiLFwiXFx4ZTJcIjpcImFcIixcIlxceGUzXCI6XCJhXCIsXCJcXHhlNFwiOlwiYVwiLFwiXFx4ZTVcIjpcImFcIixcblwiXFx4YzdcIjpcIkNcIixcIlxceGU3XCI6XCJjXCIsXCJcXHhkMFwiOlwiRFwiLFwiXFx4ZjBcIjpcImRcIixcIlxceGM4XCI6XCJFXCIsXCJcXHhjOVwiOlwiRVwiLFwiXFx4Y2FcIjpcIkVcIixcIlxceGNiXCI6XCJFXCIsXCJcXHhlOFwiOlwiZVwiLFwiXFx4ZTlcIjpcImVcIixcIlxceGVhXCI6XCJlXCIsXCJcXHhlYlwiOlwiZVwiLFwiXFx4Y2NcIjpcIklcIixcIlxceGNkXCI6XCJJXCIsXCJcXHhjZVwiOlwiSVwiLFwiXFx4Y2ZcIjpcIklcIixcIlxceGVjXCI6XCJpXCIsXCJcXHhlZFwiOlwiaVwiLFwiXFx4ZWVcIjpcImlcIixcIlxceGVmXCI6XCJpXCIsXCJcXHhkMVwiOlwiTlwiLFwiXFx4ZjFcIjpcIm5cIixcIlxceGQyXCI6XCJPXCIsXCJcXHhkM1wiOlwiT1wiLFwiXFx4ZDRcIjpcIk9cIixcIlxceGQ1XCI6XCJPXCIsXCJcXHhkNlwiOlwiT1wiLFwiXFx4ZDhcIjpcIk9cIixcIlxceGYyXCI6XCJvXCIsXCJcXHhmM1wiOlwib1wiLFwiXFx4ZjRcIjpcIm9cIixcIlxceGY1XCI6XCJvXCIsXCJcXHhmNlwiOlwib1wiLFwiXFx4ZjhcIjpcIm9cIixcIlxceGQ5XCI6XCJVXCIsXCJcXHhkYVwiOlwiVVwiLFwiXFx4ZGJcIjpcIlVcIixcIlxceGRjXCI6XCJVXCIsXCJcXHhmOVwiOlwidVwiLFwiXFx4ZmFcIjpcInVcIixcIlxceGZiXCI6XCJ1XCIsXCJcXHhmY1wiOlwidVwiLFwiXFx4ZGRcIjpcIllcIixcIlxceGZkXCI6XCJ5XCIsXCJcXHhmZlwiOlwieVwiLFwiXFx4YzZcIjpcIkFlXCIsXG5cIlxceGU2XCI6XCJhZVwiLFwiXFx4ZGVcIjpcIlRoXCIsXCJcXHhmZVwiOlwidGhcIixcIlxceGRmXCI6XCJzc1wiLFwiXFx1MDEwMFwiOlwiQVwiLFwiXFx1MDEwMlwiOlwiQVwiLFwiXFx1MDEwNFwiOlwiQVwiLFwiXFx1MDEwMVwiOlwiYVwiLFwiXFx1MDEwM1wiOlwiYVwiLFwiXFx1MDEwNVwiOlwiYVwiLFwiXFx1MDEwNlwiOlwiQ1wiLFwiXFx1MDEwOFwiOlwiQ1wiLFwiXFx1MDEwYVwiOlwiQ1wiLFwiXFx1MDEwY1wiOlwiQ1wiLFwiXFx1MDEwN1wiOlwiY1wiLFwiXFx1MDEwOVwiOlwiY1wiLFwiXFx1MDEwYlwiOlwiY1wiLFwiXFx1MDEwZFwiOlwiY1wiLFwiXFx1MDEwZVwiOlwiRFwiLFwiXFx1MDExMFwiOlwiRFwiLFwiXFx1MDEwZlwiOlwiZFwiLFwiXFx1MDExMVwiOlwiZFwiLFwiXFx1MDExMlwiOlwiRVwiLFwiXFx1MDExNFwiOlwiRVwiLFwiXFx1MDExNlwiOlwiRVwiLFwiXFx1MDExOFwiOlwiRVwiLFwiXFx1MDExYVwiOlwiRVwiLFwiXFx1MDExM1wiOlwiZVwiLFwiXFx1MDExNVwiOlwiZVwiLFwiXFx1MDExN1wiOlwiZVwiLFwiXFx1MDExOVwiOlwiZVwiLFwiXFx1MDExYlwiOlwiZVwiLFwiXFx1MDExY1wiOlwiR1wiLFwiXFx1MDExZVwiOlwiR1wiLFwiXFx1MDEyMFwiOlwiR1wiLFwiXFx1MDEyMlwiOlwiR1wiLFwiXFx1MDExZFwiOlwiZ1wiLFwiXFx1MDExZlwiOlwiZ1wiLFwiXFx1MDEyMVwiOlwiZ1wiLFxuXCJcXHUwMTIzXCI6XCJnXCIsXCJcXHUwMTI0XCI6XCJIXCIsXCJcXHUwMTI2XCI6XCJIXCIsXCJcXHUwMTI1XCI6XCJoXCIsXCJcXHUwMTI3XCI6XCJoXCIsXCJcXHUwMTI4XCI6XCJJXCIsXCJcXHUwMTJhXCI6XCJJXCIsXCJcXHUwMTJjXCI6XCJJXCIsXCJcXHUwMTJlXCI6XCJJXCIsXCJcXHUwMTMwXCI6XCJJXCIsXCJcXHUwMTI5XCI6XCJpXCIsXCJcXHUwMTJiXCI6XCJpXCIsXCJcXHUwMTJkXCI6XCJpXCIsXCJcXHUwMTJmXCI6XCJpXCIsXCJcXHUwMTMxXCI6XCJpXCIsXCJcXHUwMTM0XCI6XCJKXCIsXCJcXHUwMTM1XCI6XCJqXCIsXCJcXHUwMTM2XCI6XCJLXCIsXCJcXHUwMTM3XCI6XCJrXCIsXCJcXHUwMTM4XCI6XCJrXCIsXCJcXHUwMTM5XCI6XCJMXCIsXCJcXHUwMTNiXCI6XCJMXCIsXCJcXHUwMTNkXCI6XCJMXCIsXCJcXHUwMTNmXCI6XCJMXCIsXCJcXHUwMTQxXCI6XCJMXCIsXCJcXHUwMTNhXCI6XCJsXCIsXCJcXHUwMTNjXCI6XCJsXCIsXCJcXHUwMTNlXCI6XCJsXCIsXCJcXHUwMTQwXCI6XCJsXCIsXCJcXHUwMTQyXCI6XCJsXCIsXCJcXHUwMTQzXCI6XCJOXCIsXCJcXHUwMTQ1XCI6XCJOXCIsXCJcXHUwMTQ3XCI6XCJOXCIsXCJcXHUwMTRhXCI6XCJOXCIsXCJcXHUwMTQ0XCI6XCJuXCIsXCJcXHUwMTQ2XCI6XCJuXCIsXCJcXHUwMTQ4XCI6XCJuXCIsXCJcXHUwMTRiXCI6XCJuXCIsXCJcXHUwMTRjXCI6XCJPXCIsXG5cIlxcdTAxNGVcIjpcIk9cIixcIlxcdTAxNTBcIjpcIk9cIixcIlxcdTAxNGRcIjpcIm9cIixcIlxcdTAxNGZcIjpcIm9cIixcIlxcdTAxNTFcIjpcIm9cIixcIlxcdTAxNTRcIjpcIlJcIixcIlxcdTAxNTZcIjpcIlJcIixcIlxcdTAxNThcIjpcIlJcIixcIlxcdTAxNTVcIjpcInJcIixcIlxcdTAxNTdcIjpcInJcIixcIlxcdTAxNTlcIjpcInJcIixcIlxcdTAxNWFcIjpcIlNcIixcIlxcdTAxNWNcIjpcIlNcIixcIlxcdTAxNWVcIjpcIlNcIixcIlxcdTAxNjBcIjpcIlNcIixcIlxcdTAxNWJcIjpcInNcIixcIlxcdTAxNWRcIjpcInNcIixcIlxcdTAxNWZcIjpcInNcIixcIlxcdTAxNjFcIjpcInNcIixcIlxcdTAxNjJcIjpcIlRcIixcIlxcdTAxNjRcIjpcIlRcIixcIlxcdTAxNjZcIjpcIlRcIixcIlxcdTAxNjNcIjpcInRcIixcIlxcdTAxNjVcIjpcInRcIixcIlxcdTAxNjdcIjpcInRcIixcIlxcdTAxNjhcIjpcIlVcIixcIlxcdTAxNmFcIjpcIlVcIixcIlxcdTAxNmNcIjpcIlVcIixcIlxcdTAxNmVcIjpcIlVcIixcIlxcdTAxNzBcIjpcIlVcIixcIlxcdTAxNzJcIjpcIlVcIixcIlxcdTAxNjlcIjpcInVcIixcIlxcdTAxNmJcIjpcInVcIixcIlxcdTAxNmRcIjpcInVcIixcIlxcdTAxNmZcIjpcInVcIixcIlxcdTAxNzFcIjpcInVcIixcIlxcdTAxNzNcIjpcInVcIixcIlxcdTAxNzRcIjpcIldcIixcIlxcdTAxNzVcIjpcIndcIixcblwiXFx1MDE3NlwiOlwiWVwiLFwiXFx1MDE3N1wiOlwieVwiLFwiXFx1MDE3OFwiOlwiWVwiLFwiXFx1MDE3OVwiOlwiWlwiLFwiXFx1MDE3YlwiOlwiWlwiLFwiXFx1MDE3ZFwiOlwiWlwiLFwiXFx1MDE3YVwiOlwielwiLFwiXFx1MDE3Y1wiOlwielwiLFwiXFx1MDE3ZVwiOlwielwiLFwiXFx1MDEzMlwiOlwiSUpcIixcIlxcdTAxMzNcIjpcImlqXCIsXCJcXHUwMTUyXCI6XCJPZVwiLFwiXFx1MDE1M1wiOlwib2VcIixcIlxcdTAxNDlcIjpcIiduXCIsXCJcXHUwMTdmXCI6XCJzXCJ9LEtyPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiMzOTtcIn0sVnI9e1wiJmFtcDtcIjpcIiZcIixcIiZsdDtcIjpcIjxcIixcIiZndDtcIjpcIj5cIixcIiZxdW90O1wiOidcIicsXCImIzM5O1wiOlwiJ1wifSxHcj17XCJcXFxcXCI6XCJcXFxcXCIsXCInXCI6XCInXCIsXCJcXG5cIjpcIm5cIixcIlxcclwiOlwiclwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LEhyPXBhcnNlRmxvYXQsSnI9cGFyc2VJbnQsWXI9XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsJiZnbG9iYWwuT2JqZWN0PT09T2JqZWN0JiZnbG9iYWwsUXI9XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYmJnNlbGYuT2JqZWN0PT09T2JqZWN0JiZzZWxmLFhyPVlyfHxRcnx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLG5lPVwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZleHBvcnRzJiYhZXhwb3J0cy5ub2RlVHlwZSYmZXhwb3J0cyx0ZT1uZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUscmU9dGUmJnRlLmV4cG9ydHM9PT1uZSxlZT1yZSYmWXIucHJvY2Vzcyx1ZT1mdW5jdGlvbigpe1xudHJ5e3ZhciBuPXRlJiZ0ZS5yZXF1aXJlJiZ0ZS5yZXF1aXJlKFwidXRpbFwiKS50eXBlcztyZXR1cm4gbj9uOmVlJiZlZS5iaW5kaW5nJiZlZS5iaW5kaW5nKFwidXRpbFwiKX1jYXRjaChuKXt9fSgpLGllPXVlJiZ1ZS5pc0FycmF5QnVmZmVyLG9lPXVlJiZ1ZS5pc0RhdGUsZmU9dWUmJnVlLmlzTWFwLGNlPXVlJiZ1ZS5pc1JlZ0V4cCxhZT11ZSYmdWUuaXNTZXQsbGU9dWUmJnVlLmlzVHlwZWRBcnJheSxzZT1tKFwibGVuZ3RoXCIpLGhlPXgoWnIpLHBlPXgoS3IpLF9lPXgoVnIpLHZlPWZ1bmN0aW9uIHAoeCl7ZnVuY3Rpb24gcShuKXtpZihvYyhuKSYmIXloKG4pJiYhKG4gaW5zdGFuY2VvZiBCdCkpe2lmKG4gaW5zdGFuY2VvZiBIKXJldHVybiBuO2lmKHlsLmNhbGwobixcIl9fd3JhcHBlZF9fXCIpKXJldHVybiB0byhuKX1yZXR1cm4gbmV3IEgobil9ZnVuY3Rpb24gRygpe31mdW5jdGlvbiBIKG4sdCl7dGhpcy5fX3dyYXBwZWRfXz1uLHRoaXMuX19hY3Rpb25zX189W10sdGhpcy5fX2NoYWluX189ISF0LFxudGhpcy5fX2luZGV4X189MCx0aGlzLl9fdmFsdWVzX189WX1mdW5jdGlvbiBCdChuKXt0aGlzLl9fd3JhcHBlZF9fPW4sdGhpcy5fX2FjdGlvbnNfXz1bXSx0aGlzLl9fZGlyX189MSx0aGlzLl9fZmlsdGVyZWRfXz0hMSx0aGlzLl9faXRlcmF0ZWVzX189W10sdGhpcy5fX3Rha2VDb3VudF9fPVduLHRoaXMuX192aWV3c19fPVtdfWZ1bmN0aW9uIEd0KCl7dmFyIG49bmV3IEJ0KHRoaXMuX193cmFwcGVkX18pO3JldHVybiBuLl9fYWN0aW9uc19fPVV1KHRoaXMuX19hY3Rpb25zX18pLG4uX19kaXJfXz10aGlzLl9fZGlyX18sbi5fX2ZpbHRlcmVkX189dGhpcy5fX2ZpbHRlcmVkX18sbi5fX2l0ZXJhdGVlc19fPVV1KHRoaXMuX19pdGVyYXRlZXNfXyksbi5fX3Rha2VDb3VudF9fPXRoaXMuX190YWtlQ291bnRfXyxuLl9fdmlld3NfXz1VdSh0aGlzLl9fdmlld3NfXyksbn1mdW5jdGlvbiBIdCgpe2lmKHRoaXMuX19maWx0ZXJlZF9fKXt2YXIgbj1uZXcgQnQodGhpcyk7bi5fX2Rpcl9fPS0xLFxubi5fX2ZpbHRlcmVkX189ITB9ZWxzZSBuPXRoaXMuY2xvbmUoKSxuLl9fZGlyX18qPS0xO3JldHVybiBufWZ1bmN0aW9uIEp0KCl7dmFyIG49dGhpcy5fX3dyYXBwZWRfXy52YWx1ZSgpLHQ9dGhpcy5fX2Rpcl9fLHI9eWgobiksZT10PDAsdT1yP24ubGVuZ3RoOjAsaT1BaSgwLHUsdGhpcy5fX3ZpZXdzX18pLG89aS5zdGFydCxmPWkuZW5kLGM9Zi1vLGE9ZT9mOm8tMSxsPXRoaXMuX19pdGVyYXRlZXNfXyxzPWwubGVuZ3RoLGg9MCxwPVZsKGMsdGhpcy5fX3Rha2VDb3VudF9fKTtpZighcnx8IWUmJnU9PWMmJnA9PWMpcmV0dXJuIGR1KG4sdGhpcy5fX2FjdGlvbnNfXyk7dmFyIF89W107bjpmb3IoO2MtLSYmaDxwOyl7YSs9dDtmb3IodmFyIHY9LTEsZz1uW2FdOysrdjxzOyl7dmFyIHk9bFt2XSxkPXkuaXRlcmF0ZWUsYj15LnR5cGUsdz1kKGcpO2lmKGI9PU9uKWc9dztlbHNlIGlmKCF3KXtpZihiPT1rbiljb250aW51ZSBuO2JyZWFrIG59fV9baCsrXT1nfXJldHVybiBffWZ1bmN0aW9uIFl0KG4pe1xudmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gUXQoKXt0aGlzLl9fZGF0YV9fPWVzP2VzKG51bGwpOnt9LHRoaXMuc2l6ZT0wfWZ1bmN0aW9uIFh0KG4pe3ZhciB0PXRoaXMuaGFzKG4pJiZkZWxldGUgdGhpcy5fX2RhdGFfX1tuXTtyZXR1cm4gdGhpcy5zaXplLT10PzE6MCx0fWZ1bmN0aW9uIG5yKG4pe3ZhciB0PXRoaXMuX19kYXRhX187aWYoZXMpe3ZhciByPXRbbl07cmV0dXJuIHI9PT1ybj9ZOnJ9cmV0dXJuIHlsLmNhbGwodCxuKT90W25dOll9ZnVuY3Rpb24gdHIobil7dmFyIHQ9dGhpcy5fX2RhdGFfXztyZXR1cm4gZXM/dFtuXSE9PVk6eWwuY2FsbCh0LG4pfWZ1bmN0aW9uIHJyKG4sdCl7dmFyIHI9dGhpcy5fX2RhdGFfXztyZXR1cm4gdGhpcy5zaXplKz10aGlzLmhhcyhuKT8wOjEscltuXT1lcyYmdD09PVk/cm46dCx0aGlzfWZ1bmN0aW9uIGVyKG4pe1xudmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuY2xlYXIoKTsrK3Q8cjspe3ZhciBlPW5bdF07dGhpcy5zZXQoZVswXSxlWzFdKX19ZnVuY3Rpb24gdXIoKXt0aGlzLl9fZGF0YV9fPVtdLHRoaXMuc2l6ZT0wfWZ1bmN0aW9uIGlyKG4pe3ZhciB0PXRoaXMuX19kYXRhX18scj1Fcih0LG4pO3JldHVybiEocjwwKSYmKHI9PXQubGVuZ3RoLTE/dC5wb3AoKTpTbC5jYWxsKHQsciwxKSwtLXRoaXMuc2l6ZSwhMCl9ZnVuY3Rpb24gb3Iobil7dmFyIHQ9dGhpcy5fX2RhdGFfXyxyPUVyKHQsbik7cmV0dXJuIHI8MD9ZOnRbcl1bMV19ZnVuY3Rpb24gZnIobil7cmV0dXJuIEVyKHRoaXMuX19kYXRhX18sbik+LTF9ZnVuY3Rpb24gY3Iobix0KXt2YXIgcj10aGlzLl9fZGF0YV9fLGU9RXIocixuKTtyZXR1cm4gZTwwPygrK3RoaXMuc2l6ZSxyLnB1c2goW24sdF0pKTpyW2VdWzFdPXQsdGhpc31mdW5jdGlvbiBhcihuKXt2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aDtmb3IodGhpcy5jbGVhcigpOysrdDxyOyl7XG52YXIgZT1uW3RdO3RoaXMuc2V0KGVbMF0sZVsxXSl9fWZ1bmN0aW9uIGxyKCl7dGhpcy5zaXplPTAsdGhpcy5fX2RhdGFfXz17aGFzaDpuZXcgWXQsbWFwOm5ldyhYbHx8ZXIpLHN0cmluZzpuZXcgWXR9fWZ1bmN0aW9uIHNyKG4pe3ZhciB0PXdpKHRoaXMsbikuZGVsZXRlKG4pO3JldHVybiB0aGlzLnNpemUtPXQ/MTowLHR9ZnVuY3Rpb24gaHIobil7cmV0dXJuIHdpKHRoaXMsbikuZ2V0KG4pfWZ1bmN0aW9uIHByKG4pe3JldHVybiB3aSh0aGlzLG4pLmhhcyhuKX1mdW5jdGlvbiBfcihuLHQpe3ZhciByPXdpKHRoaXMsbiksZT1yLnNpemU7cmV0dXJuIHIuc2V0KG4sdCksdGhpcy5zaXplKz1yLnNpemU9PWU/MDoxLHRoaXN9ZnVuY3Rpb24gdnIobil7dmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGg7Zm9yKHRoaXMuX19kYXRhX189bmV3IGFyOysrdDxyOyl0aGlzLmFkZChuW3RdKX1mdW5jdGlvbiBncihuKXtyZXR1cm4gdGhpcy5fX2RhdGFfXy5zZXQobixybiksdGhpc31mdW5jdGlvbiB5cihuKXtcbnJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhuKX1mdW5jdGlvbiBkcihuKXt0aGlzLnNpemU9KHRoaXMuX19kYXRhX189bmV3IGVyKG4pKS5zaXplfWZ1bmN0aW9uIGJyKCl7dGhpcy5fX2RhdGFfXz1uZXcgZXIsdGhpcy5zaXplPTB9ZnVuY3Rpb24gd3Iobil7dmFyIHQ9dGhpcy5fX2RhdGFfXyxyPXQuZGVsZXRlKG4pO3JldHVybiB0aGlzLnNpemU9dC5zaXplLHJ9ZnVuY3Rpb24gbXIobil7cmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KG4pfWZ1bmN0aW9uIHhyKG4pe3JldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhuKX1mdW5jdGlvbiBqcihuLHQpe3ZhciByPXRoaXMuX19kYXRhX187aWYociBpbnN0YW5jZW9mIGVyKXt2YXIgZT1yLl9fZGF0YV9fO2lmKCFYbHx8ZS5sZW5ndGg8WC0xKXJldHVybiBlLnB1c2goW24sdF0pLHRoaXMuc2l6ZT0rK3Iuc2l6ZSx0aGlzO3I9dGhpcy5fX2RhdGFfXz1uZXcgYXIoZSl9cmV0dXJuIHIuc2V0KG4sdCksdGhpcy5zaXplPXIuc2l6ZSx0aGlzfWZ1bmN0aW9uIEFyKG4sdCl7XG52YXIgcj15aChuKSxlPSFyJiZnaChuKSx1PSFyJiYhZSYmYmgobiksaT0hciYmIWUmJiF1JiZBaChuKSxvPXJ8fGV8fHV8fGksZj1vP08obi5sZW5ndGgsbGwpOltdLGM9Zi5sZW5ndGg7Zm9yKHZhciBhIGluIG4pIXQmJiF5bC5jYWxsKG4sYSl8fG8mJihcImxlbmd0aFwiPT1hfHx1JiYoXCJvZmZzZXRcIj09YXx8XCJwYXJlbnRcIj09YSl8fGkmJihcImJ1ZmZlclwiPT1hfHxcImJ5dGVMZW5ndGhcIj09YXx8XCJieXRlT2Zmc2V0XCI9PWEpfHxXaShhLGMpKXx8Zi5wdXNoKGEpO3JldHVybiBmfWZ1bmN0aW9uIGtyKG4pe3ZhciB0PW4ubGVuZ3RoO3JldHVybiB0P25bWGUoMCx0LTEpXTpZfWZ1bmN0aW9uIE9yKG4sdCl7cmV0dXJuIFlpKFV1KG4pLCRyKHQsMCxuLmxlbmd0aCkpfWZ1bmN0aW9uIElyKG4pe3JldHVybiBZaShVdShuKSl9ZnVuY3Rpb24gUnIobix0LHIpeyhyPT09WXx8S2Yoblt0XSxyKSkmJihyIT09WXx8dCBpbiBuKXx8Q3Iobix0LHIpfWZ1bmN0aW9uIHpyKG4sdCxyKXt2YXIgZT1uW3RdO1xueWwuY2FsbChuLHQpJiZLZihlLHIpJiYociE9PVl8fHQgaW4gbil8fENyKG4sdCxyKX1mdW5jdGlvbiBFcihuLHQpe2Zvcih2YXIgcj1uLmxlbmd0aDtyLS07KWlmKEtmKG5bcl1bMF0sdCkpcmV0dXJuIHI7cmV0dXJuLTF9ZnVuY3Rpb24gU3Iobix0LHIsZSl7cmV0dXJuIHZzKG4sZnVuY3Rpb24obix1LGkpe3QoZSxuLHIobiksaSl9KSxlfWZ1bmN0aW9uIFdyKG4sdCl7cmV0dXJuIG4mJkJ1KHQsRmModCksbil9ZnVuY3Rpb24gTHIobix0KXtyZXR1cm4gbiYmQnUodCxOYyh0KSxuKX1mdW5jdGlvbiBDcihuLHQscil7XCJfX3Byb3RvX19cIj09dCYmVWw/VWwobix0LHtjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMCx2YWx1ZTpyLHdyaXRhYmxlOiEwfSk6blt0XT1yfWZ1bmN0aW9uIFRyKG4sdCl7Zm9yKHZhciByPS0xLGU9dC5sZW5ndGgsdT1lbChlKSxpPW51bGw9PW47KytyPGU7KXVbcl09aT9ZOiRjKG4sdFtyXSk7cmV0dXJuIHV9ZnVuY3Rpb24gJHIobix0LHIpe3JldHVybiBuPT09biYmKHIhPT1ZJiYobj1uPD1yP246ciksXG50IT09WSYmKG49bj49dD9uOnQpKSxufWZ1bmN0aW9uIERyKG4sdCxlLHUsaSxvKXt2YXIgZixjPXQmb24sYT10JmZuLGw9dCZjbjtpZihlJiYoZj1pP2Uobix1LGksbyk6ZShuKSksZiE9PVkpcmV0dXJuIGY7aWYoIWljKG4pKXJldHVybiBuO3ZhciBzPXloKG4pO2lmKHMpe2lmKGY9SWkobiksIWMpcmV0dXJuIFV1KG4sZil9ZWxzZXt2YXIgaD1JcyhuKSxwPWg9PVBufHxoPT1xbjtpZihiaChuKSlyZXR1cm4ga3UobixjKTtpZihoPT1Hbnx8aD09Qm58fHAmJiFpKXtpZihmPWF8fHA/e306UmkobiksIWMpcmV0dXJuIGE/JHUobixMcihmLG4pKTpUdShuLFdyKGYsbikpfWVsc2V7aWYoIXFyW2hdKXJldHVybiBpP246e307Zj16aShuLGgsYyl9fW98fChvPW5ldyBkcik7dmFyIF89by5nZXQobik7aWYoXylyZXR1cm4gXztvLnNldChuLGYpLGpoKG4pP24uZm9yRWFjaChmdW5jdGlvbihyKXtmLmFkZChEcihyLHQsZSxyLG4sbykpfSk6bWgobikmJm4uZm9yRWFjaChmdW5jdGlvbihyLHUpe1xuZi5zZXQodSxEcihyLHQsZSx1LG4sbykpfSk7dmFyIHY9bD9hP2dpOnZpOmE/TmM6RmMsZz1zP1k6dihuKTtyZXR1cm4gcihnfHxuLGZ1bmN0aW9uKHIsdSl7ZyYmKHU9cixyPW5bdV0pLHpyKGYsdSxEcihyLHQsZSx1LG4sbykpfSksZn1mdW5jdGlvbiBNcihuKXt2YXIgdD1GYyhuKTtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIFpyKHIsbix0KX19ZnVuY3Rpb24gWnIobix0LHIpe3ZhciBlPXIubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKG49Y2wobik7ZS0tOyl7dmFyIHU9cltlXSxpPXRbdV0sbz1uW3VdO2lmKG89PT1ZJiYhKHUgaW4gbil8fCFpKG8pKXJldHVybiExfXJldHVybiEwfWZ1bmN0aW9uIEtyKG4sdCxyKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IG5ldyBzbCh0bik7cmV0dXJuIEVzKGZ1bmN0aW9uKCl7bi5hcHBseShZLHIpfSx0KX1mdW5jdGlvbiBWcihuLHQscixlKXt2YXIgdT0tMSxpPW8sYT0hMCxsPW4ubGVuZ3RoLHM9W10saD10Lmxlbmd0aDtcbmlmKCFsKXJldHVybiBzO3ImJih0PWModCxSKHIpKSksZT8oaT1mLGE9ITEpOnQubGVuZ3RoPj1YJiYoaT1FLGE9ITEsdD1uZXcgdnIodCkpO246Zm9yKDsrK3U8bDspe3ZhciBwPW5bdV0sXz1udWxsPT1yP3A6cihwKTtpZihwPWV8fDAhPT1wP3A6MCxhJiZfPT09Xyl7Zm9yKHZhciB2PWg7di0tOylpZih0W3ZdPT09Xyljb250aW51ZSBuO3MucHVzaChwKX1lbHNlIGkodCxfLGUpfHxzLnB1c2gocCl9cmV0dXJuIHN9ZnVuY3Rpb24gR3Iobix0KXt2YXIgcj0hMDtyZXR1cm4gdnMobixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHI9ISF0KG4sZSx1KX0pLHJ9ZnVuY3Rpb24gWXIobix0LHIpe2Zvcih2YXIgZT0tMSx1PW4ubGVuZ3RoOysrZTx1Oyl7dmFyIGk9bltlXSxvPXQoaSk7aWYobnVsbCE9byYmKGY9PT1ZP289PT1vJiYheWMobyk6cihvLGYpKSl2YXIgZj1vLGM9aX1yZXR1cm4gY31mdW5jdGlvbiBRcihuLHQscixlKXt2YXIgdT1uLmxlbmd0aDtmb3Iocj1qYyhyKSxyPDAmJihyPS1yPnU/MDp1K3IpLFxuZT1lPT09WXx8ZT51P3U6amMoZSksZTwwJiYoZSs9dSksZT1yPmU/MDpBYyhlKTtyPGU7KW5bcisrXT10O3JldHVybiBufWZ1bmN0aW9uIG5lKG4sdCl7dmFyIHI9W107cmV0dXJuIHZzKG4sZnVuY3Rpb24obixlLHUpe3QobixlLHUpJiZyLnB1c2gobil9KSxyfWZ1bmN0aW9uIHRlKG4sdCxyLGUsdSl7dmFyIGk9LTEsbz1uLmxlbmd0aDtmb3Iocnx8KHI9U2kpLHV8fCh1PVtdKTsrK2k8bzspe3ZhciBmPW5baV07dD4wJiZyKGYpP3Q+MT90ZShmLHQtMSxyLGUsdSk6YSh1LGYpOmV8fCh1W3UubGVuZ3RoXT1mKX1yZXR1cm4gdX1mdW5jdGlvbiBlZShuLHQpe3JldHVybiBuJiZ5cyhuLHQsRmMpfWZ1bmN0aW9uIHVlKG4sdCl7cmV0dXJuIG4mJmRzKG4sdCxGYyl9ZnVuY3Rpb24gc2Uobix0KXtyZXR1cm4gaSh0LGZ1bmN0aW9uKHQpe3JldHVybiByYyhuW3RdKX0pfWZ1bmN0aW9uIHZlKG4sdCl7dD1qdSh0LG4pO2Zvcih2YXIgcj0wLGU9dC5sZW5ndGg7bnVsbCE9biYmcjxlOyluPW5bUWkodFtyKytdKV07XG5yZXR1cm4gciYmcj09ZT9uOll9ZnVuY3Rpb24geWUobix0LHIpe3ZhciBlPXQobik7cmV0dXJuIHloKG4pP2U6YShlLHIobikpfWZ1bmN0aW9uIGRlKG4pe3JldHVybiBudWxsPT1uP249PT1ZP3R0OlZuOkNsJiZDbCBpbiBjbChuKT9qaShuKTpxaShuKX1mdW5jdGlvbiBiZShuLHQpe3JldHVybiBuPnR9ZnVuY3Rpb24gd2Uobix0KXtyZXR1cm4gbnVsbCE9biYmeWwuY2FsbChuLHQpfWZ1bmN0aW9uIG1lKG4sdCl7cmV0dXJuIG51bGwhPW4mJnQgaW4gY2wobil9ZnVuY3Rpb24geGUobix0LHIpe3JldHVybiBuPj1WbCh0LHIpJiZuPEtsKHQscil9ZnVuY3Rpb24gamUobix0LHIpe2Zvcih2YXIgZT1yP2Y6byx1PW5bMF0ubGVuZ3RoLGk9bi5sZW5ndGgsYT1pLGw9ZWwoaSkscz0xLzAsaD1bXTthLS07KXt2YXIgcD1uW2FdO2EmJnQmJihwPWMocCxSKHQpKSkscz1WbChwLmxlbmd0aCxzKSxsW2FdPSFyJiYodHx8dT49MTIwJiZwLmxlbmd0aD49MTIwKT9uZXcgdnIoYSYmcCk6WX1wPW5bMF07XG52YXIgXz0tMSx2PWxbMF07bjpmb3IoOysrXzx1JiZoLmxlbmd0aDxzOyl7dmFyIGc9cFtfXSx5PXQ/dChnKTpnO2lmKGc9cnx8MCE9PWc/ZzowLCEodj9FKHYseSk6ZShoLHkscikpKXtmb3IoYT1pOy0tYTspe3ZhciBkPWxbYV07aWYoIShkP0UoZCx5KTplKG5bYV0seSxyKSkpY29udGludWUgbn12JiZ2LnB1c2goeSksaC5wdXNoKGcpfX1yZXR1cm4gaH1mdW5jdGlvbiBBZShuLHQscixlKXtyZXR1cm4gZWUobixmdW5jdGlvbihuLHUsaSl7dChlLHIobiksdSxpKX0pLGV9ZnVuY3Rpb24ga2UodCxyLGUpe3I9anUocix0KSx0PUtpKHQscik7dmFyIHU9bnVsbD09dD90OnRbUWkobW8ocikpXTtyZXR1cm4gbnVsbD09dT9ZOm4odSx0LGUpfWZ1bmN0aW9uIE9lKG4pe3JldHVybiBvYyhuKSYmZGUobik9PUJufWZ1bmN0aW9uIEllKG4pe3JldHVybiBvYyhuKSYmZGUobik9PXV0fWZ1bmN0aW9uIFJlKG4pe3JldHVybiBvYyhuKSYmZGUobik9PU1ufWZ1bmN0aW9uIHplKG4sdCxyLGUsdSl7XG5yZXR1cm4gbj09PXR8fChudWxsPT1ufHxudWxsPT10fHwhb2MobikmJiFvYyh0KT9uIT09biYmdCE9PXQ6RWUobix0LHIsZSx6ZSx1KSl9ZnVuY3Rpb24gRWUobix0LHIsZSx1LGkpe3ZhciBvPXloKG4pLGY9eWgodCksYz1vP1RuOklzKG4pLGE9Zj9UbjpJcyh0KTtjPWM9PUJuP0duOmMsYT1hPT1Cbj9HbjphO3ZhciBsPWM9PUduLHM9YT09R24saD1jPT1hO2lmKGgmJmJoKG4pKXtpZighYmgodCkpcmV0dXJuITE7bz0hMCxsPSExfWlmKGgmJiFsKXJldHVybiBpfHwoaT1uZXcgZHIpLG98fEFoKG4pP3NpKG4sdCxyLGUsdSxpKTpoaShuLHQsYyxyLGUsdSxpKTtpZighKHImYW4pKXt2YXIgcD1sJiZ5bC5jYWxsKG4sXCJfX3dyYXBwZWRfX1wiKSxfPXMmJnlsLmNhbGwodCxcIl9fd3JhcHBlZF9fXCIpO2lmKHB8fF8pe3ZhciB2PXA/bi52YWx1ZSgpOm4sZz1fP3QudmFsdWUoKTp0O3JldHVybiBpfHwoaT1uZXcgZHIpLHUodixnLHIsZSxpKX19cmV0dXJuISFoJiYoaXx8KGk9bmV3IGRyKSxwaShuLHQscixlLHUsaSkpO1xufWZ1bmN0aW9uIFNlKG4pe3JldHVybiBvYyhuKSYmSXMobik9PVpufWZ1bmN0aW9uIFdlKG4sdCxyLGUpe3ZhciB1PXIubGVuZ3RoLGk9dSxvPSFlO2lmKG51bGw9PW4pcmV0dXJuIWk7Zm9yKG49Y2wobik7dS0tOyl7dmFyIGY9clt1XTtpZihvJiZmWzJdP2ZbMV0hPT1uW2ZbMF1dOiEoZlswXWluIG4pKXJldHVybiExfWZvcig7Kyt1PGk7KXtmPXJbdV07dmFyIGM9ZlswXSxhPW5bY10sbD1mWzFdO2lmKG8mJmZbMl0pe2lmKGE9PT1ZJiYhKGMgaW4gbikpcmV0dXJuITF9ZWxzZXt2YXIgcz1uZXcgZHI7aWYoZSl2YXIgaD1lKGEsbCxjLG4sdCxzKTtpZighKGg9PT1ZP3plKGwsYSxhbnxsbixlLHMpOmgpKXJldHVybiExfX1yZXR1cm4hMH1mdW5jdGlvbiBMZShuKXtyZXR1cm4hKCFpYyhuKXx8VGkobikpJiYocmMobik/amw6TnQpLnRlc3QoWGkobikpfWZ1bmN0aW9uIENlKG4pe3JldHVybiBvYyhuKSYmZGUobik9PVlufWZ1bmN0aW9uIFVlKG4pe3JldHVybiBvYyhuKSYmSXMobik9PVFuO1xufWZ1bmN0aW9uIEJlKG4pe3JldHVybiBvYyhuKSYmdWMobi5sZW5ndGgpJiYhIVByW2RlKG4pXX1mdW5jdGlvbiBUZShuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246bnVsbD09bj9TYTpcIm9iamVjdFwiPT10eXBlb2Ygbj95aChuKT9QZShuWzBdLG5bMV0pOk5lKG4pOkRhKG4pfWZ1bmN0aW9uICRlKG4pe2lmKCEkaShuKSlyZXR1cm4gWmwobik7dmFyIHQ9W107Zm9yKHZhciByIGluIGNsKG4pKXlsLmNhbGwobixyKSYmXCJjb25zdHJ1Y3RvclwiIT1yJiZ0LnB1c2gocik7cmV0dXJuIHR9ZnVuY3Rpb24gRGUobil7aWYoIWljKG4pKXJldHVybiBQaShuKTt2YXIgdD0kaShuKSxyPVtdO2Zvcih2YXIgZSBpbiBuKShcImNvbnN0cnVjdG9yXCIhPWV8fCF0JiZ5bC5jYWxsKG4sZSkpJiZyLnB1c2goZSk7cmV0dXJuIHJ9ZnVuY3Rpb24gTWUobix0KXtyZXR1cm4gbjx0fWZ1bmN0aW9uIEZlKG4sdCl7dmFyIHI9LTEsZT1WZihuKT9lbChuLmxlbmd0aCk6W107cmV0dXJuIHZzKG4sZnVuY3Rpb24obix1LGkpe1xuZVsrK3JdPXQobix1LGkpfSksZX1mdW5jdGlvbiBOZShuKXt2YXIgdD1taShuKTtyZXR1cm4gMT09dC5sZW5ndGgmJnRbMF1bMl0/TWkodFswXVswXSx0WzBdWzFdKTpmdW5jdGlvbihyKXtyZXR1cm4gcj09PW58fFdlKHIsbix0KX19ZnVuY3Rpb24gUGUobix0KXtyZXR1cm4gQ2kobikmJkRpKHQpP01pKFFpKG4pLHQpOmZ1bmN0aW9uKHIpe3ZhciBlPSRjKHIsbik7cmV0dXJuIGU9PT1ZJiZlPT09dD9NYyhyLG4pOnplKHQsZSxhbnxsbil9fWZ1bmN0aW9uIHFlKG4sdCxyLGUsdSl7biE9PXQmJnlzKHQsZnVuY3Rpb24oaSxvKXtpZih1fHwodT1uZXcgZHIpLGljKGkpKVplKG4sdCxvLHIscWUsZSx1KTtlbHNle3ZhciBmPWU/ZShHaShuLG8pLGksbytcIlwiLG4sdCx1KTpZO2Y9PT1ZJiYoZj1pKSxScihuLG8sZil9fSxOYyl9ZnVuY3Rpb24gWmUobix0LHIsZSx1LGksbyl7dmFyIGY9R2kobixyKSxjPUdpKHQsciksYT1vLmdldChjKTtpZihhKXJldHVybiBScihuLHIsYSksWTt2YXIgbD1pP2koZixjLHIrXCJcIixuLHQsbyk6WSxzPWw9PT1ZO1xuaWYocyl7dmFyIGg9eWgoYykscD0haCYmYmgoYyksXz0haCYmIXAmJkFoKGMpO2w9YyxofHxwfHxfP3loKGYpP2w9ZjpHZihmKT9sPVV1KGYpOnA/KHM9ITEsbD1rdShjLCEwKSk6Xz8ocz0hMSxsPUV1KGMsITApKTpsPVtdOl9jKGMpfHxnaChjKT8obD1mLGdoKGYpP2w9T2MoZik6aWMoZikmJiFyYyhmKXx8KGw9UmkoYykpKTpzPSExfXMmJihvLnNldChjLGwpLHUobCxjLGUsaSxvKSxvLmRlbGV0ZShjKSksUnIobixyLGwpfWZ1bmN0aW9uIEtlKG4sdCl7dmFyIHI9bi5sZW5ndGg7aWYocilyZXR1cm4gdCs9dDwwP3I6MCxXaSh0LHIpP25bdF06WX1mdW5jdGlvbiBWZShuLHQscil7dD10Lmxlbmd0aD9jKHQsZnVuY3Rpb24obil7cmV0dXJuIHloKG4pP2Z1bmN0aW9uKHQpe3JldHVybiB2ZSh0LDE9PT1uLmxlbmd0aD9uWzBdOm4pfTpufSk6W1NhXTt2YXIgZT0tMTtyZXR1cm4gdD1jKHQsUihiaSgpKSksQShGZShuLGZ1bmN0aW9uKG4scix1KXtyZXR1cm57Y3JpdGVyaWE6Yyh0LGZ1bmN0aW9uKHQpe1xucmV0dXJuIHQobil9KSxpbmRleDorK2UsdmFsdWU6bn19KSxmdW5jdGlvbihuLHQpe3JldHVybiBXdShuLHQscil9KX1mdW5jdGlvbiBHZShuLHQpe3JldHVybiBIZShuLHQsZnVuY3Rpb24odCxyKXtyZXR1cm4gTWMobixyKX0pfWZ1bmN0aW9uIEhlKG4sdCxyKXtmb3IodmFyIGU9LTEsdT10Lmxlbmd0aCxpPXt9OysrZTx1Oyl7dmFyIG89dFtlXSxmPXZlKG4sbyk7cihmLG8pJiZpdShpLGp1KG8sbiksZil9cmV0dXJuIGl9ZnVuY3Rpb24gSmUobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiB2ZSh0LG4pfX1mdW5jdGlvbiBZZShuLHQscixlKXt2YXIgdT1lP2Q6eSxpPS0xLG89dC5sZW5ndGgsZj1uO2ZvcihuPT09dCYmKHQ9VXUodCkpLHImJihmPWMobixSKHIpKSk7KytpPG87KWZvcih2YXIgYT0wLGw9dFtpXSxzPXI/cihsKTpsOyhhPXUoZixzLGEsZSkpPi0xOylmIT09biYmU2wuY2FsbChmLGEsMSksU2wuY2FsbChuLGEsMSk7cmV0dXJuIG59ZnVuY3Rpb24gUWUobix0KXtmb3IodmFyIHI9bj90Lmxlbmd0aDowLGU9ci0xO3ItLTspe1xudmFyIHU9dFtyXTtpZihyPT1lfHx1IT09aSl7dmFyIGk9dTtXaSh1KT9TbC5jYWxsKG4sdSwxKTp2dShuLHUpfX1yZXR1cm4gbn1mdW5jdGlvbiBYZShuLHQpe3JldHVybiBuK01sKEpsKCkqKHQtbisxKSl9ZnVuY3Rpb24gbnUobix0LHIsZSl7Zm9yKHZhciB1PS0xLGk9S2woRGwoKHQtbikvKHJ8fDEpKSwwKSxvPWVsKGkpO2ktLTspb1tlP2k6Kyt1XT1uLG4rPXI7cmV0dXJuIG99ZnVuY3Rpb24gdHUobix0KXt2YXIgcj1cIlwiO2lmKCFufHx0PDF8fHQ+em4pcmV0dXJuIHI7ZG8gdCUyJiYocis9biksdD1NbCh0LzIpLHQmJihuKz1uKTt3aGlsZSh0KTtyZXR1cm4gcn1mdW5jdGlvbiBydShuLHQpe3JldHVybiBTcyhaaShuLHQsU2EpLG4rXCJcIil9ZnVuY3Rpb24gZXUobil7cmV0dXJuIGtyKG5hKG4pKX1mdW5jdGlvbiB1dShuLHQpe3ZhciByPW5hKG4pO3JldHVybiBZaShyLCRyKHQsMCxyLmxlbmd0aCkpfWZ1bmN0aW9uIGl1KG4sdCxyLGUpe2lmKCFpYyhuKSlyZXR1cm4gbjt0PWp1KHQsbik7XG5mb3IodmFyIHU9LTEsaT10Lmxlbmd0aCxvPWktMSxmPW47bnVsbCE9ZiYmKyt1PGk7KXt2YXIgYz1RaSh0W3VdKSxhPXI7aWYoXCJfX3Byb3RvX19cIj09PWN8fFwiY29uc3RydWN0b3JcIj09PWN8fFwicHJvdG90eXBlXCI9PT1jKXJldHVybiBuO2lmKHUhPW8pe3ZhciBsPWZbY107YT1lP2UobCxjLGYpOlksYT09PVkmJihhPWljKGwpP2w6V2kodFt1KzFdKT9bXTp7fSl9enIoZixjLGEpLGY9ZltjXX1yZXR1cm4gbn1mdW5jdGlvbiBvdShuKXtyZXR1cm4gWWkobmEobikpfWZ1bmN0aW9uIGZ1KG4sdCxyKXt2YXIgZT0tMSx1PW4ubGVuZ3RoO3Q8MCYmKHQ9LXQ+dT8wOnUrdCkscj1yPnU/dTpyLHI8MCYmKHIrPXUpLHU9dD5yPzA6ci10Pj4+MCx0Pj4+PTA7Zm9yKHZhciBpPWVsKHUpOysrZTx1OylpW2VdPW5bZSt0XTtyZXR1cm4gaX1mdW5jdGlvbiBjdShuLHQpe3ZhciByO3JldHVybiB2cyhuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gcj10KG4sZSx1KSwhcn0pLCEhcn1mdW5jdGlvbiBhdShuLHQscil7XG52YXIgZT0wLHU9bnVsbD09bj9lOm4ubGVuZ3RoO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0JiZ0PT09dCYmdTw9Q24pe2Zvcig7ZTx1Oyl7dmFyIGk9ZSt1Pj4+MSxvPW5baV07bnVsbCE9PW8mJiF5YyhvKSYmKHI/bzw9dDpvPHQpP2U9aSsxOnU9aX1yZXR1cm4gdX1yZXR1cm4gbHUobix0LFNhLHIpfWZ1bmN0aW9uIGx1KG4sdCxyLGUpe3ZhciB1PTAsaT1udWxsPT1uPzA6bi5sZW5ndGg7aWYoMD09PWkpcmV0dXJuIDA7dD1yKHQpO2Zvcih2YXIgbz10IT09dCxmPW51bGw9PT10LGM9eWModCksYT10PT09WTt1PGk7KXt2YXIgbD1NbCgodStpKS8yKSxzPXIobltsXSksaD1zIT09WSxwPW51bGw9PT1zLF89cz09PXMsdj15YyhzKTtpZihvKXZhciBnPWV8fF87ZWxzZSBnPWE/XyYmKGV8fGgpOmY/XyYmaCYmKGV8fCFwKTpjP18mJmgmJiFwJiYoZXx8IXYpOiFwJiYhdiYmKGU/czw9dDpzPHQpO2c/dT1sKzE6aT1sfXJldHVybiBWbChpLExuKX1mdW5jdGlvbiBzdShuLHQpe2Zvcih2YXIgcj0tMSxlPW4ubGVuZ3RoLHU9MCxpPVtdOysrcjxlOyl7XG52YXIgbz1uW3JdLGY9dD90KG8pOm87aWYoIXJ8fCFLZihmLGMpKXt2YXIgYz1mO2lbdSsrXT0wPT09bz8wOm99fXJldHVybiBpfWZ1bmN0aW9uIGh1KG4pe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiBuP246eWMobik/U246K259ZnVuY3Rpb24gcHUobil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4pcmV0dXJuIG47aWYoeWgobikpcmV0dXJuIGMobixwdSkrXCJcIjtpZih5YyhuKSlyZXR1cm4gcHM/cHMuY2FsbChuKTpcIlwiO3ZhciB0PW4rXCJcIjtyZXR1cm5cIjBcIj09dCYmMS9uPT0tUm4/XCItMFwiOnR9ZnVuY3Rpb24gX3Uobix0LHIpe3ZhciBlPS0xLHU9byxpPW4ubGVuZ3RoLGM9ITAsYT1bXSxsPWE7aWYociljPSExLHU9ZjtlbHNlIGlmKGk+PVgpe3ZhciBzPXQ/bnVsbDpqcyhuKTtpZihzKXJldHVybiBOKHMpO2M9ITEsdT1FLGw9bmV3IHZyfWVsc2UgbD10P1tdOmE7bjpmb3IoOysrZTxpOyl7dmFyIGg9bltlXSxwPXQ/dChoKTpoO2lmKGg9cnx8MCE9PWg/aDowLGMmJnA9PT1wKXtmb3IodmFyIF89bC5sZW5ndGg7Xy0tOylpZihsW19dPT09cCljb250aW51ZSBuO1xudCYmbC5wdXNoKHApLGEucHVzaChoKX1lbHNlIHUobCxwLHIpfHwobCE9PWEmJmwucHVzaChwKSxhLnB1c2goaCkpfXJldHVybiBhfWZ1bmN0aW9uIHZ1KG4sdCl7cmV0dXJuIHQ9anUodCxuKSxuPUtpKG4sdCksbnVsbD09bnx8ZGVsZXRlIG5bUWkobW8odCkpXX1mdW5jdGlvbiBndShuLHQscixlKXtyZXR1cm4gaXUobix0LHIodmUobix0KSksZSl9ZnVuY3Rpb24geXUobix0LHIsZSl7Zm9yKHZhciB1PW4ubGVuZ3RoLGk9ZT91Oi0xOyhlP2ktLTorK2k8dSkmJnQobltpXSxpLG4pOyk7cmV0dXJuIHI/ZnUobixlPzA6aSxlP2krMTp1KTpmdShuLGU/aSsxOjAsZT91OmkpfWZ1bmN0aW9uIGR1KG4sdCl7dmFyIHI9bjtyZXR1cm4gciBpbnN0YW5jZW9mIEJ0JiYocj1yLnZhbHVlKCkpLGwodCxmdW5jdGlvbihuLHQpe3JldHVybiB0LmZ1bmMuYXBwbHkodC50aGlzQXJnLGEoW25dLHQuYXJncykpfSxyKX1mdW5jdGlvbiBidShuLHQscil7dmFyIGU9bi5sZW5ndGg7aWYoZTwyKXJldHVybiBlP191KG5bMF0pOltdO1xuZm9yKHZhciB1PS0xLGk9ZWwoZSk7Kyt1PGU7KWZvcih2YXIgbz1uW3VdLGY9LTE7KytmPGU7KWYhPXUmJihpW3VdPVZyKGlbdV18fG8sbltmXSx0LHIpKTtyZXR1cm4gX3UodGUoaSwxKSx0LHIpfWZ1bmN0aW9uIHd1KG4sdCxyKXtmb3IodmFyIGU9LTEsdT1uLmxlbmd0aCxpPXQubGVuZ3RoLG89e307KytlPHU7KXtyKG8sbltlXSxlPGk/dFtlXTpZKX1yZXR1cm4gb31mdW5jdGlvbiBtdShuKXtyZXR1cm4gR2Yobik/bjpbXX1mdW5jdGlvbiB4dShuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246U2F9ZnVuY3Rpb24ganUobix0KXtyZXR1cm4geWgobik/bjpDaShuLHQpP1tuXTpXcyhSYyhuKSl9ZnVuY3Rpb24gQXUobix0LHIpe3ZhciBlPW4ubGVuZ3RoO3JldHVybiByPXI9PT1ZP2U6ciwhdCYmcj49ZT9uOmZ1KG4sdCxyKX1mdW5jdGlvbiBrdShuLHQpe2lmKHQpcmV0dXJuIG4uc2xpY2UoKTt2YXIgcj1uLmxlbmd0aCxlPUlsP0lsKHIpOm5ldyBuLmNvbnN0cnVjdG9yKHIpO1xucmV0dXJuIG4uY29weShlKSxlfWZ1bmN0aW9uIE91KG4pe3ZhciB0PW5ldyBuLmNvbnN0cnVjdG9yKG4uYnl0ZUxlbmd0aCk7cmV0dXJuIG5ldyBPbCh0KS5zZXQobmV3IE9sKG4pKSx0fWZ1bmN0aW9uIEl1KG4sdCl7cmV0dXJuIG5ldyBuLmNvbnN0cnVjdG9yKHQ/T3Uobi5idWZmZXIpOm4uYnVmZmVyLG4uYnl0ZU9mZnNldCxuLmJ5dGVMZW5ndGgpfWZ1bmN0aW9uIFJ1KG4pe3ZhciB0PW5ldyBuLmNvbnN0cnVjdG9yKG4uc291cmNlLER0LmV4ZWMobikpO3JldHVybiB0Lmxhc3RJbmRleD1uLmxhc3RJbmRleCx0fWZ1bmN0aW9uIHp1KG4pe3JldHVybiBocz9jbChocy5jYWxsKG4pKTp7fX1mdW5jdGlvbiBFdShuLHQpe3JldHVybiBuZXcgbi5jb25zdHJ1Y3Rvcih0P091KG4uYnVmZmVyKTpuLmJ1ZmZlcixuLmJ5dGVPZmZzZXQsbi5sZW5ndGgpfWZ1bmN0aW9uIFN1KG4sdCl7aWYobiE9PXQpe3ZhciByPW4hPT1ZLGU9bnVsbD09PW4sdT1uPT09bixpPXljKG4pLG89dCE9PVksZj1udWxsPT09dCxjPXQ9PT10LGE9eWModCk7XG5pZighZiYmIWEmJiFpJiZuPnR8fGkmJm8mJmMmJiFmJiYhYXx8ZSYmbyYmY3x8IXImJmN8fCF1KXJldHVybiAxO2lmKCFlJiYhaSYmIWEmJm48dHx8YSYmciYmdSYmIWUmJiFpfHxmJiZyJiZ1fHwhbyYmdXx8IWMpcmV0dXJuLTF9cmV0dXJuIDB9ZnVuY3Rpb24gV3Uobix0LHIpe2Zvcih2YXIgZT0tMSx1PW4uY3JpdGVyaWEsaT10LmNyaXRlcmlhLG89dS5sZW5ndGgsZj1yLmxlbmd0aDsrK2U8bzspe3ZhciBjPVN1KHVbZV0saVtlXSk7aWYoYyl7aWYoZT49ZilyZXR1cm4gYztyZXR1cm4gYyooXCJkZXNjXCI9PXJbZV0/LTE6MSl9fXJldHVybiBuLmluZGV4LXQuaW5kZXh9ZnVuY3Rpb24gTHUobix0LHIsZSl7Zm9yKHZhciB1PS0xLGk9bi5sZW5ndGgsbz1yLmxlbmd0aCxmPS0xLGM9dC5sZW5ndGgsYT1LbChpLW8sMCksbD1lbChjK2EpLHM9IWU7KytmPGM7KWxbZl09dFtmXTtmb3IoOysrdTxvOykoc3x8dTxpKSYmKGxbclt1XV09blt1XSk7Zm9yKDthLS07KWxbZisrXT1uW3UrK107cmV0dXJuIGw7XG59ZnVuY3Rpb24gQ3Uobix0LHIsZSl7Zm9yKHZhciB1PS0xLGk9bi5sZW5ndGgsbz0tMSxmPXIubGVuZ3RoLGM9LTEsYT10Lmxlbmd0aCxsPUtsKGktZiwwKSxzPWVsKGwrYSksaD0hZTsrK3U8bDspc1t1XT1uW3VdO2Zvcih2YXIgcD11OysrYzxhOylzW3ArY109dFtjXTtmb3IoOysrbzxmOykoaHx8dTxpKSYmKHNbcCtyW29dXT1uW3UrK10pO3JldHVybiBzfWZ1bmN0aW9uIFV1KG4sdCl7dmFyIHI9LTEsZT1uLmxlbmd0aDtmb3IodHx8KHQ9ZWwoZSkpOysrcjxlOyl0W3JdPW5bcl07cmV0dXJuIHR9ZnVuY3Rpb24gQnUobix0LHIsZSl7dmFyIHU9IXI7cnx8KHI9e30pO2Zvcih2YXIgaT0tMSxvPXQubGVuZ3RoOysraTxvOyl7dmFyIGY9dFtpXSxjPWU/ZShyW2ZdLG5bZl0sZixyLG4pOlk7Yz09PVkmJihjPW5bZl0pLHU/Q3IocixmLGMpOnpyKHIsZixjKX1yZXR1cm4gcn1mdW5jdGlvbiBUdShuLHQpe3JldHVybiBCdShuLGtzKG4pLHQpfWZ1bmN0aW9uICR1KG4sdCl7cmV0dXJuIEJ1KG4sT3MobiksdCk7XG59ZnVuY3Rpb24gRHUobixyKXtyZXR1cm4gZnVuY3Rpb24oZSx1KXt2YXIgaT15aChlKT90OlNyLG89cj9yKCk6e307cmV0dXJuIGkoZSxuLGJpKHUsMiksbyl9fWZ1bmN0aW9uIE11KG4pe3JldHVybiBydShmdW5jdGlvbih0LHIpe3ZhciBlPS0xLHU9ci5sZW5ndGgsaT11PjE/clt1LTFdOlksbz11PjI/clsyXTpZO2ZvcihpPW4ubGVuZ3RoPjMmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGk/KHUtLSxpKTpZLG8mJkxpKHJbMF0sclsxXSxvKSYmKGk9dTwzP1k6aSx1PTEpLHQ9Y2wodCk7KytlPHU7KXt2YXIgZj1yW2VdO2YmJm4odCxmLGUsaSl9cmV0dXJuIHR9KX1mdW5jdGlvbiBGdShuLHQpe3JldHVybiBmdW5jdGlvbihyLGUpe2lmKG51bGw9PXIpcmV0dXJuIHI7aWYoIVZmKHIpKXJldHVybiBuKHIsZSk7Zm9yKHZhciB1PXIubGVuZ3RoLGk9dD91Oi0xLG89Y2wocik7KHQ/aS0tOisraTx1KSYmZShvW2ldLGksbykhPT0hMTspO3JldHVybiByfX1mdW5jdGlvbiBOdShuKXtyZXR1cm4gZnVuY3Rpb24odCxyLGUpe1xuZm9yKHZhciB1PS0xLGk9Y2wodCksbz1lKHQpLGY9by5sZW5ndGg7Zi0tOyl7dmFyIGM9b1tuP2Y6Kyt1XTtpZihyKGlbY10sYyxpKT09PSExKWJyZWFrfXJldHVybiB0fX1mdW5jdGlvbiBQdShuLHQscil7ZnVuY3Rpb24gZSgpe3JldHVybih0aGlzJiZ0aGlzIT09WHImJnRoaXMgaW5zdGFuY2VvZiBlP2k6bikuYXBwbHkodT9yOnRoaXMsYXJndW1lbnRzKX12YXIgdT10JnNuLGk9S3Uobik7cmV0dXJuIGV9ZnVuY3Rpb24gcXUobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3Q9UmModCk7dmFyIHI9Qih0KT9WKHQpOlksZT1yP3JbMF06dC5jaGFyQXQoMCksdT1yP0F1KHIsMSkuam9pbihcIlwiKTp0LnNsaWNlKDEpO3JldHVybiBlW25dKCkrdX19ZnVuY3Rpb24gWnUobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBsKE9hKG9hKHQpLnJlcGxhY2UoVXIsXCJcIikpLG4sXCJcIil9fWZ1bmN0aW9uIEt1KG4pe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cztzd2l0Y2godC5sZW5ndGgpe1xuY2FzZSAwOnJldHVybiBuZXcgbjtjYXNlIDE6cmV0dXJuIG5ldyBuKHRbMF0pO2Nhc2UgMjpyZXR1cm4gbmV3IG4odFswXSx0WzFdKTtjYXNlIDM6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdKTtjYXNlIDQ6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10pO2Nhc2UgNTpyZXR1cm4gbmV3IG4odFswXSx0WzFdLHRbMl0sdFszXSx0WzRdKTtjYXNlIDY6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10sdFs0XSx0WzVdKTtjYXNlIDc6cmV0dXJuIG5ldyBuKHRbMF0sdFsxXSx0WzJdLHRbM10sdFs0XSx0WzVdLHRbNl0pfXZhciByPV9zKG4ucHJvdG90eXBlKSxlPW4uYXBwbHkocix0KTtyZXR1cm4gaWMoZSk/ZTpyfX1mdW5jdGlvbiBWdSh0LHIsZSl7ZnVuY3Rpb24gdSgpe2Zvcih2YXIgbz1hcmd1bWVudHMubGVuZ3RoLGY9ZWwobyksYz1vLGE9ZGkodSk7Yy0tOylmW2NdPWFyZ3VtZW50c1tjXTt2YXIgbD1vPDMmJmZbMF0hPT1hJiZmW28tMV0hPT1hP1tdOkYoZixhKTtcbnJldHVybiBvLT1sLmxlbmd0aCxvPGU/dWkodCxyLEp1LHUucGxhY2Vob2xkZXIsWSxmLGwsWSxZLGUtbyk6bih0aGlzJiZ0aGlzIT09WHImJnRoaXMgaW5zdGFuY2VvZiB1P2k6dCx0aGlzLGYpfXZhciBpPUt1KHQpO3JldHVybiB1fWZ1bmN0aW9uIEd1KG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7dmFyIHU9Y2wodCk7aWYoIVZmKHQpKXt2YXIgaT1iaShyLDMpO3Q9RmModCkscj1mdW5jdGlvbihuKXtyZXR1cm4gaSh1W25dLG4sdSl9fXZhciBvPW4odCxyLGUpO3JldHVybiBvPi0xP3VbaT90W29dOm9dOll9fWZ1bmN0aW9uIEh1KG4pe3JldHVybiBfaShmdW5jdGlvbih0KXt2YXIgcj10Lmxlbmd0aCxlPXIsdT1ILnByb3RvdHlwZS50aHJ1O2ZvcihuJiZ0LnJldmVyc2UoKTtlLS07KXt2YXIgaT10W2VdO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGkpdGhyb3cgbmV3IHNsKHRuKTtpZih1JiYhbyYmXCJ3cmFwcGVyXCI9PXlpKGkpKXZhciBvPW5ldyBIKFtdLCEwKX1mb3IoZT1vP2U6cjsrK2U8cjspe1xuaT10W2VdO3ZhciBmPXlpKGkpLGM9XCJ3cmFwcGVyXCI9PWY/QXMoaSk6WTtvPWMmJkJpKGNbMF0pJiZjWzFdPT0oZG58X258Z258Ym4pJiYhY1s0XS5sZW5ndGgmJjE9PWNbOV0/b1t5aShjWzBdKV0uYXBwbHkobyxjWzNdKToxPT1pLmxlbmd0aCYmQmkoaSk/b1tmXSgpOm8udGhydShpKX1yZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMsZT1uWzBdO2lmKG8mJjE9PW4ubGVuZ3RoJiZ5aChlKSlyZXR1cm4gby5wbGFudChlKS52YWx1ZSgpO2Zvcih2YXIgdT0wLGk9cj90W3VdLmFwcGx5KHRoaXMsbik6ZTsrK3U8cjspaT10W3VdLmNhbGwodGhpcyxpKTtyZXR1cm4gaX19KX1mdW5jdGlvbiBKdShuLHQscixlLHUsaSxvLGYsYyxhKXtmdW5jdGlvbiBsKCl7Zm9yKHZhciB5PWFyZ3VtZW50cy5sZW5ndGgsZD1lbCh5KSxiPXk7Yi0tOylkW2JdPWFyZ3VtZW50c1tiXTtpZihfKXZhciB3PWRpKGwpLG09TChkLHcpO2lmKGUmJihkPUx1KGQsZSx1LF8pKSxpJiYoZD1DdShkLGksbyxfKSksXG55LT1tLF8mJnk8YSl7cmV0dXJuIHVpKG4sdCxKdSxsLnBsYWNlaG9sZGVyLHIsZCxGKGQsdyksZixjLGEteSl9dmFyIHg9aD9yOnRoaXMsaj1wP3hbbl06bjtyZXR1cm4geT1kLmxlbmd0aCxmP2Q9VmkoZCxmKTp2JiZ5PjEmJmQucmV2ZXJzZSgpLHMmJmM8eSYmKGQubGVuZ3RoPWMpLHRoaXMmJnRoaXMhPT1YciYmdGhpcyBpbnN0YW5jZW9mIGwmJihqPWd8fEt1KGopKSxqLmFwcGx5KHgsZCl9dmFyIHM9dCZkbixoPXQmc24scD10JmhuLF89dCYoX258dm4pLHY9dCZ3bixnPXA/WTpLdShuKTtyZXR1cm4gbH1mdW5jdGlvbiBZdShuLHQpe3JldHVybiBmdW5jdGlvbihyLGUpe3JldHVybiBBZShyLG4sdChlKSx7fSl9fWZ1bmN0aW9uIFF1KG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsZSl7dmFyIHU7aWYocj09PVkmJmU9PT1ZKXJldHVybiB0O2lmKHIhPT1ZJiYodT1yKSxlIT09WSl7aWYodT09PVkpcmV0dXJuIGU7XCJzdHJpbmdcIj09dHlwZW9mIHJ8fFwic3RyaW5nXCI9PXR5cGVvZiBlPyhyPXB1KHIpLFxuZT1wdShlKSk6KHI9aHUociksZT1odShlKSksdT1uKHIsZSl9cmV0dXJuIHV9fWZ1bmN0aW9uIFh1KHQpe3JldHVybiBfaShmdW5jdGlvbihyKXtyZXR1cm4gcj1jKHIsUihiaSgpKSkscnUoZnVuY3Rpb24oZSl7dmFyIHU9dGhpcztyZXR1cm4gdChyLGZ1bmN0aW9uKHQpe3JldHVybiBuKHQsdSxlKX0pfSl9KX1mdW5jdGlvbiBuaShuLHQpe3Q9dD09PVk/XCIgXCI6cHUodCk7dmFyIHI9dC5sZW5ndGg7aWYocjwyKXJldHVybiByP3R1KHQsbik6dDt2YXIgZT10dSh0LERsKG4vSyh0KSkpO3JldHVybiBCKHQpP0F1KFYoZSksMCxuKS5qb2luKFwiXCIpOmUuc2xpY2UoMCxuKX1mdW5jdGlvbiB0aSh0LHIsZSx1KXtmdW5jdGlvbiBpKCl7Zm9yKHZhciByPS0xLGM9YXJndW1lbnRzLmxlbmd0aCxhPS0xLGw9dS5sZW5ndGgscz1lbChsK2MpLGg9dGhpcyYmdGhpcyE9PVhyJiZ0aGlzIGluc3RhbmNlb2YgaT9mOnQ7KythPGw7KXNbYV09dVthXTtmb3IoO2MtLTspc1thKytdPWFyZ3VtZW50c1srK3JdO1xucmV0dXJuIG4oaCxvP2U6dGhpcyxzKX12YXIgbz1yJnNuLGY9S3UodCk7cmV0dXJuIGl9ZnVuY3Rpb24gcmkobil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXtyZXR1cm4gZSYmXCJudW1iZXJcIiE9dHlwZW9mIGUmJkxpKHQscixlKSYmKHI9ZT1ZKSx0PXhjKHQpLHI9PT1ZPyhyPXQsdD0wKTpyPXhjKHIpLGU9ZT09PVk/dDxyPzE6LTE6eGMoZSksbnUodCxyLGUsbil9fWZ1bmN0aW9uIGVpKG4pe3JldHVybiBmdW5jdGlvbih0LHIpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0JiZcInN0cmluZ1wiPT10eXBlb2Ygcnx8KHQ9a2ModCkscj1rYyhyKSksbih0LHIpfX1mdW5jdGlvbiB1aShuLHQscixlLHUsaSxvLGYsYyxhKXt2YXIgbD10Jl9uLHM9bD9vOlksaD1sP1k6byxwPWw/aTpZLF89bD9ZOmk7dHw9bD9nbjp5bix0Jj1+KGw/eW46Z24pLHQmcG58fCh0Jj1+KHNufGhuKSk7dmFyIHY9W24sdCx1LHAscyxfLGgsZixjLGFdLGc9ci5hcHBseShZLHYpO3JldHVybiBCaShuKSYmenMoZyx2KSxnLnBsYWNlaG9sZGVyPWUsXG5IaShnLG4sdCl9ZnVuY3Rpb24gaWkobil7dmFyIHQ9Zmxbbl07cmV0dXJuIGZ1bmN0aW9uKG4scil7aWYobj1rYyhuKSxyPW51bGw9PXI/MDpWbChqYyhyKSwyOTIpLHImJlBsKG4pKXt2YXIgZT0oUmMobikrXCJlXCIpLnNwbGl0KFwiZVwiKTtyZXR1cm4gZT0oUmModChlWzBdK1wiZVwiKygrZVsxXStyKSkpK1wiZVwiKS5zcGxpdChcImVcIiksKyhlWzBdK1wiZVwiKygrZVsxXS1yKSl9cmV0dXJuIHQobil9fWZ1bmN0aW9uIG9pKG4pe3JldHVybiBmdW5jdGlvbih0KXt2YXIgcj1Jcyh0KTtyZXR1cm4gcj09Wm4/RCh0KTpyPT1Rbj9QKHQpOkkodCxuKHQpKX19ZnVuY3Rpb24gZmkobix0LHIsZSx1LGksbyxmKXt2YXIgYz10JmhuO2lmKCFjJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IG5ldyBzbCh0bik7dmFyIGE9ZT9lLmxlbmd0aDowO2lmKGF8fCh0Jj1+KGdufHluKSxlPXU9WSksbz1vPT09WT9vOktsKGpjKG8pLDApLGY9Zj09PVk/ZjpqYyhmKSxhLT11P3UubGVuZ3RoOjAsdCZ5bil7dmFyIGw9ZSxzPXU7XG5lPXU9WX12YXIgaD1jP1k6QXMobikscD1bbix0LHIsZSx1LGwscyxpLG8sZl07aWYoaCYmTmkocCxoKSxuPXBbMF0sdD1wWzFdLHI9cFsyXSxlPXBbM10sdT1wWzRdLGY9cFs5XT1wWzldPT09WT9jPzA6bi5sZW5ndGg6S2wocFs5XS1hLDApLCFmJiZ0Jihfbnx2bikmJih0Jj1+KF9ufHZuKSksdCYmdCE9c24pXz10PT1fbnx8dD09dm4/VnUobix0LGYpOnQhPWduJiZ0IT0oc258Z24pfHx1Lmxlbmd0aD9KdS5hcHBseShZLHApOnRpKG4sdCxyLGUpO2Vsc2UgdmFyIF89UHUobix0LHIpO3JldHVybiBIaSgoaD9iczp6cykoXyxwKSxuLHQpfWZ1bmN0aW9uIGNpKG4sdCxyLGUpe3JldHVybiBuPT09WXx8S2YobixfbFtyXSkmJiF5bC5jYWxsKGUscik/dDpufWZ1bmN0aW9uIGFpKG4sdCxyLGUsdSxpKXtyZXR1cm4gaWMobikmJmljKHQpJiYoaS5zZXQodCxuKSxxZShuLHQsWSxhaSxpKSxpLmRlbGV0ZSh0KSksbn1mdW5jdGlvbiBsaShuKXtyZXR1cm4gX2Mobik/WTpufWZ1bmN0aW9uIHNpKG4sdCxyLGUsdSxpKXtcbnZhciBvPXImYW4sZj1uLmxlbmd0aCxjPXQubGVuZ3RoO2lmKGYhPWMmJiEobyYmYz5mKSlyZXR1cm4hMTt2YXIgYT1pLmdldChuKSxsPWkuZ2V0KHQpO2lmKGEmJmwpcmV0dXJuIGE9PXQmJmw9PW47dmFyIHM9LTEscD0hMCxfPXImbG4/bmV3IHZyOlk7Zm9yKGkuc2V0KG4sdCksaS5zZXQodCxuKTsrK3M8Zjspe3ZhciB2PW5bc10sZz10W3NdO2lmKGUpdmFyIHk9bz9lKGcsdixzLHQsbixpKTplKHYsZyxzLG4sdCxpKTtpZih5IT09WSl7aWYoeSljb250aW51ZTtwPSExO2JyZWFrfWlmKF8pe2lmKCFoKHQsZnVuY3Rpb24obix0KXtpZighRShfLHQpJiYodj09PW58fHUodixuLHIsZSxpKSkpcmV0dXJuIF8ucHVzaCh0KX0pKXtwPSExO2JyZWFrfX1lbHNlIGlmKHYhPT1nJiYhdSh2LGcscixlLGkpKXtwPSExO2JyZWFrfX1yZXR1cm4gaS5kZWxldGUobiksaS5kZWxldGUodCkscH1mdW5jdGlvbiBoaShuLHQscixlLHUsaSxvKXtzd2l0Y2gocil7Y2FzZSBpdDppZihuLmJ5dGVMZW5ndGghPXQuYnl0ZUxlbmd0aHx8bi5ieXRlT2Zmc2V0IT10LmJ5dGVPZmZzZXQpcmV0dXJuITE7XG5uPW4uYnVmZmVyLHQ9dC5idWZmZXI7Y2FzZSB1dDpyZXR1cm4hKG4uYnl0ZUxlbmd0aCE9dC5ieXRlTGVuZ3RofHwhaShuZXcgT2wobiksbmV3IE9sKHQpKSk7Y2FzZSBEbjpjYXNlIE1uOmNhc2UgS246cmV0dXJuIEtmKCtuLCt0KTtjYXNlIE5uOnJldHVybiBuLm5hbWU9PXQubmFtZSYmbi5tZXNzYWdlPT10Lm1lc3NhZ2U7Y2FzZSBZbjpjYXNlIFhuOnJldHVybiBuPT10K1wiXCI7Y2FzZSBabjp2YXIgZj1EO2Nhc2UgUW46dmFyIGM9ZSZhbjtpZihmfHwoZj1OKSxuLnNpemUhPXQuc2l6ZSYmIWMpcmV0dXJuITE7dmFyIGE9by5nZXQobik7aWYoYSlyZXR1cm4gYT09dDtlfD1sbixvLnNldChuLHQpO3ZhciBsPXNpKGYobiksZih0KSxlLHUsaSxvKTtyZXR1cm4gby5kZWxldGUobiksbDtjYXNlIG50OmlmKGhzKXJldHVybiBocy5jYWxsKG4pPT1ocy5jYWxsKHQpfXJldHVybiExfWZ1bmN0aW9uIHBpKG4sdCxyLGUsdSxpKXt2YXIgbz1yJmFuLGY9dmkobiksYz1mLmxlbmd0aDtpZihjIT12aSh0KS5sZW5ndGgmJiFvKXJldHVybiExO1xuZm9yKHZhciBhPWM7YS0tOyl7dmFyIGw9ZlthXTtpZighKG8/bCBpbiB0OnlsLmNhbGwodCxsKSkpcmV0dXJuITF9dmFyIHM9aS5nZXQobiksaD1pLmdldCh0KTtpZihzJiZoKXJldHVybiBzPT10JiZoPT1uO3ZhciBwPSEwO2kuc2V0KG4sdCksaS5zZXQodCxuKTtmb3IodmFyIF89bzsrK2E8Yzspe2w9ZlthXTt2YXIgdj1uW2xdLGc9dFtsXTtpZihlKXZhciB5PW8/ZShnLHYsbCx0LG4saSk6ZSh2LGcsbCxuLHQsaSk7aWYoISh5PT09WT92PT09Z3x8dSh2LGcscixlLGkpOnkpKXtwPSExO2JyZWFrfV98fChfPVwiY29uc3RydWN0b3JcIj09bCl9aWYocCYmIV8pe3ZhciBkPW4uY29uc3RydWN0b3IsYj10LmNvbnN0cnVjdG9yO2QhPWImJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHQmJiEoXCJmdW5jdGlvblwiPT10eXBlb2YgZCYmZCBpbnN0YW5jZW9mIGQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGImJmIgaW5zdGFuY2VvZiBiKSYmKHA9ITEpfXJldHVybiBpLmRlbGV0ZShuKSxcbmkuZGVsZXRlKHQpLHB9ZnVuY3Rpb24gX2kobil7cmV0dXJuIFNzKFppKG4sWSxobyksbitcIlwiKX1mdW5jdGlvbiB2aShuKXtyZXR1cm4geWUobixGYyxrcyl9ZnVuY3Rpb24gZ2kobil7cmV0dXJuIHllKG4sTmMsT3MpfWZ1bmN0aW9uIHlpKG4pe2Zvcih2YXIgdD1uLm5hbWUrXCJcIixyPWlzW3RdLGU9eWwuY2FsbChpcyx0KT9yLmxlbmd0aDowO2UtLTspe3ZhciB1PXJbZV0saT11LmZ1bmM7aWYobnVsbD09aXx8aT09bilyZXR1cm4gdS5uYW1lfXJldHVybiB0fWZ1bmN0aW9uIGRpKG4pe3JldHVybih5bC5jYWxsKHEsXCJwbGFjZWhvbGRlclwiKT9xOm4pLnBsYWNlaG9sZGVyfWZ1bmN0aW9uIGJpKCl7dmFyIG49cS5pdGVyYXRlZXx8V2E7cmV0dXJuIG49bj09PVdhP1RlOm4sYXJndW1lbnRzLmxlbmd0aD9uKGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0pOm59ZnVuY3Rpb24gd2kobix0KXt2YXIgcj1uLl9fZGF0YV9fO3JldHVybiBVaSh0KT9yW1wic3RyaW5nXCI9PXR5cGVvZiB0P1wic3RyaW5nXCI6XCJoYXNoXCJdOnIubWFwO1xufWZ1bmN0aW9uIG1pKG4pe2Zvcih2YXIgdD1GYyhuKSxyPXQubGVuZ3RoO3ItLTspe3ZhciBlPXRbcl0sdT1uW2VdO3Rbcl09W2UsdSxEaSh1KV19cmV0dXJuIHR9ZnVuY3Rpb24geGkobix0KXt2YXIgcj1VKG4sdCk7cmV0dXJuIExlKHIpP3I6WX1mdW5jdGlvbiBqaShuKXt2YXIgdD15bC5jYWxsKG4sQ2wpLHI9bltDbF07dHJ5e25bQ2xdPVk7dmFyIGU9ITB9Y2F0Y2gobil7fXZhciB1PXdsLmNhbGwobik7cmV0dXJuIGUmJih0P25bQ2xdPXI6ZGVsZXRlIG5bQ2xdKSx1fWZ1bmN0aW9uIEFpKG4sdCxyKXtmb3IodmFyIGU9LTEsdT1yLmxlbmd0aDsrK2U8dTspe3ZhciBpPXJbZV0sbz1pLnNpemU7c3dpdGNoKGkudHlwZSl7Y2FzZVwiZHJvcFwiOm4rPW87YnJlYWs7Y2FzZVwiZHJvcFJpZ2h0XCI6dC09bzticmVhaztjYXNlXCJ0YWtlXCI6dD1WbCh0LG4rbyk7YnJlYWs7Y2FzZVwidGFrZVJpZ2h0XCI6bj1LbChuLHQtbyl9fXJldHVybntzdGFydDpuLGVuZDp0fX1mdW5jdGlvbiBraShuKXt2YXIgdD1uLm1hdGNoKEN0KTtcbnJldHVybiB0P3RbMV0uc3BsaXQoVXQpOltdfWZ1bmN0aW9uIE9pKG4sdCxyKXt0PWp1KHQsbik7Zm9yKHZhciBlPS0xLHU9dC5sZW5ndGgsaT0hMTsrK2U8dTspe3ZhciBvPVFpKHRbZV0pO2lmKCEoaT1udWxsIT1uJiZyKG4sbykpKWJyZWFrO249bltvXX1yZXR1cm4gaXx8KytlIT11P2k6KHU9bnVsbD09bj8wOm4ubGVuZ3RoLCEhdSYmdWModSkmJldpKG8sdSkmJih5aChuKXx8Z2gobikpKX1mdW5jdGlvbiBJaShuKXt2YXIgdD1uLmxlbmd0aCxyPW5ldyBuLmNvbnN0cnVjdG9yKHQpO3JldHVybiB0JiZcInN0cmluZ1wiPT10eXBlb2YgblswXSYmeWwuY2FsbChuLFwiaW5kZXhcIikmJihyLmluZGV4PW4uaW5kZXgsci5pbnB1dD1uLmlucHV0KSxyfWZ1bmN0aW9uIFJpKG4pe3JldHVyblwiZnVuY3Rpb25cIiE9dHlwZW9mIG4uY29uc3RydWN0b3J8fCRpKG4pP3t9Ol9zKFJsKG4pKX1mdW5jdGlvbiB6aShuLHQscil7dmFyIGU9bi5jb25zdHJ1Y3Rvcjtzd2l0Y2godCl7Y2FzZSB1dDpyZXR1cm4gT3Uobik7XG5jYXNlIERuOmNhc2UgTW46cmV0dXJuIG5ldyBlKCtuKTtjYXNlIGl0OnJldHVybiBJdShuLHIpO2Nhc2Ugb3Q6Y2FzZSBmdDpjYXNlIGN0OmNhc2UgYXQ6Y2FzZSBsdDpjYXNlIHN0OmNhc2UgaHQ6Y2FzZSBwdDpjYXNlIF90OnJldHVybiBFdShuLHIpO2Nhc2UgWm46cmV0dXJuIG5ldyBlO2Nhc2UgS246Y2FzZSBYbjpyZXR1cm4gbmV3IGUobik7Y2FzZSBZbjpyZXR1cm4gUnUobik7Y2FzZSBRbjpyZXR1cm4gbmV3IGU7Y2FzZSBudDpyZXR1cm4genUobil9fWZ1bmN0aW9uIEVpKG4sdCl7dmFyIHI9dC5sZW5ndGg7aWYoIXIpcmV0dXJuIG47dmFyIGU9ci0xO3JldHVybiB0W2VdPShyPjE/XCImIFwiOlwiXCIpK3RbZV0sdD10LmpvaW4ocj4yP1wiLCBcIjpcIiBcIiksbi5yZXBsYWNlKEx0LFwie1xcbi8qIFt3cmFwcGVkIHdpdGggXCIrdCtcIl0gKi9cXG5cIil9ZnVuY3Rpb24gU2kobil7cmV0dXJuIHloKG4pfHxnaChuKXx8ISEoV2wmJm4mJm5bV2xdKX1mdW5jdGlvbiBXaShuLHQpe3ZhciByPXR5cGVvZiBuO1xucmV0dXJuIHQ9bnVsbD09dD96bjp0LCEhdCYmKFwibnVtYmVyXCI9PXJ8fFwic3ltYm9sXCIhPXImJnF0LnRlc3QobikpJiZuPi0xJiZuJTE9PTAmJm48dH1mdW5jdGlvbiBMaShuLHQscil7aWYoIWljKHIpKXJldHVybiExO3ZhciBlPXR5cGVvZiB0O3JldHVybiEhKFwibnVtYmVyXCI9PWU/VmYocikmJldpKHQsci5sZW5ndGgpOlwic3RyaW5nXCI9PWUmJnQgaW4gcikmJktmKHJbdF0sbil9ZnVuY3Rpb24gQ2kobix0KXtpZih5aChuKSlyZXR1cm4hMTt2YXIgcj10eXBlb2YgbjtyZXR1cm4hKFwibnVtYmVyXCIhPXImJlwic3ltYm9sXCIhPXImJlwiYm9vbGVhblwiIT1yJiZudWxsIT1uJiYheWMobikpfHwoT3QudGVzdChuKXx8IWt0LnRlc3Qobil8fG51bGwhPXQmJm4gaW4gY2wodCkpfWZ1bmN0aW9uIFVpKG4pe3ZhciB0PXR5cGVvZiBuO3JldHVyblwic3RyaW5nXCI9PXR8fFwibnVtYmVyXCI9PXR8fFwic3ltYm9sXCI9PXR8fFwiYm9vbGVhblwiPT10P1wiX19wcm90b19fXCIhPT1uOm51bGw9PT1ufWZ1bmN0aW9uIEJpKG4pe1xudmFyIHQ9eWkobikscj1xW3RdO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHJ8fCEodCBpbiBCdC5wcm90b3R5cGUpKXJldHVybiExO2lmKG49PT1yKXJldHVybiEwO3ZhciBlPUFzKHIpO3JldHVybiEhZSYmbj09PWVbMF19ZnVuY3Rpb24gVGkobil7cmV0dXJuISFibCYmYmwgaW4gbn1mdW5jdGlvbiAkaShuKXt2YXIgdD1uJiZuLmNvbnN0cnVjdG9yO3JldHVybiBuPT09KFwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnQucHJvdG90eXBlfHxfbCl9ZnVuY3Rpb24gRGkobil7cmV0dXJuIG49PT1uJiYhaWMobil9ZnVuY3Rpb24gTWkobix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIG51bGwhPXImJihyW25dPT09dCYmKHQhPT1ZfHxuIGluIGNsKHIpKSl9fWZ1bmN0aW9uIEZpKG4pe3ZhciB0PVdmKG4sZnVuY3Rpb24obil7cmV0dXJuIHIuc2l6ZT09PWVuJiZyLmNsZWFyKCksbn0pLHI9dC5jYWNoZTtyZXR1cm4gdH1mdW5jdGlvbiBOaShuLHQpe3ZhciByPW5bMV0sZT10WzFdLHU9cnxlLGk9dTwoc258aG58ZG4pLG89ZT09ZG4mJnI9PV9ufHxlPT1kbiYmcj09Ym4mJm5bN10ubGVuZ3RoPD10WzhdfHxlPT0oZG58Ym4pJiZ0WzddLmxlbmd0aDw9dFs4XSYmcj09X247XG5pZighaSYmIW8pcmV0dXJuIG47ZSZzbiYmKG5bMl09dFsyXSx1fD1yJnNuPzA6cG4pO3ZhciBmPXRbM107aWYoZil7dmFyIGM9blszXTtuWzNdPWM/THUoYyxmLHRbNF0pOmYsbls0XT1jP0YoblszXSx1bik6dFs0XX1yZXR1cm4gZj10WzVdLGYmJihjPW5bNV0sbls1XT1jP0N1KGMsZix0WzZdKTpmLG5bNl09Yz9GKG5bNV0sdW4pOnRbNl0pLGY9dFs3XSxmJiYobls3XT1mKSxlJmRuJiYobls4XT1udWxsPT1uWzhdP3RbOF06Vmwobls4XSx0WzhdKSksbnVsbD09bls5XSYmKG5bOV09dFs5XSksblswXT10WzBdLG5bMV09dSxufWZ1bmN0aW9uIFBpKG4pe3ZhciB0PVtdO2lmKG51bGwhPW4pZm9yKHZhciByIGluIGNsKG4pKXQucHVzaChyKTtyZXR1cm4gdH1mdW5jdGlvbiBxaShuKXtyZXR1cm4gd2wuY2FsbChuKX1mdW5jdGlvbiBaaSh0LHIsZSl7cmV0dXJuIHI9S2wocj09PVk/dC5sZW5ndGgtMTpyLDApLGZ1bmN0aW9uKCl7Zm9yKHZhciB1PWFyZ3VtZW50cyxpPS0xLG89S2wodS5sZW5ndGgtciwwKSxmPWVsKG8pOysraTxvOylmW2ldPXVbcitpXTtcbmk9LTE7Zm9yKHZhciBjPWVsKHIrMSk7KytpPHI7KWNbaV09dVtpXTtyZXR1cm4gY1tyXT1lKGYpLG4odCx0aGlzLGMpfX1mdW5jdGlvbiBLaShuLHQpe3JldHVybiB0Lmxlbmd0aDwyP246dmUobixmdSh0LDAsLTEpKX1mdW5jdGlvbiBWaShuLHQpe2Zvcih2YXIgcj1uLmxlbmd0aCxlPVZsKHQubGVuZ3RoLHIpLHU9VXUobik7ZS0tOyl7dmFyIGk9dFtlXTtuW2VdPVdpKGkscik/dVtpXTpZfXJldHVybiBufWZ1bmN0aW9uIEdpKG4sdCl7aWYoKFwiY29uc3RydWN0b3JcIiE9PXR8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG5bdF0pJiZcIl9fcHJvdG9fX1wiIT10KXJldHVybiBuW3RdfWZ1bmN0aW9uIEhpKG4sdCxyKXt2YXIgZT10K1wiXCI7cmV0dXJuIFNzKG4sRWkoZSxubyhraShlKSxyKSkpfWZ1bmN0aW9uIEppKG4pe3ZhciB0PTAscj0wO3JldHVybiBmdW5jdGlvbigpe3ZhciBlPUdsKCksdT1Bbi0oZS1yKTtpZihyPWUsdT4wKXtpZigrK3Q+PWpuKXJldHVybiBhcmd1bWVudHNbMF19ZWxzZSB0PTA7XG5yZXR1cm4gbi5hcHBseShZLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIFlpKG4sdCl7dmFyIHI9LTEsZT1uLmxlbmd0aCx1PWUtMTtmb3IodD10PT09WT9lOnQ7KytyPHQ7KXt2YXIgaT1YZShyLHUpLG89bltpXTtuW2ldPW5bcl0sbltyXT1vfXJldHVybiBuLmxlbmd0aD10LG59ZnVuY3Rpb24gUWkobil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG58fHljKG4pKXJldHVybiBuO3ZhciB0PW4rXCJcIjtyZXR1cm5cIjBcIj09dCYmMS9uPT0tUm4/XCItMFwiOnR9ZnVuY3Rpb24gWGkobil7aWYobnVsbCE9bil7dHJ5e3JldHVybiBnbC5jYWxsKG4pfWNhdGNoKG4pe310cnl7cmV0dXJuIG4rXCJcIn1jYXRjaChuKXt9fXJldHVyblwiXCJ9ZnVuY3Rpb24gbm8obix0KXtyZXR1cm4gcihVbixmdW5jdGlvbihyKXt2YXIgZT1cIl8uXCIrclswXTt0JnJbMV0mJiFvKG4sZSkmJm4ucHVzaChlKX0pLG4uc29ydCgpfWZ1bmN0aW9uIHRvKG4pe2lmKG4gaW5zdGFuY2VvZiBCdClyZXR1cm4gbi5jbG9uZSgpO3ZhciB0PW5ldyBIKG4uX193cmFwcGVkX18sbi5fX2NoYWluX18pO1xucmV0dXJuIHQuX19hY3Rpb25zX189VXUobi5fX2FjdGlvbnNfXyksdC5fX2luZGV4X189bi5fX2luZGV4X18sdC5fX3ZhbHVlc19fPW4uX192YWx1ZXNfXyx0fWZ1bmN0aW9uIHJvKG4sdCxyKXt0PShyP0xpKG4sdCxyKTp0PT09WSk/MTpLbChqYyh0KSwwKTt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7aWYoIWV8fHQ8MSlyZXR1cm5bXTtmb3IodmFyIHU9MCxpPTAsbz1lbChEbChlL3QpKTt1PGU7KW9baSsrXT1mdShuLHUsdSs9dCk7cmV0dXJuIG99ZnVuY3Rpb24gZW8obil7Zm9yKHZhciB0PS0xLHI9bnVsbD09bj8wOm4ubGVuZ3RoLGU9MCx1PVtdOysrdDxyOyl7dmFyIGk9blt0XTtpJiYodVtlKytdPWkpfXJldHVybiB1fWZ1bmN0aW9uIHVvKCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aDtpZighbilyZXR1cm5bXTtmb3IodmFyIHQ9ZWwobi0xKSxyPWFyZ3VtZW50c1swXSxlPW47ZS0tOyl0W2UtMV09YXJndW1lbnRzW2VdO3JldHVybiBhKHloKHIpP1V1KHIpOltyXSx0ZSh0LDEpKTtcbn1mdW5jdGlvbiBpbyhuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyh0PXJ8fHQ9PT1ZPzE6amModCksZnUobix0PDA/MDp0LGUpKTpbXX1mdW5jdGlvbiBvbyhuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyh0PXJ8fHQ9PT1ZPzE6amModCksdD1lLXQsZnUobiwwLHQ8MD8wOnQpKTpbXX1mdW5jdGlvbiBmbyhuLHQpe3JldHVybiBuJiZuLmxlbmd0aD95dShuLGJpKHQsMyksITAsITApOltdfWZ1bmN0aW9uIGNvKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP3l1KG4sYmkodCwzKSwhMCk6W119ZnVuY3Rpb24gYW8obix0LHIsZSl7dmFyIHU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiB1PyhyJiZcIm51bWJlclwiIT10eXBlb2YgciYmTGkobix0LHIpJiYocj0wLGU9dSksUXIobix0LHIsZSkpOltdfWZ1bmN0aW9uIGxvKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7aWYoIWUpcmV0dXJuLTE7dmFyIHU9bnVsbD09cj8wOmpjKHIpO1xucmV0dXJuIHU8MCYmKHU9S2woZSt1LDApKSxnKG4sYmkodCwzKSx1KX1mdW5jdGlvbiBzbyhuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO2lmKCFlKXJldHVybi0xO3ZhciB1PWUtMTtyZXR1cm4gciE9PVkmJih1PWpjKHIpLHU9cjwwP0tsKGUrdSwwKTpWbCh1LGUtMSkpLGcobixiaSh0LDMpLHUsITApfWZ1bmN0aW9uIGhvKG4pe3JldHVybihudWxsPT1uPzA6bi5sZW5ndGgpP3RlKG4sMSk6W119ZnVuY3Rpb24gcG8obil7cmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/dGUobixSbik6W119ZnVuY3Rpb24gX28obix0KXtyZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT8odD10PT09WT8xOmpjKHQpLHRlKG4sdCkpOltdfWZ1bmN0aW9uIHZvKG4pe2Zvcih2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aCxlPXt9OysrdDxyOyl7dmFyIHU9blt0XTtlW3VbMF1dPXVbMV19cmV0dXJuIGV9ZnVuY3Rpb24gZ28obil7cmV0dXJuIG4mJm4ubGVuZ3RoP25bMF06WX1mdW5jdGlvbiB5byhuLHQscil7XG52YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7aWYoIWUpcmV0dXJuLTE7dmFyIHU9bnVsbD09cj8wOmpjKHIpO3JldHVybiB1PDAmJih1PUtsKGUrdSwwKSkseShuLHQsdSl9ZnVuY3Rpb24gYm8obil7cmV0dXJuKG51bGw9PW4/MDpuLmxlbmd0aCk/ZnUobiwwLC0xKTpbXX1mdW5jdGlvbiB3byhuLHQpe3JldHVybiBudWxsPT1uP1wiXCI6cWwuY2FsbChuLHQpfWZ1bmN0aW9uIG1vKG4pe3ZhciB0PW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gdD9uW3QtMV06WX1mdW5jdGlvbiB4byhuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO2lmKCFlKXJldHVybi0xO3ZhciB1PWU7cmV0dXJuIHIhPT1ZJiYodT1qYyhyKSx1PXU8MD9LbChlK3UsMCk6VmwodSxlLTEpKSx0PT09dD9aKG4sdCx1KTpnKG4sYix1LCEwKX1mdW5jdGlvbiBqbyhuLHQpe3JldHVybiBuJiZuLmxlbmd0aD9LZShuLGpjKHQpKTpZfWZ1bmN0aW9uIEFvKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoJiZ0JiZ0Lmxlbmd0aD9ZZShuLHQpOm47XG59ZnVuY3Rpb24ga28obix0LHIpe3JldHVybiBuJiZuLmxlbmd0aCYmdCYmdC5sZW5ndGg/WWUobix0LGJpKHIsMikpOm59ZnVuY3Rpb24gT28obix0LHIpe3JldHVybiBuJiZuLmxlbmd0aCYmdCYmdC5sZW5ndGg/WWUobix0LFkscik6bn1mdW5jdGlvbiBJbyhuLHQpe3ZhciByPVtdO2lmKCFufHwhbi5sZW5ndGgpcmV0dXJuIHI7dmFyIGU9LTEsdT1bXSxpPW4ubGVuZ3RoO2Zvcih0PWJpKHQsMyk7KytlPGk7KXt2YXIgbz1uW2VdO3QobyxlLG4pJiYoci5wdXNoKG8pLHUucHVzaChlKSl9cmV0dXJuIFFlKG4sdSkscn1mdW5jdGlvbiBSbyhuKXtyZXR1cm4gbnVsbD09bj9uOllsLmNhbGwobil9ZnVuY3Rpb24gem8obix0LHIpe3ZhciBlPW51bGw9PW4/MDpuLmxlbmd0aDtyZXR1cm4gZT8ociYmXCJudW1iZXJcIiE9dHlwZW9mIHImJkxpKG4sdCxyKT8odD0wLHI9ZSk6KHQ9bnVsbD09dD8wOmpjKHQpLHI9cj09PVk/ZTpqYyhyKSksZnUobix0LHIpKTpbXX1mdW5jdGlvbiBFbyhuLHQpe1xucmV0dXJuIGF1KG4sdCl9ZnVuY3Rpb24gU28obix0LHIpe3JldHVybiBsdShuLHQsYmkociwyKSl9ZnVuY3Rpb24gV28obix0KXt2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGg7aWYocil7dmFyIGU9YXUobix0KTtpZihlPHImJktmKG5bZV0sdCkpcmV0dXJuIGV9cmV0dXJuLTF9ZnVuY3Rpb24gTG8obix0KXtyZXR1cm4gYXUobix0LCEwKX1mdW5jdGlvbiBDbyhuLHQscil7cmV0dXJuIGx1KG4sdCxiaShyLDIpLCEwKX1mdW5jdGlvbiBVbyhuLHQpe2lmKG51bGw9PW4/MDpuLmxlbmd0aCl7dmFyIHI9YXUobix0LCEwKS0xO2lmKEtmKG5bcl0sdCkpcmV0dXJuIHJ9cmV0dXJuLTF9ZnVuY3Rpb24gQm8obil7cmV0dXJuIG4mJm4ubGVuZ3RoP3N1KG4pOltdfWZ1bmN0aW9uIFRvKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP3N1KG4sYmkodCwyKSk6W119ZnVuY3Rpb24gJG8obil7dmFyIHQ9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiB0P2Z1KG4sMSx0KTpbXX1mdW5jdGlvbiBEbyhuLHQscil7XG5yZXR1cm4gbiYmbi5sZW5ndGg/KHQ9cnx8dD09PVk/MTpqYyh0KSxmdShuLDAsdDwwPzA6dCkpOltdfWZ1bmN0aW9uIE1vKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIGU/KHQ9cnx8dD09PVk/MTpqYyh0KSx0PWUtdCxmdShuLHQ8MD8wOnQsZSkpOltdfWZ1bmN0aW9uIEZvKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP3l1KG4sYmkodCwzKSwhMSwhMCk6W119ZnVuY3Rpb24gTm8obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/eXUobixiaSh0LDMpKTpbXX1mdW5jdGlvbiBQbyhuKXtyZXR1cm4gbiYmbi5sZW5ndGg/X3Uobik6W119ZnVuY3Rpb24gcW8obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/X3UobixiaSh0LDIpKTpbXX1mdW5jdGlvbiBabyhuLHQpe3JldHVybiB0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dDpZLG4mJm4ubGVuZ3RoP191KG4sWSx0KTpbXX1mdW5jdGlvbiBLbyhuKXtpZighbnx8IW4ubGVuZ3RoKXJldHVybltdO3ZhciB0PTA7cmV0dXJuIG49aShuLGZ1bmN0aW9uKG4pe1xuaWYoR2YobikpcmV0dXJuIHQ9S2wobi5sZW5ndGgsdCksITB9KSxPKHQsZnVuY3Rpb24odCl7cmV0dXJuIGMobixtKHQpKX0pfWZ1bmN0aW9uIFZvKHQscil7aWYoIXR8fCF0Lmxlbmd0aClyZXR1cm5bXTt2YXIgZT1Lbyh0KTtyZXR1cm4gbnVsbD09cj9lOmMoZSxmdW5jdGlvbih0KXtyZXR1cm4gbihyLFksdCl9KX1mdW5jdGlvbiBHbyhuLHQpe3JldHVybiB3dShufHxbXSx0fHxbXSx6cil9ZnVuY3Rpb24gSG8obix0KXtyZXR1cm4gd3Uobnx8W10sdHx8W10saXUpfWZ1bmN0aW9uIEpvKG4pe3ZhciB0PXEobik7cmV0dXJuIHQuX19jaGFpbl9fPSEwLHR9ZnVuY3Rpb24gWW8obix0KXtyZXR1cm4gdChuKSxufWZ1bmN0aW9uIFFvKG4sdCl7cmV0dXJuIHQobil9ZnVuY3Rpb24gWG8oKXtyZXR1cm4gSm8odGhpcyl9ZnVuY3Rpb24gbmYoKXtyZXR1cm4gbmV3IEgodGhpcy52YWx1ZSgpLHRoaXMuX19jaGFpbl9fKX1mdW5jdGlvbiB0Zigpe3RoaXMuX192YWx1ZXNfXz09PVkmJih0aGlzLl9fdmFsdWVzX189bWModGhpcy52YWx1ZSgpKSk7XG52YXIgbj10aGlzLl9faW5kZXhfXz49dGhpcy5fX3ZhbHVlc19fLmxlbmd0aDtyZXR1cm57ZG9uZTpuLHZhbHVlOm4/WTp0aGlzLl9fdmFsdWVzX19bdGhpcy5fX2luZGV4X18rK119fWZ1bmN0aW9uIHJmKCl7cmV0dXJuIHRoaXN9ZnVuY3Rpb24gZWYobil7Zm9yKHZhciB0LHI9dGhpcztyIGluc3RhbmNlb2YgRzspe3ZhciBlPXRvKHIpO2UuX19pbmRleF9fPTAsZS5fX3ZhbHVlc19fPVksdD91Ll9fd3JhcHBlZF9fPWU6dD1lO3ZhciB1PWU7cj1yLl9fd3JhcHBlZF9ffXJldHVybiB1Ll9fd3JhcHBlZF9fPW4sdH1mdW5jdGlvbiB1Zigpe3ZhciBuPXRoaXMuX193cmFwcGVkX187aWYobiBpbnN0YW5jZW9mIEJ0KXt2YXIgdD1uO3JldHVybiB0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCYmKHQ9bmV3IEJ0KHRoaXMpKSx0PXQucmV2ZXJzZSgpLHQuX19hY3Rpb25zX18ucHVzaCh7ZnVuYzpRbyxhcmdzOltSb10sdGhpc0FyZzpZfSksbmV3IEgodCx0aGlzLl9fY2hhaW5fXyl9cmV0dXJuIHRoaXMudGhydShSbyk7XG59ZnVuY3Rpb24gb2YoKXtyZXR1cm4gZHUodGhpcy5fX3dyYXBwZWRfXyx0aGlzLl9fYWN0aW9uc19fKX1mdW5jdGlvbiBmZihuLHQscil7dmFyIGU9eWgobik/dTpHcjtyZXR1cm4gciYmTGkobix0LHIpJiYodD1ZKSxlKG4sYmkodCwzKSl9ZnVuY3Rpb24gY2Yobix0KXtyZXR1cm4oeWgobik/aTpuZSkobixiaSh0LDMpKX1mdW5jdGlvbiBhZihuLHQpe3JldHVybiB0ZSh2ZihuLHQpLDEpfWZ1bmN0aW9uIGxmKG4sdCl7cmV0dXJuIHRlKHZmKG4sdCksUm4pfWZ1bmN0aW9uIHNmKG4sdCxyKXtyZXR1cm4gcj1yPT09WT8xOmpjKHIpLHRlKHZmKG4sdCkscil9ZnVuY3Rpb24gaGYobix0KXtyZXR1cm4oeWgobik/cjp2cykobixiaSh0LDMpKX1mdW5jdGlvbiBwZihuLHQpe3JldHVybih5aChuKT9lOmdzKShuLGJpKHQsMykpfWZ1bmN0aW9uIF9mKG4sdCxyLGUpe249VmYobik/bjpuYShuKSxyPXImJiFlP2pjKHIpOjA7dmFyIHU9bi5sZW5ndGg7cmV0dXJuIHI8MCYmKHI9S2wodStyLDApKSxcbmdjKG4pP3I8PXUmJm4uaW5kZXhPZih0LHIpPi0xOiEhdSYmeShuLHQscik+LTF9ZnVuY3Rpb24gdmYobix0KXtyZXR1cm4oeWgobik/YzpGZSkobixiaSh0LDMpKX1mdW5jdGlvbiBnZihuLHQscixlKXtyZXR1cm4gbnVsbD09bj9bXTooeWgodCl8fCh0PW51bGw9PXQ/W106W3RdKSxyPWU/WTpyLHloKHIpfHwocj1udWxsPT1yP1tdOltyXSksVmUobix0LHIpKX1mdW5jdGlvbiB5ZihuLHQscil7dmFyIGU9eWgobik/bDpqLHU9YXJndW1lbnRzLmxlbmd0aDwzO3JldHVybiBlKG4sYmkodCw0KSxyLHUsdnMpfWZ1bmN0aW9uIGRmKG4sdCxyKXt2YXIgZT15aChuKT9zOmosdT1hcmd1bWVudHMubGVuZ3RoPDM7cmV0dXJuIGUobixiaSh0LDQpLHIsdSxncyl9ZnVuY3Rpb24gYmYobix0KXtyZXR1cm4oeWgobik/aTpuZSkobixMZihiaSh0LDMpKSl9ZnVuY3Rpb24gd2Yobil7cmV0dXJuKHloKG4pP2tyOmV1KShuKX1mdW5jdGlvbiBtZihuLHQscil7cmV0dXJuIHQ9KHI/TGkobix0LHIpOnQ9PT1ZKT8xOmpjKHQpLFxuKHloKG4pP09yOnV1KShuLHQpfWZ1bmN0aW9uIHhmKG4pe3JldHVybih5aChuKT9JcjpvdSkobil9ZnVuY3Rpb24gamYobil7aWYobnVsbD09bilyZXR1cm4gMDtpZihWZihuKSlyZXR1cm4gZ2Mobik/SyhuKTpuLmxlbmd0aDt2YXIgdD1JcyhuKTtyZXR1cm4gdD09Wm58fHQ9PVFuP24uc2l6ZTokZShuKS5sZW5ndGh9ZnVuY3Rpb24gQWYobix0LHIpe3ZhciBlPXloKG4pP2g6Y3U7cmV0dXJuIHImJkxpKG4sdCxyKSYmKHQ9WSksZShuLGJpKHQsMykpfWZ1bmN0aW9uIGtmKG4sdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgc2wodG4pO3JldHVybiBuPWpjKG4pLGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1mdW5jdGlvbiBPZihuLHQscil7cmV0dXJuIHQ9cj9ZOnQsdD1uJiZudWxsPT10P24ubGVuZ3RoOnQsZmkobixkbixZLFksWSxZLHQpfWZ1bmN0aW9uIElmKG4sdCl7dmFyIHI7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgc2wodG4pO1xucmV0dXJuIG49amMobiksZnVuY3Rpb24oKXtyZXR1cm4tLW4+MCYmKHI9dC5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJih0PVkpLHJ9fWZ1bmN0aW9uIFJmKG4sdCxyKXt0PXI/WTp0O3ZhciBlPWZpKG4sX24sWSxZLFksWSxZLHQpO3JldHVybiBlLnBsYWNlaG9sZGVyPVJmLnBsYWNlaG9sZGVyLGV9ZnVuY3Rpb24gemYobix0LHIpe3Q9cj9ZOnQ7dmFyIGU9Zmkobix2bixZLFksWSxZLFksdCk7cmV0dXJuIGUucGxhY2Vob2xkZXI9emYucGxhY2Vob2xkZXIsZX1mdW5jdGlvbiBFZihuLHQscil7ZnVuY3Rpb24gZSh0KXt2YXIgcj1oLGU9cDtyZXR1cm4gaD1wPVksZD10LHY9bi5hcHBseShlLHIpfWZ1bmN0aW9uIHUobil7cmV0dXJuIGQ9bixnPUVzKGYsdCksYj9lKG4pOnZ9ZnVuY3Rpb24gaShuKXt2YXIgcj1uLXksZT1uLWQsdT10LXI7cmV0dXJuIHc/VmwodSxfLWUpOnV9ZnVuY3Rpb24gbyhuKXt2YXIgcj1uLXksZT1uLWQ7cmV0dXJuIHk9PT1ZfHxyPj10fHxyPDB8fHcmJmU+PV87XG59ZnVuY3Rpb24gZigpe3ZhciBuPWloKCk7cmV0dXJuIG8obik/YyhuKTooZz1FcyhmLGkobikpLFkpfWZ1bmN0aW9uIGMobil7cmV0dXJuIGc9WSxtJiZoP2Uobik6KGg9cD1ZLHYpfWZ1bmN0aW9uIGEoKXtnIT09WSYmeHMoZyksZD0wLGg9eT1wPWc9WX1mdW5jdGlvbiBsKCl7cmV0dXJuIGc9PT1ZP3Y6YyhpaCgpKX1mdW5jdGlvbiBzKCl7dmFyIG49aWgoKSxyPW8obik7aWYoaD1hcmd1bWVudHMscD10aGlzLHk9bixyKXtpZihnPT09WSlyZXR1cm4gdSh5KTtpZih3KXJldHVybiB4cyhnKSxnPUVzKGYsdCksZSh5KX1yZXR1cm4gZz09PVkmJihnPUVzKGYsdCkpLHZ9dmFyIGgscCxfLHYsZyx5LGQ9MCxiPSExLHc9ITEsbT0hMDtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IG5ldyBzbCh0bik7cmV0dXJuIHQ9a2ModCl8fDAsaWMocikmJihiPSEhci5sZWFkaW5nLHc9XCJtYXhXYWl0XCJpbiByLF89dz9LbChrYyhyLm1heFdhaXQpfHwwLHQpOl8sbT1cInRyYWlsaW5nXCJpbiByPyEhci50cmFpbGluZzptKSxcbnMuY2FuY2VsPWEscy5mbHVzaD1sLHN9ZnVuY3Rpb24gU2Yobil7cmV0dXJuIGZpKG4sd24pfWZ1bmN0aW9uIFdmKG4sdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbnx8bnVsbCE9dCYmXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgc2wodG4pO3ZhciByPWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLHU9dD90LmFwcGx5KHRoaXMsZSk6ZVswXSxpPXIuY2FjaGU7aWYoaS5oYXModSkpcmV0dXJuIGkuZ2V0KHUpO3ZhciBvPW4uYXBwbHkodGhpcyxlKTtyZXR1cm4gci5jYWNoZT1pLnNldCh1LG8pfHxpLG99O3JldHVybiByLmNhY2hlPW5ldyhXZi5DYWNoZXx8YXIpLHJ9ZnVuY3Rpb24gTGYobil7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbil0aHJvdyBuZXcgc2wodG4pO3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cztzd2l0Y2godC5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4hbi5jYWxsKHRoaXMpO2Nhc2UgMTpyZXR1cm4hbi5jYWxsKHRoaXMsdFswXSk7Y2FzZSAyOlxucmV0dXJuIW4uY2FsbCh0aGlzLHRbMF0sdFsxXSk7Y2FzZSAzOnJldHVybiFuLmNhbGwodGhpcyx0WzBdLHRbMV0sdFsyXSl9cmV0dXJuIW4uYXBwbHkodGhpcyx0KX19ZnVuY3Rpb24gQ2Yobil7cmV0dXJuIElmKDIsbil9ZnVuY3Rpb24gVWYobix0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IG5ldyBzbCh0bik7cmV0dXJuIHQ9dD09PVk/dDpqYyh0KSxydShuLHQpfWZ1bmN0aW9uIEJmKHQscil7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgc2wodG4pO3JldHVybiByPW51bGw9PXI/MDpLbChqYyhyKSwwKSxydShmdW5jdGlvbihlKXt2YXIgdT1lW3JdLGk9QXUoZSwwLHIpO3JldHVybiB1JiZhKGksdSksbih0LHRoaXMsaSl9KX1mdW5jdGlvbiBUZihuLHQscil7dmFyIGU9ITAsdT0hMDtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IG5ldyBzbCh0bik7cmV0dXJuIGljKHIpJiYoZT1cImxlYWRpbmdcImluIHI/ISFyLmxlYWRpbmc6ZSx1PVwidHJhaWxpbmdcImluIHI/ISFyLnRyYWlsaW5nOnUpLFxuRWYobix0LHtsZWFkaW5nOmUsbWF4V2FpdDp0LHRyYWlsaW5nOnV9KX1mdW5jdGlvbiAkZihuKXtyZXR1cm4gT2YobiwxKX1mdW5jdGlvbiBEZihuLHQpe3JldHVybiBzaCh4dSh0KSxuKX1mdW5jdGlvbiBNZigpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybltdO3ZhciBuPWFyZ3VtZW50c1swXTtyZXR1cm4geWgobik/bjpbbl19ZnVuY3Rpb24gRmYobil7cmV0dXJuIERyKG4sY24pfWZ1bmN0aW9uIE5mKG4sdCl7cmV0dXJuIHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgdD90OlksRHIobixjbix0KX1mdW5jdGlvbiBQZihuKXtyZXR1cm4gRHIobixvbnxjbil9ZnVuY3Rpb24gcWYobix0KXtyZXR1cm4gdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6WSxEcihuLG9ufGNuLHQpfWZ1bmN0aW9uIFpmKG4sdCl7cmV0dXJuIG51bGw9PXR8fFpyKG4sdCxGYyh0KSl9ZnVuY3Rpb24gS2Yobix0KXtyZXR1cm4gbj09PXR8fG4hPT1uJiZ0IT09dH1mdW5jdGlvbiBWZihuKXtyZXR1cm4gbnVsbCE9biYmdWMobi5sZW5ndGgpJiYhcmMobik7XG59ZnVuY3Rpb24gR2Yobil7cmV0dXJuIG9jKG4pJiZWZihuKX1mdW5jdGlvbiBIZihuKXtyZXR1cm4gbj09PSEwfHxuPT09ITF8fG9jKG4pJiZkZShuKT09RG59ZnVuY3Rpb24gSmYobil7cmV0dXJuIG9jKG4pJiYxPT09bi5ub2RlVHlwZSYmIV9jKG4pfWZ1bmN0aW9uIFlmKG4pe2lmKG51bGw9PW4pcmV0dXJuITA7aWYoVmYobikmJih5aChuKXx8XCJzdHJpbmdcIj09dHlwZW9mIG58fFwiZnVuY3Rpb25cIj09dHlwZW9mIG4uc3BsaWNlfHxiaChuKXx8QWgobil8fGdoKG4pKSlyZXR1cm4hbi5sZW5ndGg7dmFyIHQ9SXMobik7aWYodD09Wm58fHQ9PVFuKXJldHVybiFuLnNpemU7aWYoJGkobikpcmV0dXJuISRlKG4pLmxlbmd0aDtmb3IodmFyIHIgaW4gbilpZih5bC5jYWxsKG4scikpcmV0dXJuITE7cmV0dXJuITB9ZnVuY3Rpb24gUWYobix0KXtyZXR1cm4gemUobix0KX1mdW5jdGlvbiBYZihuLHQscil7cj1cImZ1bmN0aW9uXCI9PXR5cGVvZiByP3I6WTt2YXIgZT1yP3Iobix0KTpZO3JldHVybiBlPT09WT96ZShuLHQsWSxyKTohIWU7XG59ZnVuY3Rpb24gbmMobil7aWYoIW9jKG4pKXJldHVybiExO3ZhciB0PWRlKG4pO3JldHVybiB0PT1Obnx8dD09Rm58fFwic3RyaW5nXCI9PXR5cGVvZiBuLm1lc3NhZ2UmJlwic3RyaW5nXCI9PXR5cGVvZiBuLm5hbWUmJiFfYyhuKX1mdW5jdGlvbiB0YyhuKXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgbiYmUGwobil9ZnVuY3Rpb24gcmMobil7aWYoIWljKG4pKXJldHVybiExO3ZhciB0PWRlKG4pO3JldHVybiB0PT1Qbnx8dD09cW58fHQ9PSRufHx0PT1Kbn1mdW5jdGlvbiBlYyhuKXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgbiYmbj09amMobil9ZnVuY3Rpb24gdWMobil7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIG4mJm4+LTEmJm4lMT09MCYmbjw9em59ZnVuY3Rpb24gaWMobil7dmFyIHQ9dHlwZW9mIG47cmV0dXJuIG51bGwhPW4mJihcIm9iamVjdFwiPT10fHxcImZ1bmN0aW9uXCI9PXQpfWZ1bmN0aW9uIG9jKG4pe3JldHVybiBudWxsIT1uJiZcIm9iamVjdFwiPT10eXBlb2Ygbn1mdW5jdGlvbiBmYyhuLHQpe1xucmV0dXJuIG49PT10fHxXZShuLHQsbWkodCkpfWZ1bmN0aW9uIGNjKG4sdCxyKXtyZXR1cm4gcj1cImZ1bmN0aW9uXCI9PXR5cGVvZiByP3I6WSxXZShuLHQsbWkodCkscil9ZnVuY3Rpb24gYWMobil7cmV0dXJuIHBjKG4pJiZuIT0rbn1mdW5jdGlvbiBsYyhuKXtpZihScyhuKSl0aHJvdyBuZXcgaWwobm4pO3JldHVybiBMZShuKX1mdW5jdGlvbiBzYyhuKXtyZXR1cm4gbnVsbD09PW59ZnVuY3Rpb24gaGMobil7cmV0dXJuIG51bGw9PW59ZnVuY3Rpb24gcGMobil7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIG58fG9jKG4pJiZkZShuKT09S259ZnVuY3Rpb24gX2Mobil7aWYoIW9jKG4pfHxkZShuKSE9R24pcmV0dXJuITE7dmFyIHQ9Umwobik7aWYobnVsbD09PXQpcmV0dXJuITA7dmFyIHI9eWwuY2FsbCh0LFwiY29uc3RydWN0b3JcIikmJnQuY29uc3RydWN0b3I7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgciYmciBpbnN0YW5jZW9mIHImJmdsLmNhbGwocik9PW1sfWZ1bmN0aW9uIHZjKG4pe1xucmV0dXJuIGVjKG4pJiZuPj0tem4mJm48PXpufWZ1bmN0aW9uIGdjKG4pe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBufHwheWgobikmJm9jKG4pJiZkZShuKT09WG59ZnVuY3Rpb24geWMobil7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIG58fG9jKG4pJiZkZShuKT09bnR9ZnVuY3Rpb24gZGMobil7cmV0dXJuIG49PT1ZfWZ1bmN0aW9uIGJjKG4pe3JldHVybiBvYyhuKSYmSXMobik9PXJ0fWZ1bmN0aW9uIHdjKG4pe3JldHVybiBvYyhuKSYmZGUobik9PWV0fWZ1bmN0aW9uIG1jKG4pe2lmKCFuKXJldHVybltdO2lmKFZmKG4pKXJldHVybiBnYyhuKT9WKG4pOlV1KG4pO2lmKExsJiZuW0xsXSlyZXR1cm4gJChuW0xsXSgpKTt2YXIgdD1JcyhuKTtyZXR1cm4odD09Wm4/RDp0PT1Rbj9OOm5hKShuKX1mdW5jdGlvbiB4YyhuKXtpZighbilyZXR1cm4gMD09PW4/bjowO2lmKG49a2Mobiksbj09PVJufHxuPT09LVJuKXtyZXR1cm4objwwPy0xOjEpKkVufXJldHVybiBuPT09bj9uOjB9ZnVuY3Rpb24gamMobil7XG52YXIgdD14YyhuKSxyPXQlMTtyZXR1cm4gdD09PXQ/cj90LXI6dDowfWZ1bmN0aW9uIEFjKG4pe3JldHVybiBuPyRyKGpjKG4pLDAsV24pOjB9ZnVuY3Rpb24ga2Mobil7aWYoXCJudW1iZXJcIj09dHlwZW9mIG4pcmV0dXJuIG47aWYoeWMobikpcmV0dXJuIFNuO2lmKGljKG4pKXt2YXIgdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnZhbHVlT2Y/bi52YWx1ZU9mKCk6bjtuPWljKHQpP3QrXCJcIjp0fWlmKFwic3RyaW5nXCIhPXR5cGVvZiBuKXJldHVybiAwPT09bj9uOituO249bi5yZXBsYWNlKEV0LFwiXCIpO3ZhciByPUZ0LnRlc3Qobik7cmV0dXJuIHJ8fFB0LnRlc3Qobik/SnIobi5zbGljZSgyKSxyPzI6OCk6TXQudGVzdChuKT9Tbjorbn1mdW5jdGlvbiBPYyhuKXtyZXR1cm4gQnUobixOYyhuKSl9ZnVuY3Rpb24gSWMobil7cmV0dXJuIG4/JHIoamMobiksLXpuLHpuKTowPT09bj9uOjB9ZnVuY3Rpb24gUmMobil7cmV0dXJuIG51bGw9PW4/XCJcIjpwdShuKX1mdW5jdGlvbiB6YyhuLHQpe3ZhciByPV9zKG4pO1xucmV0dXJuIG51bGw9PXQ/cjpXcihyLHQpfWZ1bmN0aW9uIEVjKG4sdCl7cmV0dXJuIHYobixiaSh0LDMpLGVlKX1mdW5jdGlvbiBTYyhuLHQpe3JldHVybiB2KG4sYmkodCwzKSx1ZSl9ZnVuY3Rpb24gV2Mobix0KXtyZXR1cm4gbnVsbD09bj9uOnlzKG4sYmkodCwzKSxOYyl9ZnVuY3Rpb24gTGMobix0KXtyZXR1cm4gbnVsbD09bj9uOmRzKG4sYmkodCwzKSxOYyl9ZnVuY3Rpb24gQ2Mobix0KXtyZXR1cm4gbiYmZWUobixiaSh0LDMpKX1mdW5jdGlvbiBVYyhuLHQpe3JldHVybiBuJiZ1ZShuLGJpKHQsMykpfWZ1bmN0aW9uIEJjKG4pe3JldHVybiBudWxsPT1uP1tdOnNlKG4sRmMobikpfWZ1bmN0aW9uIFRjKG4pe3JldHVybiBudWxsPT1uP1tdOnNlKG4sTmMobikpfWZ1bmN0aW9uICRjKG4sdCxyKXt2YXIgZT1udWxsPT1uP1k6dmUobix0KTtyZXR1cm4gZT09PVk/cjplfWZ1bmN0aW9uIERjKG4sdCl7cmV0dXJuIG51bGwhPW4mJk9pKG4sdCx3ZSl9ZnVuY3Rpb24gTWMobix0KXtyZXR1cm4gbnVsbCE9biYmT2kobix0LG1lKTtcbn1mdW5jdGlvbiBGYyhuKXtyZXR1cm4gVmYobik/QXIobik6JGUobil9ZnVuY3Rpb24gTmMobil7cmV0dXJuIFZmKG4pP0FyKG4sITApOkRlKG4pfWZ1bmN0aW9uIFBjKG4sdCl7dmFyIHI9e307cmV0dXJuIHQ9YmkodCwzKSxlZShuLGZ1bmN0aW9uKG4sZSx1KXtDcihyLHQobixlLHUpLG4pfSkscn1mdW5jdGlvbiBxYyhuLHQpe3ZhciByPXt9O3JldHVybiB0PWJpKHQsMyksZWUobixmdW5jdGlvbihuLGUsdSl7Q3IocixlLHQobixlLHUpKX0pLHJ9ZnVuY3Rpb24gWmMobix0KXtyZXR1cm4gS2MobixMZihiaSh0KSkpfWZ1bmN0aW9uIEtjKG4sdCl7aWYobnVsbD09bilyZXR1cm57fTt2YXIgcj1jKGdpKG4pLGZ1bmN0aW9uKG4pe3JldHVybltuXX0pO3JldHVybiB0PWJpKHQpLEhlKG4scixmdW5jdGlvbihuLHIpe3JldHVybiB0KG4sclswXSl9KX1mdW5jdGlvbiBWYyhuLHQscil7dD1qdSh0LG4pO3ZhciBlPS0xLHU9dC5sZW5ndGg7Zm9yKHV8fCh1PTEsbj1ZKTsrK2U8dTspe3ZhciBpPW51bGw9PW4/WTpuW1FpKHRbZV0pXTtcbmk9PT1ZJiYoZT11LGk9ciksbj1yYyhpKT9pLmNhbGwobik6aX1yZXR1cm4gbn1mdW5jdGlvbiBHYyhuLHQscil7cmV0dXJuIG51bGw9PW4/bjppdShuLHQscil9ZnVuY3Rpb24gSGMobix0LHIsZSl7cmV0dXJuIGU9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lOlksbnVsbD09bj9uOml1KG4sdCxyLGUpfWZ1bmN0aW9uIEpjKG4sdCxlKXt2YXIgdT15aChuKSxpPXV8fGJoKG4pfHxBaChuKTtpZih0PWJpKHQsNCksbnVsbD09ZSl7dmFyIG89biYmbi5jb25zdHJ1Y3RvcjtlPWk/dT9uZXcgbzpbXTppYyhuKSYmcmMobyk/X3MoUmwobikpOnt9fXJldHVybihpP3I6ZWUpKG4sZnVuY3Rpb24obixyLHUpe3JldHVybiB0KGUsbixyLHUpfSksZX1mdW5jdGlvbiBZYyhuLHQpe3JldHVybiBudWxsPT1ufHx2dShuLHQpfWZ1bmN0aW9uIFFjKG4sdCxyKXtyZXR1cm4gbnVsbD09bj9uOmd1KG4sdCx4dShyKSl9ZnVuY3Rpb24gWGMobix0LHIsZSl7cmV0dXJuIGU9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lOlksXG5udWxsPT1uP246Z3Uobix0LHh1KHIpLGUpfWZ1bmN0aW9uIG5hKG4pe3JldHVybiBudWxsPT1uP1tdOnoobixGYyhuKSl9ZnVuY3Rpb24gdGEobil7cmV0dXJuIG51bGw9PW4/W106eihuLE5jKG4pKX1mdW5jdGlvbiByYShuLHQscil7cmV0dXJuIHI9PT1ZJiYocj10LHQ9WSksciE9PVkmJihyPWtjKHIpLHI9cj09PXI/cjowKSx0IT09WSYmKHQ9a2ModCksdD10PT09dD90OjApLCRyKGtjKG4pLHQscil9ZnVuY3Rpb24gZWEobix0LHIpe3JldHVybiB0PXhjKHQpLHI9PT1ZPyhyPXQsdD0wKTpyPXhjKHIpLG49a2MobikseGUobix0LHIpfWZ1bmN0aW9uIHVhKG4sdCxyKXtpZihyJiZcImJvb2xlYW5cIiE9dHlwZW9mIHImJkxpKG4sdCxyKSYmKHQ9cj1ZKSxyPT09WSYmKFwiYm9vbGVhblwiPT10eXBlb2YgdD8ocj10LHQ9WSk6XCJib29sZWFuXCI9PXR5cGVvZiBuJiYocj1uLG49WSkpLG49PT1ZJiZ0PT09WT8obj0wLHQ9MSk6KG49eGMobiksdD09PVk/KHQ9bixuPTApOnQ9eGModCkpLG4+dCl7XG52YXIgZT1uO249dCx0PWV9aWYocnx8biUxfHx0JTEpe3ZhciB1PUpsKCk7cmV0dXJuIFZsKG4rdSoodC1uK0hyKFwiMWUtXCIrKCh1K1wiXCIpLmxlbmd0aC0xKSkpLHQpfXJldHVybiBYZShuLHQpfWZ1bmN0aW9uIGlhKG4pe3JldHVybiBKaChSYyhuKS50b0xvd2VyQ2FzZSgpKX1mdW5jdGlvbiBvYShuKXtyZXR1cm4gbj1SYyhuKSxuJiZuLnJlcGxhY2UoWnQsaGUpLnJlcGxhY2UoQnIsXCJcIil9ZnVuY3Rpb24gZmEobix0LHIpe249UmMobiksdD1wdSh0KTt2YXIgZT1uLmxlbmd0aDtyPXI9PT1ZP2U6JHIoamMociksMCxlKTt2YXIgdT1yO3JldHVybiByLT10Lmxlbmd0aCxyPj0wJiZuLnNsaWNlKHIsdSk9PXR9ZnVuY3Rpb24gY2Eobil7cmV0dXJuIG49UmMobiksbiYmbXQudGVzdChuKT9uLnJlcGxhY2UoYnQscGUpOm59ZnVuY3Rpb24gYWEobil7cmV0dXJuIG49UmMobiksbiYmenQudGVzdChuKT9uLnJlcGxhY2UoUnQsXCJcXFxcJCZcIik6bn1mdW5jdGlvbiBsYShuLHQscil7bj1SYyhuKSx0PWpjKHQpO1xudmFyIGU9dD9LKG4pOjA7aWYoIXR8fGU+PXQpcmV0dXJuIG47dmFyIHU9KHQtZSkvMjtyZXR1cm4gbmkoTWwodSkscikrbituaShEbCh1KSxyKX1mdW5jdGlvbiBzYShuLHQscil7bj1SYyhuKSx0PWpjKHQpO3ZhciBlPXQ/SyhuKTowO3JldHVybiB0JiZlPHQ/bituaSh0LWUscik6bn1mdW5jdGlvbiBoYShuLHQscil7bj1SYyhuKSx0PWpjKHQpO3ZhciBlPXQ/SyhuKTowO3JldHVybiB0JiZlPHQ/bmkodC1lLHIpK246bn1mdW5jdGlvbiBwYShuLHQscil7cmV0dXJuIHJ8fG51bGw9PXQ/dD0wOnQmJih0PSt0KSxIbChSYyhuKS5yZXBsYWNlKFN0LFwiXCIpLHR8fDApfWZ1bmN0aW9uIF9hKG4sdCxyKXtyZXR1cm4gdD0ocj9MaShuLHQscik6dD09PVkpPzE6amModCksdHUoUmMobiksdCl9ZnVuY3Rpb24gdmEoKXt2YXIgbj1hcmd1bWVudHMsdD1SYyhuWzBdKTtyZXR1cm4gbi5sZW5ndGg8Mz90OnQucmVwbGFjZShuWzFdLG5bMl0pfWZ1bmN0aW9uIGdhKG4sdCxyKXtyZXR1cm4gciYmXCJudW1iZXJcIiE9dHlwZW9mIHImJkxpKG4sdCxyKSYmKHQ9cj1ZKSxcbihyPXI9PT1ZP1duOnI+Pj4wKT8obj1SYyhuKSxuJiYoXCJzdHJpbmdcIj09dHlwZW9mIHR8fG51bGwhPXQmJiF4aCh0KSkmJih0PXB1KHQpLCF0JiZCKG4pKT9BdShWKG4pLDAscik6bi5zcGxpdCh0LHIpKTpbXX1mdW5jdGlvbiB5YShuLHQscil7cmV0dXJuIG49UmMobikscj1udWxsPT1yPzA6JHIoamMociksMCxuLmxlbmd0aCksdD1wdSh0KSxuLnNsaWNlKHIscit0Lmxlbmd0aCk9PXR9ZnVuY3Rpb24gZGEobix0LHIpe3ZhciBlPXEudGVtcGxhdGVTZXR0aW5ncztyJiZMaShuLHQscikmJih0PVkpLG49UmMobiksdD16aCh7fSx0LGUsY2kpO3ZhciB1LGksbz16aCh7fSx0LmltcG9ydHMsZS5pbXBvcnRzLGNpKSxmPUZjKG8pLGM9eihvLGYpLGE9MCxsPXQuaW50ZXJwb2xhdGV8fEt0LHM9XCJfX3AgKz0gJ1wiLGg9YWwoKHQuZXNjYXBlfHxLdCkuc291cmNlK1wifFwiK2wuc291cmNlK1wifFwiKyhsPT09QXQ/JHQ6S3QpLnNvdXJjZStcInxcIisodC5ldmFsdWF0ZXx8S3QpLnNvdXJjZStcInwkXCIsXCJnXCIpLHA9XCIvLyMgc291cmNlVVJMPVwiKyh5bC5jYWxsKHQsXCJzb3VyY2VVUkxcIik/KHQuc291cmNlVVJMK1wiXCIpLnJlcGxhY2UoL1xccy9nLFwiIFwiKTpcImxvZGFzaC50ZW1wbGF0ZVNvdXJjZXNbXCIrICsrTnIrXCJdXCIpK1wiXFxuXCI7XG5uLnJlcGxhY2UoaCxmdW5jdGlvbih0LHIsZSxvLGYsYyl7cmV0dXJuIGV8fChlPW8pLHMrPW4uc2xpY2UoYSxjKS5yZXBsYWNlKFZ0LEMpLHImJih1PSEwLHMrPVwiJyArXFxuX19lKFwiK3IrXCIpICtcXG4nXCIpLGYmJihpPSEwLHMrPVwiJztcXG5cIitmK1wiO1xcbl9fcCArPSAnXCIpLGUmJihzKz1cIicgK1xcbigoX190ID0gKFwiK2UrXCIpKSA9PSBudWxsID8gJycgOiBfX3QpICtcXG4nXCIpLGE9Yyt0Lmxlbmd0aCx0fSkscys9XCInO1xcblwiO3ZhciBfPXlsLmNhbGwodCxcInZhcmlhYmxlXCIpJiZ0LnZhcmlhYmxlO198fChzPVwid2l0aCAob2JqKSB7XFxuXCIrcytcIlxcbn1cXG5cIikscz0oaT9zLnJlcGxhY2UodnQsXCJcIik6cykucmVwbGFjZShndCxcIiQxXCIpLnJlcGxhY2UoeXQsXCIkMTtcIikscz1cImZ1bmN0aW9uKFwiKyhffHxcIm9ialwiKStcIikge1xcblwiKyhfP1wiXCI6XCJvYmogfHwgKG9iaiA9IHt9KTtcXG5cIikrXCJ2YXIgX190LCBfX3AgPSAnJ1wiKyh1P1wiLCBfX2UgPSBfLmVzY2FwZVwiOlwiXCIpKyhpP1wiLCBfX2ogPSBBcnJheS5wcm90b3R5cGUuam9pbjtcXG5mdW5jdGlvbiBwcmludCgpIHsgX19wICs9IF9fai5jYWxsKGFyZ3VtZW50cywgJycpIH1cXG5cIjpcIjtcXG5cIikrcytcInJldHVybiBfX3BcXG59XCI7XG52YXIgdj1ZaChmdW5jdGlvbigpe3JldHVybiBvbChmLHArXCJyZXR1cm4gXCIrcykuYXBwbHkoWSxjKX0pO2lmKHYuc291cmNlPXMsbmModikpdGhyb3cgdjtyZXR1cm4gdn1mdW5jdGlvbiBiYShuKXtyZXR1cm4gUmMobikudG9Mb3dlckNhc2UoKX1mdW5jdGlvbiB3YShuKXtyZXR1cm4gUmMobikudG9VcHBlckNhc2UoKX1mdW5jdGlvbiBtYShuLHQscil7aWYobj1SYyhuKSxuJiYocnx8dD09PVkpKXJldHVybiBuLnJlcGxhY2UoRXQsXCJcIik7aWYoIW58fCEodD1wdSh0KSkpcmV0dXJuIG47dmFyIGU9VihuKSx1PVYodCk7cmV0dXJuIEF1KGUsUyhlLHUpLFcoZSx1KSsxKS5qb2luKFwiXCIpfWZ1bmN0aW9uIHhhKG4sdCxyKXtpZihuPVJjKG4pLG4mJihyfHx0PT09WSkpcmV0dXJuIG4ucmVwbGFjZShXdCxcIlwiKTtpZighbnx8ISh0PXB1KHQpKSlyZXR1cm4gbjt2YXIgZT1WKG4pO3JldHVybiBBdShlLDAsVyhlLFYodCkpKzEpLmpvaW4oXCJcIil9ZnVuY3Rpb24gamEobix0LHIpe2lmKG49UmMobiksXG5uJiYocnx8dD09PVkpKXJldHVybiBuLnJlcGxhY2UoU3QsXCJcIik7aWYoIW58fCEodD1wdSh0KSkpcmV0dXJuIG47dmFyIGU9VihuKTtyZXR1cm4gQXUoZSxTKGUsVih0KSkpLmpvaW4oXCJcIil9ZnVuY3Rpb24gQWEobix0KXt2YXIgcj1tbixlPXhuO2lmKGljKHQpKXt2YXIgdT1cInNlcGFyYXRvclwiaW4gdD90LnNlcGFyYXRvcjp1O3I9XCJsZW5ndGhcImluIHQ/amModC5sZW5ndGgpOnIsZT1cIm9taXNzaW9uXCJpbiB0P3B1KHQub21pc3Npb24pOmV9bj1SYyhuKTt2YXIgaT1uLmxlbmd0aDtpZihCKG4pKXt2YXIgbz1WKG4pO2k9by5sZW5ndGh9aWYocj49aSlyZXR1cm4gbjt2YXIgZj1yLUsoZSk7aWYoZjwxKXJldHVybiBlO3ZhciBjPW8/QXUobywwLGYpLmpvaW4oXCJcIik6bi5zbGljZSgwLGYpO2lmKHU9PT1ZKXJldHVybiBjK2U7aWYobyYmKGYrPWMubGVuZ3RoLWYpLHhoKHUpKXtpZihuLnNsaWNlKGYpLnNlYXJjaCh1KSl7dmFyIGEsbD1jO2Zvcih1Lmdsb2JhbHx8KHU9YWwodS5zb3VyY2UsUmMoRHQuZXhlYyh1KSkrXCJnXCIpKSxcbnUubGFzdEluZGV4PTA7YT11LmV4ZWMobCk7KXZhciBzPWEuaW5kZXg7Yz1jLnNsaWNlKDAscz09PVk/ZjpzKX19ZWxzZSBpZihuLmluZGV4T2YocHUodSksZikhPWYpe3ZhciBoPWMubGFzdEluZGV4T2YodSk7aD4tMSYmKGM9Yy5zbGljZSgwLGgpKX1yZXR1cm4gYytlfWZ1bmN0aW9uIGthKG4pe3JldHVybiBuPVJjKG4pLG4mJnd0LnRlc3Qobik/bi5yZXBsYWNlKGR0LF9lKTpufWZ1bmN0aW9uIE9hKG4sdCxyKXtyZXR1cm4gbj1SYyhuKSx0PXI/WTp0LHQ9PT1ZP1Qobik/SihuKTpfKG4pOm4ubWF0Y2godCl8fFtdfWZ1bmN0aW9uIElhKHQpe3ZhciByPW51bGw9PXQ/MDp0Lmxlbmd0aCxlPWJpKCk7cmV0dXJuIHQ9cj9jKHQsZnVuY3Rpb24obil7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgblsxXSl0aHJvdyBuZXcgc2wodG4pO3JldHVybltlKG5bMF0pLG5bMV1dfSk6W10scnUoZnVuY3Rpb24oZSl7Zm9yKHZhciB1PS0xOysrdTxyOyl7dmFyIGk9dFt1XTtpZihuKGlbMF0sdGhpcyxlKSlyZXR1cm4gbihpWzFdLHRoaXMsZSk7XG59fSl9ZnVuY3Rpb24gUmEobil7cmV0dXJuIE1yKERyKG4sb24pKX1mdW5jdGlvbiB6YShuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19ZnVuY3Rpb24gRWEobix0KXtyZXR1cm4gbnVsbD09bnx8biE9PW4/dDpufWZ1bmN0aW9uIFNhKG4pe3JldHVybiBufWZ1bmN0aW9uIFdhKG4pe3JldHVybiBUZShcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246RHIobixvbikpfWZ1bmN0aW9uIExhKG4pe3JldHVybiBOZShEcihuLG9uKSl9ZnVuY3Rpb24gQ2Eobix0KXtyZXR1cm4gUGUobixEcih0LG9uKSl9ZnVuY3Rpb24gVWEobix0LGUpe3ZhciB1PUZjKHQpLGk9c2UodCx1KTtudWxsIT1lfHxpYyh0KSYmKGkubGVuZ3RofHwhdS5sZW5ndGgpfHwoZT10LHQ9bixuPXRoaXMsaT1zZSh0LEZjKHQpKSk7dmFyIG89IShpYyhlKSYmXCJjaGFpblwiaW4gZSYmIWUuY2hhaW4pLGY9cmMobik7cmV0dXJuIHIoaSxmdW5jdGlvbihyKXt2YXIgZT10W3JdO25bcl09ZSxmJiYobi5wcm90b3R5cGVbcl09ZnVuY3Rpb24oKXtcbnZhciB0PXRoaXMuX19jaGFpbl9fO2lmKG98fHQpe3ZhciByPW4odGhpcy5fX3dyYXBwZWRfXyk7cmV0dXJuKHIuX19hY3Rpb25zX189VXUodGhpcy5fX2FjdGlvbnNfXykpLnB1c2goe2Z1bmM6ZSxhcmdzOmFyZ3VtZW50cyx0aGlzQXJnOm59KSxyLl9fY2hhaW5fXz10LHJ9cmV0dXJuIGUuYXBwbHkobixhKFt0aGlzLnZhbHVlKCldLGFyZ3VtZW50cykpfSl9KSxufWZ1bmN0aW9uIEJhKCl7cmV0dXJuIFhyLl89PT10aGlzJiYoWHIuXz14bCksdGhpc31mdW5jdGlvbiBUYSgpe31mdW5jdGlvbiAkYShuKXtyZXR1cm4gbj1qYyhuKSxydShmdW5jdGlvbih0KXtyZXR1cm4gS2UodCxuKX0pfWZ1bmN0aW9uIERhKG4pe3JldHVybiBDaShuKT9tKFFpKG4pKTpKZShuKX1mdW5jdGlvbiBNYShuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PW4/WTp2ZShuLHQpfX1mdW5jdGlvbiBGYSgpe3JldHVybltdfWZ1bmN0aW9uIE5hKCl7cmV0dXJuITF9ZnVuY3Rpb24gUGEoKXtyZXR1cm57fTtcbn1mdW5jdGlvbiBxYSgpe3JldHVyblwiXCJ9ZnVuY3Rpb24gWmEoKXtyZXR1cm4hMH1mdW5jdGlvbiBLYShuLHQpe2lmKG49amMobiksbjwxfHxuPnpuKXJldHVybltdO3ZhciByPVduLGU9VmwobixXbik7dD1iaSh0KSxuLT1Xbjtmb3IodmFyIHU9TyhlLHQpOysrcjxuOyl0KHIpO3JldHVybiB1fWZ1bmN0aW9uIFZhKG4pe3JldHVybiB5aChuKT9jKG4sUWkpOnljKG4pP1tuXTpVdShXcyhSYyhuKSkpfWZ1bmN0aW9uIEdhKG4pe3ZhciB0PSsrZGw7cmV0dXJuIFJjKG4pK3R9ZnVuY3Rpb24gSGEobil7cmV0dXJuIG4mJm4ubGVuZ3RoP1lyKG4sU2EsYmUpOll9ZnVuY3Rpb24gSmEobix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/WXIobixiaSh0LDIpLGJlKTpZfWZ1bmN0aW9uIFlhKG4pe3JldHVybiB3KG4sU2EpfWZ1bmN0aW9uIFFhKG4sdCl7cmV0dXJuIHcobixiaSh0LDIpKX1mdW5jdGlvbiBYYShuKXtyZXR1cm4gbiYmbi5sZW5ndGg/WXIobixTYSxNZSk6WX1mdW5jdGlvbiBubChuLHQpe1xucmV0dXJuIG4mJm4ubGVuZ3RoP1lyKG4sYmkodCwyKSxNZSk6WX1mdW5jdGlvbiB0bChuKXtyZXR1cm4gbiYmbi5sZW5ndGg/ayhuLFNhKTowfWZ1bmN0aW9uIHJsKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP2sobixiaSh0LDIpKTowfXg9bnVsbD09eD9YcjpnZS5kZWZhdWx0cyhYci5PYmplY3QoKSx4LGdlLnBpY2soWHIsRnIpKTt2YXIgZWw9eC5BcnJheSx1bD14LkRhdGUsaWw9eC5FcnJvcixvbD14LkZ1bmN0aW9uLGZsPXguTWF0aCxjbD14Lk9iamVjdCxhbD14LlJlZ0V4cCxsbD14LlN0cmluZyxzbD14LlR5cGVFcnJvcixobD1lbC5wcm90b3R5cGUscGw9b2wucHJvdG90eXBlLF9sPWNsLnByb3RvdHlwZSx2bD14W1wiX19jb3JlLWpzX3NoYXJlZF9fXCJdLGdsPXBsLnRvU3RyaW5nLHlsPV9sLmhhc093blByb3BlcnR5LGRsPTAsYmw9ZnVuY3Rpb24oKXt2YXIgbj0vW14uXSskLy5leGVjKHZsJiZ2bC5rZXlzJiZ2bC5rZXlzLklFX1BST1RPfHxcIlwiKTtyZXR1cm4gbj9cIlN5bWJvbChzcmMpXzEuXCIrbjpcIlwiO1xufSgpLHdsPV9sLnRvU3RyaW5nLG1sPWdsLmNhbGwoY2wpLHhsPVhyLl8samw9YWwoXCJeXCIrZ2wuY2FsbCh5bCkucmVwbGFjZShSdCxcIlxcXFwkJlwiKS5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLFwiJDEuKj9cIikrXCIkXCIpLEFsPXJlP3guQnVmZmVyOlksa2w9eC5TeW1ib2wsT2w9eC5VaW50OEFycmF5LElsPUFsP0FsLmFsbG9jVW5zYWZlOlksUmw9TShjbC5nZXRQcm90b3R5cGVPZixjbCksemw9Y2wuY3JlYXRlLEVsPV9sLnByb3BlcnR5SXNFbnVtZXJhYmxlLFNsPWhsLnNwbGljZSxXbD1rbD9rbC5pc0NvbmNhdFNwcmVhZGFibGU6WSxMbD1rbD9rbC5pdGVyYXRvcjpZLENsPWtsP2tsLnRvU3RyaW5nVGFnOlksVWw9ZnVuY3Rpb24oKXt0cnl7dmFyIG49eGkoY2wsXCJkZWZpbmVQcm9wZXJ0eVwiKTtyZXR1cm4gbih7fSxcIlwiLHt9KSxufWNhdGNoKG4pe319KCksQmw9eC5jbGVhclRpbWVvdXQhPT1Yci5jbGVhclRpbWVvdXQmJnguY2xlYXJUaW1lb3V0LFRsPXVsJiZ1bC5ub3chPT1Yci5EYXRlLm5vdyYmdWwubm93LCRsPXguc2V0VGltZW91dCE9PVhyLnNldFRpbWVvdXQmJnguc2V0VGltZW91dCxEbD1mbC5jZWlsLE1sPWZsLmZsb29yLEZsPWNsLmdldE93blByb3BlcnR5U3ltYm9scyxObD1BbD9BbC5pc0J1ZmZlcjpZLFBsPXguaXNGaW5pdGUscWw9aGwuam9pbixabD1NKGNsLmtleXMsY2wpLEtsPWZsLm1heCxWbD1mbC5taW4sR2w9dWwubm93LEhsPXgucGFyc2VJbnQsSmw9ZmwucmFuZG9tLFlsPWhsLnJldmVyc2UsUWw9eGkoeCxcIkRhdGFWaWV3XCIpLFhsPXhpKHgsXCJNYXBcIiksbnM9eGkoeCxcIlByb21pc2VcIiksdHM9eGkoeCxcIlNldFwiKSxycz14aSh4LFwiV2Vha01hcFwiKSxlcz14aShjbCxcImNyZWF0ZVwiKSx1cz1ycyYmbmV3IHJzLGlzPXt9LG9zPVhpKFFsKSxmcz1YaShYbCksY3M9WGkobnMpLGFzPVhpKHRzKSxscz1YaShycyksc3M9a2w/a2wucHJvdG90eXBlOlksaHM9c3M/c3MudmFsdWVPZjpZLHBzPXNzP3NzLnRvU3RyaW5nOlksX3M9ZnVuY3Rpb24oKXtcbmZ1bmN0aW9uIG4oKXt9cmV0dXJuIGZ1bmN0aW9uKHQpe2lmKCFpYyh0KSlyZXR1cm57fTtpZih6bClyZXR1cm4gemwodCk7bi5wcm90b3R5cGU9dDt2YXIgcj1uZXcgbjtyZXR1cm4gbi5wcm90b3R5cGU9WSxyfX0oKTtxLnRlbXBsYXRlU2V0dGluZ3M9e2VzY2FwZTp4dCxldmFsdWF0ZTpqdCxpbnRlcnBvbGF0ZTpBdCx2YXJpYWJsZTpcIlwiLGltcG9ydHM6e186cX19LHEucHJvdG90eXBlPUcucHJvdG90eXBlLHEucHJvdG90eXBlLmNvbnN0cnVjdG9yPXEsSC5wcm90b3R5cGU9X3MoRy5wcm90b3R5cGUpLEgucHJvdG90eXBlLmNvbnN0cnVjdG9yPUgsQnQucHJvdG90eXBlPV9zKEcucHJvdG90eXBlKSxCdC5wcm90b3R5cGUuY29uc3RydWN0b3I9QnQsWXQucHJvdG90eXBlLmNsZWFyPVF0LFl0LnByb3RvdHlwZS5kZWxldGU9WHQsWXQucHJvdG90eXBlLmdldD1ucixZdC5wcm90b3R5cGUuaGFzPXRyLFl0LnByb3RvdHlwZS5zZXQ9cnIsZXIucHJvdG90eXBlLmNsZWFyPXVyLGVyLnByb3RvdHlwZS5kZWxldGU9aXIsXG5lci5wcm90b3R5cGUuZ2V0PW9yLGVyLnByb3RvdHlwZS5oYXM9ZnIsZXIucHJvdG90eXBlLnNldD1jcixhci5wcm90b3R5cGUuY2xlYXI9bHIsYXIucHJvdG90eXBlLmRlbGV0ZT1zcixhci5wcm90b3R5cGUuZ2V0PWhyLGFyLnByb3RvdHlwZS5oYXM9cHIsYXIucHJvdG90eXBlLnNldD1fcix2ci5wcm90b3R5cGUuYWRkPXZyLnByb3RvdHlwZS5wdXNoPWdyLHZyLnByb3RvdHlwZS5oYXM9eXIsZHIucHJvdG90eXBlLmNsZWFyPWJyLGRyLnByb3RvdHlwZS5kZWxldGU9d3IsZHIucHJvdG90eXBlLmdldD1tcixkci5wcm90b3R5cGUuaGFzPXhyLGRyLnByb3RvdHlwZS5zZXQ9anI7dmFyIHZzPUZ1KGVlKSxncz1GdSh1ZSwhMCkseXM9TnUoKSxkcz1OdSghMCksYnM9dXM/ZnVuY3Rpb24obix0KXtyZXR1cm4gdXMuc2V0KG4sdCksbn06U2Esd3M9VWw/ZnVuY3Rpb24obix0KXtyZXR1cm4gVWwobixcInRvU3RyaW5nXCIse2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiExLHZhbHVlOnphKHQpLFxud3JpdGFibGU6ITB9KX06U2EsbXM9cnUseHM9Qmx8fGZ1bmN0aW9uKG4pe3JldHVybiBYci5jbGVhclRpbWVvdXQobil9LGpzPXRzJiYxL04obmV3IHRzKFssLTBdKSlbMV09PVJuP2Z1bmN0aW9uKG4pe3JldHVybiBuZXcgdHMobil9OlRhLEFzPXVzP2Z1bmN0aW9uKG4pe3JldHVybiB1cy5nZXQobil9OlRhLGtzPUZsP2Z1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP1tdOihuPWNsKG4pLGkoRmwobiksZnVuY3Rpb24odCl7cmV0dXJuIEVsLmNhbGwobix0KX0pKX06RmEsT3M9Rmw/ZnVuY3Rpb24obil7Zm9yKHZhciB0PVtdO247KWEodCxrcyhuKSksbj1SbChuKTtyZXR1cm4gdH06RmEsSXM9ZGU7KFFsJiZJcyhuZXcgUWwobmV3IEFycmF5QnVmZmVyKDEpKSkhPWl0fHxYbCYmSXMobmV3IFhsKSE9Wm58fG5zJiZJcyhucy5yZXNvbHZlKCkpIT1Ibnx8dHMmJklzKG5ldyB0cykhPVFufHxycyYmSXMobmV3IHJzKSE9cnQpJiYoSXM9ZnVuY3Rpb24obil7dmFyIHQ9ZGUobikscj10PT1Hbj9uLmNvbnN0cnVjdG9yOlksZT1yP1hpKHIpOlwiXCI7XG5pZihlKXN3aXRjaChlKXtjYXNlIG9zOnJldHVybiBpdDtjYXNlIGZzOnJldHVybiBabjtjYXNlIGNzOnJldHVybiBIbjtjYXNlIGFzOnJldHVybiBRbjtjYXNlIGxzOnJldHVybiBydH1yZXR1cm4gdH0pO3ZhciBScz12bD9yYzpOYSx6cz1KaShicyksRXM9JGx8fGZ1bmN0aW9uKG4sdCl7cmV0dXJuIFhyLnNldFRpbWVvdXQobix0KX0sU3M9Smkod3MpLFdzPUZpKGZ1bmN0aW9uKG4pe3ZhciB0PVtdO3JldHVybiA0Nj09PW4uY2hhckNvZGVBdCgwKSYmdC5wdXNoKFwiXCIpLG4ucmVwbGFjZShJdCxmdW5jdGlvbihuLHIsZSx1KXt0LnB1c2goZT91LnJlcGxhY2UoVHQsXCIkMVwiKTpyfHxuKX0pLHR9KSxMcz1ydShmdW5jdGlvbihuLHQpe3JldHVybiBHZihuKT9WcihuLHRlKHQsMSxHZiwhMCkpOltdfSksQ3M9cnUoZnVuY3Rpb24obix0KXt2YXIgcj1tbyh0KTtyZXR1cm4gR2YocikmJihyPVkpLEdmKG4pP1ZyKG4sdGUodCwxLEdmLCEwKSxiaShyLDIpKTpbXX0pLFVzPXJ1KGZ1bmN0aW9uKG4sdCl7XG52YXIgcj1tbyh0KTtyZXR1cm4gR2YocikmJihyPVkpLEdmKG4pP1ZyKG4sdGUodCwxLEdmLCEwKSxZLHIpOltdfSksQnM9cnUoZnVuY3Rpb24obil7dmFyIHQ9YyhuLG11KTtyZXR1cm4gdC5sZW5ndGgmJnRbMF09PT1uWzBdP2plKHQpOltdfSksVHM9cnUoZnVuY3Rpb24obil7dmFyIHQ9bW8obikscj1jKG4sbXUpO3JldHVybiB0PT09bW8ocik/dD1ZOnIucG9wKCksci5sZW5ndGgmJnJbMF09PT1uWzBdP2plKHIsYmkodCwyKSk6W119KSwkcz1ydShmdW5jdGlvbihuKXt2YXIgdD1tbyhuKSxyPWMobixtdSk7cmV0dXJuIHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgdD90OlksdCYmci5wb3AoKSxyLmxlbmd0aCYmclswXT09PW5bMF0/amUocixZLHQpOltdfSksRHM9cnUoQW8pLE1zPV9pKGZ1bmN0aW9uKG4sdCl7dmFyIHI9bnVsbD09bj8wOm4ubGVuZ3RoLGU9VHIobix0KTtyZXR1cm4gUWUobixjKHQsZnVuY3Rpb24obil7cmV0dXJuIFdpKG4scik/K246bn0pLnNvcnQoU3UpKSxlfSksRnM9cnUoZnVuY3Rpb24obil7XG5yZXR1cm4gX3UodGUobiwxLEdmLCEwKSl9KSxOcz1ydShmdW5jdGlvbihuKXt2YXIgdD1tbyhuKTtyZXR1cm4gR2YodCkmJih0PVkpLF91KHRlKG4sMSxHZiwhMCksYmkodCwyKSl9KSxQcz1ydShmdW5jdGlvbihuKXt2YXIgdD1tbyhuKTtyZXR1cm4gdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6WSxfdSh0ZShuLDEsR2YsITApLFksdCl9KSxxcz1ydShmdW5jdGlvbihuLHQpe3JldHVybiBHZihuKT9WcihuLHQpOltdfSksWnM9cnUoZnVuY3Rpb24obil7cmV0dXJuIGJ1KGkobixHZikpfSksS3M9cnUoZnVuY3Rpb24obil7dmFyIHQ9bW8obik7cmV0dXJuIEdmKHQpJiYodD1ZKSxidShpKG4sR2YpLGJpKHQsMikpfSksVnM9cnUoZnVuY3Rpb24obil7dmFyIHQ9bW8obik7cmV0dXJuIHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgdD90OlksYnUoaShuLEdmKSxZLHQpfSksR3M9cnUoS28pLEhzPXJ1KGZ1bmN0aW9uKG4pe3ZhciB0PW4ubGVuZ3RoLHI9dD4xP25bdC0xXTpZO3JldHVybiByPVwiZnVuY3Rpb25cIj09dHlwZW9mIHI/KG4ucG9wKCksXG5yKTpZLFZvKG4scil9KSxKcz1faShmdW5jdGlvbihuKXt2YXIgdD1uLmxlbmd0aCxyPXQ/blswXTowLGU9dGhpcy5fX3dyYXBwZWRfXyx1PWZ1bmN0aW9uKHQpe3JldHVybiBUcih0LG4pfTtyZXR1cm4hKHQ+MXx8dGhpcy5fX2FjdGlvbnNfXy5sZW5ndGgpJiZlIGluc3RhbmNlb2YgQnQmJldpKHIpPyhlPWUuc2xpY2UociwrcisodD8xOjApKSxlLl9fYWN0aW9uc19fLnB1c2goe2Z1bmM6UW8sYXJnczpbdV0sdGhpc0FyZzpZfSksbmV3IEgoZSx0aGlzLl9fY2hhaW5fXykudGhydShmdW5jdGlvbihuKXtyZXR1cm4gdCYmIW4ubGVuZ3RoJiZuLnB1c2goWSksbn0pKTp0aGlzLnRocnUodSl9KSxZcz1EdShmdW5jdGlvbihuLHQscil7eWwuY2FsbChuLHIpPysrbltyXTpDcihuLHIsMSl9KSxRcz1HdShsbyksWHM9R3Uoc28pLG5oPUR1KGZ1bmN0aW9uKG4sdCxyKXt5bC5jYWxsKG4scik/bltyXS5wdXNoKHQpOkNyKG4scixbdF0pfSksdGg9cnUoZnVuY3Rpb24odCxyLGUpe3ZhciB1PS0xLGk9XCJmdW5jdGlvblwiPT10eXBlb2YgcixvPVZmKHQpP2VsKHQubGVuZ3RoKTpbXTtcbnJldHVybiB2cyh0LGZ1bmN0aW9uKHQpe29bKyt1XT1pP24ocix0LGUpOmtlKHQscixlKX0pLG99KSxyaD1EdShmdW5jdGlvbihuLHQscil7Q3IobixyLHQpfSksZWg9RHUoZnVuY3Rpb24obix0LHIpe25bcj8wOjFdLnB1c2godCl9LGZ1bmN0aW9uKCl7cmV0dXJuW1tdLFtdXX0pLHVoPXJ1KGZ1bmN0aW9uKG4sdCl7aWYobnVsbD09bilyZXR1cm5bXTt2YXIgcj10Lmxlbmd0aDtyZXR1cm4gcj4xJiZMaShuLHRbMF0sdFsxXSk/dD1bXTpyPjImJkxpKHRbMF0sdFsxXSx0WzJdKSYmKHQ9W3RbMF1dKSxWZShuLHRlKHQsMSksW10pfSksaWg9VGx8fGZ1bmN0aW9uKCl7cmV0dXJuIFhyLkRhdGUubm93KCl9LG9oPXJ1KGZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1zbjtpZihyLmxlbmd0aCl7dmFyIHU9RihyLGRpKG9oKSk7ZXw9Z259cmV0dXJuIGZpKG4sZSx0LHIsdSl9KSxmaD1ydShmdW5jdGlvbihuLHQscil7dmFyIGU9c258aG47aWYoci5sZW5ndGgpe3ZhciB1PUYocixkaShmaCkpO2V8PWduO1xufXJldHVybiBmaSh0LGUsbixyLHUpfSksY2g9cnUoZnVuY3Rpb24obix0KXtyZXR1cm4gS3IobiwxLHQpfSksYWg9cnUoZnVuY3Rpb24obix0LHIpe3JldHVybiBLcihuLGtjKHQpfHwwLHIpfSk7V2YuQ2FjaGU9YXI7dmFyIGxoPW1zKGZ1bmN0aW9uKHQscil7cj0xPT1yLmxlbmd0aCYmeWgoclswXSk/YyhyWzBdLFIoYmkoKSkpOmModGUociwxKSxSKGJpKCkpKTt2YXIgZT1yLmxlbmd0aDtyZXR1cm4gcnUoZnVuY3Rpb24odSl7Zm9yKHZhciBpPS0xLG89VmwodS5sZW5ndGgsZSk7KytpPG87KXVbaV09cltpXS5jYWxsKHRoaXMsdVtpXSk7cmV0dXJuIG4odCx0aGlzLHUpfSl9KSxzaD1ydShmdW5jdGlvbihuLHQpe3JldHVybiBmaShuLGduLFksdCxGKHQsZGkoc2gpKSl9KSxoaD1ydShmdW5jdGlvbihuLHQpe3JldHVybiBmaShuLHluLFksdCxGKHQsZGkoaGgpKSl9KSxwaD1faShmdW5jdGlvbihuLHQpe3JldHVybiBmaShuLGJuLFksWSxZLHQpfSksX2g9ZWkoYmUpLHZoPWVpKGZ1bmN0aW9uKG4sdCl7XG5yZXR1cm4gbj49dH0pLGdoPU9lKGZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50c30oKSk/T2U6ZnVuY3Rpb24obil7cmV0dXJuIG9jKG4pJiZ5bC5jYWxsKG4sXCJjYWxsZWVcIikmJiFFbC5jYWxsKG4sXCJjYWxsZWVcIil9LHloPWVsLmlzQXJyYXksZGg9aWU/UihpZSk6SWUsYmg9Tmx8fE5hLHdoPW9lP1Iob2UpOlJlLG1oPWZlP1IoZmUpOlNlLHhoPWNlP1IoY2UpOkNlLGpoPWFlP1IoYWUpOlVlLEFoPWxlP1IobGUpOkJlLGtoPWVpKE1lKSxPaD1laShmdW5jdGlvbihuLHQpe3JldHVybiBuPD10fSksSWg9TXUoZnVuY3Rpb24obix0KXtpZigkaSh0KXx8VmYodCkpcmV0dXJuIEJ1KHQsRmModCksbiksWTtmb3IodmFyIHIgaW4gdCl5bC5jYWxsKHQscikmJnpyKG4scix0W3JdKX0pLFJoPU11KGZ1bmN0aW9uKG4sdCl7QnUodCxOYyh0KSxuKX0pLHpoPU11KGZ1bmN0aW9uKG4sdCxyLGUpe0J1KHQsTmModCksbixlKX0pLEVoPU11KGZ1bmN0aW9uKG4sdCxyLGUpe0J1KHQsRmModCksbixlKTtcbn0pLFNoPV9pKFRyKSxXaD1ydShmdW5jdGlvbihuLHQpe249Y2wobik7dmFyIHI9LTEsZT10Lmxlbmd0aCx1PWU+Mj90WzJdOlk7Zm9yKHUmJkxpKHRbMF0sdFsxXSx1KSYmKGU9MSk7KytyPGU7KWZvcih2YXIgaT10W3JdLG89TmMoaSksZj0tMSxjPW8ubGVuZ3RoOysrZjxjOyl7dmFyIGE9b1tmXSxsPW5bYV07KGw9PT1ZfHxLZihsLF9sW2FdKSYmIXlsLmNhbGwobixhKSkmJihuW2FdPWlbYV0pfXJldHVybiBufSksTGg9cnUoZnVuY3Rpb24odCl7cmV0dXJuIHQucHVzaChZLGFpKSxuKCRoLFksdCl9KSxDaD1ZdShmdW5jdGlvbihuLHQscil7bnVsbCE9dCYmXCJmdW5jdGlvblwiIT10eXBlb2YgdC50b1N0cmluZyYmKHQ9d2wuY2FsbCh0KSksblt0XT1yfSx6YShTYSkpLFVoPVl1KGZ1bmN0aW9uKG4sdCxyKXtudWxsIT10JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0LnRvU3RyaW5nJiYodD13bC5jYWxsKHQpKSx5bC5jYWxsKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSxiaSksQmg9cnUoa2UpLFRoPU11KGZ1bmN0aW9uKG4sdCxyKXtcbnFlKG4sdCxyKX0pLCRoPU11KGZ1bmN0aW9uKG4sdCxyLGUpe3FlKG4sdCxyLGUpfSksRGg9X2koZnVuY3Rpb24obix0KXt2YXIgcj17fTtpZihudWxsPT1uKXJldHVybiByO3ZhciBlPSExO3Q9Yyh0LGZ1bmN0aW9uKHQpe3JldHVybiB0PWp1KHQsbiksZXx8KGU9dC5sZW5ndGg+MSksdH0pLEJ1KG4sZ2kobiksciksZSYmKHI9RHIocixvbnxmbnxjbixsaSkpO2Zvcih2YXIgdT10Lmxlbmd0aDt1LS07KXZ1KHIsdFt1XSk7cmV0dXJuIHJ9KSxNaD1faShmdW5jdGlvbihuLHQpe3JldHVybiBudWxsPT1uP3t9OkdlKG4sdCl9KSxGaD1vaShGYyksTmg9b2koTmMpLFBoPVp1KGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gdD10LnRvTG93ZXJDYXNlKCksbisocj9pYSh0KTp0KX0pLHFoPVp1KGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbisocj9cIi1cIjpcIlwiKSt0LnRvTG93ZXJDYXNlKCl9KSxaaD1adShmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCIgXCI6XCJcIikrdC50b0xvd2VyQ2FzZSgpfSksS2g9cXUoXCJ0b0xvd2VyQ2FzZVwiKSxWaD1adShmdW5jdGlvbihuLHQscil7XG5yZXR1cm4gbisocj9cIl9cIjpcIlwiKSt0LnRvTG93ZXJDYXNlKCl9KSxHaD1adShmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCIgXCI6XCJcIikrSmgodCl9KSxIaD1adShmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCIgXCI6XCJcIikrdC50b1VwcGVyQ2FzZSgpfSksSmg9cXUoXCJ0b1VwcGVyQ2FzZVwiKSxZaD1ydShmdW5jdGlvbih0LHIpe3RyeXtyZXR1cm4gbih0LFkscil9Y2F0Y2gobil7cmV0dXJuIG5jKG4pP246bmV3IGlsKG4pfX0pLFFoPV9pKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIHIodCxmdW5jdGlvbih0KXt0PVFpKHQpLENyKG4sdCxvaChuW3RdLG4pKX0pLG59KSxYaD1IdSgpLG5wPUh1KCEwKSx0cD1ydShmdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4ga2UocixuLHQpfX0pLHJwPXJ1KGZ1bmN0aW9uKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBrZShuLHIsdCl9fSksZXA9WHUoYyksdXA9WHUodSksaXA9WHUoaCksb3A9cmkoKSxmcD1yaSghMCksY3A9UXUoZnVuY3Rpb24obix0KXtcbnJldHVybiBuK3R9LDApLGFwPWlpKFwiY2VpbFwiKSxscD1RdShmdW5jdGlvbihuLHQpe3JldHVybiBuL3R9LDEpLHNwPWlpKFwiZmxvb3JcIiksaHA9UXUoZnVuY3Rpb24obix0KXtyZXR1cm4gbip0fSwxKSxwcD1paShcInJvdW5kXCIpLF9wPVF1KGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4tdH0sMCk7cmV0dXJuIHEuYWZ0ZXI9a2YscS5hcnk9T2YscS5hc3NpZ249SWgscS5hc3NpZ25Jbj1SaCxxLmFzc2lnbkluV2l0aD16aCxxLmFzc2lnbldpdGg9RWgscS5hdD1TaCxxLmJlZm9yZT1JZixxLmJpbmQ9b2gscS5iaW5kQWxsPVFoLHEuYmluZEtleT1maCxxLmNhc3RBcnJheT1NZixxLmNoYWluPUpvLHEuY2h1bms9cm8scS5jb21wYWN0PWVvLHEuY29uY2F0PXVvLHEuY29uZD1JYSxxLmNvbmZvcm1zPVJhLHEuY29uc3RhbnQ9emEscS5jb3VudEJ5PVlzLHEuY3JlYXRlPXpjLHEuY3Vycnk9UmYscS5jdXJyeVJpZ2h0PXpmLHEuZGVib3VuY2U9RWYscS5kZWZhdWx0cz1XaCxxLmRlZmF1bHRzRGVlcD1MaCxcbnEuZGVmZXI9Y2gscS5kZWxheT1haCxxLmRpZmZlcmVuY2U9THMscS5kaWZmZXJlbmNlQnk9Q3MscS5kaWZmZXJlbmNlV2l0aD1VcyxxLmRyb3A9aW8scS5kcm9wUmlnaHQ9b28scS5kcm9wUmlnaHRXaGlsZT1mbyxxLmRyb3BXaGlsZT1jbyxxLmZpbGw9YW8scS5maWx0ZXI9Y2YscS5mbGF0TWFwPWFmLHEuZmxhdE1hcERlZXA9bGYscS5mbGF0TWFwRGVwdGg9c2YscS5mbGF0dGVuPWhvLHEuZmxhdHRlbkRlZXA9cG8scS5mbGF0dGVuRGVwdGg9X28scS5mbGlwPVNmLHEuZmxvdz1YaCxxLmZsb3dSaWdodD1ucCxxLmZyb21QYWlycz12byxxLmZ1bmN0aW9ucz1CYyxxLmZ1bmN0aW9uc0luPVRjLHEuZ3JvdXBCeT1uaCxxLmluaXRpYWw9Ym8scS5pbnRlcnNlY3Rpb249QnMscS5pbnRlcnNlY3Rpb25CeT1UcyxxLmludGVyc2VjdGlvbldpdGg9JHMscS5pbnZlcnQ9Q2gscS5pbnZlcnRCeT1VaCxxLmludm9rZU1hcD10aCxxLml0ZXJhdGVlPVdhLHEua2V5Qnk9cmgscS5rZXlzPUZjLHEua2V5c0luPU5jLFxucS5tYXA9dmYscS5tYXBLZXlzPVBjLHEubWFwVmFsdWVzPXFjLHEubWF0Y2hlcz1MYSxxLm1hdGNoZXNQcm9wZXJ0eT1DYSxxLm1lbW9pemU9V2YscS5tZXJnZT1UaCxxLm1lcmdlV2l0aD0kaCxxLm1ldGhvZD10cCxxLm1ldGhvZE9mPXJwLHEubWl4aW49VWEscS5uZWdhdGU9TGYscS5udGhBcmc9JGEscS5vbWl0PURoLHEub21pdEJ5PVpjLHEub25jZT1DZixxLm9yZGVyQnk9Z2YscS5vdmVyPWVwLHEub3ZlckFyZ3M9bGgscS5vdmVyRXZlcnk9dXAscS5vdmVyU29tZT1pcCxxLnBhcnRpYWw9c2gscS5wYXJ0aWFsUmlnaHQ9aGgscS5wYXJ0aXRpb249ZWgscS5waWNrPU1oLHEucGlja0J5PUtjLHEucHJvcGVydHk9RGEscS5wcm9wZXJ0eU9mPU1hLHEucHVsbD1EcyxxLnB1bGxBbGw9QW8scS5wdWxsQWxsQnk9a28scS5wdWxsQWxsV2l0aD1PbyxxLnB1bGxBdD1NcyxxLnJhbmdlPW9wLHEucmFuZ2VSaWdodD1mcCxxLnJlYXJnPXBoLHEucmVqZWN0PWJmLHEucmVtb3ZlPUlvLHEucmVzdD1VZixcbnEucmV2ZXJzZT1SbyxxLnNhbXBsZVNpemU9bWYscS5zZXQ9R2MscS5zZXRXaXRoPUhjLHEuc2h1ZmZsZT14ZixxLnNsaWNlPXpvLHEuc29ydEJ5PXVoLHEuc29ydGVkVW5pcT1CbyxxLnNvcnRlZFVuaXFCeT1UbyxxLnNwbGl0PWdhLHEuc3ByZWFkPUJmLHEudGFpbD0kbyxxLnRha2U9RG8scS50YWtlUmlnaHQ9TW8scS50YWtlUmlnaHRXaGlsZT1GbyxxLnRha2VXaGlsZT1ObyxxLnRhcD1ZbyxxLnRocm90dGxlPVRmLHEudGhydT1RbyxxLnRvQXJyYXk9bWMscS50b1BhaXJzPUZoLHEudG9QYWlyc0luPU5oLHEudG9QYXRoPVZhLHEudG9QbGFpbk9iamVjdD1PYyxxLnRyYW5zZm9ybT1KYyxxLnVuYXJ5PSRmLHEudW5pb249RnMscS51bmlvbkJ5PU5zLHEudW5pb25XaXRoPVBzLHEudW5pcT1QbyxxLnVuaXFCeT1xbyxxLnVuaXFXaXRoPVpvLHEudW5zZXQ9WWMscS51bnppcD1LbyxxLnVuemlwV2l0aD1WbyxxLnVwZGF0ZT1RYyxxLnVwZGF0ZVdpdGg9WGMscS52YWx1ZXM9bmEscS52YWx1ZXNJbj10YSxcbnEud2l0aG91dD1xcyxxLndvcmRzPU9hLHEud3JhcD1EZixxLnhvcj1acyxxLnhvckJ5PUtzLHEueG9yV2l0aD1WcyxxLnppcD1HcyxxLnppcE9iamVjdD1HbyxxLnppcE9iamVjdERlZXA9SG8scS56aXBXaXRoPUhzLHEuZW50cmllcz1GaCxxLmVudHJpZXNJbj1OaCxxLmV4dGVuZD1SaCxxLmV4dGVuZFdpdGg9emgsVWEocSxxKSxxLmFkZD1jcCxxLmF0dGVtcHQ9WWgscS5jYW1lbENhc2U9UGgscS5jYXBpdGFsaXplPWlhLHEuY2VpbD1hcCxxLmNsYW1wPXJhLHEuY2xvbmU9RmYscS5jbG9uZURlZXA9UGYscS5jbG9uZURlZXBXaXRoPXFmLHEuY2xvbmVXaXRoPU5mLHEuY29uZm9ybXNUbz1aZixxLmRlYnVycj1vYSxxLmRlZmF1bHRUbz1FYSxxLmRpdmlkZT1scCxxLmVuZHNXaXRoPWZhLHEuZXE9S2YscS5lc2NhcGU9Y2EscS5lc2NhcGVSZWdFeHA9YWEscS5ldmVyeT1mZixxLmZpbmQ9UXMscS5maW5kSW5kZXg9bG8scS5maW5kS2V5PUVjLHEuZmluZExhc3Q9WHMscS5maW5kTGFzdEluZGV4PXNvLFxucS5maW5kTGFzdEtleT1TYyxxLmZsb29yPXNwLHEuZm9yRWFjaD1oZixxLmZvckVhY2hSaWdodD1wZixxLmZvckluPVdjLHEuZm9ySW5SaWdodD1MYyxxLmZvck93bj1DYyxxLmZvck93blJpZ2h0PVVjLHEuZ2V0PSRjLHEuZ3Q9X2gscS5ndGU9dmgscS5oYXM9RGMscS5oYXNJbj1NYyxxLmhlYWQ9Z28scS5pZGVudGl0eT1TYSxxLmluY2x1ZGVzPV9mLHEuaW5kZXhPZj15byxxLmluUmFuZ2U9ZWEscS5pbnZva2U9QmgscS5pc0FyZ3VtZW50cz1naCxxLmlzQXJyYXk9eWgscS5pc0FycmF5QnVmZmVyPWRoLHEuaXNBcnJheUxpa2U9VmYscS5pc0FycmF5TGlrZU9iamVjdD1HZixxLmlzQm9vbGVhbj1IZixxLmlzQnVmZmVyPWJoLHEuaXNEYXRlPXdoLHEuaXNFbGVtZW50PUpmLHEuaXNFbXB0eT1ZZixxLmlzRXF1YWw9UWYscS5pc0VxdWFsV2l0aD1YZixxLmlzRXJyb3I9bmMscS5pc0Zpbml0ZT10YyxxLmlzRnVuY3Rpb249cmMscS5pc0ludGVnZXI9ZWMscS5pc0xlbmd0aD11YyxxLmlzTWFwPW1oLFxucS5pc01hdGNoPWZjLHEuaXNNYXRjaFdpdGg9Y2MscS5pc05hTj1hYyxxLmlzTmF0aXZlPWxjLHEuaXNOaWw9aGMscS5pc051bGw9c2MscS5pc051bWJlcj1wYyxxLmlzT2JqZWN0PWljLHEuaXNPYmplY3RMaWtlPW9jLHEuaXNQbGFpbk9iamVjdD1fYyxxLmlzUmVnRXhwPXhoLHEuaXNTYWZlSW50ZWdlcj12YyxxLmlzU2V0PWpoLHEuaXNTdHJpbmc9Z2MscS5pc1N5bWJvbD15YyxxLmlzVHlwZWRBcnJheT1BaCxxLmlzVW5kZWZpbmVkPWRjLHEuaXNXZWFrTWFwPWJjLHEuaXNXZWFrU2V0PXdjLHEuam9pbj13byxxLmtlYmFiQ2FzZT1xaCxxLmxhc3Q9bW8scS5sYXN0SW5kZXhPZj14byxxLmxvd2VyQ2FzZT1aaCxxLmxvd2VyRmlyc3Q9S2gscS5sdD1raCxxLmx0ZT1PaCxxLm1heD1IYSxxLm1heEJ5PUphLHEubWVhbj1ZYSxxLm1lYW5CeT1RYSxxLm1pbj1YYSxxLm1pbkJ5PW5sLHEuc3R1YkFycmF5PUZhLHEuc3R1YkZhbHNlPU5hLHEuc3R1Yk9iamVjdD1QYSxxLnN0dWJTdHJpbmc9cWEsXG5xLnN0dWJUcnVlPVphLHEubXVsdGlwbHk9aHAscS5udGg9am8scS5ub0NvbmZsaWN0PUJhLHEubm9vcD1UYSxxLm5vdz1paCxxLnBhZD1sYSxxLnBhZEVuZD1zYSxxLnBhZFN0YXJ0PWhhLHEucGFyc2VJbnQ9cGEscS5yYW5kb209dWEscS5yZWR1Y2U9eWYscS5yZWR1Y2VSaWdodD1kZixxLnJlcGVhdD1fYSxxLnJlcGxhY2U9dmEscS5yZXN1bHQ9VmMscS5yb3VuZD1wcCxxLnJ1bkluQ29udGV4dD1wLHEuc2FtcGxlPXdmLHEuc2l6ZT1qZixxLnNuYWtlQ2FzZT1WaCxxLnNvbWU9QWYscS5zb3J0ZWRJbmRleD1FbyxxLnNvcnRlZEluZGV4Qnk9U28scS5zb3J0ZWRJbmRleE9mPVdvLHEuc29ydGVkTGFzdEluZGV4PUxvLHEuc29ydGVkTGFzdEluZGV4Qnk9Q28scS5zb3J0ZWRMYXN0SW5kZXhPZj1VbyxxLnN0YXJ0Q2FzZT1HaCxxLnN0YXJ0c1dpdGg9eWEscS5zdWJ0cmFjdD1fcCxxLnN1bT10bCxxLnN1bUJ5PXJsLHEudGVtcGxhdGU9ZGEscS50aW1lcz1LYSxxLnRvRmluaXRlPXhjLHEudG9JbnRlZ2VyPWpjLFxucS50b0xlbmd0aD1BYyxxLnRvTG93ZXI9YmEscS50b051bWJlcj1rYyxxLnRvU2FmZUludGVnZXI9SWMscS50b1N0cmluZz1SYyxxLnRvVXBwZXI9d2EscS50cmltPW1hLHEudHJpbUVuZD14YSxxLnRyaW1TdGFydD1qYSxxLnRydW5jYXRlPUFhLHEudW5lc2NhcGU9a2EscS51bmlxdWVJZD1HYSxxLnVwcGVyQ2FzZT1IaCxxLnVwcGVyRmlyc3Q9SmgscS5lYWNoPWhmLHEuZWFjaFJpZ2h0PXBmLHEuZmlyc3Q9Z28sVWEocSxmdW5jdGlvbigpe3ZhciBuPXt9O3JldHVybiBlZShxLGZ1bmN0aW9uKHQscil7eWwuY2FsbChxLnByb3RvdHlwZSxyKXx8KG5bcl09dCl9KSxufSgpLHtjaGFpbjohMX0pLHEuVkVSU0lPTj1RLHIoW1wiYmluZFwiLFwiYmluZEtleVwiLFwiY3VycnlcIixcImN1cnJ5UmlnaHRcIixcInBhcnRpYWxcIixcInBhcnRpYWxSaWdodFwiXSxmdW5jdGlvbihuKXtxW25dLnBsYWNlaG9sZGVyPXF9KSxyKFtcImRyb3BcIixcInRha2VcIl0sZnVuY3Rpb24obix0KXtCdC5wcm90b3R5cGVbbl09ZnVuY3Rpb24ocil7XG5yPXI9PT1ZPzE6S2woamMociksMCk7dmFyIGU9dGhpcy5fX2ZpbHRlcmVkX18mJiF0P25ldyBCdCh0aGlzKTp0aGlzLmNsb25lKCk7cmV0dXJuIGUuX19maWx0ZXJlZF9fP2UuX190YWtlQ291bnRfXz1WbChyLGUuX190YWtlQ291bnRfXyk6ZS5fX3ZpZXdzX18ucHVzaCh7c2l6ZTpWbChyLFduKSx0eXBlOm4rKGUuX19kaXJfXzwwP1wiUmlnaHRcIjpcIlwiKX0pLGV9LEJ0LnByb3RvdHlwZVtuK1wiUmlnaHRcIl09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMucmV2ZXJzZSgpW25dKHQpLnJldmVyc2UoKX19KSxyKFtcImZpbHRlclwiLFwibWFwXCIsXCJ0YWtlV2hpbGVcIl0sZnVuY3Rpb24obix0KXt2YXIgcj10KzEsZT1yPT1rbnx8cj09SW47QnQucHJvdG90eXBlW25dPWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuY2xvbmUoKTtyZXR1cm4gdC5fX2l0ZXJhdGVlc19fLnB1c2goe2l0ZXJhdGVlOmJpKG4sMyksdHlwZTpyfSksdC5fX2ZpbHRlcmVkX189dC5fX2ZpbHRlcmVkX198fGUsdH19KSxyKFtcImhlYWRcIixcImxhc3RcIl0sZnVuY3Rpb24obix0KXtcbnZhciByPVwidGFrZVwiKyh0P1wiUmlnaHRcIjpcIlwiKTtCdC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tyXSgxKS52YWx1ZSgpWzBdfX0pLHIoW1wiaW5pdGlhbFwiLFwidGFpbFwiXSxmdW5jdGlvbihuLHQpe3ZhciByPVwiZHJvcFwiKyh0P1wiXCI6XCJSaWdodFwiKTtCdC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fX2ZpbHRlcmVkX18/bmV3IEJ0KHRoaXMpOnRoaXNbcl0oMSl9fSksQnQucHJvdG90eXBlLmNvbXBhY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWx0ZXIoU2EpfSxCdC5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5maWx0ZXIobikuaGVhZCgpfSxCdC5wcm90b3R5cGUuZmluZExhc3Q9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMucmV2ZXJzZSgpLmZpbmQobil9LEJ0LnByb3RvdHlwZS5pbnZva2VNYXA9cnUoZnVuY3Rpb24obix0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP25ldyBCdCh0aGlzKTp0aGlzLm1hcChmdW5jdGlvbihyKXtcbnJldHVybiBrZShyLG4sdCl9KX0pLEJ0LnByb3RvdHlwZS5yZWplY3Q9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMuZmlsdGVyKExmKGJpKG4pKSl9LEJ0LnByb3RvdHlwZS5zbGljZT1mdW5jdGlvbihuLHQpe249amMobik7dmFyIHI9dGhpcztyZXR1cm4gci5fX2ZpbHRlcmVkX18mJihuPjB8fHQ8MCk/bmV3IEJ0KHIpOihuPDA/cj1yLnRha2VSaWdodCgtbik6biYmKHI9ci5kcm9wKG4pKSx0IT09WSYmKHQ9amModCkscj10PDA/ci5kcm9wUmlnaHQoLXQpOnIudGFrZSh0LW4pKSxyKX0sQnQucHJvdG90eXBlLnRha2VSaWdodFdoaWxlPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLnJldmVyc2UoKS50YWtlV2hpbGUobikucmV2ZXJzZSgpfSxCdC5wcm90b3R5cGUudG9BcnJheT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRha2UoV24pfSxlZShCdC5wcm90b3R5cGUsZnVuY3Rpb24obix0KXt2YXIgcj0vXig/OmZpbHRlcnxmaW5kfG1hcHxyZWplY3QpfFdoaWxlJC8udGVzdCh0KSxlPS9eKD86aGVhZHxsYXN0KSQvLnRlc3QodCksdT1xW2U/XCJ0YWtlXCIrKFwibGFzdFwiPT10P1wiUmlnaHRcIjpcIlwiKTp0XSxpPWV8fC9eZmluZC8udGVzdCh0KTtcbnUmJihxLnByb3RvdHlwZVt0XT1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX193cmFwcGVkX18sbz1lP1sxXTphcmd1bWVudHMsZj10IGluc3RhbmNlb2YgQnQsYz1vWzBdLGw9Znx8eWgodCkscz1mdW5jdGlvbihuKXt2YXIgdD11LmFwcGx5KHEsYShbbl0sbykpO3JldHVybiBlJiZoP3RbMF06dH07bCYmciYmXCJmdW5jdGlvblwiPT10eXBlb2YgYyYmMSE9Yy5sZW5ndGgmJihmPWw9ITEpO3ZhciBoPXRoaXMuX19jaGFpbl9fLHA9ISF0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCxfPWkmJiFoLHY9ZiYmIXA7aWYoIWkmJmwpe3Q9dj90Om5ldyBCdCh0aGlzKTt2YXIgZz1uLmFwcGx5KHQsbyk7cmV0dXJuIGcuX19hY3Rpb25zX18ucHVzaCh7ZnVuYzpRbyxhcmdzOltzXSx0aGlzQXJnOll9KSxuZXcgSChnLGgpfXJldHVybiBfJiZ2P24uYXBwbHkodGhpcyxvKTooZz10aGlzLnRocnUocyksXz9lP2cudmFsdWUoKVswXTpnLnZhbHVlKCk6Zyl9KX0pLHIoW1wicG9wXCIsXCJwdXNoXCIsXCJzaGlmdFwiLFwic29ydFwiLFwic3BsaWNlXCIsXCJ1bnNoaWZ0XCJdLGZ1bmN0aW9uKG4pe1xudmFyIHQ9aGxbbl0scj0vXig/OnB1c2h8c29ydHx1bnNoaWZ0KSQvLnRlc3Qobik/XCJ0YXBcIjpcInRocnVcIixlPS9eKD86cG9wfHNoaWZ0KSQvLnRlc3Qobik7cS5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHM7aWYoZSYmIXRoaXMuX19jaGFpbl9fKXt2YXIgdT10aGlzLnZhbHVlKCk7cmV0dXJuIHQuYXBwbHkoeWgodSk/dTpbXSxuKX1yZXR1cm4gdGhpc1tyXShmdW5jdGlvbihyKXtyZXR1cm4gdC5hcHBseSh5aChyKT9yOltdLG4pfSl9fSksZWUoQnQucHJvdG90eXBlLGZ1bmN0aW9uKG4sdCl7dmFyIHI9cVt0XTtpZihyKXt2YXIgZT1yLm5hbWUrXCJcIjt5bC5jYWxsKGlzLGUpfHwoaXNbZV09W10pLGlzW2VdLnB1c2goe25hbWU6dCxmdW5jOnJ9KX19KSxpc1tKdShZLGhuKS5uYW1lXT1be25hbWU6XCJ3cmFwcGVyXCIsZnVuYzpZfV0sQnQucHJvdG90eXBlLmNsb25lPUd0LEJ0LnByb3RvdHlwZS5yZXZlcnNlPUh0LEJ0LnByb3RvdHlwZS52YWx1ZT1KdCxxLnByb3RvdHlwZS5hdD1KcyxcbnEucHJvdG90eXBlLmNoYWluPVhvLHEucHJvdG90eXBlLmNvbW1pdD1uZixxLnByb3RvdHlwZS5uZXh0PXRmLHEucHJvdG90eXBlLnBsYW50PWVmLHEucHJvdG90eXBlLnJldmVyc2U9dWYscS5wcm90b3R5cGUudG9KU09OPXEucHJvdG90eXBlLnZhbHVlT2Y9cS5wcm90b3R5cGUudmFsdWU9b2YscS5wcm90b3R5cGUuZmlyc3Q9cS5wcm90b3R5cGUuaGVhZCxMbCYmKHEucHJvdG90eXBlW0xsXT1yZikscX0sZ2U9dmUoKTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJlwib2JqZWN0XCI9PXR5cGVvZiBkZWZpbmUuYW1kJiZkZWZpbmUuYW1kPyhYci5fPWdlLGRlZmluZShmdW5jdGlvbigpe3JldHVybiBnZX0pKTp0ZT8oKHRlLmV4cG9ydHM9Z2UpLl89Z2UsbmUuXz1nZSk6WHIuXz1nZX0pLmNhbGwodGhpcyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiY29uc3QgU0FWRV9PUFRJT05TID0geyBJUEZTOiBcImlwZnNcIiwgRE9XTkxPQURTOiBcImRvd25sb2Fkc1wiLCBCT1RIOiBcImJvdGhcIiB9O1xuY29uc3QgTUVTU0FHRV9UWVBFUyA9IHtcbiAgU0NSQVBFX0FDVElWRV9UQUI6IFwiU0NSQVBFX0FDVElWRV9UQUJcIixcbiAgU0NSQVBFX05FV19UQUI6IFwiU0NSQVBFX05FV19UQUJcIixcbiAgSFRNTDogXCJIVE1MXCIsXG4gIFBERl9XSVRIX1NBVkVEX01FVEFEQVRBOiBcIlBERl9XSVRIX1NBVkVEX01FVEFEQVRBXCIsXG4gIFBERl9XSVRIT1VUX1NBVkVEX01FVEFEQVRBOiBcIlBERl9XSVRIT1VUX1NBVkVEX01FVEFEQVRBXCIsXG4gIERFVEFJTFM6IFwiREVUQUlMU1wiLFxuICBFUlJPUjogXCJFUlJPUlwiLFxufTtcblxuZXhwb3J0IHsgU0FWRV9PUFRJT05TLCBNRVNTQUdFX1RZUEVTIH07XG4iLCJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBzZW5kTWVzc2FnZShvYmopIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uob2JqLCAocmVzKSA9PiByZXNvbHZlKHJlcykpXG4gICk7XG59XG4iLCJpbXBvcnQgeyBNRVNTQUdFX1RZUEVTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHNlbmRNZXNzYWdlIGZyb20gXCIuL3V0aWxzL3NlbmQtbWVzc2FnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXREZXRhaWxzKCkge1xuICByZXR1cm4gYXdhaXQgc2VuZE1lc3NhZ2UoeyB0eXBlOiBNRVNTQUdFX1RZUEVTLkRFVEFJTFMgfSk7XG59XG4iLCIvL1RoaXMgY29kZSB3YXMgY29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2tldnZhL2lzLXBkZi9ibG9iL21hc3Rlci9pbmRleC5qc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1BkZihidWYpIHtcbiAgaWYgKCFidWYgfHwgYnVmLmxlbmd0aCA8IDQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIGJ1ZlswXSA9PT0gMHgyNSAmJiBidWZbMV0gPT09IDB4NTAgJiYgYnVmWzJdID09PSAweDQ0ICYmIGJ1ZlszXSA9PT0gMHg0NlxuICApO1xufVxuIiwiaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tIFwibG9kYXNoL2ZwXCI7XG5pbXBvcnQgeyBNRVNTQUdFX1RZUEVTIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgZ2V0RGV0YWlscyBmcm9tIFwiLi9mdW5jdGlvbnMvZ2V0LWRldGFpbHNcIjtcbmltcG9ydCBpc1BkZiBmcm9tIFwiLi9mdW5jdGlvbnMvdXRpbHMvaXMtcGRmXCI7XG5cbihhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGV0YWlscyA9IGF3YWl0IGdldERldGFpbHMoKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBkZXRhaWxzICYmIGRldGFpbHMuaW5kaXJlY3RGZXRjaCA/IGRldGFpbHMudXJsIDogbG9jYXRpb24uaHJlZlxuICAgICk7XG5cbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlQ2xvbmUgPSByZXNwb25zZS5jbG9uZSgpO1xuICAgICAgY29uc3QgaXNVcmxBUGRmID0gaXNQZGYoYXdhaXQgcmVzcG9uc2VDbG9uZS5hcnJheUJ1ZmZlcigpKTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IGlzVXJsQVBkZlxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IE1FU1NBR0VfVFlQRVMuUERGX1dJVEhPVVRfU0FWRURfTUVUQURBVEEsXG4gICAgICAgICAgICBwZGY6IFVSTC5jcmVhdGVPYmplY3RVUkwoYXdhaXQgcmVzcG9uc2UuYmxvYigpKSxcbiAgICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogTUVTU0FHRV9UWVBFUy5IVE1MLFxuICAgICAgICAgICAgaHRtbDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm91dGVySFRNTCxcbiAgICAgICAgICB9O1xuXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgXCJiYWQgcmVzcG9uc2Ugc3RhdHVzOiBcIiArIHJlc3BvbnNlLnN0YXR1cztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogTUVTU0FHRV9UWVBFUy5FUlJPUixcbiAgICAgIGVycm9yOiB0b1N0cmluZyhlcnJvciksXG4gICAgfSk7XG4gIH1cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9