In the [last article](/posts/fp-functions) we discussed the basics of **Functions**. We saw some definitions and examples of _Higher-Order Functions_. But that might have left you high and dry.

You could be wondering,

## How is any of this terminology useful to me?

> Sure, now I know what functions are. How do I use them?

All these are very valid responses to that article, I didn't cover any day-to-day uses for Higher-Order Functions (_the article was already getting too long_).

So, in this article, we will try to use some common higher-order functions. Namely, _map_, _filter_, and _fold_(reduce).

## A little refresher

> **A function is a mapping between some input and some output**

> **A Higher-Order function is a function that maps between function(s) and data (as either input and/or output)**

### Let's get to it!

## map

We'll get right to the definition.

According to Wikipedia (and most literature),

> **map** is the name of a higher-order function that applies a given function to each element of a functor

You might be cursing and saying

### What the F\*\*k is a functor?

Let's ignore that for now, and try to define map in a way that sounds (_a bit more_) human,

> **map** is a function that takes a container data structure and applies a function to _each_ value and creates a new container with the results of said application

Or,

> **map** is a thing that takes a collection of things and gives you a new collection of things by applying a function over each thing

_Notice how I'm trying to avoid naming any data structures?_

That's partially to not piss-off the FP neck-beards and the Lambda gods, but also to make it clear that map can be implemented in any data structure\*. Like most FP concepts, it's very abstract and can be applied to a whole grocery list of things.

JavaScript only implements _map_ (natively) in only one Data Structure, **Array**. It's implemented as a function on the Array prototype. _But, it doesn't have to be tied down to Arrays (😉)_

> **NOTE**: If you are already familiar with Array.prototype.map, try not to think of it as a 1:1 implementation of the concept of map

Let's look at an example of using JavaScript's map.

```javascript
let fruits = ['apple', 'banana', 'carrot'] // The collection

let firstLetter = str => str[0] // Our transformation

let firstLetters = fruits.map(firstLetter) // The new collection.
// => ['a', 'b', 'c']
```

So, what's happening here?

Let's start from the top, we defined an array named `fruits` and stored a few strings in it.

Next, we defined a function named `firstLetter` that takes a string input and return's its first character.

Then, we make a call to _Array.prototype.map_ by invoking `fruits.map` with the argument `firstLetter`. What this is doing is, telling the map function to iterate over every element contained by `fruits` and _apply_ `firstLetter` to each element, store the results in a new array, and then return the new resulting array. This return value is what we assign to `firstLetters`.

