
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Prospect
 * 
 */
export type Prospect = $Result.DefaultSelection<Prisma.$ProspectPayload>
/**
 * Model Candidate
 * 
 */
export type Candidate = $Result.DefaultSelection<Prisma.$CandidatePayload>
/**
 * Model Formation
 * 
 */
export type Formation = $Result.DefaultSelection<Prisma.$FormationPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model Professor
 * 
 */
export type Professor = $Result.DefaultSelection<Prisma.$ProfessorPayload>
/**
 * Model Inscription
 * 
 */
export type Inscription = $Result.DefaultSelection<Prisma.$InscriptionPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model InscriptionCandidate
 * 
 */
export type InscriptionCandidate = $Result.DefaultSelection<Prisma.$InscriptionCandidatePayload>
/**
 * Model Commercial
 * 
 */
export type Commercial = $Result.DefaultSelection<Prisma.$CommercialPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Reservation
 * 
 */
export type Reservation = $Result.DefaultSelection<Prisma.$ReservationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Occupation: {
  STUDENT: 'STUDENT',
  EMPLOYEE: 'EMPLOYEE'
};

export type Occupation = (typeof Occupation)[keyof typeof Occupation]


export const Observation: {
  ALONE: 'ALONE',
  ACCOMPANIED: 'ACCOMPANIED'
};

export type Observation = (typeof Observation)[keyof typeof Observation]


export const CandidateStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING'
};

export type CandidateStatus = (typeof CandidateStatus)[keyof typeof CandidateStatus]


export const LearningMode: {
  MONOME: 'MONOME',
  BINOME: 'BINOME',
  GROUPE: 'GROUPE'
};

export type LearningMode = (typeof LearningMode)[keyof typeof LearningMode]


