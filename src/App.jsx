import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpSignIn from "./pages/SignUpSignIn";
import Profile from "./pages/Profile";
import Podcasts from "./pages/Podcasts";
import CreatePodcast from "./pages/CreatePodcast";
import PodcastDetails from "./pages/PodcastDetails";
import CreateEpisode from "./pages/CreateEpisode";
import Navbar from "./components/Header/Navbar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/UserSlice";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              dispatch(setUser(userData));
            }
          },
          (error) => {
            console.log("error fetching data ", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="BODY">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignUpSignIn />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/createPodcast" element={<CreatePodcast />} />
            <Route path="/podcasts/:podcastId" element={<PodcastDetails />} />
            <Route
              path="/podcasts/:podcastId/creteEpisode"
              element={<CreateEpisode />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
