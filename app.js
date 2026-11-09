var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@supabase/node-fetch/browser.js
var browser_exports = {};
__export(browser_exports, {
  Headers: () => Headers2,
  Request: () => Request,
  Response: () => Response2,
  default: () => browser_default,
  fetch: () => fetch2
});
var getGlobal, globalObject, fetch2, browser_default, Headers2, Request, Response2;
var init_browser = __esm({
  "node_modules/@supabase/node-fetch/browser.js"() {
    "use strict";
    getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    };
    globalObject = getGlobal();
    fetch2 = globalObject.fetch;
    browser_default = globalObject.fetch.bind(globalObject);
    Headers2 = globalObject.Headers;
    Request = globalObject.Request;
    Response2 = globalObject.Response;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js
var require_PostgrestError = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostgrestError2 = class extends Error {
      constructor(context) {
        super(context.message);
        this.name = "PostgrestError";
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
      }
    };
    exports.default = PostgrestError2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js
var require_PostgrestBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_fetch_1 = __importDefault((init_browser(), __toCommonJS(browser_exports)));
    var PostgrestError_1 = __importDefault(require_PostgrestError());
    var PostgrestBuilder2 = class {
      constructor(builder) {
        var _a, _b;
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = new Headers(builder.headers);
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = (_a = builder.shouldThrowOnError) !== null && _a !== void 0 ? _a : false;
        this.signal = builder.signal;
        this.isMaybeSingle = (_b = builder.isMaybeSingle) !== null && _b !== void 0 ? _b : false;
        if (builder.fetch) {
          this.fetch = builder.fetch;
        } else if (typeof fetch === "undefined") {
          this.fetch = node_fetch_1.default;
        } else {
          this.fetch = fetch;
        }
      }
      /**
       * If there's an error with the query, throwOnError will reject the promise by
       * throwing the error instead of returning it as part of a successful response.
       *
       * {@link https://github.com/supabase/supabase-js/issues/92}
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      /**
       * Set an HTTP header for the request.
       */
      setHeader(name, value) {
        this.headers = new Headers(this.headers);
        this.headers.set(name, value);
        return this;
      }
      then(onfulfilled, onrejected) {
        if (this.schema === void 0) {
        } else if (["GET", "HEAD"].includes(this.method)) {
          this.headers.set("Accept-Profile", this.schema);
        } else {
          this.headers.set("Content-Profile", this.schema);
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
          this.headers.set("Content-Type", "application/json");
        }
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal
        }).then(async (res2) => {
          var _a, _b, _c, _d;
          let error = null;
          let data = null;
          let count = null;
          let status = res2.status;
          let statusText = res2.statusText;
          if (res2.ok) {
            if (this.method !== "HEAD") {
              const body = await res2.text();
              if (body === "") {
              } else if (this.headers.get("Accept") === "text/csv") {
                data = body;
              } else if (this.headers.get("Accept") && ((_a = this.headers.get("Accept")) === null || _a === void 0 ? void 0 : _a.includes("application/vnd.pgrst.plan+text"))) {
                data = body;
              } else {
                data = JSON.parse(body);
              }
            }
            const countHeader = (_b = this.headers.get("Prefer")) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
            const contentRange = (_c = res2.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
            if (countHeader && contentRange && contentRange.length > 1) {
              count = parseInt(contentRange[1]);
            }
            if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
              if (data.length > 1) {
                error = {
                  // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                  code: "PGRST116",
                  details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: "JSON object requested, multiple (or no) rows returned"
                };
                data = null;
                count = null;
                status = 406;
                statusText = "Not Acceptable";
              } else if (data.length === 1) {
                data = data[0];
              } else {
                data = null;
              }
            }
          } else {
            const body = await res2.text();
            try {
              error = JSON.parse(body);
              if (Array.isArray(error) && res2.status === 404) {
                data = [];
                error = null;
                status = 200;
                statusText = "OK";
              }
            } catch (_e) {
              if (res2.status === 404 && body === "") {
                status = 204;
                statusText = "No Content";
              } else {
                error = {
                  message: body
                };
              }
            }
            if (error && this.isMaybeSingle && ((_d = error === null || error === void 0 ? void 0 : error.details) === null || _d === void 0 ? void 0 : _d.includes("0 rows"))) {
              error = null;
              status = 200;
              statusText = "OK";
            }
            if (error && this.shouldThrowOnError) {
              throw new PostgrestError_1.default(error);
            }
          }
          const postgrestResponse = {
            error,
            data,
            count,
            status,
            statusText
          };
          return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
          res = res.catch((fetchError) => {
            var _a, _b, _c;
            return {
              error: {
                message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                hint: "",
                code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
              },
              data: null,
              count: null,
              status: 0,
              statusText: ""
            };
          });
        }
        return res.then(onfulfilled, onrejected);
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
       */
      returns() {
        return this;
      }
      /**
       * Override the type of the returned `data` field in the response.
       *
       * @typeParam NewResult - The new type to cast the response data to
       * @typeParam Options - Optional type configuration (defaults to { merge: true })
       * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
       * @example
       * ```typescript
       * // Merge with existing types (default behavior)
       * const query = supabase
       *   .from('users')
       *   .select()
       *   .overrideTypes<{ custom_field: string }>()
       *
       * // Replace existing types completely
       * const replaceQuery = supabase
       *   .from('users')
       *   .select()
       *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
       * ```
       * @returns A PostgrestBuilder instance with the new type
       */
      overrideTypes() {
        return this;
      }
    };
    exports.default = PostgrestBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js
var require_PostgrestTransformBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostgrestBuilder_1 = __importDefault(require_PostgrestBuilder());
    var PostgrestTransformBuilder2 = class extends PostgrestBuilder_1.default {
      /**
       * Perform a SELECT on the query result.
       *
       * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
       * return modified rows. By calling this method, modified rows are returned in
       * `data`.
       *
       * @param columns - The columns to retrieve, separated by commas
       */
      select(columns) {
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted) {
            return "";
          }
          if (c === '"') {
            quoted = !quoted;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        this.headers.append("Prefer", "return=representation");
        return this;
      }
      /**
       * Order the query result by `column`.
       *
       * You can call this method multiple times to order by multiple columns.
       *
       * You can order referenced tables, but it only affects the ordering of the
       * parent table if you use `!inner` in the query.
       *
       * @param column - The column to order by
       * @param options - Named parameters
       * @param options.ascending - If `true`, the result will be in ascending order
       * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
       * `null`s appear last.
       * @param options.referencedTable - Set this to order a referenced table by
       * its columns
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
      }
      /**
       * Limit the query result by `count`.
       *
       * @param count - The maximum number of rows to return
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      limit(count, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
      }
      /**
       * Limit the query result by starting at an offset `from` and ending at the offset `to`.
       * Only records within this range are returned.
       * This respects the query order and if there is no order clause the range could behave unexpectedly.
       * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
       * and fourth rows of the query.
       *
       * @param from - The starting index from which to limit the result
       * @param to - The last index to which to limit the result
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
        const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
      }
      /**
       * Set the AbortSignal for the fetch request.
       *
       * @param signal - The AbortSignal to use for the fetch request
       */
      abortSignal(signal) {
        this.signal = signal;
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be one row (e.g. using `.limit(1)`), otherwise this
       * returns an error.
       */
      single() {
        this.headers.set("Accept", "application/vnd.pgrst.object+json");
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
       * this returns an error.
       */
      maybeSingle() {
        if (this.method === "GET") {
          this.headers.set("Accept", "application/json");
        } else {
          this.headers.set("Accept", "application/vnd.pgrst.object+json");
        }
        this.isMaybeSingle = true;
        return this;
      }
      /**
       * Return `data` as a string in CSV format.
       */
      csv() {
        this.headers.set("Accept", "text/csv");
        return this;
      }
      /**
       * Return `data` as an object in [GeoJSON](https://geojson.org) format.
       */
      geojson() {
        this.headers.set("Accept", "application/geo+json");
        return this;
      }
      /**
       * Return `data` as the EXPLAIN plan for the query.
       *
       * You need to enable the
       * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
       * setting before using this method.
       *
       * @param options - Named parameters
       *
       * @param options.analyze - If `true`, the query will be executed and the
       * actual run time will be returned
       *
       * @param options.verbose - If `true`, the query identifier will be returned
       * and `data` will include the output columns of the query
       *
       * @param options.settings - If `true`, include information on configuration
       * parameters that affect query planning
       *
       * @param options.buffers - If `true`, include information on buffer usage
       *
       * @param options.wal - If `true`, include information on WAL record generation
       *
       * @param options.format - The format of the output, can be `"text"` (default)
       * or `"json"`
       */
      explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        var _a;
        const options = [
          analyze ? "analyze" : null,
          verbose ? "verbose" : null,
          settings ? "settings" : null,
          buffers ? "buffers" : null,
          wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = (_a = this.headers.get("Accept")) !== null && _a !== void 0 ? _a : "application/json";
        this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
        if (format === "json") {
          return this;
        } else {
          return this;
        }
      }
      /**
       * Rollback the query.
       *
       * `data` will still be returned, but the query is not committed.
       */
      rollback() {
        this.headers.append("Prefer", "tx=rollback");
        return this;
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
       */
      returns() {
        return this;
      }
      /**
       * Set the maximum number of rows that can be affected by the query.
       * Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
       *
       * @param value - The maximum number of rows that can be affected
       */
      maxAffected(value) {
        this.headers.append("Prefer", "handling=strict");
        this.headers.append("Prefer", `max-affected=${value}`);
        return this;
      }
    };
    exports.default = PostgrestTransformBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js
var require_PostgrestFilterBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
    var PostgrestFilterBuilder2 = class extends PostgrestTransformBuilder_1.default {
      /**
       * Match only rows where `column` is equal to `value`.
       *
       * To check if the value of `column` is NULL, you should use `.is()` instead.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is not equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-sensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-insensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` IS `value`.
       *
       * For non-boolean columns, this is only relevant for checking if the value of
       * `column` is NULL by setting `value` to `null`.
       *
       * For boolean columns, you can also set `value` to `true` or `false` and it
       * will behave the same way as `.eq()`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is included in the `values` array.
       *
       * @param column - The column to filter on
       * @param values - The values array to filter with
       */
      in(column, values) {
        const cleanedValues = Array.from(new Set(values)).map((s) => {
          if (typeof s === "string" && new RegExp("[,()]").test(s))
            return `"${s}"`;
          else
            return `${s}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * `column` contains every element appearing in `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      contains(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cs.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * every element appearing in `column` is contained by `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      containedBy(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cd.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is greater than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or greater than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is less than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or less than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where `column` is
       * mutually exclusive to `range` and there can be no element between the two
       * ranges.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
      }
      /**
       * Only relevant for array and range columns. Match only rows where
       * `column` and `value` have an element in common.
       *
       * @param column - The array or range column to filter on
       * @param value - The array or range value to filter with
       */
      overlaps(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `ov.${value}`);
        } else {
          this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        }
        return this;
      }
      /**
       * Only relevant for text and tsvector columns. Match only rows where
       * `column` matches the query string in `query`.
       *
       * @param column - The text or tsvector column to filter on
       * @param query - The query text to match with
       * @param options - Named parameters
       * @param options.config - The text search configuration to use
       * @param options.type - Change how the `query` text is interpreted
       */
      textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
          typePart = "pl";
        } else if (type === "phrase") {
          typePart = "ph";
        } else if (type === "websearch") {
          typePart = "w";
        }
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
      }
      /**
       * Match only rows where each column in `query` keys is equal to its
       * associated value. Shorthand for multiple `.eq()`s.
       *
       * @param query - The object to filter with, with column names as keys mapped
       * to their filter values
       */
      match(query) {
        Object.entries(query).forEach(([column, value]) => {
          this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
      }
      /**
       * Match only rows which doesn't satisfy the filter.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to be negated to filter with, following
       * PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
      }
      /**
       * Match only rows which satisfy at least one of the filters.
       *
       * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure it's properly sanitized.
       *
       * It's currently not possible to do an `.or()` filter across multiple tables.
       *
       * @param filters - The filters to use, following PostgREST syntax
       * @param options - Named parameters
       * @param options.referencedTable - Set this to filter on referenced tables
       * instead of the parent table
       * @param options.foreignTable - Deprecated, use `referencedTable` instead
       */
      or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.or` : "or";
        this.url.searchParams.append(key, `(${filters})`);
        return this;
      }
      /**
       * Match only rows which satisfy the filter. This is an escape hatch - you
       * should use the specific filter methods wherever possible.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to filter with, following PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
      }
    };
    exports.default = PostgrestFilterBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js
var require_PostgrestQueryBuilder = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
    var PostgrestQueryBuilder2 = class {
      constructor(url, { headers = {}, schema, fetch: fetch3 }) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schema = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a SELECT query on the table or view.
       *
       * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
       *
       * @param options - Named parameters
       *
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       *
       * @param options.count - Count algorithm to use to count rows in the table or view.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      select(columns, { head: head2 = false, count } = {}) {
        const method = head2 ? "HEAD" : "GET";
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted) {
            return "";
          }
          if (c === '"') {
            quoted = !quoted;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform an INSERT into the table or view.
       *
       * By default, inserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to insert. Pass an object to insert a single row
       * or an array to insert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count inserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. Only applies for bulk
       * inserts.
       */
      insert(values, { count, defaultToNull = true } = {}) {
        var _a;
        const method = "POST";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        if (!defaultToNull) {
          this.headers.append("Prefer", `missing=default`);
        }
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch
        });
      }
      /**
       * Perform an UPSERT on the table or view. Depending on the column(s) passed
       * to `onConflict`, `.upsert()` allows you to perform the equivalent of
       * `.insert()` if a row with the corresponding `onConflict` columns doesn't
       * exist, or if it does exist, perform an alternative action depending on
       * `ignoreDuplicates`.
       *
       * By default, upserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to upsert with. Pass an object to upsert a
       * single row or an array to upsert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
       * duplicate rows are determined. Two rows are duplicates if all the
       * `onConflict` columns are equal.
       *
       * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
       * `false`, duplicate rows are merged with existing rows.
       *
       * @param options.count - Count algorithm to use to count upserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. This only applies when
       * inserting new rows, not when merging with existing rows under
       * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
       */
      upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        var _a;
        const method = "POST";
        this.headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
        if (onConflict !== void 0)
          this.url.searchParams.set("on_conflict", onConflict);
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        if (!defaultToNull) {
          this.headers.append("Prefer", "missing=default");
        }
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch
        });
      }
      /**
       * Perform an UPDATE on the table or view.
       *
       * By default, updated rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param values - The values to update with
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count updated rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      update(values, { count } = {}) {
        var _a;
        const method = "PATCH";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch
        });
      }
      /**
       * Perform a DELETE on the table or view.
       *
       * By default, deleted rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count deleted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      delete({ count } = {}) {
        var _a;
        const method = "DELETE";
        if (count) {
          this.headers.append("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch
        });
      }
    };
    exports.default = PostgrestQueryBuilder2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js
var require_PostgrestClient = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
    var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
    var PostgrestClient2 = class _PostgrestClient {
      // TODO: Add back shouldThrowOnError once we figure out the typings
      /**
       * Creates a PostgREST client.
       *
       * @param url - URL of the PostgREST endpoint
       * @param options - Named parameters
       * @param options.headers - Custom headers
       * @param options.schema - Postgres schema to switch to
       * @param options.fetch - Custom fetch
       */
      constructor(url, { headers = {}, schema, fetch: fetch3 } = {}) {
        this.url = url;
        this.headers = new Headers(headers);
        this.schemaName = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder_1.default(url, {
          headers: new Headers(this.headers),
          schema: this.schemaName,
          fetch: this.fetch
        });
      }
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return new _PostgrestClient(this.url, {
          headers: this.headers,
          schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.get - When set to `true`, the function will be called with
       * read-only access mode.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, { head: head2 = false, get: get2 = false, count } = {}) {
        var _a;
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head2 || get2) {
          method = head2 ? "HEAD" : "GET";
          Object.entries(args).filter(([_, value]) => value !== void 0).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
            url.searchParams.append(name, value);
          });
        } else {
          method = "POST";
          body = args;
        }
        const headers = new Headers(this.headers);
        if (count) {
          headers.set("Prefer", `count=${count}`);
        }
        return new PostgrestFilterBuilder_1.default({
          method,
          url,
          headers,
          schema: this.schemaName,
          body,
          fetch: (_a = this.fetch) !== null && _a !== void 0 ? _a : fetch
        });
      }
    };
    exports.default = PostgrestClient2;
  }
});