export const InscriptionStatus: {
  WAITING: 'WAITING',
  ASSIGNED: 'ASSIGNED',
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export type InscriptionStatus = (typeof InscriptionStatus)[keyof typeof InscriptionStatus]


export const GroupType: {
  MONOME: 'MONOME',
  BINOME: 'BINOME',
  GROUPE: 'GROUPE'
};

export type GroupType = (typeof GroupType)[keyof typeof GroupType]


export const PaymentMethod: {
  CASH: 'CASH',
  CARD: 'CARD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CHEQUE: 'CHEQUE'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const PaymentStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const ReservationStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Occupation = $Enums.Occupation

export const Occupation: typeof $Enums.Occupation

export type Observation = $Enums.Observation

export const Observation: typeof $Enums.Observation

export type CandidateStatus = $Enums.CandidateStatus

export const CandidateStatus: typeof $Enums.CandidateStatus

export type LearningMode = $Enums.LearningMode

export const LearningMode: typeof $Enums.LearningMode

export type InscriptionStatus = $Enums.InscriptionStatus

export const InscriptionStatus: typeof $Enums.InscriptionStatus

export type GroupType = $Enums.GroupType

export const GroupType: typeof $Enums.GroupType

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type ReservationStatus = $Enums.ReservationStatus

export const ReservationStatus: typeof $Enums.ReservationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prospect`: Exposes CRUD operations for the **Prospect** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prospects
    * const prospects = await prisma.prospect.findMany()
    * ```
    */
  get prospect(): Prisma.ProspectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidate`: Exposes CRUD operations for the **Candidate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidates
    * const candidates = await prisma.candidate.findMany()
    * ```
    */
  get candidate(): Prisma.CandidateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formation`: Exposes CRUD operations for the **Formation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Formations
    * const formations = await prisma.formation.findMany()
    * ```
    */
  get formation(): Prisma.FormationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professor`: Exposes CRUD operations for the **Professor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Professors
    * const professors = await prisma.professor.findMany()
    * ```
    */
  get professor(): Prisma.ProfessorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inscription`: Exposes CRUD operations for the **Inscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inscriptions
    * const inscriptions = await prisma.inscription.findMany()
    * ```
    */
  get inscription(): Prisma.InscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inscriptionCandidate`: Exposes CRUD operations for the **InscriptionCandidate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InscriptionCandidates
    * const inscriptionCandidates = await prisma.inscriptionCandidate.findMany()
    * ```
    */
  get inscriptionCandidate(): Prisma.InscriptionCandidateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commercial`: Exposes CRUD operations for the **Commercial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commercials
    * const commercials = await prisma.commercial.findMany()
    * ```
    */
  get commercial(): Prisma.CommercialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reservation`: Exposes CRUD operations for the **Reservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reservations
    * const reservations = await prisma.reservation.findMany()
    * ```
    */
  get reservation(): Prisma.ReservationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Prospect: 'Prospect',
    Candidate: 'Candidate',
    Formation: 'Formation',
    Room: 'Room',
    Professor: 'Professor',
    Inscription: 'Inscription',
    Group: 'Group',
    InscriptionCandidate: 'InscriptionCandidate',
    Commercial: 'Commercial',
    Payment: 'Payment',
    Reservation: 'Reservation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "prospect" | "candidate" | "formation" | "room" | "professor" | "inscription" | "group" | "inscriptionCandidate" | "commercial" | "payment" | "reservation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Prospect: {
        payload: Prisma.$ProspectPayload<ExtArgs>
        fields: Prisma.ProspectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProspectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProspectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>
          }
          findFirst: {
            args: Prisma.ProspectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProspectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>
          }
          findMany: {
            args: Prisma.ProspectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>[]
          }
          create: {
            args: Prisma.ProspectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>
          }
          createMany: {
            args: Prisma.ProspectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProspectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>[]
          }
          delete: {
            args: Prisma.ProspectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>
          }
          update: {
            args: Prisma.ProspectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>
          }
          deleteMany: {
            args: Prisma.ProspectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProspectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProspectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>[]
          }
          upsert: {
            args: Prisma.ProspectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProspectPayload>
          }
          aggregate: {
            args: Prisma.ProspectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProspect>
          }
          groupBy: {
            args: Prisma.ProspectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProspectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProspectCountArgs<ExtArgs>
            result: $Utils.Optional<ProspectCountAggregateOutputType> | number
          }
        }
      }
      Candidate: {
        payload: Prisma.$CandidatePayload<ExtArgs>
        fields: Prisma.CandidateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findFirst: {
            args: Prisma.CandidateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findMany: {
            args: Prisma.CandidateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          create: {
            args: Prisma.CandidateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          createMany: {
            args: Prisma.CandidateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandidateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          delete: {
            args: Prisma.CandidateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          update: {
            args: Prisma.CandidateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          deleteMany: {
            args: Prisma.CandidateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandidateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          upsert: {
            args: Prisma.CandidateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          aggregate: {
            args: Prisma.CandidateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidate>
          }
          groupBy: {
            args: Prisma.CandidateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidateCountArgs<ExtArgs>
            result: $Utils.Optional<CandidateCountAggregateOutputType> | number
          }
        }
      }
      Formation: {
        payload: Prisma.$FormationPayload<ExtArgs>
        fields: Prisma.FormationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          findFirst: {
            args: Prisma.FormationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          findMany: {
            args: Prisma.FormationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>[]
          }
          create: {
            args: Prisma.FormationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          createMany: {
            args: Prisma.FormationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>[]
          }
          delete: {
            args: Prisma.FormationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          update: {
            args: Prisma.FormationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          deleteMany: {
            args: Prisma.FormationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>[]
          }
          upsert: {
            args: Prisma.FormationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          aggregate: {
            args: Prisma.FormationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormation>
          }
          groupBy: {
            args: Prisma.FormationGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormationGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormationCountArgs<ExtArgs>
            result: $Utils.Optional<FormationCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      Professor: {
        payload: Prisma.$ProfessorPayload<ExtArgs>
        fields: Prisma.ProfessorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findFirst: {
            args: Prisma.ProfessorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findMany: {
            args: Prisma.ProfessorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          create: {
            args: Prisma.ProfessorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          createMany: {
            args: Prisma.ProfessorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          delete: {
            args: Prisma.ProfessorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          update: {
            args: Prisma.ProfessorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          deleteMany: {
            args: Prisma.ProfessorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          upsert: {
            args: Prisma.ProfessorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          aggregate: {
            args: Prisma.ProfessorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessor>
          }
          groupBy: {
            args: Prisma.ProfessorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessorCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessorCountAggregateOutputType> | number
          }
        }
      }
      Inscription: {
        payload: Prisma.$InscriptionPayload<ExtArgs>
        fields: Prisma.InscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          findFirst: {
            args: Prisma.InscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          findMany: {
            args: Prisma.InscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>[]
          }
          create: {
            args: Prisma.InscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          createMany: {
            args: Prisma.InscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>[]
          }
          delete: {
            args: Prisma.InscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          update: {
            args: Prisma.InscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          deleteMany: {
            args: Prisma.InscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>[]
          }
          upsert: {
            args: Prisma.InscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          aggregate: {
            args: Prisma.InscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInscription>
          }
          groupBy: {
            args: Prisma.InscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<InscriptionCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      InscriptionCandidate: {
        payload: Prisma.$InscriptionCandidatePayload<ExtArgs>
        fields: Prisma.InscriptionCandidateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InscriptionCandidateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InscriptionCandidateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>
          }
          findFirst: {
            args: Prisma.InscriptionCandidateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InscriptionCandidateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>
          }
          findMany: {
            args: Prisma.InscriptionCandidateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>[]
          }
          create: {
            args: Prisma.InscriptionCandidateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>
          }
          createMany: {
            args: Prisma.InscriptionCandidateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InscriptionCandidateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>[]
          }
          delete: {
            args: Prisma.InscriptionCandidateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>
          }
          update: {
            args: Prisma.InscriptionCandidateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>
          }
          deleteMany: {
            args: Prisma.InscriptionCandidateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InscriptionCandidateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InscriptionCandidateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>[]
          }
          upsert: {
            args: Prisma.InscriptionCandidateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionCandidatePayload>
          }
          aggregate: {
            args: Prisma.InscriptionCandidateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInscriptionCandidate>
          }
          groupBy: {
            args: Prisma.InscriptionCandidateGroupByArgs<ExtArgs>
            result: $Utils.Optional<InscriptionCandidateGroupByOutputType>[]
          }
          count: {
            args: Prisma.InscriptionCandidateCountArgs<ExtArgs>
            result: $Utils.Optional<InscriptionCandidateCountAggregateOutputType> | number
          }
        }
      }
      Commercial: {
        payload: Prisma.$CommercialPayload<ExtArgs>
        fields: Prisma.CommercialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommercialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommercialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>
          }
          findFirst: {
            args: Prisma.CommercialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommercialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>
          }
          findMany: {
            args: Prisma.CommercialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>[]
          }
          create: {
            args: Prisma.CommercialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>
          }
          createMany: {
            args: Prisma.CommercialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommercialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>[]
          }
          delete: {
            args: Prisma.CommercialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>
          }
          update: {
            args: Prisma.CommercialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>
          }
          deleteMany: {
            args: Prisma.CommercialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommercialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommercialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>[]
          }
          upsert: {
            args: Prisma.CommercialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommercialPayload>
          }
          aggregate: {
            args: Prisma.CommercialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommercial>
          }
          groupBy: {
            args: Prisma.CommercialGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommercialGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommercialCountArgs<ExtArgs>
            result: $Utils.Optional<CommercialCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Reservation: {
        payload: Prisma.$ReservationPayload<ExtArgs>
        fields: Prisma.ReservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          findFirst: {
            args: Prisma.ReservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          findMany: {
            args: Prisma.ReservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          create: {
            args: Prisma.ReservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          createMany: {
            args: Prisma.ReservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          delete: {
            args: Prisma.ReservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          update: {
            args: Prisma.ReservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          deleteMany: {
            args: Prisma.ReservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReservationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          upsert: {
            args: Prisma.ReservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          aggregate: {
            args: Prisma.ReservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReservation>
          }
          groupBy: {
            args: Prisma.ReservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReservationCountArgs<ExtArgs>
            result: $Utils.Optional<ReservationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    prospect?: ProspectOmit
    candidate?: CandidateOmit
    formation?: FormationOmit
    room?: RoomOmit
    professor?: ProfessorOmit
    inscription?: InscriptionOmit
    group?: GroupOmit
    inscriptionCandidate?: InscriptionCandidateOmit
    commercial?: CommercialOmit
    payment?: PaymentOmit
    reservation?: ReservationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CandidateCountOutputType
   */

  export type CandidateCountOutputType = {
    inscriptions: number
    inscriptionCandidates: number
    payments: number
  }

  export type CandidateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | CandidateCountOutputTypeCountInscriptionsArgs
    inscriptionCandidates?: boolean | CandidateCountOutputTypeCountInscriptionCandidatesArgs
    payments?: boolean | CandidateCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCountOutputType
     */
    select?: CandidateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountInscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionWhereInput
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountInscriptionCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionCandidateWhereInput
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type FormationCountOutputType
   */

  export type FormationCountOutputType = {
    inscriptions: number
    payments: number
  }

  export type FormationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | FormationCountOutputTypeCountInscriptionsArgs
    payments?: boolean | FormationCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormationCountOutputType
     */
    select?: FormationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountInscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionWhereInput
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    reservations: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservations?: boolean | RoomCountOutputTypeCountReservationsArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
  }


  /**
   * Count Type ProfessorCountOutputType
   */

  export type ProfessorCountOutputType = {
    inscriptions: number
    reservations: number
  }

  export type ProfessorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | ProfessorCountOutputTypeCountInscriptionsArgs
    reservations?: boolean | ProfessorCountOutputTypeCountReservationsArgs
  }

  // Custom InputTypes
  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessorCountOutputType
     */
    select?: ProfessorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeCountInscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionWhereInput
  }

  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
  }


  /**
   * Count Type InscriptionCountOutputType
   */

  export type InscriptionCountOutputType = {
    members: number
    reservations: number
  }

  export type InscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | InscriptionCountOutputTypeCountMembersArgs
    reservations?: boolean | InscriptionCountOutputTypeCountReservationsArgs
  }

  // Custom InputTypes
  /**
   * InscriptionCountOutputType without action
   */
  export type InscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCountOutputType
     */
    select?: InscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InscriptionCountOutputType without action
   */
  export type InscriptionCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionCandidateWhereInput
  }

  /**
   * InscriptionCountOutputType without action
   */
  export type InscriptionCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Prospect
   */

  export type AggregateProspect = {
    _count: ProspectCountAggregateOutputType | null
    _avg: ProspectAvgAggregateOutputType | null
    _sum: ProspectSumAggregateOutputType | null
    _min: ProspectMinAggregateOutputType | null
    _max: ProspectMaxAggregateOutputType | null
  }

  export type ProspectAvgAggregateOutputType = {
    age: number | null
    freeSessionsCompleted: number | null
    absences: number | null
  }

  export type ProspectSumAggregateOutputType = {
    age: number | null
    freeSessionsCompleted: number | null
    absences: number | null
  }

  export type ProspectMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    age: number | null
    occupation: $Enums.Occupation | null
    subject: string | null
    giftCode: string | null
    observation: $Enums.Observation | null
    action: string | null
    status: string | null
    freeSessionsCompleted: number | null
    absences: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProspectMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    age: number | null
    occupation: $Enums.Occupation | null
    subject: string | null
    giftCode: string | null
    observation: $Enums.Observation | null
    action: string | null
    status: string | null
    freeSessionsCompleted: number | null
    absences: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProspectCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    age: number
    occupation: number
    subject: number
    giftCode: number
    observation: number
    contact: number
    action: number
    status: number
    freeSessionsCompleted: number
    absences: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProspectAvgAggregateInputType = {
    age?: true
    freeSessionsCompleted?: true
    absences?: true
  }

  export type ProspectSumAggregateInputType = {
    age?: true
    freeSessionsCompleted?: true
    absences?: true
  }

  export type ProspectMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    age?: true
    occupation?: true
    subject?: true
    giftCode?: true
    observation?: true
    action?: true
    status?: true
    freeSessionsCompleted?: true
    absences?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProspectMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    age?: true
    occupation?: true
    subject?: true
    giftCode?: true
    observation?: true
    action?: true
    status?: true
    freeSessionsCompleted?: true
    absences?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProspectCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    age?: true
    occupation?: true
    subject?: true
    giftCode?: true
    observation?: true
    contact?: true
    action?: true
    status?: true
    freeSessionsCompleted?: true
    absences?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProspectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prospect to aggregate.
     */
    where?: ProspectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prospects to fetch.
     */
    orderBy?: ProspectOrderByWithRelationInput | ProspectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProspectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prospects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prospects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prospects
    **/
    _count?: true | ProspectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProspectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProspectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProspectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProspectMaxAggregateInputType
  }

  export type GetProspectAggregateType<T extends ProspectAggregateArgs> = {
        [P in keyof T & keyof AggregateProspect]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProspect[P]>
      : GetScalarType<T[P], AggregateProspect[P]>
  }




  export type ProspectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProspectWhereInput
    orderBy?: ProspectOrderByWithAggregationInput | ProspectOrderByWithAggregationInput[]
    by: ProspectScalarFieldEnum[] | ProspectScalarFieldEnum
    having?: ProspectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProspectCountAggregateInputType | true
    _avg?: ProspectAvgAggregateInputType
    _sum?: ProspectSumAggregateInputType
    _min?: ProspectMinAggregateInputType
    _max?: ProspectMaxAggregateInputType
  }

  export type ProspectGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    age: number
    occupation: $Enums.Occupation
    subject: string
    giftCode: string | null
    observation: $Enums.Observation
    contact: string[]
    action: string | null
    status: string
    freeSessionsCompleted: number
    absences: number
    createdAt: Date
    updatedAt: Date
    _count: ProspectCountAggregateOutputType | null
    _avg: ProspectAvgAggregateOutputType | null
    _sum: ProspectSumAggregateOutputType | null
    _min: ProspectMinAggregateOutputType | null
    _max: ProspectMaxAggregateOutputType | null
  }

  type GetProspectGroupByPayload<T extends ProspectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProspectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProspectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProspectGroupByOutputType[P]>
            : GetScalarType<T[P], ProspectGroupByOutputType[P]>
        }
      >
    >


  export type ProspectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    occupation?: boolean
    subject?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    freeSessionsCompleted?: boolean
    absences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["prospect"]>

  export type ProspectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    occupation?: boolean
    subject?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    freeSessionsCompleted?: boolean
    absences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["prospect"]>

  export type ProspectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    occupation?: boolean
    subject?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    freeSessionsCompleted?: boolean
    absences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["prospect"]>

  export type ProspectSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    occupation?: boolean
    subject?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    freeSessionsCompleted?: boolean
    absences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProspectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "age" | "occupation" | "subject" | "giftCode" | "observation" | "contact" | "action" | "status" | "freeSessionsCompleted" | "absences" | "createdAt" | "updatedAt", ExtArgs["result"]["prospect"]>

  export type $ProspectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prospect"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      age: number
      occupation: $Enums.Occupation
      subject: string
      giftCode: string | null
      observation: $Enums.Observation
      contact: string[]
      action: string | null
      status: string
      freeSessionsCompleted: number
      absences: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prospect"]>
    composites: {}
  }

  type ProspectGetPayload<S extends boolean | null | undefined | ProspectDefaultArgs> = $Result.GetResult<Prisma.$ProspectPayload, S>

  type ProspectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProspectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProspectCountAggregateInputType | true
    }

  export interface ProspectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prospect'], meta: { name: 'Prospect' } }
    /**
     * Find zero or one Prospect that matches the filter.
     * @param {ProspectFindUniqueArgs} args - Arguments to find a Prospect
     * @example
     * // Get one Prospect
     * const prospect = await prisma.prospect.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProspectFindUniqueArgs>(args: SelectSubset<T, ProspectFindUniqueArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prospect that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProspectFindUniqueOrThrowArgs} args - Arguments to find a Prospect
     * @example
     * // Get one Prospect
     * const prospect = await prisma.prospect.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProspectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProspectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prospect that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProspectFindFirstArgs} args - Arguments to find a Prospect
     * @example
     * // Get one Prospect
     * const prospect = await prisma.prospect.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProspectFindFirstArgs>(args?: SelectSubset<T, ProspectFindFirstArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prospect that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProspectFindFirstOrThrowArgs} args - Arguments to find a Prospect
     * @example
     * // Get one Prospect
     * const prospect = await prisma.prospect.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProspectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProspectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prospects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProspectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prospects
     * const prospects = await prisma.prospect.findMany()
     * 
     * // Get first 10 Prospects
     * const prospects = await prisma.prospect.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prospectWithIdOnly = await prisma.prospect.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProspectFindManyArgs>(args?: SelectSubset<T, ProspectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prospect.
     * @param {ProspectCreateArgs} args - Arguments to create a Prospect.
     * @example
     * // Create one Prospect
     * const Prospect = await prisma.prospect.create({
     *   data: {
     *     // ... data to create a Prospect
     *   }
     * })
     * 
     */
    create<T extends ProspectCreateArgs>(args: SelectSubset<T, ProspectCreateArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prospects.
     * @param {ProspectCreateManyArgs} args - Arguments to create many Prospects.
     * @example
     * // Create many Prospects
     * const prospect = await prisma.prospect.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProspectCreateManyArgs>(args?: SelectSubset<T, ProspectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prospects and returns the data saved in the database.
     * @param {ProspectCreateManyAndReturnArgs} args - Arguments to create many Prospects.
     * @example
     * // Create many Prospects
     * const prospect = await prisma.prospect.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prospects and only return the `id`
     * const prospectWithIdOnly = await prisma.prospect.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProspectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProspectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prospect.
     * @param {ProspectDeleteArgs} args - Arguments to delete one Prospect.
     * @example
     * // Delete one Prospect
     * const Prospect = await prisma.prospect.delete({
     *   where: {
     *     // ... filter to delete one Prospect
     *   }
     * })
     * 
     */
    delete<T extends ProspectDeleteArgs>(args: SelectSubset<T, ProspectDeleteArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prospect.
     * @param {ProspectUpdateArgs} args - Arguments to update one Prospect.
     * @example
     * // Update one Prospect
     * const prospect = await prisma.prospect.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProspectUpdateArgs>(args: SelectSubset<T, ProspectUpdateArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prospects.
     * @param {ProspectDeleteManyArgs} args - Arguments to filter Prospects to delete.
     * @example
     * // Delete a few Prospects
     * const { count } = await prisma.prospect.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProspectDeleteManyArgs>(args?: SelectSubset<T, ProspectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prospects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProspectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prospects
     * const prospect = await prisma.prospect.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProspectUpdateManyArgs>(args: SelectSubset<T, ProspectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prospects and returns the data updated in the database.
     * @param {ProspectUpdateManyAndReturnArgs} args - Arguments to update many Prospects.
     * @example
     * // Update many Prospects
     * const prospect = await prisma.prospect.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prospects and only return the `id`
     * const prospectWithIdOnly = await prisma.prospect.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProspectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProspectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prospect.
     * @param {ProspectUpsertArgs} args - Arguments to update or create a Prospect.
     * @example
     * // Update or create a Prospect
     * const prospect = await prisma.prospect.upsert({
     *   create: {
     *     // ... data to create a Prospect
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prospect we want to update
     *   }
     * })
     */
    upsert<T extends ProspectUpsertArgs>(args: SelectSubset<T, ProspectUpsertArgs<ExtArgs>>): Prisma__ProspectClient<$Result.GetResult<Prisma.$ProspectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prospects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProspectCountArgs} args - Arguments to filter Prospects to count.
     * @example
     * // Count the number of Prospects
     * const count = await prisma.prospect.count({
     *   where: {
     *     // ... the filter for the Prospects we want to count
     *   }
     * })
    **/
    count<T extends ProspectCountArgs>(
      args?: Subset<T, ProspectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProspectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prospect.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProspectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProspectAggregateArgs>(args: Subset<T, ProspectAggregateArgs>): Prisma.PrismaPromise<GetProspectAggregateType<T>>

    /**
     * Group by Prospect.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProspectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProspectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProspectGroupByArgs['orderBy'] }
        : { orderBy?: ProspectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProspectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProspectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prospect model
   */
  readonly fields: ProspectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prospect.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProspectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prospect model
   */
  interface ProspectFieldRefs {
    readonly id: FieldRef<"Prospect", 'String'>
    readonly firstName: FieldRef<"Prospect", 'String'>
    readonly lastName: FieldRef<"Prospect", 'String'>
    readonly age: FieldRef<"Prospect", 'Int'>
    readonly occupation: FieldRef<"Prospect", 'Occupation'>
    readonly subject: FieldRef<"Prospect", 'String'>
    readonly giftCode: FieldRef<"Prospect", 'String'>
    readonly observation: FieldRef<"Prospect", 'Observation'>
    readonly contact: FieldRef<"Prospect", 'String[]'>
    readonly action: FieldRef<"Prospect", 'String'>
    readonly status: FieldRef<"Prospect", 'String'>
    readonly freeSessionsCompleted: FieldRef<"Prospect", 'Int'>
    readonly absences: FieldRef<"Prospect", 'Int'>
    readonly createdAt: FieldRef<"Prospect", 'DateTime'>
    readonly updatedAt: FieldRef<"Prospect", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prospect findUnique
   */
  export type ProspectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * Filter, which Prospect to fetch.
     */
    where: ProspectWhereUniqueInput
  }

  /**
   * Prospect findUniqueOrThrow
   */
  export type ProspectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * Filter, which Prospect to fetch.
     */
    where: ProspectWhereUniqueInput
  }

  /**
   * Prospect findFirst
   */
  export type ProspectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * Filter, which Prospect to fetch.
     */
    where?: ProspectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prospects to fetch.
     */
    orderBy?: ProspectOrderByWithRelationInput | ProspectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prospects.
     */
    cursor?: ProspectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prospects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prospects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prospects.
     */
    distinct?: ProspectScalarFieldEnum | ProspectScalarFieldEnum[]
  }

  /**
   * Prospect findFirstOrThrow
   */
  export type ProspectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * Filter, which Prospect to fetch.
     */
    where?: ProspectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prospects to fetch.
     */
    orderBy?: ProspectOrderByWithRelationInput | ProspectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prospects.
     */
    cursor?: ProspectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prospects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prospects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prospects.
     */
    distinct?: ProspectScalarFieldEnum | ProspectScalarFieldEnum[]
  }

  /**
   * Prospect findMany
   */
  export type ProspectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * Filter, which Prospects to fetch.
     */
    where?: ProspectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prospects to fetch.
     */
    orderBy?: ProspectOrderByWithRelationInput | ProspectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prospects.
     */
    cursor?: ProspectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prospects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prospects.
     */
    skip?: number
    distinct?: ProspectScalarFieldEnum | ProspectScalarFieldEnum[]
  }

  /**
   * Prospect create
   */
  export type ProspectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * The data needed to create a Prospect.
     */
    data: XOR<ProspectCreateInput, ProspectUncheckedCreateInput>
  }

  /**
   * Prospect createMany
   */
  export type ProspectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prospects.
     */
    data: ProspectCreateManyInput | ProspectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prospect createManyAndReturn
   */
  export type ProspectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * The data used to create many Prospects.
     */
    data: ProspectCreateManyInput | ProspectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prospect update
   */
  export type ProspectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * The data needed to update a Prospect.
     */
    data: XOR<ProspectUpdateInput, ProspectUncheckedUpdateInput>
    /**
     * Choose, which Prospect to update.
     */
    where: ProspectWhereUniqueInput
  }

  /**
   * Prospect updateMany
   */
  export type ProspectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prospects.
     */
    data: XOR<ProspectUpdateManyMutationInput, ProspectUncheckedUpdateManyInput>
    /**
     * Filter which Prospects to update
     */
    where?: ProspectWhereInput
    /**
     * Limit how many Prospects to update.
     */
    limit?: number
  }

  /**
   * Prospect updateManyAndReturn
   */
  export type ProspectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * The data used to update Prospects.
     */
    data: XOR<ProspectUpdateManyMutationInput, ProspectUncheckedUpdateManyInput>
    /**
     * Filter which Prospects to update
     */
    where?: ProspectWhereInput
    /**
     * Limit how many Prospects to update.
     */
    limit?: number
  }

  /**
   * Prospect upsert
   */
  export type ProspectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * The filter to search for the Prospect to update in case it exists.
     */
    where: ProspectWhereUniqueInput
    /**
     * In case the Prospect found by the `where` argument doesn't exist, create a new Prospect with this data.
     */
    create: XOR<ProspectCreateInput, ProspectUncheckedCreateInput>
    /**
     * In case the Prospect was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProspectUpdateInput, ProspectUncheckedUpdateInput>
  }

  /**
   * Prospect delete
   */
  export type ProspectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
    /**
     * Filter which Prospect to delete.
     */
    where: ProspectWhereUniqueInput
  }

  /**
   * Prospect deleteMany
   */
  export type ProspectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prospects to delete
     */
    where?: ProspectWhereInput
    /**
     * Limit how many Prospects to delete.
     */
    limit?: number
  }

  /**
   * Prospect without action
   */
  export type ProspectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prospect
     */
    select?: ProspectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prospect
     */
    omit?: ProspectOmit<ExtArgs> | null
  }


  /**
   * Model Candidate
   */

  export type AggregateCandidate = {
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  export type CandidateAvgAggregateOutputType = {
    age: number | null
  }

  export type CandidateSumAggregateOutputType = {
    age: number | null
  }

  export type CandidateMinAggregateOutputType = {
    id: string | null
    candidateCode: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    age: number | null
    occupation: $Enums.Occupation | null
    giftCode: string | null
    observation: $Enums.Observation | null
    action: string | null
    status: $Enums.CandidateStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateMaxAggregateOutputType = {
    id: string | null
    candidateCode: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    age: number | null
    occupation: $Enums.Occupation | null
    giftCode: string | null
    observation: $Enums.Observation | null
    action: string | null
    status: $Enums.CandidateStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateCountAggregateOutputType = {
    id: number
    candidateCode: number
    firstName: number
    lastName: number
    email: number
    phone: number
    age: number
    occupation: number
    giftCode: number
    observation: number
    contact: number
    action: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CandidateAvgAggregateInputType = {
    age?: true
  }

  export type CandidateSumAggregateInputType = {
    age?: true
  }

  export type CandidateMinAggregateInputType = {
    id?: true
    candidateCode?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    age?: true
    occupation?: true
    giftCode?: true
    observation?: true
    action?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateMaxAggregateInputType = {
    id?: true
    candidateCode?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    age?: true
    occupation?: true
    giftCode?: true
    observation?: true
    action?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateCountAggregateInputType = {
    id?: true
    candidateCode?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    age?: true
    occupation?: true
    giftCode?: true
    observation?: true
    contact?: true
    action?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CandidateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidate to aggregate.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candidates
    **/
    _count?: true | CandidateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandidateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandidateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidateMaxAggregateInputType
  }

  export type GetCandidateAggregateType<T extends CandidateAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidate[P]>
      : GetScalarType<T[P], AggregateCandidate[P]>
  }




  export type CandidateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithAggregationInput | CandidateOrderByWithAggregationInput[]
    by: CandidateScalarFieldEnum[] | CandidateScalarFieldEnum
    having?: CandidateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidateCountAggregateInputType | true
    _avg?: CandidateAvgAggregateInputType
    _sum?: CandidateSumAggregateInputType
    _min?: CandidateMinAggregateInputType
    _max?: CandidateMaxAggregateInputType
  }

  export type CandidateGroupByOutputType = {
    id: string
    candidateCode: string
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode: string | null
    observation: $Enums.Observation
    contact: string[]
    action: string | null
    status: $Enums.CandidateStatus
    createdAt: Date
    updatedAt: Date
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  type GetCandidateGroupByPayload<T extends CandidateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidateGroupByOutputType[P]>
            : GetScalarType<T[P], CandidateGroupByOutputType[P]>
        }
      >
    >


  export type CandidateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCode?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    age?: boolean
    occupation?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscriptions?: boolean | Candidate$inscriptionsArgs<ExtArgs>
    inscriptionCandidates?: boolean | Candidate$inscriptionCandidatesArgs<ExtArgs>
    payments?: boolean | Candidate$paymentsArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCode?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    age?: boolean
    occupation?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    candidateCode?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    age?: boolean
    occupation?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectScalar = {
    id?: boolean
    candidateCode?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    age?: boolean
    occupation?: boolean
    giftCode?: boolean
    observation?: boolean
    contact?: boolean
    action?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CandidateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "candidateCode" | "firstName" | "lastName" | "email" | "phone" | "age" | "occupation" | "giftCode" | "observation" | "contact" | "action" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["candidate"]>
  export type CandidateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | Candidate$inscriptionsArgs<ExtArgs>
    inscriptionCandidates?: boolean | Candidate$inscriptionCandidatesArgs<ExtArgs>
    payments?: boolean | Candidate$paymentsArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CandidateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CandidatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candidate"
    objects: {
      inscriptions: Prisma.$InscriptionPayload<ExtArgs>[]
      inscriptionCandidates: Prisma.$InscriptionCandidatePayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      candidateCode: string
      firstName: string
      lastName: string
      email: string | null
      phone: string | null
      age: number
      occupation: $Enums.Occupation
      giftCode: string | null
      observation: $Enums.Observation
      contact: string[]
      action: string | null
      status: $Enums.CandidateStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["candidate"]>
    composites: {}
  }

  type CandidateGetPayload<S extends boolean | null | undefined | CandidateDefaultArgs> = $Result.GetResult<Prisma.$CandidatePayload, S>

  type CandidateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidateCountAggregateInputType | true
    }

  export interface CandidateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candidate'], meta: { name: 'Candidate' } }
    /**
     * Find zero or one Candidate that matches the filter.
     * @param {CandidateFindUniqueArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidateFindUniqueArgs>(args: SelectSubset<T, CandidateFindUniqueArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidateFindUniqueOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidateFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidateFindFirstArgs>(args?: SelectSubset<T, CandidateFindFirstArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidateFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidates
     * const candidates = await prisma.candidate.findMany()
     * 
     * // Get first 10 Candidates
     * const candidates = await prisma.candidate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidateWithIdOnly = await prisma.candidate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidateFindManyArgs>(args?: SelectSubset<T, CandidateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidate.
     * @param {CandidateCreateArgs} args - Arguments to create a Candidate.
     * @example
     * // Create one Candidate
     * const Candidate = await prisma.candidate.create({
     *   data: {
     *     // ... data to create a Candidate
     *   }
     * })
     * 
     */
    create<T extends CandidateCreateArgs>(args: SelectSubset<T, CandidateCreateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidates.
     * @param {CandidateCreateManyArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidateCreateManyArgs>(args?: SelectSubset<T, CandidateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Candidates and returns the data saved in the database.
     * @param {CandidateCreateManyAndReturnArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandidateCreateManyAndReturnArgs>(args?: SelectSubset<T, CandidateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Candidate.
     * @param {CandidateDeleteArgs} args - Arguments to delete one Candidate.
     * @example
     * // Delete one Candidate
     * const Candidate = await prisma.candidate.delete({
     *   where: {
     *     // ... filter to delete one Candidate
     *   }
     * })
     * 
     */
    delete<T extends CandidateDeleteArgs>(args: SelectSubset<T, CandidateDeleteArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidate.
     * @param {CandidateUpdateArgs} args - Arguments to update one Candidate.
     * @example
     * // Update one Candidate
     * const candidate = await prisma.candidate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidateUpdateArgs>(args: SelectSubset<T, CandidateUpdateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidates.
     * @param {CandidateDeleteManyArgs} args - Arguments to filter Candidates to delete.
     * @example
     * // Delete a few Candidates
     * const { count } = await prisma.candidate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidateDeleteManyArgs>(args?: SelectSubset<T, CandidateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidateUpdateManyArgs>(args: SelectSubset<T, CandidateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates and returns the data updated in the database.
     * @param {CandidateUpdateManyAndReturnArgs} args - Arguments to update many Candidates.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CandidateUpdateManyAndReturnArgs>(args: SelectSubset<T, CandidateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Candidate.
     * @param {CandidateUpsertArgs} args - Arguments to update or create a Candidate.
     * @example
     * // Update or create a Candidate
     * const candidate = await prisma.candidate.upsert({
     *   create: {
     *     // ... data to create a Candidate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidate we want to update
     *   }
     * })
     */
    upsert<T extends CandidateUpsertArgs>(args: SelectSubset<T, CandidateUpsertArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCountArgs} args - Arguments to filter Candidates to count.
     * @example
     * // Count the number of Candidates
     * const count = await prisma.candidate.count({
     *   where: {
     *     // ... the filter for the Candidates we want to count
     *   }
     * })
    **/
    count<T extends CandidateCountArgs>(
      args?: Subset<T, CandidateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandidateAggregateArgs>(args: Subset<T, CandidateAggregateArgs>): Prisma.PrismaPromise<GetCandidateAggregateType<T>>

    /**
     * Group by Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandidateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidateGroupByArgs['orderBy'] }
        : { orderBy?: CandidateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandidateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candidate model
   */
  readonly fields: CandidateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candidate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscriptions<T extends Candidate$inscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$inscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inscriptionCandidates<T extends Candidate$inscriptionCandidatesArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$inscriptionCandidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Candidate$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Candidate model
   */
  interface CandidateFieldRefs {
    readonly id: FieldRef<"Candidate", 'String'>
    readonly candidateCode: FieldRef<"Candidate", 'String'>
    readonly firstName: FieldRef<"Candidate", 'String'>
    readonly lastName: FieldRef<"Candidate", 'String'>
    readonly email: FieldRef<"Candidate", 'String'>
    readonly phone: FieldRef<"Candidate", 'String'>
    readonly age: FieldRef<"Candidate", 'Int'>
    readonly occupation: FieldRef<"Candidate", 'Occupation'>
    readonly giftCode: FieldRef<"Candidate", 'String'>
    readonly observation: FieldRef<"Candidate", 'Observation'>
    readonly contact: FieldRef<"Candidate", 'String[]'>
    readonly action: FieldRef<"Candidate", 'String'>
    readonly status: FieldRef<"Candidate", 'CandidateStatus'>
    readonly createdAt: FieldRef<"Candidate", 'DateTime'>
    readonly updatedAt: FieldRef<"Candidate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Candidate findUnique
   */
  export type CandidateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findUniqueOrThrow
   */
  export type CandidateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findFirst
   */
  export type CandidateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findFirstOrThrow
   */
  export type CandidateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findMany
   */
  export type CandidateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidates to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate create
   */
  export type CandidateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to create a Candidate.
     */
    data: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
  }

  /**
   * Candidate createMany
   */
  export type CandidateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candidate createManyAndReturn
   */
  export type CandidateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candidate update
   */
  export type CandidateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to update a Candidate.
     */
    data: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
    /**
     * Choose, which Candidate to update.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate updateMany
   */
  export type CandidateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
  }

  /**
   * Candidate updateManyAndReturn
   */
  export type CandidateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
  }

  /**
   * Candidate upsert
   */
  export type CandidateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The filter to search for the Candidate to update in case it exists.
     */
    where: CandidateWhereUniqueInput
    /**
     * In case the Candidate found by the `where` argument doesn't exist, create a new Candidate with this data.
     */
    create: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
    /**
     * In case the Candidate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
  }

  /**
   * Candidate delete
   */
  export type CandidateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter which Candidate to delete.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate deleteMany
   */
  export type CandidateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidates to delete
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to delete.
     */
    limit?: number
  }

  /**
   * Candidate.inscriptions
   */
  export type Candidate$inscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    where?: InscriptionWhereInput
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    cursor?: InscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Candidate.inscriptionCandidates
   */
  export type Candidate$inscriptionCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    where?: InscriptionCandidateWhereInput
    orderBy?: InscriptionCandidateOrderByWithRelationInput | InscriptionCandidateOrderByWithRelationInput[]
    cursor?: InscriptionCandidateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscriptionCandidateScalarFieldEnum | InscriptionCandidateScalarFieldEnum[]
  }

  /**
   * Candidate.payments
   */
  export type Candidate$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Candidate without action
   */
  export type CandidateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
  }


  /**
   * Model Formation
   */

  export type AggregateFormation = {
    _count: FormationCountAggregateOutputType | null
    _avg: FormationAvgAggregateOutputType | null
    _sum: FormationSumAggregateOutputType | null
    _min: FormationMinAggregateOutputType | null
    _max: FormationMaxAggregateOutputType | null
  }

  export type FormationAvgAggregateOutputType = {
    duration: number | null
    totalSessions: number | null
    prix: Decimal | null
    volumeHoraire: number | null
  }

  export type FormationSumAggregateOutputType = {
    duration: number | null
    totalSessions: number | null
    prix: Decimal | null
    volumeHoraire: number | null
  }

  export type FormationMinAggregateOutputType = {
    id: string | null
    matiere: string | null
    niveau: string | null
    type: string | null
    duration: number | null
    totalSessions: number | null
    prix: Decimal | null
    volumeHoraire: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormationMaxAggregateOutputType = {
    id: string | null
    matiere: string | null
    niveau: string | null
    type: string | null
    duration: number | null
    totalSessions: number | null
    prix: Decimal | null
    volumeHoraire: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormationCountAggregateOutputType = {
    id: number
    matiere: number
    niveau: number
    type: number
    duration: number
    totalSessions: number
    prix: number
    volumeHoraire: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FormationAvgAggregateInputType = {
    duration?: true
    totalSessions?: true
    prix?: true
    volumeHoraire?: true
  }

  export type FormationSumAggregateInputType = {
    duration?: true
    totalSessions?: true
    prix?: true
    volumeHoraire?: true
  }

  export type FormationMinAggregateInputType = {
    id?: true
    matiere?: true
    niveau?: true
    type?: true
    duration?: true
    totalSessions?: true
    prix?: true
    volumeHoraire?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormationMaxAggregateInputType = {
    id?: true
    matiere?: true
    niveau?: true
    type?: true
    duration?: true
    totalSessions?: true
    prix?: true
    volumeHoraire?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormationCountAggregateInputType = {
    id?: true
    matiere?: true
    niveau?: true
    type?: true
    duration?: true
    totalSessions?: true
    prix?: true
    volumeHoraire?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FormationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formation to aggregate.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Formations
    **/
    _count?: true | FormationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormationMaxAggregateInputType
  }

  export type GetFormationAggregateType<T extends FormationAggregateArgs> = {
        [P in keyof T & keyof AggregateFormation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormation[P]>
      : GetScalarType<T[P], AggregateFormation[P]>
  }




  export type FormationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormationWhereInput
    orderBy?: FormationOrderByWithAggregationInput | FormationOrderByWithAggregationInput[]
    by: FormationScalarFieldEnum[] | FormationScalarFieldEnum
    having?: FormationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormationCountAggregateInputType | true
    _avg?: FormationAvgAggregateInputType
    _sum?: FormationSumAggregateInputType
    _min?: FormationMinAggregateInputType
    _max?: FormationMaxAggregateInputType
  }

  export type FormationGroupByOutputType = {
    id: string
    matiere: string
    niveau: string
    type: string
    duration: number
    totalSessions: number
    prix: Decimal
    volumeHoraire: number
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: FormationCountAggregateOutputType | null
    _avg: FormationAvgAggregateOutputType | null
    _sum: FormationSumAggregateOutputType | null
    _min: FormationMinAggregateOutputType | null
    _max: FormationMaxAggregateOutputType | null
  }

  type GetFormationGroupByPayload<T extends FormationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormationGroupByOutputType[P]>
            : GetScalarType<T[P], FormationGroupByOutputType[P]>
        }
      >
    >


  export type FormationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matiere?: boolean
    niveau?: boolean
    type?: boolean
    duration?: boolean
    totalSessions?: boolean
    prix?: boolean
    volumeHoraire?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscriptions?: boolean | Formation$inscriptionsArgs<ExtArgs>
    payments?: boolean | Formation$paymentsArgs<ExtArgs>
    _count?: boolean | FormationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formation"]>

  export type FormationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matiere?: boolean
    niveau?: boolean
    type?: boolean
    duration?: boolean
    totalSessions?: boolean
    prix?: boolean
    volumeHoraire?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formation"]>

  export type FormationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matiere?: boolean
    niveau?: boolean
    type?: boolean
    duration?: boolean
    totalSessions?: boolean
    prix?: boolean
    volumeHoraire?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formation"]>

  export type FormationSelectScalar = {
    id?: boolean
    matiere?: boolean
    niveau?: boolean
    type?: boolean
    duration?: boolean
    totalSessions?: boolean
    prix?: boolean
    volumeHoraire?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FormationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matiere" | "niveau" | "type" | "duration" | "totalSessions" | "prix" | "volumeHoraire" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["formation"]>
  export type FormationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | Formation$inscriptionsArgs<ExtArgs>
    payments?: boolean | Formation$paymentsArgs<ExtArgs>
    _count?: boolean | FormationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FormationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FormationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FormationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Formation"
    objects: {
      inscriptions: Prisma.$InscriptionPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matiere: string
      niveau: string
      type: string
      duration: number
      totalSessions: number
      prix: Prisma.Decimal
      volumeHoraire: number
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["formation"]>
    composites: {}
  }

  type FormationGetPayload<S extends boolean | null | undefined | FormationDefaultArgs> = $Result.GetResult<Prisma.$FormationPayload, S>

  type FormationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormationCountAggregateInputType | true
    }

  export interface FormationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Formation'], meta: { name: 'Formation' } }
    /**
     * Find zero or one Formation that matches the filter.
     * @param {FormationFindUniqueArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormationFindUniqueArgs>(args: SelectSubset<T, FormationFindUniqueArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Formation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormationFindUniqueOrThrowArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormationFindUniqueOrThrowArgs>(args: SelectSubset<T, FormationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationFindFirstArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormationFindFirstArgs>(args?: SelectSubset<T, FormationFindFirstArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationFindFirstOrThrowArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormationFindFirstOrThrowArgs>(args?: SelectSubset<T, FormationFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Formations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Formations
     * const formations = await prisma.formation.findMany()
     * 
     * // Get first 10 Formations
     * const formations = await prisma.formation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formationWithIdOnly = await prisma.formation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormationFindManyArgs>(args?: SelectSubset<T, FormationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Formation.
     * @param {FormationCreateArgs} args - Arguments to create a Formation.
     * @example
     * // Create one Formation
     * const Formation = await prisma.formation.create({
     *   data: {
     *     // ... data to create a Formation
     *   }
     * })
     * 
     */
    create<T extends FormationCreateArgs>(args: SelectSubset<T, FormationCreateArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Formations.
     * @param {FormationCreateManyArgs} args - Arguments to create many Formations.
     * @example
     * // Create many Formations
     * const formation = await prisma.formation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormationCreateManyArgs>(args?: SelectSubset<T, FormationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Formations and returns the data saved in the database.
     * @param {FormationCreateManyAndReturnArgs} args - Arguments to create many Formations.
     * @example
     * // Create many Formations
     * const formation = await prisma.formation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Formations and only return the `id`
     * const formationWithIdOnly = await prisma.formation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormationCreateManyAndReturnArgs>(args?: SelectSubset<T, FormationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Formation.
     * @param {FormationDeleteArgs} args - Arguments to delete one Formation.
     * @example
     * // Delete one Formation
     * const Formation = await prisma.formation.delete({
     *   where: {
     *     // ... filter to delete one Formation
     *   }
     * })
     * 
     */
    delete<T extends FormationDeleteArgs>(args: SelectSubset<T, FormationDeleteArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Formation.
     * @param {FormationUpdateArgs} args - Arguments to update one Formation.
     * @example
     * // Update one Formation
     * const formation = await prisma.formation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormationUpdateArgs>(args: SelectSubset<T, FormationUpdateArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Formations.
     * @param {FormationDeleteManyArgs} args - Arguments to filter Formations to delete.
     * @example
     * // Delete a few Formations
     * const { count } = await prisma.formation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormationDeleteManyArgs>(args?: SelectSubset<T, FormationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Formations
     * const formation = await prisma.formation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormationUpdateManyArgs>(args: SelectSubset<T, FormationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formations and returns the data updated in the database.
     * @param {FormationUpdateManyAndReturnArgs} args - Arguments to update many Formations.
     * @example
     * // Update many Formations
     * const formation = await prisma.formation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Formations and only return the `id`
     * const formationWithIdOnly = await prisma.formation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormationUpdateManyAndReturnArgs>(args: SelectSubset<T, FormationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Formation.
     * @param {FormationUpsertArgs} args - Arguments to update or create a Formation.
     * @example
     * // Update or create a Formation
     * const formation = await prisma.formation.upsert({
     *   create: {
     *     // ... data to create a Formation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Formation we want to update
     *   }
     * })
     */
    upsert<T extends FormationUpsertArgs>(args: SelectSubset<T, FormationUpsertArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationCountArgs} args - Arguments to filter Formations to count.
     * @example
     * // Count the number of Formations
     * const count = await prisma.formation.count({
     *   where: {
     *     // ... the filter for the Formations we want to count
     *   }
     * })
    **/
    count<T extends FormationCountArgs>(
      args?: Subset<T, FormationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormationAggregateArgs>(args: Subset<T, FormationAggregateArgs>): Prisma.PrismaPromise<GetFormationAggregateType<T>>

    /**
     * Group by Formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormationGroupByArgs['orderBy'] }
        : { orderBy?: FormationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Formation model
   */
  readonly fields: FormationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Formation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscriptions<T extends Formation$inscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Formation$inscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Formation$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Formation$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Formation model
   */
  interface FormationFieldRefs {
    readonly id: FieldRef<"Formation", 'String'>
    readonly matiere: FieldRef<"Formation", 'String'>
    readonly niveau: FieldRef<"Formation", 'String'>
    readonly type: FieldRef<"Formation", 'String'>
    readonly duration: FieldRef<"Formation", 'Int'>
    readonly totalSessions: FieldRef<"Formation", 'Int'>
    readonly prix: FieldRef<"Formation", 'Decimal'>
    readonly volumeHoraire: FieldRef<"Formation", 'Int'>
    readonly description: FieldRef<"Formation", 'String'>
    readonly createdAt: FieldRef<"Formation", 'DateTime'>
    readonly updatedAt: FieldRef<"Formation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Formation findUnique
   */
  export type FormationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation findUniqueOrThrow
   */
  export type FormationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation findFirst
   */
  export type FormationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formations.
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formations.
     */
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * Formation findFirstOrThrow
   */
  export type FormationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formations.
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formations.
     */
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * Formation findMany
   */
  export type FormationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formations to fetch.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Formations.
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * Formation create
   */
  export type FormationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * The data needed to create a Formation.
     */
    data: XOR<FormationCreateInput, FormationUncheckedCreateInput>
  }

  /**
   * Formation createMany
   */
  export type FormationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Formations.
     */
    data: FormationCreateManyInput | FormationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Formation createManyAndReturn
   */
  export type FormationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * The data used to create many Formations.
     */
    data: FormationCreateManyInput | FormationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Formation update
   */
  export type FormationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * The data needed to update a Formation.
     */
    data: XOR<FormationUpdateInput, FormationUncheckedUpdateInput>
    /**
     * Choose, which Formation to update.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation updateMany
   */
  export type FormationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Formations.
     */
    data: XOR<FormationUpdateManyMutationInput, FormationUncheckedUpdateManyInput>
    /**
     * Filter which Formations to update
     */
    where?: FormationWhereInput
    /**
     * Limit how many Formations to update.
     */
    limit?: number
  }

  /**
   * Formation updateManyAndReturn
   */
  export type FormationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * The data used to update Formations.
     */
    data: XOR<FormationUpdateManyMutationInput, FormationUncheckedUpdateManyInput>
    /**
     * Filter which Formations to update
     */
    where?: FormationWhereInput
    /**
     * Limit how many Formations to update.
     */
    limit?: number
  }

  /**
   * Formation upsert
   */
  export type FormationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * The filter to search for the Formation to update in case it exists.
     */
    where: FormationWhereUniqueInput
    /**
     * In case the Formation found by the `where` argument doesn't exist, create a new Formation with this data.
     */
    create: XOR<FormationCreateInput, FormationUncheckedCreateInput>
    /**
     * In case the Formation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormationUpdateInput, FormationUncheckedUpdateInput>
  }

  /**
   * Formation delete
   */
  export type FormationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter which Formation to delete.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation deleteMany
   */
  export type FormationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formations to delete
     */
    where?: FormationWhereInput
    /**
     * Limit how many Formations to delete.
     */
    limit?: number
  }

  /**
   * Formation.inscriptions
   */
  export type Formation$inscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    where?: InscriptionWhereInput
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    cursor?: InscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Formation.payments
   */
  export type Formation$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Formation without action
   */
  export type FormationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    capacite: number | null
  }

  export type RoomSumAggregateOutputType = {
    capacite: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    numero: string | null
    capacite: number | null
    type: string | null
    available: boolean | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    capacite: number | null
    type: string | null
    available: boolean | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    numero: number
    capacite: number
    type: number
    available: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    capacite?: true
  }

  export type RoomSumAggregateInputType = {
    capacite?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    numero?: true
    capacite?: true
    type?: true
    available?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    numero?: true
    capacite?: true
    type?: true
    available?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    numero?: true
    capacite?: true
    type?: true
    available?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    numero: string
    capacite: number
    type: string
    available: boolean
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    capacite?: boolean
    type?: boolean
    available?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reservations?: boolean | Room$reservationsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    capacite?: boolean
    type?: boolean
    available?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    capacite?: boolean
    type?: boolean
    available?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    numero?: boolean
    capacite?: boolean
    type?: boolean
    available?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "capacite" | "type" | "available" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservations?: boolean | Room$reservationsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      reservations: Prisma.$ReservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      capacite: number
      type: string
      available: boolean
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservations<T extends Room$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, Room$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly numero: FieldRef<"Room", 'String'>
    readonly capacite: FieldRef<"Room", 'Int'>
    readonly type: FieldRef<"Room", 'String'>
    readonly available: FieldRef<"Room", 'Boolean'>
    readonly description: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.reservations
   */
  export type Room$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    cursor?: ReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model Professor
   */

  export type AggregateProfessor = {
    _count: ProfessorCountAggregateOutputType | null
    _avg: ProfessorAvgAggregateOutputType | null
    _sum: ProfessorSumAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  export type ProfessorAvgAggregateOutputType = {
    maxSessions: number | null
  }

  export type ProfessorSumAggregateOutputType = {
    maxSessions: number | null
  }

  export type ProfessorMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    adresse: string | null
    type: string | null
    dayOff: string | null
    maxSessions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessorMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    adresse: string | null
    type: string | null
    dayOff: string | null
    maxSessions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessorCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    telephone: number
    adresse: number
    type: number
    dayOff: number
    maxSessions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessorAvgAggregateInputType = {
    maxSessions?: true
  }

  export type ProfessorSumAggregateInputType = {
    maxSessions?: true
  }

  export type ProfessorMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    adresse?: true
    type?: true
    dayOff?: true
    maxSessions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessorMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    adresse?: true
    type?: true
    dayOff?: true
    maxSessions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessorCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    adresse?: true
    type?: true
    dayOff?: true
    maxSessions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professor to aggregate.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Professors
    **/
    _count?: true | ProfessorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessorMaxAggregateInputType
  }

  export type GetProfessorAggregateType<T extends ProfessorAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessor[P]>
      : GetScalarType<T[P], AggregateProfessor[P]>
  }




  export type ProfessorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessorWhereInput
    orderBy?: ProfessorOrderByWithAggregationInput | ProfessorOrderByWithAggregationInput[]
    by: ProfessorScalarFieldEnum[] | ProfessorScalarFieldEnum
    having?: ProfessorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessorCountAggregateInputType | true
    _avg?: ProfessorAvgAggregateInputType
    _sum?: ProfessorSumAggregateInputType
    _min?: ProfessorMinAggregateInputType
    _max?: ProfessorMaxAggregateInputType
  }

  export type ProfessorGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string | null
    telephone: string | null
    adresse: string | null
    type: string
    dayOff: string
    maxSessions: number
    createdAt: Date
    updatedAt: Date
    _count: ProfessorCountAggregateOutputType | null
    _avg: ProfessorAvgAggregateOutputType | null
    _sum: ProfessorSumAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  type GetProfessorGroupByPayload<T extends ProfessorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
        }
      >
    >


  export type ProfessorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    type?: boolean
    dayOff?: boolean
    maxSessions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscriptions?: boolean | Professor$inscriptionsArgs<ExtArgs>
    reservations?: boolean | Professor$reservationsArgs<ExtArgs>
    _count?: boolean | ProfessorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    type?: boolean
    dayOff?: boolean
    maxSessions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    type?: boolean
    dayOff?: boolean
    maxSessions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    adresse?: boolean
    type?: boolean
    dayOff?: boolean
    maxSessions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "telephone" | "adresse" | "type" | "dayOff" | "maxSessions" | "createdAt" | "updatedAt", ExtArgs["result"]["professor"]>
  export type ProfessorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | Professor$inscriptionsArgs<ExtArgs>
    reservations?: boolean | Professor$reservationsArgs<ExtArgs>
    _count?: boolean | ProfessorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfessorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfessorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfessorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Professor"
    objects: {
      inscriptions: Prisma.$InscriptionPayload<ExtArgs>[]
      reservations: Prisma.$ReservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string | null
      telephone: string | null
      adresse: string | null
      type: string
      dayOff: string
      maxSessions: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professor"]>
    composites: {}
  }

  type ProfessorGetPayload<S extends boolean | null | undefined | ProfessorDefaultArgs> = $Result.GetResult<Prisma.$ProfessorPayload, S>

  type ProfessorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessorCountAggregateInputType | true
    }

  export interface ProfessorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Professor'], meta: { name: 'Professor' } }
    /**
     * Find zero or one Professor that matches the filter.
     * @param {ProfessorFindUniqueArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessorFindUniqueArgs>(args: SelectSubset<T, ProfessorFindUniqueArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Professor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessorFindUniqueOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessorFindFirstArgs>(args?: SelectSubset<T, ProfessorFindFirstArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Professors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Professors
     * const professors = await prisma.professor.findMany()
     * 
     * // Get first 10 Professors
     * const professors = await prisma.professor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professorWithIdOnly = await prisma.professor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessorFindManyArgs>(args?: SelectSubset<T, ProfessorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Professor.
     * @param {ProfessorCreateArgs} args - Arguments to create a Professor.
     * @example
     * // Create one Professor
     * const Professor = await prisma.professor.create({
     *   data: {
     *     // ... data to create a Professor
     *   }
     * })
     * 
     */
    create<T extends ProfessorCreateArgs>(args: SelectSubset<T, ProfessorCreateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Professors.
     * @param {ProfessorCreateManyArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessorCreateManyArgs>(args?: SelectSubset<T, ProfessorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Professors and returns the data saved in the database.
     * @param {ProfessorCreateManyAndReturnArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessorCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Professor.
     * @param {ProfessorDeleteArgs} args - Arguments to delete one Professor.
     * @example
     * // Delete one Professor
     * const Professor = await prisma.professor.delete({
     *   where: {
     *     // ... filter to delete one Professor
     *   }
     * })
     * 
     */
    delete<T extends ProfessorDeleteArgs>(args: SelectSubset<T, ProfessorDeleteArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Professor.
     * @param {ProfessorUpdateArgs} args - Arguments to update one Professor.
     * @example
     * // Update one Professor
     * const professor = await prisma.professor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessorUpdateArgs>(args: SelectSubset<T, ProfessorUpdateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Professors.
     * @param {ProfessorDeleteManyArgs} args - Arguments to filter Professors to delete.
     * @example
     * // Delete a few Professors
     * const { count } = await prisma.professor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessorDeleteManyArgs>(args?: SelectSubset<T, ProfessorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessorUpdateManyArgs>(args: SelectSubset<T, ProfessorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors and returns the data updated in the database.
     * @param {ProfessorUpdateManyAndReturnArgs} args - Arguments to update many Professors.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessorUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Professor.
     * @param {ProfessorUpsertArgs} args - Arguments to update or create a Professor.
     * @example
     * // Update or create a Professor
     * const professor = await prisma.professor.upsert({
     *   create: {
     *     // ... data to create a Professor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Professor we want to update
     *   }
     * })
     */
    upsert<T extends ProfessorUpsertArgs>(args: SelectSubset<T, ProfessorUpsertArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorCountArgs} args - Arguments to filter Professors to count.
     * @example
     * // Count the number of Professors
     * const count = await prisma.professor.count({
     *   where: {
     *     // ... the filter for the Professors we want to count
     *   }
     * })
    **/
    count<T extends ProfessorCountArgs>(
      args?: Subset<T, ProfessorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessorAggregateArgs>(args: Subset<T, ProfessorAggregateArgs>): Prisma.PrismaPromise<GetProfessorAggregateType<T>>

    /**
     * Group by Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessorGroupByArgs['orderBy'] }
        : { orderBy?: ProfessorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Professor model
   */
  readonly fields: ProfessorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Professor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscriptions<T extends Professor$inscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Professor$inscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reservations<T extends Professor$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, Professor$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Professor model
   */
  interface ProfessorFieldRefs {
    readonly id: FieldRef<"Professor", 'String'>
    readonly nom: FieldRef<"Professor", 'String'>
    readonly prenom: FieldRef<"Professor", 'String'>
    readonly email: FieldRef<"Professor", 'String'>
    readonly telephone: FieldRef<"Professor", 'String'>
    readonly adresse: FieldRef<"Professor", 'String'>
    readonly type: FieldRef<"Professor", 'String'>
    readonly dayOff: FieldRef<"Professor", 'String'>
    readonly maxSessions: FieldRef<"Professor", 'Int'>
    readonly createdAt: FieldRef<"Professor", 'DateTime'>
    readonly updatedAt: FieldRef<"Professor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Professor findUnique
   */
  export type ProfessorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findUniqueOrThrow
   */
  export type ProfessorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findFirst
   */
  export type ProfessorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findFirstOrThrow
   */
  export type ProfessorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findMany
   */
  export type ProfessorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professors to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor create
   */
  export type ProfessorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to create a Professor.
     */
    data: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
  }

  /**
   * Professor createMany
   */
  export type ProfessorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Professor createManyAndReturn
   */
  export type ProfessorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Professor update
   */
  export type ProfessorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to update a Professor.
     */
    data: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
    /**
     * Choose, which Professor to update.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor updateMany
   */
  export type ProfessorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
  }

  /**
   * Professor updateManyAndReturn
   */
  export type ProfessorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
  }

  /**
   * Professor upsert
   */
  export type ProfessorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The filter to search for the Professor to update in case it exists.
     */
    where: ProfessorWhereUniqueInput
    /**
     * In case the Professor found by the `where` argument doesn't exist, create a new Professor with this data.
     */
    create: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
    /**
     * In case the Professor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
  }

  /**
   * Professor delete
   */
  export type ProfessorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter which Professor to delete.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor deleteMany
   */
  export type ProfessorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professors to delete
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to delete.
     */
    limit?: number
  }

  /**
   * Professor.inscriptions
   */
  export type Professor$inscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    where?: InscriptionWhereInput
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    cursor?: InscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Professor.reservations
   */
  export type Professor$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    cursor?: ReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Professor without action
   */
  export type ProfessorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
  }


  /**
   * Model Inscription
   */

  export type AggregateInscription = {
    _count: InscriptionCountAggregateOutputType | null
    _avg: InscriptionAvgAggregateOutputType | null
    _sum: InscriptionSumAggregateOutputType | null
    _min: InscriptionMinAggregateOutputType | null
    _max: InscriptionMaxAggregateOutputType | null
  }

  export type InscriptionAvgAggregateOutputType = {
    duration: number | null
    price: number | null
    volumeHoraire: number | null
    remainingHours: number | null
  }

  export type InscriptionSumAggregateOutputType = {
    duration: number | null
    price: number | null
    volumeHoraire: number | null
    remainingHours: number | null
  }

  export type InscriptionMinAggregateOutputType = {
    id: string | null
    dateInscription: Date | null
    status: $Enums.InscriptionStatus | null
    note: string | null
    duration: number | null
    price: number | null
    volumeHoraire: number | null
    remainingHours: number | null
    learningMode: $Enums.LearningMode | null
    candidateId: string | null
    formationId: string | null
    professorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InscriptionMaxAggregateOutputType = {
    id: string | null
    dateInscription: Date | null
    status: $Enums.InscriptionStatus | null
    note: string | null
    duration: number | null
    price: number | null
    volumeHoraire: number | null
    remainingHours: number | null
    learningMode: $Enums.LearningMode | null
    candidateId: string | null
    formationId: string | null
    professorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InscriptionCountAggregateOutputType = {
    id: number
    dateInscription: number
    status: number
    note: number
    duration: number
    price: number
    volumeHoraire: number
    remainingHours: number
    learningMode: number
    candidateId: number
    formationId: number
    professorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InscriptionAvgAggregateInputType = {
    duration?: true
    price?: true
    volumeHoraire?: true
    remainingHours?: true
  }

  export type InscriptionSumAggregateInputType = {
    duration?: true
    price?: true
    volumeHoraire?: true
    remainingHours?: true
  }

  export type InscriptionMinAggregateInputType = {
    id?: true
    dateInscription?: true
    status?: true
    note?: true
    duration?: true
    price?: true
    volumeHoraire?: true
    remainingHours?: true
    learningMode?: true
    candidateId?: true
    formationId?: true
    professorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InscriptionMaxAggregateInputType = {
    id?: true
    dateInscription?: true
    status?: true
    note?: true
    duration?: true
    price?: true
    volumeHoraire?: true
    remainingHours?: true
    learningMode?: true
    candidateId?: true
    formationId?: true
    professorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InscriptionCountAggregateInputType = {
    id?: true
    dateInscription?: true
    status?: true
    note?: true
    duration?: true
    price?: true
    volumeHoraire?: true
    remainingHours?: true
    learningMode?: true
    candidateId?: true
    formationId?: true
    professorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscription to aggregate.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inscriptions
    **/
    _count?: true | InscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InscriptionMaxAggregateInputType
  }

  export type GetInscriptionAggregateType<T extends InscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateInscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInscription[P]>
      : GetScalarType<T[P], AggregateInscription[P]>
  }




  export type InscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionWhereInput
    orderBy?: InscriptionOrderByWithAggregationInput | InscriptionOrderByWithAggregationInput[]
    by: InscriptionScalarFieldEnum[] | InscriptionScalarFieldEnum
    having?: InscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InscriptionCountAggregateInputType | true
    _avg?: InscriptionAvgAggregateInputType
    _sum?: InscriptionSumAggregateInputType
    _min?: InscriptionMinAggregateInputType
    _max?: InscriptionMaxAggregateInputType
  }

  export type InscriptionGroupByOutputType = {
    id: string
    dateInscription: Date
    status: $Enums.InscriptionStatus
    note: string | null
    duration: number | null
    price: number | null
    volumeHoraire: number | null
    remainingHours: number
    learningMode: $Enums.LearningMode
    candidateId: string
    formationId: string
    professorId: string | null
    createdAt: Date
    updatedAt: Date
    _count: InscriptionCountAggregateOutputType | null
    _avg: InscriptionAvgAggregateOutputType | null
    _sum: InscriptionSumAggregateOutputType | null
    _min: InscriptionMinAggregateOutputType | null
    _max: InscriptionMaxAggregateOutputType | null
  }

  type GetInscriptionGroupByPayload<T extends InscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], InscriptionGroupByOutputType[P]>
        }
      >
    >


  export type InscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateInscription?: boolean
    status?: boolean
    note?: boolean
    duration?: boolean
    price?: boolean
    volumeHoraire?: boolean
    remainingHours?: boolean
    learningMode?: boolean
    candidateId?: boolean
    formationId?: boolean
    professorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
    professor?: boolean | Inscription$professorArgs<ExtArgs>
    group?: boolean | Inscription$groupArgs<ExtArgs>
    members?: boolean | Inscription$membersArgs<ExtArgs>
    reservations?: boolean | Inscription$reservationsArgs<ExtArgs>
    _count?: boolean | InscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscription"]>

  export type InscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateInscription?: boolean
    status?: boolean
    note?: boolean
    duration?: boolean
    price?: boolean
    volumeHoraire?: boolean
    remainingHours?: boolean
    learningMode?: boolean
    candidateId?: boolean
    formationId?: boolean
    professorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
    professor?: boolean | Inscription$professorArgs<ExtArgs>
  }, ExtArgs["result"]["inscription"]>

  export type InscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateInscription?: boolean
    status?: boolean
    note?: boolean
    duration?: boolean
    price?: boolean
    volumeHoraire?: boolean
    remainingHours?: boolean
    learningMode?: boolean
    candidateId?: boolean
    formationId?: boolean
    professorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
    professor?: boolean | Inscription$professorArgs<ExtArgs>
  }, ExtArgs["result"]["inscription"]>

  export type InscriptionSelectScalar = {
    id?: boolean
    dateInscription?: boolean
    status?: boolean
    note?: boolean
    duration?: boolean
    price?: boolean
    volumeHoraire?: boolean
    remainingHours?: boolean
    learningMode?: boolean
    candidateId?: boolean
    formationId?: boolean
    professorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dateInscription" | "status" | "note" | "duration" | "price" | "volumeHoraire" | "remainingHours" | "learningMode" | "candidateId" | "formationId" | "professorId" | "createdAt" | "updatedAt", ExtArgs["result"]["inscription"]>
  export type InscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
    professor?: boolean | Inscription$professorArgs<ExtArgs>
    group?: boolean | Inscription$groupArgs<ExtArgs>
    members?: boolean | Inscription$membersArgs<ExtArgs>
    reservations?: boolean | Inscription$reservationsArgs<ExtArgs>
    _count?: boolean | InscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
    professor?: boolean | Inscription$professorArgs<ExtArgs>
  }
  export type InscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
    professor?: boolean | Inscription$professorArgs<ExtArgs>
  }

  export type $InscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inscription"
    objects: {
      candidate: Prisma.$CandidatePayload<ExtArgs>
      formation: Prisma.$FormationPayload<ExtArgs>
      professor: Prisma.$ProfessorPayload<ExtArgs> | null
      group: Prisma.$GroupPayload<ExtArgs> | null
      members: Prisma.$InscriptionCandidatePayload<ExtArgs>[]
      reservations: Prisma.$ReservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dateInscription: Date
      status: $Enums.InscriptionStatus
      note: string | null
      duration: number | null
      price: number | null
      volumeHoraire: number | null
      remainingHours: number
      learningMode: $Enums.LearningMode
      candidateId: string
      formationId: string
      professorId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inscription"]>
    composites: {}
  }

  type InscriptionGetPayload<S extends boolean | null | undefined | InscriptionDefaultArgs> = $Result.GetResult<Prisma.$InscriptionPayload, S>

  type InscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InscriptionCountAggregateInputType | true
    }

  export interface InscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inscription'], meta: { name: 'Inscription' } }
    /**
     * Find zero or one Inscription that matches the filter.
     * @param {InscriptionFindUniqueArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InscriptionFindUniqueArgs>(args: SelectSubset<T, InscriptionFindUniqueArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InscriptionFindUniqueOrThrowArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, InscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionFindFirstArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InscriptionFindFirstArgs>(args?: SelectSubset<T, InscriptionFindFirstArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionFindFirstOrThrowArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, InscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inscriptions
     * const inscriptions = await prisma.inscription.findMany()
     * 
     * // Get first 10 Inscriptions
     * const inscriptions = await prisma.inscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inscriptionWithIdOnly = await prisma.inscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InscriptionFindManyArgs>(args?: SelectSubset<T, InscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inscription.
     * @param {InscriptionCreateArgs} args - Arguments to create a Inscription.
     * @example
     * // Create one Inscription
     * const Inscription = await prisma.inscription.create({
     *   data: {
     *     // ... data to create a Inscription
     *   }
     * })
     * 
     */
    create<T extends InscriptionCreateArgs>(args: SelectSubset<T, InscriptionCreateArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inscriptions.
     * @param {InscriptionCreateManyArgs} args - Arguments to create many Inscriptions.
     * @example
     * // Create many Inscriptions
     * const inscription = await prisma.inscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InscriptionCreateManyArgs>(args?: SelectSubset<T, InscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inscriptions and returns the data saved in the database.
     * @param {InscriptionCreateManyAndReturnArgs} args - Arguments to create many Inscriptions.
     * @example
     * // Create many Inscriptions
     * const inscription = await prisma.inscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inscriptions and only return the `id`
     * const inscriptionWithIdOnly = await prisma.inscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, InscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inscription.
     * @param {InscriptionDeleteArgs} args - Arguments to delete one Inscription.
     * @example
     * // Delete one Inscription
     * const Inscription = await prisma.inscription.delete({
     *   where: {
     *     // ... filter to delete one Inscription
     *   }
     * })
     * 
     */
    delete<T extends InscriptionDeleteArgs>(args: SelectSubset<T, InscriptionDeleteArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inscription.
     * @param {InscriptionUpdateArgs} args - Arguments to update one Inscription.
     * @example
     * // Update one Inscription
     * const inscription = await prisma.inscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InscriptionUpdateArgs>(args: SelectSubset<T, InscriptionUpdateArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inscriptions.
     * @param {InscriptionDeleteManyArgs} args - Arguments to filter Inscriptions to delete.
     * @example
     * // Delete a few Inscriptions
     * const { count } = await prisma.inscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InscriptionDeleteManyArgs>(args?: SelectSubset<T, InscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inscriptions
     * const inscription = await prisma.inscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InscriptionUpdateManyArgs>(args: SelectSubset<T, InscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscriptions and returns the data updated in the database.
     * @param {InscriptionUpdateManyAndReturnArgs} args - Arguments to update many Inscriptions.
     * @example
     * // Update many Inscriptions
     * const inscription = await prisma.inscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inscriptions and only return the `id`
     * const inscriptionWithIdOnly = await prisma.inscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, InscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inscription.
     * @param {InscriptionUpsertArgs} args - Arguments to update or create a Inscription.
     * @example
     * // Update or create a Inscription
     * const inscription = await prisma.inscription.upsert({
     *   create: {
     *     // ... data to create a Inscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inscription we want to update
     *   }
     * })
     */
    upsert<T extends InscriptionUpsertArgs>(args: SelectSubset<T, InscriptionUpsertArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCountArgs} args - Arguments to filter Inscriptions to count.
     * @example
     * // Count the number of Inscriptions
     * const count = await prisma.inscription.count({
     *   where: {
     *     // ... the filter for the Inscriptions we want to count
     *   }
     * })
    **/
    count<T extends InscriptionCountArgs>(
      args?: Subset<T, InscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InscriptionAggregateArgs>(args: Subset<T, InscriptionAggregateArgs>): Prisma.PrismaPromise<GetInscriptionAggregateType<T>>

    /**
     * Group by Inscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InscriptionGroupByArgs['orderBy'] }
        : { orderBy?: InscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inscription model
   */
  readonly fields: InscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidate<T extends CandidateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateDefaultArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    formation<T extends FormationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormationDefaultArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professor<T extends Inscription$professorArgs<ExtArgs> = {}>(args?: Subset<T, Inscription$professorArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    group<T extends Inscription$groupArgs<ExtArgs> = {}>(args?: Subset<T, Inscription$groupArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    members<T extends Inscription$membersArgs<ExtArgs> = {}>(args?: Subset<T, Inscription$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reservations<T extends Inscription$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, Inscription$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inscription model
   */
  interface InscriptionFieldRefs {
    readonly id: FieldRef<"Inscription", 'String'>
    readonly dateInscription: FieldRef<"Inscription", 'DateTime'>
    readonly status: FieldRef<"Inscription", 'InscriptionStatus'>
    readonly note: FieldRef<"Inscription", 'String'>
    readonly duration: FieldRef<"Inscription", 'Int'>
    readonly price: FieldRef<"Inscription", 'Float'>
    readonly volumeHoraire: FieldRef<"Inscription", 'Int'>
    readonly remainingHours: FieldRef<"Inscription", 'Float'>
    readonly learningMode: FieldRef<"Inscription", 'LearningMode'>
    readonly candidateId: FieldRef<"Inscription", 'String'>
    readonly formationId: FieldRef<"Inscription", 'String'>
    readonly professorId: FieldRef<"Inscription", 'String'>
    readonly createdAt: FieldRef<"Inscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Inscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inscription findUnique
   */
  export type InscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription findUniqueOrThrow
   */
  export type InscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription findFirst
   */
  export type InscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscriptions.
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscriptions.
     */
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Inscription findFirstOrThrow
   */
  export type InscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscriptions.
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscriptions.
     */
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Inscription findMany
   */
  export type InscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscriptions to fetch.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inscriptions.
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Inscription create
   */
  export type InscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Inscription.
     */
    data: XOR<InscriptionCreateInput, InscriptionUncheckedCreateInput>
  }

  /**
   * Inscription createMany
   */
  export type InscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inscriptions.
     */
    data: InscriptionCreateManyInput | InscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inscription createManyAndReturn
   */
  export type InscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Inscriptions.
     */
    data: InscriptionCreateManyInput | InscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscription update
   */
  export type InscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Inscription.
     */
    data: XOR<InscriptionUpdateInput, InscriptionUncheckedUpdateInput>
    /**
     * Choose, which Inscription to update.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription updateMany
   */
  export type InscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inscriptions.
     */
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Inscriptions to update
     */
    where?: InscriptionWhereInput
    /**
     * Limit how many Inscriptions to update.
     */
    limit?: number
  }

  /**
   * Inscription updateManyAndReturn
   */
  export type InscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Inscriptions.
     */
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Inscriptions to update
     */
    where?: InscriptionWhereInput
    /**
     * Limit how many Inscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscription upsert
   */
  export type InscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Inscription to update in case it exists.
     */
    where: InscriptionWhereUniqueInput
    /**
     * In case the Inscription found by the `where` argument doesn't exist, create a new Inscription with this data.
     */
    create: XOR<InscriptionCreateInput, InscriptionUncheckedCreateInput>
    /**
     * In case the Inscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InscriptionUpdateInput, InscriptionUncheckedUpdateInput>
  }

  /**
   * Inscription delete
   */
  export type InscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter which Inscription to delete.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription deleteMany
   */
  export type InscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscriptions to delete
     */
    where?: InscriptionWhereInput
    /**
     * Limit how many Inscriptions to delete.
     */
    limit?: number
  }

  /**
   * Inscription.professor
   */
  export type Inscription$professorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    where?: ProfessorWhereInput
  }

  /**
   * Inscription.group
   */
  export type Inscription$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
  }

  /**
   * Inscription.members
   */
  export type Inscription$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    where?: InscriptionCandidateWhereInput
    orderBy?: InscriptionCandidateOrderByWithRelationInput | InscriptionCandidateOrderByWithRelationInput[]
    cursor?: InscriptionCandidateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscriptionCandidateScalarFieldEnum | InscriptionCandidateScalarFieldEnum[]
  }

  /**
   * Inscription.reservations
   */
  export type Inscription$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    cursor?: ReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Inscription without action
   */
  export type InscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    nom: string | null
    inscriptionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    inscriptionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    nom: number
    inscriptionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    nom?: true
    inscriptionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    nom?: true
    inscriptionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    nom?: true
    inscriptionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    nom: string
    inscriptionId: string
    createdAt: Date
    updatedAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    inscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    inscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    inscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    nom?: boolean
    inscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "inscriptionId" | "createdAt" | "updatedAt", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
  }
  export type GroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
  }

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      inscription: Prisma.$InscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      inscriptionId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscription<T extends InscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InscriptionDefaultArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly nom: FieldRef<"Group", 'String'>
    readonly inscriptionId: FieldRef<"Group", 'String'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
    readonly updatedAt: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group updateManyAndReturn
   */
  export type GroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model InscriptionCandidate
   */

  export type AggregateInscriptionCandidate = {
    _count: InscriptionCandidateCountAggregateOutputType | null
    _min: InscriptionCandidateMinAggregateOutputType | null
    _max: InscriptionCandidateMaxAggregateOutputType | null
  }

  export type InscriptionCandidateMinAggregateOutputType = {
    id: string | null
    inscriptionId: string | null
    candidateId: string | null
    createdAt: Date | null
  }

  export type InscriptionCandidateMaxAggregateOutputType = {
    id: string | null
    inscriptionId: string | null
    candidateId: string | null
    createdAt: Date | null
  }

  export type InscriptionCandidateCountAggregateOutputType = {
    id: number
    inscriptionId: number
    candidateId: number
    createdAt: number
    _all: number
  }


  export type InscriptionCandidateMinAggregateInputType = {
    id?: true
    inscriptionId?: true
    candidateId?: true
    createdAt?: true
  }

  export type InscriptionCandidateMaxAggregateInputType = {
    id?: true
    inscriptionId?: true
    candidateId?: true
    createdAt?: true
  }

  export type InscriptionCandidateCountAggregateInputType = {
    id?: true
    inscriptionId?: true
    candidateId?: true
    createdAt?: true
    _all?: true
  }

  export type InscriptionCandidateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InscriptionCandidate to aggregate.
     */
    where?: InscriptionCandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InscriptionCandidates to fetch.
     */
    orderBy?: InscriptionCandidateOrderByWithRelationInput | InscriptionCandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InscriptionCandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InscriptionCandidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InscriptionCandidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InscriptionCandidates
    **/
    _count?: true | InscriptionCandidateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InscriptionCandidateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InscriptionCandidateMaxAggregateInputType
  }

  export type GetInscriptionCandidateAggregateType<T extends InscriptionCandidateAggregateArgs> = {
        [P in keyof T & keyof AggregateInscriptionCandidate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInscriptionCandidate[P]>
      : GetScalarType<T[P], AggregateInscriptionCandidate[P]>
  }




  export type InscriptionCandidateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionCandidateWhereInput
    orderBy?: InscriptionCandidateOrderByWithAggregationInput | InscriptionCandidateOrderByWithAggregationInput[]
    by: InscriptionCandidateScalarFieldEnum[] | InscriptionCandidateScalarFieldEnum
    having?: InscriptionCandidateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InscriptionCandidateCountAggregateInputType | true
    _min?: InscriptionCandidateMinAggregateInputType
    _max?: InscriptionCandidateMaxAggregateInputType
  }

  export type InscriptionCandidateGroupByOutputType = {
    id: string
    inscriptionId: string
    candidateId: string
    createdAt: Date
    _count: InscriptionCandidateCountAggregateOutputType | null
    _min: InscriptionCandidateMinAggregateOutputType | null
    _max: InscriptionCandidateMaxAggregateOutputType | null
  }

  type GetInscriptionCandidateGroupByPayload<T extends InscriptionCandidateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InscriptionCandidateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InscriptionCandidateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InscriptionCandidateGroupByOutputType[P]>
            : GetScalarType<T[P], InscriptionCandidateGroupByOutputType[P]>
        }
      >
    >


  export type InscriptionCandidateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inscriptionId?: boolean
    candidateId?: boolean
    createdAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscriptionCandidate"]>

  export type InscriptionCandidateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inscriptionId?: boolean
    candidateId?: boolean
    createdAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscriptionCandidate"]>

  export type InscriptionCandidateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inscriptionId?: boolean
    candidateId?: boolean
    createdAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscriptionCandidate"]>

  export type InscriptionCandidateSelectScalar = {
    id?: boolean
    inscriptionId?: boolean
    candidateId?: boolean
    createdAt?: boolean
  }

  export type InscriptionCandidateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inscriptionId" | "candidateId" | "createdAt", ExtArgs["result"]["inscriptionCandidate"]>
  export type InscriptionCandidateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }
  export type InscriptionCandidateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }
  export type InscriptionCandidateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
  }

  export type $InscriptionCandidatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InscriptionCandidate"
    objects: {
      inscription: Prisma.$InscriptionPayload<ExtArgs>
      candidate: Prisma.$CandidatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inscriptionId: string
      candidateId: string
      createdAt: Date
    }, ExtArgs["result"]["inscriptionCandidate"]>
    composites: {}
  }

  type InscriptionCandidateGetPayload<S extends boolean | null | undefined | InscriptionCandidateDefaultArgs> = $Result.GetResult<Prisma.$InscriptionCandidatePayload, S>

  type InscriptionCandidateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InscriptionCandidateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InscriptionCandidateCountAggregateInputType | true
    }

  export interface InscriptionCandidateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InscriptionCandidate'], meta: { name: 'InscriptionCandidate' } }
    /**
     * Find zero or one InscriptionCandidate that matches the filter.
     * @param {InscriptionCandidateFindUniqueArgs} args - Arguments to find a InscriptionCandidate
     * @example
     * // Get one InscriptionCandidate
     * const inscriptionCandidate = await prisma.inscriptionCandidate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InscriptionCandidateFindUniqueArgs>(args: SelectSubset<T, InscriptionCandidateFindUniqueArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InscriptionCandidate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InscriptionCandidateFindUniqueOrThrowArgs} args - Arguments to find a InscriptionCandidate
     * @example
     * // Get one InscriptionCandidate
     * const inscriptionCandidate = await prisma.inscriptionCandidate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InscriptionCandidateFindUniqueOrThrowArgs>(args: SelectSubset<T, InscriptionCandidateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InscriptionCandidate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCandidateFindFirstArgs} args - Arguments to find a InscriptionCandidate
     * @example
     * // Get one InscriptionCandidate
     * const inscriptionCandidate = await prisma.inscriptionCandidate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InscriptionCandidateFindFirstArgs>(args?: SelectSubset<T, InscriptionCandidateFindFirstArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InscriptionCandidate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCandidateFindFirstOrThrowArgs} args - Arguments to find a InscriptionCandidate
     * @example
     * // Get one InscriptionCandidate
     * const inscriptionCandidate = await prisma.inscriptionCandidate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InscriptionCandidateFindFirstOrThrowArgs>(args?: SelectSubset<T, InscriptionCandidateFindFirstOrThrowArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InscriptionCandidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCandidateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InscriptionCandidates
     * const inscriptionCandidates = await prisma.inscriptionCandidate.findMany()
     * 
     * // Get first 10 InscriptionCandidates
     * const inscriptionCandidates = await prisma.inscriptionCandidate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inscriptionCandidateWithIdOnly = await prisma.inscriptionCandidate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InscriptionCandidateFindManyArgs>(args?: SelectSubset<T, InscriptionCandidateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InscriptionCandidate.
     * @param {InscriptionCandidateCreateArgs} args - Arguments to create a InscriptionCandidate.
     * @example
     * // Create one InscriptionCandidate
     * const InscriptionCandidate = await prisma.inscriptionCandidate.create({
     *   data: {
     *     // ... data to create a InscriptionCandidate
     *   }
     * })
     * 
     */
    create<T extends InscriptionCandidateCreateArgs>(args: SelectSubset<T, InscriptionCandidateCreateArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InscriptionCandidates.
     * @param {InscriptionCandidateCreateManyArgs} args - Arguments to create many InscriptionCandidates.
     * @example
     * // Create many InscriptionCandidates
     * const inscriptionCandidate = await prisma.inscriptionCandidate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InscriptionCandidateCreateManyArgs>(args?: SelectSubset<T, InscriptionCandidateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InscriptionCandidates and returns the data saved in the database.
     * @param {InscriptionCandidateCreateManyAndReturnArgs} args - Arguments to create many InscriptionCandidates.
     * @example
     * // Create many InscriptionCandidates
     * const inscriptionCandidate = await prisma.inscriptionCandidate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InscriptionCandidates and only return the `id`
     * const inscriptionCandidateWithIdOnly = await prisma.inscriptionCandidate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InscriptionCandidateCreateManyAndReturnArgs>(args?: SelectSubset<T, InscriptionCandidateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InscriptionCandidate.
     * @param {InscriptionCandidateDeleteArgs} args - Arguments to delete one InscriptionCandidate.
     * @example
     * // Delete one InscriptionCandidate
     * const InscriptionCandidate = await prisma.inscriptionCandidate.delete({
     *   where: {
     *     // ... filter to delete one InscriptionCandidate
     *   }
     * })
     * 
     */
    delete<T extends InscriptionCandidateDeleteArgs>(args: SelectSubset<T, InscriptionCandidateDeleteArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InscriptionCandidate.
     * @param {InscriptionCandidateUpdateArgs} args - Arguments to update one InscriptionCandidate.
     * @example
     * // Update one InscriptionCandidate
     * const inscriptionCandidate = await prisma.inscriptionCandidate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InscriptionCandidateUpdateArgs>(args: SelectSubset<T, InscriptionCandidateUpdateArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InscriptionCandidates.
     * @param {InscriptionCandidateDeleteManyArgs} args - Arguments to filter InscriptionCandidates to delete.
     * @example
     * // Delete a few InscriptionCandidates
     * const { count } = await prisma.inscriptionCandidate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InscriptionCandidateDeleteManyArgs>(args?: SelectSubset<T, InscriptionCandidateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InscriptionCandidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCandidateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InscriptionCandidates
     * const inscriptionCandidate = await prisma.inscriptionCandidate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InscriptionCandidateUpdateManyArgs>(args: SelectSubset<T, InscriptionCandidateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InscriptionCandidates and returns the data updated in the database.
     * @param {InscriptionCandidateUpdateManyAndReturnArgs} args - Arguments to update many InscriptionCandidates.
     * @example
     * // Update many InscriptionCandidates
     * const inscriptionCandidate = await prisma.inscriptionCandidate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InscriptionCandidates and only return the `id`
     * const inscriptionCandidateWithIdOnly = await prisma.inscriptionCandidate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InscriptionCandidateUpdateManyAndReturnArgs>(args: SelectSubset<T, InscriptionCandidateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InscriptionCandidate.
     * @param {InscriptionCandidateUpsertArgs} args - Arguments to update or create a InscriptionCandidate.
     * @example
     * // Update or create a InscriptionCandidate
     * const inscriptionCandidate = await prisma.inscriptionCandidate.upsert({
     *   create: {
     *     // ... data to create a InscriptionCandidate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InscriptionCandidate we want to update
     *   }
     * })
     */
    upsert<T extends InscriptionCandidateUpsertArgs>(args: SelectSubset<T, InscriptionCandidateUpsertArgs<ExtArgs>>): Prisma__InscriptionCandidateClient<$Result.GetResult<Prisma.$InscriptionCandidatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InscriptionCandidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCandidateCountArgs} args - Arguments to filter InscriptionCandidates to count.
     * @example
     * // Count the number of InscriptionCandidates
     * const count = await prisma.inscriptionCandidate.count({
     *   where: {
     *     // ... the filter for the InscriptionCandidates we want to count
     *   }
     * })
    **/
    count<T extends InscriptionCandidateCountArgs>(
      args?: Subset<T, InscriptionCandidateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InscriptionCandidateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InscriptionCandidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCandidateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InscriptionCandidateAggregateArgs>(args: Subset<T, InscriptionCandidateAggregateArgs>): Prisma.PrismaPromise<GetInscriptionCandidateAggregateType<T>>

    /**
     * Group by InscriptionCandidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCandidateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InscriptionCandidateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InscriptionCandidateGroupByArgs['orderBy'] }
        : { orderBy?: InscriptionCandidateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InscriptionCandidateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInscriptionCandidateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InscriptionCandidate model
   */
  readonly fields: InscriptionCandidateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InscriptionCandidate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InscriptionCandidateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscription<T extends InscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InscriptionDefaultArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    candidate<T extends CandidateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateDefaultArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InscriptionCandidate model
   */
  interface InscriptionCandidateFieldRefs {
    readonly id: FieldRef<"InscriptionCandidate", 'String'>
    readonly inscriptionId: FieldRef<"InscriptionCandidate", 'String'>
    readonly candidateId: FieldRef<"InscriptionCandidate", 'String'>
    readonly createdAt: FieldRef<"InscriptionCandidate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InscriptionCandidate findUnique
   */
  export type InscriptionCandidateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * Filter, which InscriptionCandidate to fetch.
     */
    where: InscriptionCandidateWhereUniqueInput
  }

  /**
   * InscriptionCandidate findUniqueOrThrow
   */
  export type InscriptionCandidateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * Filter, which InscriptionCandidate to fetch.
     */
    where: InscriptionCandidateWhereUniqueInput
  }

  /**
   * InscriptionCandidate findFirst
   */
  export type InscriptionCandidateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * Filter, which InscriptionCandidate to fetch.
     */
    where?: InscriptionCandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InscriptionCandidates to fetch.
     */
    orderBy?: InscriptionCandidateOrderByWithRelationInput | InscriptionCandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InscriptionCandidates.
     */
    cursor?: InscriptionCandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InscriptionCandidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InscriptionCandidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InscriptionCandidates.
     */
    distinct?: InscriptionCandidateScalarFieldEnum | InscriptionCandidateScalarFieldEnum[]
  }

  /**
   * InscriptionCandidate findFirstOrThrow
   */
  export type InscriptionCandidateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * Filter, which InscriptionCandidate to fetch.
     */
    where?: InscriptionCandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InscriptionCandidates to fetch.
     */
    orderBy?: InscriptionCandidateOrderByWithRelationInput | InscriptionCandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InscriptionCandidates.
     */
    cursor?: InscriptionCandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InscriptionCandidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InscriptionCandidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InscriptionCandidates.
     */
    distinct?: InscriptionCandidateScalarFieldEnum | InscriptionCandidateScalarFieldEnum[]
  }

  /**
   * InscriptionCandidate findMany
   */
  export type InscriptionCandidateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * Filter, which InscriptionCandidates to fetch.
     */
    where?: InscriptionCandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InscriptionCandidates to fetch.
     */
    orderBy?: InscriptionCandidateOrderByWithRelationInput | InscriptionCandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InscriptionCandidates.
     */
    cursor?: InscriptionCandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InscriptionCandidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InscriptionCandidates.
     */
    skip?: number
    distinct?: InscriptionCandidateScalarFieldEnum | InscriptionCandidateScalarFieldEnum[]
  }

  /**
   * InscriptionCandidate create
   */
  export type InscriptionCandidateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * The data needed to create a InscriptionCandidate.
     */
    data: XOR<InscriptionCandidateCreateInput, InscriptionCandidateUncheckedCreateInput>
  }

  /**
   * InscriptionCandidate createMany
   */
  export type InscriptionCandidateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InscriptionCandidates.
     */
    data: InscriptionCandidateCreateManyInput | InscriptionCandidateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InscriptionCandidate createManyAndReturn
   */
  export type InscriptionCandidateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * The data used to create many InscriptionCandidates.
     */
    data: InscriptionCandidateCreateManyInput | InscriptionCandidateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InscriptionCandidate update
   */
  export type InscriptionCandidateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * The data needed to update a InscriptionCandidate.
     */
    data: XOR<InscriptionCandidateUpdateInput, InscriptionCandidateUncheckedUpdateInput>
    /**
     * Choose, which InscriptionCandidate to update.
     */
    where: InscriptionCandidateWhereUniqueInput
  }

  /**
   * InscriptionCandidate updateMany
   */
  export type InscriptionCandidateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InscriptionCandidates.
     */
    data: XOR<InscriptionCandidateUpdateManyMutationInput, InscriptionCandidateUncheckedUpdateManyInput>
    /**
     * Filter which InscriptionCandidates to update
     */
    where?: InscriptionCandidateWhereInput
    /**
     * Limit how many InscriptionCandidates to update.
     */
    limit?: number
  }

  /**
   * InscriptionCandidate updateManyAndReturn
   */
  export type InscriptionCandidateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * The data used to update InscriptionCandidates.
     */
    data: XOR<InscriptionCandidateUpdateManyMutationInput, InscriptionCandidateUncheckedUpdateManyInput>
    /**
     * Filter which InscriptionCandidates to update
     */
    where?: InscriptionCandidateWhereInput
    /**
     * Limit how many InscriptionCandidates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InscriptionCandidate upsert
   */
  export type InscriptionCandidateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * The filter to search for the InscriptionCandidate to update in case it exists.
     */
    where: InscriptionCandidateWhereUniqueInput
    /**
     * In case the InscriptionCandidate found by the `where` argument doesn't exist, create a new InscriptionCandidate with this data.
     */
    create: XOR<InscriptionCandidateCreateInput, InscriptionCandidateUncheckedCreateInput>
    /**
     * In case the InscriptionCandidate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InscriptionCandidateUpdateInput, InscriptionCandidateUncheckedUpdateInput>
  }

  /**
   * InscriptionCandidate delete
   */
  export type InscriptionCandidateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
    /**
     * Filter which InscriptionCandidate to delete.
     */
    where: InscriptionCandidateWhereUniqueInput
  }

  /**
   * InscriptionCandidate deleteMany
   */
  export type InscriptionCandidateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InscriptionCandidates to delete
     */
    where?: InscriptionCandidateWhereInput
    /**
     * Limit how many InscriptionCandidates to delete.
     */
    limit?: number
  }

  /**
   * InscriptionCandidate without action
   */
  export type InscriptionCandidateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InscriptionCandidate
     */
    select?: InscriptionCandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InscriptionCandidate
     */
    omit?: InscriptionCandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionCandidateInclude<ExtArgs> | null
  }


  /**
   * Model Commercial
   */

  export type AggregateCommercial = {
    _count: CommercialCountAggregateOutputType | null
    _min: CommercialMinAggregateOutputType | null
    _max: CommercialMaxAggregateOutputType | null
  }

  export type CommercialMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    action: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommercialMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    action: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommercialCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    phone: number
    email: number
    action: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommercialMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    action?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommercialMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    action?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommercialCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    action?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommercialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commercial to aggregate.
     */
    where?: CommercialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commercials to fetch.
     */
    orderBy?: CommercialOrderByWithRelationInput | CommercialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommercialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commercials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commercials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commercials
    **/
    _count?: true | CommercialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommercialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommercialMaxAggregateInputType
  }

  export type GetCommercialAggregateType<T extends CommercialAggregateArgs> = {
        [P in keyof T & keyof AggregateCommercial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommercial[P]>
      : GetScalarType<T[P], AggregateCommercial[P]>
  }




  export type CommercialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommercialWhereInput
    orderBy?: CommercialOrderByWithAggregationInput | CommercialOrderByWithAggregationInput[]
    by: CommercialScalarFieldEnum[] | CommercialScalarFieldEnum
    having?: CommercialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommercialCountAggregateInputType | true
    _min?: CommercialMinAggregateInputType
    _max?: CommercialMaxAggregateInputType
  }

  export type CommercialGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    action: string
    createdAt: Date
    updatedAt: Date
    _count: CommercialCountAggregateOutputType | null
    _min: CommercialMinAggregateOutputType | null
    _max: CommercialMaxAggregateOutputType | null
  }

  type GetCommercialGroupByPayload<T extends CommercialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommercialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommercialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommercialGroupByOutputType[P]>
            : GetScalarType<T[P], CommercialGroupByOutputType[P]>
        }
      >
    >


  export type CommercialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    action?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commercial"]>

  export type CommercialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    action?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commercial"]>

  export type CommercialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    action?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commercial"]>

  export type CommercialSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    action?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommercialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "phone" | "email" | "action" | "createdAt" | "updatedAt", ExtArgs["result"]["commercial"]>

  export type $CommercialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commercial"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      phone: string
      email: string
      action: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["commercial"]>
    composites: {}
  }

  type CommercialGetPayload<S extends boolean | null | undefined | CommercialDefaultArgs> = $Result.GetResult<Prisma.$CommercialPayload, S>

  type CommercialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommercialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommercialCountAggregateInputType | true
    }

  export interface CommercialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commercial'], meta: { name: 'Commercial' } }
    /**
     * Find zero or one Commercial that matches the filter.
     * @param {CommercialFindUniqueArgs} args - Arguments to find a Commercial
     * @example
     * // Get one Commercial
     * const commercial = await prisma.commercial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommercialFindUniqueArgs>(args: SelectSubset<T, CommercialFindUniqueArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Commercial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommercialFindUniqueOrThrowArgs} args - Arguments to find a Commercial
     * @example
     * // Get one Commercial
     * const commercial = await prisma.commercial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommercialFindUniqueOrThrowArgs>(args: SelectSubset<T, CommercialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commercial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommercialFindFirstArgs} args - Arguments to find a Commercial
     * @example
     * // Get one Commercial
     * const commercial = await prisma.commercial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommercialFindFirstArgs>(args?: SelectSubset<T, CommercialFindFirstArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commercial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommercialFindFirstOrThrowArgs} args - Arguments to find a Commercial
     * @example
     * // Get one Commercial
     * const commercial = await prisma.commercial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommercialFindFirstOrThrowArgs>(args?: SelectSubset<T, CommercialFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commercials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommercialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commercials
     * const commercials = await prisma.commercial.findMany()
     * 
     * // Get first 10 Commercials
     * const commercials = await prisma.commercial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commercialWithIdOnly = await prisma.commercial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommercialFindManyArgs>(args?: SelectSubset<T, CommercialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Commercial.
     * @param {CommercialCreateArgs} args - Arguments to create a Commercial.
     * @example
     * // Create one Commercial
     * const Commercial = await prisma.commercial.create({
     *   data: {
     *     // ... data to create a Commercial
     *   }
     * })
     * 
     */
    create<T extends CommercialCreateArgs>(args: SelectSubset<T, CommercialCreateArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commercials.
     * @param {CommercialCreateManyArgs} args - Arguments to create many Commercials.
     * @example
     * // Create many Commercials
     * const commercial = await prisma.commercial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommercialCreateManyArgs>(args?: SelectSubset<T, CommercialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commercials and returns the data saved in the database.
     * @param {CommercialCreateManyAndReturnArgs} args - Arguments to create many Commercials.
     * @example
     * // Create many Commercials
     * const commercial = await prisma.commercial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commercials and only return the `id`
     * const commercialWithIdOnly = await prisma.commercial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommercialCreateManyAndReturnArgs>(args?: SelectSubset<T, CommercialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Commercial.
     * @param {CommercialDeleteArgs} args - Arguments to delete one Commercial.
     * @example
     * // Delete one Commercial
     * const Commercial = await prisma.commercial.delete({
     *   where: {
     *     // ... filter to delete one Commercial
     *   }
     * })
     * 
     */
    delete<T extends CommercialDeleteArgs>(args: SelectSubset<T, CommercialDeleteArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Commercial.
     * @param {CommercialUpdateArgs} args - Arguments to update one Commercial.
     * @example
     * // Update one Commercial
     * const commercial = await prisma.commercial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommercialUpdateArgs>(args: SelectSubset<T, CommercialUpdateArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commercials.
     * @param {CommercialDeleteManyArgs} args - Arguments to filter Commercials to delete.
     * @example
     * // Delete a few Commercials
     * const { count } = await prisma.commercial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommercialDeleteManyArgs>(args?: SelectSubset<T, CommercialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commercials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommercialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commercials
     * const commercial = await prisma.commercial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommercialUpdateManyArgs>(args: SelectSubset<T, CommercialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commercials and returns the data updated in the database.
     * @param {CommercialUpdateManyAndReturnArgs} args - Arguments to update many Commercials.
     * @example
     * // Update many Commercials
     * const commercial = await prisma.commercial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commercials and only return the `id`
     * const commercialWithIdOnly = await prisma.commercial.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommercialUpdateManyAndReturnArgs>(args: SelectSubset<T, CommercialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Commercial.
     * @param {CommercialUpsertArgs} args - Arguments to update or create a Commercial.
     * @example
     * // Update or create a Commercial
     * const commercial = await prisma.commercial.upsert({
     *   create: {
     *     // ... data to create a Commercial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commercial we want to update
     *   }
     * })
     */
    upsert<T extends CommercialUpsertArgs>(args: SelectSubset<T, CommercialUpsertArgs<ExtArgs>>): Prisma__CommercialClient<$Result.GetResult<Prisma.$CommercialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commercials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommercialCountArgs} args - Arguments to filter Commercials to count.
     * @example
     * // Count the number of Commercials
     * const count = await prisma.commercial.count({
     *   where: {
     *     // ... the filter for the Commercials we want to count
     *   }
     * })
    **/
    count<T extends CommercialCountArgs>(
      args?: Subset<T, CommercialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommercialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commercial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommercialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommercialAggregateArgs>(args: Subset<T, CommercialAggregateArgs>): Prisma.PrismaPromise<GetCommercialAggregateType<T>>

    /**
     * Group by Commercial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommercialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommercialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommercialGroupByArgs['orderBy'] }
        : { orderBy?: CommercialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommercialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommercialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commercial model
   */
  readonly fields: CommercialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commercial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommercialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Commercial model
   */
  interface CommercialFieldRefs {
    readonly id: FieldRef<"Commercial", 'String'>
    readonly firstName: FieldRef<"Commercial", 'String'>
    readonly lastName: FieldRef<"Commercial", 'String'>
    readonly phone: FieldRef<"Commercial", 'String'>
    readonly email: FieldRef<"Commercial", 'String'>
    readonly action: FieldRef<"Commercial", 'String'>
    readonly createdAt: FieldRef<"Commercial", 'DateTime'>
    readonly updatedAt: FieldRef<"Commercial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Commercial findUnique
   */
  export type CommercialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * Filter, which Commercial to fetch.
     */
    where: CommercialWhereUniqueInput
  }

  /**
   * Commercial findUniqueOrThrow
   */
  export type CommercialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * Filter, which Commercial to fetch.
     */
    where: CommercialWhereUniqueInput
  }

  /**
   * Commercial findFirst
   */
  export type CommercialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * Filter, which Commercial to fetch.
     */
    where?: CommercialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commercials to fetch.
     */
    orderBy?: CommercialOrderByWithRelationInput | CommercialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commercials.
     */
    cursor?: CommercialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commercials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commercials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commercials.
     */
    distinct?: CommercialScalarFieldEnum | CommercialScalarFieldEnum[]
  }

  /**
   * Commercial findFirstOrThrow
   */
  export type CommercialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * Filter, which Commercial to fetch.
     */
    where?: CommercialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commercials to fetch.
     */
    orderBy?: CommercialOrderByWithRelationInput | CommercialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commercials.
     */
    cursor?: CommercialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commercials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commercials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commercials.
     */
    distinct?: CommercialScalarFieldEnum | CommercialScalarFieldEnum[]
  }

  /**
   * Commercial findMany
   */
  export type CommercialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * Filter, which Commercials to fetch.
     */
    where?: CommercialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commercials to fetch.
     */
    orderBy?: CommercialOrderByWithRelationInput | CommercialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commercials.
     */
    cursor?: CommercialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commercials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commercials.
     */
    skip?: number
    distinct?: CommercialScalarFieldEnum | CommercialScalarFieldEnum[]
  }

  /**
   * Commercial create
   */
  export type CommercialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * The data needed to create a Commercial.
     */
    data: XOR<CommercialCreateInput, CommercialUncheckedCreateInput>
  }

  /**
   * Commercial createMany
   */
  export type CommercialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commercials.
     */
    data: CommercialCreateManyInput | CommercialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commercial createManyAndReturn
   */
  export type CommercialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * The data used to create many Commercials.
     */
    data: CommercialCreateManyInput | CommercialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commercial update
   */
  export type CommercialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * The data needed to update a Commercial.
     */
    data: XOR<CommercialUpdateInput, CommercialUncheckedUpdateInput>
    /**
     * Choose, which Commercial to update.
     */
    where: CommercialWhereUniqueInput
  }

  /**
   * Commercial updateMany
   */
  export type CommercialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commercials.
     */
    data: XOR<CommercialUpdateManyMutationInput, CommercialUncheckedUpdateManyInput>
    /**
     * Filter which Commercials to update
     */
    where?: CommercialWhereInput
    /**
     * Limit how many Commercials to update.
     */
    limit?: number
  }

  /**
   * Commercial updateManyAndReturn
   */
  export type CommercialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * The data used to update Commercials.
     */
    data: XOR<CommercialUpdateManyMutationInput, CommercialUncheckedUpdateManyInput>
    /**
     * Filter which Commercials to update
     */
    where?: CommercialWhereInput
    /**
     * Limit how many Commercials to update.
     */
    limit?: number
  }

  /**
   * Commercial upsert
   */
  export type CommercialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * The filter to search for the Commercial to update in case it exists.
     */
    where: CommercialWhereUniqueInput
    /**
     * In case the Commercial found by the `where` argument doesn't exist, create a new Commercial with this data.
     */
    create: XOR<CommercialCreateInput, CommercialUncheckedCreateInput>
    /**
     * In case the Commercial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommercialUpdateInput, CommercialUncheckedUpdateInput>
  }

  /**
   * Commercial delete
   */
  export type CommercialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
    /**
     * Filter which Commercial to delete.
     */
    where: CommercialWhereUniqueInput
  }

  /**
   * Commercial deleteMany
   */
  export type CommercialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commercials to delete
     */
    where?: CommercialWhereInput
    /**
     * Limit how many Commercials to delete.
     */
    limit?: number
  }

  /**
   * Commercial without action
   */
  export type CommercialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commercial
     */
    select?: CommercialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commercial
     */
    omit?: CommercialOmit<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    paymentCode: string | null
    candidateId: string | null
    formationId: string | null
    amount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    status: $Enums.PaymentStatus | null
    paymentDate: Date | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    paymentCode: string | null
    candidateId: string | null
    formationId: string | null
    amount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    status: $Enums.PaymentStatus | null
    paymentDate: Date | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    paymentCode: number
    candidateId: number
    formationId: number
    amount: number
    paymentMethod: number
    status: number
    paymentDate: number
    note: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    paymentCode?: true
    candidateId?: true
    formationId?: true
    amount?: true
    paymentMethod?: true
    status?: true
    paymentDate?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    paymentCode?: true
    candidateId?: true
    formationId?: true
    amount?: true
    paymentMethod?: true
    status?: true
    paymentDate?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    paymentCode?: true
    candidateId?: true
    formationId?: true
    amount?: true
    paymentMethod?: true
    status?: true
    paymentDate?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    paymentCode: string
    candidateId: string
    formationId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate: Date
    note: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentCode?: boolean
    candidateId?: boolean
    formationId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentDate?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentCode?: boolean
    candidateId?: boolean
    formationId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentDate?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentCode?: boolean
    candidateId?: boolean
    formationId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentDate?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    paymentCode?: boolean
    candidateId?: boolean
    formationId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentDate?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paymentCode" | "candidateId" | "formationId" | "amount" | "paymentMethod" | "status" | "paymentDate" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      candidate: Prisma.$CandidatePayload<ExtArgs>
      formation: Prisma.$FormationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paymentCode: string
      candidateId: string
      formationId: string
      amount: number
      paymentMethod: $Enums.PaymentMethod
      status: $Enums.PaymentStatus
      paymentDate: Date
      note: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidate<T extends CandidateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateDefaultArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    formation<T extends FormationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormationDefaultArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly paymentCode: FieldRef<"Payment", 'String'>
    readonly candidateId: FieldRef<"Payment", 'String'>
    readonly formationId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly paymentMethod: FieldRef<"Payment", 'PaymentMethod'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly paymentDate: FieldRef<"Payment", 'DateTime'>
    readonly note: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Reservation
   */

  export type AggregateReservation = {
    _count: ReservationCountAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  export type ReservationMinAggregateOutputType = {
    id: string | null
    reservationCode: string | null
    reservationDate: Date | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.ReservationStatus | null
    inscriptionId: string | null
    professorId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReservationMaxAggregateOutputType = {
    id: string | null
    reservationCode: string | null
    reservationDate: Date | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.ReservationStatus | null
    inscriptionId: string | null
    professorId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReservationCountAggregateOutputType = {
    id: number
    reservationCode: number
    reservationDate: number
    startTime: number
    endTime: number
    status: number
    inscriptionId: number
    professorId: number
    roomId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReservationMinAggregateInputType = {
    id?: true
    reservationCode?: true
    reservationDate?: true
    startTime?: true
    endTime?: true
    status?: true
    inscriptionId?: true
    professorId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReservationMaxAggregateInputType = {
    id?: true
    reservationCode?: true
    reservationDate?: true
    startTime?: true
    endTime?: true
    status?: true
    inscriptionId?: true
    professorId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReservationCountAggregateInputType = {
    id?: true
    reservationCode?: true
    reservationDate?: true
    startTime?: true
    endTime?: true
    status?: true
    inscriptionId?: true
    professorId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reservation to aggregate.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reservations
    **/
    _count?: true | ReservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservationMaxAggregateInputType
  }

  export type GetReservationAggregateType<T extends ReservationAggregateArgs> = {
        [P in keyof T & keyof AggregateReservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReservation[P]>
      : GetScalarType<T[P], AggregateReservation[P]>
  }




  export type ReservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithAggregationInput | ReservationOrderByWithAggregationInput[]
    by: ReservationScalarFieldEnum[] | ReservationScalarFieldEnum
    having?: ReservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservationCountAggregateInputType | true
    _min?: ReservationMinAggregateInputType
    _max?: ReservationMaxAggregateInputType
  }

  export type ReservationGroupByOutputType = {
    id: string
    reservationCode: string
    reservationDate: Date
    startTime: Date
    endTime: Date
    status: $Enums.ReservationStatus
    inscriptionId: string
    professorId: string
    roomId: string
    createdAt: Date
    updatedAt: Date
    _count: ReservationCountAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  type GetReservationGroupByPayload<T extends ReservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservationGroupByOutputType[P]>
            : GetScalarType<T[P], ReservationGroupByOutputType[P]>
        }
      >
    >


  export type ReservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reservationCode?: boolean
    reservationDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    inscriptionId?: boolean
    professorId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reservationCode?: boolean
    reservationDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    inscriptionId?: boolean
    professorId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reservationCode?: boolean
    reservationDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    inscriptionId?: boolean
    professorId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectScalar = {
    id?: boolean
    reservationCode?: boolean
    reservationDate?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    inscriptionId?: boolean
    professorId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReservationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reservationCode" | "reservationDate" | "startTime" | "endTime" | "status" | "inscriptionId" | "professorId" | "roomId" | "createdAt" | "updatedAt", ExtArgs["result"]["reservation"]>
  export type ReservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type ReservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type ReservationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscription?: boolean | InscriptionDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $ReservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reservation"
    objects: {
      inscription: Prisma.$InscriptionPayload<ExtArgs>
      professor: Prisma.$ProfessorPayload<ExtArgs>
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reservationCode: string
      reservationDate: Date
      startTime: Date
      endTime: Date
      status: $Enums.ReservationStatus
      inscriptionId: string
      professorId: string
      roomId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reservation"]>
    composites: {}
  }

  type ReservationGetPayload<S extends boolean | null | undefined | ReservationDefaultArgs> = $Result.GetResult<Prisma.$ReservationPayload, S>

  type ReservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReservationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReservationCountAggregateInputType | true
    }

  export interface ReservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reservation'], meta: { name: 'Reservation' } }
    /**
     * Find zero or one Reservation that matches the filter.
     * @param {ReservationFindUniqueArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReservationFindUniqueArgs>(args: SelectSubset<T, ReservationFindUniqueArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reservation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReservationFindUniqueOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReservationFindUniqueOrThrowArgs>(args: SelectSubset<T, ReservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindFirstArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReservationFindFirstArgs>(args?: SelectSubset<T, ReservationFindFirstArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindFirstOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReservationFindFirstOrThrowArgs>(args?: SelectSubset<T, ReservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reservations
     * const reservations = await prisma.reservation.findMany()
     * 
     * // Get first 10 Reservations
     * const reservations = await prisma.reservation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reservationWithIdOnly = await prisma.reservation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReservationFindManyArgs>(args?: SelectSubset<T, ReservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reservation.
     * @param {ReservationCreateArgs} args - Arguments to create a Reservation.
     * @example
     * // Create one Reservation
     * const Reservation = await prisma.reservation.create({
     *   data: {
     *     // ... data to create a Reservation
     *   }
     * })
     * 
     */
    create<T extends ReservationCreateArgs>(args: SelectSubset<T, ReservationCreateArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reservations.
     * @param {ReservationCreateManyArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReservationCreateManyArgs>(args?: SelectSubset<T, ReservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reservations and returns the data saved in the database.
     * @param {ReservationCreateManyAndReturnArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reservations and only return the `id`
     * const reservationWithIdOnly = await prisma.reservation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReservationCreateManyAndReturnArgs>(args?: SelectSubset<T, ReservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reservation.
     * @param {ReservationDeleteArgs} args - Arguments to delete one Reservation.
     * @example
     * // Delete one Reservation
     * const Reservation = await prisma.reservation.delete({
     *   where: {
     *     // ... filter to delete one Reservation
     *   }
     * })
     * 
     */
    delete<T extends ReservationDeleteArgs>(args: SelectSubset<T, ReservationDeleteArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reservation.
     * @param {ReservationUpdateArgs} args - Arguments to update one Reservation.
     * @example
     * // Update one Reservation
     * const reservation = await prisma.reservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReservationUpdateArgs>(args: SelectSubset<T, ReservationUpdateArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reservations.
     * @param {ReservationDeleteManyArgs} args - Arguments to filter Reservations to delete.
     * @example
     * // Delete a few Reservations
     * const { count } = await prisma.reservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReservationDeleteManyArgs>(args?: SelectSubset<T, ReservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reservations
     * const reservation = await prisma.reservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReservationUpdateManyArgs>(args: SelectSubset<T, ReservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservations and returns the data updated in the database.
     * @param {ReservationUpdateManyAndReturnArgs} args - Arguments to update many Reservations.
     * @example
     * // Update many Reservations
     * const reservation = await prisma.reservation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reservations and only return the `id`
     * const reservationWithIdOnly = await prisma.reservation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReservationUpdateManyAndReturnArgs>(args: SelectSubset<T, ReservationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reservation.
     * @param {ReservationUpsertArgs} args - Arguments to update or create a Reservation.
     * @example
     * // Update or create a Reservation
     * const reservation = await prisma.reservation.upsert({
     *   create: {
     *     // ... data to create a Reservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reservation we want to update
     *   }
     * })
     */
    upsert<T extends ReservationUpsertArgs>(args: SelectSubset<T, ReservationUpsertArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationCountArgs} args - Arguments to filter Reservations to count.
     * @example
     * // Count the number of Reservations
     * const count = await prisma.reservation.count({
     *   where: {
     *     // ... the filter for the Reservations we want to count
     *   }
     * })
    **/
    count<T extends ReservationCountArgs>(
      args?: Subset<T, ReservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReservationAggregateArgs>(args: Subset<T, ReservationAggregateArgs>): Prisma.PrismaPromise<GetReservationAggregateType<T>>

    /**
     * Group by Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReservationGroupByArgs['orderBy'] }
        : { orderBy?: ReservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reservation model
   */
  readonly fields: ReservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscription<T extends InscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InscriptionDefaultArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professor<T extends ProfessorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessorDefaultArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reservation model
   */
  interface ReservationFieldRefs {
    readonly id: FieldRef<"Reservation", 'String'>
    readonly reservationCode: FieldRef<"Reservation", 'String'>
    readonly reservationDate: FieldRef<"Reservation", 'DateTime'>
    readonly startTime: FieldRef<"Reservation", 'DateTime'>
    readonly endTime: FieldRef<"Reservation", 'DateTime'>
    readonly status: FieldRef<"Reservation", 'ReservationStatus'>
    readonly inscriptionId: FieldRef<"Reservation", 'String'>
    readonly professorId: FieldRef<"Reservation", 'String'>
    readonly roomId: FieldRef<"Reservation", 'String'>
    readonly createdAt: FieldRef<"Reservation", 'DateTime'>
    readonly updatedAt: FieldRef<"Reservation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reservation findUnique
   */
  export type ReservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation findUniqueOrThrow
   */
  export type ReservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation findFirst
   */
  export type ReservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation findFirstOrThrow
   */
  export type ReservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation findMany
   */
  export type ReservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservations to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation create
   */
  export type ReservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The data needed to create a Reservation.
     */
    data: XOR<ReservationCreateInput, ReservationUncheckedCreateInput>
  }

  /**
   * Reservation createMany
   */
  export type ReservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reservations.
     */
    data: ReservationCreateManyInput | ReservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reservation createManyAndReturn
   */
  export type ReservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * The data used to create many Reservations.
     */
    data: ReservationCreateManyInput | ReservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reservation update
   */
  export type ReservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The data needed to update a Reservation.
     */
    data: XOR<ReservationUpdateInput, ReservationUncheckedUpdateInput>
    /**
     * Choose, which Reservation to update.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation updateMany
   */
  export type ReservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reservations.
     */
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyInput>
    /**
     * Filter which Reservations to update
     */
    where?: ReservationWhereInput
    /**
     * Limit how many Reservations to update.
     */
    limit?: number
  }

  /**
   * Reservation updateManyAndReturn
   */
  export type ReservationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * The data used to update Reservations.
     */
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyInput>
    /**
     * Filter which Reservations to update
     */
    where?: ReservationWhereInput
    /**
     * Limit how many Reservations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reservation upsert
   */
  export type ReservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The filter to search for the Reservation to update in case it exists.
     */
    where: ReservationWhereUniqueInput
    /**
     * In case the Reservation found by the `where` argument doesn't exist, create a new Reservation with this data.
     */
    create: XOR<ReservationCreateInput, ReservationUncheckedCreateInput>
    /**
     * In case the Reservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReservationUpdateInput, ReservationUncheckedUpdateInput>
  }

  /**
   * Reservation delete
   */
  export type ReservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter which Reservation to delete.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation deleteMany
   */
  export type ReservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reservations to delete
     */
    where?: ReservationWhereInput
    /**
     * Limit how many Reservations to delete.
     */
    limit?: number
  }

  /**
   * Reservation without action
   */
  export type ReservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProspectScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 'age',
    occupation: 'occupation',
    subject: 'subject',
    giftCode: 'giftCode',
    observation: 'observation',
    contact: 'contact',
    action: 'action',
    status: 'status',
    freeSessionsCompleted: 'freeSessionsCompleted',
    absences: 'absences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProspectScalarFieldEnum = (typeof ProspectScalarFieldEnum)[keyof typeof ProspectScalarFieldEnum]


  export const CandidateScalarFieldEnum: {
    id: 'id',
    candidateCode: 'candidateCode',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    age: 'age',
    occupation: 'occupation',
    giftCode: 'giftCode',
    observation: 'observation',
    contact: 'contact',
    action: 'action',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CandidateScalarFieldEnum = (typeof CandidateScalarFieldEnum)[keyof typeof CandidateScalarFieldEnum]


  export const FormationScalarFieldEnum: {
    id: 'id',
    matiere: 'matiere',
    niveau: 'niveau',
    type: 'type',
    duration: 'duration',
    totalSessions: 'totalSessions',
    prix: 'prix',
    volumeHoraire: 'volumeHoraire',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FormationScalarFieldEnum = (typeof FormationScalarFieldEnum)[keyof typeof FormationScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    capacite: 'capacite',
    type: 'type',
    available: 'available',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const ProfessorScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    telephone: 'telephone',
    adresse: 'adresse',
    type: 'type',
    dayOff: 'dayOff',
    maxSessions: 'maxSessions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessorScalarFieldEnum = (typeof ProfessorScalarFieldEnum)[keyof typeof ProfessorScalarFieldEnum]


  export const InscriptionScalarFieldEnum: {
    id: 'id',
    dateInscription: 'dateInscription',
    status: 'status',
    note: 'note',
    duration: 'duration',
    price: 'price',
    volumeHoraire: 'volumeHoraire',
    remainingHours: 'remainingHours',
    learningMode: 'learningMode',
    candidateId: 'candidateId',
    formationId: 'formationId',
    professorId: 'professorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InscriptionScalarFieldEnum = (typeof InscriptionScalarFieldEnum)[keyof typeof InscriptionScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    inscriptionId: 'inscriptionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const InscriptionCandidateScalarFieldEnum: {
    id: 'id',
    inscriptionId: 'inscriptionId',
    candidateId: 'candidateId',
    createdAt: 'createdAt'
  };

  export type InscriptionCandidateScalarFieldEnum = (typeof InscriptionCandidateScalarFieldEnum)[keyof typeof InscriptionCandidateScalarFieldEnum]


  export const CommercialScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    email: 'email',
    action: 'action',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommercialScalarFieldEnum = (typeof CommercialScalarFieldEnum)[keyof typeof CommercialScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    paymentCode: 'paymentCode',
    candidateId: 'candidateId',
    formationId: 'formationId',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    status: 'status',
    paymentDate: 'paymentDate',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ReservationScalarFieldEnum: {
    id: 'id',
    reservationCode: 'reservationCode',
    reservationDate: 'reservationDate',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    inscriptionId: 'inscriptionId',
    professorId: 'professorId',
    roomId: 'roomId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReservationScalarFieldEnum = (typeof ReservationScalarFieldEnum)[keyof typeof ReservationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Occupation'
   */
  export type EnumOccupationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Occupation'>
    


  /**
   * Reference to a field of type 'Occupation[]'
   */
  export type ListEnumOccupationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Occupation[]'>
    


  /**
   * Reference to a field of type 'Observation'
   */
  export type EnumObservationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Observation'>
    


  /**
   * Reference to a field of type 'Observation[]'
   */
  export type ListEnumObservationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Observation[]'>
    


  /**
   * Reference to a field of type 'CandidateStatus'
   */
  export type EnumCandidateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CandidateStatus'>
    


  /**
   * Reference to a field of type 'CandidateStatus[]'
   */
  export type ListEnumCandidateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CandidateStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'InscriptionStatus'
   */
  export type EnumInscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InscriptionStatus'>
    


  /**
   * Reference to a field of type 'InscriptionStatus[]'
   */
  export type ListEnumInscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'LearningMode'
   */
  export type EnumLearningModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LearningMode'>
    


  /**
   * Reference to a field of type 'LearningMode[]'
   */
  export type ListEnumLearningModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LearningMode[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'ReservationStatus'
   */
  export type EnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus'>
    


  /**
   * Reference to a field of type 'ReservationStatus[]'
   */
  export type ListEnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProspectWhereInput = {
    AND?: ProspectWhereInput | ProspectWhereInput[]
    OR?: ProspectWhereInput[]
    NOT?: ProspectWhereInput | ProspectWhereInput[]
    id?: StringFilter<"Prospect"> | string
    firstName?: StringFilter<"Prospect"> | string
    lastName?: StringFilter<"Prospect"> | string
    age?: IntFilter<"Prospect"> | number
    occupation?: EnumOccupationFilter<"Prospect"> | $Enums.Occupation
    subject?: StringFilter<"Prospect"> | string
    giftCode?: StringNullableFilter<"Prospect"> | string | null
    observation?: EnumObservationFilter<"Prospect"> | $Enums.Observation
    contact?: StringNullableListFilter<"Prospect">
    action?: StringNullableFilter<"Prospect"> | string | null
    status?: StringFilter<"Prospect"> | string
    freeSessionsCompleted?: IntFilter<"Prospect"> | number
    absences?: IntFilter<"Prospect"> | number
    createdAt?: DateTimeFilter<"Prospect"> | Date | string
    updatedAt?: DateTimeFilter<"Prospect"> | Date | string
  }

  export type ProspectOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    subject?: SortOrder
    giftCode?: SortOrderInput | SortOrder
    observation?: SortOrder
    contact?: SortOrder
    action?: SortOrderInput | SortOrder
    status?: SortOrder
    freeSessionsCompleted?: SortOrder
    absences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProspectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProspectWhereInput | ProspectWhereInput[]
    OR?: ProspectWhereInput[]
    NOT?: ProspectWhereInput | ProspectWhereInput[]
    firstName?: StringFilter<"Prospect"> | string
    lastName?: StringFilter<"Prospect"> | string
    age?: IntFilter<"Prospect"> | number
    occupation?: EnumOccupationFilter<"Prospect"> | $Enums.Occupation
    subject?: StringFilter<"Prospect"> | string
    giftCode?: StringNullableFilter<"Prospect"> | string | null
    observation?: EnumObservationFilter<"Prospect"> | $Enums.Observation
    contact?: StringNullableListFilter<"Prospect">
    action?: StringNullableFilter<"Prospect"> | string | null
    status?: StringFilter<"Prospect"> | string
    freeSessionsCompleted?: IntFilter<"Prospect"> | number
    absences?: IntFilter<"Prospect"> | number
    createdAt?: DateTimeFilter<"Prospect"> | Date | string
    updatedAt?: DateTimeFilter<"Prospect"> | Date | string
  }, "id">

  export type ProspectOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    subject?: SortOrder
    giftCode?: SortOrderInput | SortOrder
    observation?: SortOrder
    contact?: SortOrder
    action?: SortOrderInput | SortOrder
    status?: SortOrder
    freeSessionsCompleted?: SortOrder
    absences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProspectCountOrderByAggregateInput
    _avg?: ProspectAvgOrderByAggregateInput
    _max?: ProspectMaxOrderByAggregateInput
    _min?: ProspectMinOrderByAggregateInput
    _sum?: ProspectSumOrderByAggregateInput
  }

  export type ProspectScalarWhereWithAggregatesInput = {
    AND?: ProspectScalarWhereWithAggregatesInput | ProspectScalarWhereWithAggregatesInput[]
    OR?: ProspectScalarWhereWithAggregatesInput[]
    NOT?: ProspectScalarWhereWithAggregatesInput | ProspectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prospect"> | string
    firstName?: StringWithAggregatesFilter<"Prospect"> | string
    lastName?: StringWithAggregatesFilter<"Prospect"> | string
    age?: IntWithAggregatesFilter<"Prospect"> | number
    occupation?: EnumOccupationWithAggregatesFilter<"Prospect"> | $Enums.Occupation
    subject?: StringWithAggregatesFilter<"Prospect"> | string
    giftCode?: StringNullableWithAggregatesFilter<"Prospect"> | string | null
    observation?: EnumObservationWithAggregatesFilter<"Prospect"> | $Enums.Observation
    contact?: StringNullableListFilter<"Prospect">
    action?: StringNullableWithAggregatesFilter<"Prospect"> | string | null
    status?: StringWithAggregatesFilter<"Prospect"> | string
    freeSessionsCompleted?: IntWithAggregatesFilter<"Prospect"> | number
    absences?: IntWithAggregatesFilter<"Prospect"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Prospect"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prospect"> | Date | string
  }

  export type CandidateWhereInput = {
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    id?: StringFilter<"Candidate"> | string
    candidateCode?: StringFilter<"Candidate"> | string
    firstName?: StringFilter<"Candidate"> | string
    lastName?: StringFilter<"Candidate"> | string
    email?: StringNullableFilter<"Candidate"> | string | null
    phone?: StringNullableFilter<"Candidate"> | string | null
    age?: IntFilter<"Candidate"> | number
    occupation?: EnumOccupationFilter<"Candidate"> | $Enums.Occupation
    giftCode?: StringNullableFilter<"Candidate"> | string | null
    observation?: EnumObservationFilter<"Candidate"> | $Enums.Observation
    contact?: StringNullableListFilter<"Candidate">
    action?: StringNullableFilter<"Candidate"> | string | null
    status?: EnumCandidateStatusFilter<"Candidate"> | $Enums.CandidateStatus
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    inscriptionCandidates?: InscriptionCandidateListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type CandidateOrderByWithRelationInput = {
    id?: SortOrder
    candidateCode?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    age?: SortOrder
    occupation?: SortOrder
    giftCode?: SortOrderInput | SortOrder
    observation?: SortOrder
    contact?: SortOrder
    action?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inscriptions?: InscriptionOrderByRelationAggregateInput
    inscriptionCandidates?: InscriptionCandidateOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type CandidateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    candidateCode?: string
    email?: string
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    firstName?: StringFilter<"Candidate"> | string
    lastName?: StringFilter<"Candidate"> | string
    phone?: StringNullableFilter<"Candidate"> | string | null
    age?: IntFilter<"Candidate"> | number
    occupation?: EnumOccupationFilter<"Candidate"> | $Enums.Occupation
    giftCode?: StringNullableFilter<"Candidate"> | string | null
    observation?: EnumObservationFilter<"Candidate"> | $Enums.Observation
    contact?: StringNullableListFilter<"Candidate">
    action?: StringNullableFilter<"Candidate"> | string | null
    status?: EnumCandidateStatusFilter<"Candidate"> | $Enums.CandidateStatus
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    inscriptionCandidates?: InscriptionCandidateListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "candidateCode" | "email">

  export type CandidateOrderByWithAggregationInput = {
    id?: SortOrder
    candidateCode?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    age?: SortOrder
    occupation?: SortOrder
    giftCode?: SortOrderInput | SortOrder
    observation?: SortOrder
    contact?: SortOrder
    action?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CandidateCountOrderByAggregateInput
    _avg?: CandidateAvgOrderByAggregateInput
    _max?: CandidateMaxOrderByAggregateInput
    _min?: CandidateMinOrderByAggregateInput
    _sum?: CandidateSumOrderByAggregateInput
  }

  export type CandidateScalarWhereWithAggregatesInput = {
    AND?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    OR?: CandidateScalarWhereWithAggregatesInput[]
    NOT?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Candidate"> | string
    candidateCode?: StringWithAggregatesFilter<"Candidate"> | string
    firstName?: StringWithAggregatesFilter<"Candidate"> | string
    lastName?: StringWithAggregatesFilter<"Candidate"> | string
    email?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    age?: IntWithAggregatesFilter<"Candidate"> | number
    occupation?: EnumOccupationWithAggregatesFilter<"Candidate"> | $Enums.Occupation
    giftCode?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    observation?: EnumObservationWithAggregatesFilter<"Candidate"> | $Enums.Observation
    contact?: StringNullableListFilter<"Candidate">
    action?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    status?: EnumCandidateStatusWithAggregatesFilter<"Candidate"> | $Enums.CandidateStatus
    createdAt?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
  }

  export type FormationWhereInput = {
    AND?: FormationWhereInput | FormationWhereInput[]
    OR?: FormationWhereInput[]
    NOT?: FormationWhereInput | FormationWhereInput[]
    id?: StringFilter<"Formation"> | string
    matiere?: StringFilter<"Formation"> | string
    niveau?: StringFilter<"Formation"> | string
    type?: StringFilter<"Formation"> | string
    duration?: IntFilter<"Formation"> | number
    totalSessions?: IntFilter<"Formation"> | number
    prix?: DecimalFilter<"Formation"> | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFilter<"Formation"> | number
    description?: StringNullableFilter<"Formation"> | string | null
    createdAt?: DateTimeFilter<"Formation"> | Date | string
    updatedAt?: DateTimeFilter<"Formation"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type FormationOrderByWithRelationInput = {
    id?: SortOrder
    matiere?: SortOrder
    niveau?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    totalSessions?: SortOrder
    prix?: SortOrder
    volumeHoraire?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inscriptions?: InscriptionOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type FormationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FormationWhereInput | FormationWhereInput[]
    OR?: FormationWhereInput[]
    NOT?: FormationWhereInput | FormationWhereInput[]
    matiere?: StringFilter<"Formation"> | string
    niveau?: StringFilter<"Formation"> | string
    type?: StringFilter<"Formation"> | string
    duration?: IntFilter<"Formation"> | number
    totalSessions?: IntFilter<"Formation"> | number
    prix?: DecimalFilter<"Formation"> | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFilter<"Formation"> | number
    description?: StringNullableFilter<"Formation"> | string | null
    createdAt?: DateTimeFilter<"Formation"> | Date | string
    updatedAt?: DateTimeFilter<"Formation"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id">

  export type FormationOrderByWithAggregationInput = {
    id?: SortOrder
    matiere?: SortOrder
    niveau?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    totalSessions?: SortOrder
    prix?: SortOrder
    volumeHoraire?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FormationCountOrderByAggregateInput
    _avg?: FormationAvgOrderByAggregateInput
    _max?: FormationMaxOrderByAggregateInput
    _min?: FormationMinOrderByAggregateInput
    _sum?: FormationSumOrderByAggregateInput
  }

  export type FormationScalarWhereWithAggregatesInput = {
    AND?: FormationScalarWhereWithAggregatesInput | FormationScalarWhereWithAggregatesInput[]
    OR?: FormationScalarWhereWithAggregatesInput[]
    NOT?: FormationScalarWhereWithAggregatesInput | FormationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Formation"> | string
    matiere?: StringWithAggregatesFilter<"Formation"> | string
    niveau?: StringWithAggregatesFilter<"Formation"> | string
    type?: StringWithAggregatesFilter<"Formation"> | string
    duration?: IntWithAggregatesFilter<"Formation"> | number
    totalSessions?: IntWithAggregatesFilter<"Formation"> | number
    prix?: DecimalWithAggregatesFilter<"Formation"> | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntWithAggregatesFilter<"Formation"> | number
    description?: StringNullableWithAggregatesFilter<"Formation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Formation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Formation"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    numero?: StringFilter<"Room"> | string
    capacite?: IntFilter<"Room"> | number
    type?: StringFilter<"Room"> | string
    available?: BoolFilter<"Room"> | boolean
    description?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    reservations?: ReservationListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    capacite?: SortOrder
    type?: SortOrder
    available?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reservations?: ReservationOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    capacite?: IntFilter<"Room"> | number
    type?: StringFilter<"Room"> | string
    available?: BoolFilter<"Room"> | boolean
    description?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    reservations?: ReservationListRelationFilter
  }, "id" | "numero">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    capacite?: SortOrder
    type?: SortOrder
    available?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    numero?: StringWithAggregatesFilter<"Room"> | string
    capacite?: IntWithAggregatesFilter<"Room"> | number
    type?: StringWithAggregatesFilter<"Room"> | string
    available?: BoolWithAggregatesFilter<"Room"> | boolean
    description?: StringNullableWithAggregatesFilter<"Room"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type ProfessorWhereInput = {
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    id?: StringFilter<"Professor"> | string
    nom?: StringFilter<"Professor"> | string
    prenom?: StringFilter<"Professor"> | string
    email?: StringNullableFilter<"Professor"> | string | null
    telephone?: StringNullableFilter<"Professor"> | string | null
    adresse?: StringNullableFilter<"Professor"> | string | null
    type?: StringFilter<"Professor"> | string
    dayOff?: StringFilter<"Professor"> | string
    maxSessions?: IntFilter<"Professor"> | number
    createdAt?: DateTimeFilter<"Professor"> | Date | string
    updatedAt?: DateTimeFilter<"Professor"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    reservations?: ReservationListRelationFilter
  }

  export type ProfessorOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    adresse?: SortOrderInput | SortOrder
    type?: SortOrder
    dayOff?: SortOrder
    maxSessions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inscriptions?: InscriptionOrderByRelationAggregateInput
    reservations?: ReservationOrderByRelationAggregateInput
  }

  export type ProfessorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    nom?: StringFilter<"Professor"> | string
    prenom?: StringFilter<"Professor"> | string
    telephone?: StringNullableFilter<"Professor"> | string | null
    adresse?: StringNullableFilter<"Professor"> | string | null
    type?: StringFilter<"Professor"> | string
    dayOff?: StringFilter<"Professor"> | string
    maxSessions?: IntFilter<"Professor"> | number
    createdAt?: DateTimeFilter<"Professor"> | Date | string
    updatedAt?: DateTimeFilter<"Professor"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    reservations?: ReservationListRelationFilter
  }, "id" | "email">

  export type ProfessorOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    adresse?: SortOrderInput | SortOrder
    type?: SortOrder
    dayOff?: SortOrder
    maxSessions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessorCountOrderByAggregateInput
    _avg?: ProfessorAvgOrderByAggregateInput
    _max?: ProfessorMaxOrderByAggregateInput
    _min?: ProfessorMinOrderByAggregateInput
    _sum?: ProfessorSumOrderByAggregateInput
  }

  export type ProfessorScalarWhereWithAggregatesInput = {
    AND?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    OR?: ProfessorScalarWhereWithAggregatesInput[]
    NOT?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Professor"> | string
    nom?: StringWithAggregatesFilter<"Professor"> | string
    prenom?: StringWithAggregatesFilter<"Professor"> | string
    email?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    telephone?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    adresse?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    type?: StringWithAggregatesFilter<"Professor"> | string
    dayOff?: StringWithAggregatesFilter<"Professor"> | string
    maxSessions?: IntWithAggregatesFilter<"Professor"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Professor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Professor"> | Date | string
  }

  export type InscriptionWhereInput = {
    AND?: InscriptionWhereInput | InscriptionWhereInput[]
    OR?: InscriptionWhereInput[]
    NOT?: InscriptionWhereInput | InscriptionWhereInput[]
    id?: StringFilter<"Inscription"> | string
    dateInscription?: DateTimeFilter<"Inscription"> | Date | string
    status?: EnumInscriptionStatusFilter<"Inscription"> | $Enums.InscriptionStatus
    note?: StringNullableFilter<"Inscription"> | string | null
    duration?: IntNullableFilter<"Inscription"> | number | null
    price?: FloatNullableFilter<"Inscription"> | number | null
    volumeHoraire?: IntNullableFilter<"Inscription"> | number | null
    remainingHours?: FloatFilter<"Inscription"> | number
    learningMode?: EnumLearningModeFilter<"Inscription"> | $Enums.LearningMode
    candidateId?: StringFilter<"Inscription"> | string
    formationId?: StringFilter<"Inscription"> | string
    professorId?: StringNullableFilter<"Inscription"> | string | null
    createdAt?: DateTimeFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeFilter<"Inscription"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
    professor?: XOR<ProfessorNullableScalarRelationFilter, ProfessorWhereInput> | null
    group?: XOR<GroupNullableScalarRelationFilter, GroupWhereInput> | null
    members?: InscriptionCandidateListRelationFilter
    reservations?: ReservationListRelationFilter
  }

  export type InscriptionOrderByWithRelationInput = {
    id?: SortOrder
    dateInscription?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    volumeHoraire?: SortOrderInput | SortOrder
    remainingHours?: SortOrder
    learningMode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    professorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidate?: CandidateOrderByWithRelationInput
    formation?: FormationOrderByWithRelationInput
    professor?: ProfessorOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
    members?: InscriptionCandidateOrderByRelationAggregateInput
    reservations?: ReservationOrderByRelationAggregateInput
  }

  export type InscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InscriptionWhereInput | InscriptionWhereInput[]
    OR?: InscriptionWhereInput[]
    NOT?: InscriptionWhereInput | InscriptionWhereInput[]
    dateInscription?: DateTimeFilter<"Inscription"> | Date | string
    status?: EnumInscriptionStatusFilter<"Inscription"> | $Enums.InscriptionStatus
    note?: StringNullableFilter<"Inscription"> | string | null
    duration?: IntNullableFilter<"Inscription"> | number | null
    price?: FloatNullableFilter<"Inscription"> | number | null
    volumeHoraire?: IntNullableFilter<"Inscription"> | number | null
    remainingHours?: FloatFilter<"Inscription"> | number
    learningMode?: EnumLearningModeFilter<"Inscription"> | $Enums.LearningMode
    candidateId?: StringFilter<"Inscription"> | string
    formationId?: StringFilter<"Inscription"> | string
    professorId?: StringNullableFilter<"Inscription"> | string | null
    createdAt?: DateTimeFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeFilter<"Inscription"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
    professor?: XOR<ProfessorNullableScalarRelationFilter, ProfessorWhereInput> | null
    group?: XOR<GroupNullableScalarRelationFilter, GroupWhereInput> | null
    members?: InscriptionCandidateListRelationFilter
    reservations?: ReservationListRelationFilter
  }, "id">

  export type InscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    dateInscription?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    volumeHoraire?: SortOrderInput | SortOrder
    remainingHours?: SortOrder
    learningMode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    professorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InscriptionCountOrderByAggregateInput
    _avg?: InscriptionAvgOrderByAggregateInput
    _max?: InscriptionMaxOrderByAggregateInput
    _min?: InscriptionMinOrderByAggregateInput
    _sum?: InscriptionSumOrderByAggregateInput
  }

  export type InscriptionScalarWhereWithAggregatesInput = {
    AND?: InscriptionScalarWhereWithAggregatesInput | InscriptionScalarWhereWithAggregatesInput[]
    OR?: InscriptionScalarWhereWithAggregatesInput[]
    NOT?: InscriptionScalarWhereWithAggregatesInput | InscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Inscription"> | string
    dateInscription?: DateTimeWithAggregatesFilter<"Inscription"> | Date | string
    status?: EnumInscriptionStatusWithAggregatesFilter<"Inscription"> | $Enums.InscriptionStatus
    note?: StringNullableWithAggregatesFilter<"Inscription"> | string | null
    duration?: IntNullableWithAggregatesFilter<"Inscription"> | number | null
    price?: FloatNullableWithAggregatesFilter<"Inscription"> | number | null
    volumeHoraire?: IntNullableWithAggregatesFilter<"Inscription"> | number | null
    remainingHours?: FloatWithAggregatesFilter<"Inscription"> | number
    learningMode?: EnumLearningModeWithAggregatesFilter<"Inscription"> | $Enums.LearningMode
    candidateId?: StringWithAggregatesFilter<"Inscription"> | string
    formationId?: StringWithAggregatesFilter<"Inscription"> | string
    professorId?: StringNullableWithAggregatesFilter<"Inscription"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Inscription"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    nom?: StringFilter<"Group"> | string
    inscriptionId?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    inscription?: XOR<InscriptionScalarRelationFilter, InscriptionWhereInput>
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    inscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inscription?: InscriptionOrderByWithRelationInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inscriptionId?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    nom?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    inscription?: XOR<InscriptionScalarRelationFilter, InscriptionWhereInput>
  }, "id" | "inscriptionId">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    inscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    nom?: StringWithAggregatesFilter<"Group"> | string
    inscriptionId?: StringWithAggregatesFilter<"Group"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type InscriptionCandidateWhereInput = {
    AND?: InscriptionCandidateWhereInput | InscriptionCandidateWhereInput[]
    OR?: InscriptionCandidateWhereInput[]
    NOT?: InscriptionCandidateWhereInput | InscriptionCandidateWhereInput[]
    id?: StringFilter<"InscriptionCandidate"> | string
    inscriptionId?: StringFilter<"InscriptionCandidate"> | string
    candidateId?: StringFilter<"InscriptionCandidate"> | string
    createdAt?: DateTimeFilter<"InscriptionCandidate"> | Date | string
    inscription?: XOR<InscriptionScalarRelationFilter, InscriptionWhereInput>
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
  }

  export type InscriptionCandidateOrderByWithRelationInput = {
    id?: SortOrder
    inscriptionId?: SortOrder
    candidateId?: SortOrder
    createdAt?: SortOrder
    inscription?: InscriptionOrderByWithRelationInput
    candidate?: CandidateOrderByWithRelationInput
  }

  export type InscriptionCandidateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inscriptionId_candidateId?: InscriptionCandidateInscriptionIdCandidateIdCompoundUniqueInput
    AND?: InscriptionCandidateWhereInput | InscriptionCandidateWhereInput[]
    OR?: InscriptionCandidateWhereInput[]
    NOT?: InscriptionCandidateWhereInput | InscriptionCandidateWhereInput[]
    inscriptionId?: StringFilter<"InscriptionCandidate"> | string
    candidateId?: StringFilter<"InscriptionCandidate"> | string
    createdAt?: DateTimeFilter<"InscriptionCandidate"> | Date | string
    inscription?: XOR<InscriptionScalarRelationFilter, InscriptionWhereInput>
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
  }, "id" | "inscriptionId_candidateId">

  export type InscriptionCandidateOrderByWithAggregationInput = {
    id?: SortOrder
    inscriptionId?: SortOrder
    candidateId?: SortOrder
    createdAt?: SortOrder
    _count?: InscriptionCandidateCountOrderByAggregateInput
    _max?: InscriptionCandidateMaxOrderByAggregateInput
    _min?: InscriptionCandidateMinOrderByAggregateInput
  }

  export type InscriptionCandidateScalarWhereWithAggregatesInput = {
    AND?: InscriptionCandidateScalarWhereWithAggregatesInput | InscriptionCandidateScalarWhereWithAggregatesInput[]
    OR?: InscriptionCandidateScalarWhereWithAggregatesInput[]
    NOT?: InscriptionCandidateScalarWhereWithAggregatesInput | InscriptionCandidateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InscriptionCandidate"> | string
    inscriptionId?: StringWithAggregatesFilter<"InscriptionCandidate"> | string
    candidateId?: StringWithAggregatesFilter<"InscriptionCandidate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InscriptionCandidate"> | Date | string
  }

  export type CommercialWhereInput = {
    AND?: CommercialWhereInput | CommercialWhereInput[]
    OR?: CommercialWhereInput[]
    NOT?: CommercialWhereInput | CommercialWhereInput[]
    id?: StringFilter<"Commercial"> | string
    firstName?: StringFilter<"Commercial"> | string
    lastName?: StringFilter<"Commercial"> | string
    phone?: StringFilter<"Commercial"> | string
    email?: StringFilter<"Commercial"> | string
    action?: StringFilter<"Commercial"> | string
    createdAt?: DateTimeFilter<"Commercial"> | Date | string
    updatedAt?: DateTimeFilter<"Commercial"> | Date | string
  }

  export type CommercialOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommercialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CommercialWhereInput | CommercialWhereInput[]
    OR?: CommercialWhereInput[]
    NOT?: CommercialWhereInput | CommercialWhereInput[]
    firstName?: StringFilter<"Commercial"> | string
    lastName?: StringFilter<"Commercial"> | string
    phone?: StringFilter<"Commercial"> | string
    action?: StringFilter<"Commercial"> | string
    createdAt?: DateTimeFilter<"Commercial"> | Date | string
    updatedAt?: DateTimeFilter<"Commercial"> | Date | string
  }, "id" | "email">

  export type CommercialOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommercialCountOrderByAggregateInput
    _max?: CommercialMaxOrderByAggregateInput
    _min?: CommercialMinOrderByAggregateInput
  }

  export type CommercialScalarWhereWithAggregatesInput = {
    AND?: CommercialScalarWhereWithAggregatesInput | CommercialScalarWhereWithAggregatesInput[]
    OR?: CommercialScalarWhereWithAggregatesInput[]
    NOT?: CommercialScalarWhereWithAggregatesInput | CommercialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Commercial"> | string
    firstName?: StringWithAggregatesFilter<"Commercial"> | string
    lastName?: StringWithAggregatesFilter<"Commercial"> | string
    phone?: StringWithAggregatesFilter<"Commercial"> | string
    email?: StringWithAggregatesFilter<"Commercial"> | string
    action?: StringWithAggregatesFilter<"Commercial"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Commercial"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Commercial"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    paymentCode?: StringFilter<"Payment"> | string
    candidateId?: StringFilter<"Payment"> | string
    formationId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    note?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    paymentCode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidate?: CandidateOrderByWithRelationInput
    formation?: FormationOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentCode?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    candidateId?: StringFilter<"Payment"> | string
    formationId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    note?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
  }, "id" | "paymentCode">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    paymentCode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    paymentCode?: StringWithAggregatesFilter<"Payment"> | string
    candidateId?: StringWithAggregatesFilter<"Payment"> | string
    formationId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    note?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type ReservationWhereInput = {
    AND?: ReservationWhereInput | ReservationWhereInput[]
    OR?: ReservationWhereInput[]
    NOT?: ReservationWhereInput | ReservationWhereInput[]
    id?: StringFilter<"Reservation"> | string
    reservationCode?: StringFilter<"Reservation"> | string
    reservationDate?: DateTimeFilter<"Reservation"> | Date | string
    startTime?: DateTimeFilter<"Reservation"> | Date | string
    endTime?: DateTimeFilter<"Reservation"> | Date | string
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    inscriptionId?: StringFilter<"Reservation"> | string
    professorId?: StringFilter<"Reservation"> | string
    roomId?: StringFilter<"Reservation"> | string
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeFilter<"Reservation"> | Date | string
    inscription?: XOR<InscriptionScalarRelationFilter, InscriptionWhereInput>
    professor?: XOR<ProfessorScalarRelationFilter, ProfessorWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }

  export type ReservationOrderByWithRelationInput = {
    id?: SortOrder
    reservationCode?: SortOrder
    reservationDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    inscriptionId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inscription?: InscriptionOrderByWithRelationInput
    professor?: ProfessorOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
  }

  export type ReservationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reservationCode?: string
    inscriptionId_reservationDate_startTime?: ReservationInscriptionIdReservationDateStartTimeCompoundUniqueInput
    AND?: ReservationWhereInput | ReservationWhereInput[]
    OR?: ReservationWhereInput[]
    NOT?: ReservationWhereInput | ReservationWhereInput[]
    reservationDate?: DateTimeFilter<"Reservation"> | Date | string
    startTime?: DateTimeFilter<"Reservation"> | Date | string
    endTime?: DateTimeFilter<"Reservation"> | Date | string
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    inscriptionId?: StringFilter<"Reservation"> | string
    professorId?: StringFilter<"Reservation"> | string
    roomId?: StringFilter<"Reservation"> | string
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeFilter<"Reservation"> | Date | string
    inscription?: XOR<InscriptionScalarRelationFilter, InscriptionWhereInput>
    professor?: XOR<ProfessorScalarRelationFilter, ProfessorWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }, "id" | "reservationCode" | "inscriptionId_reservationDate_startTime">

  export type ReservationOrderByWithAggregationInput = {
    id?: SortOrder
    reservationCode?: SortOrder
    reservationDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    inscriptionId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReservationCountOrderByAggregateInput
    _max?: ReservationMaxOrderByAggregateInput
    _min?: ReservationMinOrderByAggregateInput
  }

  export type ReservationScalarWhereWithAggregatesInput = {
    AND?: ReservationScalarWhereWithAggregatesInput | ReservationScalarWhereWithAggregatesInput[]
    OR?: ReservationScalarWhereWithAggregatesInput[]
    NOT?: ReservationScalarWhereWithAggregatesInput | ReservationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reservation"> | string
    reservationCode?: StringWithAggregatesFilter<"Reservation"> | string
    reservationDate?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    startTime?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    status?: EnumReservationStatusWithAggregatesFilter<"Reservation"> | $Enums.ReservationStatus
    inscriptionId?: StringWithAggregatesFilter<"Reservation"> | string
    professorId?: StringWithAggregatesFilter<"Reservation"> | string
    roomId?: StringWithAggregatesFilter<"Reservation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProspectCreateInput = {
    id?: string
    firstName: string
    lastName: string
    age: number
    occupation: $Enums.Occupation
    subject: string
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: ProspectCreatecontactInput | string[]
    action?: string | null
    status?: string
    freeSessionsCompleted?: number
    absences?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProspectUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    age: number
    occupation: $Enums.Occupation
    subject: string
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: ProspectCreatecontactInput | string[]
    action?: string | null
    status?: string
    freeSessionsCompleted?: number
    absences?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProspectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    subject?: StringFieldUpdateOperationsInput | string
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: ProspectUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    freeSessionsCompleted?: IntFieldUpdateOperationsInput | number
    absences?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProspectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    subject?: StringFieldUpdateOperationsInput | string
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: ProspectUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    freeSessionsCompleted?: IntFieldUpdateOperationsInput | number
    absences?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProspectCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    age: number
    occupation: $Enums.Occupation
    subject: string
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: ProspectCreatecontactInput | string[]
    action?: string | null
    status?: string
    freeSessionsCompleted?: number
    absences?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProspectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    subject?: StringFieldUpdateOperationsInput | string
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: ProspectUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    freeSessionsCompleted?: IntFieldUpdateOperationsInput | number
    absences?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProspectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    subject?: StringFieldUpdateOperationsInput | string
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: ProspectUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    freeSessionsCompleted?: IntFieldUpdateOperationsInput | number
    absences?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCreateInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutCandidateInput
    inscriptionCandidates?: InscriptionCandidateCreateNestedManyWithoutCandidateInput
    payments?: PaymentCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutCandidateInput
    inscriptionCandidates?: InscriptionCandidateUncheckedCreateNestedManyWithoutCandidateInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutCandidateNestedInput
    inscriptionCandidates?: InscriptionCandidateUpdateManyWithoutCandidateNestedInput
    payments?: PaymentUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutCandidateNestedInput
    inscriptionCandidates?: InscriptionCandidateUncheckedUpdateManyWithoutCandidateNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateCreateManyInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CandidateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormationCreateInput = {
    id?: string
    matiere: string
    niveau: string
    type?: string
    duration?: number
    totalSessions?: number
    prix?: Decimal | DecimalJsLike | number | string
    volumeHoraire?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutFormationInput
    payments?: PaymentCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateInput = {
    id?: string
    matiere: string
    niveau: string
    type?: string
    duration?: number
    totalSessions?: number
    prix?: Decimal | DecimalJsLike | number | string
    volumeHoraire?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutFormationInput
    payments?: PaymentUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutFormationNestedInput
    payments?: PaymentUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutFormationNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type FormationCreateManyInput = {
    id?: string
    matiere: string
    niveau: string
    type?: string
    duration?: number
    totalSessions?: number
    prix?: Decimal | DecimalJsLike | number | string
    volumeHoraire?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    numero: string
    capacite: number
    type?: string
    available?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reservations?: ReservationCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    numero: string
    capacite: number
    type?: string
    available?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reservations?: ReservationUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    capacite?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservations?: ReservationUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    capacite?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservations?: ReservationUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    numero: string
    capacite: number
    type?: string
    available?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    capacite?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    capacite?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorCreateInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    adresse?: string | null
    type?: string
    dayOff?: string
    maxSessions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutProfessorInput
    reservations?: ReservationCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    adresse?: string | null
    type?: string
    dayOff?: string
    maxSessions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutProfessorInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutProfessorNestedInput
    reservations?: ReservationUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutProfessorNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    adresse?: string | null
    type?: string
    dayOff?: string
    maxSessions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCreateInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutInscriptionsInput
    formation: FormationCreateNestedOneWithoutInscriptionsInput
    professor?: ProfessorCreateNestedOneWithoutInscriptionsInput
    group?: GroupCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUncheckedCreateInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    formationId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupUncheckedCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateUncheckedCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionsNestedInput
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
    professor?: ProfessorUpdateOneWithoutInscriptionsNestedInput
    group?: GroupUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUncheckedUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUncheckedUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionCreateManyInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    formationId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateInput = {
    id?: string
    nom: string
    createdAt?: Date | string
    updatedAt?: Date | string
    inscription: InscriptionCreateNestedOneWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    nom: string
    inscriptionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscription?: InscriptionUpdateOneRequiredWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    inscriptionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateManyInput = {
    id?: string
    nom: string
    inscriptionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    inscriptionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateCreateInput = {
    id?: string
    createdAt?: Date | string
    inscription: InscriptionCreateNestedOneWithoutMembersInput
    candidate: CandidateCreateNestedOneWithoutInscriptionCandidatesInput
  }

  export type InscriptionCandidateUncheckedCreateInput = {
    id?: string
    inscriptionId: string
    candidateId: string
    createdAt?: Date | string
  }

  export type InscriptionCandidateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscription?: InscriptionUpdateOneRequiredWithoutMembersNestedInput
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionCandidatesNestedInput
  }

  export type InscriptionCandidateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inscriptionId?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateCreateManyInput = {
    id?: string
    inscriptionId: string
    candidateId: string
    createdAt?: Date | string
  }

  export type InscriptionCandidateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inscriptionId?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommercialCreateInput = {
    id?: string
    firstName: string
    lastName: string
    phone: string
    email: string
    action?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommercialUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    phone: string
    email: string
    action?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommercialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommercialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommercialCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    phone: string
    email: string
    action?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommercialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommercialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    paymentCode: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutPaymentsInput
    formation: FormationCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    paymentCode: string
    candidateId: string
    formationId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutPaymentsNestedInput
    formation?: FormationUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    paymentCode: string
    candidateId: string
    formationId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationCreateInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscription: InscriptionCreateNestedOneWithoutReservationsInput
    professor: ProfessorCreateNestedOneWithoutReservationsInput
    room: RoomCreateNestedOneWithoutReservationsInput
  }

  export type ReservationUncheckedCreateInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    inscriptionId: string
    professorId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscription?: InscriptionUpdateOneRequiredWithoutReservationsNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneRequiredWithoutReservationsNestedInput
  }

  export type ReservationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    inscriptionId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationCreateManyInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    inscriptionId: string
    professorId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    inscriptionId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumOccupationFilter<$PrismaModel = never> = {
    equals?: $Enums.Occupation | EnumOccupationFieldRefInput<$PrismaModel>
    in?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    not?: NestedEnumOccupationFilter<$PrismaModel> | $Enums.Occupation
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumObservationFilter<$PrismaModel = never> = {
    equals?: $Enums.Observation | EnumObservationFieldRefInput<$PrismaModel>
    in?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    not?: NestedEnumObservationFilter<$PrismaModel> | $Enums.Observation
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProspectCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    subject?: SortOrder
    giftCode?: SortOrder
    observation?: SortOrder
    contact?: SortOrder
    action?: SortOrder
    status?: SortOrder
    freeSessionsCompleted?: SortOrder
    absences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProspectAvgOrderByAggregateInput = {
    age?: SortOrder
    freeSessionsCompleted?: SortOrder
    absences?: SortOrder
  }

  export type ProspectMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    subject?: SortOrder
    giftCode?: SortOrder
    observation?: SortOrder
    action?: SortOrder
    status?: SortOrder
    freeSessionsCompleted?: SortOrder
    absences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProspectMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    subject?: SortOrder
    giftCode?: SortOrder
    observation?: SortOrder
    action?: SortOrder
    status?: SortOrder
    freeSessionsCompleted?: SortOrder
    absences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProspectSumOrderByAggregateInput = {
    age?: SortOrder
    freeSessionsCompleted?: SortOrder
    absences?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumOccupationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Occupation | EnumOccupationFieldRefInput<$PrismaModel>
    in?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    not?: NestedEnumOccupationWithAggregatesFilter<$PrismaModel> | $Enums.Occupation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOccupationFilter<$PrismaModel>
    _max?: NestedEnumOccupationFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumObservationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Observation | EnumObservationFieldRefInput<$PrismaModel>
    in?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    not?: NestedEnumObservationWithAggregatesFilter<$PrismaModel> | $Enums.Observation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumObservationFilter<$PrismaModel>
    _max?: NestedEnumObservationFilter<$PrismaModel>
  }

  export type EnumCandidateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateStatus | EnumCandidateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateStatusFilter<$PrismaModel> | $Enums.CandidateStatus
  }

  export type InscriptionListRelationFilter = {
    every?: InscriptionWhereInput
    some?: InscriptionWhereInput
    none?: InscriptionWhereInput
  }

  export type InscriptionCandidateListRelationFilter = {
    every?: InscriptionCandidateWhereInput
    some?: InscriptionCandidateWhereInput
    none?: InscriptionCandidateWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type InscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InscriptionCandidateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CandidateCountOrderByAggregateInput = {
    id?: SortOrder
    candidateCode?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    giftCode?: SortOrder
    observation?: SortOrder
    contact?: SortOrder
    action?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type CandidateMaxOrderByAggregateInput = {
    id?: SortOrder
    candidateCode?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    giftCode?: SortOrder
    observation?: SortOrder
    action?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateMinOrderByAggregateInput = {
    id?: SortOrder
    candidateCode?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    age?: SortOrder
    occupation?: SortOrder
    giftCode?: SortOrder
    observation?: SortOrder
    action?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type EnumCandidateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateStatus | EnumCandidateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateStatusWithAggregatesFilter<$PrismaModel> | $Enums.CandidateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCandidateStatusFilter<$PrismaModel>
    _max?: NestedEnumCandidateStatusFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type FormationCountOrderByAggregateInput = {
    id?: SortOrder
    matiere?: SortOrder
    niveau?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    totalSessions?: SortOrder
    prix?: SortOrder
    volumeHoraire?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormationAvgOrderByAggregateInput = {
    duration?: SortOrder
    totalSessions?: SortOrder
    prix?: SortOrder
    volumeHoraire?: SortOrder
  }

  export type FormationMaxOrderByAggregateInput = {
    id?: SortOrder
    matiere?: SortOrder
    niveau?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    totalSessions?: SortOrder
    prix?: SortOrder
    volumeHoraire?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormationMinOrderByAggregateInput = {
    id?: SortOrder
    matiere?: SortOrder
    niveau?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    totalSessions?: SortOrder
    prix?: SortOrder
    volumeHoraire?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormationSumOrderByAggregateInput = {
    duration?: SortOrder
    totalSessions?: SortOrder
    prix?: SortOrder
    volumeHoraire?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ReservationListRelationFilter = {
    every?: ReservationWhereInput
    some?: ReservationWhereInput
    none?: ReservationWhereInput
  }

  export type ReservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    capacite?: SortOrder
    type?: SortOrder
    available?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    capacite?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    capacite?: SortOrder
    type?: SortOrder
    available?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    capacite?: SortOrder
    type?: SortOrder
    available?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    capacite?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProfessorCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    type?: SortOrder
    dayOff?: SortOrder
    maxSessions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessorAvgOrderByAggregateInput = {
    maxSessions?: SortOrder
  }

  export type ProfessorMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    type?: SortOrder
    dayOff?: SortOrder
    maxSessions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessorMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    adresse?: SortOrder
    type?: SortOrder
    dayOff?: SortOrder
    maxSessions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessorSumOrderByAggregateInput = {
    maxSessions?: SortOrder
  }

  export type EnumInscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InscriptionStatus | EnumInscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInscriptionStatusFilter<$PrismaModel> | $Enums.InscriptionStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumLearningModeFilter<$PrismaModel = never> = {
    equals?: $Enums.LearningMode | EnumLearningModeFieldRefInput<$PrismaModel>
    in?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    not?: NestedEnumLearningModeFilter<$PrismaModel> | $Enums.LearningMode
  }

  export type CandidateScalarRelationFilter = {
    is?: CandidateWhereInput
    isNot?: CandidateWhereInput
  }

  export type FormationScalarRelationFilter = {
    is?: FormationWhereInput
    isNot?: FormationWhereInput
  }

  export type ProfessorNullableScalarRelationFilter = {
    is?: ProfessorWhereInput | null
    isNot?: ProfessorWhereInput | null
  }

  export type GroupNullableScalarRelationFilter = {
    is?: GroupWhereInput | null
    isNot?: GroupWhereInput | null
  }

  export type InscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    dateInscription?: SortOrder
    status?: SortOrder
    note?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    volumeHoraire?: SortOrder
    remainingHours?: SortOrder
    learningMode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    professorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscriptionAvgOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
    volumeHoraire?: SortOrder
    remainingHours?: SortOrder
  }

  export type InscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    dateInscription?: SortOrder
    status?: SortOrder
    note?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    volumeHoraire?: SortOrder
    remainingHours?: SortOrder
    learningMode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    professorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    dateInscription?: SortOrder
    status?: SortOrder
    note?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    volumeHoraire?: SortOrder
    remainingHours?: SortOrder
    learningMode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    professorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscriptionSumOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
    volumeHoraire?: SortOrder
    remainingHours?: SortOrder
  }

  export type EnumInscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InscriptionStatus | EnumInscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.InscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumInscriptionStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumLearningModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LearningMode | EnumLearningModeFieldRefInput<$PrismaModel>
    in?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    not?: NestedEnumLearningModeWithAggregatesFilter<$PrismaModel> | $Enums.LearningMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLearningModeFilter<$PrismaModel>
    _max?: NestedEnumLearningModeFilter<$PrismaModel>
  }

  export type InscriptionScalarRelationFilter = {
    is?: InscriptionWhereInput
    isNot?: InscriptionWhereInput
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    inscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    inscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    inscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscriptionCandidateInscriptionIdCandidateIdCompoundUniqueInput = {
    inscriptionId: string
    candidateId: string
  }

  export type InscriptionCandidateCountOrderByAggregateInput = {
    id?: SortOrder
    inscriptionId?: SortOrder
    candidateId?: SortOrder
    createdAt?: SortOrder
  }

  export type InscriptionCandidateMaxOrderByAggregateInput = {
    id?: SortOrder
    inscriptionId?: SortOrder
    candidateId?: SortOrder
    createdAt?: SortOrder
  }

  export type InscriptionCandidateMinOrderByAggregateInput = {
    id?: SortOrder
    inscriptionId?: SortOrder
    candidateId?: SortOrder
    createdAt?: SortOrder
  }

  export type CommercialCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommercialMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommercialMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    paymentCode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentCode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    paymentCode?: SortOrder
    candidateId?: SortOrder
    formationId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type ProfessorScalarRelationFilter = {
    is?: ProfessorWhereInput
    isNot?: ProfessorWhereInput
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type ReservationInscriptionIdReservationDateStartTimeCompoundUniqueInput = {
    inscriptionId: string
    reservationDate: Date | string
    startTime: Date | string
  }

  export type ReservationCountOrderByAggregateInput = {
    id?: SortOrder
    reservationCode?: SortOrder
    reservationDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    inscriptionId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReservationMaxOrderByAggregateInput = {
    id?: SortOrder
    reservationCode?: SortOrder
    reservationDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    inscriptionId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReservationMinOrderByAggregateInput = {
    id?: SortOrder
    reservationCode?: SortOrder
    reservationDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    inscriptionId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProspectCreatecontactInput = {
    set: string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumOccupationFieldUpdateOperationsInput = {
    set?: $Enums.Occupation
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumObservationFieldUpdateOperationsInput = {
    set?: $Enums.Observation
  }

  export type ProspectUpdatecontactInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CandidateCreatecontactInput = {
    set: string[]
  }

  export type InscriptionCreateNestedManyWithoutCandidateInput = {
    create?: XOR<InscriptionCreateWithoutCandidateInput, InscriptionUncheckedCreateWithoutCandidateInput> | InscriptionCreateWithoutCandidateInput[] | InscriptionUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutCandidateInput | InscriptionCreateOrConnectWithoutCandidateInput[]
    createMany?: InscriptionCreateManyCandidateInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type InscriptionCandidateCreateNestedManyWithoutCandidateInput = {
    create?: XOR<InscriptionCandidateCreateWithoutCandidateInput, InscriptionCandidateUncheckedCreateWithoutCandidateInput> | InscriptionCandidateCreateWithoutCandidateInput[] | InscriptionCandidateUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutCandidateInput | InscriptionCandidateCreateOrConnectWithoutCandidateInput[]
    createMany?: InscriptionCandidateCreateManyCandidateInputEnvelope
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutCandidateInput = {
    create?: XOR<PaymentCreateWithoutCandidateInput, PaymentUncheckedCreateWithoutCandidateInput> | PaymentCreateWithoutCandidateInput[] | PaymentUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCandidateInput | PaymentCreateOrConnectWithoutCandidateInput[]
    createMany?: PaymentCreateManyCandidateInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type InscriptionUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<InscriptionCreateWithoutCandidateInput, InscriptionUncheckedCreateWithoutCandidateInput> | InscriptionCreateWithoutCandidateInput[] | InscriptionUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutCandidateInput | InscriptionCreateOrConnectWithoutCandidateInput[]
    createMany?: InscriptionCreateManyCandidateInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type InscriptionCandidateUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<InscriptionCandidateCreateWithoutCandidateInput, InscriptionCandidateUncheckedCreateWithoutCandidateInput> | InscriptionCandidateCreateWithoutCandidateInput[] | InscriptionCandidateUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutCandidateInput | InscriptionCandidateCreateOrConnectWithoutCandidateInput[]
    createMany?: InscriptionCandidateCreateManyCandidateInputEnvelope
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<PaymentCreateWithoutCandidateInput, PaymentUncheckedCreateWithoutCandidateInput> | PaymentCreateWithoutCandidateInput[] | PaymentUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCandidateInput | PaymentCreateOrConnectWithoutCandidateInput[]
    createMany?: PaymentCreateManyCandidateInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CandidateUpdatecontactInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumCandidateStatusFieldUpdateOperationsInput = {
    set?: $Enums.CandidateStatus
  }

  export type InscriptionUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<InscriptionCreateWithoutCandidateInput, InscriptionUncheckedCreateWithoutCandidateInput> | InscriptionCreateWithoutCandidateInput[] | InscriptionUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutCandidateInput | InscriptionCreateOrConnectWithoutCandidateInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutCandidateInput | InscriptionUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: InscriptionCreateManyCandidateInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutCandidateInput | InscriptionUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutCandidateInput | InscriptionUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type InscriptionCandidateUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<InscriptionCandidateCreateWithoutCandidateInput, InscriptionCandidateUncheckedCreateWithoutCandidateInput> | InscriptionCandidateCreateWithoutCandidateInput[] | InscriptionCandidateUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutCandidateInput | InscriptionCandidateCreateOrConnectWithoutCandidateInput[]
    upsert?: InscriptionCandidateUpsertWithWhereUniqueWithoutCandidateInput | InscriptionCandidateUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: InscriptionCandidateCreateManyCandidateInputEnvelope
    set?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    disconnect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    delete?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    update?: InscriptionCandidateUpdateWithWhereUniqueWithoutCandidateInput | InscriptionCandidateUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: InscriptionCandidateUpdateManyWithWhereWithoutCandidateInput | InscriptionCandidateUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: InscriptionCandidateScalarWhereInput | InscriptionCandidateScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<PaymentCreateWithoutCandidateInput, PaymentUncheckedCreateWithoutCandidateInput> | PaymentCreateWithoutCandidateInput[] | PaymentUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCandidateInput | PaymentCreateOrConnectWithoutCandidateInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCandidateInput | PaymentUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: PaymentCreateManyCandidateInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCandidateInput | PaymentUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCandidateInput | PaymentUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type InscriptionUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<InscriptionCreateWithoutCandidateInput, InscriptionUncheckedCreateWithoutCandidateInput> | InscriptionCreateWithoutCandidateInput[] | InscriptionUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutCandidateInput | InscriptionCreateOrConnectWithoutCandidateInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutCandidateInput | InscriptionUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: InscriptionCreateManyCandidateInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutCandidateInput | InscriptionUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutCandidateInput | InscriptionUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type InscriptionCandidateUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<InscriptionCandidateCreateWithoutCandidateInput, InscriptionCandidateUncheckedCreateWithoutCandidateInput> | InscriptionCandidateCreateWithoutCandidateInput[] | InscriptionCandidateUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutCandidateInput | InscriptionCandidateCreateOrConnectWithoutCandidateInput[]
    upsert?: InscriptionCandidateUpsertWithWhereUniqueWithoutCandidateInput | InscriptionCandidateUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: InscriptionCandidateCreateManyCandidateInputEnvelope
    set?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    disconnect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    delete?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    update?: InscriptionCandidateUpdateWithWhereUniqueWithoutCandidateInput | InscriptionCandidateUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: InscriptionCandidateUpdateManyWithWhereWithoutCandidateInput | InscriptionCandidateUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: InscriptionCandidateScalarWhereInput | InscriptionCandidateScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<PaymentCreateWithoutCandidateInput, PaymentUncheckedCreateWithoutCandidateInput> | PaymentCreateWithoutCandidateInput[] | PaymentUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCandidateInput | PaymentCreateOrConnectWithoutCandidateInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCandidateInput | PaymentUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: PaymentCreateManyCandidateInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCandidateInput | PaymentUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCandidateInput | PaymentUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type InscriptionCreateNestedManyWithoutFormationInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutFormationInput = {
    create?: XOR<PaymentCreateWithoutFormationInput, PaymentUncheckedCreateWithoutFormationInput> | PaymentCreateWithoutFormationInput[] | PaymentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutFormationInput | PaymentCreateOrConnectWithoutFormationInput[]
    createMany?: PaymentCreateManyFormationInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type InscriptionUncheckedCreateNestedManyWithoutFormationInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutFormationInput = {
    create?: XOR<PaymentCreateWithoutFormationInput, PaymentUncheckedCreateWithoutFormationInput> | PaymentCreateWithoutFormationInput[] | PaymentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutFormationInput | PaymentCreateOrConnectWithoutFormationInput[]
    createMany?: PaymentCreateManyFormationInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type InscriptionUpdateManyWithoutFormationNestedInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutFormationInput | InscriptionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutFormationInput | InscriptionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutFormationInput | InscriptionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutFormationNestedInput = {
    create?: XOR<PaymentCreateWithoutFormationInput, PaymentUncheckedCreateWithoutFormationInput> | PaymentCreateWithoutFormationInput[] | PaymentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutFormationInput | PaymentCreateOrConnectWithoutFormationInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutFormationInput | PaymentUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: PaymentCreateManyFormationInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutFormationInput | PaymentUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutFormationInput | PaymentUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type InscriptionUncheckedUpdateManyWithoutFormationNestedInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutFormationInput | InscriptionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutFormationInput | InscriptionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutFormationInput | InscriptionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutFormationNestedInput = {
    create?: XOR<PaymentCreateWithoutFormationInput, PaymentUncheckedCreateWithoutFormationInput> | PaymentCreateWithoutFormationInput[] | PaymentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutFormationInput | PaymentCreateOrConnectWithoutFormationInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutFormationInput | PaymentUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: PaymentCreateManyFormationInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutFormationInput | PaymentUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutFormationInput | PaymentUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type ReservationCreateNestedManyWithoutRoomInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type ReservationUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ReservationUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutRoomInput | ReservationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutRoomInput | ReservationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutRoomInput | ReservationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type ReservationUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput> | ReservationCreateWithoutRoomInput[] | ReservationUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutRoomInput | ReservationCreateOrConnectWithoutRoomInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutRoomInput | ReservationUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ReservationCreateManyRoomInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutRoomInput | ReservationUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutRoomInput | ReservationUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type InscriptionCreateNestedManyWithoutProfessorInput = {
    create?: XOR<InscriptionCreateWithoutProfessorInput, InscriptionUncheckedCreateWithoutProfessorInput> | InscriptionCreateWithoutProfessorInput[] | InscriptionUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutProfessorInput | InscriptionCreateOrConnectWithoutProfessorInput[]
    createMany?: InscriptionCreateManyProfessorInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type ReservationCreateNestedManyWithoutProfessorInput = {
    create?: XOR<ReservationCreateWithoutProfessorInput, ReservationUncheckedCreateWithoutProfessorInput> | ReservationCreateWithoutProfessorInput[] | ReservationUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutProfessorInput | ReservationCreateOrConnectWithoutProfessorInput[]
    createMany?: ReservationCreateManyProfessorInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type InscriptionUncheckedCreateNestedManyWithoutProfessorInput = {
    create?: XOR<InscriptionCreateWithoutProfessorInput, InscriptionUncheckedCreateWithoutProfessorInput> | InscriptionCreateWithoutProfessorInput[] | InscriptionUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutProfessorInput | InscriptionCreateOrConnectWithoutProfessorInput[]
    createMany?: InscriptionCreateManyProfessorInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type ReservationUncheckedCreateNestedManyWithoutProfessorInput = {
    create?: XOR<ReservationCreateWithoutProfessorInput, ReservationUncheckedCreateWithoutProfessorInput> | ReservationCreateWithoutProfessorInput[] | ReservationUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutProfessorInput | ReservationCreateOrConnectWithoutProfessorInput[]
    createMany?: ReservationCreateManyProfessorInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type InscriptionUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<InscriptionCreateWithoutProfessorInput, InscriptionUncheckedCreateWithoutProfessorInput> | InscriptionCreateWithoutProfessorInput[] | InscriptionUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutProfessorInput | InscriptionCreateOrConnectWithoutProfessorInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutProfessorInput | InscriptionUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: InscriptionCreateManyProfessorInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutProfessorInput | InscriptionUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutProfessorInput | InscriptionUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type ReservationUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<ReservationCreateWithoutProfessorInput, ReservationUncheckedCreateWithoutProfessorInput> | ReservationCreateWithoutProfessorInput[] | ReservationUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutProfessorInput | ReservationCreateOrConnectWithoutProfessorInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutProfessorInput | ReservationUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: ReservationCreateManyProfessorInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutProfessorInput | ReservationUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutProfessorInput | ReservationUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type InscriptionUncheckedUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<InscriptionCreateWithoutProfessorInput, InscriptionUncheckedCreateWithoutProfessorInput> | InscriptionCreateWithoutProfessorInput[] | InscriptionUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutProfessorInput | InscriptionCreateOrConnectWithoutProfessorInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutProfessorInput | InscriptionUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: InscriptionCreateManyProfessorInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutProfessorInput | InscriptionUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutProfessorInput | InscriptionUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type ReservationUncheckedUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<ReservationCreateWithoutProfessorInput, ReservationUncheckedCreateWithoutProfessorInput> | ReservationCreateWithoutProfessorInput[] | ReservationUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutProfessorInput | ReservationCreateOrConnectWithoutProfessorInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutProfessorInput | ReservationUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: ReservationCreateManyProfessorInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutProfessorInput | ReservationUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutProfessorInput | ReservationUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type CandidateCreateNestedOneWithoutInscriptionsInput = {
    create?: XOR<CandidateCreateWithoutInscriptionsInput, CandidateUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutInscriptionsInput
    connect?: CandidateWhereUniqueInput
  }

  export type FormationCreateNestedOneWithoutInscriptionsInput = {
    create?: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutInscriptionsInput
    connect?: FormationWhereUniqueInput
  }

  export type ProfessorCreateNestedOneWithoutInscriptionsInput = {
    create?: XOR<ProfessorCreateWithoutInscriptionsInput, ProfessorUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutInscriptionsInput
    connect?: ProfessorWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutInscriptionInput = {
    create?: XOR<GroupCreateWithoutInscriptionInput, GroupUncheckedCreateWithoutInscriptionInput>
    connectOrCreate?: GroupCreateOrConnectWithoutInscriptionInput
    connect?: GroupWhereUniqueInput
  }

  export type InscriptionCandidateCreateNestedManyWithoutInscriptionInput = {
    create?: XOR<InscriptionCandidateCreateWithoutInscriptionInput, InscriptionCandidateUncheckedCreateWithoutInscriptionInput> | InscriptionCandidateCreateWithoutInscriptionInput[] | InscriptionCandidateUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutInscriptionInput | InscriptionCandidateCreateOrConnectWithoutInscriptionInput[]
    createMany?: InscriptionCandidateCreateManyInscriptionInputEnvelope
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
  }

  export type ReservationCreateNestedManyWithoutInscriptionInput = {
    create?: XOR<ReservationCreateWithoutInscriptionInput, ReservationUncheckedCreateWithoutInscriptionInput> | ReservationCreateWithoutInscriptionInput[] | ReservationUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutInscriptionInput | ReservationCreateOrConnectWithoutInscriptionInput[]
    createMany?: ReservationCreateManyInscriptionInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type GroupUncheckedCreateNestedOneWithoutInscriptionInput = {
    create?: XOR<GroupCreateWithoutInscriptionInput, GroupUncheckedCreateWithoutInscriptionInput>
    connectOrCreate?: GroupCreateOrConnectWithoutInscriptionInput
    connect?: GroupWhereUniqueInput
  }

  export type InscriptionCandidateUncheckedCreateNestedManyWithoutInscriptionInput = {
    create?: XOR<InscriptionCandidateCreateWithoutInscriptionInput, InscriptionCandidateUncheckedCreateWithoutInscriptionInput> | InscriptionCandidateCreateWithoutInscriptionInput[] | InscriptionCandidateUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutInscriptionInput | InscriptionCandidateCreateOrConnectWithoutInscriptionInput[]
    createMany?: InscriptionCandidateCreateManyInscriptionInputEnvelope
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
  }

  export type ReservationUncheckedCreateNestedManyWithoutInscriptionInput = {
    create?: XOR<ReservationCreateWithoutInscriptionInput, ReservationUncheckedCreateWithoutInscriptionInput> | ReservationCreateWithoutInscriptionInput[] | ReservationUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutInscriptionInput | ReservationCreateOrConnectWithoutInscriptionInput[]
    createMany?: ReservationCreateManyInscriptionInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type EnumInscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.InscriptionStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumLearningModeFieldUpdateOperationsInput = {
    set?: $Enums.LearningMode
  }

  export type CandidateUpdateOneRequiredWithoutInscriptionsNestedInput = {
    create?: XOR<CandidateCreateWithoutInscriptionsInput, CandidateUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutInscriptionsInput
    upsert?: CandidateUpsertWithoutInscriptionsInput
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutInscriptionsInput, CandidateUpdateWithoutInscriptionsInput>, CandidateUncheckedUpdateWithoutInscriptionsInput>
  }

  export type FormationUpdateOneRequiredWithoutInscriptionsNestedInput = {
    create?: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutInscriptionsInput
    upsert?: FormationUpsertWithoutInscriptionsInput
    connect?: FormationWhereUniqueInput
    update?: XOR<XOR<FormationUpdateToOneWithWhereWithoutInscriptionsInput, FormationUpdateWithoutInscriptionsInput>, FormationUncheckedUpdateWithoutInscriptionsInput>
  }

  export type ProfessorUpdateOneWithoutInscriptionsNestedInput = {
    create?: XOR<ProfessorCreateWithoutInscriptionsInput, ProfessorUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutInscriptionsInput
    upsert?: ProfessorUpsertWithoutInscriptionsInput
    disconnect?: ProfessorWhereInput | boolean
    delete?: ProfessorWhereInput | boolean
    connect?: ProfessorWhereUniqueInput
    update?: XOR<XOR<ProfessorUpdateToOneWithWhereWithoutInscriptionsInput, ProfessorUpdateWithoutInscriptionsInput>, ProfessorUncheckedUpdateWithoutInscriptionsInput>
  }

  export type GroupUpdateOneWithoutInscriptionNestedInput = {
    create?: XOR<GroupCreateWithoutInscriptionInput, GroupUncheckedCreateWithoutInscriptionInput>
    connectOrCreate?: GroupCreateOrConnectWithoutInscriptionInput
    upsert?: GroupUpsertWithoutInscriptionInput
    disconnect?: GroupWhereInput | boolean
    delete?: GroupWhereInput | boolean
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutInscriptionInput, GroupUpdateWithoutInscriptionInput>, GroupUncheckedUpdateWithoutInscriptionInput>
  }

  export type InscriptionCandidateUpdateManyWithoutInscriptionNestedInput = {
    create?: XOR<InscriptionCandidateCreateWithoutInscriptionInput, InscriptionCandidateUncheckedCreateWithoutInscriptionInput> | InscriptionCandidateCreateWithoutInscriptionInput[] | InscriptionCandidateUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutInscriptionInput | InscriptionCandidateCreateOrConnectWithoutInscriptionInput[]
    upsert?: InscriptionCandidateUpsertWithWhereUniqueWithoutInscriptionInput | InscriptionCandidateUpsertWithWhereUniqueWithoutInscriptionInput[]
    createMany?: InscriptionCandidateCreateManyInscriptionInputEnvelope
    set?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    disconnect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    delete?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    update?: InscriptionCandidateUpdateWithWhereUniqueWithoutInscriptionInput | InscriptionCandidateUpdateWithWhereUniqueWithoutInscriptionInput[]
    updateMany?: InscriptionCandidateUpdateManyWithWhereWithoutInscriptionInput | InscriptionCandidateUpdateManyWithWhereWithoutInscriptionInput[]
    deleteMany?: InscriptionCandidateScalarWhereInput | InscriptionCandidateScalarWhereInput[]
  }

  export type ReservationUpdateManyWithoutInscriptionNestedInput = {
    create?: XOR<ReservationCreateWithoutInscriptionInput, ReservationUncheckedCreateWithoutInscriptionInput> | ReservationCreateWithoutInscriptionInput[] | ReservationUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutInscriptionInput | ReservationCreateOrConnectWithoutInscriptionInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutInscriptionInput | ReservationUpsertWithWhereUniqueWithoutInscriptionInput[]
    createMany?: ReservationCreateManyInscriptionInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutInscriptionInput | ReservationUpdateWithWhereUniqueWithoutInscriptionInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutInscriptionInput | ReservationUpdateManyWithWhereWithoutInscriptionInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type GroupUncheckedUpdateOneWithoutInscriptionNestedInput = {
    create?: XOR<GroupCreateWithoutInscriptionInput, GroupUncheckedCreateWithoutInscriptionInput>
    connectOrCreate?: GroupCreateOrConnectWithoutInscriptionInput
    upsert?: GroupUpsertWithoutInscriptionInput
    disconnect?: GroupWhereInput | boolean
    delete?: GroupWhereInput | boolean
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutInscriptionInput, GroupUpdateWithoutInscriptionInput>, GroupUncheckedUpdateWithoutInscriptionInput>
  }

  export type InscriptionCandidateUncheckedUpdateManyWithoutInscriptionNestedInput = {
    create?: XOR<InscriptionCandidateCreateWithoutInscriptionInput, InscriptionCandidateUncheckedCreateWithoutInscriptionInput> | InscriptionCandidateCreateWithoutInscriptionInput[] | InscriptionCandidateUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: InscriptionCandidateCreateOrConnectWithoutInscriptionInput | InscriptionCandidateCreateOrConnectWithoutInscriptionInput[]
    upsert?: InscriptionCandidateUpsertWithWhereUniqueWithoutInscriptionInput | InscriptionCandidateUpsertWithWhereUniqueWithoutInscriptionInput[]
    createMany?: InscriptionCandidateCreateManyInscriptionInputEnvelope
    set?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    disconnect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    delete?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    connect?: InscriptionCandidateWhereUniqueInput | InscriptionCandidateWhereUniqueInput[]
    update?: InscriptionCandidateUpdateWithWhereUniqueWithoutInscriptionInput | InscriptionCandidateUpdateWithWhereUniqueWithoutInscriptionInput[]
    updateMany?: InscriptionCandidateUpdateManyWithWhereWithoutInscriptionInput | InscriptionCandidateUpdateManyWithWhereWithoutInscriptionInput[]
    deleteMany?: InscriptionCandidateScalarWhereInput | InscriptionCandidateScalarWhereInput[]
  }

  export type ReservationUncheckedUpdateManyWithoutInscriptionNestedInput = {
    create?: XOR<ReservationCreateWithoutInscriptionInput, ReservationUncheckedCreateWithoutInscriptionInput> | ReservationCreateWithoutInscriptionInput[] | ReservationUncheckedCreateWithoutInscriptionInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutInscriptionInput | ReservationCreateOrConnectWithoutInscriptionInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutInscriptionInput | ReservationUpsertWithWhereUniqueWithoutInscriptionInput[]
    createMany?: ReservationCreateManyInscriptionInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutInscriptionInput | ReservationUpdateWithWhereUniqueWithoutInscriptionInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutInscriptionInput | ReservationUpdateManyWithWhereWithoutInscriptionInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type InscriptionCreateNestedOneWithoutGroupInput = {
    create?: XOR<InscriptionCreateWithoutGroupInput, InscriptionUncheckedCreateWithoutGroupInput>
    connectOrCreate?: InscriptionCreateOrConnectWithoutGroupInput
    connect?: InscriptionWhereUniqueInput
  }

  export type InscriptionUpdateOneRequiredWithoutGroupNestedInput = {
    create?: XOR<InscriptionCreateWithoutGroupInput, InscriptionUncheckedCreateWithoutGroupInput>
    connectOrCreate?: InscriptionCreateOrConnectWithoutGroupInput
    upsert?: InscriptionUpsertWithoutGroupInput
    connect?: InscriptionWhereUniqueInput
    update?: XOR<XOR<InscriptionUpdateToOneWithWhereWithoutGroupInput, InscriptionUpdateWithoutGroupInput>, InscriptionUncheckedUpdateWithoutGroupInput>
  }

  export type InscriptionCreateNestedOneWithoutMembersInput = {
    create?: XOR<InscriptionCreateWithoutMembersInput, InscriptionUncheckedCreateWithoutMembersInput>
    connectOrCreate?: InscriptionCreateOrConnectWithoutMembersInput
    connect?: InscriptionWhereUniqueInput
  }

  export type CandidateCreateNestedOneWithoutInscriptionCandidatesInput = {
    create?: XOR<CandidateCreateWithoutInscriptionCandidatesInput, CandidateUncheckedCreateWithoutInscriptionCandidatesInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutInscriptionCandidatesInput
    connect?: CandidateWhereUniqueInput
  }

  export type InscriptionUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<InscriptionCreateWithoutMembersInput, InscriptionUncheckedCreateWithoutMembersInput>
    connectOrCreate?: InscriptionCreateOrConnectWithoutMembersInput
    upsert?: InscriptionUpsertWithoutMembersInput
    connect?: InscriptionWhereUniqueInput
    update?: XOR<XOR<InscriptionUpdateToOneWithWhereWithoutMembersInput, InscriptionUpdateWithoutMembersInput>, InscriptionUncheckedUpdateWithoutMembersInput>
  }

  export type CandidateUpdateOneRequiredWithoutInscriptionCandidatesNestedInput = {
    create?: XOR<CandidateCreateWithoutInscriptionCandidatesInput, CandidateUncheckedCreateWithoutInscriptionCandidatesInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutInscriptionCandidatesInput
    upsert?: CandidateUpsertWithoutInscriptionCandidatesInput
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutInscriptionCandidatesInput, CandidateUpdateWithoutInscriptionCandidatesInput>, CandidateUncheckedUpdateWithoutInscriptionCandidatesInput>
  }

  export type CandidateCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<CandidateCreateWithoutPaymentsInput, CandidateUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutPaymentsInput
    connect?: CandidateWhereUniqueInput
  }

  export type FormationCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<FormationCreateWithoutPaymentsInput, FormationUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutPaymentsInput
    connect?: FormationWhereUniqueInput
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type CandidateUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<CandidateCreateWithoutPaymentsInput, CandidateUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutPaymentsInput
    upsert?: CandidateUpsertWithoutPaymentsInput
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutPaymentsInput, CandidateUpdateWithoutPaymentsInput>, CandidateUncheckedUpdateWithoutPaymentsInput>
  }

  export type FormationUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<FormationCreateWithoutPaymentsInput, FormationUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutPaymentsInput
    upsert?: FormationUpsertWithoutPaymentsInput
    connect?: FormationWhereUniqueInput
    update?: XOR<XOR<FormationUpdateToOneWithWhereWithoutPaymentsInput, FormationUpdateWithoutPaymentsInput>, FormationUncheckedUpdateWithoutPaymentsInput>
  }

  export type InscriptionCreateNestedOneWithoutReservationsInput = {
    create?: XOR<InscriptionCreateWithoutReservationsInput, InscriptionUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: InscriptionCreateOrConnectWithoutReservationsInput
    connect?: InscriptionWhereUniqueInput
  }

  export type ProfessorCreateNestedOneWithoutReservationsInput = {
    create?: XOR<ProfessorCreateWithoutReservationsInput, ProfessorUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutReservationsInput
    connect?: ProfessorWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutReservationsInput = {
    create?: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutReservationsInput
    connect?: RoomWhereUniqueInput
  }

  export type EnumReservationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReservationStatus
  }

  export type InscriptionUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: XOR<InscriptionCreateWithoutReservationsInput, InscriptionUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: InscriptionCreateOrConnectWithoutReservationsInput
    upsert?: InscriptionUpsertWithoutReservationsInput
    connect?: InscriptionWhereUniqueInput
    update?: XOR<XOR<InscriptionUpdateToOneWithWhereWithoutReservationsInput, InscriptionUpdateWithoutReservationsInput>, InscriptionUncheckedUpdateWithoutReservationsInput>
  }

  export type ProfessorUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: XOR<ProfessorCreateWithoutReservationsInput, ProfessorUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutReservationsInput
    upsert?: ProfessorUpsertWithoutReservationsInput
    connect?: ProfessorWhereUniqueInput
    update?: XOR<XOR<ProfessorUpdateToOneWithWhereWithoutReservationsInput, ProfessorUpdateWithoutReservationsInput>, ProfessorUncheckedUpdateWithoutReservationsInput>
  }

  export type RoomUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutReservationsInput
    upsert?: RoomUpsertWithoutReservationsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutReservationsInput, RoomUpdateWithoutReservationsInput>, RoomUncheckedUpdateWithoutReservationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumOccupationFilter<$PrismaModel = never> = {
    equals?: $Enums.Occupation | EnumOccupationFieldRefInput<$PrismaModel>
    in?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    not?: NestedEnumOccupationFilter<$PrismaModel> | $Enums.Occupation
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumObservationFilter<$PrismaModel = never> = {
    equals?: $Enums.Observation | EnumObservationFieldRefInput<$PrismaModel>
    in?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    not?: NestedEnumObservationFilter<$PrismaModel> | $Enums.Observation
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumOccupationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Occupation | EnumOccupationFieldRefInput<$PrismaModel>
    in?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Occupation[] | ListEnumOccupationFieldRefInput<$PrismaModel>
    not?: NestedEnumOccupationWithAggregatesFilter<$PrismaModel> | $Enums.Occupation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOccupationFilter<$PrismaModel>
    _max?: NestedEnumOccupationFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumObservationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Observation | EnumObservationFieldRefInput<$PrismaModel>
    in?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    notIn?: $Enums.Observation[] | ListEnumObservationFieldRefInput<$PrismaModel>
    not?: NestedEnumObservationWithAggregatesFilter<$PrismaModel> | $Enums.Observation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumObservationFilter<$PrismaModel>
    _max?: NestedEnumObservationFilter<$PrismaModel>
  }

  export type NestedEnumCandidateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateStatus | EnumCandidateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateStatusFilter<$PrismaModel> | $Enums.CandidateStatus
  }

  export type NestedEnumCandidateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CandidateStatus | EnumCandidateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CandidateStatus[] | ListEnumCandidateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCandidateStatusWithAggregatesFilter<$PrismaModel> | $Enums.CandidateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCandidateStatusFilter<$PrismaModel>
    _max?: NestedEnumCandidateStatusFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumInscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InscriptionStatus | EnumInscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInscriptionStatusFilter<$PrismaModel> | $Enums.InscriptionStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLearningModeFilter<$PrismaModel = never> = {
    equals?: $Enums.LearningMode | EnumLearningModeFieldRefInput<$PrismaModel>
    in?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    not?: NestedEnumLearningModeFilter<$PrismaModel> | $Enums.LearningMode
  }

  export type NestedEnumInscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InscriptionStatus | EnumInscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InscriptionStatus[] | ListEnumInscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.InscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumInscriptionStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumLearningModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LearningMode | EnumLearningModeFieldRefInput<$PrismaModel>
    in?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LearningMode[] | ListEnumLearningModeFieldRefInput<$PrismaModel>
    not?: NestedEnumLearningModeWithAggregatesFilter<$PrismaModel> | $Enums.LearningMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLearningModeFilter<$PrismaModel>
    _max?: NestedEnumLearningModeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type InscriptionCreateWithoutCandidateInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    createdAt?: Date | string
    updatedAt?: Date | string
    formation: FormationCreateNestedOneWithoutInscriptionsInput
    professor?: ProfessorCreateNestedOneWithoutInscriptionsInput
    group?: GroupCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUncheckedCreateWithoutCandidateInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    formationId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupUncheckedCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateUncheckedCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionCreateOrConnectWithoutCandidateInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutCandidateInput, InscriptionUncheckedCreateWithoutCandidateInput>
  }

  export type InscriptionCreateManyCandidateInputEnvelope = {
    data: InscriptionCreateManyCandidateInput | InscriptionCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type InscriptionCandidateCreateWithoutCandidateInput = {
    id?: string
    createdAt?: Date | string
    inscription: InscriptionCreateNestedOneWithoutMembersInput
  }

  export type InscriptionCandidateUncheckedCreateWithoutCandidateInput = {
    id?: string
    inscriptionId: string
    createdAt?: Date | string
  }

  export type InscriptionCandidateCreateOrConnectWithoutCandidateInput = {
    where: InscriptionCandidateWhereUniqueInput
    create: XOR<InscriptionCandidateCreateWithoutCandidateInput, InscriptionCandidateUncheckedCreateWithoutCandidateInput>
  }

  export type InscriptionCandidateCreateManyCandidateInputEnvelope = {
    data: InscriptionCandidateCreateManyCandidateInput | InscriptionCandidateCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutCandidateInput = {
    id?: string
    paymentCode: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    formation: FormationCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutCandidateInput = {
    id?: string
    paymentCode: string
    formationId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutCandidateInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutCandidateInput, PaymentUncheckedCreateWithoutCandidateInput>
  }

  export type PaymentCreateManyCandidateInputEnvelope = {
    data: PaymentCreateManyCandidateInput | PaymentCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type InscriptionUpsertWithWhereUniqueWithoutCandidateInput = {
    where: InscriptionWhereUniqueInput
    update: XOR<InscriptionUpdateWithoutCandidateInput, InscriptionUncheckedUpdateWithoutCandidateInput>
    create: XOR<InscriptionCreateWithoutCandidateInput, InscriptionUncheckedCreateWithoutCandidateInput>
  }

  export type InscriptionUpdateWithWhereUniqueWithoutCandidateInput = {
    where: InscriptionWhereUniqueInput
    data: XOR<InscriptionUpdateWithoutCandidateInput, InscriptionUncheckedUpdateWithoutCandidateInput>
  }

  export type InscriptionUpdateManyWithWhereWithoutCandidateInput = {
    where: InscriptionScalarWhereInput
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyWithoutCandidateInput>
  }

  export type InscriptionScalarWhereInput = {
    AND?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
    OR?: InscriptionScalarWhereInput[]
    NOT?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
    id?: StringFilter<"Inscription"> | string
    dateInscription?: DateTimeFilter<"Inscription"> | Date | string
    status?: EnumInscriptionStatusFilter<"Inscription"> | $Enums.InscriptionStatus
    note?: StringNullableFilter<"Inscription"> | string | null
    duration?: IntNullableFilter<"Inscription"> | number | null
    price?: FloatNullableFilter<"Inscription"> | number | null
    volumeHoraire?: IntNullableFilter<"Inscription"> | number | null
    remainingHours?: FloatFilter<"Inscription"> | number
    learningMode?: EnumLearningModeFilter<"Inscription"> | $Enums.LearningMode
    candidateId?: StringFilter<"Inscription"> | string
    formationId?: StringFilter<"Inscription"> | string
    professorId?: StringNullableFilter<"Inscription"> | string | null
    createdAt?: DateTimeFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeFilter<"Inscription"> | Date | string
  }

  export type InscriptionCandidateUpsertWithWhereUniqueWithoutCandidateInput = {
    where: InscriptionCandidateWhereUniqueInput
    update: XOR<InscriptionCandidateUpdateWithoutCandidateInput, InscriptionCandidateUncheckedUpdateWithoutCandidateInput>
    create: XOR<InscriptionCandidateCreateWithoutCandidateInput, InscriptionCandidateUncheckedCreateWithoutCandidateInput>
  }

  export type InscriptionCandidateUpdateWithWhereUniqueWithoutCandidateInput = {
    where: InscriptionCandidateWhereUniqueInput
    data: XOR<InscriptionCandidateUpdateWithoutCandidateInput, InscriptionCandidateUncheckedUpdateWithoutCandidateInput>
  }

  export type InscriptionCandidateUpdateManyWithWhereWithoutCandidateInput = {
    where: InscriptionCandidateScalarWhereInput
    data: XOR<InscriptionCandidateUpdateManyMutationInput, InscriptionCandidateUncheckedUpdateManyWithoutCandidateInput>
  }

  export type InscriptionCandidateScalarWhereInput = {
    AND?: InscriptionCandidateScalarWhereInput | InscriptionCandidateScalarWhereInput[]
    OR?: InscriptionCandidateScalarWhereInput[]
    NOT?: InscriptionCandidateScalarWhereInput | InscriptionCandidateScalarWhereInput[]
    id?: StringFilter<"InscriptionCandidate"> | string
    inscriptionId?: StringFilter<"InscriptionCandidate"> | string
    candidateId?: StringFilter<"InscriptionCandidate"> | string
    createdAt?: DateTimeFilter<"InscriptionCandidate"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutCandidateInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutCandidateInput, PaymentUncheckedUpdateWithoutCandidateInput>
    create: XOR<PaymentCreateWithoutCandidateInput, PaymentUncheckedCreateWithoutCandidateInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutCandidateInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutCandidateInput, PaymentUncheckedUpdateWithoutCandidateInput>
  }

  export type PaymentUpdateManyWithWhereWithoutCandidateInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutCandidateInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    paymentCode?: StringFilter<"Payment"> | string
    candidateId?: StringFilter<"Payment"> | string
    formationId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    note?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type InscriptionCreateWithoutFormationInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutInscriptionsInput
    professor?: ProfessorCreateNestedOneWithoutInscriptionsInput
    group?: GroupCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUncheckedCreateWithoutFormationInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupUncheckedCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateUncheckedCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionCreateOrConnectWithoutFormationInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput>
  }

  export type InscriptionCreateManyFormationInputEnvelope = {
    data: InscriptionCreateManyFormationInput | InscriptionCreateManyFormationInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutFormationInput = {
    id?: string
    paymentCode: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutFormationInput = {
    id?: string
    paymentCode: string
    candidateId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutFormationInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutFormationInput, PaymentUncheckedCreateWithoutFormationInput>
  }

  export type PaymentCreateManyFormationInputEnvelope = {
    data: PaymentCreateManyFormationInput | PaymentCreateManyFormationInput[]
    skipDuplicates?: boolean
  }

  export type InscriptionUpsertWithWhereUniqueWithoutFormationInput = {
    where: InscriptionWhereUniqueInput
    update: XOR<InscriptionUpdateWithoutFormationInput, InscriptionUncheckedUpdateWithoutFormationInput>
    create: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput>
  }

  export type InscriptionUpdateWithWhereUniqueWithoutFormationInput = {
    where: InscriptionWhereUniqueInput
    data: XOR<InscriptionUpdateWithoutFormationInput, InscriptionUncheckedUpdateWithoutFormationInput>
  }

  export type InscriptionUpdateManyWithWhereWithoutFormationInput = {
    where: InscriptionScalarWhereInput
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyWithoutFormationInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutFormationInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutFormationInput, PaymentUncheckedUpdateWithoutFormationInput>
    create: XOR<PaymentCreateWithoutFormationInput, PaymentUncheckedCreateWithoutFormationInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutFormationInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutFormationInput, PaymentUncheckedUpdateWithoutFormationInput>
  }

  export type PaymentUpdateManyWithWhereWithoutFormationInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutFormationInput>
  }

  export type ReservationCreateWithoutRoomInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscription: InscriptionCreateNestedOneWithoutReservationsInput
    professor: ProfessorCreateNestedOneWithoutReservationsInput
  }

  export type ReservationUncheckedCreateWithoutRoomInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    inscriptionId: string
    professorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationCreateOrConnectWithoutRoomInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput>
  }

  export type ReservationCreateManyRoomInputEnvelope = {
    data: ReservationCreateManyRoomInput | ReservationCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type ReservationUpsertWithWhereUniqueWithoutRoomInput = {
    where: ReservationWhereUniqueInput
    update: XOR<ReservationUpdateWithoutRoomInput, ReservationUncheckedUpdateWithoutRoomInput>
    create: XOR<ReservationCreateWithoutRoomInput, ReservationUncheckedCreateWithoutRoomInput>
  }

  export type ReservationUpdateWithWhereUniqueWithoutRoomInput = {
    where: ReservationWhereUniqueInput
    data: XOR<ReservationUpdateWithoutRoomInput, ReservationUncheckedUpdateWithoutRoomInput>
  }

  export type ReservationUpdateManyWithWhereWithoutRoomInput = {
    where: ReservationScalarWhereInput
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyWithoutRoomInput>
  }

  export type ReservationScalarWhereInput = {
    AND?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
    OR?: ReservationScalarWhereInput[]
    NOT?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
    id?: StringFilter<"Reservation"> | string
    reservationCode?: StringFilter<"Reservation"> | string
    reservationDate?: DateTimeFilter<"Reservation"> | Date | string
    startTime?: DateTimeFilter<"Reservation"> | Date | string
    endTime?: DateTimeFilter<"Reservation"> | Date | string
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    inscriptionId?: StringFilter<"Reservation"> | string
    professorId?: StringFilter<"Reservation"> | string
    roomId?: StringFilter<"Reservation"> | string
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeFilter<"Reservation"> | Date | string
  }

  export type InscriptionCreateWithoutProfessorInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutInscriptionsInput
    formation: FormationCreateNestedOneWithoutInscriptionsInput
    group?: GroupCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUncheckedCreateWithoutProfessorInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    formationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupUncheckedCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateUncheckedCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionCreateOrConnectWithoutProfessorInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutProfessorInput, InscriptionUncheckedCreateWithoutProfessorInput>
  }

  export type InscriptionCreateManyProfessorInputEnvelope = {
    data: InscriptionCreateManyProfessorInput | InscriptionCreateManyProfessorInput[]
    skipDuplicates?: boolean
  }

  export type ReservationCreateWithoutProfessorInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscription: InscriptionCreateNestedOneWithoutReservationsInput
    room: RoomCreateNestedOneWithoutReservationsInput
  }

  export type ReservationUncheckedCreateWithoutProfessorInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    inscriptionId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationCreateOrConnectWithoutProfessorInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutProfessorInput, ReservationUncheckedCreateWithoutProfessorInput>
  }

  export type ReservationCreateManyProfessorInputEnvelope = {
    data: ReservationCreateManyProfessorInput | ReservationCreateManyProfessorInput[]
    skipDuplicates?: boolean
  }

  export type InscriptionUpsertWithWhereUniqueWithoutProfessorInput = {
    where: InscriptionWhereUniqueInput
    update: XOR<InscriptionUpdateWithoutProfessorInput, InscriptionUncheckedUpdateWithoutProfessorInput>
    create: XOR<InscriptionCreateWithoutProfessorInput, InscriptionUncheckedCreateWithoutProfessorInput>
  }

  export type InscriptionUpdateWithWhereUniqueWithoutProfessorInput = {
    where: InscriptionWhereUniqueInput
    data: XOR<InscriptionUpdateWithoutProfessorInput, InscriptionUncheckedUpdateWithoutProfessorInput>
  }

  export type InscriptionUpdateManyWithWhereWithoutProfessorInput = {
    where: InscriptionScalarWhereInput
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyWithoutProfessorInput>
  }

  export type ReservationUpsertWithWhereUniqueWithoutProfessorInput = {
    where: ReservationWhereUniqueInput
    update: XOR<ReservationUpdateWithoutProfessorInput, ReservationUncheckedUpdateWithoutProfessorInput>
    create: XOR<ReservationCreateWithoutProfessorInput, ReservationUncheckedCreateWithoutProfessorInput>
  }

  export type ReservationUpdateWithWhereUniqueWithoutProfessorInput = {
    where: ReservationWhereUniqueInput
    data: XOR<ReservationUpdateWithoutProfessorInput, ReservationUncheckedUpdateWithoutProfessorInput>
  }

  export type ReservationUpdateManyWithWhereWithoutProfessorInput = {
    where: ReservationScalarWhereInput
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyWithoutProfessorInput>
  }

  export type CandidateCreateWithoutInscriptionsInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptionCandidates?: InscriptionCandidateCreateNestedManyWithoutCandidateInput
    payments?: PaymentCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutInscriptionsInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptionCandidates?: InscriptionCandidateUncheckedCreateNestedManyWithoutCandidateInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutInscriptionsInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutInscriptionsInput, CandidateUncheckedCreateWithoutInscriptionsInput>
  }

  export type FormationCreateWithoutInscriptionsInput = {
    id?: string
    matiere: string
    niveau: string
    type?: string
    duration?: number
    totalSessions?: number
    prix?: Decimal | DecimalJsLike | number | string
    volumeHoraire?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateWithoutInscriptionsInput = {
    id?: string
    matiere: string
    niveau: string
    type?: string
    duration?: number
    totalSessions?: number
    prix?: Decimal | DecimalJsLike | number | string
    volumeHoraire?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationCreateOrConnectWithoutInscriptionsInput = {
    where: FormationWhereUniqueInput
    create: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
  }

  export type ProfessorCreateWithoutInscriptionsInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    adresse?: string | null
    type?: string
    dayOff?: string
    maxSessions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reservations?: ReservationCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUncheckedCreateWithoutInscriptionsInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    adresse?: string | null
    type?: string
    dayOff?: string
    maxSessions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reservations?: ReservationUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorCreateOrConnectWithoutInscriptionsInput = {
    where: ProfessorWhereUniqueInput
    create: XOR<ProfessorCreateWithoutInscriptionsInput, ProfessorUncheckedCreateWithoutInscriptionsInput>
  }

  export type GroupCreateWithoutInscriptionInput = {
    id?: string
    nom: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUncheckedCreateWithoutInscriptionInput = {
    id?: string
    nom: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupCreateOrConnectWithoutInscriptionInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutInscriptionInput, GroupUncheckedCreateWithoutInscriptionInput>
  }

  export type InscriptionCandidateCreateWithoutInscriptionInput = {
    id?: string
    createdAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutInscriptionCandidatesInput
  }

  export type InscriptionCandidateUncheckedCreateWithoutInscriptionInput = {
    id?: string
    candidateId: string
    createdAt?: Date | string
  }

  export type InscriptionCandidateCreateOrConnectWithoutInscriptionInput = {
    where: InscriptionCandidateWhereUniqueInput
    create: XOR<InscriptionCandidateCreateWithoutInscriptionInput, InscriptionCandidateUncheckedCreateWithoutInscriptionInput>
  }

  export type InscriptionCandidateCreateManyInscriptionInputEnvelope = {
    data: InscriptionCandidateCreateManyInscriptionInput | InscriptionCandidateCreateManyInscriptionInput[]
    skipDuplicates?: boolean
  }

  export type ReservationCreateWithoutInscriptionInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    professor: ProfessorCreateNestedOneWithoutReservationsInput
    room: RoomCreateNestedOneWithoutReservationsInput
  }

  export type ReservationUncheckedCreateWithoutInscriptionInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    professorId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationCreateOrConnectWithoutInscriptionInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutInscriptionInput, ReservationUncheckedCreateWithoutInscriptionInput>
  }

  export type ReservationCreateManyInscriptionInputEnvelope = {
    data: ReservationCreateManyInscriptionInput | ReservationCreateManyInscriptionInput[]
    skipDuplicates?: boolean
  }

  export type CandidateUpsertWithoutInscriptionsInput = {
    update: XOR<CandidateUpdateWithoutInscriptionsInput, CandidateUncheckedUpdateWithoutInscriptionsInput>
    create: XOR<CandidateCreateWithoutInscriptionsInput, CandidateUncheckedCreateWithoutInscriptionsInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutInscriptionsInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutInscriptionsInput, CandidateUncheckedUpdateWithoutInscriptionsInput>
  }

  export type CandidateUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptionCandidates?: InscriptionCandidateUpdateManyWithoutCandidateNestedInput
    payments?: PaymentUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptionCandidates?: InscriptionCandidateUncheckedUpdateManyWithoutCandidateNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type FormationUpsertWithoutInscriptionsInput = {
    update: XOR<FormationUpdateWithoutInscriptionsInput, FormationUncheckedUpdateWithoutInscriptionsInput>
    create: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
    where?: FormationWhereInput
  }

  export type FormationUpdateToOneWithWhereWithoutInscriptionsInput = {
    where?: FormationWhereInput
    data: XOR<FormationUpdateWithoutInscriptionsInput, FormationUncheckedUpdateWithoutInscriptionsInput>
  }

  export type FormationUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type ProfessorUpsertWithoutInscriptionsInput = {
    update: XOR<ProfessorUpdateWithoutInscriptionsInput, ProfessorUncheckedUpdateWithoutInscriptionsInput>
    create: XOR<ProfessorCreateWithoutInscriptionsInput, ProfessorUncheckedCreateWithoutInscriptionsInput>
    where?: ProfessorWhereInput
  }

  export type ProfessorUpdateToOneWithWhereWithoutInscriptionsInput = {
    where?: ProfessorWhereInput
    data: XOR<ProfessorUpdateWithoutInscriptionsInput, ProfessorUncheckedUpdateWithoutInscriptionsInput>
  }

  export type ProfessorUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservations?: ReservationUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservations?: ReservationUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type GroupUpsertWithoutInscriptionInput = {
    update: XOR<GroupUpdateWithoutInscriptionInput, GroupUncheckedUpdateWithoutInscriptionInput>
    create: XOR<GroupCreateWithoutInscriptionInput, GroupUncheckedCreateWithoutInscriptionInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutInscriptionInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutInscriptionInput, GroupUncheckedUpdateWithoutInscriptionInput>
  }

  export type GroupUpdateWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateUpsertWithWhereUniqueWithoutInscriptionInput = {
    where: InscriptionCandidateWhereUniqueInput
    update: XOR<InscriptionCandidateUpdateWithoutInscriptionInput, InscriptionCandidateUncheckedUpdateWithoutInscriptionInput>
    create: XOR<InscriptionCandidateCreateWithoutInscriptionInput, InscriptionCandidateUncheckedCreateWithoutInscriptionInput>
  }

  export type InscriptionCandidateUpdateWithWhereUniqueWithoutInscriptionInput = {
    where: InscriptionCandidateWhereUniqueInput
    data: XOR<InscriptionCandidateUpdateWithoutInscriptionInput, InscriptionCandidateUncheckedUpdateWithoutInscriptionInput>
  }

  export type InscriptionCandidateUpdateManyWithWhereWithoutInscriptionInput = {
    where: InscriptionCandidateScalarWhereInput
    data: XOR<InscriptionCandidateUpdateManyMutationInput, InscriptionCandidateUncheckedUpdateManyWithoutInscriptionInput>
  }

  export type ReservationUpsertWithWhereUniqueWithoutInscriptionInput = {
    where: ReservationWhereUniqueInput
    update: XOR<ReservationUpdateWithoutInscriptionInput, ReservationUncheckedUpdateWithoutInscriptionInput>
    create: XOR<ReservationCreateWithoutInscriptionInput, ReservationUncheckedCreateWithoutInscriptionInput>
  }

  export type ReservationUpdateWithWhereUniqueWithoutInscriptionInput = {
    where: ReservationWhereUniqueInput
    data: XOR<ReservationUpdateWithoutInscriptionInput, ReservationUncheckedUpdateWithoutInscriptionInput>
  }

  export type ReservationUpdateManyWithWhereWithoutInscriptionInput = {
    where: ReservationScalarWhereInput
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyWithoutInscriptionInput>
  }

  export type InscriptionCreateWithoutGroupInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutInscriptionsInput
    formation: FormationCreateNestedOneWithoutInscriptionsInput
    professor?: ProfessorCreateNestedOneWithoutInscriptionsInput
    members?: InscriptionCandidateCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUncheckedCreateWithoutGroupInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    formationId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: InscriptionCandidateUncheckedCreateNestedManyWithoutInscriptionInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionCreateOrConnectWithoutGroupInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutGroupInput, InscriptionUncheckedCreateWithoutGroupInput>
  }

  export type InscriptionUpsertWithoutGroupInput = {
    update: XOR<InscriptionUpdateWithoutGroupInput, InscriptionUncheckedUpdateWithoutGroupInput>
    create: XOR<InscriptionCreateWithoutGroupInput, InscriptionUncheckedCreateWithoutGroupInput>
    where?: InscriptionWhereInput
  }

  export type InscriptionUpdateToOneWithWhereWithoutGroupInput = {
    where?: InscriptionWhereInput
    data: XOR<InscriptionUpdateWithoutGroupInput, InscriptionUncheckedUpdateWithoutGroupInput>
  }

  export type InscriptionUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionsNestedInput
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
    professor?: ProfessorUpdateOneWithoutInscriptionsNestedInput
    members?: InscriptionCandidateUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: InscriptionCandidateUncheckedUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionCreateWithoutMembersInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutInscriptionsInput
    formation: FormationCreateNestedOneWithoutInscriptionsInput
    professor?: ProfessorCreateNestedOneWithoutInscriptionsInput
    group?: GroupCreateNestedOneWithoutInscriptionInput
    reservations?: ReservationCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUncheckedCreateWithoutMembersInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    formationId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupUncheckedCreateNestedOneWithoutInscriptionInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionCreateOrConnectWithoutMembersInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutMembersInput, InscriptionUncheckedCreateWithoutMembersInput>
  }

  export type CandidateCreateWithoutInscriptionCandidatesInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutCandidateInput
    payments?: PaymentCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutInscriptionCandidatesInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutCandidateInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutInscriptionCandidatesInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutInscriptionCandidatesInput, CandidateUncheckedCreateWithoutInscriptionCandidatesInput>
  }

  export type InscriptionUpsertWithoutMembersInput = {
    update: XOR<InscriptionUpdateWithoutMembersInput, InscriptionUncheckedUpdateWithoutMembersInput>
    create: XOR<InscriptionCreateWithoutMembersInput, InscriptionUncheckedCreateWithoutMembersInput>
    where?: InscriptionWhereInput
  }

  export type InscriptionUpdateToOneWithWhereWithoutMembersInput = {
    where?: InscriptionWhereInput
    data: XOR<InscriptionUpdateWithoutMembersInput, InscriptionUncheckedUpdateWithoutMembersInput>
  }

  export type InscriptionUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionsNestedInput
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
    professor?: ProfessorUpdateOneWithoutInscriptionsNestedInput
    group?: GroupUpdateOneWithoutInscriptionNestedInput
    reservations?: ReservationUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUncheckedUpdateOneWithoutInscriptionNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutInscriptionNestedInput
  }

  export type CandidateUpsertWithoutInscriptionCandidatesInput = {
    update: XOR<CandidateUpdateWithoutInscriptionCandidatesInput, CandidateUncheckedUpdateWithoutInscriptionCandidatesInput>
    create: XOR<CandidateCreateWithoutInscriptionCandidatesInput, CandidateUncheckedCreateWithoutInscriptionCandidatesInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutInscriptionCandidatesInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutInscriptionCandidatesInput, CandidateUncheckedUpdateWithoutInscriptionCandidatesInput>
  }

  export type CandidateUpdateWithoutInscriptionCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutCandidateNestedInput
    payments?: PaymentUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutInscriptionCandidatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutCandidateNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateCreateWithoutPaymentsInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutCandidateInput
    inscriptionCandidates?: InscriptionCandidateCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutPaymentsInput = {
    id?: string
    candidateCode: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    age: number
    occupation: $Enums.Occupation
    giftCode?: string | null
    observation: $Enums.Observation
    contact?: CandidateCreatecontactInput | string[]
    action?: string | null
    status?: $Enums.CandidateStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutCandidateInput
    inscriptionCandidates?: InscriptionCandidateUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutPaymentsInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutPaymentsInput, CandidateUncheckedCreateWithoutPaymentsInput>
  }

  export type FormationCreateWithoutPaymentsInput = {
    id?: string
    matiere: string
    niveau: string
    type?: string
    duration?: number
    totalSessions?: number
    prix?: Decimal | DecimalJsLike | number | string
    volumeHoraire?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateWithoutPaymentsInput = {
    id?: string
    matiere: string
    niveau: string
    type?: string
    duration?: number
    totalSessions?: number
    prix?: Decimal | DecimalJsLike | number | string
    volumeHoraire?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationCreateOrConnectWithoutPaymentsInput = {
    where: FormationWhereUniqueInput
    create: XOR<FormationCreateWithoutPaymentsInput, FormationUncheckedCreateWithoutPaymentsInput>
  }

  export type CandidateUpsertWithoutPaymentsInput = {
    update: XOR<CandidateUpdateWithoutPaymentsInput, CandidateUncheckedUpdateWithoutPaymentsInput>
    create: XOR<CandidateCreateWithoutPaymentsInput, CandidateUncheckedCreateWithoutPaymentsInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutPaymentsInput, CandidateUncheckedUpdateWithoutPaymentsInput>
  }

  export type CandidateUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutCandidateNestedInput
    inscriptionCandidates?: InscriptionCandidateUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateCode?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    age?: IntFieldUpdateOperationsInput | number
    occupation?: EnumOccupationFieldUpdateOperationsInput | $Enums.Occupation
    giftCode?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: EnumObservationFieldUpdateOperationsInput | $Enums.Observation
    contact?: CandidateUpdatecontactInput | string[]
    action?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCandidateStatusFieldUpdateOperationsInput | $Enums.CandidateStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutCandidateNestedInput
    inscriptionCandidates?: InscriptionCandidateUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type FormationUpsertWithoutPaymentsInput = {
    update: XOR<FormationUpdateWithoutPaymentsInput, FormationUncheckedUpdateWithoutPaymentsInput>
    create: XOR<FormationCreateWithoutPaymentsInput, FormationUncheckedCreateWithoutPaymentsInput>
    where?: FormationWhereInput
  }

  export type FormationUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: FormationWhereInput
    data: XOR<FormationUpdateWithoutPaymentsInput, FormationUncheckedUpdateWithoutPaymentsInput>
  }

  export type FormationUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    matiere?: StringFieldUpdateOperationsInput | string
    niveau?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    totalSessions?: IntFieldUpdateOperationsInput | number
    prix?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volumeHoraire?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type InscriptionCreateWithoutReservationsInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutInscriptionsInput
    formation: FormationCreateNestedOneWithoutInscriptionsInput
    professor?: ProfessorCreateNestedOneWithoutInscriptionsInput
    group?: GroupCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionUncheckedCreateWithoutReservationsInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    formationId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupUncheckedCreateNestedOneWithoutInscriptionInput
    members?: InscriptionCandidateUncheckedCreateNestedManyWithoutInscriptionInput
  }

  export type InscriptionCreateOrConnectWithoutReservationsInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutReservationsInput, InscriptionUncheckedCreateWithoutReservationsInput>
  }

  export type ProfessorCreateWithoutReservationsInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    adresse?: string | null
    type?: string
    dayOff?: string
    maxSessions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUncheckedCreateWithoutReservationsInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    adresse?: string | null
    type?: string
    dayOff?: string
    maxSessions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorCreateOrConnectWithoutReservationsInput = {
    where: ProfessorWhereUniqueInput
    create: XOR<ProfessorCreateWithoutReservationsInput, ProfessorUncheckedCreateWithoutReservationsInput>
  }

  export type RoomCreateWithoutReservationsInput = {
    id?: string
    numero: string
    capacite: number
    type?: string
    available?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUncheckedCreateWithoutReservationsInput = {
    id?: string
    numero: string
    capacite: number
    type?: string
    available?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutReservationsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
  }

  export type InscriptionUpsertWithoutReservationsInput = {
    update: XOR<InscriptionUpdateWithoutReservationsInput, InscriptionUncheckedUpdateWithoutReservationsInput>
    create: XOR<InscriptionCreateWithoutReservationsInput, InscriptionUncheckedCreateWithoutReservationsInput>
    where?: InscriptionWhereInput
  }

  export type InscriptionUpdateToOneWithWhereWithoutReservationsInput = {
    where?: InscriptionWhereInput
    data: XOR<InscriptionUpdateWithoutReservationsInput, InscriptionUncheckedUpdateWithoutReservationsInput>
  }

  export type InscriptionUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionsNestedInput
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
    professor?: ProfessorUpdateOneWithoutInscriptionsNestedInput
    group?: GroupUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUncheckedUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUncheckedUpdateManyWithoutInscriptionNestedInput
  }

  export type ProfessorUpsertWithoutReservationsInput = {
    update: XOR<ProfessorUpdateWithoutReservationsInput, ProfessorUncheckedUpdateWithoutReservationsInput>
    create: XOR<ProfessorCreateWithoutReservationsInput, ProfessorUncheckedCreateWithoutReservationsInput>
    where?: ProfessorWhereInput
  }

  export type ProfessorUpdateToOneWithWhereWithoutReservationsInput = {
    where?: ProfessorWhereInput
    data: XOR<ProfessorUpdateWithoutReservationsInput, ProfessorUncheckedUpdateWithoutReservationsInput>
  }

  export type ProfessorUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    adresse?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    dayOff?: StringFieldUpdateOperationsInput | string
    maxSessions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type RoomUpsertWithoutReservationsInput = {
    update: XOR<RoomUpdateWithoutReservationsInput, RoomUncheckedUpdateWithoutReservationsInput>
    create: XOR<RoomCreateWithoutReservationsInput, RoomUncheckedCreateWithoutReservationsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutReservationsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutReservationsInput, RoomUncheckedUpdateWithoutReservationsInput>
  }

  export type RoomUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    capacite?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    capacite?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCreateManyCandidateInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    formationId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionCandidateCreateManyCandidateInput = {
    id?: string
    inscriptionId: string
    createdAt?: Date | string
  }

  export type PaymentCreateManyCandidateInput = {
    id?: string
    paymentCode: string
    formationId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
    professor?: ProfessorUpdateOneWithoutInscriptionsNestedInput
    group?: GroupUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    formationId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUncheckedUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUncheckedUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateManyWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    formationId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscription?: InscriptionUpdateOneRequiredWithoutMembersNestedInput
  }

  export type InscriptionCandidateUncheckedUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inscriptionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateUncheckedUpdateManyWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inscriptionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formation?: FormationUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutCandidateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCreateManyFormationInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    professorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyFormationInput = {
    id?: string
    paymentCode: string
    candidateId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    paymentDate?: Date | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionsNestedInput
    professor?: ProfessorUpdateOneWithoutInscriptionsNestedInput
    group?: GroupUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUncheckedUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUncheckedUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateManyWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    professorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentCode?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationCreateManyRoomInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    inscriptionId: string
    professorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscription?: InscriptionUpdateOneRequiredWithoutReservationsNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutReservationsNestedInput
  }

  export type ReservationUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    inscriptionId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    inscriptionId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCreateManyProfessorInput = {
    id?: string
    dateInscription?: Date | string
    status?: $Enums.InscriptionStatus
    note?: string | null
    duration?: number | null
    price?: number | null
    volumeHoraire?: number | null
    remainingHours?: number
    learningMode?: $Enums.LearningMode
    candidateId: string
    formationId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationCreateManyProfessorInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    inscriptionId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionsNestedInput
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
    group?: GroupUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUncheckedUpdateOneWithoutInscriptionNestedInput
    members?: InscriptionCandidateUncheckedUpdateManyWithoutInscriptionNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutInscriptionNestedInput
  }

  export type InscriptionUncheckedUpdateManyWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateInscription?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumInscriptionStatusFieldUpdateOperationsInput | $Enums.InscriptionStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    volumeHoraire?: NullableIntFieldUpdateOperationsInput | number | null
    remainingHours?: FloatFieldUpdateOperationsInput | number
    learningMode?: EnumLearningModeFieldUpdateOperationsInput | $Enums.LearningMode
    candidateId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscription?: InscriptionUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneRequiredWithoutReservationsNestedInput
  }

  export type ReservationUncheckedUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    inscriptionId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUncheckedUpdateManyWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    inscriptionId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateCreateManyInscriptionInput = {
    id?: string
    candidateId: string
    createdAt?: Date | string
  }

  export type ReservationCreateManyInscriptionInput = {
    id?: string
    reservationCode: string
    reservationDate: Date | string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ReservationStatus
    professorId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionCandidateUpdateWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutInscriptionCandidatesNestedInput
  }

  export type InscriptionCandidateUncheckedUpdateWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCandidateUncheckedUpdateManyWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    candidateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUpdateWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: ProfessorUpdateOneRequiredWithoutReservationsNestedInput
    room?: RoomUpdateOneRequiredWithoutReservationsNestedInput
  }

  export type ReservationUncheckedUpdateWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUncheckedUpdateManyWithoutInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    reservationCode?: StringFieldUpdateOperationsInput | string
    reservationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}