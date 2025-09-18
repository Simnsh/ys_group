import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Product from "./Product";
import Contact from "./Contact";
import PageNotFound from "./PageNotFound";
import PageNav from "./PageNav";
import Footer from "./Footer";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageNav />
        <Routes>
          {/* set up two path like url/ && url/home all leads to the same page */}
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