// node_modules/@supabase/postgrest-js/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@supabase/postgrest-js/dist/cjs/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostgrestError = exports.PostgrestBuilder = exports.PostgrestTransformBuilder = exports.PostgrestFilterBuilder = exports.PostgrestQueryBuilder = exports.PostgrestClient = void 0;
    var PostgrestClient_1 = __importDefault(require_PostgrestClient());
    exports.PostgrestClient = PostgrestClient_1.default;
    var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
    exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
    var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
    exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
    var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
    exports.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
    var PostgrestBuilder_1 = __importDefault(require_PostgrestBuilder());
    exports.PostgrestBuilder = PostgrestBuilder_1.default;
    var PostgrestError_1 = __importDefault(require_PostgrestError());
    exports.PostgrestError = PostgrestError_1.default;
    exports.default = {
      PostgrestClient: PostgrestClient_1.default,
      PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
      PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
      PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
      PostgrestBuilder: PostgrestBuilder_1.default,
      PostgrestError: PostgrestError_1.default
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/state.js
var state, actions, forms, changes, hooks;
var init_state = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/state.js"() {
    state = {
      session: null,
      meId: null,
      recovery: false,
      role: { admin: false, treasurer: false, secretary: false, staff: false },
      core: null,
      f: { year: "all", month: "all", q: "", status: "all", ptype: "all", ttype: "all" }
      // filters
    };
    actions = {};
    forms = {};
    changes = {};
    hooks = { refresh: async () => {
    }, route: () => {
    } };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/utils.js
var utils_exports = {};
__export(utils_exports, {
  $: () => $,
  $$: () => $$,
  MON: () => MON,
  MONTHS: () => MONTHS,
  YEARS: () => YEARS,
  ask: () => ask,
  badge: () => badge,
  bar: () => bar,
  busy: () => busy,
  csvOut: () => csvOut,
  csvParse: () => csvParse,
  debounce: () => debounce,
  download: () => download,
  empty: () => empty,
  errMsg: () => errMsg,
  esc: () => esc,
  fdate: () => fdate,
  filterBar: () => filterBar,
  h: () => h,
  hbars: () => hbars,
  icon: () => icon,
  kes: () => kes,
  monthKey: () => monthKey,
  pct: () => pct,
  raw: () => raw,
  skeleton: () => skeleton,
  statusKind: () => statusKind,
  str: () => str,
  sum: () => sum,
  toast: () => toast,
  today: () => today,
  vbars: () => vbars
});
function errMsg(e) {
  const m = e && (e.message || e.error_description) || String(e || "Something went wrong.");
  if (/row-level security|permission denied/i.test(m)) return "You do not have permission to do that.";
  if (/duplicate key/i.test(m)) return "That record already exists.";
  if (/Failed to fetch|NetworkError|network/i.test(m)) return "No connection. Check your internet and try again.";
  if (/Invalid login/i.test(m)) return "Wrong email or password.";
  return m;
}
function toast(msg, type = "ok") {
  const box = document.getElementById("toasts");
  if (!box) return;
  const t = document.createElement("div");
  t.className = "toast " + type;
  t.setAttribute("role", type === "error" ? "alert" : "status");
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => {
    t.classList.add("out");
    setTimeout(() => t.remove(), 300);
  }, type === "error" ? 6e3 : 3500);
}
async function busy(btn, fn, label2 = "Saving...") {
  if (btn && btn.dataset.busy) return;
  const orig = btn ? btn.innerHTML : "";
  if (btn) {
    btn.dataset.busy = "1";
    btn.disabled = true;
    btn.textContent = label2;
  }
  try {
    return await fn();
  } catch (e) {
    console.error(e);
    toast(errMsg(e), "error");
  } finally {
    if (btn && btn.isConnected) {
      delete btn.dataset.busy;
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  }
}
function ask({ title, message = "", fields = [], ok = "Confirm", danger = false, reason = false }) {
  return new Promise((resolve) => {
    const d = document.getElementById("dlg");
    const fs = fields.map((f) => f.type === "select" ? h`<label>${f.label}<select name="${f.name}">${f.options.map((o) => h`<option value="${o[0]}" ${o[0] == f.value ? "selected" : ""}>${o[1]}</option>`)}</select></label>` : h`<label>${f.label}<input name="${f.name}" type="${f.type || "text"}" value="${f.value ?? ""}" ${f.required ? "required" : ""} ${f.step ? `step="${f.step}"` : ""}></label>`);
    d.innerHTML = h`<form method="dialog" class="dform"><h3>${title}</h3><p>${message}</p>${fs}
      ${reason ? h`<label>Reason (kept in the audit log)<textarea name="reason" rows="2" required minlength="3"></textarea></label>` : ""}
      <div class="dbtn"><button type="button" class="btn ghost" data-x="cancel">Cancel</button><button class="btn ${danger ? "danger" : ""}" value="ok">${ok}</button></div></form>`.s;
    const form = d.querySelector("form");
    const done3 = (v) => {
      d.close();
      resolve(v);
    };
    d.querySelector('[data-x="cancel"]').onclick = () => done3(null);
    d.oncancel = () => resolve(null);
    form.onsubmit = (e) => {
      e.preventDefault();
      const o = {};
      new FormData(form).forEach((v, k) => o[k] = v);
      done3(o);
    };
    d.showModal();
  });
}
function csvParse(text) {
  const rows = [];
  let row2 = [], cur = "", q2 = false;
  text = String(text).replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q2) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else q2 = false;
      } else cur += c;
    } else if (c === '"') q2 = true;
    else if (c === ",") {
      row2.push(cur);
      cur = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row2.push(cur);
      rows.push(row2);
      row2 = [];
      cur = "";
    } else cur += c;
  }
  if (cur !== "" || row2.length) {
    row2.push(cur);
    rows.push(row2);
  }
  return rows.filter((r) => r.some((x) => x.trim() !== ""));
}
function download(name, text, mime = "text/csv;charset=utf-8") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\uFEFF" + text], { type: mime }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
}
function vbars(items, cols, names) {
  const n = cols.length, gw = n * 12 + 8, W = Math.max(items.length, 1) * gw + 40, H = 170, mx = Math.max(1, ...items.flatMap((i) => i.v));
  let g = "";
  items.forEach((it, k) => {
    const x = 36 + k * gw;
    it.v.forEach((v, j) => {
      const hh = Math.round(v / mx * (H - 40));
      g += `<rect x="${x + j * 12}" y="${H - 24 - hh}" width="10" height="${hh}" rx="2" style="fill:${cols[j]}"><title>${esc(it.l)}: ${kes(v)}</title></rect>`;
    });
    g += `<text x="${x + n * 6 - 1}" y="${H - 8}" font-size="9" text-anchor="middle" fill="currentColor">${esc(it.l)}</text>`;
  });
  return raw(`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${Math.min(680, W * 2)}px;height:auto" role="img"><text x="2" y="12" font-size="9" fill="currentColor">${kes(mx)}</text><line x1="34" y1="${H - 24}" x2="${W}" y2="${H - 24}" stroke="currentColor" opacity=".25"/>${g}</svg><p class="mu legend">${names.map((nm, j) => `<span style="color:${cols[j]}">&#9632;</span> ${esc(nm)}`).join(" &nbsp; ")}</p>`);
}
function hbars(items, max) {
  return h`<div class="hbars">${items.map((i) => h`<div class="hb"><span class="hl">${i.l}</span><div class="bar"><i style="width:${pct(i.v, i.max || max)}%;background:${i.c || "var(--green2)"}"></i></div><span class="hv">${kes(i.v)}</span></div>`)}</div>`;
}
function filterBar({ types, tname = "ptype", search = false } = {}) {
  const f = state.f;
  return h`<div class="fbar">${search ? h`<input id="fsearch" data-inp="search" placeholder="Search name" value="${f.q}">` : ""}
    <select name="year" data-chg="filter" aria-label="Year"><option value="all">All years</option>${YEARS().map((y) => h`<option ${f.year === y ? "selected" : ""}>${y}</option>`)}</select>
    <select name="month" data-chg="filter" aria-label="Month"><option value="all">All months</option>${MONTHS.map((n, i) => {
    const v = String(i + 1).padStart(2, "0");
    return h`<option value="${v}" ${f.month === v ? "selected" : ""}>${n}</option>`;
  })}</select>
    ${types ? h`<select name="${tname}" data-chg="filter" aria-label="Type"><option value="all">All types</option>${types.map((t) => h`<option value="${t[0]}" ${f[tname] === t[0] ? "selected" : ""}>${t[1]}</option>`)}</select>` : ""}</div>`;
}
var Safe, raw, ENT, esc, part, h, str, kes, MON, MONTHS, fdate, today, monthKey, pct, sum, $, $$, IC, icon, skeleton, empty, csvOut, debounce, bar, badge, statusKind, YEARS;
var init_utils = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/utils.js"() {
    init_state();
    Safe = class {
      constructor(s) {
        this.s = s;
      }
      toString() {
        return this.s;
      }
    };
    raw = (s) => new Safe(String(s ?? ""));
    ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ENT[c]);
    part = (v) => v instanceof Safe ? v.s : Array.isArray(v) ? v.map(part).join("") : v === false || v == null ? "" : esc(v);
    h = (s, ...v) => new Safe(s.reduce((a, x, i) => a + x + (i < v.length ? part(v[i]) : ""), ""));
    str = (x) => part(x);
    kes = (n) => "KES " + Math.round(Number(n) || 0).toLocaleString("en-US");
    MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    fdate = (d) => {
      if (!d) return "-";
      const [y, m, x] = String(d).slice(0, 10).split("-");
      return `${+x} ${MON[m - 1]} ${y}`;
    };
    today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    monthKey = (d) => String(d).slice(0, 7);
    pct = (a, b) => b > 0 ? Math.max(0, Math.min(100, Math.round(a / b * 100))) : 0;
    sum = (a, f = (x) => x) => a.reduce((s, x) => s + (Number(f(x)) || 0), 0);
    $ = (s, r = document) => r.querySelector(s);
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
    IC = {
      home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
      wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h3"/>',
      file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
      more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
      users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3 3 0 010 6M18 14c2 .6 3 2.500 3 6"/>',
      bank: '<path d="M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18"/>',
      cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
      vote: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',
      chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
      gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
      user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.600-7 8-7s8 3 8 7"/>',
      out: '<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      dash: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
      coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 10h4.500a1.500 1.500 0 010 3H9"/>',
      eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
      print: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
      down: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>'
    };
    icon = (n, c = "") => raw(`<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ""}</svg>`);
    skeleton = (n = 4) => raw(`<div class="skel-wrap">${'<div class="skel"></div>'.repeat(n)}</div>`);
    empty = (text, sub = "") => h`<div class="empty"><div class="empty-ic">${icon("file")}</div><p><b>${text}</b></p>${sub ? h`<p class="mu">${sub}</p>` : ""}</div>`;
    csvOut = (rows) => rows.map((r) => r.map((v) => {
      const s = String(v ?? "");
      return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(",")).join("\r\n");
    debounce = (f, ms = 250) => {
      let t;
      return (...a) => {
        clearTimeout(t);
        t = setTimeout(() => f(...a), ms);
      };
    };
    bar = (p, c = "") => raw(`<div class="bar big"><i style="width:${Math.max(0, Math.min(100, p))}%;${c ? "background:" + c : ""}"></i></div>`);
    badge = (t, kind2 = "") => h`<span class="badge ${kind2}">${t}</span>`;
    statusKind = (s) => ({ Complete: "ok", "On Track": "ok", Behind: "warn", "At Risk": "bad" })[s] || "";
    YEARS = () => {
      const y = (/* @__PURE__ */ new Date()).getFullYear(), a = [];
      for (let i = y; i >= 2022; i--) a.push(String(i));
      return a;
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/logo.js
var LOGO;
var init_logo = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/logo.js"() {
    LOGO = "data:image/png;base64,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";
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/config.js
var CONFIG;
var init_config = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/config.js"() {
    CONFIG = {
      url: "https://zjzatmkvinzhsqakgvtl.supabase.co",
      key: "sb_publishable_YOwidqPDngVirzOsJwtSpw_Jvh_lAvW"
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/supabase.js
async function rpc(name, args = {}) {
  const { data, error } = await sb.rpc(name, args);
  if (error) throw error;
  return data;
}
async function q(query) {
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
async function all(table, order = "id", cols = "*") {
  let out = [], from = 0;
  for (; ; ) {
    const { data, error } = await sb.from(table).select(cols).order(order).range(from, from + 999);
    if (error) throw error;
    out = out.concat(data);
    if (data.length < 1e3) break;
    from += 1e3;
  }
  return out;
}
var sb;
var init_supabase = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/supabase.js"() {
    init_config();
    sb = window.supabase.createClient(CONFIG.url, CONFIG.key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/data.js
async function loadCore() {
  const staff = state.role.staff;
  const [members, payments, periods, settings, ptypes, meetings, att, pens] = await Promise.all([
    all("members"),
    all("payments"),
    q(sb.from("contribution_periods").select("*").order("year").order("wave")),
    q(sb.from("settings").select("*")),
    q(sb.from("penalty_types").select("*")),
    q(sb.from("meetings").select("*").order("meeting_date")),
    all("meeting_attendance", "meeting_id"),
    q(sb.from("penalties").select("*"))
  ]);
  const S = { monthly_savings: 200, monthly_dowry: 1250, savings_start: "2025-12", payout_amount: 12e4, group_email: "", att_good: 80, att_fair: 60 };
  settings.forEach((r) => S[r.key] = r.value);
  const T = { ABSENT: 200, LATE: 50, SPECIAL_ABSENT: 1e3, UNPAID_MEETING: 100 };
  ptypes.forEach((t) => T[t.code] = Number(t.amount));
  const meetingById = {};
  meetings.forEach((m) => meetingById[m.id] = m);
  const ob = {};
  const obq = await sb.from("opening_balances").select("*");
  (obq.data || []).forEach((r) => ob[r.member_id] = r);
  const pos = {};
  if (staff) (await rpc("all_positions")).forEach((r) => pos[r.member_id] = r.pos);
  else if (state.meId) pos[state.meId] = await rpc("member_position", { p_member: state.meId });
  state.core = { members, payments, posted: payments.filter((p) => p.status === "posted"), periods, S, T, ptypes, meetings, meetingById, att, pens, pos, ob };
}
var core, me, memberName;
var init_data = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/data.js"() {
    init_state();
    init_supabase();
    core = () => state.core;
    me = () => state.core.members.find((m) => m.id === state.meId) || null;
    memberName = (id) => (state.core.members.find((m) => m.id === id) || {}).name || "Unknown";
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/auth.js
function loginView(mode = "in", m = {}) {
  let body;
  if (mode === "up") body = h`<form data-form="signup"><label>Email<input name="email" type="email" autocomplete="email" required></label>${pwField("password", "Choose a password (6 or more characters)")}${pwField("password2", "Confirm password")}${msgs(m)}<button class="btn" type="submit">Create account</button><p class="mu" style="margin-top:10px">Use the email the Treasurer registered for you. You will get a confirmation email.</p><div class="links"><a href="#" data-act="auth-mode" data-mode="in">Back to sign in</a></div></form>`;
  else if (mode === "forgot") body = h`<form data-form="forgot"><label>Email<input name="email" type="email" autocomplete="email" required></label>${msgs(m)}<button class="btn" type="submit">Send reset link</button><div class="links"><a href="#" data-act="auth-mode" data-mode="in">Back to sign in</a></div></form>`;
  else if (mode === "recovery") body = h`<form data-form="recovery"><p>Choose a new password.</p>${pwField("password", "New password")}${msgs(m)}<button class="btn" type="submit">Save password</button></form>`;
  else body = h`<form data-form="login"><label>Email<input name="email" type="email" autocomplete="email" required></label>${pwField("password", "Password")}${msgs(m)}<button class="btn" type="submit">Sign In</button><div class="links"><a href="#" data-act="auth-mode" data-mode="up">Create Account</a><a href="#" data-act="auth-mode" data-mode="forgot">Forgot Password</a></div></form>`;
  root().innerHTML = str(frame(body));
}
async function enter(session) {
  state.session = session;
  root().innerHTML = str(h`<div style="padding:24px;max-width:700px;margin:auto">${skeleton(3)}</div>`);
  try {
    const [admin, treasurer, secretary, staff] = await Promise.all(["is_admin", "is_treasurer", "is_secretary", "is_staff"].map((f) => rpc(f)));
    state.role = { admin, treasurer, secretary, staff };
    state.meId = await rpc("claim_member");
    if (!state.meId && !staff) return unlinked(session);
    await loadCore();
    hooks.mount();
  } catch (e) {
    console.error(e);
    root().innerHTML = str(frame(h`<p class="err">${errMsg(e)}</p><p class="mu">The app could not load. Check your internet connection and try again.</p><button class="btn" data-act="reload">Try again</button><button class="btn ghost" data-act="logout">Sign out</button>`));
  }
}
function unlinked(session) {
  root().innerHTML = str(frame(h`<p><b>Your account is not linked to a member yet.</b></p><p class="mu">You are signed in as ${session.user.email}. Ask the Treasurer to add this exact email to your member record, then sign in again.</p><button class="btn" data-act="logout">Sign out</button>`));
}
async function startAuth() {
  sb.auth.onAuthStateChange((ev) => {
    if (ev === "PASSWORD_RECOVERY") {
      state.recovery = true;
      loginView("recovery");
    }
    if (ev === "SIGNED_OUT" && state.session) {
      state.session = null;
      loginView();
    }
  });
  const { data } = await sb.auth.getSession();
  if (state.recovery) return;
  data.session ? enter(data.session) : loginView();
}
var root, frame, pwField, msgs;
var init_auth = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/auth.js"() {
    init_state();
    init_supabase();
    init_utils();
    init_logo();
    init_data();
    root = () => document.getElementById("root");
    frame = (inner) => h`<div class="login"><div class="lcard"><img class="logo" src="${LOGO}" alt="Real Brothers 022"><h1>REAL BROTHERS 022</h1><div class="sub">Dowry Support &amp; Mutual Aid Group</div>${inner}</div></div>`;
    pwField = (name, label2) => h`<label>${label2}<div class="pw"><input name="${name}" type="password" autocomplete="${name === "password" ? "current-password" : "new-password"}" required minlength="6"><button type="button" data-act="toggle-pw" aria-label="Show or hide password">${icon("eye")}</button></div></label>`;
    msgs = (m = {}) => h`${m.err ? h`<p class="err" role="alert">${m.err}</p>` : ""}${m.ok ? h`<p class="ok" role="status">${m.ok}</p>` : ""}`;
    actions["auth-mode"] = (el) => loginView(el.dataset.mode);
    actions["toggle-pw"] = (el) => {
      const i = el.parentElement.querySelector("input");
      i.type = i.type === "password" ? "text" : "password";
    };
    forms.login = async (d) => {
      const { data, error } = await sb.auth.signInWithPassword({ email: d.email.trim(), password: d.password });
      if (error) return loginView("in", { err: errMsg(error) });
      await enter(data.session);
    };
    forms.signup = async (d) => {
      if (d.password !== d.password2) return loginView("up", { err: "The passwords do not match." });
      const { data, error } = await sb.auth.signUp({ email: d.email.trim().toLowerCase(), password: d.password, options: { emailRedirectTo: location.origin + location.pathname } });
      if (error) return loginView("up", { err: errMsg(error) });
      if (data.session) return enter(data.session);
      if (data.user && data.user.identities && data.user.identities.length === 0) return loginView("in", { err: "This email already has an account. Sign in, or use Forgot Password." });
      loginView("in", { ok: "Account created. Open the confirmation email, tap the link, then sign in." });
    };
    forms.forgot = async (d) => {
      const { error } = await sb.auth.resetPasswordForEmail(d.email.trim(), { redirectTo: location.origin + location.pathname });
      loginView("in", error ? { err: errMsg(error) } : { ok: "If that email has an account, a reset link is on its way." });
    };
    forms.recovery = async (d) => {
      const { error } = await sb.auth.updateUser({ password: d.password });
      if (error) return loginView("recovery", { err: errMsg(error) });
      state.recovery = false;
      toast("Password changed.");
      const { data } = await sb.auth.getSession();
      data.session ? enter(data.session) : loginView();
    };
    actions.logout = async () => {
      await sb.auth.signOut();
      state.session = null;
      state.core = null;
      location.hash = "";
      loginView();
    };
    actions.reload = () => location.reload();
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/engine.js
function savingsPosition(m, c = state.core) {
  const ms = Number(c.S.monthly_savings) || 200, T = c.T;
  let st = idxOf(c.S.savings_start || "2025-12");
  if (m.joined_on) st = Math.max(st, idxOf(monthKey(m.joined_on)));
  const ob = c.ob && c.ob[m.id];
  if (ob) st = Math.max(st, idxOf(monthKey(ob.as_of)) + 1);
  const bf = ob ? Number(ob.monthly_2025) + Number(ob.monthly_2026) : 0;
  const now = /* @__PURE__ */ new Date(), en = Math.max(now.getFullYear() * 12 + now.getMonth(), st);
  const pay = {};
  c.posted.filter((x) => x.member_id === m.id && (x.kind === "savings" || x.kind === "penalty")).forEach((x) => {
    const k = idxOf(monthKey(x.paid_on));
    if (k >= st) pay[k] = (pay[k] || 0) + Number(x.amount);
  });
  const att = {};
  c.att.filter((a) => a.member_id === m.id).forEach((a) => {
    const mt = c.meetingById[a.meeting_id];
    if (mt) att[monthKey(mt.meeting_date)] = a.status;
  });
  const held = new Set(c.meetings.map((x) => monthKey(x.meeting_date)));
  const rows = [];
  let cp = 0, cd = 0, fines = 0;
  for (let k = st; k <= en; k++) {
    const key = keyOf(k), p = pay[k] || 0, status = att[key];
    const abs = status ? status === "absent" : p === 2 * ms;
    const late = status === "late";
    const unpaid = p === 0 && status !== "excused" && (k < en || held.has(key));
    const d = ms + (abs ? T.ABSENT : 0) + (late ? T.LATE : 0) + (unpaid ? T.UNPAID_MEETING : 0);
    fines += d - ms;
    cp += p;
    cd += d;
    rows.push({ key, label: MON[k % 12] + " " + Math.floor(k / 12), mon: MON[k % 12], p, d, abs, late, unpaid, status: status || null, cp, cd, bal: cp - cd - bf });
  }
  const extra = sum(c.pens.filter((x) => x.member_id === m.id && x.status === "outstanding"), (x) => x.amount);
  rows.forEach((x) => x.cv = []);
  rows.forEach((x, i) => {
    const j = rows.findIndex((y, t) => t >= i && y.cp >= x.cd);
    if (j < 0) x.cl = "Unpaid";
    else {
      x.cl = j === i ? x.p > 0 ? "Paid on time" : "Covered by earlier payment" : "Paid in " + rows[j].label + " (late)";
      if (j !== i) rows[j].cv.push(x.label);
    }
  });
  const net = cp - cd - extra - bf;
  return { rows, owing: Math.max(0, -net), credit: Math.max(0, net), extra, bf, ob, fines: fines + extra, due: cd + extra + bf, paid: cp, next: ms + (Number(c.S.monthly_dowry) || 1250) };
}
function periodRows(m, c = state.core) {
  const yr = (/* @__PURE__ */ new Date()).getFullYear(), start = m.joined_on || "2023-01-01", td = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  return c.periods.filter((p) => p.due_date >= start && p.year <= yr).map((p) => {
    const paid = sum(c.posted.filter((x) => x.member_id === m.id && x.kind === "dowry" && x.period_id === p.id), (x) => x.amount);
    const bal = Math.max(0, p.target - paid);
    const st = bal === 0 ? "Cleared" : p.due_date < td ? "Overdue" : p.start_date <= td ? "Open" : "Not yet due";
    return { p, label: `Wave ${p.wave} ${p.year}`, paid, bal, st };
  });
}
function summarise(m, c = state.core) {
  const sp = savingsPosition(m, c), pos = c.pos[m.id] || { status: "Behind", overdue: 0, paid: 0, expected_to_date: 0, next_due: null };
  const mine2 = c.posted.filter((x) => x.member_id === m.id);
  const yr = (/* @__PURE__ */ new Date()).getFullYear();
  const yp = c.periods.filter((p) => p.year === yr);
  const yearTarget = sum(yp, (p) => p.target), yearPaid = sum(mine2.filter((x) => x.kind === "dowry" && yp.some((p) => p.id === x.period_id)), (x) => x.amount);
  return {
    m,
    sp,
    pos,
    savingsPaid: sum(mine2.filter((x) => x.kind === "savings"), (x) => x.amount),
    dowryPaid: sum(mine2.filter((x) => x.kind === "dowry"), (x) => x.amount),
    totalPaid: sum(mine2, (x) => x.amount),
    yearTarget,
    yearPaid,
    owing: sp.owing + Number(pos.overdue || 0),
    status: pos.status,
    finesDue: sp.fines
  };
}
function financeSummary(ledger, c = state.core, f = state.f) {
  const L = ledger.filter((x) => x.status === "posted");
  const month = f.year === "all" ? "all" : f.month;
  let S = "0000-00-00", E = "9999-12-31";
  if (f.year !== "all") {
    S = `${f.year}-${month === "all" ? "01" : month}-01`;
    E = `${f.year}-${month === "all" ? "12" : month}-31`;
  }
  const ev = [];
  c.posted.forEach((x) => ev.push({ d: x.paid_on, k: x.kind === "savings" ? "sav" : x.kind === "dowry" ? "dow" : "pen", a: Number(x.amount) }));
  L.forEach((x) => ev.push({ d: x.entry_date, k: x.kind, a: Number(x.amount), cat: x.category }));
  const od = L.filter((x) => x.kind === "opening").map((x) => x.entry_date).sort().pop() || "0000-00-00";
  const ev2 = ev.filter((e) => e.k === "opening" ? e.d === od : e.d >= od);
  const sg = { sav: 1, dow: 1, pen: 1, opening: 1, other_income: 1, deposit_returned: 1, expense: -1, refund: -1, payout: -1, deposit_placed: -1 };
  const bf = sum(ev2.filter((e) => e.d < S), (e) => sg[e.k] * e.a);
  const per = ev2.filter((e) => e.d >= S && e.d <= E), g = (k) => sum(per.filter((e) => e.k === k), (e) => e.a);
  const interest = sum(per.filter((e) => e.k === "other_income" && /interest/i.test(e.cat || "")), (e) => e.a);
  const inv = sum(ev2.filter((e) => e.d <= E && (e.k === "deposit_placed" || e.k === "deposit_returned")), (e) => e.k === "deposit_placed" ? e.a : -e.a);
  const r = { bf, sav: g("sav"), dow: g("dow"), pen: g("pen"), op: g("opening"), oi: g("other_income"), interest, dr: g("deposit_returned"), ex: g("expense"), rf: g("refund"), po: g("payout"), dp: g("deposit_placed"), inv };
  r.income = r.sav + r.dow + r.pen + r.op + r.oi + r.dr;
  r.out = r.ex + r.rf + r.po + r.dp;
  r.close = bf + r.income - r.out;
  return r;
}
var keyOf, idxOf, inPeriod;
var init_engine = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/engine.js"() {
    init_utils();
    init_state();
    keyOf = (k) => Math.floor(k / 12) + "-" + String(k % 12 + 1).padStart(2, "0");
    idxOf = (ymStr) => {
      const [y, m] = ymStr.split("-").map(Number);
      return y * 12 + m - 1;
    };
    inPeriod = (d, f = state.f) => {
      const s = String(d);
      return (f.year === "all" || s.slice(0, 4) === f.year) && (f.month === "all" || s.slice(5, 7) === f.month);
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/attendance.js
var attendance_exports = {};
__export(attendance_exports, {
  attRating: () => attRating,
  attStats: () => attStats,
  routes: () => routes
});
function attStats(mid, all2 = false) {
  const c = core(), rows = c.att.filter((a) => a.member_id === mid).map((a) => ({ a, mt: c.meetingById[a.meeting_id] })).filter((x) => x.mt && (all2 || inPeriod(x.mt.meeting_date)));
  const n = (s) => rows.filter((x) => x.a.status === s).length, total = rows.length, den = total - n("excused");
  const byDate = rows.slice().sort((a, b) => a.mt.meeting_date < b.mt.meeting_date ? -1 : 1);
  let streak = 0;
  for (let i = byDate.length - 1; i >= 0 && byDate[i].a.status === "absent"; i--) streak++;
  return { rows, total, present: n("present"), absent: n("absent"), late: n("late"), excused: n("excused"), streak, rate: den > 0 ? pct(n("present") + n("late"), den) : 0 };
}
function attRating(s) {
  const S = core().S, good = Number(S.att_good) || 80, fair = Number(S.att_fair) || 60;
  if (s.total < 3) return { label: "Not enough records", kind: "", note: "Needs at least 3 recorded meetings" };
  if (s.streak >= 3) return { label: "Poor", kind: "bad", note: `Absent ${s.streak} meetings in a row` };
  if (s.rate >= good) return { label: "Good", kind: "ok", note: `${s.rate}% attendance` };
  if (s.rate >= fair) return { label: "Fair", kind: "warn", note: `${s.rate}% attendance` };
  return { label: "Poor", kind: "bad", note: `${s.rate}% attendance` };
}
async function record() {
  const c = core(), date = state.f.mdate || today(), active = c.members.filter((m) => m.status === "active");
  const mt = c.meetings.find((x) => x.meeting_date === date), cur = {};
  if (mt) c.att.filter((a) => a.meeting_id === mt.id).forEach((a) => cur[a.member_id] = a.status);
  const stats = active.map((m) => ({ m, s: attStats(m.id) }));
  return h`<div class="card"><h2>Record a meeting</h2><form data-form="att-save"><div class="row"><label>Meeting date<input type="date" name="date" value="${date}" data-chg="mdate" required></label><label>Notes (optional)<input name="notes" value="${mt && mt.notes && !/Migrated/.test(mt.notes) ? mt.notes : ""}"></label></div>
    ${mt ? h`<p class="mu">A record already exists for this date. Saving updates it.</p>` : ""}
    <div class="row" style="margin:10px 0">${STATUS.map((s) => h`<button type="button" class="btn sm ghost" data-act="att-all" data-v="${s[0]}">All ${s[1].toLowerCase()}</button>`)}</div>
    <div class="tw"><table><tbody>${active.map((m) => h`<tr><td class="t">${m.name}</td><td><select data-mid="${m.id}" aria-label="Status for ${m.name}">${STATUS.map((s) => h`<option value="${s[0]}" ${(cur[m.id] || "present") === s[0] ? "selected" : ""}>${s[1]}</option>`)}</select></td></tr>`)}</tbody></table></div>
    <div class="sticky-act"><button class="btn" type="submit">Save attendance</button></div></form>
    <p class="mu">Absent adds KES ${c.T.ABSENT} and late adds KES ${c.T.LATE} to what the member owes for that month. Excused adds nothing.</p></div>
  ${filterBar()}<div class="card"><h2>Attendance summary</h2><div class="tw"><table><thead><tr><th>Member</th><th>Meetings</th><th>Present</th><th>Absent</th><th>Late</th><th>Excused</th><th>Attendance</th><th class="t">Rating</th></tr></thead><tbody>${stats.map(({ m, s }) => {
    const r = attRating(s);
    return h`<tr><td>${m.name}</td><td>${s.total}</td><td>${s.present}</td><td>${s.absent}</td><td>${s.late}</td><td>${s.excused}</td><td>${s.total ? s.rate + "%" : "-"}</td><td class="t">${badge(r.label, r.kind)}<div class="mu">${s.streak >= 3 ? r.note : ""}</div></td></tr>`;
  })}</tbody></table></div></div>`;
}
async function mine() {
  const m = me();
  if (!m) return h`<div class="card">${empty("No member record is linked to this login.")}</div>`;
  const s = attStats(m.id);
  const r = attRating(attStats(m.id, true));
  return h`<div class="card hero" style="${r.kind === "bad" ? "background:linear-gradient(135deg,#7a2219,#b3392f)" : r.kind === "warn" ? "background:linear-gradient(135deg,#8a5a0c,#b77a14)" : ""}"><div class="mu">YOUR ATTENDANCE RECORD</div><div style="font-size:30px;font-weight:700">${r.label}</div><div>${r.note}</div>
    <div class="mu" style="margin-top:6px">Good is ${core().S.att_good || 80}% or more. Fair is ${core().S.att_fair || 60}% or more. Missing 3 meetings in a row counts as Poor.</div></div>${filterBar()}<div class="grid"><div class="kpi"><small>Meetings</small><b>${s.total}</b></div><div class="kpi green"><small>Present</small><b>${s.present}</b></div><div class="kpi red"><small>Absent</small><b>${s.absent}</b></div><div class="kpi"><small>Late</small><b>${s.late}</b></div><div class="kpi gold"><small>Attendance</small><b>${s.total ? s.rate + "%" : "-"}</b></div></div>
  <div class="card"><h2>My meetings</h2>${s.rows.length ? h`<div class="tw"><table><tbody>${s.rows.sort((a, b) => a.mt.meeting_date < b.mt.meeting_date ? 1 : -1).map((x) => h`<tr><td class="t">${fdate(x.mt.meeting_date)}</td><td class="t">${badge(STATUS.find((t) => t[0] === x.a.status)[1], x.a.status === "present" ? "ok" : x.a.status === "absent" ? "bad" : "warn")}</td></tr>`)}</tbody></table></div>` : empty("No attendance records yet.")}</div>`;
}
var STATUS, routes;
var init_attendance = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/attendance.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    init_engine();
    STATUS = [["present", "Present"], ["absent", "Absent"], ["late", "Late"], ["excused", "Excused"]];
    changes.mdate = (el) => {
      state.f.mdate = el.value;
      hooks.route();
    };
    forms["att-save"] = async (d, form) => {
      const entries = [...form.querySelectorAll("select[data-mid]")].map((s) => ({ member_id: +s.dataset.mid, status: s.value }));
      const n = await rpc("record_attendance", { p_date: d.date, p_entries: entries, p_notes: d.notes || null });
      toast(`Attendance saved for ${n} members.`);
      await hooks.refresh();
    };
    actions["att-all"] = (el) => {
      document.querySelectorAll("select[data-mid]").forEach((s) => s.value = el.dataset.v);
    };
    routes = {
      att: { title: "Attendance", sub: "Record who attended", need: "secretary", view: record },
      myatt: { title: "My Attendance", need: "member", view: mine }
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/dashboard.js
var dashboard_exports = {};
__export(dashboard_exports, {
  routes: () => routes2,
  typeLabel: () => typeLabel
});
async function memberHome() {
  const m = me();
  if (!m) return h`<div class="card">${empty("No member record is linked to this login.")}</div>`;
  const c = core(), s = summarise(m);
  const [un, els, voted] = await Promise.all([
    sb.from("message_targets").select("message_id", { count: "exact", head: true }).eq("member_id", m.id).eq("read", false),
    q(sb.from("elections").select("id,status,closes_at")),
    q(sb.from("voted").select("election_id").eq("member_id", m.id))
  ]);
  const unread = un.count || 0, now = /* @__PURE__ */ new Date();
  const openVotes = els.filter((e) => e.status === "open" && (!e.closes_at || new Date(e.closes_at) > now) && !voted.some((v) => v.election_id === e.id)).length;
  const mine2 = latest(c.posted.filter((p) => p.member_id === m.id)).slice(0, 8);
  const yp = pct(s.yearPaid, s.yearTarget);
  return h`
  <div class="card hero"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><div class="mu">Hello, ${m.name.split(" ")[0]}</div><div class="mu" style="margin-top:8px">TOTAL CONTRIBUTED</div><div style="font-size:32px;font-weight:700">${kes(s.totalPaid)}</div></div>
    <div style="text-align:right"><div>${badge(s.status, statusKind(s.status))}</div><div class="mu" style="margin-top:6px">Account no: ${m.id_number || "not set"}</div></div></div></div>
  ${unread || openVotes ? h`<div class="alert">${unread ? h`<a href="#/inbox"><b>${unread} unread message${unread > 1 ? "s" : ""}</b></a>` : ""}${unread && openVotes ? " \xB7 " : ""}${openVotes ? h`<a href="#/myvote"><b>${openVotes} vote${openVotes > 1 ? "s" : ""} waiting for you</b></a>` : ""}</div>` : ""}
  <div class="grid">
    <div class="kpi green"><small>My savings</small><b>${kes(s.savingsPaid)}</b></div>
    <div class="kpi gold"><small>Dowry contribution ${(/* @__PURE__ */ new Date()).getFullYear()}</small><b>${kes(s.yearPaid)} / ${kes(s.yearTarget)}</b>${bar(yp)}<div class="sub">${yp}% complete</div></div>
    <div class="kpi ${s.owing > 0 ? "red" : "green"}"><small>Total owing</small><b class="${s.owing > 0 ? "bad" : "ok"}">${kes(s.owing)}</b><div class="sub">${s.owing > 0 ? "Savings and fines " + kes(s.sp.owing) + ", dowry overdue " + kes(s.pos.overdue) : "You are up to date"}</div></div>
    ${(() => {
    const r = attRating(attStats(m.id, true));
    return h`<div class="kpi ${r.kind === "bad" ? "red" : r.kind === "ok" ? "green" : ""}"><small>Attendance</small><b>${r.label}</b><div class="sub">${r.note}</div></div>`;
  })()}
    <div class="kpi"><small>Next contribution</small><b>${kes(s.sp.next)}</b><div class="sub">${kes(c.S.monthly_savings)} savings + ${kes(c.S.monthly_dowry)} dowry${s.pos.next_due ? " \xB7 wave due " + fdate(s.pos.next_due) : ""}</div></div>
  </div>
  <div class="card"><h2>Quick actions</h2><div class="quick">
    <a href="#/contrib">${icon("wallet")}My Contributions</a><a href="#/statement">${icon("file")}My Statement</a><a href="#/myatt">${icon("cal")}Attendance</a>
    <a href="#/inbox">${icon("mail")}Messages</a><a href="#/myvote">${icon("vote")}Voting</a><a href="#/profile">${icon("user")}My Profile</a></div></div>
  <div class="card"><h2>Recent payments</h2>${recent(mine2, false)}</div>`;
}
async function staffHome() {
  const c = core(), t = state.role.treasurer;
  const active = c.members.filter((m) => m.status === "active"), rows = active.map((m) => summarise(m));
  const ledger = t ? await all("ledger") : null;
  const fin = t ? financeSummary(ledger, c, { year: "all", month: "all" }) : null;
  const yr = String((/* @__PURE__ */ new Date()).getFullYear()), by = (s) => rows.filter((r) => r.status === s).length;
  const pending = c.members.filter((m) => m.status === "left" && m.refund_status !== "refunded").length;
  const months = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"), l: MON[d.getMonth()] });
  }
  const col = months.map((mo) => ({ l: mo.l, v: [sum(c.posted.filter((p) => p.kind !== "dowry" && monthKey(p.paid_on) === mo.key), (p) => p.amount), sum(c.posted.filter((p) => p.kind === "dowry" && monthKey(p.paid_on) === mo.key), (p) => p.amount)] }));
  const owe = rows.filter((r) => r.owing > 0).sort((a, b) => b.owing - a.owing).slice(0, 10).map((r) => ({ l: r.m.name, v: r.owing, max: Math.max(1, ...rows.map((x) => x.owing)), c: "var(--bad)" }));
  const prog = rows.map((r) => ({ l: r.m.name, v: r.yearPaid, max: r.yearTarget || 15e3, c: r.status === "Complete" || r.status === "On Track" ? "var(--green2)" : r.status === "Behind" ? "var(--warn)" : "var(--bad)" }));
  const lastMt = c.meetings.slice().sort((a, b) => a.meeting_date < b.meeting_date ? 1 : -1)[0];
  const ac = lastMt ? c.att.filter((a) => a.meeting_id === lastMt.id) : [];
  const att = active.map((m) => ({ m, s: attStats(m.id, true) })).map((x) => ({ ...x, r: attRating(x.s) })), poorAtt = att.filter((x) => x.r.kind === "bad");
  const noOpening = t && !ledger.some((x) => x.kind === "opening" && x.status === "posted");
  return h`
  ${noOpening ? h`<div class="alert"><b>Group balance is not reliable yet.</b> Record an <a href="#/finance">Opening balance</a> (the group's total money on the day your records start, for example 1 January 2025). Until then the balance counts every payment since 2023 and nothing that was spent.</div>` : ""}
  <div class="grid">
    <div class="kpi green"><small>Active members</small><b>${active.length} / 25</b></div>
    <div class="kpi"><small>Total savings</small><b>${kes(sum(c.posted.filter((p) => p.kind === "savings"), (p) => p.amount))}</b></div>
    <div class="kpi gold"><small>Dowry fund ${yr}</small><b>${kes(sum(rows, (r) => r.yearPaid))}</b><div class="sub">of ${kes(sum(rows, (r) => r.yearTarget))} target</div></div>
    ${t ? h`<div class="kpi green"><small>Group balance</small><b>${kes(fin.close)}</b><div class="sub">In fixed deposits ${kes(fin.inv)}</div></div>` : ""}
    <div class="kpi red"><small>Outstanding contributions</small><b class="bad">${kes(sum(rows, (r) => r.owing))}</b></div>
    <div class="kpi"><small>Fully paid</small><b>${by("Complete")}</b></div><div class="kpi"><small>Behind</small><b class="warn">${by("Behind")}</b></div><div class="kpi"><small>At risk</small><b class="bad">${by("At Risk")}</b></div>
    <div class="kpi"><small>Benefited</small><b>${c.members.filter((m) => m.benefited).length}</b></div><div class="kpi"><small>Former members</small><b>${c.members.filter((m) => m.status === "left").length}</b></div><div class="kpi"><small>Refunds pending</small><b>${pending}</b></div>
  </div>
  <div class="card"><h2>Monthly collections</h2>${vbars(col, ["var(--green2)", "var(--gold)"], ["Savings and fines", "Dowry"])}</div>
  <div class="card"><h2>Dowry progress ${yr}</h2>${prog.length ? hbars(prog, 15e3) : empty("No active members.")}</div>
  ${owe.length ? h`<div class="card"><h2>Largest outstanding balances</h2>${hbars(owe, 1)}</div>` : ""}
  <div class="card"><h2>Recent payments</h2>${recent(latest(c.posted).slice(0, 8), true)}</div>
  ${t ? h`<div class="card"><h2>Recent finance transactions</h2>${ledger.length ? h`<div class="list">${ledger.slice().sort((a, b) => a.entry_date < b.entry_date ? 1 : -1).slice(0, 8).map((x) => h`<div class="it ${x.status}"><div><b>${x.category || x.kind}</b><div class="mu">${fdate(x.entry_date)}${x.description ? " \xB7 " + x.description : ""}${x.status === "voided" ? " \xB7 VOIDED" : ""}</div></div><b>${kes(x.amount)}</b></div>`)}</div>` : empty("No finance transactions yet.")}</div>` : ""}
  <div class="card"><h2>Attendance summary</h2>${lastMt ? h`<p class="mu">Latest meeting: ${fdate(lastMt.meeting_date)}</p><div class="grid" style="margin:0"><div class="kpi"><small>Present</small><b>${ac.filter((a) => a.status === "present").length}</b></div><div class="kpi"><small>Absent</small><b>${ac.filter((a) => a.status === "absent").length}</b></div><div class="kpi"><small>Late</small><b>${ac.filter((a) => a.status === "late").length}</b></div><div class="kpi"><small>Excused</small><b>${ac.filter((a) => a.status === "excused").length}</b></div></div>` : empty("No attendance records yet.")}
    ${att.some((x) => x.r.label !== "Not enough records") ? h`<p style="margin-top:12px"><b>Attendance ratings:</b> ${badge(att.filter((x) => x.r.label === "Good").length + " Good", "ok")} ${badge(att.filter((x) => x.r.label === "Fair").length + " Fair", "warn")} ${badge(poorAtt.length + " Poor", "bad")}</p>${poorAtt.length ? h`<p class="mu">Poor attendance: ${poorAtt.map((x) => x.m.name + " (" + x.r.note + ")").join("; ")}</p>` : ""}` : ""}</div>`;
}
var typeLabel, recent, latest, routes2;
var init_dashboard = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/dashboard.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    init_engine();
    init_attendance();
    typeLabel = (p) => p.kind === "savings" ? "Monthly Savings" : p.kind === "dowry" ? "Dowry Contribution" + (p.wave ? " (" + p.wave + ")" : "") : p.kind === "penalty" ? "Penalty payment" : "Other contribution";
    recent = (rows, withName) => rows.length ? h`<div class="list">${rows.map((p) => h`<div class="it"><div><b>${typeLabel(p)}</b><div class="mu">${fdate(p.paid_on)}${withName ? " \xB7 " + memberName(p.member_id) : ""}</div></div><b class="ok">+ ${kes(p.amount)}</b></div>`)}</div>` : empty("No payments recorded yet.");
    latest = (rows) => rows.slice().sort((a, b) => a.paid_on < b.paid_on ? 1 : a.paid_on > b.paid_on ? -1 : b.id - a.id);
    routes2 = {
      home: { title: "Home", need: "member", view: memberHome },
      dash: { title: "Dashboard", sub: "Group overview", need: "staff", view: staffHome }
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/reports.js
var reports_exports = {};
__export(reports_exports, {
  downloadStatement: () => downloadStatement,
  openStatement: () => openStatement,
  routes: () => routes3,
  statementHtml: () => statementHtml
});
function statementData(m) {
  const c = core(), s = summarise(m), sp = s.sp, pr = periodRows(m);
  const pays = c.payments.filter((p) => p.member_id === m.id && p.status === "posted").sort((a, b) => a.paid_on < b.paid_on ? -1 : 1);
  const pens = c.pens.filter((p) => p.member_id === m.id && p.status !== "voided");
  const no = "RB022-" + String(m.id).padStart(3, "0") + "-" + today().replace(/-/g, "");
  return { c, s, sp, pr, pays, pens, no, dowryOverdue: Number(s.pos.overdue || 0) };
}
function statementHtml(m) {
  const { c, s, sp, pr, pays, pens, no, dowryOverdue } = statementData(m);
  const pen = sp.rows.reduce((a, r) => a + (r.d - Number(c.S.monthly_savings)), 0);
  return str(h`<!doctype html><html><head><meta charset="utf-8"><title>${m.name} - statement</title><style>
@page{size:A4;margin:12mm}*{box-sizing:border-box}body{font:12px/1.45 Arial,Helvetica,sans-serif;color:#1c2521;margin:0;padding:6px}
.lh{display:flex;align-items:center;gap:16px;padding-bottom:10px;border-bottom:4px solid #0d4a2f;position:relative}.lh:after{content:"";position:absolute;left:0;right:0;bottom:-8px;border-bottom:1px solid #b8924a}
.lh img{height:90px;width:auto}.nm{font:bold 26px Georgia,serif;letter-spacing:2px;color:#0d4a2f;margin:0}.sub{color:#8a6d1f;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin:2px 0 6px}.ct{color:#444;font-size:11.5px}
.ti{display:flex;justify-content:space-between;align-items:flex-end;margin:24px 0 10px}.ti h1{font:bold 18px Arial;letter-spacing:3px;margin:0}.rf{text-align:right;font-size:11px;color:#555}
.info{display:flex;border:1px solid #cfd8d3;margin-bottom:6px}.info div{flex:1;padding:8px 12px;border-right:1px solid #cfd8d3}.info div:last-child{border:0}.info small{display:block;color:#6b746e;font-size:10px;text-transform:uppercase;letter-spacing:1px}.info b{font-size:14px}
h2{font:bold 12px Arial;text-transform:uppercase;letter-spacing:1.5px;color:#0d4a2f;border-bottom:1px solid #0d4a2f;padding-bottom:3px;margin:20px 0 8px}
table{border-collapse:collapse;width:100%;font-size:11.5px;margin-bottom:4px}tr{page-break-inside:avoid}th{background:#0d4a2f;color:#fff;text-align:left;padding:7px 9px;border:1px solid #0d4a2f}td{padding:6px 9px;border:1px solid #d5dcd8}tr:nth-child(even) td{background:#f4f7f5}
.n td:nth-child(n+2),.n th:nth-child(n+2){text-align:right}.tot td{background:#e6efe9!important;font-weight:bold;font-size:13px;border-top:2px solid #0d4a2f}
p.mu{font-size:10.5px;color:#555;margin:4px 0}.sg{display:flex;gap:40px;margin-top:46px}.sg div{flex:1;border-top:1px solid #333;padding-top:4px;font-size:11px;color:#444}
.ft{margin-top:22px;padding-top:6px;border-top:1px solid #b8924a;font-size:10px;color:#666;text-align:center}
@media print{th,.tot td,tr:nth-child(even) td{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>
<div class="lh"><img src="${LOGO}" alt=""><div><p class="nm">REAL BROTHERS 022</p><p class="sub">Dowry Support &amp; Mutual Aid Group</p><div class="ct">Email: ${c.S.group_email || "realbrothers022@gmail.com"}</div></div></div>
<div class="ti"><h1>MEMBER STATEMENT</h1><div class="rf">Statement no: ${no}<br>Date: ${fdate(today())}</div></div>
<div class="info"><div><small>Member</small><b>${m.name}</b></div><div><small>Account no.</small><b>${m.id_number || "-"}</b></div><div><small>Standing</small><b>${m.status === "left" ? "Former member" : s.status}</b></div><div><small>Total owing now</small><b>${kes(s.owing)}</b></div></div>
<h2>Summary</h2><table class="n"><tr><th></th><th>Due</th><th>Paid</th><th>Balance owing</th></tr>
<tr><td>Monthly contributions and fines</td><td>${kes(sp.due)}</td><td>${kes(sp.paid)}</td><td>${kes(sp.owing)}</td></tr>
<tr><td>Dowry waves due so far</td><td>${kes(sum(pr.filter((x) => x.p.due_date < today()), (x) => x.p.target))}</td><td>${kes(sum(pr.filter((x) => x.p.due_date < today()), (x) => Math.min(x.paid, x.p.target)))}</td><td>${kes(dowryOverdue)}</td></tr>
<tr class="tot"><td>Total owing now</td><td></td><td></td><td>${kes(s.owing)}</td></tr></table>
${sp.ob ? h`<p class="mu"><b>Brought forward at ${fdate(sp.ob.as_of)}:</b> monthly 2025 ${kes(sp.ob.monthly_2025)} + monthly 2026 ${kes(sp.ob.monthly_2026)} = ${kes(sp.bf)}. Months up to that date are inside this figure; the table below starts the month after.</p>` : ""}<p class="mu">Fines included in monthly dues: ${kes(sp.fines)} (absence ${kes(c.T.ABSENT)}, late ${kes(c.T.LATE)}, not paid at the meeting ${kes(c.T.UNPAID_MEETING)}). Total savings paid to date: ${kes(s.savingsPaid)}. Dowry paid to date: ${kes(s.dowryPaid)}.</p>
<h2>Monthly contributions</h2><table class="n"><tr><th>Month</th><th>Due</th><th>Paid</th><th>Balance</th><th style="text-align:left">Status</th></tr>${sp.rows.map((x) => h`<tr><td>${x.label}</td><td>${kes(x.d)}</td><td>${x.p ? kes(x.p) : "-"}</td><td>${x.bal < 0 ? "Owing " + kes(-x.bal) : x.bal > 0 ? "Credit " + kes(x.bal) : "Nil"}</td><td style="text-align:left">${x.cl}${x.cv.length ? " (also covers " + x.cv.join(", ") + ")" : ""}</td></tr>`)}</table>
<h2>Dowry waves</h2><table class="n"><tr><th>Wave</th><th>Due by</th><th>Paid</th><th>Balance</th><th style="text-align:left">Status</th></tr>${pr.map((x) => h`<tr><td>${x.label}</td><td>${fdate(x.p.due_date)}</td><td>${kes(x.paid)}</td><td>${kes(x.bal)}</td><td style="text-align:left">${x.st}</td></tr>`)}</table>
${pens.length ? h`<h2>Penalties added</h2><table class="n"><tr><th>Date</th><th>Amount</th><th style="text-align:left">Status</th><th style="text-align:left">Note</th></tr>${pens.map((p) => h`<tr><td>${fdate(p.incurred_on)}</td><td>${kes(p.amount)}</td><td style="text-align:left">${p.status}</td><td style="text-align:left">${p.note || ""}</td></tr>`)}</table>` : ""}
<h2>Payment history</h2><table class="n"><tr><th>Date</th><th>Amount</th><th style="text-align:left">Type</th><th style="text-align:left">Reference</th></tr>${pays.map((p) => h`<tr><td>${fdate(p.paid_on)}</td><td>${kes(p.amount)}</td><td style="text-align:left">${typeLabel(p)}</td><td style="text-align:left">${p.reference || ""}</td></tr>`)}</table>
<div class="sg"><div>Treasurer</div><div>Chair</div></div>
<div class="ft">REAL BROTHERS 022 &middot; ${c.S.group_email || ""} &middot; Computer-generated statement. Please report any difference to the Treasurer.</div></body></html>`);
}
function openStatement(id) {
  const m = core().members.find((x) => x.id === id);
  if (!m) return;
  const w = window.open("", "_blank");
  if (!w) return Promise.resolve().then(() => (init_utils(), utils_exports)).then((u) => u.toast("Allow pop-ups to print the statement.", "warn"));
  w.document.write(statementHtml(m));
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 400);
}
function downloadStatement(id) {
  const m = core().members.find((x) => x.id === id);
  if (!m) return;
  const { c, s, sp, pr, pays, no } = statementData(m);
  const r = [
    ["REAL BROTHERS 022 - Member statement"],
    ["Statement no", no],
    ["Member", m.name],
    ["Account no", m.id_number || ""],
    ["Date", today()],
    [],
    ["Total owing now", s.owing],
    ["Monthly contributions and fines owing", sp.owing],
    ["Dowry overdue", s.pos.overdue],
    ["Savings paid to date", s.savingsPaid],
    ["Dowry paid to date", s.dowryPaid],
    [],
    ["Month", "Due", "Paid", "Balance", "Status", "Also covers"],
    ...sp.rows.map((x) => [x.label, x.d, x.p, x.bal, x.cl, x.cv.join(" ")]),
    [],
    ["Wave", "Due by", "Paid", "Balance", "Status"],
    ...pr.map((x) => [x.label, x.p.due_date, x.paid, x.bal, x.st]),
    [],
    ["Date", "Type", "Amount", "Reference"],
    ...pays.map((p) => [p.paid_on, typeLabel(p), p.amount, p.reference || ""])
  ];
  download(`${m.name.replace(/\s+/g, "_")}_statement.csv`, csvOut(r));
}
async function myStatement() {
  const m = me();
  if (!m) return h`<div class="card">${empty("No member record is linked to this login.")}</div>`;
  return h`<div class="card"><div class="row"><button class="btn" data-act="stmt-print">${icon("print")} Print / Save PDF</button><button class="btn ghost" data-act="stmt-dl">${icon("down")} Download CSV</button></div></div>
  <div class="card" style="padding:0;overflow:hidden"><iframe title="Statement preview" style="width:100%;height:70vh;border:0" srcdoc="${statementHtml(m)}"></iframe></div>`;
}
async function build(tab) {
  const c = core(), act = c.members.filter((m) => m.status === "active"), P = c.posted.filter((p) => inPeriod(p.paid_on));
  const by = (id, k) => sum(P.filter((p) => p.member_id === id && (!k || p.kind === k)), (p) => p.amount);
  if (tab === "members") return { t: "Member contribution report", cols: ["Member", "Account no", "Savings", "Dowry", "Penalties and other", "Total"], rows: c.members.map((m) => [m.name, m.id_number || "", by(m.id, "savings"), by(m.id, "dowry"), by(m.id, "penalty") + by(m.id, "other"), by(m.id)]), money: [2, 3, 4, 5], total: true };
  if (tab === "official") {
    const ms = c.members.filter((m) => c.ob[m.id]), asof = ms.length ? ms[0].id && c.ob[ms[0].id].as_of : null;
    const rows = ms.map((m) => {
      const ob = c.ob[m.id], dw = sum(periodRows(m).filter((x) => x.p.due_date <= ob.as_of), (x) => x.bal);
      return [m.name, Number(ob.monthly_2025), Number(ob.monthly_2026), dw, Number(ob.monthly_2025) + Number(ob.monthly_2026) + dw];
    });
    return { t: "Official balances" + (asof ? " as at " + fdate(asof) : ""), cols: ["Member", "Monthly 2025", "Monthly 2026", "Yearly (dowry to end of June)", "Total"], rows, money: [1, 2, 3, 4], total: true };
  }
  if (tab === "owing") {
    const rs = act.map((m) => summarise(m)).sort((a, b) => b.owing - a.owing);
    return { t: "Outstanding balances", cols: ["Member", "Monthly and fines owing", "Dowry overdue", "Total owing", "Status"], rows: rs.map((r) => [r.m.name, r.sp.owing, Number(r.pos.overdue || 0), r.owing, r.status]), money: [1, 2, 3], total: true };
  }
  if (tab === "dowry") {
    const yr = (/* @__PURE__ */ new Date()).getFullYear(), ps = c.periods.filter((p) => p.year === yr);
    return { t: `Dowry report ${yr}`, cols: ["Member", ...ps.map((p) => `Wave ${p.wave}`), "Paid", "Target", "Balance"], rows: act.map((m) => {
      const w = ps.map((p) => sum(c.posted.filter((x) => x.member_id === m.id && x.kind === "dowry" && x.period_id === p.id), (x) => x.amount)), t = sum(ps, (p) => p.target), pd = sum(w);
      return [m.name, ...w, pd, t, Math.max(0, t - pd)];
    }), money: [1, 2, 3, 4, 5], total: true };
  }
  if (tab === "savings") return { t: "Savings report", cols: ["Member", "Savings in period", "Savings to date"], rows: c.members.map((m) => [m.name, by(m.id, "savings"), sum(c.posted.filter((p) => p.member_id === m.id && p.kind === "savings"), (p) => p.amount)]), money: [1, 2], total: true };
  if (tab === "attendance") return { t: "Attendance report", cols: ["Member", "Meetings", "Present", "Absent", "Late", "Excused", "Attendance %", "Rating"], rows: act.map((m) => {
    const s = attStats(m.id), r = attRating(s);
    return [m.name, s.total, s.present, s.absent, s.late, s.excused, s.total ? s.rate + "%" : "-", r.label];
  }), money: [] };
  if (tab === "penalties") return { t: "Penalty report", cols: ["Member", "Fines assessed (attendance and meetings)", "Added by treasurer", "Penalty payments recorded"], rows: act.map((m) => {
    const sp = savingsPosition(m);
    return [m.name, sp.fines - sp.extra, sp.extra, by(m.id, "penalty")];
  }), money: [1, 2, 3], total: true };
  if (tab === "benefits") return { t: "Benefits paid", cols: ["Member", "Amount", "Date"], rows: c.members.filter((m) => m.benefited).map((m) => [m.name, Number(m.benefit_amount || 0), m.benefit_date || ""]), money: [1], total: true };
  if (tab === "refunds") return { t: "Former members and refunds", cols: ["Member", "Left on", "Refund", "Amount", "Status"], rows: c.members.filter((m) => m.status === "left").map((m) => [m.name, m.left_on || "", m.refund_status === "refunded" ? "Refunded" : "Pending", Number(m.refund_amount || 0), ""]).map((r) => [r[0], r[1], r[2], r[3]]), money: [3], total: true, cols2: ["Member", "Left on", "Refund", "Amount"] };
  if (tab === "monthly") {
    const ks = [...new Set(c.posted.map((p) => monthKey(p.paid_on)))].filter((k) => inPeriod(k + "-01")).sort().reverse();
    return { t: "Monthly collection report", cols: ["Month", "Savings", "Dowry", "Penalties and other", "Total"], rows: ks.map((k) => {
      const x = (kind2) => sum(c.posted.filter((p) => monthKey(p.paid_on) === k && (kind2 === "o" ? p.kind === "penalty" || p.kind === "other" : p.kind === kind2)), (p) => p.amount);
      return [MON[+k.slice(5) - 1] + " " + k.slice(0, 4), x("savings"), x("dowry"), x("o"), x("savings") + x("dowry") + x("o")];
    }), money: [1, 2, 3, 4], total: true };
  }
  if (tab === "finance") {
    const r = financeSummary(await all("ledger"), c);
    return { t: "Group finance report", cols: ["Line", "KES"], rows: [["Brought forward", r.bf], ["Member savings and fines", r.sav], ["Dowry contributions", r.dow], ["Penalty and other payments", r.pen], ["Other income", r.oi], ["of which fixed deposit interest", r.interest], ["Fixed deposits returned", r.dr], ["Opening balance entered", r.op], ["Dowry payouts", -r.po], ["Expenses", -r.ex], ["Refunds", -r.rf], ["Fixed deposits placed", -r.dp], ["Cash available", r.close], ["Money in fixed deposits", r.inv], ["Total group assets", r.close + r.inv]], money: [1] };
  }
}
async function reports() {
  const tab = state.f.rtab || "members", ok = TABS.filter((t) => t[0] !== "finance" || state.role.treasurer);
  const rep = await build(tab), cols = rep.cols2 || rep.cols;
  const total = rep.total ? rep.cols.map((_, i) => rep.money.includes(i) ? sum(rep.rows, (r) => r[i]) : i === 0 ? "Total" : "") : null;
  state._rep = { name: rep.t, cols, rows: rep.rows };
  return h`<div class="tabs">${ok.map((t) => h`<a href="#" data-act="rep-tab" data-tab="${t[0]}" class="${tab === t[0] ? "on" : ""}">${t[1]}</a>`)}</div>${tab === "finance" || tab === "benefits" || tab === "refunds" ? "" : filterBar()}
  <div class="card"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px"><h2 style="margin:0">${rep.t}</h2><div style="display:flex;gap:8px"><button class="btn sm ghost" data-act="print">${icon("print")} Print / PDF</button><button class="btn sm ghost" data-act="rep-csv">${icon("down")} CSV</button></div></div>
  ${rep.rows.length ? h`<div class="tw"><table><thead><tr>${cols.map((cc, i) => h`<th class="${i === 0 ? "t" : rep.money.includes(i) ? "" : "t"}">${cc}</th>`)}</tr></thead><tbody>${rep.rows.map((r) => h`<tr>${r.map((v, i) => h`<td class="${i === 0 || !rep.money.includes(i) ? "t" : ""}">${rep.money.includes(i) ? kes(v) : v}</td>`)}</tr>`)}${total ? h`<tr>${total.map((v, i) => h`<td class="${i === 0 || !rep.money.includes(i) ? "t" : ""}"><b>${rep.money.includes(i) ? kes(v) : v}</b></td>`)}</tr>` : ""}</tbody></table></div>` : empty("Nothing to show for this selection.")}</div>`;
}
var TABS, routes3;
var init_reports = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/reports.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    init_engine();
    init_attendance();
    init_logo();
    init_dashboard();
    actions["stmt-print"] = () => {
      const m = me();
      if (m) openStatement(m.id);
    };
    actions["stmt-dl"] = () => {
      const m = me();
      if (m) downloadStatement(m.id);
    };
    TABS = [["members", "Member contributions"], ["official", "Official balances"], ["owing", "Outstanding balances"], ["dowry", "Dowry"], ["savings", "Savings"], ["attendance", "Attendance"], ["penalties", "Penalties"], ["finance", "Group finance"], ["benefits", "Benefits paid"], ["refunds", "Refunds"], ["monthly", "Monthly collections"]];
    actions["rep-tab"] = (el) => {
      state.f.rtab = el.dataset.tab;
      hooks.route();
    };
    actions["rep-csv"] = () => {
      const r = state._rep;
      if (r) download(r.name.replace(/\s+/g, "_") + ".csv", csvOut([r.cols, ...r.rows]));
    };
    routes3 = {
      statement: { title: "My Statement", need: "member", view: myStatement },
      reports: { title: "Reports", sub: "Print, save as PDF or download CSV", need: "staff", view: reports }
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/members.js
var members_exports = {};
__export(members_exports, {
  recordPayout: () => recordPayout,
  routes: () => routes4
});
async function recordPayout(m, amount, date) {
  try {
    await rpc("record_member_payout", { p_member: m.id, p_amount: +amount, p_date: date });
  } catch (e) {
    if (!/already received/i.test(e.message)) throw e;
    const again = await ask({ title: "Already received a payout", message: `${m.name} already received a dowry payout. Record another one?`, ok: "Record another", danger: true });
    if (!again) return false;
    await rpc("record_member_payout", { p_member: m.id, p_amount: +amount, p_date: date, p_allow_repeat: true });
  }
  return true;
}
async function list() {
  const c = core(), f = state.f.mstatus || "active", s = (state.f.q || "").toLowerCase();
  const sums = c.members.map((m) => summarise(m));
  const pass = (r) => ({ active: r.m.status === "active", former: r.m.status === "left", benefited: r.m.benefited, outstanding: r.m.status === "active" && r.owing > 0, paid: r.status === "Complete" && r.m.status === "active", risk: r.status === "At Risk" && r.m.status === "active", all: true })[f];
  const rows = sums.filter(pass).filter((r) => !s || [r.m.name, r.m.email, r.m.id_number, r.m.phone].some((x) => (x || "").toLowerCase().includes(s)));
  return h`<div class="fbar"><input id="msearch" data-inp="search" placeholder="Search name, email, ID or phone" value="${state.f.q}"><select data-chg="mstatus">${FILTERS.map((x) => h`<option value="${x[0]}" ${x[0] === f ? "selected" : ""}>${x[1]}</option>`)}</select><button class="btn" data-act="member-add">${icon("plus")} Add member</button></div>
  <div class="card"><div class="tw">${rows.length ? h`<table><thead><tr><th>Member</th><th class="t">Account no</th><th class="t">Status</th><th>Dowry this year</th><th>Owing</th><th></th></tr></thead><tbody>${rows.map((r) => h`<tr><td><a href="#/member/${r.m.id}"><b>${r.m.name}</b></a>${r.m.benefited ? h` ${badge("Benefited", "gold")}` : ""}<div class="mu">${r.m.email || "no login email"}</div></td><td class="t">${r.m.id_number || "-"}</td><td class="t">${r.m.status === "left" ? badge("Former", "") : badge(r.status, statusKind(r.status))}</td><td>${kes(r.yearPaid)} / ${kes(r.yearTarget)}</td><td class="${r.owing > 0 ? "bad" : ""}">${kes(r.owing)}</td><td><button class="btn sm ghost" data-act="member-email" data-id="${r.m.id}">Change email</button></td></tr>`)}</tbody></table>` : empty("No members match.", "Try another filter or search.")}</div></div>`;
}
async function detail(id) {
  const c = core(), m = c.members.find((x) => x.id === +id);
  if (!m) return h`<div class="card">${empty("Member not found.")}</div>`;
  const s = summarise(m), sp = s.sp, t = state.role.treasurer, st = state.role.staff;
  const pays = c.payments.filter((p) => p.member_id === m.id).sort((a, b) => a.paid_on < b.paid_on ? 1 : -1).slice(0, 40);
  const pens = c.pens.filter((p) => p.member_id === m.id);
  const pr = periodRows(m);
  const acts = [
    h`<button class="btn sm ghost" data-act="member-edit" data-id="${m.id}">Edit details</button>`,
    h`<button class="btn sm ghost" data-act="member-email" data-id="${m.id}">Change login email</button>`,
    h`<button class="btn sm ghost" data-act="stmt-open" data-id="${m.id}">${icon("print")} Statement</button>`,
    h`<button class="btn sm ghost" data-act="stmt-csv" data-id="${m.id}">${icon("down")} CSV</button>`
  ];
  if (t && m.status === "active") acts.push(h`<a class="btn sm gold" href="#/pay/${m.id}">Record payment</a>`, h`<button class="btn sm" data-act="member-payout" data-id="${m.id}">Record dowry payout</button>`, h`<button class="btn sm ghost" data-act="penalty-add" data-id="${m.id}">Add penalty</button>`);
  if (st && m.status === "active") acts.push(h`<button class="btn sm danger" data-act="member-leave" data-id="${m.id}">Member leaves</button>`);
  if (t && m.status === "left" && m.refund_status !== "refunded") acts.push(h`<button class="btn sm" data-act="member-refund" data-id="${m.id}">Record refund</button>`);
  if (state.role.admin && m.status === "left") acts.push(h`<button class="btn sm ghost" data-act="member-reinstate" data-id="${m.id}">Reinstate</button>`);
  return h`<p><a href="#/members">&lsaquo; All members</a></p>
  <div class="card"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><h2 style="font-size:20px">${m.name}</h2>
    <p class="mu">Account no ${m.id_number || "not set"} \u00b7 ${m.email || "no login email"}${m.phone ? " \xB7 " + m.phone : ""}${m.joined_on ? " \xB7 joined " + fdate(m.joined_on) : ""}</p></div>
    <div>${m.status === "left" ? badge("Former member") : badge(s.status, statusKind(s.status))} ${m.benefited ? badge("Benefited " + (m.benefit_amount ? kes(m.benefit_amount) : ""), "gold") : ""}${m.status === "left" ? h` ${badge(m.refund_status === "refunded" ? "Refunded " + kes(m.refund_amount) : "Refund pending " + (m.refund_amount ? kes(m.refund_amount) : ""), m.refund_status === "refunded" ? "ok" : "warn")}` : ""}</div></div>
    <div class="row" style="margin-top:12px;gap:8px">${acts.map((a) => h`<span style="flex:0 0 auto">${a}</span>`)}</div></div>
  <div class="grid"><div class="kpi"><small>Total contributed</small><b>${kes(s.totalPaid)}</b></div><div class="kpi"><small>Savings paid</small><b>${kes(s.savingsPaid)}</b></div>
    <div class="kpi"><small>Dowry this year</small><b>${kes(s.yearPaid)} / ${kes(s.yearTarget)}</b></div><div class="kpi red"><small>Total owing</small><b class="bad">${kes(s.owing)}</b></div></div>
  ${sp.ob || t ? h`<div class="card"><h2>Brought forward</h2>${sp.ob ? h`<p>As at <b>${fdate(sp.ob.as_of)}</b>: monthly 2025 <b>${kes(sp.ob.monthly_2025)}</b> + monthly 2026 <b>${kes(sp.ob.monthly_2026)}</b> = <b>${kes(sp.bf)}</b>. The monthly table below starts the month after.</p>` : h`<p class="mu">No brought-forward balance recorded.</p>`}${t ? h`<button class="btn sm ghost" data-act="ob-edit" data-id="${m.id}">${sp.ob ? "Edit" : "Set"} brought-forward balance</button>` : ""}</div>` : ""}
  <div class="card"><h2>Dowry waves</h2><div class="tw"><table><thead><tr><th>Wave</th><th>Due by</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead><tbody>${pr.map((x) => h`<tr><td>${x.label}</td><td>${fdate(x.p.due_date)}</td><td>${kes(x.paid)}</td><td>${kes(x.bal)}</td><td>${badge(x.st, x.st === "Cleared" ? "ok" : x.st === "Overdue" ? "bad" : "")}</td></tr>`)}</tbody></table></div></div>
  <div class="card"><h2>Monthly contributions and fines</h2><p class="mu">Owing ${kes(sp.owing)}${sp.credit ? " \xB7 credit " + kes(sp.credit) : ""} \u00b7 fines assessed ${kes(sp.fines)}</p><div class="tw"><table><thead><tr><th>Month</th><th>Due</th><th>Paid</th><th>Balance</th><th class="t">Status</th></tr></thead><tbody>${sp.rows.map((x) => h`<tr><td>${x.label}</td><td>${kes(x.d)}${x.abs || x.late || x.unpaid ? h`<div class="mu">${[x.abs ? "absent" : "", x.late ? "late" : "", x.unpaid ? "not paid at meeting" : ""].filter(Boolean).join(", ")}</div>` : ""}</td><td>${x.p ? kes(x.p) : "-"}</td><td class="${x.bal < 0 ? "bad" : ""}">${x.bal < 0 ? "Owing " + kes(-x.bal) : x.bal > 0 ? "Credit " + kes(x.bal) : "Nil"}</td><td class="t">${x.cl}${x.cv.length ? h`<div class="mu">also covers ${x.cv.join(", ")}</div>` : ""}</td></tr>`)}</tbody></table></div></div>
  ${pens.length ? h`<div class="card"><h2>Penalties added by the treasurer</h2><div class="tw"><table><tbody>${pens.map((p) => h`<tr><td class="t">${fdate(p.incurred_on)}</td><td>${kes(p.amount)}</td><td class="t">${p.status}</td><td class="t">${p.note || ""}</td><td>${t && p.status === "outstanding" ? h`<button class="btn sm ghost" data-act="penalty-waive" data-id="${p.id}">Waive</button>` : ""}</td></tr>`)}</tbody></table></div></div>` : ""}
  <div class="card"><h2>Payment history</h2>${pays.length ? h`<div class="tw"><table><thead><tr><th>Date</th><th class="t">Type</th><th>Amount</th><th class="t">Reference</th><th class="t">Recorded by</th></tr></thead><tbody>${pays.map((p) => h`<tr class="${p.status === "voided" ? "void" : ""}"><td>${fdate(p.paid_on)}</td><td class="t">${typeLabel(p)}${p.status === "voided" ? " (voided by " + (p.voided_by_name || "?") + ")" : ""}</td><td>${kes(p.amount)}</td><td class="t">${p.reference || ""}</td><td class="t">${p.created_by_name || ""}</td></tr>`)}</tbody></table></div>` : empty("No payments recorded yet.")}</div>`;
}
async function profile() {
  const m = me();
  if (!m) return h`<div class="card">${empty("No member record is linked to this login.")}</div>`;
  return h`<div class="card"><h2>${m.name}</h2><p class="mu">Account number: <b>${m.id_number || "not set"}</b><br>Login email: <b>${m.email || state.session.user.email}</b><br>Member since: ${m.joined_on ? fdate(m.joined_on) : "the start"}</p>
    <form data-form="my-phone"><label>Phone<input name="phone" value="${m.phone || ""}" inputmode="tel"></label><p><button class="btn" type="submit">Save phone</button></p></form></div>
  <div class="card"><h2>Change login email</h2><p class="mu">You sign in with <b>${state.session.user.email}</b>. Enter a new email and confirm it from your inbox.</p><form data-form="my-email"><label>New email<input name="email" type="email" required autocomplete="email"></label><p><button class="btn" type="submit">Change email</button></p></form></div>
  <div class="card"><h2>Change password</h2><form data-form="my-pass"><label>New password<input name="password" type="password" minlength="6" required autocomplete="new-password"></label><label>Confirm<input name="password2" type="password" minlength="6" required autocomplete="new-password"></label><p><button class="btn" type="submit">Change password</button></p></form></div>
  <div class="card"><button class="btn ghost" data-act="logout">${icon("out")} Sign out</button></div>`;
}
var done, nz, memberFields, toRow, FILTERS, routes4;
var init_members = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/members.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    init_engine();
    init_dashboard();
    init_reports();
    done = async (msg) => {
      toast(msg);
      await hooks.refresh();
    };
    nz = (v) => v == null || String(v).trim() === "" ? null : String(v).trim();
    memberFields = (m = {}, withEmail = true) => [
      { name: "name", label: "Full name", value: m.name, required: true },
      { name: "email", label: "Login email (username)", type: "email", value: m.email },
      { name: "id_number", label: "Account number (ID number)", value: m.id_number },
      { name: "phone", label: "Phone", value: m.phone },
      { name: "joined_on", label: "Joined on", type: "date", value: m.joined_on }
    ].filter((f) => withEmail || f.name !== "email");
    toRow = (o) => {
      const r = { name: nz(o.name), id_number: nz(o.id_number), phone: nz(o.phone), joined_on: nz(o.joined_on) };
      if ("email" in o) r.email = nz(o.email) && nz(o.email).toLowerCase();
      return r;
    };
    actions["member-add"] = async (el) => {
      const o = await ask({ title: "Add a member", fields: memberFields(), ok: "Add member" });
      if (!o) return;
      await busy(el, async () => {
        await q(sb.from("members").insert(toRow(o)));
        await done("Member added.");
      });
    };
    actions["member-edit"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id);
      const o = await ask({ title: "Edit member", message: m.email ? `Login email is ${m.email}. If you change it, the old login stops working for this record and the member signs in with the new email.` : "This member has no login email yet.", fields: memberFields(m, true), ok: "Save changes" });
      if (!o) return;
      await busy(el, async () => {
        const { email, ...rest } = o, ne = nz(email);
        if (ne && ne.toLowerCase() !== (m.email || "").toLowerCase()) await rpc("admin_change_member_email", { p_member: m.id, p_email: ne, p_reason: "Changed in member details" });
        await q(sb.from("members").update(toRow(rest)).eq("id", m.id));
        await done("Member updated.");
      });
    };
    actions["member-email"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id);
      const o = await ask({ title: "Change login email", message: `${m.name} now signs in with ${m.email || "no email"}. After this change their old login stops working for this record. They must create an account (or sign in) with the NEW email, and are linked automatically.`, fields: [{ name: "email", label: "New email", type: "email", required: true }], reason: true, ok: "Change email", danger: true });
      if (!o) return;
      await busy(el, async () => {
        await rpc("admin_change_member_email", { p_member: m.id, p_email: o.email, p_reason: o.reason });
        await done("Login email changed. Ask the member to sign in with the new email.");
      });
    };
    actions["ob-edit"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id), ob = core().ob[m.id] || {};
      const o = await ask({
        title: "Brought-forward monthly balance",
        message: `${m.name}: what the member owed for monthly contributions and fines on the date below, from the Treasurer's sheet. From the next month the app adds new dues and subtracts payments.`,
        fields: [{ name: "as_of", label: "Balance as at", type: "date", value: ob.as_of || "2026-10-31", required: true }, { name: "m2025", label: "Monthly 2025 (KES)", type: "number", value: ob.monthly_2025 ?? 0, required: true }, { name: "m2026", label: "Monthly 2026 (KES)", type: "number", value: ob.monthly_2026 ?? 0, required: true }, { name: "note", label: "Note (optional)", value: "" }],
        ok: "Save balance"
      });
      if (!o) return;
      await busy(el, async () => {
        await rpc("set_opening_balance", { p_member: m.id, p_as_of: o.as_of, p_m2025: +o.m2025, p_m2026: +o.m2026, p_note: nz(o.note) });
        await done("Brought-forward balance saved.");
      });
    };
    actions["member-payout"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id);
      const o = await ask({ title: "Record dowry payout", message: `Payout to ${m.name}. This is deducted from the group balance.`, fields: [{ name: "amount", label: "Amount (KES)", type: "number", value: core().S.payout_amount, required: true }, { name: "date", label: "Date", type: "date", value: today(), required: true }], ok: "Record payout" });
      if (!o) return;
      await busy(el, async () => {
        if (await recordPayout(m, o.amount, o.date)) await done("Payout recorded.");
      });
    };
    actions["member-leave"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id);
      const o = await ask({ title: "Member leaves the group", message: `${m.name} will be marked as a former member. Leave the refund blank to use 50% of dowry paid (constitution 4.3).`, fields: [{ name: "date", label: "Date left", type: "date", value: today(), required: true }, { name: "refund", label: "Refund amount (optional)", type: "number" }], ok: "Mark as left", danger: true });
      if (!o) return;
      await busy(el, async () => {
        await rpc("member_leave", { p_member: m.id, p_left_on: o.date, p_refund_amount: o.refund ? +o.refund : null });
        await done("Member marked as left.");
      });
    };
    actions["member-reinstate"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id);
      const o = await ask({ title: "Reinstate member", message: `Make ${m.name} an active member again.`, reason: true, ok: "Reinstate" });
      if (!o) return;
      await busy(el, async () => {
        await rpc("member_reinstate", { p_member: m.id, p_reason: o.reason });
        await done("Member reinstated.");
      });
    };
    actions["member-refund"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id);
      const o = await ask({ title: "Record refund", message: `Refund to ${m.name}.`, fields: [{ name: "amount", label: "Amount (KES)", type: "number", value: m.refund_amount, required: true }, { name: "date", label: "Date", type: "date", value: today(), required: true }, { name: "ref", label: "Reference (optional)" }], ok: "Record refund" });
      if (!o) return;
      await busy(el, async () => {
        await rpc("record_member_refund", { p_member: m.id, p_amount: +o.amount, p_date: o.date, p_reference: nz(o.ref) });
        await done("Refund recorded.");
      });
    };
    actions["penalty-add"] = async (el) => {
      const m = core().members.find((x) => x.id === +el.dataset.id), T = core().ptypes.filter((t) => t.active);
      const o = await ask({ title: "Add a penalty", message: `For ${m.name}. It is added to what they owe.`, fields: [{ name: "type", label: "Type", type: "select", options: T.map((t) => [t.code, `${t.name} (${kes(t.amount)})`]) }, { name: "amount", label: "Amount (blank = standard)", type: "number" }, { name: "date", label: "Date", type: "date", value: today() }, { name: "note", label: "Note" }], ok: "Add penalty" });
      if (!o) return;
      await busy(el, async () => {
        await rpc("add_penalty", { p_member: m.id, p_type: o.type, p_amount: o.amount ? +o.amount : null, p_date: o.date, p_note: nz(o.note) });
        await done("Penalty added.");
      });
    };
    actions["penalty-waive"] = async (el) => {
      const o = await ask({ title: "Waive penalty", reason: true, ok: "Waive", danger: true });
      if (!o) return;
      await busy(el, async () => {
        await rpc("waive_penalty", { p_id: +el.dataset.id, p_reason: o.reason });
        await done("Penalty waived.");
      });
    };
    FILTERS = [["active", "Active"], ["former", "Former"], ["benefited", "Benefited"], ["outstanding", "Outstanding"], ["paid", "Fully paid"], ["risk", "At risk"], ["all", "All"]];
    changes.mstatus = (el) => {
      state.f.mstatus = el.value;
      hooks.route();
    };
    changes.search = (el) => {
      state.f.q = el.value;
      hooks.route();
    };
    actions["stmt-open"] = (el) => openStatement(+el.dataset.id);
    actions["stmt-csv"] = (el) => downloadStatement(+el.dataset.id);
    forms["my-phone"] = async (d) => {
      await rpc("update_my_profile", { p_phone: d.phone });
      await done("Profile updated.");
    };
    forms["my-email"] = async (d) => {
      const { error } = await sb.auth.updateUser({ email: d.email.trim().toLowerCase() }, { emailRedirectTo: location.origin + location.pathname });
      if (error) throw error;
      toast("Check your inbox. Open the confirmation link sent to the new address (and the old one, if asked) to finish.", "warn");
    };
    forms["my-pass"] = async (d) => {
      if (d.password !== d.password2) throw new Error("The passwords do not match.");
      const { error } = await sb.auth.updateUser({ password: d.password });
      if (error) throw error;
      toast("Password changed.");
    };
    routes4 = {
      members: { title: "Members", sub: "Everyone in the group", need: "staff", view: list },
      member: { title: "Member", need: "staff", view: detail },
      profile: { title: "My Profile", need: "member", view: profile }
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/payments.js
var payments_exports = {};
__export(payments_exports, {
  PAY_TYPES: () => PAY_TYPES,
  contribSections: () => contribSections,
  routes: () => routes5
});
function contribSections(m) {
  const c = core(), sp = savingsPosition(m), pr = periodRows(m);
  const mine2 = c.posted.filter((p) => p.member_id === m.id), shown = mine2.filter((p) => inPeriod(p.paid_on) && ftype(p)).sort((a, b) => a.paid_on < b.paid_on ? 1 : -1);
  const wv = pr.slice(-6).map((x) => ({ l: x.label, v: x.paid, max: x.p.target, c: x.st === "Cleared" ? "var(--green2)" : x.st === "Overdue" ? "var(--bad)" : x.paid > 0 ? "var(--warn)" : "var(--mu)" }));
  const by = (k) => sum(shown.filter((p) => p.kind === k), (p) => p.amount);
  return h`${filterBar({ types: PAY_TYPES })}
  <div class="grid"><div class="kpi"><small>Savings (selected)</small><b>${kes(by("savings"))}</b></div><div class="kpi"><small>Dowry (selected)</small><b>${kes(by("dowry"))}</b></div><div class="kpi"><small>Penalties and other</small><b>${kes(by("penalty") + by("other"))}</b></div><div class="kpi green"><small>Total in selection</small><b>${kes(sum(shown, (p) => p.amount))}</b></div></div>
  <div class="card"><h2>Monthly contributions: due and paid</h2>${vbars(sp.rows.map((x) => ({ l: x.mon, v: [x.d, x.p] })), ["var(--mu)", "var(--green2)"], ["Due", "Paid"])}<p class="mu">Owing now: <b>${kes(sp.owing)}</b>${sp.bf ? " (includes " + kes(sp.bf) + " brought forward at " + fdate(sp.ob.as_of) + ")" : ""}${sp.credit ? " \xB7 credit " + kes(sp.credit) : ""}</p></div>
  <div class="card"><h2>Dowry waves (KES 7,500 each)</h2>${hbars(wv, 7500)}</div>
  <div class="card"><h2>Payments</h2>${shown.length ? h`<div class="tw"><table><thead><tr><th>Date</th><th class="t">Type</th><th>Amount</th><th class="t">Reference</th></tr></thead><tbody>${shown.map((p) => h`<tr><td>${fdate(p.paid_on)}</td><td class="t">${typeLabel(p)}</td><td class="ok">+ ${kes(p.amount)}</td><td class="t">${p.reference || ""}</td></tr>`)}</tbody></table></div>` : empty("No payments in this selection.")}</div>
  <div class="card"><h2>Month by month</h2><div class="tw"><table><thead><tr><th>Month</th><th>Due</th><th>Paid</th><th>Balance</th><th class="t">Status</th></tr></thead><tbody>${sp.rows.map((x) => h`<tr><td>${x.label}</td><td>${kes(x.d)}${x.abs || x.late || x.unpaid ? h`<div class="mu">${[x.abs ? "absent" : "", x.late ? "late" : "", x.unpaid ? "not paid at meeting" : ""].filter(Boolean).join(", ")}</div>` : ""}</td><td>${x.p ? kes(x.p) : "-"}</td><td class="${x.bal < 0 ? "bad" : ""}">${x.bal < 0 ? "Owing " + kes(-x.bal) : x.bal > 0 ? "Credit " + kes(x.bal) : "Nil"}</td><td class="t">${x.cl}${x.cv.length ? h`<div class="mu">also covers ${x.cv.join(", ")}</div>` : ""}</td></tr>`)}</tbody></table></div></div>`;
}
async function contrib() {
  const m = me();
  return m ? contribSections(m) : h`<div class="card">${empty("No member record is linked to this login.")}</div>`;
}
function preview(m, kind2, amount) {
  if (!m || !(amount > 0)) return "";
  if (kind2 !== "dowry") return h`Recorded as ${PAY_TYPES.find((t) => t[0] === kind2)[1].toLowerCase()}: ${kes(amount)}.`;
  const c = core(), start = m.joined_on || "2023-01-01";
  let left = amount;
  const out = [];
  for (const p of c.periods.filter((x) => x.due_date >= start)) {
    if (left <= 0) break;
    const paid = sum(c.posted.filter((x) => x.member_id === m.id && x.kind === "dowry" && x.period_id === p.id), (x) => x.amount), room = p.target - paid;
    if (room <= 0) continue;
    const take = Math.min(room, left);
    out.push(`${kes(take)} \u2192 Wave ${p.wave} ${p.year}`);
    left -= take;
  }
  return left > 0 ? h`<span class="bad">KES ${left} is more than all contribution periods can take.</span>` : h`Will be allocated: ${out.join("  \xB7  ")}`;
}
function checkCsv(text) {
  const c = core(), byName = {};
  c.members.forEach((m) => byName[m.name.trim().toLowerCase()] = m);
  let rows = csvParse(text);
  if (rows.length && HEAD.test(rows[0][0].trim())) rows = rows.slice(1);
  const seen = new Set(c.posted.map((p) => [p.member_id, p.kind, Number(p.amount), p.paid_on, p.wave || ""].join("|")));
  const valid = [], bad = [], dup = [];
  rows.forEach((r, i) => {
    const [name, date0, type0, amt, wave0, ref, note] = r.map((x) => (x || "").trim()), line = i + 1, why = [];
    const m = byName[(name || "").toLowerCase()];
    if (!m) why.push("unknown member");
    const date = /^\d{4}-\d{2}$/.test(date0) ? date0 + "-01" : date0;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(new Date(date))) why.push("bad date (use YYYY-MM-DD)");
    const kind2 = (type0 || "").toLowerCase();
    if (!["savings", "dowry", "penalty", "other"].includes(kind2)) why.push("type must be savings, dowry, penalty or other");
    const amount = Number((amt || "").replace(/,/g, ""));
    if (!(amount > 0)) why.push("amount must be more than 0");
    const wave = (wave0 || "").toUpperCase();
    if (kind2 === "dowry") {
      if (!/^W[12]-\d{4}$/.test(wave)) why.push("dowry needs a wave like W1-2024");
      else if (!c.periods.some((p) => `W${p.wave}-${p.year}` === wave)) why.push("no such wave");
    }
    if (why.length) return bad.push({ line, name, why: why.join(", ") });
    const key = [m.id, kind2, amount, date, kind2 === "dowry" ? wave : ""].join("|");
    if (seen.has(key)) return dup.push({ line, name, date, amount });
    seen.add(key);
    valid.push({ member_id: m.id, kind: kind2, amount, paid_on: date, wave: kind2 === "dowry" ? wave : null, reference: ref || "", note: note || "Imported", name });
  });
  return { valid, bad, dup };
}
async function payScreen(arg) {
  const c = core(), tab = state.f.ptab || "record", active = c.members.filter((m) => m.status === "active");
  const tabs = h`<div class="tabs">${[["record", "Record payment"], ["history", "History"], ["import", "Import CSV"]].map((t) => h`<a href="#" data-act="pay-tab" data-tab="${t[0]}" class="${tab === t[0] ? "on" : ""}">${t[1]}</a>`)}</div>`;
  if (tab === "record") return h`${tabs}<div class="card"><form data-form="pay"><div class="row"><label>Member<select name="member" data-chg="payprev">${active.map((m) => h`<option value="${m.id}" ${String(m.id) === String(arg) ? "selected" : ""}>${m.name}</option>`)}</select></label>
    <label>Payment type<select name="kind" data-chg="payprev">${PAY_TYPES.map((t) => h`<option value="${t[0]}">${t[1]}</option>`)}</select></label></div>
    <div class="row"><label>Amount (KES)<input name="amount" type="number" min="1" step="1" inputmode="numeric" required data-chg="payprev" data-inp="payprev"></label><label>Payment date<input name="date" type="date" value="${today()}" required></label></div>
    <div class="row"><label>Reference (optional)<input name="reference" placeholder="M-Pesa or bank code"></label><label>Note (optional)<input name="note"></label></div>
    <p class="mu" id="prev"></p><div class="sticky-act"><button class="btn" type="submit">Record payment</button></div></form></div>`;
  if (tab === "import") {
    const sample = "name,date,type,amount,wave,reference,note\nJames Kithome,2023-03,savings,200\nJames Kithome,2023-06-30,dowry,7500,W1-2023";
    return h`${tabs}<div class="card"><h2>Import payments from a CSV file</h2><p class="mu">Columns: name, date, type (savings, dowry, penalty, other), amount, wave (dowry only), reference, note. Nothing is saved until you confirm.</p>
      <form data-form="pay-import"><label>Choose a file<input type="file" accept=".csv,text/csv" data-chg="csv-file"></label><label>Or paste the rows<textarea id="csvtext" name="csv" rows="6" placeholder="${sample}"></textarea></label><p><button class="btn" type="submit">Check file</button></p></form></div>
    ${imp ? h`<div class="card"><h2>Preview</h2><div class="grid" style="margin:0 0 10px"><div class="kpi green"><small>Valid rows</small><b>${imp.valid.length}</b></div><div class="kpi red"><small>Invalid rows</small><b>${imp.bad.length}</b></div><div class="kpi gold"><small>Duplicates</small><b>${imp.dup.length}</b></div></div>
      ${imp.bad.length ? h`<div class="alert bad"><b>These rows will be skipped:</b><br>${imp.bad.slice(0, 12).map((b) => h`Row ${b.line} (${b.name || "?"}): ${b.why}<br>`)}</div>` : ""}
      ${imp.dup.length ? h`<div class="alert">Already recorded, will be skipped: ${imp.dup.slice(0, 8).map((x) => `${x.name} ${x.date} ${kes(x.amount)}`).join("; ")}${imp.dup.length > 8 ? "..." : ""}</div>` : ""}
      ${imp.valid.length ? h`<div class="tw"><table><thead><tr><th>Member</th><th>Date</th><th class="t">Type</th><th>Amount</th><th class="t">Wave</th></tr></thead><tbody>${imp.valid.slice(0, 15).map((v) => h`<tr><td>${v.name}</td><td>${fdate(v.paid_on)}</td><td class="t">${v.kind}</td><td>${kes(v.amount)}</td><td class="t">${v.wave || ""}</td></tr>`)}</tbody></table></div><p class="mu">${imp.valid.length > 15 ? "Showing the first 15 of " + imp.valid.length + "." : ""}</p>` : ""}
      <div class="row" style="margin-top:12px"><button class="btn" data-act="pay-import-go" ${imp.valid.length ? "" : "disabled"}>Import ${imp.valid.length} payment${imp.valid.length === 1 ? "" : "s"}</button><button class="btn ghost" data-act="pay-import-clear">Cancel</button></div></div>` : ""}`;
  }
  const s = (state.f.q || "").toLowerCase();
  const rows = c.payments.filter((p) => inPeriod(p.paid_on) && ftype(p) && (!s || memberName(p.member_id).toLowerCase().includes(s))).sort((a, b) => a.paid_on < b.paid_on ? 1 : a.paid_on > b.paid_on ? -1 : b.id - a.id).slice(0, 300);
  return h`${tabs}${filterBar({ types: PAY_TYPES, search: true })}<div class="card"><p class="mu">${rows.length} payment${rows.length === 1 ? "" : "s"}${rows.length === 300 ? " (latest 300 shown)" : ""} \u00b7 total ${kes(sum(rows.filter((p) => p.status === "posted"), (p) => p.amount))}</p>
    ${rows.length ? h`<div class="tw"><table><thead><tr><th>Date</th><th class="t">Member</th><th class="t">Type</th><th>Amount</th><th class="t">Reference</th><th class="t">Recorded by</th><th></th></tr></thead><tbody>${rows.map((p) => h`<tr class="${p.status === "voided" ? "void" : ""}"><td>${fdate(p.paid_on)}</td><td class="t">${memberName(p.member_id)}</td><td class="t">${typeLabel(p)}</td><td>${kes(p.amount)}</td><td class="t">${p.reference || ""}</td><td class="t">${p.created_by_name || ""}${p.status === "voided" ? h` <span class="mu">(voided by ${p.voided_by_name || "?"}: ${p.void_reason || ""})</span>` : ""}</td><td>${p.status === "posted" ? h`<button class="btn sm ghost" data-act="pay-void" data-id="${p.id}">Void</button>` : ""}</td></tr>`)}</tbody></table></div>` : empty("No payments match.")}</div>`;
}
var PAY_TYPES, ftype, imp, HEAD, routes5;
var init_payments = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/payments.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    init_engine();
    init_dashboard();
    PAY_TYPES = [["savings", "Monthly savings"], ["dowry", "Dowry contribution"], ["penalty", "Penalty payment"], ["other", "Other contribution"]];
    ftype = (p) => state.f.ptype === "all" || p.kind === state.f.ptype;
    changes.payprev = (el) => {
      const f = el.closest("form"), box = document.getElementById("prev");
      if (!f || !box) return;
      const m = core().members.find((x) => x.id === +f.member.value);
      box.innerHTML = str(preview(m, f.kind.value, +f.amount.value));
    };
    forms.pay = async (d, form) => {
      const r = await rpc("record_payment", { p_member: +d.member, p_kind: d.kind, p_amount: +d.amount, p_date: d.date, p_reference: d.reference || null, p_note: d.note || null });
      toast("Payment recorded successfully.");
      await hooks.refresh();
    };
    actions["pay-void"] = async (el) => {
      const o = await ask({ title: "Void this payment", message: "The payment stays in the records marked as voided. If it was part of a larger receipt, all of it is voided.", reason: true, ok: "Void payment", danger: true });
      if (!o) return;
      await busy(el, async () => {
        const n = await rpc("void_payment", { p_id: +el.dataset.id, p_reason: o.reason });
        toast(`Voided (${n} line${n > 1 ? "s" : ""}).`);
        await hooks.refresh();
      }, "Voiding...");
    };
    actions["pay-tab"] = (el) => {
      state.f.ptab = el.dataset.tab;
      hooks.route();
    };
    imp = null;
    HEAD = /^(name|member)$/i;
    forms["pay-import"] = async (d) => {
      imp = checkCsv(d.csv || "");
      if (!imp.valid.length && !imp.bad.length && !imp.dup.length) {
        imp = null;
        throw new Error("Paste or choose a CSV first.");
      }
      hooks.route();
    };
    changes["csv-file"] = async (el) => {
      const t = await el.files[0].text();
      document.getElementById("csvtext").value = t;
    };
    actions["pay-import-go"] = async (el) => {
      if (!imp || !imp.valid.length) return;
      const o = await ask({ title: "Import payments", message: `${imp.valid.length} payment${imp.valid.length > 1 ? "s" : ""} will be saved. This cannot be undone, but each can be voided.`, ok: "Import now" });
      if (!o) return;
      await busy(el, async () => {
        const r = await rpc("import_payments", { p_rows: imp.valid.map(({ name, ...x }) => x) });
        imp = null;
        toast(`Imported ${r.inserted}, skipped ${r.skipped} duplicate${r.skipped === 1 ? "" : "s"}.`);
        await hooks.refresh();
      }, "Importing...");
    };
    actions["pay-import-clear"] = () => {
      imp = null;
      hooks.route();
    };
    routes5 = {
      contrib: { title: "My Contributions", need: "member", view: contrib },
      pay: { title: "Payments", sub: "Record, review and import", need: "treasurer", view: payScreen }
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/finance.js
var finance_exports = {};
__export(finance_exports, {
  routes: () => routes6
});
async function view() {
  const c = core(), ledger = await all("ledger"), r = financeSummary(ledger, c), f = state.f;
  const active = c.members.filter((m) => m.status === "active"), pending = c.members.filter((m) => m.status === "left" && m.refund_status !== "refunded");
  const list2 = ledger.filter((x) => inPeriod(x.entry_date) && (!f.ttype || f.ttype === "all" || x.kind === f.ttype) && (!f.from || x.entry_date >= f.from) && (!f.to || x.entry_date <= f.to)).sort((a, b) => a.entry_date < b.entry_date ? 1 : a.entry_date > b.entry_date ? -1 : b.id - a.id);
  return h`${filterBar({ types: KINDS, tname: "ttype" })}
  <div class="fbar"><label style="margin:0">From<input type="date" name="from" value="${f.from || ""}" data-chg="filter"></label><label style="margin:0">To<input type="date" name="to" value="${f.to || ""}" data-chg="filter"></label></div>
  ${f.year === "all" && f.month !== "all" ? h`<div class="alert">Choose a year to use the month filter.</div>` : ""}
  <div class="grid"><div class="kpi green"><small>Cash available</small><b>${kes(r.close)}</b></div><div class="kpi gold"><small>In fixed deposits</small><b>${kes(r.inv)}</b></div><div class="kpi"><small>Total group assets</small><b>${kes(r.close + r.inv)}</b></div>
    <div class="kpi"><small>Income (period)</small><b class="ok">${kes(r.income)}</b></div><div class="kpi"><small>Expenses</small><b>${kes(r.ex)}</b></div><div class="kpi"><small>Dowry payouts</small><b>${kes(r.po)}</b></div><div class="kpi"><small>Refunds</small><b>${kes(r.rf)}</b></div></div>
  <div class="card"><h2>Balance available</h2><div class="tw"><table><tbody>${row("Brought forward", r.bf)}${row("+ Member savings and fines", r.sav)}${row("+ Dowry contributions", r.dow)}${r.pen ? row("+ Penalty and other payments", r.pen) : ""}${row("+ Other income" + (r.interest ? " (fixed deposit interest " + kes(r.interest) + ")" : ""), r.oi)}${row("+ Fixed deposits returned", r.dr)}${r.op ? row("+ Opening balance entered", r.op) : ""}${row("- Dowry payouts", r.po)}${row("- Expenses", r.ex)}${row("- Refunds to members", r.rf)}${row("- Fixed deposits placed", r.dp)}${row("= Cash available", r.close, 1)}</tbody></table></div>
    <p class="mu">Anything dated before your latest Opening balance entry is not counted, because that balance already includes it. Enter one Opening balance, dated the day after your records start.</p></div>
  <div class="card"><h2>Add an entry</h2><form data-form="fin-entry"><div class="row"><label>Type<select name="type">${ENTRY_TYPES.map((t) => h`<option value="${t[0]}">${t[1]}</option>`)}</select></label><label>Date<input type="date" name="date" value="${today()}" required></label><label>Amount (KES)<input type="number" name="amount" min="1" required></label></div>
    <div class="row"><label>Category (e.g. Transport, Meeting)<input name="category"></label><label>Description<input name="description"></label><label>Reference<input name="reference"></label></div><p><button class="btn" type="submit">Save entry</button></p></form></div>
  <div class="card"><h2>Dowry payout</h2><form data-form="fin-payout"><div class="row"><label>Member<select name="member">${active.map((m) => h`<option value="${m.id}">${m.name}${m.benefited ? " (already benefited)" : ""}</option>`)}</select></label><label>Amount<input type="number" name="amount" value="${c.S.payout_amount}" min="1" required></label><label>Date<input type="date" name="date" value="${today()}" required></label></div><p><button class="btn" type="submit">Record payout</button></p></form></div>
  ${pending.length ? h`<div class="card"><h2>Refunds to pay</h2><div class="tw"><table><tbody>${pending.map((m) => h`<tr><td class="t"><a href="#/member/${m.id}">${m.name}</a><div class="mu">Left ${fdate(m.left_on)}</div></td><td>${m.refund_amount ? kes(m.refund_amount) : "set amount"}</td><td><button class="btn sm" data-act="member-refund" data-id="${m.id}">Record refund</button></td></tr>`)}</tbody></table></div></div>` : ""}
  <div class="card"><h2>Entries</h2>${list2.length ? h`<div class="tw"><table><thead><tr><th>Date</th><th class="t">Type</th><th class="t">Details</th><th class="t">Recorded by</th><th>Amount</th><th></th></tr></thead><tbody>${list2.map((x) => h`<tr class="${x.status === "voided" ? "void" : ""}"><td>${fdate(x.entry_date)}</td><td class="t">${label(x.kind)}</td><td class="t">${[x.category, x.description, x.member_id ? memberName(x.member_id) : ""].filter(Boolean).join(" \xB7 ")}${x.status === "voided" ? h` <span class="mu">(voided by ${x.voided_by_name || "?"}: ${x.void_reason})</span>` : ""}</td><td class="t">${x.created_by_name || ""}</td><td>${kes(x.amount)}</td><td>${x.status === "posted" ? h`<button class="btn sm ghost" data-act="fin-void" data-id="${x.id}">Void</button>` : ""}</td></tr>`)}</tbody></table></div>` : empty("No entries in this selection.")}</div>`;
}
var KINDS, ENTRY_TYPES, label, row, routes6;
var init_finance = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/finance.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    init_engine();
    init_members();
    KINDS = [["opening", "Opening balance"], ["other_income", "Other income"], ["expense", "Expense"], ["payout", "Dowry payout"], ["refund", "Refund to member"], ["deposit_placed", "Fixed deposit placed"], ["deposit_returned", "Fixed deposit returned"]];
    ENTRY_TYPES = [["other_income", "Other income"], ["interest", "Fixed deposit interest"], ["expense", "Expense"], ["deposit_placed", "Fixed deposit placed"], ["deposit_returned", "Fixed deposit returned"], ["opening", "Opening balance"]];
    label = (k) => (KINDS.find((x) => x[0] === k) || [0, k])[1];
    forms["fin-entry"] = async (d) => {
      const kind2 = d.type === "interest" ? "other_income" : d.type, category = d.type === "interest" ? "Fixed deposit interest" : d.category || null;
      await rpc("record_ledger_entry", { p_kind: kind2, p_date: d.date, p_amount: +d.amount, p_category: category, p_description: d.description || null, p_reference: d.reference || null });
      toast("Entry recorded successfully.");
      await hooks.refresh();
    };
    forms["fin-payout"] = async (d) => {
      const m = core().members.find((x) => x.id === +d.member);
      if (await recordPayout(m, d.amount, d.date)) {
        toast("Payout recorded.");
        await hooks.refresh();
      }
    };
    actions["fin-void"] = async (el) => {
      const o = await ask({ title: "Void this entry", message: "It stays in the records marked as voided, and is no longer counted. A voided payout or refund also resets the member.", reason: true, ok: "Void entry", danger: true });
      if (!o) return;
      await busy(el, async () => {
        await rpc("void_ledger", { p_id: +el.dataset.id, p_reason: o.reason });
        toast("Entry voided.");
        await hooks.refresh();
      }, "Voiding...");
    };
    row = (l, v, b) => h`<tr><td class="t">${b ? h`<b>${l}</b>` : l}</td><td>${b ? h`<b>${kes(v)}</b>` : kes(v)}</td></tr>`;
    routes6 = { finance: { title: "Finance", sub: "Group money", need: "treasurer", view } };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/messages.js
var messages_exports = {};
__export(messages_exports, {
  routes: () => routes7
});
async function inbox() {
  const m = me();
  if (!m) return h`<div class="card">${empty("No member record is linked to this login.")}</div>`;
  const rows = await q(sb.from("message_targets").select("read,message_id,messages(id,title,body,created_at,sender_name)").eq("member_id", m.id).order("message_id", { ascending: false }));
  inbox.unread = rows.filter((r) => !r.read).length;
  return rows.length ? h`${rows.map((r) => h`<div class="card"><h2>${r.messages.title} ${r.read ? "" : badge("New", "gold")}</h2><p class="mu">${fdate(r.messages.created_at)} \u00b7 from ${r.messages.sender_name || "Committee"}</p><p style="white-space:pre-wrap">${r.messages.body}</p></div>`)}` : h`<div class="card">${empty("No messages yet.", "Notices from the committee will appear here.")}</div>`;
}
async function compose() {
  const c = core(), active = c.members.filter((m) => m.status === "active");
  const [msgs2, tg] = await Promise.all([q(sb.from("messages").select("id,title,body,created_at,sender_name").order("id", { ascending: false }).limit(50)), all("message_targets", "message_id")]);
  return h`<div class="card"><h2>New message</h2><form data-form="msg-send"><label>Title<input name="title" required maxlength="120"></label><label>Message<textarea name="body" rows="5" required></textarea></label>
    <label class="chk"><input type="radio" name="audience" value="all" checked data-chg="audience"> Everyone (all active members)</label><label class="chk"><input type="radio" name="audience" value="sel" data-chg="audience"> Selected members</label>
    <div id="pick" style="display:none;columns:2 180px;margin-top:6px">${active.map((m) => h`<label class="chk"><input type="checkbox" name="to" value="${m.id}"> ${m.name}</label>`)}</div>
    <div class="sticky-act"><button class="btn" type="submit">Send message</button></div></form></div>
  <div class="card"><h2>Sent messages</h2>${msgs2.length ? h`<div class="list">${msgs2.map((x) => {
    const t = tg.filter((r) => r.message_id === x.id), rd = t.filter((r) => r.read).length;
    return h`<div class="it"><div><b>${x.title}</b><div class="mu">${fdate(x.created_at)} \u00b7 ${x.sender_name || ""}</div></div><div class="r"><b>${rd} / ${t.length}</b><div class="mu">read</div></div></div>`;
  })}</div>` : empty("No messages sent yet.")}</div>`;
}
var markRead, routes7;
var init_messages = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/messages.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    forms["msg-send"] = async (d, form) => {
      const everyone = form.elements.audience.value === "all";
      const ids = [...form.querySelectorAll("input[name=to]:checked")].map((x) => +x.value);
      if (!everyone && !ids.length) throw new Error("Choose at least one member, or send to everyone.");
      await rpc("send_message", { p_title: d.title, p_body: d.body, p_members: everyone ? null : ids });
      toast("Message sent successfully.");
      await hooks.refresh();
    };
    changes.audience = (el) => {
      const box = document.getElementById("pick");
      if (box) box.style.display = el.value === "sel" ? "block" : "none";
    };
    markRead = async () => {
      const m = me();
      if (m && inbox.unread) {
        await sb.from("message_targets").update({ read: true }).eq("member_id", m.id).eq("read", false);
        inbox.unread = 0;
      }
    };
    routes7 = {
      inbox: { title: "My Messages", need: "member", view: inbox, after: markRead },
      msg: { title: "Send Messages", sub: "To the group or selected members", need: "secretary", view: compose }
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/voting.js
var voting_exports = {};
__export(voting_exports, {
  routes: () => routes8
});
async function page(admin) {
  const c = core(), m = me(), now = /* @__PURE__ */ new Date();
  const [els, opts, voted, off] = await Promise.all([
    q(sb.from("elections").select("*").order("id", { ascending: false })),
    q(sb.from("options").select("*").order("id")),
    q(sb.from("voted").select("election_id,member_id")),
    q(sb.from("officers").select("*").order("sort"))
  ]);
  const eligible = c.members.filter((x) => x.status === "active").length;
  const cards = [];
  for (const e of els) {
    const closed = e.status === "closed" || e.closes_at && new Date(e.closes_at) <= now, os = opts.filter((o) => o.election_id === e.id);
    const mine2 = m && voted.some((v) => v.election_id === e.id && v.member_id === m.id), turnout = voted.filter((v) => v.election_id === e.id).length;
    let body;
    if (closed || e.results_mode === "live") {
      let res = [];
      try {
        res = await rpc("results", { p_election: e.id });
      } catch (_) {
      }
      const tot = res.reduce((a, r) => a + Number(r.votes), 0);
      body = h`${res.map((r) => h`<div class="hb"><span class="hl">${r.label}</span><div class="bar"><i style="width:${pct(r.votes, tot)}%"></i></div><span class="hv">${r.votes} (${pct(r.votes, tot)}%)</span></div>`)}<p class="mu">Total votes: ${tot}${!closed ? " (live results)" : ""}</p>`;
      if (!closed && !mine2 && m) body = h`${body}${castForm(e, os)}`;
    } else if (mine2) body = h`<p class="ok"><b>Vote successfully submitted.</b> Your choice is secret.</p>${admin ? "" : h`<p class="mu">Results will be shown when voting closes.</p>`}`;
    else if (m) body = castForm(e, os);
    else body = h`<p class="mu">Your login is not linked to a member, so you cannot vote.</p>`;
    cards.push(h`<div class="card"><h2>${e.title} ${closed ? badge("Closed") : badge("Open", "ok")}</h2><p class="mu">${e.position || ""}${e.closes_at ? " \xB7 " + (closed ? "closed " : "closes ") + fdate(e.closes_at) : ""}${admin ? " \xB7 voted " + turnout + " of " + eligible : ""}</p>${body}${admin && !closed ? h`<p><button class="btn sm ghost" data-act="vote-close" data-id="${e.id}">Close voting now</button></p>` : ""}</div>`);
  }
  return h`<div class="card"><h2>Current officers</h2>${off.length ? h`<div class="list">${off.map((o) => h`<div class="it"><span>${o.position}</span><b>${o.holder || "Vacant"}</b></div>`)}</div>` : empty("No officers recorded.")}</div>
  ${admin && state.role.admin ? h`<div class="card"><h2>Create a vote</h2><form data-form="vote-new"><div class="row"><label>Position or motion<select name="position">${POS.map((p) => h`<option>${p}</option>`)}</select></label><label>Title (optional)<input name="title"></label></div>
    <div class="row"><label>Closes at (optional)<input type="datetime-local" name="closes"></label><label>Results<select name="mode"><option value="after_close">Hidden until voting closes</option><option value="live">Shown immediately</option></select></label></div>
    <label>Candidates or options (separated by commas)<textarea id="vopts" name="options" rows="3" placeholder="A motion defaults to Yes, No, Abstain"></textarea></label>
    <div class="row"><button type="button" class="btn ghost" data-act="vote-fill">Fill with all active members</button><button class="btn" type="submit">Create vote</button></div>
    <p class="mu">Only active members can vote, once each. The system records that you voted, never what you chose.</p></form></div>` : ""}
  ${cards.length ? cards : h`<div class="card">${empty("No votes yet.", "Open votes will appear here.")}</div>`}`;
}
var POS, castForm, routes8;
var init_voting = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/voting.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    POS = ["Chairperson", "Vice Chairperson", "Treasurer", "Secretary", "Vice Secretary", "Coordinator", "Discipline Master", "Motion (Yes / No)"];
    forms["vote-new"] = async (d) => {
      const motion = d.position.startsWith("Motion");
      let opts = (d.options || "").split(/[,\n]/).map((x) => x.trim()).filter(Boolean);
      if (!opts.length && motion) opts = ["Yes", "No", "Abstain"];
      await rpc("create_election", { p_title: d.title || (motion ? "Motion" : "Election: " + d.position), p_position: d.position, p_closes: d.closes ? new Date(d.closes).toISOString() : null, p_results_mode: d.mode, p_options: opts });
      toast("Vote created.");
      await hooks.refresh();
    };
    actions["vote-fill"] = () => {
      document.getElementById("vopts").value = core().members.filter((m) => m.status === "active").map((m) => m.name).join(", ");
    };
    actions["vote-cast"] = async (el) => {
      const id = el.dataset.id, pick = document.querySelector(`input[name="v${id}"]:checked`);
      if (!pick) return toast("Choose an option first.", "warn");
      const o = await ask({ title: "Cast your vote", message: "Your vote is secret and cannot be changed afterwards.", ok: "Submit my vote" });
      if (!o) return;
      await busy(el, async () => {
        await rpc("cast_vote", { p_option: +pick.value });
        toast("Vote successfully submitted.");
        await hooks.refresh();
      }, "Submitting...");
    };
    actions["vote-close"] = async (el) => {
      const o = await ask({ title: "Close this vote", message: "No more votes can be cast, and results become visible.", ok: "Close vote", danger: true });
      if (!o) return;
      await busy(el, async () => {
        await rpc("close_election", { p_id: +el.dataset.id });
        toast("Vote closed.");
        await hooks.refresh();
      }, "Closing...");
    };
    castForm = (e, os) => h`${os.map((o) => h`<label class="chk" style="padding:8px 0"><input type="radio" name="v${e.id}" value="${o.id}"> ${o.label}</label>`)}<p><button class="btn" data-act="vote-cast" data-id="${e.id}">Submit my vote</button></p>`;
    routes8 = {
      vote: { title: "Voting", sub: "Elections and motions", need: "staff", view: () => page(true) },
      myvote: { title: "Voting", sub: "Elections and motions", need: "member", view: () => page(false) }
    };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/settings.js
var settings_exports = {};
__export(settings_exports, {
  routes: () => routes9
});
async function view2() {
  const c = core(), S = c.S, [off, roles, audit] = await Promise.all([q(sb.from("officers").select("*").order("sort")), rpc("list_roles"), q(sb.from("audit_log").select("*").order("id", { ascending: false }).limit(300))]);
  const who = (u) => {
    const m = c.members.find((x) => x.auth_user_id === u);
    return m ? m.name : u ? "User " + String(u).slice(0, 6) : "System";
  };
  const tables = [...new Set(audit.map((a) => a.table_name).filter(Boolean))].sort(), at = state.f.atable || "all";
  const aq = (state.f.aq || "").toLowerCase();
  const log = audit.filter((a) => (at === "all" || a.table_name === at) && (!aq || [a.actor, a.actor_email, a.action, a.reason].some((x) => (x || "").toLowerCase().includes(aq)))).slice(0, 100);
  return h`<div class="card"><h2>Officers</h2><form data-form="set-officers"><div class="row">${off.map((o) => h`<label>${o.position}<input data-pos="${o.position}" data-sort="${o.sort}" value="${o.holder || ""}" placeholder="Vacant"></label>`)}</div><p><button class="btn" type="submit">Save officers</button></p></form></div>
  <div class="card"><h2>Contributions</h2><form data-form="set-config"><div class="row"><label>Monthly savings (KES)<input type="number" name="monthly_savings" value="${S.monthly_savings}" min="0"></label><label>Monthly dowry (KES)<input type="number" name="monthly_dowry" value="${S.monthly_dowry}" min="0"></label><label>Standard dowry payout (KES)<input type="number" name="payout_amount" value="${S.payout_amount}" min="0"></label></div>
    <div class="row"><label>Monthly dues counted from (YYYY-MM)<input name="savings_start" value="${S.savings_start}" pattern="\\d{4}-\\d{2}" required></label><label>Group email<input type="email" name="group_email" value="${S.group_email || ""}"></label></div>
    <div class="row"><label>Good attendance from (%)<input type="number" name="att_good" value="${S.att_good}" min="1" max="100"></label><label>Fair attendance from (%)<input type="number" name="att_fair" value="${S.att_fair}" min="1" max="100"></label></div><p><button class="btn" type="submit">Save settings</button></p></form></div>
  <div class="card"><h2>Penalty amounts</h2><form data-form="set-penalties"><div class="row">${c.ptypes.map((t) => h`<label>${t.name}<input type="number" data-pt="${t.id}" value="${t.amount}" min="0"></label>`)}</div><p><button class="btn" type="submit">Save penalty amounts</button></p></form></div>
  <div class="card"><h2>Dowry periods</h2><div class="tw"><table><thead><tr><th>Period</th><th>Starts</th><th>Due</th><th>Target</th></tr></thead><tbody>${c.periods.map((p) => h`<tr><td>Wave ${p.wave} ${p.year}</td><td>${fdate(p.start_date)}</td><td>${fdate(p.due_date)}</td><td>${kes(p.target)}</td></tr>`)}</tbody></table></div><p><button class="btn ghost" data-act="set-year">Add next year</button></p></div>
  <div class="card"><h2>Roles</h2><p class="mu">Administrator: everything. Treasurer: payments and finance. Secretary: attendance and messages. The person must create an account first.</p>
    ${roles.length ? h`<div class="list">${roles.map((r) => h`<div class="it"><span>${r.email}</span><span>${badge(r.role, r.role === "admin" ? "gold" : "")} ${r.email.toLowerCase() === state.session.user.email.toLowerCase() ? "" : h`<button class="btn sm ghost" data-act="role-set" data-email="${r.email}" data-role="${r.role}">Remove</button>`}</span></div>`)}</div>` : ""}
    <form data-form="set-role"><div class="row"><label>Email<input type="email" name="email" required></label><label>Role<select name="role"><option value="treasurer">Treasurer</option><option value="secretary">Secretary</option><option value="admin">Administrator</option><option value="member">Member (no extra access)</option></select></label><button class="btn" type="submit">Save role</button></div></form></div>
  <div class="card"><h2>Audit log</h2><div class="fbar"><input id="aqsearch" data-inp="aq" placeholder="Search by person, action or reason" value="${state.f.aq || ""}"><select data-chg="atable"><option value="all">All tables</option>${tables.map((t) => h`<option ${at === t ? "selected" : ""}>${t}</option>`)}</select></div>
    ${log.length ? h`<div class="tw"><table><thead><tr><th>When</th><th class="t">Who made the change</th><th class="t">Action</th><th class="t">Table</th><th class="t">Record</th><th class="t">Reason</th></tr></thead><tbody>${log.map((a) => h`<tr><td>${new Date(a.created_at).toLocaleString("en-GB")}</td><td class="t">${a.actor || who(a.user_id)}${a.actor_email && a.actor_email !== a.actor ? h`<div class="mu">${a.actor_email}</div>` : ""}</td><td class="t">${a.action}</td><td class="t">${a.table_name || ""}</td><td class="t">${a.record_id || ""}</td><td class="t">${a.reason || ""}</td></tr>`)}</tbody></table></div>` : empty("No activity recorded yet.")}</div>`;
}
var done2, routes9;
var init_settings = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/settings.js"() {
    init_utils();
    init_state();
    init_supabase();
    init_data();
    done2 = async (m) => {
      toast(m);
      await hooks.refresh();
    };
    forms["set-officers"] = async (d, form) => {
      const rows = [...form.querySelectorAll("input[data-pos]")].map((i) => ({ position: i.dataset.pos, holder: i.value.trim() || null, sort: +i.dataset.sort }));
      await q(sb.from("officers").upsert(rows));
      await done2("Officers saved.");
    };
    forms["set-config"] = async (d) => {
      const rows = [{ key: "monthly_savings", value: +d.monthly_savings }, { key: "monthly_dowry", value: +d.monthly_dowry }, { key: "payout_amount", value: +d.payout_amount }, { key: "savings_start", value: d.savings_start }, { key: "group_email", value: d.group_email }, { key: "att_good", value: +d.att_good }, { key: "att_fair", value: +d.att_fair }];
      await q(sb.from("settings").upsert(rows));
      await done2("Settings saved.");
    };
    forms["set-penalties"] = async (d, form) => {
      for (const i of form.querySelectorAll("input[data-pt]")) await q(sb.from("penalty_types").update({ amount: +i.value }).eq("id", +i.dataset.pt));
      await done2("Penalty amounts saved.");
    };
    forms["set-role"] = async (d) => {
      await rpc("set_user_role", { p_email: d.email, p_role: d.role });
      await done2("Role saved.");
    };
    actions["set-year"] = async (el) => {
      const y = Math.max(...core().periods.map((p) => p.year)) + 1;
      const o = await ask({ title: "Add contribution periods", message: `Add Wave 1 and Wave 2 for ${y}?`, ok: "Add" });
      if (!o) return;
      await busy(el, async () => {
        await rpc("add_period_year", { p_year: y });
        await done2(`Periods for ${y} added.`);
      });
    };
    actions["role-set"] = async (el) => {
      const o = await ask({ title: "Remove role", message: `Remove the ${el.dataset.role} role from ${el.dataset.email}? They become a normal member with no extra access.`, ok: "Remove role", danger: true });
      if (!o) return;
      await busy(el, async () => {
        await rpc("set_user_role", { p_email: el.dataset.email, p_role: "member" });
        await done2("Role removed.");
      });
    };
    changes.aq = (el) => {
      state.f.aq = el.value;
      hooks.route();
    };
    changes.atable = (el) => {
      state.f.atable = el.value;
      hooks.route();
    };
    routes9 = { settings: { title: "Settings", sub: "Administrator only", need: "admin", view: view2 } };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/minutes.js
var minutes_exports = {};
__export(minutes_exports, {
  routes: () => routes10
});
async function view3() {
  const rows = await q(sb.from("minutes").select("*").order("meeting_date", { ascending: false, nullsFirst: false }).order("id", { ascending: false }));
  const up = state.role.secretary;
  return h`${up ? h`<div class="card"><h2>Upload minutes</h2><form data-form="min-up"><div class="row"><label>Meeting date<input type="date" name="date" value="${today()}"></label><label>Title<input name="title" required maxlength="140" placeholder="e.g. October 2026 monthly meeting"></label></div>
    <label>Notes (optional)<input name="notes" maxlength="300" placeholder="Short summary"></label><label>File: a picture, PDF, Word document or any other format (up to 10 MB)<input type="file" name="file" required></label>
    <div class="sticky-act"><button class="btn" type="submit">${icon("plus")} Upload</button></div></form></div>` : ""}
  ${rows.length ? rows.map((m) => h`<div class="card" ${m.status === "removed" ? h`style="opacity:.6"` : ""}><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><h2>${m.title} ${m.status === "removed" ? badge("Removed", "bad") : ""}</h2>
    <p class="mu">${m.meeting_date ? "Meeting of " + fdate(m.meeting_date) + " \xB7 " : ""}uploaded ${fdate(m.created_at)} by ${m.uploaded_by_name || "the committee"}</p>${m.notes ? h`<p>${m.notes}</p>` : ""}
    <p class="mu">${icon("file")} ${m.file_name} \u00b7 ${badge(kind(m))} ${m.size_bytes ? size(m.size_bytes) : ""}</p>${m.status === "removed" ? h`<p class="mu">Removed by ${m.removed_by_name}: ${m.removed_reason}</p>` : ""}</div>
    <div style="display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap"><button class="btn sm" data-act="min-open" data-path="${m.file_path}">${icon("eye")} View</button><button class="btn sm ghost" data-act="min-dl" data-path="${m.file_path}" data-name="${m.file_name}">${icon("down")} Download</button>${up && m.status === "active" ? h`<button class="btn sm ghost" data-act="min-remove" data-id="${m.id}">Remove</button>` : ""}</div></div></div>`) : h`<div class="card">${empty("No minutes uploaded yet.", up ? "Use the form above to upload the first one." : "Minutes will appear here after each meeting.")}</div>`}`;
}
var MAX, size, kind, routes10;
var init_minutes = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/minutes.js"() {
    init_utils();
    init_state();
    init_supabase();
    MAX = 10 * 1024 * 1024;
    size = (n) => n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
    kind = (m) => /^image\//.test(m.mime_type || "") ? "Picture" : /pdf/.test(m.mime_type || "") ? "PDF" : /word|officedocument|msword/.test(m.mime_type || "") ? "Word" : /sheet|excel/.test(m.mime_type || "") ? "Excel" : /^text\//.test(m.mime_type || "") ? "Text" : "File";
    forms["min-up"] = async (d, form) => {
      const f = form.querySelector('input[type="file"]').files[0];
      if (!f) throw new Error("Choose a file to upload.");
      if (f.size > MAX) throw new Error("That file is larger than 10 MB. Please choose a smaller one.");
      const now = /* @__PURE__ */ new Date(), safe = f.name.replace(/[^A-Za-z0-9._-]+/g, "_").slice(-80);
      const path = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}_${safe}`;
      const up = await sb.storage.from("minutes").upload(path, f, { contentType: f.type || "application/octet-stream", upsert: false });
      if (up.error) throw up.error;
      await rpc("add_minutes", { p_date: d.date || null, p_title: d.title, p_notes: d.notes || null, p_path: path, p_name: f.name, p_mime: f.type || "application/octet-stream", p_size: f.size });
      toast("Minutes uploaded successfully.");
      await hooks.refresh();
    };
    actions["min-open"] = async (el) => {
      const w = window.open("", "_blank");
      const { data, error } = await sb.storage.from("minutes").createSignedUrl(el.dataset.path, 120);
      if (error) {
        if (w) w.close();
        throw error;
      }
      if (w) w.location = data.signedUrl;
      else location.href = data.signedUrl;
    };
    actions["min-dl"] = async (el) => {
      const { data, error } = await sb.storage.from("minutes").createSignedUrl(el.dataset.path, 120, { download: el.dataset.name });
      if (error) throw error;
      const a = document.createElement("a");
      a.href = data.signedUrl;
      a.download = el.dataset.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    actions["min-remove"] = async (el) => {
      const o = await ask({ title: "Remove these minutes", message: "They are hidden from members but kept for the committee, with your reason.", reason: true, ok: "Remove", danger: true });
      if (!o) return;
      await busy(el, async () => {
        await rpc("remove_minutes", { p_id: +el.dataset.id, p_reason: o.reason });
        toast("Minutes removed.");
        await hooks.refresh();
      }, "Removing...");
    };
    routes10 = { minutes: { title: "Minutes", sub: "Meeting records", need: null, view: view3 } };
  }
});

// ../../mnt/user-data/outputs/real-brothers/js/app.js
var app_exports = {};
__export(app_exports, {
  route: () => route
});
function shell() {
  const staff = state.role.staff, m = me();
  const items = (arr) => arr.filter((x) => can(x[3])).map((x) => link(x[0], x[1], x[2]));
  const side = staff ? h`${items(STAFF_NAV)}${state.meId ? h`<div class="grp">My account</div>${items(MY_NAV.filter((x) => x[0] !== "minutes"))}` : ""}` : items(MY_NAV);
  const bottomItems = staff ? STAFF_NAV.filter((x) => can(x[3])).slice(0, 4).map((x) => [x[0], x[1], x[2]]).concat([["more", "More", "more"]]) : MEMBER_BOTTOM;
  const role = state.role.admin ? "Administrator" : state.role.treasurer ? "Treasurer" : state.role.secretary ? "Secretary" : "Member";
  root().innerHTML = str(h`<div class="app"><aside class="side"><div class="brand"><img src="${LOGO}" alt=""><div><b>REAL BROTHERS 022</b><small>Dowry Support &amp; Mutual Aid</small></div></div>${side}
    <div class="who"><b>${m ? m.name : state.session.user.email}</b><br><span style="opacity:.8">${role}</span><br><a href="#" data-act="logout" style="color:#e8c98a">Sign out</a></div></aside>
    <main><div class="top"><div><h1 id="ttl"></h1><div class="sub" id="sub"></div></div></div><div id="view"></div></main>
    <nav class="bottom" aria-label="Main">${bottomItems.map((x) => link(x[0], x[1], x[2], ""))}</nav></div>`);
}
async function route() {
  if (!state.core) return;
  const r = parse() || { name: home() };
  const def = ROUTES[r.name];
  if (!def || !can(def.need)) {
    location.replace("#/" + home());
    return;
  }
  const tok = ++token, view4 = $("#view");
  if (!view4) return;
  $$("[data-r]").forEach((a) => a.classList.toggle("on", a.dataset.r === r.name || r.name === "member" && a.dataset.r === "members"));
  $("#ttl").textContent = def.title;
  $("#sub").textContent = def.sub || "";
  document.title = def.title + " | Real Brothers 022";
  const ae = document.activeElement, fid = ae && ae.id, fpos = ae && ae.selectionStart;
  if (!view4.dataset.ready) {
    view4.innerHTML = str(skeleton(4));
  }
  try {
    const out = await def.view(r.arg);
    if (tok !== token) return;
    view4.innerHTML = str(out);
    view4.dataset.ready = "1";
    if (def.after) def.after(r.arg);
    if (fid) {
      const n = document.getElementById(fid);
      if (n) {
        n.focus();
        try {
          n.setSelectionRange(fpos, fpos);
        } catch (_) {
        }
      }
    }
  } catch (e) {
    console.error(e);
    if (tok !== token) return;
    view4.innerHTML = str(h`<div class="card"><p class="bad"><b>This page could not load.</b></p><p class="mu">${errMsg(e)}</p><button class="btn" data-act="retry">Try again</button></div>`);
  }
}
function busyWrap(el, f, e) {
  const r = f(el, e);
  if (r && r.catch) r.catch((x) => {
    console.error(x);
    toast(errMsg(x), "error");
  });
}
var ROUTES, can, STAFF_NAV, MY_NAV, MEMBER_BOTTOM, link, parse, home, token, typing;
var init_app = __esm({
  "../../mnt/user-data/outputs/real-brothers/js/app.js"() {
    init_state();
    init_utils();
    init_logo();
    init_auth();
    init_data();
    init_dashboard();
    init_members();
    init_payments();
    init_finance();
    init_attendance();
    init_messages();
    init_voting();
    init_reports();
    init_settings();
    init_minutes();
    ROUTES = Object.assign({}, ...[dashboard_exports, members_exports, payments_exports, finance_exports, attendance_exports, messages_exports, voting_exports, reports_exports, settings_exports, minutes_exports].map((m) => m.routes));
    can = (need) => !need || (need === "member" ? !!state.meId : need === "staff" ? state.role.staff : !!state.role[need]);
    STAFF_NAV = [
      ["dash", "Dashboard", "dash", "staff"],
      ["members", "Members", "users", "staff"],
      ["pay", "Payments", "coin", "treasurer"],
      ["finance", "Finance", "bank", "treasurer"],
      ["att", "Attendance", "cal", "secretary"],
      ["msg", "Messages", "mail", "secretary"],
      ["vote", "Voting", "vote", "staff"],
      ["minutes", "Minutes", "file", "staff"],
      ["reports", "Reports", "chart", "staff"],
      ["settings", "Settings", "gear", "admin"]
    ];
    MY_NAV = [["home", "My Home", "home", "member"], ["contrib", "My Contributions", "wallet", "member"], ["statement", "My Statement", "file", "member"], ["inbox", "My Messages", "mail", "member"], ["minutes", "Minutes", "file", "member"], ["myatt", "My Attendance", "cal", "member"], ["myvote", "My Votes", "vote", "member"], ["profile", "My Profile", "user", "member"]];
    MEMBER_BOTTOM = [["home", "Home", "home"], ["contrib", "Contributions", "wallet"], ["statement", "Statement", "file"], ["inbox", "Messages", "mail"], ["more", "More", "more"]];
    link = (n, label2, ic, cls = "nav") => h`<a class="${cls}" href="#/${n}" data-r="${n}">${icon(ic)}<span>${label2}</span></a>`;
    parse = () => {
      const m = location.hash.match(/^#\/([a-z-]+)(?:\/(.+))?$/);
      return m ? { name: m[1], arg: m[2] } : null;
    };
    home = () => state.role.staff ? "dash" : "home";
    token = 0;
    window.addEventListener("hashchange", () => {
      const v = $("#view");
      if (v) delete v.dataset.ready;
      window.scrollTo(0, 0);
      route();
    });
    hooks.route = route;
    hooks.refresh = async () => {
      await loadCore();
      await route();
    };
    hooks.mount = () => {
      shell();
      if (!parse()) location.replace("#/" + home());
      route();
    };
    actions.retry = () => hooks.refresh();
    actions.more = () => {
    };
    ROUTES.more = { title: "More", need: "member", view: async () => h`<div class="card"><div class="list">${[["minutes", "Minutes", "file"], ["myatt", "Attendance", "cal"], ["myvote", "Voting", "vote"], ["profile", "My Profile", "user"]].concat(state.role.staff ? [["reports", "Reports", "chart"], ["settings", "Settings", "gear"], ["att", "Record attendance", "cal"], ["msg", "Send messages", "mail"], ["vote", "Voting admin", "vote"]].filter((x) => can(x[0] === "settings" ? "admin" : x[0] === "att" || x[0] === "msg" ? "secretary" : "staff")) : []).map((x) => h`<a class="it" href="#/${x[0]}" style="text-decoration:none;color:inherit"><span>${icon(x[2])} &nbsp;${x[1]}</span><span>&rsaquo;</span></a>`)}<a class="it" href="#" data-act="logout" style="text-decoration:none;color:var(--bad)"><span>${icon("out")} &nbsp;Sign out</span></a></div></div>` };
    ROUTES.more.need = null;
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-act]");
      if (!el) return;
      const f = actions[el.dataset.act];
      if (f) {
        e.preventDefault();
        busyWrap(el, f, e);
      }
    });
    document.addEventListener("submit", (e) => {
      const f = e.target.closest("form[data-form]");
      if (!f) return;
      e.preventDefault();
      const fn = forms[f.dataset.form];
      if (!fn) return;
      const btn = f.querySelector("button[type=submit]"), data = {};
      new FormData(f).forEach((v, k) => data[k] = v);
      busy(btn, () => fn(data, f, btn), "Processing...");
    });
    document.addEventListener("change", (e) => {
      const el = e.target.closest("[data-chg]");
      if (el && changes[el.dataset.chg]) changes[el.dataset.chg](el, e);
    });
    typing = debounce((el) => changes[el.dataset.inp](el), 250);
    document.addEventListener("input", (e) => {
      const el = e.target.closest("[data-inp]");
      if (el && changes[el.dataset.inp]) typing(el);
    });
    changes.filter = (el) => {
      state.f[el.name] = el.value;
      route();
    };
    actions.print = () => window.print();
    startAuth();
  }
});

// node_modules/@supabase/supabase-js/dist/module/index.js
var module_exports = {};
__export(module_exports, {
  AuthAdminApi: () => AuthAdminApi_default,
  AuthApiError: () => AuthApiError,
  AuthClient: () => AuthClient_default,
  AuthError: () => AuthError,
  AuthImplicitGrantRedirectError: () => AuthImplicitGrantRedirectError,
  AuthInvalidCredentialsError: () => AuthInvalidCredentialsError,
  AuthInvalidJwtError: () => AuthInvalidJwtError,
  AuthInvalidTokenResponseError: () => AuthInvalidTokenResponseError,
  AuthPKCEGrantCodeExchangeError: () => AuthPKCEGrantCodeExchangeError,
  AuthRetryableFetchError: () => AuthRetryableFetchError,
  AuthSessionMissingError: () => AuthSessionMissingError,
  AuthUnknownError: () => AuthUnknownError,
  AuthWeakPasswordError: () => AuthWeakPasswordError,
  CustomAuthError: () => CustomAuthError,
  FunctionRegion: () => FunctionRegion,
  FunctionsError: () => FunctionsError,
  FunctionsFetchError: () => FunctionsFetchError,
  FunctionsHttpError: () => FunctionsHttpError,
  FunctionsRelayError: () => FunctionsRelayError,
  GoTrueAdminApi: () => GoTrueAdminApi,
  GoTrueClient: () => GoTrueClient,
  NavigatorLockAcquireTimeoutError: () => NavigatorLockAcquireTimeoutError,
  PostgrestError: () => PostgrestError,
  REALTIME_CHANNEL_STATES: () => REALTIME_CHANNEL_STATES,
  REALTIME_LISTEN_TYPES: () => REALTIME_LISTEN_TYPES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT: () => REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  REALTIME_PRESENCE_LISTEN_EVENTS: () => REALTIME_PRESENCE_LISTEN_EVENTS,
  REALTIME_SUBSCRIBE_STATES: () => REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel: () => RealtimeChannel,
  RealtimeClient: () => RealtimeClient,
  RealtimePresence: () => RealtimePresence,
  SIGN_OUT_SCOPES: () => SIGN_OUT_SCOPES,
  SupabaseClient: () => SupabaseClient,
  WebSocketFactory: () => websocket_factory_default,
  createClient: () => createClient,
  isAuthApiError: () => isAuthApiError,
  isAuthError: () => isAuthError,
  isAuthImplicitGrantRedirectError: () => isAuthImplicitGrantRedirectError,
  isAuthRetryableFetchError: () => isAuthRetryableFetchError,
  isAuthSessionMissingError: () => isAuthSessionMissingError,
  isAuthWeakPasswordError: () => isAuthWeakPasswordError,
  lockInternals: () => internals,
  navigatorLock: () => navigatorLock,
  processLock: () => processLock
});

// node_modules/@supabase/functions-js/dist/module/helper.js
var resolveFetch = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};

// node_modules/@supabase/functions-js/dist/module/types.js
var FunctionsError = class extends Error {
  constructor(message, name = "FunctionsError", context) {
    super(message);
    this.name = name;
    this.context = context;
  }
};
var FunctionsFetchError = class extends FunctionsError {
  constructor(context) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
  }
};
var FunctionsRelayError = class extends FunctionsError {
  constructor(context) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
  }
};
var FunctionsHttpError = class extends FunctionsError {
  constructor(context) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
  }
};
var FunctionRegion;
(function(FunctionRegion2) {
  FunctionRegion2["Any"] = "any";
  FunctionRegion2["ApNortheast1"] = "ap-northeast-1";
  FunctionRegion2["ApNortheast2"] = "ap-northeast-2";
  FunctionRegion2["ApSouth1"] = "ap-south-1";
  FunctionRegion2["ApSoutheast1"] = "ap-southeast-1";
  FunctionRegion2["ApSoutheast2"] = "ap-southeast-2";
  FunctionRegion2["CaCentral1"] = "ca-central-1";
  FunctionRegion2["EuCentral1"] = "eu-central-1";
  FunctionRegion2["EuWest1"] = "eu-west-1";
  FunctionRegion2["EuWest2"] = "eu-west-2";
  FunctionRegion2["EuWest3"] = "eu-west-3";
  FunctionRegion2["SaEast1"] = "sa-east-1";
  FunctionRegion2["UsEast1"] = "us-east-1";
  FunctionRegion2["UsWest1"] = "us-west-1";
  FunctionRegion2["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var __awaiter = function(thisArg, _arguments, P, generator) {
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
var FunctionsClient = class {
  constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
    this.url = url;
    this.headers = headers;
    this.region = region;
    this.fetch = resolveFetch(customFetch);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   */
  setAuth(token2) {
    this.headers.Authorization = `Bearer ${token2}`;
  }
  /**
   * Invokes a function
   * @param functionName - The name of the Function to invoke.
   * @param options - Options for invoking the Function.
   */
  invoke(functionName, options = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { headers, method, body: functionArgs, signal } = options;
        let _headers = {};
        let { region } = options;
        if (!region) {
          region = this.region;
        }
        const url = new URL(`${this.url}/${functionName}`);
        if (region && region !== "any") {
          _headers["x-region"] = region;
          url.searchParams.set("forceFunctionRegion", region);
        }
        let body;
        if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
          if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
            _headers["Content-Type"] = "application/octet-stream";
            body = functionArgs;
          } else if (typeof functionArgs === "string") {
            _headers["Content-Type"] = "text/plain";
            body = functionArgs;
          } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
            body = functionArgs;
          } else {
            _headers["Content-Type"] = "application/json";
            body = JSON.stringify(functionArgs);
          }
        }
        const response = yield this.fetch(url.toString(), {
          method: method || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
          body,
          signal
        }).catch((fetchError) => {
          if (fetchError.name === "AbortError") {
            throw fetchError;
          }
          throw new FunctionsFetchError(fetchError);
        });
        const isRelayError = response.headers.get("x-relay-error");
        if (isRelayError && isRelayError === "true") {
          throw new FunctionsRelayError(response);
        }
        if (!response.ok) {
          throw new FunctionsHttpError(response);
        }
        let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
        let data;
        if (responseType === "application/json") {
          data = yield response.json();
        } else if (responseType === "application/octet-stream") {
          data = yield response.blob();
        } else if (responseType === "text/event-stream") {
          data = response;
        } else if (responseType === "multipart/form-data") {
          data = yield response.formData();
        } else {
          data = yield response.text();
        }
        return { data, error: null, response };
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return { data: null, error: new FunctionsFetchError(error) };
        }
        return {
          data: null,
          error,
          response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError ? error.context : void 0
        };
      }
    });
  }
};

// node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs
var import_cjs = __toESM(require_cjs(), 1);
var {
  PostgrestClient,
  PostgrestQueryBuilder,
  PostgrestFilterBuilder,
  PostgrestTransformBuilder,
  PostgrestBuilder,
  PostgrestError
} = import_cjs.default;

// node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
var WebSocketFactory = class {
  static detectEnvironment() {
    var _a;
    if (typeof WebSocket !== "undefined") {
      return { type: "native", constructor: WebSocket };
    }
    if (typeof globalThis !== "undefined" && typeof globalThis.WebSocket !== "undefined") {
      return { type: "native", constructor: globalThis.WebSocket };
    }
    if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") {
      return { type: "native", constructor: global.WebSocket };
    }
    if (typeof globalThis !== "undefined" && typeof globalThis.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") {
      return {
        type: "cloudflare",
        error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
      };
    }
    if (typeof globalThis !== "undefined" && globalThis.EdgeRuntime || typeof navigator !== "undefined" && ((_a = navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes("Vercel-Edge"))) {
      return {
        type: "unsupported",
        error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
      };
    }
    if (typeof process !== "undefined") {
      const processVersions = process["versions"];
      if (processVersions && processVersions["node"]) {
        const versionString = processVersions["node"];
        const nodeVersion = parseInt(versionString.replace(/^v/, "").split(".")[0]);
        if (nodeVersion >= 22) {
          if (typeof globalThis.WebSocket !== "undefined") {
            return { type: "native", constructor: globalThis.WebSocket };
          }
          return {
            type: "unsupported",
            error: `Node.js ${nodeVersion} detected but native WebSocket not found.`,
            workaround: "Provide a WebSocket implementation via the transport option."
          };
        }
        return {
          type: "unsupported",
          error: `Node.js ${nodeVersion} detected without native WebSocket support.`,
          workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })'
        };
      }
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
    };
  }
  static getWebSocketConstructor() {
    const env = this.detectEnvironment();
    if (env.constructor) {
      return env.constructor;
    }
    let errorMessage = env.error || "WebSocket not supported in this environment.";
    if (env.workaround) {
      errorMessage += `

Suggested solution: ${env.workaround}`;
    }
    throw new Error(errorMessage);
  }
  static createWebSocket(url, protocols) {
    const WS = this.getWebSocketConstructor();
    return new WS(url, protocols);
  }
  static isWebSocketSupported() {
    try {
      const env = this.detectEnvironment();
      return env.type === "native" || env.type === "ws";
    } catch (_a) {
      return false;
    }
  }
};
var websocket_factory_default = WebSocketFactory;

// node_modules/@supabase/realtime-js/dist/module/lib/version.js
var version = "2.15.5";

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_VERSION = `realtime-js/${version}`;
var VSN = "1.0.0";
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var MAX_PUSH_BUFFER_SIZE = 100;
var SOCKET_STATES;
(function(SOCKET_STATES2) {
  SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
  SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
  SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
  SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES2) {
  CHANNEL_STATES2["closed"] = "closed";
  CHANNEL_STATES2["errored"] = "errored";
  CHANNEL_STATES2["joined"] = "joined";
  CHANNEL_STATES2["joining"] = "joining";
  CHANNEL_STATES2["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS2) {
  CHANNEL_EVENTS2["close"] = "phx_close";
  CHANNEL_EVENTS2["error"] = "phx_error";
  CHANNEL_EVENTS2["join"] = "phx_join";
  CHANNEL_EVENTS2["reply"] = "phx_reply";
  CHANNEL_EVENTS2["leave"] = "phx_leave";
  CHANNEL_EVENTS2["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS2) {
  TRANSPORTS2["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function(CONNECTION_STATE2) {
  CONNECTION_STATE2["Connecting"] = "connecting";
  CONNECTION_STATE2["Open"] = "open";
  CONNECTION_STATE2["Closing"] = "closing";
  CONNECTION_STATE2["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));

// node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
var Serializer = class {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this._binaryDecode(rawPayload));
    }
    if (typeof rawPayload === "string") {
      return callback(JSON.parse(rawPayload));
    }
    return callback({});
  }
  _binaryDecode(buffer) {
    const view4 = new DataView(buffer);
    const decoder = new TextDecoder();
    return this._decodeBroadcast(buffer, view4, decoder);
  }
  _decodeBroadcast(buffer, view4, decoder) {
    const topicSize = view4.getUint8(1);
    const eventSize = view4.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
    return { ref: null, topic, event, payload: data };
  }
};

// node_modules/@supabase/realtime-js/dist/module/lib/timer.js
var Timer = class {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = void 0;
    this.tries = 0;
    this.callback = callback;
    this.timerCalc = timerCalc;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
    this.timer = void 0;
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
};

// node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
var PostgresTypes;
(function(PostgresTypes2) {
  PostgresTypes2["abstime"] = "abstime";
  PostgresTypes2["bool"] = "bool";
  PostgresTypes2["date"] = "date";
  PostgresTypes2["daterange"] = "daterange";
  PostgresTypes2["float4"] = "float4";
  PostgresTypes2["float8"] = "float8";
  PostgresTypes2["int2"] = "int2";
  PostgresTypes2["int4"] = "int4";
  PostgresTypes2["int4range"] = "int4range";
  PostgresTypes2["int8"] = "int8";
  PostgresTypes2["int8range"] = "int8range";
  PostgresTypes2["json"] = "json";
  PostgresTypes2["jsonb"] = "jsonb";
  PostgresTypes2["money"] = "money";
  PostgresTypes2["numeric"] = "numeric";
  PostgresTypes2["oid"] = "oid";
  PostgresTypes2["reltime"] = "reltime";
  PostgresTypes2["text"] = "text";
  PostgresTypes2["time"] = "time";
  PostgresTypes2["timestamp"] = "timestamp";
  PostgresTypes2["timestamptz"] = "timestamptz";
  PostgresTypes2["timetz"] = "timetz";
  PostgresTypes2["tsrange"] = "tsrange";
  PostgresTypes2["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
var convertChangeData = (columns, record2, options = {}) => {
  var _a;
  const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
  return Object.keys(record2).reduce((acc, rec_key) => {
    acc[rec_key] = convertColumn(rec_key, columns, record2, skipTypes);
    return acc;
  }, {});
};
var convertColumn = (columnName, columns, record2, skipTypes) => {
  const column = columns.find((x) => x.name === columnName);
  const colType = column === null || column === void 0 ? void 0 : column.type;
  const value = record2[columnName];
  if (colType && !skipTypes.includes(colType)) {
    return convertCell(colType, value);
  }
  return noop(value);
};
var convertCell = (type, value) => {
  if (type.charAt(0) === "_") {
    const dataType = type.slice(1, type.length);
    return toArray(value, dataType);
  }
  switch (type) {
    case PostgresTypes.bool:
      return toBoolean(value);
    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(value);
    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(value);
    case PostgresTypes.timestamp:
      return toTimestampString(value);
    // Format to be consistent with PostgREST
    case PostgresTypes.abstime:
    // To allow users to cast it based on Timezone
    case PostgresTypes.date:
    // To allow users to cast it based on Timezone
    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime:
    // To allow users to cast it based on Timezone
    case PostgresTypes.text:
    case PostgresTypes.time:
    // To allow users to cast it based on Timezone
    case PostgresTypes.timestamptz:
    // To allow users to cast it based on Timezone
    case PostgresTypes.timetz:
    // To allow users to cast it based on Timezone
    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop(value);
    default:
      return noop(value);
  }
};
var noop = (value) => {
  return value;
};
var toBoolean = (value) => {
  switch (value) {
    case "t":
      return true;
    case "f":
      return false;
    default:
      return value;
  }
};
var toNumber = (value) => {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return value;
};
var toJson = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(`JSON parse error: ${error}`);
      return value;
    }
  }
  return value;
};
var toArray = (value, type) => {
  if (typeof value !== "string") {
    return value;
  }
  const lastIdx = value.length - 1;
  const closeBrace = value[lastIdx];
  const openBrace = value[0];
  if (openBrace === "{" && closeBrace === "}") {
    let arr;
    const valTrim = value.slice(1, lastIdx);
    try {
      arr = JSON.parse("[" + valTrim + "]");
    } catch (_) {
      arr = valTrim ? valTrim.split(",") : [];
    }
    return arr.map((val) => convertCell(type, val));
  }
  return value;
};
var toTimestampString = (value) => {
  if (typeof value === "string") {
    return value.replace(" ", "T");
  }
  return value;
};
var httpEndpointURL = (socketUrl) => {
  let url = socketUrl;
  url = url.replace(/^ws/i, "http");
  url = url.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "");
  return url.replace(/\/+$/, "") + "/api/broadcast";
};

// node_modules/@supabase/realtime-js/dist/module/lib/push.js
var Push = class {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
    this.channel = channel;
    this.event = event;
    this.payload = payload;
    this.timeout = timeout;
    this.sent = false;
    this.timeoutTimer = void 0;
    this.ref = "";
    this.receivedResp = null;
    this.recHooks = [];
    this.refEvent = null;
  }
  resend(timeout) {
    this.timeout = timeout;
    this._cancelRefEvent();
    this.ref = "";
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
    this.send();
  }
  send() {
    if (this._hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    });
  }
  updatePayload(payload) {
    this.payload = Object.assign(Object.assign({}, this.payload), payload);
  }
  receive(status, callback) {
    var _a;
    if (this._hasReceived(status)) {
      callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  startTimeout() {
    if (this.timeoutTimer) {
      return;
    }
    this.ref = this.channel.socket._makeRef();
    this.refEvent = this.channel._replyEventName(this.ref);
    const callback = (payload) => {
      this._cancelRefEvent();
      this._cancelTimeout();
      this.receivedResp = payload;
      this._matchReceive(payload);
    };
    this.channel._on(this.refEvent, {}, callback);
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(status, response) {
    if (this.refEvent)
      this.channel._trigger(this.refEvent, { status, response });
  }
  destroy() {
    this._cancelRefEvent();
    this._cancelTimeout();
  }
  _cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = void 0;
  }
  _matchReceive({ status, response }) {
    this.recHooks.filter((h2) => h2.status === status).forEach((h2) => h2.callback(response));
  }
  _hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
};

// node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
  REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
  REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
  REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
var RealtimePresence = class _RealtimePresence {
  /**
   * Initializes the Presence.
   *
   * @param channel - The RealtimeChannel
   * @param opts - The options,
   *        for example `{events: {state: 'state', diff: 'diff'}}`
   */
  constructor(channel, opts) {
    this.channel = channel;
    this.state = {};
    this.pendingDiffs = [];
    this.joinRef = null;
    this.enabled = false;
    this.caller = {
      onJoin: () => {
      },
      onLeave: () => {
      },
      onSync: () => {
      }
    };
    const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
      state: "presence_state",
      diff: "presence_diff"
    };
    this.channel._on(events.state, {}, (newState) => {
      const { onJoin, onLeave, onSync } = this.caller;
      this.joinRef = this.channel._joinRef();
      this.state = _RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
      this.pendingDiffs.forEach((diff) => {
        this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
      });
      this.pendingDiffs = [];
      onSync();
    });
    this.channel._on(events.diff, {}, (diff) => {
      const { onJoin, onLeave, onSync } = this.caller;
      if (this.inPendingSyncState()) {
        this.pendingDiffs.push(diff);
      } else {
        this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
        onSync();
      }
    });
    this.onJoin((key, currentPresences, newPresences) => {
      this.channel._trigger("presence", {
        event: "join",
        key,
        currentPresences,
        newPresences
      });
    });
    this.onLeave((key, currentPresences, leftPresences) => {
      this.channel._trigger("presence", {
        event: "leave",
        key,
        currentPresences,
        leftPresences
      });
    });
    this.onSync(() => {
      this.channel._trigger("presence", { event: "sync" });
    });
  }
  /**
   * Used to sync the list of presences on the server with the
   * client's state.
   *
   * An optional `onJoin` and `onLeave` callback can be provided to
   * react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @internal
   */
  static syncState(currentState, newState, onJoin, onLeave) {
    const state2 = this.cloneDeep(currentState);
    const transformedState = this.transformState(newState);
    const joins = {};
    const leaves = {};
    this.map(state2, (key, presences) => {
      if (!transformedState[key]) {
        leaves[key] = presences;
      }
    });
    this.map(transformedState, (key, newPresences) => {
      const currentPresences = state2[key];
      if (currentPresences) {
        const newPresenceRefs = newPresences.map((m) => m.presence_ref);
        const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
        const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
        const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
        if (joinedPresences.length > 0) {
          joins[key] = joinedPresences;
        }
        if (leftPresences.length > 0) {
          leaves[key] = leftPresences;
        }
      } else {
        joins[key] = newPresences;
      }
    });
    return this.syncDiff(state2, { joins, leaves }, onJoin, onLeave);
  }
  /**
   * Used to sync a diff of presence join and leave events from the
   * server, as they happen.
   *
   * Like `syncState`, `syncDiff` accepts optional `onJoin` and
   * `onLeave` callbacks to react to a user joining or leaving from a
   * device.
   *
   * @internal
   */
  static syncDiff(state2, diff, onJoin, onLeave) {
    const { joins, leaves } = {
      joins: this.transformState(diff.joins),
      leaves: this.transformState(diff.leaves)
    };
    if (!onJoin) {
      onJoin = () => {
      };
    }
    if (!onLeave) {
      onLeave = () => {
      };
    }
    this.map(joins, (key, newPresences) => {
      var _a;
      const currentPresences = (_a = state2[key]) !== null && _a !== void 0 ? _a : [];
      state2[key] = this.cloneDeep(newPresences);
      if (currentPresences.length > 0) {
        const joinedPresenceRefs = state2[key].map((m) => m.presence_ref);
        const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
        state2[key].unshift(...curPresences);
      }
      onJoin(key, currentPresences, newPresences);
    });
    this.map(leaves, (key, leftPresences) => {
      let currentPresences = state2[key];
      if (!currentPresences)
        return;
      const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
      currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
      state2[key] = currentPresences;
      onLeave(key, currentPresences, leftPresences);
      if (currentPresences.length === 0)
        delete state2[key];
    });
    return state2;
  }
  /** @internal */
  static map(obj, func) {
    return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_ref'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_ref: '2', user_id: 1 },
   *    { presence_ref: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   *
   * @internal
   */
  static transformState(state2) {
    state2 = this.cloneDeep(state2);
    return Object.getOwnPropertyNames(state2).reduce((newState, key) => {
      const presences = state2[key];
      if ("metas" in presences) {
        newState[key] = presences.metas.map((presence) => {
          presence["presence_ref"] = presence["phx_ref"];
          delete presence["phx_ref"];
          delete presence["phx_ref_prev"];
          return presence;
        });
      } else {
        newState[key] = presences;
      }
      return newState;
    }, {});
  }
  /** @internal */
  static cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  /** @internal */
  onJoin(callback) {
    this.caller.onJoin = callback;
  }
  /** @internal */
  onLeave(callback) {
    this.caller.onLeave = callback;
  }
  /** @internal */
  onSync(callback) {
    this.caller.onSync = callback;
  }
  /** @internal */
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES2) {
  REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
  REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
  REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
  REALTIME_LISTEN_TYPES2["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES2) {
  REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
  REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
  REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
  REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
var REALTIME_CHANNEL_STATES = CHANNEL_STATES;
var RealtimeChannel = class _RealtimeChannel {
  constructor(topic, params = { config: {} }, socket) {
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = {};
    this.state = CHANNEL_STATES.closed;
    this.joinedOnce = false;
    this.pushBuffer = [];
    this.subTopic = topic.replace(/^realtime:/i, "");
    this.params.config = Object.assign({
      broadcast: { ack: false, self: false },
      presence: { key: "", enabled: false },
      private: false
    }, params.config);
    this.timeout = this.socket.timeout;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach((pushEvent) => pushEvent.send());
      this.pushBuffer = [];
    });
    this._onClose(() => {
      this.rejoinTimer.reset();
      this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
      this.state = CHANNEL_STATES.closed;
      this.socket._remove(this);
    });
    this._onError((reason) => {
      if (this._isLeaving() || this._isClosed()) {
        return;
      }
      this.socket.log("channel", `error ${this.topic}`, reason);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("timeout", () => {
      if (!this._isJoining()) {
        return;
      }
      this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("error", (reason) => {
      if (this._isLeaving() || this._isClosed()) {
        return;
      }
      this.socket.log("channel", `error ${this.topic}`, reason);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
      this._trigger(this._replyEventName(ref), payload);
    });
    this.presence = new RealtimePresence(this);
    this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint);
    this.private = this.params.config.private || false;
  }
  /** Subscribe registers your client with the server */
  subscribe(callback, timeout = this.timeout) {
    var _a, _b, _c;
    if (!this.socket.isConnected()) {
      this.socket.connect();
    }
    if (this.state == CHANNEL_STATES.closed) {
      const { config: { broadcast, presence, private: isPrivate } } = this.params;
      const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
      const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
      const accessTokenPayload = {};
      const config = {
        broadcast,
        presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
        postgres_changes,
        private: isPrivate
      };
      if (this.socket.accessTokenValue) {
        accessTokenPayload.access_token = this.socket.accessTokenValue;
      }
      this._onError((e) => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e));
      this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
      this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
      this.joinedOnce = true;
      this._rejoin(timeout);
      this.joinPush.receive("ok", async ({ postgres_changes: postgres_changes2 }) => {
        var _a2;
        this.socket.setAuth();
        if (postgres_changes2 === void 0) {
          callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        } else {
          const clientPostgresBindings = this.bindings.postgres_changes;
          const bindingsLen = (_a2 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a2 !== void 0 ? _a2 : 0;
          const newPostgresBindings = [];
          for (let i = 0; i < bindingsLen; i++) {
            const clientPostgresBinding = clientPostgresBindings[i];
            const { filter: { event, schema, table, filter } } = clientPostgresBinding;
            const serverPostgresFilter = postgres_changes2 && postgres_changes2[i];
            if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
              newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
            } else {
              this.unsubscribe();
              this.state = CHANNEL_STATES.errored;
              callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = newPostgresBindings;
          callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        }
      }).receive("error", (error) => {
        this.state = CHANNEL_STATES.errored;
        callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
        return;
      }).receive("timeout", () => {
        callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
        return;
      });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  async track(payload, opts = {}) {
    return await this.send({
      type: "presence",
      event: "track",
      payload
    }, opts.timeout || this.timeout);
  }
  async untrack(opts = {}) {
    return await this.send({
      type: "presence",
      event: "untrack"
    }, opts);
  }
  on(type, filter, callback) {
    if (this.state === CHANNEL_STATES.joined && type === REALTIME_LISTEN_TYPES.PRESENCE) {
      this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`);
      this.unsubscribe().then(() => this.subscribe());
    }
    return this._on(type, filter, callback);
  }
  /**
   * Sends a message into the channel.
   *
   * @param args Arguments to send to channel
   * @param args.type The type of event to send
   * @param args.event The name of the event being sent
   * @param args.payload Payload to be sent
   * @param opts Options to be used during the send process
   */
  async send(args, opts = {}) {
    var _a, _b;
    if (!this._canPush() && args.type === "broadcast") {
      const { event, payload: endpoint_payload } = args;
      const authorization = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
      const options = {
        method: "POST",
        headers: {
          Authorization: authorization,
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event,
              payload: endpoint_payload,
              private: this.private
            }
          ]
        })
      };
      try {
        const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
        await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
        return response.ok ? "ok" : "error";
      } catch (error) {
        if (error.name === "AbortError") {
          return "timed out";
        } else {
          return "error";
        }
      }
    } else {
      return new Promise((resolve) => {
        var _a2, _b2, _c;
        const push = this._push(args.type, args, opts.timeout || this.timeout);
        if (args.type === "broadcast" && !((_c = (_b2 = (_a2 = this.params) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b2 === void 0 ? void 0 : _b2.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
          resolve("ok");
        }
        push.receive("ok", () => resolve("ok"));
        push.receive("error", () => resolve("error"));
        push.receive("timeout", () => resolve("timed out"));
      });
    }
  }
  updateJoinPayload(payload) {
    this.joinPush.updatePayload(payload);
  }
  /**
   * Leaves the channel.
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */
  unsubscribe(timeout = this.timeout) {
    this.state = CHANNEL_STATES.leaving;
    const onClose = () => {
      this.socket.log("channel", `leave ${this.topic}`);
      this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
    };
    this.joinPush.destroy();
    let leavePush = null;
    return new Promise((resolve) => {
      leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive("ok", () => {
        onClose();
        resolve("ok");
      }).receive("timeout", () => {
        onClose();
        resolve("timed out");
      }).receive("error", () => {
        resolve("error");
      });
      leavePush.send();
      if (!this._canPush()) {
        leavePush.trigger("ok", {});
      }
    }).finally(() => {
      leavePush === null || leavePush === void 0 ? void 0 : leavePush.destroy();
    });
  }
  /**
   * Teardown the channel.
   *
   * Destroys and stops related timers.
   */
  teardown() {
    this.pushBuffer.forEach((push) => push.destroy());
    this.pushBuffer = [];
    this.rejoinTimer.reset();
    this.joinPush.destroy();
    this.state = CHANNEL_STATES.closed;
    this.bindings = {};
  }
  /** @internal */
  async _fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
    clearTimeout(id);
    return response;
  }
  /** @internal */
  _push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    }
    let pushEvent = new Push(this, event, payload, timeout);
    if (this._canPush()) {
      pushEvent.send();
    } else {
      this._addToPushBuffer(pushEvent);
    }
    return pushEvent;
  }
  /** @internal */
  _addToPushBuffer(pushEvent) {
    pushEvent.startTimeout();
    this.pushBuffer.push(pushEvent);
    if (this.pushBuffer.length > MAX_PUSH_BUFFER_SIZE) {
      const removedPush = this.pushBuffer.shift();
      if (removedPush) {
        removedPush.destroy();
        this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload);
      }
    }
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(_event, payload, _ref) {
    return payload;
  }
  /** @internal */
  _isMember(topic) {
    return this.topic === topic;
  }
  /** @internal */
  _joinRef() {
    return this.joinPush.ref;
  }
  /** @internal */
  _trigger(type, payload, ref) {
    var _a, _b;
    const typeLower = type.toLocaleLowerCase();
    const { close, error, leave, join } = CHANNEL_EVENTS;
    const events = [close, error, leave, join];
    if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
      return;
    }
    let handledPayload = this._onMessage(typeLower, payload, ref);
    if (payload && !handledPayload) {
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    }
    if (["insert", "update", "delete"].includes(typeLower)) {
      (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
        var _a2, _b2, _c;
        return ((_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
      }).map((bind) => bind.callback(handledPayload, ref));
    } else {
      (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
        var _a2, _b2, _c, _d, _e, _f;
        if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
          if ("id" in bind) {
            const bindId = bind.id;
            const bindEvent = (_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event;
            return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
          } else {
            const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
            return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
          }
        } else {
          return bind.type.toLocaleLowerCase() === typeLower;
        }
      }).map((bind) => {
        if (typeof handledPayload === "object" && "ids" in handledPayload) {
          const postgresChanges = handledPayload.data;
          const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
          const enrichedPayload = {
            schema,
            table,
            commit_timestamp,
            eventType: type2,
            new: {},
            old: {},
            errors
          };
          handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
        }
        bind.callback(handledPayload, ref);
      });
    }
  }
  /** @internal */
  _isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
  /** @internal */
  _replyEventName(ref) {
    return `chan_reply_${ref}`;
  }
  /** @internal */
  _on(type, filter, callback) {
    const typeLower = type.toLocaleLowerCase();
    const binding = {
      type: typeLower,
      filter,
      callback
    };
    if (this.bindings[typeLower]) {
      this.bindings[typeLower].push(binding);
    } else {
      this.bindings[typeLower] = [binding];
    }
    return this;
  }
  /** @internal */
  _off(type, filter) {
    const typeLower = type.toLocaleLowerCase();
    if (this.bindings[typeLower]) {
      this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
        var _a;
        return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && _RealtimeChannel.isEqual(bind.filter, filter));
      });
    }
    return this;
  }
  /** @internal */
  static isEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (const k in obj1) {
      if (obj1[k] !== obj2[k]) {
        return false;
      }
    }
    return true;
  }
  /** @internal */
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout();
    if (this.socket.isConnected()) {
      this._rejoin();
    }
  }
  /**
   * Registers a callback that will be executed when the channel closes.
   *
   * @internal
   */
  _onClose(callback) {
    this._on(CHANNEL_EVENTS.close, {}, callback);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(callback) {
    this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
  }
  /**
   * Returns `true` if the socket is connected and the channel has been joined.
   *
   * @internal
   */
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  /** @internal */
  _rejoin(timeout = this.timeout) {
    if (this._isLeaving()) {
      return;
    }
    this.socket._leaveOpenTopic(this.topic);
    this.state = CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }
  /** @internal */
  _getPayloadRecords(payload) {
    const records = {
      new: {},
      old: {}
    };
    if (payload.type === "INSERT" || payload.type === "UPDATE") {
      records.new = convertChangeData(payload.columns, payload.record);
    }
    if (payload.type === "UPDATE" || payload.type === "DELETE") {
      records.old = convertChangeData(payload.columns, payload.old_record);
    }
    return records;
  }
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var noop2 = () => {
};
var CONNECTION_TIMEOUTS = {
  HEARTBEAT_INTERVAL: 25e3,
  RECONNECT_DELAY: 10,
  HEARTBEAT_TIMEOUT_FALLBACK: 100
};
var RECONNECT_INTERVALS = [1e3, 2e3, 5e3, 1e4];
var DEFAULT_RECONNECT_FALLBACK = 1e4;
var WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
var RealtimeClient = class {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.heartbeatCallback The optional function to handle heartbeat status.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.logLevel Sets the log level for Realtime
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   * @param options.worker Use Web Worker to set a side flow. Defaults to false.
   * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
   */
  constructor(endPoint, options) {
    var _a;
    this.accessTokenValue = null;
    this.apiKey = null;
    this.channels = new Array();
    this.endPoint = "";
    this.httpEndpoint = "";
    this.headers = {};
    this.params = {};
    this.timeout = DEFAULT_TIMEOUT;
    this.transport = null;
    this.heartbeatIntervalMs = CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
    this.heartbeatTimer = void 0;
    this.pendingHeartbeatRef = null;
    this.heartbeatCallback = noop2;
    this.ref = 0;
    this.reconnectTimer = null;
    this.logger = noop2;
    this.conn = null;
    this.sendBuffer = [];
    this.serializer = new Serializer();
    this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    this.accessToken = null;
    this._connectionState = "disconnected";
    this._wasManualDisconnect = false;
    this._authPromise = null;
    this._resolveFetch = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args)).catch((error) => {
          throw new Error(`Failed to load @supabase/node-fetch: ${error.message}. This is required for HTTP requests in Node.js environments without native fetch.`);
        });
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    if (!((_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey)) {
      throw new Error("API key is required to connect to Realtime");
    }
    this.apiKey = options.params.apikey;
    this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
    this.httpEndpoint = httpEndpointURL(endPoint);
    this._initializeOptions(options);
    this._setupReconnectionTimer();
    this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected()) {
      return;
    }
    this._setConnectionState("connecting");
    this._setAuthSafely("connect");
    if (this.transport) {
      this.conn = new this.transport(this.endpointURL());
    } else {
      try {
        this.conn = websocket_factory_default.createWebSocket(this.endpointURL());
      } catch (error) {
        this._setConnectionState("disconnected");
        const errorMessage = error.message;
        if (errorMessage.includes("Node.js")) {
          throw new Error(`${errorMessage}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
        }
        throw new Error(`WebSocket not available: ${errorMessage}`);
      }
    }
    this._setupConnectionHandlers();
  }
  /**
   * Returns the URL of the websocket.
   * @returns string The URL of the websocket.
   */
  endpointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(code, reason) {
    if (this.isDisconnecting()) {
      return;
    }
    this._setConnectionState("disconnecting", true);
    if (this.conn) {
      const fallbackTimer = setTimeout(() => {
        this._setConnectionState("disconnected");
      }, 100);
      this.conn.onclose = () => {
        clearTimeout(fallbackTimer);
        this._setConnectionState("disconnected");
      };
      if (code) {
        this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
      } else {
        this.conn.close();
      }
      this._teardownConnection();
    } else {
      this._setConnectionState("disconnected");
    }
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  async removeChannel(channel) {
    const status = await channel.unsubscribe();
    if (this.channels.length === 0) {
      this.disconnect();
    }
    return status;
  }
  /**
   * Unsubscribes and removes all channels
   */
  async removeAllChannels() {
    const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
    this.channels = [];
    this.disconnect();
    return values_1;
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(kind2, msg, data) {
    this.logger(kind2, msg, data);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return CONNECTION_STATE.Connecting;
      case SOCKET_STATES.open:
        return CONNECTION_STATE.Open;
      case SOCKET_STATES.closing:
        return CONNECTION_STATE.Closing;
      default:
        return CONNECTION_STATE.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === CONNECTION_STATE.Open;
  }
  /**
   * Returns `true` if the connection is currently connecting.
   */
  isConnecting() {
    return this._connectionState === "connecting";
  }
  /**
   * Returns `true` if the connection is currently disconnecting.
   */
  isDisconnecting() {
    return this._connectionState === "disconnecting";
  }
  channel(topic, params = { config: {} }) {
    const realtimeTopic = `realtime:${topic}`;
    const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
    if (!exists) {
      const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
      this.channels.push(chan);
      return chan;
    } else {
      return exists;
    }
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(data) {
    const { topic, event, payload, ref } = data;
    const callback = () => {
      this.encode(data, (result) => {
        var _a;
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
      });
    };
    this.log("push", `${topic} ${event} (${ref})`, payload);
    if (this.isConnected()) {
      callback();
    } else {
      this.sendBuffer.push(callback);
    }
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * If param is null it will use the `accessToken` callback function or the token set on the client.
   *
   * On callback used, it will set the value of the token internal to the client.
   *
   * @param token A JWT string to override the token set on the client.
   */
  async setAuth(token2 = null) {
    this._authPromise = this._performAuth(token2);
    try {
      await this._authPromise;
    } finally {
      this._authPromise = null;
    }
  }
  /**
   * Sends a heartbeat message if the socket is connected.
   */
  async sendHeartbeat() {
    var _a;
    if (!this.isConnected()) {
      try {
        this.heartbeatCallback("disconnected");
      } catch (e) {
        this.log("error", "error in heartbeat callback", e);
      }
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      try {
        this.heartbeatCallback("timeout");
      } catch (e) {
        this.log("error", "error in heartbeat callback", e);
      }
      this._wasManualDisconnect = false;
      (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "heartbeat timeout");
      setTimeout(() => {
        var _a2;
        if (!this.isConnected()) {
          (_a2 = this.reconnectTimer) === null || _a2 === void 0 ? void 0 : _a2.scheduleTimeout();
        }
      }, CONNECTION_TIMEOUTS.HEARTBEAT_TIMEOUT_FALLBACK);
      return;
    }
    this.pendingHeartbeatRef = this._makeRef();
    this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    try {
      this.heartbeatCallback("sent");
    } catch (e) {
      this.log("error", "error in heartbeat callback", e);
    }
    this._setAuthSafely("heartbeat");
  }
  onHeartbeat(callback) {
    this.heartbeatCallback = callback;
  }
  /**
   * Flushes send buffer
   */
  flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(topic) {
    let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
    if (dupChannel) {
      this.log("transport", `leaving duplicate topic "${topic}"`);
      dupChannel.unsubscribe();
    }
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(channel) {
    this.channels = this.channels.filter((c) => c.topic !== channel.topic);
  }
  /** @internal */
  _onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      if (msg.topic === "phoenix" && msg.event === "phx_reply") {
        try {
          this.heartbeatCallback(msg.payload.status === "ok" ? "ok" : "error");
        } catch (e) {
          this.log("error", "error in heartbeat callback", e);
        }
      }
      if (msg.ref && msg.ref === this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
      }
      const { topic, event, payload, ref } = msg;
      const refString = ref ? `(${ref})` : "";
      const status = payload.status || "";
      this.log("receive", `${status} ${topic} ${event} ${refString}`.trim(), payload);
      this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
      this._triggerStateCallbacks("message", msg);
    });
  }
  /**
   * Clear specific timer
   * @internal
   */
  _clearTimer(timer) {
    var _a;
    if (timer === "heartbeat" && this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = void 0;
    } else if (timer === "reconnect") {
      (_a = this.reconnectTimer) === null || _a === void 0 ? void 0 : _a.reset();
    }
  }
  /**
   * Clear all timers
   * @internal
   */
  _clearAllTimers() {
    this._clearTimer("heartbeat");
    this._clearTimer("reconnect");
  }
  /**
   * Setup connection handlers for WebSocket events
   * @internal
   */
  _setupConnectionHandlers() {
    if (!this.conn)
      return;
    if ("binaryType" in this.conn) {
      ;
      this.conn.binaryType = "arraybuffer";
    }
    this.conn.onopen = () => this._onConnOpen();
    this.conn.onerror = (error) => this._onConnError(error);
    this.conn.onmessage = (event) => this._onConnMessage(event);
    this.conn.onclose = (event) => this._onConnClose(event);
  }
  /**
   * Teardown connection and cleanup resources
   * @internal
   */
  _teardownConnection() {
    if (this.conn) {
      this.conn.onopen = null;
      this.conn.onerror = null;
      this.conn.onmessage = null;
      this.conn.onclose = null;
      this.conn = null;
    }
    this._clearAllTimers();
    this.channels.forEach((channel) => channel.teardown());
  }
  /** @internal */
  _onConnOpen() {
    this._setConnectionState("connected");
    this.log("transport", `connected to ${this.endpointURL()}`);
    this.flushSendBuffer();
    this._clearTimer("reconnect");
    if (!this.worker) {
      this._startHeartbeat();
    } else {
      if (!this.workerRef) {
        this._startWorkerHeartbeat();
      }
    }
    this._triggerStateCallbacks("open");
  }
  /** @internal */
  _startHeartbeat() {
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  /** @internal */
  _startWorkerHeartbeat() {
    if (this.workerUrl) {
      this.log("worker", `starting worker for from ${this.workerUrl}`);
    } else {
      this.log("worker", `starting default worker`);
    }
    const objectUrl = this._workerObjectUrl(this.workerUrl);
    this.workerRef = new Worker(objectUrl);
    this.workerRef.onerror = (error) => {
      this.log("worker", "worker error", error.message);
      this.workerRef.terminate();
    };
    this.workerRef.onmessage = (event) => {
      if (event.data.event === "keepAlive") {
        this.sendHeartbeat();
      }
    };
    this.workerRef.postMessage({
      event: "start",
      interval: this.heartbeatIntervalMs
    });
  }
  /** @internal */
  _onConnClose(event) {
    var _a;
    this._setConnectionState("disconnected");
    this.log("transport", "close", event);
    this._triggerChanError();
    this._clearTimer("heartbeat");
    if (!this._wasManualDisconnect) {
      (_a = this.reconnectTimer) === null || _a === void 0 ? void 0 : _a.scheduleTimeout();
    }
    this._triggerStateCallbacks("close", event);
  }
  /** @internal */
  _onConnError(error) {
    this._setConnectionState("disconnected");
    this.log("transport", `${error}`);
    this._triggerChanError();
    this._triggerStateCallbacks("error", error);
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
  }
  /** @internal */
  _appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    const prefix = url.match(/\?/) ? "&" : "?";
    const query = new URLSearchParams(params);
    return `${url}${prefix}${query}`;
  }
  _workerObjectUrl(url) {
    let result_url;
    if (url) {
      result_url = url;
    } else {
      const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
      result_url = URL.createObjectURL(blob);
    }
    return result_url;
  }
  /**
   * Set connection state with proper state management
   * @internal
   */
  _setConnectionState(state2, manual = false) {
    this._connectionState = state2;
    if (state2 === "connecting") {
      this._wasManualDisconnect = false;
    } else if (state2 === "disconnecting") {
      this._wasManualDisconnect = manual;
    }
  }
  /**
   * Perform the actual auth operation
   * @internal
   */
  async _performAuth(token2 = null) {
    let tokenToSend;
    if (token2) {
      tokenToSend = token2;
    } else if (this.accessToken) {
      tokenToSend = await this.accessToken();
    } else {
      tokenToSend = this.accessTokenValue;
    }
    if (this.accessTokenValue != tokenToSend) {
      this.accessTokenValue = tokenToSend;
      this.channels.forEach((channel) => {
        const payload = {
          access_token: tokenToSend,
          version: DEFAULT_VERSION
        };
        tokenToSend && channel.updateJoinPayload(payload);
        if (channel.joinedOnce && channel._isJoined()) {
          channel._push(CHANNEL_EVENTS.access_token, {
            access_token: tokenToSend
          });
        }
      });
    }
  }
  /**
   * Wait for any in-flight auth operations to complete
   * @internal
   */
  async _waitForAuthIfNeeded() {
    if (this._authPromise) {
      await this._authPromise;
    }
  }
  /**
   * Safely call setAuth with standardized error handling
   * @internal
   */
  _setAuthSafely(context = "general") {
    this.setAuth().catch((e) => {
      this.log("error", `error setting auth in ${context}`, e);
    });
  }
  /**
   * Trigger state change callbacks with proper error handling
   * @internal
   */
  _triggerStateCallbacks(event, data) {
    try {
      this.stateChangeCallbacks[event].forEach((callback) => {
        try {
          callback(data);
        } catch (e) {
          this.log("error", `error in ${event} callback`, e);
        }
      });
    } catch (e) {
      this.log("error", `error triggering ${event} callbacks`, e);
    }
  }
  /**
   * Setup reconnection timer with proper configuration
   * @internal
   */
  _setupReconnectionTimer() {
    this.reconnectTimer = new Timer(async () => {
      setTimeout(async () => {
        await this._waitForAuthIfNeeded();
        if (!this.isConnected()) {
          this.connect();
        }
      }, CONNECTION_TIMEOUTS.RECONNECT_DELAY);
    }, this.reconnectAfterMs);
  }
  /**
   * Initialize client options with defaults
   * @internal
   */
  _initializeOptions(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    this.transport = (_a = options === null || options === void 0 ? void 0 : options.transport) !== null && _a !== void 0 ? _a : null;
    this.timeout = (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : DEFAULT_TIMEOUT;
    this.heartbeatIntervalMs = (_c = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _c !== void 0 ? _c : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
    this.worker = (_d = options === null || options === void 0 ? void 0 : options.worker) !== null && _d !== void 0 ? _d : false;
    this.accessToken = (_e = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _e !== void 0 ? _e : null;
    this.heartbeatCallback = (_f = options === null || options === void 0 ? void 0 : options.heartbeatCallback) !== null && _f !== void 0 ? _f : noop2;
    if (options === null || options === void 0 ? void 0 : options.params)
      this.params = options.params;
    if (options === null || options === void 0 ? void 0 : options.logger)
      this.logger = options.logger;
    if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
      this.logLevel = options.logLevel || options.log_level;
      this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel });
    }
    this.reconnectAfterMs = (_g = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _g !== void 0 ? _g : ((tries) => {
      return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
    });
    this.encode = (_h = options === null || options === void 0 ? void 0 : options.encode) !== null && _h !== void 0 ? _h : ((payload, callback) => {
      return callback(JSON.stringify(payload));
    });
    this.decode = (_j = options === null || options === void 0 ? void 0 : options.decode) !== null && _j !== void 0 ? _j : this.serializer.decode.bind(this.serializer);
    if (this.worker) {
      if (typeof window !== "undefined" && !window.Worker) {
        throw new Error("Web Worker is not supported");
      }
      this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
    }
  }
};

// node_modules/@supabase/storage-js/dist/module/lib/errors.js
var StorageError = class extends Error {
  constructor(message) {
    super(message);
    this.__isStorageError = true;
    this.name = "StorageError";
  }
};
function isStorageError(error) {
  return typeof error === "object" && error !== null && "__isStorageError" in error;
}
var StorageApiError = class extends StorageError {
  constructor(message, status, statusCode) {
    super(message);
    this.name = "StorageApiError";
    this.status = status;
    this.statusCode = statusCode;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
};
var StorageUnknownError = class extends StorageError {
  constructor(message, originalError) {
    super(message);
    this.name = "StorageUnknownError";
    this.originalError = originalError;
  }
};

// node_modules/@supabase/storage-js/dist/module/lib/helpers.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
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
var resolveFetch2 = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
var resolveResponse = () => __awaiter2(void 0, void 0, void 0, function* () {
  if (typeof Response === "undefined") {
    return (yield Promise.resolve().then(() => (init_browser(), browser_exports))).Response;
  }
  return Response;
});
var recursiveToCamel = (item) => {
  if (Array.isArray(item)) {
    return item.map((el) => recursiveToCamel(el));
  } else if (typeof item === "function" || item !== Object(item)) {
    return item;
  }
  const result = {};
  Object.entries(item).forEach(([key, value]) => {
    const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
    result[newKey] = recursiveToCamel(value);
  });
  return result;
};
var isPlainObject = (value) => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
var __awaiter3 = function(thisArg, _arguments, P, generator) {
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
var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
var handleError = (error, reject, options) => __awaiter3(void 0, void 0, void 0, function* () {
  const Res = yield resolveResponse();
  if (error instanceof Res && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
    error.json().then((err) => {
      const status = error.status || 500;
      const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || status + "";
      reject(new StorageApiError(_getErrorMessage(err), status, statusCode));
    }).catch((err) => {
      reject(new StorageUnknownError(_getErrorMessage(err), err));
    });
  } else {
    reject(new StorageUnknownError(_getErrorMessage(error), error));
  }
});
var _getRequestParams = (method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET" || !body) {
    return params;
  }
  if (isPlainObject(body)) {
    params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
  } else {
    params.body = body;
  }
  if (options === null || options === void 0 ? void 0 : options.duplex) {
    params.duplex = options.duplex;
  }
  return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url, options, parameters, body) {
  return __awaiter3(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError(error, reject, options));
    });
  });
}
function get(fetcher, url, options, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options, parameters);
  });
}
function post(fetcher, url, body, options, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options, parameters, body);
  });
}
function put(fetcher, url, body, options, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options, parameters, body);
  });
}
function head(fetcher, url, options, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "HEAD", url, Object.assign(Object.assign({}, options), { noResolveJson: true }), parameters);
  });
}
function remove(fetcher, url, body, options, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options, parameters, body);
  });
}

// node_modules/@supabase/storage-js/dist/module/packages/StreamDownloadBuilder.js
var __awaiter4 = function(thisArg, _arguments, P, generator) {
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
var StreamDownloadBuilder = class {
  constructor(downloadFn, shouldThrowOnError) {
    this.downloadFn = downloadFn;
    this.shouldThrowOnError = shouldThrowOnError;
  }
  then(onfulfilled, onrejected) {
    return this.execute().then(onfulfilled, onrejected);
  }
  execute() {
    return __awaiter4(this, void 0, void 0, function* () {
      try {
        const result = yield this.downloadFn();
        return {
          data: result.body,
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};

// node_modules/@supabase/storage-js/dist/module/packages/BlobDownloadBuilder.js
var __awaiter5 = function(thisArg, _arguments, P, generator) {
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
var BlobDownloadBuilder = class {
  constructor(downloadFn, shouldThrowOnError) {
    this.downloadFn = downloadFn;
    this.shouldThrowOnError = shouldThrowOnError;
  }
  asStream() {
    return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
  }
  then(onfulfilled, onrejected) {
    return this.execute().then(onfulfilled, onrejected);
  }
  execute() {
    return __awaiter5(this, void 0, void 0, function* () {
      try {
        const result = yield this.downloadFn();
        return {
          data: yield result.blob(),
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};

// node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var __awaiter6 = function(thisArg, _arguments, P, generator) {
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
var DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
};
var DEFAULT_FILE_OPTIONS = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: false
};
var StorageFileApi = class {
  constructor(url, headers = {}, bucketId, fetch3) {
    this.shouldThrowOnError = false;
    this.url = url;
    this.headers = headers;
    this.bucketId = bucketId;
    this.fetch = resolveFetch2(fetch3);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(method, path, fileBody, fileOptions) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        let body;
        const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
        let headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
        const metadata = options.metadata;
        if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
          body = new FormData();
          body.append("cacheControl", options.cacheControl);
          if (metadata) {
            body.append("metadata", this.encodeMetadata(metadata));
          }
          body.append("", fileBody);
        } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
          body = fileBody;
          body.append("cacheControl", options.cacheControl);
          if (metadata) {
            body.append("metadata", this.encodeMetadata(metadata));
          }
        } else {
          body = fileBody;
          headers["cache-control"] = `max-age=${options.cacheControl}`;
          headers["content-type"] = options.contentType;
          if (metadata) {
            headers["x-metadata"] = this.toBase64(this.encodeMetadata(metadata));
          }
        }
        if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) {
          headers = Object.assign(Object.assign({}, headers), fileOptions.headers);
        }
        const cleanPath = this._removeEmptyFolders(path);
        const _path = this._getFinalPath(cleanPath);
        const data = yield (method == "PUT" ? put : post)(this.fetch, `${this.url}/object/${_path}`, body, Object.assign({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}));
        return {
          data: { path: cleanPath, id: data.Id, fullPath: data.Key },
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  upload(path, fileBody, fileOptions) {
    return __awaiter6(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(path, token2, fileBody, fileOptions) {
    return __awaiter6(this, void 0, void 0, function* () {
      const cleanPath = this._removeEmptyFolders(path);
      const _path = this._getFinalPath(cleanPath);
      const url = new URL(this.url + `/object/upload/sign/${_path}`);
      url.searchParams.set("token", token2);
      try {
        let body;
        const options = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(options.upsert) });
        if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
          body = new FormData();
          body.append("cacheControl", options.cacheControl);
          body.append("", fileBody);
        } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
          body = fileBody;
          body.append("cacheControl", options.cacheControl);
        } else {
          body = fileBody;
          headers["cache-control"] = `max-age=${options.cacheControl}`;
          headers["content-type"] = options.contentType;
        }
        const data = yield put(this.fetch, url.toString(), body, { headers });
        return {
          data: { path: cleanPath, fullPath: data.Key },
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a signed upload URL.
   * Signed upload URLs can be used to upload files to the bucket without further authentication.
   * They are valid for 2 hours.
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
   */
  createSignedUploadUrl(path, options) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        let _path = this._getFinalPath(path);
        const headers = Object.assign({}, this.headers);
        if (options === null || options === void 0 ? void 0 : options.upsert) {
          headers["x-upsert"] = "true";
        }
        const data = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers });
        const url = new URL(this.url + data.url);
        const token2 = url.searchParams.get("token");
        if (!token2) {
          throw new StorageError("No token returned by API");
        }
        return { data: { signedUrl: url.toString(), path, token: token2 }, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(path, fileBody, fileOptions) {
    return __awaiter6(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   * @param options The destination options.
   */
  move(fromPath, toPath, options) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath,
          destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
        }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Copies an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   * @param options The destination options.
   */
  copy(fromPath, toPath, options) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: fromPath,
          destinationKey: toPath,
          destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
        }, { headers: this.headers });
        return { data: { path: data.Key }, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  createSignedUrl(path, expiresIn, options) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        let _path = this._getFinalPath(path);
        let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {}), { headers: this.headers });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
        const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
        data = { signedUrl };
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   */
  createSignedUrls(paths, expiresIn, options) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
        return {
          data: data.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
          error: null
        };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
   *
   * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
   * @param options.transform Transform the asset before serving it to the client.
   */
  download(path, options) {
    const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
    const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
    const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
    const queryString = transformationQuery ? `?${transformationQuery}` : "";
    const _path = this._getFinalPath(path);
    const downloadFn = () => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
      headers: this.headers,
      noResolveJson: true
    });
    return new BlobDownloadBuilder(downloadFn, this.shouldThrowOnError);
  }
  /**
   * Retrieves the details of an existing file.
   * @param path
   */
  info(path) {
    return __awaiter6(this, void 0, void 0, function* () {
      const _path = this._getFinalPath(path);
      try {
        const data = yield get(this.fetch, `${this.url}/object/info/${_path}`, {
          headers: this.headers
        });
        return { data: recursiveToCamel(data), error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Checks the existence of a file.
   * @param path
   */
  exists(path) {
    return __awaiter6(this, void 0, void 0, function* () {
      const _path = this._getFinalPath(path);
      try {
        yield head(this.fetch, `${this.url}/object/${_path}`, {
          headers: this.headers
        });
        return { data: true, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error) && error instanceof StorageUnknownError) {
          const originalError = error.originalError;
          if ([400, 404].includes(originalError === null || originalError === void 0 ? void 0 : originalError.status)) {
            return { data: false, error };
          }
        }
        throw error;
      }
    });
  }
  /**
   * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
   * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
   *
   * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
   * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  getPublicUrl(path, options) {
    const _path = this._getFinalPath(path);
    const _queryString = [];
    const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
    if (downloadQueryParam !== "") {
      _queryString.push(downloadQueryParam);
    }
    const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
    const renderPath = wantsTransformation ? "render/image" : "object";
    const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
    if (transformationQuery !== "") {
      _queryString.push(transformationQuery);
    }
    let queryString = _queryString.join("&");
    if (queryString !== "") {
      queryString = `?${queryString}`;
    }
    return {
      data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
    };
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
   */
  remove(paths) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(
  //   id: string
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await post(
  //       this.fetch,
  //       `${this.url}/metadata/${id}`,
  //       { ...meta },
  //       { headers: this.headers }
  //     )
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Lists all the files and folders within a path of the bucket.
   * @param path The folder path.
   * @param options Search options including limit (defaults to 100), offset, sortBy, and search
   */
  list(path, options, parameters) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
        const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * @experimental this method signature might change in the future
   * @param options search options
   * @param parameters
   */
  listV2(options, parameters) {
    return __awaiter6(this, void 0, void 0, function* () {
      try {
        const body = Object.assign({}, options);
        const data = yield post(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, body, { headers: this.headers }, parameters);
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  encodeMetadata(metadata) {
    return JSON.stringify(metadata);
  }
  toBase64(data) {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(data).toString("base64");
    }
    return btoa(data);
  }
  _getFinalPath(path) {
    return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(path) {
    return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(transform) {
    const params = [];
    if (transform.width) {
      params.push(`width=${transform.width}`);
    }
    if (transform.height) {
      params.push(`height=${transform.height}`);
    }
    if (transform.resize) {
      params.push(`resize=${transform.resize}`);
    }
    if (transform.format) {
      params.push(`format=${transform.format}`);
    }
    if (transform.quality) {
      params.push(`quality=${transform.quality}`);
    }
    return params.join("&");
  }
};

// node_modules/@supabase/storage-js/dist/module/lib/version.js
var version2 = "2.12.2";

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS = { "X-Client-Info": `storage-js/${version2}` };

// node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var __awaiter7 = function(thisArg, _arguments, P, generator) {
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
var StorageBucketApi = class {
  constructor(url, headers = {}, fetch3, opts) {
    this.shouldThrowOnError = false;
    const baseUrl = new URL(url);
    if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
      const isSupabaseHost = /supabase\.(co|in|red)$/.test(baseUrl.hostname);
      if (isSupabaseHost && !baseUrl.hostname.includes("storage.supabase.")) {
        baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
      }
    }
    this.url = baseUrl.href;
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
    this.fetch = resolveFetch2(fetch3);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets() {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */
  getBucket(id) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   * @returns newly created bucket id
   * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
   *   - default bucket type is `STANDARD`
   */
  createBucket(id, options = {
    public: false
  }) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/bucket`, {
          id,
          name: id,
          type: options.type,
          public: options.public,
          file_size_limit: options.fileSizeLimit,
          allowed_mime_types: options.allowedMimeTypes
        }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Updates a Storage bucket
   *
   * @param id A unique identifier for the bucket you are updating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   */
  updateBucket(id, options) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield put(this.fetch, `${this.url}/bucket/${id}`, {
          id,
          name: id,
          public: options.public,
          file_size_limit: options.fileSizeLimit,
          allowed_mime_types: options.allowedMimeTypes
        }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */
  emptyBucket(id) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */
  deleteBucket(id) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if (this.shouldThrowOnError) {
          throw error;
        }
        if (isStorageError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
};

// node_modules/@supabase/storage-js/dist/module/StorageClient.js
var StorageClient = class extends StorageBucketApi {
  constructor(url, headers = {}, fetch3, opts) {
    super(url, headers, fetch3, opts);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(id) {
    return new StorageFileApi(this.url, this.headers, id, this.fetch);
  }
};

// node_modules/@supabase/supabase-js/dist/module/lib/version.js
var version3 = "2.58.0";

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var JS_ENV = "";
if (typeof Deno !== "undefined") {
  JS_ENV = "deno";
} else if (typeof document !== "undefined") {
  JS_ENV = "web";
} else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
  JS_ENV = "react-native";
} else {
  JS_ENV = "node";
}
var DEFAULT_HEADERS2 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version3}` };
var DEFAULT_GLOBAL_OPTIONS = {
  headers: DEFAULT_HEADERS2
};
var DEFAULT_DB_OPTIONS = {
  schema: "public"
};
var DEFAULT_AUTH_OPTIONS = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  flowType: "implicit"
};
var DEFAULT_REALTIME_OPTIONS = {};

// node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
init_browser();
var __awaiter8 = function(thisArg, _arguments, P, generator) {
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
var resolveFetch3 = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = browser_default;
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
var resolveHeadersConstructor = () => {
  if (typeof Headers === "undefined") {
    return Headers2;
  }
  return Headers;
};
var fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
  const fetch3 = resolveFetch3(customFetch);
  const HeadersConstructor = resolveHeadersConstructor();
  return (input, init) => __awaiter8(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
    let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
    if (!headers.has("apikey")) {
      headers.set("apikey", supabaseKey);
    }
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return fetch3(input, Object.assign(Object.assign({}, init), { headers }));
  });
};

// node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
var __awaiter9 = function(thisArg, _arguments, P, generator) {
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
function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
  var _a, _b;
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
  const result = {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    storage: {},
    global: Object.assign(Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions), { headers: Object.assign(Object.assign({}, (_a = DEFAULT_GLOBAL_OPTIONS2 === null || DEFAULT_GLOBAL_OPTIONS2 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS2.headers) !== null && _a !== void 0 ? _a : {}), (_b = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _b !== void 0 ? _b : {}) }),
    accessToken: () => __awaiter9(this, void 0, void 0, function* () {
      return "";
    })
  };
  if (options.accessToken) {
    result.accessToken = options.accessToken;
  } else {
    delete result.accessToken;
  }
  return result;
}
function validateSupabaseUrl(supabaseUrl) {
  const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
  if (!trimmedUrl) {
    throw new Error("supabaseUrl is required.");
  }
  if (!trimmedUrl.match(/^https?:\/\//i)) {
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  }
  try {
    return new URL(ensureTrailingSlash(trimmedUrl));
  } catch (_a) {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}

// node_modules/@supabase/auth-js/dist/module/lib/version.js
var version4 = "2.72.0";

// node_modules/@supabase/auth-js/dist/module/lib/constants.js
var AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3;
var AUTO_REFRESH_TICK_THRESHOLD = 3;
var EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS;
var GOTRUE_URL = "http://localhost:9999";
var STORAGE_KEY = "supabase.auth.token";
var DEFAULT_HEADERS3 = { "X-Client-Info": `gotrue-js/${version4}` };
var API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
var API_VERSIONS = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
};
var BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
var JWKS_TTL = 10 * 60 * 1e3;

// node_modules/@supabase/auth-js/dist/module/lib/errors.js
var AuthError = class extends Error {
  constructor(message, status, code) {
    super(message);
    this.__isAuthError = true;
    this.name = "AuthError";
    this.status = status;
    this.code = code;
  }
};
function isAuthError(error) {
  return typeof error === "object" && error !== null && "__isAuthError" in error;
}
var AuthApiError = class extends AuthError {
  constructor(message, status, code) {
    super(message, status, code);
    this.name = "AuthApiError";
    this.status = status;
    this.code = code;
  }
};
function isAuthApiError(error) {
  return isAuthError(error) && error.name === "AuthApiError";
}
var AuthUnknownError = class extends AuthError {
  constructor(message, originalError) {
    super(message);
    this.name = "AuthUnknownError";
    this.originalError = originalError;
  }
};
var CustomAuthError = class extends AuthError {
  constructor(message, name, status, code) {
    super(message, status, code);
    this.name = name;
    this.status = status;
  }
};
var AuthSessionMissingError = class extends CustomAuthError {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
};
function isAuthSessionMissingError(error) {
  return isAuthError(error) && error.name === "AuthSessionMissingError";
}
var AuthInvalidTokenResponseError = class extends CustomAuthError {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
};
var AuthInvalidCredentialsError = class extends CustomAuthError {
  constructor(message) {
    super(message, "AuthInvalidCredentialsError", 400, void 0);
  }
};
var AuthImplicitGrantRedirectError = class extends CustomAuthError {
  constructor(message, details = null) {
    super(message, "AuthImplicitGrantRedirectError", 500, void 0);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
};
function isAuthImplicitGrantRedirectError(error) {
  return isAuthError(error) && error.name === "AuthImplicitGrantRedirectError";
}
var AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
  constructor(message, details = null) {
    super(message, "AuthPKCEGrantCodeExchangeError", 500, void 0);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
};
var AuthRetryableFetchError = class extends CustomAuthError {
  constructor(message, status) {
    super(message, "AuthRetryableFetchError", status, void 0);
  }
};
function isAuthRetryableFetchError(error) {
  return isAuthError(error) && error.name === "AuthRetryableFetchError";
}
var AuthWeakPasswordError = class extends CustomAuthError {
  constructor(message, status, reasons) {
    super(message, "AuthWeakPasswordError", status, "weak_password");
    this.reasons = reasons;
  }
};
function isAuthWeakPasswordError(error) {
  return isAuthError(error) && error.name === "AuthWeakPasswordError";
}
var AuthInvalidJwtError = class extends CustomAuthError {
  constructor(message) {
    super(message, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
};

// node_modules/@supabase/auth-js/dist/module/lib/base64url.js
var TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
var IGNORE_BASE64URL = " 	\n\r=".split("");
var FROM_BASE64URL = (() => {
  const charMap = new Array(128);
  for (let i = 0; i < charMap.length; i += 1) {
    charMap[i] = -1;
  }
  for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) {
    charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
  }
  for (let i = 0; i < TO_BASE64URL.length; i += 1) {
    charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
  }
  return charMap;
})();
function byteToBase64URL(byte, state2, emit) {
  if (byte !== null) {
    state2.queue = state2.queue << 8 | byte;
    state2.queuedBits += 8;
    while (state2.queuedBits >= 6) {
      const pos = state2.queue >> state2.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state2.queuedBits -= 6;
    }
  } else if (state2.queuedBits > 0) {
    state2.queue = state2.queue << 6 - state2.queuedBits;
    state2.queuedBits = 6;
    while (state2.queuedBits >= 6) {
      const pos = state2.queue >> state2.queuedBits - 6 & 63;
      emit(TO_BASE64URL[pos]);
      state2.queuedBits -= 6;
    }
  }
}
function byteFromBase64URL(charCode, state2, emit) {
  const bits = FROM_BASE64URL[charCode];
  if (bits > -1) {
    state2.queue = state2.queue << 6 | bits;
    state2.queuedBits += 6;
    while (state2.queuedBits >= 8) {
      emit(state2.queue >> state2.queuedBits - 8 & 255);
      state2.queuedBits -= 8;
    }
  } else if (bits === -2) {
    return;
  } else {
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
  }
}
function stringFromBase64URL(str2) {
  const conv = [];
  const utf8Emit = (codepoint) => {
    conv.push(String.fromCodePoint(codepoint));
  };
  const utf8State = {
    utf8seq: 0,
    codepoint: 0
  };
  const b64State = { queue: 0, queuedBits: 0 };
  const byteEmit = (byte) => {
    stringFromUTF8(byte, utf8State, utf8Emit);
  };
  for (let i = 0; i < str2.length; i += 1) {
    byteFromBase64URL(str2.charCodeAt(i), b64State, byteEmit);
  }
  return conv.join("");
}
function codepointToUTF8(codepoint, emit) {
  if (codepoint <= 127) {
    emit(codepoint);
    return;
  } else if (codepoint <= 2047) {
    emit(192 | codepoint >> 6);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 65535) {
    emit(224 | codepoint >> 12);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  } else if (codepoint <= 1114111) {
    emit(240 | codepoint >> 18);
    emit(128 | codepoint >> 12 & 63);
    emit(128 | codepoint >> 6 & 63);
    emit(128 | codepoint & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
function stringToUTF8(str2, emit) {
  for (let i = 0; i < str2.length; i += 1) {
    let codepoint = str2.charCodeAt(i);
    if (codepoint > 55295 && codepoint <= 56319) {
      const highSurrogate = (codepoint - 55296) * 1024 & 65535;
      const lowSurrogate = str2.charCodeAt(i + 1) - 56320 & 65535;
      codepoint = (lowSurrogate | highSurrogate) + 65536;
      i += 1;
    }
    codepointToUTF8(codepoint, emit);
  }
}
function stringFromUTF8(byte, state2, emit) {
  if (state2.utf8seq === 0) {
    if (byte <= 127) {
      emit(byte);
      return;
    }
    for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
      if ((byte >> 7 - leadingBit & 1) === 0) {
        state2.utf8seq = leadingBit;
        break;
      }
    }
    if (state2.utf8seq === 2) {
      state2.codepoint = byte & 31;
    } else if (state2.utf8seq === 3) {
      state2.codepoint = byte & 15;
    } else if (state2.utf8seq === 4) {
      state2.codepoint = byte & 7;
    } else {
      throw new Error("Invalid UTF-8 sequence");
    }
    state2.utf8seq -= 1;
  } else if (state2.utf8seq > 0) {
    if (byte <= 127) {
      throw new Error("Invalid UTF-8 sequence");
    }
    state2.codepoint = state2.codepoint << 6 | byte & 63;
    state2.utf8seq -= 1;
    if (state2.utf8seq === 0) {
      emit(state2.codepoint);
    }
  }
}
function base64UrlToUint8Array(str2) {
  const result = [];
  const state2 = { queue: 0, queuedBits: 0 };
  const onByte = (byte) => {
    result.push(byte);
  };
  for (let i = 0; i < str2.length; i += 1) {
    byteFromBase64URL(str2.charCodeAt(i), state2, onByte);
  }
  return new Uint8Array(result);
}
function stringToUint8Array(str2) {
  const result = [];
  stringToUTF8(str2, (byte) => result.push(byte));
  return new Uint8Array(result);
}
function bytesToBase64URL(bytes) {
  const result = [];
  const state2 = { queue: 0, queuedBits: 0 };
  const onChar = (char) => {
    result.push(char);
  };
  bytes.forEach((byte) => byteToBase64URL(byte, state2, onChar));
  byteToBase64URL(null, state2, onChar);
  return result.join("");
}

// node_modules/@supabase/auth-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
var isBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";
var localStorageWriteTests = {
  tested: false,
  writable: false
};
var supportsLocalStorage = () => {
  if (!isBrowser()) {
    return false;
  }
  try {
    if (typeof globalThis.localStorage !== "object") {
      return false;
    }
  } catch (e) {
    return false;
  }
  if (localStorageWriteTests.tested) {
    return localStorageWriteTests.writable;
  }
  const randomKey = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(randomKey, randomKey);
    globalThis.localStorage.removeItem(randomKey);
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = true;
  } catch (e) {
    localStorageWriteTests.tested = true;
    localStorageWriteTests.writable = false;
  }
  return localStorageWriteTests.writable;
};
function parseParametersFromURL(href) {
  const result = {};
  const url = new URL(href);
  if (url.hash && url.hash[0] === "#") {
    try {
      const hashSearchParams = new URLSearchParams(url.hash.substring(1));
      hashSearchParams.forEach((value, key) => {
        result[key] = value;
      });
    } catch (e) {
    }
  }
  url.searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
var resolveFetch4 = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined") {
    _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
  } else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
var looksLikeFetchResponse = (maybeResponse) => {
  return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
};
var setItemAsync = async (storage, key, data) => {
  await storage.setItem(key, JSON.stringify(data));
};
var getItemAsync = async (storage, key) => {
  const value = await storage.getItem(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (_a) {
    return value;
  }
};
var removeItemAsync = async (storage, key) => {
  await storage.removeItem(key);
};
var Deferred = class _Deferred {
  constructor() {
    ;
    this.promise = new _Deferred.promiseConstructor((res, rej) => {
      ;
      this.resolve = res;
      this.reject = rej;
    });
  }
};
Deferred.promiseConstructor = Promise;
function decodeJWT(token2) {
  const parts = token2.split(".");
  if (parts.length !== 3) {
    throw new AuthInvalidJwtError("Invalid JWT structure");
  }
  for (let i = 0; i < parts.length; i++) {
    if (!BASE64URL_REGEX.test(parts[i])) {
      throw new AuthInvalidJwtError("JWT not in base64url format");
    }
  }
  const data = {
    // using base64url lib
    header: JSON.parse(stringFromBase64URL(parts[0])),
    payload: JSON.parse(stringFromBase64URL(parts[1])),
    signature: base64UrlToUint8Array(parts[2]),
    raw: {
      header: parts[0],
      payload: parts[1]
    }
  };
  return data;
}
async function sleep(time) {
  return await new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    ;
    (async () => {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = await fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e) {
          if (!isRetryable(attempt, e)) {
            reject(e);
            return;
          }
        }
      }
    })();
  });
  return promise;
}
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array = new Uint32Array(verifierLength);
  if (typeof crypto === "undefined") {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const charSetLen = charSet.length;
    let verifier = "";
    for (let i = 0; i < verifierLength; i++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}
async function sha256(randomString) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(randomString);
  const hash = await crypto.subtle.digest("SHA-256", encodedData);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
}
async function generatePKCEChallenge(verifier) {
  const hasCryptoSupport = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined";
  if (!hasCryptoSupport) {
    console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
    return verifier;
  }
  const hashed = await sha256(verifier);
  return btoa(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
  const codeVerifier = generatePKCEVerifier();
  let storedCodeVerifier = codeVerifier;
  if (isPasswordRecovery) {
    storedCodeVerifier += "/PASSWORD_RECOVERY";
  }
  await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
  const codeChallenge = await generatePKCEChallenge(codeVerifier);
  const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
  return [codeChallenge, codeChallengeMethod];
}
var API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(response) {
  const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
  if (!apiVersion) {
    return null;
  }
  if (!apiVersion.match(API_VERSION_REGEX)) {
    return null;
  }
  try {
    const date = /* @__PURE__ */ new Date(`${apiVersion}T00:00:00.0Z`);
    return date;
  } catch (e) {
    return null;
  }
}
function validateExp(exp) {
  if (!exp) {
    throw new Error("Missing exp claim");
  }
  const timeNow = Math.floor(Date.now() / 1e3);
  if (exp <= timeNow) {
    throw new Error("JWT has expired");
  }
}
function getAlgorithm(alg) {
  switch (alg) {
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "ES256":
      return {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: { name: "SHA-256" }
      };
    default:
      throw new Error("Invalid alg claim");
  }
}
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function validateUUID(str2) {
  if (!UUID_REGEX.test(str2)) {
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
  }
}
function userNotAvailableProxy() {
  const proxyTarget = {};
  return new Proxy(proxyTarget, {
    get: (target, prop) => {
      if (prop === "__isUserNotAvailableProxy") {
        return true;
      }
      if (typeof prop === "symbol") {
        const sProp = prop.toString();
        if (sProp === "Symbol(Symbol.toPrimitive)" || sProp === "Symbol(Symbol.toStringTag)" || sProp === "Symbol(util.inspect.custom)") {
          return void 0;
        }
      }
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${prop}" property of the session object is not supported. Please use getUser() instead.`);
    },
    set: (_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    },
    deleteProperty: (_target, prop) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${prop}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }
  });
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// node_modules/@supabase/auth-js/dist/module/lib/fetch.js
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
var NETWORK_ERROR_CODES = [502, 503, 504];
async function handleError2(error) {
  var _a;
  if (!looksLikeFetchResponse(error)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error), 0);
  }
  if (NETWORK_ERROR_CODES.includes(error.status)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error), error.status);
  }
  let data;
  try {
    data = await error.json();
  } catch (e) {
    throw new AuthUnknownError(_getErrorMessage2(e), e);
  }
  let errorCode = void 0;
  const responseAPIVersion = parseResponseAPIVersion(error);
  if (responseAPIVersion && responseAPIVersion.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof data === "object" && data && typeof data.code === "string") {
    errorCode = data.code;
  } else if (typeof data === "object" && data && typeof data.error_code === "string") {
    errorCode = data.error_code;
  }
  if (!errorCode) {
    if (typeof data === "object" && data && typeof data.weak_password === "object" && data.weak_password && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
      throw new AuthWeakPasswordError(_getErrorMessage2(data), error.status, data.weak_password.reasons);
    }
  } else if (errorCode === "weak_password") {
    throw new AuthWeakPasswordError(_getErrorMessage2(data), error.status, ((_a = data.weak_password) === null || _a === void 0 ? void 0 : _a.reasons) || []);
  } else if (errorCode === "session_not_found") {
    throw new AuthSessionMissingError();
  }
  throw new AuthApiError(_getErrorMessage2(data), error.status || 500, errorCode);
}
var _getRequestParams2 = (method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
async function _request(fetcher, method, url, options) {
  var _a;
  const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
  if (!headers[API_VERSION_HEADER_NAME]) {
    headers[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name;
  }
  if (options === null || options === void 0 ? void 0 : options.jwt) {
    headers["Authorization"] = `Bearer ${options.jwt}`;
  }
  const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
  if (options === null || options === void 0 ? void 0 : options.redirectTo) {
    qs["redirect_to"] = options.redirectTo;
  }
  const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
  const data = await _handleRequest2(fetcher, method, url + queryString, {
    headers,
    noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
  }, {}, options === null || options === void 0 ? void 0 : options.body);
  return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
}
async function _handleRequest2(fetcher, method, url, options, parameters, body) {
  const requestParams = _getRequestParams2(method, options, parameters, body);
  let result;
  try {
    result = await fetcher(url, Object.assign({}, requestParams));
  } catch (e) {
    console.error(e);
    throw new AuthRetryableFetchError(_getErrorMessage2(e), 0);
  }
  if (!result.ok) {
    await handleError2(result);
  }
  if (options === null || options === void 0 ? void 0 : options.noResolveJson) {
    return result;
  }
  try {
    return await result.json();
  } catch (e) {
    await handleError2(e);
  }
}
function _sessionResponse(data) {
  var _a;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    if (!data.expires_at) {
      session.expires_at = expiresAt(data.expires_in);
    }
  }
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { session, user }, error: null };
}
function _sessionResponsePassword(data) {
  const response = _sessionResponse(data);
  if (!response.error && data.weak_password && typeof data.weak_password === "object" && Array.isArray(data.weak_password.reasons) && data.weak_password.reasons.length && data.weak_password.message && typeof data.weak_password.message === "string" && data.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
    response.data.weak_password = data.weak_password;
  }
  return response;
}
function _userResponse(data) {
  var _a;
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { user }, error: null };
}
function _ssoResponse(data) {
  return { data, error: null };
}
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
function _noResolveJsonResponse(data) {
  return data;
}
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}

