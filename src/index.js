import { React } from "https://unpkg.com/es-react-production";
import { createBrowserHistory } from "https://cdn.pika.dev/history/v4";
import htm from 'https://cdn.pika.dev/htm/v2';

const html = htm.bind(React.createElement);

const RouterContext = React.createContext();

const useRouter = () => {
  const context = React.useContext(RouterContext);

  const navigate = route => {
    context.history.push(route);
  };

  const route = context.location;

  return { route, navigate };
};

const Link = ({ to, children, element = "a", ...rest }) => {
  const context = React.useContext(RouterContext);

  const goTo = event => {
    event.preventDefault();
    context.history.push(to);
  };

  return React.createElement(
    element,
    {
      href: to,
      onClick: goTo,
      ...rest
    },
    children
  );
};

const Router = ({ children }) => {
  const history = createBrowserHistory();
  const [location, setLocation] = React.useState(history.location.pathname);

  React.useEffect(() => {
    const unlisten = history.listen(location => {
      setLocation(location.pathname);
		});
		
		return unlisten;
	});

	const renderChild = () => {
    let canRoute = false;
    const child = children.map(child => {
      if (child.props.path === location) {
        canRoute = true;
        return child;
      }
		});
		
		const lastChild = children[children.length - 1];

    return canRoute ? child : lastChild;
  };

  return (
    html`<${RouterContext.Provider} value=${{ history, location }}>
      ${renderChild()}
    <//>`
  );
};

export { Router, Link, useRouter};