|                             ![Array map](/images/7c94d5a7bdb514d0b1e801f997a5d9f5.png)                              |
| :-----------------------------------------------------------------------------------------------------------------: |
| _Illustration adapted from [John Ferris' article](https://atendesigngroup.com/blog/array-map-filter-and-reduce-js)_ |

**Note:** Libraries like _Ramda_(seriously awesome, check it out) allow you to map over additional data structures such as objects. Let's try to implement a map (using mutable code) that works for both containers (object & array).

```javascript
let map = function (func, ftor) {
  let result
  try {
    result = ftor.constructor()
  } catch (e) {
    result = {} // Some exotic container given, degrade to Object
  }
  for (let k in ftor) {
    result[k] = func(ftor[k])
  }
  return result
}
```

With this map there's a bunch of different things happening, but keep in mind that for an ordinary array, it's functionally same.

Let's try to break it down,

**Arguments:** this function takes two arguments, `func` and `ftor`. As the name might imply, `func` is our function (the transformation). `ftor` might seem like a weird name for the second argument, this argument is your data structure (array, object, etc.).

> So why is it called `ftor` and not something like `data` or `array`? Remember that word we used in the first definition (from Wikipedia)?  
> Yeah **Functor**, `ftor` is my way of writing functor.  
> A **Functor** is basically any data structure that you can map over\*.  
> So, in our case Object and Array (and potentially other data structures that store key → value) are both Functors from the perspective of our map function even though natively, only Arrays might be considered _Functors_.

### Congratulations! Now you know another FP buzzword/jargon.

**Line 8-9:** here, we are iterating through the keys of the container (indices in case of arrays) and applying the function `func` to each value and associating it with the same key in the resulting container.

**Result:** this function returns a container of the same type as the functor (by calling its constructor), in cases where it fails, I've decided to degrade down to a plain object.

### Usage

This comes in handy when you need to make a collection of things from an existing collection by _transforming_ each value.

## filter

Once again, here goes the Wikipedia definition

> **filter** is a higher-order function that processes a data structure (usually a list) in some order to produce a new data structure containing exactly those elements of the original data structure for which a given predicate returns the boolean value `true`

This time, I think the wiki definition is very expressive. Put differently,

> **filter** is a function that goes through a _Filterable_ collection and makes a new collection that contains only the values for which the _predicate_ returns `true`

That might sound like a mouthful, but the concept is simple (you will see for yourself once we go through an example).

Once again, JS has a native implementation of _filter_, but only in **Arrays**. Same as **map**, it's implemented in the Array prototype. _But it could be used with any **Filterable** data structure._

> Similar to _Functors_, a _Filterable_ is a data structure that you can _filter_.  
> Most _Functors_ tend to be _Filterable_ as well, but there is no guarantee that a _Functor_ is _Filterable_.  
> If we assume that _Array.prototype.filter_\* is the only possible implementation of filter, then only **Array**s can be considered _Filterable_.  
> But, because we can write a function that can _filter_ **objects**, we can consider plain JS objects as _Filterable_ too.

### Now you know another _Category_ of data structures.

> **NOTE:** It should go without saying, Array.prototype.filter may/may not be 1:1 with the spec of filter

Let's look at an example of JavaScript's filter.

```javascript
// The collection
let fruits = ['apple', 'orange', 'banana']

// The predicate (a function that returns either true or false)
let isCitrus = fruit => /lemon|lime|orange|grapefruit/i.test(fruit)

// The new collection
let citrusFruits = fruits.filter(isCitrus)
```

Let's start from the top, we defined an array named `fruits` and stored a few strings in it (same as our _map_ example).

Next, we defined a function named `isCitrus` that takes a string input and checks it against a regular expression and returns either `true` or `false`.

Then, we make a call to _Array.prototype.filter_ by invoking `fruits.filter` with the argument `isCitrus`. This tells the filter function to iterate over every element contained by `fruits` and call `isCitrus` with each element as argument, if `isCitrus` returns `true` that elements is kept, otherwise the element is skipped over and the next element is checked. This process is repeated for all the elements of the array. An array is constructed containing only the elements for which `isCitrus` returned `true`.

| ![Array filter](/images/e4238c2f183527e388a814e9feeb105c.png) |
| :-----------------------------------------------------------: |
|    \*Illustration adapted from **John Ferris' article\***     |

Let's try to implement a filter (using mutable code) that works for different containers (object & array).

```javascript
let filter = function (predicate, filterable) {
  let result
  try {
    result = filterable.constructor()
  } catch (e) {
    console.warn('Error on trying to call ', filterable.constructor, e)
    result = {}
  }
  let arrKey = 0
  let isArray = Array.isArray(filterable)
  for (let key in filterable) {
    if (predicate(filterable[key])) {
      let newKey = isArray ? arrKey++ : key
      result[newKey] = filterable[key]
    }
  }
  return result
}
```

With this filter there's a bunch of different things happening, but keep in mind that for an ordinary array, it's functionally the same as calling Array.prototype.filter.

Let's try to break it down,

**Arguments:** this function takes two arguments, `predicate` and `filterable`. As the name might imply, `predicate` is our predicate (a function that takes a value and returns either `true` or `false`). The argument `filterable` is your data structure (array, object, etc.).

**Line 11-16:** here, we are iterating through the keys of the container (indices in case of arrays) and checking if the `predicate` returns true for a particular value. If a value does return true, we are keeping it in the `result` container.

**Result:** this function returns a container of the same type as the filterable (by calling its constructor), in cases where it fails, I've decided to degrade down to a plain object.

### Usage

This comes in handy when you need to make a collection of things from an existing collection by keeping values that meet a certain criterion.

## fold (reduce)

You know the drill, wiki first

> **fold** (also termed **reduce**...) are ... functions that analyze a recursive data structure and through use of a given combining operation, recombine the results of recursively processing its constituent parts, building up a return value.

Lots of stuff to unpack there, but let's try to get to the gist of it

> **fold** is a function that goes through a _Foldable_ collection and accumulates a value using an _accumulating function_ and then finally returns the accumulated value

To a shock to nobody, JavaScript has a native implementation of _fold_ as well, it's named _Array.prototype.reduce_. Once again we have to make the note that JS's _reduce/fold_ can only fold arrays, _but it doesn't have to be tied down to just JS arrays_. A fold can be implemented for any data structure that can be classified as _Foldable_.

> A data type is _Foldable_ if we can implement some form of _fold_ for it. But due to the nature of the _fold_ operation, 'Foldable's are usually list(array)-like or have a valid list-representation. While not strictly required, most _'Foldable's_ tend to be _Functor_ and _Filterable_ as well. This is because both _map_ and _filter_ can be implemented using _fold_.

> Another note, there are many variations of _fold_ out there. The essential functionality is the same, but some implementation details change the nature and name of the fold. In this article we will look at a left-fold as the native _reduce_ method is a left-fold. This fold is also called _foldl_ or _fold_left_ in some languages and libraries.

> Once again, disclaimer: JS reduce may not follow the spec of _fold_ 100%.

Let's try using _Array.prototype.reduce_ to do something.

```javascript
// The collection
let fruits = ['apple', 'banana', 'orange']

// The accumulating function
let makeSalad = (salad, fruit) => `${fruit}-${salad}`

// Initial Salad
let saladStarter = 'salad'

// The Result
let salad = fruits.reduce(makeSalad, saladStarter) //=> orange-banana-apple-salad
```

Let's start from the top again, we defined an array named `fruits` and stored a few strings in it.

Next, we defined a function named `makeSalad` that takes two strings and returns a string by concatenating them.

We then define another variables, this time it's a string named `saladStarter`.

Then, we make a call to _Array.prototype.reduce_ by invoking `fruits.reduce` with the arguments `makeSalad` and `saladStarter`. This tells the fold function to iterate over every element contained in `fruits` and call `makeSalad` with an _accumulated value_ and an element from `fruits`. For the first iteration, there is no accumulated value, so `makeSalad` is called with `saladStarter` as the _accumulated value_. For every subsequent iteration, `makeSalad` is called with the return value of the previous iteration as the _accumulated value_ and the next item in the array. This process is continued until `makeSalad` has been called with the accumulated value from its previous iteration and the last item in `fruits`. Finally, the return value from the final call is passed on as the return value for the _reduce_ call and stored in the variable named `salad`.

| ![Array Reduce/Fold](/images/f4a6519b84d8d5c0f5f85c6207d9e20c.png) |
| :----------------------------------------------------------------: |
|       \*Illustration adapted from **John Ferris' article\***       |

Let's try to implement a _fold_ of our own. Using mutable and imperative code, of course.

```javascript
let fold_left = function (folding_fn, initial_value, foldable) {
  let accumulated = initial_value
  for (let key in foldable) {
    accumulated = folding_fn(accumulated, foldable[key])
  }
  return accumulated
}
```

You might be thinking...

### What? Where is all the code?

Folds are notoriously very simple to implement, but they are so useful that you'll find yourself wondering why more people don't use them.

I think it's pretty obvious how this function works, so I won't bore you with the explanation. Let's instead come back to our claim that we can usually _map_ and _filter_ using a _fold_.

### map

```javascript
// le folded map
let map = (fn, ftr) =>
  fold_left((acc, val) => acc.concat(fn(val)), ftr.constructor(), ftr)
```

Yeah, this code is not very readable, but it's not meant to be. This is a **one-liner** that shows a very simple implementation of map using fold. It works because fold carries the return value from the accumulating function on to the next iteration, allowing us to successively construct a larger list of values resulting from applying `fn` to `val`. Try and tinker with it a bit, and I have faith that you will figure it out.

On to the next one...

### filter

```javascript
// le folded filter
let filter = (pred, flt) =>
  fold_left(
    (acc, val) => (pred(val) ? acc.concat(val) : acc),
    flt.constructor,
    flt
  )
```

Once again, this is a **one-liner**. This follows the same principle as map, except we are only concatenating to the list if the predicate is satisfied by the value (i.e., `pred(val)` returns _true_).

### Usage

Folds should come in handy when you need to,

- Iterate over a list and carry over a value to the next iteration
- _Fold_ a list onto itself to arrive at a single value
- Transform a list to a single value (even if the resulting value is of a completely different type, like transforming the items of a list to be items of a Map or a Set)

## Appendix / Additional Links

I talk briefly about a few _Categories_ of data types. If you want to look at more of these categories, take a look at the wonderful [**fantasy-land**](https://github.com/fantasyland/fantasy-land) specifications that defines _Algebraic_ Data Types in terminology we JS devs can understand.

Also check out the amazing [**ramda**](https://ramdajs.com/) library for more useful functional utilities like _performant_ and _curried_ implementations of _map_, _filter_, _reduce_ or even helper functions that help you easily combine these operations into a _transducer_ (more on this in a later article).

If you are even slightly mathematically minded, lookup Category theory as well as Algebraic Data Types. These are wonderful topics to study regardless, but they also help us understand the world of FP even better.

---

## That's all for today, folks.

Peace ✌️

![Doggy dogg peace](/images/679493a2b51cda300edb28d7d078267a.gif)
