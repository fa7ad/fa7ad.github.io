It's been a while since my [last article](/posts/fp-higher-order-functions) so, hopefully you didn't forget what we last discussed. Throughout the last 3 articles I alluded to some nifty tricks and nice-ties like `compose`. So in this article we will try to cover some of these topics.

Let's see some problems that we come across when starting out our FP journey in JS.

## Problem #1

If you have been writing functional code, or even just trying to avoid mutations and side effects, you probably ended up writing something like this

```javascript
const data = {
  /*...*/
} // some data
const result = doSomethingCompletelyDiff(doSomethingElse(doSomething(data)))
```

At some point, making this kinda nested function calls becomes inevitable; specially if you don't want to make really specific, single-use functions. But this kind of function calls are not only ugly to look at, sometimes they are difficult to follow as well. Specially if you add some higher-order functions in between, then you've got a nasty mess of parentheses.

_What if we had something that could combine multiple functions to a single function?_

### Solution:

We do have precisely that exact tool. (Un)surprisingly, it's another one of those things that we borrow from math.

Let's see it in math first.

Let's define a function _f(x)_

$$
f : x \mapsto x + 1
$$

And another function _g(x)_

$$
g : x \mapsto x * 2
$$

Let's take a letter `y` and let its value be...

$$
y = f(g(10))
$$

We can see our old friend nested function call here again... So how did math come up with a solution?

They made an operator, of course. This operator allows you to define a function by **_composing_** multiple functions and as such, it's called the _composition_ operator. Visually, it looks like a tiny circle.

Here's composition operator put to use,

$$
h : f \circ g
$$

Here, _h_ is defined as the composition of _g_ and _f_. Functionally, calling `h(x)` is the same as calling `f(g(x))` So now, we can do this

$$
y^\prime = h(10)
$$

_"Great"_ I hear you say, _"How does that help me in code, I can't just put a big ol' dot between two functions in JS can I?"_

**You can!**

No, not put a big ol' dot... you can compose functions in JS just not using an operator.

It goes something like this

```javascript
const newSuperFunction = compose(lastFn, secondFn, firstFn)
```

Doesn't look too horrible, if you ask me 🤷

"But where did this _compose_ function come from, and how do I get one?" I hear you say

I'm glad you asked, remember our old friend the fold (reduce)? We can very easily define compose using a right fold (we discussed a left fold before, this is the same thing but from the other direction).

```javascript
const compose = (...funcs) =>
  funcs.reduceRight(
    (fx, gx) =>
      (...args) =>
        gx(fx(...args))
  )
```

Here, our `compose` function takes a _variadic_ number of arguments, all of which are functions.

Because of the rest operator we get the functions as an array, so we can call the built-in `reduceRight` function from the array prototype.

Then, we pass in an arguments to the `reduceRight` call.

We pass a function that receives two functions as arguments, and returns an inline variadic function that calls the two functions successively with its arguments.

_The variadic (any number of arguments) bit was added so that we can compose non-unary (more than one argument) functions too_.

Happy composing, Enjoy!

## Problem #2

Once you understood map, filter and reduce you just can't go back. You write code that looks like this

```javascript
const dataSet = [
  /*...*/
] // Some dataset
const finalData = dataSet
  .map(someTransformation)
  .map(someFurtherTransformation)
  .filter(somePredicate)
  .filter(anotherPredicate)
  .map(evenMoreTransformation)
  .reduce(combinatorFunction)
```

While this code is **_very_** contrived, but you get the idea. If you don't want to make a bunch of one-off transformations and predicates you end up doing this.

Even if it might not seem like a problem at first, you will start to see a crash coming from miles away as soon as your dataset becomes large enough.

The problem with this kind of code is that every map and filter and reduce call is an iteration. In imperative code you might be used to doing a lot of transformation and _filtering_ out in a single loop, which looks almost impossible to do here.

### Solution:

Just a word of warning, there are better solutions out there. But, for now we can discuss some simple ones that will help you write better code regardless of better solutions. If these do not help your use case enough, do a little digging into _transducers_.

- Combine successive transformations/maps

  ```javascript
  .map(someTransformation)
  .map(someFurtherTransformation)
  ```

  Can be rewritten using our friend `compose` like this

  ```javascript
  .map(compose(someFurterTransformation, someTransformation))
  ```

  While the benefit may not be obvious, what you are essentially doing is that you are running 2 transformations in a single iteration rather than running 2 iterations with 1 transformation each. Which means, 1 less iteration but the same result

- Combine successive filters

  You might get the idea that we can combine filters the same way we combined maps.
  However, the moment you go to do such a thing, you realize that you forgot that composing predicates just won't work.

  But we can get around that by implement a logical `and` function to combine predicates, since that's essentially what two successive filters do anyway.
  Let's try to implement a binary `and` function

  ```javascript
  const and =
    (pred1, pred2) =>
    (...args) =>
      pred1(...args) && pred2(...args)
  ```

  So now we can rewrite this

  ```javascript
  .filter(somePredicate)
  .filter(anotherPredicate)
  ```

  to this

  ```javascript
  .filter(and(somePredicate, anotherPredicate))
  ```

  You can combine more than two predicates by nesting calls to the `and` function. But I recommend checking out _Ramda_'s `allPass` and `both` functions.

> Why re-invent the wheel when the wheel is so nice?

## Problem #3

> I write too many helper functions like compose, pipe, etc.

This is a comment I hear from friends very often. And... I'll admit, I had this problem too. While writing helper functions isn't bad, it can be bad when you spend more time writing them than writing your business logic.

The reason why so many JS devs have this problem is that our language gives the very basic tools to get us hooked on FP and then leaves us high and dry and wanting more. So we end up implementing a lot of basic fundamental FP constructs ourselves.

### Solution (not really, but it is what it is)

A lot of this can be avoided by adding a Functional utility library to your tool chain. I _highly recommend_ **Ramda**, because it gives a lot of functionality at a very reasonable file size. All of its functions are at least on par with some language built-in implementations, if not better, in terms of performance. And the cherry on top, its tree-shakeable; so almost any build system like webpack or rollup can remove the functions you don't use from the final JS bundle.

---

## That's enough problems for a day

Enjoy writing more FP code. I'll try to write about a few more problems and solutions.

Till then, Peace ✌️

![deuces](/images/679493a2b51cda300edb28d7d078267a_500x281.webp)
