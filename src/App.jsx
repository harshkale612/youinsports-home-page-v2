import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Community from './pages/Community';
import Support from './pages/Support';
import Organizers from './pages/Organizers';
import Tracker from './pages/Tracker';
import VideoAnalysis from './pages/VideoAnalysis';
import AIAgents from './pages/AIAgents';
import Plans from './pages/Plans';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AthleteProfile from './pages/AthleteProfile';
import PlayerProfile from './pages/PlayerProfile';
import OrganizerProfile from './pages/OrganizerProfile';
import './App.css';

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/community" component={Community} />
              {/* <Route path="/support" component={Support} /> */}
              <Route path="/organizers" component={Organizers} />
              {/* <Route path="/tracker" component={Tracker} /> */}
              {/* <Route path="/video-analysis" component={VideoAnalysis} />
              <Route path="/ai-agents" component={AIAgents} />
              <Route path="/plans" component={Plans} /> */}
              <Route path="/faq" component={FAQ} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/terms" component={Terms} />
              <Route path="/athletes/:id" component={AthleteProfile} />
              {/* <Route path="/profile/player" component={PlayerProfile} /> */}
              <Route path="/profile/organizer" component={OrganizerProfile} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
