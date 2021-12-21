You're a developer going about your day writing loops and pushing and deleting stuff from arrays and what not. And then some day you think 🤔

## Maybe I should test my code... Shouldn't be too hard
— you say.

And then you get started, you learn the basics of unit testing and even write some tests. But as soon as your code gets a bit more complex, it starts to seem like almost impossible to test. But, you are determined, you're not gonna give up that easy; you start creating and destroying objects after every test. Maybe your chosen test framework even offers hooks for those.

But Imagine a world where you could test almost every piece of functionality in your code, without jumping through those hoops.

Well, that's not what I'm gonna teach you today 😅.

What we will try to discuss, however, are some of the basics of a paradigm called Functional Programming (or FP for short). What you can eventually get by following the principles of FP is what we previously discussed and more. Namely, easily testable code, minimal setup in testing, cool developer creds, happiness\* 😅.

> P.S. I can't promise that last one, what I can promise is good DX (Developer Experience) which may/may not correlate to happiness.

**Right, Lets start!**

## What is FP?

I'm not gonna get into some complex mathematical/theoretical explanation of what FP is. I'll try to explain FP in very simple terms...

FP is a paradigm(a way of thinking about problems) where we solve problems in terms of functions<sup>😉</sup> and state that does not change(immutable state).

### _Foreword_

> A word of warning, FP (and almost all literature about FP) is filled with jargon such as "immutable", "functor", "monad", etc. Don't get discouraged, once you get familiar with them, you'll start to see why people use them (hint: to express ideas in short).

> Unlike most traditional FP tutorials, I won't be showing any code in any purely functional language like Haskell or OCaml. While those are great language, I'm not great at them and I think JavaScript is good enough as a language to explore at least the basics of FP 😃

## Core Principles (of FP)

Almost every religion comes with some core tenants that you **must** follow. While FP is not a religion, it does come with some rules that must be obeyed at all times (otherwise the FP gods will be very unpleased and you will suffer as a developer). But, this being me and not some FP guru, I might miss some and am most definitely paraphrasing all of them.

1. **NEVER\*** mutate state
2. Don't cause side effects
3. If you do need have side effects, isolate and limit them to a small number of functions
4. Every piece of code that _does something_ should be a function
5. Oh, and did I mention? **NEVER MUTATE STATE**

Don't worry about the jargon for now, we will discuss those terms shortly.

## State (and mutation? 🤷‍♀️)

Lets begin by examining some objects in real life. Do you remember those digital watches (CASIO et al) from back in the day that lit up when you pressed a button on the side?

| ![Casio W-86 / W86 / W-86-1VQES "Illuminator" digital watch](/images/2d2cecbb109c538689e71394efe2d804.jpg) |
| :-: |
| **Image**: _Casio W-86 / W86 / W-86-1VQES "Illuminator" digital watch_. [Multicherry](<https://commons.wikimedia.org/wiki/File:Casio_W-86_digital_watch_electroluminescent_backlight_(ii).jpg> 'via Wikimedia Commons') / [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0) |

Lets examine that mechanism. The "backlight" on those watches is a very simple green-ish LED soldered besides the digital display, powered by the on-board battery and sometimes a tiny little solar panel. If we think of that backlight and button mechanism as a simple program. We can observe a few things,

- The backlight is initially **OFF**
- Once you press the button _something happens_
- Now the backlight is **ON**

In this very crude explanation of a backlight, ON and OFF are states. In code, you probably represent that as a variable.

"But what about this mutation thing", you ask.

Well, in imperative/OO code, you are probably used to _changing_ the value of variables. This is what's known as a mutation (i.e. change). Functional Programming **strongly discourages** mutating state; Instead you create distinct, new states.

Say you have a list of two numbers (or array or whatever) and now you want to add one more. If your list structure were mutable, you might append another number two it. In immutable land, however, you create a new list containing the items from your old list and one more.

The cool thing is you don't even need an inherently immutable list structure, you can just use JavaScript's good old Array type. To make your life easier, TC39 people even threw in **Array.prototype.concat**.

```javascript
// Mutable code
let itemList = [1, 2]
mutList.push(3)

// Immutable code
let twoItemList = [1, 2]
let threeItemList = twoItemList.concat(3)
```

Immutability might seem a little counter-intuitive at first but it is one of the things that will give you the promised testability.

Think about it, _itemList_ might have 2 items at one point of your code and 3 at some other... Your test could be expecting it to have two items but it has three, now you're wondering where in your program life cycle it changed. Maybe you forgot to clear the junk from a previous test? Maybe you changed it on a different method... You have to sit there and figure that out.

On the other hand, _twoItemList_ always has these two items and never changes, so if you are getting a test failed because your function returned 3 items instead of 2, you know what happened. You returned the wrong list ​😇.​

## Side Effects (and pure functions)

### Relax, we are not gonna discuss pharmaceuticals.

One of the core tenants of FP is to try and avoid side-effects.

"But, what on earth is a side effect?", you ask.

Glad you asked. A side effect is anything you do that does not involve your own state. Lets get back to this in a bit. But first, functions

### Functions

"But I already know everything I need to know about functions", you say.

Do you?

In FP a function (or rather a pure function) is a piece of code that may/may not take something as input (arguments) and returns something and does nothing more. It does not:

- Perform some I/O task
- Change the state of anything outside its scope
- Return different things for the same input

So, getting back to out Side Effects discussion, a side effect is any and all of the above discussed despicable things except the last one.

Or in other words, if a function performs some I/O task instead of or in addition to returning an output, or it changes the global state somehow; it is said to have side effects and is referred to as an impure function\*

> A function can also be impure if its output is non-deterministic. That is, gives different output for the exact same input.

## That's all for today

I feel like the above topics are a good enough indication of how things work in FP. We'll get into more details about how to do certain things in the next article.

**Till then, Peace ✌️**

![Deuces](/images/679493a2b51cda300edb28d7d078267a.gif)