// node_modules/@supabase/auth-js/dist/module/lib/types.js
var SIGN_OUT_SCOPES = ["global", "local", "others"];

// node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
var __rest2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var GoTrueAdminApi = class {
  constructor({ url = "", headers = {}, fetch: fetch3 }) {
    this.url = url;
    this.headers = headers;
    this.fetch = resolveFetch4(fetch3);
    this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(jwt, scope = SIGN_OUT_SCOPES[0]) {
    if (SIGN_OUT_SCOPES.indexOf(scope) < 0) {
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${SIGN_OUT_SCOPES.join(", ")}`);
    }
    try {
      await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
        headers: this.headers,
        jwt,
        noResolveJson: true
      });
      return { data: null, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options Additional options to be included when inviting.
   */
  async inviteUserByEmail(email, options = {}) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/invite`, {
        body: { email, data: options.data },
        headers: this.headers,
        redirectTo: options.redirectTo,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  async generateLink(params) {
    try {
      const { options } = params, rest = __rest2(params, ["options"]);
      const body = Object.assign(Object.assign({}, rest), options);
      if ("newEmail" in rest) {
        body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
        delete body["newEmail"];
      }
      return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body,
        headers: this.headers,
        xform: _generateLinkResponse,
        redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
      });
    } catch (error) {
      if (isAuthError(error)) {
        return {
          data: {
            properties: null,
            user: null
          },
          error
        };
      }
      throw error;
    }
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async createUser(attributes) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
        body: attributes,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  async listUsers(params) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      const pagination = { nextPage: null, lastPage: 0, total: 0 };
      const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: true,
        query: {
          page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
          per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
        },
        xform: _noResolveJsonResponse
      });
      if (response.error)
        throw response.error;
      const users = await response.json();
      const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
      const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
      if (links.length > 0) {
        links.forEach((link2) => {
          const page2 = parseInt(link2.split(";")[0].split("=")[1].substring(0, 1));
          const rel = JSON.parse(link2.split(";")[1].split("=")[1]);
          pagination[`${rel}Page`] = page2;
        });
        pagination.total = parseInt(total);
      }
      return { data: Object.assign(Object.assign({}, users), pagination), error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { users: [] }, error };
      }
      throw error;
    }
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async getUserById(uid) {
    validateUUID(uid);
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async updateUserById(uid, attributes) {
    validateUUID(uid);
    try {
      return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
        body: attributes,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async deleteUser(id, shouldSoftDelete = false) {
    validateUUID(id);
    try {
      return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
        headers: this.headers,
        body: {
          should_soft_delete: shouldSoftDelete
        },
        xform: _userResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  async _listFactors(params) {
    validateUUID(params.userId);
    try {
      const { data, error } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
        headers: this.headers,
        xform: (factors) => {
          return { data: { factors }, error: null };
        }
      });
      return { data, error };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _deleteFactor(params) {
    validateUUID(params.userId);
    validateUUID(params.id);
    try {
      const data = await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
        headers: this.headers
      });
      return { data, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
};

// node_modules/@supabase/auth-js/dist/module/lib/local-storage.js
function memoryLocalStorageAdapter(store = {}) {
  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
}

// node_modules/@supabase/auth-js/dist/module/lib/polyfills.js
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}

// node_modules/@supabase/auth-js/dist/module/lib/locks.js
var internals = {
  /**
   * @experimental
   */
  debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
var LockAcquireTimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.isAcquireTimeout = true;
  }
};
var NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
};
var ProcessLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
};
async function navigatorLock(name, acquireTimeout, fn) {
  if (internals.debug) {
    console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
  }
  const abortController = new globalThis.AbortController();
  if (acquireTimeout > 0) {
    setTimeout(() => {
      abortController.abort();
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
      }
    }, acquireTimeout);
  }
  return await Promise.resolve().then(() => globalThis.navigator.locks.request(name, acquireTimeout === 0 ? {
    mode: "exclusive",
    ifAvailable: true
  } : {
    mode: "exclusive",
    signal: abortController.signal
  }, async (lock) => {
    if (lock) {
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock: acquired", name, lock.name);
      }
      try {
        return await fn();
      } finally {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: released", name, lock.name);
        }
      }
    } else {
      if (acquireTimeout === 0) {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name);
        }
        throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
      } else {
        if (internals.debug) {
          try {
            const result = await globalThis.navigator.locks.query();
            console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
          } catch (e) {
            console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
          }
        }
        console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
        return await fn();
      }
    }
  }));
}
var PROCESS_LOCKS = {};
async function processLock(name, acquireTimeout, fn) {
  var _a;
  const previousOperation = (_a = PROCESS_LOCKS[name]) !== null && _a !== void 0 ? _a : Promise.resolve();
  const currentOperation = Promise.race([
    previousOperation.catch(() => {
      return null;
    }),
    acquireTimeout >= 0 ? new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ProcessLockAcquireTimeoutError(`Acquring process lock with name "${name}" timed out`));
      }, acquireTimeout);
    }) : null
  ].filter((x) => x)).catch((e) => {
    if (e && e.isAcquireTimeout) {
      throw e;
    }
    return null;
  }).then(async () => {
    return await fn();
  });
  PROCESS_LOCKS[name] = currentOperation.catch(async (e) => {
    if (e && e.isAcquireTimeout) {
      await previousOperation;
      return null;
    }
    throw e;
  });
  return await currentOperation;
}

