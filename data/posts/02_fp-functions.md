In the [last article](/posts/fp-the-introduction), I introduced some core concepts of Functional Programming. In that article I quickly glossed over Pure Functions. In this article the goal is to discuss functions in more details.

If there is one thing that you can call absolutely necessary to do functional programming is a good understanding of _Functions_. *(I guess you could infer that from the name, **Function**al Programming)*

## What is a function?

If you are a programmer of any kind, you are probably already familiar with functions. But, I will still ask you, what is a function?

I hear some JS folk going, I know what a function is:

```javascript
function doSomething(x) {
  return x + 42
}
```

Its this (👆) thing. Or this

```javascript
const addTwo = function (x) {
  return x + 2
}
```

Or the real clever guy thinking, its this

```javascript
const addOne = x => x + 1
```

Yes, all of those are functions.
But those are examples of functions. What I want you to think about is,

> What is a function? What does it do?

As you may/may not be aware, the world of computer science is very intertwined with the world of mathematics. Functions are one of many things that we borrow from the world of mathematics.

However, math is very abstract (for good reason). And so, if you look for a definition of functions in mathematics, you will find multiple. One that I like is,

> A function is a relation between 2 sets

Or in less abstract, computer science-y terms

> A function is a mapping between an input and an output

So, we can say that a function is a _thing_ that takes some **input** and gives back some **output**.

Now there are several rules that a _thing_ must follow before it can be considered a function, the most important ones are:

- Multiple inputs can map to a single output

  ```javascript
  // for a function fx,
  fx(1) // => true
  fx(-1) // => true
  ```

- Same input can not map to multiple outputs.

  This is because that would lead to non deterministic behaviour and this is undesirable in both computer science and math.

  ```javascript
  fx(1) // it should not be true once and false the next second.
  ```

Now you may be thinking,

> What about functions that don't return anything.

I don't know (nor care for the purposes of this discussion) about the behaviour of this in other languages, but in JS your functions always return something whether you want to or not.

If you do return something, that's well and good.
However, if you don't, JS returns `undefined` for you.

So your function that returns nothing, is actually a mapping from some input to `undefined`. But more importantly, you might be getting the results of such a function in some other place, maybe the function is pushing the result on to a variable outside its scope.
In that case, **Its an impure function** and its causing side effect. And you should probably avoid doing that (when possible).

But you might be thinking,

> What about functions that don't take an input.

This can go one of several ways,

1. Your function always returns something valuable if you call it with no input.
   Your function is a mapping from a null set (nothing) to a value, **Its
   a function**.

2. Your function takes no input and returns nothing (or `undefined`) as we discussed.
   1. Its useless (i.e. not doing anything), but **Its a function**.
   2. Its useful (i.e. gives some output), but its output is not available as a return value, **Its (probably) not a (_pure_) function** and you should try and avoid these as its making a _side effect!_

So, we now know what functions are, that's it right? that's all there is to know about functions?

No, my dear reader. You can dig yourself into a tunnel, learning about functions. But, for our purposes of learning FP in JS. We can talk about some special types of functions that follow the rules above and do some interesting things.

## Recursive Functions

Do you know what factorials are?
Its this thing you express in math with an exclamation mark after a number like `5!`.

What's it do? Its an interesting bit of math, its useful for a lot of things that we are not going to discuss right now. The important bit is that we can not just use a number followed by and exclamation mark after it to get a factorial in code. We need to make that functionality ourselves.

Luckily, factorials are very intuitive. There's just two rules about factorials, and you can get the factorial of any number with those.

1. Factorial of 0 is 1.
   Or,
   `0! = 1`

2. Factorial of a number X is X multiplied by the factorial of (X-1).

   Or,

   `n! = n ✕ (n-1)!`
   Example:
   `5! = 5 * 4!`

So if we wanted to find the factorial of 3, it would go something like this,

```
3! = 3 * 2!
2! = 2 * 1!
1! = 1 * 0!
0! = 1

Simplifying,
3! = 3 * 2 * 1 * 1
```

If we wanted to implement this behaviour in a function and call it `fac`. How would you go about doing that?

You're probably thinking of loops and if-else statements. But there is a very simple way where we can take the rules of factorial word for word and translate that into code and it would work.

This is how it goes

