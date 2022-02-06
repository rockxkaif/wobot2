import Login from "./login";
import Signup from "./components/signup";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/header";
import AddVideo from "./components/addproduct";
import ListVideos from "./components/listproduct";
import ViewVideo from "./components/viewProduct";
import { VideoProvider } from "./videoContext";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useState } from "react";

function App() {

  const [currentTheme, setCurrentTheme] = useState('light')

  const theme = createTheme({
    palette: {
      type: currentTheme,
      primary: {
        main: '#ff0000'
      }
    },

  })

  return (
    <div>

      <Router>

        {/* <Login />
        <Signup /> */}
        <ThemeProvider theme={theme}>
          <VideoProvider>
            <Header currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}></Header>
            <Route component={Login} path={'/login'} ></Route>
            <Route component={Signup} path={'/signup'}></Route>
            <Route component={AddVideo} path={'/addvideo'}></Route>
            <Route component={ViewVideo} path={'/viewvideo/:id'}></Route>
            <Route component={ListVideos} path={'/listvideo'}></Route>
          </VideoProvider>
        </ThemeProvider>


      </Router>

    </div >
  );
}

export default App;