# React-es-router

This is a minimalistic router intended for use in react projects without a build step.

It was inspired by this talk: https://www.youtube.com/watch?v=mVjZQrsXBQE and was built to be used in small application at one of my former workplaces.

# Example

Usage example can be found in [this codesandbox](https://codesandbox.io/s/react-es-router-g6ej5?file=/src/router.js)

# Usage

Import it from unpkg the following way:

```javascript
import Router, { Route } from "https://www.unpkg.com/react-es-router";
```

Then you can use it in your app the following way:

```jsx
function App() {
  return (
    <main>
      <Router>
        <Route path="/" component={<div>Home</div>}></Route>
        <Route path="/blog" component={<div>Blog</div>}></Route>
        <Route
          path="/error"
          component={<div>Error</div>}
          style={{ color: "red" }}
        ></Route>
      </Router>
    </main>
  );
}
```

_Note_: Place your "not found" route last, as router assumes that the last `Route` component is for not found routes.

# API

## Router

This component should be used to enclose the individual `Route` components.

### Props

- `baseUrl` (optional): The base URL of the app. Defaults to `/`.
- `cb` (optional): A callback function which will be invoked every time a route change happens. It will be invoked with the next route and if false is returned the navigation is cancelled.

## Route

This component represents the individual routes in the application.

### Props

- `path`: The path where the given component should appear at.
- `component`: Which component to render at this route.

## Link

This is a component that can be used for easy navigation

### Usage

```jsx
// Import it like this.
import { Link } from "https://unpkg.com/react-es-router";

// Use it in a component like this:
<Link to="route/to/blogpost">See blog post</Link>;
```

### Props

- `to`: Where the router should navigate upon clicking the ling.
- `element` (optional): What type of element to render. Defaults to an `a` tag, but in theory any HTML element could work here. Most of the time should probably stay with the default for a11y reasons.

## useRouter

This is a hook that can be used to programmatically interact with the router.

Returns an object with two properties:

- `route`: The current route.
- `navigate`: A function which can be used for programmatic navigation.

### Usage

```jsx
import { useRouter } from "https://unpkg.com/react-es-router";

// inside your component
const { navigate } = useRouter();

// Where you want to programmatically navigate to another route

navigate("route/to/navigate/to");
```