```javascript
function fac(n) {
  if (n === 0) return 1 // this is our rule number 1 being satisfied.
  return n * fac(n - 1) // rule number 2 being satisfied
}
```

Thats it! This is a very simple and functioning implementation of factorial.

So, how does it work?

This is an example of a **recursion**; a function that calls itself to do something or get a result.

In **every** (intensional) _recursion_ in the world, there are always at least 2 logical cases.

1. A base case where the function does not call itself (so the recursion is not infinitely spiralling out).
2. A recursive case where the function calls itself.

In the example above,
Line#2 is our base case. As you might have noticed, this is usually something that's either easily computable or known.
Line#3 is our recursive case, This is usually where we put the repetitive behaviour.

**A word of warning,**

> While JavaScript is usually a good enough language for exploring functional concepts, this is one of the places where functional and JS doesn't necessarily agree.
>
> A recursion is usually fine for simple algorithms that don't need too many recursive calls in JS. But, if your algorithms does a recursive call way too many times, its either not gonna perform well or going to crash because of a stack overflow.
>
> In future, We might discuss techniques such as memoization to get over this kind of limitations or to make our code more performant than a naive recursion.

## Higher-Order Functions

Lets get straight to the point, As previously discussed... A function is a mapping from input to an output.

A **Higher-Order Function** is a _function_ that maps,

- From function(s) (_input_) to output
- From input to function
- From function (input) to function (output)

Take a moment to absorb all of that. If a function does any of those 3 things, its a higher order function.

Lets see a few examples,

```javascript
function propSatisfies(prop, pred, obj) {
  let val = obj[prop]
  return pred(val)
}

let data = {
  age: 21
}

function isAdult(age) {
  return age >= 18
}

propSatisfies('age', isAdult, data) //=> true
```

In the example above,

Our function `propSatisfies` takes in 3 parameters(inputs),
`prop`: a string (name of a property)
`pred`: a function that takes an input and returns true or false
`obj`: an object whose `prop` property will be checked against `pred`.
Our function returns a value, either `true` or `false`

On the last line, we call the `propSatisfies` function using 3 values,
- `prop` => `'age'`
- `pred` => `isAdult`
- `obj` => `data`

`isAdult` is a simple function that takes an age and returns `true` or `false` (i.e. a predicate). **This is not a Higher-order Function**  
`'age'` is a string literal, so not a Higher-order Function  
`obj` is an object, not a Higher-order Function.  

So, which one is the Higher-order function? `propSatisfies`  
Why? Because it maps a function (`isAdult`) to a value `true` or `false`.

Lets look at another Higher-order function.

```javascript
function add(a) {
  return function (b) {
    return a + b
  }
}

let addOne = add(1) //=> this returns a function
let addTen = add(10) //=> this too returns a function

addTen(1) //=> returns 11
```

In this example,
`add` is a function that takes in 1 parameter, `a` (A number).  
Our function returns another function.

`add`, here, is a Higher-order Function, because it returns a function.

Our `add` function also employs another interesting FP concept called a _closure_, we will discuss how our function and closures work another day. For the purposes of this discussion just understand that `add` is a Higher-order function because _it returns another function_.

Let's look at a final function that does both of these things, take in function(s) **and** returns a function.

```javascript
function combine(outer, inner) {
  return function (arg) {
    return outer(inner(arg))
  }
}

function double(num) {
  return 2 * num
}

function square(num) {
  return num * num
}

// a function that doubles and then squares a number
let dSquare = combine(square, double)
```

In this example,  
`combine` takes in two arguments `outer` and `inner`, both of which have to be functions. So, we can already see that it is a Higher-order Function  
`combine` also returns a function that *combine*s the functionality of both inner and outer. Once again, its a higher-order function (because its returning a function)

When we call combine with `square` and `double` as arguments, it returns a function that takes an argument `arg` and returns a value by calling `inner` with `arg` and then calling `outer` with the return value of the `inner` call. In essence, _combining_ the two functions. So, `dSquare` is now a function that, when given a number, doubles it first and then squares it and then returns the result of those operations.

In later articles, We will discuss a function that's basically `combine` but much more flexible and powerful. (For the really curious people, look up `compose`).

### That's all for today, folks.

Peace ✌️

![deuces](https://i.giphy.com/media/NG6dWJC9wFX2/giphy.gif)
