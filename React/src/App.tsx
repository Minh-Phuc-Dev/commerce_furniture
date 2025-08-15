import "styles/main.css"
import {store} from "contexts/root";
import {Provider} from "react-redux";
import AppRouters from "routers";
import {Toaster} from "sonner";

const App = () => {
    return (
        <Provider store={store}>
            <AppRouters/>
            <Toaster
                position="bottom-right"
                richColors={false}
                duration={3000}
            />
        </Provider>
    );
};

export default App;