---
title: "What I think ChatGPT means for developers"
date: 2022-12-11 19:20:00 +0000
layout: post
categories:
- machine-learning
- chatgpt
- ai
comments: true
---

I'm sure you've heard some of the buzz about [ChatGPT](https://chat.openai.com/). There's been examples of it [creating a working Wordpress plugin on demand](https://wptavern.com/chatgpt-creates-a-working-wordpress-plugin-on-the-first-try), [recreating the Apple website](https://twitter.com/ZacYungblut/status/1598593759532355584?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1598593759532355584%7Ctwgr%5E7278d2255112f76225493be1370af0fa7a975285%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fd-35506373891512421835.ampproject.net%2F2211250451000%2Fframe.html), act as a Linux terminal, and writing astonishingly detailed code samples for various purposes on demand.

Naturally I decided to have a tinker with it as I was curious about it, and I've found it very useful for coding. Here are some samples of things I've asked it to do for me.

### An example of writing code with ChatGPT

Given the popularity of React.js and my own experience using it, I figured that was something ChatGPT would probably handle OK and that I would be able to evaluate for myself. I therefore asked ChatGPT to create a React-based alert system for me. As I've implemented something similar myself, I was interested to see how well it would do against my own implementation which is in production:

> Please create a hook-based toast-style alert system in React.js using hooks

It responded with:

> Sure, here is an example of a toast-style alert system in React.js using hooks:

```javascript
import React, { useState, useEffect } from 'react';

function useToast() {
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState('');

  function showToast(msg) {
    setMessage(msg);
    setIsShowing(true);
  }

  function hideToast() {
    setIsShowing(false);
  }

  useEffect(() => {
    let timeoutId;
    if (isShowing) {
      timeoutId = setTimeout(() => setIsShowing(false), 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isShowing]);

  return {
    isShowing,
    message,
    showToast,
    hideToast
  };
}

function App() {
  const { isShowing, message, showToast, hideToast } = useToast();

  return (
    <div>
      {isShowing && (
        <div className="toast">
          <p>{message}</p>
          <button onClick={hideToast}>Close</button>
        </div>
      )}
      <button onClick={() => showToast('This is a toast message!')}>
        Show Toast
      </button>
    </div>
  );
}
```

> In this example, the `useToast` hook manages the state for the toast, including whether it is showing, the message to display, and methods for showing and hiding the toast. The `App` component uses the `useToast` hook to show and hide the toast when a button is clicked.

> The `useToast` hook uses the `useState` hook to manage the state for the toast, and the `useEffect` hook to automatically hide the toast after a certain amount of time. This is just one example of how to implement a toast-style alert system in React.js using hooks, and you can modify it to suit your specific needs.

Looks OK, but only supports a single message at once, so I followed it up:

> Can we amend this to support showing multiple toasts at once?

> Yes, it is possible to modify the example to support showing multiple toasts at once. Instead of using a single state value for the message and whether the toast is showing, you can use an array to store multiple toast messages and show them all at once. Here is an example of how you might do this:

```javascript
import React, { useState, useEffect } from 'react';

function useToast() {
  const [toasts, setToasts] = useState([]);

  function showToast(msg) {
    setToasts(prevToasts => [...prevToasts, msg]);
  }

  function hideToast(index) {
    setToasts(prevToasts => {
      prevToasts.splice(index, 1);
      return [...prevToasts];
    });
  }

  useEffect(() => {
    let timeoutIds = [];
    toasts.forEach((_, index) => {
      timeoutIds[index] = setTimeout(() => hideToast(index), 3000);
    });

    return () => timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  }, [toasts]);

  return {
    toasts,
    showToast,
    hideToast
  };
}

function App() {
  const { toasts, showToast, hideToast } = useToast();

  return (
    <div>
      {toasts.map((toast, index) => (
        <div className="toast" key={index}>
          <p>{toast}</p>
          <button onClick={() => hideToast(index)}>Close</button>
        </div>
      ))}
      <button onClick={() => showToast('This is a toast message!')}>
        Show Toast
      </button>
    </div>
  );
}
```

> In this example, the `useToast` hook uses an array to store multiple toast messages, and the `App` component displays all of the toasts in the array. The `useEffect` hook is used to set a timeout for each toast to automatically hide it after a certain amount of time. You can modify this example further to suit your specific needs, such as setting different timeouts for each toast or adding additional methods for managing the toasts.

Great,  although I noticed an unused `_` variable in `forEach` - not sure if perhaps this is based on something that used Lodash, perhaps.

Next, our toasts need to show different styles based on the type of alert, so I asked this:

> Can we amend this to allow the toasts to use different styles based on the type of alert?

> Yes, it is possible to modify the example to allow the toasts to use different styles based on the type of alert. You can do this by storing the type of each toast along with the message in the state, and then using this type to determine the style for the toast. Here is an example of how you might do this:

```javascript
import React, { useState, useEffect } from 'react';

function useToast() {
  const [toasts, setToasts] = useState([]);

  function showToast(msg, type) {
    setToasts(prevToasts => [...prevToasts, { msg, type }]);
  }

  function hideToast(index) {
    setToasts(prevToasts => {
      prevToasts.splice(index, 1);
      return [...prevToasts];
    });
  }

  useEffect(() => {
    let timeoutIds = [];
    toasts.forEach((_, index) => {
      timeoutIds[index] = setTimeout(() => hideToast(index), 3000);
    });

    return () => timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  }, [toasts]);

  return {
    toasts,
    showToast,
    hideToast
  };
}

function App() {
  const { toasts, showToast, hideToast } = useToast();

  return (
    <div>
      {toasts.map((toast, index) => (
        <div
          className={`toast toast-${toast.type}`}
          key={index}
        >
          <p>{toast.msg}</p>
          <button onClick={() => hideToast(index)}>Close</button>
        </div>
      ))}
      <button onClick={() => showToast('This is a success toast!', 'success')}>
        Show Success Toast
      </button>
      <button onClick={() => showToast('This is an error toast!', 'error')}>
        Show Error Toast
      </button>
    </div>
  );
}
```

> In this example, the `useToast` hook stores the message and type of each toast in the state, and the `App` component uses the type to determine the class name for the toast. This allows you to define different styles for each type of toast, such as a `toast-success` class for success toasts and a `toast-error` class for error toasts. You can modify this example further to suit your specific needs, such as defining additional types of toasts or changing the way that the styles are applied.

Great, but a reducer may make more sense than regular state for this use case. Let's ask it to update the code:

> Can we amend this code to use a reducer instead of state?

> Yes, it is possible to modify the example to use a reducer instead of state. A reducer is a function that takes the current state and an action as arguments, and returns a new state based on the action. This allows you to manage the state for your toast in a more modular and scalable way. Here is an example of how you might do this:

```javascript
import React, { useReducer, useEffect } from 'react';

const initialState = {
  toasts: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'HIDE_TOAST':
      const newToasts = [...state.toasts];
      newToasts.splice(action.payload, 1);
      return {
        ...state,
        toasts: newToasts
      };
    default:
      return state;
  }
}

function useToast() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function showToast(msg, type) {
    dispatch({
      type: 'SHOW_TOAST',
      payload: { msg, type }
    });
  }

  function hideToast(index) {
    dispatch({
      type: 'HIDE_TOAST',
      payload: index
    });
  }

  useEffect(() => {
    let timeoutIds = [];
    state.toasts.forEach((_, index) => {
      timeoutIds[index] = setTimeout(() => hideToast(index), 3000);
    });

    return () => timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  }, [state.toasts]);

  return {
    toasts: state.toasts,
    showToast,
    hideToast
  };
}

function App() {
  const { toasts, showToast, hideToast } = useToast();

  return (
    <div>
      {toasts.map((toast, index) => (
        <div
          className={`toast toast-${toast.type}`}
          key={index}
        >
          <p>{toast.msg}</p>
          <button onClick={() => hideToast(index)}>Close</button>
        </div>
      ))}
      <button onClick={() => showToast('This is a success toast!', 'success')}>
        Show Success Toast
      </button>
      <button onClick={() => showToast('This is an error toast!', 'error')}>
        Show Error Toast
      </button>
    </div>
  );
}
```

> In this example, the `useToast` hook uses the `useReducer` hook to manage the state for the toast. The reducer function takes the current state and an action as arguments, and returns a new state based on the action. The `App` component dispatches actions to show and hide the toast, and the `useEffect` hook is used to set a timeout for each toast to automatically hide it after a certain amount of time

OK, that's done. Now we decide we need this in Typescript:

> Please convert this to Typescript

> Sure, here is an example of how you might convert the code to TypeScript:

```typescript
import React, { useReducer, useEffect } from 'react';

interface ToastState {
  toasts: {
    msg: string;
    type: string;
  }[];
}

const initialState: ToastState = {
  toasts: []
};

function reducer(state: ToastState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'HIDE_TOAST':
      const newToasts = [...state.toasts];
      newToasts.splice(action.payload, 1);
      return {
        ...state,
        toasts: newToasts
      };
    default:
      return state;
  }
}

function useToast() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function showToast(msg: string, type: string) {
    dispatch({
      type: 'SHOW_TOAST',
      payload: { msg, type }
    });
  }

  function hideToast(index: number) {
    dispatch({
      type: 'HIDE_TOAST',
      payload: index
    });
  }

  useEffect(() => {
    let timeoutIds = [];
    state.toasts.forEach((_, index) => {
      timeoutIds[index] = setTimeout(() => hideToast(index), 3000);
    });

    return () => timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  }, [state.toasts]);

  return {
    toasts: state.toasts,
    showToast,
    hideToast
  };
}

function App() {
  const { toasts, showToast, hideToast } = useToast();

  return (
    <div>
      {toasts.map((toast, index) => (
        <div
          className={`toast toast-${toast.type}`}
          key={index}
        >
          <p>{toast.msg}</p>
          <button onClick={() => hideToast(index)}>Close</button>
        </div>
      ))}
      <button onClick={() => showToast('This is a success toast!', 'success')}>
        Show Success Toast
      </button>
      <button onClick={() => showToast('This is an error toast!', 'error')}>
        Show Error Toast
      </button>
    </div>
  );
}
```

> In this example, the code is written in TypeScript, and type annotations have been added to the functions and variables to specify the types of their arguments and return values. This allows the TypeScript compiler to check the code for type errors, and provides additional type information to other tools and libraries that can make use of it. You can modify this example further to suit your specific needs, such as adding additional types or using more advanced type features.

Next, can it refactor this?

> Could we refactor this?

> Yes, it is possible to refactor the code to make it more concise and modular. Here is an example of how you might do this:

```typescript
import React, { useReducer, useEffect } from 'react';

interface Toast {
  msg: string;
  type: string;
}

type State = Toast[];

type Action =
  | { type: 'SHOW_TOAST'; payload: Toast }
  | { type: 'HIDE_TOAST'; payload: number };

const initialState: State = [];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SHOW_TOAST':
      return [...state, action.payload];
    case 'HIDE_TOAST':
      const newToasts = [...state];
      newToasts.splice(action.payload, 1);
      return newToasts;
    default:
      return state;
  }
}

function useToast() {
  const [toasts, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timeoutIds = toasts.map((_, index) =>
      setTimeout(() => dispatch({ type: 'HIDE_TOAST', payload: index }), 3000)
    );
    return () => timeoutIds.forEach(clearTimeout);
  }, [toasts]);

  return {
    toasts,
    showToast: (msg: string, type: string) =>
      dispatch({ type: 'SHOW_TOAST', payload: { msg, type } }),
    hideToast: (index: number) =>
      dispatch({ type: 'HIDE_TOAST', payload: index })
  };
}

function App() {
  const { toasts, showToast, hideToast } = useToast();

  return (
    <div>
      {toasts.map((toast, index) => (
        <div
          className={`toast toast-${toast.type}`}
          key={index}
        >
          <p>{toast.msg}</p>
          <button onClick={() => hideToast(index)}>Close</button>
        </div>
      ))}
      <button onClick={() => showToast('This is a success toast!', 'success')}>
        Show Success Toast
      </button>
      <button onClick={() => showToast('This is an error toast!', 'error')}>
        Show Error Toast
      </button>
    </div>
  );
}
```

> In this example, the code has been refactored to use more concise and modular functions and types. The reducer function has been simplified and made more type-safe by using a union type for the `Action` type, and the `useToast` hook has been refactored to use the useReducer hook more effectively and efficiently. Additionally, the code has been cleaned up and made more readable by using modern JavaScript features and conventions. You can modify this example further to suit your specific

Great. Now, we should really write a test for this. Let's see if ChatGPT can do that for us:

> How might we test this hook with Jest?

> To test the `useToast` hook with Jest, you can write a test that uses the act function from the `@testing-library/react` library to simulate user interactions with the component and verify that the hook behaves as expected. Here is an example of how you might write a test for the `useToast` hook:

```typescript
import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useToast } from './useToast';

describe('useToast', () => {
  it('should show and hide toasts', () => {
    const { result } = renderHook(() => useToast());
    const { toasts, showToast, hideToast } = result.current;

    // Initially, there should be no toasts
    expect(toasts).toEqual([]);

    // Show a toast and verify that it appears in the state
    act(() => showToast('This is a test toast', 'success'));
    expect(toasts).toEqual([{ msg: 'This is a test toast', type: 'success' }]);

    // Hide the toast and verify that it disappears from the state
    act(() => hideToast(0));
    expect(toasts).toEqual([]);
  });
});
```

> In this test, the `renderHook` function from the `@testing-library/react-hooks` library is used to render the `useToast` hook in a test environment. The test then simulates user interactions with the hook by calling the `showToast` and `hideToast` functions, and verifies that the toasts are shown and hidden as expected. This test can be further extended to cover additional scenarios and edge cases, such as showing multiple toasts at once or verifying the behavior of the hook when an error occurs.

Overall, this looks pretty good! I'd need to spend a lot more time than I can spare now to try to find if there are any issues with it, and it wouldn't surprise me if there were a few bugs, but it looks fairly sounds as an example.

## Getting examples of the use of a technique

Another thing that ChatGPT seems useful for is creating examples. For instance, I've never had the occasion to use render props in React, so I asked ChatGPT the following question:

> Please demonstrate the use of render props with functional React components

> Sure! In React, a "render prop" is a technique for sharing code between React components using a prop whose value is a function. This function is used to render the content of the component. Using a render prop with a functional component is no different than using it with a class-based component. Here's an example:

```javascript
function MyComponent(props) {
  return (
    <div>
      {props.render(props.value)}
    </div>
  );
}
```

> In the above example, MyComponent is a functional component that has a render prop, which is a function that is used to render the content of the component. The render prop takes a value prop as an argument, which can be used in the rendering of the content.

> Here's an example of how you might use this component:

```javascript
<MyComponent
  value={5}
  render={value => (
    <div>
      The value is {value}.
    </div>
  )}
/>
```

> In this example, the value passed to the value prop is 5, and the render prop is a function that returns a div element with the text "The value is 5".

> In summary, using a render prop with a functional component is just a matter of using a prop whose value is a function, and using that function to render the content of the component.

I personally find this is a better, more concise example than the one in the React documentation, so I'm quite pleased with that as an example. Now let's ask for them in Typescript:

> Please convert these examples to Typescript

> Sure, here are the examples written in TypeScript:

```typescript
function MyComponent(props: { value: any; render: (value: any) => React.ReactNode }) {
  return (
    <div>
      {props.render(props.value)}
    </div>
  );
}
```

```typescript
<MyComponent
  value={5}
  render={(value: any) => (
    <div>
      The value is {value}.
    </div>
  )}
/>
```

> In the first example, the MyComponent function is defined to take an object with two properties: value and render. The value property is of type any, which means it can be any value. The render property is a function that takes a value of type any and returns a React.ReactNode, which is the type of value that can be rendered by a React component.

> In the second example, the value prop is passed the value 5, which is a number. The render prop is passed a function that takes a value of type any and returns a div element.

> I hope this helps! Let me know if you have any other questions.

Nice one!

## Refactoring from a legacy framework

I thought I'd try another example that was more immediately useful to me. I work on a large legacy Zend 1 framework which I'm slowly trying to modernize, and a big chunk of the models have been migrated to Eloquent, but the controllers are the biggest blocker by far to migrating to a newer framework, and as long as they're in use we can't migrate easily migrate some other parts, such as the forms. I wrote an example Zend 1 controller and asked ChatGPT the following question:

> Given the following Zend 1 controller:

```php
<?php

use App\Forms\CategoryForm;
use App\Models\Category;

final class CategoriesController extends Zend_Controller_Action
{
    public function indexAction(): void
    {
        $this->view->categories = Category::all();
    }

    public function addAction(): void
    {
        $request = $this->getRequest();
        assert($request instanceof Zend_Http_Request_Http);
        if (!$request->isPost()) {
            throw new Zend_Controller_Action_Exception("Unsupported method", 405);
        }
        $form = new CategoryForm();
        if (!$form->isValid($request->getPost())) {
            throw new Zend_Controller_Action_Exception("Invalid data", 422);
        }
        $category = Category::create([
            'name' => $form->name->getValue(),
        ]);
        $this->view->category = $category;
    }
}
```

> Please convert it to a Laravel controller

It came back with:

> Here is a possible conversion of the given Zend 1 controller to a Laravel controller:

```php
<?php

use App\Http\Controllers\Controller;
use App\Forms\CategoryForm;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index(): void
    {
        $categories = Category::all();
        return view('categories.index', compact('categories'));
    }

    public function add(Request $request): void
    {
        if (!$request->isMethod('post')) {
            abort(405, 'Unsupported method');
        }
        $form = new CategoryForm();
        if (!$form->isValid($request->all())) {
            abort(422, 'Invalid data');
        }
        $category = Category::create([
            'name' => $form->name->getValue(),
        ]);
        return view('categories.add', compact('category'));
    }
}
```

> Note that this is just one possible way to convert the given code, and there may be other ways to accomplish the same thing using Laravel's features and conventions.

This looks pretty good to me. It does still depend on the Zend form classes, but once the controller has been rewritten for Laravel, it would be easy to replace them with form request classes. While this is a very minimal example, it shows the potential power of ChatGPT in terms of migrating legacy code to more modern frameworks. I'm sure it's not always going to be 100% accurate, but other tools like Psalm, which I use anyway, will help find potential problems with method names or arguments being wrong, as will peer reviews of the code, and it'd certainly be less laborious than doing it all manually.

## Writing website copy

I asked it the following question:

> Write the homepage copy for a website proving tips and tricks with performance improvements for web applications built with Laravel

And it came back with:

> Welcome to Tips and Tricks for Laravel Performance!

> Are you looking to improve the performance of your web application built with Laravel? You've come to the right place!

> Our website provides a wealth of information and tips on how to optimize your Laravel application for maximum performance. From caching and database optimization, to code refactoring and route optimization, we've got you covered.

> We also offer in-depth tutorials and guides on how to implement these performance improvements in your own Laravel application.

> Don't let slow performance hold your web application back. Take control and improve your Laravel application's performance today with the help of Tips and Tricks for Laravel Performance.

Not bad, I've certainly seen a lot worse than that from human writers. Next, I asked it to write a blog post for the site:

> Now write a blog post for this site on how to improve the performance of the site by setting appropriate HTTP headers, with code samples

> Improving the performance of your Laravel application starts with understanding the role of HTTP headers. HTTP headers are key-value pairs that are sent in the header of an HTTP request or response, and provide important information about the request or response.

> One of the ways to improve the performance of your Laravel application is to set appropriate HTTP headers. This allows the client, such as a web browser, to make more informed decisions about how to handle the request or response.

> For example, setting the Cache-Control header can improve performance by allowing the client to cache the response, so that it doesn't have to be fetched again on subsequent requests. This can be done in Laravel using the Response facade:

```php
use Illuminate\Support\Facades\Response;

// Set the Cache-Control header to cache the response for 1 hour
Response::header('Cache-Control', 'max-age=3600');
```

> Another important header for improving performance is the Expires header. This header specifies a date and time at which the response will no longer be considered fresh. This allows the client to make an informed decision about whether to use a cached version of the response or fetch a new one.

> In Laravel, the Expires header can be set using the Response facade:

```php
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;

// Set the Expires header to one hour from now
$expires = Carbon::now()->addHour();
Response::header('Expires', $expires->toRfc2822String());
```

> By setting these headers, you can improve the performance of your Laravel application by allowing the client to make more efficient use of caching. This can reduce the number of requests that need to be made to the server, resulting in faster load times and a better user experience.

> Of course, there are many other HTTP headers that can be used to improve the performance of your Laravel application. For more information, check out the official Laravel documentation on HTTP headers.

Not hugely comprehensive, but a reasonably good starting point. Using this to get you started seems like a good idea, and there's nothing more intimidating than a blank page when you want to write a blog post.

### Overall impressions

Even in its current state as a tech preview, ChatGPT is *hugely* impressive. It's extraordinary how good it is at generating basic code samples for almost any use case I can think of. However, the distinct impression I get is that it's not really capable of original thought. Most of the above is basically just taking stuff that's already out there and essentially remixing it. There's plenty of tutorials on writing all of the above and it looks to me like it's just taking those and converting those according to the provided specifications.

However, don't get the impression that doesn't make it useful. I've used Github Copilot for a while and that offers dramatic improvements in productivity, and this has the potential to be much more significant. As shown above, it can migrate a simple controller from Zend 1 to Laravel, with the result looking perfectly acceptable, and the value of that should be clear to anyone who has to work on a large legacy project. Similarly you can ask it to rewrite something to use a specific design pattern and the end result is perfectly acceptable. It's a fantastic learning tool too since you can ask it to provide an example specific to your use case rather than trawling through blog posts, where most of them might have different requirements to you. As such it's going to hugely improve developer productivity.

To a large extent, I think something like this is going change the developer's role by shifting the emphasis of it somewhat from the productive to the executive, with our job being more akin to editors than authors. Coding will become less about solving the problem and more about defining the problem in the first place and letting the system solve it. However, I don't think it will automate our jobs away entirely - the quality of the code it produces is variable, to say the least, and there will definitely be a need to be able to debug it, and solve more unusual problems.

However, my job involved writing spammy blog posts for ad money, I'd be very worried about my future prospects. I think tools like this will probably be writing most of the spammier sort of blog posts that just exist to get clicks on the web in a year at most. I've actually just asked it to write a blog post I've wanted to write for a while now for me, and the end result looks pretty solid right now.
