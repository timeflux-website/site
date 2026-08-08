import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Seo from './components/Seo.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Solution from './pages/Solution.jsx';
import Pricing from './pages/Pricing.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Solution', path: '/solution' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

function App() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="solution" element={<Solution />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
