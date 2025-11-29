"use client";

export default function Footer() {
  return (
    <footer style={{backgroundImage: "url('/img-clay-footer-garden.png')", paddingTop:'25rem', paddingBottom:'10rem'}} className="w-full flex justify-center py-20">
      <div className="w-[70%] bg-[#F8F6F1] text-[#111] px-10 py-20 rounded-[40px]">
        <div className="max-w-7xl mx-auto flex justify-between gap-12">

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Login</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Sculptor</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Sequencer</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Audiences</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Signals</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Integrations</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Multi-provider data enrichment</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">AI formula generator</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">AI Research agent</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Changelog</a></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Email finder</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Headcount finder</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Credits calculator</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Chrome extension</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Lookup WHOIS info</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">CPM calculator</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Margin calculator</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Headcount directory</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Glossary</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Dossier</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Job board</a></li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="font-semibold mb-4">Blog</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Why we built the first GTM engineering team</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">AI for sales prospecting</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Why good CRM data matters</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Google maps lead generation in 5 easy steps</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Outbound sales automation</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Scraping data from Websites</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Get started lesson</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">University</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Claybooks</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Templates</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Partner programs</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Join Slack</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Community</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul  className="space-y-2 text-sm text-gray-700 pb-[50px]">
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Wall of love</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">About</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Careers</a></li>

              <li className="flex items-center gap-2">
                <a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Jobs</a>
                <span className="text-[10px] bg-yellow-300 px-2 py-0.5 rounded-md">We are hiring!</span>
              </li>

              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Integrate with Clay</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Status</a></li>
            </ul>
            <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Privacy policy</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Terms of service</a></li>
              <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Do not sell my data</a></li>
            </ul>
          </div>
          </div>

          {/* Legal */}
        
        </div>

        {/* Customers Section */}
        <div className="max-w-7xl mx-auto mt-20 pb-[100px]">
          <h3 className="font-semibold mb-4">Customers</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">OpenAI</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Vanta</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Verkada</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Sendoso</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Anthropic</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Coverflex</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Rippling</a></li>
            <li><a href="#" className="hover:text-gray-900 hover:font-medium transition-all">Customer stories</a></li>
          </ul>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto mt-16 text-sm text-gray-600">
          © Clay 2025 — Born in Brooklyn. Claymation illustrations by the wonderful Hudson Christie.
        </div>
      </div>
    </footer>
  );
}