// node_modules/@supabase/auth-js/dist/module/lib/web3/ethereum.js
function getAddress(address) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error(`@supabase/auth-js: Address "${address}" is invalid.`);
  }
  return address.toLowerCase();
}
function fromHex(hex) {
  return parseInt(hex, 16);
}
function toHex(value) {
  const bytes = new TextEncoder().encode(value);
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return "0x" + hex;
}
function createSiweMessage(parameters) {
  var _a;
  const { chainId, domain, expirationTime, issuedAt = /* @__PURE__ */ new Date(), nonce, notBefore, requestId, resources, scheme, uri, version: version5 } = parameters;
  {
    if (!Number.isInteger(chainId))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${chainId}`);
    if (!domain)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);
    if (nonce && nonce.length < 8)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${nonce}`);
    if (!uri)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);
    if (version5 !== "1")
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${version5}`);
    if ((_a = parameters.statement) === null || _a === void 0 ? void 0 : _a.includes("\n"))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${parameters.statement}`);
  }
  const address = getAddress(parameters.address);
  const origin = scheme ? `${scheme}://${domain}` : domain;
  const statement = parameters.statement ? `${parameters.statement}
` : "";
  const prefix = `${origin} wants you to sign in with your Ethereum account:
${address}

${statement}`;
  let suffix = `URI: ${uri}
Version: ${version5}
Chain ID: ${chainId}${nonce ? `
Nonce: ${nonce}` : ""}
Issued At: ${issuedAt.toISOString()}`;
  if (expirationTime)
    suffix += `
Expiration Time: ${expirationTime.toISOString()}`;
  if (notBefore)
    suffix += `
Not Before: ${notBefore.toISOString()}`;
  if (requestId)
    suffix += `
Request ID: ${requestId}`;
  if (resources) {
    let content = "\nResources:";
    for (const resource of resources) {
      if (!resource || typeof resource !== "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${resource}`);
      content += `
- ${resource}`;
    }
    suffix += content;
  }
  return `${prefix}
${suffix}`;
}

