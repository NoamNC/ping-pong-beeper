import { MessagesProvider } from "./context/MessagesProvider";
import Pager from "./components/Pager";
import { DisplayProvider } from "./context/DisplayProvider";

const App = () => (
  <MessagesProvider>
    <DisplayProvider>
      <Pager />
    </DisplayProvider>
  </MessagesProvider>
);

export default App;
