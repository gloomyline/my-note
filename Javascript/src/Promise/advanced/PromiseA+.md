# **then** Promise/A+

## An open standard for sound, interoperable JavaScript promises--by implementers, for implementers

  A Promise represents the eventual result of an asynchronous operation.
  The primary way of interacting with a promise is through its **then** method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.

  This specification details the behavior of the **then** method, providing an
  interoperable base which all Promises/A+ conformant promise implementations can
  be depended on to provide.As such, the specification should be considered very
  stable.Although the Promise/A+ organization may occasionally revise this specification
  with minor backward-compatible changes to address newly-discovered corner cases,
  we will intergrate large or backward-incompatible changes only after careful consideration, discussion, and testing.

  Historically, Promises/A+ clarifies the behavior clauses of the earlier
  **Promises/A proposal**, extending it to cover de facto behaviors and omitting parts
  that are underspecified or problematic.

  Finally, the core Promises/A+ specification does not deal with how to create, fulfill,
  or reject promises, choosing instead to focus on providing an interoperable **then**
  method.Future work in companion specifications may touch on these subjects.

## 1. Terminology

  <ul style="list-style:none;">
    <li>1.1. "promise" is an object or function with a **then** method whose behavior
    conforms to this specification.</li>
    <li>1.2. "thenable" is an object or function that defines a **then** method.</li>
    <li>1.3. "value" is any legal JavaScript value (including **undefined**, a thenable, or a promise).</li>
    <li>1.4. "exception" is a value that is thrown using the **throw** statement.</li>
    <li>1.5. "reason" is a value that indicates why a promise was rejected.</li>
  </ul>

## 2. Requirements
### 2.1. Promise States

A promise must be in one of three states: pending, fulfilled, or rejected.

  <ul style="list-style:none;">
    <li>2.1.1. When pending, a promise:
      <ul style="list-style:none;">
        <li>2.1.1.1. may transition to either the fulfilled or rejected state.</li>
      </ul>
    </li>
    <li>2.1.2. When fulfilled, a promise:
      <ul style="list-style:none;">
        <li>2.1.2.1. must not transition to any other state.</li>
        <li>2.1.2.2. must have a value, which must not change.</li>
      </ul>
    </li>
    <li>2.1.3. When rejected, a promise:
      <ul style="list-style:none;">
        <li>2.1.3.1. must not transition to any other state.</li>
        <li>2.1.3.2. must have a reason, which must not change.</li>
      </ul>
    </li>
  </ul>

> Note: Here, "must not change" means immutable identity(i.e. ===), but does not imply deep immutability.

### 2.2. The **then** Method

A promise must provide a **then** method to access its current or eventual value or reason.

A promise's **then** method accepts two arguments:
  ```
  promise.then(onFulfilled, onRejected)
  ```
  <ul style="list-style:none;">
    <li>2.2.1. Both **onFulfilled** and **onRejected** are optional arguments:
      <ul style="list-style:none;">
        <li>2.2.1.1. If **onFulfilled** is not a function, it must be ignored.</li>
        <li>2.2.1.2. If **onRejected** is not a function, it must be ignored.</li>
      </ul>
    </li>
    <li>2.2.2. If **onFulfilled** is a function:
      <ul style="list-style:none;">
        <li>2.2.2.1. It must be called after **promise** is fulfilled, with **promise's**
        value as its first argument.</li>
        <li>2.2.2.2. It must not be called before promise is fulfilled.</li>
        <li>2.2.2.3. It must not be called more than once.</li>
      </ul>
    </li>
    <li>2.2.3. If **onRejected** is a function:
      <ul style="list-style:none;">
        <li>2.2.3.1. iy must be called after <span style="background-color:#ff0">promise
        </span> is rejected, with <span style="background-color:#ff0">promise
        </span>'s value as its first argument.</li>
        <li>2.2.3.2. it must not be called before <span style="background-color:#ff0">promise</span></li>
        <li>2.2.3.3. it must not be called more than once.</li>
      </ul>
    </li>
    <li>2.2.4. <span style="background-color:#ff0">onFulfilled</span> or <span style="background-color:#ff0">onRejected</span> must not be called until the execution context stack contains only platform code. <a href="https://promisesaplus.com/#notes">[3.1]</a></li>
    <li>2.2.5. <span style="background-color:#ff0">onFulfilled</span> and
    <span style="background:#ff0">onRejected</span> must be called as functions (i.e. with no <span style="background:#ff0">this</span> value). <a href="https://promisesaplus.com/#notes">3.2</a></li>
    <li>2.2.6. **then** may be called multiple times on the same promise.
      <ul style="list-style:none;">
        <li>2.2.6.1. If/when **promise** is fulfilled, all respective **onFulfilled** callbacks must execute in the order of their originating calls to **then**.</li>
        <li>2.2.6.2. If/when **promise** is rejected, all respective **onRejected** callbacks must execute in the order of their originating calls to **then**.</li>
      </ul>
    </li>
    <li>2.2.7. **then** must return a promise <a href="https://promisesaplus.com/#notes">[3.3].</a>
    <p style="background: #aaa">&emsp;&emsp;`promise2 = promise1.then(onFulfilled, onRejected)`</p>
      <ul style="list-style:none;">
        <li>2.2.7.1. If either **onFulfilled** or **onRejected** returns a value **x**, run the Promise Resolution Procedure `[[Resolve]](promise2, x)`.</li>
        <li>2.2.7.2. If either **onFulfilled** or **onRejected** throws an exception **e**, **promise2** must be rejected withe **e** as the reason.</li>
        <li>2.2.7.3. If **onFulfilled** is not a function and **promise1** is fulfilled, **promise2** must be fulfilled with the same value as **promise1.**</li>
        <li>2.2.7.4. If **onRejected** is not a function and **promise1** is rejected, **promise2** must be rejecte with the same reason as **promise1**.</li>
      </ul>
    </li>
  </ul>