// node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
polyfillGlobalThis();
var DEFAULT_OPTIONS = {
  url: GOTRUE_URL,
  storageKey: STORAGE_KEY,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: DEFAULT_HEADERS3,
  flowType: "implicit",
  debug: false,
  hasCustomAuthorizationHeader: false
};
async function lockNoOp(name, acquireTimeout, fn) {
  return await fn();
}
var GLOBAL_JWKS = {};
var GoTrueClient = class _GoTrueClient {
  /**
   * Create a new client for use in the browser.
   */
  constructor(options) {
    var _a, _b;
    this.userStorage = null;
    this.memoryStorage = null;
    this.stateChangeEmitters = /* @__PURE__ */ new Map();
    this.autoRefreshTicker = null;
    this.visibilityChangedCallback = null;
    this.refreshingDeferred = null;
    this.initializePromise = null;
    this.detectSessionInUrl = true;
    this.hasCustomAuthorizationHeader = false;
    this.suppressGetSessionWarning = false;
    this.lockAcquired = false;
    this.pendingInLock = [];
    this.broadcastChannel = null;
    this.logger = console.log;
    this.instanceID = _GoTrueClient.nextInstanceID;
    _GoTrueClient.nextInstanceID += 1;
    if (this.instanceID > 0 && isBrowser()) {
      console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    }
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.logDebugMessages = !!settings.debug;
    if (typeof settings.debug === "function") {
      this.logger = settings.debug;
    }
    this.persistSession = settings.persistSession;
    this.storageKey = settings.storageKey;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.admin = new GoTrueAdminApi({
      url: settings.url,
      headers: settings.headers,
      fetch: settings.fetch
    });
    this.url = settings.url;
    this.headers = settings.headers;
    this.fetch = resolveFetch4(settings.fetch);
    this.lock = settings.lock || lockNoOp;
    this.detectSessionInUrl = settings.detectSessionInUrl;
    this.flowType = settings.flowType;
    this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
    if (settings.lock) {
      this.lock = settings.lock;
    } else if (isBrowser() && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.locks)) {
      this.lock = navigatorLock;
    } else {
      this.lock = lockNoOp;
    }
    if (!this.jwks) {
      this.jwks = { keys: [] };
      this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
    }
    this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    };
    if (this.persistSession) {
      if (settings.storage) {
        this.storage = settings.storage;
      } else {
        if (supportsLocalStorage()) {
          this.storage = globalThis.localStorage;
        } else {
          this.memoryStorage = {};
          this.storage = memoryLocalStorageAdapter(this.memoryStorage);
        }
      }
      if (settings.userStorage) {
        this.userStorage = settings.userStorage;
      }
    } else {
      this.memoryStorage = {};
      this.storage = memoryLocalStorageAdapter(this.memoryStorage);
    }
    if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (e) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
      }
      (_b = this.broadcastChannel) === null || _b === void 0 ? void 0 : _b.addEventListener("message", async (event) => {
        this._debug("received broadcast notification from other tab or client", event);
        await this._notifyAllSubscribers(event.data.event, event.data.session, false);
      });
    }
    this.initialize();
  }
  /**
   * The JWKS used for verifying asymmetric JWTs
   */
  get jwks() {
    var _a, _b;
    return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.jwks) !== null && _b !== void 0 ? _b : { keys: [] };
  }
  set jwks(value) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: value });
  }
  get jwks_cached_at() {
    var _a, _b;
    return (_b = (_a = GLOBAL_JWKS[this.storageKey]) === null || _a === void 0 ? void 0 : _a.cachedAt) !== null && _b !== void 0 ? _b : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(value) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: value });
  }
  _debug(...args) {
    if (this.logDebugMessages) {
      this.logger(`GoTrueClient@${this.instanceID} (${version4}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
    }
    return this;
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  async initialize() {
    if (this.initializePromise) {
      return await this.initializePromise;
    }
    this.initializePromise = (async () => {
      return await this._acquireLock(-1, async () => {
        return await this._initialize();
      });
    })();
    return await this.initializePromise;
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  async _initialize() {
    var _a;
    try {
      const params = parseParametersFromURL(window.location.href);
      let callbackUrlType = "none";
      if (this._isImplicitGrantCallback(params)) {
        callbackUrlType = "implicit";
      } else if (await this._isPKCECallback(params)) {
        callbackUrlType = "pkce";
      }
      if (isBrowser() && this.detectSessionInUrl && callbackUrlType !== "none") {
        const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
        if (error) {
          this._debug("#_initialize()", "error detecting session from URL", error);
          if (isAuthImplicitGrantRedirectError(error)) {
            const errorCode = (_a = error.details) === null || _a === void 0 ? void 0 : _a.code;
            if (errorCode === "identity_already_exists" || errorCode === "identity_not_found" || errorCode === "single_identity_not_deletable") {
              return { error };
            }
          }
          await this._removeSession();
          return { error };
        }
        const { session, redirectType } = data;
        this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
        await this._saveSession(session);
        setTimeout(async () => {
          if (redirectType === "recovery") {
            await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
          } else {
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
        }, 0);
        return { error: null };
      }
      await this._recoverAndRefresh();
      return { error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { error };
      }
      return {
        error: new AuthUnknownError("Unexpected error during initialization", error)
      };
    } finally {
      await this._handleVisibilityChange();
      this._debug("#_initialize()", "end");
    }
  }
  /**
   * Creates a new anonymous user.
   *
   * @returns A session where the is_anonymous claim in the access token JWT set to true
   */
  async signInAnonymously(credentials) {
    var _a, _b, _c;
    try {
      const res = await _request(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (_b = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {},
          gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken }
        },
        xform: _sessionResponse
      });
      const { data, error } = res;
      if (error || !data) {
        return { data: { user: null, session: null }, error };
      }
      const session = data.session;
      const user = data.user;
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return { data: { user, session }, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(credentials) {
    var _a, _b, _c;
    try {
      let res;
      if ("email" in credentials) {
        const { email, password, options } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        res = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
          body: {
            email,
            password,
            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          xform: _sessionResponse
        });
      } else if ("phone" in credentials) {
        const { phone, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone,
            password,
            data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
            channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponse
        });
      } else {
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      }
      const { data, error } = res;
      if (error || !data) {
        return { data: { user: null, session: null }, error };
      }
      const session = data.session;
      const user = data.user;
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return { data: { user, session }, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(credentials) {
    try {
      let res;
      if ("email" in credentials) {
        const { email, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email,
            password,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else if ("phone" in credentials) {
        const { phone, password, options } = credentials;
        res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone,
            password,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else {
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      }
      const { data, error } = res;
      if (error) {
        return { data: { user: null, session: null }, error };
      } else if (!data || !data.session || !data.user) {
        return { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() };
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return {
        data: Object.assign({ user: data.user, session: data.session }, data.weak_password ? { weakPassword: data.weak_password } : null),
        error
      };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(credentials) {
    var _a, _b, _c, _d;
    return await this._handleProviderSignIn(credentials.provider, {
      redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
      scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
      queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
      skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(authCode) {
    await this.initializePromise;
    return this._acquireLock(-1, async () => {
      return this._exchangeCodeForSession(authCode);
    });
  }
  /**
   * Signs in a user by verifying a message signed by the user's private key.
   * Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
   * both of which derive from the EIP-4361 standard
   * With slight variation on Solana's side.
   * @reference https://eips.ethereum.org/EIPS/eip-4361
   */
  async signInWithWeb3(credentials) {
    const { chain } = credentials;
    switch (chain) {
      case "ethereum":
        return await this.signInWithEthereum(credentials);
      case "solana":
        return await this.signInWithSolana(credentials);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${chain}"`);
    }
  }
  async signInWithEthereum(credentials) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    let message;
    let signature;
    if ("message" in credentials) {
      message = credentials.message;
      signature = credentials.signature;
    } else {
      const { chain, wallet, statement, options } = credentials;
      let resolvedWallet;
      if (!isBrowser()) {
        if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) {
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        }
        resolvedWallet = wallet;
      } else if (typeof wallet === "object") {
        resolvedWallet = wallet;
      } else {
        const windowAny = window;
        if ("ethereum" in windowAny && typeof windowAny.ethereum === "object" && "request" in windowAny.ethereum && typeof windowAny.ethereum.request === "function") {
          resolvedWallet = windowAny.ethereum;
        } else {
          throw new Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`);
        }
      }
      const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
      const accounts = await resolvedWallet.request({
        method: "eth_requestAccounts"
      }).then((accs) => accs).catch(() => {
        throw new Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`);
      });
      if (!accounts || accounts.length === 0) {
        throw new Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);
      }
      const address = getAddress(accounts[0]);
      let chainId = (_b = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _b === void 0 ? void 0 : _b.chainId;
      if (!chainId) {
        const chainIdHex = await resolvedWallet.request({
          method: "eth_chainId"
        });
        chainId = fromHex(chainIdHex);
      }
      const siweMessage = {
        domain: url.host,
        address,
        statement,
        uri: url.href,
        version: "1",
        chainId,
        nonce: (_c = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _c === void 0 ? void 0 : _c.nonce,
        issuedAt: (_e = (_d = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _d === void 0 ? void 0 : _d.issuedAt) !== null && _e !== void 0 ? _e : /* @__PURE__ */ new Date(),
        expirationTime: (_f = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _f === void 0 ? void 0 : _f.expirationTime,
        notBefore: (_g = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _g === void 0 ? void 0 : _g.notBefore,
        requestId: (_h = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _h === void 0 ? void 0 : _h.requestId,
        resources: (_j = options === null || options === void 0 ? void 0 : options.signInWithEthereum) === null || _j === void 0 ? void 0 : _j.resources
      };
      message = createSiweMessage(siweMessage);
      signature = await resolvedWallet.request({
        method: "personal_sign",
        params: [toHex(message), address]
      });
    }
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({
          chain: "ethereum",
          message,
          signature
        }, ((_k = credentials.options) === null || _k === void 0 ? void 0 : _k.captchaToken) ? { gotrue_meta_security: { captcha_token: (_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        return {
          data: { user: null, session: null },
          error: new AuthInvalidTokenResponseError()
        };
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return { data: Object.assign({}, data), error };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  async signInWithSolana(credentials) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    let message;
    let signature;
    if ("message" in credentials) {
      message = credentials.message;
      signature = credentials.signature;
    } else {
      const { chain, wallet, statement, options } = credentials;
      let resolvedWallet;
      if (!isBrowser()) {
        if (typeof wallet !== "object" || !(options === null || options === void 0 ? void 0 : options.url)) {
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        }
        resolvedWallet = wallet;
      } else if (typeof wallet === "object") {
        resolvedWallet = wallet;
      } else {
        const windowAny = window;
        if ("solana" in windowAny && typeof windowAny.solana === "object" && ("signIn" in windowAny.solana && typeof windowAny.solana.signIn === "function" || "signMessage" in windowAny.solana && typeof windowAny.solana.signMessage === "function")) {
          resolvedWallet = windowAny.solana;
        } else {
          throw new Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`);
        }
      }
      const url = new URL((_a = options === null || options === void 0 ? void 0 : options.url) !== null && _a !== void 0 ? _a : window.location.href);
      if ("signIn" in resolvedWallet && resolvedWallet.signIn) {
        const output = await resolvedWallet.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, options === null || options === void 0 ? void 0 : options.signInWithSolana), {
          // non-overridable properties
          version: "1",
          domain: url.host,
          uri: url.href
        }), statement ? { statement } : null));
        let outputToProcess;
        if (Array.isArray(output) && output[0] && typeof output[0] === "object") {
          outputToProcess = output[0];
        } else if (output && typeof output === "object" && "signedMessage" in output && "signature" in output) {
          outputToProcess = output;
        } else {
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        }
        if ("signedMessage" in outputToProcess && "signature" in outputToProcess && (typeof outputToProcess.signedMessage === "string" || outputToProcess.signedMessage instanceof Uint8Array) && outputToProcess.signature instanceof Uint8Array) {
          message = typeof outputToProcess.signedMessage === "string" ? outputToProcess.signedMessage : new TextDecoder().decode(outputToProcess.signedMessage);
          signature = outputToProcess.signature;
        } else {
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
        }
      } else {
        if (!("signMessage" in resolvedWallet) || typeof resolvedWallet.signMessage !== "function" || !("publicKey" in resolvedWallet) || typeof resolvedWallet !== "object" || !resolvedWallet.publicKey || !("toBase58" in resolvedWallet.publicKey) || typeof resolvedWallet.publicKey.toBase58 !== "function") {
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        }
        message = [
          `${url.host} wants you to sign in with your Solana account:`,
          resolvedWallet.publicKey.toBase58(),
          ...statement ? ["", statement, ""] : [""],
          "Version: 1",
          `URI: ${url.href}`,
          `Issued At: ${(_c = (_b = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _b === void 0 ? void 0 : _b.issuedAt) !== null && _c !== void 0 ? _c : (/* @__PURE__ */ new Date()).toISOString()}`,
          ...((_d = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _d === void 0 ? void 0 : _d.notBefore) ? [`Not Before: ${options.signInWithSolana.notBefore}`] : [],
          ...((_e = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _e === void 0 ? void 0 : _e.expirationTime) ? [`Expiration Time: ${options.signInWithSolana.expirationTime}`] : [],
          ...((_f = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _f === void 0 ? void 0 : _f.chainId) ? [`Chain ID: ${options.signInWithSolana.chainId}`] : [],
          ...((_g = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _g === void 0 ? void 0 : _g.nonce) ? [`Nonce: ${options.signInWithSolana.nonce}`] : [],
          ...((_h = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _h === void 0 ? void 0 : _h.requestId) ? [`Request ID: ${options.signInWithSolana.requestId}`] : [],
          ...((_k = (_j = options === null || options === void 0 ? void 0 : options.signInWithSolana) === null || _j === void 0 ? void 0 : _j.resources) === null || _k === void 0 ? void 0 : _k.length) ? [
            "Resources",
            ...options.signInWithSolana.resources.map((resource) => `- ${resource}`)
          ] : []
        ].join("\n");
        const maybeSignature = await resolvedWallet.signMessage(new TextEncoder().encode(message), "utf8");
        if (!maybeSignature || !(maybeSignature instanceof Uint8Array)) {
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        }
        signature = maybeSignature;
      }
    }
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message, signature: bytesToBase64URL(signature) }, ((_l = credentials.options) === null || _l === void 0 ? void 0 : _l.captchaToken) ? { gotrue_meta_security: { captcha_token: (_m = credentials.options) === null || _m === void 0 ? void 0 : _m.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        return {
          data: { user: null, session: null },
          error: new AuthInvalidTokenResponseError()
        };
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return { data: Object.assign({}, data), error };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  async _exchangeCodeForSession(authCode) {
    const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
    try {
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: authCode,
          code_verifier: codeVerifier
        },
        xform: _sessionResponse
      });
      await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      if (error) {
        throw error;
      }
      if (!data || !data.session || !data.user) {
        return {
          data: { user: null, session: null, redirectType: null },
          error: new AuthInvalidTokenResponseError()
        };
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return { data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null, redirectType: null }, error };
      }
      throw error;
    }
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(credentials) {
    try {
      const { options, provider, token: token2, access_token, nonce } = credentials;
      const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider,
          id_token: token2,
          access_token,
          nonce,
          gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
        },
        xform: _sessionResponse
      });
      const { data, error } = res;
      if (error) {
        return { data: { user: null, session: null }, error };
      } else if (!data || !data.session || !data.user) {
        return {
          data: { user: null, session: null },
          error: new AuthInvalidTokenResponseError()
        };
      }
      if (data.session) {
        await this._saveSession(data.session);
        await this._notifyAllSubscribers("SIGNED_IN", data.session);
      }
      return { data, error };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   *
   * Do note that you will need to configure a Whatsapp sender on Twilio
   * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
   * channel is not supported on other providers
   * at this time.
   * This method supports PKCE when an email is passed.
   */
  async signInWithOtp(credentials) {
    var _a, _b, _c, _d, _e;
    try {
      if ("email" in credentials) {
        const { email, options } = credentials;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        const { error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email,
            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
            create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod
          },
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
        });
        return { data: { user: null, session: null }, error };
      }
      if ("phone" in credentials) {
        const { phone, options } = credentials;
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone,
            data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
            create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
            channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : "sms"
          }
        });
        return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
   */
  async verifyOtp(params) {
    var _a, _b;
    try {
      let redirectTo = void 0;
      let captchaToken = void 0;
      if ("options" in params) {
        redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
        captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
      }
      const { data, error } = await _request(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
        redirectTo,
        xform: _sessionResponse
      });
      if (error) {
        throw error;
      }
      if (!data) {
        throw new Error("An error occurred on token verification.");
      }
      const session = data.session;
      const user = data.user;
      if (session === null || session === void 0 ? void 0 : session.access_token) {
        await this._saveSession(session);
        await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
      }
      return { data: { user, session }, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   */
  async signInWithSSO(params) {
    var _a, _b, _c;
    try {
      let codeChallenge = null;
      let codeChallengeMethod = null;
      if (this.flowType === "pkce") {
        ;
        [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
      }
      return await _request(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
        headers: this.headers,
        xform: _ssoResponse
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Sends a reauthentication OTP to the user's email or phone number.
   * Requires the user to be signed-in.
   */
  async reauthenticate() {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._reauthenticate();
    });
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (result) => {
        const { data: { session }, error: sessionError } = result;
        if (sessionError)
          throw sessionError;
        if (!session)
          throw new AuthSessionMissingError();
        const { error } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: session.access_token
        });
        return { data: { user: null, session: null }, error };
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
   */
  async resend(credentials) {
    try {
      const endpoint = `${this.url}/resend`;
      if ("email" in credentials) {
        const { email, type, options } = credentials;
        const { error } = await _request(this.fetch, "POST", endpoint, {
          headers: this.headers,
          body: {
            email,
            type,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
        });
        return { data: { user: null, session: null }, error };
      } else if ("phone" in credentials) {
        const { phone, type, options } = credentials;
        const { data, error } = await _request(this.fetch, "POST", endpoint, {
          headers: this.headers,
          body: {
            phone,
            type,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          }
        });
        return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Returns the session, refreshing it if necessary.
   *
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   *
   * **IMPORTANT:** This method loads values directly from the storage attached
   * to the client. If that storage is based on request cookies for example,
   * the values in it may not be authentic and therefore it's strongly advised
   * against using this method and its results in such circumstances. A warning
   * will be emitted if this is detected. Use {@link #getUser()} instead.
   */
  async getSession() {
    await this.initializePromise;
    const result = await this._acquireLock(-1, async () => {
      return this._useSession(async (result2) => {
        return result2;
      });
    });
    return result;
  }
  /**
   * Acquires a global lock based on the storage key.
   */
  async _acquireLock(acquireTimeout, fn) {
    this._debug("#_acquireLock", "begin", acquireTimeout);
    try {
      if (this.lockAcquired) {
        const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
        const result = (async () => {
          await last;
          return await fn();
        })();
        this.pendingInLock.push((async () => {
          try {
            await result;
          } catch (e) {
          }
        })());
        return result;
      }
      return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = true;
          const result = fn();
          this.pendingInLock.push((async () => {
            try {
              await result;
            } catch (e) {
            }
          })());
          await result;
          while (this.pendingInLock.length) {
            const waitOn = [...this.pendingInLock];
            await Promise.all(waitOn);
            this.pendingInLock.splice(0, waitOn.length);
          }
          return await result;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
          this.lockAcquired = false;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  async _useSession(fn) {
    this._debug("#_useSession", "begin");
    try {
      const result = await this.__loadSession();
      return await fn(result);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  async __loadSession() {
    this._debug("#__loadSession()", "begin");
    if (!this.lockAcquired) {
      this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    }
    try {
      let currentSession = null;
      const maybeSession = await getItemAsync(this.storage, this.storageKey);
      this._debug("#getSession()", "session from storage", maybeSession);
      if (maybeSession !== null) {
        if (this._isValidSession(maybeSession)) {
          currentSession = maybeSession;
        } else {
          this._debug("#getSession()", "session from storage is not valid");
          await this._removeSession();
        }
      }
      if (!currentSession) {
        return { data: { session: null }, error: null };
      }
      const hasExpired = currentSession.expires_at ? currentSession.expires_at * 1e3 - Date.now() < EXPIRY_MARGIN_MS : false;
      this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
      if (!hasExpired) {
        if (this.userStorage) {
          const maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
          if (maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) {
            currentSession.user = maybeUser.user;
          } else {
            currentSession.user = userNotAvailableProxy();
          }
        }
        if (this.storage.isServer && currentSession.user) {
          let suppressWarning = this.suppressGetSessionWarning;
          const proxySession = new Proxy(currentSession, {
            get: (target, prop, receiver) => {
              if (!suppressWarning && prop === "user") {
                console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.");
                suppressWarning = true;
                this.suppressGetSessionWarning = true;
              }
              return Reflect.get(target, prop, receiver);
            }
          });
          currentSession = proxySession;
        }
        return { data: { session: currentSession }, error: null };
      }
      const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
      if (error) {
        return { data: { session: null }, error };
      }
      return { data: { session }, error: null };
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  /**
   * Gets the current user details if there is an existing session. This method
   * performs a network request to the Supabase Auth server, so the returned
   * value is authentic and can be used to base authorization rules on.
   *
   * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
   */
  async getUser(jwt) {
    if (jwt) {
      return await this._getUser(jwt);
    }
    await this.initializePromise;
    const result = await this._acquireLock(-1, async () => {
      return await this._getUser();
    });
    return result;
  }
  async _getUser(jwt) {
    try {
      if (jwt) {
        return await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt,
          xform: _userResponse
        });
      }
      return await this._useSession(async (result) => {
        var _a, _b, _c;
        const { data, error } = result;
        if (error) {
          throw error;
        }
        if (!((_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) && !this.hasCustomAuthorizationHeader) {
          return { data: { user: null }, error: new AuthSessionMissingError() };
        }
        return await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (_c = (_b = data.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : void 0,
          xform: _userResponse
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        if (isAuthSessionMissingError(error)) {
          await this._removeSession();
          await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        }
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Updates user data for a logged in user.
   */
  async updateUser(attributes, options = {}) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._updateUser(attributes, options);
    });
  }
  async _updateUser(attributes, options = {}) {
    try {
      return await this._useSession(async (result) => {
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          throw sessionError;
        }
        if (!sessionData.session) {
          throw new AuthSessionMissingError();
        }
        const session = sessionData.session;
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce" && attributes.email != null) {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        const { data, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
          body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
          jwt: session.access_token,
          xform: _userResponse
        });
        if (userError)
          throw userError;
        session.user = data.user;
        await this._saveSession(session);
        await this._notifyAllSubscribers("USER_UPDATED", session);
        return { data: { user: session.user }, error: null };
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  async setSession(currentSession) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._setSession(currentSession);
    });
  }
  async _setSession(currentSession) {
    try {
      if (!currentSession.access_token || !currentSession.refresh_token) {
        throw new AuthSessionMissingError();
      }
      const timeNow = Date.now() / 1e3;
      let expiresAt2 = timeNow;
      let hasExpired = true;
      let session = null;
      const { payload } = decodeJWT(currentSession.access_token);
      if (payload.exp) {
        expiresAt2 = payload.exp;
        hasExpired = expiresAt2 <= timeNow;
      }
      if (hasExpired) {
        const { session: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return { data: { user: null, session: null }, error };
        }
        if (!refreshedSession) {
          return { data: { user: null, session: null }, error: null };
        }
        session = refreshedSession;
      } else {
        const { data, error } = await this._getUser(currentSession.access_token);
        if (error) {
          throw error;
        }
        session = {
          access_token: currentSession.access_token,
          refresh_token: currentSession.refresh_token,
          user: data.user,
          token_type: "bearer",
          expires_in: expiresAt2 - timeNow,
          expires_at: expiresAt2
        };
        await this._saveSession(session);
        await this._notifyAllSubscribers("SIGNED_IN", session);
      }
      return { data: { user: session.user, session }, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { session: null, user: null }, error };
      }
      throw error;
    }
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  async refreshSession(currentSession) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._refreshSession(currentSession);
    });
  }
  async _refreshSession(currentSession) {
    try {
      return await this._useSession(async (result) => {
        var _a;
        if (!currentSession) {
          const { data, error: error2 } = result;
          if (error2) {
            throw error2;
          }
          currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : void 0;
        }
        if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
          throw new AuthSessionMissingError();
        }
        const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return { data: { user: null, session: null }, error };
        }
        if (!session) {
          return { data: { user: null, session: null }, error: null };
        }
        return { data: { user: session.user, session }, error: null };
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { user: null, session: null }, error };
      }
      throw error;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(params, callbackUrlType) {
    try {
      if (!isBrowser())
        throw new AuthImplicitGrantRedirectError("No browser detected.");
      if (params.error || params.error_description || params.error_code) {
        throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
          error: params.error || "unspecified_error",
          code: params.error_code || "unspecified_code"
        });
      }
      switch (callbackUrlType) {
        case "implicit":
          if (this.flowType === "pkce") {
            throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
          }
          break;
        case "pkce":
          if (this.flowType === "implicit") {
            throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
          }
          break;
        default:
      }
      if (callbackUrlType === "pkce") {
        this._debug("#_initialize()", "begin", "is PKCE flow", true);
        if (!params.code)
          throw new AuthPKCEGrantCodeExchangeError("No code detected.");
        const { data: data2, error: error2 } = await this._exchangeCodeForSession(params.code);
        if (error2)
          throw error2;
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        window.history.replaceState(window.history.state, "", url.toString());
        return { data: { session: data2.session, redirectType: null }, error: null };
      }
      const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
      if (!access_token || !expires_in || !refresh_token || !token_type) {
        throw new AuthImplicitGrantRedirectError("No session defined in URL");
      }
      const timeNow = Math.round(Date.now() / 1e3);
      const expiresIn = parseInt(expires_in);
      let expiresAt2 = timeNow + expiresIn;
      if (expires_at) {
        expiresAt2 = parseInt(expires_at);
      }
      const actuallyExpiresIn = expiresAt2 - timeNow;
      if (actuallyExpiresIn * 1e3 <= AUTO_REFRESH_TICK_DURATION_MS) {
        console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
      }
      const issuedAt = expiresAt2 - expiresIn;
      if (timeNow - issuedAt >= 120) {
        console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt2, timeNow);
      } else if (timeNow - issuedAt < 0) {
        console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", issuedAt, expiresAt2, timeNow);
      }
      const { data, error } = await this._getUser(access_token);
      if (error)
        throw error;
      const session = {
        provider_token,
        provider_refresh_token,
        access_token,
        expires_in: expiresIn,
        expires_at: expiresAt2,
        refresh_token,
        token_type,
        user: data.user
      };
      window.location.hash = "";
      this._debug("#_getSessionFromURL()", "clearing window.location.hash");
      return { data: { session, redirectType: params.type }, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { session: null, redirectType: null }, error };
      }
      throw error;
    }
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   */
  _isImplicitGrantCallback(params) {
    return Boolean(params.access_token || params.error_description);
  }
  /**
   * Checks if the current URL and backing storage contain parameters given by a PKCE flow
   */
  async _isPKCECallback(params) {
    const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    return !!(params.code && currentStorageContent);
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   *
   * If using `others` scope, no `SIGNED_OUT` event is fired!
   */
  async signOut(options = { scope: "global" }) {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => {
      return await this._signOut(options);
    });
  }
  async _signOut({ scope } = { scope: "global" }) {
    return await this._useSession(async (result) => {
      var _a;
      const { data, error: sessionError } = result;
      if (sessionError) {
        return { error: sessionError };
      }
      const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
      if (accessToken) {
        const { error } = await this.admin.signOut(accessToken, scope);
        if (error) {
          if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401 || error.status === 403))) {
            return { error };
          }
        }
      }
      if (scope !== "others") {
        await this._removeSession();
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      }
      return { error: null };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @param callback A callback function to be invoked when an auth event happens.
   */
  onAuthStateChange(callback) {
    const id = uuid();
    const subscription = {
      id,
      callback,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", id);
        this.stateChangeEmitters.delete(id);
      }
    };
    this._debug("#onAuthStateChange()", "registered callback with id", id);
    this.stateChangeEmitters.set(id, subscription);
    (async () => {
      await this.initializePromise;
      await this._acquireLock(-1, async () => {
        this._emitInitialSession(id);
      });
    })();
    return { data: { subscription } };
  }
  async _emitInitialSession(id) {
    return await this._useSession(async (result) => {
      var _a, _b;
      try {
        const { data: { session }, error } = result;
        if (error)
          throw error;
        await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session));
        this._debug("INITIAL_SESSION", "callback id", id, "session", session);
      } catch (err) {
        await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
        this._debug("INITIAL_SESSION", "callback id", id, "error", err);
        console.error(err);
      }
    });
  }
  /**
   * Sends a password reset request to an email address. This method supports the PKCE flow.
   *
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  async resetPasswordForEmail(email, options = {}) {
    let codeChallenge = null;
    let codeChallengeMethod = null;
    if (this.flowType === "pkce") {
      ;
      [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
        this.storage,
        this.storageKey,
        true
        // isPasswordRecovery
      );
    }
    try {
      return await _request(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
          gotrue_meta_security: { captcha_token: options.captchaToken }
        },
        headers: this.headers,
        redirectTo: options.redirectTo
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Gets all the identities linked to a user.
   */
  async getUserIdentities() {
    var _a;
    try {
      const { data, error } = await this.getUser();
      if (error)
        throw error;
      return { data: { identities: (_a = data.user.identities) !== null && _a !== void 0 ? _a : [] }, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Links an oauth identity to an existing user.
   * This method supports the PKCE flow.
   */
  async linkIdentity(credentials) {
    var _a;
    try {
      const { data, error } = await this._useSession(async (result) => {
        var _a2, _b, _c, _d, _e;
        const { data: data2, error: error2 } = result;
        if (error2)
          throw error2;
        const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
          redirectTo: (_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
          scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
          queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
          skipBrowserRedirect: true
        });
        return await _request(this.fetch, "GET", url, {
          headers: this.headers,
          jwt: (_e = (_d = data2.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : void 0
        });
      });
      if (error)
        throw error;
      if (isBrowser() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) {
        window.location.assign(data === null || data === void 0 ? void 0 : data.url);
      }
      return { data: { provider: credentials.provider, url: data === null || data === void 0 ? void 0 : data.url }, error: null };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: { provider: credentials.provider, url: null }, error };
      }
      throw error;
    }
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(identity) {
    try {
      return await this._useSession(async (result) => {
        var _a, _b;
        const { data, error } = result;
        if (error) {
          throw error;
        }
        return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
          headers: this.headers,
          jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  async _refreshAccessToken(refreshToken) {
    const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
    this._debug(debugName, "begin");
    try {
      const startedAt = Date.now();
      return await retryable(async (attempt) => {
        if (attempt > 0) {
          await sleep(200 * Math.pow(2, attempt - 1));
        }
        this._debug(debugName, "refreshing attempt", attempt);
        return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
          body: { refresh_token: refreshToken },
          headers: this.headers,
          xform: _sessionResponse
        });
      }, (attempt, error) => {
        const nextBackOffInterval = 200 * Math.pow(2, attempt);
        return error && isAuthRetryableFetchError(error) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + nextBackOffInterval - startedAt < AUTO_REFRESH_TICK_DURATION_MS;
      });
    } catch (error) {
      this._debug(debugName, "error", error);
      if (isAuthError(error)) {
        return { data: { session: null, user: null }, error };
      }
      throw error;
    } finally {
      this._debug(debugName, "end");
    }
  }
  _isValidSession(maybeSession) {
    const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
    return isValidSession;
  }
  async _handleProviderSignIn(provider, options) {
    const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes,
      queryParams: options.queryParams
    });
    this._debug("#_handleProviderSignIn()", "provider", provider, "options", options, "url", url);
    if (isBrowser() && !options.skipBrowserRedirect) {
      window.location.assign(url);
    }
    return { data: { provider, url }, error: null };
  }
  /**
   * Recovers the session from LocalStorage and refreshes the token
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  async _recoverAndRefresh() {
    var _a, _b;
    const debugName = "#_recoverAndRefresh()";
    this._debug(debugName, "begin");
    try {
      const currentSession = await getItemAsync(this.storage, this.storageKey);
      if (currentSession && this.userStorage) {
        let maybeUser = await getItemAsync(this.userStorage, this.storageKey + "-user");
        if (!this.storage.isServer && Object.is(this.storage, this.userStorage) && !maybeUser) {
          maybeUser = { user: currentSession.user };
          await setItemAsync(this.userStorage, this.storageKey + "-user", maybeUser);
        }
        currentSession.user = (_a = maybeUser === null || maybeUser === void 0 ? void 0 : maybeUser.user) !== null && _a !== void 0 ? _a : userNotAvailableProxy();
      } else if (currentSession && !currentSession.user) {
        if (!currentSession.user) {
          const separateUser = await getItemAsync(this.storage, this.storageKey + "-user");
          if (separateUser && (separateUser === null || separateUser === void 0 ? void 0 : separateUser.user)) {
            currentSession.user = separateUser.user;
            await removeItemAsync(this.storage, this.storageKey + "-user");
            await setItemAsync(this.storage, this.storageKey, currentSession);
          } else {
            currentSession.user = userNotAvailableProxy();
          }
        }
      }
      this._debug(debugName, "session from storage", currentSession);
      if (!this._isValidSession(currentSession)) {
        this._debug(debugName, "session is not valid");
        if (currentSession !== null) {
          await this._removeSession();
        }
        return;
      }
      const expiresWithMargin = ((_b = currentSession.expires_at) !== null && _b !== void 0 ? _b : Infinity) * 1e3 - Date.now() < EXPIRY_MARGIN_MS;
      this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`);
      if (expiresWithMargin) {
        if (this.autoRefreshToken && currentSession.refresh_token) {
          const { error } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            console.error(error);
            if (!isAuthRetryableFetchError(error)) {
              this._debug(debugName, "refresh failed with a non-retryable error, removing the session", error);
              await this._removeSession();
            }
          }
        }
      } else if (currentSession.user && currentSession.user.__isUserNotAvailableProxy === true) {
        try {
          const { data, error: userError } = await this._getUser(currentSession.access_token);
          if (!userError && (data === null || data === void 0 ? void 0 : data.user)) {
            currentSession.user = data.user;
            await this._saveSession(currentSession);
            await this._notifyAllSubscribers("SIGNED_IN", currentSession);
          } else {
            this._debug(debugName, "could not get user data, skipping SIGNED_IN notification");
          }
        } catch (getUserError) {
          console.error("Error getting user data:", getUserError);
          this._debug(debugName, "error getting user data, skipping SIGNED_IN notification", getUserError);
        }
      } else {
        await this._notifyAllSubscribers("SIGNED_IN", currentSession);
      }
    } catch (err) {
      this._debug(debugName, "error", err);
      console.error(err);
      return;
    } finally {
      this._debug(debugName, "end");
    }
  }
  async _callRefreshToken(refreshToken) {
    var _a, _b;
    if (!refreshToken) {
      throw new AuthSessionMissingError();
    }
    if (this.refreshingDeferred) {
      return this.refreshingDeferred.promise;
    }
    const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
    this._debug(debugName, "begin");
    try {
      this.refreshingDeferred = new Deferred();
      const { data, error } = await this._refreshAccessToken(refreshToken);
      if (error)
        throw error;
      if (!data.session)
        throw new AuthSessionMissingError();
      await this._saveSession(data.session);
      await this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
      const result = { session: data.session, error: null };
      this.refreshingDeferred.resolve(result);
      return result;
    } catch (error) {
      this._debug(debugName, "error", error);
      if (isAuthError(error)) {
        const result = { session: null, error };
        if (!isAuthRetryableFetchError(error)) {
          await this._removeSession();
        }
        (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
        return result;
      }
      (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
      throw error;
    } finally {
      this.refreshingDeferred = null;
      this._debug(debugName, "end");
    }
  }
  async _notifyAllSubscribers(event, session, broadcast = true) {
    const debugName = `#_notifyAllSubscribers(${event})`;
    this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
    try {
      if (this.broadcastChannel && broadcast) {
        this.broadcastChannel.postMessage({ event, session });
      }
      const errors = [];
      const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
        try {
          await x.callback(event, session);
        } catch (e) {
          errors.push(e);
        }
      });
      await Promise.all(promises);
      if (errors.length > 0) {
        for (let i = 0; i < errors.length; i += 1) {
          console.error(errors[i]);
        }
        throw errors[0];
      }
    } finally {
      this._debug(debugName, "end");
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(session) {
    this._debug("#_saveSession()", session);
    this.suppressGetSessionWarning = true;
    const sessionToProcess = Object.assign({}, session);
    const userIsProxy = sessionToProcess.user && sessionToProcess.user.__isUserNotAvailableProxy === true;
    if (this.userStorage) {
      if (!userIsProxy && sessionToProcess.user) {
        await setItemAsync(this.userStorage, this.storageKey + "-user", {
          user: sessionToProcess.user
        });
      } else if (userIsProxy) {
      }
      const mainSessionData = Object.assign({}, sessionToProcess);
      delete mainSessionData.user;
      const clonedMainSessionData = deepClone(mainSessionData);
      await setItemAsync(this.storage, this.storageKey, clonedMainSessionData);
    } else {
      const clonedSession = deepClone(sessionToProcess);
      await setItemAsync(this.storage, this.storageKey, clonedSession);
    }
  }
  async _removeSession() {
    this._debug("#_removeSession()");
    await removeItemAsync(this.storage, this.storageKey);
    await removeItemAsync(this.storage, this.storageKey + "-code-verifier");
    await removeItemAsync(this.storage, this.storageKey + "-user");
    if (this.userStorage) {
      await removeItemAsync(this.userStorage, this.storageKey + "-user");
    }
    await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  /**
   * Removes any registered visibilitychange callback.
   *
   * {@see #startAutoRefresh}
   * {@see #stopAutoRefresh}
   */
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const callback = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
        window.removeEventListener("visibilitychange", callback);
      }
    } catch (e) {
      console.error("removing visibilitychange callback failed", e);
    }
  }
  /**
   * This is the private implementation of {@link #startAutoRefresh}. Use this
   * within the library.
   */
  async _startAutoRefresh() {
    await this._stopAutoRefresh();
    this._debug("#_startAutoRefresh()");
    const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION_MS);
    this.autoRefreshTicker = ticker;
    if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
      ticker.unref();
    } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
      Deno.unrefTimer(ticker);
    }
    setTimeout(async () => {
      await this.initializePromise;
      await this._autoRefreshTokenTick();
    }, 0);
  }
  /**
   * This is the private implementation of {@link #stopAutoRefresh}. Use this
   * within the library.
   */
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const ticker = this.autoRefreshTicker;
    this.autoRefreshTicker = null;
    if (ticker) {
      clearInterval(ticker);
    }
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests. If you call this method any managed
   * visibility change callback will be removed and you must manage visibility
   * changes on your own.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desirable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._startAutoRefresh();
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   *
   * If you call this method any managed visibility change callback will be
   * removed and you must manage visibility changes on your own.
   *
   * See {@link #startAutoRefresh} for more details.
   */
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback();
    await this._stopAutoRefresh();
  }
  /**
   * Runs the auto refresh token tick.
   */
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const now = Date.now();
          try {
            return await this._useSession(async (result) => {
              const { data: { session } } = result;
              if (!session || !session.refresh_token || !session.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION_MS);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
              if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                await this._callRefreshToken(session.refresh_token);
              }
            });
          } catch (e) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
        this._debug("auto refresh token tick lock not available");
      } else {
        throw e;
      }
    }
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  async _handleVisibilityChange() {
    this._debug("#_handleVisibilityChange()");
    if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      if (this.autoRefreshToken) {
        this.startAutoRefresh();
      }
      return false;
    }
    try {
      this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
      window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
      await this._onVisibilityChanged(true);
    } catch (error) {
      console.error("_handleVisibilityChange", error);
    }
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  async _onVisibilityChanged(calledFromInitialize) {
    const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
    this._debug(methodName, "visibilityState", document.visibilityState);
    if (document.visibilityState === "visible") {
      if (this.autoRefreshToken) {
        this._startAutoRefresh();
      }
      if (!calledFromInitialize) {
        await this.initializePromise;
        await this._acquireLock(-1, async () => {
          if (document.visibilityState !== "visible") {
            this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
            return;
          }
          await this._recoverAndRefresh();
        });
      }
    } else if (document.visibilityState === "hidden") {
      if (this.autoRefreshToken) {
        this._stopAutoRefresh();
      }
    }
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  async _getUrlForProvider(url, provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }
    if (this.flowType === "pkce") {
      const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
      const flowParams = new URLSearchParams({
        code_challenge: `${encodeURIComponent(codeChallenge)}`,
        code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
      });
      urlParams.push(flowParams.toString());
    }
    if (options === null || options === void 0 ? void 0 : options.queryParams) {
      const query = new URLSearchParams(options.queryParams);
      urlParams.push(query.toString());
    }
    if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) {
      urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
    }
    return `${url}?${urlParams.join("&")}`;
  }
  async _unenroll(params) {
    try {
      return await this._useSession(async (result) => {
        var _a;
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
        });
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  async _enroll(params) {
    try {
      return await this._useSession(async (result) => {
        var _a, _b;
        const { data: sessionData, error: sessionError } = result;
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        const body = Object.assign({ friendly_name: params.friendlyName, factor_type: params.factorType }, params.factorType === "phone" ? { phone: params.phone } : { issuer: params.issuer });
        const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors`, {
          body,
          headers: this.headers,
          jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
        });
        if (error) {
          return { data: null, error };
        }
        if (params.factorType === "totp" && ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) {
          data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
        }
        return { data, error: null };
      });
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
  /**
   * {@see GoTrueMFAApi#verify}
   */
  async _verify(params) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (result) => {
          var _a;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          const { data, error } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
            body: { code: params.code, challenge_id: params.challengeId },
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
          if (error) {
            return { data: null, error };
          }
          await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
          await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
          return { data, error };
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challenge}
   */
  async _challenge(params) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (result) => {
          var _a;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          return await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
            body: { channel: params.channel },
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  async _challengeAndVerify(params) {
    const { data: challengeData, error: challengeError } = await this._challenge({
      factorId: params.factorId
    });
    if (challengeError) {
      return { data: null, error: challengeError };
    }
    return await this._verify({
      factorId: params.factorId,
      challengeId: challengeData.id,
      code: params.code
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  async _listFactors() {
    const { data: { user }, error: userError } = await this.getUser();
    if (userError) {
      return { data: null, error: userError };
    }
    const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
    const totp = factors.filter((factor) => factor.factor_type === "totp" && factor.status === "verified");
    const phone = factors.filter((factor) => factor.factor_type === "phone" && factor.status === "verified");
    return {
      data: {
        all: factors,
        totp,
        phone
      },
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(-1, async () => {
      return await this._useSession(async (result) => {
        var _a, _b;
        const { data: { session }, error: sessionError } = result;
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        if (!session) {
          return {
            data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
            error: null
          };
        }
        const { payload } = decodeJWT(session.access_token);
        let currentLevel = null;
        if (payload.aal) {
          currentLevel = payload.aal;
        }
        let nextLevel = currentLevel;
        const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
        if (verifiedFactors.length > 0) {
          nextLevel = "aal2";
        }
        const currentAuthenticationMethods = payload.amr || [];
        return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
      });
    });
  }
  async fetchJwk(kid, jwks = { keys: [] }) {
    let jwk = jwks.keys.find((key) => key.kid === kid);
    if (jwk) {
      return jwk;
    }
    const now = Date.now();
    jwk = this.jwks.keys.find((key) => key.kid === kid);
    if (jwk && this.jwks_cached_at + JWKS_TTL > now) {
      return jwk;
    }
    const { data, error } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (error) {
      throw error;
    }
    if (!data.keys || data.keys.length === 0) {
      return null;
    }
    this.jwks = data;
    this.jwks_cached_at = now;
    jwk = data.keys.find((key) => key.kid === kid);
    if (!jwk) {
      return null;
    }
    return jwk;
  }
  /**
   * Extracts the JWT claims present in the access token by first verifying the
   * JWT against the server's JSON Web Key Set endpoint
   * `/.well-known/jwks.json` which is often cached, resulting in significantly
   * faster responses. Prefer this method over {@link #getUser} which always
   * sends a request to the Auth server for each JWT.
   *
   * If the project is not using an asymmetric JWT signing key (like ECC or
   * RSA) it always sends a request to the Auth server (similar to {@link
   * #getUser}) to verify the JWT.
   *
   * @param jwt An optional specific JWT you wish to verify, not the one you
   *            can obtain from {@link #getSession}.
   * @param options Various additional options that allow you to customize the
   *                behavior of this method.
   */
  async getClaims(jwt, options = {}) {
    try {
      let token2 = jwt;
      if (!token2) {
        const { data, error } = await this.getSession();
        if (error || !data.session) {
          return { data: null, error };
        }
        token2 = data.session.access_token;
      }
      const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload } } = decodeJWT(token2);
      if (!(options === null || options === void 0 ? void 0 : options.allowExpired)) {
        validateExp(payload.exp);
      }
      const signingKey = !header.alg || header.alg.startsWith("HS") || !header.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(header.kid, (options === null || options === void 0 ? void 0 : options.keys) ? { keys: options.keys } : options === null || options === void 0 ? void 0 : options.jwks);
      if (!signingKey) {
        const { error } = await this.getUser(token2);
        if (error) {
          throw error;
        }
        return {
          data: {
            claims: payload,
            header,
            signature
          },
          error: null
        };
      }
      const algorithm = getAlgorithm(header.alg);
      const publicKey = await crypto.subtle.importKey("jwk", signingKey, algorithm, true, [
        "verify"
      ]);
      const isValid = await crypto.subtle.verify(algorithm, publicKey, signature, stringToUint8Array(`${rawHeader}.${rawPayload}`));
      if (!isValid) {
        throw new AuthInvalidJwtError("Invalid JWT signature");
      }
      return {
        data: {
          claims: payload,
          header,
          signature
        },
        error: null
      };
    } catch (error) {
      if (isAuthError(error)) {
        return { data: null, error };
      }
      throw error;
    }
  }
};
GoTrueClient.nextInstanceID = 0;

// node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js
var AuthAdminApi = GoTrueAdminApi;
var AuthAdminApi_default = AuthAdminApi;

// node_modules/@supabase/auth-js/dist/module/AuthClient.js
var AuthClient = GoTrueClient;
var AuthClient_default = AuthClient;

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient = class extends AuthClient_default {
  constructor(options) {
    super(options);
  }
};

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var __awaiter10 = function(thisArg, _arguments, P, generator) {
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
var SupabaseClient = class {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.storage Options passed along to the storage-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(supabaseUrl, supabaseKey, options) {
    var _a, _b, _c;
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    const baseUrl = validateSupabaseUrl(supabaseUrl);
    if (!supabaseKey)
      throw new Error("supabaseKey is required.");
    this.realtimeUrl = new URL("realtime/v1", baseUrl);
    this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
    this.authUrl = new URL("auth/v1", baseUrl);
    this.storageUrl = new URL("storage/v1", baseUrl);
    this.functionsUrl = new URL("functions/v1", baseUrl);
    const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
    const DEFAULTS = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
      global: DEFAULT_GLOBAL_OPTIONS
    };
    const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
    this.storageKey = (_a = settings.auth.storageKey) !== null && _a !== void 0 ? _a : "";
    this.headers = (_b = settings.global.headers) !== null && _b !== void 0 ? _b : {};
    if (!settings.accessToken) {
      this.auth = this._initSupabaseAuthClient((_c = settings.auth) !== null && _c !== void 0 ? _c : {}, this.headers, settings.global.fetch);
    } else {
      this.accessToken = settings.accessToken;
      this.auth = new Proxy({}, {
        get: (_, prop) => {
          throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
        }
      });
    }
    this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
    this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, settings.realtime));
    this.rest = new PostgrestClient(new URL("rest/v1", baseUrl).href, {
      headers: this.headers,
      schema: settings.db.schema,
      fetch: this.fetch
    });
    this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
    if (!settings.accessToken) {
      this._listenForAuthEvents();
    }
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new FunctionsClient(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(relation) {
    return this.rest.from(relation);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.schema
  /**
   * Select a schema to query or perform an function (rpc) call.
   *
   * The schema needs to be on the list of exposed schemas inside Supabase.
   *
   * @param schema - The schema to query
   */
  schema(schema) {
    return this.rest.schema(schema);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.rpc
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.get - When set to `true`, the function will be called with
   * read-only access mode.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(fn, args = {}, options = {}) {
    return this.rest.rpc(fn, args, options);
  }
  /**
   * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
   *
   * @param {string} name - The name of the Realtime channel.
   * @param {Object} opts - The options to pass to the Realtime channel.
   *
   */
  channel(name, opts = { config: {} }) {
    return this.realtime.channel(name, opts);
  }
  /**
   * Returns all Realtime channels.
   */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
   * Unsubscribes and removes Realtime channel from Realtime client.
   *
   * @param {RealtimeChannel} channel - The name of the Realtime channel.
   *
   */
  removeChannel(channel) {
    return this.realtime.removeChannel(channel);
  }
  /**
   * Unsubscribes and removes all Realtime channels from Realtime client.
   */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var _a, _b;
    return __awaiter10(this, void 0, void 0, function* () {
      if (this.accessToken) {
        return yield this.accessToken();
      }
      const { data } = yield this.auth.getSession();
      return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug }, headers, fetch3) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl.href,
      headers: Object.assign(Object.assign({}, authHeaders), headers),
      storageKey,
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      storage,
      userStorage,
      flowType,
      lock,
      debug,
      fetch: fetch3,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === "authorization")
    });
  }
  _initRealtimeClient(options) {
    return new RealtimeClient(this.realtimeUrl.href, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
  }
  _listenForAuthEvents() {
    let data = this.auth.onAuthStateChange((event, session) => {
      this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
    });
    return data;
  }
  _handleTokenChanged(event, source, token2) {
    if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token2) {
      this.changedAccessToken = token2;
      this.realtime.setAuth(token2);
    } else if (event === "SIGNED_OUT") {
      this.realtime.setAuth();
      if (source == "STORAGE")
        this.auth.signOut();
      this.changedAccessToken = void 0;
    }
  }
};

// node_modules/@supabase/supabase-js/dist/module/index.js
var createClient = (supabaseUrl, supabaseKey, options) => {
  return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
  if (typeof window !== "undefined") {
    return false;
  }
  if (typeof process === "undefined") {
    return false;
  }
  const processVersion = process["version"];
  if (processVersion === void 0 || processVersion === null) {
    return false;
  }
  const versionMatch = processVersion.match(/^v(\d+)\./);
  if (!versionMatch) {
    return false;
  }
  const majorVersion = parseInt(versionMatch[1], 10);
  return majorVersion <= 18;
}
if (shouldShowDeprecationWarning()) {
  console.warn(`\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217`);
}

// entry.js
window.supabase = module_exports;
Promise.resolve().then(() => init_app());