### 2.3. The Promise Resolution Procedure

The promise resolution procedure is an abstract operation taking as input a promise and a value,
which we denote as ``[[Resolve]](promise, x)``.If **x** is a thenable, it attempts to make **promise** adopt the state of **x**,
under the assumption that **x** behaves at lease somewhat like a promise.Otherwise, it fulfills **promise** with the value **x**.

This treatment of thenables allows promise implementations to interoperate, as long as they expose a Promises/A+ compliant **then** method.
It also allows Promises/A+ implementations to "assimilate" nonconformant implementations with reasonable **then** methods.

To run ``[[Resolve]](promise, x)``, perform the following steps:**

  <ul style="list-style:none;">
    <li>2.3.1. If **promise** and **x** refer to the same object, reject **promise** withe a **TypeError** as the reason.</li>
    <li>2.3.2. If **x** is promise, adopt its state <a href="https://promisesaplus.com/#notes">[3.4]</a>:
      <ul style="list-style:none;">
        <li>2.3.2.1. If **x** is pending, **promise** must remain pending util **x** is fulfilled or rejected.</li>
        <li>2.3.2.2. If/when **x** is fulfilled, fulfill **promise** with the same value.</li>
        <li>2.3.2.3. If/when **x** is rejected, reject **promise** with the same reason.</li>
      </ul>
    </li>
    <li>2.3.3. Otherwise, if **x** is an object or function,
      <ul style="list-style:none;">
        <li>2.3.3.1. Let **then** be **x.then**. <a href="https://promisesaplus.com/#notes">[3.5]</a></li>
        <li>2.3.3.2. If retrieving the property **x.then** results in a thrown exception **e**, reject **promsie** with **e** as the reason.</li>
        <li>2.3.3.3. If **then** is a function, call it with **x** as this, first argument **resolvePromise**, and second argument **rejectPromise**, where:
          <ul style="list-style:none;">
            <li>2.3.3.3.1. If/when **resolvePromise** is called with a value **y**, run ``[[Resolve]](promise, y)``.</li>
            <li>2.3.3.3.2. If/when **rejectPromise** is called with a reason **r**, reject **promise** with **r**.</li>
            <li>2.3.3.3.3. If both **resolvePromise** and **rejectPromise** are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.</li>
            <li>2.3.3.3.4. If calling **then** throws an exception **e**,
              <ul style="list-style:none;">
                <li>2.3.3.4.1. If **resolvePromise** or **rejectPromise** have been called, ignore it.</li>
                <li>2.3.3.4.2. Otherwise, reject **promise** with **e** as the reason.</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>2.3.4. If **x** is not an object or function, fulfill **promise** with **x**.</li>
  </ul>

If a promise is resolved with a thenable that participates in a circular thenable chain, such that the recursive nature of
 ``[[Resolve]](promise, thenable)`` eventually causes ``[[Resolve]](promise, thenable) to be called again``,
 following the above algorithm will lead to infinite recursion.implementations are encouraged, but not required, to
 detect such recursion and reject **promise** with an informative **TypeError** as the reason.[3.6](https://promisesaplus.com/#notes)

### 3.Notes

  <ul style="list-style:none;">
    <li>3.1. Here "platform code" means engine, environment, and promise implementation code.
    In practice, this Requirements ensures that **onFulfilled** and **onRejected** execute asynchronously, after the event loop turn in
    which **then** is called, and with a fresh stack. This can be implemented with either a "macro-task" mechanism
    such as **setTimeout** or **setImmediate**, or with a **micro-task** mechanism such as MutationObserver o
    process.nextTick. Since the promise implementation is considered platform code, it may itself contain a
    task-scheduling queue or "trampoline" in which the handlers are called.</li>

    <li>3.2. That is, in strict mode **this** will be **undefined** inside of them; in sloopy mode, it wiil be the global object.</li>

    <li>3.3. Implementations may allow **promise2 === promise1**, provided the Implementation meets all Requirements.
    Each implementation should document whether it can produce **promise2 === promise1** and under what conditions.</li>

    <li>3.4. Generally, it wiil only be known that **x** is a true promise if it comes from the current Implementation. This
    clause allows the use of implementation-specific means to adopt the state of known-conformant promises.</li>

    <li>3.5. This procedure of first storing a reference to **x.then**, the testing that reference, and then calling that
    reference, avoids multiple accessses to the **x.then** property. Such precautions are important for ensuring
    consistency in the face of an accessor property, whose value could chnage between retrievals.</li>

    <li>3.6. Implementations should not set arbitrary limits on the depth of thenable chains, and assume that beyond That
    arbitrary limit the recursion will be infinite. Only true cycles should lead to a **TypeError**; if an infinite chain of
    distinct thenables is encouraged, recursing forever is the correct behavior.</li>
  </ul>
